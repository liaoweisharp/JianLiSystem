/// <reference path="../jQuery/jquery-1.6.1.min.js" />

var baseData;//{"合同签订状态","项目分类", }
var pageSize;
var requireColumn; //需要的列
var loading;

$(function () {
//    $(".ZX_BG_header").hide();
//    var html = "<div style='margin:15px auto;'><center>请输入密码：<input id='txtPW' type='password'></center></div>"
//    $.jBox(html, { title: "密码", buttons: { "确认": "1" }, submit: function (v) {
//        
//        if (v == "1") {

//            if ($.trim($("#txtPW").val()) == "mingqing2") { $.jBox.tip('密码正确', 'success'); $(".ZX_BG_header").show(); initDataDom(); }
//            else {
//                $.jBox.tip('密码错误，请重试或联系工作人员。', 'error');
//                return false;
//            }
//        }
//    }, showClose: false
//    });
initDataDom();
})
function HT() { }

function initDataDom() {
    pageSize=10;
    baseData = {};
    where_HeTong = null;
    requireColumn = ["ht_Number", "ht_MingCheng", "ht_QianDingZhuangTai"];
    loading = "<p><center><img src='../Images/ajax-loader_b.gif'/></center></p>";
    HT.pd = {};
    $invokeWebService_2("~WebService_HeTong.getInitData", {}, null, successCallBack, errorCallBack, null, "getInitData");
//    $invokeWebService_2("~WebService_HeTong.getHeTongInfo", { htId: 24 }, null, function (result) { 
//        
//    }, errorCallBack, null, "getInitData");
    
}
    

