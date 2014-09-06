using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Linq;
using DAL.DTO;

namespace DAL
{
    public class Base_XinChou_QingJia:Base
    {
        public DTO.Tab_RL_QingJia getById(int Id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_QingJia.FirstOrDefault(ins => ins.qj_Id == Id);
        }
        public Tab_RL_QingJia Save(Tab_RL_QingJia ins)
        {
            return base.Save<Tab_RL_QingJia>(ins);
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
                    dl.LoadWith<DTO.Tab_RL_QingJia>(tab => tab.Tab_RL_User);
                }
                this.dataContext.LoadOptions = dl;
            }
        }
        public int Update(Tab_RL_QingJia obj)
        {
            return Updates(new Tab_RL_QingJia[] { obj });
        }
        public int Updates(Tab_RL_QingJia[] objs)
        {
            int returnValue = 0;
            Tab_RL_QingJia[] query = (from i in this.dataContext.Tab_RL_QingJia where objs.Select(ins => ins.qj_Id).Contains(i.qj_Id) select i).ToArray();
            foreach (Tab_RL_QingJia q in query)
            {
                Tab_RL_QingJia item = objs.FirstOrDefault(ins => ins.qj_Id == q.qj_Id);
                this.CopyObjectPoperty<Tab_RL_QingJia, Tab_RL_QingJia>(item, q);
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
            var query = from i in this.dataContext.Tab_RL_QingJia where ids.Contains(i.qj_Id) select i;
            this.dataContext.Tab_RL_QingJia.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_RL_QingJia> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_QingJia.ToList();
        }

        public List<Tab_RL_QingJia> getByUserId(int userId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_QingJia.Where(p => p.qj_UserId == userId).ToList();
        }

       
    }
}
