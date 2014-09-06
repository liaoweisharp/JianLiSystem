using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_Report_MonthSalary:Base
    {
        public Tab_Report_MonthSalary Save(Tab_Report_MonthSalary ins)
        {
            return base.Save<Tab_Report_MonthSalary>(ins);
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
                    dl.LoadWith<DTO.Tab_Report_MonthSalary>(tab => tab.Tab_Report_MonthSalary_GuiDang);
                }
             
                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_Report_MonthSalary[] objs)
        {
            int returnValue = 0;
            Tab_Report_MonthSalary[] query = (from i in this.dataContext.Tab_Report_MonthSalary where objs.Select(ins => ins.ms_Id).Contains(i.ms_Id) select i).ToArray();
            foreach (Tab_Report_MonthSalary q in query)
            {
                Tab_Report_MonthSalary item = objs.FirstOrDefault(ins => ins.ms_Id == q.ms_Id);
                this.CopyObjectPoperty<Tab_Report_MonthSalary, Tab_Report_MonthSalary>(item, q);
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
            var query = from i in this.dataContext.Tab_Report_MonthSalary where ids.Contains(i.ms_Id) select i;
            this.dataContext.Tab_Report_MonthSalary.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_Report_MonthSalary> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Report_MonthSalary.ToList();
        }



        public Tab_Report_MonthSalary getByYearAndMonth(int year,int month, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Report_MonthSalary.FirstOrDefault(p => p.ms_Year == year && p.ms_Month==month);
        }

        public bool Update(Tab_Report_MonthSalary obj)
        {
            return this.Updates(new Tab_Report_MonthSalary[] { obj }) == 1 ? true : false;
        }
        /// <summary>
        /// 返回所有并按年月的升序排序
        /// </summary>
        /// <param name="tabs"></param>
        /// <returns></returns>
        public List<Tab_Report_MonthSalary> getAllSort(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Report_MonthSalary.OrderBy(p => p.ms_Year).ThenBy(p => p.ms_Month).ToList();
        }

        public List<Tab_Report_MonthSalary> getByYearSort(short year, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Report_MonthSalary.Where(p=>p.ms_Year==year).OrderBy(p => p.ms_Year).ThenBy(p => p.ms_Month).ToList();
        }

        public Tab_Report_MonthSalary getById(int monthSalaryId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Report_MonthSalary.FirstOrDefault(p => p.ms_Id == monthSalaryId);
        }
    }
}
