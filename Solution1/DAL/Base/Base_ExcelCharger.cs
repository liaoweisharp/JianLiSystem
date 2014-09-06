using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Linq;
using DAL.DTO;

namespace DAL
{
    public class Base_ExcelCharger:Base
    {
        public Tab_Excel_Charger Save(Tab_Excel_Charger obj)
        {
            return this.Save<Tab_Excel_Charger>(obj);
        }
        //public int Updates(Tab_Excel_Charger[] objs)
        //{
        //    int returnValue = 0;
        //    Tab_Excel_Charger[] query = (from i in this.dataContext.Tab_Excel_Charger where objs.Select(ins => ins.ecr_ID).Contains(i.ecr_ID) select i).ToArray();
        //    foreach (Tab_Excel_Charger q in query)
        //    {
        //        Tab_Excel_Charger item = objs.FirstOrDefault(ins => ins.ecr_ID == q.ecr_ID);
        //        this.CopyObjectPoperty<Tab_Excel_Charger, Tab_Excel_Charger>(item, q);
        //    }
        //    try
        //    {
        //        this.dataContext.SubmitChanges();
        //        returnValue = query.Count();
        //    }
        //    catch
        //    {
        //        returnValue = 0;
        //    }
        //    return returnValue;
        //}

        public int Updates(Tab_Excel_Charger[] objs)
        {
            int returnValue = 0;
            Tab_Excel_Charger[] query = (from i in this.dataContext.Tab_Excel_Charger where objs.Select(ins => ins.ecr_ID).Contains(i.ecr_ID) select i).ToArray();
            foreach (Tab_Excel_Charger q in query)
            {
                Tab_Excel_Charger item = objs.FirstOrDefault(ins => ins.ecr_ID == q.ecr_ID);
                this.CopyObjectPoperty<Tab_Excel_Charger, Tab_Excel_Charger>(item, q);
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
            var query = from i in this.dataContext.Tab_Excel_Charger where ids.Contains(i.ecr_ID) select i;
            this.dataContext.Tab_Excel_Charger.DeleteAllOnSubmit(query);
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
        public List<DTO.Tab_Excel_Charger> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Excel_Charger.ToList<DTO.Tab_Excel_Charger>();
        }
        /// <summary>
        /// 设置查询需要返回哪些关联表。
        /// </summary>
        /// <param name="tabs"></param>
        private void queryConfig(params string[] tabs)
        {
            if (tabs != null && tabs.Length == 0)
            {
                this.dataContext.DeferredLoadingEnabled = false;
            }
            else
            {
                DataLoadOptions dl = new DataLoadOptions();
                
            }

        }

        public List<DTO.Tab_Excel_Charger> getByIds(int[] companyIds, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Excel_Charger.Where(p => companyIds.Contains(p.ecr_ID)).ToList();
        }

        public Tab_Excel_Charger Update(Tab_Excel_Charger obj)
        {
            Tab_Excel_Charger obj_DB= this.dataContext.Tab_Excel_Charger.FirstOrDefault(p => p.ecr_ID == obj.ecr_ID);
            this.CopyObjectPoperty<Tab_Excel_Charger, Tab_Excel_Charger>(obj, obj_DB);            
            
            try
            {
                this.dataContext.SubmitChanges();
            }
            catch
            {
                obj = null;
            }
            return obj;
        }

        public int countCompanyCharger(CommClass.PageClass pageClass, string where, params string[] tabs)
        {
            queryConfig(tabs);
            //int?[] qq_ParentIds = (from p in this.dataContext.TabXiangMuQianQi where p.qq_ParentId != null select p.qq_ParentId).Distinct().ToArray();

            if (where != null)
            {
                return this.dataContext.Tab_Excel_Charger.Where(p => p.ecr_CompanyName.Contains(where) || p.ecr_Name.Contains(where)).Count();
            }
            else
            {
                return this.dataContext.Tab_Excel_Charger.Count();
            }
        }
        public List<Tab_Excel_Charger> filterCompanyCharger(CommClass.PageClass pageClass, string where, params string[] tabs)
        {
            queryConfig(tabs);
            //int?[] qq_ParentIds = (from p in this.dataContext.TabXiangMuQianQi where p.qq_ParentId != null select p.qq_ParentId).Distinct().ToArray();
            
            if (where != null)
            {
                return this.dataContext.Tab_Excel_Charger.Where(p => p.ecr_CompanyName.Contains(where) || p.ecr_Name.Contains(where)).OrderBy(ins => ins.ecr_CompanyName).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
            else
            {
                return this.dataContext.Tab_Excel_Charger.OrderBy(ins => ins.ecr_CompanyName).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
        }
    }
}
