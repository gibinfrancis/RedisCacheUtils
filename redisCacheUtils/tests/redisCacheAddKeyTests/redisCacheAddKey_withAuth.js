"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockRunLib = require("../../node_modules/azure-pipelines-task-lib/mock-run");
const path = require("path");
var constants = require("../config");
let taskPath = path.join(__dirname, "../..", "redisCacheAddKey", "index.js");
let tmr = new mockRunLib.TaskMockRunner(taskPath);
tmr.setInput("redisHost", constants.WithAuth._redisHost);
tmr.setInput("redisPwdType", constants.WithAuth._redisPwdType);
tmr.setInput("redisCacheKey", "redisCacheAddKeyWithAuth");
tmr.setInput("redisCacheValue", "redisCacheAddKeyValueWithAuth" + new Date().toLocaleDateString());
tmr.run();
