﻿<%@ page title="月薪及成本" language="C#" masterpagefile="~/Master/MasterPage.master" autoeventwireup="true" inherits="Report_Base_XiangMuForMonth, App_Web_t1zvudpd" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="../Scripts/Page/Report/XiangMuForMonth.js" type="text/javascript"></script>
    <style type="text/css">
        #xiangMuForMonth td
        {
            border:1px solid #C1C1BB;
            }
        .total
        {
             color:Green;
             font-size:15px;
             font-weight:bold;
             text-align:right;
             padding:10px;
            }
        #header
        {
            font-size:22px;
            text-align:center;
            }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div id="loading" style=" text-align:center; margin:10px;"><img src="../Images/ajax-loader_b.gif" /></div>
    <div id="header"></div>
    <div id="content"></div>
</asp:Content>

