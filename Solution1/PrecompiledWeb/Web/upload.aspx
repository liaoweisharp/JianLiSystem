<%@ page language="C#" autoeventwireup="true" inherits="upload, App_Web_uawfmnkv" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="Scripts/jQuery/jquery-1.6.1.min.js" type="text/javascript"></script>
    <script src="Scripts/jQuery/jquery.ajax.emath.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () { 
        
            $invokeWebService_2("~WebService_XiangMu.test", {}, null, function (result) {
                
            }, null, null, { userContent: "getInitData" });
        })
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
    </form>
</body>
</html>
