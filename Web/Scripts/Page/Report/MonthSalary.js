
(function () {

    function MS() {
        args = GetUrlParms();
        MS.year = args["y"];
        MS.month = args["m"];

        $invokeWebService_2("~WebService_Report.getSalaryZhuangTai", { year: MS.year, month: MS.month }, function () {
        }, successCallBack, errorCallBack, null, { userContent: "getSalaryZhuangTai" });

    }
    MS.divSalary = "divStep1";
    MS.divChengBen = "divStep2";
    MS.divPreview = "divStep3";
    function successCallBack(result, userContext) {
        if (userContext.userContent == "getSalaryZhuangTai") {
            window.BuMen = result[1];
            $("#" + MS.divSalary + ",#" + MS.divChengBen + ",#" + MS.divPreview).hide();

            if (result[0] == 0)//没有记录
            {
                var headerText = "步骤：第一步（共三步）";

                $invokeWebService_2("~WebService_Report.getMonthSalary", { year: MS.year, month: MS.month }, function () {
                    $("#" + MS.divSalary).show();
                    $("#" + MS.divSalary).html(loading);

                }, successCallBack, errorCallBack, null, { userContent: "getMonthSalary" });
            }
            else if (result[0] == 1)//存在，已完成
            {
                var headerText = "步骤：完成（预览）";
                MS.click_GetStep3Data();
            }
            else if (result[0] == 2)//存在，未完成，只执行了工资确认，没有项目分配确认
            {
                var headerText = "步骤：第二步（共三步）";
                MS.click_GetStep2Data();
            }
            $("#header").html(headerText);
        }
        if (userContext.userContent == "getMonthSalary") {

            MS.GongZi = result;
            convertDate();
            var datas = convertDatas(result);
            // datas.orderBy("type");
            $("#" + MS.divSalary).html(_html(datas, false))
        .find(".tb_List tr[class='row']:odd").addClass("bg1");
            $("#" + MS.divSalary).find(".tb_List tr[class*='row']").hover(
            function () { $(this).addClass("mouseover") },
            function () { $(this).removeClass("mouseover") }
            )
            $("#btnStep2").hide();
            $("#btnStep1").show();
        }
        else if (userContext.userContent == "getPreview") {
            $("#btnStep2").hide();
            $("#btnStep1").hide();
            var datas = convertDatas(result);
            //datas.orderBy("type");
            $("#" + MS.divPreview).html(_html(datas, true))
            .find(".tb_List tr[class='row']:odd").addClass("bg1");

            $("#" + MS.divPreview).find("tr[class*='row']").hover(
                    function () { $(this).addClass("mouseover") },
                    function () { $(this).removeClass("mouseover") }
                    )

        }
        else if (userContext.userContent == "SaveMonthSalaryGuiDang") {
            if (result != null) {
                $.jBox.tip('更新成功。页面跳转到下一步...', 'success');
                new MS();
            }
            else {

                $.jBox.tip('更新失败。请保存数据后刷新页面重试。', 'error');

            }
        }
        else if (userContext.userContent == "getSalaryChengBen") {
            MS.ChengBenList = result;
            //result.orderBy("type");
            if (result && result.length > 0) {
                $("#divStep2").html(html_ChengBen(result))
                .find("table tr[class='row']:odd").addClass("bg1");

                $("#divStep2").find(".tbChengBen tr[class*='row']").hover(
                    function () { $(this).addClass("mouseover") },
                    function () { $(this).removeClass("mouseover") }
                    )

                $("#btnStep2").show();
                $("#btnStep1").hide();
            }
            else {
                $("#divStep2").html(noResult);
            }
        }
        else if (userContext.userContent == "SaveChengBen" || userContext.userContent == "DeleteChengBenByGuiDangId") {
            if (result == true) {
                var guiDangId = userContext.guiDangId;
                $invokeWebService_2("~WebService_Report.getChengBenByGuiDangId", { guiDangId: guiDangId }, function () {
                }, successCallBack, errorCallBack, null, { userContent: "getChengBenByGuiDangId", guiDangId: guiDangId });
            }
            else {
                $.jBox.tip('更新失败。请保存数据后刷新页面重试。', 'error');
            }
        }
        else if (userContext.userContent == "getChengBenByGuiDangId") {
            var data = result;
            var guiDangId = userContext.guiDangId;
            //更新数据源
            var index = MS.ChengBenList.indexOf("guiDangId", guiDangId);
            if (index > -1) {

                MS.ChengBenList[index] = data;
            }
            else {

            }
            //更新界面
            $gd = $("#" + MS.divChengBen).find("tr[gd='" + guiDangId + "']");
            var num = $gd.find("td[class='num']").text();
            var tds = getHTMLForOneTR(data, num);
            $gd.html(tds);
            $.jBox.tip('更新成功', 'success');
        }
        else if (userContext.userContent == "SaveMonthSalaryGuiDangChengBen") {
            if (result != null) {
                $.jBox.tip('更新成功。页面跳转到下一步...', 'success');
                new MS();

            }
            else {
                $.jBox.tip('更新失败', 'error');
            }
        }
    }
    function errorCallBack(result, userContext) {

    }

    //#region  句柄
    //确认工资
    MS.click_QueRenGongZi = function () {

        if (MS.GongZi) {
            MS.GongZi.each(function (item) {
                delete item.salaryLastWrapper;
            })
            $invokeWebService_2("~WebService_Report.SaveMonthSalaryGuiDang", { year: MS.year, month: MS.month, list: MS.GongZi }, function () {
            }, successCallBack, errorCallBack, null, { userContent: "SaveMonthSalaryGuiDang" });
        }
    }
    MS.click_GetStep2Data = function () {
        $invokeWebService_2("~WebService_Report.getSalaryChengBen", { year: MS.year, month: MS.month }, function () {
            $("#" + MS.divChengBen).show();
            $("#" + MS.divChengBen).html(loading);

        }, successCallBack, errorCallBack, null, { userContent: "getSalaryChengBen" });
    }
    MS.click_GetStep3Data = function () {
        $invokeWebService_2("~WebService_Report.getPreview", { year: MS.year, month: MS.month }, function () {
            $("#" + MS.divPreview).show();
            $("#" + MS.divPreview).html(loading);

        }, successCallBack, errorCallBack, null, { userContent: "getPreview" });
    }
    //点击保存一个归档成本。
    MS.click_SaveChengBen = function (guiDangId) {
        var chengBenList = [];
        //        $("#" + MS.divChengBen).find("tr[gd='" + guiDangId + "'] input[chengBen]").each(function () {
        //            var projectId = $(this).attr("projectId");
        //            var jinE = $(this).val();
        //            chengBenList.push(
        //            { msdcd_MonthSalaryGuiDangId: guiDangId,
        //                msdcd_XiangMuId: projectId,
        //                msdcd_JinE: jinE
        //            });
        //        })

        $("#" + MS.divChengBen).find("tr[gd='" + guiDangId + "']").each(function () {
            var $tr = $(this).find("tr[projectid]");
            for (var k = 0; k < $tr.length; k++) {
                $item = $($tr[k]);
                var projectId = $item.attr("projectid");
                var jinE = $.trim($item.find("input[chengben_geren]:first").val());
                var sheBaoGongSi = $.trim($item.find("input[chengben_gongsi]:first").val());
                chengBenList.push({
                    msdcd_MonthSalaryGuiDangId: guiDangId,
                    msdcd_XiangMuId: projectId,
                    msdcd_JinE: jinE,
                    msdcd_SheBaoGongSi: sheBaoGongSi
                });
            }

        })
        //#region验证
        //#endregion验证结束
        $invokeWebService_2("~WebService_Report.SaveChengBen", { guiDangId: guiDangId, chengBenList: chengBenList },
        function () {
            $.jBox.tip("数据更新中......", 'loading');
        }, successCallBack, errorCallBack, null, { userContent: "SaveChengBen", guiDangId: guiDangId });

    }
    //点击取消一个归档成本，并重新计算。
    MS.click_CancelAndReload = function (guiDangId) {
        $invokeWebService_2("~WebService_Report.DeleteChengBenByGuiDangId", { guiDangId: guiDangId },
        function () {
            $.jBox.tip("数据更新中......", 'loading');
        }, successCallBack, errorCallBack, null, { userContent: "DeleteChengBenByGuiDangId", guiDangId: guiDangId });
    }
    //点击成本分配全部确认
    MS.click_ChengBenComfirmAll = function () {
        var chengBenList = [];
        if (MS.ChengBenList && MS.ChengBenList.length > 0) {
            for (var i = 0; i < MS.ChengBenList.length; i++) {
                var item = MS.ChengBenList[i];
                if (!item.reportSalaryChengBenWrapperArr || item.reportSalaryChengBenWrapperArr.length == 0) {
                    continue;
                }
                var guiDangId = item.guiDangId;
                if (item.reportSalaryChengBenWrapperArr.length > 1 && item.isSaved == false) {
                    //从界面上读数据
                    $("#" + MS.divChengBen).find("tr[gd='" + guiDangId + "']").each(function () {
                        var $tr = $(this).find("tr[projectid]");
                        for (var k = 0; k < $tr.length; k++) {
                            $item = $($tr[k]);
                            var projectId = $item.attr("projectid");
                            if (projectId) {
                                var jinE = $.trim($item.find("input[chengben_geren]:first").val());
                                var sheBaoGongSi = $.trim($item.find("input[chengben_gongsi]:first").val());
                                chengBenList.push({
                                    msdcd_MonthSalaryGuiDangId: guiDangId,
                                    msdcd_XiangMuId: projectId,
                                    msdcd_JinE: jinE,
                                    msdcd_SheBaoGongSi: sheBaoGongSi
                                });
                            }
                        }

                    })
                }
                else {
                    //从缓存中读数据=
                    item.reportSalaryChengBenWrapperArr.each(function (p) {

                        var projectId = p.xiangMuId;
                        if (projectId) {
                            var jinE = p.jinE;
                            var sheBaoGongSi = p.sheBaoGongSi;
                            chengBenList.push({
                                msdcd_MonthSalaryGuiDangId: guiDangId,
                                msdcd_XiangMuId: projectId,
                                msdcd_JinE: jinE,
                                msdcd_SheBaoGongSi: sheBaoGongSi
                            });
                        }
                    })
                }
            }
        }
        //验证
        //结束验证

        $invokeWebService_2("~WebService_Report.SaveMonthSalaryGuiDangChengBen", { year: MS.year, month: MS.month, list: chengBenList },
        function () {
            $.jBox.tip("数据更新中......", 'loading');
        }, successCallBack, errorCallBack, null, { userContent: "SaveMonthSalaryGuiDangChengBen", guiDangId: guiDangId });
    }
    //#endregion
    //#region html
    function _html(datas, isShowProject) {
        var str = [];
        if (datas && datas.length > 0) {
            //#region dd
            str.push('<table class="tb_List tab" width="100%" border="0" cellspacing="1" cellpadding="3">');
            str.push('<tr class="bgHeader">');

            str.push('<td class="num" rowspan="2">#</td>');
            str.push('<td rowspan="2">部门</td>')
            str.push('<td rowspan="2">姓名</td>');
            str.push('<td colspan="3">应领工资</td>');
            str.push('<td colspan="5">应扣工资</td>');
            str.push('<td rowspan="2">实发工资</td>');
            str.push('<td colspan="5">与上月对比</td>');
            str.push('<td rowspan="2">公司承担</td>');
            if (isShowProject) {
                str.push('<td rowspan="2">项目分摊成本</td>');
            }
            str.push('</tr>');
            str.push('<tr class="bgHeader">');
            str.push('<td>基础工资</td>');
            str.push('<td>补贴</td>');
            str.push('<td>小计</td>');
            str.push('<td>社保</td>');
            str.push('<td>个税</td>');
            str.push('<td>其他1</td>');
            str.push('<td>其他2</td>');
            str.push('<td>小计</td>');

            str.push('<td>基础工资</td>');
            str.push('<td>补贴</td>');
            str.push('<td>社保</td>');
            str.push('<td>其他1</td>');
            str.push('<td>其他2</td>');

            str.push('</tr>');
            //#endregion
            var num = 0;

            datas.each(function (item) {
                num++;
                var fullName = item.xingMing; //姓名
                var buMenName = item.buMenName; //部门名称
                var type = item.type;
                var yf_JiBenGongZi = item.curr_yf_JiBenGongZi; //基本工资
                var yf_buTie = item.curr_yf_BuTie; //补贴
                var yf_XiaoJi = item.curr_yf_XiaoJi; //应发小计
                var yk_SheBao = item.curr_yk_SheBao; //应扣社保
                var yk_QiTa1 = item.curr_yk_QiTa1; //应扣其他1
                var yk_QiTa2 = item.curr_yk_QiTa2; //应扣其他2
                var yk_SuoDeShui = item.curr_yk_GeShui; //应扣个税
                var yk_XiaoJi = item.curr_yk_XiaoJi; //应扣小计
                var shiFaGongZi = item.curr_ShifaGongZi; //实发工资
                var gongSiChengBen = item.curr_GongSiChengDan; //公司成本

                var comp_yf_JiBenGongZi = item.comp_yf_JiBenGongZi; //比较 基本工资
                var comp_yf_BuTie = item.comp_yf_BuTie; //比较 补贴
                var comp_yk_SheBao = item.comp_yk_SheBao; //比较 社保
                var comp_yk_QiTa1 = item.comp_yk_QiTa1; //比较 其他1
                var comp_yk_QiTa2 = item.comp_yk_QiTa2; //比较 其他2

                var css = "";
                var tip = "";
                if (type == 1) { css = " org"; tip = "（结算）" }
                else if (type == 2) { css = " red"; tip = "（停发）" }
                str.push(String.format("<tr class='row'>"));

                str.push(String.format("<td class='num'>{0}</td>", num));
                str.push(String.format("<td>{0}</td>", buMenName));
                str.push(String.format("<td class='td1{2}'>{0}{1}</td>", fullName, tip, css));
                str.push(String.format("<td class='td2'>{0}</td>", yf_JiBenGongZi));
                str.push(String.format("<td class='td3'>{0}</td>", yf_buTie));
                str.push(String.format("<td class='td4 total'>{0}</td>", yf_XiaoJi));
                str.push(String.format("<td class='td5'>{0}</td>", yk_SheBao));
                str.push(String.format("<td class='td6'>{0}</td>", yk_SuoDeShui));
                str.push(String.format("<td class='td7'>{0}</td>", yk_QiTa1));
                str.push(String.format("<td class='td8'>{0}</td>", yk_QiTa2));
                str.push(String.format("<td class='td9 total'>{0}</td>", yk_XiaoJi));
                str.push(String.format("<td class='td10 total'>{0}</td>", shiFaGongZi));


                str.push(String.format("<td class='td13'>{0}</td>", comp_yf_JiBenGongZi));
                str.push(String.format("<td class='td14'>{0}</td>", comp_yf_BuTie));
                str.push(String.format("<td class='td15'>{0}</td>", comp_yk_SheBao));
                str.push(String.format("<td class='td16'>{0}</td>", comp_yk_QiTa1));
                str.push(String.format("<td class='td17'>{0}</td>", comp_yk_QiTa2));

                str.push(String.format("<td class='td11 total'>{0}</td>", gongSiChengBen));
                if (isShowProject) {
                    str.push(String.format("<td class='td12'>{0}</td>", getHtmlFenDanJinE(item.comp_yk_XiangMuArray, true)))
                }
                str.push("</tr>");
            })
            str.push("<table>");
        }
        return str.join("");
    }
    function html_ChengBen(datas) {
        var str = [];
        if (datas && datas.length > 0) {
            str.push('<table class="tbChengBen tab" border="0" cellspacing="1" cellpadding="3">');
            str.push('<tr class="bgHeader">');
            str.push('<td class="num">#</td>');
            str.push('<td>部门</td>');
            str.push('<td class="td1">姓名</td>');
            str.push('<td class="td2" >公司承担</td>');
            str.push('<td class="td3">项目监理机构分摊</td>');
            str.push('<td class="td4" >操作</td>');
            str.push('</tr>');
            //            str.push('<tr class="bgHeader">');
            //            str.push('<td class="td10">项目监理机构</td>');
            //            str.push('<td class="td11">分摊金额(工资)</td>');
            //            str.push('<td class="td12">分摊金额(公司社保)</td>');
            //            str.push('</tr>');
            var num = 0;
            datas.each(function (item) {
                num++;
                var guiDangId = item.guiDangId; //归档ID
                var type = item.type;


                str.push(String.format("<tr class='row' gd='{0}'>", guiDangId));
                str.push(getHTMLForOneTR(item, num));
                str.push('</tr>');
            })
            str.push('</table>');
            // str.push("<center style='margin:15px'><input type='button' value='全部确认' onclick=\"MS.click_ChengBenComfirmAll()\"></center>")
        }
        return str.join("");
    }
    //分担  一行的拆分
    function getHTMLForOneTR(item, num) {
        var str = [];
        var guiDangId = item.guiDangId; //归档ID
        str.push("<td class='num'>" + num + "</td>");
        str.push("<td>" + item.buMenName + "</td>");
        var tip = "";
        var css = "";
        if (item.type == 1) {
            tip = "（结算）";
            css = " org";
        }
        else if (item.type == 2) {
            tip = "（停发）";
            css = " red";
        }
        str.push(String.format("<td class='td1{2}'>{0}{1}</td>", item.xingMing, tip, css));
        str.push(String.format("<td class='td2'>{0}</td>", item.gongSiChengDan));
        var htmlJinE = "";
        if (item.reportSalaryChengBenWrapperArr && item.reportSalaryChengBenWrapperArr.length > 0) {
            htmlJinE = getHtmlFenDanJinE(item.reportSalaryChengBenWrapperArr, item.isSaved);
        }
        str.push(String.format("<td  class='td3'>{0}</td>", htmlJinE));
        if (item.reportSalaryChengBenWrapperArr && item.reportSalaryChengBenWrapperArr.length > 1) {
            if (item.isSaved) {
                str.push(String.format("<td class='td4'><input type='button' value='取消,重新导入' onclick=\"MS.click_CancelAndReload({0})\"/></td>", guiDangId));
            }
            else {
                str.push(String.format("<td class='td4'><input type='button' value='保存' onclick=\"MS.click_SaveChengBen({0})\"/></td>", guiDangId));
            }
        }
        else {
            str.push("<td class='td4'></td>");
        }
        return str.join("");
    }
    function getHtmlFenDanJinE(arr, isSaved) {
        var str = [];

        if (arr && arr.length > 0) {
            str.push("<table class='chengben_detail' cellpadding='2'>");
            var index = 0;
            arr.each(function (item) {
                index++;
                if (item.xiangMuId) {
                    if (index < arr.length) {
                        str.push(String.format("<tr projectid='{0}' class='b1'>", item.xiangMuId));
                    }
                    else {
                        str.push(String.format("<tr projectid='{0}'>", item.xiangMuId));
                    }
                    str.push(String.format("<td class='td30'>{0}</td>", item.xiangMuMingCheng));
                    if (arr.length > 1 && isSaved == false) {
                        str.push(String.format("<td class='td31' style='text-align:center;width:210px;'><font class='sm'>工资:</font><input size='6' type='text' chengben_geren value='{0}'>", item.jinE != null ? item.jinE : ""));
                        str.push(String.format("&nbsp;<font class='sm'>公司社保:</font><input size='6' type='text' chengben_gongsi value='{0}'></td>", item.sheBaoGongSi != null ? item.sheBaoGongSi : ""));
                    }
                    else {
                        var jinE = item.jinE ? Number(item.jinE) : 0;
                        var sheBaoGongSi = item.sheBaoGongSi ? Number(item.sheBaoGongSi) : 0;
                        var gongSiChengDan = add(jinE, sheBaoGongSi);
                        str.push(String.format("<td class='td31'><font class='ft'>分摊金额</font>：{0} <img src='../Images/mouse.png' align='absmiddle' title='工资: {1}\n公司社保: {2}'/></td>", gongSiChengDan, item.jinE != null ? item.jinE : "", item.sheBaoGongSi != null ? item.sheBaoGongSi : ""));
                        //str.push(String.format("<td class='td12'><font class='sm'>公司社保:</font>{0}</td>", ));
                    }
                    str.push("</tr>");
                }
            })
            str.push("</table>");
        }
        return str.join("");
    }
    //#endregion
    //#region 其他
    function convertDatas(objs) {
        var datas = [];
        if (objs && objs.length > 0) {
            objs.each(function (item) {
                var obj = {};
                obj["xingMing"] = item.xingMing;
                obj["buMenName"] = item.buMenName;
                //                if (item.salaryWrapper.msgd_Type == null) {
                //                    obj["type"] = 0; //为了排序
                //                }
                //                else if (item.salaryWrapper.msgd_Type == 1) {
                //                    obj["type"] = 1;
                //                }
                obj["type"] = item.salaryWrapper.msgd_Type;
                obj["curr_yf_JiBenGongZi"] = item.salaryWrapper.msgd_yf_JiBenGongZi;
                obj["curr_yf_BuTie"] = item.salaryWrapper.msgd_yf_BuTie;
                obj["curr_yf_XiaoJi"] = item.salaryWrapper.msgd_yf_XiaoJi;
                obj["curr_yk_SheBao"] = item.salaryWrapper.msgd_yk_SheBao;
                obj["curr_yk_QiTa1"] = item.salaryWrapper.msgd_yk_QiTa1;
                obj["curr_yk_QiTa2"] = item.salaryWrapper.msgd_yk_QiTa2;
                obj["curr_yk_GeShui"] = item.salaryWrapper.msgd_yk_GeShui;
                obj["curr_yk_XiaoJi"] = item.salaryWrapper.msgd_yk_XiaoJi;
                obj["curr_ShifaGongZi"] = item.salaryWrapper.msgd_ShifaGongZi;
                obj["curr_GongSiChengDan"] = item.salaryWrapper.msgd_GongSiChengDan;

                obj["comp_yf_JiBenGongZi"] = item.salaryWrapper.msgd_yf_JiBenGongZi.sub(item.salaryLastWrapper.msgd_yf_JiBenGongZi);
                obj["comp_yf_BuTie"] = item.salaryWrapper.msgd_yf_BuTie.sub(item.salaryLastWrapper.msgd_yf_BuTie);
                obj["comp_yk_SheBao"] = item.salaryWrapper.msgd_yk_SheBao.sub(item.salaryLastWrapper.msgd_yk_SheBao);
                obj["comp_yk_QiTa1"] = item.salaryWrapper.msgd_yk_QiTa1.sub(item.salaryLastWrapper.msgd_yk_QiTa1);
                obj["comp_yk_QiTa2"] = item.salaryWrapper.msgd_yk_QiTa2.sub(item.salaryLastWrapper.msgd_yk_QiTa2);
                obj["comp_yk_XiangMuArray"] = item.reportSalaryChengBenWrapperArr;
                datas.push(obj);
            })
        }
        return datas;
    }
    function convertDate() {
        MS.GongZi.each(function (item) {
            if (item.salaryWrapper && item.salaryWrapper.msgd_JieSuanStartDate) {
                item.salaryWrapper.msgd_JieSuanStartDate = strToDate(item.salaryWrapper.msgd_JieSuanStartDate).pattern("yyyy-MM-dd");
            }
            if (item.salaryWrapper && item.salaryWrapper.msgd_JieSuanEndDate) {
                item.salaryWrapper.msgd_JieSuanEndDate = strToDate(item.salaryWrapper.msgd_JieSuanEndDate).pattern("yyyy-MM-dd");
            }
            if (item.salaryLastWrapper && item.salaryLastWrapper.msgd_JieSuanEndDate) {
                item.salaryLastWrapper.msgd_JieSuanEndDate = strToDate(item.salaryLastWrapper.msgd_JieSuanEndDate).pattern("yyyy-MM-dd");
            }
            if (item.salaryLastWrapper && item.salaryLastWrapper.msgd_JieSuanEndDate) {
                item.salaryLastWrapper.msgd_JieSuanEndDate = strToDate(item.salaryLastWrapper.msgd_JieSuanEndDate).pattern("yyyy-MM-dd");
            }
        })
    }
    //#endregion
    window.MS = MS;
})()
$(function () {

    new MS();
})