using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using DAL.CommClass;
using DAL.DTO;
using System.Collections;

/// <summary>
///WebService_ZhengZhang 的摘要说明
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
//若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。 
[System.Web.Script.Services.ScriptService]
public class WebService_ZhengZhang : System.Web.Services.WebService {

    public WebService_ZhengZhang () {

        //如果使用设计的组件，请取消注释以下行 
        //InitializeComponent(); 
    }

    [WebMethod(Description = "企业证件Page", EnableSession = true)]
    public int countCompany(PageClass pageClass, string where,bool? isGuiHuan)
    {
        return new DAL.Base_ZZ_GongSi().countCompany(pageClass, where, isGuiHuan);
    }
    [WebMethod(Description = "企业证件Page", EnableSession = true)]
    public List<DAL.DTO.Tab_ZZ_GongSi> filterCompany(PageClass pageClass, string where,bool? isGuiHuan)
    {
        return new DAL.Base_ZZ_GongSi().filterCompany(pageClass, where,isGuiHuan);
    }
    [WebMethod(Description = "企业证件Page", EnableSession = true)]
    public Tab_ZZ_GongSi addCompany(Tab_ZZ_GongSi obj)
    {
        return new DAL.Base_ZZ_GongSi().Save(obj);
    }
    [WebMethod(Description = "企业证件Page", EnableSession = true)]
    public bool updateCompany(Tab_ZZ_GongSi obj)
    {
        return new DAL.Base_ZZ_GongSi().Update(obj)==1?true:false;
    }
    [WebMethod(Description = "企业证件Page", EnableSession = true)]
    public bool delCompany(int id)
    {
        return new DAL.Base_ZZ_GongSi().Delete(id) == 1 ? true : false;
    }
    [WebMethod(Description = "企业证件Page", EnableSession = true)]
    public string[] getDistinctCompanyZhengJian()
    {
        return new DAL.Base_ZZ_GongSi().getDistinctCompanyZhengJian();
    }





    [WebMethod(Description = "人员证书", EnableSession = true)]
    public int countZhengShu(PageClass pageClass, string where)
    {
        return new DAL.Base_ZZ_ZhengShu().countZhengShu(pageClass, where);
    }
    [WebMethod(Description = "人员证书", EnableSession = true)]
    public List<DAL.CommClass.zhengZhangZhengShu> filterZhengShu(PageClass pageClass, string where)
    {
        return new DAL.Logic.Logic_ZhengZhang().filterZhengShu(pageClass, where);
        //return new DAL.Base_ZZ_ZhengShu().filterZhengShu(pageClass, where);
    }
    [WebMethod(Description = "人员证书", EnableSession = true)]
    public Tab_ZZ_ZhengShu addZhengShu(Tab_ZZ_ZhengShu obj)
    {
        return new DAL.Base_ZZ_ZhengShu().Save(obj);
    }
    [WebMethod(Description = "人员证书", EnableSession = true)]
    public bool updateZhengShu(Tab_ZZ_ZhengShu obj)
    {
        return new DAL.Base_ZZ_ZhengShu().Update(obj) == 1 ? true : false;
    }
    [WebMethod(Description = "人员证书", EnableSession = true)]
    public bool delZhengShu(int id)
    {
        return new DAL.Base_ZZ_ZhengShu().Delete(id) == 1 ? true : false;
    }
    [WebMethod(Description = "人员证书", EnableSession = true)]
    public string[] getDistinctZhengShu()
    {
        return new DAL.Base_ZZ_ZhengShu().getDistinctZhengShu();
    }

