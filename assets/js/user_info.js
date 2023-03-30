var form = layui.form;
var layer = layui.layer;
$(function () {
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度必须在1~6个字符之间";
      }
    },
  });

  initUserinfo();

  //提交数据
  $(".layui-form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (response) {
        if (response.status !== 0) {
          return layer.msg(response.message);
        }
        //请求成功
        layer.msg(response.message);

        //调用父页面的获取用户信息方法，更新用户昵称和头像
        window.parent.getUserInfo();
      },
    });
  });

  //重置
  $("#btnReset").on('click', function (e) {
    //阻止表单默认的重置事件
    e.preventDefault();
    //重新获取用户信息
    initUserinfo();
    
  });
});

//初始化用户信息
function initUserinfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    success: function (response) {
      if (response.status !== 0) {
        return layer.msg(response.message);
      }
      console.log(response);
      //调用form.val()快速为表单赋值
      form.val("formUserInfo", response.data);
    },
  });
}
