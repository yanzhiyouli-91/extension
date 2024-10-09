import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CwdCapsule from '../index';

export default {
  id: 'CwdCapsule-Examples',
  title: '组件列表/CwdCapsule/组件示例',
  component: CwdCapsule,
} as Meta;


export const Default: StoryObj = {
  name: '基本用法',
  render: (args) => (
    <CwdCapsule {...args} />
  ),
  args: {
  }
}