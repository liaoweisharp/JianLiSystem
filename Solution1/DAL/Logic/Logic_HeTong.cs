using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Text.RegularExpressions;

namespace DAL.Logic
{
    public class Logic_HeTong
    {
        /// <summary>
        /// 得到合同以及相应的合同变更
        /// </summary>
        /// <param name="htId"></param>
        /// <returns></returns>
        public static List<DAL.DTO.TabHeTong> getHTAndChild(int htId)
        {
            List<DAL.DTO.TabHeTong> returnValue = new List<DAL.DTO.TabHeTong>();
            DAL.Base_HeTong ins = new DAL.Base_HeTong();
            DAL.DTO.TabHeTong heTong = ins.getById(htId, new string[] { "TabHeTongBianGeng" });
            DAL.DTO.TabHeTong hetong1 = new DAL.DTO.TabHeTong();
            hetong1.ht_Id = heTong.ht_Id;
            hetong1.ht_Number = heTong.TabXiangMuQianQi!=null?heTong.TabXiangMuQianQi.qq_HeTongHao:"";
            hetong1.ht_MingCheng = heTong.ht_MingCheng;
            returnValue.Add(hetong1);
            DAL.DTO.TabHeTongBianGeng[] htbgArr = heTong.TabHeTongBianGeng.OrderBy(bg => bg.bg_MingCheng).ToArray();
            foreach (DAL.DTO.TabHeTongBianGeng htbg in htbgArr)
            {
                DAL.DTO.TabHeTong ht = new DAL.DTO.TabHeTong();
                ht.ht_Id = htbg.bg_Id;
                ht.ht_Number = htbg.bg_BianHao;
                ht.ht_MingCheng = htbg.bg_MingCheng;
                returnValue.Add(ht);
            }
            return returnValue;
        }
      
       
        public static List<DAL.CommClass.HeTongWrapper> filterHeTongWrappper(DAL.CommClass.PageClass pageClass,string where)
        {
            List<DAL.CommClass.HeTongWrapper> heTongWrapperList = new List<DAL.CommClass.HeTongWrapper>();
            DAL.Base_HeTong ins = new DAL.Base_HeTong();
            List<DAL.DTO.TabHeTong> htTongList = ins.filterAllHeTong(pageClass, where, new string[] { "TabHeTongVice", "TabHeTongBianGeng", "TabFaPiaoJiShouKuanGuanLi", "TabXiangMuQianQi" });
           
            //转换成Wrapper
            foreach (DAL.DTO.TabHeTong ht in htTongList)
            {
                DAL.CommClass.HeTongWrapper newObj = new DAL.CommClass.HeTongWrapper();
                newObj = ConvertToHeTongWrapper(ht);//转换函数
                heTongWrapperList.Add(newObj);
            }
            return heTongWrapperList;
        }
        public static DAL.CommClass.HeTongWrapper getHeTongWrappperById(int id)
        {
            DAL.Base_HeTong ins = new DAL.Base_HeTong();
            DAL.DTO.TabHeTong ht = ins.getById(id, new string[] { "TabHeTongVice", "TabHeTongBianGeng", "TabFaPiaoJiShouKuanGuanLi", "TabXiangMuQianQi" });

            //转换成Wrapper
            if (ht != null)
            {
                DAL.CommClass.HeTongWrapper newObj = new DAL.CommClass.HeTongWrapper();
                newObj = ConvertToHeTongWrapper(ht);
                
                return newObj;
            }
            else {
                return null;
            }

        }

