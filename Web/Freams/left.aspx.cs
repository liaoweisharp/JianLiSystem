using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using System.Xml.Linq;
using DAL.CommClass;
public partial class left : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            lb_name.Text = (string)Session["id"];
        }

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        Session.Remove("id");
        this.Page.Parent.Page.Response.Redirect("login.aspx");
    }
   
}
