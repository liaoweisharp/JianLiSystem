(function () {
    var baseData = {};
    function KK(userId, type) {
        this.userId = userId;
        initDom(userId, type);
        KK.baseData = {};
    }
    var requireColumn = ["kkjl_Type", "kkjl_Year", "kkjl_Month", "kkjl_JinE", "kkjl_BeiZhu"];
    KK.Prefix = "KK_";

    function initDom(userId, type) {
        $("#" + KK.Prefix + userId).html(loading);
        $invokeWebService_2("~WebService_RenLi.getXinChouKouKuanByUserId", { userId: userId }, null, successCallBack, errorCallBack, null, { userContent: "getXinChouKouKuanByUserId", userId: userId, type: type });
    }
    function successCallBack(result, context) {
        if (context.userContent == "getXinChouKouKuanByUserId") {

            var userId = context.userId;
            var type = context.type;
            var jsonsArray = createJson();
            var data=KK.baseData["扣款奖励"] = result;
            conventObjsToDateTime(KK.baseData["扣款奖励"], jsonsArray); // 转换日期类型

            if (data.length == 0) {
                $("#" + KK.Prefix + userId).html(noResult);
            }
            else {
                $("#" + KK.Prefix + userId).html(html_ShowTable(data, userId, type));
                tableAddStyle(userId);
            }
        }

        else if (context.userContent == "saveXinChouKouKuan") {
            if (result) {
                var userId = context.userId;
                $.jBox.tip('添加成功', 'success');
                initDom(userId);
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "updateXinChouKouKuan") {
            if (result) {
                var userId = context.userId;
                $.jBox.tip('添加成功', 'success');
                initDom(userId);
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "deleteXinChouKouKuan") {

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
    KK.Add = function (userId) {
        var jsonArray = createJson();
        var option = { type: "new", data: { userId: userId }, align: 'y' };
        var optionJbox = { title: "添加", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: KK._clickAdd };
        var bindObj = new bind(jsonArray, null, option, optionJbox);

    }
    KK.clickDetail = function (id) {

        var option = { type: "review" };
        //jBox options
        var optionJbox = { title: "详细", width: 850, buttons: {} };
        var jsonArray = createJson();
        var obj = KK.baseData["扣款奖励"].firstOrDefault("kkjl_Id", id);

        if (obj) {

            //#region 转换成需要的数据

            //#endregion 



            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }

    }
    KK.clickEdit = function (id) {
        var jsonArray = createJson();
        var option = { type: "update", data: {}, align: 'y' };
        //jBox options
        var optionJbox = { title: "编辑", width: 850, buttons: { "更新": "1", "取消": "0" }, showClose: false, submit: KK._clickEdit };
        var obj = KK.baseData["扣款奖励"].firstOrDefault("kkjl_Id", id);
        if (obj) {
            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }

    }
    KK.clickDel = function (id, userId) {
        var ramdomId = String.randomString(6);

        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>你确定要删除这条记录吗？", ramdomId), "确定删除吗？", KK._clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { id: id, userId: userId });
    }
    KK._clickAdd = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");

            var jsonArray = bindObj.ShouJiData()
            var newObj = bind.jsonToObject(jsonArray);

            newObj["kkjl_UserId"] = bindObj.options.data.userId;

            $invokeWebService_2("~WebService_RenLi.saveXinChouKouKuan", { obj: newObj }, function () {
                $.jBox.tip("添加中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, function () {

            }, { userContent: "saveXinChouKouKuan", userId: bindObj.options.data.userId });
        }
        return true;
    }
    KK._clickEdit = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();
            var obj = bind.jsonToObject(jsonArray);
            obj["kkjl_Id"] = bindObj.obj.kkjl_Id;
            obj["kkjl_UserId"] = bindObj.obj.kkjl_UserId;
            $invokeWebService_2("~WebService_RenLi.updateXinChouKouKuan", { obj: obj }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "updateXinChouKouKuan", userId: bindObj.obj.kkjl_UserId });
        }
        return true;
    }
    KK._clickDel = function (v, h, f) {

        if (v == "1") {
            var data = h.find("input[type='hidden']").data("data");
            var id = data.id;
            var userId = data.userId;

            $invokeWebService_2("~WebService_RenLi.deleteXinChouKouKuan", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "deleteXinChouKouKuan", userId: userId });
        }
        return true;
    }
    //#endregiong 句柄
    function createJson() {
        var jsonArray = [];

        jsonArray.push({ itemId: "kkjl_Type", type: "select", title: "扣款或奖金", required: true, init: [{ id: '1', title: "扣款（不算入个税，如：罚款） " }, { id: '3', title: "扣款（先减再计算个税，如：社保调差） " }, { id: '2', title: "奖金（不算入个税）" }, { id: '4', title: "奖金（先加再计算个税，如：年终奖）"}] });
        jsonArray.push({ itemId: "kkjl_Year", type: "select", title: "年", required: true, init: getJsonYear() });
        jsonArray.push({ itemId: "kkjl_Month", type: "select", title: "月", required: true, init: getJsonMonth() });
        jsonArray.push({ itemId: "kkjl_JinE", type: "text", title: "金额（元）", required: true, validate: "money" });
        jsonArray.push({ itemId: "kkjl_BeiZhu", type: "ntext", title: "备注" });

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
                var id = datas[j].kkjl_Id
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
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"KK.clickDetail('{0}')\">详细</a>|<a href='javascript:void(0);' onclick=\"KK.clickEdit('{0}')\">编辑</a>|<a href='javascript:void(0);' onclick=\"KK.clickDel('{0}','{1}')\">删除</a></span></td>", id, userId));
                }
                else if (type == "review") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"KK.clickDetail('{0}')\">详细</a></span></td>", id, userId));
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
        var $div = $("#" + KK.Prefix + userId);
        $div.find("tr[class*='row']:odd").addClass("bg1");
        $div.find("tr[class*='row']").bind("mouseover", {}, function () {
            $(this).addClass("mouseover");
        });
        $div.find("tr[class*='row']").bind("mouseout", {}, function () {
            $(this).removeClass("mouseover");
        });
        $div.find("[validate='money'][validatechild='']").formatCurrency();
        $div.find("[validate='money'][validatechild='元']").formatCurrency(null, { roundToDecimalPlace: 2 });
    }
    //#endregion
    window.KK = KK;
})()



