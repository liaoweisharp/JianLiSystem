(function () {
    var baseData = {};
    function JC(userId, type) {
        this.userId = userId;
        initDom(userId, type);

    }
    var requireColumn = ["rl_jc_XiangMuId", "rl_jc_RiQi", "rl_jc_YuanYin"];
    JC.Prefix = "JC_";

    function initDom(userId, type) {
        $("#" + JC.Prefix + userId).html(loading);
        $invokeWebService_2("~WebService_RenLi.getJiangChengByUserId", { userId: userId }, null, successCallBack, errorCallBack, null, { userContent: "getJiangChengByUserId", userId: userId, type: type });
    }
    function successCallBack(result, context) {
        if (context.userContent == "getJiangChengByUserId") {
           

            baseData["奖惩"] = result[0];
            baseData["项目"] = result[1];
            var userId = context.userId;
            var type = context.type;
            var jsonsArray = createJson();
            conventObjsToDateTime(baseData["奖惩"], jsonsArray); // 转换日期类型
            if (baseData["奖惩"].length == 0) {
                $("#" + JC.Prefix + userId).html(noResult);
            }
            else {
                $("#" + JC.Prefix + userId).html(html_ShowTable(baseData["奖惩"], userId, type));
                tableAddStyle(userId);
            }
        }
        else if (context.userContent == "addJiangCheng") {
            if (result) {
                var userId = context.userId;
                $.jBox.tip('添加成功', 'success');
                initDom(userId);
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "updateJiangCheng") {
            if (result) {
                var userId = context.userId;
                $.jBox.tip('添加成功', 'success');
                initDom(userId);
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "delJiangCheng") {
            
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
    JC.Add = function (userId) {
        var jsonArray = createJson();
        var option = { type: "new", data: { userId: userId} };
        var optionJbox = { title: "添加奖惩", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: JC._clickAdd };
        var bindObj = new bind(jsonArray, null, option, optionJbox);
    }
    JC.clickDetail = function (id) {

        var option = { type: "review" };
        //jBox options
        var optionJbox = { title: "详细", width: 850, buttons: {} };
        var jsonArray = createJson();
        var obj = baseData["奖惩"].firstOrDefault("rl_jc_Id", id);

        if (obj) {

            //#region 转换成需要的数据

            //#endregion 



            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }

    }
    JC.clickEdit = function (id) {
        var jsonArray = createJson();
        var option = { type: "update", data: {} };
        //jBox options
        var optionJbox = { title: "编辑奖惩", width: 850, buttons: { "更新": "1", "取消": "0" }, showClose: false, submit: JC._clickEdit };
        var obj = baseData["奖惩"].firstOrDefault("rl_jc_Id", id);
        if (obj) {
            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }
    JC.clickDel = function (id, userId) {
        var ramdomId = String.randomString(6);
        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>你确定要删除这条记录吗？", ramdomId), "确定删除吗？", _clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { id: id, userId: userId });
    }
    JC._clickAdd = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");

            var jsonArray = bindObj.ShouJiData()
            var newObj = bind.jsonToObject(jsonArray);

            newObj["rl_jc_UserId"] = bindObj.options.data.userId;

            $invokeWebService_2("~WebService_RenLi.addJiangCheng", { obj: newObj }, function () {
                $.jBox.tip("添加中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, function () {

            }, { userContent: "addJiangCheng", userId: bindObj.options.data.userId });
        }
        return true;
    }
    JC._clickEdit = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();
            var obj = bind.jsonToObject(jsonArray);
            obj["rl_jc_Id"] = bindObj.obj.rl_jc_Id;
            obj["rl_jc_UserId"] = bindObj.obj.rl_jc_UserId;
            $invokeWebService_2("~WebService_RenLi.updateJiangCheng", { obj: obj }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "updateJiangCheng", userId: bindObj.obj.rl_jc_UserId });
        }
        return true;
    }
    _clickDel = function (v, h, f) {
        if (v == "1") {
            var data = h.find("input[type='hidden']").data("data");
            var id = data.id;
            var userId = data.userId;

            $invokeWebService_2("~WebService_RenLi.delJiangCheng", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "delJiangCheng", userId: userId });
        }
        return true;
    }
    //#endregiong 句柄
    function createJson() {
        var jsonArray = [];
        //jsonArray.push({ itemId: "rl_jc_XiangMuMingCheng", type: "text", title: "项目名称" });
        jsonArray.push({ itemId: "rl_jc_XiangMuId", type: "select", title: "所属项目", init: getInit(baseData["项目"]) });
        jsonArray.push({ itemId: "rl_jc_YuanYin", type: "ntext", title: "奖惩原因" });
        jsonArray.push({ itemId: "rl_jc_JiGou", type: "text", title: "奖惩机构" });
        jsonArray.push({ itemId: "rl_jc_RiQi", type: "text", title: "日期", validate: "datetime" });
        jsonArray.push({ itemId: "rl_jc_JiangChengQingKuang", type: "ntext", title: "奖惩情况" });
        jsonArray.push({ itemId: "rl_jc_BeiZhu", type: "ntext", title: "备注" });
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
                var id = datas[j].rl_jc_Id;
                var userId = datas[j].rl_jc_UserId;
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
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"JC.clickDetail('{0}')\">详细</a>|<a href='javascript:void(0);' onclick=\"JC.clickEdit('{0}')\">编辑</a>|<a href='javascript:void(0);' onclick=\"JC.clickDel('{0}','{1}')\">删除</a></span></td>", id, userId));
                }
                else if (type == "review") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"JC.clickDetail('{0}')\">详细</a></span></td>", id, userId));
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
        var $div = $("#" + JC.Prefix + userId);
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
    window.JC = JC;
})()



