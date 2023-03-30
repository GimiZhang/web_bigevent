$(function () {
  var layer = layui.layer;
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  //   监听上传按钮 模拟选择文件空间点击
  $("#btnChooseImage").on("click", function (e) {
    $("#file").click();
  });

  //通过file的change事件 监听用户选择的文件
  $("#file").on("change", function (e) {
    //获取用户选择的文件
    var fileList = e.target.files;
    console.log(e.target);
    if (fileList.length === 0) {
      return layer.msg("请选择图片！");
    }

    var file = e.target.files[0];

    //将文件类型转换成url
    var newImageUrl = URL.createObjectURL(file);

    //销毁旧图片，设置新图片
    $image
      .cropper("destroy") //销毁旧的裁剪区域
      .attr("src", newImageUrl) //设置新图片路径
      .cropper(options); //重新初始化裁剪区域
  });

  $("#btnUpload").on("click", function () {
    //获取图片裁剪区域
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    //上传头像到服务器
    $.ajax({
      type: "POST",
      url: "/my/update/avatar",
      data: {
        avatar: dataURL,
      },
      success: function (response) {
        if (response.status !== 0) {
          return layer.msg(response.message);
        }

        //上传成功 刷新用户头像
        window.parent.getUserInfo();
      },
    });
  });
});
