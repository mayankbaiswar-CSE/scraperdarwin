const fs = require('fs');
const path = require('path');

module.exports = mkdir = () => {
    const dir = path.join(__dirname, '/../downloads');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, '0777');
    }
}