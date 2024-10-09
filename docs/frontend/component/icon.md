---
outline: deep
---

# 图标库扩展

## 自定义组件面板图标

### 功能说明

自定义在IDE右侧组件列表中展示的组件图标。

![](/images/component-panel-icon.png){data-zoomable}

### 实现步骤

1. 在项目文件根目录下创建文件夹 `assets` ，在文件夹下添加 `.svg` 格式图标文件。

![](/images/file-icon1.png){width=300px}

2. `api.ts` 中，通过 `@Component` 装饰器定义图标 `icon`，`icon` 对应的文件支持根据 `assets` 匹配路径。

```typescript
@Component({
  // ...
  icon: 'demo.svg',
})
```

## 扩展图标选择器图标库

### 功能说明

组件属性中包含图标设置器 `IconSetter` 时，自定义可选择的图标库。

![alt text](/images/icon-setter-pr.png)

### 实现步骤

1. 在 ide 目录下创建 icons 相关文件。示意图如下：

```
|-- ide
|---- icons
|-------- icon-font.js
|-------- icon-config.json
|-------- index.js
|---- index.js           // ide 扩展打包入口文件
```

需要使用 [iconfont.cn](https://www.iconfont.cn/) 管理图标库，复制项目中的 `symbol` 文件和 `JSON配置` 到目录下。

![](/images/iconfont.png){data-zoomable}

2. 在 `ide/icons/index.js` 增加图标配置。

```javascript
// 导入 iconfont.cn symbol js
import './icon-font.js';
// 导入 iconfont.cn  复制json
import IconConfig from './icon-font.json';

export default [{
    name: 'toolbox-custom-icons',
    config: IconConfig,
}];
```

3. ide扩展入口文件 `ide/index.js`，将入口文件导出为 `icons` 。

```javascript
export { default as icons } from './icons';
```

4. 可在 `api.ts` 中图标设置器（IconSetter）使用自定义图标库。

```typescript
@Prop({
  setter: {
    concept: 'IconSetter',
    customIconFont: 'toolbox-custom-icons', // 名称与扩展图标一致
  }
})
```

![](/images/icon-code.png){data-zoomable}

### 使用效果演示
以下效果为依赖库打包发布并在IDE中引入后的使用演示。

![](/images/icon-preview.gif){data-zoomable}
