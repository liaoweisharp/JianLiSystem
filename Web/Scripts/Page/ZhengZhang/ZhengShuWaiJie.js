//企业负责人前期
(function () {
    baseData = {}
    ZZZSWJ.pd = {};
    ZZZSWJ.where_HeTong = null;
    ZZZSWJ.where_GuiHuan = null;
    pageSize = 10;
    var requireColumn = ["zzzsu_YongTu", "zzzsu_ZhengShuId", "zzzsu_UsedTime", "zzzsu_XiangMuId", "zzzsu_JieChuRen", "zzzsu_BeiZhu"];
    function ZZZSWJ(divPage, divContent) {

        $("#" + divPage).html(loading);
        $("#" + divContent).html(loading);

        $invokeWebService_2("~WebService_ZhengZhang.getByAllProjectInfo", {}, null, successCallBack, errorCallBack, null, { userContent: "getByAllProjectInfo" });
        ZZZSWJ.divPage = divPage;
        ZZZSWJ.divContent = divContent;
        ZZZSWJ.baseData = {};
    }
    function callListXiangMu() {

        $invokeWebService_2("~WebService_ZhengZhang.countZhengShuUsed", { pageClass: null, where: ZZZSWJ.where_HeTong, isGuiHuan: ZZZSWJ.where_GuiHuan }, null, successCallBack, errorCallBack, null, { userContent: "countZhengShuUsed" });

    }
    function successCallBack(result, context) {
        if (context.userContent == "getByAllProjectInfo") {
            baseData["Project"] = result[0];
            baseData["ZhengShu"] = result[1];
            callListXiangMu();
        }
        else if (context.userContent == "countZhengShuUsed") {
            var optInit = getOptionsFromForm();
            $("#" + ZZZSWJ.divPage).pagination(result, optInit);
            $("#" + ZZZSWJ.divContent).show();
        }


        else if (context.userContent == "filterZhengShuUsed") {

            var data = result;
            baseData["data"] = data;
            //#region 日期转换成日期格式
            var jsons = createJson().findAll("validate", "datetime");

            conventObjsToDateTime(data, jsons);
            //#endregion
            if (data.length == 0) {
                $("#" + ZZZSWJ.divContent).html("还没有企业证件外借信息，要添加请点击右上角的\"添加\"按钮");
            }
            else {
                var str = getHtmlOfQianQi(data);
                $("#" + ZZZSWJ.divContent).html(str);
                tableAddStyle();
            }
        }
        else if (context.userContent == "addZhengShuUsed") {

            if (result) {
                $.jBox.tip('添加成功。', 'success');
                new ZZZSWJ(ZZZSWJ.divPage, ZZZSWJ.divContent);
            }
            else {
                $.jBox.tip('添加失败', 'error', {});
            }
        }
        else if (context.userContent == "updateZhengShuUsed") {
            if (result) {
                $.jBox.tip('更新成功。', 'success');
                pageselectCallback(ZZZSWJ.pd.currentPageNumber, null);
                HT.pageselectCallback(HT.pd.currentPageNumber, null);
            }
            else {
                $.jBox.tip('更新失败', 'error', {});
            }
        }
        else if (context.userContent == "delZhengShuUsed") {
            if (result) {
                $.jBox.tip('删除成功。', 'success');
                pageselectCallback(ZZZSWJ.pd.currentPageNumber, null);

            }
            else {
                $.jBox.tip('删除失败', 'error', {});
            }
        }
        else if (context.userContent == "getDistinct_ZhengShuUsed") {

            var optionType = context.optionType;
            var jsonArray = createJson();
            var json1 = jsonArray.firstOrDefault("itemId", "zzzsu_YongTu");
            json1.init = result[0];
            if (optionType == "add") {

                var option = { type: "new", align: "y" };
                //jBox options
                var optionJbox = { title: "添加", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: _clickAdd };
                ZZZSWJ.bindObj = new bind(jsonArray, null, option, optionJbox);
            }
            else if (optionType == "update") {
                var id = context.id;
                var option = { type: "update", align: "y" };
                //jBox options
                var optionJbox = { title: "编辑", width: 850, buttons: { "更新": "1", "取消": "0" }, submit: _clickEdit };
                var obj = baseData["data"].firstOrDefault("zzzsu_Id", id);
                if (obj) {
                    ZZZSWJ.bindObj = new bind(jsonArray, obj, option, optionJbox);
                }
            }
        }

    }
    function errorCallBack(result, context) {

    }
    //#region HTML
    function getHtmlOfQianQi(qianQi) {
        var str = [];
        var jsonArray = createJson();
        if (qianQi.length > 0) {
            str.push("<table class='tb_List QQ' cellspacing='0' cellpadding='5'>");
            str.push("<tr class='header'>");
            str.push(String.format("<td class='num'>#</td>"));
            var k = 0;
            for (var i = 0; i < jsonArray.length; i++) {
                var json = jsonArray[i];
                if (requireColumn.contains(json.itemId)) {
                    k++;
                    str.push(String.format("<td class='td{1}'>{0}</td>", json.title, k));

                }
            }


            str.push("<td class='td7'>操作</td>");
            str.push("</tr>");
            //表内容
            var k = 0;
            for (var j = 0; j < qianQi.length; j++) {
                str.push("<tr class='row'>");
                str.push(String.format("<td class='num'>{0}</td>", ZZZSWJ.pd.currentPageNumber * ZZZSWJ.pd.pageSize + 1 + j));
                for (var i = 0; i < jsonArray.length; i++) {
                    var json = jsonArray[i];
                    if (requireColumn.contains(json.itemId)) {
                        var value = qianQi[j][json.itemId];
                        value = value == null ? "" : value;
                        if (json.type == "select" && value != "") {
                            value = json.init.firstOrDefault("id", value).title;
                        }
                        k++;
                        str.push(String.format("<td class='td{1}'>{0}</td>", value, k));
                    }
                }

                str.push(String.format("<td class='td7'><span class='opation'><a href='javascript:void(0);' onclick=\"ZZZSWJ.clickDetail({0})\">详细</a>  <a href='javascript:void(0);' onclick=\"ZZZSWJ.clickEdit({0})\">编辑</a>|<a href='javascript:void(0);' onclick=\"ZZZSWJ.clickDel({0})\">删除</a></span></td>", qianQi[j].zzzsu_Id));

                str.push("</tr>");
            }


            str.push("</table>");
        }
        return str.join("");
    }


    //#endregion
    //#region 句柄
    ZZZSWJ.clickAdd = function (id) {
        $invokeWebService_2("~WebService_ZhengZhang.getDistinct_ZhengShuUsed", {}, null, successCallBack, errorCallBack, null, { userContent: "getDistinct_ZhengShuUsed", id: id, optionType: "add" });

        //                var jsonArray = createJson();
        //                var option = { type: "new", align: "y" };
        //                //jBox options
        //                var optionJbox = { title: "添加", width: 850, buttons: { "添加": "1", "取消": "0" },align: "y", submit: _clickAdd };
        //                ZZZSWJ.bindObj = new bind(jsonArray, null, option, optionJbox);
        //                //这里添加个性化界面

    }
    ZZZSWJ.clickEdit = function (id) {
        $invokeWebService_2("~WebService_ZhengZhang.getDistinct_ZhengShuUsed", {}, null, successCallBack, errorCallBack, null, { userContent: "getDistinct_ZhengShuUsed", id: id, optionType: "update" });

        //                var jsonArray = createJson();
        //                var option = { type: "update", align: "y" };
        //                //jBox options
        //                var optionJbox = { title: "编辑外借证件", width: 850, buttons: { "更新": "1", "取消": "0" }, submit: _clickEdit };
        //                var obj = baseData["data"].firstOrDefault("zzzsu_Id", id);
        //                if (obj) {
        //                    ZZZSWJ.bindObj = new bind(jsonArray, obj, option, optionJbox);
        //                }
    }
    ZZZSWJ.clickDetail = function (id) {
        var option = { type: "review", align: "y" };
        //jBox options
        var optionJbox = { title: "公司证件外借明细", width: 850, buttons: {} };
        var jsonArray = createJson();
        var obj = baseData["data"].firstOrDefault("zzzsu_Id", id);
        if (obj) {
            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }
    ZZZSWJ.clickDel = function (id) {
        var ramdomId = String.randomString(6);
        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>你确定要删除吗？", ramdomId), "确定删除吗？", _clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { id: id });
    }
    function _clickAdd(v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");

            var jsonArray = bindObj.ShouJiData();

            var obj = bind.jsonToObject(jsonArray);


            $invokeWebService_2("~WebService_ZhengZhang.addZhengShuUsed", { obj: obj }, function () {
                $.jBox.tip("添加企业证件外借记录，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "addZhengShuUsed" });
        }
        return true;
    }
    function _clickEdit(v, h, f) {
        if (v == "1") {

            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();

            var _newHeTong = bind.jsonToObject(jsonArray);
            _newHeTong["zzzsu_Id"] = bindObj.obj.zzzsu_Id;


            //var newHeTong = $.extend({}, bindObj.heTong, _newHeTong);
            //delete newHeTong.__type;
            $invokeWebService_2("~WebService_ZhengZhang.updateZhengShuUsed", { obj: _newHeTong }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "updateZhengShuUsed" });
        }
        return true;
    }
    function _clickDel(v, h, f) {
        if (v == "1") {
            var data = h.find("input[type='hidden']").data("data");
            var id = data.id;
            $invokeWebService_2("~WebService_ZhengZhang.delZhengShuUsed", { id: id }, function () {
                $.jBox.tip("删除中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "delZhengShuUsed", id: id });
        }
        return true;
    }
    ZZZSWJ.Search_XiangMu = function () {
        var value = $.trim($("#txtSerXiangMu").val());
        var guiDang = $("#ddlGuiHuan").val();
        if (value == "") {
            //alert("搜索内容为空，请填值再搜索。");
            value = null;
        }
        if (guiDang == "-1") {
            ZZZSWJ.where_GuiHuan = null;
        }
        else if (guiDang == "0") {
            //未归还
            ZZZSWJ.where_GuiHuan = false;
        }
        else if (guiDang == "1") {
            //已归还
            ZZZSWJ.where_GuiHuan = true;
        }

        ZZZSWJ.where_HeTong = value;
        callListXiangMu(value);

    }

    //#endregion
    //#region 生成json
    function createJson() {
        var jsonArray = [];
        jsonArray.push({ itemId: "zzzsu_ZhengShuId", type: "select", title: "人员证书", init: getInit(baseData["ZhengShu"]) });
        jsonArray.push({ itemId: "zzzsu_UsedTime", type: "text", validate: "datetime", title: "借出时间" });

        jsonArray.push({ itemId: "zzzsu_YongTu", type: "textSelect", title: "用途", init: [] });
        jsonArray.push({ itemId: "zzzsu_XiangMuId", type: "select", title: "项目", init: getInit(baseData["Project"]) });

        jsonArray.push({ itemId: "zzzsu_JieChuRen", type: "text", isOtherCol: true, title: "外借人（单位）" });
        jsonArray.push({ itemId: "zzzsu_GuiHuan_Date", type: "text", validate: "datetime", title: "归还时间" });
        jsonArray.push({ itemId: "zzzsu_QianPiRen", type: "text", title: "签批人" });
        jsonArray.push({ itemId: "zzzsu_BeiZhu", type: "ntext", title: "备注" });

        return jsonArray;
    }
    //#endregion
    //#region 其他
    function getOptionsFromForm() {
        var opt = { callback: pageselectCallback, items_per_page: pageSize, next_text: "下页", num_display_entries: pageSize, num_edge_entries: 2, prev_text: "上页" };
        var htmlspecialchars = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }
        $.each(htmlspecialchars, function (k, v) {
            opt.prev_text = opt.prev_text.replace(k, v);
            opt.next_text = opt.next_text.replace(k, v);
        })
        return opt;
    }
    function pageselectCallback(page_index, jq) {

        ZZZSWJ.pd.currentPageNumber = page_index;
        ZZZSWJ.pd.pageSize = pageSize;

        $invokeWebService_2("~WebService_ZhengZhang.filterZhengShuUsed", { pageClass: ZZZSWJ.pd, where: ZZZSWJ.where_HeTong, isGuiHuan: ZZZSWJ.where_GuiHuan },
       function () {
           //$("#divContent").html(loading);
       }, successCallBack, errorCallBack, null, { userContent: "filterZhengShuUsed" });
    }
    //绑定列表后绑定样式或事件
    function tableAddStyle() {
        $("#" + ZZZSWJ.divContent).find("tr[class*='header']").addClass("bgHeader");
        $("#" + ZZZSWJ.divContent).find("tr[class*='row']:odd").addClass("bg1");
        $("#" + ZZZSWJ.divContent).find("tr[class*='row']").bind("mouseover", {}, function () {
            $(this).addClass("mouseover");
        })
        $("#" + ZZZSWJ.divContent).find("tr[class*='row']").bind("mouseout", {}, function () {
            $(this).removeClass("mouseover");
        })
    }
    //添加企业负责人组和监理组的数据
    //#endregion
    window.ZZZSWJ = ZZZSWJ;
})()

$(function () {
    new ZZZSWJ("divPageSize_QQ", "divContent_QQ");
})
