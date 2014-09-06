using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_XinChou:Base
    {
        public Tab_RL_XinChou getById(int Id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_XinChou.FirstOrDefault(ins=>ins.xc_Id==Id);
        }
        public Tab_RL_XinChou Save(Tab_RL_XinChou ins)
        {
            ins.xc_YK_GeShui = Logic.Logic_Comm.getSuoDeShui(ins);
            return base.Save<Tab_RL_XinChou>(ins);
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
                    dl.LoadWith<DTO.Tab_RL_XinChou>(tab => tab.Tab_RL_User);
                }
                if (tabs.Contains("Tab_RL_XinChou_JieSuan"))
                {
                    dl.LoadWith<DTO.Tab_RL_XinChou>(tab => tab.Tab_RL_XinChou_JieSuan);
                }
                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_RL_XinChou[] objs)
        {
            int returnValue = 0;
            foreach (Tab_RL_XinChou obj in objs) {
                obj.xc_YK_GeShui = Logic.Logic_Comm.getSuoDeShui(obj);
            }
            Tab_RL_XinChou[] query = (from i in this.dataContext.Tab_RL_XinChou where objs.Select(ins => ins.xc_Id).Contains(i.xc_Id) select i).ToArray();
            foreach (Tab_RL_XinChou q in query)
            {
                Tab_RL_XinChou item = objs.FirstOrDefault(ins => ins.xc_Id == q.xc_Id);
                this.CopyObjectPoperty<Tab_RL_XinChou, Tab_RL_XinChou>(item, q);
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
            var query = from i in this.dataContext.Tab_RL_XinChou where ids.Contains(i.xc_Id) select i;
            this.dataContext.Tab_RL_XinChou.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_RL_XinChou> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_XinChou.ToList();
        }

        public List<Tab_RL_XinChou> getByUserId(int userId,params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_XinChou.Where(p => p.xc_UserId == userId).ToList();
        }
        /// <summary>
        /// 得到没有重复的调整原因
        /// </summary>
        /// <returns></returns>
        public string[] listTZYY() {
            return this.dataContext.Tab_RL_XinChou.Select(p => p.xc_YuanYin.Trim()).Distinct().ToArray();
        }

        public bool Delete(int id)
        {
            bool status = false;
            Tab_RL_XinChou ins= this.dataContext.Tab_RL_XinChou.FirstOrDefault(p => p.xc_Id == id);
            this.dataContext.Tab_RL_XinChou.DeleteOnSubmit(ins);
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
        /// <summary>
        /// 返回最近的一次记录，没有返回null
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public Tab_RL_XinChou getLastRecordXinChou(int userId)
        {
            return this.dataContext.Tab_RL_XinChou.Where(p=>p.xc_UserId==userId).OrderByDescending(p => p.xc_TiaoZhengShijian).FirstOrDefault();
        }

        public bool Update(Tab_RL_XinChou obj)
        {
            bool returnValue = false;
            //算个税

            obj.xc_YK_GeShui= Logic.Logic_Comm.getSuoDeShui(obj);

            Tab_RL_XinChou _obj = this.dataContext.Tab_RL_XinChou.FirstOrDefault(p => p.xc_Id == obj.xc_Id);
           
                this.CopyObjectPoperty<Tab_RL_XinChou, Tab_RL_XinChou>(obj, _obj);
  
            try
            {
                this.dataContext.SubmitChanges();
                returnValue =true;
            }
            catch
            {
                returnValue = false;
            }
            return returnValue;
        }
    }
}
