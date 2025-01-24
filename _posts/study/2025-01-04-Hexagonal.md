---
title: 헥사고날 아키텍처란?
date: 2025-01-04 00:14:00 +09:00
categories: [common_topic]
tags: [common]
image: 
---

# **헥사고날 아키텍처?**

## 헥사고날 아키텍처란?

![image.png](/images/2025/1-5-Hexagonal.png)

> 헥사고날 아키텍처(Hexagonal Architecture)는 2005년 **앨리스터 코버번(Alistair Cockburn)**이 제안한 소프트웨어 아키텍처 스타일로, **포트와 어댑터 아키텍처(Ports and Adapters Architecture)**로도 불립니다.

- 애플리케이션의 **핵심 비즈니스 로직(도메인)**을 외부 환경(UI, 데이터베이스, API 등)과 철저히 분리하는 것을 목표로 함.
- **구성 요소:**
  - **포트(Ports):** 애플리케이션의 인터페이스 역할.
  - **어댑터(Adapters):** 외부 환경과 포트를 연결하는 구현체.
  - **애플리케이션 코어:** 도메인 모델과 비즈니스 로직의 중심.

## 왜 헥사고날 아키텍처를 사용해야 하는가?

1. **유연한 구조:**
   - 외부 환경(Database, API 등)을 교체하거나 확장하기 쉬움.
   - 특정 기술 스택에 종속되지 않음.
2. **테스트 용이성:**
   - 비즈니스 로직을 독립적으로 테스트 가능.
   - 모의(Mock) 포트를 사용해 외부 환경 없이 테스트 작성 가능.
3. **의존성 역전 원칙(DIP) 적용:**
   - 외부 환경이 애플리케이션 코어에 의존하도록 설계되어 핵심 로직이 외부 기술에 영향을 받지 않음.
4. **유지보수성 향상:**
   - 모듈화된 구조로 변경이 필요한 영역만 수정 가능.
   - 코드 가독성과 유지보수 비용 절감.

# **헥사고날 아키텍처의 구성 요소**

## 포트 (Ports)

- **정의:**
  포트는 애플리케이션과 외부 환경 간의 **인터페이스 역할**을 담당합니다.
  포트는 **입력 포트(Input Port)**와 **출력 포트(Output Port)**로 나뉩니다.
- **입력 포트:**
  - 외부로부터의 요청(사용자, API, 메시지 등)을 처리하기 위한 인터페이스.
  - 예: 서비스 인터페이스, 애플리케이션 기능 정의.
- **출력 포트:**
  - 애플리케이션이 외부 시스템(데이터베이스, 외부 API 등)과 통신하기 위해 제공하는 인터페이스.
  - 예: 리포지토리 인터페이스, 메시지 큐 인터페이스.
- **역할:**
  - 외부 환경에 의존하지 않고 애플리케이션 코어와 외부 환경 간의 경계를 정의.
  - 구현 세부 사항은 포트 인터페이스 뒤에 숨김.

## 어댑터 (Adapters)

- **정의:**
  어댑터는 포트에서 정의한 인터페이스를 구현하여 **외부 환경과의 연결을 담당**합니다.
- **유형:**
  - **입력 어댑터(Input Adapters):**
    - 외부의 입력을 받아 애플리케이션으로 전달.
    - 예: REST Controller, CLI(Command Line Interface).
  - **출력 어댑터(Output Adapters):**
    - 애플리케이션에서 외부로 데이터를 전달.
    - 예: 데이터베이스 리포지토리, 메시지 브로커, 외부 API 클라이언트.
- **역할:**
  - 외부 환경과 포트를 연결하여 애플리케이션 코어가 기술 스택이나 구현 세부 사항에 의존하지 않도록 보장.
  - 구현 세부 사항을 독립적으로 관리 가능.

## 애플리케이션 코어

- **정의:**
  애플리케이션의 핵심 비즈니스 로직과 도메인 모델이 포함된 영역으로, 외부 환경에 대한 의존성이 없음.
- **구성:**
  - **도메인 모델:**
    - 비즈니스 로직과 엔티티 정의.
    - 예: 주문, 사용자, 제품과 같은 애플리케이션의 핵심 데이터 모델.
  - **애플리케이션 서비스:**
    - 도메인 모델과 포트 사이에서 비즈니스 로직을 처리.
    - 입력 포트를 구현하여 외부 요청을 처리.
- **역할:**
  - 애플리케이션의 독립성과 유지보수성을 보장.
  - 외부 환경의 변경 없이 비즈니스 로직을 변경 가능.

# **헥사고날 아키텍처의 장단점**

## 장점

- **유연성**
  - 외부 환경(데이터베이스, API, UI 등)을 쉽게 교체하거나 확장 가능.
  - 특정 기술 스택에 종속되지 않음.