function successCallBack(result,context){

    if (context == "getInitData") {
        baseData["newObject"] = result[0]; // 这个没用了
        baseData["工程地点"] = result[1];
        baseData["获取方式"] = result[2];
        baseData["合同付款方式"] = result[3];
        baseData["合同签订状态"] = result[4];
        baseData["合同执行部门"] = result[5];
        baseData["投资性质"] = result[6];
        baseData["项目分类"] = result[7];
        baseData["业务类型"] = result[8];
        baseData["变更方式"] = result[9];
        baseData["变更监理费类型"] = result[10];
        baseData["发票款项性质"] = result[11];
        baseData["归档情况"] = result[12];
        baseData["工程进度"] = result[13];
        baseData["收费方式"] = result[14];
        baseData["合同金额说明"] = result[15];


        //开始调用显示合同列表
        callListHeTong(null);
        //开始调用项目前期
        new XMQQ("divPageSize_QQ", "divContent_QQ");
    }
    else if (context.userContent == "getQQnoHeTong") {
        baseData["QianQiNoHeTong"]=result;//没有合同的项目前期
    }
    else if (context.userContent == "countHeTong") {
    
        var optInit = getOptionsFromForm();
        $("#divPageSize").pagination(result, optInit);
        $("#divPageSize").show();
    }
    else if (context.userContent == "filterHeTongWrappper") {
        
        var data = result;
        //#region 日期转换成日期格式
     
        //如果还有不存在Json的日期类型还需要在此处转换
        //#endregion
        baseData["heTongArray"] = data;
        if (data.length == 0 && !HT.pd.filter) {
            $("#divContent").html("还没有合同的记录哦，要添加一个合同请点击右上角的\"添加\"按钮");
        }
        else {
            var str = getHtmlOfHeTong(data);
            $("#divContent").html(str);
            tableAddStyle();
        }
    }
    else if (context == "addHeTong") {

        if (result) {
            initDataDom();
            $.jBox.tip('添加成功。', 'success');
        }
        else {
            $.jBox.tip('添加失败。', 'error');
        }
    }
    else if (context.userContent == "updateHeTong" || context.userContent == "updateHeTongVice" || context.userContent == "updateJieSuan") {
    
        if(result)
        {
            $.jBox.tip('更新成功', 'success');
            HT.pageselectCallback(HT.pd.currentPageNumber, null);
        }
        else{
            $.jBox.tip('更新失败', 'error');
        }
    }
    
    else if (context.userContent == "delHeTong") {
        HT.pageselectCallback(HT.pd.currentPageNumber, null);
    }
    else if (context.userContent == "getHeTongInfo") {
    
        var jsonOfHeTong = createJson();
        var jsonOfHTV = createJson_htv();
        //var jsonOfJieSuan = createJson_jieSuan();

        var ht = result[0];
        conventToDateTime(ht, jsonOfHeTong);
        var htv = result[1];
        
        conventToDateTime(htv, jsonOfHTV);
       // var jieSuan = result[2];
       // conventToDateTime(jieSuan, jsonOfJieSuan);
        
       /// var baseData["没有合同的前期"]=result[3];//没有合同的前期并且包含自己
        var id1=context.id1;
        var id2=context.id2;
     //   var id3=context.id3;
        var type = context.type;

        var json = jsonOfHeTong.firstOrDefault("itemId", "ht_QqId");
        
        if(json){
             var init = [];
             for (var i = 0; i < result[3].length; i++) {
                 init.push({ id: result[3][i].qq_Id, title: result[3][i].qq_GongChengMingCheng });
             }
            json.init=init;
        }
        
        if(context.type=="review") {
            var htId = context.htId;
            var _ht = result[4];
            if (_ht == null) return;
            var itemId="zanJianLiFeiZongE";
            jsonOfHTV.push({ title: "监理费总额(万元)", itemId: itemId, type: "text", validate: "money" });
            htv[itemId] = _ht[itemId];
            var itemId = "yingShouKuanZongE";
            jsonOfHTV.push({ title: "应收款总额(万元)", itemId: itemId, type: "text", validate: "money" });
            htv[itemId] = _ht[itemId];
            var itemId = "yiShouKuanZongE";
            jsonOfHTV.push({ title: "实收款总额(万元)", itemId: itemId, type: "text", validate: "money" });
            htv[itemId] = _ht[itemId];
            var itemId = "leJiYiKaiPiaoZongE";
            jsonOfHTV.push({ title: "开票总额(万元)", itemId: itemId, type: "text", validate: "money" });
            htv[itemId] = _ht[itemId];

            var index = jsonOfHTV.indexOf("itemId", "htv_LvYueTuiHuanShiJian");
            if (index > -1) {
                var itemId = "ht_LvYueBaoZhengJin";
                jsonOfHTV.insertAt(index+1, { title: "履约保证金应退总额(万元)", itemId: itemId, type: "text", validate: "money" });
                htv[itemId] = ht[itemId];
            }
            
            

            var yuE = 0;

            if (htv.htv_JieSuanJianLiFei) {
                yuE = htv.htv_JieSuanJianLiFei - _ht["yiShouKuanZongE"];
            }
            else if (_ht.zanJianLiFeiZongE) {
                yuE = _ht.zanJianLiFeiZongE - _ht["yiShouKuanZongE"];
            }
            else{
                yuE="";
            }
            
            var itemId = "yuE";
            jsonOfHTV.push({ title: "余额(万元)", itemId: itemId, type: "text", validate: "money" });
            htv[itemId] = yuE;
            new bindDiv(jsonOfHeTong, ht, id1, { type: type }, null);
            new bindDiv(jsonOfHTV, htv, id2, { type: type ,align:'y'}, null);
            //new bindDiv(jsonOfJieSuan, jieSuan, id3, { type: type }, null);
        }
        else if(context.type=="update"){
            new bindDiv(jsonOfHeTong, ht, id1, { type: type }, clickUpdate_HT);
            new bindDiv(jsonOfHTV, htv, id2, { type: type ,align:'y'}, clickUpdate_HTV);
            //new bindDiv(jsonOfJieSuan, jieSuan, id3, { type: type }, clickUpdate_JieSuan);
        }
    }
}
function errorCallBack(result, context) {
    alert("回调错误");
    
}
//#region Html
//得到合同的记录的html
function getHtmlOfHeTong(heTongs){
      //表头
        var str = [];
    var jsonArray = createJson();
    
        str.push("<table class='tb_List HT' cellspacing='1' cellpadding='2'>");
        str.push("<tr class='header'>");
        str.push("<td class='num'>#</td>");
        str.push("<td class='td1'>合同号");

        if (HT.pd.order && HT.pd.order.key == "hetonghao") {
            str.push("&nbsp;<img class='imgPaiXu p' src='../Images/paiXu_light.gif' title='排序' onclick=\"click_Order('hetonghao')\">");
        }
        else {
            str.push("&nbsp;<img class='imgPaiXu p' src='../Images/paiXu.gif' title='排序' onclick=\"click_Order('hetonghao')\">");
        }
      
        str.push("</td>");
        str.push("<td class='td2'>合同名称</td>");
        str.push("<td class='td11'>执行类型");
        str.push("<span class='flowButton'>");
        if (HT.pd.filter && HT.pd.filter.key == "zhixingleixing") {
            str.push("&nbsp;<img class='imgPaiXu' src='../Images/sanJiao_light.gif' title='筛选'>");
        }
        else {
            str.push("&nbsp;<img class='imgPaiXu' src='../Images/sanJiao.gif' title='筛选'>");
        }
        
        str.push("<span class='flow flow_LeiXing hid'>");
        str.push("<ul>");
        str.push(String.format("<li id='{0}' >{1}</li>", "-1", "全部"));
        str.push(String.format("<li id='{0}' class='{2}' style='color:gray;'><i>({1})</i></li>", "0", "空", (HT.pd.filter && HT.pd.filter.key == "zhixingleixing" && HT.pd.filter.value==null)?"selBg":""));
        baseData["合同执行部门"].each(function (item) {

            str.push(String.format("<li id='{0}' class='{2}'>{1}</li>", item.bm_Id, item.bm_Name, (HT.pd.filter && HT.pd.filter.key == "zhixingleixing" && HT.pd.filter.value==item.bm_Id)?"selBg":""));
        })
      
        str.push("</ul>");
        str.push("</span>");
        str.push("</span>");
        str.push("</td>");
        str.push("<td class='td3'>监理费总额(万元)</td>");
      
        
        str.push("<td class='td3'>合同金额（万元）</td>");
        str.push("<td class='td4'>应收款总额(万元)</td>");
        str.push("<td class='td5'>实收款总额(万元)</td>");
        str.push("<td class='td6'>开票总额(万元)</td>");
        str.push("<td class='td7'>履约/质保金</td>");

        str.push("<td class='td12'>工程进度</td>");
        str.push("<td class='td13'>竣工资料移交</td>");
        str.push("<td class='td9'>变更及收款</td>");
        str.push("<td class='td10'>操作</td>");
        str.push("</tr>");
        //表内容
        if (heTongs.length > 0) {
        for (var i = 0; i < heTongs.length; i++) {
            var ht = heTongs[i];
            str.push("<tr class='row'>");
            str.push(String.format("<td class='num'>{0}</td>", HT.pd.currentPageNumber * HT.pd.pageSize + 1 + i));
            str.push(String.format("<td class='td1'>{0}</td>", ht.heTongHao == null ? "" : ht.heTongHao));
            if (ht.jieSuanJianLiFei != null && ht.jieSuanJianLiFei == ht.zanJianLiFeiZongE) {
                str.push(String.format("<td class='td2'><a class='red' href='javascript:void(0);' onclick=\"clickDetail({1})\">{0}</a></td>", ht.ht_MingCheng == null ? "" : ht.ht_MingCheng, ht.ht_Id));
            }
            else {
                str.push(String.format("<td class='td2'><a href='javascript:void(0);' onclick=\"clickDetail({1})\">{0}</a></td>", ht.ht_MingCheng == null ? "" : ht.ht_MingCheng, ht.ht_Id));
            }
            str.push(String.format("<td class='td11'>{0}</td>", ht.zhiXingLeiXing == null ? "" : ht.zhiXingLeiXing));

            str.push(String.format("<td class='td3'>{0}</td>", ht.zanJianLiFeiZongE == null ? "" : "<label validate='money' validatechild='元'>" + ht.zanJianLiFeiZongE + "</label>"));
            str.push(String.format("<td class='td3'>{0}</td>", ht.heTongJinE == null ? "" : "<label validate='money' validatechild='元'>" + ht.heTongJinE + "</label>"));
            str.push(String.format("<td class='td4'>{0}</td>", ht.yingShouKuanZongE == null ? "" : "<label validate='money' validatechild='元'>" + ht.yingShouKuanZongE + "</label>"));
            str.push(String.format("<td class='td5'>{0}</td>", ht.yiShouKuanZongE == null ? "" : "<label validate='money' validatechild='元'>" + ht.yiShouKuanZongE + "</label>"));
            str.push(String.format("<td class='td6'>{0}</td>", ht.leJiYiKaiPiaoZongE == null ? "" : "<label validate='money' validatechild='元'>" + ht.leJiYiKaiPiaoZongE + "</label>"));
            str.push(String.format("<td class='td7'>", ht.isTuiLvYue ? "已退" : "未退", ht.isTuiZhiBao ? "已退" : "未退"));
            var lvBaoJin = "";
            if (ht.lvYueBaoZhengJin == null) {
                lvBaoJin = "<img src='../Images/mark.png' title='信息不全，请检查'/>";
            }
            else {
                switch (ht.lvYueBaoZhengJin) {
                    case 1:
                        lvBaoJin = "<font style='color:green'>已退</font>";
                        break;
                    case 2:
                        lvBaoJin = "<font style='color:red'>可退</font>";
                        break;
                    case 3:
                        lvBaoJin = "<font style='color:#FFA500'>未退</font>";
                        break;
                }
            }
            str.push(String.format("{0}", lvBaoJin));

            str.push("/")
            var zhiBaoJin = "";
            if (ht.zhiBaoJin == null) {
                zhiBaoJin = "<img src='../Images/mark.png' title='信息不全，请检查'/>";
            }
            else {
                switch (ht.zhiBaoJin) {
                    case 1:
                        zhiBaoJin = "<font style='color:green'>已退</font>";
                        break;
                    case 2:
                        zhiBaoJin = "<font style='color:red'>可退</font>";
                        break;
                    case 3:
                        zhiBaoJin = "<font style='color:#FFA500'>未退</font>";
                        break;
                }
            }
            str.push(String.format("{0}", zhiBaoJin));
            str.push("</td>")
            str.push(String.format("<td class='td12'>{0}</td>", ht.gongChengZhuangTai == null ? "" : ht.gongChengZhuangTai));
            str.push(String.format("<td class='td13'>{0}</td>", ht.ziLiaoYiJiaoQingKuang));

            str.push(String.format("<td class='td9'><a href='javascript:void(0);' onclick=\"clickZhiXing('{0}','{1}')\">变更及收款</a></td>", ht.ht_Id, ht.ht_MingCheng));

            str.push(String.format("<td class='td10'><span class='opation'><a href='javascript:void(0);' onclick=\"clickEdit({0})\">编辑</a>|<a href='javascript:void(0);' onclick=\"clickDel({0})\">删除</a></span></td>",ht.ht_Id));
            
            str.push("</tr>");
        }
  

        str.push("</table>");
    }
    return str.join("");
}
function getHtmlOfZhiXing(htId,htWrapper) {

    var heTong = htWrapper;
    if(!heTong) return "";
    var htNumber = heTong.heTongHao != null ? heTong.heTongHao : "";
    var htName = heTong.ht_MingCheng;
    var str=[];
    //合同变更与争议
    str.push("<div style='width:97%;margin:8px auto;'>");
    str.push(String.format("<div class='divZX_name'><span class='ZX_name'>{0} &nbsp;&nbsp;{1}</span></div>", htNumber, htName));
    str.push("<div class='ZX_BG_header ZX_h'>");
    str.push("<ul class='ulnone'>");
    str.push("<li class='ZX_title'>合同变更与争议</li>");
    str.push(String.format("<li class='bg_A' style='float:right;'><a href='javascript:void(0);' onclick=\"HTBG.Add('{0}')\" >添加</a></li>", htId));
    str.push("</ul>");
    str.push("<br/>");
  
    str.push("</div>");

    str.push(String.format("<div id='{0}' class='ZX_con h130'>", HTBG.Prefix + htId));
    str.push("</div>");
    //收款计划
    str.push("<div class='ZX_JH_header ZX_h'>");
    str.push("<ul class='ulnone'>");
    str.push("<li class='ZX_title'>收款计划</li>");
    str.push(String.format("<li class='bg_A' style='float:right;'><a href='javascript:void(0);' onclick=\"SKJH.Add('{0}')\">添加</a></li>", htId));
    str.push("</ul>");
    str.push("<br/>");
    str.push("</div>");
    str.push(String.format("<div id='{0}' class='ZX_con h130'>", SKJH.Prefix + htId));
    str.push("</div>");

    //发票管理
    str.push("<div class='ZX_GL_header ZX_h'>");
    str.push("<ul class='ulnone'>");
    str.push("<li class='ZX_title'>发票及收款</li>");
    str.push(String.format("<li class='bg_A' style='float:right;'><a href='javascript:void(0);' onclick=\"FPGL.Add('{0}')\">添加</a></li>", htId));
    str.push("</ul>");
    str.push("<br/>");
    str.push("</div>");
    str.push(String.format("<div id='{0}' class='ZX_con h130'>", FPGL.Prefix + htId));
    str.push("</div>");


    return str.join("");
}
function getTabsHtml(id,id1,id2) {
    var str = [];
    str.push(String.format("<div id='{0}' class='tabsP'>", id));
    str.push("<ul>");
    str.push(String.format("<li><a href='#{0}'>合同基本项</a></li>", id1));
    str.push(String.format("<li><a href='#{0}'>合同执行</a></li>",id2));
    //str.push(String.format("<li><a href='#{0}'>合同结算</a></li>",id3));
    str.push("</ul>");
    str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'></div>",id1));
    str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'></div>", id2));
    //str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'></div>", id3));
    str.push("</div>");
    return str.join("");
}
//#endregion

