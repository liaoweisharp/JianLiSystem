using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Collections;

/// <summary>
///WebService_XiangMu 的摘要说明
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
//若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。 
 [System.Web.Script.Services.ScriptService]
public class WebService_XiangMu : System.Web.Services.WebService {

    public WebService_XiangMu () {

        //如果使用设计的组件，请取消注释以下行 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld() {
        return "Hello World";
    }
    [WebMethod(EnableSession = true)]
    public int countHouQi(DAL.CommClass.PageClass pageClass, string where)
    {
        return BLL.XiangMu.countHouQi(pageClass, where);
    }
    [WebMethod(Description = "更新项目后期", EnableSession = true)]
    public int updateXiangMu_HouQi(DAL.DTO.View_XiangMu_HouQi obj)
    {
        DAL.ViewBase_XiangMu_HouQi ins = new DAL.ViewBase_XiangMu_HouQi();
        return ins.Updates(new DAL.DTO.View_XiangMu_HouQi[] { obj });
    }
   
    
    [WebMethod(Description = "得到项目", EnableSession = true)]
    public DAL.DTO.TabXiangMuQianQi getXiangMuById(int id)
    {
        DAL.Base_XiangMuQianQi ins = new DAL.Base_XiangMuQianQi();
        return ins.getById(id);
    }
    [WebMethod(Description = "得到项目相关信息", EnableSession = true)]
    public ArrayList getInitData()
    {
        return BLL.XiangMu.getInitData();
    }
    [WebMethod(Description = "得到项目人员（本月）", EnableSession = true)]
    public List<DAL.CommClass.XiangMuRenYuan> getCurrentMonthRenYuan(int projectId)
    {
        return BLL.XiangMu.getCurrentMonthRenYuan(projectId);
    }
    [WebMethod(Description = "得到项目人员（全部）", EnableSession = true)]
    public List<DAL.CommClass.XiangMuRenYuan> getAllRenYuan(int projectId)
    {
        return BLL.XiangMu.getAllRenYuan(projectId);
    }
    [WebMethod(Description = "保存巡检", EnableSession = true)]
    public DAL.DTO.Tab_XiangMu_XunJian addXunJian(DAL.DTO.Tab_XiangMu_XunJian obj)
    {
        DAL.Base_XiangMu_XunJian ins = new DAL.Base_XiangMu_XunJian();
        return ins.Save(obj);
    }
    [WebMethod(Description = "更新巡检", EnableSession = true)]
    public int updateXunJian(DAL.DTO.Tab_XiangMu_XunJian obj)
    {
        DAL.Base_XiangMu_XunJian ins = new DAL.Base_XiangMu_XunJian();
        return ins.Updates(new DAL.DTO.Tab_XiangMu_XunJian[]{obj});
    }
    [WebMethod(Description = "删除巡检", EnableSession = true)]
    public int delXunJian(int id)
    {
        DAL.Base_XiangMu_XunJian ins = new DAL.Base_XiangMu_XunJian();
        return ins.Deletes(new int[] { id });
    }
    [WebMethod(Description = "得到巡检", EnableSession = true)]
    public List<DAL.DTO.Tab_XiangMu_XunJian> getXunJianByProjectId(int projectId)
    {
        DAL.Base_XiangMu_XunJian obj = new DAL.Base_XiangMu_XunJian();
        return obj.getXunJianByProjectId(projectId);
    }

