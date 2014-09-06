using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_XiangMu_BaoXiao:Base
    {
        public Tab_XiangMu_BaoXiao Save(Tab_XiangMu_BaoXiao ins)
        {
            return base.Save<Tab_XiangMu_BaoXiao>(ins);
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
                    dl.LoadWith<DTO.Tab_XiangMu_BaoXiao>(tab => tab.TabXiangMuQianQi);
                }


                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_XiangMu_BaoXiao[] objs)
        {
            int returnValue = 0;
            Tab_XiangMu_BaoXiao[] query = (from i in this.dataContext.Tab_XiangMu_BaoXiao where objs.Select(ins => ins.bx_Id).Contains(i.bx_Id) select i).ToArray();
            foreach (Tab_XiangMu_BaoXiao q in query)
            {
                Tab_XiangMu_BaoXiao item = objs.FirstOrDefault(ins => ins.bx_Id == q.bx_Id);
                this.CopyObjectPoperty<Tab_XiangMu_BaoXiao, Tab_XiangMu_BaoXiao>(item, q);
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
            var query = from i in this.dataContext.Tab_XiangMu_BaoXiao where ids.Contains(i.bx_Id) select i;
            this.dataContext.Tab_XiangMu_BaoXiao.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_XiangMu_BaoXiao> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMu_BaoXiao.ToList();
        }



        public List<Tab_XiangMu_BaoXiao> getByProjectId(int projectId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMu_BaoXiao.Where(p => p.bx_XiangMuId == projectId).ToList();
        }

        public bool Update(Tab_XiangMu_BaoXiao obj)
        {
            return this.Updates(new Tab_XiangMu_BaoXiao[] { obj }) == 1 ? true : false;
        }
    }
}
