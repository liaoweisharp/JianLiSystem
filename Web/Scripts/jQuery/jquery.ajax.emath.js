/// <reference path="jquery-1.6.1.min.js?ver=Acepherics120317" />

//调用webservice方法
//var $ws_tpath = "_AjaxWebService/";
var $fun_params = new Array();
var $_DivReloginBox = null;
function $invokeWebService_2(method, data, beforeSendFun, successFun, errorFun, completeFun, context) {
    if (method.indexOf(".") == -1) {
        alert("method name error.");
        return;
    }

    var $fhLen = $getCharCount(method, "~");
    var $tstr = "";
    for (var i = 0; i < $fhLen; i++) {
        $tstr += "../";
    }
    var $tRootPath ="WebService/";
    window.$ws_tpath = null;
    var $url = $tstr + $tRootPath + method.replace(".", ".asmx/").replace(/~/g, "");
    //var $url = $tstr + $ws_tpath + method.replace(".", ".asmx/").replace(/~/g, "");
    var $data = "";
    if (typeof data == "object") {
        $data = $toJSON(data);
    } else if (typeof data == "string") {
        $data = data;
    }

    //  setTimeout(function () {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        dataType: 'json',
        url: $url,
        data: $data,
        async: true,
        beforeSend: function (_xmlHttpRequest)
        {
            if (beforeSendFun != null)
            {
                beforeSendFun(_xmlHttpRequest);
            }
        },
        complete: function (_xmlHttpRequest, _strStatus)
        {
            if (completeFun != null)
            {
                completeFun(_xmlHttpRequest, _strStatus);
            }
        },
        timeout: function (result)
        {
        },
        global: function (result)
        {
        },
        success: function (result)
        {
            successFun(result.d, context);
        },
      
        error: function (error)
        {
            
            if ($.trim(error.responseText) == "")
            {
                //alert("error");
                return;
            }
            var to = eval('(' + error.responseText + ')');
            if (to.Message == "User_Session_End")
            {// || ($.trim(to.ExceptionType) == "" && to.Message.indexOf("error processing") != -1)
                $fun_params.push({ method: method, data: data, beforeSendFun: beforeSendFun, successFun: successFun, errorFun: errorFun, completeFun: completeFun, context: context });
                $createReLoginBoxControl();
                return;
            } else if ($.trim(to.ExceptionType) == "" && to.Message.indexOf("error processing") != -1)
            {
                return;
            }
            if (typeof errorFun == "undefined" || typeof errorFun != "function" || errorFun == null)
            {

                alert(context + "@@@" + error.responseText);
            } else
            {
                errorFun(error, context);
            }
        }
    });
    //  },0);



}

//
function $reloginEmathSystem() {
    var $_imgLoading = $("#_DivReloginBox_ImgLoading", "#_DivReloginBox");
    var $_userName = $("#_DivReloginBox_TxtUserName", "#_DivReloginBox").val();
    var $_passWord = $("#_DivReloginBox_TxtPassWord", "#_DivReloginBox").val();
    var $_pUserId = null;
    var $_pSectionId = null;
    $_imgLoading.css("visibility", "visible");
    if ($.trim($_userName) == "") {
        alert("User name is required.");
        $_imgLoading.css("visibility", "hidden");
        return;
    }

    if ($.trim($_passWord) == "") {
        alert("Pass word is required.");
        $_imgLoading.css("visibility", "hidden");
        return;
    }

    // var $ws_method = "LoginWS.checkUserLogin";
    var $ws_method = "LoginWS.reLoginSystem"; 
    var $initFlag = false; //是否为页面初始加载，默认为否（即非页面初始加载，而是页面已经加载完毕后调用webservice时session过期弹出的登陆框）
    var $ws_path = "~";
    if ($fun_params != null && $fun_params.length != 0) {
        var _method = $fun_params[0].method;
        var _index = _method.lastIndexOf("~");
        $ws_path = _index != -1 ? _method.substring(0, _index + 1) : "";
    } else {
        $initFlag = true;
        if (typeof window.$webservice_path != "undefined" && window.$webservice_path != null) {
            $ws_path = window.$webservice_path;
        }
    }
    var $_urlParams = GetUrlParms();
    if ($_urlParams["userId"]) {
        $_pUserId = $_urlParams["userId"];
    }
    if ($_urlParams["sectionId"]) {
        $_pSectionId = $_urlParams["sectionId"];
    }
    
    $ws_method = $ws_path + $ws_method;
    $invokeWebService_2($ws_method,
        { userName: $_userName, passWord: $_passWord, p_userId: $_pUserId, p_sectionId: $_pSectionId }, null,
        function (result, context) {
            if (result == -1) {
                alert("Login Failed! Please check your username and password then Try Again!");
            } else if (result == 0 || result == 1 || result == 2) {
                if ($initFlag) {
                    window.location.reload();
                } else {
                    $_DivReloginBox.hide();
                    for (var i = 0; i < $fun_params.length; i++) {
                        $invokeWebService_2($fun_params[i].method, $fun_params[i].data, $fun_params[i].beforeSendFun, $fun_params[i].successFun, $fun_params[i].errorFun, $fun_params[i].completeFun, $fun_params[i].context);
                    }
                    $fun_params = new Array();
                }
            } else if (result == -2) {
                alert("Your account is disabled.");
            } else {

                alert("error");
            }

        }, null, function () {
            $_imgLoading.css("visibility", "hidden");
        }, { userContext: "checkUserLogin" });
}

//function $closeReLoginBoxControl() {
//    $_DivReloginBox.hide();
//}

