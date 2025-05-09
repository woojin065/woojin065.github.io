---
title: 브라우저 렌더링 과정
date: 2025-05-09 00:10:00 +09:00
categories: [common_topic]
tags: [common]
# image: 
#   path:
---



## 1. 브라우저 핵심 모듈 – 누가 무슨 일을 할까?

> 큰 그림부터 잡기: 웹페이지가 뜰 때 브라우저는 다섯 개의 핵심 모듈이 서로 바통을 넘기며 일한다. 각 모듈이 맡은 일을 이해하면 DevTools 의 로그 한 줄도 훨씬 눈에 잘 들어온다.
> 

### 1.1 Browser Process — 중앙 관제탑

| 구분 | 설명 |
| --- | --- |
| **주요 기능** | 탭/사이트 격리, 네트워크 요청 스케줄링, 권한(Permission) 다이얼로그 처리, 다운로드·프린트 관리, 크래시 복구 |
| **왜 중요한가?** | 프로세스 경계가 = 보안 경계. 탭을 분리하면 XSS·Spectre 같은 사이드채널 공격을 차단하고, 렌더러가 죽어도 브라우저 셸은 남아 "이 페이지가 응답하지 않습니다" 알림을 띄운다. |
| **브라우저별 특징** | **Chrome** : Site Isolation + OOPIF 로 iframe 도 격리**Firefox** : Fission(e10s) 모델로 UI 스레드와 분리**Safari** : 탭 프로세스 + WebContent 프로세스, macOS/iOS 샌드박스 |
| **디버깅 팁** | Chrome *chrome://process-internals* 열어 각 SiteInstance 확인, Firefox *about:processes*, Safari *Develop ▸ Memory* |

---

### 1.2 Renderer Process — 화면 조립공

| 구분 | 설명 |
| --- | --- |
| **주요 기능** | HTML・CSS 파싱, JavaScript 실행, 레이아웃 계산, Paint 명령 생성, 접근성 트리(AX Tree) 작성 |
| **라이프사이클** | 탭/사이트마다 1 ~ N개. 사용자 스크롤・클릭 처리 → 렌더 트리 업데이트 → Paint → 합성 까지를 반복 |
| **브라우저별 특징** | **Chrome** : 크래시 시 자동 재시작, 렌더러 TaskScheduler 도입**Firefox** : Rust 코드 다수 포함, 파서・Stylo 멀티스레드**Safari** : iOS WKWebView 에선 앱 프로세스 내부에 통합 |
| **DevTools 포인트** | *Performance* 패널의 메인 쓰레드 타임라인 = Renderer 프로세스 작업 시퀀스 |

---

### 1.3 GPU Process — 도장 & 합성 장인

| 구분 | 설명 |
| --- | --- |
| **주요 기능** | Paint 명령을 래스터화(벡터 → 픽셀), 텍스처 업로드, 여러 레이어를 GPU 셰이더로 합성 |
| **왜 중요한가?** | CPU 가 렌더링에서 손을 떼고 JS, 레이아웃에 집중할 수 있게 한다. 덕분에 스크롤·애니메이션이 60 FPS 를 유지. |
| **브라우저별 구현** | **Chrome/Safari** : Skia GPU / CoreAnimation 사용**Firefox** : **WebRender** — 디스플레이 리스트 전체를 GPU 에 바로 전달해 2D/3D 통합 처리 |
| **문제 추적** | Chrome *Layer Viewer* 에서 레이어가 빨갛게 보이면 GPU 합성 실패, Firefox *gfx.webrender.debug* 플래그로 셰이더 단계 시각화 |

---

### 1.4 JavaScript 엔진 — 동적 설계 변경 마스터

| 구분 | 설명 |
| --- | --- |
| **주요 기능** | 파싱 → 바이트코드 → JIT 컴파일 → 실행, 가비지 컬렉션(GC) |
| **각 엔진** | **V8(Chrome/Edge)** : Ignition(인터프리터) + TurboFan(JIT), Generational GC, Code Caching**SpiderMonkey(Firefox)** : Baseline + IonMonkey JIT, WarpBuilder 최적화, Incremental GC**JavaScriptCore(Safari)** : LLInt + DFG + FTL JIT, Bytecode Profiling + B3 Tier |
| **최적화 포인트** | ① 핫패스는 JIT 가속, ② inline cache 로 프로퍼티 접근 속도 향상, ③ GC 파우징 최소화를 위한 메모리 풀 관리 |

---

### 1.5 CSS 엔진 — 스타일 설계사

