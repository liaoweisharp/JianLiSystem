using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_Report_MonthSalaryGuiDang:Base
    {
        public Tab_Report_MonthSalary_GuiDang Save(Tab_Report_MonthSalary_GuiDang ins)
        {
            return base.Save<Tab_Report_MonthSalary_GuiDang>(ins);
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
                if (tabs.Contains("Tab_Report_MonthSalary"))
                {
                    dl.LoadWith<DTO.Tab_Report_MonthSalary_GuiDang>(tab => tab.Tab_Report_MonthSalary);
                }
                if (tabs.Contains("Tab_Report_MonthSalaryDetail_ChengBen"))
                {
                    dl.LoadWith<DTO.Tab_Report_MonthSalary_GuiDang>(tab => tab.Tab_Report_MonthSalaryDetail_ChengBen);
                }
                if (tabs.Contains("Tab_RL_User"))
                {
                    dl.LoadWith<DTO.Tab_Report_MonthSalary_GuiDang>(tab => tab.Tab_RL_User);
                }

                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_Report_MonthSalary_GuiDang[] objs)
        {
            int returnValue = 0;
            Tab_Report_MonthSalary_GuiDang[] query = (from i in this.dataContext.Tab_Report_MonthSalary_GuiDang where objs.Select(ins => ins.msgd_Id).Contains(i.msgd_Id) select i).ToArray();
            foreach (Tab_Report_MonthSalary_GuiDang q in query)
            {
                Tab_Report_MonthSalary_GuiDang item = objs.FirstOrDefault(ins => ins.msgd_Id == q.msgd_Id);
                this.CopyObjectPoperty<Tab_Report_MonthSalary_GuiDang, Tab_Report_MonthSalary_GuiDang>(item, q);
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
            var query = from i in this.dataContext.Tab_Report_MonthSalary_GuiDang where ids.Contains(i.msgd_Id) select i;
            this.dataContext.Tab_Report_MonthSalary_GuiDang.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_Report_MonthSalary_GuiDang> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Report_MonthSalary_GuiDang.ToList();
        }



    
        public bool Update(Tab_Report_MonthSalary_GuiDang obj)
        {
            return this.Updates(new Tab_Report_MonthSalary_GuiDang[] { obj }) == 1 ? true : false;
        }

        public List<Tab_Report_MonthSalary_GuiDang> Saves(List<Tab_Report_MonthSalary_GuiDang> tab_Report_MonthSalary_GuiDang)
        {
            return base.Saves<Tab_Report_MonthSalary_GuiDang>(tab_Report_MonthSalary_GuiDang);
        }

        public List<Tab_Report_MonthSalary_GuiDang> getByMonthSalaryId(int monthSalaryId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Report_MonthSalary_GuiDang.Where(p => p.msgd_MsId == monthSalaryId).ToList();
        }

        public Tab_Report_MonthSalary_GuiDang getById(int guiDangId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Report_MonthSalary_GuiDang.FirstOrDefault(p => p.msgd_Id == guiDangId);
        }

        public List<Tab_Report_MonthSalary_GuiDang> getByMonthSalaryIds(int[] monthSalaryIds, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Report_MonthSalary_GuiDang.Where(p => monthSalaryIds.Contains(p.msgd_MsId)).ToList();
        }
    }
}
