using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;

namespace DAL
{
    public class ViewBase_HeTong_FaPiaoJiShouKuan_JiSuan:Base
    {
        public int Updates(DTO.View_FaPiaoJiShouKuanGuanLi_JieSuan[] objs)
        {
            int returnValue = 0;
            TabFaPiaoJiShouKuanGuanLi[] query = (from i in this.dataContext.TabFaPiaoJiShouKuanGuanLi where objs.Select(ins => ins.fp_Id).Contains(i.fp_Id) select i).ToArray();
            foreach (TabFaPiaoJiShouKuanGuanLi q in query)
            {
                View_FaPiaoJiShouKuanGuanLi_JieSuan item = objs.FirstOrDefault(ins => ins.fp_Id == q.fp_Id);
                this.CopyObjectPoperty<TabFaPiaoJiShouKuanGuanLi, View_FaPiaoJiShouKuanGuanLi_JieSuan>(item, q);
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

        public bool Update(DTO.View_FaPiaoJiShouKuanGuanLi_JieSuan obj)
        {
            return this.Updates(new View_FaPiaoJiShouKuanGuanLi_JieSuan[] { obj })==1?true:false;
        }
    }
}
