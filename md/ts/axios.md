<!--
 * @Author: wangyunbo
 * @Date: 2022-07-2config is of type AxiosRequestConfig, thus cannot be undefined.
-->
On the other hand, config.header can indeed be. As it's a Record (export type AxiosRequestHeaders = Record<string, string>;), you can indeed default it with an empty object:
```ts
loggedInAxios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    if (config.headers === undefined) {
      config.headers = {};
    }
    // ...
    return config;
  },
  (error) => error
);
```
