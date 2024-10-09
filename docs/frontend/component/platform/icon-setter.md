---
outline: deep
---

<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '../../../.vitepress/components'
</script>

# 图标设置

组件图标属性的设置， 目前平台支持 `图标库` 与 `用户上传图标` 两种方式支持，两种方式都以 `string` 类型传入属性值。

* `图标库`选择，组件接收到 `图标名称`，组件内部需要实现图标的渲染
* `用户上传图标` 组件接收到一个在线的svg url地址，组件内部需要实现图标的渲染

```ts
@Prop({
  title: '前缀图标',
  description: '前缀图标',
  group: '主要属性',
  setter: {
    concept: 'IconSetter',
  },
})
prefixIcon: nasl.core.String;
```

## 图标设置支持 `图标库`

平台基础组件库内置有图标组件，需要拓展图标库， 可参考文档 [图标库扩展](../icon.md)

```ts
@Prop({
  title: '前缀图标',
  description: '前缀图标',
  group: '主要属性',
  setter: {
    concept: 'IconSetter',
    customIconFont: '', // 使用图标库名称，不填写会使用基础组件默认图标库， 其他还支持 LCAP_ELEMENTUI_ICONS （element ui 图标） LCAP_REMIX_ICONS 三方remix 图标库
  },
})
icon: nasl.core.String
```

## 图标设置支持 `用户上传图标`

`用户上传图标` 组件接收到一个在线的svg url地址，例如：`https://static-vusion.nos-eastchina1.126.net/h5-template/svgviewer-output.svg`, 组件需要渲染图标

<VTCodeGroup>
  <VTCodeGroupTab label="Vue2">

  推荐使用 [online-svg-icon](https://github.com/qingniao99/online-svg-icon-vue2/blob/main/src/index.vue) 组件
  ```vue
  <template>
    <online-svg-icon v-if="isOnlySvgIcon" :url="icon"  />
    <!-- 默认走内部图标组件渲染 --> 
    <xx-icon v-else :name="icon" />
  </template>
  <script>
  import OnlineSvgIcon from 'online-svg-icon-vue2';
  export default {
    components: {
      OnlineSvgIcon,
    },
    props: {
      icon: string,
    },
    computed: {
      isOnlySvgIcon() {
        return this.icon && this.icon.indexOf('/') !== -1 && /\.svg/i.test(this.icon)
      },
    }
  }
  </script>
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="React">

  ```jsx
  const OnlineSvgIcon = ({ icon }) => {
    return (
      <img src={icon} />
    );
  };
  ```

  </VTCodeGroupTab>
</VTCodeGroup>



