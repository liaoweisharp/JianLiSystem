using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.CommClass;
using System.Collections;

namespace DAL.Logic
{
    public class Logic_XiangMu
    {
        public static List<DAL.CommClass.XiangMuQianQiWrapper> filterAllXiangMuQianQi(DAL.CommClass.PageClass pageClass, string where, params string[] tabs)
        {
            DAL.Base_XiangMuQianQi ins = new Base_XiangMuQianQi();
            List<DAL.DTO.TabXiangMuQianQi> qqList = ins.filterAllXiangMuQianQi(pageClass, where, tabs);
            DAL.Base ins2 = new Base();
            List<DAL.CommClass.XiangMuQianQiWrapper> qqWrapperList = ins2.CopyObjectsPoperty<DAL.CommClass.XiangMuQianQiWrapper, DTO.TabXiangMuQianQi>(qqList);
            for (int i = 0; i < qqWrapperList.Count; i++)
            {
                if (qqList[i].TabHeTong.Count == 1)
                {
                    qqWrapperList[i].haveHeTong = true;
                }
                else
                {
                    qqWrapperList[i].haveHeTong = false;
                }
            }
            return qqWrapperList;
        }
        /// <summary>
        /// 项目界面
        /// </summary>
        /// <param name="pageClass"></param>
        /// <param name="where"></param>
        /// <param name="tabs"></param>
        /// <returns></returns>
        //public static List<DAL.CommClass.XiangMuJiSuan_ShiYeBuWrapper> filterAllXiangMuJiSuan_ShiYeBu(CommClass.PageClass pageClass, string where)
        //{
        //    List<DAL.CommClass.XiangMuJiSuan_ShiYeBuWrapper> returnValue = new List<CommClass.XiangMuJiSuan_ShiYeBuWrapper>();
        //    DAL.Base_XiangMuQianQi _ins = new Base_XiangMuQianQi();
        //    List<DAL.DTO.TabXiangMuQianQi> qqList = _ins.filterAllXiangMuQianQi_ShiYeBu(pageClass, where, new String[] { "Tab_RL_User3", "TabHeTong" });
        //    foreach (DAL.DTO.TabXiangMuQianQi item in qqList)
        //    {
        //        DAL.CommClass.XiangMuJiSuan_ShiYeBuWrapper obj = new CommClass.XiangMuJiSuan_ShiYeBuWrapper();
        //        obj.id = item.qq_Id;
        //        obj.heTongHao = item.qq_HeTongHao == null ? "" : item.qq_HeTongHao;
        //        obj.gongChengMingCheng = item.qq_GongChengMingCheng == null ? "" : item.qq_GongChengMingCheng; ;
        //        obj.shiShouGuanLiFeiZongE = 0;
        //        if (item.TabHeTong.Count == 1)
        //        {
        //            if (item.TabHeTong[0].TabFaPiaoJiShouKuanGuanLi != null)
        //            {
        //                obj.shiShouKuanZongE = item.TabHeTong[0].TabFaPiaoJiShouKuanGuanLi.Sum(p => p.fp_ShiShouJinE.HasValue ? p.fp_ShiShouJinE.Value : 0);
        //                obj.yiJieSuanZongE = item.TabHeTong[0].TabFaPiaoJiShouKuanGuanLi.Sum(p => p.fp_hs_BenCiJieSuanJinE.HasValue ? p.fp_hs_BenCiJieSuanJinE.Value : 0);
        //                obj.weiJieSuanZongE = obj.shiShouKuanZongE - obj.yiJieSuanZongE;
        //                obj.shiShouGuanLiFeiZongE = item.TabHeTong[0].TabFaPiaoJiShouKuanGuanLi.Sum(p => p.fp_hs_ShiShouGuanLiFeiZongE.HasValue ? p.fp_hs_ShiShouGuanLiFeiZongE.Value : 0);
        //            }
        //        }
        //        obj.xiangMuFuZeRen = item.Tab_RL_User3 != null ? item.Tab_RL_User3.jl_Name : "";
        //        obj.yeZhuMingCheng = item.qq_YeZhuMingCheng == null ? "" : item.qq_YeZhuMingCheng;

