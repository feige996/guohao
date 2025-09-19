import type { Config } from '@alova/wormhole'

// 更多配置详情请访问：
// https://alova.js.org/tutorial/getting-started/extension-integration

export default <Config>{
  generator: [
    {
      /**
       * 文件输入。支持：
       * 1. openapi json 文件 URL
       * 2. 本地文件
       */
      input: 'http://127.0.0.1:5005/swagger/%E5%9B%BD%E6%B5%A9%E4%B8%AD%E5%8C%BB/swagger.json',
      /**
       * 输入文件平台。目前仅支持 swagger。
       * 当指定此参数时，input 字段只需指定文档地址，无需指定 openapi 文件
       */
      platform: 'swagger',

      /**
       * 接口文件和类型文件的输出路径。
       * 多个生成器不能使用相同的地址，否则生成的代码会相互覆盖。
       */
      output: 'src/api/guohao-api',

      /**
       * 生成的响应数据的媒体类型。默认为 `application/json`
       */
      responseMediaType: 'application/json',

      /**
       * 生成的请求体数据的媒体类型。默认为 `application/json`
       */
      bodyMediaType: 'application/json',

      /**
       * 生成的 API 版本。选项为 `2` 或 `3`，默认为 `auto`。
       */
      version: 3,

      /**
       * 生成代码的类型。选项为 `auto/ts/typescript/module/commonjs`。
       */
      type: 'typescript',

      /**
       * 导出的全局 API 名称，您可以通过此名称全局访问生成的 API，默认为 `Apis`。
       * 配置多个生成器时此项为必需，且不能重复
       */
      global: 'Apis',

      /**
       * 过滤或转换生成的 API 信息，返回一个 apiDescriptor，如果未指定此函数，则不转换 apiDescriptor 对象
       */
      handleApi: (apiDescriptor) => {
        // 跳过控制台日志输出
        // console.log(apiDescriptor)

        // 如果需要，过滤掉任何已弃用的 API
        if (apiDescriptor.deprecated) {
          return undefined // 跳过此 API
        }
        // 如果需要，您可以在此处转换 API 描述符
        // 例如，添加自定义标头、修改参数等

        return apiDescriptor
      },
    },
  ],

  /**
   * 仅限扩展
   * 是否自动更新接口，默认启用，每 5 分钟检查一次，设置为 `false` 时关闭
   */
  autoUpdate: {
    // 编辑器启动时更新
    launchEditor: true,
    // 每 5 分钟检查一次更新
    interval: 5 * 60 * 1000,
  },
}
