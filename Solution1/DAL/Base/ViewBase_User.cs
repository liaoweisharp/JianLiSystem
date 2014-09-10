using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL
{
    public class ViewBase_User : Base
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
        public List<DTO.View_User> tingXing_Filter(int currentPage, int pageSize, int where_days)
        {

            return filter(where_days).OrderBy(p => p.jl_LaoDongHeTongJieShuShiJian)
                .Skip((currentPage - 1) * pageSize)
                .Take(pageSize)
                .ToList();
        }
        /// <summary>
        /// 查询基本条件（公用函数）
        /// </summary>
        /// <param name="where_days"></param>
        /// <returns></returns>
        private IQueryable<DTO.View_User> filter(int where_days)
        {
            DateTime now = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
            now = now.AddDays(where_days);
            return this.dataContext.View_User.Where(p => p.jl_IsTingXing && p.jl_LaoDongHeTongJieShuShiJian.HasValue
                && p.jl_LaoDongHeTongJieShuShiJian <= now);
        }
    }
}
