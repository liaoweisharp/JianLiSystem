using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
///WebService_HeTong_TongJi 的摘要说明
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
//若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。 
 [System.Web.Script.Services.ScriptService]
public class WebService_HeTong_TongJi : System.Web.Services.WebService {

    public WebService_HeTong_TongJi () {

        //如果使用设计的组件，请取消注释以下行 
        //InitializeComponent(); 
    }

    [WebMethod(Description = "合同统计", EnableSession = true)]
    public List<DAL.CommClass.ExtendHeTong> getHeTongExtend(DAL.CommClass.QueryWhereHT queryWhereHT)
    {
        return DAL.Logic.Logic_HeTong.filterExtendHeTong(queryWhereHT);
    }
    [WebMethod(Description = "", EnableSession = true)]
    public DAL.CommClass.HeTongWrapper getHeTongWrapperById(int id)
    {
        return DAL.Logic.Logic_HeTong.getHeTongWrappperById(id);
    }
    
}
