---
title: Docker 환경에서 컨테이너끼리 통신하는법?
date: 2025-03-09 00:13:00 +09:00
categories: [common_topic]
tags: [common]
# image: 
#   path:
---

Docker는 다양한 네트워크 드라이버(Bridge, Host, None, Overlay, Macvlan)를 통해 단일 호스트 또는 여러 호스트(멀티 호스트) 환경에서 컨테이너 간 통신을 설정할 수 있습니다. 이를 통해 애플리케이션의 구성 요소 간 통신, 부하 분산, 고가용성, 그리고 확장성을 쉽게 구현할 수 있습니다.

---

## 1. 단일 호스트 환경에서의 네트워킹

단일 호스트에서는 모든 컨테이너가 같은 물리 서버(또는 VM) 내에서 실행되며, Docker 엔진이 제공하는 네트워킹 기능을 사용합니다.

### 1.1 Bridge 네트워크

- **개념:**
    
    Docker가 기본적으로 생성하는 가상 네트워크입니다. 동일한 Bridge 네트워크에 속한 컨테이너는 내부 DNS를 통해 서로 서비스 이름이나 컨테이너 이름으로 통신할 수 있습니다.
    
    기본 Bridge 네트워크는 이름 기반 통신에 제약이 있으므로, 사용자 정의 브리지 네트워크를 생성하는 것이 일반적입니다.
    
- **사용 예시 (명령어):**
    
    ```bash
    # 기본 Bridge 네트워크에서 컨테이너 실행
    docker run -d --name webserver nginx
    docker run -d --name app ubuntu sleep 3600
    ```
    
- **사용 예시 (사용자 정의 브리지 네트워크):**
    
    ```bash
    # 사용자 정의 네트워크 생성
    docker network create my_network
    
    # 생성한 네트워크에 컨테이너 연결
    docker run -d --name webserver --network my_network nginx
    docker run -d --name app --network my_network ubuntu sleep 3600
    ```
    
- **Docker Compose 예시:**
    
    ```yaml
    version: '3'
    services:
      webserver:
        image: nginx
        networks:
          - my_network
    
      app:
        image: ubuntu
        command: sleep 3600
        networks:
          - my_network
    
    networks:
      my_network:
        driver: bridge
    ```
    
    > Docker Compose를 사용하면 사용자 정의 브리지 네트워크가 자동으로 생성되고, 서비스 이름을 통해 내부 DNS가 활성화되어 컨테이너 간 통신이 원활해집니다.
    > 

### 1.2 Host 네트워크

- **개념:**
    
    컨테이너가 별도의 네트워크 격리 없이 호스트의 네트워크 스택을 그대로 사용합니다.
    
    네트워크 성능이 중요한 경우나 포트 매핑 없이 호스트의 포트를 그대로 사용해야 할 때 유용합니다.
    
- **사용 예시:**
    
    ```bash
    docker run --network host -d nginx
    ```
    
    > 위 명령은 컨테이너가 호스트 네트워크 인터페이스를 그대로 사용하므로, 포트 매핑 없이 외부 요청에 바로 반응합니다.
    > 

### 1.3 None 네트워크

- **개념:**
    
    컨테이너가 네트워크 인터페이스 없이 실행되어, 외부와의 통신이 전혀 불가능합니다.
    
- **사용 예시:**
    
    ```bash
    docker run --network none -d ubuntu sleep 3600
    ```
    
    > 네트워크가 필요 없는 작업(예: 내부 데이터 처리 작업)에서 사용합니다.
    > 

---

## 2. 멀티 호스트 환경에서의 네트워킹

멀티 호스트 환경에서는 여러 Docker 호스트 또는 클러스터 내의 컨테이너들을 하나의 논리적 네트워크로 연결해, 서로 통신할 수 있도록 합니다.

### 2.1 Overlay 네트워크

- **개념:**
    
    여러 호스트에 걸쳐 컨테이너들이 하나의 네트워크에서 통신할 수 있도록 지원하는 드라이버입니다. (서비스는 같은 이미지로 만들어진 여러 컨테이너 묶음)
    
    주로 Docker Swarm이나 Kubernetes 같은 클러스터 환경에서 사용됩니다.
    
- **사용 예시 (Docker Swarm 환경):**
    
    ```bash
    # Swarm 초기화 (현재 호스트를 Swarm 매니저로 설정)
    docker swarm init
    
    # Overlay 네트워크 생성 (이름: my_overlay_net)
    docker network create --driver overlay my_overlay_net
    
    # 'web' 서비스 생성: nginx 이미지를 사용, Overlay 네트워크에 연결
    docker service create --name web --network my_overlay_net nginx
    
    # 'app' 서비스 생성: Alpine 이미지를 사용, Overlay 네트워크에서 'web' 서비스와 통신
    docker service create --name app --network my_overlay_net alpine ping web
    ```
    
    > 여기서 ping web 명령은 "app" 서비스의 컨테이너가 내부 DNS를 통해 "web" 서비스의 IP를 확인하고 네트워크 연결 상태를 테스트하는 예시입니다.
    > 

### 2.2 Macvlan 네트워크

- **개념:**
    
    컨테이너에 직접 물리적 네트워크의 IP 주소를 할당하여, 실제 네트워크 장비처럼 동작하도록 합니다.
    
    고정 IP가 필요하거나, 컨테이너가 외부 네트워크에 직접 노출되어야 하는 경우 사용됩니다.
    
- **사용 예시:**
    
    ```bash
    # Macvlan 네트워크 생성 (이름: my_macvlan_net)
    docker network create -d macvlan \
      --subnet=192.168.1.0/24 \
      --gateway=192.168.1.1 \
      -o parent=eth0 \
      my_macvlan_net
    
    # 컨테이너를 Macvlan 네트워크에 연결하여 실행
    docker run -d --name my_container --network my_macvlan_net alpine sleep 3600
    ```
    
    > 이렇게 하면 컨테이너는 지정된 물리 네트워크 서브넷 내에서 고정 IP를 할당받아, 다른 네트워크 장비와 직접 통신할 수 있습니다.
    > 

---

## 최종 요약

- **단일 호스트 환경:**
    - **Bridge 네트워크:** 기본 및 사용자 정의 네트워크를 통해 컨테이너 간 내부 통신을 지원합니다.
    - **Host 네트워크:** 컨테이너가 호스트 네트워크를 그대로 사용하여 통신합니다.
    - **None 네트워크:** 네트워크 기능이 완전히 비활성화됩니다.
- **멀티 호스트 환경:**
    - **Overlay 네트워크:** 여러 호스트에 걸친 컨테이너들이 하나의 논리적 네트워크로 연결되어, 내부 DNS를 통해 서로 통신할 수 있습니다.
    - **Macvlan 네트워크:** 컨테이너에 물리적 네트워크 IP를 할당하여 외부 네트워크와 직접 통신하게 합니다.