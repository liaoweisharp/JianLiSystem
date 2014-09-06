using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Collections;
using DAL.CommClass;

/// <summary>
///WebService_XiangMuJieSuan 的摘要说明
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
//若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。 
 [System.Web.Script.Services.ScriptService]
public class WebService_XiangMuJieSuan : System.Web.Services.WebService {

    public WebService_XiangMuJieSuan () {

        //如果使用设计的组件，请取消注释以下行 
        //InitializeComponent(); 
    }

    [WebMethod(Description = "得到事业部Count（结算界面）", EnableSession = true)]
    public int countJS_ShiYeBu(DAL.CommClass.PageClass pageClass, string where)
    {
        return BLL.XiangMu.countJS_ShiYeBu(pageClass, where);
    }
    [WebMethod(Description = "得到直管Count（既不是项目组也不是监理组的）（结算界面）", EnableSession = true)]
    public int countZhiGuan_JustXiangMu(DAL.CommClass.PageClass pageClass, string where)
    {
        return BLL.XiangMu.countZhiGuan_JustXiangMu(pageClass, where);
    }
    
    [WebMethod(Description = "得到直管Count（是项目组或是监理组的）（结算界面）", EnableSession = true)]
    public int countZhiGuan_Zu(DAL.CommClass.PageClass pageClass, string where)
    {
        return BLL.XiangMu.countZhiGuan_Zu(pageClass, where);
    }
    [WebMethod(Description = "得到事业部Wrapper（结算界面）", EnableSession = true)]
    public List<DAL.CommClass.XiangMuJiSuan_ShiYeBuWrapper> filterAllXiangMuJiSuan_ShiYeBu(DAL.CommClass.PageClass pageClass, string where)
    {
        return BLL.XiangMu.filterAllXiangMuJiSuan_ShiYeBu(pageClass, where);
    }
    [WebMethod(Description = "得到直管Wrapper（既不是项目组也不是监理组的）（结算界面）", EnableSession = true)]
    public List<DAL.CommClass.XiangMuJiSuan_ZhiGuanWrapper> filterAllXiangMuQianQi_ZhiGuan_JustXiangMu(DAL.CommClass.PageClass pageClass, string where)
    {
        return BLL.XiangMu.filterAllXiangMuQianQi_ZhiGuan_JustXiangMu(pageClass, where);
    }
    [WebMethod(Description = "得到直管Wrapper（以项目组为单位）（结算界面）", EnableSession = true)]
    public List<DAL.CommClass.XiangMuJiSuan_ZhiGuanWrapperZu> filterAllXiangMuQianQi_ZhiGuan_Zu(DAL.CommClass.PageClass pageClass, string where)
    {
        return BLL.XiangMu.filterAllXiangMuQianQi_ZhiGuan_Zu(pageClass, where);
    }
    [WebMethod(Description = "得到项目（事业）结算内容", EnableSession = true)]
    public DAL.DTO.Tab_XiangMu_JieSuanNeiRong getXiangMu_JieSuanNeiRongById(int id)
    {
        DAL.Base_XiangMu_JieSuanNeiRong ins = new DAL.Base_XiangMu_JieSuanNeiRong();
        return ins.getById(id);
    }
    [WebMethod(Description = "更新", EnableSession = true)]
    public bool updateXiangMu_JieSuanNeiRong(DAL.DTO.View_XiangMu_JieSuanNeiRong obj)
    {
        DAL.ViewBase_XiangMu_JieSuanNeiRong ins = new DAL.ViewBase_XiangMu_JieSuanNeiRong();
        return ins.Update(obj);
    }
    [WebMethod(Description = "添加", EnableSession = true)]
    public DAL.DTO.Tab_XiangMu_JieSuanNeiRong saveXiangMu_JieSuanNeiRong(DAL.DTO.Tab_XiangMu_JieSuanNeiRong obj)
    {
        DAL.Base_XiangMu_JieSuanNeiRong ins = new DAL.Base_XiangMu_JieSuanNeiRong();
        return ins.Save(obj);
    }
    
