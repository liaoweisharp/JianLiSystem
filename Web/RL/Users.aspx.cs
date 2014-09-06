using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class RL_Users : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        hd_SessionId.Value = Session["id"].ToString();
    }
    protected void Button2_Click(object sender, EventArgs e)
    {
        Session["id"] = null;
        Response.Redirect("../login.aspx");
    }
}