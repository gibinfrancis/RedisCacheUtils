import ma = require("azure-pipelines-task-lib/mock-answer");
import mockRunLib = require("azure-pipelines-task-lib/mock-run");
import path = require("path");
var constants = require("./config");

let taskPath = path.join(__dirname, "..", "index.js");
let tmr: mockRunLib.TaskMockRunner = new mockRunLib.TaskMockRunner(taskPath);

tmr.setInput("redisHost", constants._redisHost);
tmr.setInput("redisPort", constants._redisPort);
tmr.setInput("redisAuthKey", constants._redisAuthKey);
tmr.setInput("redisCacheKey", "*");

tmr.run();
