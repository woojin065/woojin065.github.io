---
layout: single
title: "📝 웹서비스 프로그래밍 중간고사 정리"
toc: true
toc_sticky: true
toc_label: "웹서비스 프로그래밍 1~6장, 세션, 쿠키, 시큐어코딩"
categories: webservice
excerpt: "2022-10-26 웹서비스 프로그래밍 중간"
tag: [middle test]
---

# CHAP.01 웹 프로그래밍의 이해

## 1. 웹의 개요

### 웹이란?

- World Wide Web(WWW)

  - 인터넷에서 운영되는 서비스 중 하나로 웹 자체가 인터넷을 의미하는 것은 아님
  - 웹의 개발 목적
    - 연구자들이 흩어져 있는 정보를 손쉽게 정리하고 공유하기 위함

- 웹의 특징
  - 인터넷은 컴퓨터 네트워크 망, 웹은 인터넷 서비스 중 하나를 의미함
  - 인터넷 상의 정보를 하이퍼텍스트<sup>_참조(하이퍼링크)를 통해 독자가 한 문서에서 다른 문서로 즉시 접근 할 수 있는 텍스트_</sup> 방식과 멀티미디어 환경에서 검색할 수 있게 해주는 검색 시스템
  - HTTP 프로토콜 사용
  - HTML 문서를 연결하여 다양한 컨텐츠 제공
  - 많은 사람들이 정보를 쉽게 공유하고 접근할 수 있도록 하는것을 목적으로 함

### 웹의 동작 구조

<!-- ![image](../../images/2022-10-25-webservice/215702.png){: .align-center} -->

<img src="../../images/2022-10-25-webservice/215702.png" style="box-sizing: border-box; width: 80%; display: block;
  margin-left: auto;
  margin-right: auto;">

- HTML을 중심으로 한 웹의 동작 과정
  1. URL 입력
  2. DNS 서버에서 도메인 이름을 IP주소로 변환하여 제공
  3. IP 주소의 서버 80번 포트로 접속 시도(서버는 접속 대기)
  4. 웹 서버는 요청 내용을 분석하여 해당 페이지를 읽음
  5. 웹 서버는 HTML 파일 내용을 텍스트로 클라이언트로 전송
  6. 웹 브라우저는 HTML 태그를 분석하고 적절히 변환하여 화면 구성

## 2. 네트워크와 인터넷 개념

### 네트워크

- 네트워크(Network)

  - 컴퓨터와 컴퓨터를 연결해주는 망

- 프로토콜(Protocol)

  - 네트워크를 구축하기 위한 컴퓨터 간의 연결 규격
  - TCP/IP : 여러 프로토콜 중 가장 널리 쓰이며 인터넷에서도 사용되고 있는 프로토콜

- TCP/IP(Transmission Control Protocol/Internet Protocol)
  - 컴퓨터 간에 통신할 수 있도록 만든 프로토콜의 종류 중 한가지
  - 인터넷은 이 프로토콜에 기반함
    - 하드웨어, 운영체제, 접속 매체와 관계없이 동작 할 수 있는 개방형 구조
- OSI 7계층
  - 네트워킹을 위한 물리적 장비에서부터 실제 서비스를 제공하기 위한 어플리케이션에 이르는 단계 까지를 계층화한 모델
  - 계층화를 통해 상위 레벨에서는 하위 레벨에서 구현한 내용을 모르더라도 표준화된 인터페이스를 통해 네트워크 시스템을 개발, 운영 할 수 있음
- TCP/IP의 특징

  - OSI 7계층을 좀 더 단순화 하여 4계층으로 정의
  - TCP: 데이터 흐름관리, 데이터 정확성 확인 등의 역할 수행
  - IP: 데이터(패킷)를 목적지까지 전송하는 역할 담당
  - TCP/IP는 개방형 구조로, 특정 운영체제나 하드웨어에 영향을 받지 않고 근거리와 원거리 모두 데이터를 전송 할 수 있음

- IP주소(IP Address)
  - TCP/IP로 연결된 네트워크에서 각각의 컴퓨터를 구별하기 위해 사용하는 주소

### 인터넷

- 포트(Port)

  - 네트워크 서비스를 제공하기 위한 일종의 출입문
  - 하나의 컴퓨터에서 여러개의 네트워크 서비스를 제공하는 경우, 이들을 구분하기 위한 목적으로 사용
    - ex) 은행에서 입출금, 대출 등 업무에 따라 창구를 구별
  - 포트와 프로토콜이 일치하지 않는 경우 정상적인 네트워크 서비스를 이용할 수 없음
  - 포트는 접속할 수 있게 개방해 놓은 문과 같으므로 보안과 밀접한 관계가 있음

- DNS(Domain Name System)
  <img src="../../images/2022-10-25-webservice/221409.png" style="box-sizing: border-box; width: 100%; display: block;
    margin-left: auto;
    margin-right: auto;">

  - 컴퓨터의 IP주소는 네트워크에서 컴퓨터를 구분해주는 주민번호같은 개념
  - 인터넷 주소의 형태: 호스트(computer)이름(www) + 도메인 이름(kim-song-jun.github.io)
  - 도메인 이름은 규칙에 따라 붙여지며, 도메인을 관리하는 기관에 일정 비용을 지불하고 구매해야 함
  - 도메인 이름을 통한 웹 사이트 접속도 결국 내부적으로 도메인 이름을 IP주소로 변환하는 서비스 이용

## 3. 웹 프로그래밍의 구조

### 클라이언트-서버 구조

- 클라이언트-서버 구조

  - 웹 서비스 제공을 위해서는 서버 컴퓨터와 서버에서 동작하는 프로그램이 필요함
    <img src="../../images/2022-10-25-webservice/221716.png" style="box-sizing: border-box; width: 100%; display: block;
      margin-left: auto;
      margin-right: auto;">

  - 클라이언트
    - 웹 서비스를 이용하는 사용자(Web Browser: Client Program)
  - 서버
    - 웹 서비스를 제공하기 위한 서비스 공급자

### HTML/CSS/JS

- HTML(HyperText Markup Language)
  - 웹 문서의 구조를 정의하고 컨텐츠를 표현하는 기본 마크업 언어
  - 웹을 통해 컨텐츠를 제공하려면 HTML을 사용해야 함
  - HTML은 테그라고 하는 간단한 표기법으로 표현하고자 하는 정보에 의미 부여
- CSS(Cascading Style Sheet)

  - HTML 문서에 레이아웃과 디자인을 포함한 시각적 요소 정의
  - HTML은 컨텐츠의 내용과 구조(Layout)를 정의하고 CSS에서 컨텐츠의 위치, 정렬, 글자크기, 여백, 색상 등을 정의
  - 디자인을 적용할 HTMl 요소를 셀렉터(Selector)<sup>_ID, class, tag_</sup>로 지정하고 원하는 디자인 속성을 부여하는 형식 사용

