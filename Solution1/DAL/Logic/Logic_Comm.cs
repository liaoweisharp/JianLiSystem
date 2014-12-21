using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;

namespace DAL.Logic
{
    public class Logic_Comm
    {
        /// <summary>
        /// //暂定监理费总额（监理费总额）	
        /// </summary>
        /// <param name="ht"></param>
        /// <returns></returns>
        public static decimal getZanDingJianLiFei(DAL.DTO.TabHeTong ht)
        {
            decimal jl = 0;
            if (ht.TabHeTongVice != null && ht.TabHeTongVice.htv_JieSuanJianLiFei.HasValue)
            {
                jl = ht.TabHeTongVice.htv_JieSuanJianLiFei.Value;
            }
            else
            {
                if (ht.ht_HeTongJinE.HasValue)
                {
                    jl += ht.ht_HeTongJinE.Value;
                }
                if (ht.TabHeTongVice != null && ht.TabHeTongVice.htv_YanQiZongE.HasValue)
                {
                    jl += ht.TabHeTongVice.htv_YanQiZongE.Value;
                }
                if (ht.TabHeTongBianGeng.Count > 0)
                {
                    decimal? _temp = ht.TabHeTongBianGeng.Sum(bg => bg.bg_BuChongQianDingFeiYong);
                    if (_temp.HasValue)
                    {
                        jl += _temp.Value;
                    }
                }
            }
            return jl;
        }
        /// <summary>
        /// //累计应收款总额
        /// </summary>
        /// <param name="ht"></param>
        /// <returns></returns>
        public static decimal getLeiJiYingShouKuan(DAL.DTO.TabHeTong ht)
        {
            decimal yingShouKuanZongE = 0;
            if (ht.TabFaPiaoJiShouKuanGuanLi.Count > 0)
            {
                decimal? _temp = ht.TabFaPiaoJiShouKuanGuanLi.Sum(fp => fp.fp_YingShouJingE);
                if (_temp.HasValue)
                {
                    yingShouKuanZongE = _temp.Value;
                }
            }
            return yingShouKuanZongE;
        }
        /// <summary>
        /// //累计实收款总额	
        /// </summary>
        /// <param name="ht"></param>
        /// <returns></returns>
        public static decimal getLeiJiShiShouKuan(DAL.DTO.TabHeTong ht)
        {

            decimal yiShouKuanZongE = 0;
            if (ht.TabFaPiaoJiShouKuanGuanLi.Count > 0)
            {
                decimal? _temp = ht.TabFaPiaoJiShouKuanGuanLi.Sum(fp => fp.fp_ShiShouJinE);
                if (_temp.HasValue)
                {
                    yiShouKuanZongE = _temp.Value;
                }
            }
            return yiShouKuanZongE;
        }
        /// <summary>
        /// //累计开票总额
        /// </summary>
        /// <param name="ht"></param>
        /// <returns></returns>
        public static decimal getLeiJiKaiPai(DAL.DTO.TabHeTong ht)
        {
            decimal leJiYiKaiPiaoZongE = 0;
            if (ht.TabFaPiaoJiShouKuanGuanLi.Count > 0)
            {
                decimal? _temp = ht.TabFaPiaoJiShouKuanGuanLi.Sum(fp => fp.fp_FaPiaoJinE);
                if (_temp.HasValue)
                {
                    leJiYiKaiPiaoZongE = _temp.Value;
                }
            }
            return leJiYiKaiPiaoZongE;
        }
        /// <summary>
        /// 项目总成本支出
        /// </summary>
        /// <param name="qq"></param>
        /// <returns></returns>
        public static decimal? getXiangMuZongChengBenZhiChu(DTO.TabXiangMuQianQi qq)
        {
            decimal chenBen = 0;
            decimal? cb1= qq.Tab_Report_MonthSalaryDetail_ChengBen.Sum(p => p.msdcd_JinE);//薪酬（个人）
            decimal? cb7 = qq.Tab_Report_MonthSalaryDetail_ChengBen.Sum(p => p.msdcd_SheBaoGongSi);//薪酬（公司）
            decimal? cb2 = qq.Tab_XiangMu_BanGongYongPin.Sum(p => p.bgyp_JinE);//办公用品
            decimal? cb3 = qq.Tab_XiangMu_BaoXiao.Sum(p => p.bx_JinE);//报销
            decimal? cb4 = qq.Tab_XiangMu_FeiYongTiaoZheng.Sum(p => p.fytz_JinE);//费用调整
            decimal? cb5 = qq.Tab_XiangMu_JiXiao.Sum(p => p.jx_JinE);//绩效
            decimal? cb6 = qq.Tab_XiangMu_PeiXunJiJiao.Sum(p => p.pxjj_JinE);//培训继教育
            chenBen += cb1.HasValue ? cb1.Value : 0;
            chenBen += cb7.HasValue ? cb7.Value : 0;
            chenBen = chenBen * 0.0001m;//薪酬的单位是元，下面几项单位是万元
            chenBen += cb2.HasValue ? cb2.Value : 0;
            chenBen += cb3.HasValue ? cb3.Value : 0;
            chenBen += cb4.HasValue ? cb4.Value : 0;
            chenBen += cb5.HasValue ? cb5.Value : 0;
            chenBen += cb6.HasValue ? cb6.Value : 0;
            
            
            return chenBen;

        }
        /// <summary>
        /// 计算所得税
        /// </summary>
        /// <param name="totalSalary">应领工资（扣税前）</param>
        /// <returns></returns>
        public static decimal getSuoDeShui(decimal totalSalary)
        {
            decimal suoDeShui = 0;
            decimal qiZhengDian = 3500m;//起征点
            decimal shuiLv = 0m;
            decimal kouChuShu = 0m;//速算扣除数
            decimal shuiE = totalSalary - qiZhengDian;//应缴纳税额
            if (shuiE > 0)
            {
                if (shuiE <= 1500)
                {
                    shuiLv = 0.03m;
                    kouChuShu = 0;
                }
                else if (shuiE > 1500 && shuiE <= 4500)
                {
                    shuiLv = 0.1m;
                    kouChuShu = 105;
                }
                else if (shuiE > 4500 && shuiE <= 9000)
                {
                    shuiLv = 0.2m;
                    kouChuShu = 555;
                }
                else if (shuiE > 9000 && shuiE <= 35000)
                {
                    shuiLv = 0.25m;
                    kouChuShu = 1005;
                }
                else if (shuiE > 35000 && shuiE <= 55000)
                {
                    shuiLv = 0.3m;
                    kouChuShu = 2755;
                }
                else if (55000 > 35000 && shuiE <= 80000)
                {
                    shuiLv = 0.35m;
                    kouChuShu = 5505;
                }
                else if (shuiE > 80000)
                {
                    shuiLv = 0.45m;
                    kouChuShu = 13505;
                }
            }
            suoDeShui = shuiE * shuiLv - kouChuShu;
            return Math.Round(suoDeShui, 2);//保留两位小数
        }
        public static decimal getSuoDeShui(Tab_RL_XinChou obj)
        {
            decimal xiaoJi_YingFa = 0;//应发小计
            xiaoJi_YingFa += obj.xc_YF_GangWeiGongZi;
            xiaoJi_YingFa += obj.xc_YF_GuaZhengFei;
            xiaoJi_YingFa += obj.xc_YF_JiaoTong;
            xiaoJi_YingFa += obj.xc_YF_JiBenGongZi;
            xiaoJi_YingFa += obj.xc_YF_ShengHuo;
            xiaoJi_YingFa += obj.xc_YF_TongXun;
            xiaoJi_YingFa += obj.xc_YF_ZhuWai;
            decimal xiaoJi_YingKou = 0;//应扣小计
            xiaoJi_YingKou += obj.xc_YK_DaBing;
            xiaoJi_YingKou += obj.xc_YK_FengXianJin;
            xiaoJi_YingKou += obj.xc_YK_GongShang;
            xiaoJi_YingKou += obj.xc_YK_ShengYu;
            xiaoJi_YingKou += obj.xc_YK_ShiYe;
            xiaoJi_YingKou += obj.xc_YK_YangLao;
            xiaoJi_YingKou += obj.xc_YK_YiLiao;

            //return Logic.Logic_Comm.getSuoDeShui(xiaoJi_YingFa - xiaoJi_YingKou );//这是国家规定（和下面是二选一）
            return Logic.Logic_Comm.getSuoDeShui(xiaoJi_YingFa - xiaoJi_YingKou - obj.xc_YK_FengXianJin);//明清特殊要求
        }
    }
}
