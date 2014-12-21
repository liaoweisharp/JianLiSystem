(function () {

    function PFM() {
        args = GetUrlParms();
        if (typeof args["ms"] == "undefined") return;
        $invokeWebService_2("~WebService_Report.getMonthSalaryById", { monthSalaryId: args["ms"] }, function () {
        }, successCallBack, errorCallBack, null, { userContent: "getMonthSalaryById" });
        $invokeWebService_2("~WebService_Report.getViewXinagMuForMonthByMonthSalaryId", { monthSalaryId: args["ms"] }, function () {
        }, successCallBack, errorCallBack, null, { userContent: "getViewXinagMuForMonthByMonthSalaryId" });
    }
    PFM.divContent = "content"
    function successCallBack(result, userContext) {
        if (userContext.userContent == "getMonthSalaryById") {
        
            $("#header").html(String.format("{0}年{1}月 项目工资、社商保 一览表", result.ms_Year, result.ms_Month));
        }
        else if (userContext.userContent == "getViewXinagMuForMonthByMonthSalaryId") {
            var data = result;
            $("#loading").hide();
            if (data.length == 0) {
                $("#" + PFM.divContent).html("还没有项目记录");
            }
            else {
                var str = getHtml(data);
                $("#" + PFM.divContent).html(str);
                tableAddStyle();
                $("#xiangMuForMonth").rowspan(0).rowspan(1);
            }
        }
    }
    function errorCallBack(result, userContext) {

    }
    function getHtml(datas) {
        var str = [];
        if (datas.length > 0) {
            str.push("<table id='xiangMuForMonth' class='tb_List QQ coll' cellspacing='0' cellpadding='3'>");
            str.push("<tr class='header'>");

            str.push(String.format("<td>{0}</td>", "项目部"));
            str.push(String.format("<td>{0}</td>", "项目监理机构"));
            str.push(String.format("<td>{0}</td>", "序号"));
            str.push(String.format("<td>{0}</td>", "姓名"));
            str.push(String.format("<td>{0}</td>", "应领工资"));
            str.push(String.format("<td>{0}</td>", "社商保"));
            str.push(String.format("<td>{0}</td>", "小计"));
            str.push("</tr>");
            //表内容
            var _jinE_GeRen = _jinE_GongSi = 0;
            var total = 0;
            for (var j = 0, num = 1; j < datas.length; j++, num++) {
                var currentJianLiJiGouId = datas[j].jianLiJiGouId;

                var obj = datas[j];
                var xiaoJi = 0;
                if (obj.jinE_GeRen != null) {
                    xiaoJi = add(xiaoJi, obj.jinE_GeRen);
                    _jinE_GeRen = add(_jinE_GeRen, obj.jinE_GeRen);
                    _jinE_GeRen = Math_Round(_jinE_GeRen, 2);
                }
                if (obj.jinE_GongSi != null) {
                    xiaoJi = add(xiaoJi, obj.jinE_GongSi);
                    _jinE_GongSi = add(_jinE_GongSi, obj.jinE_GongSi);
                    _jinE_GongSi = Math_Round(_jinE_GongSi, 2);
                }
                xiaoJi = Math_Round(xiaoJi, 2);

                str.push("<tr class='row'>");
                str.push(String.format("<td  style='width:50px'><font xiangMuBu='{1}'>{0}</font></td>", obj.xiangMuBu, obj.xiangMuBuId));
                str.push(String.format("<td  style='width:100px'><font jianlijigou='{1}'>{0}</font></td>", obj.jianLiJiGou, obj.jianLiJiGouId));
                str.push(String.format("<td class='mid' style='width:50px'>{0}</td>", num));
                str.push(String.format("<td class='mid' style='width:70px'>{0}</td>", obj.xingMing));
                str.push(String.format("<td class='rig'  style='width:90px'><label validate='money'>{0}</label></td>", obj.jinE_GeRen));
                str.push(String.format("<td class='rig'  style='width:90px'><label validate='money'>{0}</label></td>", obj.jinE_GongSi));
                str.push(String.format("<td class='rig'  style='width:90px'><label validate='money'>{0}</label></td>", xiaoJi));
                str.push("</tr>");

                if (j == datas.length - 1 || currentJianLiJiGouId != datas[j + 1].jianLiJiGouId) {
                    str.push("<tr class='row'>");
                    str.push(String.format("<td style='width:50px'><font xiangMuBu='{1}'>{0}</font></td>", obj.xiangMuBu, obj.xiangMuBuId));
                    str.push(String.format("<td style='width:100px'><font jianlijigou='{1}'>{0}</font></td>", obj.jianLiJiGou, obj.jianLiJiGouId));
                    str.push(String.format("<td style='width:50px'></td>"));
                    str.push(String.format("<td class='xj rig'  style='width:70px'>小计</td>"));
                    str.push(String.format("<td class='gre rig b' style='width:90px'><label validate='money'>{0}</label></td>", _jinE_GeRen));
                    str.push(String.format("<td  class='gre rig b' style='width:90px'><label validate='money'>{0}</label></td>", _jinE_GongSi));
                    var _xiaoJi = 0
                    if (_jinE_GeRen != null) {
                        _xiaoJi = add(_xiaoJi, _jinE_GeRen);
                    }
                    if (_jinE_GongSi != null) {
                        _xiaoJi = add(_xiaoJi, _jinE_GongSi);
                    }
                    _xiaoJi = Math_Round(_xiaoJi, 2);
                    total = Math_Round(add(total, _xiaoJi), 2); //合计

                    str.push(String.format("<td  class='gre rig b' style='width:90px'><label validate='money'>{0}</label></td>", _xiaoJi));
                    str.push("</tr>");
                    num = 0; //序号重置
                    _jinE_GeRen = _jinE_GongSi = 0; //小计归零
                }
            }
            str.push(String.format("<div class='total clear'>单位:（元） &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合计：{0} </div>", total));

        }
        return str.join("");
    }
    function tableAddStyle() {
        $("#" + PFM.divContent).find("tr[class*='header']").addClass("bgHeader");
        // $("#" + PFM.divContent).find("tr[class*='row']:odd").addClass("bg1");
        //        $("#" + PFM.divContent).find("tr[class*='row']").bind("mouseover", {}, function () {
        //            $(this).addClass("mouseover");
        //        })
        //        $("#" + PFM.divContent).find("tr[class*='row']").bind("mouseout", {}, function () {
        //            $(this).removeClass("mouseover");
        //        })
        //$("#" + PFM.divContent).find("td").find("label[validate='money']").formatCurrency();
    }
    window.PFM = PFM;
})()
$(function () {

    new PFM()
})