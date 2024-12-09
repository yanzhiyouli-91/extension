import Component from '../index';

export default {
  id: 'cw-td-calendar-examples',
  title: '组件列表/CwTdCalendar/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: (args, { argTypes }) => ({
    components: {
      'cw-td-calendar': Component,
    },
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        handleCellClick(e) {
          console.log(e);
        }
      }
    },
    template: '<cw-td-calendar v-bind="args"@cell-click="handleCellClick"><template #cellAppend="current"><span>{{current.formattedDate}}</span></template></cw-td-calendar>',
  }),
  args: {
    // controllerConfig: false,
    showControllerConfig: true,
    firstDayOfWeek: 7,
  },
};