- JS
  - HTML 문서의 동적으로 변하는 컨텐츠를 표현하기 위해 이벤트 처리를 하거나 서버와 연결하여 데이터를 가지고 오는 등의 역할을 하는 프로그램 언어
  - HTML 문서에서 이벤트를 서버 연결 없이 동적으로 처리할 수 있는 기술

### BE 중심 개발과 FE 중심 개발

- BE 중심 개발

  - 전통적인 웹 개발 모델, 서버에서 모든걸 담당함
  - Java Servelt/JSP는 가장 인기있는 BE 기술
    <img src="../../images/2022-10-25-webservice/222423.png" style="box-sizing: border-box; width: 100%; display: block;
           margin-left: auto;
           margin-right: auto;">
    1. Client 요청은 URL 형태로 수행
    2. Servelt/Java or Node.js 등을 사용해 DB 연동
    3. JSP에서 HTML과 데이터를 조합하여 페이지 구성
    4. Client에 HTML 형태의 응답 전달

- BE 중심 개발 장점

  - 서비스 연동에 필요한 다양한 서버 환경에 대응 가능(SSR)
  - SEO 최적하 유리
  - 기술이 안정적/검증됨
  - 기존에 개발된 시스템이 많고 Legacy System<sup>_낡은 시스템_</sup>은 오랫동안 유지됨

- BE 중심 개발 단점

  - Mobile Network의 속도가 느리며 많은 비용을 지불해야함
  - 서버에 화면 갱신을 요청할 경우 모든 데이터가 다시 전송되어야함<sup>모바일에 부적합</sup>
  - REST API와 클라우드 인프라가 보편화 되면서 기존에 대규모로 서버를 구축하는 모놀리식 아키텍처 방식보다는 소규모 서버를 연동하는 MSA(Micro Service Architecture) 방식 확산

- FE 중심 개발

  - Client에서 HTML을 가지고 있거나, Server에서 HTML만 받아오고, 서버로부터 화면 구성에 필요한 Data만 js로 받아와 Data와 화면을 조합해 보여줌(CSR)
    <img src="../../images/2022-10-25-webservice/223122.png" style="box-sizing: border-box; width: 100%; display: block;
             margin-left: auto;
             margin-right: auto;">

  1. Client 요청은 URI<sup>_화면, 데이터를 가져오기 위한 서버 프로그램과 파라미터를 포함하는 개념, URL보다 큰 개념_</sup> 형태로 수행
  2. Java Servelt, JAX-RS, Node.js 등을 통해 DB와 연동
  3. Client에 Json 형태의 응답 전달
  4. Client는 전달받은 Json Data를 HTML과 조합(rendering)

- FE 중심 개발의 장점
  - 필요한 부분의 데이터 갱신이 가능하기 때문에 서버로부터 매번 갱신된 HTML를 받아 올 필요가 없음
  - 실시간 데이터 갱신이 자유로움
  - SPA, PWA등의 구현에 적용 가능
- FE 중심 개발의 단점
  - FE 중심이더라도 Data 제공을 위한 Server는 필요
  - Data 제공 서버는 주로 REST API로 개발되기 때문에 BE 작업은 당연히 존재
  - SEO 최적화를 위해 SSR를 접목하기도 함

# CHAP.02 자바 웹 개발을 위한 환경 구축

## 1. 자바 웹 개발환경의 개요

### 자바란?

- 자바의 특징

  - 간결하면서고 강력한 객체지향 프로그래밍 언어
  - 플랫폼 독립적
  - 많은 오픈소스 라이브러리를 이용한 생산성 향상, 유지보수 비용 절감
  - GUI/하드웨어 프로그램 개발에는 비교적 부적합
  - Modern Laguage보다 간결함이 떨어지고 복잡함

- JVM(Java Virtual Machine)

  - 자바의 가장 큰 특징을 타나내는 개념
  - 물리적인 기계 장치가 아닌 가상의 세계
    - 소프트웨어로 구현된 하드웨어를 의미함
    - 임베디드 개발을 위해 고안된 아이디어였음
  - 플랫폼 독립적
    <img src="../../images/2022-10-25-webservice/223912.png" style="box-sizing: border-box; width: 100%; display: block;
               margin-left: auto;
               margin-right: auto;">
  - 자바 소스는 컴파일 이후 byte 코드가 생성되고, JVM은 byte 코드를 해석하여 운영체제에서 실행 할 수 있도록 번역하는 역할 담당

- 자바 플랫폼
  - API와 JVM으로 구성되며 특정 자바 프로그램이 실행되는 환경을 의미함
  - Java SE, EE, ME, Card, TV 등이 있음
  - 실행 환경에 따라 API 구성등이 달라짐
    - 일반적으로 SE 설치
    - 대규모 개발 EE 추가 설치

### 자바 웹 개발환경

- 자바 웹 개발을 위한 환경

  - 자바 실행 환경(JRE - JDK로 설치)
  - 통합 개발 환경(IDE - 컴파일러, 디버거, API, 편집기 등 포함)
  - 서블릿 컨테이너
  - DB

---

|         요소         | 프로그램 명 |                                                        목적                                                        |
| :------------------: | :---------: | :----------------------------------------------------------------------------------------------------------------: |
|    자바 개발 도구    |     JDK     |                            JSP는 HTML내에 자바 코드를 작성하기 때문에 JDK가 반드시 설치                            |
|    통합 개발 환경    |   Eclipse   |                                                 대표적인 자바 IDE                                                  |
| 서블릿 컨테이너(WAS) | 아파치 톰캣 | 웹 어플리케이션이 서버에서 실행되기 위해서는 서블릿 컨테이너가 설치되어야 함<br> 톰캣, Jetty, Undertow 등이 사용됨 |
|          DB          |    MySQL    |                                                   ER데이터베이스                                                   |

- JDK(Java Development Kit)

  - JDK는 JRE와 컴파일러등을 포함
  - IDE를 비롯해 톰캣과 같이 자바로 만들어진 서버 실행을 위해서도 JDK가 필요

- IDE(Integrated Development Environment)

  - 이클립스 등

- 서블릿 컨테이너(Web Application Server, WAS)
  - 웹 어플리케이션을 구동하는 서버
  - 서버가 WAS로 동작하려면 서블릿 컨테이너 필요
  - 실제 서비스 시스템을 구축할때는 정적 콘텐츠 서비스를 위한 웹 서버와, WAS를 병행해 운영하며 설정을 통해 상호 연동되는 구조
  - 톰캣, jetty, undertow 등이 있음
  - 서블릿 컨테이너 구조
    <img src="../../images/2022-10-25-webservice/225729.png" style="box-sizing: border-box; width: 100%; display: block;
                 margin-left: auto;
                 margin-right: auto;">

## 2. 클라우드 개발환경과 배포 프로세스

### 클라우드 개발 환경

- 클라우드 인프라 협업을 위한 기본적인 배경지식과 경험이 요구됨
- 개발환경이 복잡해짐 -> 결과물을 서버로 배포하는 과정, 절차도 복잡해짐
- 클라우드 개발 환경에 대한 어느정도의 이해 필요

