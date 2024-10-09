import { genGetBlock } from './genLibrarayBlock';
import demopng from './assets/block.png';

export default [
    {
      title: '依赖库测试',
      image: demopng,
      genBlock: (naslNode, refElement) => genGetBlock(naslNode, refElement),
    },
]