        //        if (item.TabHeTong.Count == 1)
        //        {
        //            obj.zanDingJianLiFeiZongE = Logic_Comm.getZanDingJianLiFei(item.TabHeTong.First());
        //        }
        //        else
        //        {
        //            obj.zanDingJianLiFeiZongE = 0;
        //        }
        //        returnValue.Add(obj);
        //    }
        //    return returnValue;
        //}
        /// <summary>
        /// 
        /// </summary>
        /// <param name="pageClass"></param>
        /// <param name="where"></param>
        /// <returns></returns>
        public static List<DAL.CommClass.XiangMuJiSuan_ShiYeBuWrapper> filterAllXiangMuJiSuan_ShiYeBu(CommClass.PageClass pageClass, string where)
        {
            List<DAL.CommClass.XiangMuJiSuan_ShiYeBuWrapper> returnValue = new List<CommClass.XiangMuJiSuan_ShiYeBuWrapper>();
            DAL.ViewBase_JieSuan_ShiYeBu _ins = new DAL.ViewBase_JieSuan_ShiYeBu();
            List<DTO.View_JieSuan_ShiYeBu> objList = _ins.filter(pageClass, where);
            string[] tabs = new String[] { "TabHeTong" };
            List<DTO.TabXiangMuQianQi> qqList = new DAL.Base_XiangMuQianQi().getByIds(objList.Select(p => p.qq_Id).ToArray(),tabs);
            foreach (DTO.View_JieSuan_ShiYeBu ins in objList) {
                DAL.CommClass.XiangMuJiSuan_ShiYeBuWrapper obj = new XiangMuJiSuan_ShiYeBuWrapper();
                obj.gongChengMingCheng = ins.qq_GongChengMingCheng;
                obj.heTongHao = ins.qq_HeTongHao;
                obj.id = ins.qq_Id;
                obj.yeZhuMingCheng = ins.qq_YeZhuMingCheng;
                obj.xiangMuFuZeRen = ins.jl_Name;
                obj.jiGouId = ins.jiGou_ID;
                obj.jiGouName = ins.jiGou_Name;
                obj.zuId = ins.zu_ID;
                obj.zuName = ins.zu_Name;
                DTO.TabXiangMuQianQi qq= qqList.FirstOrDefault(p => p.qq_Id == ins.qq_Id);
                if (qq.TabHeTong.Count == 1)
                {
                    obj.zanDingJianLiFeiZongE = Logic_Comm.getZanDingJianLiFei(qq.TabHeTong.First());
                }
                else
                {
                    obj.zanDingJianLiFeiZongE = 0;
                }
                obj.shiShouGuanLiFeiZongE = 0;
                if (qq.TabHeTong.Count == 1)
                {
                    if (qq.TabHeTong[0].TabFaPiaoJiShouKuanGuanLi != null)
                    {
                        obj.shiShouKuanZongE = qq.TabHeTong[0].TabFaPiaoJiShouKuanGuanLi.Sum(p => p.fp_ShiShouJinE.HasValue ? p.fp_ShiShouJinE.Value : 0);
                        obj.yiJieSuanZongE = qq.TabHeTong[0].TabFaPiaoJiShouKuanGuanLi.Sum(p => p.fp_hs_BenCiJieSuanJinE.HasValue ? p.fp_hs_BenCiJieSuanJinE.Value : 0);
                        obj.weiJieSuanZongE = obj.shiShouKuanZongE - obj.yiJieSuanZongE;
                        obj.shiShouGuanLiFeiZongE = qq.TabHeTong[0].TabFaPiaoJiShouKuanGuanLi.Sum(p => p.fp_hs_ShiShouGuanLiFeiZongE.HasValue ? p.fp_hs_ShiShouGuanLiFeiZongE.Value : 0);
                    }
                }
                returnValue.Add(obj);
            }
            return returnValue;
        }

        //public static List<DAL.CommClass.XiangMuHouQiWrapper2> filterAllXiangMuHouQi2(CommClass.PageClass pageClass, string where)
        //{
        //    //pageClass.filter.key = "type";
        //    //pageClass.filter.value = "shiYeBu";

