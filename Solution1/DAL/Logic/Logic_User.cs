using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;

namespace DAL.Logic
{
    public class Logic_User
    {
        public static List<CommClass.UserWrapper> filterRenLiWrappper(CommClass.PageClass pageClass, string where)
        {
            List<CommClass.UserWrapper> returnValue = new List<CommClass.UserWrapper>();
            DAL.Base_User bUser = new Base_User();
            List<DTO.Tab_RL_User> userList = bUser.filterAllUser(pageClass, where, new string[] { "Tab_RL_DiaoDong", "Tab_RL_ZhiYeZiGeZhengShu" });
            foreach (DTO.Tab_RL_User user in userList) {
                CommClass.UserWrapper userW = new CommClass.UserWrapper();
                userW.userId = user.jl_Id;
                userW.bianHao = user.jl_YuanGongBianHao;
                userW.buMen = user.Tab_BuMen == null ? "" : user.Tab_BuMen.bm_Name;
                userW.name = user.jl_Name;
                userW.zhuangTai = user.Tab_RL_GongZuoZhuangTai != null ? user.Tab_RL_GongZuoZhuangTai.zt_Name : "";
                DateTime now=DateTime.Now;
                if (user.Tab_DiaoDong1.Count > 0)
                {
                    foreach (DTO.Tab_DiaoDong obj in user.Tab_DiaoDong1) {
                        obj.dd_EndShiJian = obj.dd_EndShiJian == null ? now : obj.dd_EndShiJian;
                    }
                }
                var dd = from p in user.Tab_DiaoDong1 where now >= p.dd_ShiJian && now <= p.dd_EndShiJian select p;
                List<string> mingCheng = new List<string>();
                for (int i = 0; i < dd.Count();i++ )
                {
                    string _mingCheng = "";
                    DTO.Tab_DiaoDong obj = dd.ToArray()[i];

                    _mingCheng += obj.TabXiangMuQianQi != null ? obj.TabXiangMuQianQi.qq_GongChengMingCheng  : "";
                    if (obj.TabXiangMuQianQi != null && obj.TabXiangMuQianQi.TabXiangMuQianQi2 != null) {
                        ///加“合同号”
                     
                        //加Title
                        string title = "";
                        if (obj.TabXiangMuQianQi != null && obj.TabXiangMuQianQi.Tab_XiangMuZu != null) {
                            title += "所属项目部：" + obj.TabXiangMuQianQi.Tab_XiangMuZu.xmz_Name+"\r\n";
                        }
                        title +="包含合同号："+ String.Join(", ", obj.TabXiangMuQianQi.TabXiangMuQianQi2.Select(p => p.qq_HeTongHao));

                        _mingCheng += "&nbsp;<img src='../Images/mouse.png' title='" + title + "'>";
                        //加岗位

                        _mingCheng += "&nbsp;<span class='gw'>(岗位:" + obj.dd_GangWei + ")</span>";
                        
                    }
                    //if (obj.TabXiangMuQianQi != null && obj.TabXiangMuQianQi.Tab_XiangMuZu != null) {
                    //    //添加项目部在名称前“项目部->”
                    //    _mingCheng = obj.TabXiangMuQianQi.Tab_XiangMuZu.xmz_Name + "->" + _mingCheng;
                    //}
                   // _mingCheng += " &nbsp;<i>(岗位：" + obj.dd_GangWei + ")</i>";
                    mingCheng.Add(_mingCheng);
                }
                userW.xiangMu = String.Join("<br/>", mingCheng);
                userW.tx_zhuangZhu = new List<string>();
                userW.tx_jiJiao = new List<string>();
                if (user.Tab_RL_ZhiYeZiGeZhengShu.Count > 0)
                {
                    //转注
                    var zhuanZhuArray= user.Tab_RL_ZhiYeZiGeZhengShu.Where(p => p.zgzs_ZhuanZhuCeZhuangTai == 2);
                    foreach (var ins in zhuanZhuArray) {
                        userW.tx_zhuangZhu.Add(ins.zgzs_ZhengShuMingCheng);
                    }
                    //继教
                    var jijiaoArray = user.Tab_RL_ZhiYeZiGeZhengShu.Where(p => p.zgzs_JiXuJiaoYuShiJian.HasValue && p.zgzs_JiXuJiaoYuShiJian.Value<= new DateTime(DateTime.Now.Year,DateTime.Now.Month,DateTime.Now.Day));
                    foreach (var ins in jijiaoArray)
                    {
                        userW.tx_jiJiao.Add(ins.zgzs_ZhengShuMingCheng);
                    }

                }
            
                //劳动合同截止提醒
                if (user.jl_LaoDongHeTongJieShuShiJian.HasValue==false)
                {
                    //userW.tx_laoDongHeTong = 0;
                }
                else if (user.jl_LaoDongHeTongJieShuShiJian.HasValue)
                {
                    int days = 30;//提前7天
                    DateTime tempDate = user.jl_LaoDongHeTongJieShuShiJian.Value;
                    DateTime today = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
                    DateTime targetDate = new DateTime(tempDate.Year, tempDate.Month, tempDate.Day);
                    if (today >= tempDate.AddDays(days * -1))
                    {
                        userW.tx_laoDongHeTong = 0;
                    }
                    else
                    {
                        userW.tx_laoDongHeTong = 1;
                    }
                }
                
                //商保提醒
                //if (user.jl_CanBaoZhuangKuang.HasValue && user.jl_ShangYeBaoXian.HasValue && user.jl_ShangBaoJieZhiShiJian.HasValue)
                //{
                //    int days = 10;//提前天
                //    DateTime tempDate = user.jl_ShangBaoJieZhiShiJian.Value;
                //    DateTime today = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
                //    DateTime targetDate = new DateTime(tempDate.Year, tempDate.Month, tempDate.Day);
                //    if ((user.Tab_RL_User_CanBaoZhuangKuang.cbzk_Name != "公司" && user.jl_ShangYeBaoXian.Value) || today.AddDays(days * -1) <= tempDate)
                //    {
                //        userW.tx_laoDongHeTong = 0;
                //    }
                //    else {
                //        userW.tx_laoDongHeTong = 1;
                //    }
                //}
               
                //继教
                //if (user.Tab_RL_ZhiYeZiGeZhengShu.Count == 0)
                //{
                //    userW.tx_jiJiao = 1;
                //}
                //else if (user.Tab_RL_ZhiYeZiGeZhengShu.Count > 0)
                //{
                //    if (user.Tab_RL_ZhiYeZiGeZhengShu.FirstOrDefault(p => p.zgzs_JiXuJiaoYuShiJian == null) != null)
                //    {
                //        userW.tx_jiJiao = null;
                //    }
                //    else {
                //        DateTime? minDate = user.Tab_RL_ZhiYeZiGeZhengShu.Min(p => p.zgzs_JiXuJiaoYuShiJian);
                //        int days = 60;//提前天
                //        DateTime tempDate = minDate.Value;
                //        DateTime today = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
                //        DateTime targetDate = new DateTime(tempDate.Year, tempDate.Month, tempDate.Day);
                //        if (today.AddDays(days * -1) <= tempDate)
                //        {
                //            userW.tx_laoDongHeTong = 0;
                //        }
                //        else
                //        {
                //            userW.tx_laoDongHeTong = 1;
                //        }
                //    }
                //}
                
                //转注
                //if (user.Tab_RL_ZhiYeZiGeZhengShu.Count == 0) {
                //    userW.tx_zhuanZhu = 1;
                //}
                //else
                //{
                //    if (user.Tab_RL_ZhiYeZiGeZhengShu.FirstOrDefault(p => p.zgzs_ZhuanZhuCeZhuangTai.HasValue == false) != null)
                //    {
                //        userW.tx_zhuanZhu = null;
                //    }
                //    else {
                //        if (user.Tab_RL_ZhiYeZiGeZhengShu.FirstOrDefault(p => p.zgzs_ZhuanZhuCeZhuangTai.Value == 1) != null)
                //        {
                //            //有未转注
                //            userW.tx_zhuanZhu = 2;
                //        }
                //        else if (user.Tab_RL_ZhiYeZiGeZhengShu.FirstOrDefault(p => p.zgzs_ZhuanZhuCeZhuangTai.Value == 2) != null){
                //            //没有未转注
                //            userW.tx_zhuanZhu = 1;
                //        }
               
                //    }
                //}
             
                returnValue.Add(userW);
            }
            return returnValue;
        }

