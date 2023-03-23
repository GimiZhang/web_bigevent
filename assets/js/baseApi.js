//设置基类网络api，用来控制环境
$.ajaxPrefilter(function(options){
    //每次网络请求之前都会调用此方法
    options.url = 'http://www.liulongbin.top:3007/'+options.url;
});