        //    List<DAL.CommClass.XiangMuHouQiWrapper2> returnValue = new List<CommClass.XiangMuHouQiWrapper2>();
        //    DAL.Base_XiangMuZu _ins = new Base_XiangMuZu();
        //    List<DAL.DTO.Tab_XiangMuZu> xiangMuZuList = _ins.filterAllXiangMuZu(pageClass, where, new String[] { "TabXiangMuQianQi" });
        //    foreach (DAL.DTO.Tab_XiangMuZu zu in xiangMuZuList) {
        //        DAL.CommClass.XiangMuHouQiWrapper2 wrapper = new XiangMuHouQiWrapper2();
        //        wrapper.xiangMuBuId = zu.xmz_Id;
        //        wrapper.xiangMuBuMingCheng = zu.xmz_Name;
        //        wrapper.jianLiJiGouArray = new List<XiangMuHouQiWrapper1>();
        //        if (zu.TabXiangMuQianQi.Count > 0)
        //        { 
        //            //先选出监理机构
        //            List<DTO.TabXiangMuQianQi> list_Zu = zu.TabXiangMuQianQi.Where(p => p.qq_LeiXing == 2).ToList();
        //            ///排序
        //            list_Zu = list_Zu.OrderBy(p => p.qq_GongChengMingCheng).ToList();
        //            foreach (DTO.TabXiangMuQianQi qq in list_Zu) {
        //                DAL.CommClass.XiangMuHouQiWrapper1 jianliZu = new XiangMuHouQiWrapper1();
        //                jianliZu.jianLiJiGouId = qq.qq_Id;
        //                jianliZu.jianLiJiGouMingCheng = qq.qq_GongChengMingCheng;
        //                jianliZu.projectArray=new List<XiangMuHouQiWrapper>();
        //                jianliZu.projectArray.AddRange(_fun(qq.TabXiangMuQianQi2.ToList()));
        //                wrapper.jianLiJiGouArray.Add(jianliZu);
        //            }
        //            ////再选出工程
        //            //List<DTO.TabXiangMuQianQi> list_Project = zu.TabXiangMuQianQi.Where(p => p.qq_ParentId==null && (p.qq_LeiXing ==null || p.qq_LeiXing==1)).ToList();
        //            /////排序
        //            //list_Project = list_Project.OrderBy(p => p.qq_GongChengMingCheng).ToList();
        //            //foreach (DTO.TabXiangMuQianQi qq in list_Project)
        //            //{
        //            //    DAL.CommClass.XiangMuHouQiWrapper1 jianliZu = new XiangMuHouQiWrapper1();
        //            //    jianliZu.jianLiJiGouId = qq.qq_Id;
        //            //    jianliZu.jianLiJiGouMingCheng = qq.qq_GongChengMingCheng;
        //            //    jianliZu.projectArray=new List<XiangMuHouQiWrapper>();
        //            //    jianliZu.projectArray.AddRange(_fun(new List<DTO.TabXiangMuQianQi>() { qq }));
        //            //    wrapper.jianLiJiGouArray.Add(jianliZu);
        //            //}
        //            returnValue.Add(wrapper);
        //        }
        //    }
        
        //    return returnValue;
        //}
        //private static List<DAL.CommClass.XiangMuHouQiWrapper> _fun(List<DTO.TabXiangMuQianQi> list)
        //{
        //    List<DAL.CommClass.XiangMuHouQiWrapper> returnValue = new List<XiangMuHouQiWrapper>();
        //    foreach (DAL.DTO.TabXiangMuQianQi obj in list)
        //    {
        //        DAL.CommClass.XiangMuHouQiWrapper ins = new CommClass.XiangMuHouQiWrapper();
        //        ins.projectId = obj.qq_Id;
        //        ins.gongChengMingCheng = obj.qq_GongChengMingCheng == null ? "" : obj.qq_GongChengMingCheng;
        //        ins.gongChengZhuanTai = obj.qq_GongChengZhuangTai == null ? "" : obj.qq_GongChengZhuangTai;
        //        ins.liHuiShiJian = obj.qq_GongDiLiHuiShiJian == null ? "" : obj.qq_GongDiLiHuiShiJian;
        //        ins.shiGongGonqQi = obj.qq_ShiGongGongQi == null ? "" : obj.qq_ShiGongGongQi;
        //        ins.yuJiJunGongShiJian = obj.qq_YuJiJunGongShiJian.HasValue ? obj.qq_YuJiJunGongShiJian.Value.ToShortDateString() : "";
        //        ins.zhiXingLeiXing = obj.Tab_HT_ZhiXingBuMen != null ? obj.Tab_HT_ZhiXingBuMen.bm_Name : "";
        //        ins.zhiXingLeiXing = obj.Tab_HT_ZhiXingBuMen != null ? obj.Tab_HT_ZhiXingBuMen.bm_Name : "";
        //        ins.zhiXingLeiXingId = obj.qq_ZhiXingLeiXing;
        //        string name = "";
        //        if (obj.Tab_DiaoDong.Count > 0)
        //        {
        //            var dd = from p in obj.Tab_DiaoDong where p.dd_GangWei != null && p.dd_GangWei.Trim() == "总监" select p.Tab_RL_User1;
        //            int temp = 0;
        //            foreach (DTO.Tab_RL_User user in dd)
        //            {
        //                if (temp > 0)
        //                {
        //                    name += "<br/>";
        //                }
        //                name += user.jl_Name;
        //                temp++;
        //            }
        //        }
        //        ins.xiangMuZongJian = name;
        //        ins.xiangMuFuZeRen = obj.Tab_RL_User == null ? "" : obj.Tab_RL_User.jl_Name;
        //        returnValue.Add(ins);
        //    }
        //    return returnValue;
        //}
        
