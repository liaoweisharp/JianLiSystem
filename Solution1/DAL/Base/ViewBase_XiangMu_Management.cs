using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL
{
    public class ViewBase_XiangMu_Management:Base
    {
        public int count(CommClass.PageClass pageClass, string where)
        {
            List<DTO.View_XiangMu_Management> returnValue = new List<DTO.View_XiangMu_Management>();
            returnValue = this.dataContext.View_XiangMu_Management.Where(p => p.zu_ID.HasValue).ToList();
            if (pageClass.filter != null)
            {
                if (pageClass.filter.key == "type")
                {
                    switch (pageClass.filter.value)
                    {
                        case "zhiGuan": //直管
                            returnValue = (from p in returnValue
                                           where p.qq_ZhiXingLeiXing == 2
                                           select p).ToList();
                                     

                            break;
                        case "shiYeBu"://事业部
                            returnValue = (from p in returnValue
                                           where p.qq_ZhiXingLeiXing == 3
                                           select p).ToList();
                            break;
                    }
                }
            }
           
            if (pageClass.filters.Count > 0) {
                //工程状态筛选
                CommClass.stringAndStringClass temp= pageClass.filters.FirstOrDefault(p => p.key == "qq_GongChengZhuangTai");
                if (temp != null) {
                    if (temp.value == "-100")
                    {
                        //未填
                        returnValue = returnValue.FindAll(p => p.qq_GongChengZhuangTai == null || p.qq_GongChengZhuangTai==String.Empty);
                    }
                    else
                    {
                        returnValue = returnValue.FindAll(p => p.qq_GongChengZhuangTai == temp.value);
                    }
                }
            }
            if (where != null)
            {
                //模糊查询
                returnValue = returnValue.FindAll(p => p.qq_GongChengMingCheng.Contains(where) || p.qq_HeTongHao == where);
            }
            int?[] zuIds=returnValue.Select(p => p.zu_ID).Distinct().ToArray();
            return zuIds.Count();
        }
        public List<DTO.View_XiangMu_Management> filter(CommClass.PageClass pageClass, string where)
        {
            List<DTO.View_XiangMu_Management> returnValue = new List<DTO.View_XiangMu_Management>();
            returnValue = this.dataContext.View_XiangMu_Management.Where(p => p.zu_ID.HasValue).ToList();
            if (pageClass.filter != null)
            {
                if (pageClass.filter.key == "type")
                {
                    switch (pageClass.filter.value)
                    {
                        case "zhiGuan": //直管
                            returnValue = (from p in returnValue
                                           where p.qq_ZhiXingLeiXing == 2
                                           select p).ToList();


                            break;
                        case "shiYeBu"://事业部
                            returnValue = (from p in returnValue
                                           where p.qq_ZhiXingLeiXing == 3
                                           select p).ToList();
                            break;
                    }
                }
            }
            
            if (pageClass.filters.Count > 0)
            {
                //工程状态筛选
                CommClass.stringAndStringClass temp = pageClass.filters.FirstOrDefault(p => p.key == "qq_GongChengZhuangTai");
                if (temp != null)
                {
                    if (temp.value == "-100")
                    {
                        //未填
                        returnValue = returnValue.FindAll(p => p.qq_GongChengZhuangTai == null || p.qq_GongChengZhuangTai==String.Empty);
                    }
                    else {
                        returnValue = returnValue.FindAll(p => p.qq_GongChengZhuangTai == temp.value);
                    }
                }
             
            }
            if (where != null)
            {
                //模糊查询
                returnValue= returnValue.FindAll(p => p.qq_GongChengMingCheng.Contains(where) || p.qq_HeTongHao==where);
            }
            int?[] ids = returnValue.Select(p => p.zu_ID).Distinct().OrderBy(p=>p).ToArray();

            int?[] newIds = ids.Skip((pageClass.currentPageNumber) * pageClass.pageSize)
                .Take(pageClass.pageSize)
                .ToArray();
            return returnValue.Where(p => newIds.Contains(p.zu_ID)).OrderBy(p => p.zu_ID).ThenBy(p => p.jiGou_Name).ThenBy(p => p.qq_GongChengMingCheng)
                .ToList();
        }
    }
}
