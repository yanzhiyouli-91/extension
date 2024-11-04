---
outline: deep
---
<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '../../../.vitepress/components'
</script>


# 事件转换

> 使用 `@Event` 来标注支持的事件，需要注意以下几点：
> 
> 1. 事件名需要以 `on` 开头的小驼峰，例如 `click` 需要写为 `onClick`， `row-click` 写为 `onRowClick`;
> 2. 事件参数仅允许有一个参数 `event`, 多个参数的情况需要转为一个匿名结构对象, 例如 `onSelect(value, item)` 需要转换为 `onSelect({ value, item })`;
> 3. 返回参数统一为 `void`, 匿名数据结构属性也必须使用 `nasl 支持的类型`;


平台事件触发仅支持一个 event 对象，需要将事件的参数合并


<VTCodeGroup>
  <VTCodeGroupTab label="Vue2">

  这里以 [Element UI 导航菜单](https://element.eleme.cn/#/zh-CN/component/menu#menu-events) 组件的 `select`, `open`, `close` 事件为例

  ```vue
  <template>
  <el-menu  @select="handleSelect" @open="handleOpen" @close="handleClose">
    <!-- ... -->
  </el-menu>
  </template>
  <script>
  export default {
    // ...
    methods: {
      handleSelect(index, indexPath) {
        this.$emit('select', {
          index,
          indexPath,
        });
      },
      handleOpen(index, indexPath) {
        this.$emit('open', {
          index,
          indexPath,
        });
      }
      handleClose(index, indexPath) {
        this.$emit('close', {
          index,
          indexPath,
        });
      }
    }
  }
  </script>
  ```

  ```ts
  // api.ts

  //...
  export class ElMenuOptions extends ViewComponentOptions {
    //...
    @Event({
      title: '菜单激活时',
      description: '菜单激活回调',
    })
    onSelect: (event: {
      index: nasl.core.String;
      indexPath: nasl.core.String;
    }) => void;

    @Event({
      title: '子菜单展开时',
      description: '子菜单展开的回调',
    })
    onOpen: (event: {
      index: nasl.core.String;
      indexPath: nasl.core.String;
    }) => void;

    @Event({
      title: '子菜单收起时',
      description: '子菜单收起的回调',
    })
    onClose: (event: {
      index: nasl.core.String;
      indexPath: nasl.core.String;
    }) => void;
  }
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="React">

  这里以 [Ant Design 分页](https://ant-design.antgroup.com/components/pagination-cn#api) 组件的 `onChange`, `onShowSizeChange` 事件为例

  ```tsx
  import React from 'react';
  import { Pagination } from 'antd';

  export const CwPagination = ({ onChange = () => {}, onShowSizeChange = () => {}, ...rest }) => {
    const handleChange = (page, pageSize) => {
      onChange({
        page,
        pageSize,
      });
    }

    const handleShowSizeChange = (current, size) => {
      onChange({
        current,
        size,
      });
    }

    return (
      <Pagination
        {...rest}
        onChange={handleChange}
        onShowSizeChange={handleShowSizeChange}
      />
    )
  }
  ```

  ```ts
  // api.ts
  //...
  export class CwPaginationOptions extends ViewComponentOptions {
    //...
    @Event({
      title: '切换分页后',
      description: '切换分页后',
    })
    onChange: (event: {
      page: nasl.core.Integer;
      pageSize: nasl.core.Integer;
    }) => void;

    @Event({
      title: '分页大小改变时',
      description: 'pageSize变化的回调',
    })
    onShowSizeChange: (event: {
      current: nasl.core.Integer;
      size: nasl.core.Integer;
    }) => void;
  }
  ```

  </VTCodeGroupTab>
</VTCodeGroup>