        //public static List<DAL.CommClass.XiangMuJiSuan_ShiYeBuWrapper> filterAllXiangMuJiSuan_ShiYeBu(CommClass.PageClass pageClass, string where)
        //{
        //    List<DAL.CommClass.XiangMuJiSuan_ShiYeBuWrapper> returnValue = new List<CommClass.XiangMuJiSuan_ShiYeBuWrapper>();
        //    DAL.Base_XiangMuQianQi _ins = new Base_XiangMuQianQi();
        //    List<DAL.DTO.TabXiangMuQianQi> qqList = _ins.filterAllXiangMuQianQi_ShiYeBu(pageClass, where, new String[] { "Tab_RL_User3", "TabHeTong" });
        //    foreach (DAL.DTO.TabXiangMuQianQi item in qqList)
        //    {
        //        DAL.CommClass.XiangMuJiSuan_ShiYeBuWrapper obj = new CommClass.XiangMuJiSuan_ShiYeBuWrapper();
        //        obj.id = item.qq_Id;
        //        obj.heTongHao = item.qq_HeTongHao == null ? "" : item.qq_HeTongHao;
        //        obj.gongChengMingCheng = item.qq_GongChengMingCheng == null ? "" : item.qq_GongChengMingCheng; ;
        //        obj.shiShouGuanLiFeiZongE = 0;
        //        if (item.TabHeTong.Count == 1)
        //        { 
        //            if(item.TabHeTong[0].TabFaPiaoJiShouKuanGuanLi!=null)
        //            {
        //                obj.shiShouKuanZongE = item.TabHeTong[0].TabFaPiaoJiShouKuanGuanLi.Sum(p => p.fp_ShiShouJinE.HasValue ? p.fp_ShiShouJinE.Value : 0);
        //                obj.yiJieSuanZongE = item.TabHeTong[0].TabFaPiaoJiShouKuanGuanLi.Sum(p => p.fp_hs_BenCiJieSuanJinE.HasValue ? p.fp_hs_BenCiJieSuanJinE.Value : 0);
        //                obj.weiJieSuanZongE = obj.shiShouKuanZongE - obj.yiJieSuanZongE;
        //                obj.shiShouGuanLiFeiZongE = item.TabHeTong[0].TabFaPiaoJiShouKuanGuanLi.Sum(p => p.fp_hs_ShiShouGuanLiFeiZongE.HasValue ? p.fp_hs_ShiShouGuanLiFeiZongE.Value : 0);
        //            } 
        //        }
        //        obj.xiangMuFuZeRen = item.Tab_RL_User3 != null ? item.Tab_RL_User3.jl_Name : "";
        //        obj.yeZhuMingCheng = item.qq_YeZhuMingCheng == null ? "" : item.qq_YeZhuMingCheng; 
              
        //        if (item.TabHeTong.Count == 1)
        //        {
        //            obj.zanDingJianLiFeiZongE = Logic_Comm.getZanDingJianLiFei(item.TabHeTong.First());
        //        }
        //        else {
        //            obj.zanDingJianLiFeiZongE = 0;
        //        }
        //        returnValue.Add(obj);
        //    }
        //    return returnValue;
        //}
        public static List<CommClass.XiangMuJiSuan_ZhiGuanWrapper> filterAllXiangMuQianQi_ZhiGuan_JustXiangMu(CommClass.PageClass pageClass, string where)
        {
            List<CommClass.XiangMuJiSuan_ZhiGuanWrapper> returnValue = new List<CommClass.XiangMuJiSuan_ZhiGuanWrapper>();
            DAL.Base_XiangMuQianQi _ins = new Base_XiangMuQianQi();
            List<DAL.DTO.TabXiangMuQianQi> qqList = _ins.filterAllXiangMuQianQi_ZhiGuan_JustXiangMu(pageClass, where, new String[] { "Tab_XiangMu_ZhiGuan", "TabHeTong", "Tab_XiangMu_BanGongYongPin", "Tab_XiangMu_BaoXiao", "Tab_XiangMu_FeiYongTiaoZheng", "Tab_XiangMu_JiXiao", "Tab_XiangMu_PeiXunJiJiao", "Tab_Report_MonthSalaryDetail_ChengBen" });
            foreach (DAL.DTO.TabXiangMuQianQi item in qqList) {
                DAL.CommClass.XiangMuJiSuan_ZhiGuanWrapper obj = new CommClass.XiangMuJiSuan_ZhiGuanWrapper();
                obj.chenBenKongZhiZhiBiao=item.Tab_XiangMu_ZhiGuan!=null?item.Tab_XiangMu_ZhiGuan.zg_mb_ChengBenKongZhiZhiBiao:null;
                obj.heTongHao = item.qq_HeTongHao;
                obj.gongChengMingCheng = item.qq_GongChengMingCheng;
                obj.id = item.qq_Id;
                obj.shiShouKuanZongE = item.TabHeTong.Count == 1 ? Logic_Comm.getLeiJiShiShouKuan(item.TabHeTong.First()) : 0;
                obj.xiangMuJingLi = "";//改动
                obj.zanDingJianLiFeiZongE = item.TabHeTong.Count == 1 ? Logic_Comm.getZanDingJianLiFei(item.TabHeTong.First()) : 0;
                obj.zongChengBenZhiChu = DAL.Logic.Logic_Comm.getXiangMuZongChengBenZhiChu(item);
                returnValue.Add(obj);
            }
            return returnValue;
        }
    
