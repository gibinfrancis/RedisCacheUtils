module.exports = Object.freeze({
  WithAuth: {
    _redisHost: "redis://default:redis@127.0.0.1:6379",
    _redisPwdType: "url",
  },
  WithAuthIndex: {
    _redisHost: "redis://default:redis@127.0.0.1:6379/1",
    _redisPwdType: "url",
  },
  WithoutAuth: {
    _redisHost: "redis://127.0.0.1:6380",
    _redisPwdType: "url",
  },
  WithSas: {
    _redisHost: "rediss://yourredisname.redis.cache.windows.net:6380",
    _redisAuthKey: "dummyAuthKey=",
    _redisPwdType: "sas",
  },
  WithAuthOptions: {
    _redisClientOption: '{"url":"redis://default:redis@127.0.0.1:6379"}',
    _redisPwdType: "adv",
  },
  WithUnAuth: {
    _redisHost: "redis://default:wrongpwd@127.0.0.1:6381",
    _redisPwdType: "url",
  },
});

// redis://default:redispw@localhost:32768
