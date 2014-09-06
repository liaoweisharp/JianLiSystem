var baseData = {};
var pageSize;

$(function () {
//        $(".ZX_BG_header").hide();
//        var html = "<div style='margin:15px auto;'><center>请输入密码：<input id='txtPW' type='password'></center></div>"
//        $.jBox(html, { title: "密码", buttons: { "确认": "1" }, submit: function (v) {
//            
//            if (v == "1") {

//                if ($.trim($("#txtPW").val()) == "mingqing2") { $.jBox.tip('密码正确', 'success'); $(".ZX_BG_header").show(); initDataDom(); }
//                else {
//                    $.jBox.tip('密码错误，请重试或联系工作人员。', 'error');
//                    return false;
//                }
//            }
//        }, showClose: false
//        });
    initDataDom();
   
})
function UU() { }
function initDataDom() {
    pageSize = 20;
    baseData = {};
    where_User = null;
    UU.pd = {};
    loading = "<p><center><img src='../Images/ajax-loader_b.gif'/></center></p>";

    $invokeWebService_2("~WebService_RenLi.getInitData", {}, null, successCallBack, errorCallBack, null, "getInitData");
}
function callListUser(where) {

    var userId = $("#ContentPlaceHolder1_hd_SessionId").attr("value");
    USER.click_EditUser(userId, '')
    //$invokeWebService_2("~WebService_RenLi.countUser", { pageClass: UU.pd, where: where }, null, successCallBack, errorCallBack, null, { userContent: "countUser" });

}
function successCallBack(result, context) {
    if (context == "getInitData") {
        baseData["部门"] = result[0];
        baseData["社保关系"] = result[1];
        baseData["户籍性质"] = result[2];
        baseData["婚姻"] = result[3];
        baseData["民族"] = result[4];
        baseData["政治面貌"] = result[5];
        baseData["入职途径"] = result[6];
        baseData["工作状态"] = result[7];
        callListUser(null);
    }
    else if (context.userContent == "countUser") {
    
        var optInit = getOptionsFromForm();
        $("#divPageSize").pagination(result, optInit);
        $("#divPageSize").show();
    }
    else if (context.userContent == "filterUserWrappper") {

        var data = result;
        NullToStr(data);
        //#region 日期转换成日期格式

        //如果还有不存在Json的日期类型还需要在此处转换
        //#endregion
        baseData["userArray"] = data;
        if (data.length == 0 && !UU.pd.filter) {
            $("#divContent").html("还没有人员的记录，要添加一个人员请点击右上角的\"添加\"按钮");
        }
        else {
            var str = getHtml(data);
            
            $("#divContent").html(str);
            tableAddStyle();
        }
    }
  
}
function errorCallBack(result, context) {

}

//#region 句柄
function click_DelUpload(id, node) {

    $invokeWebService_2("~WebService_RenLi.delUploads", { id: id }, null, function () {
        $(node).parent().remove();
    }, errorCallBack, null, { userContent: "delUploads", id: id });
}
function Click_Search_User() {

    var value = $.trim($("#txtSerUser").val());
    if (value == "") {
       // $.jBox.tip("请填写需要搜索的姓名或部门名称", "warning", { timeout: 5000 });
        $("#txtSerUser").focus();
        value = null;
    }
    callListUser(value);
    where_User = value;
}

//点击排序
function click_Order(type) {
    
    if (!UU.pd.order) {
        var value = "1";
    }
    else {
        if (!UU.pd.order.key) {
            var value = "1";
        }
        else {
            if (UU.pd.order.key == type) {
                var value = UU.pd.order.value == "1" ? "0" : "1";
            }
            else {
                var value = "1";
            }
        }
    }
    UU.pd.order = !(UU.pd.order) ? {} : UU.pd.order;
    UU.pd.order.key = type;
    UU.pd.order.value = value;
    
    callListUser(null);
}
//点击筛选（执行类型）
function clickFlowLi_ZhiXingLeiXing(event) {

    clickFlowLi(event, $(this), "GongZuoZhuangTai")
}
//点击筛选
function clickFlowLi(event, node, type) {
    node.parent().parent().hide(); //关掉浮动层
    //记录选项
    var selectedValue = node.attr("id");
    if (selectedValue == "-1") {

        delete UU.pd.filter;
    }

    else {
        selectedValue = selectedValue == "0" ? null : selectedValue;
        UU.pd.filter = { "key": type.toLowerCase(), "value": selectedValue };

    }



    //调用WebService
    callListUser(null);
}
//#endregion  

//#endregion

