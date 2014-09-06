


(function () {
    var baseData = {};
    function XL(userId, type) {
        this.userId = userId;
        initDom(userId, type);

    }
    var requireColumn = ["ux_XueLiId", "ux_ZhuanYe", "ux_BiYiRiQi", "ux_BiYeYuanXiao"];
    XL.Prefix = "XL_";

    function initDom(userId, type) {
        $("#" + XL.Prefix + userId).html(loading);
        $invokeWebService_2("~WebService_RenLi.getXueLiByUserId", { userId: userId }, null, successCallBack, errorCallBack, null, { userContent: "getXueLiByUserId", userId: userId, type: type });
    }
    function successCallBack(result, context) {
        if (context.userContent == "getXueLiByUserId") {

            var data = result[0];
            baseData["学历层次"] = result[1];
            baseData["学历"] = data;
            baseData["上传文件"] = result[2];
            var userId = context.userId;
            var type = context.type;
            var jsonsArray = createJson();
            conventObjsToDateTime(data, jsonsArray); // 转换日期类型

            if (data.length == 0) {
                $("#" + XL.Prefix + userId).html(noResult);
            }
            else {
                $("#" + XL.Prefix + userId).html(html_ShowTable(data, userId, type));
                tableAddStyle(userId);
            }
        }
        else if (context.userContent == "addXueLi") {
            if (result) {
                var userId = context.userId;
                $.jBox.tip('添加成功', 'success');
                initDom(userId);
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "updateXueLi") {
            if (result) {
                var userId = context.userId;
                $.jBox.tip('更新成功', 'success');
                initDom(userId);
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "delXueLi") {

            if (result) {
                var userId = context.userId;
                $.jBox.tip('删除成功', 'success');
                initDom(userId);
            }
            else {
                $.jBox.tip('删除失败', 'error');
            }
        }

    }
    function errorCallBack(result, context) { }
    //#region 句柄
    XL.Add = function (userId) {
        var jsonArray = createJson();
        var option = { type: "new", data: { userId: userId} };
        var optionJbox = { title: "添加学历", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: XL._clickAdd };
        var bindObj = new bind(jsonArray, null, option, optionJbox);
    }
    XL.clickDetail = function (id) {
        
        var option = { type: "review" };
        //jBox options
        var optionJbox = { title: "详细", width: 850, buttons: {} };
        var jsonArray = createJson();
        var obj = baseData["学历"].firstOrDefault("ux_Id", id);
        if (obj) {

            //#region 转换成需要的数据

            //#endregion 



            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }
    XL.clickEdit = function (id) {

        var jsonArray = createJson();
        var zhiChengList = baseData["上传文件"].findAll("up_XueLiId", id);


        jsonArray.push({ title: "原件扫描上传", type: "uploadImg", init: zhiChengList, options: { btId: String.randomString(6), photoId: String.randomString(6), alreadyId: String.randomString(6), callback: click_Upload, type: "xueLi"} });
        var option = { type: "update", data: {} };
        //jBox options
        var optionJbox = { title: "编辑学历", width: 850, buttons: { "更新": "1", "取消": "0" }, showClose: false, submit: XL._clickEdit };
        var obj = baseData["学历"].firstOrDefault("ux_Id", id);
        if (obj) {
            var bindObj = new bind(jsonArray, obj, option, optionJbox);
            var arr = jsonArray.findAll("type", "uploadImg");
            if (arr.length > 0) {
                $.jUploader.setDefaults({
                    cancelable: true, // 可取消上传
                    allowedExtensions: ['jpg', 'png', 'gif'], // 只允许上传图片
                    messages: {
                        upload: '上传',
                        cancel: '取消',
                        emptyFile: "{file} 为空，请选择一个文件.",
                        invalidExtension: "{file} 后缀名不合法. 只有 {extensions} 是允许的.",
                        onLeave: "文件正在上传，如果你现在离开，上传将会被取消。"
                    }
                });
                var btId = arr[0].options.btId;
                var photoId = arr[0].options.photoId;
                var callback = arr[0].options.callback;
                var pars = "?type=" + arr[0].options.type + "&id=" + id;


                $.jUploader({

                    button: btId, // 这里设置按钮id
                    action: '../upload.aspx' + pars, // 这里设置上传处理接口

                    // 开始上传事件
                    onUpload: function (fileName) {
                        $.jBox.tip('正在上传 ' + fileName + ' ...', 'loading');
                    },

                    // 上传完成事件
                    onComplete: function (fileName, response) {
                        // response是json对象，格式可以按自己的意愿来定义，例子为： { success: true, fileUrl:'' }

                        callback(arr[0], fileName, response);

                    },

                    // 系统信息显示（例如后缀名不合法）
                    showMessage: function (message) {
                        $.jBox.tip(message, 'error');
                    },

                    // 取消上传事件
                    onCancel: function (fileName) {
                        $.jBox.tip(fileName + ' 上传取消。', 'info');
                    }
                });

            }
        }
    }
    XL.clickDel = function (id) {
        var ramdomId = String.randomString(6);
        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>你确定要删除这条记录吗？", ramdomId), "确定删除吗？", _clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { id: id });
    }
    XL._clickAdd = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");

            var jsonArray = bindObj.ShouJiData()
            var newObj = bind.jsonToObject(jsonArray);

            newObj["ux_UserId"] = bindObj.options.data.userId;

            $invokeWebService_2("~WebService_RenLi.addXueLi", { obj: newObj }, function () {
                $.jBox.tip("添加中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, function () {

            }, { userContent: "addXueLi", userId: bindObj.options.data.userId });
        }
        return true;
    }
    XL._clickEdit = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();
            var obj = bind.jsonToObject(jsonArray);
            obj["ux_UserId"] = bindObj.obj.ux_UserId;
            obj["ux_Id"] = bindObj.obj.ux_Id;
            $invokeWebService_2("~WebService_RenLi.updateXueLi", { obj: obj }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "updateXueLi", userId: bindObj.obj.ux_UserId });
        }
        return true;
    }
    function _clickDel(v, h, f) {
        if (v == "1") {
            var data = h.find("input[type='hidden']").data("data");
            var id = data.id;
            var userId= baseData["学历"].firstOrDefault("ux_Id", id).ux_UserId;

            $invokeWebService_2("~WebService_RenLi.delXueLi", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "delXueLi", id: id,userId:userId });
        }
        return true;
    }


    function click_Upload(json, fileName, response) {
        if (response.success) {
            jBox.tip('上传成功', 'success');
            // var photoId = json.options.photoId;
            //$("#" + photoId).attr('src', response.fileUrl);
            $("input[itemId='" + json.itemId + "']").val(response.fileUrl);
            //添加一个缩略图

            var $div = $("#" + json.options.alreadyId);
            if ($div.find("ul").length == 0) {
                $div.html("<ul></ul>");
            }
            var id = Number(response.id);
            $div.find("ul").append($(String.format("<li><a href='{0}' target='_blank'><img class='suoTu' src='{0}'/></a> &nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' onclick=\"click_DelUpload({1},this)\">删除</a></li>", response.fileUrl, id)));
        } else {
            jBox.tip('上传失败', 'error');
        }
    }

    //#endregiong 句柄
    //#region HTML

    function html_ShowTable(datas, userId, type) {
        var str = [];
        var jsonArray = createJson();
        if (datas.length > 0) {
            str.push("<table class='tab' style='width:100%;' cellspacing='0' cellpadding='4'>");
            //表头
            str.push("<tr class='header'>");
            for (var i = 0; i < jsonArray.length; i++) {
                var json = jsonArray[i];
                if (requireColumn.contains(json.itemId)) {
                    if (i == 0) {
                        str.push(String.format("<td class='td1'>{0}</td>", json.title));

                    }
                    else {
                        str.push(String.format("<td>{0}</td>", json.title));
                    }
                }
            }
            str.push(String.format("<td>证件扫描</td>"));
            str.push("<td class='tdOpation'>操作</td>");
            str.push("</tr>");
            //表内容

            for (var j = 0; j < datas.length; j++) {
                var id = datas[j].ux_Id;

                str.push("<tr class='row'>");
                for (var i = 0; i < jsonArray.length; i++) {
                    var json = jsonArray[i];
                    if (requireColumn.contains(json.itemId)) {
                        var value = datas[j][json.itemId];
                        value = value == null ? "" : value;
                        if (json.type == "select") {
                            if (value != "") {
                                var _json = json.init.firstOrDefault("id", value);
                                if (_json) {
                                    value = _json.title;
                                }
                                else {
                                    value = "";
                                }
                            }
                        }
                        else if (json.validate == "money") {
                            value = "<label validate='money'>" + value + "</label>";
                        }
                        str.push(String.format("<td class='{1}'>{0}</td>", value, json.validate == "money" ? "mon wid1" : ""));
                    }
                }
                //缩略图

                var list = baseData["上传文件"].findAll("up_XueLiId", id);
                if (list.length == 0) {
                    str.push(String.format("<td class='imgCol'></td>"));
                }
                else if (list.length > 0) {
                    var imgs = [];
                    for (var m = 0; m < list.length; m++) {
                        imgs.push(String.format("<a href='{0}' target='_blank'><img src='{0}' class='suoTu' alt='原件扫描'/></a>", list[m].up_Dir));
                    }
                    str.push(String.format("<td class='imgCol'>{0}</td>", imgs.join("&nbsp;")));
                }
                //操作
                if (!type || type == "update") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);'  onclick=\"XL.clickDetail({0})\">详细</a>|<a href='javascript:void(0);' onclick=\"XL.clickEdit({0})\">编辑</a>|<a href='javascript:void(0);' onclick=\"XL.clickDel({0})\">删除</a></span></td>", id));
                }
                else if (type == "review") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);'  onclick=\"XL.clickDetail({0})\">详细</a></span></td>", id));
                }
                str.push("</tr>");
            }
            str.push("</table>");
        }
        return str.join("");
    }
    //#endregion
    function createJson() {
        var jsonArray = [];

        jsonArray.push({ itemId: "ux_XueLiId", type: "select", title: "学历", init: getInit(baseData["学历层次"], "xl_") });

        jsonArray.push({ itemId: "ux_ZhuanYe", type: "text", title: "专业" });
        jsonArray.push({ itemId: "ux_XueLiBianHao", type: "text", title: "学历编号" });
        jsonArray.push({ itemId: "ux_BiYiRiQi", type: "text", title: "毕业日期", validate: "datetime" });
        
        jsonArray.push({ itemId: "ux_BiYeYuanXiao", type: "text", title: "毕业院校" });
        
        jsonArray.push({ itemId: "ux_RuXiaoShiJian", type: "text", title: "入校时间" });
        jsonArray.push({ itemId: "ux_BeiZhu", type: "ntext", title: "备注" });
        return jsonArray;
    }
    //#region 其他
    function tableAddStyle(userId) {

        //$("#divContent").find("tr[class*='header']").addClass("bgHeader");
        var $div = $("#" + XL.Prefix + userId);
        $div.find("tr[class*='row']:odd").addClass("bg1");
        $div.find("tr[class*='row']").bind("mouseover", {}, function () {
            $(this).addClass("mouseover");
        });
        $div.find("tr[class*='row']").bind("mouseout", {}, function () {
            $(this).removeClass("mouseover");
        });
        $div.find("[validate='money']").formatCurrency();
    }
    //#endregion
    window.XL = XL;
})()







