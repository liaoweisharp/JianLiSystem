(function () {

    function MX(projectId, type) {
        this.projectId = projectId;
        MX.projectId = projectId;
        MX.type = type;
        initDom(MX.projectId, MX.type);

    }

    MX.Prefix = "MX_";

    function initDom(projectId, type) {
        $("#" + MX.Prefix + projectId).html(loading);
        if (type == "update") {
            $("#" + MX.Prefix + "_Edit").show();
        }

        $invokeWebService_2("~WebService_XiangMu.getXiangMuMingInfoXiByProjectId", { projectId: projectId }, null, successCallBack, errorCallBack, null, { userContent: "getXiangMuMingInfoXiByProjectId", projectId: projectId, type: type });
    }
    function successCallBack(result, context) {
        if (context.userContent == "getXiangMuMingInfoXiByProjectId") {
            var data = baseData["明细"] = result[0];
            baseData["移交情况"] = result[1];
            var projectId = context.projectId;
            var type = context.type;

            $("#" + MX.Prefix + projectId).html(html_ShowTableReview());
            tableAddStyle(projectId)

        }
        else if (context.userContent == "getXiangMuMingInfoXiByProjectId_ForEdit") {

            if (result.length == 0) {
                alert("请先选择\"工程类别\"(项目基本信息里)");
                $.jBox.close(MX.projectId + "_jbox");
                return;
            }
            var divId = context.divId;
            var projectId = context.projectId;
            var yiJiaoDan = result[0];
            var mingXi = result[1];
            var xiangMu = result[2];
            var users = result[3];

            $div = $("#" + divId);
            $div.html(html_ShowTableEdit(projectId, yiJiaoDan, mingXi, xiangMu, users));
            $("#" + MX.projectId + "_yiJiaoShiJian").datepicker({ changeMonth: true, changeYear: true });
            $("#" + MX.projectId + "_jieShouShiJian").datepicker({ changeMonth: true, changeYear: true });
            //初始化数据

            //var yiJiaoQingKuang = xiangMu.qq_JunGongYiJiaoQingKuang;


            var $table = $("#table_YJQK");

            var yiJiaoQingKuang = xiangMu.qq_JunGongYiJiaoQingKuang;
            yiJiaoQingKuang = yiJiaoQingKuang == null ? "" : yiJiaoQingKuang;
            $table.find("#" + MX.projectId + "_yiJiaoQingKuang").val(yiJiaoQingKuang);

            var yiJiaoShiJian = xiangMu.qq_JunGongYiJiao_ShiJian;
            yiJiaoShiJian = yiJiaoShiJian == null ? "" : strToDate(yiJiaoShiJian).pattern("yyyy-MM-dd");
            $table.find("#" + MX.projectId + "_yiJiaoShiJian").val(yiJiaoShiJian);

            var jieShouShiJian = xiangMu.qq_JunGongYiJiao_QianShoShiJian;
            jieShouShiJian = jieShouShiJian == null ? "" : strToDate(jieShouShiJian).pattern("yyyy-MM-dd");
            $table.find("#" + MX.projectId + "_jieShouShiJian").val(jieShouShiJian);

            var jieShouRen = xiangMu.qq_JunGongYiJiao_QianShouRenYuan;
            jieShouRen = jieShouRen == null ? "" : jieShouRen;
            $table.find("#" + MX.projectId + "_jieShouRen").val(jieShouRen);

            var yiJiaoRen = xiangMu.qq_JunGongYiJiao_YiJiaoRen;
            yiJiaoRen = yiJiaoRen == null ? "" : yiJiaoRen;
            $table.find("#" + MX.projectId + "_yiJiaoRen").val(yiJiaoRen);

            var zongJian = xiangMu.qq_JunGongYiJiao_ZongJianQianZi;
            zongJian = zongJian == null ? "" : zongJian;
            $table.find("#" + MX.projectId + "_zongJian").val(zongJian);

            mingXi.each(function (item) {
                var yjdId = item.mx_YiJiaoDanId;
                var beiZhu = item.mx_BeiZhu;
                var shuLiang = item.mx_ShuLiang;
                var yeMaFanWei = item.mx_YeMaFanWei;

                $div.find(":checkbox[yjd=" + yjdId + "]").trigger("click");
                $tr = $div.find("tr[yjd=" + yjdId + "]");
                $tr.addClass("rowSel");

                $tr.find("input[name='shuliang']").val(shuLiang);
                $tr.find("input[name='yemafanwei']").val(yeMaFanWei);
                $tr.find("input[name='beizhu']").val(beiZhu);

            })

        }
        else if (context.userContent == "updateMingXiInfo") {
            if (result) {
                $.jBox.tip('添加成功', 'success');
                initDom(MX.projectId, MX.type);
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }

    }
    function errorCallBack(result, context) { }
    //#region 句柄

    MX.Edit = function (projectId) {
        var divId = String.randomString(6);
        var html = String.format("<div id='{0}' class='zz'>{1}</div>", divId, loading);
        $.jBox(html, { id: projectId + "_jbox", buttons: { "更新": "1", "取消": "0" }, top: "5%", width: 850, height: 520, title: "编辑", showClose: false, submit: MX._Edit });
        $invokeWebService_2("~WebService_XiangMu.getXiangMuMingInfoXiByProjectId_ForEdit", { projectId: projectId }, null, successCallBack, errorCallBack, null, { userContent: "getXiangMuMingInfoXiByProjectId_ForEdit", projectId: projectId, divId: divId });
    }
    MX._Edit = function (v, h, f) {
        if (v == "1") {
            //#region 收集数据
            var mxObj = [];
            $("#tb_MX tr[class*='rowSel']").each(function (index) {
                var yjdId = $(this).attr("yjd");
                var $tr = $(this)
                var shuLiang = $tr.find("input[name='shuliang']").val();
                var yemafanwei = $tr.find("input[name='yemafanwei']").val();
                var beizhu = $tr.find("input[name='beizhu']").val();
                mxObj.push({ mx_YiJiaoDanId: yjdId, mx_BeiZhu: beizhu, mx_ShuLiang: shuLiang, mx_XiangMuId: MX.projectId, mx_YeMaFanWei: yemafanwei })
            })


            var $table = $("#table_YJQK");

            var qq_JunGongYiJiaoQingKuang = $table.find("#" + MX.projectId + "_yiJiaoQingKuang").val();
            qq_JunGongYiJiaoQingKuang == "" ? null : qq_JunGongYiJiaoQingKuang;

            var qq_JunGongYiJiao_ShiJian = $table.find("#" + MX.projectId + "_yiJiaoShiJian").val();
            qq_JunGongYiJiao_ShiJian == "" ? null : qq_JunGongYiJiao_ShiJian;
            var qq_JunGongYiJiao_QianShoShiJian = $table.find("#" + MX.projectId + "_jieShouShiJian").val();
            qq_JunGongYiJiao_QianShoShiJian == "" ? null : qq_JunGongYiJiao_QianShoShiJian;

            var qq_JunGongYiJiao_QianShouRenYuan = $table.find("#" + MX.projectId + "_jieShouRen").val();
            qq_JunGongYiJiao_QianShouRenYuan == "" ? null : qq_JunGongYiJiao_QianShouRenYuan;
            var qq_JunGongYiJiao_YiJiaoRen = $table.find("#" + MX.projectId + "_yiJiaoRen").val();
            qq_JunGongYiJiao_YiJiaoRen == "" ? null : qq_JunGongYiJiao_YiJiaoRen;
            var qq_JunGongYiJiao_ZongJianQianZi = $table.find("#" + MX.projectId + "_zongJian").val();
            qq_JunGongYiJiao_ZongJianQianZi == "" ? null : qq_JunGongYiJiao_ZongJianQianZi;

            var yiJiaoQingKuang = {};
            yiJiaoQingKuang["qq_Id"] = MX.projectId;
            yiJiaoQingKuang["qq_JunGongYiJiaoQingKuang"] = qq_JunGongYiJiaoQingKuang;
            yiJiaoQingKuang["qq_JunGongYiJiao_ShiJian"] = qq_JunGongYiJiao_ShiJian;
            yiJiaoQingKuang["qq_JunGongYiJiao_QianShoShiJian"] = qq_JunGongYiJiao_QianShoShiJian;
            yiJiaoQingKuang["qq_JunGongYiJiao_QianShouRenYuan"] = qq_JunGongYiJiao_QianShouRenYuan;
            yiJiaoQingKuang["qq_JunGongYiJiao_YiJiaoRen"] = qq_JunGongYiJiao_YiJiaoRen;
            yiJiaoQingKuang["qq_JunGongYiJiao_ZongJianQianZi"] = qq_JunGongYiJiao_ZongJianQianZi;

            //#endregion

            $invokeWebService_2("~WebService_XiangMu.updateMingXiInfo", { projectId: MX.projectId, mingXiArray: mxObj, yiJiaoQingKuang: yiJiaoQingKuang }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "updateMingXiInfo" });
        }
        return true;
    }


    //#endregiong 句柄

    //#region HTML
    function html_ShowTableReview() {
        var str = [];
        if (baseData["明细"].length == 0) {
            str.push(noResult);
        }
        else {
            str.push("<div class='max-height:370px; overflow:auto;'>")
            str.push('<table cellspacing="0" cellpadding="4" style="width:100%;" class="tab">');
            str.push('<tbody>');
            str.push('<tr class="header">');
            str.push(String.format("<td>编号</td>"));
            str.push(String.format("<td>类别编号</td>"));
            str.push(String.format("<td>资料名称</td>"));
            str.push(String.format("<td>类别</td>"));
            str.push(String.format("<td>数量</td>"));
            str.push(String.format("<td>页码范围</td>"));
            str.push(String.format("<td>备注</td>"));
            str.push('</tr>');
            for (var i = 0; i < baseData["明细"].length; i++) {
                var item = baseData["明细"][i];
                str.push('<tr class="row">');
                str.push(String.format("<td>{0}</td>", item.bianHao));
                str.push(String.format("<td>{0}</td>", item.lieBieBianHao));
                str.push(String.format("<td>{0}</td>", item.ziLiaoMingCheng));
                str.push(String.format("<td>{0}</td>", item.leiBie));
                str.push(String.format("<td>{0}</td>", item.shuLiang));
                str.push(String.format("<td>{0}</td>", item.yeMaFanWei));
                str.push(String.format("<td>{0}</td>", item.beiZhu));
                str.push('<tr>');
            }
            str.push("</tbody>");
            str.push("</table>");
            str.push("</div>");
        }

        //基本信息
        str.push("<table cellspacing='3' style='width:70%;margin:10px;'>");
        var ins = baseData["移交情况"];
        str.push(String.format("<tr><td>移交情况:</td><td>{0}</td><td></td><td></td><td></td><td></td></tr>", ins.yiJiaoQingKuang));
        str.push(String.format("<tr><td>移交人员签字:</td><td>{0}</td><td>联系电话:</td><td>{1}</td><td>移交时间:</td><td>{2}</td></tr>", ins.yiJiaoRen, ins.yiJiaoRenDianHua, ins.yiJiaoShiJian));
        str.push(String.format("<tr><td>总监签字:</td><td>{0}</td><td>联系电话:</td><td>{1}</td><td></td><td></td></tr>", ins.zongJian, ins.zongJianDianHua));
        str.push(String.format("<tr><td>接收人员签字:</td><td>{0}</td><td>联系电话:</td><td>{1}</td><td>接收时间:</td><td>{2}</td></tr>", ins.jieShouRen, ins.jieShouRenDianHua, ins.jieShouShiJian));
        str.push("</table>");
        return str.join("");
    }
    function html_ShowTableEdit(projectId, yiJiaoDan, mingXi, xiangMu, user) {
        var str = [];
        if (yiJiaoDan && yiJiaoDan.length > 0) {
            str.push('<table id="tb_MX" class="tb_List QQ" id="tb_MX" width="95%" cellpadding="5" style="text-align:center;margin:10px auto;">');
            str.push('<tr class="header bgHeader">');
            str.push('<td>移交</td>');
            str.push('<td>编号</td>');
            str.push('<td>类别编号</td>');
            str.push('<td>资料名称</td>');
            str.push('<td>类别</td>');
            str.push('<td>数量</td>');
            str.push('<td>页码范围</td>');
            str.push('<td>备注</td>');
            str.push('</tr>');
            for (var i = 0; i < yiJiaoDan.length; i++) {
                var item = yiJiaoDan[i];
                var lieBieBianHao = item.yjd_LeiBieBianHao == null ? "" : item.yjd_LeiBieBianHao; //类别编号
                var jiBie = item.yjd_JiBie; //级别
                var name = item.yjd_Name;
                var bianHao = item.yjd_BianHao;
                var id = item.yjd_Id;
                str.push(String.format('<tr class="row" yjd={0}>', item.yjd_Id));
                str.push(String.format('<td><input type="checkbox" yjd={0}  onclick="clickChange(this)"/></td>', item.yjd_Id));
                str.push(String.format("<td>{0}</td>", bianHao));
                str.push(String.format("<td>{0}</td>", lieBieBianHao));
                str.push(String.format("<td>{0}</td>", name));
                str.push(String.format("<td>{0}</td>", jiBie));
                str.push(String.format("<td class='td7'><input class='txt1' name='shuliang' type='text' value='{0}'/></td>", ""));
                str.push(String.format("<td class='td8'><input class='txt2' name='yemafanwei' type='text' value='{0}'/></td>", ""));
                str.push(String.format("<td class='td9'><input class='txt3' name='beizhu' type='text' value='{0}'/></td>", ""));
                str.push("</tr>")
            }
            str.push("</table>");
            //基本信息
            str.push("<table id='table_YJQK' cellspacing='5' style='width:95%;margin:10px auto;'>");
            var ins = baseData["移交情况"];
            str.push(String.format("<tr><td>移交情况</td><td>{0}</td><td></td><td></td></tr>", html_ddl_YiJiaoQingKuang()));
            str.push(String.format("<tr><td>移交人员签字</td><td>{0}</td><td>移交时间</td><td><input id='{1}' type='text'/></td></tr>", html_ddl_YiJiaoRen(user), MX.projectId + "_yiJiaoShiJian"));
            str.push(String.format("<tr><td>总监签字</td><td>{0}</td><td></td><td></td></tr>", html_ddl_ZongJian(user)));
            str.push(String.format("<tr><td>接收人员签字</td><td>{0}</td><td>接收时间</td><td><input id='{1}' type='text'/></td></tr>", html_ddl_JieShouRen(user), MX.projectId + "_jieShouShiJian"));
            str.push("</table>");
        }
        return str.join("");
    }
    function html_ShowTable(datas, projectId, type) {

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
            str.push("<td class='tdOpation'>操作</td>");
            str.push("</tr>");
            //表内容

            for (var j = 0; j < datas.length; j++) {
                var id = datas[j].sj_Id
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
                if (!type || type == "update") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"MX.clickDetail('{0}')\">详细</a>|<a href='javascript:void(0);' onclick=\"MX.clickEdit('{0}')\">编辑</a>|<a href='javascript:void(0);' onclick=\"MX.clickDel('{0}','{1}')\">删除</a></span></td>", id, projectId));
                }
                else if (type == "review") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"MX.clickDetail('{0}')\">详细</a></span></td>", id, projectId));
                }
                str.push("</tr>");
            }
            str.push("</table>");
        }
        return str.join("");
    }
    function html_ddl_YiJiaoQingKuang() {
        var str = [];

        str.push(String.format("<select id='{0}'>", MX.projectId + "_yiJiaoQingKuang"));
        str.push(String.format("<option value=''> </option>"));

        str.push(String.format("<option value='{0}'>{1}</option>", '0', "未移交"));
        str.push(String.format("<option value='{0}'>{1}</option>", '1', "全部移交"));
        str.push(String.format("<option value='{0}'>{1}</option>", '2', "部分移交"));

        str.push("</select>");

        return str.join("");
    }
    function html_ddl_YiJiaoRen(datas) {
        var str = [];
        if (datas && datas.length > 0) {
            str.push(String.format("<select id='{0}'>", MX.projectId + "_yiJiaoRen"));
            str.push(String.format("<option value=''> </option>"));
            for (var i = 0; i < datas.length; i++) {
                var value = datas[i].key;
                var text = datas[i].value;
                str.push(String.format("<option value='{0}'>{1}</option>", value, text));
            }

            str.push("</select>");
        }
        return str.join("");
    }
    function html_ddl_JieShouRen(datas) {
        var str = [];
        if (datas && datas.length > 0) {
            str.push(String.format("<select id='{0}'>", MX.projectId + "_jieShouRen"));
            str.push(String.format("<option value=''> </option>"));
            for (var i = 0; i < datas.length; i++) {
                var value = datas[i].key;
                var text = datas[i].value;
                str.push(String.format("<option value='{0}'>{1}</option>", value, text));
            }

            str.push("</select>");
        }
        return str.join("");
    }
    function html_ddl_ZongJian(datas) {
        var str = [];
        if (datas && datas.length > 0) {
            str.push(String.format("<select id='{0}'>", MX.projectId + "_zongJian"));
            str.push(String.format("<option value=''> </option>"));
            for (var i = 0; i < datas.length; i++) {
                var value = datas[i].key;
                var text = datas[i].value;
                str.push(String.format("<option value='{0}'>{1}</option>", value, text));
            }

            str.push("</select>");
        }
        return str.join("");
    }
    //#endregion
    //#region 其他
    function tableAddStyle(projectId) {

        //$("#divContent").find("tr[class*='header']").addClass("bgHeader");
        var $div = $("#" + MX.Prefix + projectId);
        $div.find("tr[class*='row']:odd").addClass("bg1");
        $div.find("tr[class*='row']").bind("mouseover", {}, function () {
            $(this).addClass("mouseover");
        });
        $div.find("tr[class*='row']").bind("mouseout", {}, function () {
            $(this).removeClass("mouseover");
        });
        $div.find("[validate='money'][validatechild='']").formatCurrency();
        $div.find("[validate='money'][validatechild='元']").formatCurrency(null, { roundToDecimalPlace: 2 });
    }
    //#endregion
    window.MX = MX;

})()