        private static byte getTypeOfDue(DateTime dateTime)
        {
            int warnDay = 2;//提前几天提醒
            DateTime tempDate = dateTime;
            DateTime today = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
            DateTime targetDate = new DateTime(tempDate.Year, tempDate.Month, tempDate.Day);
            byte type=0;
            if (targetDate <= today)
            {
                type = 2;

            }
            else if (today >= targetDate.AddDays(warnDay * -1) && today < targetDate)
            {
                type = 3;
            }
            else if (today < targetDate.AddDays(warnDay * -1))
            {
                type = 1;
            }
            return type;
        }
      

  
        public static List<CommClass.PeiXunWrapper> getPeiXunWrapper(int userId)
        {
            List<CommClass.PeiXunWrapper> returnValue = new List<CommClass.PeiXunWrapper>();
            DAL.Base_PeiXun ins = new Base_PeiXun();
            List<DTO.Tab_RL_PeiXun> pxList= ins.getByUserId(userId,new string[]{"Tab_BuMen"});
            foreach (DTO.Tab_RL_PeiXun px in pxList) {
                CommClass.PeiXunWrapper pxWrapper = new CommClass.PeiXunWrapper();
                pxWrapper.peiXunId = px.rl_px_Id;
                if (px.rl_px_StartDate.HasValue && px.rl_px_EndDate.HasValue)
                {
                    pxWrapper.peiXunTianShu = (365*(px.rl_px_EndDate.Value.Year-px.rl_px_StartDate.Value.Year)+ (px.rl_px_EndDate.Value.DayOfYear - px.rl_px_StartDate.Value.DayOfYear))+"天";
                }
                else
                {
                    pxWrapper.peiXunTianShu = "";
                }
                decimal total = 0;
                if (px.rl_px_FeiYongZhiChu_GongSi.HasValue) {
                    total += px.rl_px_FeiYongZhiChu_GongSi.Value;
                }
                if (px.rl_px_FeiYongZhiChu_GeRen.HasValue)
                {
                    total += px.rl_px_FeiYongZhiChu_GeRen.Value;
                }
                if (px.rl_px_FeiYongZhiChu_BuMen.HasValue)
                {
                    total += px.rl_px_FeiYongZhiChu_BuMen.Value;
                }
                pxWrapper.zongFeiYong = total;
                pxWrapper.peiXunXiangMu = px.rl_px_PeiXunXiangMu;
                pxWrapper.suoShuBuMen = px.Tab_BuMen != null ? px.Tab_BuMen.bm_Name : "";
                pxWrapper.suoShuXiangMu = px.TabXiangMuQianQi != null ? px.TabXiangMuQianQi.qq_GongChengMingCheng : "";
                returnValue.Add(pxWrapper);
            }
            return returnValue;
        }
        public static List<CommClass.XinChouWrapper> getXinChouWrapper(int userId) {
            List<CommClass.XinChouWrapper> returnValue = new List<CommClass.XinChouWrapper>();
            DAL.Base_XinChou obj = new Base_XinChou();
            List<DTO.Tab_RL_XinChou> xinChouList= obj.getByUserId(userId, new string[] { "TabXiangMuQianQi" }).OrderBy(p=>p.xc_TiaoZhengShijian).ToList();
            foreach(DTO.Tab_RL_XinChou item in xinChouList)
            {
                CommClass.XinChouWrapper xinChouWrapper=new CommClass.XinChouWrapper();
                xinChouWrapper.xinChouId = item.xc_Id;
                //xinChouWrapper.suoShuXiangMu = item.TabXiangMuQianQi == null ? "" : item.TabXiangMuQianQi.qq_GongChengMingCheng;
                xinChouWrapper.tiaoZhengShiJian = item.xc_TiaoZhengShijian;
                xinChouWrapper.tiaoZhengYuanYin = item.xc_YuanYin==null?"":item.xc_YuanYin;
                xinChouWrapper.yingLingJinE += item.xc_YF_GangWeiGongZi;
                xinChouWrapper.yingLingJinE += item.xc_YF_JiaoTong;
                xinChouWrapper.yingLingJinE += item.xc_YF_JiBenGongZi;
                //xinChouWrapper.yingLingJinE += item.xc_YF_QiTa;
                xinChouWrapper.yingLingJinE += item.xc_YF_ShengHuo;
                xinChouWrapper.yingLingJinE += item.xc_YF_TongXun;
                xinChouWrapper.yingLingJinE += item.xc_YF_ZhuWai;
                xinChouWrapper.yingLingJinE += item.xc_YF_GuaZhengFei;
                
                xinChouWrapper.yingKouJinE += item.xc_YK_DaBing;
                xinChouWrapper.yingKouJinE += item.xc_YK_FengXianJin;
                xinChouWrapper.yingKouJinE += item.xc_YK_GeShui;
                xinChouWrapper.yingKouJinE += item.xc_YK_GongShang;
                //xinChouWrapper.yingKouJinE += item.xc_YK_QiTa;
                xinChouWrapper.yingKouJinE += item.xc_YK_ShengYu;
                xinChouWrapper.yingKouJinE += item.xc_YK_ShiYe;
                xinChouWrapper.yingKouJinE += item.xc_YK_YangLao;
                xinChouWrapper.yingKouJinE += item.xc_YK_YiLiao;

                xinChouWrapper.shiFaJinE = xinChouWrapper.yingLingJinE - xinChouWrapper.yingKouJinE;

                xinChouWrapper.tiaoZhengLeiXing = item.xc_TiaoZhengLeiXing;

                returnValue.Add(xinChouWrapper);
            }

            return returnValue;
        }
        /// <summary>
        /// 保存薪酬（改成事务）
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="jieSuan"></param>
        /// <returns></returns>
        public static DTO.Tab_RL_XinChou SaveXinChou(DTO.Tab_RL_XinChou obj, DTO.Tab_RL_XinChou_JieSuan jieSuan)
        {
            DAL.Base_XinChou b_xinChou = new Base_XinChou();
            DTO.Tab_RL_XinChou xinChou= b_xinChou.Save(obj);
            if (xinChou != null && jieSuan!=null)
            {
                jieSuan.xcjs_Id = xinChou.xc_Id;
                DAL.Base_XinChou_JieSuan b_jieSuan = new Base_XinChou_JieSuan();
                b_jieSuan.Save(jieSuan);
                
            }
            return xinChou;
        }

