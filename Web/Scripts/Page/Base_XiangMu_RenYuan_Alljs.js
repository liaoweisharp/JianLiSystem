(function () {
    var baseData = {};
    function RYZC_A(projectId, type) {
        this.projectId = projectId;
        initDom(projectId, type);

    }

    RYZC_A.Prefix = "RYZC_A_";

    function initDom(projectId, type) {
        $("#" + RYZC_A.Prefix + projectId).html(loading);
        if (type == "update") {
            $("#" + RYZC_A.Prefix + "_Add").show();
        }
        $invokeWebService_2("~WebService_XiangMu.getAllRenYuan", { projectId: projectId }, null, successCallBack, errorCallBack, null, { userContent: "getAllRenYuan", projectId: projectId, type: type });
    }
    function successCallBack(result, context) {
        if (context.userContent == "getAllRenYuan") {
            var projectId = context.projectId;
            var type = context.type
            
            var data = result;
            if (data.length == 0) {
                $("#" + RYZC_A.Prefix + projectId).html(noResult);
            }
            else {
                $("#" + RYZC_A.Prefix + projectId).html(html_ShowTable(data, projectId, type));
                tableAddStyle(projectId);
            }
        }
    }
    function errorCallBack(result, context) { }
    //#region 句柄

    RYZC_A.clickDetail = function (id) {
        var option = { type: "review" };
        //jBox options
        var optionJbox = { title: "详细", width: 850, buttons: {} };
        var jsonArray = createJson();
        var obj = baseData["学习经历"].firstOrDefault("rl_jl_Id", id);
        if (obj) {

            //#region 转换成需要的数据

            //#endregion 

            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }

    //#endregiong 句柄

    //#region HTML

    function html_ShowTable(datas, projectId, type) {
        var str = [];
        if (datas.length > 0) {
            str.push("<table class='tab' style='width:100%;' cellspacing='0' cellpadding='4'>");
            //表头
            str.push("<tr class='header'>");

            str.push("<td>姓名</td>");
            str.push("<td>岗位</td>");
            str.push("<td>持证情况</td>");
            str.push("<td>进入本项目时间</td>");
            str.push("<td>调离本项目时间</td>");
            
            str.push("</tr>");
            //表内容

            for (var j = 0; j < datas.length; j++) {
                var item = datas[j];
                str.push("<tr class='row'>");
                str.push(String.format("<td>{0}</td>", item.xingMing));
                str.push(String.format("<td>{0}</td>", item.gangWei));
                str.push(String.format("<td>{0}</td>", item.chiZhengQingKuang == null ? "" : item.chiZhengQingKuang.join("<br/>")));
                str.push(String.format("<td>{0}</td>", item.jinRuDate));
                str.push(String.format("<td>{0}</td>", item.tuiChuDate == null ? "在此项目" : item.tuiChuDate));
               
                str.push("</tr>");
            }
            str.push("</table>");
        }
        return str.join("");
    }
    //#endregion
    //#region 其他
    function tableAddStyle(userId) {

        //$("#divContent").find("tr[class*='header']").addClass("bgHeader");
        var $div = $("#" + RYZC_A.Prefix + userId);
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
    window.RYZC_A = RYZC_A;
})()



