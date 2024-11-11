---
outline: deep
---

# 插槽处理

使用 `@Slot` 来描述组件插槽，插槽属性名以 `slot` 开头的小驼峰命名， 例如：默认插槽 `slotDefault`, 具名插槽例如 `<slot name="header"></slot>` 写为 `slotHeader`

## 默认插槽配置

```tsx
// 在 @Component 上增加ide 配置
@ExtensionComponent({
  // ...
  ideusage: {
    idetype: 'container',
    structured: true,           // 设置为 true 才会出现 ”+“ 按钮
  }
})
export class ElMenuOptions extends ViewComponentOptions {
  // 以Menu 为例
  // ...
  @Slot({
    title: 'Default',  // 名称
    description: '内容', // 描述
    snippets: [ // ide 编辑 “+” 点击后的提示，  title提示描述， code 点击后默认添加代码
    {
        title: '添加下拉菜单分组',
        code: '<el-menu-item-group></el-menu-item-group>',
      },
      { title: '菜单项', code: '<el-menu-item></el-menu-item>' },
    ],
  })
  slotDefault: () => Array<ViewComponent>;
}
```

![slot-snippet.png](/images/slot-snippet.png)

## 具名插槽配置

```tsx
export class XxxOptions extends ViewComponentOptions {
  // ...
  @Slot({
      title: '头部内容',
      description: '头部内容',
  })
  slotHeader: () => Array<ViewComponent>;
}
```

## 作用域插槽

```tsx
export class XxxOptions extends ViewComponentOptions {
  // ...
  @Slot({
      title: '循环项的插槽',
      description: '自定义选项的结构和样式',
  })
  slotItem: (current: Current<T>) => Array<ViewComponent>;
}

// current 参数类型
declare namespace nasl.ui {
  export class Current<T> {
    item: T;
    index: nasl.core.Integer;
    rowIndex: nasl.core.Integer;
    columnIndex: nasl.core.Integer;
    value: nasl.core.String;
  }
}
```

* Current 未平台默认插槽参数类型，也支持自定义类型

```ts
slotItem: (current: {
  row: T,
  disabled: nasl.core.Boolean,
  // .... 
})
```

## 页面编辑器适配

```ts
// 在 @Component 上增加ide 配置
@ExtensionComponent({
  // ...
  ideusage: {
    idetype: 'container',
  }
})
```

* `idetype` 为 `container` 的组件可以插入子节点

其他配置项可查看文档 [页面编辑器适配说明](../ide.md#container-配置)
