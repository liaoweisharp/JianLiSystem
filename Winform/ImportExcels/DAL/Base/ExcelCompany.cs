using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL.Base
{
    public class ExcelCompany:Base
    {
        public  Tab_Excel_Company Save(Tab_Excel_Company obj)
        {
            return Save<Tab_Excel_Company>(obj);
        }
        public  int Updates(Tab_Excel_Company[] objs)
        {
            int returnValue = 0;
            Tab_Excel_Company[] query = (from i in dataContext.Tab_Excel_Company where objs.Select(ins => ins.ec_ID).Contains(i.ec_ID) select i).ToArray();
            foreach (Tab_Excel_Company q in query)
            {
                Tab_Excel_Company item = objs.FirstOrDefault(ins => ins.ec_ID == q.ec_ID);
                CopyObjectPoperty<Tab_Excel_Company, Tab_Excel_Company>(item, q);
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
            var query = from i in dataContext.Tab_Excel_Company where ids.Contains(i.ec_ID) select i;
            dataContext.Tab_Excel_Company.DeleteAllOnSubmit(query);
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
        public  DTO.Tab_Excel_Company getById(int Id, params string[] tabs)
        {
            queryConfig(tabs);
            return dataContext.Tab_Excel_Company.FirstOrDefault(ins => ins.ec_ID == Id);
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
                if (tabs.Contains("Tab_Excel_Company_User_ZhuanYe"))
                {
                    dl.LoadWith<DTO.Tab_Excel_Company>(tab => tab.Tab_Excel_Company_User_ZhuanYe);
                }
                dataContext.LoadOptions = dl;
            }
        }

        public  Tab_Excel_Company getByName(string name, params string[] tabs)
        {
            queryConfig(tabs);
            return dataContext.Tab_Excel_Company.FirstOrDefault(p=>p.ec_Name.Trim()==name.Trim());
        }
    }
}
