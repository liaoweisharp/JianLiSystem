//合同变更
(function () {
    //需要的列
    var requireColumn = ["jh_htId_bg", "jh_ShouKuanJinE", "jh_ShouKuanRiQi", "jh_IsFaHan"];
    SKJH.InitDom = function (htId) {
        $invokeWebService_2("~WebService_HeTong.getShouKuanJiHuByHtId", { htId: htId }, null, successCallBack, errorCallBack, null, { userContent: "getShouKuanJiHuByHtId", htId: htId });
    }
    function SKJH() {

    }
    //加载合同变变更列表
    SKJH.Prefix = "divJH_";

    function successCallBack(result, context) {

        if (context.userContent == "addShouKuanJiHua") {

            var htId = context.htId;
            if (result) {
                $.jBox.tip('成功.', 'success');
                SKJH.InitDom(htId);
            }
            else {
                $.jBox.tip('失败.', 'error');
            }
        }
        else if (context.userContent == "getHTAndChild") {
            var htId = context.htId;
            var type = context.type;
            var jsonArray = createJson();
            var json = jsonArray.firstOrDefault("itemId", "jh_htId_bg");
            if (json != null) {
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
            if (type == "update") {
                var jhId = context.jhId;
                var option = { type: "update", data: {} };
                //jBox options
                var optionJbox = { title: "编辑收款计划", width: 850, buttons: { "更新": "1", "取消": "0" }, showClose: false, submit: _clickEdit };

                var obj = baseData["shouKuanJiHua"].firstOrDefault("jh_Id", jhId);
                if (obj) {
                    var bindObj = new bind(jsonArray, obj, option, optionJbox);
                }
            }
            else if (type == "new") {
                var option = { type: "new", data: { htId: htId} };
                //jBox options
                var optionJbox = { title: "添加收款计划", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: SKJH._clickAdd };

                var bindObj = new bind(jsonArray, null, option, optionJbox);
            }
        }
        else if (context.userContent == "getShouKuanJiHuByHtId") {
            var htId = context.htId;
            var data = result;
            baseData["shouKuanJiHua"] = result; //缓存下来（编辑要用）
            if (data.length == 0) {
                $("#" + SKJH.Prefix + htId).html("<div class='noResult'>还没有相应收款计划的记录，要添加请点击右上角的\"添加\"按钮</div>");
            }
            else if (data.length > 0) {
                //#region 日期转换成日期格式
                var jsons = createJson().findAll("validate", "datetime");

                conventObjsToDateTime(data, jsons);
                //如果还有不存在Json的日期类型还需要在此处转换
                //#endregion
                $("#" + SKJH.Prefix + htId).html(SKJH.getHtmlOfHeTong(result, htId));
                tableAddStyle(htId)
            }
        }
        else if (context.userContent == "updateShouKuanJiHua") {
            var htId = context.htId;
            if (result) {
                $.jBox.tip('成功.', 'success');
                SKJH.InitDom(htId);
            }
            else {
                $.jBox.tip('失败.', 'error');
            }
        }
        else if (context.userContent == "delShouKuanJiHua") {
            var htId = context.htId;
            if (result) {
                $.jBox.tip('成功.', 'success');
                SKJH.InitDom(htId);
            }
            else {
                $.jBox.tip('失败.', 'error');
            }
        }
    }
    function errorCallBack(result, context) {

    }
    //#region 句柄
    SKJH.Add = function (htId) {
        $invokeWebService_2("~WebService_HeTong.getHTAndChild", { htId: htId }, null, successCallBack, errorCallBack, null, { userContent: "getHTAndChild", htId: htId, type: "new" });
    }

    SKJH.clickDetail = function (jhId) {

        var option = { type: "review" };
        //jBox options
        var optionJbox = { title: "收款计划明细", width: 850, buttons: {} };
        var jsonArray = createJson();
        var obj = baseData["shouKuanJiHua"].firstOrDefault("jh_Id", jhId);
        if (obj) {
            var _copyObjs = [obj].copyArray();
            var _copyObj = _copyObjs[0];
            var title = "";
            var id = "";
            //#region 转换成需要的数据

            if (obj.jh_htId_bg) {
                if (obj.TabHeTongBianGeng) {
                    id = obj.jh_htId_bg;
                    title = obj.TabHeTongBianGeng.bg_BianHao + "&nbsp;&nbsp;" + obj.TabHeTongBianGeng.bg_MingCheng;
                }

            }
            else if (obj.jh_htId) {
                if (obj.TabHeTong && obj.TabHeTong.TabXiangMuQianQi) {
                    title = obj.TabHeTong.TabXiangMuQianQi.qq_HeTongHao;
                    id = 100000;
                    _copyObj["jh_htId_bg"] = id;
                }
                title += "&nbsp;&nbsp;" + obj.TabHeTong.ht_MingCheng;
            }
            //#endregion 
            jsonArray.firstOrDefault("itemId", "jh_htId_bg").init = [{ id: id, title: title}];


            var bindObj = new bind(jsonArray, _copyObj, option, optionJbox);
        }
    }
    SKJH.clickEdit = function (jhId, htId) {
        $invokeWebService_2("~WebService_HeTong.getHTAndChild", { htId: htId }, null, successCallBack, errorCallBack, null, { userContent: "getHTAndChild", jhId: jhId, type: "update" });

    }
    SKJH.clickDel = function (jhId, htId) {
        var ramdomId = String.randomString(6);
        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>你确定要删除这份合同记录吗？", ramdomId), "确定删除吗？", _clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { htId: htId, jhId: jhId });
    }
    SKJH._clickAdd = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();
            var newHeTongBG = bind.jsonToObject(jsonArray);
            var htId = bindObj.options.data.htId
            newHeTongBG["jh_htId"] = htId;

            $invokeWebService_2("~WebService_HeTong.addShouKuanJiHua", { shouKuanJiHua: newHeTongBG }, function () {
                $.jBox.tip("添加收款计划，请稍后...", 'loading');
            }, successCallBack, errorCallBack, function () {

            }, { userContent: "addShouKuanJiHua", htId: htId });
        }
        return true;
    }
    function _clickEdit(v, h, f) {
        if (v == "1") {

            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();
            var newHeTong = bind.jsonToObject(jsonArray);

            newHeTong["jh_htId"] = bindObj.obj.jh_htId;
            newHeTong["jh_Id"] = bindObj.obj.jh_Id;
            $invokeWebService_2("~WebService_HeTong.updateShouKuanJiHua", { shouKuanJiHua: newHeTong }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, function () {
                $.jBox.tip('完成。', 'success');
            }, { userContent: "updateShouKuanJiHua", htId: bindObj.obj.jh_htId });
        }
        return true;
    }
    function _clickDel(v, h, f) {
        if (v == "1") {

            var data = h.find("input[type='hidden']").data("data");
            var htId = data.htId;
            var jhId = data.jhId;
            $invokeWebService_2("~WebService_HeTong.delShouKuanJiHua", { id: jhId }, null, successCallBack, errorCallBack, null, { userContent: "delShouKuanJiHua", htId: htId });
        }
        return true;
    }
    //#endregion

    //#region 生成json
    function createJson() {
        var jsonArray = [];
        jsonArray.push({ itemId: "jh_htId_bg", required: true, type: "select", title: "合同或合同变更" }); ///
        jsonArray.push({ itemId: "jh_ShouKuanRiQi", type: "text", validate: "datetime", title: "计划收款日期" });
        jsonArray.push({ itemId: "jh_IsTiXing", required: true, parentId: "jh_ShouKuanRiQi", yesOrNo: true, type: "select", title: "到期提醒", init: [{ id: "1", title: "到期提醒", style: { color: "Green"} }, { id: "0", title: "不提醒", style: { color: "#FFA500"}}] });
        jsonArray.push({ itemId: "jh_ShouKuanJinE", type: "text", validate: "money", title: "计划收款金额（万元）" });
        jsonArray.push({ itemId: "jh_IsFaHan", type: "select", title: "发函", init: [{ id: "1", title: "已发函", style: { color: "Green"} }, { id: "2", title: "未发函", style: { color: "#FFA500"}}] });
        //jsonArray.push({ itemId: "jh_DengJiRen", type: "text", title: "登记人" });
        jsonArray.push({ itemId: "jh_DengJiRiQi", type: "text", validate: "datetime", title: "登记日期" });
        //jsonArray.push({ itemId: "jh_XiuGaiRen", type: "text", title: "修改人" });
        //jsonArray.push({ itemId: "jh_XiuGaiRiQi", type: "text", validate: "datetime", title: "修改日期" });
        jsonArray.push({ itemId: "jh_ShoukuanShuoMing", type: "ntext", title: "合同或协议约定内容" });
        jsonArray.push({ itemId: "jh_BeiZhu", type: "ntext", title: "备注" });
        return jsonArray;
    }
    //公用
    function getInit(arr, prefix) {
        ;
        var init = [];
        for (var i = 0; i < arr.length; i++) {
            id = arr[i][prefix + "Id"]; //Id是固定属性
            value = arr[i][prefix + "Number"] + "  " + arr[i][prefix + "MingCheng"]; //name是固定属性
            init.push({ id: id, title: value })
        }
        return init;
    }
    //#endregion
    //#region HTML
    SKJH.getHtmlOfHeTong = function (datas, htId) {
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
                            if (json.itemId == "jh_htId_bg") {

                                if (datas[j].jh_htId_bg) {
                                    if (datas[j].TabHeTongBianGeng) {
                                        value = datas[j].TabHeTongBianGeng.bg_BianHao;
                                    }
                                    value += "&nbsp;&nbsp;" + datas[j].TabHeTongBianGeng.bg_MingCheng;
                                }
                                else if (datas[j].jh_htId) {
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
                                    if (_json.style) {
                                        var style = [];
                                        for (var item in _json.style) {
                                            style.push(String.format("{0}:{1}", item, _json.style[item]));
                                        }
                                        value = String.format("<font style='{0}'>{1}</font>", style.join(','), value);
                                    }
                                }
                                else {
                                    value = "";
                                }
                            }
                        }
                        else if (json.validate == "money") {
                            value = "<label validate='money'>" + value + "</label>";
                        }
                        str.push(String.format("<td class='{1}'>{0}</td>", value, json.validate == "money" ? "mon" : ""));
                    }
                }
                str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"SKJH.clickDetail('{0}')\">详细</a>|<a href='javascript:void(0);' onclick=\"SKJH.clickEdit('{0}','{1}')\">编辑</a>|<a href='javascript:void(0);' onclick=\"SKJH.clickDel('{0}','{1}')\">删除</a></span></td>", datas[j].jh_Id, htId));
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
        var $div = $("#" + SKJH.Prefix + htId);
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
    window.SKJH = SKJH;
})();