        public static bool UpdateXinChou(DTO.Tab_RL_XinChou obj, DTO.Tab_RL_XinChou_JieSuan jieSuan)
        {
            DAL.Base_XinChou b_xinChou = new Base_XinChou();
            bool bo=b_xinChou.Update(obj);
            int xinChouId=obj.xc_Id;
            if (bo)
            {
                DAL.Base_XinChou_JieSuan b_jieSuan = new Base_XinChou_JieSuan();
                DTO.Tab_RL_XinChou_JieSuan obj_JieSuan = b_jieSuan.getById(xinChouId);
                if (jieSuan == null)
                {
                    //存在则删除
                    if (obj_JieSuan!=null) {
                        b_jieSuan.Delete(obj_JieSuan.xcjs_Id);
                    }
                }
                else { 
                    //存在则更新，不存在则添加
                    jieSuan.xcjs_Id = obj.xc_Id;
                    if (obj_JieSuan != null)
                    {
                        b_jieSuan.Update(jieSuan);
                    }
                    else {
                        b_jieSuan.Save(jieSuan);
                    }
                }
            }
            return bo;
        }

        public static ArrayList getXinChou(int id)
        {
            ArrayList returnValue = new ArrayList();
            Base_XinChou bXinChou = new Base_XinChou();
            Base_XinChou_JieSuan bJieSuan = new Base_XinChou_JieSuan();
            DTO.Tab_RL_XinChou xinChou= bXinChou.getById(id);
            returnValue.Add(xinChou);
            returnValue.Add(bJieSuan.getById(xinChou.xc_Id));
            return returnValue;
        }
    }
}
