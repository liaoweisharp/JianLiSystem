using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
///WebService_XinChou 的摘要说明
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
//若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。 
 [System.Web.Script.Services.ScriptService]
public class WebService_XinChou : System.Web.Services.WebService {

    public WebService_XinChou () {

        //如果使用设计的组件，请取消注释以下行 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld() {
        return "Hello World";
    }
    [WebMethod(Description = "返回请假", EnableSession = true)]
    public List<DAL.DTO.Tab_RL_QingJia> getQingJiaByUserId(int userId)
    {
        DAL.Base_XinChou_QingJia obj = new DAL.Base_XinChou_QingJia();
        return obj.getByUserId(userId);
    }
    
    [WebMethod(Description = "保存 请假", EnableSession = true)]
    public DAL.DTO.Tab_RL_QingJia save_QingJia(DAL.DTO.Tab_RL_QingJia obj)
    {
        DAL.Base_XinChou_QingJia qingjia = new DAL.Base_XinChou_QingJia();
        return qingjia.Save(obj);
    }
    

    [WebMethod(Description = "更新 请假", EnableSession = true)]
    public int update_QingJia(DAL.DTO.Tab_RL_QingJia obj)
    {
        DAL.Base_XinChou_QingJia qingjia = new DAL.Base_XinChou_QingJia();
        return qingjia.Update(obj);
    }
    
}
