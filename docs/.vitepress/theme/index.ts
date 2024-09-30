import { onMounted, watch, nextTick } from 'vue';
import DefaultTheme from 'vitepress/theme';
import { useRoute } from 'vitepress';
import mediumZoom from 'medium-zoom';

import './index.css';

export default {
  ...DefaultTheme,
  setup() {
    const route = useRoute();
    const initZoom = () => {
      mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // Should there be a new?
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },
};
