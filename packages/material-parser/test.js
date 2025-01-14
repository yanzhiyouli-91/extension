const fs = require('fs');
const { parse: parseMaterial } = require('./lib');
const path = require('path');

(async function parse(params) {
  const result = await parseMaterial({
    name: 'antd',
  });

  fs.writeFileSync('test.json', JSON.stringify(result, null, '  '));
})()
