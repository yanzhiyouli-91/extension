/// <reference types="@nasl/types" />
namespace extensions.cw_td_calendar.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '日历',
    description: '日历',
  })
  export class CwTdCalendar extends ViewComponent {
    constructor(options?: Partial<CwTdCalendarOptions>) {
      super();
    }
  }

  export class CwTdCalendarOptions extends ViewComponentOptions {
    @Prop({
      title: '填充\'0\'',
      description: '小于 10 的日期，是否使用 \'0\' 填充。默认表现为 01 02，值为 false 表现为 1 2 9',
      group: '主要属性',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    fillWithZero: nasl.core.Boolean = true;

    @Prop({
      title: '从星期几开始',
      description: '第一天从星期几开始，仅在日历展示维度为月份时（mode = month）有效。默认为 1。可选项：1/2/3/4/5/6/7',
      group: '主要属性',
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
        max: 7,
      }
    })
    firstDayOfWeek: nasl.core.Integer = 1;

    @Prop({
      title: '显示控制器',
      description: '右上角控制器配置。值为 false 则表示不显示控制器，值为 true 则显示控制器',
      group: '主要属性',
      setter: {
        concept: 'SwitchSetter',
      }
    })
    showControllerConfig: nasl.core.Boolean = true;

    @Event({
      title: '日历单元格点击时',
      description: '日历单元格点击时触发',
    })
    onCellClick: (event: {
      cell: {
        belongTo: nasl.core.Integer,
        date: nasl.core.Date,
        day: nasl.core.Integer,
        formattedDate: nasl.core.String,
        isCurrent: nasl.core.Boolean,
        weekOrder: nasl.core.Integer,
      },
    }) => void;

    @Event({
      title: '日历单元格双击时',
      description: '日历单元格双击时触发',
    })
    onCellDoubleClick: (event: {
      cell: {
        belongTo: nasl.core.Integer,
        date: nasl.core.Date,
        day: nasl.core.Integer,
        formattedDate: nasl.core.String,
        isCurrent: nasl.core.Boolean,
        weekOrder: nasl.core.Integer,
      },
    }) => void;

    @Event({
      title: '日历单元格右击时',
      description: '日历单元格右击时触发',
    })
    onCellRightClick: (event: {
      cell: {
        belongTo: nasl.core.Integer,
        date: nasl.core.Date,
        day: nasl.core.Integer,
        formattedDate: nasl.core.String,
        isCurrent: nasl.core.Boolean,
        weekOrder: nasl.core.Integer,
      },
    }) => void;

    @Event({
      title: '月份切换时',
      description: '月份切换时触发',
    })
    onMonthChange: (event: {
      month: nasl.core.String,
      year: nasl.core.String,
    }) => void;

    @Slot({
      title: '头部内容',
      description: '头部插槽（左上角处，默认不显示任何内容）'
    })
    slotHead: () => Array<nasl.ui.ViewComponent>;

    @Slot({
      title: '单元格内容',
      description: '单元格内容'
    })
    slotCellAppend: (current: {
      belongTo: nasl.core.Integer,
      date: nasl.core.Date,
      day: nasl.core.Integer,
      formattedDate: nasl.core.String,
      isCurrent: nasl.core.Boolean,
      weekOrder: nasl.core.Integer,
    }) => Array<nasl.ui.ViewComponent>;
  }
}
