using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.CommClass;
using System.Collections;

namespace DAL.Logic
{
    public class Logic_Excel
    {
        private static List<DAL.CommClass.keyValueClass> getFilter(int? companyId, string userName, List<keyValueClass> zhengShuArr)
        {
            DAL.Base_ExcelCompanyUserZhuanYe base_User = new Base_ExcelCompanyUserZhuanYe();
            List<DTO.Tab_Excel_Company_User_ZhuanYe> all = base_User.getAll();
            if (companyId.HasValue)
            {
                all = all.FindAll(p => p.ecu_CompanyId == companyId);
            }
            if (userName != null && userName.Trim() != String.Empty)
            {
                userName = userName.Trim();
                all = all.FindAll(p => p.ecu_UserName.Trim() == userName);
            }
            List<DAL.CommClass.keyValueClass> list = (from p in all ///最终的公司和人员集合
                                                      select new keyValueClass { key = p.ecu_CompanyId, value = p.ecu_UserName }).ToList();
            if (zhengShuArr.Count > 0)
            {
                List<List<keyValueClass>> keyWhere = new List<List<keyValueClass>>();
                if (all.Count > 0)
                {
                    foreach (keyValueClass zhengShu in zhengShuArr)
                    {
                        List<DTO.Tab_Excel_Company_User_ZhuanYe> allWhere = all.FindAll(p => p.ecu_ZhengShuId == zhengShu.key);
                        if (zhengShu.value != null)
                        {
                            allWhere = allWhere.FindAll(p => p.ecu_ZhuangYe.Trim() == zhengShu.value.Trim());
                        }
                        List<DAL.CommClass.keyValueClass> keyItem = (from p in allWhere
                                                                     select new keyValueClass { key = p.ecu_CompanyId, value = p.ecu_UserName }).ToList();
                        keyWhere.Add(keyItem);
                    }
                }
                foreach (List<keyValueClass> _list in keyWhere)
                {
                    list = (from p1 in list
                            join p2 in _list
                            on new { key = p1.key, value = p1.value } equals new { p2.key, p2.value }
                            select p1).ToList();
                }
            }
            list = list.Distinct(new keyValueClass()).ToList();
            //按公司名称排序
            DAL.Base_ExcelCompany baseCompany = new Base_ExcelCompany();
            List<DTO.Tab_Excel_Company> companyList= baseCompany.getByIds(list.Select(p => p.key).Distinct().ToArray());
            list = (from p1 in list join p2 in companyList on p1.key equals p2.ec_ID orderby p2.ec_Name select p1).ToList();
            return list;
        }

        public static int countFilter(int? companyId, string userName, List<keyValueClass> zhengShuArr) {
            return getFilter(companyId, userName, zhengShuArr).Select(p => p.key).Distinct().Count();//筛选出公司的ID数量
        }
        public static int countFilter_ForZhengShu(int? companyId, string userName, List<keyValueClass> zhengShuArr)
        {
            List<DAL.CommClass.keyValueClass> companyAndUserNameArr = getFilter(companyId, userName, zhengShuArr);
            return companyAndUserNameArr.Select(p => p.key).Distinct().Count();
        }

