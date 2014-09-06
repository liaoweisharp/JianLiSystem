using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Xml.Linq;
using DAL.CommClass;

/// <summary>
///WebService_Right 的摘要说明
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
//若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。 
 [System.Web.Script.Services.ScriptService]
public class WebService_Right : System.Web.Services.WebService {

    public WebService_Right () {

        //如果使用设计的组件，请取消注释以下行 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld() {
        return "Hello World";
    }
    [WebMethod(Description = "", EnableSession = true)]
    public List<nav> getQuanXian()
    {
        string id = (String)Session["id"];
        return DAL.CommFun.getQuanXian(id);
        //string dir = Server.MapPath("") + "\\User.xml";
        //XElement root = XElement.Load(dir);
        //var dd = from p in root.Elements("user") select p;

        //var d2 = from p in dd where (string)p.Element("id").Value == id select p;
        //List<String> ids = new List<string>();
        //foreach (var p in d2.Elements("features").Elements("feature"))
        //{
        //    ids.Add(p.Value);
        //}

        //var f1 = from p in root.Elements("feature")
        //         where ids.Contains(p.Element("id").Value.ToString())
        //         select p;
        //List<nav> navList = new List<nav>();
        //foreach (var p in f1)
        //{
        //    nav obj = new nav();
        //    obj.id = p.Element("id").Value.ToString();
        //    obj.page = p.Element("page").Value.ToString();
        //    obj.name = p.Element("page").Attribute("name").Value.ToString();
        //    obj.pName = p.Element("page").Attribute("pName").Value.ToString();
        //    obj.className = p.Element("page").Attribute("class").Value.ToString();
        //    navList.Add(obj);
        //}
        //return navList;
    }
    
}
