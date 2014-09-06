//合同变更
(function () {
    //需要的列
    var requireColumn = ["fp_bgId", "fp_FaPiaoJinE", "fp_YingShouJingE", "fp_ShiShouJinE", "fp_DaoZhangShiJian"];

    function FPGL() {

    }
    FPGL.InitDom = function (htId) {
        $invokeWebService_2("~WebService_HeTong.getFaPiaoGuanLiByHtId", { htId: htId }, null, successCallBack, errorCallBack, null, { userContent: "getFaPiaoGuanLiByHtId", htId: htId });
    }
    //加载合同变变更列表
    FPGL.Prefix = "divFP_";

    function successCallBack(result, context) {

        if (context.userContent == "getFaPiaoGuanLiByHtId") {

            var htId = context.htId;
            var data = result;
            baseData["FaPiaoJiShouKuan"] = result; //缓存下来（编辑要用）
            if (data.length == 0) {
                $("#" + FPGL.Prefix + htId).html("<div class='noResult'>还没有相应发票记录，要添加请点击右上角的\"添加\"按钮</div>");
            }
            else if (data.length > 0) {
                //#region 日期转换成日期格式
                var jsons = createJson().findAll("validate", "datetime");

                conventObjsToDateTime(data, jsons);
                //如果还有不存在Json的日期类型还需要在此处转换
                //#endregion

                $("#" + FPGL.Prefix + htId).html(FPGL.getHtml(result, htId));
                tableAddStyle(htId)
            }
        }
        else if (context.userContent == "getHTAndChild") {

            var htId = context.htId;
            var jsonArray = createJson();
            var json = jsonArray.firstOrDefault("itemId", "fp_bgId");
            if (json) {
                var init = [];
                for (var i = 0; i < result.length; i++) {
                    ins = result[i];
                    if (i == 0) {
                        init.push({ "id": "", "title": ins.ht_Number + "&nbsp;&nbsp;" + ins.ht_MingCheng }); //空字符串，便于收集数据成null
                    }
                    else {
                        init.push({ "id": ins.ht_Id, "title": ins.ht_Number + "&nbsp;&nbsp;" + ins.ht_MingCheng });
                    }

                }
                json["init"] = init;
            }
            if (context.type && context.type == "update") {
                var fpId = context.fpId;
                var option = { type: "update", data: {} };
                //jBox options
                var optionJbox = { title: "编辑发票及收款", width: 850, buttons: { "更新": "1", "取消": "0" }, showClose: false, submit: _clickEdit };
                var obj = baseData["FaPiaoJiShouKuan"].firstOrDefault("fp_Id", fpId);
                if (obj) {
                    var bindObj = new bind(jsonArray, obj, option, optionJbox);
                }
            }
            else {

                var option = { type: "new", data: { htId: htId} };
                var optionJbox = { title: "添加发票及收款", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: FPGL._clickAdd };
                var bindObj = new bind(jsonArray, null, option, optionJbox);
            }
        }
        else if (context.userContent == "addFaPiaoJiShouKuan") {
            var htId = context.htId;
            if (result) {
                $.jBox.tip('成功.', 'success');
                FPGL.InitDom(htId);
                pageselectCallback(pd.currentPageNumber, null);
            }
            else {
                $.jBox.tip('失败.', 'error');
            }
        }
        else if (context.userContent == "updateFaPiaoJiShouKuan") {
            var htId = context.htId;
            if (result) {
                $.jBox.tip('成功.', 'success');
                FPGL.InitDom(htId);
                pageselectCallback(pd.currentPageNumber, null);
            }
            else {
                $.jBox.tip('失败.', 'error');
            }
        }
        else if (context.userContent == "delFaPiaoJiShouKuan") {
            var htId = context.htId;
            if (result) {
                $.jBox.tip('成功.', 'success');
                FPGL.InitDom(htId);
                pageselectCallback(pd.currentPageNumber, null);
            }
            else {
                $.jBox.tip('失败.', 'error');
            }
        }
    }
    function errorCallBack(result, context) {
        
    }
    //#region 句柄
    FPGL.Add = function (htId) {


        //jBox options

        $invokeWebService_2("~WebService_HeTong.getHTAndChild", { htId: htId }, null, successCallBack, errorCallBack, null, { userContent: "getHTAndChild", htId: htId });


    }

    FPGL.clickDetail = function (fpId) {

        var option = { type: "review" };
        //jBox options
        var optionJbox = { title: "发票及收款详细", width: 850, buttons: {} };
        var jsonArray = createJson();
        var obj = baseData["FaPiaoJiShouKuan"].firstOrDefault("fp_Id", fpId);

        if (obj) {
            var _copyObjs = [obj].copyArray();
            var _copyObj = _copyObjs[0];
            var title = "";
            var id = "";
            //#region 转换成需要的数据
            if (obj.fp_bgId) {
                if (obj.TabHeTongBianGeng) {
                    id = obj.fp_bgId;
                    title = obj.TabHeTongBianGeng.bg_BianHao + "&nbsp;&nbsp;" + obj.TabHeTongBianGeng.bg_MingCheng;
                }

            }
            else if (obj.fp_htId) {
                if (obj.TabHeTong && obj.TabHeTong.TabXiangMuQianQi) {
                    title = obj.TabHeTong.TabXiangMuQianQi.qq_HeTongHao;
                    id = 100000;
                    _copyObj["fp_bgId"] = id;
                }
                title += "&nbsp;&nbsp;" + obj.TabHeTong.ht_MingCheng;
            }
            //#endregion 
            jsonArray.firstOrDefault("itemId", "fp_bgId").init = [{ id: id, title: title}];

            
            var bindObj = new bind(jsonArray, _copyObj, option, optionJbox);
        }
    }
    FPGL.clickEdit = function (fpId, htId) {
        $invokeWebService_2("~WebService_HeTong.getHTAndChild", { htId: htId }, null, successCallBack, errorCallBack, null, { userContent: "getHTAndChild", htId: htId, fpId: fpId, type: "update" });

    }
    FPGL.clickDel = function (fpId, htId) {
        var ramdomId = String.randomString(6);
        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>你确定要删除这份合同记录吗？", ramdomId), "确定删除吗？", _clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { htId: htId, fpId: fpId });
    }
    FPGL._clickAdd = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");

            var jsonArray = bindObj.ShouJiData()
            var newObj = bind.jsonToObject(jsonArray);
            var htId = bindObj.options.data.htId
            newObj["fp_htId"] = htId;
            
            $invokeWebService_2("~WebService_HeTong.addFaPiaoJiShouKuan", { obj: newObj }, function () {
                $.jBox.tip("添加中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, function () {

            }, { userContent: "addFaPiaoJiShouKuan", htId: htId });
        }
        return true;
    }
    function _clickEdit(v, h, f) {
        if (v == "1") {

            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();
            var obj = bind.jsonToObject(jsonArray);
            obj["fp_htId"] = bindObj.obj.fp_htId;
            obj["fp_Id"] = bindObj.obj.fp_Id;
            $invokeWebService_2("~WebService_HeTong.updateFaPiaoJiShouKuan", { obj: obj }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "updateFaPiaoJiShouKuan", htId: bindObj.obj.fp_htId });
        }
        return true;
    }
    function _clickDel(v, h, f) {
        if (v == "1") {

            var data = h.find("input[type='hidden']").data("data");
            var htId = data.htId;
            var fpId = data.fpId;
            $invokeWebService_2("~WebService_HeTong.delFaPiaoJiShouKuan", { id: fpId }, null, successCallBack, errorCallBack, null, { userContent: "delFaPiaoJiShouKuan", htId: htId });
        }
        return true;
    }
    //#endregion

    //#region 生成json
    function createJson() {
        var jsonArray = [];

        jsonArray.push({ itemId: "fp_bgId", required: true, type: "select", title: "合同或合同变更" });
        jsonArray.push({ itemId: "fp_KuanXiangXingZhi", type: "select", title: "款项性质", init: getInit(baseData["发票款项性质"], "kx_") });
        jsonArray.push({ itemId: "fp_YueDingNeiRong", type: "text", title: "合同或协议约定内容" });
        jsonArray.push({ itemId: "fp_FaPiaoBianHao", type: "text", title: "发票编号" });
        jsonArray.push({ itemId: "fp_FaPiaoJinE", type: "text", validate: "money", title: "发票金额（万元）" });
        jsonArray.push({ itemId: "fp_KaiPiaoRen", type: "text", title: "开票人" });
        jsonArray.push({ itemId: "fp_KaiPiaoShiJian", type: "text", validate: "datetime", title: "开票时间" });
        jsonArray.push({ itemId: "fp_FaPiaoXingZhi", type: "text", title: "发票性质" });
        jsonArray.push({ itemId: "fp_YingShouJingE", type: "text", validate: "money", title: "应收金额（万元）" });
        jsonArray.push({ itemId: "fp_ShiShouJinE", type: "text", validate: "money", title: "实收金额（万元）" });
        jsonArray.push({ itemId: "fp_DaoZhangShiJian", type: "text", validate: "datetime", title: "到账时间" });
//        jsonArray.push({ itemId: "fp_FaHan", type: "select", title: "发函", init: [{ id: 1, title: "已发送" }, { id: 0, title: "未发送"}] });
        //jsonArray.push({ itemId: "fp_ShuRuRen", type: "text", title: "输入人" });
        jsonArray.push({ itemId: "fp_BeiZhu", type: "ntext", title: "备注" });

        return jsonArray;
    }
    //公用

    //#endregion
    //#region HTML
    FPGL.getHtml = function (datas, htId) {
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
                        if (json.type == "select") {
                            if (json.itemId == "fp_bgId") {
                                
                                if (datas[j].fp_bgId) {
                                    if (datas[j].TabHeTongBianGeng) {
                                        value = datas[j].TabHeTongBianGeng.bg_BianHao;
                                    }
                                    value += "&nbsp;&nbsp;" + datas[j].TabHeTongBianGeng.bg_MingCheng;
                                }
                                else if (datas[j].fp_htId) {
                                    if (datas[j].TabHeTong && datas[j].TabHeTong.TabXiangMuQianQi) {
                                        value = datas[j].TabHeTong.TabXiangMuQianQi.qq_HeTongHao;
                                    }
                                    value += "&nbsp;&nbsp;" + datas[j].TabHeTong.ht_MingCheng;
                                }
                            }
                            else if (value != "") {
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
                str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"FPGL.clickDetail('{0}')\">详细</a>|<a href='javascript:void(0);' onclick=\"FPGL.clickEdit('{0}','{1}')\">编辑</a>|<a href='javascript:void(0);' onclick=\"FPGL.clickDel('{0}','{1}')\">删除</a></span></td>", datas[j].fp_Id, htId));
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
        var $div = $("#" + FPGL.Prefix + htId);
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
    window.FPGL = FPGL;
})();