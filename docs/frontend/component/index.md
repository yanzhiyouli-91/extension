---
outline: deep
---
<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '../../.vitepress/components'
</script>

# 概述


## 初始化组件目录

在[创建依赖库](../get-started/init.md)之后, 可使用 `lcap create` 来初始化组件目录

![](/images/create-component.png)

创建组件时，需要设置组件名称（组件使⽤大驼峰的格式命名，如CapsuleSelect），组件别名以及组件的适用终端，默认选择为PC端。如下：

![](/images/create-component1.png)

## 组件目录介绍

<VTCodeGroup>
  <VTCodeGroupTab label="Vue2">

  ```
  |- components
  |-- cwd-casplue-switch                         # 组件名称
  |---- stories
  |------ block.stories.js                       # 运行示例，必需
  |------ examples.stories.js                    # 调试demo
  |---- api.ts                                   # 组件描述文件
  |---- index.vue                                # 组件实现代码
  |---- index.ts                                 # 组件导出文件
  |---- index.module.css                         # 组件样式目录
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="React">

  ```
  |- components
  |-- CasplueSwitch                               # 组件名称
  |---- stories                                   # 调试demo 目录
  |------ block.stories.tsx                       # 运行示例，必需
  |------ examples.stories.tsx                    # 调试demo
  |---- api.ts
  |---- index.tsx                                 # 组件目录
  |---- index.module.css                          # 组件样式目录
  ```

  </VTCodeGroupTab>
</VTCodeGroup>

## 接入说明

接入需要完成的内容如下图：

![](/images/component.png)

* `api.ts` 组件配置说明， 描述用户组件的配置面板生成，应用翻译等 `必需`
* `block.stories.{js|tsx|jsx}` 组件拖转到画布后初始生成的代码示例 `必需`
* 页面编辑器适配，IDE 页面编辑画布适配，用于在页面上的展示 `必需`
* IDE 功能适配 - 主题配置，国际化能力等扩展能力适配 `可选`
* 平台能力适配 - 对平台提供能力的适配 `可选`

