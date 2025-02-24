---
outline: deep
---

<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '../../.vitepress/components'
</script>

# 主题配置

在IDE的 `更多 -> 自定义主题样式` 中配置组件的默认外观, 或者在`组件配置 -> 样式面板` 设置主题样式

![](/images/theme1.png)

![](/images/theme2.png)

## 实现步骤

### 创建主题文件
在组件目录下创建文件夹 `theme`，`theme` 文件夹下创建文件 `index.vue` 和 `vars.css`。示意图如下：

<VTCodeGroup>
  <VTCodeGroupTab label="Vue2">

  ```
  |-- src
  |---- components
  |------- cwd-capsule-switch
  |----------- theme              // 主题目录
  |------------- index.vue        // 组件主题预览
  |------------- vars.css         // 可配置变量
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="React">

  ```
  |-- src
  |---- components
  |------- CwdCapluse
  |---------- theme               // 主题目录
  |------------- index.jsx        // 组件主题预览
  |------------- vars.css         // 可配置变量
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

### 配置文件 预览文件 和 `vars.css`

* 预览文件 (`index.vue` | `index.jsx`) 

<VTCodeGroup>
  <VTCodeGroupTab label="Vue2">

  ```vue
  <!-- index.vue -->
  <template>
    <demo-preview></demo-preview>
  </template>
  <script>
  // 默认可使用组件区块实例作为主题配置预览
  import createStoriesPreview from '@lcap/builder/input/vue2/stories-preview';
  import * as stories from '../stories/block.stories';

  const DemoPreview = createStoriesPreview(stories);

  export default {
    components: {
      DemoPreview,
    },
  };
  </script>
  ```


  </VTCodeGroupTab>
  <VTCodeGroupTab label="React">

  ```typescript
  // index.jsx
  // 默认可使用组件区块实例作为主题配置预览
  import createStoriesPreview from '@lcap/builder/input/react/stories-preview';
  import * as stories from '../stories/block.stories';

  export default createStoriesPreview(stories);
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

`vars.css`

```css
/**
 * @component CwdCapluse
 */
:root {
 /**
   * @desc 禁用状态边框颜色
   * @type color
   */
  --cw-capluse-border-color-disabled: #eaeaea;

  /**
   * @desc 内容字体大小
   * @type size
   */
  --cw-capluse-content-font-size: 14px;

  /**
   * @desc 大号按钮内容字体大小
   * @type size
   */
  --cw-capluse-content-font-size-lg: 16px;
}
```

`vars.css` 文件配置规范：

* 组件主题注释
  * `@component` 必需，注释支持自定义主题样式的组件的组件名称，组件名称与组件名一致。
  * `@hidden` 非必需，表示隐藏该组件主题配置功能

* 变量注释
  * `@desc` 必需，注释组件样式对应的变量
  * `@type` 注释变量类型，默认为 input，支持填写color、size、input。
  * `@group` 表示变量分组
  * `@hidden` 非必需，表示隐藏该变量配置功能

## 本地预览调试

在 `src` 目录下配置文件 `theme.stories.js`，用于本地调试主题配置预览。
<VTCodeGroup>
  <VTCodeGroupTab label="Vue2">

  ```javascript
  import ComponentPreview from 'virtual:lcap-theme-component-previews.js';

  export default {
    title: '主题配置预览',
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
      backgroundColor: { control: 'color' },
    },
  };

  export const Components = {
    name: '组件预览',
    render: (args, { argTypes }) => {
      return {
        props: Object.keys(argTypes),
        components: {
          ComponentPreview,
        },
        template: '<ComponentPreview v-bind="$props" />',
      };
    },
  };
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="React">

  ```javascript
  import ComponentPreview from 'virtual:lcap-theme-component-previews.js';

  export default {
    title: '主题配置预览',
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
      backgroundColor: { control: 'color' },
    },
  };

  export const Components = {
    name: '组件预览',
    render: ComponentPreview,
  };
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

终端运行 `npm run dev` 启动服务，预览默认主题预览页面

![](/images/theme-preview.png){data-zoomable}

## 构建发布

`npm run build` 之后 `dist-theme` 目录下会生成 `theme.config.json` 文件，与 `theme/index.html` 预览文件，上传依赖库后效果如下:

![](/images/theme-result.gif)
