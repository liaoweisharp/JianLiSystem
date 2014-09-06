<%@ Page Title="人力资源" Language="C#" MasterPageFile="~/Master/MasterPage.master" AutoEventWireup="true" CodeFile="Base_RenLi.aspx.cs" Inherits="RL_Base_RenLi" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="../Scripts/Page/Base_RenLi.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_User.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_User_JingLi_GongCheng.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_User_JingLi_XueXi.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_User_JingLi_GongZuo.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_User_XueLi.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_User_ZhiCheng.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_User_ZhiYeZiGet.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_User_XinChou.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_User_XinChou_KouKuanJiangLi.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_User_PeiXun.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_User_DiaoDong.js" type="text/javascript"></script>
    <script src="../Scripts/Comm/TextSelect.js" type="text/javascript"></script>
    <script src="../Scripts/Page/Base_User_JiangCheng.js" type="text/javascript"></script>
    <link href="../Style/Base_User.css" rel="stylesheet" type="text/css" />
    <link href="../Style/Base_RenLi.css" rel="stylesheet" type="text/css" />
    <link href="../Style/Base_XinChou.css" rel="stylesheet" type="text/css" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<div class='width:95%; margin:0px auto;'>
    <div style=" height:28px; line-height:28px" class="ZX_BG_header ZX_h2">
            <ul class="ulnone">
                <li class="ZX_title2">人员</li>
               
                <li class="bg_A" style="float: right;"><a href="javascript:void(0);" onclick="USER.click_AddUser()">添加</a></li>
             <li style="height: 28px; float:right;margin-right:30px; width: 175px; background-repeat: no-repeat; background-image: url(../Images/Search1.png);"><input id="txtSerUser" type="text" class="search searchW" watermark="姓名或部门名称" /><img alt='搜索' style=" cursor:pointer;float:right" src="../Images/Search2.png" onclick="Click_Search_User()"/></li>
            </ul>
            <br/>
        </div>
        <div class='cc'>
            <div class="divAll">
                <div id="divContent">
                </div>
                <div id="divPageSize" class="divPageSize">
                </div>
            </div>
        </div>
</div>
<div id="divXC_AddOrEdit" class="clear hid">
    <div>
<div>
     <table cellpadding="4" cellspacing="0" class="tbComm">
		<tr>
        	<td class="col">状态<font class='red'>*</font></td>
			<td class="value w1">
                <select class="ddlZhuangTai" onchange="XC.ddlZhuangTaiChange(this)" itemid="xc_TiaoZhengLeiXing">
                    <option value='0'>正常发放</option>
                    <option value='1'>停发工资</option>
                    <option value='2'>结算工资</option>
                </select>
            </td>
		</tr>
	</table>
    </div>
    <div class="sec tingfa">
	<table cellpadding="4" cellspacing="0" class="tbComm">
		<tr>
        	<td class="col">调整时间<font class='red'>*</font></td>
			<td class="value w1"><input class="txt center w100" type="text" itemid="xc_TiaoZhengShijian"/></td>
            <%--<td class="col">是否停发工资</td>
			<td class="value w1">
            <input value="0" name="xc_TiaoZhengLeiXing" type="radio" style="width:auto;"/><label for="rb_TingFaNo">否</label>&nbsp;
            <input value="1" name="xc_TiaoZhengLeiXing" type="radio" style="width:auto;"/><label for="rb_TingFaYes">是</label>
            <input type="hidden" itemid="xc_TiaoZhengLeiXing"/>
            </td>--%>
			<td class="col">调整原因</td>
			<td class="value"><input class="txt center" type="text" style="width:120px" itemid="xc_YuanYin"/> <a name="xuanze" href="javascript:void(0)">选择</a></td>
			
		</tr>
	
		
	</table>
    </div>
    <div class="sec jiesuan" >
	<table cellpadding="4" cellspacing="0" class="tbComm">
		<tr>
        	<td class="col">结算时间段<font class='red'>*</font></td>
			<td class="value w1">
            <input class="txt center w100" type="text" itemid="xcjs_JieSuan_StartDate"/> 至 
            <input class="txt center w100" type="text" itemid="xcjs_JieSuan_EndDate"/>
            </td>
			<td class="col">发放月份<font class='red'>*</font></td>
			<td class="value">
            <select itemid='xcjs_FaFang_Year' style="width:50px;">
                <option value='2013'>2013</option>
                <option value='2014'>2014</option>
                <option value='2015'>2015</option>
                
            </select>年&nbsp;
            <select itemid='xcjs_FaFang_Month'  style="width:40px;">
                <option value='1'>01</option>
                <option value='2'>02</option>
                <option value='3'>03</option>
                <option value='4'>04</option>
                <option value='5'>05</option>
                <option value='6'>06</option>
                <option value='7'>07</option>
                <option value='8'>08</option>
                <option value='9'>09</option>
                <option value='10'>10</option>
                <option value='11'>11</option>
                <option value='12'>12</option>
            </select>月
            </td>
			
		</tr>
	
		
	</table>
    </div>
