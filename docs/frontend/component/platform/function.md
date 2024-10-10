---
outline: deep
---

# 函数设置器 <Badge type="tip" text="^3.10.0" />

用于 `Function` 类型的函数设置 (`AnonymousFunctionSetter`)，例如： 表格行样式、文本格式化、日期格式化函数等等，

```ts
// api.ts
@Prop({
    group: '样式属性',
    title: '列表行动态样式',
    description: '动态设置列表项背景色、字体颜色等样式',
    docDescription: '动态设置列表项背景色、字体颜色等样式',
    bindOpen: true,
    setter: {
        concept: 'AnonymousFunctionSetter',
    }
})
rowStyle: (current: Current<T>) => { 
    /**
     * @title 列表行背景颜色
     */
    backgroundColor?: nasl.core.String, 
    /**
     * @title 列表行字体颜色
     */
    color?: nasl.core.String 
};
```

* 目前仅支持同步函数，返回值不允许是 `Promise`
