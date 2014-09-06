using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_XiangMu_JiXiaoKaoHe:Base
    {
        public Tab_XiangMu_JiXiao Save(Tab_XiangMu_JiXiao ins)
        {
            return base.Save<Tab_XiangMu_JiXiao>(ins);
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
                    dl.LoadWith<DTO.Tab_XiangMu_JiXiao>(tab => tab.TabXiangMuQianQi);
                }


                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_XiangMu_JiXiao[] objs)
        {
            int returnValue = 0;
            Tab_XiangMu_JiXiao[] query = (from i in this.dataContext.Tab_XiangMu_JiXiao where objs.Select(ins => ins.jx_Id).Contains(i.jx_Id) select i).ToArray();
            foreach (Tab_XiangMu_JiXiao q in query)
            {
                Tab_XiangMu_JiXiao item = objs.FirstOrDefault(ins => ins.jx_Id == q.jx_Id);
                this.CopyObjectPoperty<Tab_XiangMu_JiXiao, Tab_XiangMu_JiXiao>(item, q);
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
            var query = from i in this.dataContext.Tab_XiangMu_JiXiao where ids.Contains(i.jx_Id) select i;
            this.dataContext.Tab_XiangMu_JiXiao.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_XiangMu_JiXiao> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMu_JiXiao.ToList();
        }



        public List<Tab_XiangMu_JiXiao> getByProjectId(int projectId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMu_JiXiao.Where(p => p.jx_XiangMuId == projectId).ToList();
        }

        public bool Update(Tab_XiangMu_JiXiao obj)
        {
            return this.Updates(new Tab_XiangMu_JiXiao[] { obj }) == 1 ? true : false;
        }
    }
}
