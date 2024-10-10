/// <reference types="@nasl/types" />
namespace extensions.vue_library_demo.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'container',
      structured: true,
      dataSource: {
        dismiss:
          "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        loopRule: 'nth-child(n+2)',
        loopElem: " > .cwd-capsule:not([data-nodepath])",
        emptySlot: {
          display: 'inline',
          condition: "!this.getAttribute('dataSource')",
          accept: false,
          content: '请绑定数据源或插入子节点'
        },
        slotWrapperInlineStyle: {
          default: 'display: inline-block;',
        }
      },
    }
  })
  @Component({
    title: '胶囊选择器',
    description: '胶囊选择器',
    icon: 'file.svg',
  })
  export class CwdCapsule<T, V> extends ViewComponent {
    constructor(options?: Partial<CwdCapsuleOptions<T, V>>) {
      super();
    }

    @Prop({
      title: '测试值可读取',
      description: '测试值可读取'
    })
    value: V;

    @Prop({
      title: '分页',
      description: '',
    })
    page: nasl.core.Integer;

    @Prop({
      title: '页数大小',
      description: '',
    })
    size: nasl.core.Integer;

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
      designerValue: [{},{},{}],
    })
    dataSource: nasl.collection.List<T> | { list: nasl.collection.List<T>, total: number };

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
      group: '数据属性',
      title: '值字段',
      description: '选项文本的字段名',
      setter: {
        concept: "PropertySelectSetter"
      }
    })
    valueField: (item: T) => V;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '时间线数据类型。该属性为展示属性，由数据源推倒得到，无需填写。',
    })
    dataSchema: T;

    @Prop({
      title: '值',
      description: '显示文本',
      sync: true,
      setter: {
        concept: 'InputSetter'
      }
    })
    value: V;

    @Prop({
      group: '主要属性',
      title: '测试图标',
      description: '测试图标展示',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'toolbox-custom-icons',
		    hideUploadIcon: true,
      }
    })
    testIcon: nasl.core.String;

    @Slot({
      title: '项',
      description: '每一项内容'
    })
    slotItem: (current: {
      item: T,
    }) => nasl.collection.List<nasl.ui.ViewComponent>;

    @Slot({
      title: '默认',
      description: '默认内容',
      snippets: [{
        title: '子组件',
        code: '<cwd-capsule-item text="没啥用的子组件"></cwd-capsule-item>'
      }]
    })
    slotDefault: () => nasl.collection.List<nasl.ui.ViewComponent>;

    @Event({
      title: '值改变',
      description: '切换选项时触发',
    })
    onChange: (event: {
      value: V,
      item: T,
    }) => void;
  }

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '胶囊子组件',
    description: '胶囊子组件',
  })
  export class CwdCapsuleItem extends ViewComponent {
    constructor(options?: Partial<CwdCapsuleItemOptions>) {
      super();
    }
  }

  export class CwdCapsuleItemOptions extends ViewComponentOptions {
    @Prop({
      title: '文本',
      description: '显示文本',
      setter: {
        concept: 'InputSetter'
      }
    })
    text: nasl.core.String;
  }
}
