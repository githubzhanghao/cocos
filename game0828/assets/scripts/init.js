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
        root: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        const root = this.root;
        const circleCount = 20;
        const { width, height } = this.node;
        let rangX = width / 2 - root.width / 2,
            rangY = height / 2 - root.height / 2;
        for (let i = 0;i < circleCount;i++ ) {
            let _root = new cc.instantiate(root);
            _root.x = Math.random() * rangX;
            _root.y = Math.random() * rangY;
            _root.getComponent('root').xInertia = Math.random() * 40;
            _root.getComponent('root').yInertia = Math.random() * 40;
            this.node.addChild(_root);
        }
    },

    start () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    // update (dt) {},
});
