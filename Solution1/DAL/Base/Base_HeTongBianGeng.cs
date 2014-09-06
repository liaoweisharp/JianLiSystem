using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Linq;
using DAL.DTO;

namespace DAL
{
    public class Base_HeTongBianGeng:Base
    {
        public List<DTO.TabHeTongBianGeng> getByhtId(int htId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.TabHeTongBianGeng.Where(ins => ins.bg_htId == htId).ToList();
        }
        public TabHeTongBianGeng Save(TabHeTongBianGeng ins)
        {
            return base.Save<TabHeTongBianGeng>(ins);
        }
        public int Updates(TabHeTongBianGeng[] objs)
        {
            int returnValue = 0;
            TabHeTongBianGeng[] query = (from i in this.dataContext.TabHeTongBianGeng where objs.Select(ins => ins.bg_Id).Contains(i.bg_Id) select i).ToArray();
            foreach (TabHeTongBianGeng q in query)
            {
                TabHeTongBianGeng item = objs.FirstOrDefault(ins => ins.bg_Id == q.bg_Id);
                this.CopyObjectPoperty<TabHeTongBianGeng, TabHeTongBianGeng>(item, q);
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
            var query = from i in this.dataContext.TabHeTongBianGeng where ids.Contains(i.bg_Id) select i;
            this.dataContext.TabHeTongBianGeng.DeleteAllOnSubmit(query);
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
        private void queryConfig(params string[] tabs)
        {
            if (tabs.Length == 0)
            {
                this.dataContext.DeferredLoadingEnabled = false;
            }
            else
            {
                DataLoadOptions dl = new DataLoadOptions();
                //if (tabs.Contains("TabAddressBook"))
                //{
                //    dl.LoadWith<DTO.TabShoppingList>(tab => tab.TabAddressBook);
                //}

                this.dataContext.LoadOptions = dl;
            }
        }
    }
}
