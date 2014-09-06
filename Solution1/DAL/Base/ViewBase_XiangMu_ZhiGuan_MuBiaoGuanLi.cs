using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;

namespace DAL
{
    public class ViewBase_XiangMu_ZhiGuan_MuBiaoGuanLi:Base
    {
        public int Updates(DTO.View_XiangMu_ZhiGuan_MuBiaoGuanLi[] objs)
        {
            int returnValue = 0;
            Tab_XiangMu_ZhiGuan[] query = (from i in this.dataContext.Tab_XiangMu_ZhiGuan where objs.Select(ins => ins.zg_Id).Contains(i.zg_Id) select i).ToArray();
            foreach (Tab_XiangMu_ZhiGuan q in query)
            {
                View_XiangMu_ZhiGuan_MuBiaoGuanLi item = objs.FirstOrDefault(ins => ins.zg_Id == q.zg_Id);
                this.CopyObjectPoperty<Tab_XiangMu_ZhiGuan, View_XiangMu_ZhiGuan_MuBiaoGuanLi>(item, q);
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

        public bool Update(View_XiangMu_ZhiGuan_MuBiaoGuanLi obj)
        {
            return this.Updates(new View_XiangMu_ZhiGuan_MuBiaoGuanLi[] { obj }) == 1 ? true : false;
        }
    }
}
