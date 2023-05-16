"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockRunLib = require("../../node_modules/azure-pipelines-task-lib/mock-run");
const path = require("path");
var constants = require("../config");
let taskPath = path.join(__dirname, "../..", "redisCacheAddKey", "index.js");
let tmr = new mockRunLib.TaskMockRunner(taskPath);
tmr.setInput("redisHost", constants.WithUnAuth._redisHost);
tmr.setInput("redisPwdType", constants.WithUnAuth._redisPwdType);
tmr.setInput("redisCacheKey", "redisCacheAddKeyWithUnAuth");
tmr.setInput("redisCacheValue", "redisCacheAddKeyValueWithUnAuth" + new Date().toLocaleDateString());
tmr.run();
