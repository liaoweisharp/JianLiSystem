using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_User_ZhiYeZiGeZhengShu:Base
    {
        public Tab_RL_ZhiYeZiGeZhengShu getById(int Id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_ZhiYeZiGeZhengShu.FirstOrDefault(ins => ins.zgzs_Id == Id);
        }
        public Tab_RL_ZhiYeZiGeZhengShu Save(Tab_RL_ZhiYeZiGeZhengShu ins)
        {
            return base.Save<Tab_RL_ZhiYeZiGeZhengShu>(ins);
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
                    dl.LoadWith<DTO.Tab_RL_ZhiYeZiGeZhengShu>(tab => tab.Tab_RL_User);
                }
                if (tabs.Contains("Tab_RL_ZhiYeZiGeZhengShu_ZhuanYe"))
                {
                    dl.LoadWith<DTO.Tab_RL_ZhiYeZiGeZhengShu>(tab => tab.Tab_RL_ZhiYeZiGeZhengShu_ZhuanYe);
                }

                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_RL_ZhiYeZiGeZhengShu[] objs)
        {
            int returnValue = 0;
            Tab_RL_ZhiYeZiGeZhengShu[] query = (from i in this.dataContext.Tab_RL_ZhiYeZiGeZhengShu where objs.Select(ins => ins.zgzs_Id).Contains(i.zgzs_Id) select i).ToArray();
            foreach (Tab_RL_ZhiYeZiGeZhengShu q in query)
            {
                Tab_RL_ZhiYeZiGeZhengShu item = objs.FirstOrDefault(ins => ins.zgzs_Id == q.zgzs_Id);
                this.CopyObjectPoperty<Tab_RL_ZhiYeZiGeZhengShu, Tab_RL_ZhiYeZiGeZhengShu>(item, q);
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
            var query = from i in this.dataContext.Tab_RL_ZhiYeZiGeZhengShu where ids.Contains(i.zgzs_Id) select i;
            this.dataContext.Tab_RL_ZhiYeZiGeZhengShu.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_RL_ZhiYeZiGeZhengShu> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_ZhiYeZiGeZhengShu.ToList();
        }

        public List<Tab_RL_ZhiYeZiGeZhengShu> getByUserId(int userId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_ZhiYeZiGeZhengShu.Where(p => p.zgzs_UserId == userId).ToList();
        }
    }
}
