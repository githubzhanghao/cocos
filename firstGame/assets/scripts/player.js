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
        accel: 0,
        // 落地声音
        jumpAudio: {
            default: null,
            type: cc.AudioClip
        },
        // 重力
        prize: 0.85
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.node.x = 0;
        this.node.y = 0;
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
        // cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_START, this.onTouchMove, this);
        // this.node.on('touchstart', this.onTouchMove, this);
        // this.node.on('touchmove', this.onTouchMove, this);
        // this.node.on('mouseup', this.onTouchMove, this);
        // cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_END, this.onKeyDown, this);
        // cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_CANCEL, this.onKeyUp, this);


        // 重力感应 DEVICEMOTION
        //设置开启重力传感
        // this.deviceMotion = true;
        cc.systemEvent.setAccelerometerEnabled(true); 
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);

    },

    onTouchMove(event) {
        var delta = event.getDelta();
        // this.xSpeed = delta.mag();
        // console.log('touch', event);
    },

    setJumpAction: function() {
        // 跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());

        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());

        // 落地播放声音
        var callback = cc.callFunc(this.playJumpSound, this);

        // 无限重复
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));

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

    onDeviceMotionEvent(event) {
        this.xSpeed += -event.acc.x * this.accel;
        this.ySpeed += -event.acc.y * this.accel;
    },

    playJumpSound: function() {
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },

    // start () {

    // },

    update (dt) {
        // if(this.accLeft) {
        //     this.xSpeed -= this.accel * dt;
        // } else if (this.accRight) {
        //     this.xSpeed += this.accel * dt;
        // }

        var nowXspeed = Math.abs(this.xSpeed);
        var nowYSpeed = Math.abs(this.ySpeed);
        // 限制主角的速度不能超过最大值
        if (nowXspeed > this.maxMoveSpeed) {
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / nowXspeed;
        }
        if (nowYSpeed > this.maxMoveSpeed) {
            this.ySpeed = this.maxMoveSpeed * this.ySpeed / nowYSpeed;
        }

        // 如果超出边界
        var w = this.boxWidth / 2;
        var h = this.boxHeight / 2;
        if(this.node.x + this.width / 2 > w || this.node.x - this.width / 2 < -w) {
            // 做回弹效果
            this.xSpeed = -this.xSpeed * this.prize;
            // 播放声音
            this.playJumpSound();
            // 如果贴边
            if(Math.floor(this.xSpeed) === 0){
                this.node.x = this.node.x > 0 ? w - this.width / 2 : w + this.width / 2;
            }
        }
        if(this.node.y + this.height > h || this.node.y < -h) {
            
            // 做回弹效果
            this.ySpeed = -this.ySpeed * this.prize;
            // 播放声音
            this.playJumpSound();
            // 如果贴边
            if(Math.floor(this.ySpeed) === 0) {
                this.node.y = this.node.y > 0 ? h - this.height : 0;
            }
        }
        // 更新位置
        this.node.x += this.xSpeed * dt;
        this.node.y += this.ySpeed * dt;
        
    },

    onDestroy() {
        // 取消键盘监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    }
});
