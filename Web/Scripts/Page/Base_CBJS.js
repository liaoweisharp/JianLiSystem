$(function () {
//    $invokeWebService_2("~WebService_XiangMu.test", {}, null, function (result) {
//        
//    }, null, null, { userContent: "getInitData" });

    new SYB("divPageSize_ShiYeBu", "divContent_ShiYeBu");
    //new ZG("divPageSize_ZhiGuan", "divContent_ZhiGuan");
    new ZGZU("divPageSize_ZhiGuan_Zu", "divContent_ZhiGuan_Zu");
})
var const_JieSuanInit = [{ id: 1, title: "已结算" }, { id: 2, title: "质保外已结" }, { id: 0, title: "未结" }, { id: 3, title: "其他"}];