using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Collections;
using System.Text;

public partial class ImportExcel_ExportZhengShu : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string _companyId=Page.Request["companyid"].ToString();
        string _userName = Page.Request["username"].ToString();
        string _zhengShu = Page.Request["zhengshu"].ToString();
        

        int? companyId = null;
        if (_companyId != null && _companyId!=String.Empty) {
            companyId = int.Parse(_companyId);
        }
        string userName = _userName==String.Empty?null:_userName;

        List<DAL.CommClass.keyValueClass> zhengShuArr = DAL.Logic.Logic_Excel.ConvertToZhengShuArray(_zhengShu);
        ArrayList list= DAL.Logic.Logic_Excel.getFilter_ForZhengShu(companyId, userName, zhengShuArr,null);
        List<DAL.DTO.Tab_Excel_ZhengShu> zhengShuList = list[0] as List<DAL.DTO.Tab_Excel_ZhengShu>;
        List<DAL.DTO.Tab_Excel_Company> companyList = list[1] as List<DAL.DTO.Tab_Excel_Company>;
        List<DAL.CommClass.excelZhengShuWrapper> zhengShuWapperList = list[2] as List<DAL.CommClass.excelZhengShuWrapper>;
        //开始生成报表
        StringBuilder data = new StringBuilder();
        if(zhengShuList.Count>0 && companyList.Count>0)
        {
            data.AppendFormat("<table cellspacing='0' cellpadding='5' rules='all' border='1'>");
            data.AppendFormat("<tr style='font-weight: bold;'>");
            //循环表头（证书名称）
            data.Append("<td>企业</td>");
            foreach(DAL.DTO.Tab_Excel_ZhengShu zhengShu in zhengShuList){
                data.AppendFormat("<td>{0}</td>",zhengShu.ezs_Name);
            }
            data.Append("</tr>");
            foreach (DAL.DTO.Tab_Excel_Company company in companyList) {
                int cid = company.ec_ID;
                data.Append("<tr>");
                data.AppendFormat("<td>{0}</td>", company.ec_Name);
                //循环公司
                for (var i = 0; i < zhengShuList.Count; i++)
                {
                    int num = 0;//证书数量默认是0
                    int zsid = zhengShuList[i].ezs_ID;
                    var obj= zhengShuWapperList.FirstOrDefault(p => p.companyId == cid && p.zhengShuId == zsid);
                    if (obj != null)
                    {
                        num = obj.numberOfZhengShu;
                    }
                    data.AppendFormat("<td>{0}</td>", num);
                }
                data.Append("</tr>");
            }
            data.Append("</table>");
        }
        ExportDsToXls2(this.Page, "证书统计", data.ToString());
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
