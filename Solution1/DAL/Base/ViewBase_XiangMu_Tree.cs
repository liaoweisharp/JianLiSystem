using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL
{
    public class ViewBase_XiangMu_Tree:Base
    {
        /// <summary>
        /// 得到所有监理机构
        /// </summary>
        /// <returns></returns>
        public List<DTO.View_XiangMu_Tree> getJianLiJiGou() {
            return (from p in this.dataContext.View_XiangMu_Tree
                    where p.qq_LeiXing == 2 && p.qq_XiangMuZhuId!=null
                    orderby p.qq_GongChengMingCheng
                    select p).ToList();
        }
        /// <summary>
        /// 得到没有挂在监理机构的项目
        /// </summary>
        /// <returns></returns>
        public List<DTO.View_XiangMu_Tree> getProjectOfNoJianLiJiGou() {
            return (from p in this.dataContext.View_XiangMu_Tree
                    where (p.qq_LeiXing == null || p.qq_LeiXing==1) && p.qq_ParentId==null && p.qq_XiangMuZhuId!=null
                    orderby p.qq_GongChengMingCheng
                    select p).ToList();
        }
        /// <summary>
        /// 得到挂在监理机构下的项目
        /// </summary>
        /// <returns></returns>
        public List<DTO.View_XiangMu_Tree> getProjectOfJianLiJiGou() {
            return (from p in this.dataContext.View_XiangMu_Tree
                    where (p.qq_LeiXing == null || p.qq_LeiXing == 1) && p.qq_ParentId != null && p.qq_XiangMuZhuId != null
                    orderby p.qq_GongChengMingCheng
                    select p).ToList();
        }
    }
}
