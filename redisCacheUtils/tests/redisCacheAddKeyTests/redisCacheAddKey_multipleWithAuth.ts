import mockRunLib = require("../../node_modules/azure-pipelines-task-lib/mock-run");
import path = require("path");
var constants = require("../config");

let taskPath = path.join(__dirname, "../..", "redisCacheAddKey", "index.js");

let tmr: mockRunLib.TaskMockRunner = new mockRunLib.TaskMockRunner(taskPath);

tmr.setInput("redisHost", constants.WithAuth._redisHost);
tmr.setInput("redisPwdType", constants.WithAuth._redisPwdType);
tmr.setInput(
  "redisCacheKey",
  "redisCacheAddKeyWithAuth1,redisCacheAddKeyWithAuth2"
);
tmr.setInput(
  "redisCacheValue",
  "redisCacheAddKeyValueWithAuth1" +
    new Date().toLocaleDateString() +
    ",redisCacheAddKeyValueWithAuth2" +
    new Date().toLocaleDateString()
);

tmr.run();
