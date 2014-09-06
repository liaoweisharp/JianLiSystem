$(function () {
    
    $invokeWebService_2("~WebService_XiangMu.test", {}, null, function (result) { 
        
    }, null, null, { userContent: "getInitData" });

//    $.jUploader.setDefaults({
//        cancelable: true, // 可取消上传
//        allowedExtensions: ['jpg', 'png', 'gif'], // 只允许上传图片
//        messages: {
//            upload: '上传',
//            cancel: '取消',
//            emptyFile: "{file} 为空，请选择一个文件.",
//            invalidExtension: "{file} 后缀名不合法. 只有 {extensions} 是允许的.",
//            onLeave: "文件正在上传，如果你现在离开，上传将会被取消。"
//        }
//    });

//    $.jUploader({
//        button: 'upload-button4', // 这里设置按钮id
//        action: 'upload.aspx', // 这里设置上传处理接口

//        // 开始上传事件
//        onUpload: function (fileName) {
//            $.jBox.tip('正在上传 ' + fileName + ' ...', 'loading');
//        },

//        // 上传完成事件
//        onComplete: function (fileName, response) {
//            // response是json对象，格式可以按自己的意愿来定义，例子为： { success: true, fileUrl:'' }
//            if (response.success) {
//                jBox.tip('上传成功', 'success');
//                $('#photo4').attr('src', response.fileUrl);
//            } else {
//                jBox.tip('上传失败', 'error');
//            }
//        },

//        // 系统信息显示（例如后缀名不合法）
//        showMessage: function (message) {
//            $.jBox.tip(message, 'error');
//        },

//        // 取消上传事件
//        onCancel: function (fileName) {
//            $.jBox.tip(fileName + ' 上传取消。', 'info');
//        }
//    });

//    // $("#dd").formatCurrency();


//    $("#table1").rowspan(0);

})