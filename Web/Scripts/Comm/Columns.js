//选择显示的列
(function () {
    function Col(columns, selCols, callBack) {
        this.columns = columns;
        this.selCols = selCols;
        var randomId = randomStringFun(6);
        var html = getHtml(columns, randomId);
        $.jBox(html, { title: "选择需要显示的列", buttons: { "确认": "1", "取消": "0" }, width: 500, showClose: false, submit: callBack });
        $("#" + randomId).find(".div_left").find("input[type='checkbox']").bind("click", { randomId: randomId }, _clickCheckBox)
        if (selCols && selCols.length > 0) {
        
            for (var i = 0; i < selCols.length; i++) {
                var itemId = selCols[i];
                $("#" + randomId).find("input[type='checkbox'][itemId='" + itemId + "']").trigger("click");
            }
        }
    }
    Col.ShouJi = function (jbox) {
        var arr = [];
        jbox.find(".div_right li").each(function () {
            arr.push($(this).attr("itemId"));
        })
        return arr;
    }
    function _clickCheckBox(event) {
        
        var divId = event.data.randomId;
        var itemId = $(this).attr("itemId");
        var title = $(this).next().text();
        //左边区域隐藏
        $(this).parent().hide();
        $(this).attr("checked", false);
        //显示在右边区域
        var $li = $(String.format("<li itemId='{1}'>{0} &nbsp;&nbsp;<a href='javascript:void(0)' onclick=\"Col.clickDelSel('{1}','{2}',this)\">删除</a></li>", title, itemId, divId))
        $("#" + divId).find(".div_right ul").append($li);
    }
    Col.clickDelSel = function (itemId, divId, current) {
        $(current).parent().remove();
        $("#" + divId).find(".div_left").find("input[itemId='" + itemId + "']").parent().show();
    }

    function getHtml(columns, divId) {
        var str = [];
        str.push(String.format("<div id='{0}' class='divPopCol'>", divId));
        str.push("<div class='div_left'>");
        str.push("<div class='cl_title'>备选列</div>");
        str.push("<ul class='ulnone2'>");
        for (i = 0; i < columns.length; i++) {
            var name = columns[i].name;
            var id = columns[i].id
            str.push("<li>");
            str.push(String.format("<input id='{1}' type='checkbox' itemId='{0}'/> <label for='{1}'>{2}</label>", id, randomStringFun(6), name));
            str.push("</li>");
        }
        str.push("</ul>");
        str.push("</div>");
        str.push("<div class='div_mid'>&nbsp;");
        str.push("</div>");
        str.push("<div class='div_right'>");
        str.push("<div  class='cl_title'>已选列</div>");
        str.push("<ul class='ulnone2'></ul>");
        str.push("</div>");
        str.push("</div>");
        return str.join("");
    }
    window.Col = Col;
})();
