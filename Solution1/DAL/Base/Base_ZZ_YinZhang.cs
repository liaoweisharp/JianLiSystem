using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;
namespace DAL
{
    public class Base_ZZ_YinZhang:Base
    {
        public Tab_ZZ_YinZhang getById(int Id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_ZZ_YinZhang.FirstOrDefault(ins => ins.zzyz_Id == Id);
        }
        public Tab_ZZ_YinZhang Save(Tab_ZZ_YinZhang ins)
        {
            return base.Save<Tab_ZZ_YinZhang>(ins);
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
                    dl.LoadWith<Tab_ZZ_YinZhang>(tab => tab.TabXiangMuQianQi);
                }
                this.dataContext.LoadOptions = dl;
            }
        }
        public int Update(Tab_ZZ_YinZhang obj)
        {
            return Updates(new Tab_ZZ_YinZhang[] { obj });
        }
        public int Updates(Tab_ZZ_YinZhang[] objs)
        {
            int returnValue = 0;
            Tab_ZZ_YinZhang[] query = (from i in this.dataContext.Tab_ZZ_YinZhang where objs.Select(ins => ins.zzyz_Id).Contains(i.zzyz_Id) select i).ToArray();
            foreach (Tab_ZZ_YinZhang q in query)
            {
                Tab_ZZ_YinZhang item = objs.FirstOrDefault(ins => ins.zzyz_Id == q.zzyz_Id);
                this.CopyObjectPoperty<Tab_ZZ_YinZhang, Tab_ZZ_YinZhang>(item, q);
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
            var query = from i in this.dataContext.Tab_ZZ_YinZhang where ids.Contains(i.zzyz_Id) select i;
            this.dataContext.Tab_ZZ_YinZhang.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_ZZ_YinZhang> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_ZZ_YinZhang.ToList();
        }

        public int Delete(int id)
        {
            return this.Deletes(new int[] { id});
        }

        public int countYinZhang(CommClass.PageClass pageClass, string where, params string[] tabs)
        {
            
            //int?[] qq_ParentIds = (from p in this.dataContext.TabXiangMuQianQi where p.qq_ParentId != null select p.qq_ParentId).Distinct().ToArray();

            if (where != null)
            {
                queryConfig(tabs);
                return this.dataContext.Tab_ZZ_YinZhang.Where(p => p.zzyz_BuMen.Contains(where) || p.zzyz_Name.Contains(where) || p.zzyz_Type.Contains(where) || p.zzyz_PiZhunRen.Contains(where) || p.zzyz_PiZhunRen.Contains(where) || p.TabXiangMuQianQi.qq_GongChengMingCheng.Contains(where)).Count();
            }
            else
            {
                
                return this.dataContext.Tab_ZZ_YinZhang.Count();
            }
        }

        public List<Tab_ZZ_YinZhang> filterYinZhang(CommClass.PageClass pageClass, string where, params string[] tabs)
        {
            if (where != null)
            {
                queryConfig(tabs);
                return this.dataContext.Tab_ZZ_YinZhang.Where(p => p.zzyz_BuMen.Contains(where) || p.zzyz_Name.Contains(where) || p.zzyz_Type.Contains(where) || p.zzyz_PiZhunRen.Contains(where) || p.zzyz_PiZhunRen.Contains(where) || p.TabXiangMuQianQi.qq_GongChengMingCheng.Contains(where)).OrderByDescending(ins => ins.zzyz_QianZhangDate).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
            else
            {
                
                return this.dataContext.Tab_ZZ_YinZhang.OrderByDescending(ins => ins.zzyz_QianZhangDate).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
        }
        /// <summary>
        /// 得到印章名称集合（去重）
        /// </summary>
        /// <returns></returns>
        public string[] getDistinctYinZhang()
        {
            return this.dataContext.Tab_ZZ_YinZhang.OrderBy(p => p.zzyz_Name).Select(p => p.zzyz_Name.Trim()).Distinct().ToArray();
        }
        /// <summary>
        /// 得到部门名称集合（去重）
        /// </summary>
        /// <returns></returns>
        public string[] getDistinctBuMen()
        {
            return this.dataContext.Tab_ZZ_YinZhang.OrderBy(p => p.zzyz_BuMen).Select(p => p.zzyz_BuMen.Trim()).Distinct().ToArray();
        }
        /// <summary>
        /// 得到类型名称集合（去重）
        /// </summary>
        /// <returns></returns>
        public string[] getDistinctLeiXing()
        {
            return this.dataContext.Tab_ZZ_YinZhang.OrderBy(p => p.zzyz_Type).Select(p => p.zzyz_Type.Trim()).Distinct().ToArray();
        }
    }
}
