using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Collections;

/// <summary>
///WebService_Report 的摘要说明
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
//若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。 
 [System.Web.Script.Services.ScriptService]
public class WebService_Report : System.Web.Services.WebService {

    public WebService_Report () {

        //如果使用设计的组件，请取消注释以下行 
        //InitializeComponent(); 
    }

    [WebMethod(Description = "", EnableSession = true)]
    public List<DAL.CommClass.ReportSalaryWrapperWrapper> getMonthSalary(short year, byte month)
    {
        return DAL.Logic.Logic_Report.getMonthSalary(year, month);
    }
    [WebMethod(Description = "确认月工资", EnableSession = true)]
    public int? SaveMonthSalaryGuiDang(short year, byte month, List<DAL.CommClass.ReportSalaryWrapperWrapper> list)
    {
        return DAL.Logic.Logic_Report.SaveMonthSalaryGuiDang(year, month,list);
    }
    [WebMethod(Description = "得到第二步，成本分担", EnableSession = true)]
    public List<DAL.CommClass.ReportSalaryChengBenWrapperWrapper> getSalaryChengBen(short year, byte month) {
        return DAL.Logic.Logic_Report.getSalaryChengBen(year, month);
    }
    [WebMethod(Description = "保存一个归档成本", EnableSession = true)]
    public bool SaveChengBen(int guiDangId, List<DAL.DTO.Tab_Report_MonthSalaryDetail_ChengBen> chengBenList)
    {
        return DAL.Logic.Logic_Report.SaveChengBen(guiDangId, chengBenList);
    }
    [WebMethod(Description = "得到一个归档成本", EnableSession = true)]
    public DAL.CommClass.ReportSalaryChengBenWrapperWrapper getChengBenByGuiDangId(int guiDangId)
    {
        return DAL.Logic.Logic_Report.getChengBenByGuiDangId(guiDangId);
    }
    [WebMethod(Description = "得到一个某月所有项目的分摊情况", EnableSession = true)]
    public List<DAL.DTO.View_XiangMuForMonth> getViewXinagMuForMonthByMonthSalaryId(int monthSalaryId)
    {
        DAL.ViewBase_XiangMuForMonth vb_Base = new DAL.ViewBase_XiangMuForMonth();
        return vb_Base.getByMonthSalaryId(monthSalaryId, true);
    }
    [WebMethod(Description = "删除一个归档成本", EnableSession = true)]
    public bool DeleteChengBenByGuiDangId(int guiDangId)
    {
        DAL.Base_Report_MonthSalaryGuiDang_ChengBen b1 = new DAL.Base_Report_MonthSalaryGuiDang_ChengBen();
        return b1.DeleteByGuiDangId(guiDangId)>0?true:false;
    }
    [WebMethod(Description = "确认所有成本(需要事务)", EnableSession = true)]
    public int? SaveMonthSalaryGuiDangChengBen(short year, byte month, List<DAL.DTO.Tab_Report_MonthSalaryDetail_ChengBen> list)
    {
        return DAL.Logic.Logic_Report.SaveMonthSalaryGuiDangChengBen(year, month, list);
    }
    [WebMethod(Description = "", EnableSession = true)]
    public List<DAL.CommClass.ReportSalaryWrapperWrapper> getPreview(short year, byte month)
    {
        return DAL.Logic.Logic_Report.getPreview(year, month);
    }
     [WebMethod(Description = "", EnableSession = true)]
    public List<DAL.CommClass.ReportSalaryYear> getReportSalaryYear(short year)
    {
        return DAL.Logic.Logic_Report.getReportSalaryYear(year);
    }
    
     [WebMethod(Description = "", EnableSession = true)]
    public bool delMonthSalary(int id)
    {
        DAL.Base_Report_MonthSalary b1 = new DAL.Base_Report_MonthSalary();
        return b1.Deletes(new int[] { id }) == 1 ? true : false;
    }
      [WebMethod(Description = "得到MonthSalary的状态", EnableSession = true)]
     public ArrayList getSalaryZhuangTai(short year,byte month)
    {
        ArrayList returnValue = new ArrayList();
        returnValue.Add(DAL.Logic.Logic_Report.getSalaryZhuangTai(year, month));
        DAL.DTO.Tab_BuMen[] buMenArr= new DAL.Base_User().listBuMen();
        returnValue.Add(buMenArr);
        return returnValue;
    }
    [WebMethod(Description = "得到工程月薪酬成本明细", EnableSession = true)]
      public List<DAL.CommClass.projectMonthSalaryMingXiWrapper> getMingXi(int monthSalaryId, int projectId)
    {
        return DAL.Logic.Logic_Report.getMingXi(monthSalaryId, projectId);
    }
    [WebMethod(Description = "", EnableSession = true)]
    public DAL.DTO.Tab_Report_MonthSalary getMonthSalaryById(int monthSalaryId)
    {
         DAL.Base_Report_MonthSalary b_RM=new DAL.Base_Report_MonthSalary();
         return b_RM.getById(monthSalaryId);
    }
    
    
}
