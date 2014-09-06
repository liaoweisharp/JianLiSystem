var year = 2014;

$(function () {
    init()
    
})
function init() {
    $invokeWebService_2("~WebService_Report.getReportSalaryYear", { year: year }, function () {
    }, successCallBack, errorCallBack, null, { userContent: "getReportSalaryYear" });
}
function successCallBack(result, userContext) {
    if (userContext.userContent == "getReportSalaryYear") {
    
    $("#123").html(getHTML(result));

    $("#123").find("tr[class*='row']:odd").addClass("bg1");
    $("#123").find("tr[class*='row']").bind("mouseover", {}, function () {
        $(this).addClass("mouseover");
    })
    $("#123").find("tr[class*='row']").bind("mouseout", {}, function () {
        $(this).removeClass("mouseover");
    })
    $("#123").find("td").find("label[validate='money']").formatCurrency();
    }
    else if (userContext.userContent == "delMonthSalary") {
    if (result) {
        init()
    }
    else {
        alert("删除失败");
    }
    }
}
function errorCallBack(result, userContext) { }
function getHTML(datas) {

        var str = [];

        if (datas.length > 0) {
            str.push("<table class='tb_List QQ' cellspacing='1' cellpadding='3' style='text-align:center;'>");
            str.push("<tr class='bgHeader'>");
            str.push(String.format("<td>{0}</td>", "年、月"));
            str.push(String.format("<td>{0}</td>", "实发总额（万元）"));
            str.push(String.format("<td>{0}</td>", "公司承担总额（万元）"));
            str.push(String.format("<td>{0}</td>", "状态"));
            str.push("<td class='td7'>操作</td>");
            str.push("</tr>");
            //表内容

            for (var j = 0; j < datas.length; j++) {
                var obj = datas[j];
                str.push("<tr class='row'>");
                str.push(String.format("<td>{0}</td>", obj.year+"."+obj.month));

                str.push(String.format("<td class='rig'>{0}</td>", obj.shiFaZongE == null ? "" : "<label validate='money'>" + obj.shiFaZongE + "</label>"));
                if (obj.zhuangTai == 1) {
                    str.push(String.format("<td class='rig'>{0}</td>", obj.gongSiChengDan == null ? "" : "<a style='color:green; cursor:pointer' href='Base_XiangMuForMonth.aspx?ms="+obj.monthSalaryId+"'>" + obj.gongSiChengDan + "</a>"));
                }
                else {
                    str.push(String.format("<td class='rig'>{0}</td>", obj.gongSiChengDan == null ? "" : "<label validate='money'>" + obj.gongSiChengDan + "</label>"));
                }
                str.push(String.format("<td>{0}</td>", getZhuangTaiHtml(obj.zhuangTai, obj.year, obj.month)));
                str.push(String.format("<td class='td7'><span class='opation'><a href='javascript:void(0);' onclick=\"delMonthSalary({0})\">撤销</a>  </span></td>", obj.monthSalaryId));
                str.push("</tr>");
            }
            str.push("</table>");
        }
        return str.join("");

    }
    function getZhuangTaiHtml(zhuangTai, year, month) {
        var href = "";
        if (zhuangTai == 0) {
            href = String.format("<a style='color:gray;' href='Base_MonthSalary.aspx?y={0}&m={1}'>新建</a>",year,month);
        }
        else if(zhuangTai==1) {
            href = String.format("<a  style='color:green;' href='Base_MonthSalary.aspx?y={0}&m={1}'>已完成</a>", year, month);
        }
        else if(zhuangTai==2) {
            href = String.format("<a style='color:red;' href='Base_MonthSalary.aspx?y={0}&m={1}'>未完成</a>", year, month);
        }
        return href;
    }
    function delMonthSalary(monthSalaryId) {
        $invokeWebService_2("~WebService_Report.delMonthSalary", { id: monthSalaryId }, function () {
        }, successCallBack, errorCallBack, null, { userContent: "delMonthSalary" });
    }