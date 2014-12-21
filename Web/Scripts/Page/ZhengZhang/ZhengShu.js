//企业负责人前期
(function () {
    baseData = {}
    ZZZS.pd = {};
    ZZZS.where_HeTong = null;
    pageSize = 10;
    var requireColumn = ["zzzs_FullName", "zzzs_ZhengShu", "zzzs_Num", "usedNum", "zzzs_LeiXing", "zzzs_BeiZhu"];
    function ZZZS(divPage, divContent) {

        $("#" + divPage).html(loading);
        $("#" + divContent).html(loading);
        callListXiangMu();

        ZZZS.divPage = divPage;
        ZZZS.divContent = divContent;
        ZZZS.baseData = {};
    }
    function callListXiangMu() {
        $invokeWebService_2("~WebService_ZhengZhang.countZhengShu", { pageClass: null, where: ZZZS.where_HeTong }, null, successCallBack, errorCallBack, null, { userContent: "countZhengShu" });

    }
    function successCallBack(result, context) {
        if (context.userContent == "countZhengShu") {
            var optInit = getOptionsFromForm();
            $("#" + ZZZS.divPage).pagination(result, optInit);
            $("#" + ZZZS.divContent).show();
        }


        else if (context.userContent == "filterZhengShu") {

            var data = result;
            baseData["data"] = data;
            //#region 日期转换成日期格式
            var jsons = createJson().findAll("validate", "datetime");

            conventObjsToDateTime(data, jsons);
            //#endregion
            if (data.length == 0) {
                $("#" + ZZZS.divContent).html("还没有企业证件外借信息，要添加请点击右上角的\"添加\"按钮");
            }
            else {
                var str = getHtmlOfQianQi(data);
                $("#" + ZZZS.divContent).html(str);
                tableAddStyle();
            }
        }
        else if (context.userContent == "addZhengShu") {

            if (result) {
                $.jBox.tip('添加成功。', 'success');
                new ZZZS(ZZZS.divPage, ZZZS.divContent);
            }
            else {
                $.jBox.tip('添加失败', 'error', {});
            }
        }
        else if (context.userContent == "updateZhengShu") {
            if (result) {
                $.jBox.tip('更新成功。', 'success');
                pageselectCallback(ZZZS.pd.currentPageNumber, null);
                HT.pageselectCallback(HT.pd.currentPageNumber, null);
            }
            else {
                $.jBox.tip('更新失败', 'error', {});
            }
        }
        else if (context.userContent == "delZhengShu") {
            if (result) {
                $.jBox.tip('删除成功。', 'success');
                pageselectCallback(ZZZS.pd.currentPageNumber, null);

            }
            else {
                $.jBox.tip('删除失败', 'error', {});
            }
        }
        else if (context.userContent == "getDistinctZhengShu") {
        
            var optionType = context.optionType;
            var jsonArray = createJson();
            var json = jsonArray.firstOrDefault("itemId", "zzzs_ZhengShu");
            json.init = result;
            if (optionType == "add") {

                var option = { type: "new", align: "y" };
                //jBox options
                var optionJbox = { title: "添加", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: _clickAdd };
                ZZZS.bindObj = new bind(jsonArray, null, option, optionJbox);
            }
            else if (optionType == "update") {
                var id = context.id;
                var option = { type: "update", align: "y" };
                //jBox options
                var optionJbox = { title: "编辑外借证件", width: 850, buttons: { "更新": "1", "取消": "0" }, submit: _clickEdit };
                var obj = baseData["data"].firstOrDefault("zzzs_Id", id);
                if (obj) {
                    ZZZS.bindObj = new bind(jsonArray, obj, option, optionJbox);
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
        jsonArray.push({ itemId: "usedNum", title: "未归还数量",type:"" });
        if (qianQi.length > 0) {
            str.push("<table class='tb_List QQ' cellspacing='0' cellpadding='5'>");
            str.push("<tr class='header'>");
            str.push(String.format("<td class='num'>#</td>"));
            var k = 0;
//            for (var i = 0; i < jsonArray.length; i++) {
//                var json = jsonArray[i];
//                if (requireColumn.contains(json.itemId)) {
//                    k++;
//                    str.push(String.format("<td class='td{1}'>{0}</td>", json.title, k));

//                }
//            }

            for (var i = 0; i < requireColumn.length; i++) {
                var itemId = requireColumn[i];
                var header = jsonArray.firstOrDefault("itemId", itemId)
                if (header) {
                    k++;
                    str.push(String.format("<td class='td{1}'>{0}</td>", header.title, k));

                }
            }

            str.push("<td class='td7'>操作</td>");
            str.push("</tr>");
            //表内容
            var k = 0;
//            for (var j = 0; j < qianQi.length; j++) {
//                str.push("<tr class='row'>");
//                str.push(String.format("<td class='num'>{0}</td>", ZZZS.pd.currentPageNumber * ZZZS.pd.pageSize + 1 + j));
//                for (var i = 0; i < jsonArray.length; i++) {
//                    var json = jsonArray[i];
//                    if (requireColumn.contains(json.itemId)) {
//                        var value = qianQi[j][json.itemId];
//                        value = value == null ? "" : value;
//                        if (json.type == "select" && value != "") {
//                            value = json.init.firstOrDefault("id", value).title;
//                        }
//                        k++;
//                        str.push(String.format("<td class='td{1}'>{0}</td>", value, k));
//                    }
//                }

//                str.push(String.format("<td class='td7'><span class='opation'><a href='javascript:void(0);' onclick=\"ZZZS.clickDetail({0})\">详细</a>  <a href='javascript:void(0);' onclick=\"ZZZS.clickEdit({0})\">编辑</a>|<a href='javascript:void(0);' onclick=\"ZZZS.clickDel({0})\">删除</a></span></td>", qianQi[j].zzzs_Id));

//                str.push("</tr>");
//            }

            for (var j = 0; j < qianQi.length; j++) {
                str.push("<tr class='row'>");
                str.push(String.format("<td class='num'>{0}</td>", ZZZS.pd.currentPageNumber * ZZZS.pd.pageSize + 1 + j));
                for (var i = 0; i < requireColumn.length; i++) {
                    var itemId = requireColumn[i];
                    var obj = jsonArray.firstOrDefault("itemId", itemId)
                    if (obj) {
                        var value = qianQi[j][itemId];
                        value = value == null ? "" : value;
                        if (obj.type == "select" && value != "") {
                            value = obj.init.firstOrDefault("id", value).title;
                        }
                        k++;
                        str.push(String.format("<td class='td{1}'>{0}</td>", value, k));
                    }
                }

                str.push(String.format("<td class='td7'><span class='opation'><a href='javascript:void(0);' onclick=\"ZZZS.clickDetail({0})\">详细</a>  <a href='javascript:void(0);' onclick=\"ZZZS.clickEdit({0})\">编辑</a>|<a href='javascript:void(0);' onclick=\"ZZZS.clickDel({0})\">删除</a></span></td>", qianQi[j].zzzs_Id));

                str.push("</tr>");
            }

            str.push("</table>");
        }
        return str.join("");
    }


    //#endregion
    //#region 句柄
    ZZZS.clickAdd = function (id) {
        $invokeWebService_2("~WebService_ZhengZhang.getDistinctZhengShu", {}, null, successCallBack, errorCallBack, null, { userContent: "getDistinctZhengShu", id: id, optionType: "add" });

        //                var jsonArray = createJson();
        //                var option = { type: "new", align: "y" };
        //                //jBox options
        //                var optionJbox = { title: "添加", width: 850, buttons: { "添加": "1", "取消": "0" },align: "y", submit: _clickAdd };
        //                ZZZS.bindObj = new bind(jsonArray, null, option, optionJbox);
        //                //这里添加个性化界面

    }
    ZZZS.clickEdit = function (id) {
        $invokeWebService_2("~WebService_ZhengZhang.getDistinctZhengShu", {}, null, successCallBack, errorCallBack, null, { userContent: "getDistinctZhengShu", id: id, optionType: "update" });

        //                var jsonArray = createJson();
        //                var option = { type: "update", align: "y" };
        //                //jBox options
        //                var optionJbox = { title: "编辑外借证件", width: 850, buttons: { "更新": "1", "取消": "0" }, submit: _clickEdit };
        //                var obj = baseData["data"].firstOrDefault("zzzs_Id", id);
        //                if (obj) {
        //                    ZZZS.bindObj = new bind(jsonArray, obj, option, optionJbox);
        //                }
    }
    ZZZS.clickDetail = function (id) {
        var option = { type: "review", align: "y" };
        //jBox options
        var optionJbox = { title: "公司证件外借明细", width: 850, buttons: {} };
        var jsonArray = createJson();
        var obj = baseData["data"].firstOrDefault("zzzs_Id", id);
        if (obj) {
            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }
    ZZZS.clickDel = function (id) {
        var ramdomId = String.randomString(6);
        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>你确定要删除吗？", ramdomId), "确定删除吗？", _clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { id: id });
    }
    function _clickAdd(v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            
            var jsonArray = bindObj.ShouJiData();

            var obj = bind.jsonToObject(jsonArray);

            
            $invokeWebService_2("~WebService_ZhengZhang.addZhengShu", { obj: obj }, function () {
                $.jBox.tip("添加企业证件外借记录，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "addZhengShu" });
        }
        return true;
    }
    function _clickEdit(v, h, f) {
        if (v == "1") {

            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();

            var _newHeTong = bind.jsonToObject(jsonArray);
            _newHeTong["zzzs_Id"] = bindObj.obj.zzzs_Id;


            //var newHeTong = $.extend({}, bindObj.heTong, _newHeTong);
            //delete newHeTong.__type;
            $invokeWebService_2("~WebService_ZhengZhang.updateZhengShu", { obj: _newHeTong }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "updateZhengShu" });
        }
        return true;
    }
    function _clickDel(v, h, f) {
        if (v == "1") {
            var data = h.find("input[type='hidden']").data("data");
            var id = data.id;
            $invokeWebService_2("~WebService_ZhengZhang.delZhengShu", { id: id }, function () {
                $.jBox.tip("删除中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "delZhengShu", id: id });
        }
        return true;
    }
    ZZZS.Search_XiangMu = function () {
        var value = $.trim($("#txtSerXiangMu").val());
        if (value == "") {
            alert("搜索内容为空，请填值再搜索。");
            value = null;
        }
        ZZZS.where_HeTong = value;
        callListXiangMu(value);

    }

    //#endregion
    //#region 生成json
    function createJson() {
        var jsonArray = [];
        jsonArray.push({ itemId: "zzzs_FullName", type: "text", title: "姓名" });
        jsonArray.push({ itemId: "zzzs_ZhengShu", type: "textSelect", title: "证书名称", init: [] });
        jsonArray.push({ itemId: "zzzs_Num", type: "text", title: "证书数量" });
        jsonArray.push({ itemId: "zzzs_LeiXing", type: "select", title: "证书类型", init: [{ id: "z", title: "Z" }, { id: "f", title: "F"}] });
        jsonArray.push({ itemId: "zzzs_BeiZhu", isOtherCol: true, type: "ntext", title: "备注" });
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

        ZZZS.pd.currentPageNumber = page_index;
        ZZZS.pd.pageSize = pageSize;

        $invokeWebService_2("~WebService_ZhengZhang.filterZhengShu", { pageClass: ZZZS.pd, where: ZZZS.where_HeTong },
       function () {
           //$("#divContent").html(loading);
       }, successCallBack, errorCallBack, null, { userContent: "filterZhengShu" });
    }
    //绑定列表后绑定样式或事件
    function tableAddStyle() {
        $("#" + ZZZS.divContent).find("tr[class*='header']").addClass("bgHeader");
        $("#" + ZZZS.divContent).find("tr[class*='row']:odd").addClass("bg1");
        $("#" + ZZZS.divContent).find("tr[class*='row']").bind("mouseover", {}, function () {
            $(this).addClass("mouseover");
        })
        $("#" + ZZZS.divContent).find("tr[class*='row']").bind("mouseout", {}, function () {
            $(this).removeClass("mouseover");
        })
    }
    //添加企业负责人组和监理组的数据
    //#endregion
    window.ZZZS = ZZZS;
})()

$(function () {
    new ZZZS("divPageSize_QQ", "divContent_QQ");
})
