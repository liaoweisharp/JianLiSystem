//企业负责人前期
(function () {
    baseData = {}
    ZZGS.pd = {};
    ZZGS.where_HeTong = null;
    ZZGS.where_GuiHuan = null;
    pageSize = 10;
    var requireColumn = ["zzgs_ZhengName", "zzgs_ZhengShuBianHao", "zzgs_JieChuRen", "zzgs_UsedTime", "zzgs_YongTu", "zzgs_BeiZhu"];
    function ZZGS(divPage, divContent) {

        $("#" + divPage).html(loading);
        $("#" + divContent).html(loading);
        callListXiangMu();

        ZZGS.divPage = divPage;
        ZZGS.divContent = divContent;
        ZZGS.baseData = {};
    }
    function callListXiangMu() {
        $invokeWebService_2("~WebService_ZhengZhang.countCompany", { pageClass: null, where: ZZGS.where_HeTong, isGuiHuan: ZZGS.where_GuiHuan }, null, successCallBack, errorCallBack, null, { userContent: "countCompany" });

    }
    function successCallBack(result, context) {
        if (context.userContent == "countCompany") {
            var optInit = getOptionsFromForm();
            $("#" + ZZGS.divPage).pagination(result, optInit);
            $("#" + ZZGS.divContent).show();
        }


        else if (context.userContent == "filterCompany") {

            var data = result;
            baseData["data"] = data;
            //#region 日期转换成日期格式
            var jsons = createJson().findAll("validate", "datetime");

            conventObjsToDateTime(data, jsons);
            //#endregion
            if (data.length == 0) {
                $("#" + ZZGS.divContent).html("还没有企业证件外借信息，要添加请点击右上角的\"添加\"按钮");
            }
            else {
                var str = getHtmlOfQianQi(data);
                $("#" + ZZGS.divContent).html(str);
                tableAddStyle();
            }
        }
        else if (context.userContent == "addCompany") {

            if (result) {
                $.jBox.tip('添加成功。', 'success');
                new ZZGS(ZZGS.divPage, ZZGS.divContent);
            }
            else {
                $.jBox.tip('添加失败', 'error', {});
            }
        }
        else if (context.userContent == "updateCompany") {
            if (result) {
                $.jBox.tip('更新成功。', 'success');
                pageselectCallback(ZZGS.pd.currentPageNumber, null);
                HT.pageselectCallback(HT.pd.currentPageNumber, null);
            }
            else {
                $.jBox.tip('更新失败', 'error', {});
            }
        }
        else if (context.userContent == "delCompany") {
            if (result) {
                $.jBox.tip('删除成功。', 'success');
                pageselectCallback(ZZGS.pd.currentPageNumber, null);

            }
            else {
                $.jBox.tip('删除失败', 'error', {});
            }
        }
        else if (context.userContent == "getDistinctCompanyZhengJian") {

            var optionType = context.optionType;
            var jsonArray = createJson();
            var json = jsonArray.firstOrDefault("itemId", "zzgs_ZhengName");
            json.init = result;
            if (optionType == "add") {

                var option = { type: "new", align: "y" };
                //jBox options
                var optionJbox = { title: "添加", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: _clickAdd };
                ZZGS.bindObj = new bind(jsonArray, null, option, optionJbox);
            }
            else if (optionType == "update") {
                var id = context.id;
                var option = { type: "update", align: "y" };
                //jBox options
                var optionJbox = { title: "编辑外借证件", width: 850, buttons: { "更新": "1", "取消": "0" }, submit: _clickEdit };
                var obj = baseData["data"].firstOrDefault("zzgs_Id", id);
                if (obj) {
                    ZZGS.bindObj = new bind(jsonArray, obj, option, optionJbox);
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
                str.push(String.format("<td class='num'>{0}</td>", ZZGS.pd.currentPageNumber * ZZGS.pd.pageSize + 1 + j));
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

                str.push(String.format("<td class='td7'><span class='opation'><a href='javascript:void(0);' onclick=\"ZZGS.clickDetail({0})\">详细</a>  <a href='javascript:void(0);' onclick=\"ZZGS.clickEdit({0})\">编辑</a>|<a href='javascript:void(0);' onclick=\"ZZGS.clickDel({0})\">删除</a></span></td>", qianQi[j].zzgs_Id));

                str.push("</tr>");
            }


            str.push("</table>");
        }
        return str.join("");
    }


    //#endregion
    //#region 句柄
    ZZGS.clickAdd = function (id) {
        $invokeWebService_2("~WebService_ZhengZhang.getDistinctCompanyZhengJian", {}, null, successCallBack, errorCallBack, null, { userContent: "getDistinctCompanyZhengJian", id: id, optionType: "add" });

        //        var jsonArray = createJson();
        //        var option = { type: "new" };
        //        //jBox options
        //        var optionJbox = { title: "添加", width: 850, buttons: { "添加": "1", "取消": "0" },align: "y", submit: _clickAdd };
        //        ZZGS.bindObj = new bind(jsonArray, null, option, optionJbox);
        //        //这里添加个性化界面

    }
    ZZGS.clickEdit = function (id) {
        $invokeWebService_2("~WebService_ZhengZhang.getDistinctCompanyZhengJian", {}, null, successCallBack, errorCallBack, null, { userContent: "getDistinctCompanyZhengJian", id: id, optionType: "update" });

        //        var jsonArray = createJson();
        //        var option = { type: "update" };
        //        //jBox options
        //        var optionJbox = { title: "编辑外借证件", width: 850, buttons: { "更新": "1", "取消": "0" }, submit: _clickEdit };
        //        var obj = baseData["data"].firstOrDefault("zzgs_Id", id);
        //        if (obj) {
        //            ZZGS.bindObj = new bind(jsonArray, obj, option, optionJbox);
        //        }
    }
    ZZGS.clickDetail = function (id) {
        var option = { type: "review", align: "y" };
        //jBox options
        var optionJbox = { title: "公司证件外借明细", width: 850, buttons: {} };
        var jsonArray = createJson();
        var obj = baseData["data"].firstOrDefault("zzgs_Id", id);
        if (obj) {
            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }
    ZZGS.clickDel = function (id) {
        var ramdomId = String.randomString(6);
        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>删除证件外借记录。你确定要删除吗？", ramdomId), "确定删除吗？", _clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { id: id });
    }
    function _clickAdd(v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();
            var obj = bind.jsonToObject(jsonArray);


            $invokeWebService_2("~WebService_ZhengZhang.addCompany", { obj: obj }, function () {
                $.jBox.tip("添加企业证件外借记录，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "addCompany" });
        }
        return true;
    }
    function _clickEdit(v, h, f) {
        if (v == "1") {

            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();

            var _newHeTong = bind.jsonToObject(jsonArray);
            _newHeTong["zzgs_Id"] = bindObj.obj.zzgs_Id;


            //var newHeTong = $.extend({}, bindObj.heTong, _newHeTong);
            //delete newHeTong.__type;
            $invokeWebService_2("~WebService_ZhengZhang.updateCompany", { obj: _newHeTong }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "updateCompany" });
        }
        return true;
    }
    function _clickDel(v, h, f) {
        if (v == "1") {
            var data = h.find("input[type='hidden']").data("data");
            var id = data.id;
            $invokeWebService_2("~WebService_ZhengZhang.delCompany", { id: id }, function () {
                $.jBox.tip("删除中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "delCompany", id: id });
        }
        return true;
    }
    ZZGS.Search_XiangMu = function () {
        var value = $.trim($("#txtSerXiangMu").val());
        var guiDang = $("#ddlGuiHuan").val();
        if (value == "") {
            //alert("搜索内容为空，请填值再搜索。");
            value = null;
        }
        if (guiDang == "-1") {
            ZZGS.where_GuiHuan = null;
        }
        else if (guiDang == "0") {
            //未归还
            ZZGS.where_GuiHuan = false;
        }
        else if (guiDang == "1") {
            //已归还
            ZZGS.where_GuiHuan = true;
        }
        ZZGS.where_HeTong = value;
        callListXiangMu(value);

    }

    //#endregion
    //#region 生成json
    function createJson() {
        var jsonArray = [];
        jsonArray.push({ itemId: "zzgs_ZhengName", type: "textSelect", title: "公司证件名称", init: [] });
        jsonArray.push({ itemId: "zzgs_ZhengShuBianHao", type: "text", title: "证书编号" });
        jsonArray.push({ itemId: "zzgs_UsedTime", type: "text", validate: "datetime", title: "借出日期" });
        jsonArray.push({ itemId: "zzgs_QianPiRen", type: "text", title: "签批人" });
        jsonArray.push({ itemId: "zzgs_JieChuRen", isOtherCol: true, type: "text", title: "外借人（单位）" });
        jsonArray.push({ itemId: "zzgs_GuiHuan_Date", type: "text", validate: "datetime", title: "归还时间" });
        jsonArray.push({ itemId: "zzgs_YongTu", type: "text", title: "用途" });
        jsonArray.push({ itemId: "ecr_BeiZhu", type: "ntext", title: "备注" });
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

        ZZGS.pd.currentPageNumber = page_index;
        ZZGS.pd.pageSize = pageSize;

        $invokeWebService_2("~WebService_ZhengZhang.filterCompany", { pageClass: ZZGS.pd, where: ZZGS.where_HeTong, isGuiHuan: ZZGS.where_GuiHuan },
       function () {
           //$("#divContent").html(loading);
       }, successCallBack, errorCallBack, null, { userContent: "filterCompany" });
    }
    //绑定列表后绑定样式或事件
    function tableAddStyle() {
        $("#" + ZZGS.divContent).find("tr[class*='header']").addClass("bgHeader");
        $("#" + ZZGS.divContent).find("tr[class*='row']:odd").addClass("bg1");
        $("#" + ZZGS.divContent).find("tr[class*='row']").bind("mouseover", {}, function () {
            $(this).addClass("mouseover");
        })
        $("#" + ZZGS.divContent).find("tr[class*='row']").bind("mouseout", {}, function () {
            $(this).removeClass("mouseover");
        })
    }
    //添加企业负责人组和监理组的数据
    //#endregion
    window.ZZGS = ZZGS;
})()

$(function () {
    new ZZGS("divPageSize_QQ", "divContent_QQ");
})
