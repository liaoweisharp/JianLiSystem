/// <reference path="../jQuery/jquery-1.6.1.min.js" />

//使用 new bind();
function bind(jsonArray, obj, options, jboxOptions) {
    this.jsonArray = jsonArray;
    this.obj = obj;
    this.parentId = String.randomString(6);
    this.options = $.extend({}, bind.options, options);
    this.createJbox(jsonArray, this.options, jboxOptions, this.parentId)

    if (this.options.type == "update") {
        this.InitDom();
    }
    return this;
}
bind.prototype.InitDom = function () {

}
//收集数据
bind.prototype.ShouJiData = function () {
    /// <summary>收集界面上的数据</summary>
    var $parentDiv = $("#" + this.parentId);
    for (var i = 0; i < this.jsonArray.length; i++) {
        this.jsonArray[i]["value"] = $parentDiv.find("[itemId='" + this.jsonArray[i].itemId + "']").val();
    }

    bind.convertNull(this.jsonArray);
    //把外键的主键改成Number类型

    for (var i = 0; i < this.jsonArray.length; i++) {
        if (this.jsonArray[i].value != null) {
            if (!this.jsonArray[i].yesOrNo && this.jsonArray[i].value && this.jsonArray[i].type == "select" && this.jsonArray[i].init) {
                this.jsonArray[i]["value"] = Number(this.jsonArray[i]["value"]);
            }
            else if (this.jsonArray[i].yesOrNo && this.jsonArray[i].init) {
                this.jsonArray[i]["value"] = this.jsonArray[i]["value"] == "1" ? true : false;
            }
        }
    }


    return this.jsonArray;
}
bind.InitValidate = function (jsonArray, parentId) {
    /// <summary>初始化验证（内部函数）</summary>

    var arr = jsonArray.findAll("validate", "datetime");
    var $div = $("#" + parentId);
    for (var i = 0; i < arr.length; i++) {
        var itemId = arr[i].itemId;
        $div.find("[itemId='" + itemId + "']").datepicker({ changeMonth: true, changeYear: true });
    }
    var arr = jsonArray.findAll("validate", "money");
    for (var i = 0; i < arr.length; i++) {
        var itemId = arr[i].itemId;
        $div.find("[itemId='" + itemId + "']").numeral();
    }
    var arr = jsonArray.findAll("type", "textSelect");
    for (var i = 0; i < arr.length; i++) {
        var itemId = arr[i].itemId;
        $div.find("[itemId='" + itemId + "_select" + "']").bind("click", { zNodes: arr[i].init }, TS.showMenu);
    }


}
//转换空数据为null

