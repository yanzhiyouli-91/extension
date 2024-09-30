<script lang="ts" setup>
import { useSlots, ref } from 'vue';
import VTCodeGroupTab from './VTCodeGroupTab.vue';
const activeTabIndex = ref(0)
const children = useSlots().default?.()
const tabs = children?.filter(({ type }) => type === VTCodeGroupTab)
</script>

<template>
  <div class="vt-code-group">
    <div class="vt-code-group-tabs">
      <div
        v-for="tab, idx in tabs"
        @click="activeTabIndex = idx"
        class="vt-code-group-tab"
        :class="{
          'vt-code-group-tab-active': activeTabIndex === idx
        }"
      >{{ tab.props?.label }}</div>
    </div>
    <div class="vt-code-group-contents">
      <component
        v-for="tab, idx in tabs"
        v-show="activeTabIndex === idx"
        :is="tab"
        :active="activeTabIndex === idx"
      />
    </div>
  </div>
</template>
<style>
.vt-code-group {
  display: flex;
  flex-direction: column;
}

.vt-code-group-contents .vt-code-group-content div[class*='language-'] {
  margin-top: 0;
  border-top-left-radius: 0;
}

.vt-code-group-tabs {
  display: flex;
  overflow: auto;
}

.vt-code-group-tab {
  white-space: pre;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--vp-c-text-1);
  background: #fff;
  border-bottom-color: rgba(255,255,255,0.3);
  padding: 6px 24px;
  border-width: 2px;
  border-style: solid;
  border-top: transparent;
  border-right: transparent;
  border-left: transparent;
  cursor: pointer;
  transition: border, background-color .2s;
    transition-property: border, background-color;
    transition-duration: 0.2s, 0.2s;
    transition-timing-function: ease, ease;
    transition-delay: 0s, 0s;
}

.vt-code-group-tab.vt-code-group-tab-active {
  border-bottom: 2px solid var(--vp-c-brand-1);
}

.vt-code-group-tab:first-child {
  border-top-left-radius: 8px;
}

.vt-code-group-tab:last-child {
  border-top-right-radius: 8px;
}

.dark .vt-code-group-tab {
  color: var(--vp-c-text-1);
}

.dark .vt-code-group-tab:not(.vt-code-group-tab-active) {
  border-bottom: 2px solid rgba(255,255,255,.2);
  background: #2f2f2f;
}

.dark .vt-code-group-tab.vt-code-group-tab-active {
  background: #242424;
}

@media (max-width: 639px) {
  .vt-code-group-tabs {
    margin: 0 -24px;
  }

  .vt-code-group-tab, .vt-code-group-tab:first-child, .vt-code-group-tab:last-child {
    flex-grow: 1;
    border-radius: 0;
  }
}
</style>
