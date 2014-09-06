using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_HeTongVice:Base
    {
        /// <summary>
        /// 保存一个对象
        /// </summary>
        /// <param name="ht"></param>
        /// <returns></returns>
        public DTO.TabHeTongVice Save(DTO.TabHeTongVice htv)
        {
            return this.Save<DTO.TabHeTongVice>(htv);
        }
        public int Updates(TabHeTongVice[] objs)
        {
            int returnValue = 0;
            TabHeTongVice[] query = (from i in this.dataContext.TabHeTongVice where objs.Select(ins => ins.htv_Id).Contains(i.htv_Id) select i).ToArray();
            foreach (TabHeTongVice q in query)
            {
                TabHeTongVice item = objs.FirstOrDefault(ins => ins.htv_Id == q.htv_Id);
                this.CopyObjectPoperty<TabHeTongVice, TabHeTongVice>(item, q);
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
            var query = from i in this.dataContext.TabHeTongVice where ids.Contains(i.htv_Id) select i;
            this.dataContext.TabHeTongVice.DeleteAllOnSubmit(query);
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

        public DTO.TabHeTongVice getById(int htId,params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.TabHeTongVice.FirstOrDefault(ins => ins.htv_Id == htId);
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
                if (tabs.Contains("Tab_HTV_GuiDangQingKuang"))
                {
                    dl.LoadWith<DTO.TabHeTongVice>(tab => tab.Tab_HTV_GuiDangQingKuang);
                }
                if (tabs.Contains("TabHeTong"))
                {
                    dl.LoadWith<DTO.TabHeTongVice>(tab => tab.TabHeTong);
                }

                this.dataContext.LoadOptions = dl;
            }
        }

        public object getAll()
        {
            return this.dataContext.TabHeTongVice.ToList();
        }
    }
}
