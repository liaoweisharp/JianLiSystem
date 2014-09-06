/// <reference path="../jQuery/jquery-1.6.1.min.js" />
(function () {
    XC.lv = [[0.08, 0.02, 0, 0.01, 0, 0], [0.2, 0.065, 0.006, 0.02, 0.006, 0.01]]; //社保比例
    var baseData = {};
    function XC(userId, type) {
        this.userId = userId;

        XC.initDom(userId, type);
        $invokeWebService_2("~WebService_RenLi.getDistinctXiangMu", { userId: userId }, null, successCallBack, errorCallBack, null, { userContent: "getDistinctXiangMu", userId: userId, type: type });
    }
    XC.DivXC_AddOrEdit = "divXC_AddOrEdit"; //需要从页面copy过来的div Id
    XC.DivXC_Review = "divXC_Review"; //需要从页面copy过来的div Id
    XC.Prefix = "XC_";
    XC.divId = "";
    XC.initDom = function (userId, type) {
        $("#" + XC.Prefix + userId).html(loading);
        $invokeWebService_2("~WebService_RenLi.getXinChouByUserId", { userId: userId }, null, successCallBack, errorCallBack, null, { userContent: "getXinChouByUserId", userId: userId, type: type });
    }
    XC._initDom = function (obj, jieSuan) {
        var $div = $("#" + XC.divId);
        $div.find("[itemid]").each(function (index, dom) {
            var itemId = $(this).attr("itemid");
            if ((typeof obj[itemId])!="undefined") {
                $(this).val(obj[itemId]);
            }
            else if (jieSuan) {
                $(this).val(jieSuan[itemId]);
            }
        });
        //#region 模拟点击是否停发工资
        $(".ddlZhuangTai").trigger("change");
        //#endregion
        //#region 模拟计算小计
        XC.change_YingFa(null);
        XC.change_YingKou(null);
        XC.change_GongSiChengDan(null);
        //#endregion
    }
    XC._ToDate = function (obj, jieSuan) {
        //转换日期
        obj["xc_TiaoZhengShijian"] = strToDate(obj["xc_TiaoZhengShijian"]).pattern("yyyy-MM-dd");
        if (jieSuan) {
            jieSuan["xcjs_JieSuan_StartDate"] = strToDate(jieSuan["xcjs_JieSuan_StartDate"]).pattern("yyyy-MM-dd");
            jieSuan["xcjs_JieSuan_EndDate"] = strToDate(jieSuan["xcjs_JieSuan_EndDate"]).pattern("yyyy-MM-dd");
        }
    }
    XC.autoJiSuan_SheBao = function () {
        //自动计算社保
        var $div = $("#" + XC.divId);
        var xc_YangLaoJiShu = $div.find("[itemid='xc_YangLaoJiShu']").val();
        var xc_YiliaoJiShu = $div.find("[itemid='xc_YiliaoJiShu']").val();
        if (xc_YangLaoJiShu == "" || xc_YiliaoJiShu == "") {
            alert("请先填写'养老基数'和'医疗、生育、失业、工伤、大病基数'");
        }
        xc_YangLaoJiShu = Number(xc_YangLaoJiShu);
        xc_YiliaoJiShu = Number(xc_YiliaoJiShu);
        $div.find("input[itemid='xc_YK_YangLao']").val(parseFloat(xc_YangLaoJiShu.mul(XC.lv[0][0])).toFixed(2));
        $div.find("input[itemid='xc_YK_YiLiao']").val(parseFloat(xc_YiliaoJiShu.mul(XC.lv[0][1])).toFixed(2));
        $div.find("input[itemid='xc_YK_ShengYu']").val(parseFloat(xc_YiliaoJiShu.mul(XC.lv[0][2])).toFixed(2));
        $div.find("input[itemid='xc_YK_ShiYe']").val(parseFloat(xc_YiliaoJiShu.mul(XC.lv[0][3])).toFixed(2));
        $div.find("input[itemid='xc_YK_GongShang']").val(parseFloat(xc_YiliaoJiShu.mul(XC.lv[0][4])).toFixed(2));
        $div.find("input[itemid='xc_YK_DaBing']").val(parseFloat(xc_YiliaoJiShu.mul(XC.lv[0][5])).toFixed(2));

        $div.find("input[itemid='xc_GS_YangLao']").val(parseFloat(xc_YangLaoJiShu.mul(XC.lv[1][0])).toFixed(2));
        $div.find("input[itemid='xc_GS_YiLiao']").val(parseFloat(xc_YiliaoJiShu.mul(XC.lv[1][1])).toFixed(2));
        $div.find("input[itemid='xc_GS_Sheng']").val(parseFloat(xc_YiliaoJiShu.mul(XC.lv[1][2])).toFixed(2));
        $div.find("input[itemid='xc_GS_ShiYe']").val(parseFloat(xc_YiliaoJiShu.mul(XC.lv[1][3])).toFixed(2));
        $div.find("input[itemid='xc_GS_GongShang']").val(parseFloat(xc_YiliaoJiShu.mul(XC.lv[1][4])).toFixed(2));
        $div.find("input[itemid='xc_GS_DaBing']").val(parseFloat(xc_YiliaoJiShu.mul(XC.lv[1][5])).toFixed(2));

        XC.change_YingKou(null);
        XC.change_GongSiChengDan(null);
    }
    XC.autoJiSuan_GeShui = function () {

    }
    function successCallBack(result, context) {
        if (context.userContent == "getXinChouByUserId") {
            var data = result;

            var userId = context.userId;
            var type = context.type;




            if (data.length == 0) {
                $("#" + XC.Prefix + userId).html(noResult);
            }
            else {
                //转换日期
                for (var i = 0; i < data.length; i++) {
                    data[i]["tiaoZhengShiJian"] = strToDate(data[i]["tiaoZhengShiJian"]).pattern("yyyy-MM-dd");
                }

                $("#" + XC.Prefix + userId).html(html_ShowTable(data, userId, type));
                tableAddStyle(userId);
            }
        }
        else if (context.userContent == "getXinChou") {
            if (!result[0]) return;
            
            XC._ToDate(result[0], result[1]);
            XC.divId = String.randomString(6); //外层的Div，用于Copy页面的Dom元素
            $.jBox(String.format("<div id='{0}' class='con'><input type='hidden'/></div>", XC.divId), { title: "详细", width: 750, top: "4%", buttons: { "关闭": "0"} });
            var $div = $("#" + XC.divId);
            $div.append($("#" + XC.DivXC_Review).children().clone()); //克隆过来
            for (var key in result[0]) {
                result[0][key] = result[0][key] == null ? "" : result[0][key];
                var str = "";
                if (key == "xc_TiaoZhengLeiXing") {
                    if (result[0][key] == "0") {
                        str = "<font class='gre_B'>正常发放</font>";
                        $div.find(".sec").show();
                        $div.find(".jiesuan").hide();
                    }
                    if (result[0][key] == "1") {
                        str = "<font class='red_B'>停发工资</font>";
                        $div.find(".sec").hide();
                        $div.find(".tingfa").show(); 
                    }
                    if (result[0][key] == "2") {
                        str = "<font class='Org_B'>结算工资</font>";
                        $div.find(".sec").show();
                        $div.find(".tingfa").hide(); 
                    }
                }
                else {
                    str = result[0][key];
                }
                $div.find("label[itemid='" + key + "']").html(str);
            }
            for (var key in result[1]) {
                result[1][key] = result[1][key] == null ? "" : result[1][key];
                str = result[1][key];
                $div.find("label[itemid='" + key + "']").html(str);
            }

            XC.change_YingFa("review");
            XC.change_YingKou("review");
            XC.change_GongSiChengDan("review");

            $div.find("[validate='money']").formatCurrency(null, { roundToDecimalPlace: 2 });

        }
        else if (context.userContent == "getDistinctXiangMu") {

            baseData["项目"] = result;
        }
        else if (context.userContent == "getDistinctTZYY" || context.userContent == "getXinChouInfo") {

            if (!baseData.项目) {
                return;
            }
            var type = context.type;
            //添加、编辑公用
            var jsonArray = createJson();
            var jsonArray_JS = createJson_JieSuan();
            XC.divId = String.randomString(6); //外层的Div，用于Copy页面的Dom元素
            var txt = type == "add" ? "添加" : "更新";
            if (type == "add") {
                $.jBox(String.format("<div id='{0}' class='con'><input type='hidden' data/></div>", XC.divId), { title: "添加", width: 750, top: "4%", buttons: { "添加": "1", "取消": "0" }, submit: XC._clickAdd });
                $("#" + XC.divId).find("input[type='hidden'][data]")
                .data("userId", context.userId); //缓存数据
            }
            else if (type == "update") {
                XC._ToDate(result[0], result[2]);
                $.jBox(String.format("<div id='{0}' class='con'><input type='hidden' data/></div>", XC.divId), { title: "更新", width: 750, top: "4%", buttons: { "更新": "1", "取消": "0" }, submit: XC._clickEdit });
                $("#" + XC.divId).find("input[type='hidden'][data]")
                .data("obj", result[0]); //缓存数据
            }
            var $div = $("#" + XC.divId);
            $div.append($("#" + XC.DivXC_AddOrEdit).children().clone()); //克隆过来



            $div.find("input[name='copy']").bind("click", { userId: context.userId }, XC.copyLastRecord); //绑定拷贝记录事件
            //#region 添加气泡提示绑定

            $div.find("[name='jsSheBao']")
            .bind("mouseover", {}, function () {
                tipD.message = "点击，根据社保基数生成各种社保值";
                $(this).jCallout(tipD);
            })
            .bind("mouseout", {}, function () {
                $(this).jCallout("hide");
            })
            //#endregion
            //#region 绑定改变值，自动小计事件
            $("table[name='yingFa']").find("input").bind("change", {}, XC.change_YingFa);
            $("table[name='yingKou']").find("input").bind("change", {}, XC.change_YingKou);
            $("table[name='gongSiChengDan']").find("input").bind("change", {}, XC.change_GongSiChengDan);
            //#endregion 
            //#region 生成项目ddl
            //            var str = [];
            //            for (var i = 0; i < baseData["项目"].length; i++) {
            //                var obj = baseData["项目"][i];
            //                str.push(String.format("<option value={0}>{1}</option>", obj.key, obj.value));

            //            }
            //            $div.find("select[itemid = 'xc_XiangMuId']").append(str.join(""));
            //#endregion            
            //#region 生成调整原因
            // var yuanYin = jsonArray.firstOrDefault("itemId", "xc_YuanYin");
            // yuanYin.init.addRange(result); //名字字符串赋值
            var yuanYinArray = [];
            if (type == "add") {
                yuanYinArray = result;
            }
            else if (type == "update") {
                yuanYinArray = result[1];
            }

            $div.find("a[name='xuanze']").bind("click", { zNodes: yuanYinArray }, TS.showMenu);
            //#endregion
            //#region money类型绑定事件
            for (var i = 0; i < jsonArray.length; i++) {
                var itemId = jsonArray[i].itemId;
                if (jsonArray[i].validates) {
                    if (jsonArray[i].validates.contains("money")) {
                        $div.find("[itemid='" + itemId + "']").numeral();
                    }
                    if (jsonArray[i].validates.contains("datetime")) {
                        $div.find("[itemid='" + itemId + "']").datepicker({ changeMonth: true, changeYear: true });
                    }
                }
            }
            for (var i = 0; i < jsonArray_JS.length; i++) {
                var itemId = jsonArray_JS[i].itemId;
                if (jsonArray_JS[i].validates) {
                    if (jsonArray_JS[i].validates.contains("money")) {
                        $div.find("[itemid='" + itemId + "']").numeral();
                    }
                    if (jsonArray_JS[i].validates.contains("datetime")) {
                        $div.find("[itemid='" + itemId + "']").datepicker({ changeMonth: true, changeYear: true });
                    }
                }
            }
            //#endregion


            if (type == "update") {
                //初始化数据
                
                XC._initDom(result[0], result[2]);
            }
            else if (type == "add") {
                //$div.find("input[name='xc_TiaoZhengLeiXing'][value='0']").trigger("click"); //默认点击不停发工资
                $div.find(".ddlZhuangTai").val("0");
                $div.find(".ddlZhuangTai").trigger("change");
            }
        }
        else if (context.userContent == "addXinChou") {
            if (result) {
                var userId = context.userId;
                $.jBox.tip('添加成功', 'success');
                XC.initDom(userId, "update");
            }
            else {
                $.jBox.tip('添加失败', 'error');
            }
        }
        else if (context.userContent == "updateXinChou") {
            if (result) {
                var userId = context.userId;
                $.jBox.tip('更新成功', 'success');
                XC.initDom(userId, "update");
            }
            else {
                $.jBox.tip('更新失败', 'error');
            }
        }
        else if (context.userContent == "delXinChou") {
            if (result) {
                var userId = context.userId;
                $.jBox.tip('删除成功', 'success');
                XC.initDom(userId, "update");
            }
            else {
                $.jBox.tip('删除失败', 'error');
            }
        }
        else if (context.userContent == "getLastRecordXinChou") {
            var obj = result;
            if (!obj) {
                $.jBox.tip("拷贝失败。没有记录可拷贝！当前员工没有薪酬记录。", "error");
            }
            else {
                $.jBox.tip("拷贝成功。当前已是最新的记录！", "success");
                XC._ToDate(obj);
                XC._initDom(obj);
            }
        }
    }
    function errorCallBack(result, context) { }
    //#region 句柄
    XC.Add = function (userId) {
        $invokeWebService_2("~WebService_RenLi.getDistinctTZYY", {}, null, successCallBack, errorCallBack, null, { userContent: "getDistinctTZYY", userId: userId, type: "add" });


        //var optionJbox = { title: "添加", width: 850, buttons: { "添加": "1", "取消": "0" }, submit: XC._clickAdd };

    }
    XC.clickDetail = function (id) {
        $invokeWebService_2("~WebService_RenLi.getXinChou", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "getXinChou", id: id, type: "review" });
    }
    XC.clickEdit = function (id) {
        $invokeWebService_2("~WebService_RenLi.getXinChouInfo", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "getXinChouInfo", id: id, type: "update" });
    }
    XC.clickDel = function (id, userId) {
        var ramdomId = String.randomString(6);
        $.jBox.confirm(String.format("<input id='{0}' type='hidden'>你确定要删除这条记录吗？", ramdomId), "确定删除吗？", XC._clickDel, { buttons: { "删除": "1", "取消": "0"} })
        $("#" + ramdomId).data("data", { id: id, userId: userId });

    }
    XC._clickAdd = function (v, h, f) {
        
        if (v == "0") return true;
        //#region 收集数据
        var _obj = {};
        var _jieSuan = null;
        h.find("[itemid]").each(function (index, dom) {
            var itemId = $(this).attr("itemid");
            _obj[itemId] = $(this).val();
        })
        var zhuangTai = _obj["xc_TiaoZhengLeiXing"];
        var jsonArr_JS = createJson_JieSuan();
        if (zhuangTai == "2") {
            //结算
            _jieSuan = {};

            jsonArr_JS.each(function (item) {
                var itemid = item.itemId;
                _jieSuan[itemid] = _obj[itemid];
            })
            _obj["xc_TiaoZhengShijian"] = _jieSuan["xcjs_JieSuan_StartDate"]; //调整时间（无实际意义，为了参与排序）
        }
        //删除收集的薪酬里的结算字段
        jsonArr_JS.each(function (item) {
            var itemid = item.itemId;
            delete _obj[itemid];
        })

        //#endregion
        //#region 验证(十一过后改成 jquery1.9.0)
        if (zhuangTai == "2") {
            for (var key in _jieSuan) {
                var ins = jsonArr_JS.firstOrDefault("itemId", key);

                if (ins.validates && ins.validates.contains("required")) {
                    if ($.trim(_jieSuan[key]) == "") {
                        h.find("[itemid='" + key + "']").jCallout({ message: "此项不能为空!" });
                        return false;
                    }
                    else {
                        //h.find("[itemid='" + key + "']").jCallout("hide");
                    }
                }
            }
        }

        var jsonArr = createJson();

        for (var key in _obj) {
            var ins = jsonArr.firstOrDefault("itemId", key);
            if (ins == null) 
            if (ins.validates && ins.validates.contains("required")) {
                if ($.trim(_obj[key]) == "") {
                    h.find("[itemid='" + key + "']").jCallout({ message: "此项不能为空!" });
                    return false;
                }
                else {
                    //h.find("[itemid='" + key + "']").jCallout("hide");
                }
            }
        }
        //#endregion
        var userId = h.find("input[type='hidden'][data]").data("userId");
        _obj["xc_UserId"] = userId;
        $invokeWebService_2("~WebService_RenLi.addXinChou", { obj: _obj, jieSuan: _jieSuan },
                function () {
                    $.jBox.tip("正在提交数据...", 'loading');
                }
                , successCallBack, errorCallBack, null, { userContent: "addXinChou", userId: userId });
    }
    XC._clickEdit = function (v, h, f) {

        if (v == "0") return true;
        //#region 收集数据
        var _obj = {};
        var _jieSuan = null;
        h.find("[itemid]").each(function (index, dom) {
            var itemId = $(this).attr("itemid");
            _obj[itemId] = $(this).val();
        })
        var zhuangTai = _obj["xc_TiaoZhengLeiXing"];
        var jsonArr_JS = createJson_JieSuan();
        if (zhuangTai == "2") {
            //结算
            _jieSuan = {};

            jsonArr_JS.each(function (item) {
                var itemid = item.itemId;
                _jieSuan[itemid] = _obj[itemid];
            })
            _obj["xc_TiaoZhengShijian"] = _jieSuan["xcjs_JieSuan_StartDate"]; //调整时间（无实际意义，为了参与排序）
        }
        //删除收集的薪酬里的结算字段
        jsonArr_JS.each(function (item) {
            var itemid = item.itemId;
            delete _obj[itemid];
        })

        //#endregion
        var zhuangTai = _obj["xc_TiaoZhengLeiXing"];
        //#region 验证(十一过后改成 jquery1.9.0)
        if (zhuangTai == "2") {
            for (var key in _jieSuan) {
                var ins = jsonArr_JS.firstOrDefault("itemId", key);

                if (ins.validates && ins.validates.contains("required")) {
                    if ($.trim(_jieSuan[key]) == "") {
                        h.find("[itemid='" + key + "']").jCallout({ message: "此项不能为空!" });
                        return false;
                    }
                    else {
                        //h.find("[itemid='" + key + "']").jCallout("hide");
                    }
                }
            }
        }

        var jsonArr = createJson();

        for (var key in _obj) {
            var ins = jsonArr.firstOrDefault("itemId", key);
            if (ins == null) 
            if (ins.validates && ins.validates.contains("required")) {
                if ($.trim(_obj[key]) == "") {
                    h.find("[itemid='" + key + "']").jCallout({ message: "此项不能为空!" });
                    return false;
                }
                else {
                    //h.find("[itemid='" + key + "']").jCallout("hide");
                }
            }
        }
        //#endregion

        var obj = h.find("input[type='hidden'][data]").data("obj");
        obj = $.extend({}, obj, _obj);
        //#region 删除对象属性

        for (key in obj) {
            if (typeof (obj[key]) == "object") {
                delete obj[key];
            }
        }
        //#endregion
        if (zhuangTai != "2") {
            _jieSuan = null;
        }

        $invokeWebService_2("~WebService_RenLi.updateXinChou", { obj: obj, jieSuan: _jieSuan },
                function () {
                    $.jBox.tip("正在提交数据...", 'loading');
                }
                , successCallBack, errorCallBack, null, { userContent: "updateXinChou", userId: obj.xc_UserId });
    }
    XC._clickDel = function (v, h, f) {
        if (v == "1") {
            var data = h.find("input[type='hidden']").data("data");
            var id = data.id;
            var userId = data.userId;

            $invokeWebService_2("~WebService_RenLi.delXinChou", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "delXinChou", userId: userId });
        }
        return true;
        //$invokeWebService_2("~WebService_RenLi.getXinChouInfo", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "getXinChouInfo", id: id, type: "update" });
    }
    XC.change_YingFa = function (event) {
        var sum = 0;
        var $div = $("#" + XC.divId).find("table[name='yingFa']");
        if (event == "review") {
            $div.find("label[name!='xiaoji']").each(function (index, dom) {
                sum += Number($(this).html());
            })
        } else {
            $div.find("input").each(function (index, dom) {
                sum += Number($(this).val());
            })
        }
        $div.find("label[name='xiaoji']").html(sum).formatCurrency(null, { roundToDecimalPlace: 2 })
        .hide()
        .show(1000);
    }
    XC.change_YingKou = function (event) {
        var sum = 0;
        var $div = $("#" + XC.divId).find("table[name='yingKou']");
        if (event == "review") {
            $div.find("label[name!='xiaoji']").each(function (index, dom) {
                sum += Number($(this).html());
            })
        }
        else {
            $div.find("input").each(function (index, dom) {
                sum += Number($(this).val());
            })
        }
        $div.find("label[name='xiaoji']").html(sum).formatCurrency(null, { roundToDecimalPlace: 2 })
        .hide()
        .show(1000);
    }
    XC.change_GongSiChengDan = function (event) {
        var sum = 0;
        var $div = $("#" + XC.divId).find("table[name='gongSiChengDan']");
        if (event == "review") {
            $div.find("label[name!='xiaoji']").each(function (index, dom) {
                sum += Number($(this).html());
            })
        }
        else {
            $div.find("input").each(function (index, dom) {
                sum += Number($(this).val());
            })
        }
        $div.find("label[name='xiaoji']").html(sum).formatCurrency(null, { roundToDecimalPlace: 2 })
        .hide()
        .show(1000);
    }
    XC.copyLastRecord = function (event) {

        var userId = event.data.userId;
        $invokeWebService_2("~WebService_RenLi.getLastRecordXinChou", { userId: userId }, null, successCallBack, errorCallBack, null, { userContent: "getLastRecordXinChou" });
    }
    XC.clickTingFaGongZi = function (event) {
        var value = $(this).attr("value");
        var $div = $("#" + XC.divId);
        if (value == "1") {
            $div.find(".sec").hide();
        }
        else if (value == "0") {
            $div.find(".sec").show();
        }
        $div.find("input[itemid='xc_TiaoZhengLeiXing']").val(value);
    }
    XC.ddlZhuangTaiChange = function (node) {

        var selectdValue = $(node).val();
        var $div = $("#" + XC.divId);
        switch (selectdValue) {
            case "0": //正常发放
                $div.find(".sec").show();
                $div.find(".jiesuan:first").hide();
                break;
            case "1": //停发
                $div.find(".sec").hide();
                $div.find(".tingfa:first").show();
                break;
            case "2": //结算
                $div.find(".sec").show();
                $div.find(".tingfa:first").hide();
                break;
        }
    }
    //#endregiong 句柄


    function createJson() {
        var jsonArray = [];
        jsonArray.push({ itemId: "xc_YuanYin", type: "textSelect", title: "调整原因", init: [] });
        //        jsonArray.push({ itemId: "xc_XiangMuBianDong", type: "select", title: "项目变动", init: [{ id: "1", title: "进入项目" }, { id: "2", title: "停止项目"}] });
        //        jsonArray.push({ itemId: "xc_XiangMuId", type: "select", title: "项目名称", init: [{ "1": "需要数据"}] });
        jsonArray.push({ itemId: "xc_TiaoZhengShijian", type: "text", title: "调整时间", validates: ["required", "datetime"] });
        jsonArray.push({ itemId: "xc_TiaoZhengLeiXing", type: "select", title: "是否停发工资", validates: ["required"] });
        jsonArray.push({ itemId: "xc_YangLaoJiShu", type: "text", title: "养老基数", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_YiliaoJiShu", type: "text", title: "医疗等基数", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_YF_JiBenGongZi", type: "text", title: "基本工资", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_YF_GangWeiGongZi", type: "text", title: "岗位工资", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_YF_TongXun", type: "text", title: "通讯补贴", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_YF_ShengHuo", type: "text", title: "生活补贴", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_YF_JiaoTong", type: "text", title: "交通补贴", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_YF_ZhuWai", type: "text", title: "驻外补贴", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_YF_GuaZhengFei", type: "text", title: "挂证费", validates: ["required", "money"] });
        //jsonArray.push({ itemId: "xc_YF_QiTa", type: "text", title: "其他（应发）", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_YK_YangLao", type: "text", title: "养老保险", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_YK_YiLiao", type: "text", title: "医疗保险", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_YK_ShengYu", type: "text", title: "生育保险", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_YK_ShiYe", type: "text", title: "失业保险", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_YK_GongShang", type: "text", title: "工伤保险", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_YK_DaBing", type: "text", title: "大病保险", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_YK_FengXianJin", type: "text", title: "风险金", validates: ["required", "money"] });
        //jsonArray.push({ itemId: "xc_YK_QiTa", type: "text", title: "其他（应扣）", validates: ["required", "money"] });
        //jsonArray.push({ itemId: "xc_YK_GeShui", type: "text", title: "个税", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_GS_YangLao", type: "text", title: "公司承担-养老", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_GS_YiLiao", type: "text", title: "公司承担-医疗", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_GS_Sheng", type: "text", title: "公司承担-生育", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_GS_ShiYe", type: "text", title: "公司承担-失业", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_GS_GongShang", type: "text", title: "公司承担-工伤", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_GS_DaBing", type: "text", title: "公司承担-大病", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_GS_ShangBao", type: "text", title: "公司承担-商保", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_GS_Qi", type: "text", title: "公司承担-其他", validates: ["required", "money"] });
        jsonArray.push({ itemId: "xc_BeiZhu_YingFa", type: "ntext", title: "备注（应发）" });
        jsonArray.push({ itemId: "xc_BeiZhu_YingKou", type: "ntext", title: "备注（应扣）" });
        return jsonArray;
    }
    function createJson_JieSuan() {
        var jsonArray = [];
        jsonArray.push({ itemId: "xcjs_FaFang_Year", type: "select", title: "发放年", validates: ["required"] });
        jsonArray.push({ itemId: "xcjs_FaFang_Month", type: "select", title: "发放月份", validates: ["required"] });
        jsonArray.push({ itemId: "xcjs_JieSuan_StartDate", type: "text", title: "结算开始日期", validates: ["required", "datetime"] });
        jsonArray.push({ itemId: "xcjs_JieSuan_EndDate", type: "text", title: "结算终止日期", validates: ["required", "datetime"] });

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

            str.push("<td>调整原因</td>");
            str.push("<td>调整时间</td>");
            str.push("<td>应发金额</td>");
            str.push("<td>应扣金额</td>");
            str.push("<td class='tdOpation'>操作</td>");
            str.push("</tr>");
            //表内容

            for (var j = 0; j < datas.length; j++) {
                var item = datas[j];
                var id = item.xinChouId;

                var tiaoZhengShiJian = item["tiaoZhengShiJian"] == null ? "" : strToDate(item["tiaoZhengShiJian"]).pattern("yyyy-MM-dd");
                str.push("<tr class='row'>");


                str.push(String.format("<td>{0}</td>", item["tiaoZhengYuanYin"]));
                var warn = "";
                if (item["tiaoZhengLeiXing"] == 1) {
                    warn = "<font class='red_B'>&nbsp;(停发工资)</font>";
                }
                else if (item["tiaoZhengLeiXing"] == 2) {
                    warn = "<font class='Org_B'>&nbsp;(结算工资)</font>";
                }
                str.push(String.format("<td>{0}{1}</td>", item["tiaoZhengShiJian"], warn));
                str.push(String.format("<td class='mon wid1'><label validate='money'>{0}</label></td>", item["yingLingJinE"]));
                str.push(String.format("<td class='mon wid1'><label validate='money'>{0}</label></td>", item["yingKouJinE"]));

                if (!type || type == "update") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"XC.clickDetail({0})\">详细</a>|<a href='javascript:void(0);' onclick=\"XC.clickEdit({0})\">编辑</a>|<a href='javascript:void(0);' onclick=\"XC.clickDel({0},{1})\">删除</a></span></td>", id, userId));
                }
                else if (type == "review") {
                    str.push(String.format("<td class='tdOpation'><span class='opation'><a href='javascript:void(0);' onclick=\"XC.clickDetail({0})\">详细</a></span></td>", id, userId));
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
        var $div = $("#" + XC.Prefix + userId);
        $div.find("tr[class*='row']:odd").addClass("bg1");
        $div.find("tr[class*='row']").bind("mouseover", {}, function () {
            $(this).addClass("mouseover");
        });
        $div.find("tr[class*='row']").bind("mouseout", {}, function () {
            $(this).removeClass("mouseover");
        });

        $div.find("[validate='money']").formatCurrency(null, { roundToDecimalPlace: 2 });
    }
    //#endregion
    window.XC = XC;
})()