    [WebMethod(Description = "印章Page", EnableSession = true)]
    public List<DAL.CommClass.keyValueClass> getByAllProject()
    {
        return new DAL.Base_XiangMuQianQi().getByAllProject();
    }
    [WebMethod(Description = "印章Page", EnableSession = true)]
    public ArrayList getYinZhangDistinctInfo()
    {
        string[] yinZhang = new DAL.Base_ZZ_YinZhang().getDistinctYinZhang();
        string[] buMen = new DAL.Base_ZZ_YinZhang().getDistinctBuMen();
        string[] leiXing = new DAL.Base_ZZ_YinZhang().getDistinctLeiXing();
        ArrayList returnValue = new ArrayList();
        returnValue.Add(yinZhang);
        returnValue.Add(buMen);
        returnValue.Add(leiXing);
        return returnValue;
    }
    [WebMethod(Description = "印章Page", EnableSession = true)]
    public int countYinZhang(PageClass pageClass, string where)
    {
        return new DAL.Base_ZZ_YinZhang().countYinZhang(pageClass, where);
    }
    [WebMethod(Description = "印章Page", EnableSession = true)]
    public List<DAL.DTO.Tab_ZZ_YinZhang> filterYinZhang(PageClass pageClass, string where)
    {
        return new DAL.Base_ZZ_YinZhang().filterYinZhang(pageClass, where);
    }
    [WebMethod(Description = "印章Page", EnableSession = true)]
    public Tab_ZZ_YinZhang addYinZhang(Tab_ZZ_YinZhang obj)
    {
        return new DAL.Base_ZZ_YinZhang().Save(obj);
    }
    [WebMethod(Description = "印章Page", EnableSession = true)]
    public bool updateYinZhang(Tab_ZZ_YinZhang obj)
    {
        return new DAL.Base_ZZ_YinZhang().Update(obj) == 1 ? true : false;
    }
    [WebMethod(Description = "印章Page", EnableSession = true)]
    public bool delYinZhang(int id)
    {
        return new DAL.Base_ZZ_YinZhang().Delete(id) == 1 ? true : false;
    }


    [WebMethod(Description = "证书外借Page", EnableSession = true)]
    public ArrayList getByAllProjectInfo()
    {
        ArrayList returnValue = new ArrayList();
        returnValue.Add(new DAL.Base_XiangMuQianQi().getByAllProject());
        returnValue.Add(new DAL.Base_ZZ_ZhengShu().getZhengShuKeyValue());
        return returnValue;
    }
    [WebMethod(Description = "证书外借Page", EnableSession = true)]
    public ArrayList getDistinct_ZhengShuUsed()
    {
        string[] arr1 = new DAL.Base_ZZ_ZhengShuUsed().getDistinct_YongTu();
    
        ArrayList returnValue = new ArrayList();
        returnValue.Add(arr1);
 
        return returnValue;
    }
    [WebMethod(Description = "证书外借Page", EnableSession = true)]
    public int countZhengShuUsed(PageClass pageClass, string where, bool? isGuiHuan)
    {
        return new DAL.Base_ZZ_ZhengShuUsed().countZhengShuUsed(pageClass, where,isGuiHuan, new string[] { "Tab_ZZ_ZhengShu", "TabXiangMuQianQi" });
    }
    [WebMethod(Description = "证书外借Page", EnableSession = true)]
    public List<DAL.DTO.Tab_ZZ_ZhengShu_Used> filterZhengShuUsed(PageClass pageClass, string where, bool? isGuiHuan)
    {

        return new DAL.Base_ZZ_ZhengShuUsed().filterZhengShuUsed(pageClass, where, isGuiHuan, new string[] { "Tab_ZZ_ZhengShu", "TabXiangMuQianQi" });
    }
    [WebMethod(Description = "证书外借Page", EnableSession = true)]
    public Tab_ZZ_ZhengShu_Used addZhengShuUsed(Tab_ZZ_ZhengShu_Used obj)
    {
        return new DAL.Base_ZZ_ZhengShuUsed().Save(obj);
    }
    [WebMethod(Description = "证书外借Page", EnableSession = true)]
    public bool updateZhengShuUsed(Tab_ZZ_ZhengShu_Used obj)
    {
        return new DAL.Base_ZZ_ZhengShuUsed().Update(obj) == 1 ? true : false;
    }
    [WebMethod(Description = "证书外借Page", EnableSession = true)]
    public bool delZhengShuUsed(int id)
    {
        return new DAL.Base_ZZ_ZhengShuUsed().Delete(id) == 1 ? true : false;
    }
}
