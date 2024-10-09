import Component from '../index';

export default {
  // id: 'cwdCapsuleBlocks',
  title: '组件列表/CwdCapsule/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<cwd-capsule></cwd-capsule>',
  }),
};


export const Demo = {
  name: '使用slot',
  render: () => ({
    template: '<cwd-capsule value="year"><template #item="current"><u-text :text="`使用 Slot ${current.item.label}`"></u-text></template></cwd-capsule>',
  }),
};

export const Build = {
  name: '展示Icon',
  render: () => ({
    template: '<cwd-capsule value="year" testIcon="xinxi_info"></cwd-capsule>',
  }),
};
