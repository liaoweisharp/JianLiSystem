using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL.Base
{
    public class ExcelCompanyUserZhengShu:Base
    {
        public  Tab_Excel_Company_User_ZhuanYe Save(Tab_Excel_Company_User_ZhuanYe obj)
        {
            return Save<Tab_Excel_Company_User_ZhuanYe>(obj);
        }
        public  List<Tab_Excel_Company_User_ZhuanYe> Saves(List<Tab_Excel_Company_User_ZhuanYe> objs) {
            return base.Saves<Tab_Excel_Company_User_ZhuanYe>(objs);
        }
        public  int Updates(Tab_Excel_Company_User_ZhuanYe[] objs)
        {
            int returnValue = 0;
            Tab_Excel_Company_User_ZhuanYe[] query = (from i in dataContext.Tab_Excel_Company_User_ZhuanYe where objs.Select(ins => ins.ecu_ID).Contains(i.ecu_ID) select i).ToArray();
            foreach (Tab_Excel_Company_User_ZhuanYe q in query)
            {
                Tab_Excel_Company_User_ZhuanYe item = objs.FirstOrDefault(ins => ins.ecu_ID == q.ecu_ID);
                CopyObjectPoperty<Tab_Excel_Company_User_ZhuanYe, Tab_Excel_Company_User_ZhuanYe>(item, q);
            }
            try
            {
                dataContext.SubmitChanges();
                returnValue = query.Count();
            }
            catch
            {
                returnValue = 0;
            }
            return returnValue;
        }
        public  int Deletes(int[] ids)
        {
            var query = from i in dataContext.Tab_Excel_Company_User_ZhuanYe where ids.Contains(i.ecu_ID) select i;
            dataContext.Tab_Excel_Company_User_ZhuanYe.DeleteAllOnSubmit(query);
            int status = query.Count();
            try
            {
                dataContext.SubmitChanges();
            }
            catch
            {
                status = 0;
            }
            return status;
        }
        public  DTO.Tab_Excel_Company_User_ZhuanYe getById(int Id, params string[] tabs)
        {
            queryConfig(tabs);
            return dataContext.Tab_Excel_Company_User_ZhuanYe.FirstOrDefault(ins => ins.ecu_ID == Id);
        }
        /// <summary>
        /// 设置查询需要返回哪些关联表。
        /// </summary>
        /// <param name="tabs"></param>
        private  void queryConfig(params string[] tabs)
        {
            if (tabs.Length == 0)
            {
                dataContext.DeferredLoadingEnabled = false;
            }
            else
            {
                DataLoadOptions dl = new DataLoadOptions();
                if (tabs.Contains("Tab_Excel_Company"))
                {
                    dl.LoadWith<DTO.Tab_Excel_Company_User_ZhuanYe>(tab => tab.Tab_Excel_Company);
                }
                if (tabs.Contains("Tab_Excel_ZhengShu"))
                {
                    dl.LoadWith<DTO.Tab_Excel_Company_User_ZhuanYe>(tab => tab.Tab_Excel_ZhengShu);
                }
                dataContext.LoadOptions = dl;
            }
        }
    }
}
