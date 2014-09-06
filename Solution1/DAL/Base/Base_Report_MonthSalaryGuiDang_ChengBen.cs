using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_Report_MonthSalaryGuiDang_ChengBen:Base
    {
        public Tab_Report_MonthSalaryDetail_ChengBen Save(Tab_Report_MonthSalaryDetail_ChengBen ins)
        {
            return base.Save<Tab_Report_MonthSalaryDetail_ChengBen>(ins);
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
                if (tabs.Contains("Tab_Report_MonthSalary_GuiDang"))
                {
                    dl.LoadWith<DTO.Tab_Report_MonthSalaryDetail_ChengBen>(tab => tab.Tab_Report_MonthSalary_GuiDang);
                }
                if (tabs.Contains("TabXiangMuQianQi"))
                {
                    dl.LoadWith<DTO.Tab_Report_MonthSalaryDetail_ChengBen>(tab => tab.TabXiangMuQianQi);
                }
                
                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_Report_MonthSalaryDetail_ChengBen[] objs)
        {
            int returnValue = 0;
            Tab_Report_MonthSalaryDetail_ChengBen[] query = (from i in this.dataContext.Tab_Report_MonthSalaryDetail_ChengBen where objs.Select(ins => ins.msdcb_Id).Contains(i.msdcb_Id) select i).ToArray();
            foreach (Tab_Report_MonthSalaryDetail_ChengBen q in query)
            {
                Tab_Report_MonthSalaryDetail_ChengBen item = objs.FirstOrDefault(ins => ins.msdcb_Id == q.msdcb_Id);
                this.CopyObjectPoperty<Tab_Report_MonthSalaryDetail_ChengBen, Tab_Report_MonthSalaryDetail_ChengBen>(item, q);
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
            var query = from i in this.dataContext.Tab_Report_MonthSalaryDetail_ChengBen where ids.Contains(i.msdcb_Id) select i;
            this.dataContext.Tab_Report_MonthSalaryDetail_ChengBen.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_Report_MonthSalaryDetail_ChengBen> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Report_MonthSalaryDetail_ChengBen.ToList();
        }




        public bool Update(Tab_Report_MonthSalaryDetail_ChengBen obj)
        {
            return this.Updates(new Tab_Report_MonthSalaryDetail_ChengBen[] { obj }) == 1 ? true : false;
        }

        public List<Tab_Report_MonthSalaryDetail_ChengBen> Saves(List<Tab_Report_MonthSalaryDetail_ChengBen> tab_Report_MonthSalary_GuiDang)
        {
            return base.Saves<Tab_Report_MonthSalaryDetail_ChengBen>(tab_Report_MonthSalary_GuiDang);
        }

        public List<Tab_Report_MonthSalaryDetail_ChengBen> getByGuiDangId(int guiDangId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Report_MonthSalaryDetail_ChengBen.Where(p => p.msdcd_MonthSalaryGuiDangId == guiDangId).ToList();
        }
        /// <summary>
        /// 按归档ID删除
        /// </summary>
        /// <param name="guiDangId"></param>
        /// <returns></returns>
        public int DeleteByGuiDangId(int guiDangId)
        {
            var query = from i in this.dataContext.Tab_Report_MonthSalaryDetail_ChengBen where i.msdcd_MonthSalaryGuiDangId == guiDangId select i;
            this.dataContext.Tab_Report_MonthSalaryDetail_ChengBen.DeleteAllOnSubmit(query);
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

        public int DeleteByGuiDangIds(int[] guiDangIds)
        {
            var query = from i in this.dataContext.Tab_Report_MonthSalaryDetail_ChengBen where guiDangIds.Contains(i.msdcd_MonthSalaryGuiDangId)  select i;
            this.dataContext.Tab_Report_MonthSalaryDetail_ChengBen.DeleteAllOnSubmit(query);
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
        /// <summary>
        /// guiDangIds,projectId两个条件
        /// </summary>
        /// <param name="guiDangIds"></param>
        /// <param name="projectId"></param>
        /// <param name="tabs"></param>
        /// <returns></returns>
        public List<Tab_Report_MonthSalaryDetail_ChengBen> getByGuiDangIds(int[] guiDangIds,int projectId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Report_MonthSalaryDetail_ChengBen.Where(p => guiDangIds.Contains(p.msdcd_MonthSalaryGuiDangId) && p.msdcd_XiangMuId == projectId).ToList();
        }
    }
}
