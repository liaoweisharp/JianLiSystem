using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Transactions;

namespace DAL.Logic
{
    public class Logic_Report
    {
        /// <summary>
        /// 第一步 生成薪酬
        /// </summary>
        /// <param name="year"></param>
        /// <param name="month"></param>
        /// <returns></returns>
        public static List<DAL.CommClass.ReportSalaryWrapperWrapper> getMonthSalary(short year, byte month)
        {
            List<DAL.CommClass.ReportSalaryWrapperWrapper> returnValue = new List<CommClass.ReportSalaryWrapperWrapper>();
            DAL.Base_User bUser = new Base_User();
            List<DAL.DTO.Tab_RL_User> userList = bUser.getAllSort(new String[] { "Tab_RL_XinChou_KouKuanJiangLi", "Tab_RL_XinChou" });//排序所有用户
            int yearLast=new DateTime(year, month, 1).AddMonths(-1).Year;//上一个月
            int monthLast = new DateTime(year, month, 1).AddMonths(-1).Month;//上一个月
            DAL.Base_Report_MonthSalary temp= new Base_Report_MonthSalary();
            Tab_Report_MonthSalary msLast = temp.getByYearAndMonth(yearLast, monthLast);
            List<Tab_Report_MonthSalary_GuiDang> gdList = new List<Tab_Report_MonthSalary_GuiDang>();
            if (msLast != null)
            { 
                DAL.Base_Report_MonthSalaryGuiDang bg1=new Base_Report_MonthSalaryGuiDang();
                gdList=bg1.getByMonthSalaryId(msLast.ms_Id);
                
            }
            foreach (DAL.DTO.Tab_RL_User user in userList) {
                DAL.CommClass.ReportSalaryWrapperWrapper ins = new CommClass.ReportSalaryWrapperWrapper();
                ins.xingMing = user.jl_Name;
                ins.userId = user.jl_Id;
                ins.buMenId = user.jl_SuShuBuMen;//部门
                ins.buMenName = user.Tab_BuMen != null ? user.Tab_BuMen.bm_Name : "未分配";
                Tab_RL_XinChou[] xinChouArr = user.Tab_RL_XinChou.OrderBy(p => p.xc_TiaoZhengShijian).ToArray();//时间排序
                Tab_RL_XinChou_KouKuanJiangLi[] kouKuanJiangLiArr = user.Tab_RL_XinChou_KouKuanJiangLi.ToArray();//时间排序
              // 
                int dayOfMonth= DateTime.DaysInMonth(year, month);
                
                DTO.Tab_Report_MonthSalary_GuiDang salary = getSalaryWrapper(xinChouArr, kouKuanJiangLiArr, year, month, dayOfMonth, xinChouArr.Length - 1);//本月薪酬
                //DAL.CommClass.ReportSalaryWrapper salaryLast = getSalaryWrapper(xinChouArr, kouKuanJiangLiArr, yearLast, monthLast, dayOfMonth, xinChouArr.Length - 1);//上一个月薪酬
                ins.salaryWrapper = salary;
                ins.salaryLastWrapper = new Tab_Report_MonthSalary_GuiDang();//默认全部为0
                if (msLast != null)
                {
                    Base b_base = new Base();
                    Tab_Report_MonthSalary_GuiDang _obj = gdList.FirstOrDefault(p => p.msgd_UserId == user.jl_Id);
                    if (_obj != null)
                    {
                        b_base.CopyObjectPoperty<Tab_Report_MonthSalary_GuiDang, Tab_Report_MonthSalary_GuiDang>(_obj, ins.salaryLastWrapper);
                    }
                }
                
                //ins.salaryLastWrapper = salaryLast;
                returnValue.Add(ins);
            }
            ///没有公司承担费用则不显示人,但本月停发或者结算的需要显示出来
            returnValue.RemoveAll(p => p.salaryWrapper != null && p.salaryWrapper.msgd_GongSiChengDan == 0 && (p.salaryWrapper.msgd_Type == null || p.salaryWrapper.msgd_Type==1));
          //  returnValue = returnValue.FindAll(p => p.salaryWrapper != null && p.salaryWrapper.msgd_GongSiChengDan > 0 );
            //按部门排序后再按姓名排序
            returnValue = returnValue.OrderBy(p => p.buMenName).ThenBy(p => p.xingMing).ToList();
            return returnValue;
        }
        /// <summary>
        /// 第三步， 预览
        /// </summary>
        /// <param name="year"></param>
        /// <param name="month"></param>
        /// <returns></returns>
        public static List<CommClass.ReportSalaryWrapperWrapper> getPreview(short year, byte month)
        {
            List<CommClass.ReportSalaryWrapperWrapper> returnValue=new List<CommClass.ReportSalaryWrapperWrapper>();
            DAL.Base_Report_MonthSalary b1 = new Base_Report_MonthSalary();
            Tab_Report_MonthSalary ms= b1.getByYearAndMonth(year, month);
            int yearLast = new DateTime(year, month, 1).AddMonths(-1).Year;//上一个月
            int monthLast = new DateTime(year, month, 1).AddMonths(-1).Month;//上一个月
            b1 = new Base_Report_MonthSalary();
            Tab_Report_MonthSalary msLast = b1.getByYearAndMonth(yearLast, monthLast, new string[] { "Tab_Report_MonthSalary_GuiDang" });//上个月的薪酬
            if (ms != null)
            {
                DAL.Base_Report_MonthSalaryGuiDang b2 = new Base_Report_MonthSalaryGuiDang();
                //并排序
                List<DAL.DTO.Tab_Report_MonthSalary_GuiDang> guiDangList = b2.getByMonthSalaryId(ms.ms_Id, new string[] { "Tab_RL_User","Tab_Report_MonthSalaryDetail_ChengBen" }).OrderBy(p => p.Tab_RL_User.jl_YuanGongBianHao).ToList();
                foreach (DAL.DTO.Tab_Report_MonthSalary_GuiDang item in guiDangList) {
                    CommClass.ReportSalaryWrapperWrapper obj = new CommClass.ReportSalaryWrapperWrapper();
                    obj.userId = item.Tab_RL_User.jl_Id;
                    obj.xingMing = item.Tab_RL_User.jl_Name;
                    if (item.Tab_RL_User != null && item.Tab_RL_User.Tab_BuMen != null)
                    {
                        obj.buMenName = item.Tab_RL_User.Tab_BuMen.bm_Name;
                    }
                        else{
                            obj.buMenName="未分配";
                        }
                    obj.salaryWrapper = item;//当月存档
                    obj.reportSalaryChengBenWrapperArr = new List<CommClass.ReportSalaryChengBenWrapper>();
                    foreach (var chenBen in item.Tab_Report_MonthSalaryDetail_ChengBen) {
                        CommClass.ReportSalaryChengBenWrapper chenBenWrapper = new CommClass.ReportSalaryChengBenWrapper();
                        chenBenWrapper.id = chenBen.msdcb_Id;
                        chenBenWrapper.jinE = chenBen.msdcd_JinE;
                        chenBenWrapper.sheBaoGongSi = chenBen.msdcd_SheBaoGongSi;
                        chenBenWrapper.xiangMuId = chenBen.msdcd_XiangMuId;
                        chenBenWrapper.xiangMuMingCheng = chenBen.TabXiangMuQianQi != null ? chenBen.TabXiangMuQianQi.qq_GongChengMingCheng : "";
                        if (chenBen.TabXiangMuQianQi != null && chenBen.TabXiangMuQianQi.Tab_XiangMuZu != null) {
                            //名称前加项目部“项目部->”
                            chenBenWrapper.xiangMuMingCheng = chenBen.TabXiangMuQianQi.Tab_XiangMuZu.xmz_Name+" ->"+ chenBenWrapper.xiangMuMingCheng;
                        }
                        obj.reportSalaryChengBenWrapperArr.Add(chenBenWrapper);
                    }
                    //上个月存档
                    if (msLast == null)
                    {
                        obj.salaryLastWrapper = new Tab_Report_MonthSalary_GuiDang();
                    }
                    else {
                        DAL.DTO.Tab_Report_MonthSalary_GuiDang guiDangLast= msLast.Tab_Report_MonthSalary_GuiDang.FirstOrDefault(p => p.msgd_UserId == obj.userId);
                        if (guiDangLast == null)
                        {
                            obj.salaryLastWrapper = new Tab_Report_MonthSalary_GuiDang();
                        }
                        else {
                            DAL.Base b_base = new Base();
                            obj.salaryLastWrapper=new Tab_Report_MonthSalary_GuiDang();
                            b_base.CopyObjectPoperty<Tab_Report_MonthSalary_GuiDang, Tab_Report_MonthSalary_GuiDang>(guiDangLast, obj.salaryLastWrapper);
                            //obj.salaryLastWrapper = guiDangLast;
                            //obj.salaryLastWrapper = new Tab_Report_MonthSalary_GuiDang();
                        }
                    }
                    returnValue.Add(obj);
                }
            }
            //按部门，姓名排序
            returnValue = returnValue.OrderBy(p => p.buMenName).ThenBy(p => p.xingMing).ToList();
            return returnValue;
        }
        /// <summary>
        /// 工资的分项计算。
        /// </summary>
        /// <param name="xinChouArr"></param>
        /// <param name="kouKuanJiangLiArr"></param>
        /// <param name="year"></param>
        /// <param name="month"></param>
        /// <param name="dayOfMonth">这个月总共有多少天</param>
        /// <param name="index"></param>
        /// <returns></returns>
        private static DAL.DTO.Tab_Report_MonthSalary_GuiDang getSalaryWrapper(Tab_RL_XinChou[] xinChouArr, Tab_RL_XinChou_KouKuanJiangLi[] kouKuanJiangLiArr, short year, byte month, int dayOfMonth, int index)
        {
            DAL.DTO.Tab_Report_MonthSalary_GuiDang salary = new DAL.DTO.Tab_Report_MonthSalary_GuiDang();
            DAL.DTO.Tab_RL_XinChou baoXianObj = new Tab_RL_XinChou();
            
            DAL.DTO.Tab_Report_MonthSalary_GuiDang _salary = new Tab_Report_MonthSalary_GuiDang();
            //这里循环得到基本工资和补贴
            DAL.DTO.Tab_Report_MonthSalary_GuiDang _salary_YF = getSalary(xinChouArr, baoXianObj, year, month, dayOfMonth, index);
            DAL.DTO.Tab_RL_XinChou obj_JieSuan= xinChouArr.FirstOrDefault(p => p.Tab_RL_XinChou_JieSuan != null && p.Tab_RL_XinChou_JieSuan.xcjs_FaFang_Year == year && p.Tab_RL_XinChou_JieSuan.xcjs_FaFang_Month == month);
            if (obj_JieSuan != null)
            {
                //有本月的"结算"记录
                DTO.Tab_RL_XinChou_JieSuan jieSuan = obj_JieSuan.Tab_RL_XinChou_JieSuan;
                //int days = CommFun.DiffDay(jieSuan.xcjs_JieSuan_StartDate, jieSuan.xcjs_JieSuan_EndDate);
                //days += 1;//要加一天才合理
                _salary.msgd_yf_JiBenGongZi += obj_JieSuan.xc_YF_JiBenGongZi;
                _salary.msgd_yf_JiBenGongZi += obj_JieSuan.xc_YF_GangWeiGongZi;
                _salary.msgd_yf_BuTie += obj_JieSuan.xc_YF_JiaoTong;
                _salary.msgd_yf_BuTie += obj_JieSuan.xc_YF_ShengHuo;
                _salary.msgd_yf_BuTie += obj_JieSuan.xc_YF_TongXun;
                _salary.msgd_yf_BuTie += obj_JieSuan.xc_YF_ZhuWai;
                baoXianObj = obj_JieSuan;
                //int div = 30;//这个数有待商量
                decimal percent = _jieSuanPercent(jieSuan.xcjs_JieSuan_StartDate, jieSuan.xcjs_JieSuan_EndDate);

                //_salary.msgd_yf_JiBenGongZi = (_salary.msgd_yf_JiBenGongZi / div) * days;
                //_salary.msgd_yf_BuTie = (_salary.msgd_yf_BuTie / div) * days;
                _salary.msgd_yf_JiBenGongZi = _salary.msgd_yf_JiBenGongZi * percent;
                _salary.msgd_yf_BuTie = _salary.msgd_yf_BuTie * percent;
                _salary.msgd_Type = 1;
                _salary.msgd_JieSuanStartDate = obj_JieSuan.Tab_RL_XinChou_JieSuan.xcjs_JieSuan_StartDate;
                _salary.msgd_JieSuanEndDate = obj_JieSuan.Tab_RL_XinChou_JieSuan.xcjs_JieSuan_EndDate;
                //下面把本月的工资累加到结算里
                _salary.msgd_yf_JiBenGongZi += _salary_YF.msgd_yf_JiBenGongZi;
                _salary.msgd_yf_BuTie += _salary_YF.msgd_yf_BuTie;
            }
            else {
                //本月没有结算，则正常发放工资

                _salary = _salary_YF;
                if (xinChouArr.FirstOrDefault(p => p.xc_TiaoZhengLeiXing == 1 && p.xc_TiaoZhengShijian.Year == year && p.xc_TiaoZhengShijian.Month == month) != null) { 
                    //本月停发工资
                    _salary.msgd_Type = 2;
                }
            }
            //上面是算基本工资和补贴的。
            salary.msgd_yf_BuTie += _salary.msgd_yf_BuTie;//应发补贴
            salary.msgd_yf_BuTie += baoXianObj.xc_YF_GuaZhengFei;//应发补贴(挂证费单独计算)
            salary.msgd_yf_JiBenGongZi = _salary.msgd_yf_JiBenGongZi;//应发基本工资
            var tempJiang_1= kouKuanJiangLiArr.Where(p => p.kkjl_Year == year && p.kkjl_Month == month && p.kkjl_Type == 2);
            var tempJiang_2 = kouKuanJiangLiArr.Where(p => p.kkjl_Year == year && p.kkjl_Month == month && p.kkjl_Type == 4);

            salary.msgd_yf_JiBenGongZi += tempJiang_1.Sum(p => p.kkjl_JinE) + tempJiang_2.Sum(p => p.kkjl_JinE);//月奖励
            

            salary.msgd_yf_JiBenGongZi = decimal.Round(salary.msgd_yf_JiBenGongZi);//四舍五入
            salary.msgd_yf_BuTie = decimal.Round(salary.msgd_yf_BuTie);//四舍五入
            salary.msgd_yf_XiaoJi = salary.msgd_yf_BuTie + salary.msgd_yf_JiBenGongZi;//应发小计
            if (salary.msgd_yf_XiaoJi == 0)//停发工资后没有社保等（这里是零时加的）
            {
                baoXianObj = new Tab_RL_XinChou();
            }
            //应扣 社保
            salary.msgd_yk_SheBao += baoXianObj.xc_YK_DaBing;
            salary.msgd_yk_SheBao += baoXianObj.xc_YK_GongShang;
            salary.msgd_yk_SheBao += baoXianObj.xc_YK_ShengYu;
            salary.msgd_yk_SheBao += baoXianObj.xc_YK_ShiYe;
            salary.msgd_yk_SheBao += baoXianObj.xc_YK_YangLao;
            salary.msgd_yk_SheBao += baoXianObj.xc_YK_YiLiao;
            salary.msgd_yk_SheBao=decimal.Floor(salary.msgd_yk_SheBao);//取整数
            //应扣其他1
            //从最近的一次薪酬记录里获得保险金
            DateTime nextMonthFirstDay=new DateTime(year,month,1).AddMonths(1);//下个月1号
            DAL.DTO.Tab_RL_XinChou xinChouRencent= xinChouArr.OrderByDescending(p => p.xc_TiaoZhengShijian)
                .Where(p => p.xc_TiaoZhengShijian < nextMonthFirstDay)
                .FirstOrDefault();///最近的薪酬
            if (xinChouRencent != null && salary.msgd_yf_XiaoJi>0)//还要没有工资发放的时候没有其他1（如停发工资）
            {
                salary.msgd_yk_QiTa1 += xinChouRencent.xc_YK_FengXianJin;
                salary.msgd_yk_QiTa1 = decimal.Floor(salary.msgd_yk_QiTa1);//取整数
            }                      
            
            var tempKou_1 = kouKuanJiangLiArr.Where(p => p.kkjl_Year == year && p.kkjl_Month == month && p.kkjl_Type == 1);
            var tempKou_2 = kouKuanJiangLiArr.Where(p => p.kkjl_Year == year && p.kkjl_Month == month && p.kkjl_Type == 3);
            
                //其他2
                salary.msgd_yk_QiTa2 += (tempKou_1.Sum(p => p.kkjl_JinE) + tempKou_2.Sum(p => p.kkjl_JinE));
                salary.msgd_yk_QiTa2 = decimal.Floor(salary.msgd_yk_QiTa2);//取整数
            
            //在扣保险后算个税（国家规定）
            //decimal yingFa = salary.msgd_yf_XiaoJi - (salary.msgd_yk_SheBao + salary.msgd_yk_QiTa1 + salary.msgd_yk_QiTa2);
            //（2014-09-04后改，明清需求）
                decimal geShuiBase = (salary.msgd_yf_XiaoJi - tempJiang_1.Sum(p=>p.kkjl_JinE)) - (salary.msgd_yk_SheBao + tempKou_2.Sum(p => p.kkjl_JinE));
            //所得税
            salary.msgd_yk_GeShui = Logic_Comm.getSuoDeShui(geShuiBase);
            //应扣小计
            salary.msgd_yk_XiaoJi += salary.msgd_yk_SheBao;
            salary.msgd_yk_XiaoJi += salary.msgd_yk_QiTa1;
            salary.msgd_yk_XiaoJi += salary.msgd_yk_QiTa2;
            salary.msgd_yk_XiaoJi += salary.msgd_yk_GeShui;
            //实得工资
            salary.msgd_ShifaGongZi = salary.msgd_yf_XiaoJi - salary.msgd_yk_XiaoJi;
            //公司成本
            salary.msgd_GongSiChengDan += baoXianObj.xc_GS_DaBing;
            salary.msgd_GongSiChengDan += baoXianObj.xc_GS_GongShang;
            salary.msgd_GongSiChengDan += baoXianObj.xc_GS_Qi;
            salary.msgd_GongSiChengDan += baoXianObj.xc_GS_ShangBao;
            salary.msgd_GongSiChengDan += baoXianObj.xc_GS_ShiYe;
            salary.msgd_GongSiChengDan += baoXianObj.xc_GS_YangLao;
            salary.msgd_GongSiChengDan += baoXianObj.xc_GS_YiLiao;
            salary.msgd_GongSiChengDan += baoXianObj.xc_GS_Sheng;
            salary.msgd_GongSiChengDan += salary.msgd_yf_XiaoJi;
            salary.msgd_GongSiChengDan -= baoXianObj.xc_YF_GuaZhengFei;
            //其他
            salary.msgd_Type = _salary.msgd_Type;
            salary.msgd_JieSuanStartDate = _salary.msgd_JieSuanStartDate;
            salary.msgd_JieSuanEndDate = _salary.msgd_JieSuanEndDate;
            //temp = kouKuanJiangLiArr.Where(p => p.kkjl_Year == year && p.kkjl_Month == month && p.kkjl_Type == 1);
            //if (temp.Count() > 0)
            //{
            //    salary.msgd_GongSiChengDan -= temp.Sum(p => p.kkjl_JinE);
            //}
            return salary;
        }
        /// <summary>
        /// 得到结算时间段的工资计算比例
        /// </summary>
        /// <param name="dateTime"></param>
        /// <param name="dateTime_2"></param>
        /// <returns></returns>
        private static decimal _jieSuanPercent(DateTime jieSuan_StartDate, DateTime jieSuan_EndDate)
        {
            decimal returnValue=0;
            char splitChar=',';//分隔符
            //得到["2014,5","2014,6"，"2014,7"]跨的月份集合.例如：参数为（2014-05-01,2014-07-15）
            List<String> monthsArray = new List<string>();
            int yearMonth=0;
            DateTime _jieSuan_StartDate=jieSuan_StartDate;
            int yearMonth_End=int.Parse(String.Format("{0}{1:00}",jieSuan_EndDate.Year,jieSuan_EndDate.Month));
            do
            {
                int year = _jieSuan_StartDate.Year;
                int month = _jieSuan_StartDate.Month;
                monthsArray.Add(String.Format("{0}{2}{1}", year.ToString(), month.ToString(),splitChar));//加入数组
                _jieSuan_StartDate = _jieSuan_StartDate.AddMonths(1);//加一个月
                int year_new = _jieSuan_StartDate.Year;
                int month_new = _jieSuan_StartDate.Month;
                yearMonth = int.Parse(String.Format("{0}{1:00}", year_new, month_new));
            } while (yearMonth_End >= yearMonth);
            //开始计算
            if (monthsArray.Count == 1)
            {
                //开始、结束时间都在一个月里的情况
                string str= monthsArray[0];
                string[] temp= str.Split(splitChar);
                int year = int.Parse(temp[0]);//还原年份
                int month = int.Parse(temp[1]);//还原月份
                int days = CommFun.DiffDay(jieSuan_StartDate, jieSuan_EndDate);
                days += 1;//加一天才合理
                int daysOfMonth= DateTime.DaysInMonth(year, month);
                returnValue = (decimal)(days * 1.0 / daysOfMonth);
            }
            else {
                //开始、结束时间跨越至少两个月的情况

                //第一个月（2014-5） 31.0/31=1
                string str = monthsArray.First();
                string[] temp = str.Split(splitChar);
                int year = int.Parse(temp[0]);//还原年份
                int month = int.Parse(temp[1]);//还原月份
                int daysOfMonth = DateTime.DaysInMonth(year, month);
                int days = CommFun.DiffDay(new DateTime(year, month, daysOfMonth), jieSuan_StartDate);
                days += 1;//加一天才合理
                returnValue += (decimal)(days * 1.0 / daysOfMonth);
                //第最后一个月（2014-7） 15.0/31
                str = monthsArray.Last();
                temp = str.Split(splitChar);
                year = int.Parse(temp[0]);//还原年份
                month = int.Parse(temp[1]);//还原月份
                days = jieSuan_EndDate.Day;
                daysOfMonth = DateTime.DaysInMonth(year, month);
                returnValue += (decimal)(days * 1.0 / daysOfMonth);
                //第一和最后一个月中间夹的月份（2014-6），每个月加1
                returnValue += monthsArray.Count - 2;
            }
            return returnValue;
        }
        /// <summary>
        /// 得到基本工资和补贴（考虑到一个月有多个薪酬记录时，按时间段比例分工资的累加）
        /// </summary>
        /// <param name="xinChouArr">总共的薪酬集合（倒序）</param>
        /// <param name="baoXianDuiXiang">返回保险对象（一个月有多个薪酬记录，则保险取最大的那条）</param>
        /// <param name="year"></param>
        /// <param name="month"></param>
        /// <param name="dayOfMonth"></param>
        /// <param name="index"></param>
        /// <returns></returns>
        private static DTO.Tab_Report_MonthSalary_GuiDang getSalary(Tab_RL_XinChou[] xinChouArr, Tab_RL_XinChou baoXianDuiXiang, short year, byte month, int dayOfMonth, int index)
        {
            DTO.Tab_Report_MonthSalary_GuiDang salary = new DTO.Tab_Report_MonthSalary_GuiDang();
            if (index >= 0 && xinChouArr.Length > index)
            { 
                Tab_RL_XinChou xinChou =xinChouArr[index];
                DateTime tiaoZheng=xinChou.xc_TiaoZhengShijian;//调整时间

                if (tiaoZheng < new DateTime(year, month, 1)) {
                    //  <6.1 六月举例
                    if (xinChou.xc_TiaoZhengLeiXing ==0) { 
                        //全部工资
                        //基本工资
                        salary.msgd_yf_JiBenGongZi += xinChou.xc_YF_JiBenGongZi;
                        
                        salary.msgd_yf_JiBenGongZi += xinChou.xc_YF_GangWeiGongZi;
                        //补贴
                        //salary.yf_BuTie += xinChou.xc_YF_GuaZhengFei;
                        salary.msgd_yf_BuTie += xinChou.xc_YF_JiaoTong;
                        salary.msgd_yf_BuTie += xinChou.xc_YF_ShengHuo;
                        salary.msgd_yf_BuTie += xinChou.xc_YF_TongXun;
                        salary.msgd_yf_BuTie += xinChou.xc_YF_ZhuWai;
                        decimal percent = ((dayOfMonth + 1 - 1)*1m / DateTime.DaysInMonth(year, month));
                        salary.msgd_yf_JiBenGongZi = Math.Round(salary.msgd_yf_JiBenGongZi * percent,2);
                        salary.msgd_yf_BuTie = Math.Round(salary.msgd_yf_BuTie * percent, 2);
                        if (percent>0 && xinChou.xc_YK_YangLao > baoXianDuiXiang.xc_YK_YangLao)
                        {
                            //按个人所交最大的保险记录为扣保险标准
                            Base b = new Base();

                            baoXianDuiXiang = b.CopyObjectPoperty<DAL.DTO.Tab_RL_XinChou, DAL.DTO.Tab_RL_XinChou>(xinChou, baoXianDuiXiang);
                        }
                    }
                }
                else if (tiaoZheng >= new DateTime(year, month, 1) && tiaoZheng <= new DateTime(year, month, DateTime.DaysInMonth(year, month))) { 
                    //  [6.1,6.30] 六月举例
                    if (xinChou.xc_TiaoZhengLeiXing ==0) {
                        salary.msgd_yf_JiBenGongZi += xinChou.xc_YF_JiBenGongZi;
                        
                        salary.msgd_yf_JiBenGongZi += xinChou.xc_YF_GangWeiGongZi;
                        //补贴
                        //salary.yf_BuTie += xinChou.xc_YF_GuaZhengFei;
                        salary.msgd_yf_BuTie += xinChou.xc_YF_JiaoTong;
                        salary.msgd_yf_BuTie += xinChou.xc_YF_ShengHuo;
                        salary.msgd_yf_BuTie += xinChou.xc_YF_TongXun;
                        salary.msgd_yf_BuTie += xinChou.xc_YF_ZhuWai;
                        decimal percent= ((dayOfMonth+1-xinChou.xc_TiaoZhengShijian.Day)*1m/DateTime.DaysInMonth(year,month));
                        salary.msgd_yf_JiBenGongZi = Math.Round(salary.msgd_yf_JiBenGongZi * percent,2);
                        salary.msgd_yf_BuTie = Math.Round(salary.msgd_yf_BuTie * percent,2);
                       
                        if (xinChou.xc_YK_YangLao > baoXianDuiXiang.xc_YK_YangLao)
                        {
                            //按个人所交最大的保险记录为扣保险标准
                            Base b = new Base();
                            baoXianDuiXiang = b.CopyObjectPoperty<DAL.DTO.Tab_RL_XinChou, DAL.DTO.Tab_RL_XinChou>(xinChou, baoXianDuiXiang);
                        }
                    }
                    DTO.Tab_Report_MonthSalary_GuiDang salaryLast = getSalary(xinChouArr, baoXianDuiXiang, year, month, xinChou.xc_TiaoZhengShijian.Day-1, index - 1);
                    salary.msgd_yf_BuTie += salaryLast.msgd_yf_BuTie;
                    salary.msgd_yf_JiBenGongZi += salaryLast.msgd_yf_JiBenGongZi;
                }
                else if (tiaoZheng > new DateTime(year, month, DateTime.DaysInMonth(year, month))) {
                    //  >6.30  六月举例
                    salary = getSalary(xinChouArr, baoXianDuiXiang, year, month, dayOfMonth, index - 1);
                }
            }
            return salary;
        }
        