| 구분 | 설명 |
| --- | --- |
| **주요 기능** | 셀렉터 매칭, Cascade & Inheritance, 계산 스타일(Computed Style) 생성, 레이아웃 단계 호출 |
| **엔진별 특징** | **LayoutNG + StyleEngine(Chrome)** : "프래그먼트" 단위 레이아웃, 블록/인라인/그리드 통합**Stylo(Firefox)** : Rust 구현, CPU 코어당 스레드 분산 매칭**WebKit(Safari)** : Legacy StyleResolver + 새 DisplayList 페인팅 |
| **최적화 포인트** | ① `contain` 또는 `content-visibility` 로 재계산 범위 제한, ② 복잡한 셀렉터 대신 BEM, ③ Critical CSS 를 인라인 |

---

## 2. Critical Rendering Path (요약)

1. **네트워크** : Early Hints, Priority 헤더로 리소스 선행 다운로드
2. **HTML → DOM** : Blink 스펙PreParser, Gecko 스트리밍 파서
3. **CSS → CSSOM** : Stylo 멀티스레드, LayoutNG 프래그먼트 계산
4. **Render Tree** 조합 → **Layout** → **Paint** → **Compositing(GPU)**

### 비용이 큰 작업 Top 3

| 작업 | 평균 비용 | 회피 전략 |
| --- | --- | --- |
| **Reflow (Layout)** | ★★★★ | `transform`, `content-visibility` |
| **Style Recalc** | ★★☆ | `contain: style` |
| **Repaint** | ★☆☆ | `will-change` 로 GPU 승격 |

**Reflow (Layout)**

DOM 요소의 실제 위치·크기를 다시 계산하고 레이아웃 트리를 재배치하는 단계. 부모‑자식, 형제 노드까지 전파되므로 메인 스레드를 길게 점유한다. `transform` 으로 좌표만 GPU 합성 단계에서 변경하거나, `content‑visibility:auto` 로 화면 밖 노드를 건너뛰면 비용을 아낄 수 있다.

**Style Recalc**

CSS 셀렉터 매칭을 다시 수행해 *computed style* 을 갱신하는 과정. 레이아웃 변경은 없지만 노드 수가 많거나 복잡한 셀렉터가 많으면 비용이 커진다. `contain: style` 로 하위 트리의 스타일 영향을 격리하면 재계산 범위를 줄일 수 있다.

**Repaint**

이미 계산된 레이아웃을 유지한 채 픽셀을 다시 칠하는 단계. 색, 그림자, `border-radius` 변화처럼 시각적 속성만 바뀔 때 트리거된다. `will-change: opacity/transform` 으로 노드를 별도 레이어로 승격하면 GPU 가 빠르게 다시 칠해 메인 스레드 부하를 최소화한다.

| 작업 | 평균 비용 | 회피 전략 |
| --- | --- | --- |
| **Reflow(Layout)** | ★★★★ | `transform`, `content-visibility` |
| **Style Recalc** | ★★☆ | `contain: style` |
| **Repaint** | ★☆☆ | `will-change` 로 GPU 승격 |

---

## 3. 실전 최적화 체크리스트

- **Above‑the‑fold CSS** 인라인(10 KB 이하)
- 이미지 LCP 요소에 `fetchpriority="high"`, 배경 이미지 `lazy` 로딩
- `.moving-panel { will-change: transform; }` 로 레이어 캐싱
- Firefox 전용: `contain: layout` & `content-visibility: auto`

---

## 4. 프로파일링 도구 한눈에 보기

| 도구 | 언제 사용? |
| --- | --- |
| **Chrome DevTools → Performance** | CLS·TBT 확인, 레이어 보드 시각화 |
| **Firefox Profiler** | WebRender GPU·CPU 비율 분석 |
| **Safari Web Inspector → Timelines** | iOS 사파리 FPS 드롭 추적 |

---

> TIP : 동일 페이지를 세 브라우저에서 열고 First Paint / CLS / TBT 를 비교해 보면 각 엔진 최적화 차이를 체감할 수 있다.
> 

---

### 마지막 한 마디

- "모듈별 책임"을 명확히 이해하면 DevTools 로그가 자연스럽게 해석된다.
- Blink(LayoutNG), Gecko(Stylo + WebRender), WebKit(DisplayList)의 구현 차이는 성능 튜닝의 출발점이다.
- 성능 병목이 보이면 **1) Reflow 줄이기 2) Style 범위 제한 3) GPU 레이어 활용** 순으로 점검해 보자.