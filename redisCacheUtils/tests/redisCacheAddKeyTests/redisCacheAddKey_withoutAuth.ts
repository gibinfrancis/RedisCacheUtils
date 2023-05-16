import mockRunLib = require("../../node_modules/azure-pipelines-task-lib/mock-run");
import path = require("path");
var constants = require("../config");

let taskPath = path.join(__dirname, "../..", "redisCacheAddKey", "index.js");

let tmr: mockRunLib.TaskMockRunner = new mockRunLib.TaskMockRunner(taskPath);

tmr.setInput("redisHost", constants.WithoutAuth._redisHost);
tmr.setInput("redisPwdType", constants.WithoutAuth._redisPwdType);
tmr.setInput("redisCacheKey", "redisCacheAddKeyWithoutAuth");
tmr.setInput(
  "redisCacheValue",
  "redisCacheAddKeyValueWithoutAuth" + new Date().toLocaleDateString()
);

tmr.run();
