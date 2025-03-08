---
title: Docker Compose란?
date: 2025-03-09 00:12:00 +09:00
categories: [common_topic]
tags: [common]
# image: 
#   path:
---


Docker Compose는 여러 컨테이너로 구성된 애플리케이션을 하나의 YAML 파일로 정의하고, 이를 통해 전체 서비스를 동시에 관리할 수 있게 해주는 도구입니다. 이 가이드는 Docker Compose의 기본 개념, 구성 요소, 사용법, 그리고 실습 예제와 고급 주제까지 단계별로 자세히 설명합니다.

---

## 1. Docker Compose 개요

### 1.1 Docker Compose란?

- **정의:**
Docker Compose는 docker-compose.yml 파일을 사용하여 여러 컨테이너(서비스), 네트워크, 볼륨 등을 하나의 그룹으로 정의하고, 단일 명령어로 전체 애플리케이션을 빌드, 실행, 중지할 수 있게 하는 도구입니다.
- **목적 및 필요성:**
복잡한 멀티 컨테이너 애플리케이션을 관리할 때, 각각의 컨테이너를 개별적으로 실행하는 대신 하나의 파일로 모든 구성을 정의함으로써 일관된 환경을 제공하고, 배포 및 운영을 단순화할 수 있습니다.
- **장점:**
    - **간편한 정의:** 모든 컨테이너 구성을 하나의 YAML 파일에 명시.
    - **일괄 실행:** 단일 명령어로 모든 서비스를 동시에 실행, 중지, 재시작 가능.
    - **환경 재현성:** 개발, 테스트, 운영 등 어디서나 동일한 환경을 구축할 수 있음.

### 1.2 Docker Compose와 다른 도구와의 차이점

- **Docker CLI:**
단일 컨테이너 관리에 주로 사용되며, 여러 컨테이너를 동시에 제어하기에는 번거로움.
- **Docker Swarm:**
클러스터링 및 오케스트레이션 도구로 여러 호스트에 걸친 컨테이너 관리를 지원하는 반면, Compose는 주로 단일 호스트나 개발 환경에서의 멀티 컨테이너 구성을 다룹니다.

---

## 2. Docker Compose의 아키텍처 및 구성요소

### 2.1 Compose 파일 (docker-compose.yml)의 기본 구조

- **파일 구조:**
YAML 형식의 파일로, 버전(version) 정보와 함께 여러 서비스(services), 네트워크(networks), 볼륨(volumes) 등을 정의합니다.

**예시:**

```yaml
version: "3.9"  # Compose 파일 버전

services:       # 서비스(컨테이너)들을 정의하는 섹션
  web:         # 'web' 서비스 정의 (예: Node.js 웹 애플리케이션)
    build:    # Dockerfile을 통해 이미지를 빌드할 경우 사용
      context: ./web  # Dockerfile이 위치한 디렉토리 지정
    ports:
      - "3000:3000"  # 호스트 포트 3000과 컨테이너 포트 3000 연결
    environment:
      - NODE_ENV=production  # 환경 변수 설정
    depends_on:
      - redis  # 이 서비스는 'redis' 서비스가 먼저 실행되어야 함
    volumes:
      - ./web:/app  # 호스트의 ./web 디렉토리를 컨테이너의 /app에 마운트

  redis:       # 'redis' 서비스 정의 (데이터 캐싱 또는 메시지 브로커)
    image: redis:alpine  # Redis의 경량 Alpine 이미지 사용
    ports:
      - "6379:6379"      # 기본 Redis 포트 6379 매핑

# 필요에 따라 볼륨을 정의할 수 있음 (데이터 영속성 등)
volumes:
  data:  # 예시 볼륨 (주석 처리되어 있으며, 사용 시 활성화)
```

### 2.2 주요 구성 요소 설명

- **서비스(services):**
각각의 컨테이너로 실행될 애플리케이션을 정의합니다. 서비스마다 이미지, 빌드 옵션, 포트 매핑, 환경 변수, 볼륨 등이 설정됩니다.
- **네트워크(networks):**
기본적으로 모든 서비스는 동일한 네트워크에 연결되어 서로 통신할 수 있습니다. 필요에 따라 사용자 정의 네트워크를 생성할 수 있습니다.
- **볼륨(volumes):**
컨테이너의 데이터 영속성을 위해 호스트와 컨테이너 간의 디렉토리(파일 시스템)를 공유할 때 사용합니다.

### 2.3 멀티 컨테이너 애플리케이션 관리

Docker Compose는 여러 서비스를 하나의 파일로 정의하고, 단일 명령어(`docker-compose up`)로 전체 애플리케이션을 실행하므로, 복잡한 애플리케이션 환경을 쉽게 재현하고 관리할 수 있습니다.

---

## 3. Docker Compose 사용법

### 3.1 설치 및 기본 설정

