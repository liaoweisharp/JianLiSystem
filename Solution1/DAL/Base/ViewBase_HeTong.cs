using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL.CommClass;

namespace DAL
{
    public class ViewBase_HeTong:Base
    {
        public int count(CommClass.PageClass pageClass, string where)
        {
            List<DTO.View_HeTong> returnValue = new List<DTO.View_HeTong>();
            if(where!=null && where.Trim() !=""){
                where=where.Trim();
                returnValue=this.dataContext.View_HeTong
                    .Where(p=>p.ht_MingCheng.Contains(where) || p.qq_HeTongHao==where)
                    .ToList();
            }
            else
            {
                returnValue=this.dataContext.View_HeTong.ToList();
            }
            if (pageClass.filters!=null && pageClass.filters.Count > 0)
            {
                foreach(stringAndStringClass ins in pageClass.filters){
                    switch(ins.key){
                            //执行状态筛选
                        case "zhiXingZhuangTai":
                            if (ins.value == "-100")
                            {
                                returnValue = returnValue.FindAll(p => p.htv_ZhiXingZhuangTai.HasValue ==false);
                            }
                            else {
                                returnValue = returnValue.FindAll(p => p.htv_ZhiXingZhuangTai.HasValue && p.htv_ZhiXingZhuangTai.Value == byte.Parse(ins.value));
                            }
                            break;
                            //执行类型筛选
                        case "zhiXingLeiXing":
                            returnValue=returnValue.FindAll(p=>p.qq_ZhiXingLeiXing.HasValue && p.qq_ZhiXingLeiXing.Value==byte.Parse(ins.value));
                            break;
                    }
                }
            }
            return returnValue.Count;
        }
        public List<DTO.View_HeTong> filter(CommClass.PageClass pageClass, string where)
        {
            List<DTO.View_HeTong> returnValue = new List<DTO.View_HeTong>();
            if (where != null && where.Trim() != "")
            {
                where = where.Trim();
                returnValue = this.dataContext.View_HeTong
                    .Where(p => p.ht_MingCheng.Contains(where) || p.qq_HeTongHao == where)
                    .ToList();
            }
            else
            {
                returnValue = this.dataContext.View_HeTong.ToList();
            }
            if (pageClass.filters != null && pageClass.filters.Count > 0)
            {
                foreach (stringAndStringClass ins in pageClass.filters)
                {
                    switch (ins.key)
                    {
                        //执行状态筛选
                        case "zhiXingZhuangTai":
                            if (ins.value == "-100")
                            {
                                returnValue = returnValue.FindAll(p => p.htv_ZhiXingZhuangTai.HasValue==false);
                            }
                            else {
                                returnValue = returnValue.FindAll(p => p.htv_ZhiXingZhuangTai.HasValue && p.htv_ZhiXingZhuangTai.Value == byte.Parse(ins.value));
                            }
                            break;
                        //执行类型筛选
                        case "zhiXingLeiXing":
                            returnValue = returnValue.FindAll(p => p.qq_ZhiXingLeiXing.HasValue && p.qq_ZhiXingLeiXing.Value == byte.Parse(ins.value));
                            break;
                    }
                }
            }
            if (pageClass.order != null && pageClass.order.key != null)
            {
                switch (pageClass.order.key)
                {
                    case "hetonghao":
                        if (pageClass.order.value == "1")
                        {
                            returnValue = returnValue.OrderBy(p => p.qq_HeTongHao).ToList();
                        }
                        else
                        {
                            returnValue = returnValue.OrderByDescending(p => p.qq_HeTongHao).ToList();
                        }
                        break;
                    //在这里添加排序条件
                }
            }
            return returnValue.Skip((pageClass.currentPageNumber) * pageClass.pageSize)
                .Take(pageClass.pageSize)
                .ToList();
        }
    }
}
