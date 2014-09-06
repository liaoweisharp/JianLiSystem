$(function () {
    init();
    
    // $.fn.zTree.init($("#treeDemo"), setting, zNodes);
})
function init() {
    $invokeWebService_2("~WebService_XiangMu.getXiangMuZuInfo", {}, null, successCallBack, errorCallBack, null, { userContent: "getXiangMuZuInfo" });
}
function successCallBack(result, context) {
    if (context.userContent == "getXiangMuZuInfo") {
        var xiangMuZu = result[0]; //项目部
        var jianLiJiGou = result[1]; //项目监理机构
        var projectOfXiangMuBu = result[2]; //项目部下的工程
        var projectOfJianLiJiGou = result[3]; //监理机构下的工程
        var zNodes = [];

        for (var i = 0; i < xiangMuZu.length; i++) {
            zNodes.push({ "id": "z_"+xiangMuZu[i].key, "pId": 0,"key":xiangMuZu[i].key, "name": xiangMuZu[i].value, "type": "1", "isEdit": true, "isDelete": true });
        }
        for (var i = 0; i < jianLiJiGou.length; i++) {
            zNodes.push({ "id": jianLiJiGou[i].qq_Id, "pId": "z_" + jianLiJiGou[i].qq_XiangMuZhuId, "name": jianLiJiGou[i].qq_GongChengMingCheng, "type": "2", "isEdit": true, "isDelete": true });
        }
        for (var i = 0; i < projectOfXiangMuBu.length; i++) {
            zNodes.push({ "id": projectOfXiangMuBu[i].qq_Id, "pId": "z_" + projectOfXiangMuBu[i].qq_XiangMuZhuId, "name": projectOfXiangMuBu[i].qq_GongChengMingCheng });
        }
        for (var i = 0; i < projectOfJianLiJiGou.length; i++) {
            zNodes.push({ "id": projectOfJianLiJiGou[i].qq_Id, "pId": projectOfJianLiJiGou[i].qq_ParentId, "name": projectOfJianLiJiGou[i].qq_GongChengMingCheng });
        }
        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    }
    else if (context.userContent == "updateXiangMuZu" || context.userContent == "reNameProject") {


        $.jBox.tip('同步成功！', 'success');
    }
    else if (context.usertContent == "delXiangMuZu" || context.userContent == "delProject") {
        if (result == false) {
            alert("删除失败");
            init();
        }
    }
}
function errorCallBack(result, context) { 
    
}
var setting = {
    view: {
        addHoverDom: addHoverDom,
        removeHoverDom: removeHoverDom,
        selectedMulti: false
    },
    edit: {
        enable: true,
        editNameSelectAll: true,
        showRemoveBtn: showRemoveBtn,
        showRenameBtn: showRenameBtn
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeDrag: beforeDrag,
        beforeEditName: beforeEditName,
        beforeRemove: beforeRemove,
        beforeRename: beforeRename,
        onRemove: onRemove,
        onRename: onRename
    }
};

var zNodes = [
{ id: 11, pId: 1, name: "叶子节点 1-1" },

            
			{ id: 12, pId: 1, name: "叶子节点 1-2" },
			{ id: 13, pId: 1, name: "叶子节点 1-3" },
			{ id: 1, pId: 0, name: "父节点 1", open: true },
			
			{ id: 2, pId: 0, name: "父节点 2", open: true },
			{ id: 21, pId: 2, name: "叶子节点 2-1" },
			{ id: 22, pId: 2, name: "叶子节点 2-2" },
			{ id: 23, pId: 2, name: "叶子节点 2-3" },
			{ id: 3, pId: 0, name: "父节点 3", open: true },
			{ id: 31, pId: 3, name: "叶子节点 3-1", type: 1 },
			{ id: 32, pId: 3, name: "叶子节点 3-2" },
			{ id: 33, pId: 3, name: "叶子节点 3-3" },
            { id: 24, pId: 2, name: "叶子节点 2-3" }

            
		];
