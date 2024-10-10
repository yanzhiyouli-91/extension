---
outline: deep
---

<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '../../../.vitepress/components'
</script>

# 表单组件

## 值双向绑定处理

平台需要组件支持值同步到绑定变量的能力，

* Vue2 目前通过 `.sync` 修饰符来支持绑定同步，社区组件很多只适配了 `v-model`, 需要组件内部对外抛出 `$emit('update:value')` 事件
```vue
<template>
<el-input v-bind="$attrs" :value="value" @input="handleInput" />
</template>
<script>
export default {
  props: {
    value: String,
  },
  methods: {
    handleInput(val) {
      this.$emit('update:value', val);
      this.$emit('input', val);
    },
  }
}
</script>
```
* React 会自动监听 `onChange` 事件来更新绑定变量；

`api.ts` 属性设置 `sync: true` 允许绑定变量同步

```ts
@Prop({
  group: '数据属性',
  title: '值',
  sync: true, // 开启值同步
})
value: V;
```

## 验证规则设置器对接

`api.ts` 中默认识别 `rules` 后开启验证规则设置器, 需要使用 `@lcap/validator` 在组件内来实现验证功能

```ts
@Prop({
  group: '主要属性',
  title: '验证规则',
  description: '表单字段校验规则。',
  setter: { concept: 'InputSetter' },
  bindHide: true,
})
rules: nasl.core.String;
```

<VTCodeGroup>
  <VTCodeGroupTab label="Vue2">

  [Element UI Form](https://element.eleme.cn/#/zh-CN/component/form) 对接平台验证能力示例

  ```vue
  <template>
  <el-form-item v-bind="$attrs" :rules="formRules">
    <slot></slot>
  </el-form-item>
  </template>
  <script>
  import VusionValidator, { localizeRules } from '@lcap/validator';

  export default {
    props: {
      rules: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      formRules() {
        return this.rules.map((item) => {
          return {
            trigger: 'change',
            validator: (r, val, callback) => { // 自定义验证规则
              const validator = new VusionValidator(undefined, localizeRules, [item]);
              validator.validate(val).then(() => {
                callback();
              }).catch((errorMessage) => {
                callback(new Error(errorMessage));
              });
            },
          },
        })
      }
    }
  };
  </script>
  ```

  </VTCodeGroupTab>
  <VTCodeGroupTab label="React">

  [Ant Design Form](https://ant-design.antgroup.com/components/form-cn) 对接平台验证能力示例

  ```tsx
  import React from 'react';
  import { Form } from 'antd';
  import VusionValidator, { localizeRules } from '@lcap/validator';

  const useFormRules = (rules = []) => {
    return React.useMemo(() => {
      return ruls.map((item) => {
        return {
          message: item.message,
          required: item.required,
          validateTrigger: ['onChange', 'onBlur'],
          ...item,
          validator: (rule, value) => {
            const validator = new VusionValidator(undefined, localizeRules, [rule]);
            return validator.validate(value);
          },
        };
      });
    }, [rules]);
  };

  export const FormItem = ({ rules = [], ...rest }) => {
    return (
      <Form.Item
        {...rest}
        rules={useFormRules(rules)}
      />
    );
  }
  ```
  
  </VTCodeGroupTab>
</VTCodeGroup>
