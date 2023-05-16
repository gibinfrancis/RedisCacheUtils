import * as path from "path";
import * as assert from "assert";
import * as ttm from "azure-pipelines-task-lib/mock-test";
var constants = require("./config");
var redis = require("redis");

describe("Redis cache extension Tests", function () {
  //Host name of the redis server
  const _redisHost: string = constants._redisHost;
  //port address of the redis server
  const _redisPort: string = constants._redisPort;
  //key to authenticate to the redis server
  const _redisAuthKey: string = constants._redisAuthKey;
  //authentication method for the redis server
  const _redisPwdType: string = constants._redisPwdType;
  //DB Index for the redis server
  const _redisDBIndex: string = constants._redisDBIndex;

  //redis create options
  var _redisOptionsWithAuth = {
    url: constants.WithAuth._redisHost,
  };

  var _redisOptionsWithAuthIndex = {
    url: constants.WithAuthIndex._redisHost,
  };

  var _redisOptionsWithoutAuth = {
    url: constants.WithoutAuth._redisHost,
  };

  var _redisOptionsWithSas = {
    url: constants.WithSas._redisHost,
    password: constants.WithSas._redisAuthKey,
  };

  before(async function () {});

  after(async () => {});

  //-----------------------------------------------------------------
  //====================CACHE KEY ADD TESTS==============================
  //-----------------------------------------------------------------

  //Add key to cache with auth
  it("should Add key to cache with auth", async () => {
    try {
      var redis_client = await redis.createClient(_redisOptionsWithAuth);
      await redis_client.connect();

      //check the  connection status
      if (redis_client.isReady == false) assert.fail("Redis client not ready");

      let tp = path.join(
        __dirname,
        "redisCacheAddKeyTests",
        "redisCacheAddKey_withAuth.js"
      );
      let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
      tr.run();
      var result1 = await redis_client.get("redisCacheAddKeyWithAuth");
      assert.strictEqual(tr.succeeded, true, "should have succeeded");
      assert.strictEqual(tr.warningIssues.length, 0, "should have no warnings");
      assert.strictEqual(tr.errorIssues.length, 0, "should have no errors");

      assert.strictEqual(
        result1.toString(),
        "redisCacheAddKeyValueWithAuth" + new Date().toLocaleDateString(),
        "New Key should be updated"
      );
      await redis_client.disconnect();
      await Promise.resolve();
    } catch (err) {
      console.log("Error in test case", err);
      assert.fail("Error while running test case");
    }
  }).timeout(10000);

  //Add key to cache with auth index
  it("should Add key to cache with auth index", async () => {
    try {
      var redis_client = redis.createClient(_redisOptionsWithAuthIndex);
      await redis_client.connect();
      let tp = path.join(
        __dirname,
        "redisCacheAddKeyTests",
        "redisCacheAddKey_withAuthIndex.js"
      );
      let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
      tr.run();
      var result1 = await redis_client.get("redisCacheAddKeyWithAuthIndex");
      assert.strictEqual(tr.succeeded, true, "should have succeeded");
      assert.strictEqual(tr.warningIssues.length, 0, "should have no warnings");
      assert.strictEqual(tr.errorIssues.length, 0, "should have no errors");

      assert.strictEqual(
        result1.toString(),
        "redisCacheAddKeyValueWithAuthIndex" + new Date().toLocaleDateString(),
        "New Key should be updated"
      );
      await redis_client.disconnect();
      await Promise.resolve();
    } catch (err) {
      console.log("Error in test case", err);
      assert.fail("Error while running test case");
    }
  }).timeout(10000);

  //Add key to cache without auth
  it("should Add key to cache with auth", async () => {
    try {
      var redis_client = redis.createClient(_redisOptionsWithoutAuth);
      await redis_client.connect();

      //check the  connection status
      if (redis_client.isReady == false) assert.fail("Redis client not ready");

      let tp = path.join(
        __dirname,
        "redisCacheAddKeyTests",
        "redisCacheAddKey_withoutAuth.js"
      );
      let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
      tr.run();
      var result1 = await redis_client.get("redisCacheAddKeyWithoutAuth");
      assert.strictEqual(tr.succeeded, true, "should have succeeded");
      assert.strictEqual(tr.warningIssues.length, 0, "should have no warnings");
      assert.strictEqual(tr.errorIssues.length, 0, "should have no errors");

      assert.strictEqual(
        result1.toString(),
        "redisCacheAddKeyValueWithoutAuth" + new Date().toLocaleDateString(),
        "New Key should be updated"
      );
      await redis_client.disconnect();
      await Promise.resolve();
    } catch (err) {
      console.log("Error in test case", err);
      assert.fail("Error while running test case");
    }
  }).timeout(10000);

  //Add key to cache without auth options
  it("should Add key to cache with auth options", async () => {
    try {
      var clientOptions = JSON.parse(
        constants.WithAuthOptions._redisClientOption
      );
      var redis_client = redis.createClient(clientOptions);
      await redis_client.connect();

      //check the  connection status
      if (redis_client.isReady == false) assert.fail("Redis client not ready");

      let tp = path.join(
        __dirname,
        "redisCacheAddKeyTests",
        "redisCacheAddKey_withAuthOptions.js"
      );
      let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
      tr.run();
      var result1 = await redis_client.get("redisCacheAddKeyWithAuthOptions");
      assert.strictEqual(tr.succeeded, true, "should have succeeded");
      assert.strictEqual(tr.warningIssues.length, 0, "should have no warnings");
      assert.strictEqual(tr.errorIssues.length, 0, "should have no errors");

      assert.strictEqual(
        result1.toString(),
        "redisCacheAddKeyValueWithAuthOptions" +
          new Date().toLocaleDateString(),
        "New Key should be updated"
      );
      await redis_client.disconnect();
      await Promise.resolve();
    } catch (err) {
      console.log("Error in test case", err);
      assert.fail("Error while running test case");
    }
  }).timeout(10000);

  //Add multiple keys to cache with auth
  it("should add multiple keys with auth", async () => {
    try {
      var redis_client = redis.createClient(_redisOptionsWithAuth);
      await redis_client.connect();

      //check the  connection status
      if (redis_client.isReady == false) assert.fail("Redis client not ready");

      let tp = path.join(
        __dirname,
        "redisCacheAddKeyTests",
        "redisCacheAddKey_multipleWithAuth.js"
      );
      let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
      tr.run();
      var result1 = await redis_client.get("redisCacheAddKeyWithAuth1");
      var result2 = await redis_client.get("redisCacheAddKeyWithAuth2");
      assert.strictEqual(tr.succeeded, true, "should have succeeded");
      assert.strictEqual(tr.warningIssues.length, 0, "should have no warnings");
      assert.strictEqual(tr.errorIssues.length, 0, "should have no errors");

      assert.strictEqual(
        result1.toString(),
        "redisCacheAddKeyValueWithAuth1" + new Date().toLocaleDateString(),
        "New Key should be updated"
      );
      assert.strictEqual(
        result2.toString(),
        "redisCacheAddKeyValueWithAuth2" + new Date().toLocaleDateString(),
        "New Key should be updated"
      );
      await redis_client.disconnect();
      await Promise.resolve();
    } catch (err) {
      console.log("Error in test case", err);
      assert.fail("Error while running test case");
    }
  }).timeout(10000);

  //Add key to cache with sas token
  it("should Add key to cache with sas token", async () => {
    try {
      var redis_client = await redis.createClient(_redisOptionsWithSas);
      await redis_client.connect();

      //check the  connection status
      if (redis_client.isReady == false) assert.fail("Redis client not ready");

      let tp = path.join(
        __dirname,
        "redisCacheAddKeyTests",
        "redisCacheAddKey_withSas.js"
      );
      let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
      tr.run();
      var result1 = await redis_client.get("redisCacheAddKeyWithSas");
      assert.strictEqual(tr.succeeded, true, "should have succeeded");
      assert.strictEqual(tr.warningIssues.length, 0, "should have no warnings");
      assert.strictEqual(tr.errorIssues.length, 0, "should have no errors");

      assert.strictEqual(
        result1.toString(),
        "redisCacheAddKeyValueWithSas" + new Date().toLocaleDateString(),
        "New Key should be updated"
      );
      await redis_client.disconnect();
      await Promise.resolve();
    } catch (err) {
      console.log("Error in test case", err);
      assert.fail("Error while running test case");
    }
  }).timeout(10000);

  //-----------------------------------------------------------------
  //==============CLEAR CACHE KEY TESTS==============================
  //-----------------------------------------------------------------

  //clear key in cache with auth
  it("should clear key in cache with auth", async () => {
    try {
      var redis_client = redis.createClient(_redisOptionsWithAuth);
      await redis_client.connect();

      //check the  connection status
      if (redis_client.isReady == false) assert.fail("Redis client not ready");

      await redis_client.set("redisCacheClearKeyWithAuth", "dummyValue");
      let tp = path.join(
        __dirname,
        "redisCacheClearKeyTests",
        "redisCacheClearKey_withAuth.js"
      );
      let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
      tr.run();
      var result1 = await redis_client.get("redisCacheAddKeyWithAuth");
      var result2 = await redis_client.get("redisCacheClearKeyWithAuth");
      assert.strictEqual(tr.succeeded, true, "should have succeeded");
      assert.strictEqual(tr.warningIssues.length, 0, "should have no warnings");
      assert.strictEqual(tr.errorIssues.length, 0, "should have no errors");

      assert.strictEqual(
        result1.toString(),
        "redisCacheAddKeyValueWithAuth" + new Date().toLocaleDateString(),
        "New Key should be updated"
      );
      assert.strictEqual(result2, null, "Key should be removed");
      await redis_client.disconnect();
      await Promise.resolve();
    } catch (err) {
      console.log("Error in test case", err);
      assert.fail("Error while running test case");
    }
  }).timeout(10000);

  //clear multiple key in cache with auth
  it("should clear multiple key in cache with auth", async () => {
    try {
      var redis_client = redis.createClient(_redisOptionsWithAuth);
      await redis_client.connect();

      //check the  connection status
      if (redis_client.isReady == false) assert.fail("Redis client not ready");

      await redis_client.set("redisCacheClearKeyWithAuth1", "dummyValue");
      await redis_client.set("redisCacheClearKeyWithAuth2", "dummyValue");
      let tp = path.join(
        __dirname,
        "redisCacheClearKeyTests",
        "redisCacheClearKey_multipleWithAuth.js"
      );
      let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
      tr.run();
      var result1 = await redis_client.get("redisCacheAddKeyWithAuth");
      var result2 = await redis_client.get("redisCacheClearKeyWithAuth1");
      var result3 = await redis_client.get("redisCacheClearKeyWithAuth2");
      assert.strictEqual(tr.succeeded, true, "should have succeeded");
      assert.strictEqual(tr.warningIssues.length, 0, "should have no warnings");
      assert.strictEqual(tr.errorIssues.length, 0, "should have no errors");

      assert.strictEqual(
        result1.toString(),
        "redisCacheAddKeyValueWithAuth" + new Date().toLocaleDateString(),
        "New Key should be updated"
      );
      assert.strictEqual(result2, null, "Key should be removed");
      assert.strictEqual(result3, null, "Key should be removed");
      await redis_client.disconnect();
      await Promise.resolve();
    } catch (err) {
      console.log("Error in test case", err);
      assert.fail("Error while running test case");
    }
  }).timeout(10000);

  //-----------------------------------------------------------------
  //====================FLUSH ALL TESTS==============================
  //-----------------------------------------------------------------

  //flush all keys in cache with auth
  it("should flush all keys in cache with auth", async () => {
    try {
      var redis_client = redis.createClient(_redisOptionsWithAuth);
      var redis_client_withIndex = redis.createClient(
        _redisOptionsWithAuthIndex
      );
      await redis_client.connect();
      await redis_client_withIndex.connect();

      //check the  connection status
      if (redis_client.isReady == false) assert.fail("Redis client not ready");

      //check the  connection status
      if (redis_client_withIndex.isReady == false)
        assert.fail("Redis client not ready");

      await redis_client.set("redisCacheFlushAllWithAuth1", "dummyValue");
      await redis_client.set("redisCacheFlushAllWithAuth2", "dummyValue");
      await redis_client.set("redisCacheFlushAllWithAuth3", "dummyValue");

      await redis_client_withIndex.set(
        "redisCacheFlushAllWithAuth1",
        "dummyValue"
      );
      await redis_client_withIndex.set(
        "redisCacheFlushAllWithAuth2",
        "dummyValue"
      );
      await redis_client_withIndex.set(
        "redisCacheFlushAllWithAuth3",
        "dummyValue"
      );

      let tp = path.join(
        __dirname,
        "redisCacheFlushAllTests",
        "redisCacheFlushAll_withAuth.js"
      );
      let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
      tr.run();

      var result1 = await redis_client.get("redisCacheFlushAllWithAuth1");
      var result2 = await redis_client.get("redisCacheFlushAllWithAuth2");
      var result3 = await redis_client.get("redisCacheFlushAllWithAuth3");

      assert.strictEqual(tr.succeeded, true, "should have succeeded");
      assert.strictEqual(tr.warningIssues.length, 0, "should have no warnings");
      assert.strictEqual(tr.errorIssues.length, 0, "should have no errors");

      assert.strictEqual(result1, null, "Key should be removed");
      assert.strictEqual(result2, null, "Key should be removed");
      assert.strictEqual(result3, null, "Key should be removed");

      result1 = await redis_client_withIndex.get("redisCacheFlushAllWithAuth1");
      result2 = await redis_client_withIndex.get("redisCacheFlushAllWithAuth2");
      result3 = await redis_client_withIndex.get("redisCacheFlushAllWithAuth3");

      assert.strictEqual(result1, null, "Key should not be removed");
      assert.strictEqual(result2, null, "Key should not be removed");
      assert.strictEqual(result3, null, "Key should not be removed");

      await redis_client.disconnect();
      await redis_client_withIndex.disconnect();
      await Promise.resolve();
    } catch (err) {
      console.log("Error in test case", err);
      assert.fail("Error while running test case");
    }
  }).timeout(10000);

  //-----------------------------------------------------------------
  //====================FLUSH DB TESTS==============================
  //-----------------------------------------------------------------

  //flush db keys in cache with auth
  it("should flush db keys in cache with auth", async () => {
    try {
      var redis_client = redis.createClient(_redisOptionsWithAuth);
      var redis_client_withIndex = redis.createClient(
        _redisOptionsWithAuthIndex
      );
      await redis_client.connect();
      await redis_client_withIndex.connect();

      //check the  connection status
      if (redis_client.isReady == false) assert.fail("Redis client not ready");

      //check the  connection status
      if (redis_client_withIndex.isReady == false)
        assert.fail("Redis client not ready");

      await redis_client.set("redisCacheFlushDBWithAuth1", "dummyValue");
      await redis_client.set("redisCacheFlushDBWithAuth2", "dummyValue");
      await redis_client.set("redisCacheFlushDBWithAuth3", "dummyValue");

      await redis_client_withIndex.set(
        "redisCacheFlushDBWithAuth1",
        "dummyValue"
      );
      await redis_client_withIndex.set(
        "redisCacheFlushDBWithAuth2",
        "dummyValue"
      );
      await redis_client_withIndex.set(
        "redisCacheFlushDBWithAuth3",
        "dummyValue"
      );

      let tp = path.join(
        __dirname,
        "redisCacheFlushDBTests",
        "redisCacheFlushDB_withAuth.js"
      );
      let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
      tr.run();

      var result1 = await redis_client.get("redisCacheFlushDBWithAuth1");
      var result2 = await redis_client.get("redisCacheFlushDBWithAuth2");
      var result3 = await redis_client.get("redisCacheFlushDBWithAuth3");

      assert.strictEqual(tr.succeeded, true, "should have succeeded");
      assert.strictEqual(tr.warningIssues.length, 0, "should have no warnings");
      assert.strictEqual(tr.errorIssues.length, 0, "should have no errors");

      assert.strictEqual(result1, null, "Key should be removed");
      assert.strictEqual(result2, null, "Key should be removed");
      assert.strictEqual(result3, null, "Key should be removed");

      result1 = await redis_client_withIndex.get("redisCacheFlushDBWithAuth1");
      result2 = await redis_client_withIndex.get("redisCacheFlushDBWithAuth2");
      result3 = await redis_client_withIndex.get("redisCacheFlushDBWithAuth3");

      assert.strictEqual(result1, "dummyValue", "Key should not be removed");
      assert.strictEqual(result2, "dummyValue", "Key should not be removed");
      assert.strictEqual(result3, "dummyValue", "Key should not be removed");

      await redis_client.disconnect();
      await redis_client_withIndex.disconnect();
      await Promise.resolve();
    } catch (err) {
      console.log("Error in test case", err);
      assert.fail("Error while running test case");
    }
  }).timeout(10000);

  //-----------------------------------------------------------------
  //====================CONNECTIVITY TESTS==============================
  //-----------------------------------------------------------------

  //Add key to cache with unknown host
  it("add key to cache with unknown host fails", async () => {
    try {
      let tp = path.join(
        __dirname,
        "redisCacheAddKeyTests",
        "redisCacheAddKey_withUnAuth.js"
      );
      let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
      tr.run();
      //console.log(tr.stdout);
      assert.strictEqual(tr.failed, true, "should have succeeded");
      assert.strictEqual(tr.errorIssues.length > 0, true, "should have errors");

      await Promise.resolve();
    } catch (err) {
      console.log("Error in test case", err);
      assert.fail("Error while running test case");
    }
  }).timeout(10000);
});
