<%@ Page Title="证书外借" Language="C#" MasterPageFile="~/Master/MasterPage.master" AutoEventWireup="true" CodeFile="ZhengShuWaiJie.aspx.cs" Inherits="ZhengZhang_ZhengShuWaiJie" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="../Scripts/Page/ZhengZhang/ZhengShuWaiJie.js" type="text/javascript"></script>
    <link href="../Style/ZhengZhang/ZhengShuWaiJie.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jQuery/plugins/jquery.watermark.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<div>
     <div class="ZX_BG_header ZX_h2">
            <ul class="ulnone">
                <li class="ZX_title2">证书外借情况</li><li style="float: right;" class="bg_A"><a onclick="ZZZSWJ.clickAdd()"
                    href="javascript:void(0);">添加</a></li>
             <li style="height: 28px; float:right;margin-right:30px; width: 275px; background-repeat: no-repeat; background-image: url(&quot;../Images/Search1_1.png&quot;);">
             <input id="txtSerXiangMu" type="text" class="search searchW2" watermark="姓名/证书/项目/类型" />
             <img alt='搜索' style=" cursor:pointer;float:right" src="../Images/Search2.png" onclick="ZZZSWJ.Search_XiangMu()"/></li>        
             <li style="float:right; margin-right:20px">
                <select id="ddlGuiHuan" onchange="ZZZSWJ.Search_XiangMu()">
                    <option value='-1'>全部</option>
                    <option value='0'>未归还</option>
                    <option value='1'>已归还</option>
                </select>
             </li>
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

