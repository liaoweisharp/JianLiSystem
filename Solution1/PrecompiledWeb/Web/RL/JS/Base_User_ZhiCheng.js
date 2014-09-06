(function () {
    var baseData = {};
    function ZC(userId, type) {
        this.userId = userId;
        initDom(userId, type);

    }
    var requireColumn = ["uz_ZhiChengId", "uz_ZhiChengZhuanYe", "uz_PingDingRiQi", "uz_FaZhengJiGuan"];
    ZC.Prefix = "ZC_";

    function initDom(userId, type) {
        $("#" + ZC.Prefix + userId).html(loading);
        $invokeWebService_2("~WebService_RenLi.getZhiChengByUserId", { userId: userId }, null, successCallBack, errorCallBack, null, { userContent: "getZhiChengByUserId", userId: userId, type: type });
    }
    function successCallBack(result, context) {
        if (context.userContent == "getZhiChengByUserId") {
            var data = result[0];
            baseData["职称层次"] = result[1];
            baseData["职称"] = data;
            baseData["上传文件"] = result[2];
            var userId = context.userId;
            var type = context.type;
            var jsonsArray = createJson();
            conventObjsToDateTime(data, jsonsArray); // 转换日期类型

            if (data.length == 0) {
                $("#" + ZC.Prefix + userId).html(noResult);
            }
            else {
                $("#" + ZC.Prefix + userId).html(html_ShowTable(data, userId, type));
                tableAddStyle(userId);
            }
        }
        else if (context.userContent == "addZhiCheng") {
            if (result) {
                var userId = context.userId;
                $.jBox.tip('添加成功', 'success');
                initDom(userId);
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "updateZhiCheng") {
            if (result) {
                var userId = context.userId;
                $.jBox.tip('更新成功', 'success');
                initDom(userId);
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "delZhiCheng") {

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
    ZC.Add = function (userId) {
        var jsonArray = createJson();
        var option = { type: "new", data: { userId: userId} };
        var optionJbox = { title: "添加职称", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: ZC._clickAdd };
        var bindObj = new bind(jsonArray, null, option, optionJbox);
    }
    ZC.clickDetail = function (id) {
    
        var option = { type: "review" };
        //jBox options
        var optionJbox = { title: "详细", width: 850, buttons: {} };
        var jsonArray = createJson();
        var obj = baseData["职称"].firstOrDefault("uz_Id", id);
        if (obj) {

            //#region 转换成需要的数据

            //#endregion 



            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }
    ZC.clickEdit = function (id) {

        var jsonArray = createJson();
        var zhiChengList = baseData["上传文件"].findAll("up_ZhiChengId", id);


        jsonArray.push({ title: "原件扫描上传", type: "uploadImg", init: zhiChengList, options: { btId: String.randomString(6), photoId: String.randomString(6), alreadyId: String.randomString(6), callback: click_Upload, type: "zhiCheng"} });
        var option = { type: "update", data: {} };
        //jBox options
        var optionJbox = { title: "编辑职称", width: 850, buttons: { "更新": "1", "取消": "0" }, showClose: false, submit: ZC._clickEdit };
        var obj = baseData["职称"].firstOrDefault("uz_Id", id);
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
    ZC.clickDel = function (id) {
        var ramdomId = String.randomString(6);
        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>你确定要删除这条记录吗？", ramdomId), "确定删除吗？", _clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { id: id });
    }
    ZC._clickAdd = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");

            var jsonArray = bindObj.ShouJiData()
            var newObj = bind.jsonToObject(jsonArray);

            newObj["uz_UserId"] = bindObj.options.data.userId;

            $invokeWebService_2("~WebService_RenLi.addZhiCheng", { obj: newObj }, function () {
                $.jBox.tip("添加中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, function () {

            }, { userContent: "addZhiCheng", userId: bindObj.options.data.userId });
        }
        return true;
    }
    ZC._clickEdit = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();
            var obj = bind.jsonToObject(jsonArray);
            obj["uz_UserId"] = bindObj.obj.uz_UserId;
            obj["uz_Id"] = bindObj.obj.uz_Id;
            $invokeWebService_2("~WebService_RenLi.updateZhiCheng", { obj: obj }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "updateZhiCheng", userId: bindObj.obj.uz_UserId });
        }
        return true;
    }
    function _clickDel(v, h, f) {
        if (v == "1") {
            var data = h.find("input[type='hidden']").data("data");
            var id = data.id;
            var userId = baseData["职称"].firstOrDefault("uz_Id", id).uz_UserId;

            $invokeWebService_2("~WebService_RenLi.delZhiCheng", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "delZhiCheng", userId: userId });
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
                var id = datas[j].uz_Id;
                var userId = datas[j].uz_UserId;
                var zhiChengId = datas[j].uz_ZhiChengId;
                var zhuanYe = datas[j].uz_ZhiChengZhuanYe;
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

                var zhiChengList = baseData["上传文件"].findAll("up_ZhiChengId", id);
                if (zhiChengList.length == 0) {
                    str.push(String.format("<td class='imgCol'></td>"));
                }
                else if (zhiChengList.length > 0) {
                    var imgs = [];
                    for (var m = 0; m < zhiChengList.length; m++) {
                        imgs.push(String.format("<a href='{0}' target='_blank'><img src='{0}' class='suoTu' alt='原件扫描'/></a>", zhiChengList[m].up_Dir));
                    }
                    str.push(String.format("<td class='imgCol'>{0}</td>", imgs.join("&nbsp;")));
                }
                //操作
                if (!type || type == "update") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);'  onclick=\"ZC.clickDetail({0})\">详细</a>|<a href='javascript:void(0);' onclick=\"ZC.clickEdit({0})\">编辑</a>|<a href='javascript:void(0);' onclick=\"ZC.clickDel({0})\">删除</a></span></td>", id));
                }
                else if (type == "review") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);'  onclick=\"ZC.clickDetail({0})\">详细</a></span></td>", id));
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

        jsonArray.push({ itemId: "uz_ZhiChengId", type: "select", title: "职称", init: getInit(baseData["职称层次"], "zc_") });
        jsonArray.push({ itemId: "uz_ZhiChengZhuanYe", type: "text", title: "职称专业" });
        jsonArray.push({ itemId: "uz_PingDingRiQi", type: "text", title: "评定时间", validate: "datetime" });
        jsonArray.push({ itemId: "uz_ZhiChengBianHao", type: "text", title: "职称编号" });
        jsonArray.push({ itemId: "uz_FaZhengJiGuan", type: "text", title: "发证机关" });
        jsonArray.push({ itemId: "uz_PingSheJiGou", type: "text", title: "评审机构" });
        
        return jsonArray;
    }
    //#region 其他
    function tableAddStyle(userId) {

        //$("#divContent").find("tr[class*='header']").addClass("bgHeader");
        var $div = $("#" + ZC.Prefix + userId);
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
    window.ZC = ZC;
})()



