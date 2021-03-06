﻿<%@ Page Title="合同管理" Language="C#" MasterPageFile="~/Master/MasterPage.master" AutoEventWireup="true"
    CodeFile="Base_HeTong.aspx.cs" Inherits="HT_Base_HeTong" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="../Scripts/Page/Base_HeTong.js" type="text/javascript"></script>
    <link href="../Style/Base_HeTong.css" rel="stylesheet" type="text/css" />
    <link href="../Style/Base_HeTong_XiangMuQianQi.css" rel="stylesheet" type="text/css" />
    <link href="../Style/Base_HeTong_BianGeng.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Page/Base_HeTong_BianGeng.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_HeTong_ShouKuanJiHua.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_HeTong_XiangMuQianQi.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_HeTong_FaPiaoGuanLi.js" type="text/javascript"></script>
   
    <script src="../Scripts/jQuery/plugins/jquery.watermark.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div style="width: 98%; margin: 0px auto;">
        <div class="ZX_BG_header ZX_h2">
            <ul class="ulnone">
                <li class="ZX_title2">项目执行</li><li style="float: right;" class="bg_A"><a onclick="XMQQ.clickAdd()"
                    href="javascript:void(0);">添加</a></li>
             <li style="height: 28px; float:right;margin-right:30px; width: 175px; background-repeat: no-repeat; background-image: url(&quot;../Images/Search1.png&quot;);">
             <input id="txtSerXiangMu" type="text" class="search searchW" watermark="工程关键字或合同号" />
             <img alt='搜索' style=" cursor:pointer;float:right" src="../Images/Search2.png" onclick="XMQQ.Search_XiangMu()"/></li>        
              <li style="height: 28px; float:right;margin-right:30px;">
                <select class="ddlJieSuan" onchange="XMQQ.Search_XiangMu()" id="ddl_QQ_ZhuangTai">
                    <option value="-1">项目执行状态（全部）</option>
                    <option value='-100' class="empty">(未填)</option>
                </select>
             </li>
            </ul>
            <br />
        </div>
        <div class='cc'>
            <%--<div>
    <ul class="ulnone fr" >
        <li class="mr20 bg_A"><a href="javascript:void(0);" onclick="XMQQ.clickAdd()">添加</a></li>
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
        <div class="ZX_BG_header ZX_h2" >
            <ul class="ulnone">
                <li class="ZX_title2">合同</li>
               
                <li style="float: right;" class="bg_A"><a onclick="click_AddHeTong()"
                    href="javascript:void(0);">添加</a></li>
             <li style="height: 28px; float:right;margin-right:30px; width: 175px; background-repeat: no-repeat; background-image: url(&quot;../Images/Search1.png&quot;);">
             <input id="txtSerHeTong" type="text" class="search searchW" watermark="合同关键字或合同号" />
             <img alt='搜索' style=" cursor:pointer;float:right" src="../Images/Search2.png" onclick="Click_Search_HeTong()"/></li>
                <li style="height: 28px; float:right;margin-right:30px;">
                <select class="ddlJieSuan" onchange="Click_Search_HeTong()" id="ddl_HT_ZhuangTai">
                    <option value="-1">合同执行状态（全部）</option>
                    <option value='-100' class="empty">(未填)</option>
                </select>
             </li>
            </ul>
            <br />
        </div>
        <div class='cc'>
            <%--<div>
    <ul class="ulnone fr" >
        <li class="mr20 bg_A"><a href="javascript:void(0);" onclick="click_AddHeTong()">添加</a></li>
    </ul>
    <br />
</div>--%>
            <div class="divAll">
                <div id="divContent">
                </div>
                <div id="divPageSize" class="divPageSize">
                </div>
            </div>
        </div>
    </div>
</asp:Content>
