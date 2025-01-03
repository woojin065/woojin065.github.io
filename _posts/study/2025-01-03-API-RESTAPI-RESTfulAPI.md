---
layout: single
title: "API란? / REST API, RESTful API"
categories: "common_topic"
tags: [common]
toc: true
toc_sticky: true
toc_label: "목차"
---

# 🙄 API란 무엇일까?

> **API (Application Programming Interface)**는 애플리케이션 간의 상호작용을 가능하게 하는 **규칙과 프로토콜의 집합**입니다. API를 통해 하나의 소프트웨어는 다른 소프트웨어의 기능을 호출하거나 데이터를 교환할 수 있습니다. 간단히 말해, **API는 서로 다른 소프트웨어 간의 커뮤니케이션을 위한 인터페이스**라고 할 수 있습니다.

# 🤯 API의 종류!

### 1. **REST API**

- HTTP 기반, URL과 HTTP 메서드(GET, POST 등)로 자원 관리.
- **예시**: GitHub API, Twitter API.

### 2. **SOAP API**

- XML 기반, 높은 보안성과 표준성.
- **예시**: PayPal API, AWS SOAP API.

### 3. **GraphQL API**

- 클라이언트가 필요한 데이터를 정확히 요청, 효율적 데이터 처리.
- **예시**: GitHub GraphQL API, Shopify API.

### 4. **gRPC**

- Google 개발, HTTP/2 기반, 빠르고 경량.
- **예시**: Google Cloud APIs, Netflix.

### 5. **WebSocket API**

- 실시간 양방향 통신.
- **예시**: Binance WebSocket API, Slack API.

### 6. **RPC API**

- 원격에서 함수 호출.
- **예시**: JSON-RPC, XML-RPC.

### 7. **Batch API**

- 여러 요청을 한 번에 처리.
- **예시**: Facebook Batch API, Google Batch API.

### 8. **Streaming API**

- 데이터 실시간 스트리밍 전송.
- **예시**: Twitter Streaming API, YouTube Live API.

# 🥸 REST란?

> **REST (Representational State Transfer)**는 분산 시스템을 위한 아키텍처 스타일로, 2000년 로이 필딩(Roy Fielding)의 박사 논문에서 처음 제안되었습니다. REST는 HTTP 프로토콜을 기반으로 자원을 정의하고, 해당 자원에 대한 상태를 클라이언트와 서버 간에 전달하는 방식입니다.

- **자원(Resource)**: URL(Uniform Resource Locator)로 식별되는 데이터입니다.예: `https://example.com/users/1` (1번 사용자 데이터)
- **자원의 표현(Representation)**: JSON, XML, HTML 등 다양한 포맷으로 데이터가 표현될 수 있습니다.
- **HTTP 메서드**를 통해 자원에 대한 작업을 수행합니다:
  - **GET**: 자원의 조회
  - **POST**: 자원의 생성
  - **PUT**: 자원의 전체 수정
  - **PATCH**: 자원의 부분 수정
  - **DELETE**: 자원의 삭제

# 🤡 REST API란?

> **REST API**는 REST 원칙을 준수하여 설계된 API를 의미합니다. 즉, RESTful 방식으로 클라이언트와 서버 간 데이터를 주고받는 API입니다.

REST API의 주요 특징:

1. **클라이언트-서버 구조**: 클라이언트와 서버는 독립적으로 동작하며, 클라이언트는 요청(Request), 서버는 응답(Response)을 제공합니다.
2. **무상태성(Stateless)**: 각 요청은 독립적이며, 서버는 이전 요청에 대한 정보를 저장하지 않습니다.
3. **캐시 처리 가능**: HTTP 캐시 기능을 활용하여 성능을 최적화할 수 있습니다.
4. **계층화(Layered System)**: 클라이언트는 중간 서버(프록시, 로드 밸런서 등)를 통해 서버에 접근할 수 있습니다.
5. **통일된 인터페이스**: REST API는 일관성 있는 URI와 HTTP 메서드를 사용하여 자원을 관리합니다.

# 😧 REST API의 장점과 단점

### 장점:

1. **유연성**: HTTP 표준을 기반으로 하여 다양한 포맷(JSON, XML 등)을 지원합니다.
2. **확장성**: 클라이언트와 서버의 독립성이 보장되므로 확장이 용이합니다.
3. **캐싱 가능**: HTTP의 캐싱 메커니즘을 활용해 성능을 최적화할 수 있습니다.
4. **범용성**: REST는 표준 HTTP를 사용하므로, 대부분의 시스템과 호환됩니다.

### 단점:

