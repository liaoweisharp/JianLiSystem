using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL
{
    public class ViewBase_JieSuan_ShiYeBu:Base
    {
        public int count(CommClass.PageClass pageClass, string where)
        {
            List<DTO.View_JieSuan_ShiYeBu> returnValue = new List<DTO.View_JieSuan_ShiYeBu>();
            returnValue = this.dataContext.View_JieSuan_ShiYeBu.ToList();

            if (pageClass.filters!=null && pageClass.filters.Count > 0)
            {
                //结算状态筛选
                CommClass.stringAndStringClass temp = pageClass.filters.FirstOrDefault(p => p.key == "jieSuanZhuangTai");
                if (temp != null)
                {
                    if (temp.value == "-100")
                    {
                        //未填
                        returnValue = returnValue.FindAll(p => p.jsnr_js_ShiFouJieSuan.HasValue==false);
                    }
                    else {
                        returnValue = returnValue.FindAll(p => p.jsnr_js_ShiFouJieSuan.HasValue && p.jsnr_js_ShiFouJieSuan.Value.ToString() == temp.value);
                    }
                }
            }
            if (where != null)
            {
                //模糊查询
                returnValue= returnValue.Where(p => p.qq_GongChengMingCheng.Contains(where) || p.qq_HeTongHao == where).ToList();
            }
            List<int?> zuIds = returnValue.Select(p => p.zu_ID).Distinct().ToList();
            return zuIds.Count();

        }
        public List<DTO.View_JieSuan_ShiYeBu> filter(CommClass.PageClass pageClass, string where)
        {
            List<DTO.View_JieSuan_ShiYeBu> returnValue = new List<DTO.View_JieSuan_ShiYeBu>();
            
            returnValue = this.dataContext.View_JieSuan_ShiYeBu.ToList();

            if (pageClass.filters!=null && pageClass.filters.Count > 0)
            {
                //结算状态筛选
                CommClass.stringAndStringClass temp = pageClass.filters.FirstOrDefault(p => p.key == "jieSuanZhuangTai");
                if (temp != null)
                {
                    if (temp.value == "-100")
                    {
                        //未填
                        returnValue = returnValue.FindAll(p => p.jsnr_js_ShiFouJieSuan.HasValue==false);
                    }
                    else {
                        returnValue = returnValue.FindAll(p => p.jsnr_js_ShiFouJieSuan.HasValue && p.jsnr_js_ShiFouJieSuan.Value.ToString() == temp.value);
                    }
                }
            }
            if (where != null)
            {
                //模糊查询
                returnValue = returnValue.FindAll(p => p.qq_GongChengMingCheng.Contains(where) || p.qq_HeTongHao == where);
            }
            List<int?> zuIds = returnValue.Select(p => p.zu_ID).Distinct().OrderBy(p=>p.Value).ToList();
            zuIds= zuIds.Skip((pageClass.currentPageNumber) * pageClass.pageSize)
                .Take(pageClass.pageSize)
                .ToList();
            return returnValue.Where(p => zuIds.Contains(p.zu_ID)).OrderBy(p => p.zu_ID).ThenBy(p => p.jiGou_Name).ThenBy(p => p.qq_GongChengMingCheng)
                .ToList();
        }
    }
}
