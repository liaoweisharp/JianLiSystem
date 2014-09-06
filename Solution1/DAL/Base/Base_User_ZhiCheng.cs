using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_User_ZhiCheng:Base
    {
        public DTO.Tab_User_ZhiCheng getById(int userId, byte zhiChengId, string zhuanYe, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_User_ZhiCheng.FirstOrDefault(p => p.uz_UserId == userId && p.uz_ZhiChengId == zhiChengId && p.uz_ZhiChengZhuanYe == zhuanYe.Trim());
        }
        public Tab_User_ZhiCheng Save(Tab_User_ZhiCheng ins)
        {
            return base.Save<Tab_User_ZhiCheng>(ins);
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
                if (tabs.Contains("Tab_RL_JiShuZhiCheng"))
                {
                    dl.LoadWith<DTO.Tab_User_ZhiCheng>(tab => tab.Tab_RL_JiShuZhiCheng);
                }
                if (tabs.Contains("Tab_RL_User"))
                {
                    dl.LoadWith<DTO.Tab_User_ZhiCheng>(tab => tab.Tab_RL_User);
                }
                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_User_ZhiCheng[] objs)
        {
            int returnValue = 0;
            IQueryable<Tab_User_ZhiCheng> query = (from i in this.dataContext.Tab_User_ZhiCheng
                                                join o in objs on new { i.uz_UserId, i.uz_ZhiChengId, i.uz_ZhiChengZhuanYe } equals new { o.uz_UserId, o.uz_ZhiChengId, o.uz_ZhiChengZhuanYe }
                                                select i);
            foreach (Tab_User_ZhiCheng q in query)
            {
                Tab_User_ZhiCheng item = objs.FirstOrDefault(p => p.uz_UserId == q.uz_UserId && p.uz_ZhiChengId == q.uz_ZhiChengId && p.uz_ZhiChengZhuanYe == q.uz_ZhiChengZhuanYe.Trim());
                this.CopyObjectPoperty<Tab_User_ZhiCheng, Tab_User_ZhiCheng>(item, q);
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
        public int Update(Tab_User_ZhiCheng obj)
        {
            int status = 0;
            Tab_User_ZhiCheng ins=this.dataContext.Tab_User_ZhiCheng.FirstOrDefault(p =>p.uz_Id==obj.uz_Id);
            if (ins == null)
            {
                return status;
            }
            this.CopyObjectPoperty<Tab_User_ZhiCheng, Tab_User_ZhiCheng>(obj, ins);
            try
            {
                this.dataContext.SubmitChanges();
                status = 1;
            }
            catch
            {
                status = 0;
            }
            return status;
        }

        public int Deletes(Tab_User_ZhiCheng[] objs)
        {
            IQueryable<Tab_User_ZhiCheng> query = (from i in this.dataContext.Tab_User_ZhiCheng
                                                join o in objs on new { i.uz_UserId, i.uz_ZhiChengId, i.uz_ZhiChengZhuanYe } equals new { o.uz_UserId, o.uz_ZhiChengId, o.uz_ZhiChengZhuanYe }
                                                select i);
            this.dataContext.Tab_User_ZhiCheng.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_User_ZhiCheng> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_User_ZhiCheng.ToList();
        }

        public List<Tab_User_ZhiCheng> getByUserId(int userId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_User_ZhiCheng.Where(p => p.uz_UserId == userId).ToList();
        }

        public bool Delete(int userId, byte zhiChengId, string zhuanYe)
        {
            bool status = false;
            Tab_User_ZhiCheng ins = this.dataContext.Tab_User_ZhiCheng.FirstOrDefault(p => p.uz_UserId == userId && p.uz_ZhiChengId == zhiChengId && p.uz_ZhiChengZhuanYe == zhuanYe);
            this.dataContext.Tab_User_ZhiCheng.DeleteOnSubmit(ins);
            try
            {
                this.dataContext.SubmitChanges();
                status = true;
            }
            catch
            {
                status = false;
            }
            return status;
        }
        public bool Delete(int id)
        {
            bool status = false;
            Tab_User_ZhiCheng ins = this.dataContext.Tab_User_ZhiCheng.FirstOrDefault(p => p.uz_Id==id);
            this.dataContext.Tab_User_ZhiCheng.DeleteOnSubmit(ins);
            try
            {
                this.dataContext.SubmitChanges();
                status = true;
            }
            catch
            {
                status = false;
            }
            return status;
        }

        public List<DTO.Tab_RL_JiShuZhiCheng> listZhiCheng(params string[] tabs) {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_JiShuZhiCheng.OrderBy(p=>p.zc_CengCi).ToList();
        }
    }
}
