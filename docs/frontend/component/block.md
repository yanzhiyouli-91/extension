---
outline: deep
---
<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '../../.vitepress/components'
</script>

# 区块示例

区块示例为组件拖拽到画布内后默认生成的代码, 在初始化组件目录时会默认生成一个区块示例代码，这里 `Button` 为例

<VTCodeGroup>
  <VTCodeGroupTab label="Vue2">

  `block.stories.js` 文件
  ```javascript
  export const Default = {
    name: '默认按钮',
    render: () => ({
      template: `<u-button text="确定"></u-button>`, // 这里的模板不要绑定外部参数与事件
    })
  };
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="React">

  `block.stories.tsx` 文件
  ```jsx
  export const Default = {
    name: '主要按钮',
    render: () => {
      return <Button type="primary" children="确定" />;
    },
  };
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

ide 中拖拽到画布后会将 `text` 属性设置为 "确定"
![](/images/block-button.png)


## 书写规范

* 每个区块示例都是一个 `StoryObj`, 必需包含 `name`、`render` 属性（Vue, 会自动查找render 下的 `template`）
<VTCodeGroup>
  <VTCodeGroupTab label="Vue2">

  ```javascript
  export const Default = {
    name: '默认', // 区块示例名称
    render: () => ({
      template: `<u-button text="确定"></u-button>`, //  区块模板代码
    })
  };
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="React">

  ```jsx
  export const Default = {
    name: '主要按钮',  // 区块示例名称
    render: () => {
      return <Button type="primary" children="确定" />;  // 区块模板代码
    },
  };
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

* 区块示例中仅允许设置静态属性参数，不允许绑定函数或者绑定事件；

<VTCodeGroup>
  <VTCodeGroupTab label="Vue2">

  ```javascript
  // 以下为错误的示例
  export const Default = {
    name: '默认',
    render: () => ({
      data() {
        return {
          text: '确定'
        };
      },
      methods: {
        handleClick() {
        }
      },
      template: `<u-button :text="text" @click="handleClick"></u-button>`,
    })
  };
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="React">

  ```jsx
  // 以下为错误的示例
  export const Default = {
    name: '主要按钮',  // 区块示例名称
    render: () => {
      const text = '确定';
      const handleClick = () => {}
      return <Button type="primary" children={text} onClick={handleClick} />;  // 区块模板代码
    },
  };
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

* 写了多个区块示例，在拖拽组件后，弹出选择框, 示例图片为组件运行截图；
![](/images/image.png)

## 自动截图

打开终端，依次执行如下命令，根据block自动生成截图。截图作为拖拽组件后可选择示例的展示图。

1. 安装截图工具包。

<VTCodeGroup>
  <VTCodeGroupTab label="npm">

  ```sh
  $ npm install puppeteer --save-dev
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="pnpm">

  ```sh
  $ pnpm add -D puppeteer 
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="yarn">

  ```sh
  $ yarn add puppeteer --dev
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

2. 启动dev服务

```sh
npm run dev
```

3. 新建终端执行命令，开始批量截图。端口号需要和dev服务一致。执行结束后在组件目录中会自动生成文件夹 `screenshots` 并包含截图

```sh
npx lcap-scripts screenshot --port 8008
```
