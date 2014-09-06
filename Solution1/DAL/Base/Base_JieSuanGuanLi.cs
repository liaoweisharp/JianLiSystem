using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_JieSuanGuanLi:Base
    {
        /// <summary>
        /// 保存一个对象
        /// </summary>
        /// <param name="ht"></param>
        /// <returns></returns>
        public DTO.TabJieSuanGuanLi Save(DTO.TabJieSuanGuanLi obj)
        {
            return this.Save<DTO.TabJieSuanGuanLi>(obj);
        }
        public int Updates(TabJieSuanGuanLi[] objs)
        {
            int returnValue = 0;
            TabJieSuanGuanLi[] query = (from i in this.dataContext.TabJieSuanGuanLi where objs.Select(ins => ins.js_Id).Contains(i.js_Id) select i).ToArray();
            foreach (TabJieSuanGuanLi q in query)
            {
                TabJieSuanGuanLi item = objs.FirstOrDefault(ins => ins.js_Id == q.js_Id);
                this.CopyObjectPoperty<TabJieSuanGuanLi, TabJieSuanGuanLi>(item, q);
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
            var query = from i in this.dataContext.TabJieSuanGuanLi where ids.Contains(i.js_Id) select i;
            this.dataContext.TabJieSuanGuanLi.DeleteAllOnSubmit(query);
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

        public DTO.TabJieSuanGuanLi getById(int htId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.TabJieSuanGuanLi.FirstOrDefault(ins => ins.js_Id == htId);
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
                if (tabs.Contains("TabHeTong"))
                {
                    dl.LoadWith<DTO.TabJieSuanGuanLi>(tab => tab.TabHeTong);
                }
                this.dataContext.LoadOptions = dl;
            }
        }
    }
}
