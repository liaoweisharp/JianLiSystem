(function () {
    TXHT.initDataDom = function (id) {
        TXHT.pageSize = 10000; //*
        TXHT.title = "劳动合同到期提醒"; //*
        TXHT.selDay = "61"; //*默认选中哪个时间段

        TXHT.divId = id;
        TXHT.loading = "<p><center><img src='../Images/ajax-loader_b.gif'/></center></p>";
        //这里先生成外围框框，再调用WebService生成Table
        TXHT.contentId = randomStringFun(3);
        TXHT.pageDivId = TXHT.contentId + "_page";

        var str = TXHT.getSummaryDiv(TXHT.contentId, TXHT.pageDivId);
        var $div = $("#" + TXHT.divId);
        $div.html(str);
        //默认选中select
        $div.find("select").val(TXHT.selDay);
        //绑定事件
        $div.find("select").bind("change", {}, TXHT.callList);
        //开始调用
        TXHT.callList()

        //$invokeWebService_2("~WebService_XiangMuJieSuan.getInitData", {}, null, successCallBack, errorCallBack, null, { userContent: "getInitData" });
    }

    //var requireColumn = ["qq_GongChengMingCheng", "qq_XiangMuLaiYuan", "qq_ZhiXingLeiXing", "qq_HeTongHao", "qq_ShiJian"];
    function TXHT(id) {


        TXHT.initDataDom(id);
    }
    TXHT.callList = function () {
        var $div = $("#" + TXHT.divId);
        var selValue = $div.find("select").val();

        $invokeWebService_2("~WebService_TiXing.tiXing_HeTong_Count", { where_days: selValue }, function () {
            $("#" + TXHT.contentId).html(TXHT.loading);
        }, successCallBack, errorCallBack, null, { userContent: "tiXing_Count" });


    }
    function successCallBack(result, context) {

        if (context.userContent == "tiXing_Count") {
            var optInit = getOptionsFromForm();
            $("#" + TXHT.contentId).pagination(result, optInit);
            $("#" + TXHT.pageDivId).show();
        }

        else if (context.userContent == "tingXing_Filter") {
            var data = result;
            //baseData["xiangMuHouQi"] = data;
            //#region 日期转换成日期格式

            //#endregion
            if (data.length == 0) {
                $("#" + TXHT.contentId).html("没有到期的提醒！");
            }
            else {
                var str = getHTML(data);
                $("#" + TXHT.contentId).html(str);
                $("#" + TXHT.contentId).find(".divRow").hover(function () { $(this).addClass("mouseover") }, function () { $(this).removeClass("mouseover") });
                tableAddStyle();
                $("#" + TXHT.contentId).find("[type='money']").numeral(); //给金额加格式


            }

        }

    }
    function errorCallBack(result, context) {

    }

    //#region 句柄


    //#endregion
    //#region HTML
    TXHT.getSummaryDiv = function (contentId, pageDivId) {
        var str = [];
        str.push("<div class='header'>");
        str.push("<ul>");
        str.push(String.format("<li class='li1'>{0}</li>", TXHT.title));
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
            jl_LaoDongHeTongJieShuShiJian = strToDate(item.jl_LaoDongHeTongJieShuShiJian);
            var diffDay = daysDiff(jl_LaoDongHeTongJieShuShiJian, new Date())+1;
            var name = "<font style='color:green;'>" + item.jl_Name + "</font>";
            var diffDay = "<font style='color:green;'>" + diffDay + "</font>";
            var riqi = "<font style='color:green;'>" + jl_LaoDongHeTongJieShuShiJian.pattern("yyyy-MM-dd") + "</font>";
            str.push("<div class='divRow'>");
            str.push(String.format("{0}. ", i + 1));
            str.push(String.format("员工：{0}", name));
            str.push(String.format(". 劳动合同将在：{0}天后", diffDay));
            str.push(String.format(",于：{0}到期", riqi));

            str.push("</div>")

        }


        return str.join("");
    }
    //#endregion
    //#region 生成json




    //#endregion
    //#region 其他

    function getOptionsFromForm() {
        var opt = { callback: pageselectCallback, items_per_page: TXHT.pageSize, next_text: "下页", num_display_entries: TXHT.pageSize, num_edge_entries: 2, prev_text: "上页" };
        var htmlspecialchars = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }
        $.each(htmlspecialchars, function (k, v) {
            opt.prev_text = opt.prev_text.replace(k, v);
            opt.next_text = opt.next_text.replace(k, v);
        })
        return opt;
    }
    TXHT.page_index = 0;
    function pageselectCallback(page_index, jq) {

        TXHT.page_index = page_index;
        var $div = $("#" + TXHT.divId);
        var selValue = $div.find("select").val();
        $invokeWebService_2("~WebService_TiXing.tingXing_HeTong_Filter", { currentPage: page_index + 1, pageSize: TXHT.pageSize, where_days: selValue },
       function () {
           $("#" + TXHT.contentId).html(TXHT.loading);
       }, successCallBack, errorCallBack, null, { userContent: "tingXing_Filter" });
    }
    //绑定列表后绑定样式或事件
    function tableAddStyle() {
        $("#" + TXHT.contentId).find("tr[class*='header']").addClass("bgHeader");
        $("#" + TXHT.contentId).find("tr[class*='row']:odd").addClass("bg1");
        $("#" + TXHT.contentId).find("tr[class*='row']").bind("mouseover", {}, function () {
            $(this).addClass("mouseover");
        })
        $("#" + TXHT.contentId).find("tr[class*='row']").bind("mouseout", {}, function () {
            $(this).removeClass("mouseover");
        })
        $("#" + TXHT.contentId).find("td").find("label[validate='money']").formatCurrency();
        

    }
    //#endregion
    window.TXHT = TXHT;
})()