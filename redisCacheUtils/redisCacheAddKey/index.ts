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
    //Cache key which need to be added
    const _redisCacheKey: string = tl.getInput("redisCacheKey", false)!;
    //Cache value which need to be added
    const _redisCacheValue: string = tl.getInput("redisCacheValue", false)!;
    //Cache connection options
    const _redisClientOption: string = tl.getInput("redisClientOption", false)!;

    //Checking for all required fields
    if (
      (_redisHost == "" &&
        (_redisPwdType == "sas" || _redisPwdType == "url")) ||
      (_redisAuthKey == "" && _redisPwdType == "sas") ||
      (_redisClientOption == "" && _redisPwdType == "adv") ||
      _redisCacheKey == "" ||
      _redisCacheValue == ""
    ) {
      //Setting the Status of the task
      console.log("Bad input was given");
      tl.setResult(tl.TaskResult.Failed, "Bad input was given");
      return;
    }

    //splitting the keys and values with comma separator
    console.log("Splitting key and value if comma separator is present");
    var cacheKeys = _redisCacheKey.split(",");
    var cacheValues = _redisCacheValue.split(",");

    //make sure the keys and values count matches
    if (cacheKeys.length != cacheValues.length) {
      //Setting the Status of the task
      console.log("Keys and Values count mismatch");
      tl.setResult(tl.TaskResult.Failed, "Keys and Values count mismatch");
      return;
    }

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

    console.log("Looping though the keys");
    for (var i = 0; i < cacheKeys.length; i++) {
      //check the key is valid one
      if (cacheKeys[i] == "") continue;

      //adding single key
      console.log("Adding key and value to redis server");
      var result = await client.set(cacheKeys[i], cacheValues[i]);

      //check the insertion status
      if (result != null) {
        //on successful insertion
        console.log("Cache key " + cacheKeys[i] + " inserted successfully");
        posResCount++;
      } else {
        //on failed insertion
        console.log("Cache key " + cacheKeys[i] + " insertion failed");
        negResCount++;
      }
    }

    //setting result based on the result
    if (posResCount == cacheKeys.length) {
      tl.setResult(tl.TaskResult.Succeeded, "Cache keys added successfully");
    } else if (posResCount > 0) {
      tl.setResult(
        tl.TaskResult.SucceededWithIssues,
        "Cache keys added partially, Added keys count : " +
          posResCount +
          ", Failed keys count : " +
          negResCount
      );
    } else {
      tl.setResult(
        tl.TaskResult.Failed,
        "Cache keys insertion failed, Failed keys count : " + negResCount
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
