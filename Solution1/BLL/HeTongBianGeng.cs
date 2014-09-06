using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
    public class HeTongBianGeng
    {
        public static int Save(DAL.DTO.TabHeTongBianGeng heTongBG){
            DAL.Base_HeTongBianGeng ins = new DAL.Base_HeTongBianGeng();
            DAL.DTO.TabHeTongBianGeng htbg = ins.Save(heTongBG);
            if (htbg != null)
            {
                return htbg.bg_Id;
            }
            else {
                return 0;
            }
        }
    }
}
