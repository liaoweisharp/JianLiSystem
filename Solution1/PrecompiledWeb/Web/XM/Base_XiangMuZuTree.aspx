<%@ page title="项目部" language="C#" masterpagefile="~/Master/MasterPage.master" autoeventwireup="true" inherits="XM_Base_XiangMuZuTree, App_Web_fesklvsj" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
	<link rel="stylesheet" type="text/css" href="../Scripts/jQuery/plugins/zTree_v3.5.14/css/zTreeStyle/zTreeStyle.css" />
    <script type="text/javascript" src="../Scripts/jQuery/plugins/zTree_v3.5.14/js/jquery-1.4.4.min.js"></script>
    <script type="text/javascript" src="../Scripts/jQuery/plugins/zTree_v3.5.14/js/jquery.ztree.core-3.5.js"></script>
    <script type="text/javascript" src="../Scripts/jQuery/plugins/zTree_v3.5.14/js/jquery.ztree.excheck-3.5.min.js"></script>
    <script type="text/javascript" src="../Scripts/jQuery/plugins/zTree_v3.5.14/js/jquery.ztree.exedit-3.5.min.js"></script>
    <script src="../Scripts/Page/Base_XiangMuZuTree.js" type="text/javascript"></script>
    	<style type="text/css">
.ztree li span.button.add {margin-left:2px; margin-right: -1px; background-position:-144px 0; vertical-align:top; *vertical-align:middle}
	</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="content_wrap">
	    <div class="zTreeDemoBackground left">
		    <ul id="treeDemo" class="ztree"></ul>
	    </div>
    </div>
</asp:Content>

