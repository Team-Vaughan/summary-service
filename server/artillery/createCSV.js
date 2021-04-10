const fs = require('fs');

let csvIds = 'id\n';

for (let i = 9000000; i < 10000000; i++) {
  csvIds += `${i}\n`;
}

fs.writeFileSync('ids', csvIds);

