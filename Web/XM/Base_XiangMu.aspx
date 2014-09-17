<%@ Page Title="项目管理" Language="C#" MasterPageFile="~/Master/MasterPage.master" AutoEventWireup="true" CodeFile="Base_XiangMu.aspx.cs" Inherits="XM_Base_XiangMu" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <link href="../Style/Base_XiangMu_HouQi.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/Page/Base_XiangMu_HouQi.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_XiangMu.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_XiangMu_RenYuan_Current.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_XiangMu_RenYuan_Alljs.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_XiangMu_ShiJian.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_XiangMu_XunJian.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_XiangMu_MingXi.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_XiangMu_HouQi_ShiYeBu.js" type="text/javascript"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
 <div style="width: 95%; margin: 0px auto;">
        <div class="ZX_BG_header ZX_h2">
            <ul class="ulnone">
                <li class="ZX_title2">项目部</li><li style="float: right;" class="bg_A"></li>
             <li style="height: 28px; float:right;margin-right:30px; width: 175px; background-repeat: no-repeat; background-image: url(&quot;../Images/Search1.png&quot;);">
             <input id="txtSerXiangMu" type="text" class="search searchW" watermark="工程关键字或合同号" />
             <img alt='搜索' style=" cursor:pointer;float:right" src="../Images/Search2.png" onclick="XMHQ.Search_XiangMu()"/></li>        
            </ul>
            <br />
        </div>
        <div class='cc'>
        
            <div class="divAll">
                <div id="divContent_HQ">
                </div>
                <div id="divPageSize_HQ" class="divPageSize">
                </div>
            </div>
        </div>
  <div class="ZX_BG_header ZX_h2">
            <ul class="ulnone">
                <li class="ZX_title2">事业部</li><li style="float: right;" class="bg_A"></li>
             <li style="height: 28px; float:right;margin-right:30px; width: 175px; background-repeat: no-repeat; background-image: url(&quot;../Images/Search1.png&quot;);">
             <input id="Text1" type="text" class="search searchW" watermark="工程关键字或合同号" />
             <img alt='搜索' style=" cursor:pointer;float:right" src="../Images/Search2.png" onclick="XMHQ_SYB.Search_XiangMu()"/></li>        
            </ul>
            <br />
        </div>
        <div class='cc'>
            <div class="divAll">
                <div id="divContent_HQ_ShiYeBu">
                </div>
                <div id="divPageSize_HQ_ShiYeBu" class="divPageSize">
                </div>
            </div>
        </div>
    </div>
    <div style="clear:both;display:none;">
  <table class="tb_List QQ" id="tb_MX" width="100%" cellpadding="5" style="text-align:center;">
  <tr class="header bgHeader">
    <td>移交</td>
    <td>编号</td>
    <td>类别编号</td>
    <td>资料名称</td>
    <td>类别</td>
    <td>数量</td>
    <td>页码范围</td>
    <td>备注</td>
  </tr>
  <tr class="row">
    <td><input type="checkbox" onclick="clickChange(this)"/></td>
    <td>1</td>
    <td>&nbsp;</td>
    <td>监理招投标文件；</td>
    <td></td>
     <td class="td7"><input class="txt1" type="text"/></td>
    <td class="td8"><input class="txt2" type="text"/></td>
    <td class="td9"><input class="txt3" type="text"/></td>
  </tr>
  <tr>
    <td><input type="checkbox" onclick="clickChange(this)"/></td>
    <td>6</td>
    <td>A5-5</td>
    <td>建设工程施工许可或开工审批手续；（来源建委）</td>
    <td></td>
    <td class="td7"><input class="txt1" type="text"/></td>
    <td class="td8"><input class="txt2" type="text"/></td>
    <td class="td9"><input class="txt3" type="text"/></td>
  </tr>
  <tr>
    <td><input type="checkbox" onclick="clickChange(this)"/></td>
    <td>8</td>
    <td>A7-5</td>
    <td>规划、消防、环保、技术监督、人防等部门出具的认可文件或准许使用文件；（来源主管部门）</td>
    <td></td>
    <td class="td7"><input class="txt1" type="text"/></td>
    <td class="td8"><input class="txt2" type="text"/></td>
    <td class="td9"><input class="txt3" type="text"/></td>
  </tr>

</table>
    </div>
    <script type="text/javascript">
        function clickRow(dom) {
            $(dom).toggleClass("rowSel");
        }
        function clickChange(dom) {
        
            if ($(dom).is(":checked")) {
                $(dom).parent().parent().addClass("rowSel");
            }
            else {
                $(dom).parent().parent().removeClass("rowSel");
            }
            
        }   
    </script>
    <style type="text/css">
        #tb_MX
        {
            color:Gray;
            }
    #tb_MX .txt1,#tb_MX .txt2,#tb_MX .txt3{display:none;margin:0px auto;}
    
    #tb_MX .rowSel .txt1,#tb_MX .rowSel .txt2,#tb_MX .rowSel .txt3{display:block;}
    #tb_MX .td7{width:30px;}
    #tb_MX .td8{width:40px;}
    #tb_MX .td9{width:100px;}
    #tb_MX .txt1{ width:95%}
    #tb_MX .txt2{ width:95%}
    #tb_MX .txt3{ width:95%}
	.rowSel{
	     background-color:#6699cc;
	     color:green;
	    
	}
	#tb_MX tr td
	{
	    border-bottom:1px dotted #009999;
	    }
</style>
</asp:Content>

