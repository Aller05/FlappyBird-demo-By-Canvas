(function(){
    window.Pipe = Class.extend({
        init:function(){
            //开口方向,0是向下,1是向上
            this.dir = _.random(0,1);
            this.width = 148;
            //管子的高度随机数100到屏幕高度一半
            this.height = _.random(150*hardNum,game.canvas.height * 0.2*hardNum);
            this.x = game.canvas.width;
            this.y = this.dir == 0 ? 0 : game.canvas.height-this.height - 48;
            this.speed = 4 * hardNum;
        },
        render:function(){
            //如果口朝下
            if(this.dir == 0){
                game.ctx.drawImage(game.allImageObj['pipe1'],0,1664-this.height,this.width,this.height,this.x,this.y,this.width,this.height);
            }else if(this.dir == 1){//口朝上
                game.ctx.drawImage(game.allImageObj['pipe0'],0,0,this.width,this.height,this.x,this.y,this.width,this.height)
            }
        },
        update:function(){
            this.x -= this.speed;
            if(this.x < -this.width){
                game.pipeArr = _.without(game.pipeArr,this);
            }
            //碰撞检测和记录分数累加
            //1首先判断X方向,如果小鸟的X值加上自身宽度,和管道的X值加上宽度的值,如果两个值有重叠,说明有碰撞的可能
            //2那么就进入碰撞检测程序,继续判断Y方向究竟是否发生了碰撞
            if((game.bird.x + game.bird.width)>this.x && game.bird.x < (this.x + this.width)){
                //3管道分开口方向,所以需要分别判断Y值
                if(this.dir == 0){//方向值为0,则管道开口朝下
                    //4下面两个判断,如果进入第一个,说明没有发生碰撞,分数需要累加,否则进入第二个,说明碰撞了,不累加分数
                    //4.1用小鸟绘制圆点的X值,和管道绘制圆点X的值加上管道宽度的值(其实就是管道右上角的点),两个值相减
                    //4.1相减后的值肯定在0到-4之间不会产生正数(因为上一个判断条件的原因所致),因为管道的速度为4
                    //4.1所以进行如下判断,成立则说明顺利通过了一个管道,分数累加
                    if((game.bird.x-(this.x+this.width))<=0 && (game.bird.x-(this.x+this.width))>= -this.speed){
                        game.bird.num++;
                    }
                    //5碰撞检测,在X方向值有重叠的前提下,如果Y值又大于管道高度,说明一定发生了碰撞
                    else if(game.bird.y < this.height){
                        game.gameOver();
                    }
                }else if(this.dir == 1){//口朝上
                    //下面第一个判断和上面的一样
                    if((game.bird.x-(this.x+this.width))<=0 && (game.bird.x-(this.x+this.width))>= -this.speed){
                        game.bird.num++;
                    }
                    //6.开口朝上管道的碰撞检测,如果小鸟X值加上自身高度值,大于管道的Y值,说明小鸟已经和管道发生了重叠
                    else if((game.bird.y + game.bird.height) > this.y){
                        game.gameOver();
                    }
                }
            }
        },
        pause:function(){
            this.speed = 0;
        }

    });
})();