    [WebMethod(Description = "得到结算明细相关", EnableSession = true)]
    public ArrayList getJieSuanMingXiInfoByProjectId(int projectId)
    {
        return BLL.XiangMu.getJieSuanMingXiByProjectId(projectId);
    }
    [WebMethod(Description = "更新结算明细", EnableSession = true)]
    public bool updateXiangMuJieSuan(DAL.DTO.View_FaPiaoJiShouKuanGuanLi_JieSuan obj)
    {
        DAL.ViewBase_HeTong_FaPiaoJiShouKuan_JiSuan ins = new DAL.ViewBase_HeTong_FaPiaoJiShouKuan_JiSuan();
        return ins.Update(obj);
    }
    [WebMethod(Description = "", EnableSession = true)]
    public bool updateXiangMuJieSuan_IsJieSuan(DAL.DTO.View_XiangMu_JieSuanNeiRong_IsJieSuan obj)
    {
        DAL.ViewBase_XiangMu_JieSuanNeiRong_IsJieSuan ins = new DAL.ViewBase_XiangMu_JieSuanNeiRong_IsJieSuan();
        return ins.Update(obj);
    }
    [WebMethod(Description = "得到质保金总和", EnableSession = true)]
    public decimal getSumOfZhiBaoJin(int projectId)
    {
        DAL.Base_FaPiaoJiShouKuan ins = new DAL.Base_FaPiaoJiShouKuan();
        decimal sum= ins.getSumOfZhiBaoJin(projectId);
        return sum;
    }
    [WebMethod(Description = "得到质保金总和", EnableSession = true)]
    public bool addJieSuan(DAL.DTO.View_XiangMu_JieSuanNeiRong_IsJieSuan obj)
    {
        return BLL.XiangMu.addJieSuan(obj);
    }
    