        //public static int? SaveMonthSalaryGuiDang(short year, byte month, List<DAL.CommClass.ReportSalaryWrapperWrapper> list)
        //{
        //    int? returnValue = null;
        //    using (TransactionScope sp = new TransactionScope())
        //    {
        //        try
        //        {
        //            DAL.Base_Report_MonthSalary b_monthSalary = new Base_Report_MonthSalary();
        //            DTO.Tab_Report_MonthSalary monthSalary = new Tab_Report_MonthSalary();
        //            monthSalary.ms_Year = year;
        //            monthSalary.ms_Month = month;
        //            monthSalary.ms_IsClose = false;
        //            Tab_Report_MonthSalary newObj= b_monthSalary.Save(monthSalary);

        //            List<DTO.Tab_Report_MonthSalary_GuiDang> guiDangList = new List<Tab_Report_MonthSalary_GuiDang>();
                   
        //            foreach (DAL.CommClass.ReportSalaryWrapperWrapper item in list)
        //            {
        //                DTO.Tab_Report_MonthSalary_GuiDang guiDang = new Tab_Report_MonthSalary_GuiDang();
        //                Base b = new Base();
        //                guiDang=b.CopyObjectPoperty<DTO.Tab_Report_MonthSalary_GuiDang, DTO.Tab_Report_MonthSalary_GuiDang>(item.salaryWrapper, guiDang);
        //                guiDang.msgd_UserId = item.userId;
        //                guiDang.msgd_MsId = newObj.ms_Id;
                        
