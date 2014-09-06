using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_JingLi:Base
    {
        public Tab_RL_User_JingLi getById(int Id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_User_JingLi.FirstOrDefault(ins => ins.rl_jl_Id == Id);
        }
        public Tab_RL_User_JingLi Save(Tab_RL_User_JingLi ins)
        {
            return base.Save<Tab_RL_User_JingLi>(ins);
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
                    dl.LoadWith<DTO.Tab_RL_User_JingLi>(tab => tab.Tab_RL_User);
                }
                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_RL_User_JingLi[] objs)
        {
            int returnValue = 0;
            Tab_RL_User_JingLi[] query = (from i in this.dataContext.Tab_RL_User_JingLi where objs.Select(ins => ins.rl_jl_Id).Contains(i.rl_jl_Id) select i).ToArray();
            foreach (Tab_RL_User_JingLi q in query)
            {
                Tab_RL_User_JingLi item = objs.FirstOrDefault(ins => ins.rl_jl_Id == q.rl_jl_Id);
                this.CopyObjectPoperty<Tab_RL_User_JingLi, Tab_RL_User_JingLi>(item, q);
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
            var query = from i in this.dataContext.Tab_RL_User_JingLi where ids.Contains(i.rl_jl_Id) select i;
            this.dataContext.Tab_RL_User_JingLi.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_RL_User_JingLi> getAll()
        {
            return this.dataContext.Tab_RL_User_JingLi.ToList();
        }

        public List<Tab_RL_User_JingLi> getByUserIdAndType(int userId, int type)
        {
            return this.dataContext.Tab_RL_User_JingLi.Where(p=>p.rl_jl_UserId==userId && p.rl_jl_TypeId==(byte)type).ToList();
        }
    }
}
