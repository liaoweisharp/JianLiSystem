using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Linq;
using DAL.DTO;

namespace DAL
{
    public class Base_XiangMuQianQi:Base
    {
        /// <summary>
        /// 保存一个对象
        /// </summary>
        /// <param name="ht"></param>
        /// <returns></returns>
        public TabXiangMuQianQi Save(TabXiangMuQianQi xiangMuQianQi)
        {
            return this.Save<DTO.TabXiangMuQianQi>(xiangMuQianQi);
        }
        public int Updates(TabXiangMuQianQi[] objs)
        {
            int returnValue = 0;
            TabXiangMuQianQi[] query = (from i in this.dataContext.TabXiangMuQianQi where objs.Select(ins => ins.qq_Id).Contains(i.qq_Id) select i).ToArray();
            foreach (TabXiangMuQianQi q in query)
            {
                TabXiangMuQianQi item = objs.FirstOrDefault(ins => ins.qq_Id == q.qq_Id);
                this.CopyObjectPoperty<TabXiangMuQianQi, TabXiangMuQianQi>(item, q);
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
            var query = from i in this.dataContext.TabXiangMuQianQi where ids.Contains(i.qq_Id) select i;
            this.dataContext.TabXiangMuQianQi.DeleteAllOnSubmit(query);
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
        public int countAllQianQi()
        {
            return this.dataContext.TabXiangMuQianQi.Count();
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
                if (tabs.Contains("TabHeTong"))
                {
                    dl.LoadWith<DTO.TabXiangMuQianQi>(tab => tab.TabHeTong);
                }
                if (tabs.Contains("Tab_DiaoDong"))
                {
                    dl.LoadWith<DTO.TabXiangMuQianQi>(tab => tab.Tab_DiaoDong);
                }
                if (tabs.Contains("Tab_HT_XiangMuFenLei"))
                {
                    dl.LoadWith<DTO.TabXiangMuQianQi>(tab => tab.Tab_HT_XiangMuFenLei);
                }
                if (tabs.Contains("Tab_HT_ZhiXingBuMen"))
                {
                    dl.LoadWith<DTO.TabXiangMuQianQi>(tab => tab.Tab_HT_ZhiXingBuMen);
                }
                if (tabs.Contains("Tab_RL_User"))
                {
                    dl.LoadWith<DTO.TabXiangMuQianQi>(tab => tab.Tab_RL_User);
                }
                if (tabs.Contains("Tab_RL_User1"))
                {
                    dl.LoadWith<DTO.TabXiangMuQianQi>(tab => tab.Tab_RL_User1);
                }
                if (tabs.Contains("Tab_RL_User2"))
                {
                    dl.LoadWith<DTO.TabXiangMuQianQi>(tab => tab.Tab_RL_User2);
                }
                if (tabs.Contains("Tab_RL_User3"))
                {
                    dl.LoadWith<DTO.TabXiangMuQianQi>(tab => tab.Tab_RL_User3);
                }
                if (tabs.Contains("Tab_XiangMu_ShiJian"))
                {
                    dl.LoadWith<DTO.TabXiangMuQianQi>(tab => tab.Tab_XiangMu_ShiJian);
                }
                if (tabs.Contains("Tab_XiangMu_XunJian"))
                {
                    dl.LoadWith<DTO.TabXiangMuQianQi>(tab => tab.Tab_XiangMu_XunJian);
                }
                if (tabs.Contains("Tab_XiangMu_YiJiaoMingXi"))
                {
                    dl.LoadWith<DTO.TabXiangMuQianQi>(tab => tab.Tab_XiangMu_YiJiaoMingXi);
                }
                if (tabs.Contains("Tab_XiangMu_ZhiGuan"))
                {
                    dl.LoadWith<DTO.TabXiangMuQianQi>(tab => tab.Tab_XiangMu_ZhiGuan);
                }
                if (tabs.Contains("Tab_XiangMu_JiXiao"))
                {
                    dl.LoadWith<DTO.TabXiangMuQianQi>(tab => tab.Tab_XiangMu_JiXiao);
                }
                if (tabs.Contains("Tab_XiangMu_JieSuanNeiRong"))
                {
                    dl.LoadWith<DTO.TabXiangMuQianQi>(tab => tab.Tab_XiangMu_JieSuanNeiRong);
                }
                if (tabs.Contains("Tab_XiangMu_FeiYongTiaoZheng"))
                {
                    dl.LoadWith<DTO.TabXiangMuQianQi>(tab => tab.Tab_XiangMu_FeiYongTiaoZheng);
                }
                if (tabs.Contains("Tab_XiangMu_BaoXiao"))
                {
                    dl.LoadWith<DTO.TabXiangMuQianQi>(tab => tab.Tab_XiangMu_BaoXiao);
                }
                if (tabs.Contains("Tab_XiangMu_BanGongYongPin"))
                {
                    dl.LoadWith<DTO.TabXiangMuQianQi>(tab => tab.Tab_XiangMu_BanGongYongPin);
                }
                if (tabs.Contains("Tab_XiangMu_PeiXunJiJiao"))
                {
                    dl.LoadWith<DTO.TabXiangMuQianQi>(tab => tab.Tab_XiangMu_PeiXunJiJiao);
                }
                if (tabs.Contains("Tab_Report_MonthSalaryDetail_ChengBen"))
                {
                    dl.LoadWith<DTO.TabXiangMuQianQi>(tab => tab.Tab_Report_MonthSalaryDetail_ChengBen);
                }
                this.dataContext.LoadOptions = dl;
            }
        }

        public List<TabXiangMuQianQi> filterAllXiangMuQianQi(CommClass.PageClass pageClass,string where,params string[] tabs)
        {
            queryConfig(tabs);
            //int?[] qq_ParentIds = (from p in this.dataContext.TabXiangMuQianQi where p.qq_ParentId != null select p.qq_ParentId).Distinct().ToArray();
            var list = this.dataContext.TabXiangMuQianQi.Where(p => p.qq_LeiXing == 1 || p.qq_LeiXing==null);//排除监理组
            if (where != null)
            {
                return list.Where(p => (p.qq_HeTongHao != null && p.qq_HeTongHao == where) || (p.qq_GongChengMingCheng != null && p.qq_GongChengMingCheng.Contains(where))).OrderBy(ins => ins.TabHeTong.Count).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
            else {
                return list.OrderBy(ins => ins.TabHeTong.Count).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
        }
        /// <summary>
        /// 得到事业部
        /// </summary>
        /// <param name="pageClass"></param>
        /// <param name="where"></param>
        /// <param name="tabs"></param>
        /// <returns></returns>
        public List<TabXiangMuQianQi> filterAllXiangMuQianQi_ShiYeBu(CommClass.PageClass pageClass, string where, params string[] tabs)
        {
            queryConfig(tabs);
            if (where != null)
            {
                return this.dataContext.TabXiangMuQianQi.Where(p => p.Tab_HT_ZhiXingBuMen != null && p.Tab_HT_ZhiXingBuMen.bm_Id== 3 && ((p.qq_HeTongHao != null && p.qq_HeTongHao == where) || (p.qq_GongChengMingCheng != null && p.qq_GongChengMingCheng.Contains(where)))).OrderBy(ins => ins.TabHeTong.Count).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
            else
            {
                return this.dataContext.TabXiangMuQianQi.Where(p=>p.Tab_HT_ZhiXingBuMen != null && p.Tab_HT_ZhiXingBuMen.bm_Id== 3).OrderBy(ins => ins.TabHeTong.Count).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
        }
        /// <summary>
        /// 得到直管
        /// </summary>
        /// <param name="pageClass"></param>
        /// <param name="where"></param>
        /// <param name="tabs"></param>
        /// <returns></returns>
        public List<TabXiangMuQianQi> filterAllXiangMuQianQi_ZhiGuan(CommClass.PageClass pageClass, string where, params string[] tabs)
        {
            queryConfig(tabs);
            if (where != null)
            {
                return this.dataContext.TabXiangMuQianQi.Where(p => p.Tab_HT_ZhiXingBuMen != null && p.Tab_HT_ZhiXingBuMen.bm_Id == 2 && ((p.qq_HeTongHao != null && p.qq_HeTongHao == where) || (p.qq_GongChengMingCheng != null && p.qq_GongChengMingCheng.Contains(where)))).OrderBy(ins => ins.TabHeTong.Count).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
            else
            {
                return this.dataContext.TabXiangMuQianQi.Where(p => p.Tab_HT_ZhiXingBuMen != null && p.Tab_HT_ZhiXingBuMen.bm_Id == 2).OrderBy(ins => ins.TabHeTong.Count).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
        }

        /// <summary>
        /// 既没挂监理组也没挂项目组的直管项目
        /// </summary>
        /// <param name="pageClass"></param>
        /// <param name="where"></param>
        /// <param name="tabs"></param>
        /// <returns></returns>
        public List<TabXiangMuQianQi> filterAllXiangMuQianQi_ZhiGuan_JustXiangMu(CommClass.PageClass pageClass, string where, params string[] tabs)
        {
            queryConfig(tabs);
            var list=this.dataContext.TabXiangMuQianQi.Where(p=>(p.qq_XiangMuZhuId==null && p.qq_ParentId==null));//后加的
            if (where != null)
            {
                return list.Where(p => p.Tab_HT_ZhiXingBuMen != null && p.Tab_HT_ZhiXingBuMen.bm_Id == 2 && ((p.qq_HeTongHao != null && p.qq_HeTongHao == where) || (p.qq_GongChengMingCheng != null && p.qq_GongChengMingCheng.Contains(where)))).OrderBy(ins => ins.TabHeTong.Count).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
            else
            {
                return list.Where(p => p.Tab_HT_ZhiXingBuMen != null && p.Tab_HT_ZhiXingBuMen.bm_Id == 2).OrderBy(ins => ins.TabHeTong.Count).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
        }
        /// <summary>
        /// 得到没有合同的项目
        /// </summary>
        /// <returns></returns>
        public List<TabXiangMuQianQi> getNoHeTong()
        {
            queryConfig(new string[]{"TabHeTong"});
            return this.dataContext.TabXiangMuQianQi.Where(ins => ins.TabHeTong.Count == 0 && (ins.qq_LeiXing==null || ins.qq_LeiXing==1)).ToList();
        }

        public TabXiangMuQianQi getById(int id, params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.TabXiangMuQianQi.FirstOrDefault(ins => ins.qq_Id==id);
        }

        public int countAllHeTong(CommClass.PageClass pageClass, string where)
        {
            //int?[] qq_ParentIds = (from p in this.dataContext.TabXiangMuQianQi where p.qq_ParentId != null select p.qq_ParentId).Distinct().ToArray();
            var list = this.dataContext.TabXiangMuQianQi.Where(p => p.qq_LeiXing==null || p.qq_LeiXing==1);//排除监理组
            if (where != null)
            {
                return list.Where(p => (p.qq_HeTongHao != null && p.qq_HeTongHao == where) || (p.qq_GongChengMingCheng != null && p.qq_GongChengMingCheng.Contains(where))).Count();
            }
            else {
                return list.Count();
            }
        }
        /// <summary>
        /// 项目排序后返回
        /// </summary>
        /// <returns></returns>
        public CommClass.keyValueClass[] getDistinctXiangMu(params string[] tabs)
        {
            queryConfig(tabs);
            return (from p in this.dataContext.TabXiangMuQianQi
                                           orderby p.qq_GongChengMingCheng
                                           select new CommClass.keyValueClass
                                           {
                                               key = p.qq_Id,
                                               value = p.qq_GongChengMingCheng + " " + p.qq_HeTongHao 
                                           }).ToArray();            
        }

        public DAL.DTO.Tab_XiangMu_JiBie[] listXMJB()
        {
            return this.dataContext.Tab_XiangMu_JiBie.OrderBy(p => p.jb_Order).ToArray();
        }
        public DAL.DTO.Tab_HT_XiangMuFenLei[] listXMLB()
        {
            return this.dataContext.Tab_HT_XiangMuFenLei.ToArray();
        }


        public int countShiYeBu(CommClass.PageClass pageClass, string where)
        {
            if (where != null)
            {
                return this.dataContext.TabXiangMuQianQi.Where(p => p.Tab_HT_ZhiXingBuMen != null && p.Tab_HT_ZhiXingBuMen.bm_Id == 3 && ((p.qq_HeTongHao != null && p.qq_HeTongHao == where) || (p.qq_GongChengMingCheng != null && p.qq_GongChengMingCheng.Contains(where)))).Count();
            }
            else
            {
                return this.dataContext.TabXiangMuQianQi.Count(p => p.Tab_HT_ZhiXingBuMen != null && p.Tab_HT_ZhiXingBuMen.bm_Id == 3);
            }
        }

        public int countZhiGuan_JustXiangMu(CommClass.PageClass pageClass, string where)
        {
            var list = this.dataContext.TabXiangMuQianQi.Where(p => p.qq_ParentId == null && p.qq_XiangMuZhuId == null);
            if (where != null)
            {
                return list.Where(p => p.Tab_HT_ZhiXingBuMen != null && p.Tab_HT_ZhiXingBuMen.bm_Id == 2 && ((p.qq_HeTongHao != null && p.qq_HeTongHao == where) || (p.qq_GongChengMingCheng != null && p.qq_GongChengMingCheng.Contains(where)))).Count();
            }
            else
            {
                return list.Count(p => p.Tab_HT_ZhiXingBuMen != null && p.Tab_HT_ZhiXingBuMen.bm_Id == 2);
            }
        }
       
        /// <summary>
        /// 返回有项目组的键值
        /// </summary>
        /// <returns></returns>
        public List<CommClass.keyValueClass> getByHaveXiangMuZu()
        {
            List<CommClass.keyValueClass> list = (from p in this.dataContext.TabXiangMuQianQi
                                                  where (p.qq_LeiXing == 2 && p.Tab_XiangMuZu != null) || ((p.qq_LeiXing == 1 || p.qq_LeiXing == null) && p.TabXiangMuQianQi1 == null && p.Tab_XiangMuZu != null)
                                                  orderby p.Tab_XiangMuZu.xmz_Name + p.qq_GongChengMingCheng
                                                select new CommClass.keyValueClass
                                                {
                                                    key = p.qq_Id,
                                                    value = (p.qq_HeTongHao != null && p.qq_HeTongHao != "") ? (p.Tab_XiangMuZu.xmz_Name + " -> " + p.qq_GongChengMingCheng + "  " + p.qq_HeTongHao) : ( p.Tab_XiangMuZu.xmz_Name + " -> " + p.qq_GongChengMingCheng)
                                                }).ToList();
            return list;
        }
        /// <summary>
        /// 得到项目监理机构的键值对
        /// </summary>
        /// <returns></returns>
        public List<CommClass.keyValueClass> getByJianLiJiGou()
        {
            List<CommClass.keyValueClass> list = (from p in this.dataContext.TabXiangMuQianQi
                                                  where p.qq_LeiXing == 2 && p.Tab_XiangMuZu != null
                                                  orderby p.Tab_XiangMuZu.xmz_Name + p.qq_GongChengMingCheng
                                                  select new CommClass.keyValueClass
                                                  {
                                                      key = p.qq_Id,
                                                      value = String.Format("{0} -> {1} ({2})", p.Tab_XiangMuZu.xmz_Name, p.qq_GongChengMingCheng, String.Join(",", p.TabXiangMuQianQi2.Select(ins => ins.qq_HeTongHao).OrderBy(ins=>ins))),
                                                      //value = (p.qq_HeTongHao != null && p.qq_HeTongHao != "") ? (p.Tab_XiangMuZu.xmz_Name + " -> " + p.qq_GongChengMingCheng + "  " + p.qq_HeTongHao) : (p.Tab_XiangMuZu.xmz_Name + " -> " + p.qq_GongChengMingCheng)
                                                  }).ToList();
            return list;
        }
        /// <summary>
        /// 返回没有项目组的项目键值
        /// </summary>
        /// <returns></returns>
        public List<CommClass.keyValueClass> getByNoXiangMuZu()
        {
            List<CommClass.keyValueClass> list = (from p in this.dataContext.TabXiangMuQianQi
                                                  where (p.qq_LeiXing == 1 || p.qq_LeiXing == null) && p.Tab_XiangMuZu == null && p.TabXiangMuQianQi1 == null
                                                  orderby p.qq_GongChengMingCheng
                                                  select new CommClass.keyValueClass
                                                  {
                                                      key = p.qq_Id,
                                                      value = p.qq_GongChengMingCheng + "  " + p.qq_HeTongHao
                                                  }).ToList();
            return list;
        }



        public List<CommClass.keyValueClass> getByXiangMuZuId(int xiangMuZuId)
        {
            return (from p in this.dataContext.TabXiangMuQianQi
                    where p.qq_XiangMuZhuId == xiangMuZuId
                    && (p.qq_LeiXing == 2 || ((p.qq_LeiXing == 1 || p.qq_LeiXing==null) && p.qq_ParentId==null) )
                    orderby p.qq_GongChengMingCheng
                    select new CommClass.keyValueClass
                    {
                        key = p.qq_Id,
                        value = p.qq_GongChengMingCheng
                    }).ToList();
        }

        public void updateXiangMuZuId(int id)
        {
            this.ExecuteCommand("update TabXiangMuQianQi set qq_XiangMuZhuId=null where qq_XiangMuZhuId=" + id);
        }

        public void updateParentId(int id)
        {
            this.ExecuteCommand("update TabXiangMuQianQi set qq_ParentId=null where qq_ParentId=" + id);
        }
    }
}
