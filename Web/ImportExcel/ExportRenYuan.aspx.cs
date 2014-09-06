using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;

public partial class ImportExcel_ExportRenYuan : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string _companyId = Page.Request["companyid"].ToString();
        string _userName = Page.Request["username"].ToString();
        string _zhengShu = Page.Request["zhengshu"].ToString();


        int? companyId = null;
        if (_companyId != null && _companyId != String.Empty)
        {
            companyId = int.Parse(_companyId);
        }
        string userName = _userName == String.Empty ? null : _userName;
        List<DAL.CommClass.keyValueClass> zhengShuArr = DAL.Logic.Logic_Excel.ConvertToZhengShuArray(_zhengShu);
        //转换结束
        List<DAL.CommClass.excelUserWrapper> list=DAL.Logic.Logic_Excel.getFilter(companyId, userName, zhengShuArr,null);
        StringBuilder data = new StringBuilder();
        if (list.Count > 0)
        {
            data.Append("<table cellspacing='0' cellpadding='5' rules='all' border='1'>");
            data.Append("<tr style='font-weight: bold;'>");
            data.Append("<td>企业</td>");
            data.Append("<td>人员</td>");
            data.Append("<td>证书</td>");
            data.Append("<td>专业</td>");
            data.Append("<tr>");
            for (int i = 0; i < list.Count; i++)
            {
                
                DAL.CommClass.excelUserWrapper item = list[i];
                int cid = item.companyId;
                string cName = item.companyName;
                string name=item.userName;
                data.Append("<tr>");
                //第一列
                if (i == 0 || list[i].companyId != list[i - 1].companyId)
                {
                    //有这一个TD
                    int num=list.Where(p => p.companyId == cid).Count();
                    data.AppendFormat("<td {1}>{0}</td>", cName,num==1?"":"rowspan='"+num+"'");
                }
               //第二列
                if (i != 0 && list[i].companyId == list[i - 1].companyId && list[i].userName == list[i - 1].userName)
                {
                    //没有这一列
                }
                else { 
                    //有这一列
                    int num = list.Where(p => p.companyId == cid && p.userName == name).Count();
                    data.AppendFormat("<td {1}>{0}</td>", name, num == 1 ? "" : "rowspan='" + num + "'");
                }
               
                data.AppendFormat("<td>{0}</td>",item.zhengShuMing);
                data.AppendFormat("<td>{0}</td>", item.zhuanYe);
                data.Append("</tr>");
            }
        }
        ExportDsToXls2(this.Page, "人员列表", data.ToString());
    }
    public static void ExportDsToXls2(System.Web.UI.Page page, string fileName, string outHtml)
    {
        page.Response.Clear();
        page.Response.Buffer = true;
        page.Response.Charset = "GB2312";
        //page.Response.Charset = "UTF-8";
        page.Response.AppendHeader("Content-Disposition", "attachment;filename=" + fileName + System.DateTime.Now.ToString("_yyyy_MM_dd") + ".xls");
        page.Response.ContentEncoding = System.Text.Encoding.GetEncoding("GB2312");//设置输出流为简体中文
        page.Response.ContentType = "application/ms-excel";//设置输出文件类型为excel文件。
        page.EnableViewState = false;
        page.Response.Write(outHtml);
        page.Response.End();
    }
}