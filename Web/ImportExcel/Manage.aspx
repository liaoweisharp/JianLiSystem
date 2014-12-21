<%@ Page Title="企业" Language="C#" MasterPageFile="~/Master/MasterPage.master" AutoEventWireup="true" CodeFile="Manage.aspx.cs" Inherits="ImportExcel_Manage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="../Scripts/Page/Excel/Manage.js" type="text/javascript"></script>
    <style type="text/css">
        table{border-collapse:collapse}
        .tb_List td{ text-align:center;border: 1px solid #009999;}
        .tb_List .td1{ width:200px;}
        .tb_List .td2{ width:80px;}
        .tb_List .td3{ width:120px;}
        .tb_List .td7{ width:120px;}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div>
     <div class="ZX_BG_header ZX_h2">
            <ul class="ulnone">
                <li class="ZX_title2">企业管理</li><li style="float: right;" class="bg_A"><a onclick="ExcelCompany.clickAdd()"
                    href="javascript:void(0);">添加</a></li>
             <li style="height: 28px; float:right;margin-right:30px; width: 175px; background-repeat: no-repeat; background-image: url(&quot;../Images/Search1.png&quot;);">
             <input id="txtSerXiangMu" type="text" class="search searchW" watermark="企业" />
             <img alt='搜索' style=" cursor:pointer;float:right" src="../Images/Search2.png" onclick="ExcelCompany.Search_XiangMu()"/></li>        
            </ul>
            <br />
        </div>
        <div class='cc'>
            <%--<div>
    <ul class="ulnone fr" >
        <li class="mr20 bg_A"><a href="javascript:void(0);" onclick="ExcelCompany.clickAdd()">添加</a></li>
    </ul>
    <br />
</div>--%>
            <div class="divAll">
                <div id="divContent_QQ">
                </div>
                <div id="divPageSize_QQ" class="divPageSize">
                </div>
            </div>
        </div>
</div>
</asp:Content>


