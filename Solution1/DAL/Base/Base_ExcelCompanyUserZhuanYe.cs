using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;
using System.Data.Linq;

namespace DAL
{
    public class Base_ExcelCompanyUserZhuanYe:Base
    {
        public Tab_Excel_Company_User_ZhuanYe Save(Tab_Excel_Company_User_ZhuanYe obj)
        {
            return this.Save<Tab_Excel_Company_User_ZhuanYe>(obj);
        }
        public int Updates(Tab_Excel_Company_User_ZhuanYe[] objs)
        {
            int returnValue = 0;
            Tab_Excel_Company_User_ZhuanYe[] query = (from i in this.dataContext.Tab_Excel_Company_User_ZhuanYe where objs.Select(ins => ins.ecu_ID).Contains(i.ecu_ID) select i).ToArray();
            foreach (Tab_Excel_Company_User_ZhuanYe q in query)
            {
                Tab_Excel_Company_User_ZhuanYe item = objs.FirstOrDefault(ins => ins.ecu_ID == q.ecu_ID);
                this.CopyObjectPoperty<Tab_Excel_Company_User_ZhuanYe, Tab_Excel_Company_User_ZhuanYe>(item, q);
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
            var query = from i in this.dataContext.Tab_Excel_Company_User_ZhuanYe where ids.Contains(i.ecu_ID) select i;
            this.dataContext.Tab_Excel_Company_User_ZhuanYe.DeleteAllOnSubmit(query);
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
        public List<DTO.Tab_Excel_Company_User_ZhuanYe> getAll(params string[] tabs)
        {
            queryConfig(tabs);
            return this.dataContext.Tab_Excel_Company_User_ZhuanYe.ToList<DTO.Tab_Excel_Company_User_ZhuanYe>();
        }
        /// <summary>
        /// 设置查询需要返回哪些关联表。
        /// </summary>
        /// <param name="tabs"></param>
        private void queryConfig(params string[] tabs)
        {
            if (tabs != null && tabs.Length == 0)
            {
                this.dataContext.DeferredLoadingEnabled = false;
            }
            else
            {
                DataLoadOptions dl = new DataLoadOptions();
                if (tabs == null || tabs.Contains("Tab_Excel_Company"))
                {
                    dl.LoadWith<DTO.Tab_Excel_Company_User_ZhuanYe>(tab => tab.Tab_Excel_Company);
                }
                if (tabs == null || tabs.Contains("Tab_Excel_ZhengShu"))
                {
                    dl.LoadWith<DTO.Tab_Excel_Company_User_ZhuanYe>(tab => tab.Tab_Excel_ZhengShu);
                }
            }

        }

        internal List<Tab_Excel_Company_User_ZhuanYe> getByFilter(List<CommClass.keyValueClass> list_Filter, params string[] tabs)
        {
            queryConfig(tabs);
            //var list = (from p1 in this.dataContext.Tab_Excel_Company_User_ZhuanYe
            //          join p2 in list_Filter
            //          on new { key = p1.ecu_CompanyId, value = p1.ecu_UserName } equals new
            //          {
            //              p2.key,
            //              p2.value
            //          }
            //          select p1).ToList();

            List<Tab_Excel_Company_User_ZhuanYe> ddd= (from p1 in this.dataContext.Tab_Excel_Company_User_ZhuanYe select p1).ToList();
            var list = (from p1 in ddd
                        join p2 in list_Filter
                        on new { key = p1.ecu_CompanyId, value = p1.ecu_UserName } equals new
                        {
                            p2.key,
                            p2.value
                        }
                        select p1).ToList();

            //var list = (from p1 in this.dataContext.Tab_Excel_Company_User_ZhuanYe
            //            join p2 in list_Filter
            //            on p1.ecu_CompanyId+p1.ecu_UserName equals p2.key+p2.value
            //            select p1).ToList();
            return list;
        }
        /// <summary>
        /// 得到证书的数量
        /// </summary>
        /// <param name="companyIds"></param>
        /// <returns></returns>
        public List<DAL.CommClass.excelZhengShuWrapper> getNumberOfZhengShu(int[] companyIds,params string[] tabs)
        {
            queryConfig(tabs);
            //先按companyId,zhengShuId,UserName去重
            var _list =
                (from p in this.dataContext.Tab_Excel_Company_User_ZhuanYe
                 where companyIds.Contains(p.ecu_CompanyId)
                 select new
                 {
                     p.ecu_CompanyId,
                     p.ecu_ZhengShuId,
                     p.ecu_UserName
                     
                 })
                 .Distinct();
            //统计数量
            List<DAL.CommClass.excelZhengShuWrapper> list=
                    (from p in _list
                    group p by new
                    {
                        p.ecu_CompanyId,
                        p.ecu_ZhengShuId
                    }
                    into g
                    select new DAL.CommClass.excelZhengShuWrapper
                    {
                        companyId= g.Key.ecu_CompanyId,
                        zhengShuId=g.Key.ecu_ZhengShuId,
                        numberOfZhengShu=g.Count()
                    })
                    .ToList();
            return list;
        }

        public string[] getZhuanYeByZhengShuId(int zhengShuId)
        {
            return this.dataContext.Tab_Excel_Company_User_ZhuanYe.Where(p=>p.ecu_ZhengShuId==zhengShuId).Select(p => p.ecu_ZhuangYe).Distinct().ToArray();
        }
    }
}
