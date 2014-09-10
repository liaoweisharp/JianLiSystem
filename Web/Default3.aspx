<%@ Page Title="" Language="C#" MasterPageFile="Master/MasterPage.master" AutoEventWireup="true" CodeFile="Default3.aspx.cs" Inherits="Default3" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="Scripts/jQuery/jquery-1.6.1.min.js" type="text/javascript"></script>
    <script src="Scripts/jQuery/jquery.ajax.emath.js" type="text/javascript"></script>
    <script src="Scripts/jQuery/plugins/jquery.jUploader-1.01.min.js" type="text/javascript"></script>
    <link href="Scripts/JQuery/plugins/jBox/Skins/Default/jbox.css" rel="stylesheet" type="text/css" />
    <script src="Scripts/JQuery/plugins/jBox/jquery.jBox-2.3.min.js?ver=Acepherics120317" type="text/javascript"></script>
   
    <script src="Scripts/JQuery/plugins/jBox/i18n/jquery.jBox-zh-CN.js?ver=Acepherics120317" type="text/javascript"></script>
    <script src="Scripts/Page/Default.js" type="text/javascript"></script>
    <style>
       body { margin:30px; font-family: verdana, arial, helvetica, sans-serif; font-size: 12px; line-height: 18px; background: #373A32; color: #D0D0D0;}
        h1 {color: #C7D92C;	font-size: 22px; font-weight: 600;}
        h2 {color: #C7D92C;	font-size: 16px; font-weight: 300;}
        h3 {font-size: 13px; font-weight: 200;}
        a {	color: #C7D92C;}
        a:hover, a.hover {color: white;}
        img{ border: none;}
        .line{ margin: 20px 0; height:0px; border-bottom: 1px dashed #aaa;}
        .preview { padding:3px; border: none; height: 128px; width: 128px; background-color:#D0D0D0;}
        .wrap{ width:100%; height:auto; min-height:160px; background: none repeat scroll 0 0 #EEEEEE; border-radius: 5px 5px 5px 5px; display: inline-block;}
        .item{ padding:10px; }
        
        /* jUploader 按钮样式，应该到自己的项目中时，可以根据你的要求的写它的样式，但是类名不可以改 */
        .jUploader-button {width: auto;background: none repeat-x scroll 0 0 #222222;border-bottom: 1px solid rgba(0, 0, 0, 0.25);border-radius: 4px 4px 4px 4px;box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.25);color: #FFFFFF !important;display:inline-block;font-weight: bold;padding: 2px 12px 3px;text-decoration: none;cursor: pointer;}
        .jUploader-button-hover {background-color:#111111; color:#fff;}
        </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

<div>
    <div class='header'>
        <ul class="">
            <li>收款提醒</li>
            <li>
            <select>
                <option>一周</option>
                <option>两周</option>
                <option>一个月</option>
                <option>两个月</option>
            </select>
            </li>
        </ul>
    </div>
    <div class='content'></div>
</div>


    <label id="dd" value='abc'>123</label>
    <h2>实例（四）:  </h2>  

    <!-- 例子4 -->
    <div class="wrap">
        <div class="item">
            <table>
                <tr>
                    <td style="width:145px;"><div class="preview"><img id="photo4" width="128" height="128" src="Images/empty.png" alt="photo" /></div></td>
                    <td valign="bottom"><div id="upload-button4"><span></span></div> <!-- div里的span必须保留，用来放文字的 --></td>
                </tr>
            </table>
        </div>
    </div>

    <br />
    <table id="table1" border="1" cellpadding="5" cellspacing="0" width="300px"> 
<tr> 
<td><a href='Default2.aspx'>1</a></td> 
<td>2</td> 
<td>3</td> 
<td>4</td> 
</tr> 

<tr> 
<td><a href='Default2.aspx'>1</a></td> 
<td>f</td> 
<td>3</td> 
<td>s</td> 
</tr> 
</table> 



</asp:Content>

