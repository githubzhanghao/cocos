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
        starPrefab: {
            default: null,
            type: cc.Prefab
        },

        // 星星产生后消失事件的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面节点,用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node
        },
        // player节点，用户获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: cc.Node
        },

        // 分数组件
        scoreDisplay: {
            default: null,
            type: cc.Label
        },

        // 得分声音
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        }

        // // 练习属性参数
        // score: {
        //     default: 0,
        //     displayName: "Scroe (player)",
        //     tooltip: "The score of player"
        // },
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //1. 显示当前页面右上角的转发按钮
        // wx&&(wx.showShareMenu({withShareTicket:true}));
        //2. 监听分享
        // cc.loader.loadRes("texture/share",function(err,data){
        //     wx.onShareAppMessage(function(res){
        //         return {
        //             title: "游戏demo",
        //             imageUrl: data.url,
        //             success(res){
        //                 console.log(res)
        //             },
        //             fail(res){
        //                 console.log(res)
        //             } 
        //         }
        //     })
        // });
        //3. 主动拉起分享
        // cc.loader.loadRes("texture/share",function(err,data){
        //     wx.shareAppMessage({
        //         title: "游戏demo",
        //         imageUrl: data.url,
        //         success(res){
        //             console.log(res)
        //         },
        //         fail(res){
        //             console.log(res)
        //         } 
        //     })
        // });
        this.score = 0;
        this.groundY = this.ground.y + this.ground.height / 2;
        this.spawnNewStar();
    },

    spawnNewStar() {

        // 创建一个新的节点
        var newStar = cc.instantiate(this.starPrefab);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        // 在星星组件上暂存 Game 对象的引用
        newStar.getComponent('Star').game = this;
        // 将新增的星星节点添加到Canvas节点下面
        this.node.addChild(newStar);
        
    },

    getNewStarPosition() {
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的Y坐标
        var randY = this.groundY + Math.random() * this.player.getComponent('player').jumpHeight + 66;
        // 根据屏幕宽度，随机得到一个星星x坐标
        var maxX = this.node.width / 2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        // 返回星星坐标
        return cc.v2(randX, randY);
    },

    gainScore() {
        // 分数加1
        this.score += 1;
        cc.audioEngine.playEffect(this.scoreAudio, false);
        this.scoreDisplay.string = 'Score: ' + this.score + ' 分';
    },

    start () {

    },

    // update (dt) {
    // },
});
