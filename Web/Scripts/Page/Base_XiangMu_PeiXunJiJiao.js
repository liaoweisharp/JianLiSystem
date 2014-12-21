
(function () {

    function PXJJ(projectId, type) {
        this.projectId = projectId;
        PXJJ.type = type;
        initDom(projectId);
        PXJJ.baseData = {};
        //$invokeWebService_2("~WebService_XiangMuJieSuan.getXueXiJingLiByUserId", { projectId: projectId }, null, successCallBack, errorCallBack, null, { userContent: "getXueXiJingLiByUserId", projectId: projectId });
    }
    var requireColumn = ["pyjj_Year", "pxjj_Month", "pxjj_JinE", "pxjj_BeiZhu"];
    PXJJ.Prefix = "PXJJ_";

    function initDom(projectId) {
        $("#" + PXJJ.Prefix + projectId).html(loading);
        $invokeWebService_2("~WebService_XiangMuJieSuan.getXiangMu_PeiXunJiJiaoByProJectId", { projectId: projectId }, null, successCallBack, errorCallBack, null, { userContent: "getXiangMu_PeiXunJiJiaoByProJectId", projectId: projectId });
    }
    function successCallBack(result, context) {
        if (context.userContent == "getXiangMu_PeiXunJiJiaoByProJectId") {
            var projectId = context.projectId;

            var jsonsArray = createJson();
            conventObjsToDateTime(result, jsonsArray); // 转换日期类型
            var data = result;
            if (data.length == 0) {
                $("#" + PXJJ.Prefix + projectId).html(noResult);
            }
            else {
                PXJJ.baseData["办公用品"] = data;

                $("#" + PXJJ.Prefix + projectId).html(html_ShowTable(data, projectId));
                tableAddStyle(projectId);
            }
        }
        else if (context.userContent == "save_XiangMu_PeiXunJiJiao") {
            if (result) {
                var projectId = context.projectId;
                $.jBox.tip('添加成功', 'success');
                initDom(projectId);
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "update_XiangMu_PeiXunJiJiao") {
            if (result) {
                var projectId = context.projectId;
                $.jBox.tip('添加成功', 'success');
                initDom(projectId);
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "del_XiangMu_PeiXunJiJiao") {
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
    PXJJ.Add = function (projectId) {
        var jsonArray = createJson();
        var option = { type: "new", data: { projectId: projectId }, align: "y" };
        var optionJbox = { title: "添加", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: PXJJ._clickAdd };
        var bindObj = new bind(jsonArray, null, option, optionJbox);
    }
    PXJJ.clickDetail = function (id) {
        var option = { type: "review",align:"y" };
        //jBox options
        var optionJbox = { title: "详细", width: 850, buttons: {} };
        var jsonArray = createJson();
        var obj = PXJJ.baseData["办公用品"].firstOrDefault("pxjj_Id", id);
        if (obj) {

            //#region 转换成需要的数据

            //#endregion 

            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }
    PXJJ.clickEdit = function (id) {

        var jsonArray = createJson();
        var option = { type: "update", data: {}, align: "y" };
        //jBox options
        var optionJbox = { title: "编辑", width: 850, buttons: { "更新": "1", "取消": "0" }, showClose: false, submit: PXJJ._clickEdit };
        var obj = PXJJ.baseData["办公用品"].firstOrDefault("pxjj_Id", id);
        if (obj) {
            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }
    PXJJ.clickDel = function (id, projectId) {
        var ramdomId = String.randomString(6);
        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>你确定要删除这条记录吗？", ramdomId), "确定删除吗？", PXJJ._clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { id: id, projectId: projectId });
    }
    PXJJ._clickAdd = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");

            var jsonArray = bindObj.ShouJiData()
            var newObj = bind.jsonToObject(jsonArray);

            newObj["pxjj_XiangMuId"] = bindObj.options.data.projectId;

            $invokeWebService_2("~WebService_XiangMuJieSuan.save_XiangMu_PeiXunJiJiao", { obj: newObj }, function () {
                $.jBox.tip("添加中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, function () {

            }, { userContent: "save_XiangMu_PeiXunJiJiao", projectId: bindObj.options.data.projectId });
        }
        return true;
    }
    PXJJ._clickEdit = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();
            var obj = bind.jsonToObject(jsonArray);
            obj["pxjj_Id"] = bindObj.obj.pxjj_Id;
            obj["pxjj_XiangMuId"] = bindObj.obj.pxjj_XiangMuId;
            $invokeWebService_2("~WebService_XiangMuJieSuan.update_XiangMu_PeiXunJiJiao", { obj: obj }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "update_XiangMu_PeiXunJiJiao", projectId: bindObj.obj.pxjj_XiangMuId });
        }
        return true;
    }
    PXJJ._clickDel = function (v, h, f) {
        if (v == "1") {
            var data = h.find("input[type='hidden']").data("data");
            var id = data.id;
            var projectId = data.projectId;
            $invokeWebService_2("~WebService_XiangMuJieSuan.del_XiangMu_PeiXunJiJiao", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "del_XiangMu_PeiXunJiJiao", id: id, projectId: projectId });
        }
        return true;
    }
    //#endregiong 句柄
    function createJson() {
        var jsonArray = [];
        jsonArray.push({ itemId: "pyjj_Year", type: "select", title: "年", init: [{ id: '2010', title: "2010" }, { id: '2011', title: "2011" }, { id: '2012', title: "2012" }, { id: '2013', title: "2013" }, { id: '2014', title: "2014" }, { id: '2015', title: "2015"}] });
        jsonArray.push({ itemId: "pxjj_Month", type: "select", title: "月", init: [{ id: '1', title: "1" }, { id: '2', title: "2" }, { id: '3', title: "3" }, { id: '4', title: "4" }, { id: '5', title: "5" }, { id: '6', title: "6" }, { id: '7', title: "7" }, { id: '8', title: "8" }, { id: '9', title: "9" }, { id: '10', title: "10" }, { id: '11', title: "11" }, { id: '12', title: "12"}] });
        jsonArray.push({ itemId: "pxjj_JinE", type: "text", title: "金额（万元）", validate: "money" });
        jsonArray.push({ itemId: "pxjj_BeiZhu", type: "ntext", title: "备注" });
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
                var id = datas[j].pxjj_Id
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
                if (!PXJJ.type || PXJJ.type == "update") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"PXJJ.clickDetail('{0}')\">详细</a>|<a href='javascript:void(0);' onclick=\"PXJJ.clickEdit('{0}')\">编辑</a>|<a href='javascript:void(0);' onclick=\"PXJJ.clickDel('{0}','{1}')\">删除</a></span></td>", id, projectId));
                }
                else if (PXJJ.type == "review") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"PXJJ.clickDetail('{0}')\">详细</a></span></td>", id, projectId));
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
        var $div = $("#" + PXJJ.Prefix + projectId);
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
    window.PXJJ = PXJJ;
})()




