---
outline: deep
---

# 可访问性支持 <Badge type="tip" text="^3.9.0" />

组件的可访问属性是指在逻辑或表达式的可视化编辑面板中能够直接被访问和操作的组件属性。 [功能使用介绍](https://community.codewave.163.com/CommunityParent/fileIndex?filePath=20.%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91%2F10.%E9%A1%B5%E9%9D%A2%E8%AE%BE%E8%AE%A1%2F19.%E7%BB%84%E4%BB%B6%E5%8F%AF%E8%AE%BF%E9%97%AE%E5%B1%9E%E6%80%A7.md&version=3.10)

## 组件属性支持赋值设置

`api.ts` 中通过 `settable: true` 开启属性可赋值设置

```ts
@Prop({
  //...
  settable: true,
})
```

## 组件内部状态支持同步

> 目前仅支持 vue 框架

通过组件同步 `sync:state` 事件来同步内部状态

```ts
// sync mixin
import type { ComponentOptions, WatchOptionsWithHandler } from 'vue';

export type SyncOption = string | { [name: string]: string | (() => any) };
export interface SyncOptionItem {
  name: string;
  stateKey: string;
  computed?: () => any;
}

function createWatch(name: string): WatchOptionsWithHandler<any> {
  return {
    handler(val, oldVal) {
      if (val === oldVal) {
        return;
      }

      this.$emit('sync:state', name, val);
    },
    immediate: true,
  };
}

function normalizeSyncOptions(options: SyncOption[]) {
  const syncMap: { [key: string]: SyncOptionItem } = {};
  const computedMap: { [key: string]: () => any } = {};
  const watchMap: Record<string, WatchOptionsWithHandler<any>> = {};

  options.forEach((option) => {
    if (typeof option === 'string') {
      syncMap[option] = {
        name: option,
        stateKey: option,
      };

      watchMap[option] = createWatch(option);
      return;
    }

    Object.keys(option).forEach((name) => {
      const val = option[name];

      if (typeof val === 'function') {
        const stateKey = [name, 'sync'].join('__');
        syncMap[name] = {
          name,
          stateKey,
        };

        watchMap[stateKey] = createWatch(name);
        computedMap[stateKey] = val;
        return;
      }

      syncMap[name] = {
        name,
        stateKey: val,
      };
      watchMap[val] = createWatch(name);
    });
  });

  return {
    syncMap,
    computedMap,
    watchMap,
  };
}

export default (...options: SyncOption[]) => {
  const {
    syncMap,
    watchMap,
    computedMap,
  } = normalizeSyncOptions(options);
  return {
    watch: {
      ...watchMap,
    },
    computed: {
      ...computedMap,
    },
  } as ComponentOptions<any>;
};

```

```js
import sync from './sync';
// u-tabs.vue
export default {
  mixins: [
    sync({
      value() {
        const itemVM = this.selectedVM;
        if (!itemVM) {
          return this.value;
        }

        if (this.dataSource !== undefined) {
          return this.$at(itemVM, this.valueField);
        }

        return itemVM.value;
      },
      readonly: 'readonly',
      disabled: 'disabled',
    }),
  ],
}
```

`api.ts` 中增加可读属性配置

```ts
export class UTabs<T, V> extends ViewComponent {
  @Prop({
    title: '值',
  })
  value: V;

  @Prop({
    title: '禁用',
  })
  disabled: nasl.core.Boolean;

  @Prop({
    title: '只读',
  })
  readonly: nasl.core.Boolean;

  //...
}
```
