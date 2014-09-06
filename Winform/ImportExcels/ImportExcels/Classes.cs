using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ImportExcels
{
    public class ZhuanYeClass
    {
        public ZhuanYeClass(){
            ZhuanYe = new List<string>();
        }
        public string ZhengShu { get; set; }
        public List<string> ZhuanYe { get; set; }
    }
}
