using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_User_XueLi:Base
    {
        public DTO.Tab_User_XueLi getById(int userId,byte xueLiId,string zhuanYe, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_User_XueLi.FirstOrDefault(p => p.ux_UserId == userId && p.ux_XueLiId == xueLiId && p.ux_ZhuanYe == zhuanYe.Trim());
        }
        public Tab_User_XueLi Save(Tab_User_XueLi ins)
        {
            return base.Save<Tab_User_XueLi>(ins);
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
                    dl.LoadWith<DTO.Tab_User_XueLi>(tab => tab.Tab_RL_User);
                }
                if (tabs.Contains("Tab_RL_XueLi"))
                {
                    dl.LoadWith<DTO.Tab_User_XueLi>(tab => tab.Tab_RL_XueLi);
                }
                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_User_XueLi[] objs)
        {
            int returnValue = 0;
            var query = from i in this.dataContext.Tab_User_XueLi
                                               join o in objs on new { ux_UserId = i.ux_UserId, ux_XueLiId = i.ux_XueLiId, ux_ZhuanYe = i.ux_ZhuanYe }
                                               equals new { ux_UserId = o.ux_UserId, ux_XueLiId = o.ux_XueLiId, ux_ZhuanYe = o.ux_ZhuanYe } into tempList
                                               select i;
            
            foreach (Tab_User_XueLi q in query)
            {
                Tab_User_XueLi item = objs.FirstOrDefault(p => p.ux_UserId == q.ux_UserId && p.ux_XueLiId == q.ux_XueLiId && p.ux_ZhuanYe == q.ux_ZhuanYe.Trim());
                this.CopyObjectPoperty<Tab_User_XueLi, Tab_User_XueLi>(item, q);
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
        public int Update(Tab_User_XueLi obj)
        {
            int returnValue = 0;
            Tab_User_XueLi ins = this.dataContext.Tab_User_XueLi.FirstOrDefault(p =>p.ux_Id==obj.ux_Id);
            if (ins == null) {
                returnValue= 0;
            }
            this.CopyObjectPoperty<Tab_User_XueLi, Tab_User_XueLi>(obj, ins);
            try
            {
                this.dataContext.SubmitChanges();
                returnValue = 1;
            }
            catch
            {
                returnValue = 0;
            }
            return returnValue;
        }
        public int Deletes(Tab_User_XueLi[] objs)
        {
            IQueryable<Tab_User_XueLi> query = (from i in this.dataContext.Tab_User_XueLi
                                                join o in objs on new { i.ux_UserId, i.ux_XueLiId, i.ux_ZhuanYe } equals new { o.ux_UserId, o.ux_XueLiId, o.ux_ZhuanYe }
                                                select i);
            this.dataContext.Tab_User_XueLi.DeleteAllOnSubmit(query);
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
        public bool Delete(int userId,byte xueLiId,string zhuanYe)
        {
            bool status = false;
            Tab_User_XueLi ins= this.dataContext.Tab_User_XueLi.FirstOrDefault(p => p.ux_UserId == userId && p.ux_XueLiId == xueLiId && p.ux_ZhuanYe == zhuanYe);
            this.dataContext.Tab_User_XueLi.DeleteOnSubmit(ins);
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
            Tab_User_XueLi ins = this.dataContext.Tab_User_XueLi.FirstOrDefault(p =>p.ux_Id==id);
            this.dataContext.Tab_User_XueLi.DeleteOnSubmit(ins);
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
        public List<DTO.Tab_User_XueLi> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_User_XueLi.ToList();
        }

        public List<Tab_User_XueLi> getByUserId(int userId,params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_User_XueLi.Where(p => p.ux_UserId == userId).ToList();
        }

        public List<Tab_RL_XueLi> listXueList(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_XueLi.OrderBy(p => p.xl_CengCi).ToList();//升序
        }
    }
}