    [WebMethod(Description = "更新View_XiangMu_ZhiGuan_MuBiaoGuanLi", EnableSession = true)]
    public bool updateView_XiangMu_ZhiGuan_MuBiaoGuanLi(DAL.DTO.View_XiangMu_ZhiGuan_MuBiaoGuanLi obj)
    {
        DAL.ViewBase_XiangMu_ZhiGuan_MuBiaoGuanLi ins = new DAL.ViewBase_XiangMu_ZhiGuan_MuBiaoGuanLi();
        return ins.Update(obj);
    }
    [WebMethod(Description = "保存View_XiangMu_ZhiGuan", EnableSession = true)]
    public bool saveXiangMu_ZhiGuan(DAL.DTO.Tab_XiangMu_ZhiGuan obj)
    {
        DAL.Base_XiangMu_ZhiGuan ins = new DAL.Base_XiangMu_ZhiGuan();
        return ins.Save(obj)!=null?true:false;
    }
    [WebMethod(Description = "更新View_XiangMu_ZhiGuan_MuBiaoGuanLi", EnableSession = true)]
    public bool updateView_XiangMu_ZhiGuan_JieSuan(DAL.DTO.View_XiangMu_ZhiGuan_JieSuan obj)
    {
        DAL.ViewBase_XiangMu_ZhiGuan_JieSuan ins = new DAL.ViewBase_XiangMu_ZhiGuan_JieSuan();
        return ins.Update(obj);
    }
    [WebMethod(Description = "得到项目直管", EnableSession = true)]
    public DAL.DTO.Tab_XiangMu_ZhiGuan getXiangMu_ZhiGuanById(int id)
    {
        DAL.Base_XiangMu_ZhiGuan ins = new DAL.Base_XiangMu_ZhiGuan();
        return ins.getById(id);
    }
    [WebMethod(Description = "得到办公用品", EnableSession = true)]
    public List<DAL.DTO.Tab_XiangMu_BanGongYongPin> getXiangMu_BanGongYongPinByProJectId(int projectId)
    {
        DAL.Base_XiangMu_BanGongYongPin ins = new DAL.Base_XiangMu_BanGongYongPin();
        return ins.getByProjectId(projectId);
    }
    [WebMethod(Description = "得到培训继教", EnableSession = true)]
    public List<DAL.DTO.Tab_XiangMu_PeiXunJiJiao> getXiangMu_PeiXunJiJiaoByProJectId(int projectId)
    {
        DAL.Base_XiangMu_PeiXunJiJiao ins = new DAL.Base_XiangMu_PeiXunJiJiao();
        return ins.getByProjectId(projectId);
    }
    [WebMethod(Description = "得到绩效考核", EnableSession = true)]
    public List<DAL.DTO.Tab_XiangMu_JiXiao> getXiangMu_JiXiaoKaoHeByProJectId(int projectId)
    {
        DAL.Base_XiangMu_JiXiaoKaoHe ins = new DAL.Base_XiangMu_JiXiaoKaoHe();
        return ins.getByProjectId(projectId);
    }
    [WebMethod(Description = "得到报销", EnableSession = true)]
    public List<DAL.DTO.Tab_XiangMu_BaoXiao> getXiangMu_BaoXiaoByProJectId(int projectId)
    {
        DAL.Base_XiangMu_BaoXiao ins = new DAL.Base_XiangMu_BaoXiao();
        return ins.getByProjectId(projectId);
    }
    [WebMethod(Description = "得到费用调整", EnableSession = true)]
    public List<DAL.DTO.Tab_XiangMu_FeiYongTiaoZheng> getXiangMu_FeiYongTiaoZhengByProJectId(int projectId)
    {
        DAL.Base_XiangMu_FeiYongTaoZheng ins = new DAL.Base_XiangMu_FeiYongTaoZheng();
        return ins.getByProjectId(projectId);
    }
    [WebMethod(Description = "添加办公用品", EnableSession = true)]
    public DAL.DTO.Tab_XiangMu_BanGongYongPin save_XiangMu_BanGongYongPin(DAL.DTO.Tab_XiangMu_BanGongYongPin obj)
    {
        DAL.Base_XiangMu_BanGongYongPin ins = new DAL.Base_XiangMu_BanGongYongPin();
        return ins.Save(obj);
    }
    [WebMethod(Description = "添加培训继教", EnableSession = true)]
    public DAL.DTO.Tab_XiangMu_PeiXunJiJiao save_XiangMu_PeiXunJiJiao(DAL.DTO.Tab_XiangMu_PeiXunJiJiao obj)
    {
        DAL.Base_XiangMu_PeiXunJiJiao ins = new DAL.Base_XiangMu_PeiXunJiJiao();
        return ins.Save(obj);
    }
    [WebMethod(Description = "添加绩效考核", EnableSession = true)]
    public DAL.DTO.Tab_XiangMu_JiXiao save_XiangMu_JiXiaoKaoHe(DAL.DTO.Tab_XiangMu_JiXiao obj)
    {
        DAL.Base_XiangMu_JiXiaoKaoHe ins = new DAL.Base_XiangMu_JiXiaoKaoHe();
        return ins.Save(obj);
    }
    [WebMethod(Description = "添加报销", EnableSession = true)]
    public DAL.DTO.Tab_XiangMu_BaoXiao save_XiangMu_BaoXiao(DAL.DTO.Tab_XiangMu_BaoXiao obj)
    {
        DAL.Base_XiangMu_BaoXiao ins = new DAL.Base_XiangMu_BaoXiao();
        return ins.Save(obj);
    }
    [WebMethod(Description = "添加费用调整", EnableSession = true)]
    public DAL.DTO.Tab_XiangMu_FeiYongTiaoZheng save_XiangMu_FeiYongTiaoZheng(DAL.DTO.Tab_XiangMu_FeiYongTiaoZheng obj)
    {
        DAL.Base_XiangMu_FeiYongTaoZheng ins = new DAL.Base_XiangMu_FeiYongTaoZheng();
        return ins.Save(obj);
    }
    [WebMethod(Description = "更新办公用品", EnableSession = true)]
    public bool update_XiangMu_BanGongYongPin(DAL.DTO.Tab_XiangMu_BanGongYongPin obj)
    {
        DAL.Base_XiangMu_BanGongYongPin ins = new DAL.Base_XiangMu_BanGongYongPin();
        return ins.Update(obj);
    }
    [WebMethod(Description = "更新绩效考核", EnableSession = true)]
    public bool update_XiangMu_JiXiaoKaoHe(DAL.DTO.Tab_XiangMu_JiXiao obj)
    {
        DAL.Base_XiangMu_JiXiaoKaoHe ins = new DAL.Base_XiangMu_JiXiaoKaoHe();
        return ins.Update(obj);
    }
    [WebMethod(Description = "更新培训继教", EnableSession = true)]
    public bool update_XiangMu_PeiXunJiJiao(DAL.DTO.Tab_XiangMu_PeiXunJiJiao obj)
    {
        DAL.Base_XiangMu_PeiXunJiJiao ins = new DAL.Base_XiangMu_PeiXunJiJiao();
        return ins.Update(obj);
    }
    [WebMethod(Description = "更新报销", EnableSession = true)]
    public bool update_XiangMu_BaoXiao(DAL.DTO.Tab_XiangMu_BaoXiao obj)
    {
        DAL.Base_XiangMu_BaoXiao ins = new DAL.Base_XiangMu_BaoXiao();
        return ins.Update(obj);
    }
    [WebMethod(Description = "更新费用调整", EnableSession = true)]
    public bool update_XiangMu_FeiYongTiaoZheng(DAL.DTO.Tab_XiangMu_FeiYongTiaoZheng obj)
    {
        DAL.Base_XiangMu_FeiYongTaoZheng ins = new DAL.Base_XiangMu_FeiYongTaoZheng();
        return ins.Update(obj);
    }
    [WebMethod(Description = "删除办公用品", EnableSession = true)]
    public bool del_XiangMu_BanGongYongPin(int id)
    {
        DAL.Base_XiangMu_BanGongYongPin ins = new DAL.Base_XiangMu_BanGongYongPin();
        return ins.Deletes(new int[]{id})==1?true:false;
    }
    [WebMethod(Description = "删除培训继教", EnableSession = true)]
    public bool del_XiangMu_PeiXunJiJiao(int id)
    {
        DAL.Base_XiangMu_PeiXunJiJiao ins = new DAL.Base_XiangMu_PeiXunJiJiao();
        return ins.Deletes(new int[] { id }) == 1 ? true : false;
    }
    [WebMethod(Description = "删除绩效考核", EnableSession = true)]
    public bool del_XiangMu_JiXiaoKaoHe(int id)
    {
        DAL.Base_XiangMu_JiXiaoKaoHe ins = new DAL.Base_XiangMu_JiXiaoKaoHe();
        return ins.Deletes(new int[] { id }) == 1 ? true : false;
    }
    [WebMethod(Description = "删除报销", EnableSession = true)]
    public bool del_XiangMu_BaoXiao(int id)
    {
        DAL.Base_XiangMu_BaoXiao ins = new DAL.Base_XiangMu_BaoXiao();
        return ins.Deletes(new int[] { id }) == 1 ? true : false;
    }
    [WebMethod(Description = "删除费用调整", EnableSession = true)]
    public bool del_XiangMu_FeiYongTiaoZheng(int id)
    {
        DAL.Base_XiangMu_FeiYongTaoZheng ins = new DAL.Base_XiangMu_FeiYongTaoZheng();
        return ins.Deletes(new int[] { id }) == 1 ? true : false;
    }
    [WebMethod(Description = "", EnableSession = true)]
    public List<XiangMuXinChouMonth> getXiangMu_RenYuanXinChouByProjectId(int projectId)
    {
        return DAL.Logic.Logic_XiangMu.getXiangMu_RenYuanXinChouByProjectId(projectId);
    }
    
}
