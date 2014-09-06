//企业负责人前期
(function () {
    baseData = {}
    ExcelCharger.pd = {};
    ExcelCharger.where_HeTong = null;
    pageSize = 10;
    var requireColumn = ["ecr_CompanyName", "ecr_Name", "ecr_ZhiCheng", "ecr_BeiZhu"];
    function ExcelCharger(divPage, divContent) {

        $("#" + divPage).html(loading);
        $("#" + divContent).html(loading);
        callListXiangMu();

        ExcelCharger.divPage = divPage;
        ExcelCharger.divContent = divContent;
        ExcelCharger.baseData = {};
    }
    function callListXiangMu() {
        $invokeWebService_2("~WebService_ExportExcel.countCompanyCharger", { pageClass: null, where: ExcelCharger.where_HeTong }, null, successCallBack, errorCallBack, null, { userContent: "countCompanyCharger" });

    }
    function successCallBack(result, context) {
        if (context.userContent == "countCompanyCharger") {
            var optInit = getOptionsFromForm();
            $("#" + ExcelCharger.divPage).pagination(result, optInit);
            $("#" + ExcelCharger.divContent).show();
        }


        else if (context.userContent == "filterCompanyCharger") {

            var data = result;
            baseData["xiangMuQianQi"] = data;
            //#region 日期转换成日期格式
            var jsons = createJson().findAll("validate", "datetime");

            conventObjsToDateTime(data, jsons);
            //#endregion
            if (data.length == 0) {
                $("#" + ExcelCharger.divContent).html("还没有企业负责人信息，要添加请点击右上角的\"添加\"按钮");
            }
            else {
                var str = getHtmlOfQianQi(data);
                $("#" + ExcelCharger.divContent).html(str);
                tableAddStyle();
            }
        }
        else if (context.userContent == "addCompanyCharger") {
            
            if (result) {
                $.jBox.tip('添加成功。', 'success');
                new ExcelCharger(ExcelCharger.divPage, ExcelCharger.divContent);
            }
            else {
                $.jBox.tip('添加失败', 'error', {});
            }
        }
        else if (context.userContent == "updateCompanyCharger") {
            if (result) {
                $.jBox.tip('更新成功。', 'success');
                pageselectCallback(ExcelCharger.pd.currentPageNumber, null);
                HT.pageselectCallback(HT.pd.currentPageNumber, null);
            }
            else {
                $.jBox.tip('更新失败', 'error', {});
            }
        }
        else if (context.userContent == "delCompanyCharger") {
            if (result) {
                $.jBox.tip('删除成功。', 'success');
                pageselectCallback(ExcelCharger.pd.currentPageNumber, null);

            }
            else {
                $.jBox.tip('删除失败', 'error', {});
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
            var k=0;
            for (var j = 0; j < qianQi.length; j++) {
                str.push("<tr class='row'>");
                str.push(String.format("<td class='num'>{0}</td>", ExcelCharger.pd.currentPageNumber * ExcelCharger.pd.pageSize + 1 + j));
                for (var i = 0; i < jsonArray.length; i++) {
                    var json = jsonArray[i];
                    if (requireColumn.contains(json.itemId)) {
                        var value = qianQi[j][json.itemId];
                        value = value == null ? "" : value;
                        if (json.type == "select" && value != "") {
                            value = json.init.firstOrDefault("id", value).title;
                        }
                        k++;
                        str.push(String.format("<td class='td{1}'>{0}</td>", value,k));
                    }
                }

                str.push(String.format("<td class='td7'><span class='opation'><a class='hid' href='javascript:void(0);' onclick=\"ExcelCharger.clickDetail({0})\">详细</a>  <a href='javascript:void(0);' onclick=\"ExcelCharger.clickEdit({0})\">编辑</a>|<a href='javascript:void(0);' onclick=\"ExcelCharger.clickDel({0})\">删除</a></span></td>", qianQi[j].ecr_ID));

                str.push("</tr>");
            }


            str.push("</table>");
        }
        return str.join("");
    }


    //#endregion
    //#region 句柄
    ExcelCharger.clickAdd = function (id) {
        // $invokeWebService_2("~WebService_HeTong.getNameArray", {}, null, successCallBack, errorCallBack, null, { userContent: "getHeTongInfo", type: "new" });
        var jsonArray = createJson();
        var option = { type: "new" };
        //jBox options
        var optionJbox = { title: "添加企业负责人", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: _clickAdd };
        ExcelCharger.bindObj = new bind(jsonArray, null, option, optionJbox);
        //这里添加个性化界面
        
    }
    ExcelCharger.clickEdit = function (id) {

        var jsonArray = createJson();
        var option = { type: "update" };
        //jBox options
        var optionJbox = { title: "编辑企业负责人", width: 850, buttons: { "更新": "1", "取消": "0" }, submit: _clickEdit };
        var obj = baseData["xiangMuQianQi"].firstOrDefault("ecr_ID", id);
        if (obj) {
            ExcelCharger.bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }
    ExcelCharger.clickDetail = function (id) {
        var option = { type: "review" };
        //jBox options
        var optionJbox = { title: "企业负责人", width: 850, buttons: {} };
        var jsonArray = createJson();
        var obj = baseData["xiangMuQianQi"].firstOrDefault("ecr_ID", id);
        if (obj) {
            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }
    ExcelCharger.clickDel = function (id) {
        var ramdomId = String.randomString(6);
        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>删除企业负责人。你确定要删除吗？", ramdomId), "确定删除吗？", _clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { id: id });
    }
    function _clickAdd(v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();
            var obj = bind.jsonToObject(jsonArray);


            $invokeWebService_2("~WebService_ExportExcel.addCompanyCharger", { obj: obj }, function () {
                $.jBox.tip("添加新企业负责人，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "addCompanyCharger" });
        }
        return true;
    }
    function _clickEdit(v, h, f) {
        if (v == "1") {

            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();

            var _newHeTong = bind.jsonToObject(jsonArray);
            _newHeTong["ecr_ID"] = bindObj.obj.ecr_ID;


            //var newHeTong = $.extend({}, bindObj.heTong, _newHeTong);
            //delete newHeTong.__type;
            $invokeWebService_2("~WebService_ExportExcel.updateCompanyCharger", { obj: _newHeTong }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "updateCompanyCharger" });
        }
        return true;
    }
    function _clickDel(v, h, f) {
        if (v == "1") {
            var data = h.find("input[type='hidden']").data("data");
            var id = data.id;
            $invokeWebService_2("~WebService_ExportExcel.delCompanyCharger", { id: id }, function () {
                $.jBox.tip("删除中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "delCompanyCharger", id: id });
        }
        return true;
    }
    ExcelCharger.Search_XiangMu = function () {
        var value = $.trim($("#txtSerXiangMu").val());
        if (value == "") {
            alert("搜索内容为空，请填值再搜索。");
            value = null;
        }
        ExcelCharger.where_HeTong = value;
        callListXiangMu(value);

    }

    //#endregion
    //#region 生成json
    function createJson() {
        var jsonArray = [];
        jsonArray.push({ itemId: "ecr_CompanyName", type: "text",required:true, title: "企业名称" });
        jsonArray.push({ itemId: "ecr_Name", type: "text", required: true, title: "负责人" });
        jsonArray.push({ itemId: "ecr_ZhiCheng", type: "text", title: "职称" });
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

        ExcelCharger.pd.currentPageNumber = page_index;
        ExcelCharger.pd.pageSize = pageSize;

        $invokeWebService_2("~WebService_ExportExcel.filterCompanyCharger", { pageClass: ExcelCharger.pd, where: ExcelCharger.where_HeTong },
       function () {
           //$("#divContent").html(loading);
       }, successCallBack, errorCallBack, null, { userContent: "filterCompanyCharger" });
    }
    //绑定列表后绑定样式或事件
    function tableAddStyle() {
        $("#" + ExcelCharger.divContent).find("tr[class*='header']").addClass("bgHeader");
        $("#" + ExcelCharger.divContent).find("tr[class*='row']:odd").addClass("bg1");
        $("#" + ExcelCharger.divContent).find("tr[class*='row']").bind("mouseover", {}, function () {
            $(this).addClass("mouseover");
        })
        $("#" + ExcelCharger.divContent).find("tr[class*='row']").bind("mouseout", {}, function () {
            $(this).removeClass("mouseover");
        })
    }
    //添加企业负责人组和监理组的数据
    //#endregion
    window.ExcelCharger = ExcelCharger;
})()

$(function () {
    new ExcelCharger("divPageSize_QQ", "divContent_QQ");
})