//#region HTML
function getHtml(datas) {
    //表头
    var str = [];
    var jsonArray = createJson();
    
        str.push("<table class='tb_List RL' cellspacing='1' cellpadding='2'>");
        str.push("<tr class='header'>");
        str.push("<td class='num'>#</td>")
        str.push('<td rowspan="2">姓名');

        if (UU.pd.order && UU.pd.order.key == "xingming") {
            str.push("&nbsp;<img class='imgPaiXu p' src='../Images/paiXu_light.gif' title='排序' onclick=\"click_Order('xingming')\">");
        }
        else {
            str.push("&nbsp;<img class='imgPaiXu p' src='../Images/paiXu.gif' title='排序' onclick=\"click_Order('xingming')\">");
        }
        str.push('</td>');
        str.push('<td rowspan="2" >编号</td>');
        str.push('<td rowspan="2">所属项目</td>');
     

        str.push("<td rowspan='2'>工作状态");
        str.push("<span class='flowButton'>");
        if (UU.pd.filter && UU.pd.filter.key == "gongzuozhuangtai") {
            str.push("&nbsp;<img class='imgPaiXu' src='../Images/sanJiao_light.gif' title='筛选'>");
        }
        else {
            str.push("&nbsp;<img class='imgPaiXu' src='../Images/sanJiao.gif' title='筛选'>");
        }
        str.push("<span class='flow flow_LeiXing hid'>");
        str.push("<ul>");
        str.push(String.format("<li id='{0}' >{1}</li>", "-1", "全部"));
        str.push(String.format("<li id='{0}' class='{2}' style='color:gray;'><i>({1})</i></li>", "0", "空", (UU.pd.filter && UU.pd.filter.key == "gongzuozhuangtai" && UU.pd.filter.value == null) ? "selBg" : ""));
        baseData["工作状态"].each(function (item) {

            str.push(String.format("<li id='{0}' class='{2}'>{1}</li>", item.zt_Id, item.zt_Name, (UU.pd.filter && UU.pd.filter.key == "gongzuozhuangtai" && UU.pd.filter.value == item.zt_Id) ? "selBg" : ""));
        })

        str.push("</ul>");
        str.push("</span>");
        str.push("</span>");
        str.push("</td>");

        str.push("<td colspan='3'>提醒</td>");
        str.push('<td rowspan="2">操作</td>');

        str.push("</tr>");
        str.push("<tr class='header'>");
       // str.push("<td>试用</td>");
        str.push("<td>继续教育</td>");
      //  str.push("<td>入职</td>");
      //  str.push("<td>社保</td>");
        str.push("<td>未转注证件</td>");
      //  str.push("<td>商保</td>");
        str.push("<td>劳动合同</td>");
        
        str.push("</tr>");
        //表内容
        if (datas.length > 0) {
            for (var i = 0; i < datas.length; i++) {
                var obj = datas[i];
                var id = obj.userId;
                var name = obj.name;
                str.push("<tr class='row'>");
                str.push(String.format("<td class='num'></td>", UU.pd.currentPageNumber  * UU.pd.pageSize+1+i));
                str.push(String.format("<td class='td1'><a href='javascript:void(0)' onclick=\"USER.click_DetailUser({1},'{0}')\">{0}</a></td>", obj.name, id));
                str.push(String.format("<td class='td2'>{0}</td>", obj.bianHao));
                str.push(String.format("<td class='td3'>{0}</td>", obj.xiangMu));
                str.push(String.format("<td class='td4'>{0}</td>", obj.zhuangTai));

                //    str.push(String.format("<td class='td6'>{0}</td>", getTiXingType(obj.tx_shiYong)));
                str.push(String.format("<td class='td7'>{0}</td>", obj.tx_jiJiao.join('<br/>')));
                //   str.push(String.format("<td class='td8'>{0}</td>", getTiXingType(obj.tx_ruZhi)));
                //    str.push(String.format("<td class='td9'>{0}</td>", getTiXingType(obj.tx_sheBao)));
                str.push(String.format("<td class='td12'>{0}</td>", obj.tx_zhuangZhu.join('<br/>')));
                str.push(String.format("<td class='td10'>{0}</td>", getTiXingType(obj.tx_laoDongHeTong)));
                //   str.push(String.format("<td class='td11'>{0}</td>", getTiXingType(obj.tx_shangBaoTiXing)));

                str.push(String.format("<td class='td13'><span class='opation'><a href='javascript:void(0);' onclick=\"USER.click_EditUser({0},'{1}')\">编辑</a>|<a href='javascript:void(0);' onclick=\"USER.click_DelUser({0},'{1}')\">删除</a></span></td>", id, name));

                str.push("</tr>");
            } 
        }
        str.push("</table>");
    
    return str.join("");
}
function getTiXingType(tiXing) {
    if (typeof tiXing == "string" && tiXing=="") {
        return "<img src='../Images/mark.png' title='信息不完整，请检查关于此项的预定信息'/>";
    }

    else if (tiXing == 1) {
        return "";
    }
    else if (tiXing == 0) {
        return "<img src='../Images/d_red.png' title='预定的提醒'/>";
    }
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

pageselectCallback = function (page_index, jq) {

    UU.pd.currentPageNumber = page_index;
    UU.pd.pageSize = pageSize;

    $invokeWebService_2("~WebService_RenLi.filterUserWrappper", { pageClass: UU.pd, where: where_User },
       function () {
           $("#divContent").html(loading);
       }, successCallBack, errorCallBack, null, { userContent: "filterUserWrappper" });
   }
   function tableAddStyle() {
       $("#divContent").find("tr[class*='header']").addClass("bgHeader");
       $("#divContent").find("tr[class*='row']:odd").addClass("bg1");
       $("#divContent").find("tr[class*='row']").bind("mouseover", {}, function () {
           $(this).addClass("mouseover");
       })
       $("#divContent").find("tr[class*='row']").bind("mouseout", {}, function () {
           $(this).removeClass("mouseover");
       })
       $("#divContent").find("td").find("label[validate='money']").formatCurrency();

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