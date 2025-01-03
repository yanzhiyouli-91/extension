---
outline: deep
---

<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '../../.vitepress/components'
</script>

# IDE 内调试依赖库

调试功能仅在依赖库项目中 `@lcap/builder` 版本 `>=1.4.0` 支持；

<VTCodeGroup>
  <VTCodeGroupTab label="npm">

  ```sh
  $ npm install @lcap/builder@latest --save-dev
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="pnpm">

  ```sh
  $ pnpm add @lcap/builder@latest -D
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="yarn">

  ```sh
  $ yarn add @lcap/builder@latest -D
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

> 测试时，项目中的 `@lcap/builder` 安装 `beta` 版本

`package.json` 中手动添加 `watch` 命令，

```json
{
  "scripts": {
    "watch": "lcap-scripts watch"
  }
}
```

> 需要支持 https 时修改watch 命令 `lcap-scripts watch --https`

## 获取需要调试的依赖库的名称与版本号

在 ide 中 `依赖库管理` 面板中找到需要调试的组件库名称 & 版本号 （依赖库未发布前不支持调试）

![](/images/extension-manager.png)

## 获取平台地址 & 静态资源地址前缀

平台地址为ide的域名

![](/images/platform.png)

静态资源地址需要打开浏览器调试工具，在控制台中打印 `window.appInfo.STATIC_URL`

![](/images/devtools.png)

## 本地依赖库项目启动调试模式

```sh
$ npm run watch
```

![](/images/watch-command.png)


## 代理资源到本地

安装插件 chrome [代理](https://chromewebstore.google.com/detail/xswitch/idkjhjggpffolpidfkikidcokdkdaogg?hl=zh-CN&utm_source=ext_sidebar)资源到本地

代理插件配置如下：
```markdown
{
  // Use IntelliSense to learn about possible links.
  // Type `rule` to quick insert rule.
  // 输入 rule 来快速插入规则
  // For more information, visit: https://github.com/yize/xswitch
  "proxy": [
    [
      "[PLATFORM_URL]/api/v1/asset-center/library/[name]/version/[version]",
      "http://127.0.0.1:8080/api/library/schema"
    ],
    [
      "[STATIC_URL]/packages/extension/[name]@[version]/",
      "http://127.0.0.1:8080/"
    ],
  ],
}
```

* `[PLATFORM_URL]` 替换为 **平台地址** 例如： `https://csforkf.lcap.codewave-test.163yun.com`
* `[STATIC_URL]` 替换为 **静态资源地址** 例如：`https://minio-api.codewave-test.163yun.com/lowcode-static`
* `[name]` 替换为 **依赖库名称** 例如: `vue_demo`
* `[version]` 替换为 **依赖库版本号** 例如: `1.0.0`

> * 开启代理后配置正确，重新刷新浏览器即可
> * 后续 ide 重新加载依赖库，可以刷新页面 或者 在依赖库管理面板内移除该依赖库后重新导入;

