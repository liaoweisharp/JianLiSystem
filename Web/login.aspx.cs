using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Linq;
using DAL.DTO;

public partial class login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Session.Remove("id");
    }
    protected void btLogin_Click(object sender, EventArgs e)
    {
        string userName=txtUserName.Value.Trim();
        string password = txtPassword.Value.Trim();
        
        //先判断是不是数据库里的用户
        DAL.Base_User userBase = new DAL.Base_User();
        Tab_RL_User user= userBase.getByName(userName);
        if (user != null && password == System.Configuration.ConfigurationSettings.AppSettings["pw"])
        {
            Session["id"] = user.jl_Id;//Session
            Response.Redirect("RL/Users.aspx");
        }

        //在判断是不是XML里的用户
       // string dir = Server.MapPath("") + "\\WebService\\User.xml";
        string dir = System.Configuration.ConfigurationSettings.AppSettings["right"];
        XElement root = XElement.Load(dir);
        var dd = from p in root.Elements("user") 
                 where p.Element("id").Value==userName && p.Element("pw").Value==password
                 select p;

        if (dd.Count() > 0)
        {
            //登录成功
            Session["id"] = dd.FirstOrDefault().Element("id").Value;//Session
            lb_Status.Visible = false;
            Response.Redirect("default.aspx");
            
        }
        else { 
            //登录失败
            lb_Status.Text = "密码错误！";
            
            lb_Status.Visible = true;
        }
    }
}