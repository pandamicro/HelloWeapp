module.exports = [
  [
    {
      "__type__": "cc.SceneAsset",
      "_name": "helloworld",
      "scene": {
        "__id__": 1
      },
      "asyncLoadAssets": false
    },
    {
      "__type__": "cc.Scene",
      "_anchorPoint": {
        "__type__": "cc.Vec2"
      },
      "_children": [
        {
          "__id__": 2
        }
      ],
      "autoReleaseAssets": false
    },
    {
      "__type__": "cc.Node",
      "_name": "Canvas",
      "_color": {
        "__type__": "cc.Color",
        "r": 252,
        "g": 252,
        "b": 252
      },
      "_parent": {
        "__id__": 1
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 480,
        "height": 640
      },
      "_children": [
        {
          "__id__": 3
        },
        {
          "__id__": 4
        },
        {
          "__id__": 5
        },
        {
          "__id__": 6
        },
        {
          "__id__": 7
        },
        {
          "__id__": 9
        },
        {
          "__id__": 10
        }
      ],
      "_position": {
        "__type__": "cc.Vec2",
        "x": 240,
        "y": 320
      },
      "_id": "a286bbGknJLZpRpxROV6M94",
      "_components": [
        {
          "__type__": "cc.Canvas",
          "node": {
            "__id__": 2
          },
          "_designResolution": {
            "__type__": "cc.Size",
            "width": 480,
            "height": 640
          },
          "_fitWidth": true,
          "_fitHeight": false
        },
        {
          "__type__": "280c3rsZJJKnZ9RqbALVwtK",
          "node": {
            "__id__": 2
          },
          "pauseBtn": {
            "__id__": 3
          },
          "anime": {
            "__id__": 8
          }
        }
      ]
    },
    {
      "__type__": "cc.Node",
      "_name": "tl",
      "_parent": {
        "__id__": 2
      },
      "_anchorPoint": {
        "__type__": "cc.Vec2",
        "y": 1
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 100,
        "height": 100
      },
      "_position": {
        "__type__": "cc.Vec2",
        "x": -240,
        "y": 320
      },
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 3
          },
          "_spriteFrame": {
            "__uuid__": "410fb916-8721-4663-bab8-34397391ace7"
          },
          "_sizeMode": 0
        }
      ]
    },
    {
      "__type__": "cc.Node",
      "_name": "tr",
      "_parent": {
        "__id__": 2
      },
      "_anchorPoint": {
        "__type__": "cc.Vec2",
        "x": 1,
        "y": 1
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 100,
        "height": 100
      },
      "_position": {
        "__type__": "cc.Vec2",
        "x": 240,
        "y": 320
      },
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 4
          },
          "_spriteFrame": {
            "__uuid__": "410fb916-8721-4663-bab8-34397391ace7"
          },
          "_sizeMode": 0
        }
      ]
    },
    {
      "__type__": "cc.Node",
      "_name": "bl",
      "_parent": {
        "__id__": 2
      },
      "_anchorPoint": {
        "__type__": "cc.Vec2"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 100,
        "height": 100
      },
      "_position": {
        "__type__": "cc.Vec2",
        "x": -240,
        "y": -320
      },
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 5
          },
          "_spriteFrame": {
            "__uuid__": "410fb916-8721-4663-bab8-34397391ace7"
          },
          "_sizeMode": 0
        }
      ]
    },
    {
      "__type__": "cc.Node",
      "_name": "br",
      "_parent": {
        "__id__": 2
      },
      "_anchorPoint": {
        "__type__": "cc.Vec2",
        "x": 1
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 100,
        "height": 100
      },
      "_position": {
        "__type__": "cc.Vec2",
        "x": 240,
        "y": -320
      },
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 6
          },
          "_spriteFrame": {
            "__uuid__": "410fb916-8721-4663-bab8-34397391ace7"
          },
          "_sizeMode": 0
        }
      ]
    },
    {
      "__type__": "cc.Node",
      "_name": "cocos",
      "_parent": {
        "__id__": 2
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 195,
        "height": 270
      },
      "_position": {
        "__type__": "cc.Vec2",
        "x": -81,
        "y": -140
      },
      "_components": [
        {
          "__type__": "cc.Sprite",
          "node": {
            "__id__": 7
          },
          "_spriteFrame": {
            "__uuid__": "31bc895a-c003-4566-a9f3-2e54ae1c17dc"
          }
        },
        {
          "__id__": 8
        }
      ]
    },
    {
      "__type__": "cc.Animation",
      "node": {
        "__id__": 7
      },
      "_defaultClip": {
        "__uuid__": "595fe010-3593-401c-b13d-38daef4edb2b"
      },
      "_clips": [
        {
          "__uuid__": "595fe010-3593-401c-b13d-38daef4edb2b"
        }
      ],
      "playOnLoad": true
    },
    {
      "__type__": "cc.Node",
      "_name": "New Label",
      "_parent": {
        "__id__": 2
      },
      "_anchorPoint": {
        "__type__": "cc.Vec2"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 228.28,
        "height": 40
      },
      "_position": {
        "__type__": "cc.Vec2",
        "x": -112,
        "y": 215
      },
      "_components": [
        {
          "__type__": "cc.Label",
          "node": {
            "__id__": 9
          },
          "_useOriginalSize": false,
          "_N$string": "Hello Weapp",
          "_N$verticalAlign": 1
        }
      ]
    },
    {
      "__type__": "cc.Node",
      "_name": "New Label",
      "_color": {
        "__type__": "cc.Color"
      },
      "_parent": {
        "__id__": 2
      },
      "_anchorPoint": {
        "__type__": "cc.Vec2"
      },
      "_contentSize": {
        "__type__": "cc.Size",
        "width": 70.89,
        "height": 40
      },
      "_position": {
        "__type__": "cc.Vec2",
        "x": -226,
        "y": 250
      },
      "_components": [
        {
          "__type__": "cc.Label",
          "node": {
            "__id__": 10
          },
          "_useOriginalSize": false,
          "_actualFontSize": 25,
          "_fontSize": 25,
          "_N$string": "Pause",
          "_N$verticalAlign": 1
        }
      ]
    }
  ],
  {
    "__type__": "cc.SpriteFrame",
    "content": {
      "name": "singleColor",
      "texture": "a8027877-d8d6-4645-97a0-52d4a0123dba",
      "rect": [
        0,
        0,
        2,
        2
      ],
      "offset": [
        0,
        0
      ],
      "originalSize": [
        2,
        2
      ]
    }
  },
  {
    "__type__": "cc.SpriteFrame",
    "content": {
      "name": "HelloWorld",
      "texture": "6aa0aa6a-ebee-4155-a088-a687a6aadec4",
      "rect": [
        0,
        0,
        195,
        270
      ],
      "offset": [
        0,
        0
      ],
      "originalSize": [
        195,
        270
      ]
    }
  },
  {
    "__type__": "cc.AnimationClip",
    "_name": "test",
    "_duration": 1,
    "wrapMode": 22,
    "curveData": {
      "props": {
        "position": [
          {
            "frame": 0,
            "value": [
              -81,
              -140
            ]
          },
          {
            "frame": 1,
            "value": [
              95,
              155
            ]
          }
        ],
        "rotation": [
          {
            "frame": 0,
            "value": 0
          },
          {
            "frame": 1,
            "value": 90
          }
        ]
      }
    }
  }
]