---
title: Dockerfile을 어떻게 작성하고, 이미지를 빌드하는 과정은?
date: 2025-03-09 00:11:00 +09:00
categories: [common_topic]
tags: [common]
# image: 
#   path:
---


Dockerfile은 Docker 이미지를 생성하기 위한 청사진(blueprint)입니다. 이 문서에서는 Dockerfile의 기본 개념, 명령어, 작성 모범 사례, 이미지 빌드 및 최적화 기법을 단계별로 자세히 설명합니다.

---

## 1. Dockerfile의 개요

### 1.1 Dockerfile이란?

- **정의:**
Dockerfile은 텍스트 파일로, Docker 이미지가 어떻게 구성되어야 하는지를 단계별로 명시하는 스크립트입니다.
- **목적:**
애플리케이션 코드와 실행에 필요한 라이브러리, 의존성, 설정 파일 등을 하나의 이미지로 패키징하여 일관된 배포 환경을 제공합니다.
- **이점:**
    - **자동화:** 수동 설치 과정 없이 동일한 이미지를 반복적으로 생성할 수 있습니다.
    - **일관성:** 개발, 테스트, 운영 환경 간의 차이를 크게 줄입니다.
    - **버전 관리:** 코드와 함께 Dockerfile을 관리하여 환경 구성을 쉽게 추적할 수 있습니다.

---

## 2. Dockerfile 기본 구조와 문법

### 2.1 기본 구조

- Dockerfile은 일반 텍스트 파일이며, 각 명령어가 한 줄씩 작성됩니다.
- 모든 Dockerfile은 **FROM** 명령어로 시작하여 베이스 이미지를 지정합니다.

**예시:**

```
# 베이스 이미지로 Ubuntu 20.04 사용
FROM ubuntu:20.04

# 패키지 목록 업데이트 및 nginx 설치
RUN apt-get update && apt-get install -y nginx

# 현재 디렉토리의 모든 파일을 컨테이너의 /app 디렉토리로 복사
COPY . /app

# 컨테이너 시작 시 nginx를 데몬 모드로 실행
CMD ["nginx", "-g", "daemon off;"]
```

### 2.2 주요 명령어 및 설명

- **FROM:**
    - 베이스 이미지를 지정합니다.
    - 모든 Dockerfile은 반드시 FROM 명령어로 시작해야 합니다.
    
    ```
    # Node.js 14 버전의 경량 Alpine 이미지 사용
    FROM node:14-alpine
    ```
    
- **RUN:**
    - 이미지 빌드 중 컨테이너 내부에서 명령어를 실행합니다.
    - 주로 패키지 설치나 설정 파일 편집에 사용됩니다.
    
    ```
    # apt-get 명령어로 패키지 업데이트 후 curl 설치
    RUN apt-get update && apt-get install -y curl
    ```
    
- **COPY / ADD:**
    - **COPY:** 호스트의 파일이나 디렉토리를 이미지 내부로 복사합니다.
    - **ADD:** COPY와 유사하지만, URL에서 파일을 다운로드하거나 압축 파일을 자동으로 풀어주는 기능도 제공합니다.
    
    ```
    # 호스트의 package.json 파일을 컨테이너의 /app 디렉토리로 복사
    COPY package.json /app/
    ```
    
- **ENV:**
    - 환경 변수를 설정합니다.
    
    ```
    # APP_HOME 환경 변수를 /app으로 설정
    ENV APP_HOME=/app
    # 이후 모든 명령어는 /app 디렉토리에서 실행
    WORKDIR $APP_HOME
    ```
    
- **WORKDIR:**
    - 이후 실행되는 명령어들의 기본 작업 디렉토리를 설정합니다.
    
    ```
    # 작업 디렉토리를 /usr/src/app으로 설정
    WORKDIR /usr/src/app
    ```
    
- **EXPOSE:**
    - 컨테이너가 외부에 공개할 포트를 명시합니다.
    
    ```
    # 80 포트를 외부에 공개
    EXPOSE 80
    ```
    
- **CMD:**
    - 컨테이너가 시작될 때 실행할 기본 명령어를 지정합니다.
    - Dockerfile 내에 여러 CMD가 있으면 마지막 CMD가 적용됩니다.
    
    ```
    # 컨테이너 시작 시 "node app.js" 명령어 실행
    CMD ["node", "app.js"]
    ```
    
- **ENTRYPOINT:**
    - 컨테이너 실행 시 반드시 실행되어야 하는 명령어를 설정합니다.
    - CMD와 함께 사용하면 기본 인자값을 추가할 수 있습니다.
    
    ```
    # 컨테이너 시작 시 /usr/bin/myapp을 실행하고, 기본 인자로 "--help"를 전달
    ENTRYPOINT ["/usr/bin/myapp"]
    CMD ["--help"]
    ```
    
- **USER:**
    - 컨테이너 내에서 명령어를 실행할 사용자 계정을 지정합니다.
    
    ```
    # 컨테이너 내에서 appuser 사용자로 실행
    USER appuser
    ```
    

---

## 3. Dockerfile 작성 모범 사례

### 3.1 베이스 이미지 선택