bind.prototype.createJbox = function (jsonArray, options, jboxOptions, parentId) {

    var $div = $("<div style='margin:13px; height:auto;overflow:hidden;'></div>");
    $div.attr("id", parentId)
    .attr("name", bind.Obj);
    
    $div.append(bind.table(jsonArray, this.obj, options));
    var $form = $("<form id='formdate'></form>");
    $form.append($div);
    var $tempDiv=$("<div></div>")
    $tempDiv.append($form);
    $.jBox($tempDiv.html(), jboxOptions);

    //验证
    $("#formdate").validate({
        errorPlacement: function (error, element) {
        
            tipD.message = error.html();
            $(element).jCallout(tipD);
        },
        success: function (label, element) {
        
            $(element).jCallout("hide");
        },
        debug: true
    })

    //如果是显示需要初始化界面数据
    //if (options["type"] == "review") {
    $("label[validate='money'][validatechild='']").formatCurrency();
    $("label[validate='money'][validatechild='元']").formatCurrency(null, { roundToDecimalPlace: 2 });
    //}

    //如果是编辑需要初始化界面数据
    if (options["type"] == "update" || options["type"] == "new") {
        $("#" + parentId).data("data", this); //把对象绑到制定元素上。方便页面从回调函数中得到当前对象
        if (options["type"] == "update") {
            bind.initDomData(jsonArray, this.obj, this.parentId);

        }
        //初始化验证
        bind.InitValidate(jsonArray, this.parentId);
    }


}
bind.Obj = "aabbcc";
bind.options = {
    align: 'x'//排列方式 x:横坐标，y纵坐标
}
//生成table界面
bind.table = function (jsonArray, obj, options) {
    var rowLeft = [];
    var rowRight = [];
    if (options["align"] == 'x') {
        for (var i = 0, j = 0; i < jsonArray.length; i++, j++) {
            var arr = new Array();
            arr.push(jsonArray[i]);
            if ((i + 1) < jsonArray.length && jsonArray[i + 1].parentId) {
                i++;
                arr.push(jsonArray[i]);
            }
            if (j % 2 == 0) {
                if (options["type"] == "new" || options["type"] == "update") {
                    rowLeft.push(bind.newOrUpdate_node(arr, options));
                }
                else if (options["type"] == "review") {
                    rowLeft.push(bind.review_node(arr, obj));
                }
            }
            else if (j % 2 == 1) {
                if (options["type"] == "new" || options["type"] == "update") {

                    rowRight.push(bind.newOrUpdate_node(arr, options));
                }
                else if (options["type"] == "review") {

                    rowRight.push(bind.review_node(arr, obj));
                }
            }
        }
    }
    else if (options["align"] == 'y') {
        var isOtherCol = false; //换列了吗

        for (var i = 0, j = 0; i < jsonArray.length; i++, j++) {
            if (isOtherCol == false && jsonArray[i].isOtherCol && jsonArray[i].isOtherCol == true) {
                isOtherCol = true;
            }
            var arr = new Array();
            arr.push(jsonArray[i]);
            if ((i + 1) < jsonArray.length && jsonArray[i + 1].parentId) {
                i++;
                arr.push(jsonArray[i]);
            }
            if (isOtherCol == false) {
                if (options["type"] == "new" || options["type"] == "update") {
                    rowLeft.push(bind.newOrUpdate_node(arr, options));
                }
                else if (options["type"] == "review") {
                    rowLeft.push(bind.review_node(arr, obj));
                }
            }
            else if (isOtherCol == true) {
                if (options["type"] == "new" || options["type"] == "update") {

                    rowRight.push(bind.newOrUpdate_node(arr, options));
                }
                else if (options["type"] == "review") {

                    rowRight.push(bind.review_node(arr, obj));
                }
            }
        }
    }
    var $div = $("<div></div>");
    if (rowLeft.length > 0) {
        var $table = $("<table cellSpacing='0' cellpadding='3' width='400'  border='0'></table>");
        for (var i = 0; i < rowLeft.length; i++) {
            $table.append(rowLeft[i]);
        }
        $table.appendTo($div)
        .attr("class", "tbComm fl mr20");
    }
    if (rowRight.length > 0) {
        var $table = $("<table cellSpacing='0' cellpadding='3' width='400'  border='0'></table>");
        for (var i = 0; i < rowRight.length; i++) {
            $table.append(rowRight[i]);
        }
        $table.appendTo($div)
        .attr("class", "tbComm");
    }
    return $div;
}

