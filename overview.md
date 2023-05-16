# Redis Cache Utils

Azure devops release plugin to handle redis cache related tasks from the pipeline.

While developing an application with redis and azure devops you might end up in a situation that you need to Add/Delete/Flush your redis cache keys after a release. The you can use the task to implement the same.

tasks available in the extension

## Redis Cache Add Key

You can create a cache entry on your Redis server using the task

| Parameter Name           | Required | Description                                                     |
| ------------------------ | -------- | --------------------------------------------------------------- |
| Authentication Method    | true     | Authentication method                                           |
| Redis Host Name          | false    | Redis host name or url of your redis                            |
| Redis Authentication key | false    | SAS authentication key,if you are using "Azure Cache for Redis" |
| Redis Client Options     | false    | advanced json object for redis client connect                   |
| Redis Cache key          | true     | Key for the cache entry                                         |
| Redis Cache Value        | true     | Value for the cache entry                                       |

## Redis Cache Clear Key

You can clear a specific key from the Redis server.

| Parameter Name           | Required | Description                                                     |
| ------------------------ | -------- | --------------------------------------------------------------- |
| Authentication Method    | true     | Authentication method                                           |
| Redis Host Name          | false    | Redis host name or url of your redis                            |
| Redis Authentication key | false    | SAS authentication key,if you are using "Azure Cache for Redis" |
| Redis Client Options     | false    | advanced json object for redis client connect                   |
| Redis Cache key          | true     | Key for the cache entry                                         |

## Redis Cache Flush all

You can clear all the content on your Redis server.

| Parameter Name           | Required | Description                                                     |
| ------------------------ | -------- | --------------------------------------------------------------- |
| Authentication Method    | true     | Authentication method                                           |
| Redis Host Name          | false    | Redis host name or url of your redis                            |
| Redis Authentication key | false    | SAS authentication key,if you are using "Azure Cache for Redis" |
| Redis Client Options     | false    | advanced json object for redis client connect                   |

## Redis Cache Flush DB

You can clear all the content from specific DB on your Redis server.

| Parameter Name           | Required | Description                                                     |
| ------------------------ | -------- | --------------------------------------------------------------- |
| Authentication Method    | true     | Authentication method                                           |
| Redis Host Name          | false    | Redis host name or url of your redis                            |
| Redis Authentication key | false    | SAS authentication key,if you are using "Azure Cache for Redis" |
| Redis Client Options     | false    | advanced json object for redis client connect                   |

"SAS Authentication key" or "Credentials within URL" or "Advanced"

---

## Parameter Details

### **Authentication Method**

Authentication method used while connecting to redis
please find the options below

- "SAS Authentication key" : This should be used only when you are connecting to Azure Redis Service
- "Credentials within URL" : This can be used when we want pass the credentials using redis host url. This should be chosen when we are connecting without credentials and provide the host accordingly
- "Advanced" : This should provide more options to provide json instead of specific parameters, you can use the json containing information for `createClient` which you can refer from link below
  https://github.com/redis/node-redis/blob/HEAD/docs/client-configuration.md

### **Redis Host Name**

This should be the host name to connect to the redis server

you can use below examples based on your need

sample below

> `redis[s]://[[username][:password]@][host][:port][/db-number]`

_redis host with username and password_

`redis://default:redis@127.0.0.1:6379`

_redis host without username and password_

`redis://127.0.0.1:6379`

_redis host with username and password and secure port_

`rediss://default:redis@127.0.0.1:6380`

_redis host with username and password with db index_

`redis://default:redis@127.0.0.1:6379/1`

_Azure redis host_

`rediss://yourredisname.redis.cache.windows.net:6380`

### **Redis Authentication key**

This should be SAS token to connect you Azure redis server

### **Redis Client Options**

This should be an advanced json which can be passed as redis client object, the same will be parsed and used to connect to the client

sample

`{"url":"redis://default:redis@127.0.0.1:6379"}`

you can refer to the `createClient` object mentioned below link to create the same
https://github.com/redis/node-redis/blob/HEAD/docs/client-configuration.md

### **Redis Cache key**

This should be redis cache key to be added

### **Redis Cache Value**

This should be redis cache value to be added against the key

### Release Notes

| Version | Date       | Changes                                                                                                                                                                                                |
| ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2.0.12  | 04-03-2023 | Bug bix for menu not showing and es6 error                                                                                                                                                             |
| 2.0.0   | 02-030     | Upgraded redis client library version 4.6.4 , added advanced option while connection to client , minor bug fixes, enhanced logging, removed prefix-as the same is not being available with the library |
| 1.0.18  | 02-11-2020 | Included no authentication option                                                                                                                                                                      |
| 1.0.13  | 11-09-2020 | Included the option to choose the DB index in Add/Delete tasks, Included new task for FlushDB                                                                                                          |
| 1.0.12  | 23-07-2020 | Included the option to login to the Redis with password. It was supporting only SAS Token on the previous builds                                                                                       |
