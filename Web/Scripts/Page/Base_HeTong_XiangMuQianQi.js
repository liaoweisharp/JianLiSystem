//项目前期
(function () {
    XMQQ.pd = {};
    XMQQ.where_HeTong = null;
    pageSize = 10;
    var requireColumn = ["qq_GongChengMingCheng", "qq_XiangMuLaiYuan", "qq_ZhiXingLeiXing", "qq_HeTongHao", "qq_ShiJian"];
    function XMQQ(divPage, divContent) {

        $("#" + divPage).html(loading);
        $("#" + divContent).html(loading);
        callListXiangMu();

        XMQQ.divPage = divPage;
        XMQQ.divContent = divContent;
        XMQQ.baseData = {};
    }
    function callListXiangMu() {
        $invokeWebService_2("~WebService_HeTong.countQianQi", { pageClass: null, where: XMQQ.where_HeTong }, null, successCallBack, errorCallBack, null, { userContent: "countQianQi" });
        $invokeWebService_2("~WebService_HeTong.getXiangMuZu", {}, null, successCallBack, errorCallBack, null, { userContent: "getXiangMuZu" });
    }
    function successCallBack(result, context) {
        if (context.userContent == "countQianQi") {
            var optInit = getOptionsFromForm();
            $("#" + XMQQ.divPage).pagination(result, optInit);
            $("#" + XMQQ.divContent).show();
        }
        else if (context.userContent == "getXiangMuZu") {
            XMQQ.baseData["项目组"] = result;
        }
        else if (context.userContent == "getAllJianLiZuByXiangMuZuId") {

            XMQQ.baseData["监理组"] = result;
            $("#td_JianLiZu").html(getHtmlOfDDL(XMQQ.baseData["监理组"], "2"));
            if (context.jianLiZuId) {
                $("#ddl_JianLiJiGou").val(context.jianLiZuId); //如果是新建的监理组，则默认选中。（如果是项目组改变触发的事件则不用选中）
            }
            else if (XMQQ.bindObj && XMQQ.bindObj.obj && XMQQ.bindObj.obj.qq_ParentId) {
                $("#ddl_JianLiJiGou").val(XMQQ.bindObj.obj.qq_ParentId);
            }
        }
        else if (context.userContent == "addXiangMuZu") {
            var data = result;
            if (data != null) {

                XMQQ.baseData["项目组"].push({ key: data.xmz_Id, value: data.xmz_Name });

                var str = getHtmlOfDDL(XMQQ.baseData["项目组"], "1");
                $("#td_XiangMuZu").html(str);
                var id = data.xmz_Id;
                $("#ddl_XiangMuZu").val(id)
                .trigger("change");
            }
        }
        else if (context.userContent == "addJianLiZu") {
            if (result) {
                var xiangMuZuId = context.xiangMuZuId;
                $invokeWebService_2("~WebService_HeTong.getAllJianLiZuByXiangMuZuId", { xiangMuZuId: xiangMuZuId }, function () {
                    $("#td_JianLiZu").html(loading_small);
                }, successCallBack, errorCallBack, null, { userContent: "getAllJianLiZuByXiangMuZuId", jianLiZuId: result.qq_Id });
            }
        }
        else if (context.userContent == "filterAllXiangMuQianQi") {

            var data = result;
            baseData["xiangMuQianQi"] = data;
            //#region 日期转换成日期格式
            var jsons = createJson().findAll("validate", "datetime");

            conventObjsToDateTime(data, jsons);
            //#endregion
            if (data.length == 0) {
                $("#" + XMQQ.divContent).html("还没有项目前期记录，要添加一个合同请点击右上角的\"添加\"按钮");
            }
            else {
                var str = getHtmlOfQianQi(data);
                $("#" + XMQQ.divContent).html(str);
                tableAddStyle();
            }
        }
        else if (context.userContent == "addXiangMuQianQi") {
            //重新加载
            if (result) {
                $.jBox.tip('添加成功。', 'success');
                new XMQQ(XMQQ.divPage, XMQQ.divContent);
            }
            else {
                $.jBox.tip('添加失败', 'error', {});
            }
        }
        else if (context.userContent == "updateXiangMuQianQi") {
            if (result == 1) {
                $.jBox.tip('更新成功。', 'success');
                pageselectCallback(XMQQ.pd.currentPageNumber, null);
                HT.pageselectCallback(HT.pd.currentPageNumber, null);
            }
            else {
                $.jBox.tip('更新失败', 'error', {});
            }
        }
        else if (context.userContent == "delXiangMuQianQi") {
            if (result == 1) {
                $.jBox.tip('删除成功。', 'success');
                pageselectCallback(XMQQ.pd.currentPageNumber, null);

            }
            else {
                $.jBox.tip('删除失败', 'error', {});
            }
        }
        else if (context.userContent == "getHeTongInfo") {
            var type = context.type;
            var jsonArray = createJson();
            var leiXing = jsonArray.firstOrDefault("itemId", "qq_ZhiXingLeiXing");
            leiXing.init.addRange(result); //名字字符串赋值
            if (type == "new") {
                var option = { type: "new" };
                //jBox options
                var optionJbox = { title: "添加项目", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: _clickAdd };


                var bindObj = new bind(jsonArray, null, option, optionJbox);
            }
            else if (type == "update") {
                var id = context.id;
                var option = { type: "update" };
                //jBox options
                var optionJbox = { title: "编辑项目", width: 850, buttons: { "更新": "1", "取消": "0" }, submit: _clickEdit };

                var obj = baseData["xiangMuQianQi"].firstOrDefault("qq_Id", id);
                if (obj) {
                    var bindObj = new bind(jsonArray, obj, option, optionJbox);
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
            str.push("<table class='tb_List QQ' cellspacing='1' cellpadding='2'>");
            str.push("<tr class='header'>");
            str.push(String.format("<td class='num'>#</td>"));
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

            str.push("<td class='td6'>签订状态</td>");
            str.push("<td class='td7'>操作</td>");
            str.push("</tr>");
            //表内容

            for (var j = 0; j < qianQi.length; j++) {
                str.push("<tr class='row'>");
                str.push(String.format("<td class='num'>{0}</td>", XMQQ.pd.currentPageNumber * XMQQ.pd.pageSize + 1 + j));
                for (var i = 0; i < jsonArray.length; i++) {
                    var json = jsonArray[i];
                    if (requireColumn.contains(json.itemId)) {
                        var value = qianQi[j][json.itemId];
                        value = value == null ? "" : value;
                        if (json.type == "select" && value != "") {
                            value = json.init.firstOrDefault("id", value).title;
                        }
                        str.push(String.format("<td>{0}</td>", value));
                    }
                }
                var zhuangTai = "";
                var lei = "";
                if (!qianQi[j].haveHeTong) {
                    zhuangTai = "未签订";
                    lei = "wq";
                }
                else {
                    zhuangTai = String.format("已签订");
                    lei = "yq";
                }
                str.push(String.format("<td class='td6 {1}'>{0}</td>", zhuangTai, lei));

                str.push(String.format("<td class='td7'><span class='opation'><a class='hid' href='javascript:void(0);' onclick=\"XMQQ.clickDetail({0})\">详细</a>  <a href='javascript:void(0);' onclick=\"XMQQ.clickEdit({0})\">编辑</a>|<a href='javascript:void(0);' onclick=\"XMQQ.clickDel({0})\">删除</a></span></td>", qianQi[j].qq_Id));

                str.push("</tr>");
            }


            str.push("</table>");
        }
        return str.join("");
    }
    function getHtmlOfDDL(datas, type) {
        var str = [];
        if (type == "1") {
            str.push("<select style='width:370px' id='ddl_XiangMuZu' onchange=\"XMQQ.XiangMuZuChange(this)\">");
            str.push("<option value='no'></option>");
            str.push("<option value='new'>...新建一个项目组（项目部/事业部）</option>");
        }
        else if (type == "2") {
            str.push("<select  style='width:370px'  id='ddl_JianLiJiGou'  onchange=\"XMQQ.JianLiZuChange(this)\">");
            str.push("<option value='no'></option>");
            str.push("<option value='new'>...新建一个监理机构</option>");
        }
        for (var i = 0; i < datas.length; i++) {
            var item = datas[i];
            str.push(String.format("<option value='{0}'>{1}</option>", item.key, item.value));
        }
        str.push("</select>");
        return str.join("");
    }
    function htmlZu() {
        var str = [];
        str.push("<div class='cl'>");
        str.push("<table class='tbComm mr20' cellpadding='5' style=' margin:10px auto;'>");
        str.push("<tr>");
        str.push("<td class='td1' style='width:180px'>所属项目组（项目部/事业部）</td>");
        str.push(String.format("<td  id='td_XiangMuZu' class='td2' style='width:400px;'>{0}</td>", getHtmlOfDDL(XMQQ.baseData["项目组"], "1")));
        str.push("</tr>");
        str.push("<tr>");
        str.push("<td class='td1' style='width:180px'>所属监理机构</td>");
        str.push("<td class='td2' id='td_JianLiZu' style='width:400px;'></td>");
        str.push("</tr>");
        str.push("</table>");
        str.push("</div>");
        return str.join("");
    }
    //#endregion
    //#region 句柄
    XMQQ.clickAdd = function (id) {
        // $invokeWebService_2("~WebService_HeTong.getNameArray", {}, null, successCallBack, errorCallBack, null, { userContent: "getHeTongInfo", type: "new" });
        var jsonArray = createJson();
        var option = { type: "new" };
        //jBox options
        var optionJbox = { title: "添加项目", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: _clickAdd };
        XMQQ.bindObj = new bind(jsonArray, null, option, optionJbox);
        //这里添加个性化界面
        var str = htmlZu();
        $("#" + XMQQ.bindObj.parentId).parent().append(str);
    }
    XMQQ.clickEdit = function (id) {

        var jsonArray = createJson();
        var leiXing = jsonArray.firstOrDefault("itemId", "qq_ZhiXingLeiXing");
        var option = { type: "update" };
        //jBox options
        var optionJbox = { title: "编辑项目", width: 850, buttons: { "更新": "1", "取消": "0" }, submit: _clickEdit };

        var obj = baseData["xiangMuQianQi"].firstOrDefault("qq_Id", id);
        if (obj) {
            XMQQ.bindObj = new bind(jsonArray, obj, option, optionJbox);
            var str = htmlZu();

            $("#" + XMQQ.bindObj.parentId).parent().append(str);
            if (obj.qq_XiangMuZhuId != null) {
                $("#ddl_XiangMuZu").val(obj.qq_XiangMuZhuId);
                $("#ddl_XiangMuZu").trigger("change");
            }
        }

    }
    XMQQ.clickDetail = function (id) {
        var option = { type: "review" };
        //jBox options
        var optionJbox = { title: "项目", width: 850, buttons: {} };
        var jsonArray = createJson();
        var obj = baseData["xiangMuQianQi"].firstOrDefault("qq_Id", id);
        if (obj) {
            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }
    XMQQ.clickDel = function (id) {
        var ramdomId = String.randomString(6);
        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>删除项目前期，对应的<span style='color:red;'>合同信息</span>也会一起删除。<br/>你确定要删除这个项目吗？", ramdomId), "确定删除吗？", _clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { id: id });
    }
    function _clickAdd(v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();
            var obj = bind.jsonToObject(jsonArray);
            XMQQ.shouJiShuJu(obj); //添加项目组和监理组的数据
            ;
            $invokeWebService_2("~WebService_HeTong.addXiangMuQianQi", { obj: obj }, function () {
                $.jBox.tip("添加新项目，请稍后...", 'loading');
            }, successCallBack, errorCallBack, function () {
                $.jBox.tip('完成。', 'success');
            }, { userContent: "addXiangMuQianQi" });
        }
        return true;
    }
    function _clickEdit(v, h, f) {
        if (v == "1") {

            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();

            var _newHeTong = bind.jsonToObject(jsonArray);
            _newHeTong["qq_Id"] = bindObj.obj.qq_Id;
            XMQQ.shouJiShuJu(_newHeTong);

            //var newHeTong = $.extend({}, bindObj.heTong, _newHeTong);
            //delete newHeTong.__type;
            $invokeWebService_2("~WebService_HeTong.updateXiangMuQianQi", { xiangMuQianQi: _newHeTong }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, function () {
                $.jBox.tip('完成。', 'success');
            }, { userContent: "updateXiangMuQianQi" });
        }
        return true;
    }
    function _clickDel(v, h, f) {
        if (v == "1") {
            var data = h.find("input[type='hidden']").data("data");
            var id = data.id;
            $invokeWebService_2("~WebService_HeTong.delXiangMuQianQi", { id: id }, function () {
                $.jBox.tip("删除中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "delXiangMuQianQi", id: id });
        }
        return true;
    }
    XMQQ.Search_XiangMu = function () {
        var value = $.trim($("#txtSerXiangMu").val());
        if (value == "") {
            alert("搜索内容为空，请填值再搜索。");
            value = null;
        }
        XMQQ.where_HeTong = value;
        callListXiangMu(value);

    }
    XMQQ.XiangMuZuChange = function (ddl) {

        var $ddl = $(ddl);
        var selectedValue = $ddl.val();
        if (selectedValue == "no" || selectedValue == "new") {
            if (selectedValue == "no") {
                $("#td_JianLiZu").children().hide();
            }
            else if (selectedValue == "new") {
                var html = [];
                html.push(String.format("<div style='margin:20px;text-align:center;'>项目组名称：<input id='txt_XiangMuZu' type='text'></div>"));
                $.jBox(html.join(""), { width: 400, title: "添加项目组", buttons: { "添加": "1", "取消": "0" }, submit: XMQQ._addXiangMuZu });
            }
        }
        else {
            $invokeWebService_2("~WebService_HeTong.getAllJianLiZuByXiangMuZuId", { xiangMuZuId: selectedValue }, function () {
                $("#td_JianLiZu").html(loading_small);
            }, successCallBack, errorCallBack, null, { userContent: "getAllJianLiZuByXiangMuZuId" });
        }
    }
    XMQQ.JianLiZuChange = function (ddl) {
        var $ddl = $(ddl);
        var selectedValue = $ddl.val();
        if (selectedValue == "new") {
            var html = [];
            var xiangMuZuId = $("#ddl_XiangMuZu").val();
            var xiangMuZu_Name = $("#ddl_XiangMuZu").find("option:selected").text();
            html.push(String.format("<div style='margin:20px 10px;text-align:center;'>所属项目部：{0}</div>", xiangMuZu_Name));
            html.push(String.format("<div style='margin:20px;text-align:center;'>监理机构名称：<input id='txt_JianLiZu' type='text'></div>"));
            $.jBox(html.join(""), { width: 400, title: "添加监理机构", buttons: { "添加": "1", "取消": "0" }, submit: XMQQ._addJianLiZu });
        }
    }
    XMQQ._addXiangMuZu = function (v, h, f) {
        if (v == "1") {
            var name = $.trim($("#txt_XiangMuZu").val());
            if (name == "") {
                alert("内容不能为空。请重新输入或取消。");
                $("#txt_XiangMuZu").focus();
                return false;
            }
            var obj = { xmz_Name: name };
            $invokeWebService_2("~WebService_HeTong.addXiangMuZu", { obj: obj }, null, successCallBack, errorCallBack, null, { userContent: "addXiangMuZu" });
        }
        return true;
    }
    XMQQ._addJianLiZu = function (v, h, f) {
        if (v == "1") {
            var name = $.trim($("#txt_JianLiZu").val());
            if (name == "") {
                alert("内容不能为空。请重新输入或取消。");
                $("#txt_JinaLiZu").focus();
                return false;
            }
            var xiangMuZuId = $("#ddl_XiangMuZu").val();
            var obj = { qq_GongChengMingCheng: name, qq_LeiXing: 2, qq_XiangMuZhuId: xiangMuZuId };
            $invokeWebService_2("~WebService_HeTong.addJianLiZu", { obj: obj }, null, successCallBack, errorCallBack, null, { userContent: "addJianLiZu", xiangMuZuId: xiangMuZuId });
        }
        return true;
    }
    //#endregion
    //#region 生成json
    function createJson() {
        var jsonArray = [];
        jsonArray.push({ itemId: "qq_GongChengMingCheng", type: "text", title: "工程名称" });
        jsonArray.push({ itemId: "qq_XiangMuLaiYuan", type: "select", title: "项目来源", init: getInit(baseData["获取方式"], "fs_") });

        //jsonArray.push({ itemId: "qq_ZhiXingLeiXing", type: "textSelect", title: "执行类型", init: [] });
        jsonArray.push({ itemId: "qq_ZhiXingLeiXing", type: "select", title: "执行类型", init: getInit(baseData["合同执行部门"], "bm_") });
        jsonArray.push({ itemId: "qq_ShiJian", type: "text", validate: "datetime", title: "日期" });
        jsonArray.push({ itemId: "qq_HeTongHao", type: "text", title: "合同号" });

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

        XMQQ.pd.currentPageNumber = page_index;
        XMQQ.pd.pageSize = pageSize;

        $invokeWebService_2("~WebService_HeTong.filterAllXiangMuQianQi", { pageClass: XMQQ.pd, where: XMQQ.where_HeTong },
       function () {
           //$("#divContent").html(loading);
       }, successCallBack, errorCallBack, null, { userContent: "filterAllXiangMuQianQi" });
    }
    //绑定列表后绑定样式或事件
    function tableAddStyle() {
        $("#" + XMQQ.divContent).find("tr[class*='header']").addClass("bgHeader");
        $("#" + XMQQ.divContent).find("tr[class*='row']:odd").addClass("bg1");
        $("#" + XMQQ.divContent).find("tr[class*='row']").bind("mouseover", {}, function () {
            $(this).addClass("mouseover");
        })
        $("#" + XMQQ.divContent).find("tr[class*='row']").bind("mouseout", {}, function () {
            $(this).removeClass("mouseover");
        })
    }
    //添加项目组和监理组的数据
    XMQQ.shouJiShuJu = function (obj) {
        var xiangMuZuId = $("#ddl_XiangMuZu").val();
        obj.qq_LeiXing = 1; //始终是项目
        if (xiangMuZuId == "no" || xiangMuZuId == "new") {
            obj.qq_XiangMuZhuId = obj.qq_ParentId = null;
        }
        else {
            var jianLiZuId = $("#ddl_JianLiJiGou").val();
            obj.qq_XiangMuZhuId = xiangMuZuId;
            if (jianLiZuId == "no" || jianLiZuId == "new") {
                obj.qq_ParentId = null;
            }
            else {
                obj.qq_ParentId = jianLiZuId;
            }
        }
    }
    window.XMQQ = XMQQ;
})()
//#endregion