        public static List<XiangMuJiSuan_ZhiGuanWrapperZu> filterAllXiangMuQianQi_ZhiGuan_Zu(PageClass pageClass, string where)
        {
            List<XiangMuJiSuan_ZhiGuanWrapperZu> returnValue = new List<XiangMuJiSuan_ZhiGuanWrapperZu>();
            List<DTO.View_JieSuan_ZhiGuan> xiangMuList = new DAL.ViewBase_JieSuan_ZhiGuan().filter(pageClass, where);
            int[] qqIds=xiangMuList.Select(p => p.qq_Id).ToArray();

            List<DTO.TabXiangMuQianQi> qqList = new DAL.Base_XiangMuQianQi().getByIds(qqIds, new string[] { "TabXiangMuQianQi1", "TabXiangMuQianQi2", "Tab_XiangMu_PeiXunJiJiao", "Tab_XiangMu_JiXiao", "Tab_XiangMu_FeiYongTiaoZheng", "Tab_XiangMu_ZhiGuan", "Tab_XiangMu_BaoXiao", "Tab_XiangMu_BanGongYongPin", "TabHeTong", "Tab_Report_MonthSalaryDetail_ChengBen", });
            foreach (DTO.View_JieSuan_ZhiGuan xiangMu in xiangMuList)
            {
                XiangMuJiSuan_ZhiGuanWrapperZu obj = new XiangMuJiSuan_ZhiGuanWrapperZu();
                obj.xiangMuBuId = xiangMu.zu_ID;
                obj.xiangMuBuMingCheng = xiangMu.zu_Name;
                obj.jianLiJiGouId = xiangMu.jiGou_ID;
                obj.jianLiJiGouMingCheng = xiangMu.jiGou_Name;
                obj.projectId = xiangMu.qq_Id;
                obj.projectMingCheng = xiangMu.qq_GongChengMingCheng;
                obj.heTongHao = xiangMu.qq_HeTongHao;
                DTO.TabXiangMuQianQi qq= qqList.FirstOrDefault(p => p.qq_Id == obj.projectId);
                if (qq != null) {
                    if (qq.TabXiangMuQianQi1 != null) {
                        obj.zongChengBenZhiChu = DAL.Logic.Logic_Comm.getXiangMuZongChengBenZhiChu(qq.TabXiangMuQianQi1);
                        obj.chenBenKongZhiZhiBiao = qq.TabXiangMuQianQi1.Tab_XiangMu_ZhiGuan != null ? qq.TabXiangMuQianQi1.Tab_XiangMu_ZhiGuan.zg_mb_ChengBenKongZhiZhiBiao : null;
                    }
                    
                    obj.shiShouKuanZongE = qq.TabHeTong.Count == 1 ? Logic_Comm.getLeiJiShiShouKuan(qq.TabHeTong.First()) : 0;
                    obj.zanDingJianLiFeiZongE = qq.TabHeTong.Count == 1 ? Logic_Comm.getZanDingJianLiFei(qq.TabHeTong.First()) : 0;
                }
                returnValue.Add(obj);
            }
            return returnValue;
        }
        /// <summary>
        /// 项目当月人员情况
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public static List<DAL.CommClass.XiangMuRenYuan> getCurrentMonthRenYuan(int projectId)
        {
            List<DAL.CommClass.XiangMuRenYuan> returnValue = new List<CommClass.XiangMuRenYuan>();
            DAL.Base_DiaoDong obj = new Base_DiaoDong();
            List<DAL.DTO.Tab_DiaoDong> ddList= obj.getByProjectId(projectId, new string[] { "Tab_RL_User1"});
            ///筛选出本月的数据
            ///
            DateTime now=new DateTime(DateTime.Now.Year,DateTime.Now.Month,DateTime.Now.Day);
            ddList=ddList.FindAll(p => p.dd_ShiJian <= now && (p.dd_EndShiJian.HasValue == false || (p.dd_EndShiJian.HasValue == true && p.dd_EndShiJian > now)));
            foreach (DAL.DTO.Tab_DiaoDong dd in ddList) {
                DAL.CommClass.XiangMuRenYuan ins = new CommClass.XiangMuRenYuan();
                ins.gangWei = dd.dd_GangWei;
                ins.jinRuDate = string.Format("{0:D}", dd.dd_ShiJian);
                //ins.tuiChuDate = dd.dd_EndShiJian.HasValue ? string.Format("{0:D}", dd.dd_EndShiJian) : null;//null为在岗状态
                ins.xingMing = dd.Tab_RL_User1 == null ? "" : dd.Tab_RL_User1.jl_Name;
                //ins.reason = dd.Tab_DiaoDongQingKuang == null ? "" : dd.Tab_DiaoDongQingKuang.ddqk_Name;
                if (dd.Tab_RL_User1 != null && dd.Tab_RL_User1.Tab_RL_ZhiYeZiGeZhengShu.Count > 0)
                {
                    ins.chiZhengQingKuang = dd.Tab_RL_User1.Tab_RL_ZhiYeZiGeZhengShu.Select(p => p.zgzs_ZhengShuMingCheng).ToArray();
                }
                returnValue.Add(ins);
            }
            return returnValue;
        }
        /// <summary>
        /// 项目所有人员情况
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public static List<DAL.CommClass.XiangMuRenYuan> getAllRenYuan(int projectId)
        {
            List<DAL.CommClass.XiangMuRenYuan> returnValue = new List<CommClass.XiangMuRenYuan>();
            DAL.Base_DiaoDong obj = new Base_DiaoDong();
            List<DTO.Tab_DiaoDong> ddList = obj.getByProjectId(projectId, new string[] { "Tab_RL_User1", "Tab_DiaoDongQingKuang" });
            //
            foreach (DTO.Tab_DiaoDong dd in ddList.FindAll(p => p.dd_EndShiJian > DateTime.Now)) {
                dd.dd_EndShiJian = null;
            }
            foreach (DTO.Tab_DiaoDong dd in ddList) {
                DAL.CommClass.XiangMuRenYuan ins = new CommClass.XiangMuRenYuan();
                ins.gangWei = dd.dd_GangWei;
                ins.jinRuDate = string.Format("{0:D}", dd.dd_ShiJian);
                ins.tuiChuDate = dd.dd_EndShiJian.HasValue ? string.Format("{0:D}", dd.dd_EndShiJian) : null;//null为在岗状态
                ins.xingMing = dd.Tab_RL_User1 == null ? "" : dd.Tab_RL_User1.jl_Name;
                
                if(dd.Tab_RL_User1!=null && dd.Tab_RL_User1.Tab_RL_ZhiYeZiGeZhengShu.Count>0)
                {
                    ins.chiZhengQingKuang = dd.Tab_RL_User1.Tab_RL_ZhiYeZiGeZhengShu.Select(p=>p.zgzs_ZhengShuMingCheng).ToArray();
                }
                returnValue.Add(ins);
            }
            return returnValue;
        }
        /// <summary>
        /// 得到项目移交明细
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public static List<DAL.CommClass.XiangMuMingXiWrapper> getXiangMuMingXiByProjectId(int projectId) {
            List<DAL.CommClass.XiangMuMingXiWrapper> returnValue = new List<CommClass.XiangMuMingXiWrapper>();
            DAL.Base_XiangMu_YiJiaoMingXi ins = new Base_XiangMu_YiJiaoMingXi();
            List<DAL.DTO.Tab_XiangMu_YiJiaoMingXi> mingXiArray= ins.getByProjectId(projectId, new string[] { "Tab_XiangMu_YiJiaoDan" });
            ins.Dispose();
            foreach (DAL.DTO.Tab_XiangMu_YiJiaoMingXi item in mingXiArray) {
                DAL.CommClass.XiangMuMingXiWrapper obj = new CommClass.XiangMuMingXiWrapper();
                obj.beiZhu = item.mx_BeiZhu;
                obj.bianHao = item.Tab_XiangMu_YiJiaoDan == null ? "" : item.Tab_XiangMu_YiJiaoDan.yjd_BianHao.ToString();
                obj.leiBie = item.Tab_XiangMu_YiJiaoDan == null ? "" : item.Tab_XiangMu_YiJiaoDan.yjd_LieBie.ToString();
                obj.lieBieBianHao = item.Tab_XiangMu_YiJiaoDan == null ? "" : item.Tab_XiangMu_YiJiaoDan.yjd_LeiBieBianHao == null ? "" : item.Tab_XiangMu_YiJiaoDan.yjd_LeiBieBianHao;
                obj.shuLiang = item.mx_ShuLiang;
                obj.yeMaFanWei = item.mx_YeMaFanWei;
                obj.ziLiaoMingCheng = item.Tab_XiangMu_YiJiaoDan == null ? "" : item.Tab_XiangMu_YiJiaoDan.yjd_Name;
                returnValue.Add(obj);
            }
            return returnValue;
        }
        /// <summary>
        /// 得到项目移交基本信息
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public static DAL.CommClass.XiangMuYiJiaoWrapper getXiangMuYiJiaoByProjectId(int projectId)
        {
            DAL.Base_XiangMuQianQi _base = new Base_XiangMuQianQi();
            DTO.TabXiangMuQianQi xiangMu = _base.getById(projectId, new String[] { "Tab_RL_User", "Tab_RL_User1", "Tab_RL_User2" });
            DAL.CommClass.XiangMuYiJiaoWrapper yiJiao = new CommClass.XiangMuYiJiaoWrapper();
            if(xiangMu!=null)
            {
                yiJiao.jieShouRen = xiangMu.Tab_RL_User == null ? "" : xiangMu.Tab_RL_User.jl_Name;
                yiJiao.jieShouRenDianHua = xiangMu.Tab_RL_User == null ? "" : xiangMu.Tab_RL_User.jl_LianXiFangShi_1 == null ? "" : xiangMu.Tab_RL_User.jl_LianXiFangShi_1;
                yiJiao.jieShouShiJian = xiangMu.qq_JunGongYiJiao_ShiJian.HasValue == false ? "" : xiangMu.qq_JunGongYiJiao_ShiJian.Value.ToShortDateString().ToString();
                yiJiao.yiJiaoRen = xiangMu.Tab_RL_User1 == null ? "" : xiangMu.Tab_RL_User1.jl_Name;
                yiJiao.yiJiaoRenDianHua = xiangMu.Tab_RL_User1 == null ? "" : xiangMu.Tab_RL_User1.jl_LianXiFangShi_1 == null ? "" : xiangMu.Tab_RL_User1.jl_LianXiFangShi_1;
                yiJiao.yiJiaoShiJian=xiangMu.qq_JunGongYiJiao_QianShoShiJian.HasValue == false ? "" : xiangMu.qq_JunGongYiJiao_QianShoShiJian.Value.ToShortDateString().ToString();
                yiJiao.zongJian=xiangMu.Tab_RL_User2==null?"":xiangMu.Tab_RL_User2.jl_Name;
                yiJiao.zongJianDianHua = xiangMu.Tab_RL_User2 == null ? "" : xiangMu.Tab_RL_User2.jl_LianXiFangShi_1 == null ? "" : xiangMu.Tab_RL_User2.jl_LianXiFangShi_1;
                if(xiangMu.qq_JunGongYiJiaoQingKuang.HasValue==false || xiangMu.qq_JunGongYiJiaoQingKuang.Value==0){
                    yiJiao.yiJiaoQingKuang = "未移交";
                }
                else if (xiangMu.qq_JunGongYiJiaoQingKuang.HasValue == true && xiangMu.qq_JunGongYiJiaoQingKuang.Value == 1) {
                    yiJiao.yiJiaoQingKuang = "全部移交";
                }
                else if (xiangMu.qq_JunGongYiJiaoQingKuang.HasValue == true && xiangMu.qq_JunGongYiJiaoQingKuang.Value == 2)
                {
                    yiJiao.yiJiaoQingKuang = "部分移交";
                }
            }
            return yiJiao;
        }