        public static List<DAL.CommClass.excelUserWrapper> getFilter(int? companyId, string userName, List<keyValueClass> zhengShuArr,PageClass pc) {
            List<DAL.CommClass.keyValueClass> list= getFilter(companyId, userName, zhengShuArr);
           // pc.pageSize = 2;//默认显示两个公司
            int[] companyIds = list.Select(p=>p.key).Distinct().ToArray();

            int[] companyIds_Filter = null;
            if (pc == null)
            {
                //没有分页，表示导出Excel
                companyIds_Filter = companyIds;
            }
            else {
                //有分页
                companyIds_Filter = companyIds.Skip((pc.currentPageNumber) * pc.pageSize).Take(pc.pageSize).ToArray();//筛选出来的CompanyIds
            }
            List<DAL.CommClass.keyValueClass> list_Filter = list.FindAll(p => companyIds_Filter.Contains(p.key));
            DAL.Base_ExcelCompanyUserZhuanYe base_User = new Base_ExcelCompanyUserZhuanYe();
            List<DAL.DTO.Tab_Excel_Company_User_ZhuanYe> list_Last= base_User.getByFilter(list_Filter, new String[] { "Tab_Excel_Company", "Tab_Excel_ZhengShu" });
            List<DAL.CommClass.excelUserWrapper> returnValue = new List<excelUserWrapper>();
            foreach (DAL.DTO.Tab_Excel_Company_User_ZhuanYe zhuanYe in list_Last) {
                DAL.CommClass.excelUserWrapper obj = new excelUserWrapper();
                obj.companyId = zhuanYe.ecu_CompanyId;
                obj.companyName = zhuanYe.Tab_Excel_Company != null ? zhuanYe.Tab_Excel_Company.ec_Name : "(数据异常)";
                if (zhuanYe.Tab_Excel_Company != null) {
                    obj.companyUpdateDate = zhuanYe.Tab_Excel_Company.ec_Date.HasValue ? zhuanYe.Tab_Excel_Company.ec_Date.Value.ToString("yyyy-MM-dd"):"";
                }
                obj.userName = zhuanYe.ecu_UserName;
                obj.zhengShuId = zhuanYe.ecu_ZhengShuId;
                obj.zhengShuMing = zhuanYe.Tab_Excel_ZhengShu != null ? zhuanYe.Tab_Excel_ZhengShu.ezs_Name : "(数据异常)";
                obj.zhuanYe = zhuanYe.ecu_ZhuangYe;
                returnValue.Add(obj);
            }
            returnValue = returnValue.OrderBy(p => p.companyId).ThenBy(p => p.userName).ToList();//先按公司排序再按姓名排序
            return returnValue;
        }
        /// <summary>
        /// 返回证书的数量接口
        /// </summary>
        /// <param name="companyId"></param>
        /// <param name="userName"></param>
        /// <param name="zhengShuArr"></param>
        /// <returns></returns>
        public static ArrayList getFilter_ForZhengShu(int? companyId, string userName, List<keyValueClass> zhengShuArr, PageClass pc)
        {
            ArrayList returnValue = new ArrayList();
            List<DAL.CommClass.excelZhengShuWrapper> numOfZhengShuList = new List<excelZhengShuWrapper>();
            List<DAL.CommClass.keyValueClass> companyAndUserNameArr= getFilter(companyId, userName, zhengShuArr);
            int[] companyIds= companyAndUserNameArr.Select(p => p.key).Distinct().ToArray();
            if (companyIds.Length > 0)
            {
                DAL.Base_ExcelCompanyUserZhuanYe Base_ZhuanYe = new Base_ExcelCompanyUserZhuanYe();
                numOfZhengShuList = Base_ZhuanYe.getNumberOfZhengShu(companyIds);

                DAL.Base_ExcelZhengShu base_ZhengShu = new Base_ExcelZhengShu();
                DAL.Base_ExcelCompany base_Company=new Base_ExcelCompany();
                List<DTO.Tab_Excel_Company> companyList= base_Company.getByIds(companyIds).OrderBy(p => p.ec_Name).ToList();
                if (pc != null)
                {
                    //分页筛选
                    companyList = companyList.Skip((pc.currentPageNumber) * pc.pageSize).Take(pc.pageSize).ToList();
                    //分页筛选
                    numOfZhengShuList = numOfZhengShuList.FindAll(p => companyList.Select(ins => ins.ec_ID).Contains(p.companyId));
                }
                returnValue.Add(base_ZhengShu.getAll());
                returnValue.Add(companyList);
                returnValue.Add(numOfZhengShuList);
            }



            return returnValue;
        }
        /// <summary>
        /// 导出excel传过来的zhengShu字符串转换成数组
        /// </summary>
        /// <param name="_zhengShu"></param>
        /// <returns></returns>
        public static List<DAL.CommClass.keyValueClass> ConvertToZhengShuArray(string _zhengShu)
        {
            List<DAL.CommClass.keyValueClass> zhengShuArr = new List<DAL.CommClass.keyValueClass>();
            string[] _zhengShuArr = _zhengShu.Split(';');
            foreach (string str in _zhengShuArr)
            {
                if (str == String.Empty) continue;
                string[] temp = str.Split('#');
                DAL.CommClass.keyValueClass obj = new DAL.CommClass.keyValueClass();
                int key = int.Parse(temp[0]);
                if (temp.Length == 2)
                {
                    string value = null;
                    if (temp[1] != String.Empty)
                    {
                        value = temp[1];
                    }
                    obj.key = key;
                    obj.value = value;
                }
                else if (temp.Length == 1)
                {
                    obj.key = key;
                    obj.value = null;
                }
                zhengShuArr.Add(obj);
            }
            return zhengShuArr;
        }
    }
}

