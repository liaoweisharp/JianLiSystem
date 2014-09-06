(function () {

    function SJ(projectId, type) {
        this.projectId = projectId;
        initDom(projectId, type);

    }
    var requireColumn = ["sj_ShiJian", "sj_YuanYin", "sj_JieGuo"];
    SJ.Prefix = "SJ_";

    function initDom(projectId, type) {
        $("#" + SJ.Prefix + projectId).html(loading);
        if (type == "update") {
            $("#" + SJ.Prefix + "_Add").show();
        }

        $invokeWebService_2("~WebService_XiangMu.getShiJianByProjectId", { projectId: projectId }, null, successCallBack, errorCallBack, null, { userContent: "getShiJianByProjectId", projectId: projectId, type: type });
    }
    function successCallBack(result, context) {
        if (context.userContent == "getShiJianByProjectId") {

            var data = baseData["事件"] = result;

            var projectId = context.projectId;
            var type = context.type;
            var jsonsArray = createJson();

            conventObjsToDateTime(baseData["事件"], jsonsArray); // 转换日期类型

            if (data.length == 0) {
                $("#" + SJ.Prefix + projectId).html(noResult);
            }
            else {
                $("#" + SJ.Prefix + projectId).html(html_ShowTable(data, projectId, type));
                tableAddStyle(projectId);
            }
        }
        else if (context.userContent == "addShiJian") {
            if (result) {
                var projectId = context.projectId;
                $.jBox.tip('添加成功', 'success');
                initDom(projectId);
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "updateShiJian") {
            if (result) {
                var projectId = context.projectId;
                $.jBox.tip('添加成功', 'success');
                initDom(projectId);
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "delShiJian") {

            if (result) {
                var projectId = context.projectId;
                $.jBox.tip('删除成功', 'success');
                initDom(projectId);
            }
            else {
                $.jBox.tip('删除失败', 'error');
            }
        }
    }
    function errorCallBack(result, context) { }
    //#region 句柄
    SJ.Add = function (projectId) {
        var option = { type: "new", data: { projectId: projectId }, align: "y" };
        var optionJbox = { title: "添加巡检", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: SJ._clickAdd };
        
        var jsonArray = createJson();
        var bindObj = new bind(jsonArray, null, option, optionJbox);
    }
    SJ.clickDetail = function (id) {

        var option = { type: "review", align: "y" };
        //jBox options
        var optionJbox = { title: "详细", width: 850, buttons: {} };
        var jsonArray = createJson();
        var obj = baseData["事件"].firstOrDefault("sj_Id", id);

        if (obj) {

            //#region 转换成需要的数据

            //#endregion 



            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }

    }
    SJ.clickEdit = function (id) {

        var option = { type: "update", data: {}, align: "y" };
        //jBox options
        var optionJbox = { title: "编辑巡检", width: 850, buttons: { "更新": "1", "取消": "0" }, showClose: false, submit: SJ._clickEdit };
        var obj = baseData["事件"].firstOrDefault("sj_Id", id);
        if (obj) {
            var jsonArray = createJson();
            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }

    }
    SJ.clickDel = function (id, projectId) {
        var ramdomId = String.randomString(6);

        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>你确定要删除这条记录吗？", ramdomId), "确定删除吗？", SJ._clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { id: id, projectId: projectId });
    }
    SJ._clickAdd = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");

            var jsonArray = bindObj.ShouJiData()
            var newObj = bind.jsonToObject(jsonArray);

            newObj["sj_XiangMuId"] = bindObj.options.data.projectId;

            $invokeWebService_2("~WebService_XiangMu.addShiJian", { obj: newObj }, function () {
                $.jBox.tip("添加中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, function () {

            }, { userContent: "addShiJian", projectId: bindObj.options.data.projectId });
        }
        return true;
    }
    SJ._clickEdit = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();
            var obj = bind.jsonToObject(jsonArray);
            obj["sj_Id"] = bindObj.obj.sj_Id;
            obj["sj_XiangMuId"] = bindObj.obj.sj_XiangMuId;
            $invokeWebService_2("~WebService_XiangMu.updateShiJian", { obj: obj }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "updateShiJian", projectId: bindObj.obj.sj_XiangMuId });
        }
        return true;
    }
    SJ._clickDel = function (v, h, f) {

        if (v == "1") {
            var data = h.find("input[type='hidden']").data("data");
            var id = data.id;
            var projectId = data.projectId;

            $invokeWebService_2("~WebService_XiangMu.delShiJian", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "delShiJian", projectId: projectId });
        }
        return true;
    }
    //#endregiong 句柄
    function createJson() {
        var jsonArray = [];
        jsonArray.push({ itemId: "sj_ShiJian", type: "text", title: "时间", validate: "datetime" });
        jsonArray.push({ itemId: "sj_YuanYin", type: "ntext", title: "原因" });
        jsonArray.push({ itemId: "sj_JieGuo", isOtherCol: true, type: "ntext", title: "结果" });
        jsonArray.push({ itemId: "sj_BeiZhu", type: "ntext", title: "备注" });

        return jsonArray;
    }
    //#region HTML

    function html_ShowTable(datas, projectId, type) {

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
                var id = datas[j].sj_Id
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
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"SJ.clickDetail('{0}')\">详细</a>|<a href='javascript:void(0);' onclick=\"SJ.clickEdit('{0}')\">编辑</a>|<a href='javascript:void(0);' onclick=\"SJ.clickDel('{0}','{1}')\">删除</a></span></td>", id, projectId));
                }
                else if (type == "review") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"SJ.clickDetail('{0}')\">详细</a></span></td>", id, projectId));
                }
                str.push("</tr>");
            }
            str.push("</table>");
        }
        return str.join("");
    }

    //#endregion
    //#region 其他
    function tableAddStyle(projectId) {

        //$("#divContent").find("tr[class*='header']").addClass("bgHeader");
        var $div = $("#" + SJ.Prefix + projectId);
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
    window.SJ = SJ;
})()