//生成tr节点
bind.newOrUpdate_node = function (jsons, options) {

    var $tr = $("<tr></tr>");
    var $td1 = $("<td valign='top'></td>");
    var $td2 = $("<td></td>");
    var title = jsons[0].title;
    if (jsons[0].required) {
        title += "<font class='red'> *</font>";
    }
    $td1
    .attr("class", "td1")
    .html(title)//td1赋值

    var $node = $("<span></span>");
    for (var i = 0; i < jsons.length; i++) {
        var json = jsons[i];
        if (jsons.length == 2 && options.filter && options.filter == "1") {
            var _class = "_half";
        }
        else {
            var _class = jsons.length > 1 ? "half" : "";
        }
        var _class2 = i == 0 ? "" : "";
        var validate = "";
        if (json.required) {
            validate += " required";
        }
        if (json.validate && json.validate == "datetime") {
            validate += " date";
        }
        switch (json.type) {
            case "text":
                var mid = "";
                if (i == 1 && jsons.length == 2 && jsons.findAll("validate", "datetime").length == 2) {

                    mid = " <label>-</label> ";
                    $node.append(mid);
                }
                if (json.validate && json.validate == "datetime") {
                    $node.append($(String.format("<input readonly class='{1}{2}{3}' type='text' itemId='{0}' /><span onclick=\"clearDate(this)\" class='clearDate'><img title='清除时间' src='../Images/close3.gif'/></span>", json.itemId, _class, _class2, validate)));
                }
                else {
                    $node.append($(String.format("<input class='{1}{2}{3}' type='text' itemId='{0}' />", json.itemId, _class, _class2, validate)));
                }
                break;
            case "textSelect":
                $node = $(String.format("<input class='txtSel{2}{3}' type='text' itemId='{0}'/>&nbsp;<a itemId={1} href='javascript:void(0);'>选择</a>", json.itemId, json.itemId + "_select", _class, _class2));
                break;
            case "ntext":
                $node = $(String.format("<textarea class='{1}{2}' row='5' itemId='{0}'></textarea>", json.itemId, _class, _class2));
                break;
            case "select":
                $node = $(String.format("<select class='{1}{2}' itemId='{0}'>", json.itemId, _class, _class2, validate));
                if (!json.required) {
                    $node.append($("<option value=''> </option>")); //有一个空的初始值
                }
                for (var i = 0; i < json.init.length; i++) {
                    var option = json.init[i];
                    if (option.id == 159) {

                    }
                    var $option = $(String.format("<option value={0}>{1}</option>", option.id, option.title));

                    $node.append($option);
                }
                break;
            case "label":
                $node = $(String.format("<label class='{1}{2}'  itemId='{0}' {4}>{3}</label>", json.itemId, _class, _class2, json.value, json.validate ? "validate='" + json.validate + "' validatechild=''" : ""));
                break;
            case "upload":
                var btId = json.options.btId;
                var photoId = json.options.photoId; /// <reference path="../../Master/" />

                $node = $("<div></div>");
                $table = $("<table></table>");
                var $_tr = $("<tr></tr>");
                var $_td1 = $(String.format("<td style='width:100px;height:120px;border:none;'><div class='preview'><img id='{0}' style=' width:110px;height:120px;' src='../Images/empty.png' alt='photo'/></div></td>", photoId));
                var $_td2 = $(String.format("<td valign='bottom' style='border:none;'><div id='{0}'><span></span></div></td>", btId));
                $_tr.append($_td1);
                $_tr.append($_td2);
                $table.append($_tr);
                $node.append($table);
                $node.append(String.format("<input type='hidden' itemId='{0}'>", json.itemId));
                break;
            case "uploadImg":
                var btId = json.options.btId;
                //  var photoId = json.options.photoId;
                var alreadyId = json.options.alreadyId;
                $node = $("<div></div>");
                $node1 = $("<div></div>");
                $table = $("<table></table>");
                var $_tr = $("<tr></tr>");
                // var $_td1 = $(String.format("<td style='width:100px;height:120px;border:none;'><div class='preview'><img id='{0}' style=' width:110px;height:120px;' src='../Images/empty.png' alt='photo'/></div></td>", photoId));
                var $_td2 = $(String.format("<td valign='bottom' style='border:none;'><div id='{0}'><span></span></div></td>", btId));
                //  $_tr.append($_td1);
                $_tr.append($_td2);
                $table.append($_tr);
                $node1.append($table);
                var node2 = [];
                node2.push(String.format("<div id='{0}'>", alreadyId));
                if (json.init.length > 0) {
                    node2.push("<ul>");
                    for (var m = 0; m < json.init.length; m++) {
                        node2.push(String.format("<li><a href='{0}' target='_blank'><img class='suoTu' src='{0}'/></a> &nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' onclick=\"click_DelUpload({1},this)\">删除</a></li>", json.init[m].up_Dir, json.init[m].up_Id));
                    }
                    node2.push("</ul>");
                }
                node2.push("</div>");
                var $node2 = $(node2.join(""));
                $node.append($node2);
                $node.append($node1);
                break;
        }
        if (i == 1 && options.filter && options.filter == "1") {
            $td2.append("-");
        }
        $td2.append($node); //td2赋值
    }


    $tr.append($td1)
    .append($td2);
    return $tr;
}
bind.review_node = function (jsons, obj) {
    var $tr = $("<tr></tr>");
    var $td1 = $("<td valign='top'></td>");
    var $td2 = $("<td></td>");

    $td1
    .addClass("td1")
    .html(jsons[0].title)
    $td2.addClass("td2");
    var value = "";
    for (var i = 0; i < jsons.length; i++) {
        var json = jsons[i];
        var _value = obj ? obj[json.itemId] : "";

        if (_value == null) {
            _value = "";
        }
        if (json.type == "select") {
            if (_value != "") {
                var _json = json.init.firstOrDefault("id", _value);
                _value = _json.title;

            }
            if (typeof json.yesOrNo != "undefined" && typeof _value == "boolean") {
                _value = _value == true ? "1" : "0";
                var _json = json.init.firstOrDefault("id", _value);
                _value = _json.title;
            }
            if (_value != "") {
            //加自定义的样式
                if (_json.style) {
                    var style = [];
                    for (var item in _json.style) {
                        style.push(String.format("{0}:{1}", item, _json.style[item]));
                    }
                    _value = String.format("<font style='{0}'>{1}</font>", style.join(','), _value);
                }
            }
        }
        if (json.type == "upload") {
            if (_value == "") {
                _value = "<img src='../Images/empty.png' style='width:110px; height:120px;display:block;margin:0px auto;' />";
            }
            else {
                _value = String.format("<img src='{0}' style='width:110px; height:120px; display:block;margin:0px auto;'/>", _value);
            }
        }
        if (json.validate && json.validate == "money") {
            if (json.validatechild) {
                _value = "<label validate='money' validatechild='" + json.validatechild + "'>" + _value + "</label>";
            }
            else {
                _value = "<label validate='money' validatechild=''>" + _value + "</label>";
            }

        }
        if (json.validate && json.validate == "datetime" && jsons.length == 2 && i == 0 && jsons[1].validate == "datetime") {
            value += _value + "&nbsp;--&nbsp;";
        }
        else {
            value += _value + "&nbsp;";
        }
    }
    $td2.html(value);
    $tr.append($td1)
    .append($td2);
    return $tr;
}
//初始化界面数据
bind.initDomData = function (jsonArray, obj, parentId) {
    var $parentDiv = $("#" + parentId);
    for (var i = 0; i < jsonArray.length; i++) {
        var itemId = jsonArray[i].itemId;
        var value = obj ? obj[itemId] : "";
        switch (jsonArray[i].type) {
            case "text":
                value = value == null ? "" : value;
                break;
            case "select":
                value = value == null ? "" : value;
                break;
            case "upload":
                value = value == null ? "" : value;
                break;
        }
        if (i == 2) {

        }

        if (typeof jsonArray[i].yesOrNo != "undefined" && typeof value == "boolean") {
            value = value == true ? "1" : "0";
        }
        $parentDiv.find("[itemId = '" + itemId + "']").val(value);
        if (jsonArray[i].type == "upload") {

            if (value == "") {
                $("#" + jsonArray[i].options.photoId).attr("src", "../Images/empty.png");
            }
            else {
                $("#" + jsonArray[i].options.photoId).attr("src", value);
            }
        }
    }
}
//#region 其他
bind.convertNull = function (jsonArray) {
    for (var i = 0; i < jsonArray.length; i++) {
        if ($.trim(jsonArray[i].value) == "") {
            jsonArray[i].value = null;
        }
    }
}

bind.jsonToObject = function (jsonArray) {
    /// <summary>jason数组转换成一个对象的属性</summary>
    var obj = {};
    for (var i = 0; i < jsonArray.length; i++) {
        var json = jsonArray[i];
        if ($.trim(json.value) == "") {
            obj[json.itemId] = null;
        }
        else {
            obj[json.itemId] = json.value;
        }
    }
    return obj;
}
function clearDate(node) {

$(node).prev().val("");
}
//#endregion