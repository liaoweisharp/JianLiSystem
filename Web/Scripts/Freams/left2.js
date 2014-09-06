$(function () {

    $invokeWebService_2("~WebService_Right.getQuanXian", {}, null,
    function (result) {
        if (!result || result.length > 0) {
            var module = [];
            result.each(function (item) {
                if (module.length == 0) {
                    module.push({ "name": item.pName, "className": item.className, "children": [] })
                }
                else {
                    var _name = module.firstOrDefault("name", item.pName);
                    if (!_name) {
                        module.push({ "name": item.pName, "className": item.className, "children": [] })
                    }
                }

            })
            module.each(function (item) {
                var name = item.name;

                result.findAll("pName", name).each(function (item2) {
                
                    var obj = item.children.firstOrDefault("name", item2.name);
                    if (!obj) {
                        item.children.push({ "name": item2.name, "page": item2.page })
                    }
                })

            })
            var str = [];
            if (module.length > 0) {

                module.each(function (item) {
                    var className = item.className;
                    var name = item.name;
                    str.push(String.format('<div class="l_item {0}">', className));
                    str.push(String.format('<div class="l_header">{0}</div>', name));
                    str.push(String.format('<div class="l_content hid">'));
                    str.push(String.format('<ul>'));
                    item.children.each(function (item2) {
                        var name2 = item2.name;
                        var page2 = item2.page;
                        str.push(String.format('<li><i></i><a href="{1}" target="mainFrame">{0}</a></li>', name2, page2));
                    })
                    str.push(String.format('</div>'));
                    str.push(String.format('</div>'));
                    str.push(String.format(''));
                    str.push(String.format(''));
                    str.push(String.format(''));
                    str.push(String.format(''));
                })
            }

            $("div.left").html(str.join(""));
        }
        init();
    }, null, null, { userContent: "getQuanXian" });


})
function init() {
    $(".left li").hover(
    function () {
        $(this).addClass("bg1")
    },
    function () {
        $(this).removeClass("bg1")
    }
    )

    $(".left .l_header").bind("click", {}, function (event) {
        var $content = $(this).next();
        if ($content.is(":visible")) {
            $content.slideUp();
        }
        else {
            $content.slideDown();
        }
    })

    $(".left .l_content a").bind("click", {}, function (event) {
        $(".left .l_content a").removeClass("sel");
        $(this).addClass("sel");
    })

    //默认点击

    $(".l_header").click();
    // $(".l_header").first().click();
    //$("a[target='mainFrame']").first().trigger("click");
   
}