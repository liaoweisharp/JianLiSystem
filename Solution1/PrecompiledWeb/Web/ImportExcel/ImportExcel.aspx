<%@ page title="证书查询" language="C#" masterpagefile="~/Master/MasterPage.master" autoeventwireup="true" inherits="ImportExcel_ImportExcel, App_Web_2f13hser" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="../Scripts/Page/Excel/ImportExcel.js" type="text/javascript"></script>
    <link href="../Style/ImportExcel.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
     body
     {
         width:92%;
         margin:0px auto;
         }
     .table
     {
         border: 1px solid #009999;
    width: 100%;
    margin:5px auto;
     border-collapse: collapse;
    
         }
    .ge{ padding-right:20px;border-right:dashed 1px gray;}
    .table .header
    {
        background-color: #009999;
    color: #FFFFFF;
    font-size: 14px;
    text-align: center;
        }
   .table .row td
   {
       border: 1px solid #009999;
       text-align:center;
       }
   .yellow{ background-color:Yellow;}
   .row .td1,.row .td2,.row .td3,.row td4
   {
       width:25%;
       }
       .whereItem li
       {
           padding:5px 0px;
           }
   .queryDiv{text-align:center;padding:10px;}
   #divPageSize
   {
       text-align:center;
       }
       .numP
       {
          
           color:Blue;
           font-size:13px;
           font-weight:bold;
           }
           .FixedTitleRow
            {
                position: relative; 
                top: expression(this.offsetParent.scrollTop); 
                z-index: 10;
                background-color: #E6ECF0;
            }
            .FixedTitleColumn
            {
                position: relative; 
                left: expression(this.parentElement.offsetParent.scrollLeft);
            }
            .FixedDataColumn
            {
                position: relative;
                left: expression(this.parentElement.offsetParent.parentElement.scrollLeft);
                background-color: #E6ECF0;
            }
            #divPageSize_ZhengShu
            {
                text-align:center;
                }
    </style>

    <script type="text/javascript">

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
   


    <div>
    <div style=" position:fixed; background-color:#dbdee6; left:0px;top:0px;width:100%;">
    <fieldset style="width:90%;margin:6px auto;">
    <legend>查询条件</legend>
    <div style="padding-left:40px;">
        <select id="ddl_Company">
            <option value="-1">所有企业</option>
        </select>

        &nbsp;&nbsp;&nbsp;&nbsp;姓名:<input id="txtName" type="text" size="10" />
    </div>
    <div style="float:left;">
        
    </div>
    <div>
        <ul class="whereItem ge">
            <li>
                <select class="item_zhengshu"><option value="-1">所有证书</option></select>
            </li>
            <li  class="">
                <select class="item_zhuanye hid"><option value="-1"></option></select>
            </li>
        </ul>

         <ul class="whereItem ge">
           <li>
                <select class="item_zhengshu"><option value="-1">所有证书</option></select>
            </li>
            <li class="">
                <select class="item_zhuanye hid"><option value="-1"></option></select>
            </li>
        </ul>
         <ul class="whereItem ge">
            <li>
                <select class="item_zhengshu"><option value="-1">所有证书</option></select>
            </li>
            <li  class="">
                <select class="item_zhuanye hid"><option value="-1"></option></select>
            </li>
        </ul>

         <ul class="whereItem ge">
           <li>
                <select class="item_zhengshu"><option value="-1">所有证书</option></select>
            </li>
            <li class="">
                <select class="item_zhuanye hid"><option value="-1"></option></select>
            </li>
        </ul>
        <ul class="whereItem ge">
           <li>
                <select class="item_zhengshu"><option value="-1">所有证书</option></select>
            </li>
            <li class="">
                <select class="item_zhuanye hid"><option value="-1"></option></select>
            </li>
        </ul>
        <ul class="whereItem">
           <li>
                <select class="item_zhengshu"><option value="-1">所有证书</option></select>
            </li>
            <li class="">
                <select class="item_zhuanye hid"><option value="-1"></option></select>
            </li>
        </ul>
    </div>
    
    </fieldset>
    <div class="cl queryDiv"><input id="ck_ZhengShu" checked type="checkbox"><label for="ck_ZhengShu">公司-证书</label> &nbsp;&nbsp; <input id="ck_RenYuan" type="checkbox"><label for="ck_RenYuan">公司-人员</label>&nbsp;&nbsp;<input id="btnQuery" type="button" value="查询" onclick="Excel.click_Query()" style='width:100px;height:30px;color:green;font-size:15px;font-weight:bold'"></div>
  </div>
    <div style="margin-top:220px;"></div>
     <div id="div_ZhengShu" class='hid'>
      <div class="ZX_BG_header ZX_h2">
            <ul class="ulnone">
                <li class="ZX_title2">公司-证书</li>
                <li style="float:right">（单位:人）&nbsp;<img src="../Images/excel.png" title="导出Excel" onclick="Excel.ExportExcel_ZhengShu()"/>
        </li>
            </ul>
          
        </div>
    <div style='width:100%;text-align:right;margin:0px auto;'>
        </div>
    <div id="divZhengShu"></div>
    <div id="divPageSize_ZhengShu"></div>
    </div>
    <div id="divPerson" class='hid' style="margin-top:15px;">
     <div class="ZX_BG_header ZX_h2">
            <ul class="ulnone">
                <li class="ZX_title2">公司-人员</li>
                <li style="float:right"><img src="../Images/excel.png" title="导出Excel" onclick="Excel.ExportExcel_RenYuan()"/>
        </li>
            </ul>
          
        </div>
    <div id="divContent"></div>
    <div id="divPageSize"></div>
    </div>
   
    </div>
   


</asp:Content>

