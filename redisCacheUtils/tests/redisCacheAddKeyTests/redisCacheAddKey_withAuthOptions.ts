import mockRunLib = require("../../node_modules/azure-pipelines-task-lib/mock-run");
import path = require("path");
var constants = require("../config");

let taskPath = path.join(__dirname, "../..", "redisCacheAddKey", "index.js");

let tmr: mockRunLib.TaskMockRunner = new mockRunLib.TaskMockRunner(taskPath);

tmr.setInput("redisClientOption", constants.WithAuthOptions._redisClientOption);
tmr.setInput("redisPwdType", constants.WithAuthOptions._redisPwdType);
tmr.setInput("redisCacheKey", "redisCacheAddKeyWithAuthOptions");
tmr.setInput(
  "redisCacheValue",
  "redisCacheAddKeyValueWithAuthOptions" + new Date().toLocaleDateString()
);

tmr.run();