- **리눅스 컨테이너:**
일반적으로 Ubuntu, CentOS, Alpine 등 리눅스 배포판을 사용합니다.
Docker Engine은 리눅스 커널의 네임스페이스와 cgroups 기능에 의존하기 때문에, 리눅스 이미지를 사용하면 라이브러리 및 버전 관리 측면에서 일관된 작업 환경을 제공합니다.
- **윈도우 컨테이너:**
Windows 호스트에서 실행할 경우, `mcr.microsoft.com/windows/nanoserver` 등 Windows 기반 이미지를 사용할 수 있습니다.
- **모드 선택:**
Docker는 리눅스 컨테이너와 윈도우 컨테이너 두 가지 모드로 작동할 수 있습니다.
    - 윈도우나 macOS에서는 Docker Desktop을 통해 내부 경량 리눅스 VM(WSL2, Hyper-V 등)을 사용하여 리눅스 컨테이너를 실행합니다.
    - Windows 컨테이너 모드로 전환하면 리눅스 VM 없이 Windows 커널과 API를 사용해 네이티브하게 컨테이너를 실행할 수 있습니다.

### 3.2 캐시 활용 전략

- **명령어 순서:**
변경이 적은 명령어(예: 패키지 설치)는 Dockerfile 상단에 배치하여 캐시 활용을 극대화합니다.
- **레이어 최적화:**
여러 명령어를 하나의 RUN 명령어로 체이닝하여 불필요한 레이어 생성을 줄입니다.

### 3.3 다중 스테이지 빌드

- **목적:**
빌드 도구나 임시 파일이 최종 이미지에 포함되지 않도록 빌드 단계와 실행 단계를 분리합니다.
- **예시:**
    
    ```
    # 빌드 단계: Go 애플리케이션 컴파일
    FROM golang:1.16-alpine AS builder
    WORKDIR /src
    COPY . .
    RUN go build -o myapp
    
    # 실행 단계: 빌드 결과만 포함하여 경량 이미지 생성
    FROM alpine:latest
    WORKDIR /app
    COPY --from=builder /src/myapp .
    CMD ["./myapp"]
    ```
    

---

## 4. Docker 이미지 빌드 및 최적화 과정

### 4.1 이미지 빌드 과정

- **빌드 명령어:**
Dockerfile이 위치한 디렉토리에서 다음 명령어를 실행합니다.
    
    ```bash
    docker build -t myapp:latest .
    ```
    
- **빌드 단계:**
Docker는 각 명령어를 실행하며 새로운 레이어를 생성합니다. 변경되지 않은 명령어는 캐시를 재사용해 빌드 속도를 높입니다.

### 4.2 이미지 최적화 기법

- **불필요한 파일 제거:**
RUN 명령어를 이용해 임시 파일이나 캐시를 삭제하여 이미지 크기를 줄입니다.
- **다중 스테이지 빌드:**
빌드와 실행 단계를 분리하여 최종 이미지에 빌드 도구나 소스 파일이 포함되지 않도록 합니다.
- **경량 베이스 이미지 사용:**
Alpine과 같은 경량 이미지를 사용하여 최종 이미지 크기를 최소화합니다.

---

## 5. 실습: Dockerfile 작성 및 빌드 예제

### 5.1 예제: Node.js 웹 애플리케이션

```
# Node.js 14 버전의 경량 Alpine 이미지를 베이스로 사용
FROM node:14-alpine

# 컨테이너 내 작업 디렉토리를 /app으로 설정
WORKDIR /app

# package.json 및 package-lock.json을 복사하여 의존성 설치 전 캐시 활용
COPY package*.json ./

# NPM을 사용해 의존성 설치
RUN npm install

# 애플리케이션 코드를 모두 복사
COPY . .

# 컨테이너가 외부에 노출할 포트 설정 (3000 포트)
EXPOSE 3000

# 컨테이너 시작 시 "npm start" 명령어 실행하여 애플리케이션 구동
CMD ["npm", "start"]
```

### 5.2 예제: Python Flask 애플리케이션

```
# Python 3.9 슬림 이미지를 베이스로 사용
FROM python:3.9-slim

# 작업 디렉토리를 /app으로 설정
WORKDIR /app

# requirements.txt 파일을 컨테이너로 복사
COPY requirements.txt .

# pip를 사용해 필요한 Python 패키지 설치 (캐시 사용 안 함)
RUN pip install --no-cache-dir -r requirements.txt

# 나머지 애플리케이션 파일을 모두 복사
COPY . .

# 컨테이너가 외부에 공개할 포트를 5000번으로 설정
EXPOSE 5000

# Flask 애플리케이션을 실행하기 위한 명령어 설정
CMD ["python", "app.py"]
```

### 5.3 예제: 다중 스테이지 빌드 (Go 애플리케이션)

```
# 빌드 단계: Go 언어를 사용하여 애플리케이션을 컴파일
FROM golang:1.16-alpine AS builder
WORKDIR /src
# 모든 소스 코드를 컨테이너로 복사
COPY . .
# 애플리케이션 컴파일: 실행 파일을 "myapp"이라는 이름으로 생성
RUN go build -o myapp

# 실행 단계: 경량 Alpine 이미지를 사용하여 최종 이미지 생성
FROM alpine:latest
WORKDIR /app
# 빌드 단계에서 생성한 실행 파일을 복사
COPY --from=builder /src/myapp .
# 컨테이너 시작 시 실행 파일을 실행
CMD ["./myapp"]
```

### 5.4 빌드 및 실행 절차

- **이미지 빌드:**
Dockerfile이 있는 디렉토리에서 아래 명령어를 실행합니다.
    
    ```bash
    docker build -t myapp:latest .
    ```
    
- **컨테이너 실행:**
아래 명령어로 컨테이너를 백그라운드에서 실행합니다.

브라우저에서 `http://localhost:3000`을 열어 애플리케이션이 정상 동작하는지 확인합니다.
    
    ```bash
    docker run -d -p 3000:3000 myapp:latest
    ```