<div class='sec'>
<table cellpadding="4" cellspacing="0" class="tbComm">
<tr>
		<td colspan="4" class="header">社保基数 &nbsp;<a href="javascript:void(0)" onclick="XC.autoJiSuan_SheBao()">计算</a><img  name="jsSheBao" align="absmiddle" src="../Images/tip.png" /></td>
	  </tr>
	<tr>
		<td class="col">养老<font class='red'>*</font></td>
		<td class="value"><input type="text" class="txt center" itemid="xc_YangLaoJiShu" value="2156"/></td>
		<td class="col" style="width:200px;">医疗、生育、失业、工伤、大病<font class='red'>*</font></td>
		<td class="value"><input type="text"  class="txt center" itemid="xc_YiliaoJiShu" value="1911"/></td>
	</tr>
</table>
</div>

<div  class='sec'>
<table name="yingFa" cellpadding="4" cellspacing="0" class="tbComm fl">
	<tr>
    <td colspan="2" class="header">应发金额
      </td>
    </tr>
  <tr>
    <td class="col">基本工资<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_YF_JiBenGongZi" value="0" required/></td>
  </tr>
  <tr>
    <td class="col">岗位工资<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_YF_GangWeiGongZi" value="0"/></td>
  </tr>
    <tr>
    <td class="col">通讯补贴<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_YF_TongXun" value="0"/></td>
  </tr>
  <tr>
    <td class="col">生活补贴<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_YF_ShengHuo" value="0"/></td>
  </tr>
   <tr>
    <td class="col">交通补贴<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_YF_JiaoTong" value="0"/></td>
  </tr>
    <tr>
    <td class="col">驻外补贴<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_YF_ZhuWai" value="0"/></td>
  </tr>
 
 <tr>
    <td class="col">挂证费<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_YF_GuaZhengFei" value="0"/></td>
  </tr>
 <tr>
    <td class="col to">小计</td>
    <td class="value center"><label name="xiaoji"></label></td>
  </tr>
</table>
<table name="yingKou" cellpadding="4" cellspacing="0" class="tbComm fl" style="margin-left:20px;">
  <tr>
    <td colspan="2" class="header">个人应扣金额
      </td>
    </tr>
  <tr>
    <td class="col">养老<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_YK_YangLao" value="0"/></td>
  </tr>
  <tr>
    <td class="col">医疗<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_YK_YiLiao" value="0"/></td>
  </tr>
    <tr>
    <td class="col">生育<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_YK_ShengYu" value="0"/></td>
  </tr>
  <tr>
    <td class="col">失业<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_YK_ShiYe" value="0"/></td>
  </tr>
   <tr>
    <td class="col">工伤<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_YK_GongShang" value="0"/></td>
  </tr>
    <tr>
    <td class="col">大病<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_YK_DaBing" value="0"/></td>
  </tr>
  <tr>
    <td class="col">风险金<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_YK_FengXianJin" value="0"/></td>
  </tr>
 
<%--  <tr>
    <td class="col">个税</td>
    <td class="value"><input class="txt center" type="text" itemid="xc_YK_GeShui" value="0"/></td>
  </tr>--%>
 <tr>
    <td class="col to">小计</td>
    <td class="value center"><label name="xiaoji"></label></td>
  </tr>
