using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Linq;
using DAL.DTO;

namespace DAL
{
    public class Base_Upload:Base
    {
        public Tab_Uploads getById(int Id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Uploads.FirstOrDefault(ins => ins.up_Id == Id);
        }
        public Tab_Uploads Save(Tab_Uploads ins)
        {
            return base.Save<Tab_Uploads>(ins);
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
                if (tabs.Contains("Tab_RL_ZhiYeZiGeZhengShu"))
                {
                    dl.LoadWith<DTO.Tab_Uploads>(tab => tab.Tab_RL_ZhiYeZiGeZhengShu);
                }
                if (tabs.Contains("Tab_User_XueLi"))
                {
                    dl.LoadWith<DTO.Tab_Uploads>(tab => tab.Tab_User_XueLi);
                }
                if (tabs.Contains("Tab_User_ZhiCheng"))
                {
                    dl.LoadWith<DTO.Tab_Uploads>(tab => tab.Tab_User_ZhiCheng);
                }
                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_Uploads[] objs)
        {
            int returnValue = 0;
            Tab_Uploads[] query = (from i in this.dataContext.Tab_Uploads where objs.Select(ins => ins.up_Id).Contains(i.up_Id) select i).ToArray();
            foreach (Tab_Uploads q in query)
            {
                Tab_Uploads item = objs.FirstOrDefault(ins => ins.up_Id == q.up_Id);
                this.CopyObjectPoperty<Tab_Uploads, Tab_Uploads>(item, q);
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

        public int Deletes(int[] ids,string dir)
        {
            var query = from i in this.dataContext.Tab_Uploads where ids.Contains(i.up_Id) select i;
            this.dataContext.Tab_Uploads.DeleteAllOnSubmit(query);
            string[] dirs = query.Select(p => p.up_Dir).ToArray();
            int status = query.Count();
            try
            {
                this.dataContext.SubmitChanges();
                foreach (string ins in dirs)
                {
                    string fileName = dir + "\\" + ins.Substring(3);
                    System.IO.FileInfo fi = new System.IO.FileInfo(fileName);//excelFile为文件在服务器上的地址
                    if (fi.Exists == true)
                    {
                        fi.Delete();
                    }
                } 
            }
            catch
            {
                status = 0;
            }
            return status;
        }

        public List<DTO.Tab_Uploads> getAll()
        {
            return this.dataContext.Tab_Uploads.ToList();
        }

        public List<Tab_Uploads> getByXueLiIds(int[] xueLiIds,params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Uploads.Where(p => p.up_XueLiId.HasValue && xueLiIds.Contains(p.up_XueLiId.Value) && p.up_ContentType == 1).ToList();
        }
        public List<Tab_Uploads> getByZhiChengIds(int[] zhiChengIds, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Uploads.Where(p =>p.up_ZhiChengId.HasValue && zhiChengIds.Contains(p.up_ZhiChengId.Value) && p.up_ContentType == 2).ToList();
        }
        public List<Tab_Uploads> getByZhiYeZiGeIds(int[] ZhiYeZiGeIds, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Uploads.Where(p => p.up_ZiGeZhengShuId.HasValue && ZhiYeZiGeIds.Contains(p.up_ZiGeZhengShuId.Value) && p.up_ContentType == 3).ToList();
        }

        public List<Tab_Uploads> getByShouKuanIds(int[] shouKuanIds, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Uploads.Where(p => p.up_ShouKuanId.HasValue && shouKuanIds.Contains(p.up_ShouKuanId.Value) && p.up_ContentType == 4).ToList();
        }
    }
}
