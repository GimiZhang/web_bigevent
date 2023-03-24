//设置基类网络api，用来控制环境
$.ajaxPrefilter(function(options){
    //每次网络请求之前都会调用此方法
    options.url = 'http://www.liulongbin.top:3007'+options.url;

    //判断并添加请求token
    if(options.url.indexOf('/my') != -1){
        options.headers = {
            Authorization: localStorage.getItem("token") || "",
        };
    }

    //全局挂载判断token是否失效
    options.complete = function(res){
        console.log(res);
        if(res.responseJSON.status ===1 && res.responseJSON.message ==='身份认证失败！'){
          //说明未登录 清空token  跳转到登录页面
          localStorage.removeItem('token');
          location.href = '/login.html';
        }
      }
});