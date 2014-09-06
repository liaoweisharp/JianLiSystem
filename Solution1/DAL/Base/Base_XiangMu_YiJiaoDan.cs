using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_XiangMu_YiJiaoDan:Base
    {
        public Tab_XiangMu_YiJiaoDan Save(Tab_XiangMu_YiJiaoDan ins)
        {
            return base.Save<Tab_XiangMu_YiJiaoDan>(ins);
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
                if (tabs.Contains("Tab_XiangMu_JiBie"))
                {
                    dl.LoadWith<DTO.Tab_XiangMu_YiJiaoDan>(tab => tab.Tab_XiangMu_JiBie);
                }
                if (tabs.Contains("Tab_XiangMu_YiJiaoMingXi"))
                {
                    dl.LoadWith<DTO.Tab_XiangMu_YiJiaoDan>(tab => tab.Tab_XiangMu_YiJiaoMingXi);
                }

                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_XiangMu_YiJiaoDan[] objs)
        {
            int returnValue = 0;
            Tab_XiangMu_YiJiaoDan[] query = (from i in this.dataContext.Tab_XiangMu_YiJiaoDan where objs.Select(ins => ins.yjd_Id).Contains(i.yjd_Id) select i).ToArray();
            foreach (Tab_XiangMu_YiJiaoDan q in query)
            {
                Tab_XiangMu_YiJiaoDan item = objs.FirstOrDefault(ins => ins.yjd_Id == q.yjd_Id);
                this.CopyObjectPoperty<Tab_XiangMu_YiJiaoDan, Tab_XiangMu_YiJiaoDan>(item, q);
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
            var query = from i in this.dataContext.Tab_XiangMu_YiJiaoDan where ids.Contains(i.yjd_Id) select i;
            this.dataContext.Tab_XiangMu_YiJiaoDan.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_XiangMu_YiJiaoDan> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMu_YiJiaoDan.ToList();
        }



        public List<Tab_XiangMu_YiJiaoDan> getByLeiBieId(byte leiBieId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMu_YiJiaoDan.Where(p => p.yjd_LieBie == leiBieId).ToList();
        }
    }
}
