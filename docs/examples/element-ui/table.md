---
outline: deep
---

# 表格

> Element UI Table 组件无法支持虚拟滚动、懒加载等高阶能力，基础组件库表格未使用 element ui 的表格组件

* Table 组件源码地址如下：[源码仓库地址](https://github.com/netease-lcap/ui-libraries/tree/develop/libraries/element-pro/design/table)
* 接入组件源码地址如下：[源码仓库地址](https://github.com/netease-lcap/ui-libraries/blob/develop/libraries/element-pro/src/components/el-table-pro)

## 平台能力适配

### 事件转换

将多个参数的事件合并为一个 `Event` 对象, 参考文档：[事件转换](../../frontend/component/platform/event.md)

```ts
// ...
onSelectChange: (selectedRowKeys: Array<string | number>, context: SelectOptions<any>) => {
  const onSelectChange = props.get('onSelectChange');

  if (isFunction(onSelectChange)) {
    onSelectChange({
      selectedRowKeys,
      ...context,
    });
  }
},
```

### 数据源功能

在 [数据源功能适配](../../frontend/component/platform/data-source.md) 基础上，表格组件还需要处理 **分页**, **排序** 等功能重新加载数据逻辑；

```ts
import _, { isFunction, isNil } from 'lodash';
import {
  computed, ref, watch, onMounted,
} from '@vue/composition-api';
import { $ref, $render, createUseUpdateSync } from '@lcap/vue2-utils/plugins';

export { useDataSource } from '@lcap/vue2-utils/plugins'; // 公共数据源功能 https://github.com/netease-lcap/ui-libraries/blob/develop/packages/vue2-utils/src/plugins/common/data-source.ts

export const useTable = {
  props: ['onPageChange', 'page', 'pageSize', 'pageSizeOptions', 'showTotal', 'showJumper'],
  setup(props, ctx) {
    const current = props.useRef('page', (v) => v ?? 1);
    const sorting = props.useComputed('sorting', (value) => value);
    const onLoadData = props.get('onLoadData');
    const pageSize = props.useRef('pageSize', (v) => v ?? 10);

    // 分页事件处理
    const onPageChange = props.useComputed('onPageChange', (value) => {
      return (pageInfo) => {
        pageSize.value = pageInfo.pageSize;
        current.value = pageInfo.current;
        _.attempt(onLoadData, {
          page: pageInfo.current,
          size: pageInfo.pageSize,
        });
        _.attempt(value, pageInfo);
      };
    });

    const pageSizeOptions = props.useComputed('pageSizeOptions', (value) => {
      try {
        const list = JSON.parse(value);
        return Array.isArray(list) ? list : [10, 20, 50];
      } catch (e) {
        return [10, 20, 50];
      }
    });

    // 分页属性合并
    const totalContent = props.useComputed('showTotal', (value: boolean) => value ?? true);
    const showJumper = props.useComputed('showJumper', (value: boolean) => value ?? true);
    const total = props.useComputed('total', (value) => value ?? 10);
    const paginationProps = props.useComputed('pagination');
    const pagination = computed(() => {
      if (paginationProps.value === false) {
        return false;
      }
      return {
        pageSizeOptions: pageSizeOptions.value,
        showJumper: showJumper.value,
        current: current.value,
        total: total.value,
        pageSize: pageSize.value,
        totalContent: totalContent.value,
      };
    });

    const onSortChange = props.useComputed('onSortChange', (value) => {
      return (...arg) => {
        _.attempt(onLoadData, {
          page: current.value,
          size: pageSize.value,
          sort: _.get(arg, '0.sortBy'),
          order: _.get(arg, '0.descending') ? 'desc' : 'asc',
        });
        _.attempt(value, ...arg);
      };
    });

    onMounted(() => {
      if (_.isFunction(onLoadData)) {
        onLoadData?.({
          page: current.value,
          size: pageSize.value,
          sort: sorting.value?.field,
          order: sorting.value?.order,
        });
      }
    });

    return {
      onPageChange,
      pagination,
      onSortChange,
      [$ref]: {
        reload() { // 提供 reload 方法
          current.value = 1;
          if (_.isFunction(onLoadData)) {
            onLoadData?.({
              page: current.value,
              size: pageSize.value,
              sort: sorting.value?.field,
              order: sorting.value?.order,
            });
          }
        },
      },
      // ...
    };
  },
};
```

## 页面编辑器适配

```ts
@IDEExtraInfo({
  ideusage: {
    idetype: 'container',
    structured: true, // 允许添加子组件
    dataSource: {  // 数据源功能
      display: 3, // 设置数据源时渲染3条数据
      loopElem: 'table > tbody > tr',
      emptySlot: { // 空插槽判断
        condition: 'this.elementsLength() === 0',
        accept: "target.concept === 'Entity'",
      },
      refInLoop: { // 旧 ide 适配配置，可忽略
        child: 'ElTableColumnPro',
        slot: 'cell',
        useRef: 'argus?.[0]?.index === 0',
      },
    },
    childAccept: "target.tag === 'el-table-column-pro'", // 子组件仅允许 el-table-column-pro
  },
})
```

参考文档：[IDE页面设计器适配说明 container-配置](../../frontend/component/ide.md#container-配置)

## api.ts 组件描述

参考文档：[组件配置描述编写](../../frontend/component/api.md)

```ts
/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
    order: 1,
    ideusage: {
      idetype: 'container',
      structured: true,
      dataSource: {
        display: 3,
        loopElem: 'table > tbody > tr',
        emptySlot: {
          condition: 'this.elementsLength() === 0',
          accept: "target.concept === 'Entity'",
        },
        refInLoop: {
          child: 'ElTableColumnPro',
          slot: 'cell',
          useRef: 'argus?.[0]?.index === 0',
        },
      },
      childAccept: "target.tag === 'el-table-column-pro'",
    },
  })
  @Component({
    title: '数据表格',
    icon: 'table-view',
    description:
      '用于展示大量结构化数据。支持排序、过滤（筛选）、分页、自定义操作等复杂功能。',
    group: 'Table',
  })
  export class ElTablePro<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
  > extends ViewComponent {
    @Prop({
      title: '数据',
    })
    data: ElTableProOptions<T, V, P, M>['dataSource'];

    @Prop({
      title: '分页大小',
    })
    size: ElTableProOptions<T, V, P, M>['pageSize'];

    @Prop({
      title: '当前页数',
    })
    page: ElTableProOptions<T, V, P, M>['page'];

    @Prop({
      title: '排序属性',
    })
    order: nasl.core.String;

    @Prop({
      title: '排序字段',
    })
    sort: nasl.core.String;

    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    constructor(options?: Partial<ElTableProOptions<T, V, P, M>>) {
      super();
    }
  }

  export class ElTableProOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
  > extends ViewComponentOptions {

    @Prop({
      group: '主要属性',
      sync: true,
      title: '选中值',
      description: '选中行。',
    })
    selectedRowKeys: nasl.collection.List<V> | V;

    @Prop({
      group: '主要属性',
      title: '是否显示表格边框',
      description: '是否显示表格边框',
      setter: { concept: 'SwitchSetter' },
    })
    bordered: nasl.core.Boolean = true;

    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑',
      docDescription:
        '表格展示的数据。数据源可以绑定变量或者逻辑。变量或逻辑的返回值可以是数组，也可以是对象。对象格式为{list:[], total:10}',
      designerValue: [{}, {}, {}],
    })
    dataSource:
      | { list: nasl.collection.List<T>; total: nasl.core.Integer }
      | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription:
        '表格每一行的数据类型。该属性为展示属性，由数据源推导得到，无需填写',
    })
    dataSchema: T;

    @Prop({
      group: '主要属性',
      title: '表格高度',
      description:
        '表格高度，超出后会出现滚动条。示例：100,  "30%",  "300"。值为数字类型，会自动加上单位 px。如果不是绝对固定表格高度，建议使用 `maxHeight`',
      setter: { concept: 'InputSetter' },
    })
    height: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '是否显示鼠标悬浮状态',
      description: '是否显示鼠标悬浮状态',
      setter: { concept: 'SwitchSetter' },
    })
    hover: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '表格最大高度',
      description:
        '表格最大高度，超出后会出现滚动条。示例：100, "30%", "300"。值为数字类型，会自动加上单位 px',
      setter: { concept: 'InputSetter' },
    })
    maxHeight: nasl.core.String | nasl.core.Decimal;

    @Prop<ElTableProOptions<T, V, P, M>, 'pagination'>({
      group: '主要属性',
      title: '分页',
      description: '是否显示分页',
      setter: { concept: 'SwitchSetter' },
      onChange: [{
        clear: [
          'pageSizeOptions',
          'pageSize',
          'page',
        ],
        if: (_) => !_,
      }]
    })
    pagination: nasl.core.Boolean = true;

    @Prop<ElTableProOptions<T, V, P, M>, 'pageSizeOptions'>({
      group: '数据属性',
      title: '每页条数选项 ',
      description: '每页条数切换器的选项',
      setter: { concept: 'InputSetter' },
      if: (_) => _.pagination !== false,
    })
    pageSizeOptions: nasl.core.String = '[10, 20, 50]';

    @Prop<ElTableProOptions<T, V, P, M>, 'pageSize'>({
      group: '数据属性',
      title: '默认每页条数',
      docDescription: '每页的数据条数。默认20条。在"分页"属性开启时有效',
      setter: {
        concept: 'NumberInputSetter',
      },
      if: (_) => _.pagination !== false,
    })
    pageSize: nasl.core.Integer = 10;

    @Prop<ElTableProOptions<T, V, P, M>, 'page'>({
      group: '数据属性',
      title: '当前页数',
      description: '当前默认展示在第几页',
      docDescription: '当前加载的表格页。默认1。在"分页"属性开启时有效',
      setter: {
        concept: 'NumberInputSetter',
      },
      if: (_) => _.pagination !== false,
    })
    page: nasl.core.Integer = 1;

    @Prop<ElTableProOptions<T, V, P, M>, 'showTotal'>({
      group: '数据属性',
      title: '显示总条数',
      description: '是否显示总条数',
      setter: { concept: 'SwitchSetter' },
      if: (_) => _.pagination !== false,
    })
    showTotal: nasl.core.Boolean = true;

    @Prop<ElTableProOptions<T, V, P, M>, 'showJumper'>({
      group: '数据属性',
      title: '显示跳转输入',
      description: '是否显示跳转页码控制器',
      setter: { concept: 'SwitchSetter' },
      if: (_) => _.pagination !== false,
    })
    showJumper: nasl.core.Boolean = true;

    @Prop({
      group: '数据属性',
      title: '初始化排序规则',
      description: '设置数据初始化时的排序字段和顺序规则',
      docDescription:
        '支持选择数据表格数据源中的某一条数据，配置默认排序规则，支持升序和降序',
    })
    sorting: {
      field: nasl.core.String;
      order: nasl.core.String;
      compare?: Function;
    } = { field: undefined, order: 'desc' };
    
    @Prop<ElTableProOptions<T, V, P, M>, 'rowKey'>({
      group: '数据属性',
      title: '值字段',
      description: '在单选、多选操作、渲染树形数据中，指定数据唯一值的字段',
      docDescription:
        '在表格开启了单选、多选操作、渲染树形数据中，指定数据唯一值的字段',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    rowKey: (item: T) => any = ((item: any) => item.id) as any;

    @Prop({
      group: '主要属性',
      title: '是否显示表头',
      description: '是否显示表头',
      setter: { concept: 'SwitchSetter' },
    })
    showHeader: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '表格尺寸',
      description:
        '表格尺寸，支持全局配置 `GlobalConfigProvider`，默认全局配置值为 `medium`。可选项：small/medium/large。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '中' }, { title: '大' }],
      },
    })
    size: 'small' | 'medium' | 'large' = 'medium';

    @Prop({
      group: '主要属性',
      title: '是否显示斑马纹',
      description: '是否显示斑马纹',
      setter: { concept: 'SwitchSetter' },
    })
    stripe: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '表格内容的总宽度',
      description:
        '表格内容的总宽度，注意不是表格可见宽度。主要应用于 `table-layout: auto` 模式下的固定列显示。`tableContentWidth` 内容宽度的值必须大于表格可见宽度',
      setter: { concept: 'InputSetter' },
    })
    tableContentWidth: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '表格布局方式',
      description: '表格布局方式，`<table>` 元素原生属性。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'auto' }, { title: 'fixed' }],
      },
    })
    tableLayout: 'auto' | 'fixed' = 'fixed';

    @Event({
      title: '单元格点击时',
      description: '单元格点击时触发。',
    })
    onCellClick: (event: any) => any;

    @Event({
      title: '选中行变化时',
      description: '选中行变化时触发',
    })
    onSelectChange: (event: {
      selectedRowKeys: nasl.collection.List<V>;
      selectedRowData: nasl.collection.List<T>;
      type: nasl.core.String; // 'uncheck' | 'check'
      currentRowKey?: string;
      currentRowData?: T;
    }) => any;

    @Event({
      title: '分页发生变化时触发',
      description:
        '分页发生变化时触发。参数 newDataSource 表示分页后的数据。本地数据进行分页时，newDataSource 和源数据 data 会不一样。泛型 T 指表格数据类型',
    })
    onPageChange: (event: any) => any;

    @Event({
      title: '行点击时触发',
      description: '行点击时触发',
    })
    onRowClick: (event: any) => any;

    @Event({
      title: '行双击时触发',
      description: '行双击时触发',
    })
    onRowDblclick: (event: any) => any;

    @Event({
      title: '表格内容滚动时触发',
      description: '表格内容滚动时触发',
    })
    onScroll: (event: any) => any;

    @Slot({
      title: '表格列',
      description: '表格列',
      snippets: [
        {
          title: '表格列',
          code: '<el-table-column-pro data-nodepath-multiple="ture"><template #title><el-text text="表格列"></el-text></template></el-table-column-pro>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      parentAccept: "['el-table-pro'].includes(target.tag)",
      childAccept: false,
      selector: 'multiple',

      slotInlineStyle: {
        title: 'min-width: 30px',
        cell: 'min-width: 30px',
      },
    },
  })
  @Component({
    title: '表格列',
    description: '表格列',
  })
  export class ElTableColumnPro<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
  > extends ViewComponent {
    constructor(options?: Partial<ElTableColumnProOptions<T, V, P, M>>) {
      super();
    }
  }

  export class ElTableColumnProOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
  > extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '列字段',
      description: 'data 项中的字段',
      docDescription: '数据项中对应的字段名，如createdTime',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    colKey: (item: T) => any;

    @Prop({
      group: '数据属性',
      title: '列选中类型',
      description: '列选中类型',
      docDescription: '有两种模式：单选和多选',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '单选' }, { title: '多选' }, { title: '无' }],
      },
    })
    type: 'single' | 'multiple' | null = null;

    @Prop({
      group: '数据属性',
      title: '排序',
      description: '设置该列是否可以排序',
      docDescription: '开启后该列可排序，可设置默认顺序，升序或倒序',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    sorter: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '固定列',
      description:
        '该列是否固定。左侧固定列需要从第一列到当前固定列之间的列都是固定列。右侧固定列需要最后一列到当前固定列之间的列都是固定列。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: ' 左侧固定' },
          { title: '右侧固定' },
          { title: '不固定' },
        ],
      },
    })
    fixed: 'left' | 'right' | '' = '';

    @Prop({
      group: '主要属性',
      title: '表头文本过长省略',
      description: '文字过长是否省略显示。默认文字超出时会换行。',
      docDescription:
        '开启后，该列表头文本过长会省略显示，否则换行显示，默认关闭',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    ellipsisTitle: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '内容区文本过长省略',
      description: '文字过长是否省略显示。默认文字超出时会换行。',
      docDescription: '开启后，该列文本过长会省略显示，否则换行显示，默认关闭',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    ellipsis: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '列宽度',
      description: '设置列宽度，可设置为数字或百分比',
      docDescription:
        '列宽，可以作为最小宽度使用。当列宽总和小于 table 元素时，浏览器根据宽度设置情况自动分配宽度；当列宽总和大于 table 元素，表现为定宽。可以同时调整 table 元素的宽度来达到自己想要的效果	',
    })
    width: nasl.core.String | nasl.core.Decimal | nasl.core.Integer;

    @Slot({
      title: '单元格',
      description: '对单元格的数据展示进行自定义',
    })
    slotCell: (current: Current<T>) => Array<ViewComponent>;

    @Slot({
      title: '标题',
      description: '对标题进行自定义',
    })
    slotTitle: (current: Current<T>) => Array<ViewComponent>;
  }
}
```