</table>
<table name="gongSiChengDan" cellpadding="4" cellspacing="0" class="tbComm fl" style="margin-left:20px;">
  <tr>
    <td colspan="2" class="header">公司承担金额
      </td>
    </tr>
  <tr>
    <td class="col">养老<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_GS_YangLao" value="0"/></td>
  </tr>
  <tr>
    <td class="col">医疗<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_GS_YiLiao" value="0"/></td>
  </tr>
    <tr>
    <td class="col">生育<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_GS_Sheng" value="0"/></td>
  </tr>
  <tr>
    <td class="col">失业<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_GS_ShiYe" value="0"/></td>
  </tr>
   <tr>
    <td class="col">工伤<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_GS_GongShang" value="0"/></td>
  </tr>
    <tr>
    <td class="col">大病<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_GS_DaBing" value="0"/></td>
  </tr>
    <tr>
    <td class="col">商保<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_GS_ShangBao" value="0"/></td>
  </tr>
 <tr>
    <td class="col">其他<font class='red'>*</font></td>
    <td class="value"><input class="txt center" type="text" itemid="xc_GS_Qi" value="0"/></td>
  </tr>
 <tr>
    <td class="col to">小计</td>
    <td class="value center"><label name="xiaoji"></label></td>
  </tr>
</table>
</div>
</div>
<div class="clear" style="margin-top:10px;">
	<table cellpadding="4" cellspacing="0" class="tbComm">
		<tr>
			<td class="col bz">备注</td>
			<td class="area"><textarea class="w100" name="" cols="" rows="" itemid="xc_BeiZhu_YingFa" style="height: 17px;"></textarea></td>
		</tr>
		<tr class='hid'>
			<td class="col bz">备注(个人应扣金额)</td>
			<td class="area"><textarea class="w100" name="" cols="" rows="" itemid="xc_BeiZhu_YingKou" style="height: 17px;"></textarea></td>
		</tr>
	</table>
</div>
<div class="center sec"><input type="button" name="copy" value="拷贝最近一次记录"/></div>
</div>
<div id="divXC_Review" class="clear hid">
    <div>
    <label itemid="xc_TiaoZhengLeiXing"></label>
<div class="sec tingfa" >
    
	<table cellpadding="4" cellspacing="0" class="tbComm">
		<tr>
            <td class="col">调整时间</td>
			<td class="value w1"><label itemid="xc_TiaoZhengShijian"></label></td>
			<td class="col">调整原因</td>
			<td class="value"><label itemid="xc_YuanYin"></label></td>	
		</tr>
	</table>
</div>
 <div class="sec jiesuan" >
	<table cellpadding="4" cellspacing="0" class="tbComm">
		<tr>
        	<td class="col">结算时间段</td>
			<td class="value w1">
            <label itemid="xcjs_JieSuan_StartDate"></label> 至 
            <label itemid="xcjs_JieSuan_EndDate"></label>
           
            </td>
			<td class="col">发放月份</td>
			<td class="value">
            <label itemid="xcjs_FaFang_Year"></label>年
            <label itemid="xcjs_FaFang_Month"></label>月
           
            </td>
			
		</tr>
	
		
	</table>
    </div>
<div class='sec'>
<table cellpadding="4" cellspacing="0" class="tbComm">
<tr>
		<td colspan="4" class="header">社保基数</td>
	  </tr>
	<tr>
		<td class="col">养老</td>
		<td class="value"><label validate='money' itemid="xc_YangLaoJiShu"></label></td>
		<td class="col" style="width:200px;">医疗、生育、失业、工伤、大病</td>
		<td class="value"><label validate='money' itemid="xc_YiliaoJiShu"></label></td>
	</tr>
</table>
</div>

<div  class='sec'>
<table name="yingFa" cellpadding="4" cellspacing="0" class="tbComm fl">
	<tr>
    <td colspan="2" class="header">应发金额
      </td>
    </tr>
  <tr>
    <td class="col">基本工资</td>
    <td class="value"><label validate='money' itemid="xc_YF_JiBenGongZi"></label></td>
  </tr>
  <tr>
    <td class="col">岗位工资</td>
    <td class="value"><label validate='money' itemid="xc_YF_GangWeiGongZi"></label></td>
  </tr>
    <tr>
    <td class="col">通讯补贴</td>
    <td class="value"><label validate='money' itemid="xc_YF_TongXun"></label></td>
  </tr>
  <tr>
    <td class="col">生活补贴</td>
    <td class="value"><label validate='money' itemid="xc_YF_ShengHuo"></label></td>
  </tr>
   <tr>
    <td class="col">交通补贴</td>
    <td class="value"><label validate='money' itemid="xc_YF_JiaoTong"></label></td>
  </tr>
    <tr>
    <td class="col">驻外补贴</td>
    <td class="value"><label validate='money' itemid="xc_YF_ZhuWai"></label></td>
  </tr>
 
 <tr>
    <td class="col">挂证费</td>
    <td class="value"><label validate='money' itemid="xc_YF_GuaZhengFei"></label></td>
  </tr>
 <tr>
    <td class="col to">小计</td>
    <td class="value center"><label name="xiaoji"></label></td>
  </tr>
