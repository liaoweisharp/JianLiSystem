using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using BLL;
using DAL;
using System.Collections;
/// <summary>
///WebService 的摘要说明
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
//若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。 
 [System.Web.Script.Services.ScriptService]
public class WebService_HeTong : System.Web.Services.WebService
{

    public WebService_HeTong () {

        //如果使用设计的组件，请取消注释以下行 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld() {
        return "Hello World";
    }
    [WebMethod]
    public DateTime getTime()
    {
        return DateTime.Now;
    }
    [WebMethod]
    public ArrayList getTest()
    {
        ArrayList returnValue = new ArrayList();
        DAL.Base_FaPiaoJiShouKuan ins1 = new Base_FaPiaoJiShouKuan();
       
        returnValue.Add(ins1.getAll());
        DAL.Base_ShoukuanJiHua ins2 = new Base_ShoukuanJiHua();
        returnValue.Add(ins2.getAll());
        DAL.Base_HeTong ins3 = new Base_HeTong();
        returnValue.Add(ins3.getAll());
        DAL.Base_HeTongVice in4 = new Base_HeTongVice();
        returnValue.Add(in4.getAll());
        return returnValue;
    }
    [WebMethod]
    public DateTime time(DateTime time)
    {
        
        return time;
    }
    [WebMethod]
    public ArrayList getInitData() {
        return BLL.HeTong.getBaseData();
    }
    [WebMethod(Description = "得到没有合同的项目前期", EnableSession = true)]
    public List<DAL.DTO.TabXiangMuQianQi> getQQnoHeTong()
    {
        DAL.Base_XiangMuQianQi ins = new DAL.Base_XiangMuQianQi();
        return ins.getNoHeTong();
    }
    
    [WebMethod(EnableSession = true)]
    public int countQianQi(DAL.CommClass.PageClass pageClass, string where)
    {
        return BLL.XiangMu.countQianQi(pageClass, where);
    }
    
    [WebMethod]
    public List<DAL.CommClass.XiangMuQianQiWrapper> filterAllXiangMuQianQi(DAL.CommClass.PageClass pageClass,string where)
    {
        return BLL.XiangMu.filterAllXiangMuQianQi(pageClass,where,new string[]{"TabHeTong"});
    }
    [WebMethod(Description = "分页合同", EnableSession = true)]
    public List<DAL.CommClass.HeTongWrapper> filterHeTongWrappper(DAL.CommClass.PageClass pageClass,string where)
    {
        return BLL.HeTong.filterHeTongWrappper(pageClass, where);
    }

    [WebMethod(Description = "添加项目前期", EnableSession = true)]
    public DAL.DTO.TabXiangMuQianQi addXiangMuQianQi(DAL.DTO.TabXiangMuQianQi obj)
    {
        DAL.Base_XiangMuQianQi ins=new Base_XiangMuQianQi();
        return ins.Save(obj);
    }
    [WebMethod(Description = "添加发票及收款", EnableSession = true)]
    public DAL.DTO.TabFaPiaoJiShouKuanGuanLi addFaPiaoJiShouKuan(DAL.DTO.TabFaPiaoJiShouKuanGuanLi obj)
    {
        DAL.Base_FaPiaoJiShouKuan ins = new Base_FaPiaoJiShouKuan();
        return ins.Save(obj);
    }
    [WebMethod(Description = "添加合同", EnableSession = true)]
    public int addHeTong(DAL.DTO.TabHeTong heTong)
    {
        heTong=BLL.HeTong.addHeTong(heTong);
        if (heTong != null)
        {
            return heTong.ht_Id;
        }
        else
            return 0;
    }
    [WebMethod(Description = "添加合同变更与争议", EnableSession = true)]
    public int addHeTongBianGeng(DAL.DTO.TabHeTongBianGeng heTongBG)
    {
        return BLL.HeTongBianGeng.Save(heTongBG);
    }
    [WebMethod(Description = "添加收款计划", EnableSession = true)]
    public int addShouKuanJiHua(DAL.DTO.TabShouKuanJiHua shouKuanJiHua)
    {
        return BLL.HeTong.Save_ShouKuanJiHua(shouKuanJiHua);
    }

