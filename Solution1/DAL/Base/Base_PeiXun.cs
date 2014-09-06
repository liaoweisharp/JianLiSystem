using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_PeiXun:Base
    {
        public DTO.Tab_RL_PeiXun getById(int Id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_PeiXun.FirstOrDefault(ins=>ins.rl_px_Id==Id);
        }
        public Tab_RL_PeiXun Save(Tab_RL_PeiXun ins)
        {
            return base.Save<Tab_RL_PeiXun>(ins);
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
                if (tabs.Contains("Tab_RL_PeiXun_LeiBie"))
                {
                    dl.LoadWith<DTO.Tab_RL_PeiXun>(tab => tab.Tab_RL_PeiXun_LeiBie);
                }
                if (tabs.Contains("Tab_RL_PeiXun_XingZhi"))
                {
                    dl.LoadWith<DTO.Tab_RL_PeiXun>(tab => tab.Tab_RL_PeiXun_XingZhi);
                }
                if (tabs.Contains("Tab_RL_User"))
                {
                    dl.LoadWith<DTO.Tab_RL_PeiXun>(tab => tab.Tab_RL_User);
                }
                if (tabs.Contains("Tab_BuMen"))
                {
                    dl.LoadWith<DTO.Tab_RL_PeiXun>(tab => tab.Tab_BuMen);
                }
                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_RL_PeiXun[] objs)
        {
            int returnValue = 0;
            Tab_RL_PeiXun[] query = (from i in this.dataContext.Tab_RL_PeiXun where objs.Select(ins => ins.rl_px_Id).Contains(i.rl_px_Id) select i).ToArray();
            foreach (Tab_RL_PeiXun q in query)
            {
                Tab_RL_PeiXun item = objs.FirstOrDefault(ins => ins.rl_px_Id == q.rl_px_Id);
                this.CopyObjectPoperty<Tab_RL_PeiXun, Tab_RL_PeiXun>(item, q);
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
            var query = from i in this.dataContext.Tab_RL_PeiXun where ids.Contains(i.rl_px_Id) select i;
            this.dataContext.Tab_RL_PeiXun.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_RL_PeiXun> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_PeiXun.ToList();
        }

        public List<Tab_RL_PeiXun> getByUserId(int userId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_PeiXun.Where(p=>p.rl_px_UserId==userId).ToList();
        }

        public List<DTO.Tab_RL_PeiXun_LeiBie> listPXLB() {
            return this.dataContext.Tab_RL_PeiXun_LeiBie.ToList();
        }
        public List<DTO.Tab_RL_PeiXun_XingZhi> listPXXZ()
        {
            return this.dataContext.Tab_RL_PeiXun_XingZhi.ToList();
        }
        public List<DTO.Tab_BuMen> listBM()
        {
            return this.dataContext.Tab_BuMen.ToList();
        }
    }
}
