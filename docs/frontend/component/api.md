---
outline: deep
---

# 组件配置描述编写

> 此文档仅简单介绍 `api.ts` 如何编写， 详细的文档，请参考[View Component API 书写指南和规范](./nasl-view-component.md)


`api.ts` 用于组件的配置面板生成，应用翻译等, 整体的格式如下:

```tsx
/// <reference types="@nasl/types" />          // 引用 nasl 类型

namespace nasl.ui {  // 命名空间，基础组件库 nasl.ui, 依赖库 extensions.[LibrayName].viewComponents

  /* 组件描述 */
  @ExtensionComponent({
    show: false,
  })
  @Component({
    title: '按钮',
    icon: 'button',
    description: '常用的操作按钮。',
    group: 'Display',
  })
  export class ElButton extends ViewComponent {         // 组件名称为 tag 的大驼峰，例如 el-button => ElButton
    constructor(options?: Partial<ElButtonOptions>) {
      super();

      /* 提供调用方法描述 */
      @Method({
        title: '打开加载中',
        description: '打开加载中',
      })
      startLoading(): void {}

      @Method({
        title: '关闭加载中',
        description: '关闭加载中',
      })
      closeLoading(): void {}
    }
  }

  export class ElButtonOptions extends ViewComponentOptions {  // 参数类名需要与 组件class 名称对齐， 例如 ElButton -> ElButtonOptions, ElSelect -> ElSelectOptions
    /* 配置参数描述 */
    @Prop({
      group: '主要属性',
      title: 'Size',
      description: '尺寸',
      setter: { concept: 'InputSetter' },
    })
    size: nasl.core.String;

    /* 更多参数描述 */
    
    /* 事件描述 */
    @Event({
      title: '点击',
      description: '在元素上按下并释放任意鼠标按钮时触发。',
    })
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;

    /* 插槽描述 */
    @Slot({
      title: 'default',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
```

api.ts 需要提供 `组件描述` `属性描述` `事件描述` `插槽描述` `方法描述` 五个方面， 使用不同注解, 下面将会对五个方面详细解释

## 组件描述

使用 `@Component` 来标注，用于组件面板识别排列；

```tsx
@Component({
  title: '按钮',                         // 组件显示名称
  icon: 'button',                       // 组件显示图标 （平台内置）
  description: '常用的操作按钮。',         // 组件描述
  /**
   * 组件分组，目前有
   * Display 展示 Form 表单 Selector 选择器 Layout 布局
   * Container 容器 Navigation 导航 Table 表格
   */
  group: 'Display',                     
})
```

![component-panel.png](/images/component-panel.png)

## 属性描述 （参数配置）

`@Prop` 主要用于描述参数，渲染参数配置表单;

```tsx
@Prop({
// 分组，目前支持 '数据属性' | '主要属性' | '交互属性' | '状态属性' | '样式属性' | '工具属性'
group: '主要属性',
// 属性配置面板显示名称
title: '尺寸',
// hover 到名称上显示具体描述
description: '尺寸',
// 属性设置器，支持参数设置器，请查看 “属性设置器”
setter: { },
})
size: nasl.core.String = 'small';  //  = ‘small’ 默认值 'small', nasl.core.String 参数类型，请查看“参数类型设置规范”

```

![prop.png](/images/prop.png)

## 属性设置器