    [WebMethod(Description = "更新合同", EnableSession = true)]
    public int updateHeTong(DAL.DTO.TabHeTong heTong) {
        return BLL.HeTong.updateHeTong(heTong);
    }
    [WebMethod(Description = "更新合同附本", EnableSession = true)]
    public int updateHeTongVice(DAL.DTO.TabHeTongVice htv)
    {
        DAL.Base_HeTongVice ins = new Base_HeTongVice();
        return ins.Updates(new DAL.DTO.TabHeTongVice[] { htv });
    }
    [WebMethod(Description = "更新结算管理", EnableSession = true)]
    public int updateJieSuan(DAL.DTO.TabJieSuanGuanLi jieSuan)
    {
        DAL.Base_JieSuanGuanLi ins = new Base_JieSuanGuanLi();
        return ins.Updates(new DAL.DTO.TabJieSuanGuanLi[] {jieSuan});
    }
    [WebMethod(Description = "更新合同变更", EnableSession = true)]
    public int updateHeTongBianGeng(DAL.DTO.TabHeTongBianGeng heTongBG)
    {
        DAL.Base_HeTongBianGeng ins = new Base_HeTongBianGeng();
        return ins.Updates(new DAL.DTO.TabHeTongBianGeng[] { heTongBG });
    }
    [WebMethod(Description = "更新收款计划", EnableSession = true)]
    public int updateShouKuanJiHua(DAL.DTO.TabShouKuanJiHua shouKuanJiHua)
    {
        DAL.Base_ShoukuanJiHua ins = new DAL.Base_ShoukuanJiHua();
        return ins.Updates(new DAL.DTO.TabShouKuanJiHua[] { shouKuanJiHua });
    }
    [WebMethod(Description = "更新项目前期", EnableSession = true)]
    public int updateXiangMuQianQi(DAL.DTO.View_XiangMu_QianQi xiangMuQianQi)
    {
        DAL.ViewBase_XiangMu_QianQi ins = new DAL.ViewBase_XiangMu_QianQi();
        return ins.Updates(new DAL.DTO.View_XiangMu_QianQi[] { xiangMuQianQi });
    }
    [WebMethod(Description = "更新发票及收款", EnableSession = true)]
    public int updateFaPiaoJiShouKuan(DAL.DTO.View_FaPiaoJiShouKuanGuanLi obj)
    {
        DAL.ViewBase_HeTong_FaPiaoJiShouKuan ins = new DAL.ViewBase_HeTong_FaPiaoJiShouKuan();
        return ins.Updates(new DAL.DTO.View_FaPiaoJiShouKuanGuanLi[] { obj });
    }

    [WebMethod(Description = "删除合同", EnableSession = true)]
    public int delHeTong(int id)
    {
        return BLL.HeTong.delHeTong(id);
    }
    [WebMethod(Description = "删除合同变更", EnableSession = true)]
    public int delHeTongBianGeng(int id)
    {
        DAL.Base_HeTongBianGeng ins = new Base_HeTongBianGeng();
        return ins.Deletes(new int[]{id});
    }
    [WebMethod(Description = "删除收款计划", EnableSession = true)]
    public int delShouKuanJiHua(int id)
    {
        DAL.Base_ShoukuanJiHua ins = new Base_ShoukuanJiHua();
        return ins.Deletes(new int[] { id });
    }
    [WebMethod(Description = "删除项目前期", EnableSession = true)]
    public int delXiangMuQianQi(int id)
    {
        DAL.Base_XiangMuQianQi ins = new Base_XiangMuQianQi();
        return ins.Deletes(new int[] { id });
    }
    [WebMethod(Description = "删除发票及收款", EnableSession = true)]
    public int delFaPiaoJiShouKuan(int id)
    {
        DAL.Base_FaPiaoJiShouKuan ins = new Base_FaPiaoJiShouKuan();
        return ins.Deletes(new int[] { id });
    }
 
