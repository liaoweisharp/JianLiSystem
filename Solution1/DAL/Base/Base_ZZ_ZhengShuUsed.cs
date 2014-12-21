using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_ZZ_ZhengShuUsed:Base
    {
        public Tab_ZZ_ZhengShu_Used getById(int Id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_ZZ_ZhengShu_Used.FirstOrDefault(ins => ins.zzzsu_Id == Id);
        }
        public Tab_ZZ_ZhengShu_Used Save(Tab_ZZ_ZhengShu_Used ins)
        {
            return base.Save<Tab_ZZ_ZhengShu_Used>(ins);
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
                    dl.LoadWith<Tab_ZZ_ZhengShu_Used>(tab => tab.TabXiangMuQianQi);
                }
                if (tabs.Contains("Tab_ZZ_ZhengShu"))
                {
                    dl.LoadWith<Tab_ZZ_ZhengShu_Used>(tab => tab.Tab_ZZ_ZhengShu);
                }
                this.dataContext.LoadOptions = dl;
            }
        }
        public int Update(Tab_ZZ_ZhengShu_Used obj)
        {
            return Updates(new Tab_ZZ_ZhengShu_Used[] { obj });
        }
        public int Updates(Tab_ZZ_ZhengShu_Used[] objs)
        {
            int returnValue = 0;
            Tab_ZZ_ZhengShu_Used[] query = (from i in this.dataContext.Tab_ZZ_ZhengShu_Used where objs.Select(ins => ins.zzzsu_Id).Contains(i.zzzsu_Id) select i).ToArray();
            foreach (Tab_ZZ_ZhengShu_Used q in query)
            {
                Tab_ZZ_ZhengShu_Used item = objs.FirstOrDefault(ins => ins.zzzsu_Id == q.zzzsu_Id);
                this.CopyObjectPoperty<Tab_ZZ_ZhengShu_Used, Tab_ZZ_ZhengShu_Used>(item, q);
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
            var query = from i in this.dataContext.Tab_ZZ_ZhengShu_Used where ids.Contains(i.zzzsu_Id) select i;
            this.dataContext.Tab_ZZ_ZhengShu_Used.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_ZZ_ZhengShu_Used> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_ZZ_ZhengShu_Used.ToList();
        }
        /// <summary>
        /// 用途
        /// </summary>
        /// <returns></returns>
        public String[] getDistinct_YongTu()
        {

            return this.dataContext.Tab_ZZ_ZhengShu_Used.OrderBy(p => p.zzzsu_YongTu).Select(p => p.zzzsu_YongTu).Distinct().ToArray();
        }

        public int countZhengShuUsed(CommClass.PageClass pageClass, string where,bool? isGuiHuan, params string[] tabs)
        {
            
          
            if (where != null && where.Length>1)
            {
                queryConfig(tabs);
                if (isGuiHuan == null)
                {
                    return this.dataContext.Tab_ZZ_ZhengShu_Used.Where(p => p.Tab_ZZ_ZhengShu.zzzs_FullName.Contains(where) || p.Tab_ZZ_ZhengShu.zzzs_ZhengShu.Contains(where) || p.TabXiangMuQianQi.qq_GongChengMingCheng.Contains(where)).Count();
                }
                else
                {
                    return this.dataContext.Tab_ZZ_ZhengShu_Used.Where(p => p.zzzsu_GuiHuan_Date.HasValue == isGuiHuan).Where(p => p.Tab_ZZ_ZhengShu.zzzs_FullName.Contains(where) || p.Tab_ZZ_ZhengShu.zzzs_ZhengShu.Contains(where) || p.TabXiangMuQianQi.qq_GongChengMingCheng.Contains(where)).Count();
                }
            }
            else if (where != null && where.Length == 1) {
                queryConfig(tabs);
                char _where = char.Parse(where);
                if (isGuiHuan == null)
                {
                    return this.dataContext.Tab_ZZ_ZhengShu_Used.Where(p => p.Tab_ZZ_ZhengShu.zzzs_FullName.Contains(where) || p.Tab_ZZ_ZhengShu.zzzs_ZhengShu.Contains(where) || p.TabXiangMuQianQi.qq_GongChengMingCheng.Contains(where) || p.Tab_ZZ_ZhengShu.zzzs_LeiXing == char.ToLower(_where)).Count();
                }
                else {
                    return this.dataContext.Tab_ZZ_ZhengShu_Used.Where(p => p.zzzsu_GuiHuan_Date.HasValue == isGuiHuan).Where(p => p.Tab_ZZ_ZhengShu.zzzs_FullName.Contains(where) || p.Tab_ZZ_ZhengShu.zzzs_ZhengShu.Contains(where) || p.TabXiangMuQianQi.qq_GongChengMingCheng.Contains(where) || p.Tab_ZZ_ZhengShu.zzzs_LeiXing == char.ToLower(_where)).Count();
                }
            }
            else
            {
                if (isGuiHuan == null)
                {
                    return this.dataContext.Tab_ZZ_YinZhang.Count();
                }
                else {
                    return this.dataContext.Tab_ZZ_ZhengShu_Used.Where(p => p.zzzsu_GuiHuan_Date.HasValue == isGuiHuan).Count();
                }
            }
        }

        public List<Tab_ZZ_ZhengShu_Used> filterZhengShuUsed(CommClass.PageClass pageClass, string where,bool? isGuiHuan, params string[] tabs)
        {
            if (where != null && where.Length > 1)
            {
                queryConfig(tabs);
                 if (isGuiHuan == null)
                {
                return this.dataContext.Tab_ZZ_ZhengShu_Used.Where(p => p.Tab_ZZ_ZhengShu.zzzs_FullName.Contains(where) || p.Tab_ZZ_ZhengShu.zzzs_ZhengShu.Contains(where) || p.TabXiangMuQianQi.qq_GongChengMingCheng.Contains(where)).OrderByDescending(ins => ins.zzzsu_UsedTime).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
                 }
                 else{
                    return this.dataContext.Tab_ZZ_ZhengShu_Used.Where(p=>p.zzzsu_GuiHuan_Date.HasValue==isGuiHuan).Where(p => p.Tab_ZZ_ZhengShu.zzzs_FullName.Contains(where) || p.Tab_ZZ_ZhengShu.zzzs_ZhengShu.Contains(where) || p.TabXiangMuQianQi.qq_GongChengMingCheng.Contains(where)).OrderByDescending(ins => ins.zzzsu_UsedTime).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
                 }

            }
            else if (where != null && where.Length == 1)
            {
                queryConfig(tabs);
                char _where = char.Parse(where);
                 if (isGuiHuan == null)
                {
                return this.dataContext.Tab_ZZ_ZhengShu_Used.Where(p => p.Tab_ZZ_ZhengShu.zzzs_FullName.Contains(where) || p.Tab_ZZ_ZhengShu.zzzs_ZhengShu.Contains(where) || p.TabXiangMuQianQi.qq_GongChengMingCheng.Contains(where) || p.Tab_ZZ_ZhengShu.zzzs_LeiXing == char.ToLower(_where)).OrderByDescending(ins => ins.zzzsu_UsedTime).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
                 }
                 else{
                    return this.dataContext.Tab_ZZ_ZhengShu_Used.Where(p=>p.zzzsu_GuiHuan_Date.HasValue==isGuiHuan).Where(p => p.Tab_ZZ_ZhengShu.zzzs_FullName.Contains(where) || p.Tab_ZZ_ZhengShu.zzzs_ZhengShu.Contains(where) || p.TabXiangMuQianQi.qq_GongChengMingCheng.Contains(where) || p.Tab_ZZ_ZhengShu.zzzs_LeiXing == char.ToLower(_where)).OrderByDescending(ins => ins.zzzsu_UsedTime).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
                 }
            }
            else
            {
                 if (isGuiHuan == null)
                {
                return this.dataContext.Tab_ZZ_ZhengShu_Used.OrderByDescending(ins => ins.zzzsu_UsedTime).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
                 }
                 else{
                 return this.dataContext.Tab_ZZ_ZhengShu_Used.Where(p=>p.zzzsu_GuiHuan_Date.HasValue==isGuiHuan).OrderByDescending(ins => ins.zzzsu_UsedTime).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
                 }
            }
        }

        public int Delete(int id)
        {
            return Deletes(new int[] { id});
        }
      
    }
}
