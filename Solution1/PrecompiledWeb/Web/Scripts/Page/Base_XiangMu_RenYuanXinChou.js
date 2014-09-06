
(function () {

    function RYXC(projectId, type) {

        this.projectId = projectId;
        RYXC.type = type;
        initDom(projectId);
        RYXC.baseData = {};
        //$invokeWebService_2("~WebService_XiangMuJieSuan.getXueXiJingLiByUserId", { projectId: projectId }, null, successCallBack, errorCallBack, null, { userContent: "getXueXiJingLiByUserId", projectId: projectId });
    }
    var requireColumn = ["year", "month", "jinE"];
    RYXC.Prefix = "RYXC_";

    function initDom(projectId) {
        $("#" + RYXC.Prefix + projectId).html(loading);
        $invokeWebService_2("~WebService_XiangMuJieSuan.getXiangMu_RenYuanXinChouByProjectId", { projectId: projectId }, null, successCallBack, errorCallBack, null, { userContent: "getXiangMu_RenYuanXinChouByProjectId", projectId: projectId });
    }
    function successCallBack(result, context) {

        if (context.userContent == "getXiangMu_RenYuanXinChouByProjectId") {

            var projectId = context.projectId;

            var jsonsArray = createJson();
            conventObjsToDateTime(result, jsonsArray); // 转换日期类型
            var data = result;

            if (data.length == 0) {
                $("#" + RYXC.Prefix + projectId).html(noResult);
            }
            else {
                $("#" + RYXC.Prefix + projectId).html(html_ShowTable(data, projectId));
                tableAddStyle(projectId);
            }
        }
        else if (context.userContent == "getMingXi") {
            var divId = context.divId;
            if (result.length == 0) {
                $("#" + divId).html(noResult);
            }
            else {
                var str = [];
                str.push("<table cellpadding='5' class='tab' style='margin:10px auto; max-height:380px;'>");
                str.push("<tr class='header'>");
                str.push("<td>姓名</td>");
                str.push("<td>承担金额(工资)</td>");
                str.push("<td>承担金额(公司社保)</td>");
                str.push("<td  class='xj'>小计</td>");
                str.push("</tr>");
                var total_geRen = 0;
                var total_gongSi = 0;
                result.each(function (item) {
                    str.push("<tr class='row'>");
                    str.push(String.format("<td>{0}</td>", item.xingMing));
                    str.push(String.format("<td>{0}</td>", item.jinE));
                    str.push(String.format("<td>{0}</td>", item.sheBaoGongSi));
                    str.push(String.format("<td class='xj'>{0}</td>", add(item.jinE, item.sheBaoGongSi)));
                    str.push("</tr>");
                    total_geRen = add(total_geRen, item.jinE);
                    total_gongSi = add(total_gongSi, item.sheBaoGongSi);
                })
                str.push("<tr class='xj'>");
                
                str.push(String.format("<td>{0}</td>", "合计"));
                str.push(String.format("<td>{0}</td>", total_geRen));
                str.push(String.format("<td>{0}</td>", total_gongSi));
                str.push(String.format("<td>{0}</td>", add(total_geRen,total_gongSi)));
                str.push("</tr>");
                str.push("</table>");
                $("#" + divId).html(str.join(""))
                .find("tr[class*='row']:odd").addClass("bg1");

            }
        }
    }
    function errorCallBack(result, context) { }
    //#region 句柄

    RYXC.clickDetail = function (monthSalaryId, projectId) {
        var html = [];
        var randomId = String.randomString(6);
        html.push(String.format("<div id='{1}'>{0}</div>", loading, randomId));
        $.jBox(html.join(""), { buttons: "", title: "明细", width: 400 });
        $invokeWebService_2("~WebService_Report.getMingXi", { monthSalaryId: monthSalaryId, projectId: projectId }, null, successCallBack, errorCallBack, null, { userContent: "getMingXi", divId: randomId });
    }

    //#endregiong 句柄
    function createJson() {
        var jsonArray = [];
        jsonArray.push({ itemId: "year", type: "text", title: "年" });
        jsonArray.push({ itemId: "month", type: "text", title: "月" });
        jsonArray.push({ itemId: "jinE", type: "text", title: "金额(万元)", validate: "money" });
        return jsonArray;
    }
    //#region HTML

    function html_ShowTable(datas, projectId) {
        var str = [];
        var jsonArray = createJson();
        if (datas.length > 0) {
            str.push("<table class='tab' style='width:100%;' cellspacing='0' cellpadding='4'>");
            //表头
            str.push("<tr class='header'>");
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
            str.push("<td class='tdOpation'>明细</td>");
            str.push("</tr>");
            //表内容

            for (var j = 0; j < datas.length; j++) {
                var id = datas[j].monthSalaryId
                str.push("<tr class='row'>");
                for (var i = 0; i < jsonArray.length; i++) {
                    var json = jsonArray[i];
                    if (requireColumn.contains(json.itemId)) {
                        var value = datas[j][json.itemId];
                        value = value == null ? "" : value;
                        if (json.type == "select") {
                            if (value != "") {
                                var _json = json.init.firstOrDefault("id", value);
                                if (_json) {
                                    value = _json.title;
                                }
                                else {
                                    value = "";
                                }
                            }
                        }
                        else if (json.validate == "money") {
                            value = "<label validate='money'>" + value + "</label>";
                        }
                        str.push(String.format("<td class='{1}'>{0}</td>", value, json.validate == "money" ? "mon wid1" : ""));
                    }
                }
                if (!RYXC.type || RYXC.type == "update") {
                    // str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"RYXC.clickDetail('{0}')\">详细</a>|<a href='javascript:void(0);' onclick=\"RYXC.clickEdit('{0}')\">编辑</a>|<a href='javascript:void(0);' onclick=\"RYXC.clickDel('{0}','{1}')\">删除</a></span></td>", id, projectId));
                }
                else if (RYXC.type == "review") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"RYXC.clickDetail('{0}','{1}')\">明细</a></span></td>", id, projectId));
                }
                str.push("</tr>");
            }
            str.push("</table>");
        }
        return str.join("");
    }
    //#endregion
    //#region 其他
    function tableAddStyle(projectId) {

        //$("#divContent").find("tr[class*='header']").addClass("bgHeader");
        var $div = $("#" + RYXC.Prefix + projectId);
        $div.find("tr[class*='row']:odd").addClass("bg1");
        $div.find("tr[class*='row']").bind("mouseover", {}, function () {
            $(this).addClass("mouseover");
        });
        $div.find("tr[class*='row']").bind("mouseout", {}, function () {
            $(this).removeClass("mouseover");
        });
        $div.find("[validate='money']").formatCurrency();
    }
    //#endregion
    window.RYXC = RYXC;
})()