### 배포 프로세스

- 배포(Deployment)

  - 배치라고도 하며, 개발된 결과물을 실제 사용자에게 전달하는 작업
  - Web
    - 운영 서버로 소스코드를 복사하고 WAS에 등록하는 과정
  - Mobile
    - 앱 스토어에 앱을 업로드 하는 절차 등
  - 그 외
    - FTP서버, 홈페이지 or github 등을 통해 버전을 Release하는 작업 등

- Web Application 배포

  - 이클립스에서 JSP or Servelt을 실행하면 현재 프로젝트 구조를 .war로 패키징 후 톰캣에 전달해 실행하는 구조
  - 운영 서버에 설치하는 경우, .war 파일을 서버에 옮기는 과정 필요
  - 비효율 적이며 불편한점이 많음
    - DebOps라 불리는 개발, 운영 통합 인프라 스트럭처 사용

- DevOps

  - 개발(Development)과 운영(Operation)의 합성어
  - 규모가 큰 소프트웨어의 신속한 개발과 지속적인 유지보수, 배포 등의 운영을 병행하기 위한 노력
  - 빈번한 서비스 배포, 웹 기반의 서비스 형태가 필수 요소로 자리잡음
  - 이러한 새로운 전략을 위해 개발팀과 운영팀이 병합되어
    - 개발, 테스트 배포, 운영에 이르는 어플리케이션 생명주기 개발

- DevOps 장점

  - 빠른 속도
    - 계획부터 배포까지 작업 속도를 빠르고 효율적으로 제공
    - 시장변화에 빠르게 대처하고 비지니스 성과 창출 가능
  - 빠른 배포
    - 새로운 기능의 릴리즈와 오류 수정 속도가 빨라져 고객의 요구에 빠르게 대응
  - 안정성
    - 지속적 통합, 지속적 전달, 모니터링, 로깅을 통해 안정적인 서비스 품질 제공
  - 확장 가능성
    - 복잡하거나 변화하는 시스템을 효율적으로 관리
  - 협업 강화
    - 개발 팀과 운영 팀의 긴밀한 협력, 책임 공유 -> 비효율을 줄이고 시간 절약

- DevOps의 구성요소
  - SCM(Source Code Management)
    - 팀 단위의 소스코드 버전 관리; git, SVN등의 tool 사용
  - CI(Continuous Integration)
    - build와 test 통합; Jenkins, Travis CI 등의 도구 사용
  - CD(Continuous Deploy)
    - 지속적인 배포, 원하는 시점에 바로 배포가 가능한 설정 필요
  - CM(Configuration Management)
    - 서비스 설정의 통합 관리, 운영서버 OS, 라이브러리 버전, 컴파일 등 포함

# CHAP.03 웹 프로그래밍 기초

## 1. HTML 기초

### HTML이란

- HTML(Hyper Text Markup Language)

  - 모든 웹 컨텐츠는 HTML로 구성
  - 웹 브라우저는 서버로부터 전달받은 HTML 문서의 구조를 해석해 화면에 구성
  - Client인 웹 브라우저가 서버로부터 수신하는 데이터의 구조

- Markup Language

  - 텍스트에 의미를 부여하기 위해 문서에 주석을 다는 표현 시스템

  ```html
  <h1>hello</h1>
  ```

  - XML(eXtensiblie Markup Language)
    - HTML보다 범용적으로 사용할 수 있는 마크업 언어
    - HTML: 사용할 수 있는 tag의 종류가 정해져 잇음
    - XML: 자신만의 규격 정의 가능

### HTML의 기본 용어

- Tag
  - 특징
    - 모든 테그가 종료 테그를 가지지 않음
    - 테그이름은 대소문자 구별 X
    - 테그에 추가적인 정보 부여를 위하여 속성 사용
- 속성
  - 테그에 추가 정보 제공
  - 사용 할 수 있는 속성이 정해져 있음
- Tag Body

  - 시작 태그와 종료 태그 사이에 위치하는 내용(컨텐츠)
  - 대체로 텍스트 or 다른 테그도 가능
  - 테그사이에 부모-자식 관계가 정해져 있는 경우 규칙에 적합하게 사용해야 함

- 시맨틱 태그(Semantic Tag)

  - HTML5에서 도입된 개념으로, 특별한 의미를 가지는 태그
  - 문서의 구조를 정의하는데 주로 사용
  - Semantic Tag 그 자체로는 역할이나 디자인에 영향이 없지만, 코드의 가독성을 높여줌
  - 부모-자식 관계에 상관 없이 다른 태그를 자유롭게 사용 할 수 있음

    | 태그이름 |             설명             |
    | :------: | :--------------------------: |
    |  header  |             헤더             |
    |   nav    |          네비게이션          |
    |  aside   |    사이드에 위치하는 공간    |
    | section  | 여러 중심 내용르 감싸는 공간 |
    | article  |  글자가 많이 들어가는 부분   |
    |  footer  |             푸터             |

### HTML의 기본 테그

- HyperLink Tag

  - 사용자의 선택에 따라 다른 웹 페이지나 웹 페이지 내부의 특정 위치로 이동할 때 사용
  - `<a></a>`테그<sup>_Anchor을 의미_</sup>사용
  - href 속성
    - hyper Reference를 의미
    - 어떤 페이지로 이동할 지 웹 브라우저에게 알려줌
      - 절대경로
      - 상대경로
      - 아이디경로
      - 메일경로

- Table Tag

  - 계층 구조로 작성

  | 테그이름 |      설명      |
  | :------: | :------------: |
  |  table   |       표       |
  |  thead   |   표의 머리    |
  |  tbody   |   표의 본문    |
  |  tfoot   |   표의 꼬리    |
  |    tr    |    표의 행     |
  |    th    | 표의 제목 요소 |
  |    td    | 표의 일반 요소 |

- Form Tag

  - 입력 양식을 위한 테그
  - 속성

    | 속성 이름 |              속성               |
    | :-------: | :-----------------------------: |
    |  action   | 전송 위치(data를 전달할 목적지) |
    |  method   |            전송 방식            |

  - 데이터 전송 방식

    | 전송 방식 |                      설명                      |
    | :-------: | :--------------------------------------------: |
    |    GET    |        주소에 데이터를 직접 입력해 전달        |
    |   POST    | 별도의 방법을 사용해 데이터를 해당 주소로 전달 |

  - 입력 양식 태그

    | 테그 이름 |  속성  |            설명            |
    | :-------: | :----: | :------------------------: |
    |   form    | 안보임 | 입력 양식의 시작과 끝 표시 |
    |    ---    |

## 2. CSS 기초

### CSS란?

- CSS
  - 글씨의 색상, 크기, 이미지크기 배치방법 등 웹 문서의 디자인 요소 담당
- 장점

  - 디자인만 바꾸거나, 디자인을 냅두고 웹 문서 내용 변경에 용이
  - 반응형 디자인 구현 가능
  - 동일한 문서 구조더라도 서로 다른 css 테마 적용 가능

