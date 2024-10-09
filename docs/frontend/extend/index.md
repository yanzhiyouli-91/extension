---
outline: deep
---

# 对基础组件二次开发 <Badge type="tip" text="^3.10.0" />

在平台的实际使用中，用户可能会发现当前提供的基础组件功能尚不足以完全满足需求，或更倾向于根据个人或项目的特定需求对基础组件进行进一步的定制与扩展，即所谓的“二次开发”。

IDE从`3.10.0`版本开始支持使用扩展组件替换基础组件。扩展组件通过依赖库引入，以下将介绍如何使用依赖库对基础组件进行二次开发。

> 阅读本文之前，请先了解[前端依赖库开发指南](../get-started/environment.md)，保证自身已经熟悉依赖库开发流程及常规步骤。

## 初始化依赖库

### 创建依赖库时选择添加 codewave 基础组件包。

执行 `lcap init` 创建依赖库时选择添加 codewave 基础组件包。

```bash
# ...
whether to add codewave UI package?[是否添加 codewave 基础组件包] (yes/no) yes

please select type [选择端]:
√ pc
|--- h5
please input version [请输入组件版本（ide 左下角可查看组件库版本）]： 1.0.0
```

![](/images/overload-command.png)

#### 获取组件库版本号

点击IDE左下角 帮助-关于IDE。

![](/images/r1.png){width=200px}

![](/images/ide-version.png){width=400px}


### 生成依赖库目录结构

选择添加基础组件包后会新增 `.lcap` 目录存放下载的平台依赖包；

```
library_example
|-- ...                             # ..
|-- .lcap                    # 平台依赖
|----- lcap-ui                      # 组件库相关文件
|-------- dist
|---------- nasl.ui.json
|---------- nasl.ui.d.ts
|---------- index.js
|---------- index.css
|-------- package
|--- ...
```

### 依赖库中使用基础组件

选择添加基础组件包后，依赖库中可以通过 `virtual-lcap:lcap-ui` 直接调用基础组件，脚手架会自动加载对应的js模块、css代码；

```js
import { Button, Modal } from 'virtual-lcap:lcap-ui';
```

## 创建组件

### 选择重载组件
如果，本地项目有 `.lcap`目录， 执行 `lcap create component` 创建依赖库组件，会提示**是否重载基础组件**

```
Whether overload base component? (是否重载基础组件)
— None (默认)
√ Button (按钮)
— Select (选择器)
重载基础组件,名称仅允许增加前缀
Please Input overload prefix? (请输入重载名称前缀，例如 ex) ex
fork base Component Button ? (yes, no)
Fork 组件后，完全独立，无法继续跟随基础组件能力升级变化，请慎重处理；
```

* 选择 fork 组件会更新 `package.json` 需要重新安装包 `npm install`
* 仅 `Vue2` 框架下 CloudUI 或者 h5组件库支持 `fork` 代码的方式对组件进行修改

### 生成组件目录结构

选择重载的组件后，会复制基础组件`拖拽区块示例(block)`、`截图(screenshot)`、`组件nasl描述 （api.ts）` 等文件。

```
|-- Button
|---- screenshots                     // 复制基础组件截图
|---- drawings                        // 复制基础组件截图
|---- stories
|------- block.stories.js             // 复制基础组件区块示例
|---- index.js
|---- api.ts                          // 复制基础组件 api.ts
```

生成 api.ts里增加替换组件声明

```typescript
@ExtensionComponent({
  replaceNaslUIComponent: 'Button', // 替换掉组件名称
})
@Component({
  title: '按钮'
})
class ExtendButton extends ViewComponent {
// ... 基础组件 Button 可访问属性、方法
constructor(options?: Partial<ExtendButtonOptions>) { super(); }
}
class ExtendButtonOptions extends ViewComponentOptions {
// ... 基础组件 Button 属性、插槽、事件
}
```

## 发布

与标准依赖库发布方式一致，发布后加载此依赖库会提示是否替换基础组件；

![](/images/component-replace.png)
