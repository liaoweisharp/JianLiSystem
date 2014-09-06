using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_XiangMu_BanGongYongPin:Base
    {
        public Tab_XiangMu_BanGongYongPin Save(Tab_XiangMu_BanGongYongPin ins)
        {
            return base.Save<Tab_XiangMu_BanGongYongPin>(ins);
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
                    dl.LoadWith<DTO.Tab_XiangMu_BanGongYongPin>(tab => tab.TabXiangMuQianQi);
                }


                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_XiangMu_BanGongYongPin[] objs)
        {
            int returnValue = 0;
            Tab_XiangMu_BanGongYongPin[] query = (from i in this.dataContext.Tab_XiangMu_BanGongYongPin where objs.Select(ins => ins.bgyp_Id).Contains(i.bgyp_Id) select i).ToArray();
            foreach (Tab_XiangMu_BanGongYongPin q in query)
            {
                Tab_XiangMu_BanGongYongPin item = objs.FirstOrDefault(ins => ins.bgyp_Id == q.bgyp_Id);
                this.CopyObjectPoperty<Tab_XiangMu_BanGongYongPin, Tab_XiangMu_BanGongYongPin>(item, q);
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
            var query = from i in this.dataContext.Tab_XiangMu_BanGongYongPin where ids.Contains(i.bgyp_Id) select i;
            this.dataContext.Tab_XiangMu_BanGongYongPin.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_XiangMu_BanGongYongPin> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMu_BanGongYongPin.ToList();
        }



        public List<Tab_XiangMu_BanGongYongPin> getByProjectId(int projectId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMu_BanGongYongPin.Where(p => p.bgyp_XiangMuId == projectId).ToList();
        }

        public bool Update(Tab_XiangMu_BanGongYongPin obj)
        {
            return this.Updates(new Tab_XiangMu_BanGongYongPin[] { obj }) == 1 ? true : false;
        }
    }
}
