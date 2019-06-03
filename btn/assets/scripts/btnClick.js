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
        myBtn: {
            type: cc.Button,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // console.log(this.myBtn);
        // const myBtn = this.node.getChildByName('btn').getComponent(cc.Button);
        const myBtnNode = this.node.getChildByName('btn');
        
        const addButton = myBtnNode.addComponent(cc.Button);
        console.log(addButton);
        
        // 定义事件
        const click_event = new cc.Component.EventHandler();
        click_event.target = this.node;
        click_event.component = 'btnClick';
        click_event.handler = 'custom_click';
        click_event.customEventData = '自定义参数';

        // 加入组件事件组
        addButton.clickEvents.push(click_event);

    },

    /**
     绑定一个时间需要三要素： 节点，组件，函数
     */
    // 点击事件自定义
    custom_click (e, data) {
        console.log(arguments);
        console.log('按钮点击了', data, typeof data);
    },

    start () {

    },

    // update (dt) {},
});
