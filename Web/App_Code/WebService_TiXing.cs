using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using DAL;

/// <summary>
///WebService_TiXing 的摘要说明
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
//若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。 
 [System.Web.Script.Services.ScriptService]
public class WebService_TiXing : System.Web.Services.WebService {

    public WebService_TiXing () {

        //如果使用设计的组件，请取消注释以下行 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld() {
        return "Hello World";
    }
     [WebMethod(EnableSession = true)]
    public int tiXing_Count(int where_days)
    {
        return new DAL.ViewBase_ShouKuanJiHua().tiXing_Count(where_days);
    }
     [WebMethod(EnableSession = true)]
    public List<DAL.DTO.View_ShouKuanJiHua> tingXing_Filter(int currentPage, int pageSize, int where_days)
    {
        return new DAL.ViewBase_ShouKuanJiHua().tingXing_Filter(currentPage, pageSize,where_days);
    }
     [WebMethod(EnableSession = true)]
     public int tiXing_HeTong_Count(int where_days)
     {
         return new DAL.ViewBase_User().tiXing_Count(where_days);
     }
     [WebMethod(EnableSession = true)]
     public List<DAL.DTO.View_User> tingXing_HeTong_Filter(int currentPage, int pageSize, int where_days)
     {
         return new DAL.ViewBase_User().tingXing_Filter(currentPage, pageSize, where_days);
     }
}
