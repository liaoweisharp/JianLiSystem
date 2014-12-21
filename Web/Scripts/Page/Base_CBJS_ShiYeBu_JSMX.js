(function () {
    var baseData = {};
    function JSMX(projectId, type) {
        JSMX.ProjectId = projectId;
        //JSMX.Type=type
        initDom(type);
    }
    var requireColumn = ["","","","","","fp_hs_BenCiJieSuanJinE", "fp_hs_BenCiShiLingJinE", "fp_hs_ShiShouGuanLiFeiZongE"];
    JSMX.Prefix = "JSMX_";

    function initDom(type) {
        $("#" + JSMX.Prefix + JSMX.ProjectId).html(loading);
        if(type=="update")
        {
            $("#"+JSMX.Prefix+"_Add").show();
        }
        $invokeWebService_2("~WebService_XiangMuJieSuan.getJieSuanMingXiInfoByProjectId", { projectId: JSMX.ProjectId }, null, successCallBack, errorCallBack, null, { userContent: "getJieSuanMingXiInfoByProjectId", type: type });
    }
    function successCallBack(result, context) {
        if (context.userContent == "getJieSuanMingXiInfoByProjectId") {
        
            var data = result[0];
            baseData["发票及收款"] = data;
            baseData["上传文件"] = result[1];
            var projectId = JSMX.ProjectId;
            var type = context.type;
            var jsonsArray = createJson();
            var jsonsArray = createJson_Detail();
            conventObjsToDateTime(data, jsonsArray); // 转换日期类型

            if(type=="update" && data.firstOrDefault("isJieSuan",true)!=null){
                $("#"+JSMX.Prefix+"_Add").hide();
            }

            if (data.length == 0) {
                $("#" + JSMX.Prefix + JSMX.ProjectId).html(noResult);
            }
            else {
                $("#" + JSMX.Prefix + JSMX.ProjectId).html(html_ShowTable(data, type));
                tableAddStyle();
            }
        }
        else if (context.userContent == "getSumOfZhiBaoJin") {
           // var divId=context.divId;
           
            var zhiBaoJin=result;

            if(context.optionType=="new")   //创建
            {
                var jsonArray = createJson_JieSuan();
                jsonArray.firstOrDefault("itemId","sumOfZhiBaoJin").value=zhiBaoJin;
                var option = { type: "new",align:"y" };
                //jBox options
                var optionJbox = { title: "添加结算", width: 450, buttons: { "添加": "1", "取消": "0" }, submit: JSMX._clickAdd };
                var bindObj = new bind(jsonArray, null, option, optionJbox);
            }
            else if(context.optionType=="update")
            {
                $invokeWebService_2("~WebService_XiangMuJieSuan.getXiangMu_JieSuanNeiRongById", { id: JSMX.ProjectId }, null, function(_result){
                    
                    
                    var jsonArray = createJson_JieSuan();
                  var data =_result;
                   conventObjsToDateTime(data, jsonArray); // 转换日期类型
                    var option = { type: "update" };
                    //jBox options
                    var optionJbox = { title: "编辑结算", width: 450, buttons: { "更新": "1", "取消": "0" }, submit: JSMX._clickEdit_JieSuan };

                    
                    if (data) {
                        var bindObj = new bind(jsonArray, data, option, optionJbox);
                    }

                }, errorCallBack, null, { userContent: "getXiangMu_JieSuanNeiRongById" });
            }
        }

        else if (context.userContent=="addJieSuan")
        {
             if (result) {
           
                $.jBox.tip('更新成功', 'success');
                initDom();
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent=="updateXiangMuJieSuan_IsJieSuan")
        {
             if (result) {
           
                $.jBox.tip('更新成功', 'success');
                initDom();
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "updateXiangMuJieSuan") {
            if (result) {
           
                $.jBox.tip('更新成功', 'success');
                initDom();
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "delZhiYeZiGeZhengShu") {

            if (result) {
             
                $.jBox.tip('删除成功', 'success');
                initDom();
            }
            else {
                $.jBox.tip('删除失败', 'error');
            }
        }

    }
    function errorCallBack(result, context) { }
    //#region 句柄
    JSMX.Add = function () {
        $invokeWebService_2("~WebService_XiangMuJieSuan.getSumOfZhiBaoJin", { projectId: JSMX.ProjectId }, null, successCallBack, errorCallBack, null, { userContent: "getSumOfZhiBaoJin",optionType:"new" });
    }
    JSMX.clickDetail = function (id) {

        var option = { type: "review", align: "y"  };
        //jBox options
        var optionJbox = { title: "详细", width: 850, buttons: {} };
        var jsonArray = createJson_Detail();
        var obj = baseData["发票及收款"].firstOrDefault("fp_Id", id);
        if (obj) {

            //#region 转换成需要的数据

            //#endregion 
            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }
    JSMX.clickEdit = function (id) {

        var jsonArray = createJson();
        var zhiChengList = baseData["上传文件"].findAll("up_ShouKuanId", id);


        jsonArray.push({ title: "原件扫描上传", type: "uploadImg", init: zhiChengList, options: { btId: String.randomString(6), photoId: String.randomString(6), alreadyId: String.randomString(6), callback: click_Upload, type: "jieSuan"} });
        var option = { type: "update", data: {}, align: "y"  };
        //jBox options
        var optionJbox = { title: "编辑", width: 850, buttons: { "更新": "1", "取消": "0" }, showClose: false, submit: JSMX._clickEdit };
        var obj = baseData["发票及收款"].firstOrDefault("fp_Id", id);
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
    JSMX.clickEdit_JieSuan = function (id) {
    $invokeWebService_2("~WebService_XiangMuJieSuan.getSumOfZhiBaoJin", { projectId: JSMX.ProjectId }, null, successCallBack, errorCallBack, null, { userContent: "getSumOfZhiBaoJin",optionType:"update" });
        
    }
    JSMX.clickDel = function (id) {
        var ramdomId = String.randomString(6);
        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>你确定要删除这条记录吗？", ramdomId), "确定删除吗？", _clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { id: id });
    }
    JSMX._clickAdd = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");

            var jsonArray = bindObj.ShouJiData()
            var newObj = bind.jsonToObject(jsonArray);
            newObj.jsnr_Id=JSMX.ProjectId;


            $invokeWebService_2("~WebService_XiangMuJieSuan.addJieSuan", { obj: newObj }, function () {
                $.jBox.tip("添加中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, function () {

            }, { userContent: "addJieSuan"});
        }
        return true;
    }
    JSMX._clickEdit = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();
            var obj = bind.jsonToObject(jsonArray);
            //obj["zgzs_UserId"] = bindObj.obj.zgzs_UserId;
            obj["fp_Id"] = bindObj.obj.fp_Id;
     
            $invokeWebService_2("~WebService_XiangMuJieSuan.updateXiangMuJieSuan", { obj: obj }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "updateXiangMuJieSuan" });
        }
        return true;
    }
    JSMX._clickEdit_JieSuan=function (v, h, f){
         if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");

            var jsonArray = bindObj.ShouJiData()
            var newObj = bind.jsonToObject(jsonArray);
            newObj.jsnr_Id=JSMX.ProjectId;


            $invokeWebService_2("~WebService_XiangMuJieSuan.updateXiangMuJieSuan_IsJieSuan", { obj: newObj }, function () {
                $.jBox.tip("添加中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, function () {

            }, { userContent: "updateXiangMuJieSuan_IsJieSuan"});
        }
        return true;
    }
    function _clickDel(v, h, f) {
        if (v == "1") {
            var data = h.find("input[type='hidden']").data("data");
            var id = data.id;
            //var projectId = baseData["发票及收款"].firstOrDefault("fp_Id", id).zgzs_UserId;

            $invokeWebService_2("~WebService_RenLi.delZhiYeZiGeZhengShu", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "delZhiYeZiGeZhengShu", });
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

    function html_ShowTable(datas,  type) {
        var str = [];
        var jsonArray = createJson_Detail();
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
                var id = datas[j].fp_Id;
                str.push("<tr class='row'>");
                if(datas[j].isJieSuan){
                    str.push(String.format("<td class='red' colspan='{0}'>",8));
                    str.push(String.format("已结算&nbsp;&nbsp;质保金：<label validate='money'>{0}</label>&nbsp;&nbsp; 结算日期:{1}",datas[j].fp_hs_ZhiBaoJin,datas[j].fp_DaoZhangShiJian));
                    str.push(String.format("</td>"));
                    //操作
                    if (!type || type == "update") {
                        str.push(String.format("<td class='tdOpation'></td>"));
                        //str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"JSMX.clickEdit_JieSuan({0})\">编辑</a></span></td>", id));
                    }
                    else if (type == "review") {
                        str.push(String.format("<td class='tdOpation'></td>"));
                    }
                }
                else{
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

                var zhiChengList = baseData["上传文件"].findAll("up_ShouKuanId", id);
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
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);'  onclick=\"JSMX.clickDetail({0})\">详细</a>|<a href='javascript:void(0);' onclick=\"JSMX.clickEdit({0})\">编辑</a></span></td>", id));
                }
                else if (type == "review") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);'  onclick=\"JSMX.clickDetail({0})\">详细</a></span></td>", id));
                }
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
        jsonArray.push({ itemId: "fp_hs_BenCiJieSuanJinE", type: "text", validate: "money", title: "本次结算金额（万元）" });
        jsonArray.push({ itemId: "fp_hs_ZhiBaoJin", type: "text", validate: "money", title: "质保金（万元）" });
        jsonArray.push({ itemId: "fp_hs_ShuiShou", type: "text", validate: "money", title: "税收（万元）" });
        jsonArray.push({ itemId: "fp_hs_YingKou", type: "text", validate: "money", title: "应扣（万元）" });
        jsonArray.push({ itemId: "fp_hs_BenCiShiLingJinE", type: "text", validate: "money", title: "本次实领金额（万元）" });
        jsonArray.push({ itemId: "fp_hs_ShiShouGuanLiFeiZongE", type: "text", validate: "money", title: "实收管理费金额（万元）" });
        jsonArray.push({ itemId: "fp_hs_HeSuanFangShi", type: "text", isOtherCol: true, title: "核算方式" });
        jsonArray.push({ itemId: "fp_hs_BeiZhu", type: "ntext", title: "备注" });
        return jsonArray;
    }
    var requireColumn = ["fp_FaPiaoBianHao","fp_FaPiaoJinE","fp_ShiShouJinE","fp_DaoZhangShiJian","fp_hs_BenCiJieSuanJinE", "fp_hs_BenCiShiLingJinE", "fp_hs_ShiShouGuanLiFeiZongE"];
    function createJson_Detail() {
        var jsonArray = [];
        jsonArray.push({ itemId: "fp_FaPiaoBianHao", type: "text", title: "发票编号" });
        jsonArray.push({ itemId: "fp_FaPiaoJinE", type: "text", validate: "money", title: "发票金额（万元）" });
        jsonArray.push({ itemId: "fp_ShiShouJinE", type: "text", validate: "money", title: "实收金额（万元）" });
        jsonArray.push({ itemId: "fp_DaoZhangShiJian", type: "text", validate: "datetime", title: "到账时间" });
        jsonArray.push({ itemId: "fp_hs_BenCiJieSuanJinE", type: "text", isOtherCol: true, validate: "money", title: "本次结算金额（万元）" });
        jsonArray.push({ itemId: "fp_hs_ZhiBaoJin", type: "text", validate: "money", title: "质保金（万元）" });
        jsonArray.push({ itemId: "fp_hs_ShuiShou", type: "text", validate: "money", title: "税收（万元）" });
        jsonArray.push({ itemId: "fp_hs_YingKou", type: "text", validate: "money", title: "应扣（万元）" });
        jsonArray.push({ itemId: "fp_hs_BenCiShiLingJinE", type: "text", validate: "money", title: "本次实领金额（万元）" });
        jsonArray.push({ itemId: "fp_hs_ShiShouGuanLiFeiZongE", type: "text", validate: "money", title: "实收管理费金额（万元）" });
        jsonArray.push({ itemId: "fp_hs_HeSuanFangShi", type: "text",title: "核算方式" });
        jsonArray.push({ itemId: "fp_hs_BeiZhu", type: "ntext", title: "备注" });
        return jsonArray;
    }
    function createJson_JieSuan() {
        var jsonArray = [];
        jsonArray.push({ itemId: "sumOfZhiBaoJin", type: "label",validate:"money", title: "质保金总额" });
        jsonArray.push({ itemId: "jsnr_js_ZhiBaoJin", type: "text", title: "结算质保金" });
        jsonArray.push({ itemId: "jsnr_js_ShiFouJieSuan", type: "select", title: "是否结算",init: const_JieSuanInit });
        jsonArray.push({ itemId: "jsnr_js_JieSuanRiQi", type: "text", validate: "datetime", title: "结算日期" });
        return jsonArray;
    }
    //#region 其他
    function tableAddStyle() {

        //$("#divContent").find("tr[class*='header']").addClass("bgHeader");
        var $div = $("#" + JSMX.Prefix + JSMX.ProjectId);
        $div.find("tr[class*='row']:odd").addClass("bg1");
        $div.find("tr[class*='row']").bind("mouseover", {}, function () {
            $(this).addClass("mouseover");
        });
        $div.find("tr[class*='row']").bind("mouseout", {}, function () {
            $(this).removeClass("mouseover");
        });
        $div.find("[validate='money']").formatCurrency()
        .parent().addClass("rig");
    }
    //#endregion
    window.JSMX = JSMX;
})()



