using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_XiangMu_ShiJian : Base
    {

        public Tab_XiangMu_ShiJian Save(Tab_XiangMu_ShiJian ins)
        {
            return base.Save<Tab_XiangMu_ShiJian>(ins);
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
                    dl.LoadWith<DTO.Tab_XiangMu_ShiJian>(tab => tab.TabXiangMuQianQi);
                }


                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_XiangMu_ShiJian[] objs)
        {
            int returnValue = 0;
            Tab_XiangMu_ShiJian[] query = (from i in this.dataContext.Tab_XiangMu_ShiJian where objs.Select(ins => ins.sj_Id).Contains(i.sj_Id) select i).ToArray();
            foreach (Tab_XiangMu_ShiJian q in query)
            {
                Tab_XiangMu_ShiJian item = objs.FirstOrDefault(ins => ins.sj_Id == q.sj_Id);
                this.CopyObjectPoperty<Tab_XiangMu_ShiJian, Tab_XiangMu_ShiJian>(item, q);
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
            var query = from i in this.dataContext.Tab_XiangMu_ShiJian where ids.Contains(i.sj_Id) select i;
            this.dataContext.Tab_XiangMu_ShiJian.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_XiangMu_ShiJian> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMu_ShiJian.ToList();
        }



        public List<Tab_XiangMu_ShiJian> getByProjectId(int projectId,params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMu_ShiJian.Where(p=>p.sj_XiangMuId==projectId).ToList();
        }
    }
}
