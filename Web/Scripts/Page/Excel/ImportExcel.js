(function () {
    function Excel() {
        Excel.initDataDom();
    }
    Excel.initDataDom = function () {
        pageSize = 1;
        pageSize_ZhengSHu = 20;
        Excel.pd = {};
        Excel.pdZS = {};
        baseData = {};
        loading = "<p><center><img src='../Images/ajax-loader_b.gif'/></center></p>";
        loading_small = "<center><img src='../Images/ajax-loader_m.gif'/></center>";
        $invokeWebService_2("~WebService_ExportExcel.getInitData", {}, null, successCallBack, errorCallBack, null, { userContent: "getInitData" });
        Excel.initDom();
    }
    Excel.initDom = function () {
        $("select").bind("change", {}, function () {
            _changeSelect(this);
        })
        $("#txtName").bind("change", {}, function () {
            if ($.trim($(this).val()) != "") {
                $(this).addClass("yellow");
            }
            else {
                $(this).removeClass("yellow");
            }
        })
    }

    function successCallBack(result, context) {
        if (context.userContent == "getInitData") {

            baseData["企业"] = result[0];
            baseData["证书"] = result[1];
            baseData["企业"].each(function (item) {
                $("#ddl_Company").append(String.format("<option value='{0}'>{1}</option>", item.ec_ID, item.ec_Name))
            })

            $(".item_zhengshu").each(function (index) {
                var $ddl = $(this);
                baseData["证书"].each(function (zhengShu) {
                    $ddl.append(String.format("<option value='{0}'>{1}</option>", zhengShu.ezs_ID, zhengShu.ezs_Name));
                })
            })
            .bind("change", {}, Excel.change_ZhengShu);
            $("#btnQuery").trigger("click");//默认点击查询
        }
        else if (context.userContent == "countFilter") {
            var optInit = getOptionsFromForm();
            $("#divPageSize").pagination(result, optInit);
            $("#divPageSize").show();
        }
        else if (context.userContent == "getFilter") {
            var datas = result;
            var str = "";
            if (datas.length == 0) {
                str = noResult;
                $("#divContent").html(str);
            }
            else {
                str = Excel.htmlOfUserZhuanYe(datas);

                $("#divContent").html(str).rowspan(0).rowspan(1);
            }

        }
        else if (context.userContent == "countFilter_ForZhengShu") {
            var optInit = getOptionsFromForm_ZhengShu();
            $("#divPageSize_ZhengShu").pagination(result, optInit);
            $("#divPageSize_ZhengShu").show();
        }
        else if (context.userContent == "getFilter_ForZhengShu") {

            $div = $("#divZhengShu");
            if (result.length == 3) {
                var str = Excel.htmlOfUserZhengShu(result[0], result[1]);
                $div.html(str);
                //初始化
                var numOfZhengShu = result[2];
                numOfZhengShu.each(function (item) {
                    var companyId = item.companyId;
                    var zhengShuId = item.zhengShuId;
                    var num = item.numberOfZhengShu; //证书数量
                    $div.find("[item=" + companyId + "_" + zhengShuId + "]")
                    .html(num)
                    .addClass("numP")
                })
                //初始化样式
                $div.find("tr[class='row']").each(function () {

                    $(this).hover(function () {
                        $(this).addClass("mouseover");
                    }, function () {
                        $(this).removeClass("mouseover");
                    })
                })
            }
            else {
                var str = noResult;
                $div.html(str);
            }


        }
    }
    var noResult = "<div class='noResult'>没有找到符合条件的结果！</div>";
    function errorCallBack(result, context) {

    }
    Excel.change_ZhengShu = function (event) {

        var $parent = $(this).parent().next();
        var selectedId = $(this).val();
        if (selectedId == "-1") {
            $parent.html("");
        }
        else {
            var zhengShu = baseData["证书"].firstOrDefault("ezs_ID", selectedId);
            if (zhengShu == null) return;
            if (zhengShu.ezs_HaveZhuanYe) {
                $parent.html(loading_small);
                $invokeWebService_2("~WebService_ExportExcel.getZhuanYeByZhengShuId", { zhengShuId: selectedId }, null,
                function (result) {
                    var str = [];
                    str.push("<select class='item_zhuanYe'><option value='-1'>所有专业</option>");
                    for (var i = 0; i < result.length; i++) {
                        var name = result[i];
                        str.push(String.format("<option value='{0}'>{0}</option>", name));
                    }
                    str.push("</select>");
                    $parent.html(str.join(""));
                    $parent.find("select").each(function (index) {
                        $(this).bind("change", {}, function () {
                            _changeSelect(this);
                        })
                    })
                }, errorCallBack, null, { userContent: "getZhuanYeByZhengShuId" });

            }
            else {
                $parent.html("");
            }
        }
    }
    Excel.click_Query = function () {
        var keyValues = []; //证书和专业
        var ddlCompany = $("#ddl_Company").val();
        ddlCompany = ddlCompany == "-1" ? null : ddlCompany; //企业
        var txtName = $("#txtName").val();
        txtName = $.trim(txtName) == "" ? null : $.trim(txtName); //用户名
        $(".whereItem").each(function (index) {
            var zhengShuId = $(this).find(".item_zhengshu").first().val();
            if (zhengShuId != "-1") {
                //选择过证书
                var obj = { "key": zhengShuId };
                var $zhuanYe = $(this).find(".item_zhuanYe");
                if ($zhuanYe.length == 1) {
                    var zhuanYeId = $zhuanYe.val();
                    if (zhuanYeId != "-1") {
                        obj["value"] = zhuanYeId;
                    }
                }
                keyValues.push(obj);
            }
        })
        window.where = { companyId: ddlCompany, userName: txtName, zhengShuArr: keyValues };

        if ($("#ck_ZhengShu").is(":checked") == false && $("#ck_RenYuan").is(":checked") == false) {
            $.jBox.warning("\"公司-证书\" 或 \"公司-人员\" 至少选择一个。", "", function () { }, { buttons: { "知道了": "1"} });

        }

        if ($("#ck_ZhengShu").is(":checked")) {
            $invokeWebService_2("~WebService_ExportExcel.countFilter_ForZhengShu", window.where, function () { $("#divZhengShu").html(loading); }, successCallBack, errorCallBack, null, { userContent: "countFilter_ForZhengShu" });
            $("#div_ZhengShu").show();
        }
        else {
            $("#divZhengShu").html("");
            $("#div_ZhengShu").hide();
        }
        if ($("#ck_RenYuan").is(":checked")) {
            $invokeWebService_2("~WebService_ExportExcel.countFilter", window.where, function () { $("#divContent").html(loading); }, successCallBack, errorCallBack, null, { userContent: "countFilter" });
            $("#divPerson").show();
        }
        else {
            $("#divContent").html("");
            $("#divPerson").hide();
        }
    }
    Excel.ExportExcel_ZhengShu = function () {

        var companyId = window.where.companyId ? window.where.companyId : "";
        var userName = window.where.userName ? window.where.userName : "";

        var zhuanYeArr = [];
        var split = "#"; //证书和专业间的分隔符
        window.where.zhengShuArr.each(function (item) {
            if (item.value) {
                var _zy = item.value;
            }
            else {
                var _zy = ""; //没有专业则默认设置为"";
            }
            var str = item.key;
            str += split + _zy;
            zhuanYeArr.push(str);
        })
        var zhuanYe = zhuanYeArr.join(";"); //证书与证书间用;分号分隔；
        var url = "ExportZhengShu.aspx?companyid=" + companyId + "&username=" + userName + "&zhengshu=" + zhuanYe;
        openNewWindow(url);
    }
    Excel.ExportExcel_RenYuan = function () {

        var companyId = window.where.companyId ? window.where.companyId : "";
        var userName = window.where.userName ? window.where.userName : "";

        var zhuanYeArr = [];
        var split = "#"; //证书和专业间的分隔符
        window.where.zhengShuArr.each(function (item) {
            if (item.value) {
                var _zy = item.value;
            }
            else {
                var _zy = ""; //没有专业则默认设置为"";
            }
            var str = item.key;
            str += split + _zy;
            zhuanYeArr.push(str);
        })
        var zhuanYe = zhuanYeArr.join(";"); //证书与证书间用;分号分隔；
        var url = "ExportRenYuan.aspx?companyid=" + companyId + "&username=" + userName + "&zhengshu=" + zhuanYe;
        openNewWindow(url);
    }
    //#region HTML
    Excel.htmlOfUserZhuanYe = function (datas) {
        var str = [];
        str.push("<table class='table' cellpadding='5'>");
        str.push("<tr class='header'>");
        str.push(String.format("<td class='td1'>{0}</td>", "企业(更新日期)"));

        str.push(String.format("<td class='td2'>{0}</td>", "姓名"));
        str.push(String.format("<td class='td3'>{0}</td>", "证书"));
        str.push(String.format("<td class='td4'>{0}</td>", "专业"));
        str.push("</tr>");
        for (var i = 0; i < datas.length; i++) {
            var item = datas[i];
            var companyName = item.companyName; //企业名称
            var companyUpdateDate = item.companyUpdateDate;
            var companyId = item.companyId;
            var userName = item.userName; //人名
            var zhengShuMing = item.zhengShuMing; //证书
            var zhengShuId = item.zhengShuId;
            var zhuanYe = item.zhuanYe == null ? "" : item.zhuanYe; //专业
            str.push("<tr class='row'>");
            str.push(String.format("<td class='td1' cpid='{1}'>{0}<font class='gray'>({2})</font></td>", companyName, companyId, companyUpdateDate));

            str.push(String.format("<td class='td2' cpid='{1}'>{0}</td>", userName, companyId));
            str.push(String.format("<td class='td3' zhengshuid='{1}'>{0}</td>", zhengShuMing, zhengShuId));
            str.push(String.format("<td class='td4'>{0}</td>", zhuanYe));
            str.push("</tr>");
        }
        str.push("</table>");
        return str.join("");
    }
    Excel.htmlOfUserZhengShu = function (zhengShuArr, companyArr) {
        var str = [];
        str.push("<table  class='table' cellpadding='5'>");
        str.push("<tr class='header'>")
        str.push("<td class='gray mid' style='width:20px;'></td>")
        str.push("<td class='td1'>企业(更新日期)</td>");
        zhengShuArr.each(function (item) {
            var name = item.ezs_Name;
            str.push(String.format("<td>{0}</td>", name));
        })
        str.push("</tr>");
        var baseNum = Math.round(Excel.pdZS.currentPageNumber * Excel.pdZS.pageSize, 0);
        for (var i = 0; i < companyArr.length; i++) {
            var companyId = companyArr[i].ec_ID;
            var companyName = companyArr[i].ec_Name;
            var companyUpdateDate = companyArr[i].ec_Date == null ? "" : strToDate(companyArr[i].ec_Date).pattern("yyyy-MM-dd");
            str.push("<tr class='row'>");
            str.push(String.format("<td class='gray mid'>{0}</td>", baseNum + i + 1));
            str.push(String.format("<td>{0} <font class='gray'>({1})</font></td>", companyName, companyUpdateDate));
            for (var j = 0; j < zhengShuArr.length; j++) {
                var zhengShuId = zhengShuArr[j].ezs_ID;
                var zhengShuName = zhengShuArr[j].ezs_Name;
                str.push(String.format("<td item='{0}'><font style='color:gray;'>0</font></td>", companyId + "_" + zhengShuId)); //企业id+证书id来定位
            }
            str.push("</tr>");
        }
        str.push("<tr class='header'>");
        str.push("<td class='gray mid' style='width:20px;'></td>")
        str.push("<td class='td1'>企业(更新日期)</td>");
        zhengShuArr.each(function (item) {
            var name = item.ezs_Name;
            str.push(String.format("<td>{0}</td>", name));
        })
        str.push("</tr>");
        str.push("</table>");
        return str.join("");
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
    function getOptionsFromForm_ZhengShu() {

        var opt = { callback: pageselectCallback_ZhengShu, items_per_page: pageSize_ZhengSHu, next_text: "下页", num_display_entries: pageSize, num_edge_entries: 2, prev_text: "上页" };
        var htmlspecialchars = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }
        $.each(htmlspecialchars, function (k, v) {
            opt.prev_text = opt.prev_text.replace(k, v);
            opt.next_text = opt.next_text.replace(k, v);
        })
        return opt;
    }

    pageselectCallback = function (page_index, jq) {

        Excel.pd.currentPageNumber = page_index;
        Excel.pd.pageSize = pageSize;

        var jsonObjs = $.extend(true, { pc: Excel.pd }, window.where);
        $invokeWebService_2("~WebService_ExportExcel.getFilter", jsonObjs,
       function () {
           $("#divContent").html(loading);
       }, successCallBack, errorCallBack, null, { userContent: "getFilter" });
    }

    pageselectCallback_ZhengShu = function (page_index, jq) {

        Excel.pdZS.currentPageNumber = page_index;
        Excel.pdZS.pageSize = pageSize_ZhengSHu;

        var jsonObjs = $.extend(true, { pc: Excel.pdZS }, window.where);
        $invokeWebService_2("~WebService_ExportExcel.getFilter_ForZhengShu", jsonObjs,
       function () {
           $("#divZhengShu").html(loading);
       }, successCallBack, errorCallBack, null, { userContent: "getFilter_ForZhengShu" });
    }
    function _changeSelect(node) {

        if ($.trim($(node).val()) != "-1") {
            $(node).addClass("yellow");
        }
        else {
            $(node).removeClass("yellow");
        }
    }
    //#endregion
    window.Excel = Excel;
})()
$(function () {
    Excel();
})