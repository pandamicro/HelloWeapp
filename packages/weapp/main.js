'use strict';

var fs = require('fs');
var path = require('path');
var fse = require('fire-fs');

var webMobileDir = path.join(Editor.projectInfo.path, 'build/web-mobile/');
var templateDir = path.join(Editor.projectInfo.path, 'packages/weapp/template');

// TODO: modify it to your own path
// The wechat app project destination with page sub path for the cocos game
var exportDir = path.join(Editor.projectInfo.path, 'hellococos/pages/index/');

var paths = exportDir.split(path.sep);
var projectName = paths[paths.length-1];

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
                fs.readFile(subpath, (function (err, content) {
                    if (err) {
                        Editor.error(err);
                    }
                    else {
                        content = 'module.exports = ' + content;
                        fs.writeFileSync(this.path, content, 'utf8');
                        Editor.log('JSON file parsed to JS: ' + this.path);
                        fs.renameSync(this.path, this.path + '.js');
                    }
                }).bind({path: subpath}));
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
            fs.stat(exportDir, function (err, stat) {
                if (err || !stat.isDirectory()) {
                    fs.mkdirSync(exportDir);
                    fse.copy(path.join(templateDir, 'template.wxml'), path.join(exportDir, projectName + '.wxml'), function () {
                        Editor.log(projectName + '.wxml added to weapp project');
                    });
                    fse.copy(path.join(templateDir, 'template.wxss'), path.join(exportDir, projectName + '.wxss'), function () {
                        Editor.log(projectName + '.wxss added to weapp project');
                    });
                    fse.copy(path.join(templateDir, 'template.js'), path.join(exportDir, projectName + '.js'), function () {
                        Editor.log(projectName + '.js added to weapp project');
                    });
                }
            });
            fs.stat(path.join(exportDir, 'cocos-weapp.js'), function (err, stat) {
                if (err || !stat.isFile()) {
                    fse.copy(path.join(templateDir, 'cocos-weapp.js'), path.join(exportDir, 'cocos-weapp.js'), function () {
                        Editor.log('Cocos engine installed to weapp project');
                    });
                }
            });

            // Copy res folder
            var resDest = path.join(exportDir, 'res');
            try {
                fse.rmrfSync(resDest);
            }
            catch (err) {}
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
            try {
                fse.rmrfSync(srcDest);
            }
            catch (err) {}
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