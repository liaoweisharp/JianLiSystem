<%@ page title="成本及结算" language="C#" masterpagefile="~/Master/MasterPage.master" autoeventwireup="true" inherits="CBJS_Base_ChengBen, App_Web_cmivaeyh" %>

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
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div style="width: 95%; margin: 0px auto;">
        <div class="ZX_BG_header ZX_h2">
            <ul class="ulnone">
                <li class="ZX_title2">事业部</li>
            <%-- <li style="height: 28px; float:right;margin-right:30px; width: 175px; background-repeat: no-repeat; background-image: url(&quot;../Images/Search1.png&quot;);">
             <input id="txtSerXiangMu_ShiYeBu" type="text" class="search searchW" watermark="工程关键字或合同号" />
             <img alt='搜索' style=" cursor:pointer;float:right" src="../Images/Search2.png" onclick="Search_XiangMu_ShiYeBu()"/></li>   --%>     
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
 
          <div class="ZX_BG_header ZX_h2" >
            <ul class="ulnone">
                <li class="ZX_title2">直管(项目组)</li>
              <%--<li style="height: 28px; float:right;margin-right:30px; width: 175px; background-repeat: no-repeat; background-image: url(&quot;../Images/Search1.png&quot;);">
             <input id="txtSerXiangMu_ZhiGuan" type="text" class="search searchW" watermark="工程关键字或合同号" />
             <img alt='搜索' style=" cursor:pointer;float:right" src="../Images/Search2.png" onclick="Search_XiangMu_ZhiGuan()"/></li>        --%>
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
    </div>
</asp:Content>

