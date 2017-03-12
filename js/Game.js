
(function(){
    window.Game = Class.extend({
        init:function(option){
            option = option || {};
            var self = this;
            this.fps = option.fps || 0;
            this.canvasId = option.canvasId || 0;
            //0获取上下文
            this.canvas = document.getElementById(option.canvasId);
            this.ctx = this.canvas.getContext('2d');
            //1实例化帧工具类对象
            this.frameUtil = new FrameUtil();
            //2.实例化获取图片对象工具类
            this.staticSource = new StaticSource();
            //4.调用获取图片对象方法,并保存;
            this.allImageObj = this.staticSource.loadImage(option.arr);
        },
        //游戏开始
        run:function(){
            clearInterval(this.timer);
            //备份指针
            var self = this;
            //定时器,根据设定的每秒帧数调用循环方法
            this.timer=setInterval(function(){
                self.runloop();
            },1000 / self.fps);
            //创建房子对象
            this.fangzi = new Background({
                img:self.allImageObj['fangzi'],
                x:0,
                y:self.canvas.height - 256 - 100,
                width:300,
                height:256,
                speed:1*hardNum
            });
            //创建树对象
            this.shu = new Background({
                img:self.allImageObj['shu'],
                x:0,
                y:self.canvas.height - 216 - 48,
                width:300,
                height:216,
                speed:2*hardNum
            });
            //创建地板对象
            this.diban = new Background({
                img:self.allImageObj['diban'],
                x:0,
                y:self.canvas.height - 48,
                width:48,
                height:48,
                speed:3*hardNum
            });
            //5.创建存放管对象的数组
            this.pipeArr = [];
            //6.绘制小鸟
            this.bird = new Bird();
        },
        //循环
        runloop:function(){
            //0清屏
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            //2更新和绘制房子对象
            this.fangzi.update();
            this.fangzi.render();
            //3更新和绘制树对象
            this.shu.update();
            this.shu.render();
            //4更新和绘制地板对象
            this.diban.update();
            this.diban.render();
            //5.每100帧创建一个管道放进数组
            if(this.frameUtil.currentFrame % 65 ==0){
                this.pipeArr.push(new Pipe());
            }
            //6循环绘制管道
            for(var i = 0;i<this.pipeArr.length ;i++){
                this.pipeArr[i].update();
                this.pipeArr[i].render();
            }
            //7更新和绘制小鸟
            this.bird.update();
            this.bird.render();
            this.bird.bindLinstenClick();
            //1调用帧工具类的计算帧方法
            this.frameUtil.countFps();
            //1绘制真实帧数和总帧数
            this.ctx.fillText('Fps/' + this.frameUtil.realFps,10,15);
            this.ctx.fillText('FNO/' + this.frameUtil.currentFrame,10,35);
        },
        //结束定时器
        pause:function(){
            clearInterval(this.timer)
        },
        //游戏结束
        gameOver:function(){
            this.fangzi.pause();
            this.shu.pause();
            this.diban.pause();
            for(var i = 0;i<this.pipeArr.length ;i++){
                this.pipeArr[i].pause();
            }
            this.bird.die = true;

        }

    });
})();
