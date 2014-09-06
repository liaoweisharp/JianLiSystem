(function () {
    function TS() { }
    var setting = {
        view: {
            dblClickExpand: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            beforeClick: beforeClick,
            onClick: onClick
        }
    };

    var zNodes = [];

    function beforeClick(treeId, treeNode) {
        var check = (treeNode && !treeNode.isParent);
        if (!check) alert("只能选择城市...");
        return check;
    }

    function onClick(e, treeId, treeNode) {

        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			nodes = zTree.getSelectedNodes(),
			v = "";
        nodes.sort(function compare(a, b) { return a.id - b.id; });
        for (var i = 0, l = nodes.length; i < l; i++) {
            v += nodes[i].name + ",";
        }
        if (v.length > 0) v = v.substring(0, v.length - 1);

        TS.$input.val(v);
        hideMenu()
    }

    TS.showMenu = function (event) {
        var dom = event.currentTarget;

        var zNodes = conventToZNodes(event.data.zNodes);
        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        TS.$input = null;
        TS.$input = $cityObj = $(dom).parent().find("input[type='text']");
        var cityOffset = $cityObj.offset();
        $("#menuContent").css({ left: cityOffset.left + "px", top: cityOffset.top + $cityObj.outerHeight() + "px" }).slideDown("fast");

        $("body").bind("mousedown", onBodyDown);
    }
    function conventToZNodes(nodes) {
        var zNodes = [];
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i] && nodes[i] != "null") {
                zNodes.push({ id: i + 1, name: nodes[i] });
            }
        }
        return zNodes;
    }
    function hideMenu() {
        $("#menuContent").fadeOut("fast");
        $("body").unbind("mousedown", onBodyDown);
    }
    function onBodyDown(event) {
        if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
            hideMenu();
        }
    }
    window.TS = TS;
})()