- **테스트 용이성**
  - 비즈니스 로직을 독립적으로 테스트 가능.
  - 모의(Mock) 포트를 활용해 외부 시스템 없이 단위 테스트 작성 가능.
- **의존성 역전**
  - 핵심 비즈니스 로직(애플리케이션 코어)이 외부 환경에 의존하지 않음.
  - 외부 환경이 코어에 의존하도록 설계하여 변경 시 영향 최소화.
- **유지보수성**
  - 포트와 어댑터로 기능이 모듈화되어 있어 특정 부분만 수정 가능.
  - 코드의 가독성과 유지보수성 향상.
- **확장성**
  - 새로운 기능 추가 시 기존 코드에 영향을 최소화하면서 쉽게 확장 가능.

## 단점

- **복잡성 증가**
  - 포트와 어댑터를 정의하고 관리해야 하므로 설계와 구현이 복잡해질 수 있음.
  - 간단한 프로젝트에서는 불필요하게 느껴질 수 있음.
- **학습 곡선**
  - 헥사고날 아키텍처를 처음 접하는 개발자들에게는 이해와 활용이 어려울 수 있음.
  - 특히 작은 팀이나 경험이 적은 팀에서 도입 시 난이도가 높음.
- **초기 투자 비용**
  - 초기 설계와 구현에 시간과 자원이 많이 소요됨.
  - 작은 프로젝트에서는 과도하게 느껴질 수 있음.
- **추가 코드 작성 필요**
  - 포트와 어댑터 인터페이스, 각 계층의 코드 작성으로 인해 코드베이스가 증가.
  - 유지보수와 코드 관리 부담이 커질 수 있음.
- **적용의 복잡성**
  - 아키텍처를 잘못 구현하거나 관리하면 오히려 유지보수성과 효율성이 떨어질 위험 있음.

# **Spring Boot에서의 헥사고날 아키텍처 적용**

## Spring Boot와의 적합성

1. **의존성 관리:**

   Spring Boot는 **의존성 주입(DI)**과 **IoC(Inversion of Control)**을 기본적으로 지원하여 헥사고날 아키텍처의 핵심 원칙인 **의존성 역전 원칙(DIP)**을 쉽게 구현 가능.

2. **계층 분리:**
   - Spring Boot는 기존의 MVC 패턴이나 다층 구조와 헥사고날 아키텍처를 자연스럽게 결합할 수 있음.
   - **Controller**는 입력 어댑터, **Service**는 도메인 계층, **Repository**는 출력 어댑터로 활용 가능.
3. **생태계 지원:**
   - Spring Boot는 REST API, 데이터베이스 연동, 메시지 브로커 등 다양한 외부 시스템과의 통합을 위한 강력한 도구와 라이브러리를 제공하여 어댑터 구현을 쉽게 할 수 있음.

## 포트와 어댑터 설계

- **포트 (Ports):**
  - Spring에서 **인터페이스**로 정의하며, 입력 포트와 출력 포트를 나눔.
  - **입력 포트:** 애플리케이션의 API(Service Layer)를 정의.
  - **출력 포트:** 외부 시스템과 통신하기 위한 인터페이스(예: 리포지토리 인터페이스).
- **어댑터 (Adapters):**
  - 포트 인터페이스를 구현하여 실제 동작을 수행.
  - **입력 어댑터:** REST Controller, CLI, GraphQL 등.
  - **출력 어댑터:** JPA Repository, 메시지 브로커, 외부 API 클라이언트 등.
- **애플리케이션 코어:**
  - 도메인 모델과 비즈니스 로직을 포함하며, 포트 인터페이스를 통해 외부와 통신.
  - 코어는 외부 기술에 의존하지 않고, 순수한 자바 코드로 설계됨.

## 간단한 코드 예제

### 1. 포트 설계

```java
// 입력 포트 인터페이스
public interface UserService {
    UserDto getUserById(Long id);
}

// 출력 포트 인터페이스
public interface UserRepository {
    Optional<User> findById(Long id);
}
```

### 2. 도메인 서비스 (애플리케이션 코어)

```java
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDto getUserById(Long id) {
        return userRepository.findById(id)
                .map(user -> new UserDto(user.getId(), user.getName()))
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }
}
```

### 3. 어댑터 설계

입력 어댑터 (Controller)

```java
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }
}
```

출력 어댑터 (JPA Repository)

```java
@Repository
public class JpaUserRepository implements UserRepository {
    private final JpaRepository<User, Long> jpaRepository;

    public JpaUserRepository(JpaRepository<User, Long> jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Optional<User> findById(Long id) {
        return jpaRepository.findById(id);
    }
}
```
