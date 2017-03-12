(function(){
    window.FrameUtil = Class.extend({
        init:function(){
            //初始帧数
            this.sFrame = 0;
            //起始时间
            this.sTime = new Date();
            //当前总帧数
            this.currentFrame = 0;
            //真实帧数
            this.realFps = 0;
        },
        //计算真实帧数,定时器调用,每帧都要调用
        countFps:function(){
            //总帧数++
            this.currentFrame++;
            //获取当前时间
            var currentTime = new Date();
            //判断是否走过了一秒
            if((currentTime - this.sTime) >= 1000 ){
                //计算真实帧数,并更新
                this.realFps = this.currentFrame - this.sFrame;
                this.sTime = currentTime;
                this.sFrame = this.currentFrame;
            }
        }
    });
})();