//#region 句柄
//点击合同执行
function clickUpdate_HT(event) {

    var jsonArray = event.data.newBind.ShouJiData();
    var obj = bind.jsonToObject(jsonArray);
    obj["ht_Id"] = event.data.obj.ht_Id;
    $invokeWebService_2("~WebService_HeTong.updateHeTong", { heTong: obj }, null, successCallBack, errorCallBack, null, { userContent: "updateHeTong" });
}
function clickUpdate_HTV(event) {
    
    var jsonArray = event.data.newBind.ShouJiData();
    var obj = bind.jsonToObject(jsonArray);
    obj["htv_Id"]=event.data.obj.htv_Id;
    $invokeWebService_2("~WebService_HeTong.updateHeTongVice", {htv:obj}, null, successCallBack, errorCallBack, null,{userContent:"updateHeTongVice"});
}
function clickUpdate_JieSuan(event) {
    
    var jsonArray = event.data.newBind.ShouJiData();
    var obj = bind.jsonToObject(jsonArray);
    obj["js_Id"]=event.data.obj.js_Id;
    $invokeWebService_2("~WebService_HeTong.updateJieSuan", {jieSuan:obj}, null, successCallBack, errorCallBack, null,{userContent:"updateJieSuan"});
}
function clickZhiXing(htId) {

   
    if (window.HTWarpper) {
        //合同统计界面
        var heTong = window.HTWarpper;
    }
    else if (baseData && baseData["heTongArray"]) {
        //合同界面
        var heTong = baseData["heTongArray"].firstOrDefault("ht_Id", htId);
    }
    var str = getHtmlOfZhiXing(htId, heTong);
    $.jBox(str, { buttons: { "关闭": "0" }, height: 550, width: 880, top: "3%", title: "变更及收款", opacity: 0 });
    $invokeWebService_2("~WebService_HeTong.getHTAndChild", { htId: htId }, null, function (result, context) {
    
        baseData["合同以及变更"] = result;
        HTBG.InitDom(htId);
        SKJH.InitDom(htId);
        FPGL.InitDom(htId);

    }, errorCallBack, null, null);
}
//重新得到合同以及变更合同
function getHeTongAndChild(htId) {
    $invokeWebService_2("~WebService_HeTong.getHTAndChild", { htId: htId }, null, function (result, context) {
        baseData["合同以及变更"] = result;
    }, errorCallBack, null, null);
}
//添加合同
var click_AddHeTong = function () {
    //生成json
    //
    $invokeWebService_2("~WebService_HeTong.getQQnoHeTong", {}, null, function (result, context) {
    
        var option = { type: "new" };
        //jBox options
        var optionJbox = { title: "添加合同", width: 850, buttons: { "添加": "1", "取消": "0" }, top: "3%", submit: _clickAdd };

        var jsonArray = createJson();
        var init = [];
        for (var i = 0; i < result.length; i++) {
            init.push({id:result[i].qq_Id,title:result[i].qq_GongChengMingCheng});
        }
        jsonArray.firstOrDefault("itemId", "ht_QqId")["init"]=init;//添加初始值
        var bindObj = new bind(jsonArray, null, option, optionJbox);
    }, errorCallBack, null, "getQQnoHeTong");

}
function clickDetail(htId) {
    var id = String.randomString(6);
    var id1 = String.randomString(6);
    var id2 = String.randomString(6);
    //var id3 = String.randomString(6);
    var str = getTabsHtml(id, id1, id2);
    $("#" + id1).html(loading);
    $("#" + id2).html(loading);
    //$("#" + id3).html(loading);

    $.jBox(str, { title: "合同详细", width: 930, height: 600, top: "2%", buttons: { "关闭": "1"},opacity:0 });
    $("#" + id).tabs();
    $invokeWebService_2("~WebService_HeTong.getHeTongInfo", { htId: htId }, null, successCallBack, errorCallBack, null, { userContent: "getHeTongInfo", type: "review", id1: id1, id2: id2, htId: htId });
}

