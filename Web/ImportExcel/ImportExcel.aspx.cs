using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.IO;

using System.Data;
using System.Data.OleDb;


public partial class ImportExcel_ImportExcel : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void clickExcel_ZhengShu(object sender, EventArgs e)
    {
        //string fileName=File1.Value;
        ////string fileName=@"D:\lizi.xls";
        //DataSet ds= ExcelToDS(fileName);
        //DataTable dt= ds.Tables[0];
        //foreach (DataRow row in dt.Rows) {
        //    string row1=row[0].ToString();
        //    string row2 = row[1].ToString();
        //}
        //int length=dt.Rows.Count;
    }
    public static void ExportDsToXls2(System.Web.UI.Page page, string fileName, string outHtml)
    {
        page.Response.Clear();
        page.Response.Buffer = true;
        page.Response.Charset = "GB2312";
        //page.Response.Charset = "UTF-8";
        page.Response.AppendHeader("Content-Disposition", "attachment;filename=" + fileName + System.DateTime.Now.ToString("_yyMMdd_hhmm") + ".xls");
        page.Response.ContentEncoding = System.Text.Encoding.GetEncoding("GB2312");//设置输出流为简体中文
        page.Response.ContentType = "application/ms-excel";//设置输出文件类型为excel文件。
        page.EnableViewState = false;
        page.Response.Write(outHtml);
        page.Response.End();
    }
   
}