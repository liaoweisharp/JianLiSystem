using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using DAL.DTO;

namespace BLL
{
    public static class XiangMu
    {

      
        public static int countQianQi(DAL.CommClass.PageClass pageClass, string where)
        {
            DAL.Base_XiangMuQianQi ins = new DAL.Base_XiangMuQianQi();
            return ins.countAllHeTong(pageClass, where);
        }
        public static int countJS_ShiYeBu(DAL.CommClass.PageClass pageClass, string where)
        {
            DAL.Logic.Logic_XiangMu ins = new DAL.Logic.Logic_XiangMu();
            return ins.countShiYeBu(pageClass, where);
        }
        public static int countZhiGuan_JustXiangMu(DAL.CommClass.PageClass pageClass, string where)
        {
            DAL.Base_XiangMuQianQi ins = new DAL.Base_XiangMuQianQi();
            return ins.countZhiGuan_JustXiangMu(pageClass, where);
        }
        public static int countZhiGuan_Zu(DAL.CommClass.PageClass pageClass, string where)
        {
            DAL.Logic.Logic_XiangMu b1 = new DAL.Logic.Logic_XiangMu();
            return b1.countXiangMuZu(pageClass,where);
        }
        public static List<DAL.CommClass.XiangMuQianQiWrapper> filterAllXiangMuQianQi(DAL.CommClass.PageClass pageClass, string where, params string[] tabs)
        {
            return DAL.Logic.Logic_XiangMu.filterAllXiangMuQianQi(pageClass, where, tabs);
        }
        public static int countHouQi(DAL.CommClass.PageClass pageClass, string where) {
            DAL.Base_XiangMuQianQi ins = new DAL.Base_XiangMuQianQi();
            return ins.countAllHeTong(pageClass, where);
        }
        //public static List<DAL.CommClass.XiangMuHouQiWrapper> filterAllXiangMuHouQi(DAL.CommClass.PageClass pageClass, string where, params string[] tabs)
        //{
        //    return DAL.Logic.Logic_XiangMu.filterAllXiangMuHouQi(pageClass, where, tabs);
        //}
        public static List<DAL.CommClass.XiangMuJiSuan_ShiYeBuWrapper> filterAllXiangMuJiSuan_ShiYeBu(DAL.CommClass.PageClass pageClass, string where) {
            return DAL.Logic.Logic_XiangMu.filterAllXiangMuJiSuan_ShiYeBu(pageClass, where);
        }
        public static List<DAL.CommClass.XiangMuJiSuan_ZhiGuanWrapper> filterAllXiangMuQianQi_ZhiGuan_JustXiangMu(DAL.CommClass.PageClass pageClass, string where)
        {
            return DAL.Logic.Logic_XiangMu.filterAllXiangMuQianQi_ZhiGuan_JustXiangMu(pageClass, where);
        }
        public static List<DAL.CommClass.XiangMuJiSuan_ZhiGuanWrapperZu> filterAllXiangMuQianQi_ZhiGuan_Zu(DAL.CommClass.PageClass pageClass, string where)
        {
            return DAL.Logic.Logic_XiangMu.filterAllXiangMuQianQi_ZhiGuan_Zu(pageClass, where);
        }
      
        public static ArrayList getInitData()
        {
            ArrayList returnValue = new ArrayList();
            DAL.Base_User ins = new DAL.Base_User();
            returnValue.Add(ins.getAllKeyValue());
            DAL.Base_XiangMuQianQi ins2 = new DAL.Base_XiangMuQianQi();
            returnValue.Add(ins2.listXMJB());
            DAL.Base_XiangMuQianQi ins3 = new DAL.Base_XiangMuQianQi();
            returnValue.Add(ins3.listXMLB());
            DAL.Base_XiangMuQianQi ins4 = new DAL.Base_XiangMuQianQi();
            returnValue.Add(ins4.getDistinctGongChengZhuangTai());
            return returnValue;
        }

        public static List<DAL.CommClass.XiangMuRenYuan> getCurrentMonthRenYuan(int projectId)
        {
            return DAL.Logic.Logic_XiangMu.getCurrentMonthRenYuan(projectId);
        }

        public static List<DAL.CommClass.XiangMuRenYuan> getAllRenYuan(int projectId)
        {
            return DAL.Logic.Logic_XiangMu.getAllRenYuan(projectId);
        }

