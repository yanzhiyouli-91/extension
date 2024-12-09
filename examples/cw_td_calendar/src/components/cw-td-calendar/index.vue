<template>
<TdCalendar v-bind="calendarProps">
  <template v-for="(item, key, index) in $slots" :key="index" v-slot:[key]="slotProps">
    <slot :name="key" v-bind="slotProps"></slot>
  </template>
</TdCalendar>
</template>
<script setup lang="ts">
import { Calendar as TdCalendar, TdCalendarProps } from 'tdesign-vue-next/es/calendar';
import 'tdesign-vue-next/es/style/index.css';
import 'tdesign-vue-next/es/calendar/style/index.css';
import { computed, useAttrs } from 'vue';

export interface CwTdCalendarProps extends TdCalendarProps {
  showControllerConfig?: boolean;
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Pick<CwTdCalendarProps, 'showControllerConfig'>>(), {
  showControllerConfig: true,
});

const calendarProps = computed<TdCalendarProps>(() => {
  const attrs = useAttrs();
  const {
    showControllerConfig,
  } = props;
  return {
    ...attrs,
    controllerConfig: showControllerConfig,
  } as TdCalendarProps;
})

</script>
<style module>
.root {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  width: 600px;
  height: 400px;
  background-color: red;
  color: #fff;
  font-size: 24px;
  border-radius: 12px;
}
</style>
