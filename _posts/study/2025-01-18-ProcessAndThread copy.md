---
title: 프로세스와 쓰레드
date: 2025-01-18 00:10:00 +09:00
categories: [common_topic]
tags: [common]
image: 
---

# 들어가며: 프로세스와 쓰레드란?

컴퓨터에서 프로세스(Process)와 쓰레드(Thread)는 매우 중요한 개념입니다.

먼저 프로세스의 정의부터 살펴보겠습니다.

> Process: In computing, a process is the instance of a computer program that is being executed by one or many threads.

이를 우리말로 바꾸면, 프로세스란 "하나 이상의 스레드에 의해 실행되는 컴퓨터 프로그램의 인스턴스"라고 할 수 있습니다.

여기서 "**인스턴스**"는 ‘타입 정의에 기반해 구체적으로 만들어진 실체’를 의미합니다. 즉, 실행 가능한 상태가 된 프로그램을 가리키는 것이죠.

예를 들어, 컴퓨터에 설치된 웹 브라우저는 그저 하드디스크에 저장된 실행 파일(정적인 프로그램)일 뿐입니다. 하지만 이 실행 파일을 실제로 실행하면, 운영체제가 메모리에 로드하고 필요한 자원을 할당해 동적으로 동작하도록 만듭니다. 이렇게 실행 상태가 된 프로그램이 곧 "**프로세스**"입니다.

---

## 스레드(Thread)란?

> Thread: In computer science, a thread of execution is the smallest sequence of programmed instructions that can be managed independently by a scheduler.

위 정의에서 볼 수 있듯이, 스레드는 운영체제의 스케줄러가 독립적으로 관리할 수 있는 "가장 작은 실행 흐름"입니다.

하나의 프로세스 안에서는 여러 개의 스레드가 동시에(혹은 순차적으로) 실행될 수 있으며, 이들은 프로세스가 소유한 자원을 함께 공유합니다.

---

## 프로세스와 스레드의 관계

1. **프로세스는 작업을 수행하는 기본 단위**
   - 프로그램이 실행되면 운영체제는 이를 프로세스로 관리합니다.
   - 프로세스는 메모리, 파일 핸들, 네트워크 소켓 등 각종 자원을 독립적으로 소유합니다.
2. **스레드는 프로세스 내의 실행 흐름**
   - 하나의 프로세스 안에서 여러 스레드가 생성될 수 있으며, 모든 스레드는 같은 메모리 공간(코드, 데이터, 힙)을 공유합니다.
   - 자원을 공유하는 만큼 효율적인 협업이 가능하지만, 동기화 문제가 발생할 위험도 높습니다.

---

## 비유로 이해하기

- **프로세스**: 운영체제가 제공한 “집”
  - 집마다 독립된 전기, 수도 등 자원을 가지고 있습니다.
- **스레드**: 그 집 안에 사는 “사람”
  - 사람들은 같은 집(공간과 자원)을 공유하되, 각자 다른 일을 할 수 있습니다.

---

## 예시

- **프로세스 예시**
  - **Chrome 브라우저**를 실행하면, 하나의 프로세스가 실행됩니다.
  - 이 프로세스는 독립적인 메모리 공간과 자원을 사용합니다.
- **스레드 예시**
  - 하나의 Chrome 브라우저 프로세스 안에서도 여러 탭을 띄울 수 있는데, 각 탭이 서로 다른 스레드로 동작할 수 있습니다.
  - 이들은 동일한 프로세스 자원을 공유하지만, 페이지 로딩·렌더링 등 서로 다른 일을 처리합니다.

---

# 프로세스의 특징

1. **독립적인 실행 단위**
   - 프로세스는 각자 고유한 메모리 공간을 가집니다.
   - 서로 다른 프로세스끼리는 직접 자원을 공유하지 않으며, 필요하면 **IPC(Inter-Process Communication)** 같은 별도 통신 방식을 사용합니다.
2. **자원 관리 단위**
   - 운영체제는 프로세스마다 CPU 시간, 메모리, 파일 핸들, 네트워크 연결 등을 할당합니다.
   - 프로세스가 종료되면 모든 자원은 운영체제로 되돌아갑니다.
3. **상태 변화**
   - 프로세스는 실행되는 동안 여러 가지 상태를 거칩니다.
     - **New(생성):** 프로세스가 생성되고 실행 대기 상태로 등록됨
     - **Ready(준비):** 실행 대기 상태
     - **Running(실행):** CPU에서 명령어를 실행 중
     - **Waiting(대기):** 특정 이벤트나 자원을 기다리는 상태
     - **Terminated(종료):** 실행이 완료되거나 강제 종료된 상태
