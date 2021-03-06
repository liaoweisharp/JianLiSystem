﻿<%@ Page Title="成本及结算" Language="C#" MasterPageFile="~/Master/MasterPage.master" AutoEventWireup="true" CodeFile="Base_ChengBen.aspx.cs" Inherits="CBJS_Base_ChengBen" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="../Scripts/Page/Base_CBJS.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_CBJS_ShiYeBu.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_CBJS_ShiYeBu_JSMX.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_CBJS_ZhiGuan.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_CBJS_ZhiGuan_Zu.js" type="text/javascript"></script>
    <link href="../Style/Base_XiangMu_ShiYeBu_JSMX.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Page/Base_XiangMu_BanGongYongPin.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_XiangMu_PeiXunJiJiao.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_XiangMu_JiXiaoKaoHe.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_XiangMu_BaoXiao.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_XiangMu_FeiYongTiaoZheng.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_XiangMu_RenYuanXinChou.js" type="text/javascript"></script>

    <script src="../Scripts/jQuery/plugins/jquery.watermark.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div style="width: 98%; margin: 0px auto;">

     <div class="ZX_BG_header ZX_h2" >
            <ul class="ulnone">
                <li class="ZX_title2">项目部</li>
              <li style="height: 28px; float:right;margin-right:30px; width: 175px; background-repeat: no-repeat; background-image: url(&quot;../Images/Search1.png&quot;);">
             <input id="txtSerXiangMu_ZhiGuan" type="text" class="search searchW" watermark="工程关键字或合同号" />
             <img alt='搜索' style=" cursor:pointer;float:right" src="../Images/Search2.png" onclick="ZGZU.Search_ZhiGuan()"/></li>        
             <li style="height: 28px; float:right;margin-right:30px;">
                <select class="ddlJieSuan" onchange="ZGZU.Search_ZhiGuan()" id="ddlJiSuan_ZhiGuan">
                    <option value="-1">结算状态（全部）</option>
                    <option value='-100' class="empty">(未填)</option>
                </select>
             </li>
            </ul>
            <br />
        </div>
        <div class='cc'>
            <div class="divAll">
                <div id="divContent_ZhiGuan_Zu">
                </div>
                <div id="divPageSize_ZhiGuan_Zu" class="divPageSize">
                </div>
            </div>
        </div>
        <br />
        <div class="ZX_BG_header ZX_h2">
            <ul class="ulnone">
                <li class="ZX_title2">事业部</li>
             <li style="height: 28px; float:right;margin-right:30px; width: 175px; background-repeat: no-repeat; background-image: url(&quot;../Images/Search1.png&quot;);">
             <input id="txtSerXiangMu_ShiYeBu" type="text" class="search searchW" watermark="工程关键字或合同号" />
             <img alt='搜索' style=" cursor:pointer;float:right" src="../Images/Search2.png" onclick="SYB.Search_XiangMu_ShiYeBu()"/></li>        
             <li style="height: 28px; float:right;margin-right:30px;">
                <select  class="ddlJieSuan" onchange="SYB.Search_XiangMu_ShiYeBu()" id="ddlJiSuan_ShiYeBu">
                    <option value="-1">结算状态（全部）</option>
                    <option value='-100' class="empty">(未填)</option>
                </select>
             </li>
            </ul>
            <br />
        </div>
        <div class='cc'>
            <div class="divAll">
                <div id="divContent_ShiYeBu">
                </div>
                <div id="divPageSize_ShiYeBu" class="divPageSize">
                </div>
            </div>
        </div>
 
         
    </div>
</asp:Content>

