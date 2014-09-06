using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_XiangMu_JieSuanNeiRong:Base
    {
        public Tab_XiangMu_JieSuanNeiRong Save(Tab_XiangMu_JieSuanNeiRong ins)
        {
            return base.Save<Tab_XiangMu_JieSuanNeiRong>(ins);
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
                    dl.LoadWith<DTO.Tab_XiangMu_JieSuanNeiRong>(tab => tab.TabXiangMuQianQi);
                }
                this.dataContext.LoadOptions = dl;
            }
        }
        public bool Update(Tab_XiangMu_JieSuanNeiRong obj)
        {
            int returnValue = 0;
            Tab_XiangMu_JieSuanNeiRong _obj = this.dataContext.Tab_XiangMu_JieSuanNeiRong.FirstOrDefault(p => p.jsnr_Id == obj.jsnr_Id);

            this.CopyObjectPoperty<Tab_XiangMu_JieSuanNeiRong, Tab_XiangMu_JieSuanNeiRong>(obj, _obj);
            bool status = true;
            try
            {
                this.dataContext.SubmitChanges();
            }
            catch
            {
                status = false;
            }
            return status;
        }
        public int Updates(Tab_XiangMu_JieSuanNeiRong[] objs)
        {
            int returnValue = 0;
            Tab_XiangMu_JieSuanNeiRong[] query = (from i in this.dataContext.Tab_XiangMu_JieSuanNeiRong where objs.Select(ins => ins.jsnr_Id).Contains(i.jsnr_Id) select i).ToArray();
            foreach (Tab_XiangMu_JieSuanNeiRong q in query)
            {
                Tab_XiangMu_JieSuanNeiRong item = objs.FirstOrDefault(ins => ins.jsnr_Id == q.jsnr_Id);
                this.CopyObjectPoperty<Tab_XiangMu_JieSuanNeiRong, Tab_XiangMu_JieSuanNeiRong>(item, q);
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
            var query = from i in this.dataContext.Tab_XiangMu_JieSuanNeiRong where ids.Contains(i.jsnr_Id) select i;
            this.dataContext.Tab_XiangMu_JieSuanNeiRong.DeleteAllOnSubmit(query);
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
        public Tab_XiangMu_JieSuanNeiRong getById(int id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMu_JieSuanNeiRong.FirstOrDefault(p => p.jsnr_Id == id);
        }
    }
}
