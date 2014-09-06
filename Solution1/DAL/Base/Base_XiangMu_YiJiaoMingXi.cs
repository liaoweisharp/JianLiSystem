using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_XiangMu_YiJiaoMingXi:Base
    {

        public List<Tab_XiangMu_YiJiaoMingXi> getByProjectId(int projectId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMu_YiJiaoMingXi.Where(p => p.mx_XiangMuId == projectId).ToList();
        }
        public Tab_XiangMu_YiJiaoMingXi Save(Tab_XiangMu_YiJiaoMingXi ins)
        {
            return base.Save<Tab_XiangMu_YiJiaoMingXi>(ins);
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
                    dl.LoadWith<DTO.Tab_XiangMu_YiJiaoMingXi>(tab => tab.TabXiangMuQianQi);
                }
                if (tabs.Contains("Tab_XiangMu_YiJiaoDan"))
                {
                    dl.LoadWith<DTO.Tab_XiangMu_YiJiaoMingXi>(tab => tab.Tab_XiangMu_YiJiaoDan);
                }
                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_XiangMu_YiJiaoMingXi[] objs)
        {
            int returnValue = 0;
            Tab_XiangMu_YiJiaoMingXi[] query = (from i in this.dataContext.Tab_XiangMu_YiJiaoMingXi where objs.Select(ins => ins.mx_Id).Contains(i.mx_Id) select i).ToArray();
            foreach (Tab_XiangMu_YiJiaoMingXi q in query)
            {
                Tab_XiangMu_YiJiaoMingXi item = objs.FirstOrDefault(ins => ins.mx_Id == q.mx_Id);
                this.CopyObjectPoperty<Tab_XiangMu_YiJiaoMingXi, Tab_XiangMu_YiJiaoMingXi>(item, q);
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
            var query = from i in this.dataContext.Tab_XiangMu_YiJiaoMingXi where ids.Contains(i.mx_Id) select i;
            this.dataContext.Tab_XiangMu_YiJiaoMingXi.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_XiangMu_YiJiaoMingXi> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMu_YiJiaoMingXi.ToList();
        }





        public List<Tab_XiangMu_YiJiaoMingXi> Saves(List<Tab_XiangMu_YiJiaoMingXi> mingXiArray)
        {
            return base.Saves<Tab_XiangMu_YiJiaoMingXi>(mingXiArray);
        }

        public void deleteByProjectId(int projectId)
        {
            String sql = "delete from dbo.Tab_XiangMu_YiJiaoMingXi where mx_XiangMuId=" + projectId;
            base.ExecuteCommand(sql);
        }
    }
}
