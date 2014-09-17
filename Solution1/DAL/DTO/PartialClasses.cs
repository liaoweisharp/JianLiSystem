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
    public partial class Tab_XiangMuZu : IEqualityComparer<DTO.Tab_XiangMuZu> {

        public bool Equals(Tab_XiangMuZu x, Tab_XiangMuZu y)
        {
            return x.xmz_Id.Equals(y.xmz_Id);
        }

        public int GetHashCode(Tab_XiangMuZu obj)
        {
            return obj.ToString().GetHashCode();
        }
    }
    public partial class View_XiangMu_Tree : IEqualityComparer<DTO.View_XiangMu_Tree> {

        public bool Equals(View_XiangMu_Tree x, View_XiangMu_Tree y)
        {
            return x.qq_Id.Equals(y.qq_Id);
        }

        public int GetHashCode(View_XiangMu_Tree obj)
        {
            return obj.ToString().GetHashCode();
        }
    }
}
