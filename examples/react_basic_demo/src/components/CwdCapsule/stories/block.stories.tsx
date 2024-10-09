import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CwdCapsule from '../index';

export default {
  id: 'CwdCapsule-Blocks',
  title: '组件列表/CwdCapsule/内置区块',
  component: CwdCapsule,
  parameters: {
    layout: 'centered',
  },
} as Meta;

export const Default: StoryObj = {
  name: '基本用法',
  render: () => (
    <CwdCapsule />
  ),
};
