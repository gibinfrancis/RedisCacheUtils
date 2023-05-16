"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockRunLib = require("../../node_modules/azure-pipelines-task-lib/mock-run");
const path = require("path");
var constants = require("../config");
let taskPath = path.join(__dirname, "../..", "redisCacheAddKey", "index.js");
let tmr = new mockRunLib.TaskMockRunner(taskPath);
tmr.setInput("redisClientOption", constants.WithAuthOptions._redisClientOption);
tmr.setInput("redisPwdType", constants.WithAuthOptions._redisPwdType);
tmr.setInput("redisCacheKey", "redisCacheAddKeyWithAuthOptions");
tmr.setInput("redisCacheValue", "redisCacheAddKeyValueWithAuthOptions" + new Date().toLocaleDateString());
tmr.run();