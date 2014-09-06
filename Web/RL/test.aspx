<%@ Page Title="" Language="C#" MasterPageFile="~/Master/MasterPage.master" AutoEventWireup="true" CodeFile="test.aspx.cs" Inherits="RL_test" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="../Scripts/jQuery/plugins/validate/jquery.validate.js" type="text/javascript"></script>
    <script src="../Scripts/jQuery/plugins/validate/jquery.metadata.js" type="text/javascript"></script>
    <script src="../Scripts/jQuery/plugins/validate/messages_zh.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        $("#form1").validate({
            errorPlacement: function (error, element) {
                

                if (error.text() == '') {
                
                    $(element).jCallout("hide");
                } else {
                    //alert("errorPlacement," + error.html())
                    tipD.message = error.html();
                    $(element).jCallout(tipD);
                }
                
            },
            //            success: function (label, element) {
            //                alert("success")
            //                $(element).jCallout("hide");
            //            },
            debug: true
        })
    })
    function _click() {
        var validator = $("#form1").validate();
        var bo = validator.form();
        alert(bo);
        //$("#txt").jCallout({ "message": "111111" });
    }
    function _click2() {
        $("#txt").jCallout("hide");
    }
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<div class="hid">
    <input id="txt2" name="txt2" type="text" class="number required"/>
    </div>
    <br />
   <input id="txt" name="txt" type="text" class="date required"/>
        <hr />
        <input id="bt" name="bt" type="button" value="button" onclick="_click()"/>
        <input id="Button1" name="Button1" type="button" value="button2" onclick="_click2()"/>

</asp:Content>

