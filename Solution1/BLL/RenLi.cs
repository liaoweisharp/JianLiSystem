using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;

namespace BLL
{
    public static class RenLi
    {
        public static ArrayList getBaseData()
        {
            ArrayList returnValue = new ArrayList();
            DAL.Base_User user=new DAL.Base_User();
            returnValue.Add(user.listBuMen());//部门
            user = new DAL.Base_User();
            returnValue.Add(user.listCBZK());
            user = new DAL.Base_User();
            returnValue.Add(user.listHJXZ());
            user = new DAL.Base_User();
            returnValue.Add(user.listHY());
            user = new DAL.Base_User();
            returnValue.Add(user.listMZ());
            user = new DAL.Base_User();
            returnValue.Add(user.listZZMM());
            user = new DAL.Base_User();
            returnValue.Add(user.listRZRJ());
            user = new DAL.Base_User();
            returnValue.Add(user.listGZZT());
            return returnValue;
        }
        public static int countRenLi(DAL.CommClass.PageClass pageClass, string where)
        {
            DAL.Base_User ins = new DAL.Base_User();
            return ins.countAllUser(pageClass, where);
        }
        public static List<DAL.CommClass.UserWrapper> filterRenLiWrappper(DAL.CommClass.PageClass pageClass, string where)
        {
            return DAL.Logic.Logic_User.filterRenLiWrappper(pageClass, where);
        }

        
        public static List<DAL.CommClass.PeiXunWrapper> getPeiXunWrapper(int userId)
        {
            return DAL.Logic.Logic_User.getPeiXunWrapper(userId);
        }

        public static ArrayList getXinChouInfo(int id)
        {
            ArrayList returnValue = new ArrayList();
            DAL.Base_XinChou xinChou = new DAL.Base_XinChou();
            DAL.DTO.Tab_RL_XinChou obj= xinChou.getById(id);
            xinChou = new DAL.Base_XinChou();
            DAL.Base_XinChou_JieSuan bJieSuan = new DAL.Base_XinChou_JieSuan();
            DAL.DTO.Tab_RL_XinChou_JieSuan jieSuan=bJieSuan.getById(obj.xc_Id);
            returnValue.Add(obj);
            returnValue.Add(xinChou.listTZYY());
            returnValue.Add(jieSuan);
            return returnValue;
        }

        public static List<DAL.CommClass.XinChouWrapper> getXinChouByUserId(int userId)
        {
            return DAL.Logic.Logic_User.getXinChouWrapper(userId);
        }

        public static ArrayList getDiaoDongByUserId(int userId)
        {
            ArrayList returnValue = new ArrayList();
            DAL.Base_DiaoDong obj = new DAL.Base_DiaoDong();
            returnValue.Add(obj.getByUserId(userId));
         
            DAL.Base_User userObj = new DAL.Base_User();
            returnValue.Add(userObj.getAllKeyValue());
            
            returnValue.Add(DAL.Logic.Logic_XiangMu.getAllXiangMuKeyValue());
            return returnValue;
        }
    }
}