    [WebMethod(Description = "保存项目事件", EnableSession = true)]
    public DAL.DTO.Tab_XiangMu_ShiJian addShiJian(DAL.DTO.Tab_XiangMu_ShiJian obj)
    {
        DAL.Base_XiangMu_ShiJian ins = new DAL.Base_XiangMu_ShiJian();
        return ins.Save(obj);
    }
    [WebMethod(Description = "更新项目事件", EnableSession = true)]
    public int updateShiJian(DAL.DTO.Tab_XiangMu_ShiJian obj)
    {
        DAL.Base_XiangMu_ShiJian ins = new DAL.Base_XiangMu_ShiJian();
        return ins.Updates(new DAL.DTO.Tab_XiangMu_ShiJian[] { obj });
    }
    [WebMethod(Description = "删除项目事件", EnableSession = true)]
    public int delShiJian(int id)
    {
        DAL.Base_XiangMu_ShiJian ins = new DAL.Base_XiangMu_ShiJian();
        return ins.Deletes(new int[] { id });
    }
    [WebMethod(Description = "得到项目事件", EnableSession = true)]
    public List<DAL.DTO.Tab_XiangMu_ShiJian> getShiJianByProjectId(int projectId)
    {
        DAL.Base_XiangMu_ShiJian obj = new DAL.Base_XiangMu_ShiJian();
        return obj.getByProjectId(projectId);
    }
    [WebMethod(Description = "", EnableSession = true)]
    public ArrayList getXiangMuMingInfoXiByProjectId(int projectId)
    {
        return BLL.XiangMu.getXiangMuMingInfoXiByProjectId(projectId);
    }
    [WebMethod(Description = "得到编辑项目移交明细的信息", EnableSession = true)]
    public ArrayList getXiangMuMingInfoXiByProjectId_ForEdit(int projectId)
    {
        return BLL.XiangMu.getXiangMuMingInfoXiByProjectId_ForEdit(projectId);
    }
    //[WebMethod(EnableSession = true)]
    //public List<DAL.CommClass.XiangMuHouQiWrapper> filterAllXiangMuHouQi(DAL.CommClass.PageClass pageClass, string where)
    //{
    //    return BLL.XiangMu.filterAllXiangMuHouQi(pageClass, where, new string[] { "TabHeTong" });
    //}
    [WebMethod(EnableSession = true)]
    public List<DAL.CommClass.XiangMuHouQiWrapper2> filterAllXiangMuHouQi2(DAL.CommClass.PageClass pageClass, string where)
    {
        return DAL.Logic.Logic_XiangMu.filterAllXiangMuHouQi2(pageClass, where);
    }
    [WebMethod(EnableSession = true)]
    public int countHouQi2(DAL.CommClass.PageClass pageClass, string where)
    {
        return DAL.Logic.Logic_XiangMu.countHouQi2(pageClass, where);
    }
    [WebMethod(EnableSession = true)]
    public bool updateMingXiInfo(int projectId, List<DAL.DTO.Tab_XiangMu_YiJiaoMingXi> mingXiArray, DAL.DTO.View_XiangMu_YiJiao yiJiaoQingKuang)
    {
        return DAL.Logic.Logic_XiangMu.updateMingXiInfo(projectId, mingXiArray, yiJiaoQingKuang);
    }
    [WebMethod(EnableSession = true)]
    public ArrayList getXiangMuZuInfo()
    {
        return DAL.Logic.Logic_XiangMu.getXiangMuZuInfo();
    }
    [WebMethod(EnableSession = true)]
    public bool updateXiangMuZu(DAL.DTO.Tab_XiangMuZu obj)
    {
        DAL.Base_XiangMuZu b1 = new DAL.Base_XiangMuZu();
        return b1.Update(obj);
    }
    [WebMethod(EnableSession = true)]
    public bool reNameProject(int id,string newName)
    {
        DAL.Base_XiangMuZu b1 = new DAL.Base_XiangMuZu();
        return b1.reNameProject(id, newName);
    }
    [WebMethod(EnableSession = true)]
    public bool delXiangMuZu(int id)
    {
        DAL.Base_XiangMuZu b1 = new DAL.Base_XiangMuZu();
        DAL.Base_XiangMuQianQi b2 = new DAL.Base_XiangMuQianQi();
        b2.updateXiangMuZuId(id);
        return b1.Deletes(new int[]{id})==1?true:false;
    }
    [WebMethod(EnableSession = true)]
    public bool delProject(int id)
    {
        DAL.Base_XiangMuQianQi b1 = new DAL.Base_XiangMuQianQi();
        DAL.Base_XiangMuQianQi b2 = new DAL.Base_XiangMuQianQi();
        b2.updateParentId(id);
        return b1.Deletes(new int[] { id }) == 1 ? true : false;
    }
}
