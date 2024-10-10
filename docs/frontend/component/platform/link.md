---
outline: deep
---

<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '../../../.vitepress/components'
</script>

# 链接跳转

为了便于低代码开发者配置，平台对链接跳转功能做了增加，设置页面如下：

![](/images/link-setter.png)

## `api.ts` 中使用 `hrefAndTo` 属性设置

此属性 不需要设置 `setter` ，ide 会识别改属性启用 **链接设置器**

```ts
@Prop({
  group: '交互属性',
  title: '链接地址'
})
hrefAndTo: nasl.core.String;
```

## 组件内部实现

平台在组件上会设置 `link` 和 `destination` 两个属性, 组件内部需要对这两个属性增加对应的实现代码

* `link` 外部链接, `https://codewave.163.com`
* `destination` 内部链接， 例如 `/user/info`


<VTCodeGroup>
  <VTCodeGroupTab label="Vue2">

  ```vue
  <template>
  <a :href="linkURL" :target="target" @click="handleClick">链接</a>
  </template>
  <script>
  export default {
    props: {
      link: String,
      destination: String,
      target: String,
      replace: Boolean,
    },
    computed: {
      linkURL() {
        return destination || link;
      },
    },
    methods: {
      handleClick(e) {
        this.$emit('click', e);
        
        if (!this.destination || this.target === '_blank' || !this.$router) {
          return;
        }

        // 阻止默认行为
        e.preventDefault();
        e.returnValue = false;

        // vue router 跳转
        this.routerNavigate(this.destination);
      },
      routerNavigate(url) {
        if (this.replace) {
          this.$router.replace(url);
          return;
        }
        
        this.$router.push(url);
      },
    },
  };
  </script>
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="React">

  ```tsx
  import React, { FC, HTMLAttributes } from 'react';
  import { useNavigate } from 'react-router-dom';

  export interface CwLinkProps extends HTMLAttributes<HTMLLinkElement> {
    link: string;
    destination: string;
    target: string;
    replace: boolean;
  }

  const CwLink: FC<CwLinkProps> = (props) => {
    const {
      link,
      destination,
      target,
      replace,
      ...rest
    } = props;

    const navigate = useNavigate();

    const handleClick = (e: Event) => {
      if (!destination || target === '_blank') {
        return;
      }

      // 阻止默认行为
      e.preventDefault();
      e.returnValue = false;

      // 此处走 react router 跳转
      navigate(destination, { replace });
    }

    return (
      <a {...rest} href={destination || link} onClick={handleClick}>链接</a>
    );
  };
  ```

  </VTCodeGroupTab>
</VTCodeGroup>
