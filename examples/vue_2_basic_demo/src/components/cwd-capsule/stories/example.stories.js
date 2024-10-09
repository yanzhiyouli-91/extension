import Component from '../index';

export default {
  id: 'cwd-capsule-examples',
  title: '组件列表/CwdCapsule/示例',
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
    props: Object.keys(argTypes),
    template: '<cwd-capsule v-bind="$props"></cwd-capsule>',
  }),
  args: {
    text: 'Hello world',
    testIcon: 'xinxi_info',
    dataSource: () => {
      return [{ label: "月销售统计", value: "month"},{ label: "年销售统计", value: "year"},{ label: "哈哈哈", value: "hhh"}];
    }
  },
};
