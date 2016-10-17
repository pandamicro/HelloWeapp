var fs = require('fs');
var path = require('path');

var importDir = './build/web-mobile/res/import';

function parseDir (dir) {
    var stat = fs.statSync(dir);
    if (!stat.isDirectory()) {
        return;
    }
    var subpaths = fs.readdirSync(dir), subpath, ext, relative;
    for (var i = 0; i < subpaths.length; ++i) {
        if (subpaths[i][0] === '.') {
            continue;
        }
        subpath = path.join(dir, subpaths[i]);
        stat = fs.statSync(subpath);
        if (stat.isDirectory()) {
            parseDir(subpath);
        }
        else if (stat.isFile()) {
            ext = path.extname(subpaths[i]);
            // JSON file parse to JS file
            if (ext.toLowerCase() === '.json') {
                fs.readFile(subpath, (err, content) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        content = 'module.exports = ' + content;
                        fs.writeFileSync(subpath, content, 'utf8');
                        console.log('JSON file parsed to JS: ' + subpath);
                        fs.renameSync(subpath, subpath + '.js');
                    }
                });
            }
        }
    }
}

parseDir(importDir);