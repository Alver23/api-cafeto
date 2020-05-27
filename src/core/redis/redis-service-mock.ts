export class RedisServiceMock {

  private cache = {};

  public get clientAsync(): any {
    return {
      getAsync: async (key) => {
        return this.cache[key] || null;
      }
    };
  }

  public setDataInCache(key, data) {
    this.cache[key] = JSON.stringify(data);
  }


}
