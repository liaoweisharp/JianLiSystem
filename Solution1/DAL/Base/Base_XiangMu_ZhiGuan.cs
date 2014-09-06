using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_XiangMu_ZhiGuan:Base
    {
        public Tab_XiangMu_ZhiGuan getById(int id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMu_ZhiGuan.FirstOrDefault(p => p.zg_Id == id);
        }
        public Tab_XiangMu_ZhiGuan Save(Tab_XiangMu_ZhiGuan ins)
        {
            return base.Save<Tab_XiangMu_ZhiGuan>(ins);
        }
        /// <summary>
        /// 设置查询需要返回哪些关联表。
        /// </summary>
        /// <param name="tabs"></param>
        private void queryConfig(params string[] tabs)
        {
            if (tabs.Length == 0)
            {
                this.dataContext.DeferredLoadingEnabled = false;
            }
            else
            {
                DataLoadOptions dl = new DataLoadOptions();
                if (tabs.Contains("TabXiangMuQianQi"))
                {
                    dl.LoadWith<DTO.Tab_XiangMu_ZhiGuan>(tab => tab.TabXiangMuQianQi);
                }
                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_XiangMu_ZhiGuan[] objs)
        {
            int returnValue = 0;
            Tab_XiangMu_ZhiGuan[] query = (from i in this.dataContext.Tab_XiangMu_ZhiGuan where objs.Select(ins => ins.zg_Id).Contains(i.zg_Id) select i).ToArray();
            foreach (Tab_XiangMu_ZhiGuan q in query)
            {
                Tab_XiangMu_ZhiGuan item = objs.FirstOrDefault(ins => ins.zg_Id == q.zg_Id);
                this.CopyObjectPoperty<Tab_XiangMu_ZhiGuan, Tab_XiangMu_ZhiGuan>(item, q);
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
            var query = from i in this.dataContext.Tab_XiangMu_ZhiGuan where ids.Contains(i.zg_Id) select i;
            this.dataContext.Tab_XiangMu_ZhiGuan.DeleteAllOnSubmit(query);
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


    }
}
