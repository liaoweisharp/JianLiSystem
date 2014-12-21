<%@ Page Title="印章使用" Language="C#" MasterPageFile="~/Master/MasterPage.master" AutoEventWireup="true" CodeFile="YinZhang.aspx.cs" Inherits="ZhengZhang_YinZhang" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="../Scripts/Page/ZhengZhang/YinZhang.js" type="text/javascript"></script>
    <link href="../Style/ZhengZhang/YinZhang.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jQuery/plugins/jquery.watermark.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<div>
     <div class="ZX_BG_header ZX_h2">
            <ul class="ulnone">
                <li class="ZX_title2">公司印章使用情况</li><li style="float: right;" class="bg_A"><a onclick="ZZYZ.clickAdd()"
                    href="javascript:void(0);">添加</a></li>
             <li style="height: 28px; float:right;margin-right:30px; width: 275px; background-repeat: no-repeat; background-image: url(&quot;../Images/Search1_1.png&quot;);">
             <input id="txtSerXiangMu" type="text" class="search searchW2" watermark="印章/项目/类型/部门/批准人" />
             <img alt='搜索' style=" cursor:pointer;float:right" src="../Images/Search2.png" onclick="ZZYZ.Search_XiangMu()"/></li>        
            </ul>
            <br />
        </div>
        <div class='cc'>
        
            <div class="divAll">
                <div id="divContent_QQ">
                </div>
                <div id="divPageSize_QQ" class="divPageSize">
                </div>
            </div>
        </div>
</div>
</asp:Content>

