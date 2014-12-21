using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.CommClass;
using DAL.DTO;

namespace DAL
{
    public class ViewBase_TongJi_XiangMu:Base
    {
        public int count(PageClass pageClass)
        {
            if(pageClass==null) return 0;
            IQueryable<DTO.View_TongJi_XiangMu> filter = _filter(pageClass);
            return filter.Count();
        }
        public List<DTO.View_TongJi_XiangMu> filter(PageClass pageClass)
        {
            List<DTO.View_TongJi_XiangMu> retuValue = new List<DTO.View_TongJi_XiangMu>();
            if (pageClass == null) return retuValue;
            IQueryable<DTO.View_TongJi_XiangMu>  filter = _filter(pageClass);
            if (pageClass.order == null) { 
                
            }
            //分页
            filter = filter.OrderByDescending(p=>p.qq_ShiJian).Skip<View_TongJi_XiangMu>((pageClass.currentPageNumber) * pageClass.pageSize).Take(pageClass.pageSize);
            return filter.ToList();
        }
        /// <summary>
        /// 筛选条件（公用函数）
        /// </summary>
        /// <param name="pageClass"></param>
        /// <returns></returns>
        public IQueryable<DTO.View_TongJi_XiangMu> _filter(PageClass pageClass) {
            IQueryable<DTO.View_TongJi_XiangMu> filter = null;
            if (pageClass.StartDate.HasValue)
            {
                if (pageClass.EndDate.HasValue == false)
                {
                    //按月份查
                    DateTime startDate = pageClass.StartDate.Value;
                    pageClass.EndDate = startDate.AddMonths(1).AddDays(-1);
                }
                filter = this.dataContext.View_TongJi_XiangMu.Where(p => p.qq_ShiJian.HasValue == false || (p.qq_ShiJian >= pageClass.StartDate.Value && p.qq_ShiJian <= pageClass.EndDate));
            }
            if (pageClass.like != null)
            {
                pageClass.like = pageClass.like.Trim();
                filter.Where(p => p.fs_Name.Contains(pageClass.like) || p.bm_Name.Contains(pageClass.like) || p.jl_Name.Contains(pageClass.like) || p.qq_GongChengMingCheng.Contains(pageClass.like));
            }
            return filter;
        }
    }
}