        public static List<CommClass.XiangMu_JieSuanMingXi> getXiangMu_JieSuanMingXiWrapperByProjectId(int projectId)
        {
            DAL.Base_FaPiaoJiShouKuan ins=new Base_FaPiaoJiShouKuan();
            List<DAL.DTO.TabFaPiaoJiShouKuanGuanLi> list= ins.getByProjectId(projectId);
            DAL.Base _base = new Base();
            List<DAL.CommClass.XiangMu_JieSuanMingXi> _list= _base.CopyObjectsPoperty<DAL.CommClass.XiangMu_JieSuanMingXi, DAL.DTO.TabFaPiaoJiShouKuanGuanLi>(list);
            DAL.Base_XiangMu_JieSuanNeiRong baseJieSuan=new Base_XiangMu_JieSuanNeiRong();
            DTO.Tab_XiangMu_JieSuanNeiRong jieSuanNeiRong= baseJieSuan.getById(projectId);

            if (jieSuanNeiRong != null && jieSuanNeiRong.jsnr_js_ShiFouJieSuan.HasValue && jieSuanNeiRong.jsnr_js_ShiFouJieSuan.Value==1)
            {
                DAL.CommClass.XiangMu_JieSuanMingXi newObj = new CommClass.XiangMu_JieSuanMingXi();
                newObj.isJieSuan = true;
                newObj.fp_hs_ZhiBaoJin = jieSuanNeiRong.jsnr_js_ZhiBaoJin;
                newObj.fp_DaoZhangShiJian = jieSuanNeiRong.jsnr_js_JieSuanRiQi;//到账时间

                _list.Add(newObj);
                _list=_list.OrderBy(p => p.fp_DaoZhangShiJian).ToList();//按到账时间排序
            }
            return _list;
        }
        /// <summary>
        /// 得到项目键值（区分项目分组和监理组情况）
        /// </summary>
        /// <returns></returns>
        public static List<keyValueClass> getAllXiangMuKeyValue() { 
            //项目组+没有项目组的
            List<keyValueClass> list = new List<keyValueClass>();
            DAL.Base_XiangMuQianQi b1 = new Base_XiangMuQianQi();
            List<keyValueClass> list1 = b1.getByJianLiJiGou();
           // List<keyValueClass> list2 = b1.getByNoXiangMuZu();
            list.AddRange(list1);
           // list.AddRange(list2);
            return list;
        }





