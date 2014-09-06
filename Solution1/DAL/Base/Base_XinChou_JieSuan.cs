using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_XinChou_JieSuan:Base
    {
        public Tab_RL_XinChou_JieSuan getById(int Id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_XinChou_JieSuan.FirstOrDefault(ins => ins.xcjs_Id == Id);
        }
        public Tab_RL_XinChou_JieSuan Save(Tab_RL_XinChou_JieSuan ins)
        {
            return base.Save<Tab_RL_XinChou_JieSuan>(ins);
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
                if (tabs.Contains("Tab_RL_XinChou"))
                {
                    dl.LoadWith<DTO.Tab_RL_XinChou_JieSuan>(tab => tab.Tab_RL_XinChou);
                }
                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_RL_XinChou_JieSuan[] objs)
        {
            int returnValue = 0;
            Tab_RL_XinChou_JieSuan[] query = (from i in this.dataContext.Tab_RL_XinChou_JieSuan where objs.Select(ins => ins.xcjs_Id).Contains(i.xcjs_Id) select i).ToArray();
            foreach (Tab_RL_XinChou_JieSuan q in query)
            {
                Tab_RL_XinChou_JieSuan item = objs.FirstOrDefault(ins => ins.xcjs_Id == q.xcjs_Id);
                this.CopyObjectPoperty<Tab_RL_XinChou_JieSuan, Tab_RL_XinChou_JieSuan>(item, q);
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
            var query = from i in this.dataContext.Tab_RL_XinChou_JieSuan where ids.Contains(i.xcjs_Id) select i;
            this.dataContext.Tab_RL_XinChou_JieSuan.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_RL_XinChou_JieSuan> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_XinChou_JieSuan.ToList();
        }

    
       

        public bool Delete(int id)
        {
            bool status = false;
            Tab_RL_XinChou_JieSuan ins = this.dataContext.Tab_RL_XinChou_JieSuan.FirstOrDefault(p => p.xcjs_Id == id);
            this.dataContext.Tab_RL_XinChou_JieSuan.DeleteOnSubmit(ins);
            if (ins != null)
            {
                try
                {
                    this.dataContext.SubmitChanges();
                    status = true;
                }
                catch
                {
                    status = false;
                }
            }
            return status;
        }


        public bool Update(Tab_RL_XinChou_JieSuan jieSuan)
        {
            bool returnValue = false;
            Tab_RL_XinChou_JieSuan _obj = this.dataContext.Tab_RL_XinChou_JieSuan.FirstOrDefault(p => p.xcjs_Id == jieSuan.xcjs_Id);

            this.CopyObjectPoperty<Tab_RL_XinChou_JieSuan, Tab_RL_XinChou_JieSuan>(jieSuan, _obj);

            try
            {
                this.dataContext.SubmitChanges();
                returnValue = true;
            }
            catch
            {
                returnValue = false;
            }
            return returnValue;
        }
    }
}
