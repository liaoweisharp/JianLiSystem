using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.DTO
{
    /// <summary>
    /// 调动类的扩展
    /// </summary>
    public partial class Tab_DiaoDong:IEqualityComparer<DTO.Tab_DiaoDong>
    {
        public bool Equals(Tab_DiaoDong x, Tab_DiaoDong y)
        {
            return x.dd_Id.Equals(y.dd_Id);
        }

        public int GetHashCode(Tab_DiaoDong obj)
        {
            return obj.ToString().GetHashCode();
        }
    }
}
