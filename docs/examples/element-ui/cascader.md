---
outline: deep
---

# 级联选择器

> 此组件未使用 ElementUI Cascader 组件

* Cascader 组件源码地址如下：[源码仓库地址](https://github.com/netease-lcap/ui-libraries/tree/develop/libraries/element-pro/design/cascader)
* 接入组件源码地址如下：[源码仓库地址](https://github.com/netease-lcap/ui-libraries/blob/develop/libraries/element-pro/src/components/el-cascader-pro)

## 平台能力适配

### 数据源适配

数据需要根据 `parentField` 转换成树形数据, [数据源](../../frontend/component/platform/data-source.md)

```ts
export { useDataSource, useInitialLoaded } from '@lcap/vue2-utils/plugins';

function listToTree(dataSource, parentField, valueField = 'value') {
  if (_.isNil(parentField)) return dataSource;
  const map = new Map<string, Record<string, any>>(
    dataSource.map((item) => [_.get(item, valueField), item]),
  );
  const tree = [] as any[];
  dataSource.forEach((item) => {
    if (map.get(_.get(item, parentField))) {
      const parent = map.get(_.get(item, parentField));
      if (!parent) return;
      if (!Array.isArray(parent.children)) parent.children = [];
      parent.children.push(map.get(_.get(item, valueField)));
    } else {
      tree.push(map.get(_.get(item, valueField)));
    }
  });
  return tree;
}

export const useSelect = {
  props: ['valueField', 'labelField', 'data'],
  setup(props, ctx) {
    const valueField = props.useComputed('valueField', (v) => v || 'value');
    const textField = props.useComputed('textField', (v) => v || 'label');
    const parentField = props.useComputed('parentField', (v) => v);

    const childrenField = props.useComputed(
      'childrenField',
      (v) => v || 'children',
    );
    const options = props.useComputed('data', (data) => {
      if (_.isEmpty(data)) return undefined;
      if (_.isNil(parentField.value)) return data;
      return listToTree(data, parentField.value, valueField.value);
    });
    const keys = props.useComputed('keys', (v) => (_.isObject(v) ? v : {}));
    return {
      options,
      class: 'cw-form-field',
      keys: {
        value: valueField.value,
        label: textField.value,
        children: childrenField.value,
        ...keys.value,
      },
    };
  },
};

```


### 值属性支持 `.sync`

Vue2框架， 平台通过 `v-bind.sync` 来同步绑定变量值

```ts
// https://github.com/netease-lcap/ui-libraries/blob/develop/packages/vue2-utils/src/plugins/common/form.ts
import { createUseUpdateSync } from '@lcap/vue2-util/plugins';

// 默认根据 change 事件同步 value 
export const useUpdateSync = createUseUpdateSync();
```

## 页面编辑器适配

不需要特殊配置，设置 `idetype` 为 `element` 即可， 参考文档：[IDE页面设计器适配说明 element-配置](../../frontend/component/ide.md#element-配置)

```ts
@IDEExtraInfo({
  ideusage: {
    idetype: 'element',
  },
})
```


## `api.ts` 组件描述

参考文档：[组件配置描述编写](../../frontend/component/api.md)

```ts
/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 7,
  })
  @Component({
    title: '级联选择器',
    icon: 'cascade-select',
    description: '',
    group: 'Selector',
  })
  export class ElCascaderPro<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C,
  > extends ViewComponent {
    constructor(options?: Partial<ElCascaderProOptions<T, V, P, M, C>>) {
      super();
    }
  }

  export class ElCascaderProOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C,
  > extends ViewComponentOptions {

    @Prop({
      group: '主要属性',
      title: '无边框模式',
      description: '无边框模式',
      setter: { concept: 'SwitchSetter' },
    })
    borderless: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '父子不关联',
      description: '父子节点选中状态不再关联，可各自选中或取消',
      setter: { concept: 'SwitchSetter' },
    })
    checkStrictly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '可清空',
      description: '是否支持清空选项',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否禁用',
      description: '是否禁用组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '无数据内容',
      description: '无匹配选项时的内容，默认全局配置为 "暂无数据"。',
      setter: { concept: 'InputSetter' },
    })
    empty: any;

    @Prop({
      group: '主要属性',
      title: '是否可搜索',
      description: '是否可搜索',
      setter: { concept: 'SwitchSetter' },
    })
    filterable: nasl.core.Boolean = false;

    @Prop<ElCascaderProOptions<T, V, P, M, C>, 'textField'>({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      docDescription:
        '集合的元素类型中，用于显示文本的属性名称，支持自定义变更。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => any = ((item: any) => item.label) as any;

    @Prop<ElCascaderProOptions<T, V, P, M, C>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;

    @Prop<ElCascaderProOptions<T, V, P, M, C>, 'childrenField'>({
      group: '数据属性',
      title: '子级值字段',
      description: '树形数据子节点字段名，默认为children',
      docDescription: '树形数据子节点字段名，默认为children',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    childrenField: (item: T) => nasl.collection.List<any> = ((item: any) =>
      item.children) as any;

    @Prop({
      group: '数据属性',
      title: '父级值字段',
      description: '集合的元素类型中，用于标识父节点的属性',
      docDescription:
        '集合的元素类型中，用于标识父级字段的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    parentField: (item: T) => any;

    @Prop({
      group: '主要属性',
      title: '多选数量',
      description: '用于控制多选数量，值为 0 则不限制',
      setter: { concept: 'NumberInputSetter', min: 0 },
    })
    max: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '最小折叠数量',
      description:
        '最小折叠数量，用于多选情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠',
      setter: { concept: 'NumberInputSetter', min: 0 },
    })
    minCollapsedNum: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '是否多选',
      description: '是否允许多选',
      setter: { concept: 'SwitchSetter' },
    })
    multiple: nasl.core.Boolean = false;

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
      title: '使用完整路径',
      description: '选中值使用完整路径，输入框在单选时也显示完整路径',
      setter: { concept: 'SwitchSetter' },
    })
    showAllLevels: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: '组件尺寸。可选项：large/medium/small。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '大' }, { title: '中' }, { title: '小' }],
      },
    })
    size: 'large' | 'medium' | 'small' = 'medium';

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
      group: '主要属性',
      title: '展开下一层级的方式',
      description: '展开下一层级的方式。可选项：click/hover',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '点击' }, { title: '悬浮' }],
      },
    })
    trigger: 'click' | 'hover' = 'click';

    @Prop({
      group: '数据属性',
      title: '值',
      description: '选中项的值。',
      sync: true,
    })
    value: V | nasl.collection.List<V>;

    @Prop({
      group: '主要属性',
      title: '选中值模式',
      description:
        '选中值模式。all 表示父节点和子节点全部会出现在选中值里面；parentFirst 表示当子节点全部选中时，仅父节点在选中值里面；onlyLeaf 表示无论什么情况，选中值仅呈现叶子节点。可选项：onlyLeaf/parentFirst/all',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '叶子节点' },
          { title: '仅父节' },
          { title: '父节点和子节' },
        ],
      },
    })
    valueMode: 'onlyLeaf' | 'parentFirst' | 'all' = 'onlyLeaf';

    @Prop({
      group: '主要属性',
      title: '选中值的类型',
      description:
        '用于控制选中值的类型。single 表示输入输出值为 叶子结点值， full 表示输入输出值为全路径。可选项：single/full',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '叶子结点值' }, { title: '全路径' }],
      },
    })
    valueType: 'single' | 'full' = 'single';

    @Event({
      title: '值变化',
      description:
        '选中值发生变化时触发。TreeNodeModel 从树组件中导出。`context.node` 表示触发事件的节点，`context.source` 表示触发事件的来源。',
    })
    onChange: (event: any) => any;
  }
}

```
