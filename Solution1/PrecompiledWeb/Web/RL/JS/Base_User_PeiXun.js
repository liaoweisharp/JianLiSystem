(function () {
    var baseData = {};
    function PX(userId, type) {
        this.userId = userId;
        initDom(userId, type);

    }
    var requireColumn = ["rl_px_BuMen", "rl_px_XiangMu", "rl_px_PeiXunXiangMu", "rl_px_PeiXunLeiBie2", "rl_dd_YingLingXinChou"];
    PX.Prefix = "PX_";

    function initDom(userId, type) {
        $("#" + PX.Prefix + userId).html(loading);
        $invokeWebService_2("~WebService_RenLi.getPeiXunByUserId", { userId: userId }, null, successCallBack, errorCallBack, null, { userContent: "getPeiXunByUserId", userId: userId, type: type });
    }
    function successCallBack(result, context) {
        if (context.userContent == "getPeiXunByUserId") {
            var data = result[0];
            
            baseData["培训"] = result[1];
            baseData["培训类别"] = result[2];
            baseData["培训性质"] = result[3];
            baseData["部门"] = result[4];
            var userId = context.userId;
            var type = context.type;
            var jsonsArray = createJson();

            conventObjsToDateTime(baseData["培训"], jsonsArray); // 转换日期类型
            if (data.length == 0) {
                $("#" + PX.Prefix + userId).html(noResult);
            }
            else {
                $("#" + PX.Prefix + userId).html(html_ShowTable(data, userId, type));
                tableAddStyle(userId);
            }
        }
        else if (context.userContent == "addPeiXun") {
            if (result) {
                var userId = context.userId;
                $.jBox.tip('添加成功', 'success');
                initDom(userId);
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "updatePeiXun") {
            if (result) {
                var userId = context.userId;
                $.jBox.tip('添加成功', 'success');
                initDom(userId);
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "delPeiXun") {
            
            if (result) {
                var userId = context.userId;
                $.jBox.tip('删除成功', 'success');
                initDom(userId);
            }
            else {
                $.jBox.tip('删除失败', 'error');
            }
        }

    }
    function errorCallBack(result, context) { }
    //#region 句柄
    PX.Add = function (userId) {
        var jsonArray = createJson();
        var option = { type: "new", data: { userId: userId} };
        var optionJbox = { title: "添加培训", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: PX._clickAdd };
        var bindObj = new bind(jsonArray, null, option, optionJbox);
    }
    PX.clickDetail = function (id) {
        
        var option = { type: "review" };
        //jBox options
        var optionJbox = { title: "详细", width: 850, buttons: {} };
        var jsonArray = createJson();
        var obj = baseData["培训"].firstOrDefault("rl_px_Id", id);

        if (obj) {

            //#region 转换成需要的数据

            //#endregion 



            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }

    }
    PX.clickEdit = function (id) {
        var jsonArray = createJson();
        var option = { type: "update", data: {} };
        //jBox options
        var optionJbox = { title: "编辑培训", width: 850, buttons: { "更新": "1", "取消": "0" }, showClose: false, submit: PX._clickEdit };
        var obj = baseData["培训"].firstOrDefault("rl_px_Id", id);
        if (obj) {
            var bindObj = new bind(jsonArray, obj, option, optionJbox);
        }
    }
    PX.clickDel = function (id, userId) {
        var ramdomId = String.randomString(6);
        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>你确定要删除这条记录吗？", ramdomId), "确定删除吗？", PX._clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { id: id, userId: userId });
    }
    PX._clickAdd = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");

            var jsonArray = bindObj.ShouJiData()
            var newObj = bind.jsonToObject(jsonArray);

            newObj["rl_px_UserId"] = bindObj.options.data.userId;

            $invokeWebService_2("~WebService_RenLi.addPeiXun", { obj: newObj }, function () {
                $.jBox.tip("添加中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, function () {

            }, { userContent: "addPeiXun", userId: bindObj.options.data.userId });
        }
        return true;
    }
    PX._clickEdit = function (v, h, f) {
        if (v == "1") {
            var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
            var jsonArray = bindObj.ShouJiData();
            var obj = bind.jsonToObject(jsonArray);
            obj["rl_px_Id"] = bindObj.obj.rl_px_Id;
            obj["rl_px_UserId"] = bindObj.obj.rl_px_UserId;
            $invokeWebService_2("~WebService_RenLi.updatePeiXun", { obj: obj }, function () {
                $.jBox.tip("更新中，请稍后...", 'loading');
            }, successCallBack, errorCallBack, null, { userContent: "updatePeiXun", userId: bindObj.obj.rl_px_UserId });
        }
        return true;
    }
    PX._clickDel = function (v, h, f) {
        if (v == "1") {
            var data = h.find("input[type='hidden']").data("data");
            var id = data.id;
            var userId = data.userId;

            $invokeWebService_2("~WebService_RenLi.delPeiXun", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "delPeiXun", userId: userId });
        }
        return true;
    }
    //#endregiong 句柄
    function createJson() {
        var jsonArray = [];
        
        jsonArray.push({ itemId: "rl_px_BuMen", type: "select", title: "所属部门", init: getInit(baseData["部门"], "bm_") });
        jsonArray.push({ itemId: "rl_px_XiangMu", type: "text", title: "所属项目" });
        //jsonArray.push({ itemId: "rl_px_GangWei", type: "text", title: "岗位" });
        jsonArray.push({ itemId: "rl_px_PeiXunXiangMu", type: "text", title: "培训项目" });
        jsonArray.push({ itemId: "rl_px_PeiXunJiGou", type: "text", title: "培训机构" });
        //jsonArray.push({ itemId: "rl_px_PeiXunDiDian", type: "text", title: "培训地点" });
        //sonArray.push({ itemId: "rl_px_PeiXunXingZhi", type: "select", title: "培训性质", init: getInit(baseData["培训性质"], "pxxz_") });
        jsonArray.push({ itemId: "rl_px_PeiXunLeiBie2", type: "text", title: "培训类别" });
        jsonArray.push({ itemId: "rl_px_PeiXunShiJian", type: "text", title: "培训时间" });
        //jsonArray.push({ itemId: "rl_px_PeiXunLeiBie", type: "select", title: "培训类别", init: getInit(baseData["培训类别"], "pxlb_") });
//        jsonArray.push({ itemId: "rl_px_StartDate", type: "text", title: "培训起始时间", validate: "datetime" });
//        jsonArray.push({ itemId: "rl_px_EndDate", type: "text", title: "培训结束日期", validate: "datetime", parentId: "rl_px_StartDate" });
        jsonArray.push({ itemId: "rl_px_XueShi", type: "text", title: "培训学时" });
        jsonArray.push({ itemId: "rl_px_FeiYongZhiChu_GongSi", type: "text", title: "费用支出（公司）", validate: "money",validatechild:"元" });
        jsonArray.push({ itemId: "rl_px_FeiYongZhiChu_BuMen", type: "text", title: "费用支出（部门）", validate: "money",validatechild:"元" });
        jsonArray.push({ itemId: "rl_px_FeiYongZhiChu_GeRen", type: "text", title: "费用支出（个人）", validate: "money",validatechild:"元" });
        jsonArray.push({ itemId: "rl_px_FeiYongJieSuan", yesOrNo:true, type: "select", title: "费用是否结算", init: [{ id: "1", title: "已结算" }, { id: "0", title: "未结算"}] });
        jsonArray.push({ itemId: "rl_px_BeiZhu", type: "ntext", title: "备注" });
        return jsonArray;
    }
    //#region HTML

    function html_ShowTable(datas, userId, type) {
        var str = [];
        var jsonArray = createJson();
        if (datas.length > 0) {
            str.push("<table class='tab' style='width:100%;' cellspacing='0' cellpadding='4'>");
            //表头
            str.push("<tr class='header'>");
            str.push("<td>所属部门</td>");
            str.push("<td>所属项目</td>");
            str.push("<td>培训项目</td>");
            str.push("<td>培训天数</td>");
            str.push("<td>总费用</td>");
            str.push("<td class='tdOpation'>操作</td>");
            str.push("</tr>");
            //表内容

            for (var j = 0; j < datas.length; j++) {
                var id = datas[j].peiXunId;

                str.push("<tr class='row'>");
                str.push(String.format("<td>{0}</td>", datas[j].suoShuBuMen));
                str.push(String.format("<td>{0}</td>", datas[j].suoShuXiangMu));
                str.push(String.format("<td>{0}</td>", datas[j].peiXunXiangMu));
                str.push(String.format("<td>{0}</td>", datas[j].peiXunTianShu));
                str.push(String.format("<td class='mon wid1'>{0}</td>", datas[j].zongFeiYong == null ? "" : "<label validate='money' validatechild='元'>" + datas[j].zongFeiYong + "</label>"));
                if (!type || type == "update") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"PX.clickDetail('{0}')\">详细</a>|<a href='javascript:void(0);' onclick=\"PX.clickEdit('{0}')\">编辑</a>|<a href='javascript:void(0);' onclick=\"PX.clickDel('{0}','{1}')\">删除</a></span></td>", id, userId));
                }
                else if (type == "review") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"PX.clickDetail('{0}')\">详细</a></span></td>", id, userId));
                }
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
        var $div = $("#" + PX.Prefix + userId);
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
    window.PX = PX;
})()