function clickEdit(htId) {
    var id = String.randomString(6);
    var id1 = String.randomString(6);
    var id2 = String.randomString(6);
    //var id3 = String.randomString(6);
    var str = getTabsHtml(id, id1, id2);
    $("#" + id1).html(loading);
    $("#" + id2).html(loading);
    //$("#" + id3).html(loading);

    $.jBox(str, { title: "编辑合同相关" ,width:900 ,top:"3%", buttons:{}});
    $("#" + id).tabs();
    $invokeWebService_2("~WebService_HeTong.getHeTongInfo", { htId: htId }, null, successCallBack, errorCallBack, null, { userContent: "getHeTongInfo", type: "update", id1: id1, id2: id2 });
}
function clickDel(htId) {
    $.jBox.confirm(String.format("<input type='hidden' value='{0}'>你确定要删除这份合同记录吗？对应的\"\合同与变更\"、\"收款计划\"等，会一起删除", htId), "确定删除吗？",_clickDel,{ buttons: { "删除": "1", "取消": "0" }})
}
function _clickAdd(v,h, f) {
    
    if (v == "1") {
        var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
        var jsonArray = bindObj.ShouJiData();
        var newHeTong = bind.jsonToObject(jsonArray);

        
        $invokeWebService_2("~WebService_HeTong.addHeTong", { heTong: newHeTong }, function () {
            $.jBox.tip("添加新合同，请稍后...", 'loading');
        }, successCallBack, errorCallBack, function () {
            $.jBox.tip('完成。', 'success');
        }, "addHeTong");
    }

    
    return true;
}
function _clickEdit(v,h,f){
    if (v == "1") {
        var bindObj = h.find("[name='" + bind.Obj + "']").data("data");
        var jsonArray = bindObj.ShouJiData();
        
        var _newHeTong = bind.jsonToObject(jsonArray);
        _newHeTong["ht_Id"] = bindObj.obj.ht_Id;
        //var newHeTong = $.extend({}, bindObj.heTong, _newHeTong);
        //delete newHeTong.__type;
        $invokeWebService_2("~WebService_HeTong.updateHeTong", { heTong: _newHeTong }, function () {
            $.jBox.tip("更新中，请稍后...", 'loading');
        }, successCallBack, errorCallBack, function () {
            $.jBox.tip('完成。', 'success');
        }, { userContent: "updateHeTong" });
    }
    return true;
}
function _clickDel(v, h, f) {
    if (v == "1") {
        var htId = h.find("input[type='hidden']").attr("value");
        $invokeWebService_2("~WebService_HeTong.delHeTong", { id: htId }, null, successCallBack, errorCallBack, null, { userContent: "delHeTong" });
    }
    return true;
}
//开始调用显示合同列表
function callListHeTong(where) {

    $invokeWebService_2("~WebService_HeTong.countHeTong", { pageClass: HT.pd, where: where }, null, successCallBack, errorCallBack, null, { userContent: "countHeTong" });
}
function Click_Search_HeTong() {
    var value = $.trim($("#txtSerHeTong").val());
    if (value == "") {
        alert("搜索内容为空，请填值再搜索。");
        value=null;
    }
   
    callListHeTong(value);
    where_HeTong=value;
}
//点击排序
function click_Order(type) {

    if(!HT.pd.order)
    {
        var value="1";
    }
    else {
        if(!HT.pd.order.key){
            var value="1";
        }
        else {
            if(HT.pd.order.key==type)
            {
                var value=HT.pd.order.value=="1"?"0":"1";
            }
            else{
                var value="1";
            }
        }
    }
    HT.pd.order = !(HT.pd.order) ? {} : HT.pd.order;
    HT.pd.order.key = type;
    HT.pd.order.value = value;
    callListHeTong(null);
}
//点击筛选（执行类型）
function clickFlowLi_ZhiXingLeiXing(event) {
    
    clickFlowLi(event, $(this), "ZhiXingLeiXing")
}
//点击筛选
function clickFlowLi(event, node, type) {
    node.parent().parent().hide(); //关掉浮动层
    //记录选项
    var selectedValue = node.attr("id");
    if (selectedValue == "-1") {

        delete HT.pd.filter;
    }

    else {
        selectedValue = selectedValue == "0" ? null : selectedValue;
        HT.pd.filter = { "key": type.toLowerCase(), "value": selectedValue };

    }



    //调用WebService
    callListHeTong(null)
}
//#endregion
//#region 生成json
function createJson() {
    var jsonArray = [];
    jsonArray.push({ itemId: "ht_QqId", type: "select", title: "项目前期" });
   // jsonArray.push({ itemId: "ht_Number", type: "text", title: "合同号" });
    jsonArray.push({itemId:"ht_MingCheng",type:"text",title:"合同名称"});
    
    
    jsonArray.push({itemId:"ht_YeZhuHeTongBianHao",type:"text",title:"业主合同编号"});
    jsonArray.push({itemId:"ht_YeZhuMingCheng",type:"text",title:"业主名称"});
    jsonArray.push({itemId:"ht_XiangGuanDanWei",type:"text",title:"项管单位"});
    jsonArray.push({itemId:"ht_YiFangQianYueDanWei",type:"text",title:"乙方签约单位"});
    jsonArray.push({itemId:"ht_QianYueRiQi",type:"text",validate:"datetime",title:"合同签约日期"});
    jsonArray.push({ itemId: "ht_XiangMuFenLei", type: "select", title: "项目分类", init: getInit(baseData["项目分类"], "fl_") });

    jsonArray.push({ itemId: "ht_GongChengDiDian", type: "select", title: "工程地点", init: getInit(baseData["工程地点"], "dd_") });
    
    jsonArray.push({ itemId: "ht_TouZiXinZhi", type: "select", title: "投资性质", init: getInit(baseData["投资性质"], "xz_") });
    jsonArray.push({ itemId: "ht_GongChengZongTouZi", type: "text", validate: "money", title: "工程总投资（万元）" });
    jsonArray.push({ itemId: "ht_ShouFeiFangShi", type: "select", title: "收费方式",init:getInit(baseData["收费方式"],"sf_") });
    jsonArray.push({ itemId: "ht_HeTongJinE", type: "text", validate: "money", title: "合同金额（万元）" });
    jsonArray.push({ itemId: "ht_JinEShuoMing", type: "select", parentId:"ht_HeTongJinE",init:getInit(baseData["合同金额说明"],"jesm_")});
    jsonArray.push({ itemId: "ht_YeWuLeiXing", type: "select", title: "业务类型", init: getInit(baseData["业务类型"], "lx_") });
    jsonArray.push({ itemId: "ht_HeTongFuKuanFangShi", type: "select", title: "合同付款方式", init: getInit(baseData["合同付款方式"], "fk_") });
    jsonArray.push({ itemId: "ht_ShiGongFuWuQiXian", type: "ntext", title: "施工阶段监理服务期限" });
    jsonArray.push({ itemId: "ht_JianLiFuWuQiXian", type: "ntext", title: "监理服务期限" });
    jsonArray.push({ itemId: "ht_HeTongKaiShiRiQi",type:"text", validate: "datetime", title: "合同开始日期" });
    jsonArray.push({ itemId: "ht_HeTongJieShuRiQi", type:"text",validate: "datetime", title: "合同结束日期" });
    jsonArray.push({ itemId: "ht_HeTongNeiRong", type: "ntext", title: "合同主要条款" });
    jsonArray.push({ itemId: "ht_ZhiBaoJinYueDing", type: "ntext", title: "质保金退还约定" });
    jsonArray.push({ itemId: "ht_LvYueBaoZhengJin", type: "text", validate: "money", title: "履约保证金（万元）" });
    jsonArray.push({ itemId: "ht_LvYueZhiBaoJinYueDing", type: "ntext", title: "履约保证金退还约定(万元)" });
    
    jsonArray.push({ itemId: "ht_GongChengGuiMoYuGaiKuang", type: "ntext", title: "工程规模与概况" });
    jsonArray.push({itemId:"ht_BeiZhu",type:"ntext",title:"备注"});
    
    return jsonArray;
}
function createJson_htv(){
    var jsonArray = [];
    jsonArray.push({ itemId: "htv_YanQiZongE", type: "text", validate: "money", title: "延期监理费预计总额（万元）" });
    //jsonArray.push({ itemId: "htv_GongChengZhuangTai", type: "text", title: "工程进度" });
    jsonArray.push({ itemId: "htv_YanQiKaiShiRiQi", type: "text",validate:"datetime", title: "延期监理费起始计费日期" });
//    jsonArray.push({ itemId: "htv_YanQiYuJiKaiShiRiQi", type: "text",validate:"datetime",  title: "延期费预计计费开始日期" });
//    jsonArray.push({ itemId: "htv_YanQiYuJiJieShuRiQi", type: "text",validate:"datetime",  title: "延期费预计计费结束日期" });
    jsonArray.push({ itemId: "htv_LvYueYingTuiHuanRiQi", type: "text", validate:"datetime", title: "履约保证金应退还时间" });
    //jsonArray.push({ itemId: "htv_LvYueYingTuiZongE", type: "text", validate:"money", title: "履约保证金应退总额(万元)" });
    jsonArray.push({ itemId: "htv_LvYueTuiHuanShiJian", type: "text",validate:"datetime",  title: "履约保证金退还时间" });
    jsonArray.push({ itemId: "htv_ZhiBaoJinTuiHuanShiJian", type: "text",validate:"datetime",  title: "质保金应退时间" });

    jsonArray.push({ itemId: "htv_ZhiBaoJinYingTuiZong", type: "text", validate: "datetime", title: "质保金退还时间" });
    jsonArray.push({ itemId: "htv_ZhiBaoJinYingTuiZongE", type: "text", validate: "money", title: "质保金应退总额（万元）" });
//    jsonArray.push({ itemId: "htv_GuiDangQingKuang", type: "select",title: "竣工资料归档情况",init: getInit(baseData["归档情况"],"gd_")});
    jsonArray.push({ itemId: "htv_BeiZhu", type: "ntext", title: "备注" });
    jsonArray.push({ itemId: "htv_JieSuanJianLiFei",isOtherCol:true, type: "text", validate: "money", title: "结算监理费（万元）" });
    jsonArray.push({ itemId: "htv_JieSuanShuoMing", type: "ntext",title: "结算说明" });
    return jsonArray;
}
function createJson_jieSuan(){
    var jsonArray = [];
//    jsonArray.push({ itemId: "js_YuJieSuanJianLiFei", type: "text",validate:"money", title: "预结算监理费（万元）" });
//    jsonArray.push({ itemId: "js_YuJieSuanShuoMing", type: "ntext", title: "预结算说明" });
    jsonArray.push({ itemId: "js_JieSuanJianLiFei", type: "text", validate: "money", title: "结算监理费（万元）" });
    jsonArray.push({ itemId: "js_JieSuanShuoMing", type: "ntext", title: "结算说明" });
    return jsonArray;
}
//公用

