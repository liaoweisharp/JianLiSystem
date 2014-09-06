using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_XinChou_KouKuanJiangLi:Base
    {
        public Tab_RL_XinChou_KouKuanJiangLi getById(int id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_XinChou_KouKuanJiangLi.FirstOrDefault(p =>p.kkjl_Id==id);
        }
        public Tab_RL_XinChou_KouKuanJiangLi Save(Tab_RL_XinChou_KouKuanJiangLi ins)
        {
            return base.Save<Tab_RL_XinChou_KouKuanJiangLi>(ins);
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
                    dl.LoadWith<DTO.Tab_RL_XinChou_KouKuanJiangLi>(tab => tab.Tab_RL_User);
                }
                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_RL_XinChou_KouKuanJiangLi[] objs)
        {
            int returnValue = 0;
            Tab_RL_XinChou_KouKuanJiangLi[] query = (from i in this.dataContext.Tab_RL_XinChou_KouKuanJiangLi where objs.Select(ins => ins.kkjl_Id).Contains(i.kkjl_Id) select i).ToArray();
            foreach (Tab_RL_XinChou_KouKuanJiangLi q in query)
            {
                Tab_RL_XinChou_KouKuanJiangLi item = objs.FirstOrDefault(ins => ins.kkjl_Id == q.kkjl_Id);
                this.CopyObjectPoperty<Tab_RL_XinChou_KouKuanJiangLi, Tab_RL_XinChou_KouKuanJiangLi>(item, q);
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
        public bool Update(Tab_RL_XinChou_KouKuanJiangLi obj)
        {
            return this.Updates(new Tab_RL_XinChou_KouKuanJiangLi[]{obj}) == 1 ? true : false;
        }
        public int Deletes(int[] ids)
        {
            var query = from i in this.dataContext.Tab_RL_XinChou_KouKuanJiangLi where ids.Contains(i.kkjl_Id) select i;
            this.dataContext.Tab_RL_XinChou_KouKuanJiangLi.DeleteAllOnSubmit(query);
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
    
       

        public List<Tab_RL_XinChou_KouKuanJiangLi> getByUserId(int userId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_XinChou_KouKuanJiangLi.Where(p => p.kkjl_UserId == userId).ToList();
        }

    }
}
