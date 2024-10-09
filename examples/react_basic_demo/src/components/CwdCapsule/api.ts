/// <reference types="@nasl/types" />
namespace extensions.react_library_demo.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '胶囊选择器',
    description: '胶囊选择器',
  })
  export class CwdCapsule<T, V> extends ViewComponent {
    constructor(options?: Partial<CwdCapsuleOptions<T, V>>) {
      super();
    }

    @Method({
      title: '测试调用',
      description: '测试调用'
    })
    testCall(): void {}
  }

  export class CwdCapsuleOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '数据源测试',
    })
    dataSource: nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '文本字段',
      description: '选项文本的字段名',
      setter: {
        concept: "PropertySelectSetter"
      }
    })
    textField: (item: T) => any;

    @Prop({
      title: '数据',
      description: '数据源，如：[{ label: \'月销售统计\', value: \'month\' }]',
      designerValue: [{ label: "月销售统计",value: "month"},{ label: "年销售统计",value: "year"}],
      setter: {
        concept: 'InputSetter'
      }
    })
    data: nasl.collection.List<{ label: nasl.core.String, value: nasl.core.String }>;

    @Prop({
      title: '内容',
      description: '显示文本',
      sync: true,
      setter: {
        concept: 'InputSetter'
      }
    })
    value: nasl.core.String;

    @Event({
      title: '值改变',
      description: '切换选项时触发',
    })
    onChange: (event: nasl.core.String) => void;
  }
}
