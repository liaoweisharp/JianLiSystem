//合同变更
(function () {
    //需要的列
    var requireColumn = ["bg_BianHao", "bg_MingCheng", "bg_BuChongQianDingFeiYong", "bg_FangShi", "bg_QiShiJiFeiRiQi", "bg_YuanYinShuoMing"];


    HTBG.InitDom = function (htId) {
        $invokeWebService_2("~WebService_HeTong.getHeTongBianGengByHtId", { htId: htId }, null, successHTBGCallBack, errorHTBGCallBack, null, { userContent: "getHeTongBianGengByHtId", htId: htId });
    }
    function HTBG() {

    }
    //加载合同变变更列表
    HTBG.Prefix = "divBG_";

    function successHTBGCallBack(result, context) {

        if (context.userContent == "addHeTongBianGeng") {

            var htId = context.htId;
            if (result) {
                $.jBox.tip('成功.', 'success');
                HTBG.InitDom(htId);
                pageselectCallback(pd.currentPageNumber, null);
            }
            else {
                $.jBox.tip('失败.', 'error');
            }
        }
        else if (context.userContent == "getHeTongBianGengByHtId") {

            var htId = context.htId;
            var data = result;
            baseData["heTongBianGeng"] = result; //缓存下来（编辑要用）
            if (data.length == 0) {
                $("#" + HTBG.Prefix + htId).html("<div class='noResult'>还没有变更的记录，要添加请点击右上角的\"添加\"按钮</div>");
            }
            else if (data.length > 0) {
                //#region 日期转换成日期格式
                var jsons = createJson().findAll("validate", "datetime");

                conventObjsToDateTime(data, jsons);
                //如果还有不存在Json的日期类型还需要在此处转换
                //#endregion
                $("#" + HTBG.Prefix + htId).html(HTBG.getHtmlOfHeTong(result, htId));
                tableAddStyle(htId)
            }
        }
        else if (context.userContent == "updateHeTongBianGeng") {
            var htId = context.htId;
            if (result) {
                $.jBox.tip('成功.', 'success');
                HTBG.InitDom(htId);
                getHeTongAndChild(htId);
                pageselectCallback(pd.currentPageNumber, null);
            }
            else {
                $.jBox.tip('失败.', 'error');
            }
        }
        else if (context.userContent == "delHeTongBianGeng") {
            var htId = context.htId;
            if (result) {
                $.jBox.tip('成功.', 'success');
                HTBG.InitDom(htId);
                getHeTongAndChild(htId);
                pageselectCallback(pd.currentPageNumber, null);
            }
            else {
                $.jBox.tip('失败.', 'error');
            }
        }
    }
    function errorHTBGCallBack(result, context) {

    }
    //#region 句柄
    HTBG.Add = function (htId) {

        var option = { type: "new", data: { htId: htId} };
        //jBox options
        var optionJbox = { title: "添加合同争议与变更", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: HTBG._clickAdd };
        var jsonArray = createJson();
        var bindObj = new bind(jsonArray, null, option, optionJbox);

    }

    HTBG.clickDetail = function (bgId) {

        var option = { type: "review" };
        //jBox options
        var optionJbox = { title: "变更明细", width: 850, buttons: {} };
        var jsonArray = createJson();
        var heTong = baseData["heTongBianGeng"].firstOrDefault("bg_Id", bgId);
        if (heTong) {
            var bindObj = new bind(jsonArray, heTong, option, optionJbox);
        }
    }
    HTBG.clickEdit = function (bgId, htId) {
        var option = { type: "update", data: {} };
        //jBox options
        var optionJbox = { title: "编辑合同变更", width: 850, buttons: { "更新": "1", "取消": "0" }, showClose: false, submit: _clickEdit };
        var jsonArray = createJson();
        var obj = baseData["heTongBianGeng"].firstOrDefault("bg_Id", bgId);
        if (obj) {
            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }
    HTBG.clickDel = function (bgId, htId) {
        var ramdomId = String.randomString(6);
        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>你确定要删除这条记录吗？", ramdomId), "确定删除吗？", _clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { htId: htId, bgId: bgId });
    }
    HTBG._clickAdd = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();
            var newHeTongBG = bind.jsonToObject(jsonArray);
            var htId = bindObj.options.data.htId
            newHeTongBG["bg_htId"] = htId;

            $invokeWebService_2("~WebService_HeTong.addHeTongBianGeng", { heTongBG: newHeTongBG }, function () {
                $.jBox.tip("添加合同变更与争议，请稍后...", 'loading');
            }, successHTBGCallBack, errorHTBGCallBack, function () {

            }, { userContent: "addHeTongBianGeng", htId: htId });
        }
        return true;
    }
    function _clickEdit(v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();
            var newHeTong = bind.jsonToObject(jsonArray);
            newHeTong["bg_Id"] = bindObj.obj.bg_Id;
            newHeTong["bg_htId"] = bindObj.obj.bg_htId;
            $invokeWebService_2("~WebService_HeTong.updateHeTongBianGeng", { heTongBG: newHeTong }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successHTBGCallBack, errorHTBGCallBack, function () {
                $.jBox.tip('完成。', 'success');
            }, { userContent: "updateHeTongBianGeng", htId: bindObj.obj.bg_htId });
        }
        return true;
    }
    function _clickDel(v, h, f) {
        if (v == "1") {

            var data = h.find("input[type='hidden']").data("data");
            var htId = data.htId;
            var bgId = data.bgId;
            $invokeWebService_2("~WebService_HeTong.delHeTongBianGeng", { id: bgId }, null, successHTBGCallBack, errorHTBGCallBack, null, { userContent: "delHeTongBianGeng", htId: htId });
        }
        return true;
    }
    //#endregion

    //#region 生成json
    function createJson() {

        var jsonArray = [];
        jsonArray.push({ itemId: "bg_BianHao", type: "text", title: "补充合同编号" });
        jsonArray.push({ itemId: "bg_MingCheng", type: "text", title: "补充合同名称" });
       // jsonArray.push({ itemId: "bg_FangShi", type: "select", title: "变更方式", init: getInit(baseData["变更方式"], "bgfs_") });
        jsonArray.push({ itemId: "bg_BuChongQianDingFeiYong", type: "text", validate: "money", title: "协议监理费（万元）" });
        jsonArray.push({ itemId: "bg_JianLiFeiLeiXing", type: "select", title: "协议监理费类型", init: getInit(baseData["变更监理费类型"], "jl_") });

        jsonArray.push({ itemId: "bg_YuanYinShuoMing", type: "text", title: "简要说明" });
        //jsonArray.push({ itemId: "bg_QiShiJiFeiRiQi", type: "text", validate: "datetime", title: "补充费用起始计费日期" });
        jsonArray.push({ itemId: "bg_NeiRong", type: "ntext", title: "协议内容" });

        return jsonArray;
    }
    //公用
    HTBG.getInit = function (arr, prefix) {

        var init = [];
        for (var i = 0; i < arr.length; i++) {
            id = arr[i][prefix + "Id"]; //Id是固定属性
            value = arr[i][prefix + "Name"]; //name是固定属性
            init.push({ id: id, title: value })
        }
        return init;
    }
    //#endregion
    //#region HTML
    HTBG.getHtmlOfHeTong = function (datas, htId) {
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
                str.push("<tr class='row'>");
                for (var i = 0; i < jsonArray.length; i++) {
                    var json = jsonArray[i];
                    if (requireColumn.contains(json.itemId)) {
                        var value = datas[j][json.itemId];
                        value = value == null ? "" : value;
                        if (json.type == "select" && value != "") {
                            var _json = json.init.firstOrDefault("id", value);
                            if (_json) {
                                value = _json.title;
                            }
                            else {
                                value = "";
                            }
                        }
                        if (json.validate == "money") {
                            value = "<label validate='money'>" + value + "</label>";
                        }
                        str.push(String.format("<td class='{1}'>{0}</td>", value, json.validate == "money" ? "mon" : ""));

                    }
                }
                str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"HTBG.clickDetail('{0}')\">详细</a>|<a href='javascript:void(0);' onclick=\"HTBG.clickEdit('{0}','{1}')\">编辑</a>|<a href='javascript:void(0);' onclick=\"HTBG.clickDel('{0}','{1}')\">删除</a></span></td>", datas[j].bg_Id, htId));
                str.push("</tr>");
            }
            str.push("</table>");
        }
        return str.join("");
    }
    //#endregion
    //#region 其他
    function tableAddStyle(htId) {

        //$("#divContent").find("tr[class*='header']").addClass("bgHeader");
        var $div = $("#" + HTBG.Prefix + htId);
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
    window.HTBG = HTBG;
})();