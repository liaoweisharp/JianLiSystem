using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.CommClass
{
    public class PageClass
    {
        public int pageSize
        {
            get;
            set;
        }
        public int currentPageNumber
        {
            get ;
            set;
        }
        private stringAndStringClass _filter = new stringAndStringClass();
        /// <summary>
        /// 筛选字段键值（目前设计能筛选一个）
        /// </summary>
        /// 
        public stringAndStringClass filter
        {
            get { return _filter; }
            set { _filter = value; }
        }
        private List<stringAndStringClass> _filters = new List<stringAndStringClass>();
        /// <summary>
        /// 筛选字段键值（目前设计能筛选一个）
        /// </summary>
        /// 
        public List<stringAndStringClass> filters
        {
            get { return _filters; }
            set { _filters = value; }
        }
        private stringAndStringClass _order = new stringAndStringClass();
        /// <summary>
        /// 排序字段键值（目前设计能排序一个），bool为是否升序
        /// </summary>
        public stringAndStringClass order
        {
            get { return _order; }
            set { _order = value; }
        }
        /// <summary>
        /// 开始时间
        /// </summary>
        public DateTime? StartDate
        {
            get;
            set;
        }
        /// <summary>
        /// 结束时间
        /// </summary>
        public DateTime? EndDate
        {
            get;
            set;
        }
        /// <summary>
        /// 模糊查询字段
        /// </summary>
        public string like { get; set; }
    }
}
