//企业负责人前期
(function () {
    baseData = {}
    ZZYZ.pd = {};
    ZZYZ.where_HeTong = null;
    pageSize = 10;
    var requireColumn = ["zzyz_Name", "zzyz_Type", "zzyz_BuMen", "zzyz_XiangMuId", "zzyz_QianZhangDate", "zzyz_BeiZhu"];
    function ZZYZ(divPage, divContent) {

        $("#" + divPage).html(loading);
        $("#" + divContent).html(loading);

        $invokeWebService_2("~WebService_ZhengZhang.getByAllProject", {}, null, successCallBack, errorCallBack, null, { userContent: "getByAllProject" });
        ZZYZ.divPage = divPage;
        ZZYZ.divContent = divContent;
        ZZYZ.baseData = {};
    }
    function callListXiangMu() {

        $invokeWebService_2("~WebService_ZhengZhang.countYinZhang", { pageClass: null, where: ZZYZ.where_HeTong }, null, successCallBack, errorCallBack, null, { userContent: "countYinZhang" });

    }
    function successCallBack(result, context) {
        if (context.userContent == "getByAllProject") {
            baseData["Project"] = result;
            callListXiangMu();
        }
        else if (context.userContent == "countYinZhang") {
            var optInit = getOptionsFromForm();
            $("#" + ZZYZ.divPage).pagination(result, optInit);
            $("#" + ZZYZ.divContent).show();
        }


        else if (context.userContent == "filterYinZhang") {

            var data = result;
            baseData["data"] = data;
            //#region 日期转换成日期格式
            var jsons = createJson().findAll("validate", "datetime");

            conventObjsToDateTime(data, jsons);
            //#endregion
            if (data.length == 0) {
                $("#" + ZZYZ.divContent).html("还没有企业证件外借信息，要添加请点击右上角的\"添加\"按钮");
            }
            else {
                var str = getHtmlOfQianQi(data);
                $("#" + ZZYZ.divContent).html(str);
                tableAddStyle();
            }
        }
        else if (context.userContent == "addYinZhang") {

            if (result) {
                $.jBox.tip('添加成功。', 'success');
                new ZZYZ(ZZYZ.divPage, ZZYZ.divContent);
            }
            else {
                $.jBox.tip('添加失败', 'error', {});
            }
        }
        else if (context.userContent == "updateYinZhang") {
            if (result) {
                $.jBox.tip('更新成功。', 'success');
                pageselectCallback(ZZYZ.pd.currentPageNumber, null);
                HT.pageselectCallback(HT.pd.currentPageNumber, null);
            }
            else {
                $.jBox.tip('更新失败', 'error', {});
            }
        }
        else if (context.userContent == "delYinZhang") {
            if (result) {
                $.jBox.tip('删除成功。', 'success');
                pageselectCallback(ZZYZ.pd.currentPageNumber, null);

            }
            else {
                $.jBox.tip('删除失败', 'error', {});
            }
        }
        else if (context.userContent == "getYinZhangDistinctInfo") {

            var optionType = context.optionType;
            var jsonArray = createJson();
            var json1 = jsonArray.firstOrDefault("itemId", "zzyz_Name");
            var json2 = jsonArray.firstOrDefault("itemId", "zzyz_BuMen");
            var json3 = jsonArray.firstOrDefault("itemId", "zzyz_Type");
            json1.init = result[0];
            json2.init = result[1];
            json3.init = result[2];
            if (optionType == "add") {

                var option = { type: "new", align: "y" };
                //jBox options
                var optionJbox = { title: "添加", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: _clickAdd };
                ZZYZ.bindObj = new bind(jsonArray, null, option, optionJbox);
            }
            else if (optionType == "update") {
                var id = context.id;
                var option = { type: "update", align: "y" };
                //jBox options
                var optionJbox = { title: "编辑", width: 850, buttons: { "更新": "1", "取消": "0" }, submit: _clickEdit };
                var obj = baseData["data"].firstOrDefault("zzyz_Id", id);
                if (obj) {
                    ZZYZ.bindObj = new bind(jsonArray, obj, option, optionJbox);
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
                str.push(String.format("<td class='num'>{0}</td>", ZZYZ.pd.currentPageNumber * ZZYZ.pd.pageSize + 1 + j));
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

                str.push(String.format("<td class='td7'><span class='opation'><a href='javascript:void(0);' onclick=\"ZZYZ.clickDetail({0})\">详细</a>  <a href='javascript:void(0);' onclick=\"ZZYZ.clickEdit({0})\">编辑</a>|<a href='javascript:void(0);' onclick=\"ZZYZ.clickDel({0})\">删除</a></span></td>", qianQi[j].zzyz_Id));

                str.push("</tr>");
            }


           


            str.push("</table>");
        }
        return str.join("");
    }


    //#endregion
    //#region 句柄
    ZZYZ.clickAdd = function (id) {
        $invokeWebService_2("~WebService_ZhengZhang.getYinZhangDistinctInfo", {}, null, successCallBack, errorCallBack, null, { userContent: "getYinZhangDistinctInfo", id: id, optionType: "add" });

        //                var jsonArray = createJson();
        //                var option = { type: "new", align: "y" };
        //                //jBox options
        //                var optionJbox = { title: "添加", width: 850, buttons: { "添加": "1", "取消": "0" },align: "y", submit: _clickAdd };
        //                ZZYZ.bindObj = new bind(jsonArray, null, option, optionJbox);
        //                //这里添加个性化界面

    }
    ZZYZ.clickEdit = function (id) {
        $invokeWebService_2("~WebService_ZhengZhang.getYinZhangDistinctInfo", {}, null, successCallBack, errorCallBack, null, { userContent: "getYinZhangDistinctInfo", id: id, optionType: "update" });

        //                var jsonArray = createJson();
        //                var option = { type: "update", align: "y" };
        //                //jBox options
        //                var optionJbox = { title: "编辑外借证件", width: 850, buttons: { "更新": "1", "取消": "0" }, submit: _clickEdit };
        //                var obj = baseData["data"].firstOrDefault("zzyz_Id", id);
        //                if (obj) {
        //                    ZZYZ.bindObj = new bind(jsonArray, obj, option, optionJbox);
        //                }
    }
    ZZYZ.clickDetail = function (id) {
        var option = { type: "review", align: "y" };
        //jBox options
        var optionJbox = { title: "公司证件外借明细", width: 850, buttons: {} };
        var jsonArray = createJson();
        var obj = baseData["data"].firstOrDefault("zzyz_Id", id);
        if (obj) {
            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }
    ZZYZ.clickDel = function (id) {
        var ramdomId = String.randomString(6);
        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>你确定要删除吗？", ramdomId), "确定删除吗？", _clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { id: id });
    }
    function _clickAdd(v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            
            var jsonArray = bindObj.ShouJiData();

            var obj = bind.jsonToObject(jsonArray);

            
            $invokeWebService_2("~WebService_ZhengZhang.addYinZhang", { obj: obj }, function () {
                $.jBox.tip("添加企业证件外借记录，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "addYinZhang" });
        }
        return true;
    }
    function _clickEdit(v, h, f) {
        if (v == "1") {

            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();

            var _newHeTong = bind.jsonToObject(jsonArray);
            _newHeTong["zzyz_Id"] = bindObj.obj.zzyz_Id;


            //var newHeTong = $.extend({}, bindObj.heTong, _newHeTong);
            //delete newHeTong.__type;
            $invokeWebService_2("~WebService_ZhengZhang.updateYinZhang", { obj: _newHeTong }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "updateYinZhang" });
        }
        return true;
    }
    function _clickDel(v, h, f) {
        if (v == "1") {
            var data = h.find("input[type='hidden']").data("data");
            var id = data.id;
            $invokeWebService_2("~WebService_ZhengZhang.delYinZhang", { id: id }, function () {
                $.jBox.tip("删除中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "delYinZhang", id: id });
        }
        return true;
    }
    ZZYZ.Search_XiangMu = function () {
        var value = $.trim($("#txtSerXiangMu").val());
        if (value == "") {
            alert("搜索内容为空，请填值再搜索。");
            value = null;
        }
        ZZYZ.where_HeTong = value;
        callListXiangMu(value);

    }

    //#endregion
    //#region 生成json
    function createJson() {
        var jsonArray = [];
        jsonArray.push({ itemId: "zzyz_Name", type: "textSelect", title: "印章名称", init: [] });
        jsonArray.push({ itemId: "zzyz_BuMen", type: "textSelect", title: "用章部门", init: [] });
        jsonArray.push({ itemId: "zzyz_XiangMuId", type: "select", title: "工程项目", init: getInit(baseData["Project"]) });
        jsonArray.push({ itemId: "zzyz_ShiYou", type: "ntext", title: "用章事由" });
        jsonArray.push({ itemId: "zzyz_Type", type: "textSelect", title: "用章类型", init: [] });
        jsonArray.push({ itemId: "zzyz_JingBanRen", isOtherCol: true, type: "text", title: "经办人" });
        jsonArray.push({ itemId: "zzyz_JingBanRen_Tel", type: "text", title: "经办人电话" });
        jsonArray.push({ itemId: "zzyz_PiZhunRen", type: "text", title: "批准人" });
        jsonArray.push({ itemId: "zzyz_QianZhangDate", type: "text",validate: "datetime" , title: "签章日期" });
        jsonArray.push({ itemId: "zzyz_BeiZhu", type: "ntext", title: "备注" });

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

        ZZYZ.pd.currentPageNumber = page_index;
        ZZYZ.pd.pageSize = pageSize;

        $invokeWebService_2("~WebService_ZhengZhang.filterYinZhang", { pageClass: ZZYZ.pd, where: ZZYZ.where_HeTong },
       function () {
           //$("#divContent").html(loading);
       }, successCallBack, errorCallBack, null, { userContent: "filterYinZhang" });
    }
    //绑定列表后绑定样式或事件
    function tableAddStyle() {
        $("#" + ZZYZ.divContent).find("tr[class*='header']").addClass("bgHeader");
        $("#" + ZZYZ.divContent).find("tr[class*='row']:odd").addClass("bg1");
        $("#" + ZZYZ.divContent).find("tr[class*='row']").bind("mouseover", {}, function () {
            $(this).addClass("mouseover");
        })
        $("#" + ZZYZ.divContent).find("tr[class*='row']").bind("mouseout", {}, function () {
            $(this).removeClass("mouseover");
        })
    }
    //添加企业负责人组和监理组的数据
    //#endregion
    window.ZZYZ = ZZYZ;
})()

$(function () {
    new ZZYZ("divPageSize_QQ", "divContent_QQ");
})
