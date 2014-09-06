/// <reference path="../JQuery/jquery-1.4.1-vsdoc.js?ver=Acepherics120317" />
//获得url参数
//    使用方法：
//var args = new Object();
//args = GetUrlParms();
//如果要查找参数key:
//value = args[key] 
function GetUrlParms() {
    var args = new Object();
    var query = location.search.substring(1); //获取查询串   
    var pairs = query.split("&"); //在逗号处断开   
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('='); //查找name=value   
        if (pos == -1) continue; //如果没有找到就跳过   
        var argname = pairs[i].substring(0, pos); //提取name   
        var value = pairs[i].substring(pos + 1); //提取value   
        args[argname] = unescape(value); //存为属性   
    }
    return args;
}

function getFlashObjectStr(url) {
    var _src = url.indexOf("?") != -1 ? url.substring(0, url.indexOf("?")) : url;
    var id_name = _src.indexOf("/") != -1 ? _src.substring(_src.lastIndexOf("/") + 1, _src.toLowerCase().lastIndexOf(".swf")) : _src.substring(0, _src.toLowerCase().lastIndexOf(".swf"));
    var flashStr = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="' + id_name + '"' +
                                    ' width="100%" height="100%" codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">' +
                                    ' <param name="movie" value="' + _src + '" />' +
                                    ' <param name="quality" value="high" />' +
                                    ' <param name="bgcolor" value="#869ca7" />' +
                                    ' <param name="allowScriptAccess" value="sameDomain" />' +
                                    ' <param name="wmode" value="opaque" />' +
                                    ' <param id="paramValue" name="flashvars" value="' + url + '" />' +
                                    ' <embed id="embedSrc" src="' + url + '" quality="high" bgcolor="#869ca7" width="100%" height="100%"' +
                                        ' name="' + id_name + '" align="middle" play="true" loop="false" type="application/x-shockwave-flash"' +
                                        ' wmode="opaque" pluginspage="http://www.adobe.com/go/getflashplayer">' + '</embed></object>';
    return flashStr;

}


//打开一个新窗口
function openNewWindow(url) {
    $("<form action=\"" + url + "\" target=\"_blank\" method=\"POST\"><input type=\"submit\"></form>").appendTo("body").submit().remove();
}
//得到Body滚动条已经卷上去的高度。
function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    }
    else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

//保留x位小数（四舍五入）
function Math_Round(num, x) {

    if (parseFloat(num) == num) {
        if (x == 0) {
            return Math.round(num);
        }
        else {
            var xx = x * 10;
            return Math.round(num * xx) / xx;
        }
    }
    else {
        return 0;
    }
}
//字符串转换成日期类型(如：str为"\Date(213132312312)\")
function strToDate(str) {
var reg = /-?[0-9]+/i;

    var birthday = reg.exec(str);
    var dateTemp = new Date();
    dateTemp.setTime(birthday);
    return dateTemp;
}
//保留小数指定位数
function fomatFloat(src, pos) {
    return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
}
var DateFormatType = {
    defaultDate: "mm/dd/yyyy HH:MM:ss",
    shortDateTime: "mm/dd/yyyy",
    fullDateTime: "ddd mmm dd yyyy HH:MM:ss",

    shortDate: "m/d/yy",

    mediumDate: "mmm d, yyyy",

    longDate: "mmmm d, yyyy",

    fullDate: "dddd, mmmm d, yyyy",

    shortTime: "h:MM TT",

    mediumTime: "h:MM:ss TT",

    longTime: "h:MM:ss TT Z",

    isoDate: "yyyy-mm-dd",

    isoTime: "HH:MM:ss",

    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",

    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"

};


Date.prototype.toUSAFormat = function (format) {
    var xYear = this.getFullYear();
//    if (!(navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) {//非IE
//        xYear = xYear + 1900;
//    }

    var xMonth = this.getMonth() + 1;
    if (xMonth < 10) {
        xMonth = "0" + xMonth;
    }

    var xDay = this.getDate();
    if (xDay < 10) {
        xDay = "0" + xDay;
    }

    var xHours = this.getHours();
    if (xHours < 10) {
        xHours = "0" + xHours;
    }

    var xMinutes = this.getMinutes();
    if (xMinutes < 10) {
        xMinutes = "0" + xMinutes;
    }

    var xSeconds = this.getSeconds();
    if (xSeconds < 10) {
        xSeconds = "0" + xSeconds;
    }
    if (typeof format == "undefined" || format == null || format == DateFormatType.defaultDate) {
        return xMonth + "/" + xDay + "/" + xYear + " " + xHours + ":" + xMinutes + ":" + xSeconds;
    } else if (format == DateFormatType.shortDateTime) {
        return xMonth + "/" + xDay + "/" + xYear;
    }
    return xMonth + "/" + xDay + "/" + xYear + " " + xHours + ":" + xMinutes + ":" + xSeconds;
}

//得到FullName
function getFullName(firstName, lastName) {
    var name = "";
    if (lastName != null && lastName.length > 0) {
        var lname = lastName.substring(0, 1).toUpperCase() + lastName.substring(1);
        name += lname + ",";
    }
    if (firstName != null && firstName.length > 0) {
        var fname = firstName.substring(0, 1).toUpperCase() + firstName.substring(1);
        name += " " + fname;
    }
    return name;
}
function getFullName2(user) {
    var firstName = user.Fname;
    var lastName= user.Lname;
    var name = "";
    if (lastName != null && lastName.length > 0) {
        var lname = lastName.substring(0, 1).toUpperCase() + lastName.substring(1);
        name += lname + ",";
    }
    if (firstName != null && firstName.length > 0) {
        var fname = firstName.substring(0, 1).toUpperCase() + firstName.substring(1);
        name += " " + fname;
    }
    return name;
}

function randomStringFunEx(length) {
    ///<summary>生成随机字符串</summary>
    ///<param name="length">生成字符串的长度</param>
    ///<return>返回生成的字符串</return>

    var x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
    var tmp = new Array();
    for (var i = 0; i < length; i++) {
        tmp[i] = (x.charAt(Math.ceil(Math.random() * 100000000) % x.length));
    }
    return tmp.join("");
}


//Knowledge Guide公用的函数
//var comm_randomStr = "";
/**
* data:{ container:a,result:b,par_UserId:c, par_SectionId:d, par_RoleId:e, par_tUserId:f, par_tRoleId:g, showPriorityFlag:h, showLessonFlag:i, showHistoryFlag:j, loFlag:k,showDescriptionFlag:l}
**/







function Left(obj)
{
    /// <summary> obj对象左上角的left值</summary>
    var curleft = 0;
    if (obj.offsetParent)
    {
        while (obj.offsetParent)
        {
            curleft += obj.offsetLeft
            obj = obj.offsetParent;
        }
    }
    else if (obj.x)
        curleft += obj.x;
    return curleft;
}
function Top(obj)
{
    /// <summary> obj对象左上角的top值</summary>
    var curtop = 0;
    if (obj.offsetParent)
    {
        while (obj.offsetParent)
        {
            curtop += obj.offsetTop
            obj = obj.offsetParent;
        }
    }
    else if (obj.y)
        curtop += obj.y;
    return curtop;
}
function getMousePos(event)
{/// <summary>获得鼠标事件位置（各种浏览器测试通过）</summary>
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    //alert('x: ' + x + '\ny: ' + y);
    return { 'x': x, 'y': y };
}