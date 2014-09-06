using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_DiaoDong:Base
    {
        public DTO.Tab_DiaoDong getById(int Id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_DiaoDong.FirstOrDefault(ins => ins.dd_Id == Id);
        }
        public Tab_DiaoDong Save(Tab_DiaoDong ins)
        {
            return base.Save<Tab_DiaoDong>(ins);
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
               
                if (tabs.Contains("Tab_RL_User"))
                {
                    dl.LoadWith<DTO.Tab_DiaoDong>(tab => tab.Tab_RL_User);
                }
                if (tabs.Contains("TabXiangMuQianQi"))
                {
                    dl.LoadWith<DTO.Tab_DiaoDong>(tab => tab.TabXiangMuQianQi);
                }
                if (tabs.Contains("Tab_RL_User1"))
                {
                    dl.LoadWith<DTO.Tab_DiaoDong>(tab => tab.Tab_RL_User1);
                }
                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_DiaoDong[] objs)
        {
            int returnValue = 0;
            Tab_DiaoDong[] query = (from i in this.dataContext.Tab_DiaoDong where objs.Select(ins => ins.dd_Id).Contains(i.dd_Id) select i).ToArray();
            foreach (Tab_DiaoDong q in query)
            {
                Tab_DiaoDong item = objs.FirstOrDefault(ins => ins.dd_Id == q.dd_Id);
                this.CopyObjectPoperty<Tab_DiaoDong, Tab_DiaoDong>(item, q);
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
            var query = from i in this.dataContext.Tab_DiaoDong where ids.Contains(i.dd_Id) select i;
            this.dataContext.Tab_DiaoDong.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_DiaoDong> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_DiaoDong.ToList();
        }
        public List<Tab_DiaoDong> getByUserId(int userId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_DiaoDong.Where(p => p.dd_UserId == userId).OrderBy(p=>p.dd_ShiJian).ToList();
        }
        public List<Tab_DiaoDong> getByFuZeRen(int userId, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_DiaoDong.Where(p => p.dd_FuZeRen == userId).ToList();
        }
     


        /// <summary>
        /// 得到去重的岗位
        /// </summary>
        /// <returns></returns>
        public string[] getDistinctGangWei()
        {
            return this.dataContext.Tab_DiaoDong.Select(p => p.dd_GangWei.Trim()).Distinct().ToArray();
        }
        /// <summary>
        /// 按开始时间排序（倒序）
        /// </summary>
        /// <returns></returns>
        public List<Tab_DiaoDong> getByProjectId(int projectId,params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_DiaoDong.Where(p => p.dd_XiangMuId == projectId).OrderByDescending(p => p.dd_ShiJian).ToList();
        }

        
    }
}
