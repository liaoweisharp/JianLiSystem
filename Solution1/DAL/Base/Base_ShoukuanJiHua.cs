using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Linq;
using DAL.DTO;
namespace DAL
{
    public class Base_ShoukuanJiHua:Base
    {
        public List<DTO.TabShouKuanJiHua> getByhtId(int htId, params string[] tabs) { 
            queryConfig(tabs);
            return this.dataContext.TabShouKuanJiHua.Where(ins => ins.jh_htId == htId).ToList();
        }
        public TabShouKuanJiHua Save(TabShouKuanJiHua ins)
        {
            return base.Save<TabShouKuanJiHua>(ins);
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
                    dl.LoadWith<DTO.TabFaPiaoJiShouKuanGuanLi>(tab => tab.TabHeTong);
                }
                if (tabs.Contains("TabHeTongBianGeng"))
                {
                    dl.LoadWith<DTO.TabFaPiaoJiShouKuanGuanLi>(tab => tab.TabHeTongBianGeng);
                }
                if (tabs.Contains("Tab_FP_KuanXiangXingZhi"))
                {
                    dl.LoadWith<DTO.TabFaPiaoJiShouKuanGuanLi>(tab => tab.Tab_FP_KuanXiangXingZhi);
                }
                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(TabShouKuanJiHua[] objs)
        {
            int returnValue = 0;
            TabShouKuanJiHua[] query = (from i in this.dataContext.TabShouKuanJiHua where objs.Select(ins => ins.jh_Id).Contains(i.jh_Id) select i).ToArray();
            foreach (TabShouKuanJiHua q in query)
            {
                TabShouKuanJiHua item = objs.FirstOrDefault(ins => ins.jh_Id == q.jh_Id);
                this.CopyObjectPoperty<TabShouKuanJiHua, TabShouKuanJiHua>(item, q);
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
            var query = from i in this.dataContext.TabShouKuanJiHua where ids.Contains(i.jh_Id) select i;
            this.dataContext.TabShouKuanJiHua.DeleteAllOnSubmit(query);
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

        public List<DTO.TabShouKuanJiHua> getAll()
        {
            return this.dataContext.TabShouKuanJiHua.ToList();
        }

       
    }
}
