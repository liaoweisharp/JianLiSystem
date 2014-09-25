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
    public partial class Tab_XiangMuZu : IEquatable<Tab_XiangMuZu>
    {


        public bool Equals(Tab_XiangMuZu other)
        {
            //Check whether the compared object is null.  
            if (Object.ReferenceEquals(other, null)) return false;

            //Check whether the compared object references the same data.  
            if (Object.ReferenceEquals(this, other)) return true;

            //Check whether the products' properties are equal.  
            return this._xmz_Id.Equals(other.xmz_Id);
        }
        public override int GetHashCode()
        {

            //Get hash code for the Name field if it is not null.  
            int hashProductName = this._xmz_Id.GetHashCode();



            //Calculate the hash code for the product.  
            return hashProductName;
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

    public class CommonEqualityComparer<T, V> : IEqualityComparer<T>
    {
        private Func<T, V> keySelector;

        public CommonEqualityComparer(Func<T, V> keySelector)
        {
            this.keySelector = keySelector;
        }

        public bool Equals(T x, T y)
        {
            return EqualityComparer<V>.Default.Equals(keySelector(x), keySelector(y));
        }

        public int GetHashCode(T obj)
        {
            return EqualityComparer<V>.Default.GetHashCode(keySelector(obj));
        }
    }
    public static class DistinctExtensions
    {
        public static IEnumerable<T> Distinct<T, V>(this IEnumerable<T> source, Func<T, V> keySelector)
        {
            return source.Distinct(new CommonEqualityComparer<T, V>(keySelector));
        }
    }  
}
