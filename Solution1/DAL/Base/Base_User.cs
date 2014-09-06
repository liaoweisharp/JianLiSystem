using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_User:Base
    {
        /// <summary>
        /// 部门
        /// </summary>
        /// <param name="tabs"></param>
        /// <returns></returns>
        public DTO.Tab_BuMen[] listBuMen(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_BuMen.ToArray();
        }
        /// <summary>
        /// 社保关系
        /// </summary>
        /// <param name="tabs"></param>
        /// <returns></returns>
        public DTO.Tab_RL_User_CanBaoZhuangKuang[] listCBZK(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_User_CanBaoZhuangKuang.ToArray();
        }
        /// <summary>
        /// 户籍性质
        /// </summary>
        /// <param name="tabs"></param>
        /// <returns></returns>
        public DTO.Tab_RL_User_HuJiXingZhi[] listHJXZ(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_User_HuJiXingZhi.ToArray();
        }
        /// <summary>
        /// 婚姻
        /// </summary>
        /// <param name="tabs"></param>
        /// <returns></returns>
        public DTO.Tab_RL_User_HunYin[] listHY(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_User_HunYin.ToArray();
        }
        /// <summary>
        /// 民族
        /// </summary>
        /// <param name="tabs"></param>
        /// <returns></returns>
        public DTO.Tab_RL_User_MinZu[] listMZ(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_User_MinZu.ToArray();
        }
        /// <summary>
        /// 政治面貌
        /// </summary>
        /// <param name="tabs"></param>
        /// <returns></returns>
        public DTO.Tab_RL_User_ZhengZhiMianMao[] listZZMM(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_User_ZhengZhiMianMao.ToArray();
        }
        public DTO.Tab_RL_RuZhiTuJin[] listRZRJ(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_RuZhiTuJin.ToArray();
        }
        public DTO.Tab_RL_User getById(int Id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_User.FirstOrDefault(ins => ins.jl_Id == Id);
        }
        public Tab_RL_User Save(Tab_RL_User ins)
        {
            return base.Save<Tab_RL_User>(ins);
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
                if (tabs.Contains("Tab_BuMen"))
                {
                    dl.LoadWith<DTO.Tab_RL_User>(tab => tab.Tab_BuMen);
                }
                if (tabs.Contains("Tab_RL_GongZuoZhuangTai"))
                {
                    dl.LoadWith<DTO.Tab_RL_User>(tab => tab.Tab_RL_GongZuoZhuangTai);
                }
                if (tabs.Contains("Tab_RL_JiangCheng"))
                {
                    dl.LoadWith<DTO.Tab_RL_User>(tab => tab.Tab_RL_JiangCheng);
                }
                if (tabs.Contains("Tab_RL_PeiXun"))
                {
                    dl.LoadWith<DTO.Tab_RL_User>(tab => tab.Tab_RL_PeiXun);
                }
                if (tabs.Contains("Tab_RL_RuZhiTuJin"))
                {
                    dl.LoadWith<DTO.Tab_RL_User>(tab => tab.Tab_RL_RuZhiTuJin);
                }
                if (tabs.Contains("Tab_RL_User_CanBaoZhuangKuang"))
                {
                    dl.LoadWith<DTO.Tab_RL_User>(tab => tab.Tab_RL_User_CanBaoZhuangKuang);
                }
                if (tabs.Contains("Tab_RL_User_HuJiXingZhi"))
                {
                    dl.LoadWith<DTO.Tab_RL_User>(tab => tab.Tab_RL_User_HuJiXingZhi);
                }
                if (tabs.Contains("Tab_RL_User_HunYin"))
                {
                    dl.LoadWith<DTO.Tab_RL_User>(tab => tab.Tab_RL_User_HunYin);
                }
                if (tabs.Contains("Tab_RL_User_JingLi"))
                {
                    dl.LoadWith<DTO.Tab_RL_User>(tab => tab.Tab_RL_User_JingLi);
                }
                if (tabs.Contains("Tab_RL_JiangCheng"))
                {
                    dl.LoadWith<DTO.Tab_RL_User>(tab => tab.Tab_RL_JiangCheng);
                }
                if (tabs.Contains("Tab_RL_User_MinZu"))
                {
                    dl.LoadWith<DTO.Tab_RL_User>(tab => tab.Tab_RL_User_MinZu);
                }
              
                if (tabs.Contains("Tab_RL_User_ZhengZhiMianMao"))
                {
                    dl.LoadWith<DTO.Tab_RL_User>(tab => tab.Tab_RL_User_ZhengZhiMianMao);
                }
                if (tabs.Contains("Tab_RL_XinChou"))
                {
                    dl.LoadWith<DTO.Tab_RL_User>(tab => tab.Tab_RL_XinChou);
                }
                if (tabs.Contains("Tab_User_XueLi"))
                {
                    dl.LoadWith<DTO.Tab_RL_User>(tab => tab.Tab_User_XueLi);
                }
                if (tabs.Contains("Tab_User_ZhiCheng"))
                {
                    dl.LoadWith<DTO.Tab_RL_User>(tab => tab.Tab_User_ZhiCheng);
                }
                if (tabs.Contains("Tab_RL_ZhiYeZiGeZhengShu"))
                {
                    dl.LoadWith<DTO.Tab_RL_User>(tab => tab.Tab_RL_ZhiYeZiGeZhengShu);
                }
                
                this.dataContext.LoadOptions = dl;
            }
        }

        public int Updates(Tab_RL_User[] objs)
        {
            int returnValue = 0;
            Tab_RL_User[] query = (from i in this.dataContext.Tab_RL_User where objs.Select(ins => ins.jl_Id).Contains(i.jl_Id) select i).ToArray();
            foreach (Tab_RL_User q in query)
            {
                Tab_RL_User item = objs.FirstOrDefault(ins => ins.jl_Id == q.jl_Id);
                this.CopyObjectPoperty<Tab_RL_User, Tab_RL_User>(item, q);
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
            var query = from i in this.dataContext.Tab_RL_User where ids.Contains(i.jl_Id) select i;
            this.dataContext.Tab_RL_User.DeleteAllOnSubmit(query);
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

        public List<DTO.Tab_RL_User> getAll()
        {
            return this.dataContext.Tab_RL_User.ToList();
        }

        public int countAllUser(CommClass.PageClass pageClass, string where)
        {
            if (where != null)
            {
                return this.dataContext.Tab_RL_User.Count(p => (p.jl_Name != null && p.jl_Name.Contains(where)) || (p.Tab_BuMen != null && p.Tab_BuMen.bm_Name.Contains(where)));
            }
            else {
                var dd = (from p in this.dataContext.Tab_RL_User
                          where (pageClass == null || pageClass.filter == null || pageClass.filter.key == "-1" || pageClass.filter.key != "gongzuozhuangtai") ? true : (pageClass.filter.value == null ? p.jl_GongZuoZhuangTai == null : p.jl_GongZuoZhuangTai.Equals(pageClass.filter.value))
                          //where (pageClass == null) ? true : "1" == pageClass.filter.Value
                          select p
                        );
                return dd.Count();
                //return this.dataContext.Tab_RL_User.Count();
            }
        }
        public List<DTO.Tab_RL_User> filterAllUser(CommClass.PageClass pageClass, string where, params string[] tabs)
        {
            queryConfig(tabs);
            if (where != null)
            {
                return this.dataContext.Tab_RL_User.Where(ins => (ins.jl_Name!=null && ins.jl_Name.Contains(where)) || (ins.Tab_BuMen!=null && ins.Tab_BuMen.bm_Name.Contains(where))).OrderByDescending(ins => ins.jl_Id).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
            else
            {
            
                var list = (from p in this.dataContext.Tab_RL_User

                           
                            where (pageClass == null || pageClass.filter == null || pageClass.filter.key == "-1" || pageClass.filter.key != "gongzuozhuangtai") ? true : (pageClass.filter.value == null ? p.jl_GongZuoZhuangTai == null : p.jl_GongZuoZhuangTai.Equals(pageClass.filter.value))
                           

                            //在这里添加筛选条件
                            select p
                         );
                if (pageClass.order != null && pageClass.order.key != null)
                {
                    switch (pageClass.order.key)
                    {
                        case "xingming":
                            if (pageClass.order.value == "1")
                            {
                                list = list.OrderBy(p => p.jl_Name);
                            }
                            else
                            {
                                list = list.OrderByDescending(p => p.jl_Name);
                            }
                            break;
                        //在这里添加排序条件
                    }
                }
                
                return list.Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
        }

        public bool savePhoto(int id, string dir)
        {
            DTO.Tab_RL_User user= this.dataContext.Tab_RL_User.FirstOrDefault(p=>p.jl_Id==id);
            user.jl_ZhaoPian = dir;
            try
            {
                this.dataContext.SubmitChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public DAL.CommClass.keyValueClass[] getAllKeyValue(params string[] tabs)
        {
            queryConfig(tabs);
            return (from p in this.dataContext.Tab_RL_User
                    orderby p.jl_Name
                    select new CommClass.keyValueClass
                    {
                        key = p.jl_Id,
                        value = p.jl_Name
                    }).ToArray();         
        }

        public DAL.DTO.Tab_RL_GongZuoZhuangTai[] listGZZT()
        {
            return this.dataContext.Tab_RL_GongZuoZhuangTai.OrderBy(p=>p.zt_Order).ToArray();
        }


        /// <summary>
        /// 按编号排序的所有记录
        /// </summary>
        /// <param name="tabs"></param>
        /// <returns></returns>
        internal List<Tab_RL_User> getAllSort(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_User.OrderBy(p => p.jl_YuanGongBianHao).ToList();
        }

        public Tab_RL_User getByName(string userName, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_RL_User.FirstOrDefault(p => p.jl_Name.Trim() == userName.Trim());
        }
    }
}