        public static ArrayList getXiangMuMingInfoXiByProjectId(int projectId)
        {
            ArrayList returnValue = new ArrayList();
            returnValue.Add(DAL.Logic.Logic_XiangMu.getXiangMuMingXiByProjectId(projectId));
            returnValue.Add(DAL.Logic.Logic_XiangMu.getXiangMuYiJiaoByProjectId(projectId));
            return returnValue;
        }
        /// <summary>
        /// 得到编辑项目移交明细的信息
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public static ArrayList getXiangMuMingInfoXiByProjectId_ForEdit(int projectId)
        {
            ArrayList returnValue = new ArrayList();
            DAL.Base_XiangMuQianQi ins = new DAL.Base_XiangMuQianQi();
            DAL.DTO.TabXiangMuQianQi xiangMu = ins.getById(projectId);
            if (xiangMu.qq_GongChengLieBie.HasValue == false)
            {
                return returnValue;
            }
            DAL.Base_XiangMu_YiJiaoDan yjd = new DAL.Base_XiangMu_YiJiaoDan();
            List<Tab_XiangMu_YiJiaoDan> yjdList= yjd.getByLeiBieId(xiangMu.qq_GongChengLieBie.Value);
            returnValue.Add(yjdList);
            DAL.Base_XiangMu_YiJiaoMingXi yjmx = new DAL.Base_XiangMu_YiJiaoMingXi();
            returnValue.Add(yjmx.getByProjectId(projectId));
            returnValue.Add(xiangMu);
            DAL.Base_User baseUser = new DAL.Base_User();
            returnValue.Add(baseUser.getAllKeyValue());
            return returnValue;
        }


        /// <summary>
        /// 得到结算明细相关
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        public static ArrayList getJieSuanMingXiByProjectId(int projectId)
        {
            ArrayList returnValue = new ArrayList();
            List<DAL.CommClass.XiangMu_JieSuanMingXi> mxList= DAL.Logic.Logic_XiangMu.getXiangMu_JieSuanMingXiWrapperByProjectId(projectId);
            DAL.Base_Upload upload = new DAL.Base_Upload();
            List<DAL.DTO.Tab_Uploads> uploadList = upload.getByShouKuanIds(mxList.Select(p => p.fp_Id).Distinct().ToArray());
            returnValue.Add(mxList);
            returnValue.Add(uploadList);
            return returnValue;
        }
        /// <summary>
        /// 添加结算（添加、更新都有可能）
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static bool addJieSuan(View_XiangMu_JieSuanNeiRong_IsJieSuan obj)
        {
            DAL.Base_XiangMu_JieSuanNeiRong _b = new DAL.Base_XiangMu_JieSuanNeiRong();
            Tab_XiangMu_JieSuanNeiRong neiRong= _b.getById(obj.jsnr_Id);
            if (neiRong != null)//存在就要更新
            {
                DAL.ViewBase_XiangMu_JieSuanNeiRong_IsJieSuan ins = new DAL.ViewBase_XiangMu_JieSuanNeiRong_IsJieSuan();
                return ins.Update(obj);
            }
            else {
                //不存在就要添加
                DAL.DTO.Tab_XiangMu_JieSuanNeiRong ins = new Tab_XiangMu_JieSuanNeiRong();
                DAL.Base b = new DAL.Base();
                b.CopyObjectPoperty<DAL.DTO.Tab_XiangMu_JieSuanNeiRong, View_XiangMu_JieSuanNeiRong_IsJieSuan>(obj, ins);
                _b = new DAL.Base_XiangMu_JieSuanNeiRong();
                return _b.Save(ins)!=null?true:false;
            }
        }








        /// <summary>
        /// 移动树形菜单节点
        /// </summary>
        /// <param name="jianLiJiGouId">项目监理结构ID</param>
        /// <param name="xiangMuZuId">目标项目组ID</param>
        /// <returns></returns>
        public static bool dragJianLiJiGou(int jianLiJiGouId, int xiangMuZuId)
        {
            TabXiangMuQianQi tab= new DAL.Base_XiangMuQianQi().getById(jianLiJiGouId);
            tab.qq_XiangMuZhuId = xiangMuZuId;
            new DAL.Base_XiangMuQianQi().Updates(new TabXiangMuQianQi[] { tab });
            new DAL.Base_XiangMuQianQi().updateXiangMuZuIdByParentId(jianLiJiGouId, xiangMuZuId);
            return true;
        }
        /// <summary>
        /// 移动树形菜单节点
        /// </summary>
        /// <param name="gongChengId">工程 Id</param>
        /// <param name="jianLiJiGouId">目标监理机构ID</param>
        /// <returns></returns>
        public static bool dragGongCheng(int gongChengId, int jianLiJiGouId)
        {
            TabXiangMuQianQi tab1 = new DAL.Base_XiangMuQianQi().getById(jianLiJiGouId);
            TabXiangMuQianQi tab2 = new DAL.Base_XiangMuQianQi().getById(gongChengId);
            tab2.qq_ParentId = jianLiJiGouId;
            tab2.qq_XiangMuZhuId = tab1.qq_XiangMuZhuId;
            new DAL.Base_XiangMuQianQi().Updates(new TabXiangMuQianQi[] { tab2 });
            return true;
        }

        public static ArrayList getDistinctInfo()
        {
            ArrayList returnValue = new ArrayList();
            string[] gongChengZhuangTai = new DAL.Base_XiangMuQianQi().getDistinctGongChengZhuangTai();
            returnValue.Add(gongChengZhuangTai);
            return returnValue;
        }
    }
}
