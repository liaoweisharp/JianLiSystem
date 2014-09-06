(function () {
    var baseData = {};
    function DD(userId, type) {
        this.userId = userId;
        initDom(userId, type);

    }
    var requireColumn = ["dd_ShiJian", "dd_EndShiJian", "dd_QingKuang", "dd_XiangMuId", "dd_FuZeRen", "dd_GangWei"];
    DD.Prefix = "DD_";

    function initDom(userId, type) {
        $("#" + DD.Prefix + userId).html(loading);
        $invokeWebService_2("~WebService_RenLi.getDiaoDongByUserId", { userId: userId }, null, successCallBack, errorCallBack, null, { userContent: "getDiaoDongByUserId", userId: userId, type: type });
    }
    function successCallBack(result, context) {
        if (context.userContent == "getDiaoDongByUserId") {

            var data = baseData["调动"] = result[0];

            baseData["人员"] = result[1];
            
            baseData["项目"] = result[2];

            var userId = context.userId;
            var type = context.type;
            var jsonsArray = createJson();

            conventObjsToDateTime(baseData["调动"], jsonsArray); // 转换日期类型

            if (data.length == 0) {
                $("#" + DD.Prefix + userId).html(noResult);
            }
            else {
                $("#" + DD.Prefix + userId).html(html_ShowTable(data, userId, type));
                tableAddStyle(userId);
            }
        }
        else if (context.userContent == "getDistinctGangWei") {

            var optionType = context.optionType;
            var jsonArray = createJson();
            var json = jsonArray.firstOrDefault("itemId", "dd_GangWei");
            json.init = result;
            if (optionType == "add") {
                var userId = context.userId;

                var option = { type: "new", data: { userId: userId} };
                var optionJbox = { title: "添加调动", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: DD._clickAdd };
                var bindObj = new bind(jsonArray, null, option, optionJbox);
            }
            else if (optionType == "update") {
                var id = context.id;

                var option = { type: "update", data: {} };
                //jBox options
                var optionJbox = { title: "编辑调动", width: 850, buttons: { "更新": "1", "取消": "0" }, showClose: false, submit: DD._clickEdit };
                var obj = baseData["调动"].firstOrDefault("dd_Id", id);
                if (obj) {
                    var bindObj = new bind(jsonArray, obj, option, optionJbox);
                }
            }
        }
        else if (context.userContent == "addDiaoDong") {
            if (result) {
                var userId = context.userId;
                $.jBox.tip('添加成功', 'success');
                initDom(userId);
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "updateDiaoDong") {
            if (result) {
                var userId = context.userId;
                $.jBox.tip('添加成功', 'success');
                initDom(userId);
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "delDiaoDong") {

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
    DD.Add = function (userId) {
        $invokeWebService_2("~WebService_RenLi.getDistinctGangWei", {}, null, successCallBack, errorCallBack, null, { userContent: "getDistinctGangWei", userId: userId, optionType: "add" });
    }
    DD.clickDetail = function (id) {

        var option = { type: "review" };
        //jBox options
        var optionJbox = { title: "详细", width: 850, buttons: {} };
        var jsonArray = createJson();
        var obj = baseData["调动"].firstOrDefault("dd_Id", id);

        if (obj) {

            //#region 转换成需要的数据

            //#endregion 

            

            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }

    }
    DD.clickEdit = function (id) {
        $invokeWebService_2("~WebService_RenLi.getDistinctGangWei", {}, null, successCallBack, errorCallBack, null, { userContent: "getDistinctGangWei", id: id, optionType: "update" });

    }
    DD.clickDel = function (id, userId) {
        var ramdomId = String.randomString(6);

        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>你确定要删除这条记录吗？", ramdomId), "确定删除吗？", DD._clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { id: id, userId: userId });
    }
    DD._clickAdd = function (v, h, f) {
        if (v == "1") {
            var bo = validateForm();
            if (bo == false) {
                return false;
            }
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");

            var jsonArray = bindObj.ShouJiData()
            var newObj = bind.jsonToObject(jsonArray);

            newObj["dd_UserId"] = bindObj.options.data.userId;

            $invokeWebService_2("~WebService_RenLi.addDiaoDong", { obj: newObj }, function () {
                $.jBox.tip("添加中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, function () {

            }, { userContent: "addDiaoDong", userId: bindObj.options.data.userId });
        }
        return true;
    }
    DD._clickEdit = function (v, h, f) {
        if (v == "1") {
        
            var bo = validateForm();
            if (bo == false) {
                return false;
            }
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();
            var obj = bind.jsonToObject(jsonArray);
            obj["dd_Id"] = bindObj.obj.dd_Id;
            obj["dd_UserId"] = bindObj.obj.dd_UserId;
            $invokeWebService_2("~WebService_RenLi.updateDiaoDong", { obj: obj }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "updateDiaoDong", userId: bindObj.obj.dd_UserId });
        }
        return true;
    }
    DD._clickDel = function (v, h, f) {

        if (v == "1") {
            var data = h.find("input[type='hidden']").data("data");
            var id = data.id;
            var userId = data.userId;

            $invokeWebService_2("~WebService_RenLi.delDiaoDong", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "delDiaoDong", userId: userId });
        }
        return true;
    }
    //#endregiong 句柄
    function createJson() {
        var jsonArray = [];

        //jsonArray.push({ itemId: "dd_QingKuang", type: "select", title: "变动情况", required: true, init: getInit(baseData["变动情况"], "ddqk_") });
        jsonArray.push({ itemId: "dd_ShiJian", type: "text", title: "进入日期", required: true, validate: "datetime" });
        jsonArray.push({ itemId: "dd_EndShiJian", type: "text", title: "退出日期", validate: "datetime", parentId: "dd_ShiJian" });
        jsonArray.push({ itemId: "dd_XiangMuId", type: "select", title: "所属监理机构", init: getInit(baseData["项目"]) });
        jsonArray.push({ itemId: "dd_FuZeRen", type: "select", title: "项目负责人", init: getInit(baseData["人员"]) });
        jsonArray.push({ itemId: "dd_GangWei", type: "textSelect", title: "岗位", init: [] });
        jsonArray.push({ itemId: "dd_BeiZhu", type: "ntext", title: "备注" });
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
            
                var id = datas[j].dd_Id
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
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"DD.clickDetail('{0}')\">详细</a>|<a href='javascript:void(0);' onclick=\"DD.clickEdit('{0}')\">编辑</a>|<a href='javascript:void(0);' onclick=\"DD.clickDel('{0}','{1}')\">删除</a></span></td>", id, userId));
                }
                else if (type == "review") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"DD.clickDetail('{0}')\">详细</a></span></td>", id, userId));
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
        var $div = $("#" + DD.Prefix + userId);
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
    window.DD = DD;
})()



