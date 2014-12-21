(function () {
    SYB.initDataDom = function () {
        pageSize = 10;
        baseData = {};
        loading = "<p><center><img src='../Images/ajax-loader_b.gif'/></center></p>";
        bindDom();
        SYB.callList()

        //$invokeWebService_2("~WebService_XiangMuJieSuan.getInitData", {}, null, successCallBack, errorCallBack, null, { userContent: "getInitData" });
    }
    SYB.pd = {};
    SYB.pd.filters = [];
    SYB.where = null;
    //var requireColumn = ["qq_GongChengMingCheng", "qq_XiangMuLaiYuan", "qq_ZhiXingLeiXing", "qq_HeTongHao", "qq_ShiJian"];
    function SYB(divPage, divContent) {

        $("#" + divPage).html(loading);
        $("#" + divContent).html(loading);
        SYB.initDataDom();

        SYB.divPage = divPage;
        SYB.divContent = divContent;
    }
    SYB.callList = function () {

        var ddlValue = $("#ddlJiSuan_ShiYeBu").val();

        if (ddlValue != "-1") {
            var obj = SYB.pd.filters.firstOrDefault("key", "jieSuanZhuangTai");
            if (obj != null) {
                obj.value = ddlValue;
            }
            else {
                SYB.pd.filters.push({ "key": "jieSuanZhuangTai", "value": ddlValue })
            }
        }
        else {
            SYB.pd.filters.removeFirst("key", "jieSuanZhuangTai");
        }

        SYB.where = $.trim($("#txtSerXiangMu_ShiYeBu").val());
        

        $invokeWebService_2("~WebService_XiangMuJieSuan.countJS_ShiYeBu", { pageClass: SYB.pd, where: SYB.where }, function () {
            $("#" + SYB.divContent).html(loading);
        }, successCallBack, errorCallBack, null, { userContent: "countJS_ShiYeBu" });
    }
    function successCallBack(result, context) {
        if (context.userContent == "getInitData") {

            baseData["人员"] = result[0];

            baseData["工程级别"] = result[1];
            baseData["工程类别"] = result[2];
        }
        else if (context.userContent == "countJS_ShiYeBu") {
            var optInit = getOptionsFromForm();
            $("#" + SYB.divPage).pagination(result, optInit);
            $("#" + SYB.divContent).show();
        }
        else if (context.userContent == "getXiangMu_JieSuanNeiRongById") {
            var obj = result;
            var id1 = context.id;
            var type = context.type;
            var projectId = context.projectId;
            var jsonsArray = createJson();
            conventToDateTime(obj, jsonsArray);

            if (type == "update") {

                new bindDiv(jsonsArray, obj, id1, { type: "update", align: "y", id: projectId }, _clickUpdate);

            }
            else if (type == "review") {
                new bindDiv(jsonsArray, obj, id1, { type: "review", align: "y" }, null);
            }
        }
        else if (context.userContent == "filterAllXiangMuJiSuan_ShiYeBu") {
            var data = result;
            //baseData["xiangMuHouQi"] = data;
            //#region 日期转换成日期格式
            //var jsons = createJson().findAll("validate", "datetime");

            //conventObjsToDateTime(data, jsons);
            //#endregion
            if (data.length == 0) {
                $("#" + SYB.divContent).html("没有匹配的记录");
            }
            else {
                var str = getHtmlOfHouQi(data);
                $("#" + SYB.divContent).html(str);
                $("#" + SYB.divContent).rowspan(0).rowspan(1)
                tableAddStyle();
            }

        }
        else if (context.userContent == "updateXiangMu_JieSuanNeiRong") {
            if (result) {
                $.jBox.tip('更新成功。', 'success');
                //pageselectCallback(SYB.pd.currentPageNumber, null);
                //HT.pageselectCallback(HT.pd.currentPageNumber, null);
            }
            else {
                $.jBox.tip('更新失败', 'error', {});
            }
        }
    }
    function errorCallBack(result, context) {

    }

    //#region 句柄
    SYB.click_Edit = function (id, Name) {

        var _id = String.randomString(6);
        var id1 = String.randomString(6);
        var id2 = String.randomString(6);

        var html = getTabsHtml2(id, _id, id1, id2, "update");
        $.jBox(html, { title: Name, buttons: {}, width: 900, top: '3%' });
        $("#" + id1).html(loading);

        $("#" + _id).tabs();
        $invokeWebService_2("~WebService_XiangMuJieSuan.getXiangMu_JieSuanNeiRongById", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "getXiangMu_JieSuanNeiRongById", id: id1, projectId: id, type: "update" });

        new JSMX(id, "update");
    }
    SYB.click_Detail = function (id, Name) {
        var _id = String.randomString(6);
        var id1 = String.randomString(6);
        var id2 = String.randomString(6);

        var html = getTabsHtml2(id, _id, id1, id2, "review");
        $.jBox(html, { title: Name, buttons: { "关闭": "0" }, width: 900, top: '3%' });
        $("#" + id1).html(loading);

        $("#" + _id).tabs();

        $invokeWebService_2("~WebService_XiangMuJieSuan.getXiangMu_JieSuanNeiRongById", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "getXiangMu_JieSuanNeiRongById", id: id1, type: "review" });
        new JSMX(id, "review");

    }
    function _clickUpdate(event) {


        var jsonArray = event.data.newBind.ShouJiData();
        var obj = bind.jsonToObject(jsonArray);
        if (event.data.obj) {
            obj["jsnr_Id"] = event.data.obj.jsnr_Id;
            $invokeWebService_2("~WebService_XiangMuJieSuan.updateXiangMu_JieSuanNeiRong", { obj: obj }, null, successCallBack, errorCallBack, null, { userContent: "updateXiangMu_JieSuanNeiRong" });
        }
        else {
            obj["jsnr_Id"] = event.data.newBind.options.id;
            $invokeWebService_2("~WebService_XiangMuJieSuan.saveXiangMu_JieSuanNeiRong", { obj: obj }, null, successCallBack, errorCallBack, null, { userContent: "updateXiangMu_JieSuanNeiRong" });
        }


    }

    SYB.Search_XiangMu_ShiYeBu = function () {

        SYB.callList();

    }

    //#endregion
    //#region HTML
    function getTabsHtml2(projectId, id, id1, id2, type) {
        var str = [];
        str.push(String.format("<div id='{0}' class='tabsP'>", id));
        str.push("<ul>");
        str.push(String.format("<li><a href='#{0}'>结算内容</a></li>", id1));
        str.push(String.format("<li><a href='#{0}'>结算明细</a></li>", id2));

        str.push("</ul>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id1));
        str.push("</div>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id2));
        str.push(_getContent(projectId, "jieSuanMingXi", type));

        str.push("</div>");

        str.push("</div>");
        return str.join("");
    }
    function _getContent(projectId, content, type) {

        var str = [];
        str.push("<div class='ZX_BG_header ZX_h'>");
        str.push("<ul class='ulnone'>");
        if (content == "jieSuanMingXi") {
            str.push("<li class='ZX_title'>结算明细</li>");
            if (type == "update") {
                str.push(String.format("<li id='{1}' class='bg_A hid' style='float:right;'><a href='javascript:void(0);' onclick=\"JSMX.Add('{0}')\" >结算</a></li>", projectId, JSMX.Prefix + "_Add"));
            }
        }

        str.push("</ul>");
        str.push("<br/>");
        str.push("</div>");

        if (content == "jieSuanMingXi") {
            str.push(String.format("<div id='{0}' class='ZX_con h480'>{1}", JSMX.Prefix + projectId, loading));
        }

        str.push("</div>");
        return str.join("");
    }
    function getHtmlOfHouQi(houQi) {
        var str = [];

        if (houQi.length > 0) {
            str.push("<table class='tb_List QQ tbShiYeBu' cellspacing='1' cellpadding='3'>");
            str.push("<tr class='header'>");
      
            str.push(String.format("<td>{0}</td>", "项目部"));
            str.push(String.format("<td>{0}</td>", "项目监理机构"));
            str.push(String.format("<td>{0}</td>", "工程名称"));
            str.push(String.format("<td>{0}</td>", "合同号"));
            str.push(String.format("<td>{0}</td>", "业主名称"));
            str.push(String.format("<td>{0}</td>", "项目负责人"));
            str.push(String.format("<td>{0}</td>", "暂定监理费总额"));
            str.push(String.format("<td>{0}</td>", "实收款总额"));
            str.push(String.format("<td>{0}</td>", "已结算总额"));
            str.push(String.format("<td>{0}</td>", "未结算总额"));
            str.push(String.format("<td>{0}</td>", "实收管理费总额"));
            str.push("<td class='td7'>操作</td>");
            str.push("</tr>");
            //表内容

            for (var j = 0; j < houQi.length; j++) {
                var obj = houQi[j];
                var xiangMuBuMenMingCheng = obj.zuName == null ? "" : obj.zuName; //项目部
                var jianLiZuMingCheng = obj.jiGouName == null ? "" : obj.jiGouName; //监理分组名称
                var jianLiJiGouId = obj.jiGouId == null ? randomStringFun(3) : obj.jiGouId;
                var xiangMuBuId = obj.zuId == null ? randomStringFun(3) : obj.zuId;
                str.push("<tr class='row'>");
                //   str.push(String.format("<td class='num'>{0}</td>", SYB.pd.currentPageNumber * SYB.pd.pageSize + 1 + j));
                str.push(String.format("<td><font xiangmubilid='{0}'>{1}</font></td>", xiangMuBuId, xiangMuBuMenMingCheng));
                str.push(String.format("<td><font jianlijigouid='{0}'>{1}</font></td>", jianLiJiGouId, jianLiZuMingCheng));
                str.push(String.format("<td><a href='javascript:void(0);' onclick=\"SYB.click_Detail({1},'{0}')\">{0}</a></td>", obj.gongChengMingCheng, obj.id));

                str.push(String.format("<td>{0}</td>", obj.heTongHao == null ? "" : obj.heTongHao));
                str.push(String.format("<td>{0}</td>", obj.yeZhuMingCheng == null ? "" : obj.yeZhuMingCheng));
                str.push(String.format("<td>{0}</td>", obj.xiangMuFuZeRen == null ? "" : obj.xiangMuFuZeRen));
                str.push(String.format("<td class='rig'>{0}</td>", obj.zanDingJianLiFeiZongE == null ? "" : "<label validate='money'>" + obj.zanDingJianLiFeiZongE + "</label>"));
                str.push(String.format("<td class='rig'>{0}</td>", obj.shiShouKuanZongE == null ? "" : "<label validate='money'>" + obj.shiShouKuanZongE + "</label>"));
                str.push(String.format("<td class='rig'>{0}</td>", obj.yiJieSuanZongE == null ? "" : "<label validate='money' >" + obj.yiJieSuanZongE + "</label>"));
                str.push(String.format("<td class='rig'>{0}</td>", obj.weiJieSuanZongE == null ? "" : "<label validate='money' >" + obj.weiJieSuanZongE + "</label>"));
                str.push(String.format("<td class='rig'>{0}</td>", obj.shiShouGuanLiFeiZongE == null ? "" : "<label validate='money' >" + obj.shiShouGuanLiFeiZongE + "</label>"));
                str.push(String.format("<td class='td7'><span class='opation'><a class='hid' href='javascript:void(0);' onclick=\"SYB.clickDetail({0})\">详细</a>  <a href='javascript:void(0);' onclick=\"SYB.click_Edit({0},'{1}')\">编辑</a></span></td>", obj.id, obj.gongChengMingCheng));
                str.push("</tr>");
            }
            str.push("</table>");
        }
        return str.join("");
    }
    //#endregion
    //#region 生成json
    function createJson() {
        var jsonArray = [];
        jsonArray.push({ itemId: "jsnr_XiangMuFuZeRen", type: "text", title: "项目负责人" });
        jsonArray.push({ itemId: "jsnr_LianXiDianHua", type: "text", title: "联系电话" });
        jsonArray.push({ itemId: "jsnr_DiZhi", type: "text", title: "地址" });
        jsonArray.push({ itemId: "jsnr_YouBian", type: "text", title: "邮编" });
        jsonArray.push({ itemId: "jsnr_XieYiBianHao", isOtherCol: true, type: "text", title: "协议编号" });
        jsonArray.push({ itemId: "jsnr_XieYiNeiRong", type: "ntext", title: "协议内容" });
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

        SYB.pd.currentPageNumber = page_index;
        SYB.pd.pageSize = pageSize;

        $invokeWebService_2("~WebService_XiangMuJieSuan.filterAllXiangMuJiSuan_ShiYeBu", { pageClass: SYB.pd, where: SYB.where },
       function () {
           $("#" + SYB.divContent).html(loading);
       }, successCallBack, errorCallBack, null, { userContent: "filterAllXiangMuJiSuan_ShiYeBu" });
    }
    //绑定列表后绑定样式或事件
    function tableAddStyle() {
        $("#" + SYB.divContent).find("tr[class*='header']").addClass("bgHeader");
        $("#" + SYB.divContent).find("tr[class*='row']:odd").addClass("bg1");
//        $("#" + SYB.divContent).find("tr[class*='row']").bind("mouseover", {}, function () {
//            $(this).addClass("mouseover");
//        })
//        $("#" + SYB.divContent).find("tr[class*='row']").bind("mouseout", {}, function () {
//            $(this).removeClass("mouseover");
//        })
        $("#" + SYB.divContent).find("td").find("label[validate='money']").formatCurrency();
    }
    //绑定Dom
    function bindDom() {
        var $ddl = $("#ddlJiSuan_ShiYeBu");
        for (var i = 0; i < const_JieSuanInit.length; i++) {
            var item = const_JieSuanInit[i];
            var $option = $(String.format("<option value='{0}'>{1}</option>", item.id, item.title));
            $ddl.append($option);
        }
    }
    //#endregion
    window.SYB = SYB;
})()