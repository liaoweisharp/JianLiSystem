using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;

namespace DAL
{
    public class ViewBase_XiangMu_JieSuanNeiRong_IsJieSuan:Base
    {
        public int Updates(DTO.View_XiangMu_JieSuanNeiRong_IsJieSuan[] objs)
        {
            int returnValue = 0;
            Tab_XiangMu_JieSuanNeiRong[] query = (from i in this.dataContext.Tab_XiangMu_JieSuanNeiRong where objs.Select(ins => ins.jsnr_Id).Contains(i.jsnr_Id) select i).ToArray();
            foreach (Tab_XiangMu_JieSuanNeiRong q in query)
            {
                View_XiangMu_JieSuanNeiRong_IsJieSuan item = objs.FirstOrDefault(ins => ins.jsnr_Id == q.jsnr_Id);
                this.CopyObjectPoperty<Tab_XiangMu_JieSuanNeiRong, View_XiangMu_JieSuanNeiRong_IsJieSuan>(item, q);
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

        public bool Update(View_XiangMu_JieSuanNeiRong_IsJieSuan obj)
        {
            return this.Updates(new View_XiangMu_JieSuanNeiRong_IsJieSuan[] { obj }) == 1 ? true : false;
        }
    }
}
