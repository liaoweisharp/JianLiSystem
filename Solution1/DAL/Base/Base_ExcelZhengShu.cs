using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_ExcelZhengShu:Base
    {
        public Tab_Excel_ZhengShu Save(Tab_Excel_ZhengShu obj)
        {
            return this.Save<Tab_Excel_ZhengShu>(obj);
        }
        public int Updates(Tab_Excel_ZhengShu[] objs)
        {
            int returnValue = 0;
            Tab_Excel_ZhengShu[] query = (from i in this.dataContext.Tab_Excel_ZhengShu where objs.Select(ins => ins.ezs_ID).Contains(i.ezs_ID) select i).ToArray();
            foreach (Tab_Excel_ZhengShu q in query)
            {
                Tab_Excel_ZhengShu item = objs.FirstOrDefault(ins => ins.ezs_ID == q.ezs_ID);
                this.CopyObjectPoperty<Tab_Excel_ZhengShu, Tab_Excel_ZhengShu>(item, q);
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
            var query = from i in this.dataContext.Tab_Excel_ZhengShu where ids.Contains(i.ezs_ID) select i;
            this.dataContext.Tab_Excel_ZhengShu.DeleteAllOnSubmit(query);
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
        public List<DTO.Tab_Excel_ZhengShu> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Excel_ZhengShu.OrderBy(p=>p.ezs_Name).ToList<DTO.Tab_Excel_ZhengShu>();
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
                    dl.LoadWith<DTO.Tab_Excel_ZhengShu>(tab => tab.Tab_Excel_Company_User_ZhuanYe);
                }
            }

        }
    }
}
