
(function () {

    function BX(projectId, type) {
        this.projectId = projectId;
        BX.type = type;
        initDom(projectId);
        BX.baseData = {};
        //$invokeWebService_2("~WebService_XiangMuJieSuan.getXueXiJingLiByUserId", { projectId: projectId }, null, successCallBack, errorCallBack, null, { userContent: "getXueXiJingLiByUserId", projectId: projectId });
    }
    var requireColumn = ["bx_Year", "bx_Month", "bx_JinE", "bx_PingZhengHao"];
    BX.Prefix = "BX_";

    function initDom(projectId) {
        $("#" + BX.Prefix + projectId).html(loading);
        $invokeWebService_2("~WebService_XiangMuJieSuan.getXiangMu_BaoXiaoByProJectId", { projectId: projectId }, null, successCallBack, errorCallBack, null, { userContent: "getXiangMu_BaoXiaoByProJectId", projectId: projectId });
    }
    function successCallBack(result, context) {
        if (context.userContent == "getXiangMu_BaoXiaoByProJectId") {
            var projectId = context.projectId;

            var jsonsArray = createJson();
            conventObjsToDateTime(result, jsonsArray); // 转换日期类型
            var data = result;
            if (data.length == 0) {
                $("#" + BX.Prefix + projectId).html(noResult);
            }
            else {
                BX.baseData["绩效考核"] = data;

                $("#" + BX.Prefix + projectId).html(html_ShowTable(data, projectId));
                tableAddStyle(projectId);
            }
        }
        else if (context.userContent == "save_XiangMu_BaoXiao") {
            if (result) {
                var projectId = context.projectId;
                $.jBox.tip('添加成功', 'success');
                initDom(projectId);
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "update_XiangMu_BaoXiao") {
            if (result) {
                var projectId = context.projectId;
                $.jBox.tip('添加成功', 'success');
                initDom(projectId);
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "del_XiangMu_BaoXiao") {
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
    BX.Add = function (projectId) {
        var jsonArray = createJson();
        var option = { type: "new", data: { projectId: projectId }, align: "y" };
        var optionJbox = { title: "添加", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: BX._clickAdd };
        var bindObj = new bind(jsonArray, null, option, optionJbox);
    }
    BX.clickDetail = function (id) {
        var option = { type: "review", align: "y" };
        //jBox options
        var optionJbox = { title: "详细", width: 850, buttons: {} };
        var jsonArray = createJson();
        var obj = BX.baseData["绩效考核"].firstOrDefault("bx_Id", id);
        if (obj) {

            //#region 转换成需要的数据

            //#endregion 

            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }
    BX.clickEdit = function (id) {

        var jsonArray = createJson();
        var option = { type: "update", data: {}, align: "y" };
        //jBox options
        var optionJbox = { title: "编辑", width: 850, buttons: { "更新": "1", "取消": "0" }, showClose: false, submit: BX._clickEdit };
        var obj = BX.baseData["绩效考核"].firstOrDefault("bx_Id", id);
        if (obj) {
            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }
    BX.clickDel = function (id, projectId) {
        var ramdomId = String.randomString(6);
        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>你确定要删除这条记录吗？", ramdomId), "确定删除吗？", _clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { id: id, projectId: projectId });
    }
    BX._clickAdd = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");

            var jsonArray = bindObj.ShouJiData()
            var newObj = bind.jsonToObject(jsonArray);

            newObj["bx_XiangMuId"] = bindObj.options.data.projectId;

            $invokeWebService_2("~WebService_XiangMuJieSuan.save_XiangMu_BaoXiao", { obj: newObj }, function () {
                $.jBox.tip("添加中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, function () {

            }, { userContent: "save_XiangMu_BaoXiao", projectId: bindObj.options.data.projectId });
        }
        return true;
    }
    BX._clickEdit = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();
            var obj = bind.jsonToObject(jsonArray);
            obj["bx_Id"] = bindObj.obj.bx_Id;
            obj["bx_XiangMuId"] = bindObj.obj.bx_XiangMuId;
            $invokeWebService_2("~WebService_XiangMuJieSuan.update_XiangMu_BaoXiao", { obj: obj }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "update_XiangMu_BaoXiao", projectId: bindObj.obj.bx_XiangMuId });
        }
        return true;
    }
    _clickDel = function (v, h, f) {
        if (v == "1") {
            var data = h.find("input[type='hidden']").data("data");
            var id = data.id;
            var projectId = data.projectId;
            $invokeWebService_2("~WebService_XiangMuJieSuan.del_XiangMu_BaoXiao", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "del_XiangMu_BaoXiao", id: id, projectId: projectId });
        }
        return true;
    }
    //#endregiong 句柄
    function createJson() {
        var jsonArray = [];
        jsonArray.push({ itemId: "bx_Year", type: "select", title: "年", init: [{ id: '2010', title: "2010" }, { id: '2011', title: "2011" }, { id: '2012', title: "2012" }, { id: '2013', title: "2013" }, { id: '2014', title: "2014" }, { id: '2015', title: "2015"}] });
        jsonArray.push({ itemId: "bx_Month", type: "select", title: "月", init: [{ id: '1', title: "1" }, { id: '2', title: "2" }, { id: '3', title: "3" }, { id: '4', title: "4" }, { id: '5', title: "5" }, { id: '6', title: "6" }, { id: '7', title: "7" }, { id: '8', title: "8" }, { id: '9', title: "9" }, { id: '10', title: "10" }, { id: '11', title: "11" }, { id: '12', title: "12"}] });
        jsonArray.push({ itemId: "bx_JinE", type: "text", title: "金额（万元）", validate: "money" });
        jsonArray.push({ itemId: "bx_PingZhengHao", type: "ntext", title: "凭证号(多个用逗号分隔)" });
        jsonArray.push({ itemId: "bx_BeiZhu", type: "ntext", title: "备注" });
        return jsonArray;
    }
    //#region HTML

    function html_ShowTable(datas, projectId) {
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
                var id = datas[j].bx_Id
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
                if (!BX.type || BX.type == "update") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"BX.clickDetail('{0}')\">详细</a>|<a href='javascript:void(0);' onclick=\"BX.clickEdit('{0}')\">编辑</a>|<a href='javascript:void(0);' onclick=\"BX.clickDel('{0}','{1}')\">删除</a></span></td>", id, projectId));
                }
                else if (BX.type == "review") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"BX.clickDetail('{0}')\">详细</a></span></td>", id, projectId));
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
        var $div = $("#" + BX.Prefix + projectId);
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
    window.BX = BX;
})()




