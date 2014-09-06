<%@ Page Title="" Language="C#" MasterPageFile="~/Master/MasterPage.master" AutoEventWireup="true" CodeFile="TongJi_HeTong.aspx.cs" Inherits="HT_TongJi_HeTong" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="../Scripts/Page/TongJi_HeTong.js" type="text/javascript"></script>
    <link href="../Style/TongJi_HeTong.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Comm/Columns.js" type="text/javascript"></script>
    <link href="../Style/Base_HeTong_BianGeng.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Page/Base_HeTong_BianGeng.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_HeTong_ShouKuanJiHua.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_HeTong_FaPiaoGuanLi.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_HeTong.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_HeTong_XiangMuQianQi.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {

            var html = "<div style='margin:15px auto;'><center>请输入密码：<input id='txtPW' type='password'></center></div>"
            $.jBox(html, { title: "密码", buttons: { "确认": "1" }, submit: function (v) {

                if (v == "1") {

                    if ($.trim($("#txtPW").val()) == "mingqing2") { $.jBox.tip('密码正确', 'success'); window.HTTJ.CallWhere(); }
                    else {
                        $.jBox.tip('密码错误，请重试或联系工作人员。', 'error');
                        return false;
                    }
                }
            }, showClose: false
            });
          // window.HTTJ.CallWhere();
        })

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
        <div class="allDiv">
         <fieldset class="w46 fl">
            <legend><input type="button" value="条件" onclick="HTTJ.clickWhere()"/></legend>
                <div id="divWhere"></div>
          </fieldset>
          <fieldset class="w46 fr">
            <legend><input type="button" value="显示列名" onclick="HTTJ.clickShowCols()"/></legend>
                <div id="divCol" class="m10"></div>
          </fieldset>

       <br style="clear:both;"/>
       <input type="button" value="筛选" onclick="HTTJ.click_Filter()"/>
        <div id="divHeTong" class="m10">
            
        </div>
    </div>
</asp:Content>

