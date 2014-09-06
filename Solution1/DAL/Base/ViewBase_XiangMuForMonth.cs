using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;

namespace DAL
{
    public class ViewBase_XiangMuForMonth:Base
    {
        public List<View_XiangMuForMonth> getByMonthSalaryId(int monthSalaryId, bool isClose)
        {
            return (from p in this.dataContext.View_XiangMuForMonth 
                    where p.monthSalaryId==monthSalaryId && p.monthSalaryIsClose==isClose
                    orderby p.xiangMuBuId,p.jianLiJiGou,p.jinE_GeRen descending select p).ToList();
        }
    }
}
