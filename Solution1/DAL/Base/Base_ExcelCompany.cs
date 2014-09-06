using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_ExcelCompany : Base
    {
        public Tab_Excel_Company Save(Tab_Excel_Company obj)
        {
            return this.Save<Tab_Excel_Company>(obj);
        }
        public int Updates(Tab_Excel_Company[] objs)
        {
            int returnValue = 0;
            Tab_Excel_Company[] query = (from i in this.dataContext.Tab_Excel_Company where objs.Select(ins => ins.ec_ID).Contains(i.ec_ID) select i).ToArray();
            foreach (Tab_Excel_Company q in query)
            {
                Tab_Excel_Company item = objs.FirstOrDefault(ins => ins.ec_ID == q.ec_ID);
                this.CopyObjectPoperty<Tab_Excel_Company, Tab_Excel_Company>(item, q);
            }
            try
            {
                this.dataContext.SubmitChanges();
                returnValue = query.Count();
            }
            catch
            {
                returnValue = 0;
            }
            return returnValue;
        }
        public int Deletes(int[] ids)
        {
            var query = from i in this.dataContext.Tab_Excel_Company where ids.Contains(i.ec_ID) select i;
            this.dataContext.Tab_Excel_Company.DeleteAllOnSubmit(query);
            int status = query.Count();
            try
            {
                this.dataContext.SubmitChanges();
            }
            catch
            {
                status = 0;
            }
            return status;
        }
        public List<DTO.Tab_Excel_Company> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Excel_Company.OrderBy(p=>p.ec_Name).ToList<DTO.Tab_Excel_Company>();
        }
        /// <summary>
        /// 设置查询需要返回哪些关联表。
        /// </summary>
        /// <param name="tabs"></param>
        private void queryConfig(params string[] tabs)
        {
            if (tabs != null && tabs.Length == 0)
            {
                this.dataContext.DeferredLoadingEnabled = false;
            }
            else
            {
                DataLoadOptions dl = new DataLoadOptions();
                if (tabs == null || tabs.Contains("Tab_Excel_Company_User_ZhuanYe"))
                {
                    dl.LoadWith<DTO.Tab_Excel_Company>(tab => tab.Tab_Excel_Company_User_ZhuanYe);
                }
            }

        }

        public List<DTO.Tab_Excel_Company> getByIds(int[] companyIds, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Excel_Company.Where(p => companyIds.Contains(p.ec_ID)).ToList();
        }
    }
}