        /// <summary>
        /// 项目的人员成本
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>

        public static List<XiangMuXinChouMonth> getXiangMu_RenYuanXinChouByProjectId(int projectId)
        {
            List<XiangMuXinChouMonth> returnValue = new List<XiangMuXinChouMonth>();
            DAL.Base_Report_MonthSalary b1 = new Base_Report_MonthSalary();
            List<DAL.DTO.Tab_Report_MonthSalary> monthSalaryList = b1.getAllSort();
            DAL.Base_Report_MonthSalaryGuiDang b2 = new Base_Report_MonthSalaryGuiDang();
            List<DAL.DTO.Tab_Report_MonthSalary_GuiDang> guiDangList=  b2.getByMonthSalaryIds(monthSalaryList.Select(p=>p.ms_Id).ToArray());
            DAL.Base_Report_MonthSalaryGuiDang_ChengBen b3 = new Base_Report_MonthSalaryGuiDang_ChengBen();
            //筛选出这个项目的
            List<DAL.DTO.Tab_Report_MonthSalaryDetail_ChengBen> chengBenList = b3.getByGuiDangIds(guiDangList.Select(p => p.msgd_Id).ToArray(), projectId); 

            foreach (DAL.DTO.Tab_Report_MonthSalary item in monthSalaryList) {
                XiangMuXinChouMonth obj = new XiangMuXinChouMonth();
                obj.monthSalaryId = item.ms_Id;
                obj.year = item.ms_Year;
                obj.month = item.ms_Month;
                int[] guiDangIds= guiDangList.FindAll(p => p.msgd_MsId == item.ms_Id).Select(p=>p.msgd_Id).ToArray();//这个月所有的归档IDs
                var temp=chengBenList.FindAll(p => guiDangIds.Contains(p.msdcd_MonthSalaryGuiDangId));
                decimal? sumOfJinE = temp.Sum(p => p.msdcd_JinE);
                decimal? sumOfGongSi = temp.Sum(p => p.msdcd_SheBaoGongSi);
                obj.jinE += sumOfJinE.HasValue ? sumOfJinE.Value : 0;//金额(个人)
                obj.jinE += sumOfGongSi.HasValue ? sumOfGongSi.Value : 0;//金额（公司）
                obj.jinE = obj.jinE * 0.0001m;//万元
                returnValue.Add(obj);
            }
            return returnValue;
        }