        //                guiDangList.Add(guiDang);
        //            }
        //            DAL.Base_Report_MonthSalaryGuiDang ins = new Base_Report_MonthSalaryGuiDang();
        //            List<Tab_Report_MonthSalary_GuiDang> status = ins.Saves(guiDangList);//为什么事务里不能添加多个对象

        //            sp.Complete();
        //            returnValue = guiDangList.Count;
        //        }
        //        catch (Exception e)
        //        {
        //            returnValue = null;
        //        }
        //        finally
        //        {
        //            sp.Dispose();
        //        }
        //    }
        //    return returnValue;
        //}
        public static int? SaveMonthSalaryGuiDang(short year, byte month, List<DAL.CommClass.ReportSalaryWrapperWrapper> list)
        {
            int? returnValue = null;

            DAL.Base_Report_MonthSalary b_monthSalary = new Base_Report_MonthSalary();
            DTO.Tab_Report_MonthSalary monthSalary = new Tab_Report_MonthSalary();
            monthSalary.ms_Year = year;
            monthSalary.ms_Month = month;
            monthSalary.ms_IsClose = false;
            Tab_Report_MonthSalary newObj = new Tab_Report_MonthSalary();
            try
            {
                newObj = b_monthSalary.Save(monthSalary);
            }
            catch (Exception e)
            {
                return null;
            }
            List<DTO.Tab_Report_MonthSalary_GuiDang> guiDangList = new List<Tab_Report_MonthSalary_GuiDang>();
            foreach (DAL.CommClass.ReportSalaryWrapperWrapper item in list)
            {
                DTO.Tab_Report_MonthSalary_GuiDang guiDang = new Tab_Report_MonthSalary_GuiDang();
                Base b = new Base();
                guiDang = b.CopyObjectPoperty<DTO.Tab_Report_MonthSalary_GuiDang, DTO.Tab_Report_MonthSalary_GuiDang>(item.salaryWrapper, guiDang);
                guiDang.msgd_UserId = item.userId;
                guiDang.msgd_MsId = newObj.ms_Id;
                guiDangList.Add(guiDang);
            }
            DAL.Base_Report_MonthSalaryGuiDang ins = new Base_Report_MonthSalaryGuiDang();
            List<Tab_Report_MonthSalary_GuiDang> status = ins.Saves(guiDangList);


            returnValue = status.Count;

            return returnValue;
        }
        /// <summary>
        /// 得到第二步的数据
        /// </summary>
        /// <param name="year"></param>
        /// <param name="month"></param>
        /// <returns></returns>
        public static List<DAL.CommClass.ReportSalaryChengBenWrapperWrapper> getSalaryChengBen(short year, byte month)
        {
            List<DAL.CommClass.ReportSalaryChengBenWrapperWrapper> returnValue = new List<CommClass.ReportSalaryChengBenWrapperWrapper>();
            DAL.Base_Report_MonthSalary bMonthSalary = new Base_Report_MonthSalary();
            Tab_Report_MonthSalary monthSalary= bMonthSalary.getByYearAndMonth(year, month);
            if (monthSalary != null)
            { 
                DAL.Base_Report_MonthSalaryGuiDang bGuiDang=new Base_Report_MonthSalaryGuiDang();
                List<DAL.DTO.Tab_Report_MonthSalary_GuiDang> guiDangList = bGuiDang.getByMonthSalaryId(monthSalary.ms_Id, new string[] { "Tab_Report_MonthSalaryDetail_ChengBen", "Tab_RL_User" });
                foreach (DAL.DTO.Tab_Report_MonthSalary_GuiDang item in guiDangList)
                {
                    DAL.CommClass.ReportSalaryChengBenWrapperWrapper obj = oneGuiDang(item,year,month);
                    
                    returnValue.Add(obj);
                }
            }
            //按部门、姓名排序
            returnValue = returnValue.OrderBy(p => p.buMenName).ThenBy(p => p.xingMing).ToList();
            return returnValue;
        }
        private static DAL.CommClass.ReportSalaryChengBenWrapperWrapper oneGuiDang(DAL.DTO.Tab_Report_MonthSalary_GuiDang item,short year,byte month)
        {
            DAL.CommClass.ReportSalaryChengBenWrapperWrapper obj = new CommClass.ReportSalaryChengBenWrapperWrapper();
            obj.gongSiChengDan = item.msgd_GongSiChengDan;
            obj.guiDangId = item.msgd_Id;
            obj.xingMing = item.Tab_RL_User != null ? item.Tab_RL_User.jl_Name : "";
            if (item.Tab_RL_User != null && item.Tab_RL_User.Tab_BuMen != null) {
                obj.buMenName = item.Tab_RL_User.Tab_BuMen.bm_Name;
            }
                else{
                    obj.buMenName ="未分配";
                }
            
            obj.type = item.msgd_Type;
            if (item.Tab_Report_MonthSalaryDetail_ChengBen.Count > 0)//保存过
            {
                obj.isSaved = true;
                foreach (DAL.DTO.Tab_Report_MonthSalaryDetail_ChengBen chengBenItem in item.Tab_Report_MonthSalaryDetail_ChengBen)
                {
                    DAL.CommClass.ReportSalaryChengBenWrapper chengBen = new CommClass.ReportSalaryChengBenWrapper();
                    chengBen.id = chengBenItem.msdcb_Id;
                    chengBen.jinE = chengBenItem.msdcd_JinE;
                    chengBen.sheBaoGongSi = chengBenItem.msdcd_SheBaoGongSi;
                    chengBen.xiangMuId = chengBenItem.msdcd_XiangMuId;
                    chengBen.xiangMuMingCheng = chengBenItem.TabXiangMuQianQi != null ? chengBenItem.TabXiangMuQianQi.qq_GongChengMingCheng : "";
                    if (chengBenItem.TabXiangMuQianQi != null && chengBenItem.TabXiangMuQianQi.Tab_XiangMuZu != null) {
                        //名称显示“项目部->”
                        chengBen.xiangMuMingCheng = chengBenItem.TabXiangMuQianQi.Tab_XiangMuZu.xmz_Name + " -> " + chengBen.xiangMuMingCheng;
                    }
                    if (obj.reportSalaryChengBenWrapperArr == null)
                    {
                        obj.reportSalaryChengBenWrapperArr = new List<CommClass.ReportSalaryChengBenWrapper>();
                    }
                    obj.reportSalaryChengBenWrapperArr.Add(chengBen);
                }
            }
            else
            {//没保存过，则根据人力部分生成
                obj.isSaved = false;
                DAL.Base_DiaoDong bDiaoDong = new Base_DiaoDong();
                List<DTO.Tab_DiaoDong> diaoDongList = item.Tab_RL_User.Tab_DiaoDong1.ToList();// bDiaoDong.getByUserId(item.msgd_UserId, year, month, new string[] { "" });
                if (diaoDongList.Count > 0)
                {
                    DateTime start = new DateTime();
                    DateTime end = new DateTime();
                    
                   
                        //正常发放
                        start = new DateTime(year, month, 1);
                        end = new DateTime(year, month, DateTime.DaysInMonth(year, month));
                   //正常发放
                    List<DTO.Tab_DiaoDong> diaoDongList_ForNomanl = diaoDongList.Where(p => (p.dd_EndShiJian.HasValue == false && end >= p.dd_ShiJian) || (p.dd_EndShiJian.HasValue == true && ((end >= p.dd_ShiJian && end <= p.dd_EndShiJian) || (start >= p.dd_ShiJian && start <= p.dd_EndShiJian)))).ToList();
                    List<DTO.Tab_DiaoDong> diaoDongList_ForJieSuan = new List<Tab_DiaoDong>();
                    if (item.msgd_Type.HasValue && item.msgd_Type.Value == 1)
                    {
                        //结算
                        start = item.msgd_JieSuanStartDate.HasValue ? item.msgd_JieSuanStartDate.Value : DateTime.MaxValue;
                        end = item.msgd_JieSuanEndDate.HasValue ? item.msgd_JieSuanEndDate.Value : DateTime.MaxValue;
                        diaoDongList_ForJieSuan = diaoDongList.Where(p => (p.dd_EndShiJian.HasValue == false && end >= p.dd_ShiJian) || (p.dd_EndShiJian.HasValue == true && ((end >= p.dd_ShiJian && end <= p.dd_EndShiJian) || (start >= p.dd_ShiJian && start <= p.dd_EndShiJian)))).ToList();
                    }
                    ///结算的和正常发放的求并集
                    diaoDongList_ForNomanl.AddRange(diaoDongList_ForJieSuan);
                    diaoDongList = diaoDongList_ForNomanl;//正常和结算记录求交集

                    diaoDongList.Distinct();
                    //下面逻辑有点复杂，需要画个时间图辅助。
                    
                    diaoDongList=diaoDongList.OrderBy(p => p.dd_ShiJian).ToList();//排序
                    if (diaoDongList.Count > 0)
                    {
                        int totalDays = 0;
                        if (diaoDongList.Count > 1)
                        {
                            foreach (DTO.Tab_DiaoDong dd in diaoDongList) {
                                DateTime _startDate = dd.dd_ShiJian > start ?  dd.dd_ShiJian:start;
                                DateTime _endDate = new DateTime();
                                if (dd.dd_EndShiJian.HasValue == false || (dd.dd_EndShiJian.HasValue == true && dd.dd_EndShiJian.Value > end))
                                {
                                    _endDate = end;
                                }
                                else if (dd.dd_EndShiJian.HasValue == true && dd.dd_EndShiJian.Value <= end)
                                {
                                    _endDate = dd.dd_EndShiJian.Value;
                                }
                                totalDays += DAL.CommFun.DiffDay(_startDate, _endDate) + 1;//相差的天数
                            }
                        }
                        var index = 0;
                        foreach (DTO.Tab_DiaoDong dd in diaoDongList)
                        {
                            index++;
                            DAL.CommClass.ReportSalaryChengBenWrapper chengBen = new CommClass.ReportSalaryChengBenWrapper();
                            if (diaoDongList.Count == 1)
                            {
                                chengBen.jinE = item.msgd_yf_XiaoJi;
                                chengBen.sheBaoGongSi = item.msgd_GongSiChengDan - item.msgd_yf_XiaoJi;
                            }
                            else if (diaoDongList.Count > 1)
                            {
                                if (diaoDongList.Count == index)
                                {
                                    //如果是最后一个，为了保证总额正确，此处用总数减去前几项
                                    chengBen.jinE = item.msgd_yf_XiaoJi;//初始化为：应发小计
                                    chengBen.sheBaoGongSi = item.msgd_GongSiChengDan-item.msgd_yf_XiaoJi;//初始化为：公司承担社保
                                    for (int m = 0; m < obj.reportSalaryChengBenWrapperArr.Count; m++) {
                                        chengBen.jinE -= obj.reportSalaryChengBenWrapperArr[m].jinE;
                                        chengBen.sheBaoGongSi -= obj.reportSalaryChengBenWrapperArr[m].sheBaoGongSi;
                                    }
                                }
                                else
                                {
                                    DateTime _startDate = dd.dd_ShiJian > start ? dd.dd_ShiJian:start;
                                    DateTime _endDate = new DateTime();
                                    if (dd.dd_EndShiJian.HasValue == false || (dd.dd_EndShiJian.HasValue == true && dd.dd_EndShiJian.Value > end))
                                    {
                                        _endDate = end;
                                    }
                                    else if (dd.dd_EndShiJian.HasValue == true && dd.dd_EndShiJian.Value <= end)
                                    {
                                        _endDate = dd.dd_EndShiJian.Value;
                                    }
                                    int diffDays = DAL.CommFun.DiffDay(_startDate, _endDate) + 1;//相差的天数
                                    decimal _jinE = item.msgd_yf_XiaoJi * (diffDays * 1.0M / totalDays);//计算个人应发分摊金额
                                    decimal _sheBaoGongSi = (item.msgd_GongSiChengDan - item.msgd_yf_XiaoJi) * (diffDays * 1.0M / totalDays);//计算公司社保分摊金额
                                    chengBen.jinE = Math.Round(_jinE, 2);
                                    chengBen.sheBaoGongSi = Math.Round(_sheBaoGongSi, 2);
                                }
                            }
                            //chengBen.xiangMuId = dd.TabXiangMuQianQi != null ? dd.TabXiangMuQianQi.qq_Id : 0;
                            chengBen.xiangMuId = dd.dd_XiangMuId;
                            chengBen.xiangMuMingCheng = dd.TabXiangMuQianQi != null ? dd.TabXiangMuQianQi.qq_GongChengMingCheng : "";
                            if (dd.TabXiangMuQianQi != null && dd.TabXiangMuQianQi.Tab_XiangMuZu != null)
                            {
                                //名称显示“项目部->”
                                chengBen.xiangMuMingCheng = dd.TabXiangMuQianQi.Tab_XiangMuZu.xmz_Name + " -> " + chengBen.xiangMuMingCheng;
                            }
                            if (obj.reportSalaryChengBenWrapperArr == null)
                            {
                                obj.reportSalaryChengBenWrapperArr = new List<CommClass.ReportSalaryChengBenWrapper>();
                            }
                            obj.reportSalaryChengBenWrapperArr.Add(chengBen);
                        }
                        //这里添加计算公式
                    }
                }
            }
            return obj;
        }
        public static bool SaveChengBen(int guiDangId, List<Tab_Report_MonthSalaryDetail_ChengBen> chengBenList)
        {
            DAL.Base_Report_MonthSalaryGuiDang_ChengBen b1 = new Base_Report_MonthSalaryGuiDang_ChengBen();
            int status= b1.DeleteByGuiDangId(guiDangId);
            DAL.Base_Report_MonthSalaryGuiDang_ChengBen b2 = new Base_Report_MonthSalaryGuiDang_ChengBen();
            List<DAL.DTO.Tab_Report_MonthSalaryDetail_ChengBen> chengBens= b2.Saves(chengBenList);
            return chengBens.Count>0?true:false;
        }