function $createReLoginBoxControl() {
    setTimeout(function () {
        $(document.body).find("table").hide();
        var htmlStrArray = new Array();
        if ($_DivReloginBox != null) {
            $_DivReloginBox.show();
        } else {
            htmlStrArray.push('<div id="_DivReloginBox">');
            htmlStrArray.push('<div style="position: fixed; top: 0px; left: 0px; width: 100%;');
            htmlStrArray.push('height: 100%; background-color: Gray; filter: alpha(opacity=15); -moz-opacity: 0.3;');
            htmlStrArray.push('opacity: 0.3; z-index: 99998; padding-top: 20%;">');
            htmlStrArray.push('</div>');
            htmlStrArray.push('<div style="text-align: center; position: fixed; top: 30%; left: 35%; z-index: 99999;');
            htmlStrArray.push('background-color: #BBE5EC; width: 430px; border: 2px solid gray;">'); //rgb(162,219,246)
            htmlStrArray.push('<table cellpadding="2" cellspacing="2" style="background-color:rgb(16,135,190)" width="100%">');
            htmlStrArray.push('<tr>');
            htmlStrArray.push('<td style="color:White;text-align:left;font-size:15px;">Your session time is over. Please login again.</td>');
            htmlStrArray.push('<td style="text-align:right">&nbsp;</td>'); //<img onclick="$closeReLoginBoxControl()" alt="Close" title="Close" style="cursor:pointer" src="../_Images/close2.gif" />
            htmlStrArray.push('</tr>');
            htmlStrArray.push('</table>');
            htmlStrArray.push('<center>');
            htmlStrArray.push('<table cellpadding="0" cellspacing="3" style="margin:8px;font-size:14px;">');
            htmlStrArray.push('<tr>');
            htmlStrArray.push('<td style="color: #005F9C;text-align:right">User Name:</td>');
            htmlStrArray.push('<td><input id="_DivReloginBox_TxtUserName" type="text" style="width: 160px;color:Gray;" /></td>');
            htmlStrArray.push('</tr>');
            htmlStrArray.push('<tr>');
            htmlStrArray.push('<td style="color: #005F9C;text-align:right">Password:</td>');
            htmlStrArray.push('<td><input id="_DivReloginBox_TxtPassWord" type="password" style="width: 160px;color:Gray;" /></td>');
            htmlStrArray.push('</tr>');
            htmlStrArray.push('<tr>');
            htmlStrArray.push('<td>&nbsp;</td>');
            htmlStrArray.push('<td align="left">');
            htmlStrArray.push('<input id="_DivReloginBox_btnSignIn" type="button" onclick="$reloginEmathSystem()" value="Sign In" style="background: url(../images/img.gif) no-repeat scroll 0 0 transparent;');
            htmlStrArray.push('border: 0 none; color: #013655;cursor: pointer;font-family: Arial,Helvetica,sans-serif;font-size: 13px;');
            htmlStrArray.push('font-weight: bold;height: 22px;line-height: 22px;margin: 0;padding: 0;width: 90px;"/>');
            htmlStrArray.push('&nbsp;&nbsp;<img id="_DivReloginBox_ImgLoading" src="../_Images/ajax-loader_m.gif" style="visibility:hidden"/>');
            htmlStrArray.push('</td>');
            htmlStrArray.push('</tr>');
            htmlStrArray.push('</table>');
            htmlStrArray.push('</center>');
            htmlStrArray.push('</div>');
            htmlStrArray.push('</div>');
            $(htmlStrArray.join('')).appendTo(document.body);
            $_DivReloginBox = $("#_DivReloginBox");

            var $_userName = $("#_DivReloginBox_TxtUserName", "#_DivReloginBox");
            var $_passWord = $("#_DivReloginBox_TxtPassWord", "#_DivReloginBox");
            $_userName.keydown(function (e) {
                if (e.which == 13) {
                    $_passWord.focus();
                }
            });

            $_passWord.keydown(function (e) {
                if (e.which == 13) {
                    $reloginEmathSystem();
                    // $("#_DivReloginBox_btnSignIn", "#_DivReloginBox").trigger("click");
                }
            });
        }

    }, 500);

}



function $invokeWebService(method, data, successFun, errorFun, context) {

    $invokeWebService_2(method, data, null, successFun, errorFun, null, context);
}

//将对象转换为json字符串
function $toJSON(data) {
    if (typeof data == 'string') try { data = eval('(' + data + ')') } catch (e) { return "" };
    var draw = [], last = false, isLast = true, indent = 0;
    function notify(name, value, isLast, formObj) {
        if (name != "__type") {
            if (value && value.constructor == Array) {
                draw.push((formObj ? ('"' + name + '":') : '') + '[');
                for (var i = 0; i < value.length; i++) notify(i, value[i], i == value.length - 1, false);
                draw.push(']' + (isLast ? '' : (',')));
            } else if (value && typeof value == 'object') {
                draw.push((formObj ? ('"' + name + '":') : '') + '{');
                var len = 0, i = 0;
                for (var key in value) len++;
                for (var key in value) notify(key, value[key], ++i == len, true);
                draw.push('}' + (isLast ? '' : (',')));
            } else {
                if (typeof value == 'string') value = '"' + value.replace(/\\/gi, '\\\\').replace(/\"/gi, '\\"') + '"';
                draw.push((formObj ? ('"' + name + '":') : '') + value + (isLast ? '' : ','));
            };
        }
    };
    notify('', data, isLast, false);
    return draw.join('');
};

function $getCharCount(str1, str2) {
    if (str1 == null) {
        return null;
    }
    if (str1.indexOf(str2) == -1) { return 0; }
    var r = new RegExp('\\' + str2, "gi");
    return str1.match(r).length;
}
