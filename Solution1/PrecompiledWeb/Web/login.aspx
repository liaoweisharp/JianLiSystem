<%@ page language="C#" autoeventwireup="true" inherits="login, App_Web_uawfmnkv" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>明清管理系统</title>
    <style type="text/css">
        body
        {
            background-image:url(Images/loginBg.jpg); 
            background-repeat:no-repeat; 
            background-position:center;
            background-attachment:fixed; 
            background-color:#cbcbcb;
            }
        .bg1
        {
            background-image:url(Images/login3.gif);
            position:fixed;
            right:10px;
            top:5%;
            width:396px;
            height:536px;
            }
        .txt,.bt
        {
            position:relative;
            left:30px;  
            height:45px;
            background-color:transparent;
            text-indent:8px;
            border:0px;
        }
        .txt
        {
            width:335px;
            
            font-size:18px;
            }
        #txtUserName
        {
            top:189px
            }
        #txtPassword
        {
            top:250px
            }
        #btLogin
        {
            top:313px;
            height:48px;
            left:138px;
            width:120px;
            
            }
        #lb_Status
        {
             position:relative;
            top:333px;
          
            left:158px;
           
            }
    </style>
</head>
<body style="">
    <form id="form1" runat="server">
   
    <span class="bg1">
    <input runat="server" id="txtUserName" class="txt" type="text" />
    <br />
    <input runat="server"  id="txtPassword" class="txt" type="password"/>
    <br />
    <asp:Button  class="bt" ID="btLogin" runat="server" onclick="btLogin_Click" />
    <br />
        <asp:Label ID="lb_Status" runat="server" Font-Bold="True" Visible="false"
        ForeColor="#FF3300"></asp:Label>
    </span>
    </form>
</body>
</html>
