$(function () {
  var form = layui.form;
  var layer = layui.layer;

  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    samePwd: function (value) {
      if (value === $("[name=oldPwd]").val()) {
        return "新旧密码不能一致";
      }
    },
    rePwd: function (value) {
      if (value !== $("[name=newPwd]").val()) {
        return "新密码和确认密码必须一致";
      }
    },
  });

  $('.layui-form').submit(function (e) { 
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/my/updatepwd",
        data: $(this).serialize(),
        success: function (response) {
            if(response.status !== 0){
                layer.msg(response.message);
            }

            layer.msg("密码更新成功");
            //重置表单 使用dom重置表单，jquery无重置表单功能
            $('.layui-form')[0].reset();
        }
    });
  });
});
