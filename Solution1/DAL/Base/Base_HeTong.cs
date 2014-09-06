using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Linq;
using System.Linq.Expressions;
using DAL.DTO;
using System.Text.RegularExpressions;


namespace DAL
{
    public class Base_HeTong:Base
    {
        /// <summary>
        /// 合同付款方式
        /// </summary>
        /// <returns></returns>
        public List<DTO.Tab_HT_FuKuanFangShi> listHTFKFS(params string[] tabs) {
            queryConfig(tabs);
            return this.dataContext.Tab_HT_FuKuanFangShi.ToList<DTO.Tab_HT_FuKuanFangShi>();
        }
        /// <summary>
        /// 工程地点
        /// </summary>
        /// <returns></returns>
        public List<DTO.Tab_HT_GongChengDiDian> listGCDD(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_HT_GongChengDiDian.ToList<DTO.Tab_HT_GongChengDiDian>();
        }
        /// <summary>
        /// 合同
        /// </summary>
        /// <returns></returns>
        public List<DTO.TabHeTong> listHeTong(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.TabHeTong.ToList<DTO.TabHeTong>();
        }
        /// <summary>
        /// 获取方式
        /// </summary>
        /// <returns></returns>
        public List<DTO.Tab_HT_HuoQuFangShi> listHQFS(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_HT_HuoQuFangShi.ToList<DTO.Tab_HT_HuoQuFangShi>();
        }
        /// <summary>
        /// 合同签订状态
        /// </summary>
        /// <returns></returns>
        public List<DTO.Tab_HT_QianDingZhuangTai> listHTQDZT(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_HT_QianDingZhuangTai.ToList<DTO.Tab_HT_QianDingZhuangTai>();
        }
        /// <summary>
        /// 合同执行部门
        /// </summary>
        /// <returns></returns>
        public List<DTO.Tab_HT_ZhiXingBuMen> listHTZXBM(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_HT_ZhiXingBuMen.ToList<DTO.Tab_HT_ZhiXingBuMen>();
        }
        /// <summary>
        /// 投资性质
        /// </summary>
        /// <returns></returns>
        public List<DTO.Tab_HT_TouZiXingZhi> listTZXZ(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_HT_TouZiXingZhi.ToList<DTO.Tab_HT_TouZiXingZhi>();
        }
        /// <summary>
        /// 项目分类
        /// </summary>
        /// <returns></returns>
        public List<DTO.Tab_HT_XiangMuFenLei> listXMFL(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_HT_XiangMuFenLei.ToList<DTO.Tab_HT_XiangMuFenLei>();
        }
        /// <summary>
        /// 业务类型
        /// </summary>
        /// <returns></returns>
        public List<DTO.Tab_HT_YeWuLeiXing> listYWLX(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_HT_YeWuLeiXing.ToList<DTO.Tab_HT_YeWuLeiXing>();
        }
        /// <summary>
        /// （变更）合同变更方式
        /// </summary>
        /// <returns></returns>
        public List<DTO.Tab_BG_FangShi> listHTBGFS(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_BG_FangShi.ToList<DTO.Tab_BG_FangShi>();
        }
        /// <summary>
        /// （变更）监理费类型
        /// </summary>
        /// <returns></returns>
        public List<DTO.Tab_BG_JianLiFeiLeiXing> listJLFLX(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_BG_JianLiFeiLeiXing.ToList<DTO.Tab_BG_JianLiFeiLeiXing>();
        }
        /// <summary>
        /// （发票）款项性质
        /// </summary>
        /// <returns></returns>
        public List<DTO.Tab_FP_KuanXiangXingZhi> listKXXZ(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_FP_KuanXiangXingZhi.ToList<DTO.Tab_FP_KuanXiangXingZhi>();
        }
        /// <summary>
        /// （合同附本）归档情况
        /// </summary>
        /// <returns></returns>
        public List<DTO.Tab_HTV_GuiDangQingKuang> listGDQK(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_HTV_GuiDangQingKuang.ToList();
        }
        /// <summary>
        /// 工程状态
        /// </summary>
        /// <returns></returns>
        public List<DTO.Tab_HTV_GongChengZhuangTai> listGCZT(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_HTV_GongChengZhuangTai.ToList();
        }
        /// <summary>
        /// 合同金额说明
        /// </summary>
        /// <param name="tabs"></param>
        /// <returns></returns>
        public List<DTO.Tab_HT_JinEShuoMing> listJESM(params string[] tabs) {
            queryConfig(tabs);
            return this.dataContext.Tab_HT_JinEShuoMing.ToList();
        }
        /// <summary>
        /// 收费方式
        /// </summary>
        /// <param name="tabs"></param>
        /// <returns></returns>
        public List<DTO.Tab_HT_ShouFeiFangShi> listSFFS(params string[] tabs) {
            return this.dataContext.Tab_HT_ShouFeiFangShi.ToList();
        }
        /// <summary>
        /// 保存一个对象
        /// </summary>
        /// <param name="ht"></param>
        /// <returns></returns>
        public DTO.TabHeTong Save(DTO.TabHeTong ht) {
            return this.Save<DTO.TabHeTong>(ht);
        }
        /// <summary>
        /// 设置查询需要返回哪些关联表。
        /// </summary>
        /// <param name="tabs"></param>
        private void queryConfig(params string[] tabs)
        {
            if (tabs!=null && tabs.Length == 0)
            {
                this.dataContext.DeferredLoadingEnabled = false;
            }
            else
            {
                DataLoadOptions dl = new DataLoadOptions();
                if (tabs == null || tabs.Contains("TabHeTongBianGeng"))
                {
                    dl.LoadWith<DTO.TabHeTong>(tab => tab.TabHeTongBianGeng);
                }
                if (tabs == null || tabs.Contains("TabShouKuanJiHua") )
                {
                    dl.LoadWith<DTO.TabHeTong>(tab => tab.TabShouKuanJiHua);
                }
                if (tabs == null || tabs.Contains("TabJieSuanGuanLi"))
                {
                    dl.LoadWith<DTO.TabHeTong>(tab => tab.TabJieSuanGuanLi);
                }
                if (tabs == null || tabs.Contains("TabFaPiaoJiShouKuanGuanLi"))
                {
                    dl.LoadWith<DTO.TabHeTong>(tab => tab.TabFaPiaoJiShouKuanGuanLi);
                }
                if (tabs == null || tabs.Contains("TabXiangMuQianQi"))
                {
                    dl.LoadWith<DTO.TabHeTong>(tab => tab.TabXiangMuQianQi);
                }
                if (tabs == null || tabs.Contains("TabHeTongVice"))
                {
                    dl.LoadWith<DTO.TabHeTong>(tab => tab.TabHeTongVice);
                }
                if (tabs == null || tabs.Contains("Tab_HT_FuKuanFangShi"))
                {
                    dl.LoadWith<DTO.TabHeTong>(tab => tab.Tab_HT_FuKuanFangShi);
                }
                if (tabs == null || tabs.Contains("Tab_HT_GongChengDiDian"))
                {
                    dl.LoadWith<DTO.TabHeTong>(tab => tab.Tab_HT_GongChengDiDian);
                }
                if (tabs == null || tabs.Contains("Tab_HT_HuoQuFangShi") )
                {
                    dl.LoadWith<DTO.TabHeTong>(tab => tab.Tab_HT_HuoQuFangShi);
                }
                if (tabs == null || tabs.Contains("Tab_HT_JinEShuoMing"))
                {
                    dl.LoadWith<DTO.TabHeTong>(tab => tab.Tab_HT_JinEShuoMing);
                }
                if (tabs == null || tabs.Contains("Tab_HT_QianDingZhuangTai") )
                {
                    dl.LoadWith<DTO.TabHeTong>(tab => tab.Tab_HT_QianDingZhuangTai);
                }
                if (tabs == null || tabs.Contains("Tab_HT_ShouFeiFangShi") )
                {
                    dl.LoadWith<DTO.TabHeTong>(tab => tab.Tab_HT_ShouFeiFangShi);
                }
                if (tabs == null || tabs.Contains("Tab_HT_TouZiXingZhi") )
                {
                    dl.LoadWith<DTO.TabHeTong>(tab => tab.Tab_HT_TouZiXingZhi);
                }
                if (tabs == null || tabs.Contains("Tab_HT_XiangMuFenLei"))
                {
                    dl.LoadWith<DTO.TabHeTong>(tab => tab.Tab_HT_XiangMuFenLei);
                }
                if (tabs == null || tabs.Contains("Tab_HT_YeWuLeiXing"))
                {
                    dl.LoadWith<DTO.TabHeTong>(tab => tab.Tab_HT_YeWuLeiXing);
                }
                this.dataContext.LoadOptions = dl;
            }
        }

