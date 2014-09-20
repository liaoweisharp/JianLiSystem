<%@ page language="C#" autoeventwireup="true" inherits="Default4, App_Web_qish40jd" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
   <%--  <script src="Scripts/jQuery/jquery-1.6.1.min.js" type="text/javascript"></script>--%>
    <script src="Scripts/jQuery/plugins/jquery.js" type="text/javascript"></script>
    <script src="Scripts/jQuery/jquery.ajax.emath.js" type="text/javascript"></script>
    <script src="Scripts/jQuery/plugins/jquery.validate.js" type="text/javascript"></script>
 <link href="Style/jCallout.css" rel="stylesheet" type="text/css" />
    <script src="Scripts/Comm/jCallout.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {

            $("#form1").validate({
                errorPlacement: function (error, element) {

                    //error.appendTo(element.parent("td").next("td"));
//                    
//                    error.appendTo("#11")
//                    
                    tipD.message = error.html();
                    
                    $(element).jCallout(tipD);
                },
                success: function (label, element) {
                
                    $(element).jCallout("hide");
                },
                debug: true



            })
//            $("#bt").validate({
//                submitHandler: function (form) {
//                    
//                }
//            })
        })
        function _click() {
//            var validator = $("#form1").validate();
            //            var bo = validator.form();
            $("#txt").jCallout({ "message": "111111" });
        }
        function _click2() {
            $("#txt").jCallout.hide();
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <input id="txt" name="txt" type="text"  date/>
        <hr />
        <input id="bt" name="bt" type="button" value="button" onclick="_click()"/>
        <input id="Button1"  name="Button1"  type="button" value="button2" onclick="_click2()"/>
    </div>
    <div id="11"></div>
    </form>
</body>
</html>
