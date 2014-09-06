using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_XiangMu_FeiYongTaoZheng:Base
    {
        public Tab_XiangMu_FeiYongTiaoZheng Save(Tab_XiangMu_FeiYongTiaoZheng ins)
        {
            return base.Save<Tab_XiangMu_FeiYongTiaoZheng>(ins);
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
                if (tabs.Contains("TabXiangMuQianQi"))
                {
                    dl.LoadWith<DTO.Tab_XiangMu_FeiYongTiaoZheng>(tab => tab.TabXiangMuQianQi);
                }


                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_XiangMu_FeiYongTiaoZheng[] objs)
        {
            int returnValue = 0;
            Tab_XiangMu_FeiYongTiaoZheng[] query = (from i in this.dataContext.Tab_XiangMu_FeiYongTiaoZheng where objs.Select(ins => ins.fytz_Id).Contains(i.fytz_Id) select i).ToArray();
            foreach (Tab_XiangMu_FeiYongTiaoZheng q in query)
            {
                Tab_XiangMu_FeiYongTiaoZheng item = objs.FirstOrDefault(ins => ins.fytz_Id == q.fytz_Id);
                this.CopyObjectPoperty<Tab_XiangMu_FeiYongTiaoZheng, Tab_XiangMu_FeiYongTiaoZheng>(item, q);
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
            var query = from i in this.dataContext.Tab_XiangMu_FeiYongTiaoZheng where ids.Contains(i.fytz_Id) select i;
            this.dataContext.Tab_XiangMu_FeiYongTiaoZheng.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_XiangMu_FeiYongTiaoZheng> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMu_FeiYongTiaoZheng.ToList();
        }



        public List<Tab_XiangMu_FeiYongTiaoZheng> getByProjectId(int projectId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMu_FeiYongTiaoZheng.Where(p => p.fytz_XiangMuId == projectId).ToList();
        }

        public bool Update(Tab_XiangMu_FeiYongTiaoZheng obj)
        {
            return this.Updates(new Tab_XiangMu_FeiYongTiaoZheng[] { obj }) == 1 ? true : false;
        }
    }
}
