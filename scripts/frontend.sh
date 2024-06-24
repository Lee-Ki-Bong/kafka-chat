#!/bin/bash
# chmod +x enter-frontend.sh

# Docker Compose 서비스 이름
SERVICE_NAME="frontend"

# 실행 중인 컨테이너 ID 가져오기
CONTAINER_ID=$(docker-compose ps -q $SERVICE_NAME)

# 컨테이너가 실행 중인지 확인
if [ -z "$CONTAINER_ID" ]; then
  echo "Error: $SERVICE_NAME 컨테이너가 실행 중이 아닙니다."
  exit 1
fi

# 컨테이너에 접속
docker exec -it $CONTAINER_ID /bin/bash
