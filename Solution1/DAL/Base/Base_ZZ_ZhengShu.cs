using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_ZZ_ZhengShu:Base
    {
        public Tab_ZZ_ZhengShu getById(int Id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_ZZ_ZhengShu.FirstOrDefault(ins => ins.zzzs_Id == Id);
        }
        public Tab_ZZ_ZhengShu Save(Tab_ZZ_ZhengShu ins)
        {
            return base.Save<Tab_ZZ_ZhengShu>(ins);
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
        public int Update(Tab_ZZ_ZhengShu obj)
        {
            return Updates(new Tab_ZZ_ZhengShu[] { obj });
        }
        public int Updates(Tab_ZZ_ZhengShu[] objs)
        {
            int returnValue = 0;
            Tab_ZZ_ZhengShu[] query = (from i in this.dataContext.Tab_ZZ_ZhengShu where objs.Select(ins => ins.zzzs_Id).Contains(i.zzzs_Id) select i).ToArray();
            foreach (Tab_ZZ_ZhengShu q in query)
            {
                Tab_ZZ_ZhengShu item = objs.FirstOrDefault(ins => ins.zzzs_Id == q.zzzs_Id);
                this.CopyObjectPoperty<Tab_ZZ_ZhengShu, Tab_ZZ_ZhengShu>(item, q);
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
            var query = from i in this.dataContext.Tab_ZZ_ZhengShu where ids.Contains(i.zzzs_Id) select i;
            this.dataContext.Tab_ZZ_ZhengShu.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_ZZ_ZhengShu> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_ZZ_ZhengShu.ToList();
        }

        public int countZhengShu(CommClass.PageClass pageClass, string where, params string[] tabs)
        {
            
            //int?[] qq_ParentIds = (from p in this.dataContext.TabXiangMuQianQi where p.qq_ParentId != null select p.qq_ParentId).Distinct().ToArray();

            if (where != null && where.Length>1)
            {
                queryConfig(tabs);
                return this.dataContext.Tab_ZZ_ZhengShu.Where(p => p.zzzs_FullName.Contains(where) || p.zzzs_ZhengShu.Contains(where)).Count();
            }
            else if (where != null && where.Length == 1) {
                queryConfig(tabs);
                char type = char.Parse(where);
                return this.dataContext.Tab_ZZ_ZhengShu.Where(p => p.zzzs_FullName.Contains(where) || p.zzzs_ZhengShu.Contains(where) || p.zzzs_LeiXing==type).Count();
            }
            else
            {
                return this.dataContext.Tab_ZZ_ZhengShu.Count();
            }
        }

        public List<Tab_ZZ_ZhengShu> filterZhengShu(CommClass.PageClass pageClass, string where, params string[] tabs)
        {
            queryConfig(tabs);
            //int?[] qq_ParentIds = (from p in this.dataContext.TabXiangMuQianQi where p.qq_ParentId != null select p.qq_ParentId).Distinct().ToArray();

            if (where != null && where.Length > 1)
            {
                return this.dataContext.Tab_ZZ_ZhengShu.Where(p => p.zzzs_FullName.Contains(where) || p.zzzs_ZhengShu.Contains(where)).OrderBy(ins => ins.zzzs_FullName).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
            else if (where != null && where.Length == 1) {
                char type = char.Parse(where);
                return this.dataContext.Tab_ZZ_ZhengShu.Where(p => p.zzzs_FullName.Contains(where) || p.zzzs_ZhengShu.Contains(where) || p.zzzs_LeiXing == type).OrderBy(ins => ins.zzzs_FullName).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
            else
            {
                return this.dataContext.Tab_ZZ_ZhengShu.OrderBy(ins => ins.zzzs_FullName).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
        }

        public int Delete(int id)
        {
            return Deletes(new int[] { id });
        }
        /// <summary>
        /// 证书（去重）
        /// </summary>
        /// <returns></returns>
        public string[] getDistinctZhengShu()
        {
            return this.dataContext.Tab_ZZ_ZhengShu.OrderBy(p => p.zzzs_ZhengShu).Select(p => p.zzzs_ZhengShu).Distinct().ToArray();
        }
        /// <summary>
        /// 证书的键值
        /// </summary>
        /// <returns></returns>
        public List<CommClass.keyValueClass> getZhengShuKeyValue() {
            return (from p in this.dataContext.Tab_ZZ_ZhengShu
                    orderby p.zzzs_FullName, p.zzzs_ZhengShu
                    select new CommClass.keyValueClass()
                    {
                        key = p.zzzs_Id,
                        value = p.zzzs_FullName + "," + p.zzzs_ZhengShu
                    }).ToList();
        }
    }
}