//#endregion
//#region 其他


function getOptionsFromForm() {

    var opt = { callback: HT.pageselectCallback, items_per_page: pageSize, next_text: "下页", num_display_entries:pageSize , num_edge_entries: 2, prev_text: "上页" };
    var htmlspecialchars = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }
    $.each(htmlspecialchars, function (k, v) {
        opt.prev_text = opt.prev_text.replace(k, v);
        opt.next_text = opt.next_text.replace(k, v);
    })
    return opt;
}

HT.pageselectCallback=function(page_index, jq) {
    
    HT.pd.currentPageNumber = page_index;
    HT.pd.pageSize = pageSize;
    
    $invokeWebService_2("~WebService_HeTong.filterHeTongWrappper", { pageClass: HT.pd,where:where_HeTong },
       function () {
           $("#divContent").html(loading);
       }, successCallBack, errorCallBack, null, { userContent: "filterHeTongWrappper" });
   }

  
   //合同列表添加样式和事件
   function tableAddStyle() {
       $("#divContent,#divContentQQ").find("tr[class*='header']").addClass("bgHeader");
       $("#divContent,#divContentQQ").find("tr[class*='row']:odd").addClass("bg1");
       $("#divContent,#divContentQQ").find("tr[class*='row']").bind("mouseover", {}, function () {
            $(this).addClass("mouseover");
       })
        $("#divContent,#divContentQQ").find("tr[class*='row']").bind("mouseout", {}, function () {
            $(this).removeClass("mouseover");
        })
        $("#divContent,#divContentQQ").find("td").find("label[validate='money']").formatCurrency();

        //筛选层样式
        $(".flowButton").hover(
        function () {
            $(this).find(".flow").show();
        },
        function () {
            $(this).find(".flow").hide();
        }
        )
        $(".flow li").hover(
        function () {
            $(this).addClass("hovBg");
        },
        function () {
            $(this).removeClass("hovBg");
        }
        )
        .bind("click", {}, clickFlowLi_ZhiXingLeiXing)

   }


//#endregion