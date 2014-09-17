(function () {
    ZGZU.initDataDom = function () {
        pageSize = 20;
        baseData = {};
        loading = "<p><center><img src='../Images/ajax-loader_b.gif'/></center></p>";
        ZGZU.callList()

        //$invokeWebService_2("~WebService_XiangMuJieSuan.getInitData", {}, null, successCallBack, errorCallBack, null, { userContent: "getInitData" });
    }
    ZGZU.pd = {};
    ZGZU.pd.filter={key:"type",value:"zhiGuan"}
    ZGZU.where = null;
    //var requireColumn = ["qq_GongChengMingCheng", "qq_XiangMuLaiYuan", "qq_ZhiXingLeiXing", "qq_HeTongHao", "qq_ShiJian"];
    function ZGZU(divPage, divContent) {

        $("#" + divPage).html(loading);
        $("#" + divContent).html(loading);
        ZGZU.initDataDom();

        ZGZU.divPage = divPage;
        ZGZU.divContent = divContent;
    }
    ZGZU.callList = function () {
        $invokeWebService_2("~WebService_XiangMuJieSuan.countZhiGuan_Zu", { pageClass: ZGZU.pd, where: ZGZU.where }, function () {
            $("#" + ZGZU.divContent).html(loading);
        }, successCallBack, errorCallBack, null, { userContent: "countZhiGuan_Zu" });
    }
    function successCallBack(result, context) {
        if (context.userContent == "getInitData") {


        }
        else if (context.userContent == "countZhiGuan_Zu") {
            var optInit = getOptionsFromForm();
            $("#" + ZGZU.divPage).pagination(result, optInit);
            $("#" + ZGZU.divContent).show();
        }
        else if (context.userContent == "filterAllXiangMuQianQi_ZhiGuan_Zu") {
            var data = result;
            //baseData["xiangMuHouQi"] = data;
            //#region 日期转换成日期格式
            //var jsons = createJson().findAll("validate", "datetime");

            //conventObjsToDateTime(data, jsons);
            //#endregion
            if (data.length == 0) {
                $("#" + ZGZU.divContent).html("还没有项目记录");
                $("#" + ZGZU.divContent).hide();
                $("#" + ZGZU.divPage).hide();
            }
            else {
                var str = getHtmlOfHouQi(data);
                $("#" + ZGZU.divContent).html(str);
                $("#tab_XiangMuZu").rowspan(0).rowspan(1).rowspan(6).rowspan(7).rowspan(8);
                tableAddStyle2();
            }

        }
        else if (context.userContent == "getXiangMu_ZhiGuanById") {
            var obj = result;
            var id1 = context.id1;
            var id2 = context.id2;
            var type = context.type;
            var projectId = context.projectId;
            var jsonsArray_MBGL = createJson_MBGL();
            var jsonsArray_XMJS = createJson_XMJS();
            conventToDateTime(obj, jsonsArray_MBGL);
            conventToDateTime(obj, jsonsArray_XMJS);
            if (type == "update") {

                new bindDiv(jsonsArray_MBGL, obj, id1, { type: "update", align: "y", id: projectId }, _clickUpdate_MBGL);
                new bindDiv(jsonsArray_XMJS, obj, id2, { type: "update", align: "y", id: projectId }, _clickUpdate_XMJS);
            }
            else if (type == "review") {
                new bindDiv(jsonsArray_MBGL, obj, id1, { type: "review", align: "y" }, null);
                new bindDiv(jsonsArray_XMJS, obj, id2, { type: "review", align: "y" }, null);
            }
        }
        else if (context.userContent == "updateXiangMu_ZhiGuan") {
            if (result) {
                $.jBox.tip('更新成功。', 'success');
                //pageselectCallback(ZGZU.pd.currentPageNumber, null);
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
    ZGZU.click_Edit = function (id, Name) {

        var _id = String.randomString(6);
        var id1 = String.randomString(6);
        var id2 = String.randomString(6);
        var id3 = String.randomString(6);
        var id4 = String.randomString(6);
        var id5 = String.randomString(6);
        var id6 = String.randomString(6);
        var id7 = String.randomString(6);
        var id8 = String.randomString(6);

        var html = getTabsHtml2(id, _id, id1, id2, id3, id4, id5, id6, id7, id8, "update");
        $.jBox(html, { title: Name, buttons: {}, width: 900, top: '3%' });
        $("#" + id1).html(loading);
        $("#" + id6).html(loading);
        $("#" + _id).tabs();
        $invokeWebService_2("~WebService_XiangMuJieSuan.getXiangMu_ZhiGuanById", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "getXiangMu_ZhiGuanById", id1: id1, id2: id6, projectId: id, type: "update" });


        new BGYP(id, "update"); //
        new PXJJ(id, "update"); //培训继教
        new JXKH(id, "update"); //绩效考核
        new BX(id, "update"); //报销
        new FYTZ(id, "update"); //费用调整
        new RYXC(id, "review"); //人员薪酬
    }
    ZGZU.click_Detail = function (id, Name) {
        var _id = String.randomString(6);
        var id1 = String.randomString(6);
        var id2 = String.randomString(6);
        var id3 = String.randomString(6);
        var id4 = String.randomString(6);
        var id5 = String.randomString(6);
        var id6 = String.randomString(6);
        var id7 = String.randomString(6);
        var id8 = String.randomString(6);

        var html = getTabsHtml2(id, _id, id1, id2, id3, id4, id5, id6, id7, id8, "review");
        $.jBox(html, { title: Name, buttons: { "关闭": "0" }, width: 900, top: '3%' });
        $("#" + id1).html(loading);
        $("#" + id6).html(loading);

        $("#" + _id).tabs();

        $invokeWebService_2("~WebService_XiangMuJieSuan.getXiangMu_ZhiGuanById", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "getXiangMu_ZhiGuanById", id1: id1, id2: id6, projectId: id, type: "review" });
        new BGYP(id, "review"); //
        new PXJJ(id, "review"); //培训继教
        new JXKH(id, "review"); //绩效考核
        new BX(id, "review"); //报销
        new FYTZ(id, "review"); //费用调整
        new RYXC(id, "review"); //人员薪酬
    }
    function _clickUpdate_MBGL(event) {
        var jsonArray = event.data.newBind.ShouJiData();
        var obj = bind.jsonToObject(jsonArray);
        if (event.data.obj) {
            obj["zg_Id"] = event.data.obj.zg_Id;
            $invokeWebService_2("~WebService_XiangMuJieSuan.updateView_XiangMu_ZhiGuan_MuBiaoGuanLi", { obj: obj }, null, successCallBack, errorCallBack, null, { userContent: "updateXiangMu_ZhiGuan" });
        }
        else {
            obj["zg_Id"] = event.data.newBind.options.id;
            $invokeWebService_2("~WebService_XiangMuJieSuan.saveXiangMu_ZhiGuan", { obj: obj }, null, successCallBack, errorCallBack, null, { userContent: "updateXiangMu_ZhiGuan" });
        }


    }
    function _clickUpdate_XMJS(event) {
        var jsonArray = event.data.newBind.ShouJiData();
        var obj = bind.jsonToObject(jsonArray);
        if (event.data.obj) {
            obj["zg_Id"] = event.data.obj.zg_Id;
            $invokeWebService_2("~WebService_XiangMuJieSuan.updateView_XiangMu_ZhiGuan_JieSuan", { obj: obj }, null, successCallBack, errorCallBack, null, { userContent: "updateXiangMu_ZhiGuan" });
        }
        else {
            obj["zg_Id"] = event.data.newBind.options.id;
            $invokeWebService_2("~WebService_XiangMuJieSuan.saveXiangMu_ZhiGuan", { obj: obj }, null, successCallBack, errorCallBack, null, { userContent: "updateXiangMu_ZhiGuan" });
        }


    }
    ZGZU.Search_XiangMu = function () {
        var value = $.trim($("#txtSerXiangMu").val());
        if (value == "") {
            alert("搜索内容为空，请填值再搜索。");
            value = null;
        }
        ZGZU.where = value;
        ZGZU.callListXiangMu(value);

    }

    //#endregion
    //#region HTML
    function getTabsHtml2(projectId, id, id1, id2, id3, id4, id5, id6, id7, id8, type) {
        var str = [];
        str.push(String.format("<div id='{0}' class='tabsP'>", id));
        str.push("<ul>");
        str.push(String.format("<li><a href='#{0}'>目标管理</a></li>", id1));
        str.push(String.format("<li><a href='#{0}'>办公用品</a></li>", id2));
        str.push(String.format("<li><a href='#{0}'>人员薪酬</a></li>", id3));
        str.push(String.format("<li><a href='#{0}'>培训继教</a></li>", id4));
        str.push(String.format("<li><a href='#{0}'>绩效考核</a></li>", id5));
        str.push(String.format("<li><a href='#{0}'>报销</a></li>", id7));
        str.push(String.format("<li><a href='#{0}'>费用调整</a></li>", id8));
        str.push(String.format("<li><a href='#{0}'>项目结算</a></li>", id6));

        str.push("</ul>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id1));
        str.push("</div>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id2));
        str.push(_getContent(projectId, "banGongYongPin", type));
        str.push("</div>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id3));
        str.push(_getContent(projectId, "renYuanXinChou", type));
        str.push("</div>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id4));
        str.push(_getContent(projectId, "peiXunJiJiao", type));
        str.push("</div>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id5));
        str.push(_getContent(projectId, "jiXiaoKaoHe", type));
        str.push("</div>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id7));
        str.push(_getContent(projectId, "baoXiao", type));
        str.push("</div>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id8));
        str.push(_getContent(projectId, "feiYongTiaoZheng", type));
        str.push("</div>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id6));
        str.push("</div>");

        str.push("</div>");
        return str.join("");
    }
    function _getContent(userId, content, type) {

        var str = [];
        str.push("<div class='ZX_BG_header ZX_h'>");
        str.push("<ul class='ulnone'>");
        if (content == "banGongYongPin") {
            str.push("<li class='ZX_title'>办公用品</li>");
            if (type == "update") {
                str.push(String.format("<li class='bg_A' style='float:right;'><a href='javascript:void(0);' onclick=\"BGYP.Add('{0}')\" >添加</a></li>", userId));
            }
        }
        else if (content == "renYuanXinChou") {
            str.push("<li class='ZX_title'>人员薪酬</li>");
            if (type == "update") {
                // str.push(String.format("<li class='bg_A' style='float:right;'><a href='javascript:void(0);' onclick=\"RYXC.Add('{0}')\" >添加</a></li>", userId));
            }
        }
        else if (content == "peiXunJiJiao") {
            str.push("<li class='ZX_title'>培训继教</li>");
            if (type == "update") {
                str.push(String.format("<li class='bg_A' style='float:right;'><a href='javascript:void(0);' onclick=\"PXJJ.Add('{0}')\" >添加</a></li>", userId));
            }
        }
        else if (content == "jiXiaoKaoHe") {
            str.push("<li class='ZX_title'>绩效考核</li>");
            if (type == "update") {
                str.push(String.format("<li class='bg_A' style='float:right;'><a href='javascript:void(0);' onclick=\"JXKH.Add('{0}')\" >添加</a></li>", userId));
            }
        }
        else if (content == "baoXiao") {
            str.push("<li class='ZX_title'>报销</li>");
            if (type == "update") {
                str.push(String.format("<li class='bg_A' style='float:right;'><a href='javascript:void(0);' onclick=\"BX.Add('{0}')\" >添加</a></li>", userId));
            }
        }
        else if (content == "feiYongTiaoZheng") {
            str.push("<li class='ZX_title'>费用调整</li>");
            if (type == "update") {
                str.push(String.format("<li class='bg_A' style='float:right;'><a href='javascript:void(0);' onclick=\"FYTZ.Add('{0}')\" >添加</a></li>", userId));
            }
        }

        str.push("</ul>");
        str.push("<br/>");
        str.push("</div>");
        if (content == "banGongYongPin") {
            str.push(String.format("<div id='{0}' class='ZX_con h480'>{1}</div>", BGYP.Prefix + userId, loading));
        }
        else if (content == "renYuanXinChou") {
            str.push(String.format("<div id='{0}' class='ZX_con h480'>{1}</div>", RYXC.Prefix + userId, loading));
        }
        else if (content == "peiXunJiJiao") {
            str.push(String.format("<div id='{0}' class='ZX_con h480'>{1}</div>", PXJJ.Prefix + userId, loading));
        }
        else if (content == "jiXiaoKaoHe") {
            str.push(String.format("<div id='{0}' class='ZX_con h480'>{1}</div>", JXKH.Prefix + userId, loading));
        }
        else if (content == "baoXiao") {
            str.push(String.format("<div id='{0}' class='ZX_con h480'>{1}</div>", BX.Prefix + userId, loading));
        }
        else if (content == "feiYongTiaoZheng") {
            str.push(String.format("<div id='{0}' class='ZX_con h480'>{1}</div>", FYTZ.Prefix + userId, loading));
        }



        return str.join("");
    }
    function getHtmlOfHouQi(houQi) {
        var str = [];

        if (houQi.length > 0) {
            str.push("<table id='tab_XiangMuZu' class='tb_List QQ Zu' cellspacing='1' cellpadding='3'>");
            str.push("<tr class='header'>");
            str.push(String.format("<td class='td1'>{0}</td>", "项目部"));
            str.push(String.format("<td class='td2'>{0}</td>", "项目监理机构"));
            str.push(String.format("<td class='td3'>{0}</td>", "工程名称"));
            str.push(String.format("<td class='td4'>{0}</td>", "合同号"));
            //str.push(String.format("<td>{0}</td>", "项目经理"));
            str.push(String.format("<td class='td5'>{0}</td>", "暂定监理费总额"));
            str.push(String.format("<td class='td6'>{0}</td>", "实收款总额"));
            str.push(String.format("<td class='td7'>{0}</td>", "总成本支出"));
            str.push(String.format("<td class='td8'>{0}</td>", "成本控制指标"));
            str.push("<td class='td9'>操作</td>");
            str.push("</tr>");
            //表内容

            for (var j = 0; j < houQi.length; j++) {

                var obj = houQi[j];
                var xiangMuBuMenMingCheng = obj.xiangMuBuMingCheng; //项目部
                var jianLiZuMingCheng = obj.jianLiJiGouMingCheng; //监理分组名称
                var jianLiJiGouId = obj.jianLiJiGouId;
                var xiangMuBuId = obj.xiangMuBuId;
                var projectId = obj.projectId;
                var projectName = obj.projectMingCheng; //项目名称
                var heTongHao = obj.heTongHao;
                var zanDingJianLiFeiZongE = obj.zanDingJianLiFeiZongE; //暂定监理费总额
                var shiShouKuanZongE = obj.shiShouKuanZongE; //实收总额
                var zongChengBenZhiChu = obj.zongChengBenZhiChu == null ? "" : obj.zongChengBenZhiChu;
                var chenBenKongZhiZhiBiao = obj.chenBenKongZhiZhiBiao == null ? "" : obj.chenBenKongZhiZhiBiao;

                str.push("<tr class='row'>");
                str.push(String.format("<td class='td1'><font xiangmubilid='{0}'>{1}</font></td>", xiangMuBuId, xiangMuBuMenMingCheng));
                str.push(String.format("<td class='td2'><font jianlijigouid='{0}'>{1}</font></td>", jianLiJiGouId, jianLiZuMingCheng));
                str.push(String.format("<td class='td3'>{0}</td>", projectName));
                str.push(String.format("<td class='td4'>{0}</td>", heTongHao));
                str.push(String.format("<td class='rig td5'><label  validate='money'>{0}</label></td>", zanDingJianLiFeiZongE));
                str.push(String.format("<td class='rig td6'><label  validate='money'>{0}</label></td>", shiShouKuanZongE));
                str.push(String.format("<td class='rig td7'><label jianLiJiGouId='{1}' validate='money'>{0}</label></td>", zongChengBenZhiChu, jianLiJiGouId));
                str.push(String.format("<td class='rig td8'><label jianLiJiGouId='{1}' validate='money'>{0}</label></td>", chenBenKongZhiZhiBiao, jianLiJiGouId));
                str.push(String.format("<td class='td9'><span jianLiJiGouId='{0}' class=''><a class='hid' href='javascript:void(0);' onclick=\"ZGZU.clickDetail({0})\">详细</a>  <a href='javascript:void(0);' onclick=\"ZGZU.click_Edit({0},'{1}')\">编辑</a></span></td>", jianLiJiGouId, jianLiZuMingCheng));
                str.push("</tr>");
            }
            str.push("</table>");
        }
        return str.join("");
    }
    //#endregion
    //#region 生成json

    function createJson_MBGL() {
        var jsonArray = [];
        jsonArray.push({ itemId: "zg_mb_ChengBenKongZhiZhiBiao", type: "text", validate: "money", title: "成本控制指标（万元）" });
        jsonArray.push({ itemId: "zg_mb_ChengBenKongZhiQiXian", type: "text", title: "成本控制期限" });
        jsonArray.push({ itemId: "zg_mb_YanQi", type: "text", title: "延期" });
        jsonArray.push({ itemId: "zg_mb_BeiZhu", type: "ntext", title: "备注" });
        return jsonArray;
    }
    function createJson_XMJS() {
        var jsonArray = [];
        jsonArray.push({ itemId: "zg_js_ZongChengBenZhiChu", type: "text", validate: "money", title: "总成本支出（万元）" });
        jsonArray.push({ itemId: "zg_js_LeiJiJieYu", type: "text", validate: "money", title: "累计结余（万元）" });
        jsonArray.push({ itemId: "zg_js_ShiLing", type: "text", validate: "money", title: "实领（万元）" });
        jsonArray.push({ itemId: "zg_js_BaoZhengJin", type: "ntext", validate: "money", title: "保证金（万元）" });
        jsonArray.push({ itemId: "zg_js_BaoZhengJinJieSuan", type: "select", title: "保证金结算", init: [{ id: 1, title: "已结" }, { id: 0, title: "未结"}] });
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

        ZGZU.pd.currentPageNumber = page_index;
        ZGZU.pd.pageSize = pageSize;

        $invokeWebService_2("~WebService_XiangMuJieSuan.filterAllXiangMuQianQi_ZhiGuan_Zu", { pageClass: ZGZU.pd, where: ZGZU.where },
       function () {
           //$("#divContent").html(loading);
       }, successCallBack, errorCallBack, null, { userContent: "filterAllXiangMuQianQi_ZhiGuan_Zu" });
    }
    //绑定列表后绑定样式或事件
    function tableAddStyle() {
        $("#" + ZGZU.divContent).find("tr[class*='header']").addClass("bgHeader");
        $("#" + ZGZU.divContent).find("tr[class*='row']:odd").addClass("bg1");
        $("#" + ZGZU.divContent).find("tr[class*='row']").bind("mouseover", {}, function () {
            $(this).addClass("mouseover");
        })
        $("#" + ZGZU.divContent).find("tr[class*='row']").bind("mouseout", {}, function () {
            $(this).removeClass("mouseover");
        })
        $("#" + ZGZU.divContent).find("td").find("label[validate='money']").formatCurrency();
    }
    function tableAddStyle2() {
        $("#" + ZGZU.divContent).find("tr[class*='header']").addClass("bgHeader");
        $("#" + ZGZU.divContent).find("tr[class*='row']:odd").addClass("bg1");

        $("#" + ZGZU.divContent).find("td").find("label[validate='money']").formatCurrency();
    }
    //#endregion
    window.ZGZU = ZGZU;
})()