    [WebMethod(Description = "得到合同变更与争议", EnableSession = true)]
    public List<DAL.DTO.TabHeTongBianGeng> getHeTongBianGengByHtId(int htId)
    {
        DAL.Base_HeTongBianGeng ht = new Base_HeTongBianGeng();
        return ht.getByhtId(htId);
    }

    [WebMethod(Description = "得到收款计划", EnableSession = true)]
    public List<DAL.DTO.TabShouKuanJiHua> getShouKuanJiHuByHtId(int htId)
    {
        DAL.Base_ShoukuanJiHua ht = new Base_ShoukuanJiHua();
        return ht.getByhtId(htId, new string[] { "TabHeTong", "TabHeTongBianGeng" });
    }



    [WebMethod(Description = "得到合同和相应的变更合同", EnableSession = true)]
    public List<DAL.DTO.TabHeTong> getHTAndChild(int htId)
    {
        return BLL.HeTong.getHTAndChild(htId);
    }
    [WebMethod(Description = "得到发票及收款", EnableSession = true)]
    public List<DAL.DTO.TabFaPiaoJiShouKuanGuanLi> getFaPiaoGuanLiByHtId(int htId)
    {
        DAL.Base_FaPiaoJiShouKuan ins = new Base_FaPiaoJiShouKuan();
        List<DAL.DTO.TabFaPiaoJiShouKuanGuanLi> dd= ins.getByHtId(htId,new string[]{"TabHeTong","TabHeTongBianGeng"});
        return dd;
    }

    
    [WebMethod(Description = "得到合同Wrapper", EnableSession = true)]
    public int countHeTong(DAL.CommClass.PageClass pageClass,string where)
    {
        return BLL.HeTong.countHeTong(pageClass, where);
    }
    [WebMethod(Description = "根据合同ID的到合同、合同附本、结算管理", EnableSession = true)]
    public ArrayList getHeTongInfo(int htId)
    {
        ArrayList returnValue = new ArrayList();
        DAL.Base_HeTong ins = new Base_HeTong();
        DAL.DTO.TabHeTong ht = null; 
             ht = ins.getById(htId,new string[]{"TabHeTong","TabHeTongBianGeng"});
        returnValue.Add(ht);
        DAL.Base_HeTongVice htv = new Base_HeTongVice();
        returnValue.Add(htv.getById(htId));
        DAL.Base_JieSuanGuanLi jsgl = new Base_JieSuanGuanLi();
        returnValue.Add(jsgl.getById(htId));
        returnValue.Add(BLL.HeTong.getXiangMuQianQiNoUse(ht.ht_QqId));
        returnValue.Add(DAL.Logic.Logic_HeTong.getHeTongWrappperById(htId));
        return returnValue;
    }
    [WebMethod(Description = "得到项目组", EnableSession = true)]
    public List<DAL.CommClass.keyValueClass> getXiangMuZu()
    {
        DAL.Base_XiangMuZu b1 = new Base_XiangMuZu();
        return b1.getAll();
    }
    [WebMethod(Description = "得到监理组", EnableSession = true)]
    public List<DAL.CommClass.keyValueClass> getAllJianLiZuByXiangMuZuId(int xiangMuZuId)
    {
        DAL.Base_XiangMuQianQi b1 = new Base_XiangMuQianQi();
        return b1.getByXiangMuZuId(xiangMuZuId);
    }
    [WebMethod(Description = "添加一个项目组", EnableSession = true)]
    public DAL.DTO.Tab_XiangMuZu addXiangMuZu(DAL.DTO.Tab_XiangMuZu obj)
    {
        DAL.Base_XiangMuZu b1 = new Base_XiangMuZu();
        return b1.Save(obj);
    }
    [WebMethod(Description = "添加一个监理组", EnableSession = true)]
    public DAL.DTO.TabXiangMuQianQi addJianLiZu(DAL.DTO.TabXiangMuQianQi obj)
    {
        DAL.Base_XiangMuQianQi b1 = new Base_XiangMuQianQi();
        return b1.Save(obj);
    }
    
    
}