        public static DAL.CommClass.ReportSalaryChengBenWrapperWrapper getChengBenByGuiDangId(int guiDangId)
        {
            DAL.CommClass.ReportSalaryChengBenWrapperWrapper obj = null;
            DAL.Base_Report_MonthSalaryGuiDang b1 = new Base_Report_MonthSalaryGuiDang();
            DAL.DTO.Tab_Report_MonthSalary_GuiDang guiDang = b1.getById(guiDangId, new string[] { "Tab_Report_MonthSalary" });
            if (guiDang != null) {
                obj=oneGuiDang(guiDang, guiDang.Tab_Report_MonthSalary.ms_Year, guiDang.Tab_Report_MonthSalary.ms_Month);
            }
            return obj;
        }
        /// <summary>
        /// 第二步 完成 (需要改成事务)
        /// </summary>
        /// <param name="year"></param>
        /// <param name="month"></param>
        /// <param name="list"></param>
        /// <returns></returns>
        public static int? SaveMonthSalaryGuiDangChengBen(short year, byte month, List<Tab_Report_MonthSalaryDetail_ChengBen> list)
        {
         
            DAL.Base_Report_MonthSalary b1 = new Base_Report_MonthSalary();
            Tab_Report_MonthSalary monthSalary= b1.getByYearAndMonth(year, month, new string[] { "Base_Report_MonthSalaryGuiDang" });
            if (monthSalary==null) {
                return null;
            }
            monthSalary.ms_IsClose = true;
            b1 = new Base_Report_MonthSalary();
            b1.Update(monthSalary);
            int[] guiDangIds= monthSalary.Tab_Report_MonthSalary_GuiDang.Select(p => p.msgd_Id).ToArray();
            DAL.Base_Report_MonthSalaryGuiDang_ChengBen b2 = new Base_Report_MonthSalaryGuiDang_ChengBen();
            int status= b2.DeleteByGuiDangIds(guiDangIds);
            b2 = new Base_Report_MonthSalaryGuiDang_ChengBen();

            return b2.Saves(list).Count;
        }
        /// <summary>
        /// 得到报表 工资的第一个界面对象
        /// </summary>
        /// <param name="year"></param>
        /// <returns></returns>
        public static List<DAL.CommClass.ReportSalaryYear> getReportSalaryYear(short year)
        {
            List<DAL.CommClass.ReportSalaryYear> returnValue = new List<CommClass.ReportSalaryYear>();
            DAL.Base_Report_MonthSalary b1 = new Base_Report_MonthSalary();
            List<DTO.Tab_Report_MonthSalary> monthSalaryList = b1.getByYearSort(year, new string[]{"Tab_Report_MonthSalary_GuiDang"});
            foreach (DTO.Tab_Report_MonthSalary ms in monthSalaryList) {
                DAL.CommClass.ReportSalaryYear obj = new CommClass.ReportSalaryYear();
                obj.monthSalaryId = ms.ms_Id;
                obj.year = ms.ms_Year;
                obj.month = ms.ms_Month;
                obj.shiFaZongE = ms.Tab_Report_MonthSalary_GuiDang.Sum(p=>p.msgd_ShifaGongZi);
                obj.shiFaZongE *= 0.0001m;//转成万元
                if (ms.ms_IsClose)
                {
                    obj.zhuangTai = 1;
                    obj.gongSiChengDan = ms.Tab_Report_MonthSalary_GuiDang.Sum(p=>p.msgd_GongSiChengDan);
                    obj.gongSiChengDan *= 0.0001m;//转成万元
                }
                else {
                    obj.zhuangTai = 2;
                }
                returnValue.Add(obj);
            }
            List<DAL.CommClass.ReportSalaryYear> temp = new List<CommClass.ReportSalaryYear>();
            for (byte i = 1; i < 13; i++)
            {
                
                if (monthSalaryList.FirstOrDefault(p => p.ms_Month == i) == null)
                { 
                    DAL.CommClass.ReportSalaryYear _obj=new CommClass.ReportSalaryYear();
                    _obj.gongSiChengDan=_obj.shiFaZongE=null;
                    _obj.year=year;
                    _obj.month=i;
                    _obj.zhuangTai=0;
                    temp.Add(_obj);
                }
               
            }
            returnValue.AddRange(temp);
            returnValue = returnValue.OrderBy(p => p.month).ToList();
            return returnValue;
        }
        /// <summary>
        /// 得到状态
        /// </summary>
        /// <param name="year"></param>
        /// <param name="month"></param>
        /// <returns></returns>
        public static byte getSalaryZhuangTai(short year, byte month)
        {
            byte returnValue = 0;
            DAL.Base_Report_MonthSalary b1 = new Base_Report_MonthSalary();
            Tab_Report_MonthSalary ms= b1.getByYearAndMonth(year, month);
            if (ms == null)
            {
                returnValue = 0;
            }
            else {
                if (ms.ms_IsClose)
                {
                    returnValue = 1;
                }
                else {
                    returnValue = 2;
                }
            }
            return returnValue;
        }
        /// <summary>
        /// 项目月薪酬明细
        /// </summary>
        /// <param name="monthSalaryId"></param>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public static List<CommClass.projectMonthSalaryMingXiWrapper> getMingXi(int monthSalaryId, int projectId)
        {
            List<CommClass.projectMonthSalaryMingXiWrapper> returnValue = new List<CommClass.projectMonthSalaryMingXiWrapper>();
            DAL.Base_Report_MonthSalaryGuiDang b1 = new Base_Report_MonthSalaryGuiDang();
            List<DAL.DTO.Tab_Report_MonthSalary_GuiDang> guiDangList= b1.getByMonthSalaryId(monthSalaryId);
            if (guiDangList.Count > 0)
            {
                DAL.Base_Report_MonthSalaryGuiDang_ChengBen b2 = new Base_Report_MonthSalaryGuiDang_ChengBen();
                List<DAL.DTO.Tab_Report_MonthSalaryDetail_ChengBen> chengBenList= b2.getByGuiDangIds(guiDangList.Select(p => p.msgd_Id).ToArray(), projectId, new string[] { "Tab_Report_MonthSalary_GuiDang" });
                foreach (DAL.DTO.Tab_Report_MonthSalaryDetail_ChengBen ins in chengBenList) {
                    CommClass.projectMonthSalaryMingXiWrapper obj = new CommClass.projectMonthSalaryMingXiWrapper();
                    if (ins.Tab_Report_MonthSalary_GuiDang != null && ins.Tab_Report_MonthSalary_GuiDang.Tab_RL_User != null)
                    {
                        obj.xingMing = ins.Tab_Report_MonthSalary_GuiDang.Tab_RL_User.jl_Name;
                    }
                    obj.jinE = ins.msdcd_JinE != null ? ins.msdcd_JinE.Value : 0;
                    obj.sheBaoGongSi = ins.msdcd_SheBaoGongSi != null ? ins.msdcd_SheBaoGongSi.Value : 0;
                    returnValue.Add(obj);
                }
            }
            returnValue=returnValue.OrderByDescending(p => p.jinE).ToList();//按金额的降序
            return returnValue;
        }
    }
}
