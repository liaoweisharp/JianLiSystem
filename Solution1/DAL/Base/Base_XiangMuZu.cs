using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_XiangMuZu:Base
    {
        public Tab_XiangMuZu Save(Tab_XiangMuZu ins)
        {
            return base.Save<Tab_XiangMuZu>(ins);
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
                    dl.LoadWith<DTO.Tab_XiangMuZu>(tab => tab.TabXiangMuQianQi);
                }


                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_XiangMuZu[] objs)
        {
            int returnValue = 0;
            Tab_XiangMuZu[] query = (from i in this.dataContext.Tab_XiangMuZu where objs.Select(ins => ins.xmz_Id).Contains(i.xmz_Id) select i).ToArray();
            foreach (Tab_XiangMuZu q in query)
            {
                Tab_XiangMuZu item = objs.FirstOrDefault(ins => ins.xmz_Id == q.xmz_Id);
                this.CopyObjectPoperty<Tab_XiangMuZu, Tab_XiangMuZu>(item, q);
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
            var query = from i in this.dataContext.Tab_XiangMuZu where ids.Contains(i.xmz_Id) select i;
            this.dataContext.Tab_XiangMuZu.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_XiangMuZu> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMuZu.ToList();
        }

        public List<DAL.CommClass.keyValueClass> getAll()
        {
            return (from p in this.dataContext.Tab_XiangMuZu
                    orderby p.xmz_Name
                    select new DAL.CommClass.keyValueClass { key = p.xmz_Id, value = p.xmz_Name }).ToList();
        }

        public List<Tab_XiangMuZu> getById(int id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_XiangMuZu.Where(p => p.xmz_Id == id).ToList();
        }

        public bool Update(Tab_XiangMuZu obj)
        {
            return this.Updates(new Tab_XiangMuZu[] { obj }) == 1 ? true : false;
        }

        public List<Tab_XiangMuZu> filterAllXiangMuZu(CommClass.PageClass pageClass, string where, params string[] tabs)
        {
            queryConfig(tabs);
           
          
            if (where != null)
            {
                return this.dataContext.Tab_XiangMuZu.Where(p => p.xmz_Name.Contains(where)).OrderBy(ins => ins.xmz_Name).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
            else
            {
                return this.dataContext.Tab_XiangMuZu.OrderBy(ins =>ins.xmz_Name).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
        }

        public int countXiangMuZu(string where)
        {
            if (where != null)
            {
                return this.dataContext.Tab_XiangMuZu.Where(p => p.xmz_Name.Contains(where)).Count();
            }
            else
            {
                return this.dataContext.Tab_XiangMuZu.Count();
            }
        }
        /// <summary>
        /// 改名字
        /// </summary>
        /// <param name="id"></param>
        /// <param name="newName"></param>
        /// <returns></returns>
        public bool reNameProject(int id, string newName)
        {
            string sql = String.Format("update TabXiangMuQianQi set qq_GongChengMingCheng='{1}' where qq_Id={0}",id,newName);
            return base.ExecuteCommand(sql)==1?true:false;
        }
    }
}
