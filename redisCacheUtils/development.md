To Run Redis as Docker

- Setup Docker Desktop
- docker pull redis
- docker run -d --name redis-withauth -p 6379:6379 -v /redis/redis.conf:/redis.conf redis redis-server /redis.conf --appendonly yes --requirepass "redis"
- docker run -d --name redis-withoutauth -p 6380:6379 -v /redis/redis.conf:/redis.conf redis redis-server /redis.conf --appendonly yes
  docker exec -it redis-withauth sh
  redis-cli --askpass
  keys \*

To Install packages

- npm install -g typescript
- npm install -g mocha
- npm install -g azure-pipelines-task-lib
- npm install -g ts-mocha
- npm install -g tfx-cli

https://www.npmjs.com/package/redis

https://github.com/redis/node-redis/blob/HEAD/docs/client-configuration.md
