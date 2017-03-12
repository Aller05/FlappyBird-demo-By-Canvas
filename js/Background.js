(function(){
    window.Background = Class.extend({
       init:function(option){
           option = option || {};
           this.img = option.img;
           this.x = option.x || 0;
           this.y = option.y || 0;
           this.width = option.width || 100;
           this.height = option.height || 100;
            //定义图片绘制的总张数
           this.count = parseInt(game.canvas.width / this.width) + 1;
           this.speed = option.speed || 1;

       },
        render:function () {
            //绘制数量为两倍,占亮屏,从而使背景图片无限循环
            for(var i = 0; i < 2 * this.count; i++) {
                game.ctx.drawImage(this.img, this.x + i * this.width, this.y, this.width, this.height);
            }
        },
        update:function(){
            //使背景图片动起来
            this.x -= this.speed;
            //当移动超过一屏的距离时,将x值改为0
            if(this.x <= -this.count * this.width){
                this.x = 0
            }
        },
        pause:function(){
            this.speed = 0;
        }
    });
})();