var log, className = "dark";
function beforeDrag(treeId, treeNodes) {
    return false;
}
function beforeEditName(treeId, treeNode) {
//    className = (className === "dark" ? "" : "dark");
//    showLog("[ " + getTime() + " beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
//    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
//    zTree.selectNode(treeNode);
    //return confirm("进入节点 -- " + treeNode.name + " 的编辑状态吗？");
}
function beforeRemove(treeId, treeNode) {
//    className = (className === "dark" ? "" : "dark");
//    showLog("[ " + getTime() + " beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
//    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
//    zTree.selectNode(treeNode);
    return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
}
function onRemove(e, treeId, treeNode) {
    if (treeNode.type) {
        if (treeNode.type == "1") {
        
            obj = { "xmz_Id": treeNode.key, "xmz_Name": treeNode.name };
            $invokeWebService_2("~WebService_XiangMu.delXiangMuZu", { id: treeNode.id.substring(2) }, null, successCallBack, errorCallBack, null, { userContent: "delXiangMuZu" });
        }
        else if (treeNode.type == "2") {
            $invokeWebService_2("~WebService_XiangMu.delProject", { id: treeNode.id }, null, successCallBack, errorCallBack, null, { userContent: "delProject" });
        }
    }
}
function beforeRename(treeId, treeNode, newName, isCancel) {
    className = (className === "dark" ? "" : "dark");
    showLog((isCancel ? "<span style='color:red'>" : "") + "[ " + getTime() + " beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>" : ""));
    if (newName.length == 0) {
        alert("节点名称不能为空.");
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        setTimeout(function () { zTree.editName(treeNode) }, 10);
        return false;
    }
    return true;
}
function onRename(e, treeId, treeNode, isCancel) {
    if (treeNode.type) {
    
        if(treeNode.type=="1"){
            obj={"xmz_Id":treeNode.key,"xmz_Name":treeNode.name};
            $invokeWebService_2("~WebService_XiangMu.updateXiangMuZu", { obj: obj }, null, successCallBack, errorCallBack, null, { userContent: "updateXiangMuZu" });
        }
        else if(treeNode.type=="2"){
            $invokeWebService_2("~WebService_XiangMu.reNameProject", { id: treeNode.id, newName: treeNode.name }, null, successCallBack, errorCallBack, null, { userContent: "reNameProject" });
        }
    }
}
function showRemoveBtn(treeId, treeNode) {
    return treeNode.isDelete;
}
function showRenameBtn(treeId, treeNode) {
    return treeNode.isEdit;
}
function showLog(str) {
    if (!log) log = $("#log");
    log.append("<li class='" + className + "'>" + str + "</li>");
    if (log.children("li").length > 8) {
        log.get(0).removeChild(log.children("li")[0]);
    }
}
function getTime() {
    var now = new Date(),
			h = now.getHours(),
			m = now.getMinutes(),
			s = now.getSeconds(),
			ms = now.getMilliseconds();
    return (h + ":" + m + ":" + s + " " + ms);
}

var newCount = 1;
function addHoverDom(treeId, treeNode) {

//    var sObj = $("#" + treeNode.tId + "_span");
//    if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
//    var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
//				+ "' title='add node' onfocus='this.blur();'></span>";
//    sObj.after(addStr);
//    var btn = $("#addBtn_" + treeNode.tId);
//    if (btn) btn.bind("click", function () {
//        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
//        zTree.addNodes(treeNode, { id: (100 + newCount), pId: treeNode.id, name: "new node" + (newCount++) });
//        return false;
//    });
};
function removeHoverDom(treeId, treeNode) {
//    $("#addBtn_" + treeNode.tId).unbind().remove();
};
function selectAll() {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.setting.edit.editNameSelectAll = $("#selectAll").attr("checked");
}
		