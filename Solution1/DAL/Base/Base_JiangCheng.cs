using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Linq;
using DAL.DTO;

namespace DAL
{
    public class Base_JiangCheng:Base
    {
        public DTO.Tab_RL_JiangCheng getById(int Id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_JiangCheng.FirstOrDefault(ins=>ins.rl_jc_Id==Id);
        }
        public Tab_RL_JiangCheng Save(Tab_RL_JiangCheng ins)
        {
            return base.Save<Tab_RL_JiangCheng>(ins);
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
                if (tabs.Contains("Tab_RL_User"))
                {
                    dl.LoadWith<DTO.Tab_RL_JiangCheng>(tab => tab.Tab_RL_User);
                }
                

                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_RL_JiangCheng[] objs)
        {
            int returnValue = 0;
            Tab_RL_JiangCheng[] query = (from i in this.dataContext.Tab_RL_JiangCheng where objs.Select(ins => ins.rl_jc_Id).Contains(i.rl_jc_Id) select i).ToArray();
            foreach (Tab_RL_JiangCheng q in query)
            {
                Tab_RL_JiangCheng item = objs.FirstOrDefault(ins => ins.rl_jc_Id == q.rl_jc_Id);
                this.CopyObjectPoperty<Tab_RL_JiangCheng, Tab_RL_JiangCheng>(item, q);
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
            var query = from i in this.dataContext.Tab_RL_JiangCheng where ids.Contains(i.rl_jc_Id) select i;
            this.dataContext.Tab_RL_JiangCheng.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_RL_JiangCheng> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_JiangCheng.ToList();
        }

        public List<Tab_RL_JiangCheng> getByUserId(int userId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_JiangCheng.Where(p=>p.rl_jc_UserId==userId).ToList();
        }
    }
}
