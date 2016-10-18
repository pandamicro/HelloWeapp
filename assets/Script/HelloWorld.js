cc.Class({
    extends: cc.Component,

    properties: {
        pauseBtn: cc.Node,
        anime: cc.Animation
    },

    // use this for initialization
    onLoad: function () {
        this.pauseBtn.on('touchstart', function () {
            this.anime.pause();
        }, this);
    }
});
