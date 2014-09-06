using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Collections;
using DAL.CommClass;

/// <summary>
///WebService_ExportExcel 的摘要说明
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
//若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。 
 [System.Web.Script.Services.ScriptService]
public class WebService_ExportExcel : System.Web.Services.WebService {

    public WebService_ExportExcel () {

        //如果使用设计的组件，请取消注释以下行 
        //InitializeComponent(); 
    }

    [WebMethod(Description = "", EnableSession = true)]
    public ArrayList getInitData()
    {
        ArrayList returnValue = new ArrayList();
        DAL.Base_ExcelCompany base_Company = new DAL.Base_ExcelCompany();
        DAL.Base_ExcelZhengShu base_ZhengShu = new DAL.Base_ExcelZhengShu();
        returnValue.Add(base_Company.getAll());
        returnValue.Add(base_ZhengShu.getAll());
        return returnValue;
    }
    [WebMethod(Description = "", EnableSession = true)]
    public string[] getZhuanYeByZhengShuId(int zhengShuId) {
        DAL.Base_ExcelCompanyUserZhuanYe base_zhuanYe = new DAL.Base_ExcelCompanyUserZhuanYe();
        return base_zhuanYe.getZhuanYeByZhengShuId(zhengShuId);
    }
    [WebMethod(Description = "", EnableSession = true)]
    public int countFilter(int? companyId, string userName, List<keyValueClass> zhengShuArr) {
        return DAL.Logic.Logic_Excel.countFilter(companyId, userName, zhengShuArr);
    }
    [WebMethod(Description = "", EnableSession = true)]
    public List<DAL.CommClass.excelUserWrapper> getFilter(int? companyId, string userName, List<keyValueClass> zhengShuArr, PageClass pc) 
    {
        return DAL.Logic.Logic_Excel.getFilter(companyId, userName, zhengShuArr, pc);
    }
    [WebMethod(Description = "", EnableSession = true)]
    public int countFilter_ForZhengShu(int? companyId, string userName, List<keyValueClass> zhengShuArr)
    {
        return DAL.Logic.Logic_Excel.countFilter_ForZhengShu(companyId, userName, zhengShuArr);
    }
    [WebMethod(Description = "", EnableSession = true)]
    public ArrayList getFilter_ForZhengShu(int? companyId, string userName, List<keyValueClass> zhengShuArr, PageClass pc)
    {
        return DAL.Logic.Logic_Excel.getFilter_ForZhengShu(companyId, userName, zhengShuArr,pc);
    }
    [WebMethod(Description = "企业负责人Page", EnableSession = true)]
    public int countCompanyCharger(PageClass pageClass, string where) {
        DAL.Base_ExcelCharger baseCharger = new DAL.Base_ExcelCharger();
        return baseCharger.countCompanyCharger(pageClass, where);
    }
    [WebMethod(Description = "企业负责人Page", EnableSession = true)]
    public List<DAL.DTO.Tab_Excel_Charger> filterCompanyCharger(PageClass pageClass, string where) { 
        DAL.Base_ExcelCharger baseCharger=new DAL.Base_ExcelCharger();
        return baseCharger.filterCompanyCharger(pageClass,where);
    }
    [WebMethod(Description = "企业负责人Page", EnableSession = true)]
    public DAL.DTO.Tab_Excel_Charger addCompanyCharger(DAL.DTO.Tab_Excel_Charger obj) {
        DAL.Base_ExcelCharger base_Charger = new DAL.Base_ExcelCharger();
        return base_Charger.Save(obj);
    }
    [WebMethod(Description = "企业负责人Page", EnableSession = true)]
    public DAL.DTO.Tab_Excel_Charger updateCompanyCharger(DAL.DTO.Tab_Excel_Charger obj)
    {
        DAL.Base_ExcelCharger base_Charger = new DAL.Base_ExcelCharger();
        return base_Charger.Updates(new DAL.DTO.Tab_Excel_Charger[] { obj }) == 1 ? obj : null ;
    }
    [WebMethod(Description = "企业负责人Page", EnableSession = true)]
    public bool delCompanyCharger(int id)
    {
        DAL.Base_ExcelCharger base_Charger = new DAL.Base_ExcelCharger();
        return base_Charger.Deletes(new int[]{id})==1?true:false;
    }
    [WebMethod(Description = "C/S连接字符串", EnableSession = true)]
    public string getConnString()
    {
        return System.Configuration.ConfigurationSettings.AppSettings["connString"];
    }
}
