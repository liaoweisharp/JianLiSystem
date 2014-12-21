using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Linq;
using System.Text;
using System.Collections;

namespace BLL
{
    public static class HeTong
    {
        public static ArrayList getBaseData()
        {
            ArrayList returnValue = new ArrayList();
            DAL.Base_HeTong baseHetong = new DAL.Base_HeTong();
            returnValue.Add(new DAL.DTO.TabHeTong());
            baseHetong = new DAL.Base_HeTong();
            returnValue.Add(baseHetong.listGCDD());
            baseHetong = new DAL.Base_HeTong();

            returnValue.Add(baseHetong.listHQFS());
            baseHetong = new DAL.Base_HeTong();
            returnValue.Add(baseHetong.listHTFKFS());
            baseHetong = new DAL.Base_HeTong();
            returnValue.Add(baseHetong.listHTQDZT());
            baseHetong = new DAL.Base_HeTong();
            returnValue.Add(baseHetong.listHTZXBM());
            baseHetong = new DAL.Base_HeTong();
            returnValue.Add(baseHetong.listTZXZ());
            baseHetong = new DAL.Base_HeTong();
            returnValue.Add(baseHetong.listXMFL());
            baseHetong = new DAL.Base_HeTong();
            returnValue.Add(baseHetong.listYWLX());

            baseHetong = new DAL.Base_HeTong();
            returnValue.Add(baseHetong.listHTBGFS());
            baseHetong = new DAL.Base_HeTong();
            returnValue.Add(baseHetong.listJLFLX());
            baseHetong = new DAL.Base_HeTong();
            returnValue.Add(baseHetong.listKXXZ());
            baseHetong = new DAL.Base_HeTong();
            returnValue.Add(baseHetong.listGDQK());
            baseHetong = new DAL.Base_HeTong();
            returnValue.Add(baseHetong.listGCZT());
            baseHetong = new DAL.Base_HeTong();
            returnValue.Add(baseHetong.listSFFS());
            baseHetong = new DAL.Base_HeTong();
            returnValue.Add(baseHetong.listJESM());
            
            //baseHetong.Dispose();
            return returnValue;
        }
        
        public static DAL.DTO.TabHeTong addHeTong(DAL.DTO.TabHeTong heTong)
        {
            DAL.Base_HeTong bHeTong = new DAL.Base_HeTong();
            DAL.DTO.TabHeTong obj_Hetong= bHeTong.Save(heTong);
            if (obj_Hetong != null) {
                DAL.DTO.TabHeTongVice obj_HeTongVice = new DAL.DTO.TabHeTongVice();
                DAL.DTO.TabJieSuanGuanLi obj_JieSuanGuanLi = new DAL.DTO.TabJieSuanGuanLi();
                obj_HeTongVice.htv_Id = obj_JieSuanGuanLi.js_Id = obj_Hetong.ht_Id;
                DAL.Base_HeTongVice bHTV = new DAL.Base_HeTongVice();
                DAL.Base_JieSuanGuanLi bJSGL = new DAL.Base_JieSuanGuanLi();
                bHTV.Save(obj_HeTongVice);
                bJSGL.Save(obj_JieSuanGuanLi);
                return obj_Hetong;
            }
            return null;
        }

       
      

        public static int updateHeTong(DAL.DTO.TabHeTong heTong)
        {
            DAL.Base_HeTong ht = new DAL.Base_HeTong();
            return ht.Updates(new DAL.DTO.TabHeTong[]{heTong});
        }

        public static int delHeTong(int id)
        {
            DAL.Base_HeTong ht = new DAL.Base_HeTong();
            return ht.Deletes(new int[] { id });
        }

        public static int Save_ShouKuanJiHua(DAL.DTO.TabShouKuanJiHua shouKuanJiHua)
        {
            DAL.Base_ShoukuanJiHua ins = new DAL.Base_ShoukuanJiHua();
            DAL.DTO.TabShouKuanJiHua skjh= ins.Save(shouKuanJiHua);
            if (skjh != null)
            {
                return skjh.jh_Id;
            }
            else {
                return 0;
            }
        }



        /// <summary>
        /// 得到合同以及相应的合同变更
        /// </summary>
        /// <param name="htId"></param>
        /// <returns></returns>
        public static List<DAL.DTO.TabHeTong> getHTAndChild(int htId)
        {
            return DAL.Logic.Logic_HeTong.getHTAndChild(htId);
        }

        

        
        

        public static int countHeTong(DAL.CommClass.PageClass pageClass,string where) {
            DAL.ViewBase_HeTong ins = new DAL.ViewBase_HeTong();
            return ins.count(pageClass, where);
        }
        public static List<DAL.CommClass.HeTongWrapper> filterHeTongWrappper(DAL.CommClass.PageClass pageClass,string where) {

            return DAL.Logic.Logic_HeTong.filterHeTongWrappper(pageClass, where);
        }


        /// <summary>
        /// 返回没有合同项目前期并且包含当前的集合（用于编辑合同）
        /// </summary>
        /// <param name="nullable"></param>
        /// <returns></returns>
        public static List<DAL.DTO.TabXiangMuQianQi> getXiangMuQianQiNoUse(int? ht_qqId)
        {
            List<DAL.DTO.TabXiangMuQianQi> returnValue = new List<DAL.DTO.TabXiangMuQianQi>();
            DAL.Base_XiangMuQianQi ins = new DAL.Base_XiangMuQianQi();
            returnValue.AddRange(ins.getNoHeTong());
            if (ht_qqId.HasValue && returnValue.Select(qq=>qq.qq_Id).Contains(ht_qqId.Value)==false)
            {
                ins = new DAL.Base_XiangMuQianQi();
                returnValue.Add(ins.getById(ht_qqId.Value));
            }
            return returnValue;
        }



    
    }
}
