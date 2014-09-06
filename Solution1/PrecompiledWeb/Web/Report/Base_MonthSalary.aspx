<%@ page title="月薪及成本" language="C#" masterpagefile="~/Master/MasterPage.master" autoeventwireup="true" inherits="Report_Base_MonthSalary, App_Web_kgwmq2py" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="../Scripts/Page/Report/MonthSalary.js" type="text/javascript"></script>
    <link href="../Style/Base_MonthSalary.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<%--<input type="button" value="确认所有工资" onclick="MS.click_QueRenGongZi()"/>
<input type="button" value="得到第二步数据" onclick="MS.click_GetStep2Data()"/>
<input type="button" value="得到第三步数据" onclick="MS.click_GetStep3Data()"/>--%>
<div >
    <div id="header" style="float:left;width:300px;font-size:22px;color:Blue;padding-left:20px;"></div>
    <div id="mid" style="float:left; text-align:center;"><input id="btnStep1" class="hid" type="button" value="确认所有工资，转到下一步" onclick="MS.click_QueRenGongZi()"/> <input id="btnStep2" class="hid" type="button" value="全部确认，转到下一步" onclick="MS.click_ChengBenComfirmAll()"/></div>
    <div style="width:200px;float:right;font-size:18px;color:Blue;"><a href="Base_AllSalary.aspx"><返回</a></div>
</div>
<div style="clear:both;">
<div id="divStep1" class="hid"></div>
<div id="divStep2" class="hid"></div>
<div id="divStep3" class="hid"></div>
</div>
</asp:Content>

