using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Master_MasterPage : System.Web.UI.MasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {

        if (Session["id"] == null)
        {
            Response.Redirect("../login.aspx");
        }
        string id=Session["id"].ToString();
        List<DAL.CommClass.nav> navList= DAL.CommFun.getQuanXian(id);
        string title=this.Page.Title.Trim();
        if (title == "桌面") return;
        DAL.CommClass.nav obj= navList.FirstOrDefault(p =>p.name.Trim() == title);
        if (obj == null)
        { 
            //没有访问此页面的权限
            Response.Redirect("../login.aspx");
        }
    }
}
