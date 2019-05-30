// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const myItem = require('./myItem');
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
        sprite_item: {
            type: cc.Sprite,
            default: null
        },
        sprite_array: {
            type: cc.Sprite,
            default: []
        },

        cutome_comp: {
            type: myItem,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log('onload');
        // this.node或者这个组件所挂载的节点
        // 
        // console.log(this.name, this.node.name);
        // const com_inst = this.addComponent('myItem');
        // const com_inst2 = this.addComponent(myItem);
        // const com_inst3 = this.node.addComponent(myItem);
        // console.log(com_inst); // 一样的结果
        // console.log(com_inst2); // 一样的结果
        // console.log(com_inst3); // 一样的结果

        // const getCom = this.getComponent('myItem');
        // const item = this.getComponent(myItem);
        // const item = this.getComponents(myItem);
        // const item = this.getComponents('game_scens');
        // const item = this.getComponents('Canvas');
        // const item = this.parent();
        // console.log(getCom);
        // const item  = this.getComponentInChildren(cc.Sprite); //查找第一个 
        // const item  = this.getComponentsInChildren(cc.Sprite); // 查找所有
        // console.log(item);
        // this.destroy();
        // console.log(item);
        
        // 定时器 schedule
        // console.log(this);
        // this.scheduleOnce(function (){
        //     console.log('一次性的定时器');
        //     console.log(this);
        // }.bind(this), 3);

        //一次性定时器 scheduleOnce
        // this.scheduleOnce(() => {
        //     console.log('一次性的定时器');
        //     console.log(this);
        // }, 3);


        // 延迟4s后，每1s执行一次，执行无限次
        // this.schedule(() => {
        //     console.log('schedule');
        // }, 1, cc.macro.REPEAT_FOREVER, 4);

        // 延迟4s后，每轮分配1s执行这个回调，执行（3+1）次
        // this.schedule(() => {
        //     console.log('schedule');
        // }, 1, 3, 2);

        // this.schedule(() => {
        //     console.log('schedule定时器');
        // }, 1, cc.macro.REPEAT_FOREVER, 1);


        // 无限重复
        // this.schedule(() => {
        //     console.log('schedule定时器');
        // }, 1, cc.macro.REPEAT_FOREVER, 1);
        console.log(this.customCallback);
        this.schedule(this.customCallback, 1, cc.macro.REPEAT_FOREVER);

        this.schedule(() => {
            console.log('取消定时器');
            this.unschedule(this.customCallback);
        }, 0, 0, 2);

        // 3秒后取消所有定时器
        // this.schedule(() => {
        //     console.log('取消所有定时器');
        //     this.unscheduleAllCallbacks();
        // }, 0, 0, 3);


    },

    customCallback() {
        console.log('定时器回调');
    },

    start () {
        console.log('start');
    },

    // 所有的画面更新前
    update (dt) {
        // console.log(dt);
    },

    lateUpdate (e) {
        // console.log('lateUpdate', e);
    },

    onEnable (e) {
        console.log('onEnable', e);
    },

    onDisable (e) {
        console.log('onDisable', e);
    },
    onDestroy (e) {
        console.log('onDestroy', e);
    }
});
