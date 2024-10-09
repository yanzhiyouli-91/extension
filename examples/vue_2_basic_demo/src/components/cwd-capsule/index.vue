<template>
  <div :class="[$style.capsuleBox, 'cwd-capsule']">
    <i v-if="testIcon" style="font-size:20px; line-height: 1; display: inline-flex;margin-right: 4px;">
      <svg :class="$style.iconsvg" aria-hidden="true">
        <use :xlink:href="`#cus-toolbox-${testIcon}`" />
      </svg>
    </i>
    <div :class="$style.capsule">
      <div v-for="item in list" :class="{ [$style.item]: true, [$style.active]: getProp(item, valueField) === currentValue }"
        :key="item.value" @click="handleItemClick(item)" vusion-slot-name="item">
        <slot name="item" :item="item">
          {{ getLabel(item) }}
        </slot>
        <s-empty v-if="(!$scopedSlots.item || !$scopedSlots.item({ item })) && $env && $env.VUE_APP_DESIGNER" />
      </div>
    </div>
    <slot></slot>
    <span style="margin-left: 12px;">I18N 文案: {{ transformI18N('cwd-capsule.text')  }}</span>
  </div>
</template>

<script>
import { at } from 'lodash';
import ZH_CN from './i18n/zh-CN.json';
import '../../../ide/icons/icon-font.js';

export default {
  name: "cwd-capsule",
  props: {
    dataSource: {
      type: [Array, Function],
      default: () =>  [{ label: "月销售统计", value: "month"},{ label: "年销售统计", value: "year"}],
    },
    textField: {
      type: String,
      default: 'label',
    },
    valueField: {
      type: String,
      default: 'value',
    },
    value: {
      type: [String, Number],
    },
    testIcon: {
      type: String,
    }
  },
  data() {
    return {
      list: [],
      currentValue: this.value,
    };
  },
  watch: {
    value(val) {
      if (val === this.currentValue) {
        return;
      }

      this.currentValue = val;
    },
    dataSource: {
      handler() {
        this.$nextTick(() => {
          this.loadListForDataSource();
        })
      },
      immediate: true
    }
  },
  methods: {
    transformI18N(key) {
      // 获取当前语言环境
      const locale = window.$global?.i18nInfo?.locale || 'zh-CN';
      // 获取配置文案
      const messages = window.$global?.i18nInfo?.messages;
      if (!messages || !messages[locale] || !messages[locale][key]) {
        return ZH_CN[key];
      }

      return messages[locale][key];
    },
    getProp(item, propName) {
      return at(item, propName)[0];
    },
    syncState(state) {
      if (!state) {
        return;
      }

      Object.keys(state).forEach((k) => {
        this.$emit('sync:state', k, state[k]);
      });
    },
    normalizeData(data) {
      if (Array.isArray(data)) {
        return data;
      }

      if (typeof data === 'object' && Array.isArray(data.list)) {
        return data.list;
      }

      return [];
    },
    async loadListForDataSource() {
      if (typeof this.dataSource === 'function') {
        const params = { value: this.currentValue, page: 1, size: 10 };
        this.syncState(params);
        const data = await this.dataSource(params);
        this.list = this.normalizeData(data);
      } else {
        this.list = this.normalizeData(this.dataSource);
      }

      if (!this.currentValue && this.list.length > 0) {
        this.handleItemClick(this.list[0]);
      }
    },
    handleItemClick(item) {
      this.currentValue = this.getProp(item, this.valueField);
      this.$emit('change', {
        value: this.currentValue,
        item,
      });    //抛出事件
      this.$emit("update:value", this.currentValue);   //设置了IDE属性sync: true后添加
    },
    getLabel(item) {
      return at(item, this.textField)[0];
    }
  }
};
</script>

<style module>
.capsuleBox {
  display: inline-flex;
  align-items: center;
  overflow: hidden;
}

.capsule {
  display: flex;
  background-color: var(--cwd-capsule-background-color);
  border-radius: 15px;
  padding: 2px 3px;
  float: left;
}

.active {
  background-color: var(--cwd-capsule-background-color-active);
}

.item {
  border-radius: 15px;
  padding: 2px 14px;
  cursor: pointer;
  color: var(--cwd-capsule-color);
  transition: ease 200ms;
  font-size: var(--cwd-capsule-font-size);
  line-height: 1.5;
}

.iconsvg {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  line-height: 1;
}

.item.active {
  color: var(--cwd-capsule-color-active);
}
</style>