- 동작 원리
  - css 구문은 선택자, 선언부로 구성됨
- 적용 방법
  - 인라인 스타일
  - 내장 스타일
  - 외장 스타일

## 3. Js 기초

### Js란?

- Javascript
  - 정적인 HTML 컨텐츠에서 사용자와 상호작용하여 동적으로 변경하는 부분 담당
  - 객체(Object) 기반의 스크립트 언어로 기본적으로는 웹 브라우저에서 해셕되는 인터프리터 언어
  - Node.js와 같은 프레임워크를 사용하면 서버 프로그래밍에도 사용 가능
- 특징
  - 동적, 타입 명시 필요 없는 인터프리터 언어
  - 객체지향 + 함수형 프로그래밍 가능
  - HTML의 내용, 속성, 스타일을 변경 가능
  - Event 처리 및 사용자와 상호작용 가능
  - 서버와 실시간 통신 기능 제공

### Event 처리와 DOM 개념

- 이벤트 발생과 처리
  - HTML에서 발생하는 특정 상황으로 이벤트 발생은 보통 Js 코드와 연계됨
- 이벤트 처리 방법

  - HTML 테그에 이벤트 처리 속성 이용
  - DOM 요소에 속성 추가
  - DOM 요소에 addEventListener() 콜백 함수 등록

- DOM(Document Object Model)
  - js는 DOM을 통해 HTML 요소에 접근
  - DOM은 텍스트로 된 HTMl 문서를 프로그램적으로 처리할 수 있도록 문서 구조 전체를 객체화 한 것
- DOM 체계
  - 테그
    - Element node 로 정의됨
  - 속성
    - Attribute node가 됨
  - Tag Body의 text는 다시 text node가 될 수 있음
    - 경우에 따라서는 innerHTML 속성으로 표현하는 것도 가능
  - 이러한 DOM 체계에 따라 모든 HTML 은 브라우저에 의해 로딩될때 각각의 요소가 '부모-자식' 관계를 가지며 객체 트리 구조로 재구성됨

# CHAP.04 자바 웹 개발 개요

## 1. 서블릿과 JSP

### 서블릿이란?

- 서블릿
  - 자바 기반의 웹 프로그램 개발을 위해 만들어진 기술
  - 서블릿 클래스로부터 만들어진 객체
  - 자바로 작성된 프로그램을 실행할 수 있는 서버 소프트웨어(톰캣)를 통해 관리
  - 서블릿을 실행하기 위해서는 서블릿 컨테이너(톰캣)가 필요
  - 일반적으로 WAS라 불림

> 웹 서버의 주된 기능은 웹 페이지를 클라이언트로 전달하는 것<br> 주로 그림, CSS, 자바스크립트를 포함한 HTML 문서가 클라이언트로 전달됨<br> 하지만 이런 웹 서버의 경우 이미 존재하는 즉, 정적인 페이지를 제공하는 역할만 할 수 있음<br> 실시간으로 작성된 페이지를 제공하거나 서버 상에 데이터를 저장하는 것은 웹 서버가 할 수 없는 일<br> 때문에 이런 역할을 해 주는 다른 도우미 애플리케이션이 필요함

> 이런 도우미 애플리케이션을 사용하면 웹 서버는 도우미 애플리케이션에 요청을 전달하기만 함<br> 그러면 도우미 애플리케이션은 요청받은 작업을 수행하거나 정적인 페이지를 만들어서 웹서버로 전달함<br> 웹서버는 이를 다시 클라이언트로 전해줌 <br><br>자바에서는 이 역할을 해 주는 것이 서블릿임

> 그러나 서블릿은 도움이 필요함<br> 요청이 들어오면 누군가 요청을 처리할 새로운 스레드를 만들어야 하고 서블릿에서 필요한 메서드를 호출해야 함<br> 또 파라미터로 받은 값을 넘겨주기도 해야 함<br> 이 역할을 하는 것이 바로 서블릿 컨테이너


> 웹서버가 사용자로부터 서블릿에 대한 요청을 받으면 컨테이너에게 이 요청을 넘김<br>요청을 넘겨받은 컨테이너는 서블릿을 찾아 필요한 메소드를 호출함

>컨테이너는 사용자로부터 요청을 받을 때 마다 요청을 처리할 스레드를 생성함<br> 그리고 그 스레드에서 필요한 서블릿 메소드를 호출하게 되는 것임<br> 그렇다고 해서 스레드를 무제한으로 생성하기만 하는 것은 아니고 컨테이너 내부에 스레드풀(Thread pool)에 스레드를 저장하고, 필요할 때 꺼내 사용하게 됨

> 여기서 유의해야 할 점은 요청이 올 때 마다 스레드를 새로 생성하거나 스레드 풀에서 꺼내 쓰는 것이지 서블릿 인스턴스를 새로 생성하는 것은 아니라는 것임




**서블릿 클래스**<sup>_(인스턴스화)_</sup> --> **서블릿 객체**<sup>_(초기화)_</sup> --> **서블릿**
{: .notice--warning}

- 기본적인 웹의 요청과 응답 과정
  <img src="../../images/2022-10-25-webservice/055249.png" style="box-sizing: border-box; width: 100%; display: block;
    margin-left: auto;
    margin-right: auto;">

  1. 클라이언트가 웹 서버에 요청을 보냄
  2. 웹 서버는 요청을 수행한 뒤
  3. 웹 브라우저에게 응답함

- 서블릿의 역할
<img src="../../images/2022-10-25-webservice/055259.png" style="box-sizing: border-box; width: 100%; display: block;
    margin-left: auto;
    margin-right: auto;">

  1. 클라이언트가 웹 서버에세 요청을 보냄
  2. 웹 서버는 서블릿을 호출함
  3. 서블릿은 DB로부터 데이터를 얻음
  4. 서블릿은 받은 데이터와 HTML을 같이 웹 서버에 보냄
  5. 웹 서버는 서블릿에게 받은 데이터와 HTML을 클라이언트에게 응답함

- 서블릿 클래스를 작성할 때 지켜야 할 규칙 세가지
  - javax.servlet.http.HttpServlet 클래스를 상속하여 작성
  - doGet or doPost method 안에 웹 브라우저로 요청이 왔을 때 해야할 일을 기술
  - HTML 문서는 doGet, doPost 메서드의 두 번째 파라미터를 이용하여 출력

Servlet Interface --- *implement* ---> GenericServlet Class --- *extends* ---> HttpServlet Class --- *extends* ---> 우리가 작성한 서블릿 클래스
{: .notice--warning}

### JSP란?

- JSP(Java Server Pages)
  - 서블릿에서 HTML과 데이터 결합을 손쉽게 처리하기 위해 만들어짐
  - HTMl에서 자바 코드를 사용할 수 있는 구조
    - JSP는 HTML에 Java 코드를 더한 형태로 구성
    - 컨테이너에 의해 서블릿 형태의 자바 코드로 변환 후 컴파일 되어 컨테이너에 적재

```java
out.println("<h2>"+username+"</h2>")
```

