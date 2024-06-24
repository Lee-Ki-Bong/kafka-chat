## 환경 구성하기

### 1. zookeeper 와 kafka 도커 구성을 테스트 하기 위한스크립트를 실행하여 확인.

- docker-compose.yml 파일과 실행 중인 컨테이너 수 2개를 인수로 전달하여 실행

```
./scripts/kafka-test.sh docker-compose.yml 2  
```

### 2. 도커 컴포즈 빌드

```
docker compose up -d
```

- backend 컨테이너 접속
```
./scripts/backend.sh
```

- frontend 컨테이너 접속
```
./scripts/front.sh
```