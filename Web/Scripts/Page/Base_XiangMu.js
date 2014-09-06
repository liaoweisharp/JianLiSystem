(function () {
    function XM() { }
    function successCallBack(result, context) {

        if (context.userContent == "getXiangMuById") {

            var obj = result;
            var id1 = context.id;
            var type = context.type;

            var jsonsArray = createJson();
            conventToDateTime(obj, jsonsArray);

            if (type == "update") {
              
                new bindDiv(jsonsArray, obj, id1, { type: "update", align: "y" }, _clickUpdate);
                
            }
            else if (type == "review") {
                new bindDiv(jsonsArray, obj, id1, { type: "review", align: "y" }, null);
            }
        }
        else if (context.userContent == "updateXiangMu_HouQi") {
            if (result) {
                $.jBox.tip('更新成功', 'success');
                //pageselectCallback(UU.pd.currentPageNumber, null);
                //*更新User主界面列表
            }
            else {

                $.jBox.tip('更新失败', 'error');
            }
        }
    }
    function errorCallBack(result, context) { }
    //#region 句柄
    XM.click_Edit_Zu = function (id, Name) {
    
        var _id = String.randomString(6);
        var id1 = String.randomString(6);
        var id2 = String.randomString(6);
        var id3 = String.randomString(6);
        var id4 = String.randomString(6);
        var id5 = String.randomString(6);

        var html = getTabsHtml_Zu(id, _id, id1, id2, id3, id4, id5, "update");
        $.jBox(html, { title: Name, buttons: {}, width: 900, top: '3%' });
        $("#" + id1).html(loading);

        $("#" + _id).tabs();
        //$invokeWebService_2("~WebService_XiangMu.getXiangMuById", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "getXiangMuById", id: id1, type: "update" });
        new RYZC_C(id, "review");
        new RYZC_A(id, "review");
        new SJ(id, "update");
//        new MX(id, "update");
        new XJ(id, "update");
        
    }
    XM.click_Edit_Project = function (id, Name) {

        var _id = String.randomString(6);
        var id1 = String.randomString(6);
        var id2 = String.randomString(6);
        var id3 = String.randomString(6);
        var id4 = String.randomString(6);
        var id5 = String.randomString(6);

        var html = getTabsHtml_Project(id, _id, id1, id2, id3, id4, id5, "update");
        $.jBox(html, { title: Name, buttons: {}, width: 900, top: '3%' });
        $("#" + id1).html(loading);

        $("#" + _id).tabs();
        $invokeWebService_2("~WebService_XiangMu.getXiangMuById", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "getXiangMuById", id: id1, type: "update" });
//        new RYZC_C(id, "review");
//        new RYZC_A(id, "review");
//        new SJ(id, "update");
        new MX(id, "update");
//        new XJ(id, "update");
       
    }
    XM.click_Detail = function (id, Name) {
        var _id = String.randomString(6);
        var id1 = String.randomString(6);
        var id2 = String.randomString(6);
        var id3 = String.randomString(6);
        var id4 = String.randomString(6);
        var id5 = String.randomString(6);

        var html = getTabsHtml(id, _id, id1, id2, id3, id4, id5, "review");
        $.jBox(html, { title: Name, buttons: { "关闭": "0" }, width: 900, top: '3%' });
        $("#" + id1).html(loading);

        $("#" + _id).tabs();

        $invokeWebService_2("~WebService_XiangMu.getXiangMuById", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "getXiangMuById", id: id1, type: "review" });
        new RYZC_C(id, "review");
        new RYZC_A(id, "review");
        new SJ(id, "review");
        new MX(id, "review");
        new XJ(id, "review");
        //        new GCJL(userId, "review");
        //        new XL(userId, "review"); //学历
        //        new ZC(userId, "review"); //职称
        //        new ZYZG(userId, "review"); //职业资格
        //        new XC(userId, "review"); //薪酬
        //        new DD(userId, "review"); //调动
        //        new PX(userId, "review"); //培训
        //        new JC(userId, "review"); //奖惩

    }
    function _clickUpdate(event) {

        var jsonArray = event.data.newBind.ShouJiData();
        var obj = bind.jsonToObject(jsonArray);
        
        obj["qq_Id"] = event.data.obj.qq_Id;
        $invokeWebService_2("~WebService_XiangMu.updateXiangMu_HouQi", { obj: obj }, null, successCallBack, errorCallBack, null, { userContent: "updateXiangMu_HouQi" });
    }
    //#endregionng

    //#region HTML
    function getTabsHtml(id, id1, id2) {
        var str = [];
        str.push(String.format("<div id='{0}' class='tabsP'>", id));
        str.push("<ul>");
        str.push(String.format("<li><a href='#{0}'>基本信息</a></li>", id1));
        //        str.push(String.format("<li><a href='#{0}'>工作、工程经历</a></li>", id2));
        str.push("</ul>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'></div>", id1));
        //        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'></div>", id2));
        str.push("</div>");
        return str.join("");
    }
    function getTabsHtml_Zu(projectId, id, id1, id2, id3, id4, id5, type) {
        var str = [];
        str.push(String.format("<div id='{0}' class='tabsP'>", id));
        str.push("<ul>");
        //str.push(String.format("<li><a href='#{0}'>基本信息</a></li>", id1));
        str.push(String.format("<li><a href='#{0}'>人员组成情况</a></li>", id2));
        str.push(String.format("<li><a href='#{0}'>事件记录</a></li>", id3));
        //str.push(String.format("<li><a href='#{0}'>竣工资料移交情况</a></li>", id4));
        str.push(String.format("<li><a href='#{0}'>巡检记录</a></li>", id5));
        str.push("</ul>");
//        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id1));
//        str.push("</div>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id2));
        str.push(_getContent(projectId, "currentRenYuan", type));
        str.push(_getContent(projectId, "totalRenYuan", type));

        str.push("</div>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id3));
        str.push(_getContent(projectId, "shiJian", type));

        str.push("</div>");
//        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id4));
//                str.push(_getContent(projectId, "mingXi", type));
// 
//        str.push("</div>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id5));
        str.push(_getContent(projectId, "xunJian", type));

        str.push("</div>");
        str.push("</div>");
        return str.join("");
    }
    function getTabsHtml_Project(projectId, id, id1, id2, id3, id4, id5, type) {
        var str = [];
        str.push(String.format("<div id='{0}' class='tabsP'>", id));
        str.push("<ul>");
        str.push(String.format("<li><a href='#{0}'>基本信息</a></li>", id1));
       // str.push(String.format("<li><a href='#{0}'>人员组成情况</a></li>", id2));
       // str.push(String.format("<li><a href='#{0}'>事件记录</a></li>", id3));
        str.push(String.format("<li><a href='#{0}'>竣工资料移交情况</a></li>", id4));
      //  str.push(String.format("<li><a href='#{0}'>巡检记录</a></li>", id5));
        str.push("</ul>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id1));
        str.push("</div>");
//        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id2));
//        str.push(_getContent(projectId, "currentRenYuan", type));
//        str.push(_getContent(projectId, "totalRenYuan", type));

//        str.push("</div>");
//        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id3));
//        str.push(_getContent(projectId, "shiJian", type));

//        str.push("</div>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id4));
        str.push(_getContent(projectId, "mingXi", type));

        str.push("</div>");
//        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id5));
//        str.push(_getContent(projectId, "xunJian", type));

//        str.push("</div>");
        str.push("</div>");
        return str.join("");
    }
    function _getContent(projectId, content, type) {

        var str = [];
        str.push("<div class='ZX_BG_header ZX_h'>");
        str.push("<ul class='ulnone'>");
        if (content == "currentRenYuan") {
            str.push("<li class='ZX_title'>本月人员组成</li>");
            if (type == "update") {
                str.push(String.format("<li id='{1}' class='bg_A hid' style='float:right;'><a href='javascript:void(0);' onclick=\"XXJL.Add('{0}')\" >添加</a></li>", projectId, RYZC_C.Prefix + "_Add"));
            }
        }
        else if (content == "totalRenYuan") {
            str.push("<li class='ZX_title'>人员变动</li>");
            if (type == "update") {
                str.push(String.format("<li  id='{1}' class='bg_A hid' style='float:right;'><a href='javascript:void(0);' onclick=\"GZJL.Add('{0}')\" >添加</a></li>", projectId, RYZC_A.Prefix + "_Add"));
            }
        }
        else if (content == "shiJian") {
            str.push("<li class='ZX_title'>事件记录</li>");
            if (type == "update") {
                str.push(String.format("<li  id='{1}' class='bg_A hid' style='float:right;'><a href='javascript:void(0);' onclick=\"SJ.Add('{0}')\" >添加</a></li>", projectId, SJ.Prefix + "_Add"));
            }
        }
        else if (content == "mingXi") {
            str.push("<li class='ZX_title'>移交明细</li>");
            if (type == "update") {
                str.push(String.format("<li  id='{1}' class='bg_A hid' style='float:right;'><a href='javascript:void(0);' onclick=\"MX.Edit('{0}')\">编辑</a></li>", projectId, MX.Prefix + "_Edit"));
            }
        }
        else if (content == "xunJian") {
            str.push("<li class='ZX_title'>巡检记录</li>");
            if (type == "update") {
                str.push(String.format("<li  id='{1}' class='bg_A hid' style='float:right;'><a href='javascript:void(0);' onclick=\"XJ.Add('{0}')\" >添加</a></li>", projectId, XJ.Prefix + "_Add"));
            }
        }
        str.push("</ul>");
        str.push("<br/>");
        str.push("</div>");

        if (content == "currentRenYuan") {
            str.push(String.format("<div id='{0}' class='ZX_con h250'>{1}", RYZC_C.Prefix + projectId, loading));
        }
        else if (content == "totalRenYuan") {
            str.push(String.format("<div id='{0}' class='ZX_con h250'>{1}", RYZC_A.Prefix + projectId, loading));
        }
        else if (content == "shiJian") {
            str.push(String.format("<div id='{0}' class='ZX_con h480'>{1}", SJ.Prefix + projectId, loading));
        }
        else if (content == "mingXi") {
            str.push(String.format("<div id='{0}' class='ZX_con'>{1}", MX.Prefix + projectId, loading));
        }
        else if (content == "xunJian") {
            str.push(String.format("<div id='{0}' class='ZX_con h480'>{1}", XJ.Prefix + projectId, loading));
        }
        str.push("</div>");
        return str.join("");
    }
    //#endregion
    //#region 生成json
    function createJson() {
        var jsonArray = [];
        jsonArray.push({ itemId: "qq_XiangMuFuZeRen", type: "select", title: "项目负责人", init: getInit(baseData["人员"]) });
        jsonArray.push({ itemId: "qq_ZongJianDaiBiao", type: "text", title: "总监代表" });
        jsonArray.push({ itemId: "qq_YeZhuMingCheng", type: "text", title: "业主名称" });
        jsonArray.push({ itemId: "qq_YeZhuLianXiRen", type: "text", title: "业主联系人、电话" });
        jsonArray.push({ itemId: "qq_ShiGongDanWeiMingCheng", type: "text", title: "施工单位名称" });
        jsonArray.push({ itemId: "qq_ShiGongDanWeiLianXiRen", type: "text", title: "施工单位联系人、电话" });
        jsonArray.push({ itemId: "qq_FenBaoDanWeiMingCheng", type: "text", title: "分包单位名称" });
        jsonArray.push({ itemId: "qq_FenBaoDanWeiLianXiRen", type: "text", title: "分包单位联系人、电话" });
        jsonArray.push({ itemId: "qq_SheJiDanWeiMingCheng", type: "text", title: "设计单位名称" });
        jsonArray.push({ itemId: "qq_SheJiDanWeiLianXiRen", type: "text", title: "设计单位联系人、电话" });
        jsonArray.push({ itemId: "qq_DiKanDanWeiMingCheng", type: "text", title: "地堪单位名称" });
        jsonArray.push({ itemId: "qq_DiKanDanWenLianXiRen", type: "text", title: "地勘单位联系人、电话" });
        jsonArray.push({ itemId: "qq_ZhiJianDanWeiMingCheng", type: "text", title: "质检单位名称" });
        jsonArray.push({ itemId: "qq_ZhiJianDanWeiLianXiRen", type: "text", title: "质检单位联系人、电话" });
        jsonArray.push({ itemId: "qq_AnJianDanWeiMingCheng", type: "text", title: "安检单位名称" });
        jsonArray.push({ itemId: "qq_AnJianDanWeiLianXiRen", type: "text", title: "安检单位联系人、电话" });
        jsonArray.push({ itemId: "qq_GongChengLieBie", isOtherCol: true, type: "select", title: "工程类别", init: getInit(baseData["工程类别"], "fl_") });
        jsonArray.push({ itemId: "qq_XiangMuJiBie", type: "select", title: "工程级别", init: getInit(baseData["工程级别"], "jb_") });
        jsonArray.push({ itemId: "qq_XiangMuGaiKuang", type: "ntext", title: "项目概况" });
        jsonArray.push({ itemId: "qq_GongChengDiDian", type: "text", title: "工程地点" });
        jsonArray.push({ itemId: "qq_ZongTouZi", type: "text", title: "工程总投资(万元)", validate: "money" });
        jsonArray.push({ itemId: "qq_ShiGongGongQi", type: "text", title: "施工工期" });
        jsonArray.push({ itemId: "qq_JianLiFuWuQi", type: "text", title: "监理服务期" });
        jsonArray.push({ itemId: "qq_KaiGongRiQi", type: "text", validate: "datetime", title: "开工日期" });
        jsonArray.push({ itemId: "qq_YuJiJunGongShiJian", type: "text", validate: "datetime", title: "预计竣工时间" });
        jsonArray.push({ itemId: "qq_ShiJiJunGongShiJian", type: "text", validate: "datetime", title: "实际竣工时间" });
        jsonArray.push({ itemId: "qq_GongDiLiHuiShiJian", type: "text", title: "工地例会时间" });
        jsonArray.push({ itemId: "qq_MuQianJinDu", type: "text", title: "目前进度" });
        jsonArray.push({ itemId: "qq_GongChengZhuangTai", type: "text", title: "工程进度" });
        return jsonArray;
    }
    //#endregion
    //#region 其他
    //#endregion
    window.XM = XM;

})();