after

```jsp
<html>
  ...
  <h2><%= username %></h2>
  ...
</html>
```

  - Jsp 문법 자체는 page 지시어 선언 부븐을 제외하면 HTMl파일 구조와 동일
  - css, js 사용 형식 또한 동일함

- Jsp의 문제점
  - 데이터를 반복해서 출력하거나, 조건을 체크해야 하는 경우 단순 HTML 문법만 가지고는 처리할 수 없기 때문에 java 코드 필요
  
  ```jsp
  <table>
    <% for(Member m : mlist) { %>
      <tr>
        <td><%=m.name %></td>
        <td><%=m.email %></td>
      </tr>
    <% } %>
  </table>
  ```

  - HTML 부분은 서블릿 컨테이너에 의해 out.println()을 사용하는 형태로 변환
  - Jsp는 HTML이 아니라 서블릿 형태의 프로그램으로 변환

- JSTL/EL
  - jsp의 구조적 뭄ㄴ제를 해결하기 위해 커스텀 태그를 기반으로 하는 JSTL(JSP Standard Tag Library) 및 EL(Expression Language) 도임
  - JSP보다 훨씬 구조적이고 가독성도 높음
  - MVC 패턴과 함께 서블릿과 결합되어 자바 웹 개발의 정석으로 자리잡음

```js
<table>
  <c:forEach var="m" items="${mlist}">
    <tr>
      <td>${m.name}</td>
      <td>${m.name}</td>
    </tr>
  </c:forEach>
</table>
```

- JSP 대체 솔루션
  - JSP의 주된 대체 솔루션인 스프링 프레임워크와 Vue.js에서 사용하는 형식
    1. 스프링 프레임워크의 기본 템플릿 엔진인 '타임리프'를 사용하는 경우
       - JSP와 EL부분은 동일하지만, JSTL 대신 HTML 태그에 data-*- 속성을 사용하기 때문에 서버 실행 없이도 디자인 확인 가능
      
      ```jsp
      <table>
        <tr data-th-each="m : %{mlist}">
          <td data-th-text="${m.name}">Hong</td>
          <td data-th-text="${m.email}">test@tests.com</td>
        </tr>
      </table>
      ```
  - JSP의 주된 대체 솔루션인 Vue.js에서 사용하는 형식


# CHAP. 05 서블릿의 이해

## 1. 서블릿의 개요

### 서블릿의 동작 과정

- 서블릿 코드 작성, 컨테이너 등록, 클라이언트 요청에 따른 과정
- 서블릿 개발과 동작 과정
  <img src="../../images/2022-10-25-webservice/043249.png" style="box-sizing: border-box; width: 100%; display: block;
                 margin-left: auto;
                 margin-right: auto;">


### 서블릿의 장단점

- 서블릿의 장점
  - 자바를 기반으로 하므로 자바 API 사용 가능
  - 운영체제나 하드웨어의 영향을 받지 않으므로, 한번 개발된 어플리케이션은 다양한 서버 환경에서 실행 가능
  - 웹 어플리케이션에서 효율적인 자료 공유 방법 제공
  - 다양한 오픈소스 라이브러리와 개발도구를 활용 가능
- 서블릿의 단점
  - HTML 응답을 위해서 문자열 결합을 사용하여 출력하는 불편함
  - 서블릿에서 HTML을 포함할 경우 화면 수정이 어려움
  - HTML 폼 Form 데이터 처리 불편
  - 기본적으로 단일 요청과 응답을 처리하는 구조
    - 다양한 경로의 URL 접근을 하나의 클래스에서 처리하기 어려움

## 2. 서블릿 클래스의 구조와 생명 주기

### 서블릿 클래스의 구조

- 서블릿 자체는 자바로 구현하지만, 서블릿 컨테이너에 해당 클래스가 서블릿음을 알려야 함
  - 어떤 URL 접근에 실행해야 하는지 등록하는 과정 필요

- 서블릿 2.0
  - 웹 어플리케이션 구조를 컨테이너에 알려주기 위한 배포 서술자 web.xml에 등록

- 서블릿 3.0
  - 별도의 web.xml 작성 없이 자바 @을 이용함

- javax.servlet.Servlet 인터페이스를 구현한 추상 클래스인 GenericServlet 클래스와 HttpServlet 클래스 중 하나를 상속하여 구현

- HTTP 프로트콜에 최적화되어 있는 HttpServlet 클래스 상속하는 것이 좋음
- Httpservlet을 상속받아 doGet(), doPost() 메서드를 오버라이딩

```java
public class HelloWorldServlet extends HttpServlet{
  public doGet(HttpServletRequest request, HttpServletResponse reponse) throws ServletException, IOException{
    ...
  }

  public doPost(HttpServletRequest request, HttpServletResponse reponse) throws ServletException, IOException{
    doGet(request, response);
  }
}
```
request와 response는 session, application과 함께 JSP의 내장 객체이기도 하며 속성 관리 기능을 이용해 컨트롤러와 뷰 페이지 간 데이터 전달 등의 목적에도 사용되므로 잘 알아두어야 한다
{: .notice--warning}

- `HttpServletRequest`
  - HTTP 프로토콜의 request 정보를 서블릿에 전달하기 위한 목적으로 사용
    - 헤더 정보, 파라미터, 쿠키, URL, URI 등의 정보를 읽어 들이는 메서드와 HTTP Body의 Stream을 읽어드리는 메서드 포함
  - 서블릿 컨테이너에서 생성되고 클라이언트 요청이 `doGet(), doPost()`로 전달 될 때, 인자로 함께 전달됨
  - 서블릿에서 클라이언트와 연결해 처리할 작업은 `HttpServletRequest`를 통하여 정보 전달

- `HttpServeltResponcse`
  - `HttpServletRequest`와 마찬가지로 클라이언트와 연결된 처리를 위해 사용
  - 클라이언트에서 서버로 전달하는 것과 관련된 것이 아니라 서버에서 클라이언트로 전달하려는 목적을 위한 기능으로 구성
  - 서블릿 컨테이너는 요청 클라이언트에 응답을 보내기 위한 `HttpServeltResponse`객체를 생성하여 서블릿에 전달
  - 서블릿은 해당 객체를 이용하여 content type, 응답 코드, 응답 메시지 등을 전송

- 서블릿 정보 등록
  - 서블리 클래스만으로는 톰캣에서 실행이 불가능하기 때문에 web.xml이나 어노테이션으로 서블릿임을 선언하고 url과 맵핑
  - 서블릿 3.0에서 자바 어노테이션을 이용한 등록

  ```java
  @WebServlet(desription="Hello World Servlet", urlPatterns="/hello")
  public class HelloWorldServlet extends HttpServelt{
    ...
  }
  ```

- 두 수를 더하여 출력하는 프로그램
  - 입력 폼을 가진 html 파일 만들기
  
  ```js
  <form action=/jspbook/adder>
    first: <input type=text name=num1>
    second: <input type=text name=num2>
    <input type=submit value="더하기">
  </form>
  ```

