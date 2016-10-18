var settings = require('src/settings.js');

var cc = global.cc = {};
var _ccsg = global._ccsg = {};
require('cocos-weapp.js');

//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  handleTouchEvent: function (event) {
      cc.inputManager.handleTouchEvent(event);
  },

  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    console.log('onLoad');
    var that = this;

    if ( !settings.debug ) {
        // retrieve minified raw assets
        var rawAssets = settings.rawAssets;
        var assetTypes = settings.assetTypes;
        for (var mount in rawAssets) {
            var entries = rawAssets[mount];
            for (var uuid in entries) {
                var entry = entries[uuid];
                var type = entry[1];
                if (typeof type === 'number') {
                    entry[1] = assetTypes[type];
                }
            }
        }
    }

    var onStart = function () {
        // init assets
        cc.AssetLibrary.init({
            libraryPath: 'res/import',
            rawAssetsBase: 'res/raw-',
            rawAssets: settings.rawAssets,
            packedAssets: settings.packedAssets
        });

        var launchScene = settings.launchScene;

        // load scene
        cc.director.loadScene(launchScene, null,
            function () {
                console.log('Success to load scene: ' + launchScene);
            }
        );
    };

    // jsList
    var jsList = settings.jsList;
    var bundledScript = settings.debug ? 'project.dev.js' : 'project.js';
    if (jsList) {
        jsList.push(bundledScript);
    }
    else {
        jsList = [bundledScript];
    }

    jsList = jsList.map(function (x) {
        require('src/' + x);
    });

    var option = {
        //width: width,
        //height: height,
        id: 'cocosCanvas',
        scenes: settings.scenes,
        debugMode: settings.debug ? cc.DebugMode.INFO : cc.DebugMode.ERROR,
        showFPS: settings.debug,
        frameRate: 60,
        groupList: settings.groupList,
        collisionMatrix: settings.collisionMatrix
    };

    cc.game.run(option, onStart);
  }
});
