using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.DTO;

namespace DAL.Logic
{
    public class Logic_ZhengZhang
    {

        public List<DAL.CommClass.zhengZhangZhengShu> filterZhengShu(CommClass.PageClass pageClass, string where) {
            List<DAL.DTO.Tab_ZZ_ZhengShu> zhengShu = new DAL.Base_ZZ_ZhengShu().filterZhengShu(pageClass, where, new string[] { "Tab_ZZ_ZhengShu_Used" });

            List < DAL.CommClass.zhengZhangZhengShu > zhengShuWrapperList= new DAL.Base().CopyObjectsPoperty<DAL.CommClass.zhengZhangZhengShu, DAL.DTO.Tab_ZZ_ZhengShu>(zhengShu);

            foreach (DAL.CommClass.zhengZhangZhengShu ins in zhengShuWrapperList) {
                int id = ins.zzzs_Id;
                DAL.DTO.Tab_ZZ_ZhengShu obj= zhengShu.FirstOrDefault(p => p.zzzs_Id == id);
                if(obj!=null)
                {
                    ins.usedNum = obj.Tab_ZZ_ZhengShu_Used.Where(p1 => p1.zzzsu_GuiHuan_Date.HasValue == false).Count();
                }

            }
            return zhengShuWrapperList;
        }
    }
}
