using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_XiangMu_XunJian:Base
    {
       
        public Tab_XiangMu_XunJian Save(Tab_XiangMu_XunJian ins)
        {
            return base.Save<Tab_XiangMu_XunJian>(ins);
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
                    dl.LoadWith<DTO.Tab_XiangMu_XunJian>(tab => tab.TabXiangMuQianQi);
                }
                if (tabs.Contains("Tab_RL_User"))
                {
                    dl.LoadWith<DTO.Tab_XiangMu_XunJian>(tab => tab.Tab_RL_User);
                }


                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_XiangMu_XunJian[] objs)
        {
            int returnValue = 0;
            Tab_XiangMu_XunJian[] query = (from i in this.dataContext.Tab_XiangMu_XunJian where objs.Select(ins => ins.xj_Id).Contains(i.xj_Id) select i).ToArray();
            foreach (Tab_XiangMu_XunJian q in query)
            {
                Tab_XiangMu_XunJian item = objs.FirstOrDefault(ins => ins.xj_Id == q.xj_Id);
                this.CopyObjectPoperty<Tab_XiangMu_XunJian, Tab_XiangMu_XunJian>(item, q);
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
            var query = from i in this.dataContext.Tab_XiangMu_XunJian where ids.Contains(i.xj_Id) select i;
            this.dataContext.Tab_XiangMu_XunJian.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_XiangMu_XunJian> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMu_XunJian.ToList();
        }



        public List<Tab_XiangMu_XunJian> getXunJianByProjectId(int projectId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMu_XunJian.Where(p => p.xj_XiangMuId == projectId).ToList();
        }
    }
}