        /// <summary>
        /// 转换函数
        /// </summary>
        /// <param name="ht"></param>
        /// <returns></returns>
        private static CommClass.HeTongWrapper ConvertToHeTongWrapper(TabHeTong ht)
        {
            DAL.CommClass.HeTongWrapper newObj = new DAL.CommClass.HeTongWrapper();
            newObj.ht_Id = ht.ht_Id;
            newObj.ht_MingCheng = ht.ht_MingCheng;
            newObj.heTongHao = (ht.TabXiangMuQianQi != null) ? ht.TabXiangMuQianQi.qq_HeTongHao : "";
            if (ht.TabHeTongVice != null)
            {
                if (ht.TabHeTongVice.htv_LvYueTuiHuanShiJian.HasValue) {
                    newObj.lvYueBaoZhengJin = 1;
                }
                else if (ht.TabHeTongVice.htv_LvYueYingTuiHuanRiQi.HasValue) {
                    if (ht.TabHeTongVice.htv_LvYueYingTuiHuanRiQi.Value.AddMonths(1) >= DateTime.Now)
                    {
                        newObj.lvYueBaoZhengJin = 2;
                    }
                    else {
                        newObj.lvYueBaoZhengJin = 3;
                    }
                }
            }

            if (ht.TabHeTongVice != null)
            {
                if (ht.TabHeTongVice.htv_ZhiBaoJinYingTuiZong.HasValue)
                {
                    newObj.zhiBaoJin = 1;
                }
                else if (ht.TabHeTongVice.htv_ZhiBaoJinTuiHuanShiJian.HasValue)
                {
                    if (ht.TabHeTongVice.htv_ZhiBaoJinTuiHuanShiJian.Value.AddMonths(1) >= DateTime.Now)
                    {
                        newObj.zhiBaoJin = 2;
                    }
                    else
                    {
                        newObj.zhiBaoJin = 3;
                    }
                }
            }
           
            //暂定监理费总额
            newObj.zanJianLiFeiZongE = Logic_Comm.getZanDingJianLiFei(ht);
            //竣工资料移交情况
            if (ht.TabXiangMuQianQi == null || ht.TabXiangMuQianQi.qq_JunGongYiJiaoQingKuang.HasValue==false)
            {
                newObj.ziLiaoYiJiaoQingKuang = "";
            }
            else if (ht.TabXiangMuQianQi.qq_JunGongYiJiaoQingKuang.Value == 0)
            {
                newObj.ziLiaoYiJiaoQingKuang = "未移交";
            }
            else if (ht.TabXiangMuQianQi.qq_JunGongYiJiaoQingKuang.Value == 1)
            {
                newObj.ziLiaoYiJiaoQingKuang = "全部移交";
            }
            else if (ht.TabXiangMuQianQi.qq_JunGongYiJiaoQingKuang.Value == 2)
            {
                newObj.ziLiaoYiJiaoQingKuang = "部分移交";
            }
            //合同金额
            newObj.heTongJinE = ht.ht_HeTongJinE ;
            //累计应收款总额

            newObj.yingShouKuanZongE = Logic_Comm.getLeiJiYingShouKuan(ht);
            //累计实收款总额	

            newObj.yiShouKuanZongE = Logic_Comm.getLeiJiShiShouKuan(ht);
            //累计开票总额

            newObj.leJiYiKaiPiaoZongE = Logic_Comm.getLeiJiKaiPai(ht);
            //执行类型
            if (ht.TabXiangMuQianQi != null && ht.TabXiangMuQianQi.Tab_HT_ZhiXingBuMen != null)
            {
                newObj.zhiXingLeiXing = ht.TabXiangMuQianQi.Tab_HT_ZhiXingBuMen.bm_Name;
            }
            //工程状态
            newObj.gongChengZhuangTai = ht.TabXiangMuQianQi == null ? "" : ht.TabXiangMuQianQi.qq_GongChengZhuangTai;
            //结算监理费
            newObj.jieSuanJianLiFei = ht.TabHeTongVice.htv_JieSuanJianLiFei;
            return newObj;
        }
       

      
        /// <summary>
        /// 
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
        public static List<DAL.CommClass.ExtendHeTong> filterExtendHeTong(DAL.CommClass.QueryWhereHT queryWhereHT)
        {

            DAL.Base_HeTong ins = new Base_HeTong();
            //List<DTO.TabHeTong> htList= ins.filterExtendHeTong();
             Base_HeTong b_ht=new Base_HeTong();
             List<TabHeTong> htList = b_ht.listHeTongByWhere(queryWhereHT);//

             htList = htList.OrderBy(p => int.Parse(Regex.Replace(p.TabXiangMuQianQi.qq_HeTongHao, @"[^0-9]", string.Empty))).ToList();//排序
            DAL.Base _base = new Base();
            List<DAL.CommClass.ExtendHeTong> extendList= _base.CopyObjectsPoperty<DAL.CommClass.ExtendHeTong, DTO.TabHeTong>(htList);
            ///转换成ExtendHeTong类型
            for (int i = 0; i < extendList.Count; i++)
            {
                DAL.CommClass.ExtendHeTong ex = extendList[i];
                DTO.TabHeTong ht = htList[i];
                //ex.bm_Name = (ht.TabXiangMuQianQi != null && ht.TabXiangMuQianQi.Tab_HT_ZhiXingBuMen != null) ? ht.TabXiangMuQianQi.Tab_HT_ZhiXingBuMen.bm_Name : "";
                ex.dd_Name = ht.Tab_HT_GongChengDiDian != null ? ht.Tab_HT_GongChengDiDian.dd_Name : "";
                ex.fk_Name = ht.Tab_HT_FuKuanFangShi != null ? ht.Tab_HT_FuKuanFangShi.fk_Name : "";
                ex.fl_Name = ht.Tab_HT_XiangMuFenLei != null ? ht.Tab_HT_XiangMuFenLei.fl_Name : "";
                ex.fs_Name = ht.Tab_HT_HuoQuFangShi != null ? ht.Tab_HT_HuoQuFangShi.fs_Name : "";
                ex.gd_Name = (ht.TabHeTongVice != null && ht.TabHeTongVice.Tab_HTV_GuiDangQingKuang != null) ? ht.TabHeTongVice.Tab_HTV_GuiDangQingKuang.gd_Name : "";
                ex.lx_Name = ht.Tab_HT_YeWuLeiXing != null ? ht.Tab_HT_YeWuLeiXing.lx_Name : "";
                ex.qq_ShiJian = (ht.TabXiangMuQianQi != null && ht.TabXiangMuQianQi.qq_ShiJian != null) ? ht.TabXiangMuQianQi.qq_ShiJian : null;
                ex.zt_Name = ht.Tab_HT_QianDingZhuangTai != null ? ht.Tab_HT_QianDingZhuangTai.zt_Name : "";
                ex.xz_Name = ht.Tab_HT_TouZiXingZhi != null ? ht.Tab_HT_TouZiXingZhi.xz_Name : "";
                ex.leJiYiKaiPiaoZongE = Logic_Comm.getLeiJiKaiPai(ht);
                ex.yingShouKuanZongE = Logic_Comm.getLeiJiYingShouKuan(ht);
                ex.yiShouKuanZongE = Logic_Comm.getLeiJiShiShouKuan(ht);
                ex.zanJianLiFeiZongE = Logic_Comm.getZanDingJianLiFei(ht);
                ex.jiHuaShouKuanZongE = ht.TabShouKuanJiHua.Sum(sk => sk.jh_ShouKuanJinE);
                ex.shiShouZongE = ht.TabFaPiaoJiShouKuanGuanLi.Sum(fp=>fp.fp_ShiShouJinE);
                decimal? yiShouKuanZongE = Logic_Comm.getLeiJiShiShouKuan(ht);
                decimal? yuE = null;
                if (ht.TabJieSuanGuanLi.js_JieSuanJianLiFei != null) {
                    yuE = ht.TabJieSuanGuanLi.js_JieSuanJianLiFei - yiShouKuanZongE;
                }
                else if (ht.TabJieSuanGuanLi.js_YuJieSuanJianLiFei != null)
                {
                    yuE = ht.TabJieSuanGuanLi.js_YuJieSuanJianLiFei - yiShouKuanZongE;
                }
                else if (Logic_Comm.getZanDingJianLiFei(ht) != null)
                {
                    yuE = Logic_Comm.getZanDingJianLiFei(ht) - yiShouKuanZongE;
                }
                ex.yuE = yuE;
                ex.htHao = ht.TabXiangMuQianQi == null ? "" : ht.TabXiangMuQianQi.qq_HeTongHao;
            }
            return extendList;
        }

       
    }
}
