---
outline: deep
---

# 选择器

> 此组件未使用 ElementUI Select 组件

* Select 组件源码地址如下：[源码仓库地址](https://github.com/netease-lcap/ui-libraries/tree/develop/libraries/element-pro/design/select)
* 接入组件源码地址如下：[源码仓库地址](https://github.com/netease-lcap/ui-libraries/blob/develop/libraries/element-pro/src/components/el-select-pro)

## 平台能力适配

## 页面编辑器适配

## `api.ts` 组件描述

参考文档：[组件配置描述编写](../../frontend/component/api.md)

```ts
/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      structured: true,
      forceUpdateWhenAttributeChange: true,
      childAccept: "target.tag === 'el-option-pro'",
      events: {
        click: true,
      },
    },
  })
  @Component({
    title: '选择器',
    icon: 'select',
    description: '',
    group: 'Selector',
  })
  export class ElSelectPro<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C,
  > extends ViewComponent {
    constructor(options?: Partial<ElSelectProOptions<T, V, P, M, C>>) {
      super();
    }
  }

  export class ElSelectProOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C,
  > extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '宽度自适应',
      description: '宽度随内容自适应',
      setter: { concept: 'SwitchSetter' },
    })
    autoWidth: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '无边框模式',
      description: '无边框模式',
      setter: { concept: 'SwitchSetter' },
    })
    borderless: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否可清空',
      description: '是否可以清空选项',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: '允许用户创建新条目',
    //   description: '是否允许用户创建新条目，需配合 filterable 使用',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // creatable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '禁用组件',
      description: '是否禁用组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '为空的内容',
      description: '当下拉列表为空时显示的内容。',
      setter: { concept: 'InputSetter' },
    })
    empty: any;
    @Prop({
      group: '主要属性',
      title: '是否可搜索',
      description:
        '是否可搜索，默认搜索规则不区分大小写，全文本任意位置匹配。如果默认搜索规则不符合业务需求，可以更为使用 `filter` 自定义过滤规则',
      setter: { concept: 'SwitchSetter' },
    })
    filterable: nasl.core.Boolean = false;

    @Prop<ElSelectProOptions<T, V, P, M, C>, 'textField'>({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      docDescription:
        '集合的元素类型中，用于显示文本的属性名称，支持自定义变更。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => any = ((item: any) => item.text) as any;

    @Prop<ElSelectProOptions<T, V, P, M, C>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;

    @Prop({
      group: '主要属性',
      title: '最小折叠数量',
      description:
        '最小折叠数量，用于多选情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠',
      setter: { concept: 'NumberInputSetter' },
    })
    minCollapsedNum: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: '是否多选',
      description: '是否允许多选',
      setter: { concept: 'SwitchSetter' },
    })
    multiple: M = false as any;

    @Prop({
      group: '数据属性',
      title: '数据源',
      description:
        '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription:
        '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
    })
    dataSource:
      | { list: nasl.collection.List<T>; total: nasl.core.Integer }
      | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription:
        '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。',
    })
    dataSchema: T;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '占位符',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '只读状态',
      description: '只读状态，值为真会隐藏输入框，且无法打开下拉框',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示右侧箭头',
      description: '是否显示右侧箭头，默认显示',
      setter: { concept: 'SwitchSetter' },
    })
    showArrow: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '组件尺寸',
      description: '组件尺寸。可选项：small/medium/large。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '正常' }, { title: '大' }],
      },
    })
    size: 'small' | 'medium' | 'large' = 'medium';

    @Prop({
      group: '主要属性',
      title: '输入框状态',
      description: '输入框状态。可选项：default/success/warning/error',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '默认' },
          { title: '成功' },
          { title: '警告' },
          { title: '错误' },
        ],
      },
    })
    status: 'default' | 'success' | 'warning' | 'error' = 'default';

    @Prop({
      group: '数据属性',
      sync: true,
      title: '选中值',
      description: '选中值。支持语法糖 `v-model`。',
      setter: { concept: 'InputSetter' },
    })
    value: M extends true ? (C extends '' ? nasl.collection.List<V> : nasl.core.String) : V;

    @Event({
      title: '选中值变化时',
      description:
        '选中值变化时触发。`context.trigger` 表示触发变化的来源；`context.selectedOptions` 表示选中值的完整对象，数组长度一定和 `value` 相同；`context.option` 表示当前操作的选项，不一定存在。',
    })
    onChange: (event: {
      value: M extends true ? (C extends '' ? nasl.collection.List<V> : nasl.core.String) : V;
      option: T;
      selectedOptions: T[];
      trigger: 'clear' | 'tag-remove' | 'backspace' | 'check' | 'uncheck' | 'default';
    }) => any;

    @Event({
      title: '清除时触发',
      description: '点击清除按钮时触发',
    })
    onClear: (event: {}) => any;

    @Event({
      title: '输入框值变化时',
      description:
        '输入框值发生变化时触发，`context.trigger` 表示触发输入框值变化的来源：文本输入触发、清除按钮触发、失去焦点等。',
    })
    onInputChange: (event: nasl.core.String) => any;

    @Event({
      title: '搜索事件',
      description: '用于远程搜索,启用时间后会取消本地搜索',
    })
    onSearch: (event: any) => any;

    @Slot({
      title: 'Default',
      description: '内容',
      snippets: [
        {
          title: '下拉选项',
          code: '<el-option-pro value="12" label="选项"></el-option-pro>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    show: true,
    ideusage: {
      parentAccept: "['el-select-pro'].includes(target.tag)",
    },
  })
  @Component({
    title: '选择器选项',
    icon: 'option',
    description: '',
    group: 'Selector',
  })
  export class ElOptionPro<T, V> extends ViewComponent {
    constructor(options?: Partial<ElOptionProOptions<T, V>>) {
      super();
    }
  }

  export class ElOptionProOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '是否禁用该选项',
      description: '是否禁用该选项',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '选项标题',
      description: '选项标题，在选项过长时hover选项展示',
      setter: { concept: 'InputSetter' },
    })
    title: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '选项值',
      description: '选项值',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String | nasl.core.Decimal | nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '选项名称',
      description: '选项名称',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String | nasl.core.Decimal;
  }
}

```