- `doGet()` 메소드에 소스코드 작성

```java
String str1 = request.getParameter("num1");
String str2 = request.getParameter("num2");

response.setContentType("text/html; charset=utf-8");

PrintWriter out = response.getWriter();

int num1 = Integer.parseInt(str1);
int num2 = Integer.parseInt(str2);

```

### 서블릿의 생명 주기
- 서블릿의 생명 주기
  - 객체의 생성에서 종료에 이르는 과정
  <img src="../../images/2022-10-25-webservice/043406.png" style="box-sizing: border-box; width: 100%; display: block;
                 margin-left: auto;
                 margin-right: auto;">


- 서블릿 초기화: `init()` 메서드
  - 클라이언트 요청이 들어오면 컨테이너는 해당 서블릿이 메모리에 있는지 확인
  - 메모리에 없을 경우에는 서블릿을 메모리에 적재해야 함
    - 이때, 서블릿의 `init()`메서드가 호출되며 초기화 작업 수행
  - `init()`메서드는 처음 한번만 실행되므로, 해당 서블릿에서 공통적으로 사용하는 작업이 있다면 `init()`메서드를 오버라이딩 하여 구현
  - 실행 중 서블릿이 변경되는 경후, 기존 서블릿은 종료되고 다시 시작되면서 `init()` 메서드가 다시 호출됨

- 요청/응답: `service()` 메서드
  - `init()` 메서드는 최초에 한번만 수행되고 이후 요청은 스레드로 실행되며 `service()`메서드를 통해 `doGet()`이나 `doPost()`로 분기
  - 이때 파라미터로 `HttpServeltRequest`와 `HttpSerrvletResponse` 클래스 타입인 `request`와 `response` 객체 제공
    - `request`: 사용자 요청 처리
    - `response`: 응답 처리

- 서블릿 종료: `destry()` 메서드
  - 컨테이너로부터 서블릿 종료 요청이 있을때 호출
  - `init()`과 마찬가지로 한번만 실행되며, 서블릿이 종료되면서 정리해야할 작업이 있을 때는 `destroy()`메서드를 오버라이딩 하여 구현

## 3. 페이지 이동과 정보 공유

### 페이지 이동
- 데이터를 포함하지 않은 경우
  - 사용자 요청 처리 후, 별도의 데이터를 포함하지 않는다면 헤당 페이지로 바로 **리디렉션**<sup>*초기에 요청된 URL이 아닌 다른 URL을 방문자에게 제공하는 행위*</sup> 가능
  - 세션에 데이터를 저장한 경우라면, 세션이 유효한 동안 모든 페이지에서 세션 정보를 참조 가능하여 리디렉션을 통해서 데이터 공유 가능
  - JSP, 서블릿 모두 `response.sendRedirect()`를 사용 가능
  ```java
  response.sendRedirect("main.jsp");
  ```
- 데이터를 포함하는 경우
  - 데이터를 포함하여 이동한다면 `request` 속성으로 데이터를 넣은 후 원하는 페이지로 `forwarding` 함
  - 데이터 활용 목적에 따라 `session`이나 `application`을 사용할 수 도 있으며 여러 데이터를 포함하는 것도 가능함
  - JSP로 구현할 경우
  ```jsp
  <% 
    request.setAttribute("member",m);
    pageContext.forwared("userInfo.jsp");
  %>
  ```
  - 서블릿으로 구현할 경우
  ```java
  doGet(...){
    ...
    request.setAttribute("member",m);
    RequestDispathcer dispatcher = request.getRequestDispatcher("userInfo.jsp");
    dispatcher.forward(request,response);
  }
  ```
  - 스프링 프레임워크로 구현할 경우
  ```java
  @GetMapping("info")
  public String getMemberInfo(int id, Model model){
    ...
    model.addAttribute('member',m);

    return "userInfo";
  }
  ```
- 결과를 받는 Addresult.jsp

  ```jsp
  <% 
    int num1 = (Inteer)request.getAttribute("num1");
    ...
    <%=num1 %>
  %>
  ```

### 정보 공유

- URL rewriting
  - HTTP의 Query String을 이용하는 방식으로 URL에 파라미터를 추가하여 서버로 요청하는 방식
  - 정보 유지를 위해 파라미터를 매 페이지마다 확인하고, 계속 추가해주어야 한다
    - 복잡한 정보 유지는 어려움
    ```url
    https://kim-song-jun.github.io/shop/productionInfo?user=hong&p1=0112&p2=12012&sel=11786
    ```

- 쿠키(Cookie)
  - 클라이언트에 저장되는 작은 정보를 의미함
  - 서버의 요청에 의해 브라우저가 저장하게 되며, 서버가 요청할 때 제공하는 방식 사용
- 쿠키의 특징
  - 파일로 클라이언트의 컴퓨터에 저장되며, 보안상 문제가 있을 수 있다
  - 광고, 기타 목적으로 사용자의 이용 행태 추적에 이용 될 수 있음
  - 재방문 확인 등의 용도로 많이 사용됨
  - `name=value`형식 사용
    - 유효기간, 유청 경로, 도메인 지정 등 부가 속성 포함
  - 주로 자바스크립트를 통해 처리하지만, `HttpOnly` 설정으로 서버에서만 사용할 수 있도록 설정 가능

- 쿠키의 동작 과정
  <img src="../../images/2022-10-25-webservice/045923.png" style="box-sizing: border-box; width: 100%; display: block;
                 margin-left: auto;
                 margin-right: auto;">

- 쿠키 저장 방법
  ```java
  response.addCookie(new Cookie("name","hong"));
  ```

- 세션(Session)
  - 클라이언트가 웹 어클리케잉션 서버에 접속 할 때 서버쪽에 생성되는 공간으로, 내부적으로는 세션 아이디를 통해 참조
  - 브라우저
    - 서버에 접속할 때 발급받은 세션 아이디 기억
  - 서버
    - 해당 세션 아이디로 할당된 영역에 접근
- 세션의 특징
  - 세션 유효 시간이나 브라우저 종료 전까지 유지되므로, 서로 다른 페이지에서도 정보 공유 가능
  - 로그인 유지, 장바구니, 컨트롤러 구현 등에서 다양하게 사용
  - 사용자마자 생성되는 공간
  - 동시에 많은 사용자가 세션을 통해 대량의 데이터를 관리한다면, 충분한 메모리를 비롯한 세션 관리 대책 필요

### 속성 관리

- Scope Object
  - 컨테이너에서 서블릿 관리를 위해 자동으로 생성한 객체 중 속성 관리 기능을 제공하며 특정 범위 동안 유지되는 객체
  - 각각의 객체는 관리 목적에 따라 별도의 메서드로 구현된 기능을 가지고 있고, 공통적으로 `key-value` 형태의 Map 자료구조를 가짐
    - 페이지간, 사용자 간 데이터 공유 가능
  - JSP 역시 서블릿으로 변환되기 때문에 동일한 객체 포함
    - useBean 액션의 scope에 사용되는 page, request, seesion, application
  - 각각 생성, 소멸 시기가 정해져 있고 서로 다른 JSP, 서블릿 간의 데이터 전달이나 공유를 위한 용도로 사용

