<%@ page title="我的提醒" language="C#" masterpagefile="~/Master/MasterPage.master" autoeventwireup="true" inherits="Desktop, App_Web_wzydtna2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<script src="../Scripts/jQuery/jquery-1.6.1.min.js" type="text/javascript"></script>
    <script src="../Scripts/jQuery/jquery.ajax.emath.js" type="text/javascript"></script>

    <script src="../Scripts/Comm/String.js" type="text/javascript"></script>
    <script src="../Scripts/Comm/Array.js" type="text/javascript"></script>
    <script src="../Scripts/Comm/Comm.js" type="text/javascript"></script>
    <script src="../Scripts/Comm/Math.js" type="text/javascript"></script>
    <script src="../Scripts/Comm/Date.js" type="text/javascript"></script>
    <%--<script src="../Scripts/Page/MasterPage.js" type="text/javascript"></script>--%>
    <script src="../Scripts/Page/TiXing/TiXing_ShouKuan.js" type="text/javascript"></script>
    <script src="../Scripts/Page/TiXing/TiXing_HeTong.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_TiXing.js" type="text/javascript"></script>
    <link href="../Style/Base_TiXing.css" rel="stylesheet" type="text/css" />
   
    <script src="../Scripts/jQuery/plugins/jBox/jquery.jBox-2.3.min.js" type="text/javascript"></script>
    <link href="../Scripts/jQuery/plugins/jBox/Skins/jbox-default.css" rel="stylesheet"
        type="text/css" />
        <link href="../Style/Base_TiXing.css" rel="stylesheet" type="text/css" />
        <script src="../Scripts/jQuery/plugins/jquery.pagination.js" type="text/javascript"></script>
    <link href="../Style/JQuery/pagination.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<div>
        <div id="divSK" class="tx fl w600"></div>
        <div id="divHT" class="tx fl w480" style="margin-left:15px;"></div>
        
    </div>
</asp:Content>

