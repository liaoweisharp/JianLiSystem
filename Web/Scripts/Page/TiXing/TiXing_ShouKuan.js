(function () {
    TXSK.initDataDom = function (id) {
        TXSK.pageSize = 10000; //*
        TXSK.title = "收款提醒"; //*
        TXSK.selDay = "7"; //*默认选中哪个时间段

        TXSK.divId = id;
        TXSK.loading = "<p><center><img src='../Images/ajax-loader_b.gif'/></center></p>";
        //这里先生成外围框框，再调用WebService生成Table
        TXSK.contentId = randomStringFun(3);
        TXSK.pageDivId = TXSK.contentId + "_page";

        var str = TXSK.getSummaryDiv(TXSK.contentId, TXSK.pageDivId);
        var $div = $("#" + TXSK.divId);
        $div.html(str);
        //默认选中select
        $div.find("select").val(TXSK.selDay);
        //绑定事件
        $div.find("select").bind("change", {}, TXSK.callList);
        //开始调用
        TXSK.callList()

        //$invokeWebService_2("~WebService_XiangMuJieSuan.getInitData", {}, null, successCallBack, errorCallBack, null, { userContent: "getInitData" });
    }

    //var requireColumn = ["qq_GongChengMingCheng", "qq_XiangMuLaiYuan", "qq_ZhiXingLeiXing", "qq_HeTongHao", "qq_ShiJian"];
    function TXSK(id) {


        TXSK.initDataDom(id);
    }
    TXSK.callList = function () {
        var $div = $("#" + TXSK.divId);
        var selValue = $div.find("select").val();

        $invokeWebService_2("~WebService_TiXing.tiXing_Count", { where_days: selValue }, function () {
            $("#" + TXSK.contentId).html(TXSK.loading);
        }, successCallBack, errorCallBack, null, { userContent: "tiXing_Count" });


    }
    function successCallBack(result, context) {

        if (context.userContent == "tiXing_Count") {
            var optInit = getOptionsFromForm();
            $("#" + TXSK.contentId).pagination(result, optInit);
            $("#" + TXSK.pageDivId).show();
        }

        else if (context.userContent == "tingXing_Filter") {
            var data = result;
            //baseData["xiangMuHouQi"] = data;
            //#region 日期转换成日期格式
            //var jsons = createJson().findAll("validate", "datetime");

            //conventObjsToDateTime(data, jsons);
            //#endregion
            if (data.length == 0) {
                $("#" + TXSK.contentId).html("没有到期的提醒！");
            }
            else {
                var str = getHTML(data);
                $("#" + TXSK.contentId).html(str);
                $("#" + TXSK.contentId).find(".divRow").hover(function () { $(this).addClass("mouseover") }, function () { $(this).removeClass("mouseover") });
                tableAddStyle();
                $("#" + TXSK.contentId).find("[type='money']").numeral(); //给金额加格式
                
                
            }

        }

    }
    function errorCallBack(result, context) {

    }

    //#region 句柄


    //#endregion
    //#region HTML
    TXSK.getSummaryDiv = function (contentId, pageDivId) {
        var str = [];
        str.push("<div class='header'>");
        str.push("<ul>");
        str.push(String.format("<li class='li1'>{0}</li>", TXSK.title));
        str.push("<li class='li2'>");
        str.push("最近：<select>");
        str.push(String.format("<option value='{0}'>{1}</option>", 7, "一周"));
        str.push(String.format("<option value='{0}'>{1}</option>", 14, "两周"));
        str.push(String.format("<option value='{0}'>{1}</option>", 31, "一个月"));
        str.push(String.format("<option value='{0}'>{1}</option>", 61, "两个月"));
        str.push("</select>");
        str.push("</li>")
        str.push("<li class='li3'></li>");
        str.push("<ul>");
        str.push("</div>");
        str.push(String.format("<div id='{0}' class='content' ></div>", contentId));
        str.push(String.format("<div id='{0}' class='pageDive' ></div>", pageDivId));
        return str.join("");
    }

    
    function getHTML(datas) {
        var str = [];
        var noStrNoData = "<font style='color:gray;'>(未知)</font>"

        for (var i = 0; i < datas.length; i++) {
            var item = datas[i];
            if (item.jh_ShouKuanRiQi) {
                var jh_ShouKuanRiQi = strToDate(item.jh_ShouKuanRiQi);
                var diffDay = daysDiff(jh_ShouKuanRiQi, new Date());
                jh_ShouKuanRiQi = jh_ShouKuanRiQi.pattern("yyyy-MM-dd");
                jh_ShouKuanRiQi = "<font style='color:green;'>" + jh_ShouKuanRiQi + "</font>";
                diffDay = "<font style='color:green;'>" + diffDay + "</font>";

            }
            else {
                diffDay = "";
                jh_ShouKuanRiQi = noStrNoData;
            }
            var faHan = "";
            if (item.jh_IsFaHan != null) {
                if (item.jh_IsFaHan) {
                    faHan = "<font style='color:green'>已发函</font>"; 
                }
                else {
                    faHan = "<font style='color:orange'>未发函</font>";
                }
            }
            else {
                faHan = "<font style='color:gray'>(未知发函)</font>"; ;
            }
            var jinE = "<font style='color:green;'>" + item.jh_ShouKuanJinE + "</font>";
            str.push("<div class='divRow'>");
            str.push(String.format("{0}. ", i + 1));
            str.push(String.format("距今还有:{0}天", diffDay));
            str.push(String.format(".将于{0}到期", jh_ShouKuanRiQi));
            str.push(String.format(".合同号：{0}<img src='../Images/mouse.png' title='合同名称：{1}'>", item.qq_HeTongHao, item.ht_MingCheng));
            str.push(String.format(".{0}", faHan));
            str.push(String.format(".应收金额：{0}万元", jinE));
            str.push("</div>")

        }


        return str.join("");
    }
    //#endregion
    //#region 生成json




    //#endregion
    //#region 其他

    function getOptionsFromForm() {
        var opt = { callback: pageselectCallback, items_per_page: TXSK.pageSize, next_text: "下页", num_display_entries: TXSK.pageSize, num_edge_entries: 2, prev_text: "上页" };
        var htmlspecialchars = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }
        $.each(htmlspecialchars, function (k, v) {
            opt.prev_text = opt.prev_text.replace(k, v);
            opt.next_text = opt.next_text.replace(k, v);
        })
        return opt;
    }
    TXSK.page_index = 0;
    function pageselectCallback(page_index, jq) {

        TXSK.page_index = page_index;
        var $div = $("#" + TXSK.divId);
        var selValue = $div.find("select").val();
        $invokeWebService_2("~WebService_TiXing.tingXing_Filter", { currentPage: page_index + 1, pageSize: TXSK.pageSize, where_days: selValue },
       function () {
           $("#" + TXSK.contentId).html(TXSK.loading);
       }, successCallBack, errorCallBack, null, { userContent: "tingXing_Filter" });
    }
    //绑定列表后绑定样式或事件
    function tableAddStyle() {
        $("#" + TXSK.contentId).find("tr[class*='header']").addClass("bgHeader");
        $("#" + TXSK.contentId).find("tr[class*='row']:odd").addClass("bg1");
        $("#" + TXSK.contentId).find("tr[class*='row']").bind("mouseover", {}, function () {
            $(this).addClass("mouseover");
        })
        $("#" + TXSK.contentId).find("tr[class*='row']").bind("mouseout", {}, function () {
            $(this).removeClass("mouseover");
        })
        $("#" + TXSK.contentId).find("td").find("label[validate='money']").formatCurrency();
        debugger
        
    }
    //#endregion
    window.TXSK = TXSK;
})()