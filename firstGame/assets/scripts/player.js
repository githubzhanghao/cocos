// import { systemEvent, SystemEvent } from './../../creator.d';
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
        // 跳跃高度
        jumpHeight: 0,
        // 跳跃持续时间
        jumpDuration: 0,
        // 最大移动速度
        maxMoveSpeed: 0,
        // 加速度
        accel: 20,
        // 落地声音
        jumpAudio: {
            default: null,
            type: cc.AudioClip
        },
        // 重力
        prize: 0.85,

        subXspeed: 0,
        times: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.node.x = 0;
        // this.node.y = 0;
        // 初始化跳跃动作
        this.jumpAction = this.setJumpAction();

        // this.node.runAction(this.jumpAction);
        // 加速度方向开关
        this.accLeft = false;
        this.accRight = false;
        //主角当前水平方向速度
        this.xSpeed = 0;
        //主角当前垂直方向速度
        this.ySpeed = 0;

        // 边界宽度
        this.boxWidth = this.node.parent.width;
        // 边界高度
        this.boxHeight = this.node.parent.height;
        
        // 自身宽度
        this.width = this.node.width;
        // 自身高度
        this.height = this.node.height;

        // 初始化绑定键盘监听事件
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        // touch事件监听
        // this.node.on('touchstart', this.onTouchStart, this);
        // this.node.on('touchmove', this.onTouchMove, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchcancel', this.onTouchCancel, this);

    },

    // onTouchMove(event) {
    //     var delta = event.getDelta();
    //     if (delta.x > 0) {
    //         this.accLeft = true;
    //     } else if (delta.x < 0) {
    //         this.accRight = true;
    //     }
        
    // },

    onTouchCancel() {
        this.accLeft = false;
        this.accRight = false;
    },

    onTouchEnd(event) {
        var delta = event.getStartLocation();
        var location = event.getLocation();
        this.subXspeed = location.x - delta.x;
        this.node.runAction(this.jumpAction);
        // this.accLeft = false;
        // this.accRight = false;
    },

    setJumpAction: function() {
        // 跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());

        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());

        // 落地播放声音
        var callback = cc.callFunc(this.playJumpSound, this);

        // 重复
        return cc.repeat(cc.sequence(jumpUp, jumpDown, callback), 1);

    },

    onKeyDown: function(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.a: 
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
        }
    },

    onKeyUp: function(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
        }
    },


    playJumpSound: function() {
        cc.audioEngine.playEffect(this.jumpAudio, false);
        this.times = 1;
    },

    // start () {

    // },

    update (dt) {
        
        // 根据当前加速度方向每帧更新速度
        // if (this.accLeft) {
        //     this.xSpeed -= this.accel * dt;
        // } else if (this.accRight) {
        //     this.xSpeed += this.accel * dt;
        // }
        
        // this.xSpeed += this.subXspeed * dt;

        if (this.jumpHeight > 0) {
            this.jumpHeight -= 20;
        } else {
            this.jumpHeight = 0;
        }
        // 限制主角的速度不能超过最大值
        if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        const boxBorder = this.boxWidth / 2;
        const masterBorder = this.width / 2;
        if (this.node.x - masterBorder < -boxBorder || this.node.x + masterBorder > boxBorder) {
            this.xSpeed *= -1;
            this.subXspeed *= -1;
        }

        // 根据当前速度更新主角的位置
        this.node.x += this.subXspeed * dt;
        
    },

    onDestroy() {
        // 取消键盘监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    }
});
