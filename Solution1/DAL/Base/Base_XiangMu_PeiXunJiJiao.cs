using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_XiangMu_PeiXunJiJiao:Base
    {
        public Tab_XiangMu_PeiXunJiJiao Save(Tab_XiangMu_PeiXunJiJiao ins)
        {
            return base.Save<Tab_XiangMu_PeiXunJiJiao>(ins);
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
                    dl.LoadWith<DTO.Tab_XiangMu_PeiXunJiJiao>(tab => tab.TabXiangMuQianQi);
                }


                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_XiangMu_PeiXunJiJiao[] objs)
        {
            int returnValue = 0;
            Tab_XiangMu_PeiXunJiJiao[] query = (from i in this.dataContext.Tab_XiangMu_PeiXunJiJiao where objs.Select(ins => ins.pxjj_Id).Contains(i.pxjj_Id) select i).ToArray();
            foreach (Tab_XiangMu_PeiXunJiJiao q in query)
            {
                Tab_XiangMu_PeiXunJiJiao item = objs.FirstOrDefault(ins => ins.pxjj_Id == q.pxjj_Id);
                this.CopyObjectPoperty<Tab_XiangMu_PeiXunJiJiao, Tab_XiangMu_PeiXunJiJiao>(item, q);
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
            var query = from i in this.dataContext.Tab_XiangMu_PeiXunJiJiao where ids.Contains(i.pxjj_Id) select i;
            this.dataContext.Tab_XiangMu_PeiXunJiJiao.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_XiangMu_PeiXunJiJiao> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMu_PeiXunJiJiao.ToList();
        }



        public List<Tab_XiangMu_PeiXunJiJiao> getByProjectId(int projectId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMu_PeiXunJiJiao.Where(p => p.pxjj_XiangMuId == projectId).ToList();
        }

        public bool Update(Tab_XiangMu_PeiXunJiJiao obj)
        {
            return this.Updates(new Tab_XiangMu_PeiXunJiJiao[] { obj })==1?true:false;
        }
    }
}
