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
        xInertia: 40, // x轴速度向量
        yInertia: 35, // y轴速度向量
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 场景背景填充
        const pdBackground = 0;
        const parent = this.node.parent;
        const { width, height } = parent;

        // 游戏容器边界
        this.boxBorderWidth = (width - pdBackground * 2) / 2;
        this.boxBorderHeight = (height - pdBackground * 2) / 2;
        // 当前player节点的半径(宽、高)
        this.radiusX = this.node.width / 2,
        this.radiusY = this.node.height /2;
        // 当前节点双轴上的速度
        this.xSpeed = 1;
        this.ySpeed = 1;
        
        // 边界的player坐标
        this.playerBorderPosX = this.boxBorderWidth - this.radiusX;
        this.playerBorderPosY = this.boxBorderHeight - this.radiusY;
        // this.node.x = width / 2 - this.radiusX;

        // 限定fps（待确认）
        this.fps = 0.027;
        
    },

    start () {
        // this.node.x = this.boxBorderWidth;
        // manager.enabledDrawBoundingBox = true;
    },

    // onCollisionEnter(other, self) {
    //     if (other.node.name === self.node.name) {
    //         // self.node.getComponent('root').yInertia *= -1
    //         // other.node.getComponent('root').yInertia *= -1;
    //         this.yInertia *= -1;
    //         // this.xInertia *= -1;
    //     }
    // },

    update (dt) {
        if (this.fps > 0) {
            this.fps -= dt;
            return;
        } else {
            this.fps += dt;
        }

        this.xSpeed = dt * 10 * this.xInertia;
        this.ySpeed = dt * 10 * this.yInertia;

        // const { posX, posY } = this.isOut(this.xSpeed, this.ySpeed);

        // this.node.x = posX;
        // this.node.y = posY;
    },

    // 和其他root碰撞检测 (没思路)
    // isFric() {

    // },

    /**
     * 
     * @param {水平速度} xSpeed
     * @param {垂直速递} ySpeed
     * 返回 nextNodePositon {x, y}
     */
    // 出界检测
    isOut(xSpeed, ySpeed) {

        // 水平检测
        let nextPosX = this.node.x + xSpeed;
        if (nextPosX + this.radiusX > this.boxBorderWidth) {
            nextPosX = this.playerBorderPosX;
            this.xInertia *= -1; 
        } else if (nextPosX - this.radiusX < -this.boxBorderWidth) {
            nextPosX = -this.playerBorderPosX;
            this.xInertia *= -1; 
        }
        
        // 垂直检测
        let nextPosY = this.node.y + ySpeed;
        if (nextPosY + this.radiusY > this.boxBorderHeight) {
            nextPosY = this.playerBorderPosY;
            this.yInertia *= -1;
        } else if (nextPosY - this.radiusY < -this.boxBorderHeight) {
            nextPosY =  -this.playerBorderPosY;
            this.yInertia *= -1;
        }
        return {
            posX: nextPosX,
            posY: nextPosY
        }
    }
});