- Scope Object 종류와 특징

  | Scope<br>Object |             클레스             |              생성               |                    소멸                     |                          범위                          |
  | :-------------: | :----------------------------: | :-----------------------------: | :-----------------------------------------: | :----------------------------------------------------: |
  |     Request     |  javax.servelt.ServletRequest  |     현재페이지가 요청될 때      |           다른페이지로 이동할 때            | 현재페이지, 포워딩의 경우<br>다음 페이지까지 참조 가능 |
  |     Session     | javax.servlet.http.HttpSession | 클라이언트가 서버에 접속 할 때  | 일정시간이 지나거나<br>브라우저가 종료될 때 | 동일 클라이언트에 대해<br> 다른 페이지에서도 참조 가능 |
  | Web<br>Context  |  java.servlet.ServletContext   | 웹 어플리케이션이<br> 시작될 때 |      웹 어플리케이션이<br> 종료 될 때       |             모든 클라이언트에서 참조 가능              |

- Request와 Session을 주로 활용하며 모든 사용자가 공유하거나 웹 어플리케이션 전체에서 참조가 필요한 경우 `Web Context` 사용
- 속성을 저장하고 참조하기 위해 다음 메서드가 공통으로 제공됨
```java
setAttribute(String name, Object o) // 속성 저장
Object getAttribute(String name) // 속성 참조
```
- 사용할 때 `Object` 타입에서 원하는 타입으로 캐스팅 후 사용


# Chap. 06 JSP의 기초 다지기

## 1. JSP의 개요

### JSP 특징과 구성 요소

- JSP 특징
  - HTML 페이지에 자바 코드를 직접 사용
  - 서블릿 컨테이너에 의해 관리되는 내장 객체의 생명 주기를 이용하여 페이지간 속성 관리
  - 커스텀 태그 기술을 이용하여 코드를 태그 화(action, JSTL 등)
  - EL(Expression Language) 을 통해 데이터 표현

- JSP의 구성 요소
  - 지시어(Standard Directives)
  - 액선(Standard Action)
  - 템플릿 데이터(Template Data)
  - 스크립트 요소(Script Element)
  - 커스텀 태그(Custom Tag)와 EL(Expression Language)

### JSP의 동작 과정

- JSP가 서블릿으로 컴파일 되고 실행되는 과정
  <img src="../../images/2022-10-25-webservice/051307.png" style="box-sizing: border-box; width: 100%; display: block;
                 margin-left: auto;
                 margin-right: auto;">

### JSP의 장단점

- JSP의 장점
  - HTML 파일에 자바 기술을 거의 무한대로 사용할 수 있으며 비교적 쉽게 프로그래밍 가능
  - 커스텀 태그 라이브러리 등 확장 태그 구조 사용 가능
  - 서블릿으로 변환되어 실행되므로 서블릿 기술의 장점을 모두 가짐
  - MVC 패턴, 스프링 프레임워크 등 잘 설계된 구조를 적용할 수 있어 개발 생산성 향상 및 성능 보장
  - 모든 개발이 서버에서 이루어지므로 개발의 집중화를 이용한 효율성

- JSP의 단점
  - 화면 구송요소를 변경하면 JSP -> 자바 -> 클래스 -> 서블릿 실행 과정을 거침
    - 개발 과정에서 사소한 UI 변경일지라도 매번 확인 시간소요
  - 개발자와 디자이너 간 역할 분담에 제약 있음
  - JSP파일의 화면 디자인 확인에도 반드시 서블릿 컨테이너의 실행 필요

## 2. JSP의 지시어

### 지시어란?

- 지시어(Diretives)
  - JSP 파일의 속성을 기술하는 요소
  - 웹 브라우저로 부터 요청 처리가 아닌 JSP 컨테이너에 해당 페이지를 서블릿 클래스로 변환할 때 필요한 정보 기술
  - 지시어는 크게 3개로 나누고 각각의 속성이 다름
    1. page
    2. include
    3. taglib
  
  - 지시어의 기본 형식
  `<%@ 지시어 속성="값" %>`

### page 지시어

- page 지시어
  - 현재 JSP 페이지를 컨테이너에서 처리(서블릿으로 변환)하는데 필요한 각종 속성ㄱ ㅣ술
  - 소스코드 맨 앞에 위치하며, JSP파일을 생성할 때 자동으로 생성
  - page 지시어의 구문과 사용 형식
  ```js
  <%@ 
    page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*" errorPage="error.jsp" 
  %> 
  ```
  - contentType: 현재 페이지의 파일 형식 지정
    - 클라이언트 요청에 응답 할 때 전달하는 HTTP 헤더 정보가 됨

### include 지시어

- include 지시어
  - 다른 파일을 포함하기 위한 지시어
  - 사용된 위치에 특정 파일(html, jsp)을 불러옴
  - 컨테이너는 포함된 파일을 하나로 처리하며, 자바 소스를 생성한 뒤 서블릿으로 컴파일함
    - include에 사용된 파일의 내용을 모두 포함한 하나의 서블릿 코드로 생성
  - 포함되는 파일의 경우 해당 파일을 직접 요청해서 실행하는 것이 아니라면, 개별 구성요소를 갖출 필요는 없음(page 지시어, HTML 기본 태그 구성요소 등)
  - include 지시어는 원하는 위치에 자유롭게 사용 가능
  - include 지시어 사용 형식
  `<%@ include file="파일 경로" %>`

### taglib 지시어

