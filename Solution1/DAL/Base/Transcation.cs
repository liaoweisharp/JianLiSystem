using System;
using System.Collections.Generic;
using System.Linq;

using System.Text;
using System.Transactions;

namespace DAL
{
    public class Transcation
    {
        public DTO.TabHeTong saveHeTong(DTO.TabHeTong heTong) {
            DTO.TabHeTong returnValue = null; 
            using (TransactionScope sp = new TransactionScope())
            {
                try
                {
                    DAL.Base_HeTong bHeTong = new Base_HeTong();
                    DTO.TabHeTong newHeTong= bHeTong.Save(heTong);
                   
                    DTO.TabHeTongVice htv = new DTO.TabHeTongVice();
                    DTO.TabJieSuanGuanLi jsgl = new DTO.TabJieSuanGuanLi();
                    htv.htv_Id =jsgl.js_Id= newHeTong.ht_Id;
                    DAL.Base_HeTongVice bHeTongVice= new Base_HeTongVice();
                    DTO.TabHeTongVice tHeTongVice= bHeTongVice.Save(htv);
                   
                    DAL.Base_JieSuanGuanLi bJSGL = new Base_JieSuanGuanLi();
                    DTO.TabJieSuanGuanLi tabJieSuanGuanLi= bJSGL.Save(jsgl);
                
                    sp.Complete();
                    returnValue = newHeTong;
                }
                catch (Exception e)
                {
                    returnValue = null;
                }
                finally
                {
                    sp.Dispose();
                }
            }
            return returnValue;
        }
    }
}