        public static int countHouQi2(PageClass pageClass, string where)
        {
            DAL.Base_XiangMuZu b1 = new Base_XiangMuZu();
            return b1.countXiangMuZu(pageClass,where);
        }

        public static bool updateMingXiInfo(int projectId, List<DTO.Tab_XiangMu_YiJiaoMingXi> mingXiArray, DTO.View_XiangMu_YiJiao yiJiaoQingKuang)
        {
            Base_XiangMu_YiJiaoMingXi b1 = new Base_XiangMu_YiJiaoMingXi();
            b1.deleteByProjectId(projectId);
            b1 = new Base_XiangMu_YiJiaoMingXi();
            b1.Saves(mingXiArray);
            ViewBase_XiangMu_YiJiaoQingKuang b2 = new ViewBase_XiangMu_YiJiaoQingKuang();
            b2.Updates(new DTO.View_XiangMu_YiJiao[] { yiJiaoQingKuang });
            return true;
        }
        /// <summary>
        /// 得到项目组、监理机构、项目四层结构（用于显示树形结构）(全部的，包括事业部和项目部)
        /// </summary>
        /// <returns></returns>
        public static ArrayList getXiangMuZuInfo()
        {
            ArrayList returnValue = new ArrayList();
            Base_XiangMuZu b1 = new Base_XiangMuZu();
            returnValue.Add(b1.getAll());
            ViewBase_XiangMu_Tree b2= new ViewBase_XiangMu_Tree();
            returnValue.Add(b2.getJianLiJiGou());
            //b2 = new ViewBase_XiangMu_Tree();
            //returnValue.Add(b2.getProjectOfNoJianLiJiGou());
            b2 = new ViewBase_XiangMu_Tree();
            returnValue.Add(new List<DTO.View_XiangMu_Tree>());//这里始终传空数组（后加）
            b2 = new ViewBase_XiangMu_Tree();
            returnValue.Add(b2.getProjectOfJianLiJiGou());
            return returnValue;
        }
        /// <summary>
        /// 得到项目组、监理机构、项目四层结构（用于显示树形结构）
        /// </summary>
        /// <returns></returns>
        public static ArrayList getXiangMuZuInfo(int zhiXingLeiXingId)
        {
            return new DAL.Base_XiangMuZu().getXiangMuZu_TreeInfo(zhiXingLeiXingId);
        }

        public int countXiangMuZu(PageClass pageClass, string where)
        {
            return new DAL.ViewBase_JieSuan_ZhiGuan().count(pageClass, where);
        }

        public int countShiYeBu(PageClass pageClass, string where)
        {
            return new DAL.ViewBase_JieSuan_ShiYeBu().count(pageClass, where);
        }
    }
}

