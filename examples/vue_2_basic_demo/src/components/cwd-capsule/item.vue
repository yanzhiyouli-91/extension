<template>
  <span :class="$style.root">{{ text }}</span>
</template>
<script>
export default {
  name: "cwd-capsule-item",
  props: {
    text: {
      type: String,
      default: '哈哈哈'
    }
  },
};
</script>
<style module>
.root {
  margin-left: 12px;
}
</style>