1. **복잡한 데이터 요청**: 매우 복잡한 데이터 요청이나 대량의 데이터를 처리할 때는 비효율적일 수 있습니다.
2. **HTTP 의존성**: REST는 HTTP 프로토콜에 의존하므로 다른 프로토콜을 사용하기 어려울 수 있습니다.
3. **무상태성의 한계**: 무상태성 때문에 클라이언트 요청에 필요한 모든 데이터를 요청마다 포함해야 합니다.

# 🤔 RESTful API란?

> **RESTful API**는 **REST(Representational State Transfer)** 아키텍처 스타일을 충실히 준수하여 설계된 API를 말합니다. RESTful은 REST 원칙에 따라 HTTP 프로토콜을 활용해 데이터를 주고받으며, 자원(Resource)을 중심으로 설계됩니다.

# 🥳 RESTful API의 핵심 개념

### 1. **자원 중심의 URL 설계**

- RESTful API는 모든 것을 **자원**으로 표현합니다.
- 모든 자원은 고유한 URL로 식별됩니다.
- URL은 **명사형**으로 작성하며, 자원을 명확히 나타냅니다.
- **예시**:
  - **사용자 목록**: `GET /users`
  - **특정 사용자**: `GET /users/{id}`
  - **특정 사용자의 게시글**: `GET /users/{id}/posts`

### 2. **HTTP 메서드의 적절한 사용**

RESTful API에서는 HTTP 메서드를 사용하여 자원에 대한 작업을 표현합니다. 이는 요청의 명확성과 일관성을 높이는 데 기여합니다.

- **GET**: 자원의 조회 (읽기 작업).
- **POST**: 새로운 자원의 생성.
- **PUT**: 자원의 전체 수정.
- **PATCH**: 자원의 부분 수정.
- **DELETE**: 자원의 삭제.

### 3. **HTTP 상태 코드 활용**

RESTful API는 HTTP 상태 코드를 활용하여 클라이언트에 요청 결과를 명확히 전달합니다.

- **200 OK**: 요청 성공.
- **201 Created**: 자원 생성 성공.
- **204 No Content**: 요청 성공, 반환 데이터 없음.
- **400 Bad Request**: 잘못된 요청.
- **404 Not Found**: 자원이 없음.
- **500 Internal Server Error**: 서버 오류.

### 4. **HATEOAS (Hypermedia as the Engine of Application State)**

RESTful API는 클라이언트가 동적으로 자원을 탐색할 수 있도록 하이퍼미디어(Hypermedia)를 포함합니다.

즉, 클라이언트가 응답 내의 링크를 통해 다른 관련 자원을 탐색할 수 있습니다.

### 5. **계층적 설계**

RESTful API는 클라이언트와 서버 사이에 프록시, 로드 밸런서 등 계층을 두는 설계를 허용하며, 클라이언트는 서버의 계층적 구조를 인식하지 않습니다.

이로 인해 보안 강화, 로드 분산, 캐싱 등의 이점이 생깁니다.

RESTful API에 대한 설명에서 REST API의 일반적인 특징을 제외하고 RESTful API가 REST의 원칙을 어떻게 구체적으로 구현하는지에 초점을 맞춰 설명하겠습니다.

### 6. **캐싱 지원**

RESTful API는 HTTP 프로토콜의 캐싱 기능을 활용하여 자주 조회되는 데이터를 효율적으로 제공할 수 있습니다. 이를 위해 응답에 적절한 캐싱 헤더를 설정합니다.

### 7. **버전 관리**

RESTful API는 URL이나 헤더를 통해 API의 버전을 관리합니다. 이를 통해 클라이언트와 서버 간의 호환성을 유지하면서 새로운 기능을 추가할 수 있습니다.

# 😇 RESTful API의 장단점

### 장점 :

- **직관적이고 명확한 설계**: HTTP 메서드와 상태 코드의 활용으로 API의 사용법이 명확합니다.
- **확장성**: 새로운 자원이나 기능을 쉽게 추가 가능.
- **클라이언트-서버 독립성**: 서버와 클라이언트가 서로 독립적으로 동작 가능.
- **HATEOAS를 통한 자원 탐색**: 클라이언트가 응답에서 하이퍼링크를 통해 관련 데이터를 동적으로 탐색 가능.

### 단점 :

- **HATEOAS 구현의 어려움**: 대부분의 RESTful API가 HATEOAS를 제대로 구현하지 않음.
- **무상태성의 한계**: 상태를 유지해야 하는 애플리케이션에서는 비효율적일 수 있음.
- **복잡한 관계 데이터 처리**: 복잡한 관계를 표현할 때 여러 요청이 필요.
