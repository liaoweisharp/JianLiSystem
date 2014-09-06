(function () {
    var baseData = {};
    function XXJL(userId, type) {
        this.userId = userId;
        initDom(userId, type);

    }
    var requireColumn = ["rl_jl_JieShao", "rl_jl_GangWei" ,"rl_jl_StartDate", "rl_jl_EndDate"];
    XXJL.Prefix = "XXJL_";

    function initDom(userId, type) {
        $("#" + XXJL.Prefix + userId).html(loading);
        $invokeWebService_2("~WebService_RenLi.getXueXiJingLiByUserId", { userId: userId }, null, successCallBack, errorCallBack, null, { userContent: "getXueXiJingLiByUserId", userId: userId, type: type });
    }
    function successCallBack(result, context) {
        if (context.userContent == "getXueXiJingLiByUserId") {
            var userId = context.userId;
            var type = context.type
            var jsonsArray = createJson();
            conventObjsToDateTime(result, jsonsArray); // 转换日期类型
            var data = result;
            if (data.length == 0) {
                $("#" + XXJL.Prefix + userId).html(noResult);
            }
            else {
                baseData["学习经历"] = data;

                $("#" + XXJL.Prefix + userId).html(html_ShowTable(data, userId, type));
                tableAddStyle(userId);
            }
        }
        else if (context.userContent == "addJingLi") {
            if (result) {
                var userId = context.userId;
                $.jBox.tip('添加成功', 'success');
                initDom(userId);
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "updateJingLi") {
            if (result) {
                var userId = context.userId;
                $.jBox.tip('添加成功', 'success');
                initDom(userId);
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "delJingLi") {
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
    XXJL.Add = function (userId) {
        var jsonArray = createJson();
        var option = { type: "new", data: { userId: userId} };
        var optionJbox = { title: "添加学习经历", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: XXJL._clickAdd };
        var bindObj = new bind(jsonArray, null, option, optionJbox);
    }
    XXJL.clickDetail = function (id) {
        var option = { type: "review" };
        //jBox options
        var optionJbox = { title: "详细", width: 850, buttons: {} };
        var jsonArray = createJson();
        var obj = baseData["学习经历"].firstOrDefault("rl_jl_Id", id);
        if (obj) {

            //#region 转换成需要的数据

            //#endregion 

            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }
    XXJL.clickEdit = function (id) {

        var jsonArray = createJson();
        var option = { type: "update", data: {} };
        //jBox options
        var optionJbox = { title: "编辑", width: 850, buttons: { "更新": "1", "取消": "0" }, showClose: false, submit: XXJL._clickEdit };
        var obj = baseData["学习经历"].firstOrDefault("rl_jl_Id", id);
        if (obj) {
            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }
    XXJL.clickDel = function (id, userId) {
        var ramdomId = String.randomString(6);
        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>你确定要删除这条记录吗？", ramdomId), "确定删除吗？", XXJL._clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { id: id, userId: userId });
    }
    XXJL._clickAdd = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");

            var jsonArray = bindObj.ShouJiData()
            var newObj = bind.jsonToObject(jsonArray);

            newObj["rl_jl_UserId"] = bindObj.options.data.userId;
            newObj["rl_jl_TypeId"] = 1;

            $invokeWebService_2("~WebService_RenLi.addJingLi", { obj: newObj }, function () {
                $.jBox.tip("添加中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, function () {

            }, { userContent: "addJingLi", userId: bindObj.options.data.userId });
        }
        return true;
    }
    XXJL._clickEdit = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();
            var obj = bind.jsonToObject(jsonArray);
            obj["rl_jl_Id"] = bindObj.obj.rl_jl_Id;
            obj["rl_jl_UserId"] = bindObj.obj.rl_jl_UserId;
            obj["rl_jl_TypeId"] = bindObj.obj.rl_jl_TypeId;
            $invokeWebService_2("~WebService_RenLi.updateJingLi", { obj: obj }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "updateJingLi", userId: bindObj.obj.rl_jl_UserId });
        }
        return true;
    }
    XXJL._clickDel = function (v, h, f) {
        if (v == "1") {
            var data = h.find("input[type='hidden']").data("data");
            var id = data.id;
            var userId = data.userId;

            $invokeWebService_2("~WebService_RenLi.delJingLi", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "delJingLi", id: id, userId: userId });
        }
        return true;
    }
    //#endregiong 句柄
    function createJson() {
        var jsonArray = [];
        jsonArray.push({ itemId: "rl_jl_JieShao", type: "text", title: "何地何校" });
        jsonArray.push({ itemId: "rl_jl_GangWei", type: "text", title: "专业" });
        jsonArray.push({ itemId: "rl_jl_StartDate", type: "text", title: "起止日期", validate: "datetime" });
        jsonArray.push({ itemId: "rl_jl_EndDate", type: "text", title: "结束时间", validate: "datetime", parentId: "rl_jl_StartDate" });
        jsonArray.push({ itemId: "rl_jl_BeiZhu", type: "ntext", title: "备注" });

        return jsonArray;
    }
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
            
                str.push("<td class='tdOpation'>操作</td>");
    
            str.push("</tr>");
            //表内容

            for (var j = 0; j < datas.length; j++) {
                var id = datas[j].rl_jl_Id
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
                if (!type || type == "update") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);'  onclick=\"XXJL.clickDetail('{0}')\">详细</a>|<a href='javascript:void(0);' onclick=\"XXJL.clickEdit('{0}')\">编辑</a>|<a href='javascript:void(0);' onclick=\"XXJL.clickDel('{0}','{1}')\">删除</a></span></td>", id, userId));
                }
                else if (type == "review") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"XXJL.clickDetail('{0}')\">详细</a> </span></td>", id, userId));
                }
                str.push("</tr>");
            }
            str.push("</table>");
        }
        return str.join("");
    }
    //#endregion
    //#region 其他
    function tableAddStyle(userId) {

        //$("#divContent").find("tr[class*='header']").addClass("bgHeader");
        var $div = $("#" + XXJL.Prefix + userId);
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
    window.XXJL = XXJL;
})()



