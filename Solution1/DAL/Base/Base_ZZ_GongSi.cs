using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_ZZ_GongSi:Base
    {
        public Tab_ZZ_GongSi getById(int Id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_ZZ_GongSi.FirstOrDefault(ins => ins.zzgs_Id == Id);
        }
        public Tab_ZZ_GongSi Save(Tab_ZZ_GongSi ins)
        {
            return base.Save<Tab_ZZ_GongSi>(ins);
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
               
                this.dataContext.LoadOptions = dl;
            }
        }
        public int Update(Tab_ZZ_GongSi obj)
        {
            return Updates(new Tab_ZZ_GongSi[] { obj });
        }
        public int Updates(Tab_ZZ_GongSi[] objs)
        {
            int returnValue = 0;
            Tab_ZZ_GongSi[] query = (from i in this.dataContext.Tab_ZZ_GongSi where objs.Select(ins => ins.zzgs_Id).Contains(i.zzgs_Id) select i).ToArray();
            foreach (Tab_ZZ_GongSi q in query)
            {
                Tab_ZZ_GongSi item = objs.FirstOrDefault(ins => ins.zzgs_Id == q.zzgs_Id);
                this.CopyObjectPoperty<Tab_ZZ_GongSi, Tab_ZZ_GongSi>(item, q);
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
            var query = from i in this.dataContext.Tab_ZZ_GongSi where ids.Contains(i.zzgs_Id) select i;
            this.dataContext.Tab_ZZ_GongSi.DeleteAllOnSubmit(query);
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
        public int Delete(int id)
        {
            return this.Deletes(new int[]{id});
        }

        public List<DTO.Tab_ZZ_GongSi> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_ZZ_GongSi.ToList();
        }



        public int countCompany(CommClass.PageClass pageClass, string where,bool? isGuiHuan, params string[] tabs)
        {
            queryConfig(tabs);
            //int?[] qq_ParentIds = (from p in this.dataContext.TabXiangMuQianQi where p.qq_ParentId != null select p.qq_ParentId).Distinct().ToArray();
            IQueryable<Tab_ZZ_GongSi> filter = null;
            if (isGuiHuan.HasValue)
            {
                filter = this.dataContext.Tab_ZZ_GongSi.Where(p => p.zzgs_GuiHuan_Date.HasValue== isGuiHuan.Value);
            }
            else {
                filter = this.dataContext.Tab_ZZ_GongSi;
            }
            
            if (where != null)
            {
                return filter.Where(p => p.zzgs_ZhengName.Contains(where) || p.zzgs_JieChuRen.Contains(where)).Count();
            }
            else
            {
                return filter.Count();
            }
        }
        public List<Tab_ZZ_GongSi> filterCompany(CommClass.PageClass pageClass, string where,bool? isGuiHuan, params string[] tabs)
        {
            queryConfig(tabs);
            //int?[] qq_ParentIds = (from p in this.dataContext.TabXiangMuQianQi where p.qq_ParentId != null select p.qq_ParentId).Distinct().ToArray();
            IQueryable<Tab_ZZ_GongSi> filter = null;
            if (isGuiHuan.HasValue)
            {
                filter = this.dataContext.Tab_ZZ_GongSi.Where(p => p.zzgs_GuiHuan_Date.HasValue == isGuiHuan.Value);
            }
            else
            {
                filter = this.dataContext.Tab_ZZ_GongSi;
            }
            if (where != null)
            {
                return filter.Where(p => p.zzgs_ZhengName.Contains(where) || p.zzgs_JieChuRen.Contains(where)).OrderBy(ins => ins.zzgs_UsedTime).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
            else
            {
                return filter.OrderBy(ins => ins.zzgs_UsedTime).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
        }
        /// <summary>
        /// 得到证件名称（去重）
        /// </summary>
        /// <returns></returns>
        public string[] getDistinctCompanyZhengJian()
        {
            return this.dataContext.Tab_ZZ_GongSi.OrderBy(p => p.zzgs_ZhengName).Select(p => p.zzgs_ZhengName).Distinct().ToArray();
        }

        
    }
}
