using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.CommClass
{
    public class HeTongWrapper
    {
        
        public int ht_Id
        {
            get;
            set;
        }
        /// <summary>
        /// 合同号
        /// </summary>
        public string heTongHao
        {
            get;
            set;
        }
        /// <summary>
        /// 合同名称
        /// </summary>
        public string ht_MingCheng
        {
            get;
            set;
        }
        /// <summary>
        /// 合同金额
        /// </summary>
        public decimal? heTongJinE
        {
            get;
            set;
        }
        /// <summary>
        /// 竣工资料移交情况
        /// </summary>
        public string ziLiaoYiJiaoQingKuang
        {
            get;
            set;
        }
        /// <summary>
        /// 暂定监理费总额
        /// </summary>
        public decimal? zanJianLiFeiZongE
        {
            get;
            set;
        }
        /// <summary>
        /// 累计应收款总额
        /// </summary>
        public decimal? yingShouKuanZongE
        {
            get;
            set;
        }
        /// <summary>
        /// 累计应收款总额
        /// </summary>
        public decimal? yiShouKuanZongE
        {
            get;
            set;
        }
        /// <summary>
        /// 累计已开票总额
        /// </summary>
        public decimal? leJiYiKaiPiaoZongE
        {
            get;
            set;
        }
        /// <summary>
        /// 是否退还履约保证金
        /// </summary>
        public int? lvYueBaoZhengJin
        {
            get;
            set;
        }
        /// <summary>
        /// 是否退还质保金
        /// </summary>
        public int? zhiBaoJin
        {
            get;
            set;
        }
        /// <summary>
        /// 执行类型
        /// </summary>
        public string zhiXingLeiXing
        {
            get;
            set;
        }
        /// <summary>
        /// 工程状态
        /// </summary>
        public string gongChengZhuangTai { get; set; }
        /// <summary>
        /// 监理费总额
        /// </summary>
        public decimal? jianLiFeiZongE { get; set; }
        /// <summary>
        /// 结算监理费
        /// </summary>
        public decimal? jieSuanJianLiFei { get; set; }

    }
    public class UserWrapper {
        public int userId { get; set; }
        /// <summary>
        /// 姓名
        /// </summary>
        public string name { get; set; }
        /// <summary>
        /// 编号
        /// </summary>
        public string bianHao { get; set; }
        /// <summary>
        /// 所属部门
        /// </summary>
        public string buMen { get; set; }
        /// <summary>
        /// 所属项目
        /// </summary>
        public string xiangMu { get; set; }
        /// <summary>
        /// 工作状态
        /// </summary>
        public string zhuangTai { get; set; }
        /// <summary>
        /// 岗位
        /// </summary>
        public string gangWei { get; set; }
       
        /// <summary>
        /// 继教提醒
        /// </summary>
        public List<string> tx_jiJiao { get; set; }
        /// <summary>
        /// 转注
        /// </summary>
        public List<string> tx_zhuangZhu { get; set; }
        
        /// <summary>
        /// 劳动合同提醒
        /// </summary>
        public byte? tx_laoDongHeTong { get; set; }
        /// <summary>
        /// 商保提醒
        /// </summary>
        public byte? tx_shangBaoTiXing { get; set; }
        /// <summary>
        /// 转注提醒
        /// </summary>
        public byte? tx_zhuanZhu { get; set; }
        
        

    }
    public class XinChouWrapper {
        public int xinChouId { get; set; }
        /// <summary>
        /// 调整原因
        /// </summary>
        public string tiaoZhengYuanYin { get; set; }
      
        /// <summary>
        /// 调整时间
        /// </summary>
        public DateTime tiaoZhengShiJian
        {
            get;
            set;
        }
        /// <summary>
        /// 应领金额
        /// </summary>
        public decimal yingLingJinE { get; set; }
        /// <summary>
        /// 应扣金额
        /// </summary>
        public decimal yingKouJinE { get;set; }
        /// <summary>
        /// 实发金额
        /// </summary>
        public decimal shiFaJinE { get; set; }
        /// <summary>
        /// 是否停发工资
        /// </summary>
        public byte tiaoZhengLeiXing { get; set; }

    }
    public class PeiXunWrapper {
        public int peiXunId { get; set; }
        /// <summary>
        /// 所属部门
        /// </summary>
        public string suoShuBuMen { get; set; }
        /// <summary>
        /// 所属项目
        /// </summary>
        public string suoShuXiangMu { get; set; }
        /// <summary>
        /// 培训项目
        /// </summary>
        public string peiXunXiangMu { get; set; }
        /// <summary>
        /// 培训天数
        /// </summary>
        public string peiXunTianShu { get; set; }
        /// <summary>
        /// 总费用
        /// </summary>
        public decimal? zongFeiYong { get; set; }
    }
    public class XiangMuQianQiWrapper:DAL.DTO.TabXiangMuQianQi {
        public XiangMuQianQiWrapper() { 
        }
        public bool haveHeTong
        {
            get;
            set;
        }
    }
    //public class XiangMuHouQiWrapper2 {
    //    /// <summary>
    //    /// 项目部ID
    //    /// </summary>
    //    public int xiangMuBuId { get; set; }
    //    /// <summary>
    //    /// 项目部名称
    //    /// </summary>
    //    public string xiangMuBuMingCheng { get; set; }
    //    /// <summary>
    //    /// 监理机构
    //    /// </summary>
    //    public List<XiangMuHouQiWrapper1> jianLiJiGouArray{get;set;}
    //}
    //public class XiangMuHouQiWrapper1
    //{
    //    /// <summary>
    //    /// 监理机构ID
    //    /// </summary>
    //    public int jianLiJiGouId { get; set; }
    //    /// <summary>
    //    /// 监理机构名称
    //    /// </summary>
    //    public string jianLiJiGouMingCheng { get; set; }
    //    /// <summary>
    //    /// 工程
    //    /// </summary>
    //    public List<XiangMuHouQiWrapper> projectArray { get; set; }
    //}
    //public class XiangMuHouQiWrapper {
    //    /// <summary>
    //    /// 工程ID
    //    /// </summary>
    //    public int projectId
    //    {
    //        get;
    //        set;
    //    }
    //    /// <summary>
    //    /// 工程名称
    //    /// </summary>
    //    public string gongChengMingCheng
    //    {
    //        get;
    //        set;
    //    }
    //    /// <summary>
    //    /// 执行类型
    //    /// </summary>
    //    public string zhiXingLeiXing
    //    {
    //        get;
    //        set;
    //    }
    //    /// <summary>
    //    /// 执行类型ID
    //    /// </summary>
    //    public byte? zhiXingLeiXingId
    //    {
    //        get;
    //        set;
    //    }
    //    /// <summary>
    //    /// 项目负责人
    //    /// </summary>
    //    public string xiangMuFuZeRen
    //    {
    //        get;
    //        set;
    //    }
    //    /// <summary>
    //    /// 项目总监
    //    /// </summary>
    //    public string xiangMuZongJian
    //    {
    //        get;
    //        set;
    //    }
    //    /// <summary>
    //    /// 施工工期
    //    /// </summary>
    //    public string shiGongGonqQi
    //    {
    //        get;
    //        set;
    //    }
    //    /// <summary>
    //    /// 预计竣工时间
    //    /// </summary>
    //    public string yuJiJunGongShiJian
    //    {
    //        get;
    //        set;
    //    }
    //    /// <summary>
    //    /// 工地例会时间
    //    /// </summary>
    //    public string liHuiShiJian { get; set; }
    //    /// <summary>
    //    /// 工程状态
    //    /// </summary>
    //    public string gongChengZhuanTai { get; set; }

    //}
    /// <summary>
    /// 项目移交明细
    /// </summary>
    public class XiangMuMingXiWrapper
    {
        /// <summary>
        /// 编号
        /// </summary>
        public string bianHao { get; set; }
        /// <summary>
        /// 类别编号
        /// </summary>
        public string lieBieBianHao { get; set; }
        /// <summary>
        /// 资料名称
        /// </summary>
        public string ziLiaoMingCheng { get; set; }
        /// <summary>
        /// 类别
        /// </summary>
        public string leiBie { get; set; }
        /// <summary>
        /// 数量
        /// </summary>
        public string shuLiang { get; set; }
        /// <summary>
        /// 页码范围
        /// </summary>
        public string yeMaFanWei { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string beiZhu { get; set; }

    }
    /// <summary>
    /// 项目移交信息
    /// </summary>
    public class XiangMuYiJiaoWrapper {
        /// <summary>
        /// 移交情况
        /// </summary>
        public string yiJiaoQingKuang { get; set; }
        /// <summary>
        /// 移交人
        /// </summary>
        public string yiJiaoRen { get; set; }
        /// <summary>
        /// 移交人电话
        /// </summary>
        public string yiJiaoRenDianHua { get; set; }
        /// <summary>
        /// 移交时间
        /// </summary>
        public string yiJiaoShiJian { get; set; }
        /// <summary>
        /// 总监签字
        /// </summary>
        public string zongJian { get; set; }
        /// <summary>
        /// 总监电话
        /// </summary>
        public string zongJianDianHua { get; set; }
        /// <summary>
        /// 接收人
        /// </summary>
        public string jieShouRen { get; set; }
        /// <summary>
        /// 接收人电话
        /// </summary>
        public string jieShouRenDianHua { get; set; }
        /// <summary>
        /// 接收时间
        /// </summary>
        public string jieShouShiJian { get; set; }

    }
    public class XiangMuJiSuan_ShiYeBuWrapper {
        
        public int id { get; set; }
        /// <summary>
        /// 项目监理机构ID
        /// </summary>
        public int? jiGouId { get; set; }
        /// <summary>
        /// 监理机构名称
        /// </summary>
        public string jiGouName { get; set; }
        /// <summary>
        /// 项目部 ID
        /// </summary>
        public int? zuId { get; set; }
        /// <summary>
        /// 项目部名称
        /// </summary>
        public string zuName { get; set; }
        /// <summary>
        /// 发票号
        /// </summary>
        public string heTongHao { get; set; }
        /// <summary>
        /// 工程名称
        /// </summary>
        public string gongChengMingCheng { get; set; }
        /// <summary>
        /// 业主名称
        /// </summary>
        public string yeZhuMingCheng { get; set; }
        /// <summary>
        /// 项目负责人
        /// </summary>
        public string xiangMuFuZeRen { get; set; }
        /// <summary>
        /// 暂定监理费总额
        /// </summary>
        public decimal? zanDingJianLiFeiZongE { get; set; }
        /// <summary>
        /// 实收款总额
        /// </summary>
        public decimal? shiShouKuanZongE { get; set; }
        /// <summary>
        /// 已结算总额
        /// </summary>
        public decimal? yiJieSuanZongE { get; set; }
        /// <summary>
        /// 未结算总额
        /// </summary>
        public decimal? weiJieSuanZongE { get; set; }
        /// <summary>
        /// 实收管理费总额
        /// </summary>
        public decimal? shiShouGuanLiFeiZongE { get; set; }
    }
    /// <summary>
    /// 非分组的直管项目
    /// </summary>
    public class XiangMuJiSuan_ZhiGuanWrapper {
        public int id { get; set; }
        /// <summary>
        /// 合同号
        /// </summary>
        public string heTongHao { get; set; }
        /// <summary>
        /// 工程名称
        /// </summary>
        public string gongChengMingCheng { get; set; }
        /// <summary>
        /// 项目经理
        /// </summary>
        public string xiangMuJingLi { get; set; }
        /// <summary>
        /// 暂定监理费总额
        /// </summary>
        public decimal? zanDingJianLiFeiZongE { get; set; }
        /// <summary>
        /// 实收款总额
        /// </summary>
        public decimal? shiShouKuanZongE { get; set; }
        /// <summary>
        /// 总成本支出
        /// </summary>
        public decimal? zongChengBenZhiChu { get; set; }
        /// <summary>
        /// 成本控制指标
        /// </summary>
        public decimal? chenBenKongZhiZhiBiao { get; set; }
    }
    /// <summary>
    /// 分组的直管Wrapper
    /// </summary>
    public class XiangMuJiSuan_ZhiGuanWrapper_Zu
    {
        public int id { get; set; }
        public string xiangMuZu_MingCheng { get; set; }
        public string jianLiZuMingCheng { get; set; }
        public List<XiangMuJiSuan_ZhiGuanWrapper> list { get; set; }
        /// <summary>
        /// 总成本支出
        /// </summary>
        public decimal? zongChengBenZhiChu { get; set; }
        /// <summary>
        /// 成本控制指标
        /// </summary>
        public decimal? chenBenKongZhiZhiBiao { get; set; }
    }
    public class XiangMuJiSuan_ZhiGuanWrapperZu
    {
        /// <summary>
        /// 项目部ID
        /// </summary>
        public int? xiangMuBuId { get; set; }
        /// <summary>
        /// 项目部名称
        /// </summary>
        public string xiangMuBuMingCheng { get; set; }
        /// <summary>
        /// 监理机构ID
        /// </summary>
        public int? jianLiJiGouId { get; set; }
        /// <summary>
        /// 监理机构名称
        /// </summary>
        public string jianLiJiGouMingCheng { get; set; }
        /// <summary>
        /// 项目ID
        /// </summary>
        public int projectId { get; set; }
        /// <summary>
        /// 项目名称
        /// </summary>
        public string projectMingCheng { get; set; }
        /// <summary>
        /// 合同号
        /// </summary>
        public string heTongHao { get; set; }
        /// <summary>
        /// 暂定监理费总额
        /// </summary>
        public decimal zanDingJianLiFeiZongE { get; set; }
        /// <summary>
        /// 实收款总额
        /// </summary>
        public decimal shiShouKuanZongE { get; set; }
        /// <summary>
        /// 总成本支出
        /// </summary>
        public decimal? zongChengBenZhiChu { get; set; }
        /// <summary>
        /// 成本控制指标
        /// </summary>
        public decimal? chenBenKongZhiZhiBiao { get; set; }
    }
    public class ExtendHeTong : DTO.TabHeTong
    {
        /// <summary>
        /// 合同号
        /// </summary>
        public string htHao
        {
            get;
            set;
        }
        /// <summary>
        /// 项目来源
        /// </summary>
        public string fs_Name { get; set; }
        /// <summary>
        /// 工程地点
        /// </summary>
        public string dd_Name { get; set; }
        /// <summary>
        /// 付款方式
        /// </summary>
        public string fk_Name { get; set; }
        /// <summary>
        /// 签订状态
        /// </summary>
        public string zt_Name { get; set; }
        /// <summary>
        /// 投资性质
        /// </summary>
        public string xz_Name { get; set; }
        /// <summary>
        /// 项目分类
        /// </summary>
        public string fl_Name { get; set; }
        /// <summary>
        /// 业务类型
        /// </summary>
        public string lx_Name { get; set; }
        /// <summary>
        /// 执行部门
        /// </summary>
        public string bm_Name { get; set; }
        /// <summary>
        /// 项目时间
        /// </summary>
        public DateTime? qq_ShiJian { get; set; }
        /// <summary>
        /// 延期监理费预计总额（万元）
        /// </summary>
        public decimal? htv_YanQiZongE { get; set; }
        /// <summary>
        /// 暂定监理费总额
        /// </summary>
        public decimal? zanJianLiFeiZongE
        {
            get;
            set;
        }
        /// <summary>
        /// 累计应收款总额
        /// </summary>
        public decimal? yingShouKuanZongE
        {
            get;
            set;
        }
        /// <summary>
        /// 累计已收款总额
        /// </summary>
        public decimal? yiShouKuanZongE
        {
            get;
            set;
        }
        /// <summary>
        /// 累计已开票总额
        /// </summary>
        public decimal? leJiYiKaiPiaoZongE
        {
            get;
            set;
        }
        /// <summary>
        /// 履约保证金应退还时间
        /// </summary>
        public DateTime? htv_LvYueYingTuiHuanRiQi { get; set; }
        /// <summary>
        /// 履约保证金应退总额
        /// </summary>
        public decimal? htv_LvYueYingTuiZongE { get; set; }
        /// <summary>
        /// 质保金应退时间
        /// </summary>
        public DateTime? htv_ZhiBaoJinTuiHuanShiJian { get; set; }
        /// <summary>
        /// 质保金应退总额（万元）
        /// </summary>
        public decimal? htv_ZhiBaoJinYingTuiZongE { get; set; }
        /// <summary>
        /// 竣工资料归档情况
        /// </summary>
        public string gd_Name { get; set; }
        /// <summary>
        /// 计划收款总额
        /// </summary>
        public decimal? jiHuaShouKuanZongE
        {
            get;
            set;
        }
        /// <summary>
        /// 实收总额
        /// </summary>
        public decimal? shiShouZongE
        {
            get;
            set;
        }
        /// <summary>
        /// 余额
        /// </summary>
        public decimal? yuE
        {
            get;
            set;
        }
       
    }
    public class XiangMuRenYuan {
        public XiangMuRenYuan() { }
        public string xingMing { get; set; }
        /// <summary>
        /// 岗位
        /// </summary>
        public string gangWei { get; set; }
        /// <summary>
        /// 持证情况
        /// </summary>
        public string[] chiZhengQingKuang { get; set; }
        /// <summary>
        /// 进入项目时间
        /// </summary>
        public string jinRuDate { get; set; }
        /// <summary>
        /// 调离项目时间
        /// </summary>
        public string tuiChuDate { get; set; }
        /// <summary>
        /// 调离原因
        /// </summary>
        public string reason { get; set; }
    }

    public class XiangMu_JieSuanMingXi : DAL.DTO.TabFaPiaoJiShouKuanGuanLi {
        public bool isJieSuan { get; set; }
    }
    /// <summary>
    /// 月工资对象
    /// </summary>
    public class ReportSalaryWrapper 
    {
      
        /// <summary>
        /// 应发 基础工资
        /// </summary>
        public decimal yf_JiBenGongZi { get; set; }
        /// <summary>
        /// 应发 补贴
        /// </summary>
        public decimal yf_BuTie { get; set; }
        /// <summary>
        /// 应发 小计
        /// </summary>
        public decimal yf_XiaoJi { get; set; }
        /// <summary>
        /// 应扣 社保
        /// </summary>
        public decimal yk_SheBao { get; set; }
        /// <summary>
        /// 应扣 个税
        /// </summary>
        public decimal yk_GeShui { get; set; }

        /// <summary>
        /// 应扣 其他1
        /// </summary>
        public decimal yk_QiTa1 { get; set; }
        /// <summary>
        /// 应扣 其他2
        /// </summary>
        public decimal yk_QiTa2 { get; set; }
        /// <summary>
        /// 应扣小计
        /// </summary>
        public decimal yk_XiaoJi { get; set; }
        /// <summary>
        /// 实发工资
        /// </summary>
        public decimal shiFaGongZi { get; set; }
        /// <summary>
        /// 公司成本
        /// </summary>
        public decimal gongSiChengBen { get; set; }
    }
    public class ReportSalaryWrapperWrapper
    {
        public int userId { get; set; }
        /// <summary>
        /// 部门ID
        /// </summary>
        public int? buMenId { get; set; }
        /// <summary>
        /// 部门名称
        /// </summary>
        public string buMenName { get; set; }
        /// <summary>
        /// 姓名
        /// </summary>
        public string xingMing { get; set; }
        /// <summary>
        /// 本月薪酬
        /// </summary>
        public DTO.Tab_Report_MonthSalary_GuiDang salaryWrapper { get; set; }
        /// <summary>
        /// 上个月薪酬
        /// </summary>
        public DTO.Tab_Report_MonthSalary_GuiDang salaryLastWrapper { get; set; }

        public List<ReportSalaryChengBenWrapper> reportSalaryChengBenWrapperArr { get; set; }
        
    }
    /// <summary>
    /// 工资分摊成本Wrapper
    /// </summary>
    public class ReportSalaryChengBenWrapper {
        public int id{get;set;}
        public int? xiangMuId { get; set; }
        public string xiangMuMingCheng { get; set; }
        public decimal? jinE { get;set;}
        public decimal? sheBaoGongSi { get; set; }
    }
    public class ReportSalaryChengBenWrapperWrapper
    {
        /// <summary>
        /// 归档ID
        /// </summary>
        public int guiDangId { get; set; }
        /// <summary>
        /// 姓名
        /// </summary>
        public string xingMing { get; set; }

        /// <summary>
        /// 部门名称
        /// </summary>
        public string buMenName { get; set; }
        /// <summary>
        /// 公司承担
        /// </summary>
        public decimal gongSiChengDan { get; set; }
        /// <summary>
        /// 是否保存过
        /// </summary>
        public bool isSaved { get; set; }
        /// <summary>
        /// 类型（null：正常,1,结算）
        /// </summary>
        public int? type { get; set; }
        /// <summary>
        /// 项目成本对象集合
        /// </summary>
        public List<ReportSalaryChengBenWrapper> reportSalaryChengBenWrapperArr
        {
            get;
            set;
        }
    }
    /// <summary>
    /// 项目月工资成本
    /// </summary>
    public class XiangMuXinChouMonth {

        public int monthSalaryId { get; set; }
        /// <summary>
        /// 年
        /// </summary>
        public short year { get; set; }
        /// <summary>
        /// 月
        /// </summary>
        public byte month { get; set; }
        /// <summary>
        /// 金额
        /// </summary>
        public decimal jinE { get; set; }
    }
    /// <summary>
    /// 工资报表第一个界面类
    /// </summary>
    public class ReportSalaryYear {
        public int monthSalaryId { get; set; }
        public short year { get; set; }
        public byte month { get; set; }
        /// <summary>
        /// 实发总额
        /// </summary>
        public decimal? shiFaZongE { get; set; }
        /// <summary>
        /// 公司承担
        /// </summary>
        public decimal? gongSiChengDan { get; set; }
        public byte zhuangTai { get; set; }
    }
    /// <summary>
    /// 工程承担月工资明细
    /// </summary>
    public class projectMonthSalaryMingXiWrapper {
        /// <summary>
        /// 姓名
        /// </summary>
        public string xingMing { get; set; }
        /// <summary>
        /// 应发金额
        /// </summary>
        public decimal jinE { get; set; }
        /// <summary>
        /// 公司承担部分
        /// </summary>
        public decimal sheBaoGongSi { get; set; }
    }
    /// <summary>
    /// 合同查询条件
    /// </summary>
    public class QueryWhereHT { 
        public byte? fs_Name{get;set;} 
        public byte? dd_Name{get;set;}  
        public byte? fk_Name{get;set;}  
        public byte? zt_Name{get;set;}  
        public byte? xz_Name{get;set;}  
        public byte? fl_Name{get;set;}  
        public byte? lx_Name{get;set;}  
        public byte? bm_Name{get;set;}  
        public DateTime? qq_ShiJian_Start{get;set;}  
        public DateTime? qq_ShiJian_End{get;set;}
        public byte? zhiXingLeiXing { get; set; }  
        public string ht_MingCheng{get;set;}  
        public string ht_Number{get;set;}  
        public string ht_YeZhuMingCheng{get;set;}  
        public string ht_YiFangQianYueDanWei{get;set;}  
        public DateTime? ht_QianYueRiQi_Start{get;set;}
        public DateTime? ht_QianYueRiQi_End { get; set; }  
    }
    public class keyValueClass:IEqualityComparer<keyValueClass> {
        public int key
        {
            get;
            set;
        }
        public string value
        {
            get;
            set;
        }

        bool IEqualityComparer<keyValueClass>.Equals(keyValueClass x, keyValueClass y)
        {
            if (x.key == y.key && x.value == y.value) return true;
            else return false;
        }

        int IEqualityComparer<keyValueClass>.GetHashCode(keyValueClass obj)
        {
            if (obj == null)
            {
                return 0;
            }
            else
            {
                return obj.ToString().GetHashCode();
            }

        }
    }
    public class stringAndStringClass
    {
        public string key
        {
            get;
            set;
        }
        public string value
        {
            get;
            set;
        }
    }
    /// <summary>
    /// 权限
    /// </summary>
    public class nav
    {
        public string id { get; set; }
        public string page { get; set; }
        public string name { get; set; }
        public string pName { get; set; }
        public string className { get; set; }
    } 
    /// <summary>
    /// 用户
    /// </summary>
    public class excelUserWrapper {
        /// <summary>
        /// 证书ID
        /// </summary>
        public int companyId { get; set; }
        /// <summary>
        /// 公司名称
        /// </summary>
        public string companyName { get; set; }
        /// <summary>
        /// 企业更新日期
        /// </summary>
        public string companyUpdateDate { get; set; }
        /// <summary>
        /// 用户名
        /// </summary>
        public string userName { get; set; }
        /// <summary>
        /// 证书Id
        /// </summary>
        public int zhengShuId { get; set; }
        /// <summary>
        /// 证书名
        /// </summary>
        public string zhengShuMing { get; set; }
        /// <summary>
        /// 专业
        /// </summary>
        public string zhuanYe { get; set; }
    }
    public class excelZhengShuWrapper {
        /// <summary>
        /// 公司ID
        /// </summary>
        public int companyId { get; set; }
        /// <summary>
        /// 证书ID
        /// </summary>
        public int zhengShuId { get; set; }
        /// <summary>
        /// 证书数量
        /// </summary>
        public int numberOfZhengShu { get; set; }
    }
    public class zhengZhangZhengShu:DAL.DTO.Tab_ZZ_ZhengShu {
        /// <summary>
        /// 未归还的数量
        /// </summary>
        public int usedNum { get; set; }
    }
}
