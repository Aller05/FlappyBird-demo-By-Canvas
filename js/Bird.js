(function(){
    window.Bird = Class.extend({
        init:function(){
            this.x = game.canvas.width *0.5 - 200;
            this.y = 100;
            this.width = 85;
            this.height = 60;
            //记录翅膀状态,三张图片,0,1,2,初始为0;
            this.state = 0;
            //记录状态,上升还是下落,0是下落,1是上升
            this.birdState = 0;
            //下落帧数
            this.dropFrame = game.frameUtil.currentFrame;
            //下落的增量
            this.dY = 0;
            //旋转角度
            this.rotateAngle = 0;
            //空气阻力
            this.datleY = 0;
            //记录鸟的生死状态
            this.die = false;
            //喷血动画角标
            this.animationIndex = 0;
            //记录分数
            this.num = 0;
        },
        render:function(){
            //1.先绘制分数
            game.ctx.save();
            game.ctx.font = "30px '微软雅黑'";
            game.ctx.fillStyle = 'red';
            game.ctx.fillText('总分数 : '+this.num,canvas.width * 0.5-50,30,100,20);
            game.ctx.restore();
            if(this.die){//2如果死了,绘制喷血
                this.animationIndex++;
                this.sWidth = 325;
                this.sHeight = 138;
                this.row = parseInt(this.animationIndex / 5);
                this.col = this.animationIndex % 5;
                game.ctx.drawImage(game.allImageObj['blood'],this.col*this.sWidth,this.row*this.sHeight,this.sWidth,this.sHeight,this.x-100,this.y,this.sWidth,this.sHeight);
                game.ctx.drawImage(game.allImageObj['gameover'],(game.canvas.width - 626)*0.5,(game.canvas.height - 144)*0.5);
                return;
            }
            //3绘制正常状态的小鸟
            game.ctx.save();
            game.ctx.translate(this.x+this.width*0.5,this.y+this.height*0.5);
            game.ctx.rotate(this.rotateAngle * Math.PI/180);
            game.ctx.translate(-(this.x+this.width*0.5),-(this.y+this.height*0.5));
            game.ctx.drawImage(game.allImageObj['bird'],this.state*this.width,0,this.width,this.height,this.x,this.y,this.width,this.height);
            game.ctx.restore();
        },

        update:function(){
            //如果死亡,则更新喷血动画角标
            if(this.die){
                this.animationIndex++;
                if(this.animationIndex >= 29){
                    game.pause();
                }
                return;
            }
            //翅膀动画,每5帧挥动一次翅膀
            if(game.frameUtil.currentFrame % 5 == 0){
                this.state++;
                if(this.state>2){
                    this.state=0;
                }
            }
            //下落和上升动画
            if(this.birdState == 0){//下落情况
                //下落高度: h= 1/2 *g*Math.pow(t, 2)
                this.dY = hardNum /800  * 0.5 * 9.8 * Math.pow(game.frameUtil.currentFrame - this.dropFrame,2);
                //角度增加,低头
                this.rotateAngle++;
            }else if(this.birdState == 1){
                //空气阻力的目的是形成点击上升后再缓慢下落的效果,而且下落到原来的位置后,状态再次改为下落,同时更新下落帧数,从而重新计算下落的加速度.否则还会按照之前的帧数计算,会很快的掉下去
                this.datleY++;
                this.dY = -15 + this.datleY;
                if(this.dY>0){
                    this.birdState = 0;
                    this.dropFrame = game.frameUtil.currentFrame;
                }
            }
            //更新this.y值,产生新的效果
            this.y += this.dY;
            //设定上限
            if(this.y<=0){
                this.y=0;
            }
            //如果撞到地板,就结束游戏
            if(this.y > game.canvas.height - this.height - 48){
                game.gameOver();
                //死亡逻辑:鸟发生碰撞,调用Game的gameOver,使背景暂停,通知bird状态已死亡,此时定时器继续执行中,bird的更新也继续,然后绘制喷血和游戏结束文字,当喷血动画角标到30时,调用game.pause,停掉定时器.
            }
        },
        bindLinstenClick:function(){
            var self = this;
            game.canvas.addEventListener('mousedown',function(){
                self.birdState = 1;
                self.rotateAngle = -25;
                self.datleY = 0;
            })
        }

    });
})();