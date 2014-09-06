using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL.Base
{
    public class ExcelZhengShu:Base
    {
        public Tab_Excel_ZhengShu Save(Tab_Excel_ZhengShu obj)
        {
            return Save<Tab_Excel_ZhengShu>(obj);
        }
        public int Updates(Tab_Excel_ZhengShu[] objs)
        {
            int returnValue = 0;
            Tab_Excel_ZhengShu[] query = (from i in dataContext.Tab_Excel_ZhengShu where objs.Select(ins => ins.ezs_ID).Contains(i.ezs_ID) select i).ToArray();
            foreach (Tab_Excel_ZhengShu q in query)
            {
                Tab_Excel_ZhengShu item = objs.FirstOrDefault(ins => ins.ezs_ID == q.ezs_ID);
                CopyObjectPoperty<Tab_Excel_ZhengShu, Tab_Excel_ZhengShu>(item, q);
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
        public int Deletes(int[] ids)
        {
            var query = from i in dataContext.Tab_Excel_ZhengShu where ids.Contains(i.ezs_ID) select i;
            dataContext.Tab_Excel_ZhengShu.DeleteAllOnSubmit(query);
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
        public DTO.Tab_Excel_ZhengShu getById(int Id, params string[] tabs)
        {
            queryConfig(tabs);
            return dataContext.Tab_Excel_ZhengShu.FirstOrDefault(ins => ins.ezs_ID == Id);
        }
        /// <summary>
        /// 设置查询需要返回哪些关联表。
        /// </summary>
        /// <param name="tabs"></param>
        private void queryConfig(params string[] tabs)
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
                    dl.LoadWith<DTO.Tab_Excel_ZhengShu>(tab => tab.Tab_Excel_Company_User_ZhuanYe);
                }
                dataContext.LoadOptions = dl;
            }
        }

        public Tab_Excel_ZhengShu getByName(string name, params string[] tabs)
        {
            queryConfig(tabs);
            return dataContext.Tab_Excel_ZhengShu.FirstOrDefault(ins => ins.ezs_Name.Trim() == name.Trim());
        }
        /// <summary>
        /// 删除未使用的证书
        /// </summary>
        /// <returns></returns>
        public int delNoUseZhengShu() { 
            queryConfig(new string[]{"Tab_Excel_Company_User_ZhuanYe"});
            int[] ids= this.dataContext.Tab_Excel_ZhengShu.Where(p => p.Tab_Excel_Company_User_ZhuanYe.Count == 0).Select(p=>p.ezs_ID).Distinct().ToArray();
            return Deletes(ids);
        }

        public List<Tab_Excel_ZhengShu> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return dataContext.Tab_Excel_ZhengShu.ToList();
        }
    }
}
