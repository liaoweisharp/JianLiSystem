//项目

(function () {

    XMHQ.initDataDom = function () {
        pageSize = 10;
        baseData = {};
        loading = "<p><center><img src='../Images/ajax-loader_b.gif'/></center></p>";
        XMHQ.callListXiangMu();

        $invokeWebService_2("~WebService_XiangMu.getInitData", {}, null, successCallBack, errorCallBack, null, { userContent: "getInitData" });
    }
    XMHQ.pd = {};
    XMHQ.pd.filters = [];
    XMHQ.where_HeTong = null;
    //var requireColumn = ["qq_GongChengMingCheng", "qq_XiangMuLaiYuan", "qq_ZhiXingLeiXing", "qq_HeTongHao", "qq_ShiJian"];
    function XMHQ(divPage, divContent) {

        $("#" + divPage).html(loading);
        $("#" + divContent).html(loading);
        XMHQ.initDataDom();

        XMHQ.divPage = divPage;
        XMHQ.divContent = divContent;
    }
    XMHQ.callListXiangMu = function () {
        var zhuangTai = $("#ddlZhuangTai_ZhiGuan").val();
        if (zhuangTai != "-1") {
            var obj = XMHQ.pd.filters.firstOrDefault("key", "qq_GongChengZhuangTai");
            if (obj != null) {
                obj.value = zhuangTai;
            }
            else {
                XMHQ.pd.filters.push({ "key": "qq_GongChengZhuangTai", "value": zhuangTai })
            }
        }
        else {
            XMHQ.pd.filters.removeFirst("key", "qq_GongChengZhuangTai");
        }

        XMHQ.where = $.trim($("#txtSerXiangMu").val());
        XMHQ.pd["filter"] = { key: "type", value: "zhiGuan" };
        $invokeWebService_2("~WebService_XiangMu.countHouQi2", { pageClass: XMHQ.pd, where: XMHQ.where }, function () {
            $("#" + XMHQ.divContent).html(loading);
        }, successCallBack, errorCallBack, null, { userContent: "countHouQi2" });



    }
    function successCallBack(result, context) {
        if (context.userContent == "getInitData") {

            baseData["人员"] = result[0];

            baseData["工程级别"] = result[1];
            baseData["工程类别"] = result[2];
            baseData["工程状态"] = result[3];

            $ddlZhuangTai_ZhiGuan = $("#ddlZhuangTai_ZhiGuan");
            $ddlZhuangTai_ShiYeBu = $("#ddlZhuangTai_ShiYeBu");
            for (var i = 0; i < baseData["工程状态"].length; i++) {
                var zhuangTai = baseData["工程状态"][i];
                var $option1 = $(String.format("<option id='{0}'>{0}</option>", zhuangTai));
                var $option2 = $option1.clone();
                $ddlZhuangTai_ZhiGuan.append($option1);
                $ddlZhuangTai_ShiYeBu.append($option2);
            }
        }
        else if (context.userContent == "countHouQi2") {
            var optInit = getOptionsFromForm();
            $("#" + XMHQ.divPage).pagination(result, optInit);
            $("#" + XMHQ.divContent).show();
        }
        else if (context.userContent == "filterAllXiangMuHouQi2") {

            var data = result;
            //baseData["xiangMuHouQi"] = data;
            //#region 日期转换成日期格式
            //var jsons = createJson().findAll("validate", "datetime");

            //conventObjsToDateTime(data, jsons);
            //#endregion
            if (data.length == 0) {
                $("#" + XMHQ.divContent).html("没有匹配记录");
            }
            else {

                var str = getHtmlOfHouQi(data);
                $("#" + XMHQ.divContent).html(str);
                $("#tab_XiangMu").rowspan(0).rowspan(1);
                tableAddStyle2();
            }
        }
        else if (context.userContent == "updateXiangMuQianQi") {
            if (result == 1) {
                $.jBox.tip('更新成功。', 'success');
                pageselectCallback(XMHQ.pd.currentPageNumber, null);
                HT.pageselectCallback(HT.pd.currentPageNumber, null);
            }
            else {
                $.jBox.tip('更新失败', 'error', {});
            }
        }
    }
    function errorCallBack(result, context) {

    }
    //#region HTML
    function getHtmlOfHouQi(houQi) {
        var str = [];

        if (houQi.length > 0) {
            str.push("<table id='tab_XiangMu' class='tb_List QQ' cellspacing='0' cellpadding='5'>");
            str.push("<tr class='header'>");
            /// str.push(String.format("<td class='num'>#</td>"));
            str.push(String.format("<td>{0}</td>", "项目部"));
            str.push(String.format("<td>{0}</td>", "项目监理机构"));
            str.push(String.format("<td>{0}</td>", "工程名称"));
            str.push(String.format("<td>{0}</td>", "合同号"));


            str.push(String.format("<td>{0}</td>", "施工工期"));
            str.push(String.format("<td>{0}</td>", "预计竣工时间"));
            str.push(String.format("<td>{0}</td>", "工地例会时间"));
            str.push(String.format("<td>{0}</td>", "资料移交情况"));
            str.push(String.format("<td>{0}</td>", "工程状态"));

            str.push("</tr>");
            //表内容
            for (var i = 0; i < houQi.length; i++) {
                var obj = houQi[i];
                var xiangMuBuId = obj.zu_ID; //项目部ID
                xiangMuBuId = xiangMuBuId == null ? randomStringFun(5) : xiangMuBuId//如果为null，则随机分配一个（为保证界面上不合并单元格）
                var xiangMuBuMingChen = obj.zu_Name; //项目部名称
                xiangMuBuMingChen = xiangMuBuMingChen == null ? "" : xiangMuBuMingChen;

                var jianLiJiGouId = obj.jiGou_ID; //监理机构ID
                jianLiJiGouId = jianLiJiGouId == null ? randomStringFun(5) : jianLiJiGouId; //如果为null，则随机分配一个（为保证界面上不合并单元格）
                var jianLiJiGouMingCheng = obj.jiGou_Name; //监理机构名称
                jianLiJiGouMingCheng = jianLiJiGouMingCheng == null ? "" : jianLiJiGouMingCheng;
                var gongChengId = obj.qq_Id;
                var gongChengMingCheng = obj.qq_GongChengMingCheng;
                var yuJiJunGongShiJian = ""; //预计竣工时间
                if (obj.qq_YuJiJunGongShiJian != null) {
                    yuJiJunGongShiJian = strToDate(obj.qq_YuJiJunGongShiJian).pattern("yyyy-MM-dd");
                }
                var ziLiaoYiJiao = "";
                switch (obj.qq_JunGongYiJiaoQingKuang) {
                    case 0:
                        ziLiaoYiJiao = "未移交"
                        break;
                    case 1:
                        ziLiaoYiJiao = "全部移交"
                        break;
                    case 2:
                        ziLiaoYiJiao = "部分移交"
                        break;
                    default:
                        ziLiaoYiJiao = "";
                        break
                }

                str.push("<tr class='row'>");
                //str.push(String.format("<td class='num'>{0}</td>", XMHQ.pd.currentPageNumber * XMHQ.pd.pageSize + 1 + i));
                str.push(String.format("<td style='background-color:white;'><font xiangmubuid={0}>{1}</td>", xiangMuBuId, xiangMuBuMingChen));
                str.push(String.format("<td style='background-color:white;'><a href='javascript:void(0);' onclick=\"XM.click_Edit_Zu({0},'{1}')\">{1}</a></td>", jianLiJiGouId, jianLiJiGouMingCheng));
                str.push(String.format("<td><a href='javascript:void(0);' onclick=\"XM.click_Edit_Project({0},'{1}')\">{1}</a></td>", gongChengId, gongChengMingCheng));

                str.push(String.format("<td>{0}</td>", obj.qq_HeTongHao != null ? obj.qq_HeTongHao : ""));
                str.push(String.format("<td>{0}</td>", obj.qq_ShiGongGongQi != null ? obj.qq_ShiGongGongQi : ""));
                str.push(String.format("<td>{0}</td>", yuJiJunGongShiJian));
                str.push(String.format("<td>{0}</td>", obj.qq_GongDiLiHuiShiJian == null ? "" : obj.qq_GongDiLiHuiShiJian));
                str.push(String.format("<td>{0}</td>", ziLiaoYiJiao));
                str.push(String.format("<td>{0}</td>", obj.qq_GongChengZhuangTai == null ? "" : obj.qq_GongChengZhuangTai));
                // str.push(String.format("<td class='td7'><span class='opation'><a class='hid' href='javascript:void(0);' onclick=\"XMHQ.clickDetail({0})\">详细</a>  <a href='javascript:void(0);' onclick=\"XM.click_Edit({0},'{1}')\">编辑</a></span></td>", obj.id, obj.gongChengMingCheng));
                str.push("</tr>");


            }
            str.push("</table>");
        }
        return str.join("");
    }
    //#endregion
    //#region 句柄
    XMHQ.clickEdit = function (id) {

        var jsonArray = createJson();
        var leiXing = jsonArray.firstOrDefault("itemId", "qq_ZhiXingLeiXing");

        var option = { type: "update" };
        //jBox options
        var optionJbox = { title: "编辑项目", width: 850, buttons: { "更新": "1", "取消": "0" }, submit: _clickEdit };

        var obj = baseData["xiangMuHouQi"].firstOrDefault("qq_Id", id);
        if (obj) {
            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }

    }
    XMHQ.clickDetail = function (id) {
        var option = { type: "review" };
        //jBox options
        var optionJbox = { title: "项目", width: 850, buttons: {} };
        var jsonArray = createJson();
        var obj = baseData["xiangMuHouQi"].firstOrDefault("qq_Id", id);
        if (obj) {
            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }

    function _clickEdit(v, h, f) {
        if (v == "1") {

            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();

            var _newHeTong = bind.jsonToObject(jsonArray);
            _newHeTong["qq_Id"] = bindObj.obj.qq_Id;
            //var newHeTong = $.extend({}, bindObj.heTong, _newHeTong);
            //delete newHeTong.__type;
            $invokeWebService_2("~WebService_HeTong.updateXiangMuQianQi", { xiangMuQianQi: _newHeTong }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, function () {
                $.jBox.tip('完成。', 'success');
            }, { userContent: "updateXiangMuQianQi" });
        }
        return true;
    }

    XMHQ.Search_XiangMu = function () {
        //        var value = $.trim($("#txtSerXiangMu").val());
        //        if (value == "") {
        //            alert("搜索内容为空，请填值再搜索。");
        //            value = null;
        //        }
        //        XMHQ.where_HeTong = value;
        XMHQ.callListXiangMu();

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
    function pageselectCallback(page_index, jq) {

        XMHQ.pd.currentPageNumber = page_index;
        XMHQ.pd.pageSize = pageSize;

        $invokeWebService_2("~WebService_XiangMu.filterAllXiangMuHouQi2", { pageClass: XMHQ.pd, where: XMHQ.where },
       function () {
           //$("#divContent").html(loading);
       }, successCallBack, errorCallBack, null, { userContent: "filterAllXiangMuHouQi2" });
    }
    //绑定列表后绑定样式或事件
    function tableAddStyle() {
        $("#" + XMHQ.divContent).find("tr[class*='header']").addClass("bgHeader");
        $("#" + XMHQ.divContent).find("tr[class*='row']:odd").addClass("bg1");
        $("#" + XMHQ.divContent).find("tr[class*='row']").bind("mouseover", {}, function () {
            $(this).addClass("mouseover");
        })
        $("#" + XMHQ.divContent).find("tr[class*='row']").bind("mouseout", {}, function () {
            $(this).removeClass("mouseover");
        })
    }
    function tableAddStyle2() {
        $("#" + XMHQ.divContent).find("tr[class*='header']").addClass("bgHeader");
        $("#" + XMHQ.divContent).find("tr[class*='row']:odd").addClass("bg1");

    }
    //#endregion
    window.XMHQ = XMHQ;
})()

$(function () {
    var dd = new XMHQ("divPageSize_HQ", "divContent_HQ");
    var dd = new XMHQ_SYB("divPageSize_HQ_ShiYeBu", "divContent_HQ_ShiYeBu");
})
