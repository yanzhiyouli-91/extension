const fs = require('fs');
const { parse: parseMaterial } = require('./lib');
const path = require('path');

(async function parse(params) {
  const result = await parseMaterial({
    name: 'antd',
  });

  fs.writeFileSync('test.json', JSON.stringify(result, null, '  '));
})();

// (async function parse(params) {
//   const result = await parseMaterial({
//     name: 'react-color',
//   });

//   fs.writeFileSync('test-react-color.json', JSON.stringify(result, null, '  '));
// })();

// const semver = require('semver');

// console.log(semver.minVersion('>=4.0.0 || >=3.0.0').version);
