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
        pickRadius: 0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    getPlayerDistance() {
        // 根据player节点位置判断距离
        var playerPos = this.game.player.getPosition();
        //根据两点计算两点之间的距离
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    },

    onPicked() {
        // 当星星被收集时，调用Game脚本中的接口，生成一个新的星星
        this.game.spawnNewStar();
        // 成功收集的时候 分数更新
        this.game.gainScore();
        // 销毁当前星星
        this.node.destroy();
    },

    start () {

    },

    update () {
        // 每帧判断星星和主角之间的距离是否小于收集距离
        if(this.getPlayerDistance() < this.pickRadius) {
            // 调用收集行为
            this.onPicked();
            return;
        }
    },
});
