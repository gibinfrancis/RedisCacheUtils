import tl = require("azure-pipelines-task-lib/task");
var redis = require("redis");

async function run() {
  try {
    console.log("Reading Inputs for the Task");
    //Host name of the redis server
    const _redisHost: string = tl.getInput("redisHost", false)!;
    //authentication method for the redis server
    const _redisPwdType: string = tl.getInput("redisPwdType", true)!;
    //key to authenticate to the redis server
    const _redisAuthKey: string = tl.getInput("redisAuthKey", false)!;
    //Cache key which need to be deleted
    const _redisCacheKey: string = tl.getInput("redisCacheKey", false)!;
    //Cache connection options
    const _redisClientOption: string = tl.getInput("redisClientOption", false)!;

    //Checking for all required fields
    if (
      (_redisHost == "" &&
        (_redisPwdType == "sas" || _redisPwdType == "url")) ||
      (_redisAuthKey == "" && _redisPwdType == "sas") ||
      (_redisClientOption == "" && _redisPwdType == "adv") ||
      _redisCacheKey == ""
    ) {
      //Setting the Status of the task
      console.log("Bad input was given");
      tl.setResult(tl.TaskResult.Failed, "Bad input was given");
      return;
    }

    //splitting the keys with comma separator
    console.log("Splitting key and value if comma separator is present");
    var cacheKeys = _redisCacheKey.split(",");

    //creating redis options
    var _redisOptions = null;

    if (_redisPwdType == "adv") {
      _redisOptions = JSON.parse(_redisClientOption);
    } else {
      _redisOptions = {
        url: _redisHost,
        password: _redisPwdType == "sas" ? _redisAuthKey : null,
        socket: {
          connectionTimeout: 5000,
          reconnectStrategy: false,
        },
      };
    }

    //creating redis connection
    console.log("Creating redis client");
    var client = redis.createClient(_redisOptions);

    //registering an error callback
    client.on("error", (err: any) => console.log("Redis Client Error", err));

    //connecting redis
    console.log("Trying to connect to redis server");
    await client.connect();

    //check the  connection status
    if (client.isReady) console.log("Redis client ready");
    else {
      console.log("Redis client not ready");
      tl.setResult(
        tl.TaskResult.Failed,
        "Pipeline task failed as the client failed to connect"
      );
      return;
    }

    //looping through the keys
    var posResCount = 0;
    var negResCount = 0;

    //looping through the keys
    console.log("Looping though the keys");
    for (var i = 0; i < cacheKeys.length; i++) {
      //check the key is valid one
      if (cacheKeys[i] == "") continue;

      //deleting the specific key from redis server
      console.log("deleting key and value to redis server");
      var result = await client.del(cacheKeys[i]);

      //check the deletion status
      if (result != null) {
        //on successful deletion
        console.log("Cache key " + cacheKeys[i] + " deleted successfully");
        posResCount++;
      } else {
        //on failed deletion
        console.log("Cache key " + cacheKeys[i] + " deletion failed");
        negResCount++;
      }
    }

    //setting result based on the result
    if (posResCount == cacheKeys.length) {
      tl.setResult(tl.TaskResult.Succeeded, "Cache keys deleted successfully");
    } else if (posResCount > 0) {
      tl.setResult(
        tl.TaskResult.SucceededWithIssues,
        "Cache keys deleted partially, Deleted keys count : " +
          posResCount +
          ", Failed keys count : " +
          negResCount
      );
    } else {
      tl.setResult(
        tl.TaskResult.Failed,
        "Cache keys deletion failed, Failed keys count : " + negResCount
      );
    }

    //closing the connection to the redis server
    console.log("Disconnecting from redis server");
    await client.disconnect();

    console.log("Pipeline Task Completed");
    return;
  } catch (err: any) {
    //Setting the Status of the task in case if any exception
    console.log("Pipeline Task failed with an error", err);
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();