        /// <summary>
        /// 计算所有的记录数
        /// </summary>
        /// <returns></returns>
        public int countAllHeTong(DAL.CommClass.PageClass pageClass,string where)
        {
            if (where != null)
            {
                return this.dataContext.TabHeTong.Where(ins=>(ins.TabXiangMuQianQi!=null && ins.TabXiangMuQianQi.qq_HeTongHao==where) || ins.ht_MingCheng.Contains(where)).Count();
            }
            else
            {
                queryConfig(new String[] { "TabXiangMuQianQi" });
              ////  byte? id= byte.Parse(pageClass.filter.Value);
                return (from p in this.dataContext.TabHeTong
                          join k in this.dataContext.TabXiangMuQianQi
                          on p.ht_QqId equals k.qq_Id
                        where (pageClass == null || pageClass.filter == null || pageClass.filter.key == "-1" || pageClass.filter.key != "zhixingleixing") ? true : (pageClass.filter.value == null ? k.qq_ZhiXingLeiXing == null : k.qq_ZhiXingLeiXing.Equals(pageClass.filter.value))
                       
                        //where (pageClass == null) ? true : "1" == pageClass.filter.Value
                          select p
                         ).Count();

              
            }
        }
      
        /// <summary>
        /// 返回分段记录
        /// </summary>
        /// <param name="pageClass"></param>
        /// <returns></returns>
        public List<DTO.TabHeTong> filterAllHeTong(CommClass.PageClass pageClass,string where,params string[] tabs) {
            queryConfig(tabs);
            //htTongList = htTongList.OrderByDescending(p => int.Parse(Regex.Replace(p.TabXiangMuQianQi.qq_HeTongHao, @"[^0-9]", string.Empty))).ToList();//排序
            if (where != null)
            {
                return this.dataContext.TabHeTong.Where(ins =>(ins.TabXiangMuQianQi!=null && ins.TabXiangMuQianQi.qq_HeTongHao==where) || ins.ht_MingCheng.Contains(where)).OrderByDescending(p => p.TabXiangMuQianQi.qq_HeTongHao).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
            else {
                //return this.dataContext.TabHeTong.OrderByDescending(p => p.TabXiangMuQianQi.qq_HeTongHao).Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
                queryConfig(new String[] { "TabXiangMuQianQi" });
              //  byte? id = byte.Parse(pageClass.filter.Value);
                var list = (from p in this.dataContext.TabHeTong
                            join k in this.dataContext.TabXiangMuQianQi
                            on p.ht_QqId equals k.qq_Id

                            where (pageClass == null || pageClass.filter == null || pageClass.filter.key == "-1" || pageClass.filter.key != "zhixingleixing") ? true : (pageClass.filter.value == null ? k.qq_ZhiXingLeiXing == null : k.qq_ZhiXingLeiXing.Equals(pageClass.filter.value))
                            //在这里添加筛选条件
                            select p
                         );
                if (pageClass.order !=null && pageClass.order.key != null)
                {
                    switch (pageClass.order.key)
                    { 
                        case "hetonghao":
                            if (pageClass.order.value=="1")
                            {
                                list = list.OrderBy(p => p.TabXiangMuQianQi.qq_HeTongHao);
                            }
                            else {
                                list = list.OrderByDescending(p => p.TabXiangMuQianQi.qq_HeTongHao);
                            }
                            break;
                            //在这里添加排序条件
                    }
                }
                return list.Skip((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize).ToList();
            }
        }

        public int Updates(TabHeTong[] objs)
        {
            int returnValue = 0;
            TabHeTong[] query = (from i in this.dataContext.TabHeTong where objs.Select(ins => ins.ht_Id).Contains(i.ht_Id) select i).ToArray();
            foreach (TabHeTong q in query)
            {
                TabHeTong item = objs.FirstOrDefault(ins => ins.ht_Id == q.ht_Id);
                this.CopyObjectPoperty<TabHeTong, TabHeTong>(item, q);
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
            var query = from i in this.dataContext.TabHeTong where ids.Contains(i.ht_Id) select i;
            this.dataContext.TabHeTong.DeleteAllOnSubmit(query);
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

        public TabHeTong getById(int htId, params string[] tabs)
        {
            queryConfig(tabs);
            var dd= this.dataContext.TabHeTong.FirstOrDefault(ins => ins.ht_Id == htId);
            return dd;
        }

        public List<TabHeTong> getAll()
        {
            return this.dataContext.TabHeTong.ToList();    
        }

        /// <summary>
        /// 统计
        /// </summary>
        /// <param name="fs_Name">项目来源</param>
        /// <param name="dd_Name">工程地点</param>
        /// <param name="fk_Name">付款方式</param>
        /// <param name="zt_Name">签订状态</param>
        /// <param name="xz_Name">投资性质</param>
        /// <param name="fl_Name">项目分类</param>
        /// <param name="lx_Name">业务类型</param>
        /// <param name="bm_Name">执行部门</param>
        /// <param name="qq_ShiJian_Start">项目时间_开始</param>
        /// <param name="qq_ShiJian_End">项目时间_结束</param>
        /// <param name="zhiXingLeiXing">执行类型</param>
        /// <param name="ht_MingCheng">合同关键字</param>
        /// <param name="ht_Number">合同号</param>
        /// <param name="ht_YeZhuMingCheng">业主名称</param>
        /// <param name="ht_YiFangQianYueDanWei">乙方签约单位</param>
        /// <param name="ht_QianYueRiQi_Start">合同签约日期_开始</param>
        /// <param name="ht_QianYueRiQi_End">合同签约日期_结束</param>
        /// <returns></returns>
        public List<TabHeTong> listHeTongByWhere(DAL.CommClass.QueryWhereHT queryWhereHT)
        {
            //queryConfig(null);
            var hetong = this.dataContext.TabHeTong.ToList();
            if (queryWhereHT.fs_Name.HasValue)
            {
                hetong = hetong.FindAll(ins => ins.TabXiangMuQianQi.qq_XiangMuLaiYuan.Value == queryWhereHT.fs_Name.Value);
            }
            if (queryWhereHT.zhiXingLeiXing.HasValue)
            {
                hetong = hetong.FindAll(ins => ins.TabXiangMuQianQi!=null && ins.TabXiangMuQianQi.Tab_HT_ZhiXingBuMen!=null && ins.TabXiangMuQianQi.Tab_HT_ZhiXingBuMen.bm_Id== queryWhereHT.zhiXingLeiXing.Value);
            }
            if (queryWhereHT.dd_Name.HasValue)
            {
                hetong = hetong.FindAll(ins => ins.ht_GongChengDiDian.Value == queryWhereHT.dd_Name.Value);
            }
            if (queryWhereHT.fk_Name.HasValue)
            {
                hetong = hetong.FindAll(ins => ins.ht_HeTongFuKuanFangShi.Value == queryWhereHT.fk_Name.Value);
            }
            if (queryWhereHT.zt_Name.HasValue)
            {
                hetong = hetong.FindAll(ins => ins.ht_QianDingZhuangTai.Value == queryWhereHT.zt_Name.Value);
            }
            if (queryWhereHT.xz_Name.HasValue)
            {
                hetong = hetong.FindAll(ins => ins.ht_TouZiXinZhi.Value == queryWhereHT.xz_Name.Value);
            }
            if (queryWhereHT.fl_Name.HasValue)
            {
                hetong = hetong.FindAll(ins => ins.ht_XiangMuFenLei.Value == queryWhereHT.fl_Name.Value);
            }
            if (queryWhereHT.lx_Name.HasValue)
            {
                hetong = hetong.FindAll(ins => ins.ht_YeWuLeiXing.Value == queryWhereHT.lx_Name.Value);
            }
            if (queryWhereHT.qq_ShiJian_Start.HasValue)
            {
                hetong = hetong.FindAll(ins => ins.TabXiangMuQianQi.qq_ShiJian >= queryWhereHT.qq_ShiJian_Start.Value);
            }
            if (queryWhereHT.qq_ShiJian_End.HasValue)
            {
                hetong = hetong.FindAll(ins => ins.TabXiangMuQianQi.qq_ShiJian <= queryWhereHT.qq_ShiJian_End.Value);
            }
          
            if (queryWhereHT.ht_MingCheng != null && queryWhereHT.ht_MingCheng.Trim() != String.Empty)
            {
                hetong = hetong.FindAll(ins => ins.ht_MingCheng.Contains(queryWhereHT.ht_MingCheng.Trim()));
            }
            if (queryWhereHT.ht_Number != null && queryWhereHT.ht_Number.Trim() != String.Empty)
            {
                hetong = hetong.FindAll(ins => ins.ht_Number == queryWhereHT.ht_Number.Trim());
            }
            if (queryWhereHT.ht_YeZhuMingCheng != null && queryWhereHT.ht_YeZhuMingCheng.Trim() != String.Empty)
            {
                hetong = hetong.FindAll(ins => ins.ht_YeZhuMingCheng.Contains(queryWhereHT.ht_YeZhuMingCheng.Trim()));
            }
            if (queryWhereHT.ht_YiFangQianYueDanWei != null && queryWhereHT.ht_YiFangQianYueDanWei.Trim() != String.Empty)
            {
                hetong = hetong.FindAll(ins => ins.ht_YiFangQianYueDanWei.Contains(queryWhereHT.ht_YiFangQianYueDanWei.Trim()));
            }
            if (queryWhereHT.ht_QianYueRiQi_Start.HasValue)
            {
                hetong = hetong.FindAll(ins => ins.ht_QianYueRiQi.Value >= queryWhereHT.ht_QianYueRiQi_Start.Value);
            }
            if (queryWhereHT.ht_QianYueRiQi_End.HasValue)
            {
                hetong = hetong.FindAll(ins => ins.ht_QianYueRiQi.Value <= queryWhereHT.ht_QianYueRiQi_End.Value);
            }
            return hetong;
        }
    }
}
