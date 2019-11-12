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
        let borderWH = this.node.parent.width / 2;
        this._dest = this.node.position;
        this.borderW = borderWH;
        this.borderH = borderWH;
        // let canvas = cc.find('Canvas');
        // this.borderW = canvas.width / 2;
        // this.borderH = canvas.height / 2;
        this.w = this.node.width / 2;
        this.h = this.node.height / 2;

        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        
    },

    start () {
        this._dest = cc.v2(0, 0);
    },

    onTouchStart () {
        // this._dest = cc.v2(0, 0);
    },

    onTouchMove (event) {
        let touches = event.getTouches();
        const _touchLocation = touches[0].getLocation();
        // let _position = this._dest.add(delta),

        
        // console.log(x, y);
        // 先判断手指是否已经脱离触控区域
        console.log(event);
        if (_touchLocation.x > this.borderW || _touchLocation.x < -this.borderW || _touchLocation.y > this.borderH || _touchLocation.y < this.borderH) {
            return;
        }

        let delta = touches[0].getDelta();
        let _position = this.node.position.add(delta),
            { x, y } = _position;
        // 在触控区域内，判断按钮点的位置
        if (x + this.w > this.borderW || x - this.w < -this.borderW || y + this.h > this.borderH || y - this.h < -this.borderH) {
            console.log('超出范围了');
            // this.node.position = cc.v2(0, 0);
            return;
        }
        console.log('超出范围继续运动');
        this._dest.addSelf(delta);
        this.node.position = this._dest;
    },

    onTouchEnd () {
        // this._dest = this.node.position;
        this.node.position = cc.v2(0, 0);

    }

    // update (dt) {},
});
