import { readFileSync } from 'fs-extra';
import { NodeVM } from 'vm2';

const cssPattern = /\.(css|scss|sass|less)$/;
export function requireInSandbox(filePath: string) {
  const vm = new NodeVM({
    sandbox: {},
    sourceExtensions: ['js', 'css', 'scss', 'sass', 'less'],
    compiler: (code, filename) => {
      if (filename.includes('vue/')) {
        return code;
      }
      if (filename.match(cssPattern)) {
        return `
              const handler = {
                get() {
                  return new Proxy({}, handler);
                },
              };
              const proxiedObject = new Proxy({}, handler);
              module.exports = proxiedObject;
            `;
      } else {
        return `
          const _vue = require('vue');
          function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj }; }
          var _vue2 = _interopRequireDefault(_vue);
          _vue2.default.prototype = {
            ..._vue2.default.prototype,
            $isServer: true,
          }

          const document = {
            addEventListener: function() {},
            removeEventListener: function() {},
          };
          const location = {
            href: '',
          };
          const navigator = {
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
          };
          const window = {
            document,
            location,
            navigator,
            addEventListener: function() {},
            removeEventListener: function() {},
          };
          (function() { ${code} })();
        `;
      }
    },
    require: {
      external: true,
      context: 'sandbox',
    },
  });
  const fileContent = readFileSync(filePath, { encoding: 'utf8' });
  return vm.run(`${fileContent}`, filePath);
}
