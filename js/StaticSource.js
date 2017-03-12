
(function(){
    window.StaticSource = Class.extend({
        init:function(){
            //定义一个空对象,保存数据里所有的图片对象
            this.allImageObj = {};
        },
        loadImage:function(arr){
            var self = this;
            for(var i = 0;i<arr.length ;i++){
                //9创建图片对象
                var image = new Image();
                image.src = arr[i].src;
                image.index = i;
                //10图片加载完毕后保存对象
                image.onload = function(){
                    //12抽取出数据里的图片名字
                    var name = arr[this.index].name;
                    //13将对象保存到全部图片对象里{name:dom对象}
                    self.allImageObj[name] = this;
                }
            }
            return this.allImageObj;
        }
    });
})();