</table>
<table name="yingKou" cellpadding="4" cellspacing="0" class="tbComm fl" style="margin-left:20px;">
  <tr>
    <td colspan="2" class="header">个人应扣金额
      </td>
    </tr>
  <tr>
    <td class="col">养老</td>
    <td class="value"><label validate='money' itemid="xc_YK_YangLao"></label></td>
  </tr>
  <tr>
    <td class="col">医疗</td>
    <td class="value"><label validate='money' itemid="xc_YK_YiLiao"></label></td>
  </tr>
    <tr>
    <td class="col">生育</td>
    <td class="value"><label validate='money' itemid="xc_YK_ShengYu"></label></td>
  </tr>
  <tr>
    <td class="col">失业</td>
    <td class="value"><label validate='money' itemid="xc_YK_ShiYe"></label></td>
  </tr>
   <tr>
    <td class="col">工伤</td>
    <td class="value"><label validate='money' itemid="xc_YK_GongShang"></label></td>
  </tr>
    <tr>
    <td class="col">大病</td>
    <td class="value"><label validate='money' itemid="xc_YK_DaBing"></label></td>
  </tr>
  <tr>
    <td class="col">风险金</td>
    <td class="value"><label validate='money' itemid="xc_YK_FengXianJin"></label></td>
  </tr>
  <tr>
    <td class="col">个税</td>
    <td class="value"><label validate='money' itemid="xc_YK_GeShui"></label></td>
  </tr>
  
<%--  <tr>
    <td class="col">个税</td>
    <td class="value"><label validate='money' itemid="xc_YK_GeShui"></label></td>
  </tr>--%>
 <tr>
    <td class="col to">小计</td>
    <td class="value center"><label name="xiaoji"></label></td>
  </tr>
</table>
<table name="gongSiChengDan" cellpadding="4" cellspacing="0" class="tbComm fl" style="margin-left:20px;">
  <tr>
    <td colspan="2" class="header">公司承担金额
      </td>
    </tr>
  <tr>
    <td class="col">养老</td>
    <td class="value"><label validate='money' itemid="xc_GS_YangLao"></label></td>
  </tr>
  <tr>
    <td class="col">医疗</td>
    <td class="value"><label validate='money' itemid="xc_GS_YiLiao"></label></td>
  </tr>
    <tr>
    <td class="col">生育</td>
    <td class="value"><label validate='money' itemid="xc_GS_Sheng"></label></td>
  </tr>
  <tr>
    <td class="col">失业</td>
    <td class="value"><label validate='money' itemid="xc_GS_ShiYe"></label></td>
  </tr>
   <tr>
    <td class="col">工伤</td>
    <td class="value"><label validate='money' itemid="xc_GS_GongShang"></label></td>
  </tr>
    <tr>
    <td class="col">大病</td>
    <td class="value"><label validate='money' itemid="xc_GS_DaBing"></label></td>
  </tr>
    <tr>
    <td class="col">商保</td>
    <td class="value"><label validate='money' itemid="xc_GS_ShangBao"></label></td>
  </tr>
 <tr>
    <td class="col">其他</td>
    <td class="value"><label validate='money' itemid="xc_GS_Qi"></label></td>
  </tr>
 <tr>
    <td class="col to">小计</td>
    <td class="value center"><label name="xiaoji"></label></td>
  </tr>
</table>
</div>
</div>
<div class="clear" style="margin-top:10px;">
	<table cellpadding="4" cellspacing="0" class="tbComm">
		<tr>
			<td class="col bz">备注</td>
			<td class="area"><label itemid="xc_BeiZhu_YingFa"></label></td>
		</tr>
		<tr class='hid'>
			<td class="col bz">备注(个人应扣金额)</td>
			<td class="area"><label itemid="xc_BeiZhu_YingKou"></label></td>
		</tr>
	</table>
</div>

</div>
</asp:Content>