| 设置器名称   | 说明   | 支持类型  | 效果图  |
| ------- | ------- | ------- | -------- |
| InputSetter |	输入框设置器（默认）|	any | ![](https://community.codewave.163.com/libraryUpload/app/rIjitrRRLc7S2c2PfMj2UngB0S-SSfgITWXlVWO9esKvlla1eNN8CYwyAmYBjXqTQwd6xfZDUshqc4Ad8JVtEQ_20240625194433912_ori.png) |
| SwitchSetter | 开关设置器 | nasl.core.Boolean | ![](https://community.codewave.163.com/libraryUpload/app/rIjitrRRLc7S2c2PfMj2Undx2z3qWxS-96vCHwXZllqvlla1eNN8CYwyAmYBjXqTQwd6xfZDUshqc4Ad8JVtEQ_20240625194435750_ori.png) |
| EnumSelectSetter | 枚举选择设置器 | nasl.core.String（字符串枚举形式） | ![](https://community.codewave.163.com/libraryUpload/app/rIjitrRRLc7S2c2PfMj2UkdKORQsiJsWJA2ckioqMiWvlla1eNN8CYwyAmYBjXqTQwd6xfZDUshqc4Ad8JVtEQ_20240625194435405_ori.png) |
| CapsulesSetter | 胶囊设置器 | nasl.core.String（字符串枚举形式） | ![](https://community.codewave.163.com/libraryUpload/app/rIjitrRRLc7S2c2PfMj2UqhKAosjlYxk_ol1B8jPXRWvlla1eNN8CYwyAmYBjXqTQwd6xfZDUshqc4Ad8JVtEQ_20240625194434044_ori.png) |
| NumberInputSetter | 数字输入设置器 | nasl.core.Integer \| nasl.core.Decimal | ![](https://community.codewave.163.com/libraryUpload/app/rIjitrRRLc7S2c2PfMj2UmKBf1g3BW78T4uF9Msao9yvlla1eNN8CYwyAmYBjXqTQwd6xfZDUshqc4Ad8JVtEQ_20240625194435068_ori.png) |
| IconSetter | 图标设置器 | nasl.core.String | ![](https://community.codewave.163.com/libraryUpload/app/rIjitrRRLc7S2c2PfMj2Ul8NNrAOsI9gUKQy1SbC3tavlla1eNN8CYwyAmYBjXqTQwd6xfZDUshqc4Ad8JVtEQ_20240625194435109_ori.png) ![](https://community.codewave.163.com/libraryUpload/app/rIjitrRRLc7S2c2PfMj2UjOG_LiEgjaj_F_t3JpXbgivlla1eNN8CYwyAmYBjXqTQwd6xfZDUshqc4Ad8JVtEQ_20240625194435958_ori.png) |
| ImageSetter | 图片设置器 | nasl.core.String | ![](https://community.codewave.163.com/libraryUpload/app/rIjitrRRLc7S2c2PfMj2UkpXHFVPJ-dfUWqX-PxvS02vlla1eNN8CYwyAmYBjXqTQwd6xfZDUshqc4Ad8JVtEQ_20240625194434095_ori.png) ![](https://community.codewave.163.com/libraryUpload/app/rIjitrRRLc7S2c2PfMj2UhE-Yx7gWDkfs-CkjW_R_YSvlla1eNN8CYwyAmYBjXqTQwd6xfZDUshqc4Ad8JVtEQ_20240625194434153_ori.png) |
| PropertySelectSetter | 属性选择设置器 | nasl.core.String | ![](https://community.codewave.163.com/libraryUpload/app/rIjitrRRLc7S2c2PfMj2Un2PD9_CYxwRDQwmYIonw5nTcv7BSdaiN-Ay1KdaxfUBaBR6ZMaKlQb_KUBW25I3lQ_20240625194435524_ori.png) |


设计器demo 代码

```tsx
Prop({
  group: '主要属性',
  title: '文本',
  description: '按钮内容',
  setter: { concept: 'InputSetter' },
})
text: nasl.core.String = '';
@Prop({
  group: '状态属性',
  title: 'Disabled',
  description: '是否禁用状态',
  setter: { concept: 'SwitchSetter' },
})
disabled: nasl.core.Boolean = false;

@Prop({
  group: '主要属性',
  title: 'Icon',
  description: '图标类名',
  setter: { concept: 'IconSetter' },
})
icon: nasl.core.String;

@Prop({
  title: '图标位置',
  description: '设置图标居左或居右显示',
  setter: {
    concept: 'EnumSelectSetter',
    options: [{ title: '左' }, { title: '右' }],
  },
})
iconPosition: 'left' | 'right' = 'left';
```

## 属性类型设置规范

使用 `api.ts` 属性描述，每个属性类型强制要求使用 nasl 提供的类型来写, 支持类型如下：

```tsx
declare namespace nasl.core {
    export type Any = any;
    export type Boolean = boolean;
    export type Integer = number;
    export type Decimal = number;
    export type String = string;

    export class Binary {
        accept: 'Binary';
    }

    export class Date { // 组件接收的是string 类型
        accept: 'Date';
    }

    export class Time {// 组件接收的是string 类型
        accept: 'Time';
    }

    export class DateTime {// 组件接收的是string 类型
        accept: 'DateTime';
    }
}

// 集合类型
nasl.collection.List<T>

// union 类型
'small' | 'large' | 'medium'

// 匿名数据结构
{ list: nasl.collection.List<T>, total: nasl.core.Integer }
```

## 属性设置联动

**联动显隐和禁用**

属性联动显隐使用`if`进行配置。该选项接收一个箭头函数，表示该属性在什么情况下显示。`_`参数表示 IDE 中所有属性的当前状态。
比如下面的例子表示“显示总条数”这个属性选项在“分页”选项开启时才展示。

```tsx
@Prop<UTableViewOptions<T, V, P, M>, 'showTotal'>({
    title: '显示总条数',
    if: _ => _.pagination === true,
    ...
})
showTotal: nasl.core.Boolean = false;
```

联动禁用同理，配置`disabledIf`即可。

**联动更新和清除**

属性联动修改用`onChange`进行配置。该选项接收一个复杂的数组类型。
下面的示例表示 checkAll 属性改变时，清除`min`和`max`属性值。

```tsx
@Prop<UCheckboxesOptions<T, V, C>, 'checkAll'>({
    ...
    onChange: [
        { clear: ['min', 'max'] }
    ],
})
checkAll: nasl.core.Boolean = false;
```

下面是一个复杂的联动更新的例子，表示当图片裁剪形状改变时，根据不同情况，修改另一个裁剪框的高度值。

```tsx
@Prop<UUploaderOptions, 'cropperPreviewShape'>({
    title: '图片裁剪框预览形状',
    onChange: [
        { update: { cropperBoxHeight: 200 }, if: _ => _ === 'rect' },
        { update: { cropperBoxHeight: 0 }, if: _ => _ === 'circle' },
        { update: { cropperBoxHeight: 0 }, if: _ => _ === 'square' },
    ],
    if: _ => _.openCropper === true && _.multiple !== true,
    ...
})
cropperPreviewShape: 'rect' | 'square' | 'circle' = 'circle';
```

## 事件描述

使用 `@Event` 来标注支持的事件，需要注意以下几点：

1. 事件名需要以 `on` 开头的小驼峰，例如 `click` 需要写为 `onClick`， `row-click` 写为 `onRowClick`;
2. 事件参数仅允许有一个参数 `event`, 多个参数的情况需要转为一个匿名结构对象, 例如 `onSelect(value, item)` 需要转换为 `onSelect({ value, item })`， [事件转换](./platform/event.md),
3. 返回参数统一为 `void`, 匿名数据结构属性也必须使用 `nasl 支持的类型`;

```tsx
@Event({
    title: '改变后',
    description: '单选或多选值改变后触发',
})
onChange: (event: {
    value: nasl.core.String;
    values: nasl.collection.List<String>;
    oldValues: nasl.collection.List<String>; 
    items: nasl.collection.List<String>;
}) => void;
```

## 插槽描述

使用 `@Slot` 来描述组件插槽，插槽属性名以 `slot` 开头的小驼峰命名， 例如：默认插槽 `slotDefault`, 具名插槽例如 `<slot name="header"></slot>` 写为 `slotHeader`

**默认插槽配置**

```tsx
// 以Menu 为例
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
```

![slot-snippet.png](/images/slot-snippet.png)

**具名插槽配置**

```tsx
@Slot({
    title: '头部内容',
    description: '头部内容',
})
slotHeader: () => Array<ViewComponent>;
```

**作用域插槽**

```tsx
@Slot({
    title: '循环项的插槽',
    description: '自定义选项的结构和样式',
})
slotItem: (current: Current<T>) => Array<ViewComponent>;

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

## 方法描述

使用 `@Method` 来描述组件提供的方法，如果有参数 则需要 `@Param` 对参数进行描述

```tsx
@Method({
  title: '打开加载中',
  description: '打开加载中',
})
startLoading(): void {} 
```

![method.png](/images/method.png)

## 子组件描述(el-menu 与 el-menu-item 等)

与父组件写在同一个 `api.ts`， 默认顺序为，先写 `el-menu` (第一个解析到的为父组件，子组件不会出现在组件面板内), 然后再写 `el-menu-item` 等；