- taglib 지시어
  - JSP의 태그 확장 메커니즘인 커스텀 테그를 사용하기 위한 지시어
  - action을 사용할 때 필요하며, 액션이 속한 라이브러리 설치 필요
  - taglib 지시어의 구문과 사용 형식
  `<%@ taglib (url="라이브러리 경로" or tagdir="테그 파일 경로") prefix="테그 접두어" %>

- 테그 파일로 커스텀 테그를 구현한 예

```jsp
<%@ taglib tagdir="/WEB-INF/tags" prefix="m" %>
...
<h2><m:printData/></h2>
```

- JSTL 사용의 예

```jsp
<%@ taglib prefix="c" uri="http://~~~~" %>
...
<c:set value="10">
```

## 3. 템플릿 데이터와 스크립트 요소

### 스크립트 요소

- 스크립트 요소
  - JSP는 HTML과 자바코드를 섞어 사용할 수 있는데, 이때 사용되는 자바 코드를 의미함
  - 스크립트 요소
    - 선언 태그: `<%! %>`
    - 표현 태그: `<%= %>`
    - 스크립틀릿 테그: `<% %>`

- 선언(Declaration) 테그
  - JSP에서는 일반 자바 코드와 달리 멤버 변수나 메소드 선언은 기본적으로 불가능
    - 멤버 변수나 메서드 선언이 필요하다면, 사용할 수는 있으나 권장X
    - JSP 페이지로부터 변환된 서블릿 클래스는 기본적으로 '멀티-쓰레드' 모델로 작동하고<br>작동하는 서블릿 클래스 안에는 인스턴스 변수를 선언하면 안됨

- 선언한 변수, 메서드는 JSP 페이지로부터 변환된 서블릿 클래스의 멤버가 되므로, <br> `final, public, private, protected, static`등의 키워드를 붙이는 것도 가능

- 표현(Expression) 테그
  - 웹 브라우저를 통해 클라이언트에 전달될(HTML 응답에 포함 될) 자바 표현식 포함
  - `out.print()`의 인자로 적합한 모든 자바 코드
  - 사칙연산, 메서드 호출, 변수 값 출력 등에 사용
    - 단, 웹 서버에서 연산 수행 후 그 결과만 웹 브라우저로 전송
  - EL로 대채 할 수 있음
  
  ```jsp
  <h2>
    <%= member.getUserName() %>
  </h2>
  <%- java.time.LocalDatetime.now() %>
  ```

- 스크립틀릿(Scriptlet) 테그
  - 모든 자바 코드의 사용 가능
    - 단, `_jspService()` 메서드 내에 포함되는 것을 고려해야 함
  - 한 스크립틀릿 안에서 선언한 변수를 그 뒤에 나오는 다른 스크립틀릿 안에 사용 가능
  - 서블릿 코드로 변환 할 때 모든 HTML은 `out.write()`형태로 변경
  - HTML과 스크립틀릿을 중간에 섞어 사용하는 것도 가능
  - MVC 패턴 적용과 JSTL + EL 로 대체할 수 있음

### 주석
- 주석을 기술하는 방법
  - JSP 페이지의 HTML 코드 부분
  ```html
  <!-- 주석입니다 화면안에서는 안보이고 소스보기에서(F12)는 보임 -->
  ```
  - JSP 고유의 주석 사용
  ```jsp
  <%-- 주석입니다. 화면과 소스보기에서 보이지 않음 --%>
  ```
  - JSP 페이지의 스크립팅 요소 안
  ```java
  /* 자바 문법을 따르는 주석 사용 화면안에서 보임 */
  ```

## 4. JSP 페이지의 내장 변수

### JSP 페이지의 내장 변수

- JSP페이지의 내장 변수(implicit variable)
  - JSP 페이지 안에 선언을 하지 않고도 사용할 수 있는 변수
- `request` 내장 변수는 서블릿 클래스의 `doGet, doPost`메서드의 첫번째 파라미터와 동일한 역할
- `out` 내장 변수는서블릿 클래스에서 `getWriter`를 호출해서 얻은 `PrintWirter` 객체와 동일한 역할 수행
- 사용할 수 있는 이유는 웹 컨테이너가 JSP 페이지를 서블릿 클래스로 변환 할 때 자동으로 내장변수를 선언하기 때문


# 나올만한 코드 정리

```jsp
<!-- form 태그 -->

<!-- normal 한 form -->

<form action="jspbook/adder">
  first: <input type="text" name="num1">
  second: <input type="text" name="num2">
  <input type="sumbit" value="더하기">
</form>

<!-- select, option 사용 -->
<from method="post" action="calc.jsp">
  <input type="text" name="n1" size="10">
  <select name="op">
    <option>+</option>
    <option>-</option>
    <option>*</option>
    <option>/</option>
  </select>
  <input type="text" name="n2" size="10">
  <input type="submit" value="실행">
</from>


<!-- page 지시어-->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*" errorPage="error.jsp" %>

<!-- include 지시어 -->
<%@ include file="파일 경로" %>

<!-- taglib 지시어 -->
<%@ taglib tagdir="경로" prefix="m" %>
<m:printData/>

<!--선언과 참조-->

<%!
  String[] members = {"1","2"};
  int num1 = 10;

  int calc(int num2){
    return num1 + num2;
  }
%>

<!--스크립트릿을 활용하여 메소드 호출-->

<%= calc(10) %>


<!-- 반복문 사용 -->

<%
  for (String name : members){ %> 
    <li><%= name%></li>
  <% 
  }
%>

<!-- swith case 사용 -->
<%@ page language="java" contentType="text/html; charset="UTF-8" pageEncoding="UTF-8" %>

<%
  int n1 = Integer.parseInt(request.getParameter("n1"));

  swith(request.getParameter("op")){
    case "+": result = n1+n2; break;
  }
%>

<!--페이지 이동-->
<!--데이터 포함-->
<% 
  request.setAttribute("member",m);
  pageContext.forwared("userInfo.jsp");
%>

<!--데이터 미포함-->

<% response.sendRedirect("main.jsp"); %> 

<!--세션 생성-->

<% 
  session.setAttribute("userID", user_id);
%>

<!--세션 정보-->
<%
  Enumeration en = session.getAttributeNames();
  String value = session.getAttribute(name).toString();
%>

<!--세션 삭제-->

<% 
  session.removeAttribute("memberID");
  session.invalidate();
%>

<!--세션 유효시간 설정-->

<%
  int time = session.getMaxInactiveInterval() / 60;
  session.setMaxInactiveInterval(60*60);

  long last_time = session.getLastAccessedTime();
  long start_time = seesion.getCreationTime();\
  long used_time = (last_time - start_time) /60000;
%>


<!-- 쿠키 생성-->
<%
  Cookie cookie = new Cookie("memberID","admin");
  response.addCookie(cookie);
%>

<!-- 쿠키 정보-->

<%
  Coocke[] cookies = request.getCookies();
  cookies[i].getName();
  cookies[i].getValue();
%>

<!--쿠키 삭제-->
<%
  cookie.setMaxAge(0);
  response.addCookie(cookie);
%>
```

```java

// make servlet

@WebServelt(description ="hello servlet", urlpatterns={"/hello"})
public class HelloServlet extends HttpsServlet{
  ...
  protected void doGet(...){
  };
  protected void doPost(...);
}


// doGet Method

protected void doGet(HttpServlet request, HttpServletResponse response) throws ServletException, IOException{

  String str1 = request.getParameter("num1");
  String str2 = request.getParameter("num2");

  response.setContentType("text/html; charset=UTF-8");

  PrintWriter out = response.getWriter();

  try{
    out.println("<html></html>");
    out.append("<title></title>")
  }

}

// init method overriding

public void init() throws ServletException{
  try{
    logFile = new PrintWriter(new FileWriter("path"));
  }catch(e){
    throw new ServletException(e);
  }
}

// destory method overriding

public void destroy(){
  if(logFile != null)
    logFile.close();
}

// page 이동
// 데이터를 포함하는 경우
// by servlet

doGet(...){
  ...
  request.setAttribute("member",m);
  RequestDispatcher dispatcher = request.getRequestDispatcher("userInfo.jsp");
  dispatcher.forward(request,response);
}

// by spring framwork
@GetMapping("info")
public String getMemberInfo(int id, Model model){
  ...
  model.addAttribute("member", m);
  return "userInfo";
}

```