- **설치:**
Docker Desktop에는 기본 포함되어 있으며, 리눅스에서는 별도 설치가 필요합니다.
- **기본 설정:**
프로젝트 루트 디렉토리에 docker-compose.yml 파일을 생성하여 애플리케이션 구성을 정의합니다.

### 3.2 주요 명령어

- **docker-compose up:**
모든 서비스를 빌드(필요 시)하고 백그라운드에서 실행합니다.
    
    ```bash
    docker-compose up -d
    ```
    
- **docker-compose down:**
실행 중인 컨테이너, 네트워크, 볼륨 등을 정리하며 중지합니다.
    
    ```bash
    docker-compose down
    ```
    
- **docker-compose ps:**
실행 중인 컨테이너 목록을 확인합니다.
    
    ```bash
    docker-compose ps
    ```
    
- **docker-compose logs:**
서비스의 로그를 확인하여 문제를 디버깅합니다.
    
    ```bash
    docker-compose logs -f
    ```
    
- **docker-compose scale:**
특정 서비스를 복제하여 스케일링합니다.
    
    ```bash
    docker-compose up --scale app=3
    ```
    

### 3.3 Compose 파일 작성 및 서비스 정의 예제

아래 예제는 웹 애플리케이션(Node.js)과 Redis를 함께 구성하는 docker-compose.yml 파일입니다.

```yaml
version: "3.9"  # Compose 파일 버전

services:
  # Node.js 웹 애플리케이션 서비스
  web:
    build:
      context: ./web   # 'web' 디렉토리 내 Dockerfile 사용
    ports:
      - "3000:3000"    # 호스트와 컨테이너의 3000 포트 매핑
    environment:
      - NODE_ENV=production  # 실행 환경을 production으로 설정
    depends_on:
      - redis          # 'redis' 서비스가 먼저 실행되어야 함
    volumes:
      - ./web:/app     # 호스트의 ./web 디렉토리를 컨테이너의 /app에 마운트

  # Redis 데이터베이스 서비스
  redis:
    image: redis:alpine  # Redis 경량 Alpine 이미지 사용
    ports:
      - "6379:6379"      # 기본 Redis 포트 매핑

# 필요에 따라 볼륨을 추가할 수 있습니다.
volumes:
  data:
```

---

## 4. Docker Compose 실습 및 고급 주제

### 4.1 간단한 웹 애플리케이션 예제

- **설명:**
위의 예제와 같이 웹 애플리케이션과 Redis를 구성하여, `docker-compose up -d` 명령어로 전체 서비스를 실행하고, `docker-compose logs`로 로그를 확인할 수 있습니다.

### 4.2 데이터베이스 연동 애플리케이션

- **예시:**
웹 애플리케이션과 MySQL, Redis 등 여러 서비스를 하나의 Compose 파일로 정의하여, 데이터베이스 연동 애플리케이션을 구성할 수 있습니다.
    
    ```yaml
    version: "3.9"
    services:
      web:
        build: ./web
        ports:
          - "80:80"
        depends_on:
          - db
          - redis
      db:
        image: mysql:5.7
        environment:
          MYSQL_ROOT_PASSWORD: example
        volumes:
          - db-data:/var/lib/mysql
      redis:
        image: redis:alpine
    volumes:
      db-data:
    ```
    

### 4.3 고급 주제: 환경 변수, 확장 구문, 오버라이드 전략

- **환경 변수 사용:**
.env 파일을 사용해 외부에서 환경 변수를 주입할 수 있으며, Compose 파일 내에서는 `${VARIABLE_NAME}` 형식으로 참조합니다.
- **오버라이드 전략:**
docker-compose.override.yml 파일을 사용하여 기본 Compose 파일을 확장하거나, 환경별로 다른 설정을 적용할 수 있습니다.
- **CI/CD 연동:**
Jenkins, GitLab CI 등과 통합하여, 코드 변경 시 자동으로 docker-compose up/down, 빌드, 테스트 과정을 수행할 수 있습니다.

---

## 5. 문제 해결 및 모범 사례

### 5.1 자주 발생하는 문제와 해결 방법

- **포트 충돌:**
각 서비스의 포트 매핑을 신중하게 설정합니다.
- **환경 변수 누락:**
.env 파일 및 Compose 파일의 변수 설정을 꼼꼼하게 관리합니다.
- **의존성 문제:**
depends_on 옵션과 서비스 시작 순서를 확인합니다.

### 5.2 로그 확인 및 디버깅

- **로그 확인:**`docker-compose logs -f` 명령어로 각 서비스의 로그를 실시간으로 확인합니다.
- **디버깅:**`docker-compose run --rm <service>` 명령어를 통해 대화형 모드로 특정 서비스를 실행하며 문제를 해결합니다.

### 5.3 보안 및 네트워크 모범 사례

- **네트워크 분리:**
민감한 서비스는 별도의 네트워크를 구성하여 외부 접근을 제한합니다.
- **볼륨 권한 관리:**
데이터 볼륨 사용 시 파일 권한 및 소유권을 적절히 설정합니다.