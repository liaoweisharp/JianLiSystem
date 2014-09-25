using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;
using System.Collections;
using DAL.CommClass;

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
           
            List<Tab_XiangMuZu> returnValue = new List<Tab_XiangMuZu>();

            if (pageClass.filter != null)
            {
                if (pageClass.filter.key == "type")
                {
                    switch (pageClass.filter.value) {
                        case "zhiGuan": //直管
                            returnValue = (from p in this.dataContext.Tab_XiangMuZu
                                           join c in this.dataContext.TabXiangMuQianQi on p.xmz_Id equals c.qq_XiangMuZhuId
                                           join e in this.dataContext.TabXiangMuQianQi on c.qq_Id equals e.qq_ParentId
                                           where e.qq_ZhiXingLeiXing == 2
                                           select p)
                                     .Distinct(p=>p.xmz_Id)
                                     .ToList();
                                   
                            break;
                        case "shiYeBu"://事业部
                            returnValue = (from p in this.dataContext.Tab_XiangMuZu
                                           join c in this.dataContext.TabXiangMuQianQi on p.xmz_Id equals c.qq_XiangMuZhuId
                                           join e in this.dataContext.TabXiangMuQianQi on c.qq_Id equals e.qq_ParentId
                                           where e.qq_ZhiXingLeiXing == 3
                                           select p)
                                    .Distinct(p=>p.xmz_Id)
                                    .ToList();
                            break;
                    }
                }
            }
            else {
                returnValue = this.dataContext.Tab_XiangMuZu.ToList();
            }
            
            if (where != null)
            {
                returnValue= returnValue.Where(p => p.xmz_Name.Contains(where)).OrderBy(ins => ins.xmz_Name).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
            else
            {
                returnValue= returnValue.OrderBy(ins => ins.xmz_Name).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
            return returnValue.ToList();
        }

        public int countXiangMuZu(CommClass.PageClass pageClass,string where)
        {
            List<Tab_XiangMuZu> returnValue = new List<Tab_XiangMuZu>();

            if (pageClass.filter != null)
            {
                if (pageClass.filter.key == "type")
                {
                    switch (pageClass.filter.value)
                    {
                        case "zhiGuan": //直管
                            returnValue = (from p in this.dataContext.Tab_XiangMuZu
                                           join c in this.dataContext.TabXiangMuQianQi on p.xmz_Id equals c.qq_XiangMuZhuId
                                           join e in this.dataContext.TabXiangMuQianQi on c.qq_Id equals e.qq_ParentId
                                           where e.qq_ZhiXingLeiXing == 2
                                           select p)
                                     .Distinct()
                                     .ToList();

                            break;
                        case "shiYeBu"://事业部
                            returnValue = (from p in this.dataContext.Tab_XiangMuZu
                                           join c in this.dataContext.TabXiangMuQianQi on p.xmz_Id equals c.qq_XiangMuZhuId
                                           join e in this.dataContext.TabXiangMuQianQi on c.qq_Id equals e.qq_ParentId
                                           where e.qq_ZhiXingLeiXing == 3
                                           select p)
                                    .Distinct()
                                    .ToList();
                            break;
                    }
                }
            }
            else
            {
                returnValue = this.dataContext.Tab_XiangMuZu.ToList();
            }
            if (where != null)
            {
                return returnValue.Where(p => p.xmz_Name.Contains(where)).Count();
            }
            else
            {
                return returnValue.Count();
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
        /// <summary>
        /// 
        /// </summary>
        /// <param name="type">2：直管，3：事业部</param>
        /// <returns></returns>
        public ArrayList getXiangMuZu_TreeInfo(int type) {
            List<keyValueClass> xiangMuZuList = (from p in this.dataContext.Tab_XiangMuZu
                                      join c in this.dataContext.TabXiangMuQianQi on p.xmz_Id equals c.qq_XiangMuZhuId
                                      join q in this.dataContext.TabXiangMuQianQi on c.qq_Id equals q.qq_ParentId
                                      where c.qq_LeiXing.HasValue && c.qq_LeiXing == 2 && (q.qq_LeiXing.HasValue == false || q.qq_LeiXing == 1)
                                      && q.qq_ZhiXingLeiXing == type //直管或事业部
                                      select new keyValueClass()
                                      {
                                          key = p.xmz_Id,
                                          value = p.xmz_Name
                                      }).ToList();
            List<View_XiangMu_Tree> jianLiJiGouList = (from p in this.dataContext.Tab_XiangMuZu
                                                 join c in this.dataContext.TabXiangMuQianQi on p.xmz_Id equals c.qq_XiangMuZhuId
                                                 join q in this.dataContext.TabXiangMuQianQi on c.qq_Id equals q.qq_ParentId
                                                 where c.qq_LeiXing.HasValue && c.qq_LeiXing == 2 && (q.qq_LeiXing.HasValue == false || q.qq_LeiXing == 1)
                                                 && q.qq_ZhiXingLeiXing == type//直管或事业部
                                                 select new View_XiangMu_Tree()
                                                 {
                                                     qq_GongChengMingCheng=c.qq_GongChengMingCheng,
                                                     qq_LeiXing=c.qq_LeiXing,
                                                     qq_ParentId=c.qq_ParentId,
                                                      qq_Id=c.qq_Id,
                                                       qq_XiangMuZhuId=c.qq_XiangMuZhuId
                                                 }).ToList();
            List<View_XiangMu_Tree> gongChengList = (from p in this.dataContext.Tab_XiangMuZu
                                                       join c in this.dataContext.TabXiangMuQianQi on p.xmz_Id equals c.qq_XiangMuZhuId
                                                       join q in this.dataContext.TabXiangMuQianQi on c.qq_Id equals q.qq_ParentId
                                                       where c.qq_LeiXing.HasValue && c.qq_LeiXing == 2 && (q.qq_LeiXing.HasValue == false || q.qq_LeiXing == 1)
                                                       && q.qq_ZhiXingLeiXing == type //直管
                                                       select new View_XiangMu_Tree()
                                                       {
                                                           qq_GongChengMingCheng = q.qq_GongChengMingCheng,
                                                           qq_LeiXing = q.qq_LeiXing,
                                                           qq_ParentId = q.qq_ParentId,
                                                           qq_Id = q.qq_Id,
                                                           qq_XiangMuZhuId = q.qq_XiangMuZhuId
                                                       }).ToList();
            ArrayList returnValue = new ArrayList();
            xiangMuZuList = xiangMuZuList.OrderBy(p => p.value).Distinct(new keyValueClass()).ToList();
            jianLiJiGouList=jianLiJiGouList.OrderBy(p => p.qq_GongChengMingCheng).Distinct(new View_XiangMu_Tree()).ToList();
            gongChengList = gongChengList.OrderBy(p => p.qq_GongChengMingCheng).Distinct(new View_XiangMu_Tree()).ToList();
            returnValue.Add(xiangMuZuList);
            returnValue.Add(jianLiJiGouList);
            returnValue.Add(new List<DTO.View_XiangMu_Tree>());//这里始终传空数组（后加）
            returnValue.Add(gongChengList);
            return returnValue;
        }
    }
}
