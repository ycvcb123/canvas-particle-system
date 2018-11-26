const STATUS_RUN = 'run';
const STATUS_STOP = 'stop';

//粒子系统类
class Particle {
    //1. 创建 `canvas` 画布
    constructor(idName, width, height, options, offScreenRendering) {
        this.canvas = document.getElementById(`${idName}`);
        this.ctx = this.canvas.getContext('2d'); //canvas执行上下文
        this.timer = null; //动画运行定时器，采用requestAnimationFrame
        this.status = STATUS_STOP; //动画执行状态 默认为stop
        this.options = options || {}; //配置（粒子数量，速度等）
        this.offScreenRendering = offScreenRendering; //是否启用离屏渲染
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        this.init();
    };
    //2. 初始化粒子
    init() {
        this.particle = [];
        let amount = this.options.amount;
        let { width, height } = this;
        if (this.offScreenRendering) {
            this.createOffScreenInstance(width, height, amount);
        } else {
            this.createNormalInstance(width, height, amount);
        }
    };
    //3. 绘制粒子到画布
    draw() {
        let self = this;
        let { ctx, width, height } = this;
        ctx.clearRect(0, 0, width, height);
        this.moveFunc(ctx, width, height);
        this.timer = requestAnimationFrame(() => {
            self.draw();
        });
    };
    //4. 定义粒子的运动方式
    moveFunc() {

    };
    //5. 控制动画的播放与暂停。
    run() {
        if (this.status !== STATUS_RUN) {
            this.status = STATUS_RUN;
            this.draw();
        }
    };
    stop() {
        this.status = STATUS_STOP;
        cancelAnimationFrame(this.timer);
    };
    //6. 清除画布
    clear() {
        this.stop();
        this.ctx.clearRect(0, 0, this.width, this.height);
    };
};

//离屏渲染专用类
class offScreenItem {
    constructor(width, height, create) {
        this.canvas = document.createElement('canvas');
        this.width = this.canvas.width = width * 2;
        this.height = this.canvas.height = height * 2;
        this.ctx = this.canvas.getContext('2d');
        create(this.ctx, this.width, this.height);
    };
    // 移动粒子
    move(ctx, x, y) {
        if (this.canvas.width && this.canvas.height) {
            ctx.drawImage(this.canvas, x, y);
        }
    }
}

export {
    Particle,
    offScreenItem
}