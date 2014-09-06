
(function () {
    function HTTJ() { }
    HTTJ.where = {};
    HTTJ.colums = [];
    HTTJ.CallWhere = function () {
        HTTJ.initData();
        HTTJ.reLoadData();
        $invokeWebService_2("~WebService_HeTong.getInitData", {}, null, successCallBack, errorCallBack, null, "getInitData");
    }
    HTTJ.reLoadData = function () {
        $invokeWebService_2("~WebService_HeTong_TongJi.getHeTongExtend", { queryWhereHT: HTTJ.where }, function () { $("#divHeTong").html(loading); }, successCallBack, errorCallBack, null, "getHeTongExtend");
    }
    HTTJ.initData = function () {
        HTTJ.colums = ["ht_MingCheng", "zanJianLiFeiZongE", "yingShouKuanZongE", "yiShouKuanZongE", "leJiYiKaiPiaoZongE", "jiHuaShouKuanZongE", "shiShouZongE", "yuE"];
        requireColNameToDiv()
        baseData = {};
        $(".allDiv").show();
    }
    function successCallBack(result, context) {
        if (context == "getHeTongExtend") {

            var datas = result;
            var requireColuArr = [];
            var jsonArray = requireColumns();
            for (var i = 0; i < HTTJ.colums.length; i++) {
                var id = HTTJ.colums[i];
                requireColuArr.push(jsonArray.firstOrDefault("id", id));
            }
            var str = getHtml(datas, requireColuArr);
            $("#divHeTong").html(str);
            tableAddStyle();
        }
        else if (context == "getInitData") {
            baseData["工程地点"] = result[1];
            baseData["获取方式"] = result[2];
            baseData["合同付款方式"] = result[3];
            baseData["合同签订状态"] = result[4];
            baseData["合同执行部门"] = result[5];
            baseData["投资性质"] = result[6];
            baseData["项目分类"] = result[7];
            baseData["业务类型"] = result[8];
            baseData["变更方式"] = result[9];
            baseData["变更监理费类型"] = result[10];
            baseData["发票款项性质"] = result[11];
            baseData["归档情况"] = result[12];
            baseData["工程进度"] = result[13];
            baseData["收费方式"] = result[14];
            baseData["合同金额说明"] = result[15];
        }
    }
    function errorCallBack(result, context) {

    }
    //#region 句柄
    HTTJ.click_Filter = function () {

        HTTJ.reLoadData(HTTJ.where);
    }
    HTTJ.clickWhere = function () {
        var option = { type: "update", filter: "1", data: {} };
        //jBox options
        var optionJbox = { title: "选择筛选条件", width: 850, buttons: { "确认": "1", "取消": "0" }, showClose: false, submit: _clickComfirmWhere };
        var jsonArray = createJson();

        var bindObj = new bind(jsonArray, HTTJ.where, option, optionJbox);
    }
    HTTJ.clickShowCols = function () {
        var columns = new Col(requireColumns(), HTTJ.colums, _clickComfirmCols);
    }
    HTTJ.clickZhiXing=function(htId, htMingCheng) {
        window.HTWarpper = null;
        $invokeWebService_2("~WebService_HeTong_TongJi.getHeTongWrapperById", { id: htId }, null, function (result) {
            window.HTWarpper = result;
            clickZhiXing(htId);
        }, errorCallBack, null, "");
    }
    function _clickComfirmWhere(v, h, f) {

        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();
            HTTJ.where = bind.jsonToObject(jsonArray);
            var jsonArr = createJson();
            var str = "";

            for (var item in HTTJ.where) {
                if (HTTJ.where[item] != null) {
                    var json = jsonArr.firstOrDefault("itemId", item);

                    str += "&nbsp;&nbsp;" + json.title;
                }
            }
            $("#divWhere").html(str);
        }
        return true;
    }
    function _clickComfirmCols(v, h, f) {
        HTTJ.colums = Col.ShouJi(h);

        requireColNameToDiv();
    }
    //#endregion
    //#region html
    function getHtml(datas, requireCols) {
        var str = []
        str.push("<table class='tj_table' cellspacing='0' cellpadding='4'>");
        str.push("<tr class='tj_header'>");
        str.push(String.format("<td>{0}</td>", "编号"));
        for (var i = 0; i < requireCols.length; i++) {
            var class1 = ""
            if (requireCols[i].name == "合同名称") {
                class1 = "td_MingCheng";
            }
            str.push(String.format("<td class='{1}'>{0}</td>", requireCols[i].name, class1));
        }
        str.push(String.format("<td>{0}</td>", "变更及收款"));
        str.push("</tr>");
        for (var i = 0; i < datas.length; i++) {
            str.push("<tr class='row'>");
            conventToDateTime(datas[i], requireCols);
            str.push(String.format("<td><a href='javascript:void(0);' onclick=\"clickDetail({1})\">{0}</a></td>", datas[i].htHao, datas[i].ht_Id));
            for (j = 0; j < requireCols.length; j++) {
                var value = datas[i][requireCols[j].id] == null ? "" : datas[i][requireCols[j].id];
                if ((value != null && value != "" && requireCols[j].validate) || (requireCols[j].validate && requireCols[j].validate == "money")) {
                    var validate = requireCols[j].validate;
                    if (validate == "money") {
                        if (requireCols[j].validatechild) {
                            value = "<label validate='money' validatechild='" + requireCols[j].validatechild + "'>" + value + "</label>";
                        }
                        else {
                            value = "<label validate='money' validatechild=''>" + value + "</label>";
                        }
                    }
                }
                str.push(String.format("<td>{0}</td>", value));
            }
            str.push(String.format("<td><a href='javascript:void(0);' onclick=\"HTTJ.clickZhiXing({1},'{2}')\">{0}</a></td>", "变更及收款", datas[i].ht_Id, datas[i].ht_MingCheng));
            str.push("</tr>")
        }
        str.push("<tr class='rowBottom'>");
        str.push(String.format("<td>{0}</td>", "合计"));
        for (j = 0; j < requireCols.length; j++) {
            var value = "";

            if (requireCols[j].validate && requireCols[j].validate == "money") {
                if (requireCols[j].validatechild) {
                    value = "<label validate='money' validatechild='" + requireCols[j].validatechild + "'>" + datas.sum(requireCols[j].id); +"</label>";
                }
                else {
                    value = "<label validate='money' validatechild=''>" + datas.sum(requireCols[j].id); +"</label>";
                }
            }
            str.push(String.format("<td>{0}</td>", value));
        }
        str.push(String.format("<td></td>"));
        str.push("</tr>")
        str.push("</table>");
        return str.join("");
    }
    //#endregion
    function requireColumns() {

        var arr = [];
        //arr.push({ id: "ht_Number", name: "合同号" });
        arr.push({ id: "ht_MingCheng", name: "合同名称" });
        arr.push({ id: "zt_Name", name: "签订状态" });
        arr.push({ id: "fs_Name", name: "项目来源" });
        arr.push({ id: "qq_ShiJian", name: "项目时间", validate: "datetime" });
        arr.push({ id: "zanJianLiFeiZongE", name: "暂定监理费总额(万元)", validate: "money" });
        arr.push({ id: "yingShouKuanZongE", name: "应收款总额(万元)", validate: "money" });
        arr.push({ id: "yiShouKuanZongE", name: "已收款总额(万元)", validate: "money" });
        arr.push({ id: "leJiYiKaiPiaoZongE", name: "已开票总额(万元)", validate: "money" });
        arr.push({ id: "yuE", name: "余额(万元)", validate: "money" });
        arr.push({ id: "htv_LvYueYingTuiHuanRiQi", name: "履约保证金应退还时间", validate: "datetime" });
        arr.push({ id: "htv_LvYueYingTuiZongE", name: "履约保证金应退总额(万元)", validate: "money" });
        arr.push({ id: "htv_ZhiBaoJinTuiHuanShiJian", name: "质保金应退时间", validate: "datetime" });
        arr.push({ id: "htv_ZhiBaoJinYingTuiZongE", name: "质保金应退总额（万元）", validate: "money" });
        arr.push({ id: "gd_Name", name: "竣工资料归档" });
        arr.push({ id: "jiHuaShouKuanZongE", name: " 计划收款总额(万元)", validate: "money" });
        arr.push({ id: "shiShouZongE", name: "实收总额(万元)", validate: "money" });
        arr.push({ id: "dd_Name", name: "工程地点" });
        arr.push({ id: "fk_Name", name: "付款方式" });
        arr.push({ id: "xz_Name", name: "投资性质" });
        arr.push({ id: "fl_Name", name: "项目分类" });
        arr.push({ id: "lx_Name", name: "业务类型" });
        arr.push({ id: "bm_Name", name: "执行部门" });
        //        arr.push({ id: "", name: "项目分类" });
        //        arr.push({ id: "", name: "项目分类" });
        //        arr.push({ id: "", name: "项目分类" });
        //        arr.push({ id: "", name: "项目分类" });
        //        arr.push({ id: "", name: "项目分类" });
        //        arr.push({ id: "", name: "项目分类" });
        //        arr.push({ id: "", name: "项目分类" });
        //        arr.push({ id: "", name: "项目分类" });
        //        arr.push({ id: "", name: "项目分类" });
        //        arr.push({ id: "", name: "项目分类" });
        //        arr.push({ id: "", name: "项目分类" });
        //        arr.push({ id: "", name: "项目分类" });
        return arr;
    }
    function createJson() {
        var str = [];
        str.push({ itemId: "zhiXingLeiXing", type: "select", title: "执行类型", init: getInit(baseData["合同执行部门"], "bm_") });
        str.push({ itemId: "fs_Name", type: "select", title: "项目来源", init: getInit(baseData["获取方式"], "fs_") });
        str.push({ itemId: "dd_Name", type: "select", title: "工程地点", init: getInit(baseData["工程地点"], "dd_") });
        str.push({ itemId: "fk_Name", type: "select", title: "付款方式", init: getInit(baseData["合同付款方式"], "fk_") });
        //str.push({ itemId: "zt_Name",type:"select", title: "签订状态",init: getInit(baseData["工程地点"],"fs_")});
        str.push({ itemId: "xz_Name", type: "select", title: "投资性质", init: getInit(baseData["投资性质"], "xz_") });
        str.push({ itemId: "fl_Name", type: "select", title: "项目分类", init: getInit(baseData["项目分类"], "fl_") });
        str.push({ itemId: "lx_Name", type: "select", title: "业务类型", init: getInit(baseData["业务类型"], "lx_") });
        //str.push({ itemId: "bm_Name", type: "select", title: "执行部门", init: getInit(baseData["合同执行部门"], "bm_") });
        str.push({ itemId: "qq_ShiJian_Start", type: "text", title: "项目时间", validate: "datetime" });
        str.push({ itemId: "qq_ShiJian_End", type: "text", title: "项目时间", validate: "datetime", parentId: "qq_ShiJian_Start" });

        str.push({ itemId: "ht_MingCheng", type: "text", title: "合同名称关键字" });
        str.push({ itemId: "ht_Number", type: "text", title: "合同号" });
        str.push({ itemId: "ht_YeZhuMingCheng", type: "text", title: "业主名称关键字" });
        str.push({ itemId: "ht_YiFangQianYueDanWei", type: "text", title: "乙方签约单位关键字" });
        str.push({ itemId: "ht_QianYueRiQi_Start", type: "text", title: "合同签约日期", validate: "datetime" });
        str.push({ itemId: "ht_QianYueRiQi_End", type: "text", title: "合同签约日期", validate: "datetime", parentId: "ht_QianYueRiQi_Start" });
        return str;
    }

    //#endregion

    //#region 其他
    //显示的列写到Div里
    function requireColNameToDiv() {
        var jsonArray = requireColumns();
        var titles = [];
        for (var i = 0; i < HTTJ.colums.length; i++) {
            var id = HTTJ.colums[i];
            var json = jsonArray.firstOrDefault("id", id);
            titles.push(json.name);
        }
        $("#divCol").html(titles.join(", "));
    }
    function tableAddStyle() {
        $(".tj_table").find("tr[class*='row']:odd").addClass("bg1");
        $(".tj_table").find("tr[class*='row']").bind("mouseover", {}, function () {
            $(this).addClass("mouseover");
        })
        $(".tj_table").find("tr[class*='row']").bind("mouseout", {}, function () {
            $(this).removeClass("mouseover");
        })
        $(".tj_table").find("td").find("label[validate='money']").formatCurrency()
        .css("float", "right");
    }
    //把obj属性是时间转化成日期字符串
    function conventToDateTime(obj, jsonArray) {
        var datetimes = jsonArray.findAll("validate", "datetime");
        for (var i = 0; i < datetimes.length; i++) {
            if (obj && obj[datetimes[i].id]) {
                obj[datetimes[i].id] = strToDate(obj[datetimes[i].id]).pattern("yyyy-MM-dd");
            }
        }
    }
    //#endregion
    window.HTTJ = HTTJ;
})();
