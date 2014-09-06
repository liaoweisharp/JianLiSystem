using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.CommClass;
using System.Xml.Linq;

namespace DAL
{
    public static class CommFun
    {
        /// <summary>
        /// 两个日期相差的天数
        /// </summary>
        /// <param name="d1"></param>
        /// <param name="d2"></param>
        /// <returns></returns>
        public static int DiffDay(DateTime d1, DateTime d2)
        {
            try
            {
                if (d1 > d2)
                {
                    return (int)((TimeSpan)(d1 - d2)).TotalDays;
                }
                else
                {
                    return (int)((TimeSpan)(d2 - d1)).TotalDays;
                }
            }
            catch (Exception e)
            {
                throw new Exception();
            }

        }
        /// <summary>
        /// 获得功能权限
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static List<nav> getQuanXian(string id)
        {
            //string id = (String)Session["id"];
           // string dir = Server.MapPath("") + "\\User.xml";
            string dir = System.Configuration.ConfigurationSettings.AppSettings["right"];
            XElement root = XElement.Load(dir);
            var dd = from p in root.Elements("user") select p;

            var d2 = from p in dd where (string)p.Element("id").Value == id select p;
            List<String> ids = new List<string>();
            foreach (var p in d2.Elements("features").Elements("feature"))
            {
                ids.Add(p.Value);
            }

            var f1 = from p in root.Elements("feature")
                     where ids.Contains(p.Element("id").Value.ToString())
                     select p;
            List<nav> navList = new List<nav>();
            foreach (var p in f1)
            {
                nav obj = new nav();
                obj.id = p.Element("id").Value.ToString();
                obj.page = p.Element("page").Value.ToString();
                obj.name = p.Element("page").Attribute("name").Value.ToString();
                obj.pName = p.Element("page").Attribute("pName").Value.ToString();
                obj.className = p.Element("page").Attribute("class").Value.ToString();
                navList.Add(obj);
            }
            return navList;
        }
    }
}

