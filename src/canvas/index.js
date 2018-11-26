import { Particle, offScreenItem } from "../lib/particle.js";

class exampleMove extends Particle {
    //粒子形状绘制
    createParticle(ctx, x, y, r, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    };
    //粒子如何运动
    moveFunc(ctx, width, height) {
        this.particle.map(item => {
            item.posY = item.posY + 2;
            if (item.posY > height) {
                item.posX = Math.round(Math.random() * width);
                item.posY = Math.round(Math.random() * height);
            };
            if (this.offScreenRendering) {
                item.instance.move(this.ctx, item.posX, item.posY);
            } else {
                this.createParticle(ctx, item.posX, item.posY, item.r, item.color);
            }
        });
    };
    //离屏粒子初始化位置
    createOffScreenInstance(width, height, amount) {
        // let particle1 = new offScreenItem(4, 4, (ctx, width, height) => {
        //     this.createParticle(ctx, width / 2, height / 2, width / 2, '#d63e3e');
        // });
        // let particle2 = new offScreenItem(4, 4, (ctx, width, height) => {
        //     this.createParticle(ctx, width / 2, height / 2, width / 2, '#23409b');
        // });
        for (let i = 0; i < amount; i++) {
            let particle = new offScreenItem(4, 4, (ctx, width, height) => {
                this.createParticle(ctx, width / 2, height / 2, width / 2, '#23409b');
            });
            this.particle.push({
                instance: Math.random() > .5 ? particle1 : particle2,
                posX: Math.round(Math.random() * width),
                posY: Math.round(Math.random() * height)
            });
        };
    };

    //正常粒子初始化位置
    createNormalInstance(width, height, amount) {
        for (let i = 0; i < amount; i++) {
            this.particle.push({
                posX: Math.round(Math.random() * width),
                posY: Math.round(Math.random() * height),
                r: 4,
                color: Math.random() < 0.5 ? '#d63e3e' : '#23409b'
            });
        }
    }
}

var example = new exampleMove('example', 400, 400, { speed: 3, amount: 6000 }, true);



document.getElementById('clear').addEventListener('click', function() {
    example.clear();
});

document.getElementById('pause').addEventListener('click', function() {
    example.stop();
});

document.getElementById('run').addEventListener('click', function() {
    example.run();
});