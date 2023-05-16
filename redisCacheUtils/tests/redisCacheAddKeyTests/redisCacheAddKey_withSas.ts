import mockRunLib = require("../../node_modules/azure-pipelines-task-lib/mock-run");
import path = require("path");
var constants = require("../config");

let taskPath = path.join(__dirname, "../..", "redisCacheAddKey", "index.js");

let tmr: mockRunLib.TaskMockRunner = new mockRunLib.TaskMockRunner(taskPath);

tmr.setInput("redisHost", constants.WithSas._redisHost);
tmr.setInput("redisPwdType", constants.WithSas._redisPwdType);
tmr.setInput("redisAuthKey", constants.WithSas._redisAuthKey);
tmr.setInput("redisCacheKey", "redisCacheAddKeyWithSas");
tmr.setInput(
  "redisCacheValue",
  "redisCacheAddKeyValueWithSas" + new Date().toLocaleDateString()
);

tmr.run();
