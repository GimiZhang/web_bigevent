$(function () {
  //点击去注册链接
  $("#link-reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  //点击去登录链接
  $("#link-login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });

  //获取layui表单对象
  const form = layui.form;
  //获取layer对象
  const layer = layui.layer;
  form.verify({
    //定义密码校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位字符，且不能有空格"],
    //校验两次密码是否一致的规则
    repwd: function (value) {
      //value是再次输入密码的内容 获取密码框中的内容，判断两次密码是否一致，不一致返回提示
      var pwd = $(".reg-box [name=password]").val();
      console.log(pwd + "----" + value);
      if (pwd != value) {
        return "两次密码输入不一致";
      }
    },
  });

  //监听表单注册行为
  $("#form-reg").on("submit", function (e) {
    //禁用js点击事件
    e.preventDefault();
    var data = {
      username: $("#form-reg [name=username]").val(),
      password: $("#form-reg [name=password]").val(),
    };
    //发起ajax post请求
    $.post("api/reguser", data, function (res) {
      console.log(res);
      if (res.status !== 0) {
        // return console.log(reg.message);
        return layer.msg(reg.message);
      }
      layer.msg("注册成功");
      //注册完后自动跳转到登录页面
      $("#link-login").click();
    });
  });

  //表单提交行为
  $("#form-login").submit(function (e) {
    //阻止表单默认提交行为
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "api/login",
      //获取表单中的数据
      data: $(this).serialize(),
      success: function (response) {
        if (response.status != 0) {
          return layer.msg(response.message);
        }
        layer.msg('登录成功');
        console.log(response.token);
        //将token存储到本地localstorage中
        localStorage.setItem('token',response.token);
        //跳转到主页面
        location.href = "/index.html";
      },
    });
  });
});
