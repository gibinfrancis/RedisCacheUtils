import mockRunLib = require("../../node_modules/azure-pipelines-task-lib/mock-run");
import path = require("path");
var constants = require("../config");

let taskPath = path.join(__dirname, "../..", "redisCacheAddKey", "index.js");

let tmr: mockRunLib.TaskMockRunner = new mockRunLib.TaskMockRunner(taskPath);

tmr.setInput("redisHost", constants.WithAuthIndex._redisHost);
tmr.setInput("redisPwdType", constants.WithAuthIndex._redisPwdType);
tmr.setInput("redisCacheKey", "redisCacheAddKeyWithAuthIndex");
tmr.setInput(
  "redisCacheValue",
  "redisCacheAddKeyValueWithAuthIndex" + new Date().toLocaleDateString()
);

tmr.run();
