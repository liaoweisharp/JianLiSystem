using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;

namespace DAL
{
    public class ViewBase_HeTong_FaPiaoJiShouKuan:Base
    {
        public int Updates(DTO.View_FaPiaoJiShouKuanGuanLi[] objs)
        {
            int returnValue = 0;
            TabFaPiaoJiShouKuanGuanLi[] query = (from i in this.dataContext.TabFaPiaoJiShouKuanGuanLi where objs.Select(ins => ins.fp_Id).Contains(i.fp_Id) select i).ToArray();
            foreach (TabFaPiaoJiShouKuanGuanLi q in query)
            {
                View_FaPiaoJiShouKuanGuanLi item = objs.FirstOrDefault(ins => ins.fp_Id == q.fp_Id);
                this.CopyObjectPoperty<TabFaPiaoJiShouKuanGuanLi,View_FaPiaoJiShouKuanGuanLi>(item, q);
            }
            try
            {
                this.dataContext.SubmitChanges();
                returnValue = query.Count();
            }
            catch
            {
                returnValue = 0;
            }
            return returnValue;
        }

        
    }
}
