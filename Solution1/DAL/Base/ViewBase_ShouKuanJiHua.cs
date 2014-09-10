using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL
{
    public class ViewBase_ShouKuanJiHua:Base
    {
        /// <summary>
        /// 总共多少记录
        /// </summary>
        /// <returns></returns>
        /// 
        public int tiXing_Count(int where_days)
        {
            return filter(where_days).Count();
        }
        /// <summary>
        /// 分页返回记录
        /// </summary>
        /// <param name="currentPage"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public List<DTO.View_ShouKuanJiHua> tingXing_Filter(int currentPage,int pageSize,int where_days) {

            return filter(where_days).OrderBy(p => p.jh_ShouKuanRiQi)
                .Skip((currentPage - 1) * pageSize)
                .Take(pageSize)
                .ToList();
        }
        /// <summary>
        /// 查询基本条件（公用函数）
        /// </summary>
        /// <param name="where_days"></param>
        /// <returns></returns>
        private IQueryable<DTO.View_ShouKuanJiHua> filter(int where_days)
        {
            DateTime now = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
            now=now.AddDays(where_days);
            return this.dataContext.View_ShouKuanJiHua.Where(p => p.jh_IsTiXing && p.jh_ShouKuanRiQi.HasValue
                && p.jh_ShouKuanRiQi <= now);
        }
    }
}