4. **멀티프로세스 환경**
   - 여러 프로세스가 동시에 실행되며, 운영체제는 **컨텍스트 스위칭**을 통해 이를 관리합니다.
   - 서로 독립적이기에 하나의 프로세스 문제가 다른 프로세스에 직접적인 영향을 주지 않아 안정적이지만, 프로세스 간 자원 공유 시 추가 오버헤드가 발생할 수 있습니다.

---

## 프로세스의 메모리 구조

프로세스가 운영체제로부터 할당받은 메모리는 보통 아래와 같이 나누어집니다.

1. **코드(Code) 영역**
   - 프로그램의 명령어가 저장됨
   - 일반적으로 읽기 전용으로 보호
2. **데이터(Data) 영역**
   - 전역 변수와 정적 변수가 저장됨
   - 프로그램 실행 내내 유지
3. **힙(Heap) 영역**
   - 동적 메모리 할당 영역
   - 필요에 따라 할당하고 해제 가능
4. **스택(Stack) 영역**
   - 함수 호출 시 생성되는 지역 변수, 매개변수, 리턴 주소 등이 저장
   - LIFO(Last In, First Out) 구조로, 함수가 호출될 때 쌓이고 반환될 때 사라짐

---

## 운영체제에서의 프로세스 관리

1. **프로세스 생성 및 종료**
   - 새로운 프로세스를 만들 때는 고유한 **PID(프로세스 식별자)**를 부여하고 필요한 자원을 할당합니다.
   - 종료 시에는 사용 중이던 자원을 회수하고 프로세스 정보를 정리합니다.
2. **CPU 스케줄링**
   - 동시에 여러 프로세스가 대기 중이라면, 운영체제는 우선순위 등을 고려해 CPU를 할당합니다.
   - **라운드 로빈, 우선순위 기반, FCFS, SJF** 등 다양한 알고리즘이 존재합니다.
3. **컨텍스트 스위칭**
   - CPU가 현재 실행 중이던 프로세스의 상태(레지스터, 프로그램 카운터 등)를 저장하고, 다음에 실행할 프로세스의 상태를 복원하는 과정을 말합니다.
   - 이 과정은 시간과 자원을 소모하므로, 효율적 스케줄링이 중요합니다.
4. **프로세스 간 통신 (IPC)**
   - 프로세스끼리 데이터를 주고받기 위한 장치입니다.
   - 주로 **메시지 큐, 공유 메모리, 파이프, 소켓** 등이 사용됩니다.
5. **자원 할당 및 회수**
   - 프로세스 실행 중에 필요한 메모리, 파일 핸들, 네트워크 소켓 등을 할당합니다.
   - 프로세스가 종료되면 모든 자원을 반환해 시스템 자원을 안정적으로 유지합니다.

---

# 스레드의 특징

1. **작업 실행 단위**
   - 스레드는 프로세스 내에서 명령어 집합을 따라 작업을 수행합니다.
   - 여러 스레드를 사용하면 병렬로(또는 동시적으로) 작업을 처리할 수 있습니다.
2. **자원 공유**
   - 동일한 프로세스 내 모든 스레드는 코드, 데이터, 힙 영역을 공유합니다.
   - 자원을 공유하기 때문에 데이터 전달은 효율적이지만, 동시에 **동기화(Synchronization)** 문제가 발생할 수 있습니다.
3. **경량 프로세스(Lightweight Process)**
   - 새로운 스레드를 생성하는 데 드는 비용이 프로세스 생성보다 훨씬 적습니다.
   - 스레드 간 컨텍스트 스위칭 비용도 프로세스 간보다 낮습니다.
4. **독립성과 협력**
   - 각 스레드는 독립적으로 실행되지만, 같은 프로세스 안에서 공동 작업을 하기 때문에 협력이 필요합니다.
   - 협력 과정에서 발생하는 자원 경합을 해결하기 위해 **뮤텍스(Mutex), 세마포어(Semaphore)** 등 동기화 기법을 사용합니다.

---

## 스레드의 구조와 역할

1. **스레드 구조**
   - **프로그램 카운터(PC)**: 현재 실행 중인 명령어 위치
   - **레지스터(Registers)**: 연산에 필요한 데이터 저장
   - **스택(Stack)**: 함수 호출 시 사용되는 매개변수, 지역 변수, 리턴 주소 등을 관리 (각 스레드마다 별도)
   - **공유 자원**: 코드, 데이터, 힙은 같은 프로세스 내 다른 스레드와 공유
2. **스레드의 역할**
   - 멀티태스킹과 병렬 처리를 지원해 CPU 활용도를 높입니다.
   - 사용자 인터페이스 반응성을 높이고, 비동기 작업(예: 파일 다운로드, 네트워크 통신)을 효율적으로 처리합니다.

---

## 프로세스 내에서의 스레드 동작

