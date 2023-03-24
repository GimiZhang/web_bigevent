$(function () {
    var layer = layui.layer;
  getUserInfo();

  $("#btnLoginOut").on("click", function () {
    layer.confirm(
      "确认退出？",
      { icon: 3, title: "提示" },
      function (index) {
        localStorage.removeItem('token');
        location.href='/login.html';
        //关闭弹窗图层
        layer.close(index);
      }
    );
  });
});

function getUserInfo() {
  var layer = layui.layer;
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    success: function (response) {
      console.log("response :>> ", response);
      if (response.status != 0) {
        return layer.msg("获取用户信息失败");
      }
      //设置用户头像
      renderAvatar(response.data);
    },

    //不论请求成功还是失败都会调用这个函数
    // complete:function(res){
    //   console.log(res);
    //   if(res.responseJSON.status ===1 && res.responseJSON.message ==='身份认证失败！'){
    //     //说明未登录 清空token  跳转到登录页面
    //     localStorage.removeItem('token');
    //     location.href = '/login.html';
    //   }
    // }
  });
}

function renderAvatar(user) {
  var name = user.nickname || user.username;
  $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
  if (user.user_pic != null) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $("#text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $("#text-avatar").html(first).show();
  }
}
