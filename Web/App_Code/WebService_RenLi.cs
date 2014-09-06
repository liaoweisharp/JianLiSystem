using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Collections;

/// <summary>
///WebService_RenLi 的摘要说明
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
//若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。 
[System.Web.Script.Services.ScriptService]
public class WebService_RenLi : System.Web.Services.WebService
{

    public WebService_RenLi()
    {

        //如果使用设计的组件，请取消注释以下行 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld()
    {
        return "Hello World";
    }
    [WebMethod(Description = "初始化数据", EnableSession = true)]
    public ArrayList getInitData()
    {
        return BLL.RenLi.getBaseData();
    }
    [WebMethod(Description = "添加人员", EnableSession = true)]
    public DAL.DTO.Tab_RL_User addUser(DAL.DTO.Tab_RL_User obj)
    {
        DAL.Base_User ins = new DAL.Base_User();
        return ins.Save(obj);
    }
    [WebMethod(Description = "添加学历", EnableSession = true)]
    public DAL.DTO.Tab_User_XueLi addXueLi(DAL.DTO.Tab_User_XueLi obj)
    {
        DAL.Base_User_XueLi ins = new DAL.Base_User_XueLi();
        return ins.Save(obj);
    }
    [WebMethod(Description = "添加职称", EnableSession = true)]
    public DAL.DTO.Tab_User_ZhiCheng addZhiCheng(DAL.DTO.Tab_User_ZhiCheng obj)
    {
        DAL.Base_User_ZhiCheng ins = new DAL.Base_User_ZhiCheng();
        return ins.Save(obj);
    }
    [WebMethod(Description = "添加职业资格证书", EnableSession = true)]
    public DAL.DTO.Tab_RL_ZhiYeZiGeZhengShu addZhiYeZiGeZhengShu(DAL.DTO.Tab_RL_ZhiYeZiGeZhengShu obj)
    {
        DAL.Base_User_ZhiYeZiGeZhengShu ins = new DAL.Base_User_ZhiYeZiGeZhengShu();
        return ins.Save(obj);
    }
    [WebMethod(Description = "添加薪酬", EnableSession = true)]
    public DAL.DTO.Tab_RL_XinChou addXinChou(DAL.DTO.Tab_RL_XinChou obj,DAL.DTO.Tab_RL_XinChou_JieSuan jieSuan)
    {
        return DAL.Logic.Logic_User.SaveXinChou(obj, jieSuan);
        
    }
    [WebMethod(Description = "添加调动", EnableSession = true)]
    public DAL.DTO.Tab_DiaoDong addDiaoDong(DAL.DTO.Tab_DiaoDong obj)
    {
        DAL.Base_DiaoDong ins = new DAL.Base_DiaoDong();
        return ins.Save(obj);
    }
    [WebMethod(Description = "添加培训", EnableSession = true)]
    public DAL.DTO.Tab_RL_PeiXun addPeiXun(DAL.DTO.Tab_RL_PeiXun obj)
    {
        DAL.Base_PeiXun ins = new DAL.Base_PeiXun();
        return ins.Save(obj);
    }
    [WebMethod(Description = "添加奖惩", EnableSession = true)]
    public DAL.DTO.Tab_RL_JiangCheng addJiangCheng(DAL.DTO.Tab_RL_JiangCheng obj)
    {
        DAL.Base_JiangCheng ins = new DAL.Base_JiangCheng();
        return ins.Save(obj);
    }
    [WebMethod(Description = "添加经历", EnableSession = true)]
    public DAL.DTO.Tab_RL_User_JingLi addJingLi(DAL.DTO.Tab_RL_User_JingLi obj)
    {
        DAL.Base_JingLi ins = new DAL.Base_JingLi();
        return ins.Save(obj);
    }

    [WebMethod(Description = "得到一个人", EnableSession = true)]
    public DAL.DTO.Tab_RL_User getUserByUserId(int userId)
    {
        DAL.Base_User ins = new DAL.Base_User();
        return ins.getById(userId);
    }
    [WebMethod(Description = "得到一个人的所有学历", EnableSession = true)]
    public ArrayList getXueLiByUserId(int userId)
    {
        ArrayList returnValue = new ArrayList();
        DAL.Base_User_XueLi ins = new DAL.Base_User_XueLi();
        List<DAL.DTO.Tab_User_XueLi> xueLiList = ins.getByUserId(userId);
        returnValue.Add(xueLiList);
        ins = new DAL.Base_User_XueLi();
        returnValue.Add(ins.listXueList());
        DAL.Base_Upload upload = new DAL.Base_Upload();
        returnValue.Add(upload.getByXueLiIds(xueLiList.Select(p => p.ux_Id).ToArray()));
        return returnValue;
    }
    [WebMethod(Description = "得到一个人的所有职称", EnableSession = true)]
    public ArrayList getZhiChengByUserId(int userId)
    {
        ArrayList returnValue = new ArrayList();
        DAL.Base_User_ZhiCheng ins = new DAL.Base_User_ZhiCheng();
        List<DAL.DTO.Tab_User_ZhiCheng> zhiChengList= ins.getByUserId(userId);
        returnValue.Add(zhiChengList);
        ins = new DAL.Base_User_ZhiCheng();
        returnValue.Add(ins.listZhiCheng());
        DAL.Base_Upload upload = new DAL.Base_Upload();
        returnValue.Add(upload.getByZhiChengIds(zhiChengList.Select(p=>p.uz_Id).ToArray()));
        return returnValue;
    }
    [WebMethod(Description = "得到一个人所有的职业资格证书", EnableSession = true)]
    public ArrayList getZhiYeZiGeByUserId(int userId)
    {
        ArrayList returnValue = new ArrayList();
        DAL.Base_User_ZhiYeZiGeZhengShu ins = new DAL.Base_User_ZhiYeZiGeZhengShu();
        List<DAL.DTO.Tab_RL_ZhiYeZiGeZhengShu> list= ins.getByUserId(userId);
        returnValue.Add(list);
        DAL.Base_Upload upload = new DAL.Base_Upload();
        returnValue.Add(upload.getByZhiYeZiGeIds(list.Select(p => p.zgzs_Id).ToArray()));
        return returnValue;
    }
    
    [WebMethod(Description = "得到一个人所有的培训", EnableSession = true)]
    public ArrayList getPeiXunByUserId(int userId)
    {
        ArrayList returnValue = new ArrayList();
        List<DAL.CommClass.PeiXunWrapper> peiXunList= BLL.RenLi.getPeiXunWrapper(userId);
        returnValue.Add(peiXunList);
        DAL.Base_PeiXun ins = new DAL.Base_PeiXun();
        returnValue.Add(ins.getByUserId(userId));
        ins = new DAL.Base_PeiXun();
        returnValue.Add(ins.listPXLB());
        ins = new DAL.Base_PeiXun();
        returnValue.Add(ins.listPXXZ());
        ins = new DAL.Base_PeiXun();
        returnValue.Add(ins.listBM());
        DAL.Base_XiangMuQianQi baseXiangMu = new DAL.Base_XiangMuQianQi();
        returnValue.Add(baseXiangMu.getDistinctXiangMu());
        return returnValue;
    }
    [WebMethod(Description = "得到一个人所有的奖惩", EnableSession = true)]
    public ArrayList getJiangChengByUserId(int userId)
    {
        ArrayList returnValue = new ArrayList();
        DAL.Base_JiangCheng ins = new DAL.Base_JiangCheng();
        returnValue.Add(ins.getByUserId(userId));
        DAL.Base_XiangMuQianQi baseXiangMu = new DAL.Base_XiangMuQianQi();
        returnValue.Add(baseXiangMu.getDistinctXiangMu());
        return returnValue;
    }
    [WebMethod(Description = "得到一个人所有的奖惩", EnableSession = true)]
    public ArrayList getDiaoDongByUserId(int userId)
    {
        DAL.Base_DiaoDong ins = new DAL.Base_DiaoDong();
        return BLL.RenLi.getDiaoDongByUserId(userId);
    }
    [WebMethod(Description = "得到一个人学习经历", EnableSession = true)]
    public List<DAL.DTO.Tab_RL_User_JingLi> getXueXiJingLiByUserId(int userId)
    {
        DAL.Base_JingLi ins = new DAL.Base_JingLi();
        return ins.getByUserIdAndType(userId,1);
    }
    [WebMethod(Description = "得到一个人工作经历", EnableSession = true)]
    public List<DAL.DTO.Tab_RL_User_JingLi> getGongZuoJingLiByUserId(int userId)
    {
        DAL.Base_JingLi ins = new DAL.Base_JingLi();
        return ins.getByUserIdAndType(userId, 2);
    }
    [WebMethod(Description = "得到一个人工程经历", EnableSession = true)]
    public List<DAL.DTO.Tab_RL_User_JingLi> getGongChengJingLiByUserId(int userId)
    {
        DAL.Base_JingLi ins = new DAL.Base_JingLi();
        return ins.getByUserIdAndType(userId, 3);
    }
    [WebMethod(Description = "得到薪酬相关信息", EnableSession = true)]
    public List<DAL.CommClass.XinChouWrapper> getXinChouByUserId(int userId)
    {
        return BLL.RenLi.getXinChouByUserId(userId);
    }
    [WebMethod(Description = "得到薪酬相关信息", EnableSession = true)]
    public ArrayList getXinChouInfo(int id) {
        return BLL.RenLi.getXinChouInfo(id);
    }
    [WebMethod(Description = "得到薪酬", EnableSession = true)]
    public ArrayList getXinChou(int id)
    {
        return DAL.Logic.Logic_User.getXinChou(id);
    }
    [WebMethod(Description = "得到去重的岗位", EnableSession = true)]
    public string[] getDistinctGangWei()
    {
        DAL.Base_DiaoDong dd = new DAL.Base_DiaoDong();
        return dd.getDistinctGangWei();
    }
    [WebMethod(Description = "更新用户", EnableSession = true)]
    public bool updateUser(DAL.DTO.Tab_RL_User obj)
    {
        DAL.Base_User ins = new DAL.Base_User();
        return ins.Updates(new DAL.DTO.Tab_RL_User[] { obj }) == 1 ? true : false;
    }
    [WebMethod(Description = "更新学历", EnableSession = true)]
    public bool updateXueLi(DAL.DTO.Tab_User_XueLi obj)
    {
        DAL.Base_User_XueLi ins = new DAL.Base_User_XueLi();
        return ins.Update(obj) == 1 ? true : false;
    }
    [WebMethod(Description = "更新职称", EnableSession = true)]
    public bool updateZhiCheng(DAL.DTO.Tab_User_ZhiCheng obj)
    {
        DAL.Base_User_ZhiCheng ins = new DAL.Base_User_ZhiCheng();
        return ins.Update(obj)==1?true:false;
    }
    [WebMethod(Description = "更新职业资格证", EnableSession = true)]
    public bool updateZiGeZhengShu(DAL.DTO.Tab_RL_ZhiYeZiGeZhengShu obj)
    {
        DAL.Base_User_ZhiYeZiGeZhengShu ins = new DAL.Base_User_ZhiYeZiGeZhengShu();
        return ins.Updates(new DAL.DTO.Tab_RL_ZhiYeZiGeZhengShu[] { obj }) == 1 ? true : false;
    }
    [WebMethod(Description = "更新薪酬", EnableSession = true)]
    public bool updateXinChou(DAL.DTO.Tab_RL_XinChou obj,DAL.DTO.Tab_RL_XinChou_JieSuan jieSuan)
    {

        return DAL.Logic.Logic_User.UpdateXinChou(obj, jieSuan);
    }
   
    [WebMethod(Description = "更新培训", EnableSession = true)]
    public bool updatePeiXun(DAL.DTO.Tab_RL_PeiXun obj)
    {
        DAL.Base_PeiXun ins = new DAL.Base_PeiXun();
        return ins.Updates(new DAL.DTO.Tab_RL_PeiXun[] { obj }) == 1 ? true : false;
    }
    [WebMethod(Description = "更新奖惩", EnableSession = true)]
    public bool updateJiangCheng(DAL.DTO.Tab_RL_JiangCheng obj)
    {
        DAL.Base_JiangCheng ins = new DAL.Base_JiangCheng();
        return ins.Updates(new DAL.DTO.Tab_RL_JiangCheng[] { obj }) == 1 ? true : false;
    }
    [WebMethod(Description = "更新职业资格证", EnableSession = true)]
    public bool updateJingLi(DAL.DTO.Tab_RL_User_JingLi obj)
    {
        DAL.Base_JingLi ins = new DAL.Base_JingLi();
        return ins.Updates(new DAL.DTO.Tab_RL_User_JingLi[] { obj }) == 1 ? true : false;
    }
    [WebMethod(Description = "更新调动", EnableSession = true)]
    public bool updateDiaoDong(DAL.DTO.Tab_DiaoDong obj)
    {
        DAL.Base_DiaoDong ins = new DAL.Base_DiaoDong();
        return ins.Updates(new DAL.DTO.Tab_DiaoDong[] { obj }) == 1 ? true : false;
    }

    [WebMethod(Description = "删除用户", EnableSession = true)]
    public bool delUser(int id)
    {
        DAL.Base_User ins = new DAL.Base_User();
        return ins.Deletes(new int[] { id }) == 1 ? true : false;
    }
    [WebMethod(Description = "删除经历", EnableSession = true)]
    public bool delJingLi(int id)
    {
        DAL.Base_JingLi ins = new DAL.Base_JingLi();
        return ins.Deletes(new int[] { id }) == 1 ? true : false;
    }
    [WebMethod(Description = "删除学历", EnableSession = true)]
    public bool delXueLi(int id)
    {
        DAL.Base_User_XueLi ins = new DAL.Base_User_XueLi();
        return ins.Delete(id);
    }
    [WebMethod(Description = "删除职称", EnableSession = true)]
    public bool delZhiCheng(int id)
    {
        DAL.Base_User_ZhiCheng ins = new DAL.Base_User_ZhiCheng();
        return ins.Delete(id);
    }
    [WebMethod(Description = "删除职业资格证书", EnableSession = true)]
    public bool delZhiYeZiGeZhengShu(int id)
    {
        DAL.Base_User_ZhiYeZiGeZhengShu ins = new DAL.Base_User_ZhiYeZiGeZhengShu();
        return ins.Deletes(new int[]{id})==1?true:false;
    }
    [WebMethod(Description = "删除薪酬", EnableSession = true)]
    public bool delXinChou(int id)
    {
        DAL.Base_XinChou ins = new DAL.Base_XinChou();
        return ins.Delete(id);
    }
   
    [WebMethod(Description = "删除培训", EnableSession = true)]
    public bool delPeiXun(int id)
    {
        DAL.Base_PeiXun ins = new DAL.Base_PeiXun();
        return ins.Deletes(new int[] { id }) == 1 ? true : false;
    }
    [WebMethod(Description = "删除奖惩", EnableSession = true)]
    public bool delJiangCheng(int id)
    {
        DAL.Base_JiangCheng ins = new DAL.Base_JiangCheng();
        return ins.Deletes(new int[] { id }) == 1 ? true : false;
    }
    [WebMethod(Description = "删除上传", EnableSession = true)]
    public bool delUploads(int id)
    {
        DAL.Base_Upload ins = new DAL.Base_Upload();
        return ins.Deletes(new int[] { id }, Server.MapPath("~/")) == 1 ? true : false;
    }
    [WebMethod(Description = "删除调动", EnableSession = true)]
    public bool delDiaoDong(int id)
    {
        DAL.Base_DiaoDong ins = new DAL.Base_DiaoDong();
        return ins.Deletes(new int[] { id }) == 1 ? true : false;
    }
    [WebMethod(Description = "得到UserWrapper的总数", EnableSession = true)]
    public int countUser(DAL.CommClass.PageClass pageClass, string where)
    {
        return BLL.RenLi.countRenLi(pageClass, where);
    }
    [WebMethod(Description = "得到UserWrapper", EnableSession = true)]
    public List<DAL.CommClass.UserWrapper> filterUserWrappper(DAL.CommClass.PageClass pageClass, string where)
    {
        return BLL.RenLi.filterRenLiWrappper(pageClass, where);
    }

    //[WebMethod(Description = "", EnableSession = true)]
    //public List<DAL.CommClass.XinChouWrapper> getXinChouByUserId(string userId)
    //{
    //    return BLL.RenLi.getXinChouByUserId(userId);
    //}
    [WebMethod(Description = "返回项目名称和主键", EnableSession = true)]
    public DAL.CommClass.keyValueClass[] getDistinctXiangMu(string userId)
    {
        DAL.Base_XiangMuQianQi xiangMu = new DAL.Base_XiangMuQianQi();
        return xiangMu.getDistinctXiangMu();
    }
    [WebMethod(Description = "返回调整原因（去重）", EnableSession = true)]
    public string[] getDistinctTZYY()
    {
        DAL.Base_XinChou xinChou = new DAL.Base_XinChou();
        return xinChou.listTZYY();
    }
    [WebMethod(Description = "返回薪资最近一次记录", EnableSession = true)]
    public DAL.DTO.Tab_RL_XinChou getLastRecordXinChou(int userId)
    {
        DAL.Base_XinChou xinChou = new DAL.Base_XinChou();
        return xinChou.getLastRecordXinChou(userId);
    }
    [WebMethod(Description = "返回扣款、加钱记录", EnableSession = true)]
    public List<DAL.DTO.Tab_RL_XinChou_KouKuanJiangLi> getXinChouKouKuanByUserId(int userId)
    {
        DAL.Base_XinChou_KouKuanJiangLi xinChou = new DAL.Base_XinChou_KouKuanJiangLi();
        return xinChou.getByUserId(userId);
    }
    [WebMethod(Description = "保存扣款、加钱记录", EnableSession = true)]
    public DAL.DTO.Tab_RL_XinChou_KouKuanJiangLi saveXinChouKouKuan(DAL.DTO.Tab_RL_XinChou_KouKuanJiangLi obj)
    {
        DAL.Base_XinChou_KouKuanJiangLi xinChou = new DAL.Base_XinChou_KouKuanJiangLi();
        return xinChou.Save(obj);
    }

    [WebMethod(Description = "更新扣款、加钱记录", EnableSession = true)]
    public bool updateXinChouKouKuan(DAL.DTO.Tab_RL_XinChou_KouKuanJiangLi obj)
    {
        DAL.Base_XinChou_KouKuanJiangLi xinChou = new DAL.Base_XinChou_KouKuanJiangLi();
        return xinChou.Update(obj);
    }
    [WebMethod(Description = "删除扣款、加钱记录", EnableSession = true)]
    public bool deleteXinChouKouKuan(int id)
    {
        DAL.Base_XinChou_KouKuanJiangLi xinChou = new DAL.Base_XinChou_KouKuanJiangLi();
        return xinChou.Deletes(new int[] { id })==1?true:false;
    }
    
}