1. **자원 공유**
   - 모든 스레드는 프로세스가 가진 코드, 데이터, 힙 등을 함께 사용합니다.
   - 단, 각 스레드는 자신만의 스택과 PC를 사용해 독립적으로 실행 흐름을 유지합니다.
2. **동시성과 병렬성**
   - **동시성(Concurrency)**: 하나의 CPU에서 스레드가 빠르게 번갈아가며 실행되는 것처럼 보이는 상태
   - **병렬성(Parallelism)**: 멀티코어 CPU를 사용해 여러 스레드가 실제로 동시에 실행되는 상태
3. **컨텍스트 스위칭**
   - 스레드 간 전환이 필요할 때, 현재 스레드의 상태를 저장하고 새 스레드의 상태를 복원하는 과정을 거칩니다.
   - 이때도 오버헤드가 발생하므로 효율적인 스케줄링이 중요합니다.

---

# 프로세스와 스레드의 차이점

## 1. 자원 공유 방식

### 프로세스

- 독립된 메모리 공간(코드, 데이터, 힙, 스택)을 가집니다.
- 다른 프로세스와 자원을 직접 공유하지 않으며, **IPC**(예: 메시지 큐, 파이프, 소켓)로 데이터를 주고받아야 합니다.

### 스레드

- 하나의 프로세스 안에 있는 스레드들은 **코드, 데이터, 힙 영역을 공유**합니다.
- 스택과 레지스터는 각각 따로 관리되므로 실행 흐름은 독립적이나, 자원은 공유되어 효율적입니다.

| 구분      | 프로세스                  | 스레드                                        |
| --------- | ------------------------- | --------------------------------------------- |
| 자원 공유 | 독립 메모리 공간          | 코드/데이터/힙 공유, 스택과 레지스터는 개별적 |
| 통신      | IPC 등 별도 메커니즘 필요 | 동일 프로세스 내에서 직접 접근 가능           |

---

## 2. 생성 및 관리 비용

### 프로세스

- 새로운 프로세스를 생성하려면 운영체제가 별도의 메모리 공간과 자원을 할당해야 하므로 비용이 높습니다.
- 프로세스 간 컨텍스트 스위칭에도 많은 자원이 소모됩니다.

### 스레드

- 같은 프로세스 안에서 추가로 생성되므로, 별도의 메모리 공간을 할당할 필요가 크게 없습니다.
- 스레드 간 컨텍스트 스위칭 비용이 프로세스 간보다 적습니다.

| 구분        | 프로세스            | 스레드              |
| ----------- | ------------------- | ------------------- |
| 생성 비용   | 높음                | 낮음                |
| 스위칭 비용 | 프로세스 전환 시 큼 | 스레드 전환 시 적음 |

---

## 3. 성능과 안정성

### 성능

- **프로세스**: 프로세스 간에는 자원을 공유하지 않아 서로 독립적이지만, 통신(IPC)에 추가 비용이 들 수 있어 느릴 수 있습니다.
- **스레드**: 자원을 공유하므로 통신 비용이 적어 작업 효율이 높고, 멀티코어 환경에서 병렬 처리가 용이합니다.

### 안정성

- **프로세스**: 한 프로세스가 오류로 종료되더라도 다른 프로세스에는 영향을 주지 않습니다.
- **스레드**: 한 스레드가 문제를 일으키면, 같은 프로세스 내 다른 스레드도 영향을 받을 수 있습니다. 공유 자원에 대한 동기화 문제, 데드락 등이 발생할 수 있어 주의가 필요합니다.

| 구분   | 프로세스                                                 | 스레드                                                        |
| ------ | -------------------------------------------------------- | ------------------------------------------------------------- |
| 성능   | 독립성으로 IPC 시 오버헤드 발생, 상대적으로 느릴 수 있음 | 자원 공유로 통신이 빠르고, 멀티코어에서 병렬 처리 가능        |
| 안정성 | 한 프로세스 오류 시 다른 프로세스에는 영향 없음          | 한 스레드 오류 시 전체 프로세스에 영향 가능, 동기화 문제 존재 |

---

# 결론

- **프로세스**
  - 독립적인 실행 환경과 안정성이 중요할 때 사용하기 좋습니다.
  - 예) 서로 다른 사용자 프로그램, 보안이 중요한 서비스 등
- **스레드**
  - 자원을 효율적으로 활용하고 높은 성능을 낼 때 적합합니다.
  - 예) 멀티코어 시스템을 활용한 병렬 처리, 빠른 응답이 필요한 UI 작업 등

상황과 요구사항에 따라 프로세스와 스레드를 적절하게 선택하고 조합해 사용하는 것이 최적의 성능과 안정성을 확보하는 핵심입니다.
