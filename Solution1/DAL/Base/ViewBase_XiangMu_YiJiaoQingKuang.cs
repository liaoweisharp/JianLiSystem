using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;

namespace DAL
{
    public class ViewBase_XiangMu_YiJiaoQingKuang:Base
    {
        public int Updates(DTO.View_XiangMu_YiJiao[] objs)
        {
            int returnValue = 0;
            TabXiangMuQianQi[] query = (from i in this.dataContext.TabXiangMuQianQi where objs.Select(ins => ins.qq_Id).Contains(i.qq_Id) select i).ToArray();
            foreach (TabXiangMuQianQi q in query)
            {
                View_XiangMu_YiJiao item = objs.FirstOrDefault(ins => ins.qq_Id == q.qq_Id);
                this.CopyObjectPoperty<TabXiangMuQianQi, View_XiangMu_YiJiao>(item, q);
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
