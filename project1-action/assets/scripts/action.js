// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // const mto = cc.moveTo(2, 100, 100);
        // const mto = cc.moveTo(1, 100, 100);
        // const mto = cc.moveBy(1, 100, 100);
        // const rto = cc.rotateTo(1, 190);
        // const rto = cc.rotateBy(1, 190);
        this.node.scale = 2;
        // const sto = cc.scaleTo(1, 2);  // 缩放至某个倍数
        // const sto = cc.scaleBy(1, 1); // 缩放至当前的倍数

        // this.node.opacity = 1;
        // console.log(this.node);
        // const fto = cc.fadeIn(3, .05);
        const fto = cc.fadeOut(3);
        this.node.runAction(fto);
    },

    start () {

    },

    update (dt) {
        // console.log(this.node.x);
    },
});
