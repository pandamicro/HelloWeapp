'use strict';

var fs = require('fs');
var path = require('path');
var fse = require('fs-extra');

var webMobileDir = path.join(Editor.projectInfo.path, 'build/web-mobile/');
var templateDir = Editor.url('packages://weapp/');

// TODO: modify it to your own path
// The wechat app project destination with page sub path for the cocos game
var exportDir = path.join(Editor.projectInfo.path, '../../Weapps/hellococos/pages/index/');

var paths = exportDir.split(path.sep);
var projectName = paths[paths.length-1];

function copyFile(source, target) {
    return new Promise(function(resolve, reject) {
        var rd = fs.createReadStream(source);
        rd.on('error', rejectCleanup);
        var wr = fs.createWriteStream(target);
        wr.on('error', rejectCleanup);
        function rejectCleanup(err) {
            rd.destroy();
            wr.end();
            reject(err);
        }
        wr.on('finish', resolve);
        rd.pipe(wr);
    });
}

function parseJSONs (dir) {
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
            parseJSONs(subpath);
        }
        else if (stat.isFile()) {
            ext = path.extname(subpaths[i]);
            // JSON file parse to JS file
            if (ext.toLowerCase() === '.json') {
                fs.readFile(subpath, (err, content) => {
                    if (err) {
                        Editor.error(err);
                    }
                    else {
                        content = 'module.exports = ' + content;
                        fs.writeFileSync(subpath, content, 'utf8');
                        Editor.log('JSON file parsed to JS: ' + subpath);
                        fs.renameSync(subpath, subpath + '.js');
                    }
                });
            }
        }
    }
}

module.exports = {
    load () {
        // 当 package 被正确加载的时候执行
    },

    unload () {
        // 当 package 被正确卸载的时候执行
    },

    messages: {
        'publish' () {
            var stat = fs.statSync(webMobileDir);
            if (!stat.isDirectory()) {
                Editor.warn('Please publish the project to web mobile first.');
                return;
            }

            // Copy template to destination project if not exist
            stat = fs.statSync(exportDir);
            if (!stat.isDirectory()) {
                fs.mkdirSync(exportDir);
                copyFile(templateDir + 'template.wxml', exportDir + projectName + 'wxml');
                copyFile(templateDir + 'template.wxss', exportDir + projectName + 'wxss');
                copyFile(templateDir + 'template.js', exportDir + projectName + 'js');
                copyFile(templateDir + 'cocos-weapp.js', exportDir + 'cocos-weapp.js');
            }

            // Copy res folder
            var resDest = path.join(exportDir, 'res');
            fse.removeSync(resDest);
            fse.copy(path.join(webMobileDir, 'res'), resDest, function (err) {
                if (err) {
                    return Editor.error(err);
                }
                
                // Parse JSONs to JS
                var libDir = path.join(exportDir, 'res/import/');
                parseJSONs(libDir);
            });

            // Copy src folder
            var srcDest = path.join(exportDir, 'src');
            fse.removeSync(srcDest);
            fse.copy(path.join(webMobileDir, 'src'), srcDest, function (err) {
                if (err) {
                    return Editor.error(err);
                }

                // Adjust settings js
                var settingsJS = path.join(srcDest, 'settings.js');
                fs.stat(settingsJS, function (err, stat) {
                    if (err) {
                        return Editor.error(err);
                    }

                    fs.readFile(settingsJS, 'utf8', (err, content) => {
                        if (err) {
                            Editor.error(err);
                        }
                        else {
                            content = content.replace('_CCSettings', 'module.exports');
                            fs.writeFileSync(settingsJS, content, 'utf8');
                            Editor.log('Settings JS file adjusted: ' + settingsJS);
                        }
                    });
                });
                
                // Adjust project js
                var projectJS = path.join(srcDest, 'project.js');
                fs.stat(projectJS, function (err, stat) {
                    if (!err && stat.isFile()) {
                        fs.readFile(projectJS, 'utf8', (err, content) => {
                            if (err) {
                                Editor.error(err);
                            }
                            else {
                                content = 'var cc = global.cc;\nvar _ccsg = global._ccsg;\n' + content;
                                fs.writeFileSync(projectJS, content, 'utf8');
                                Editor.log('Project JS file adjusted: ' + projectJS);
                            }
                        });
                    }
                });
                
                var projectDevJS = path.join(srcDest, 'project.dev.js');
                fs.stat(projectDevJS, function (err, stat) {
                    if (!err && stat.isFile()) {
                        fs.readFile(projectDevJS, 'utf8', (err, content) => {
                            if (err) {
                                Editor.error(err);
                            }
                            else {
                                content = 'var cc = global.cc;\nvar _ccsg = global._ccsg;\n' + content;
                                fs.writeFileSync(projectDevJS, content, 'utf8');
                                Editor.log('Project JS file adjusted: ' + projectDevJS);
                            }
                        });
                    }
                });
            });
        }
    },
};