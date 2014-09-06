using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class upload : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request["test_cancel"] == "1")
        {
            // 保留3秒，测试取消功能，因为本地上传太快了，所以在这模拟一下
            System.Threading.Thread.Sleep(3000);
        }

        bool success = false;
        // 这里只是简单的直接保存到 UploadFiles 目录
        if (Request.Files.Count > 0)
        {

            string ext = System.IO.Path.GetExtension(Request.Files[0].FileName).ToLower();
            if (ext == ".jpg" || ext == ".gif" || ext == ".png" && Request.Files[0].ContentLength <= 512 * 1024 * 1024)
            {

                success = true;
                string fileName = Guid.NewGuid().ToString("N") + ext;

                string type=Request["type"];
                var dir = "UploadFiles/";
                if (type == "userPhotos") {
                    dir += "UserPhotos/";
                }
                else if (type == "zhiCheng")
                {
                    dir += "ZhiCheng/";
                }
                else if (type == "xueLi")
                {
                    dir += "XueLi/";
                }
                else if (type == "zhiYeZiGeZhengShu")
                {
                    dir += "ZhiYeZiGeZhengShu/";
                }
                else if (type == "jieSuan")
                {
                    dir += "JieSuan/";
                }
                Request.Files[0].SaveAs(Server.MapPath(dir) + fileName);
                int id = -1;
                if (Request["id"] != null) {
                    
                    if (type == "userPhotos") {
                        DAL.Base_User user = new DAL.Base_User();
                        user.savePhoto(int.Parse(Request["id"]), "../" +dir+ fileName );
                    }
                    else if (type == "zhiCheng") {
                        DAL.Base_Upload uploadBase = new DAL.Base_Upload();
                        DAL.DTO.Tab_Uploads upload = new DAL.DTO.Tab_Uploads();
                        upload.up_ContentType = 2;
                        upload.up_Dir = "../" + dir + fileName;
                        upload.up_ZhiChengId=int.Parse(Request["id"]);
                        id = uploadBase.Save(upload).up_Id;
                    }
                    else if (type == "xueLi")
                    {
                        DAL.Base_Upload uploadBase = new DAL.Base_Upload();
                        DAL.DTO.Tab_Uploads upload = new DAL.DTO.Tab_Uploads();
                        upload.up_ContentType = 1;
                        upload.up_Dir = "../" + dir + fileName;
                        upload.up_XueLiId = int.Parse(Request["id"]);
                        id=uploadBase.Save(upload).up_Id;
                    }
                    else if (type == "zhiYeZiGeZhengShu")
                    {
                        DAL.Base_Upload uploadBase = new DAL.Base_Upload();
                        DAL.DTO.Tab_Uploads upload = new DAL.DTO.Tab_Uploads();
                        upload.up_ContentType = 3;
                        upload.up_Dir = "../" + dir + fileName;
                        upload.up_ZiGeZhengShuId = int.Parse(Request["id"]);
                        id = uploadBase.Save(upload).up_Id;
                    }
                    else if (type == "jieSuan")
                    {
                        DAL.Base_Upload uploadBase = new DAL.Base_Upload();
                        DAL.DTO.Tab_Uploads upload = new DAL.DTO.Tab_Uploads();
                        upload.up_ContentType = 4;
                        upload.up_Dir = "../" + dir + fileName;
                        upload.up_ShouKuanId = int.Parse(Request["id"]);
                        id = uploadBase.Save(upload).up_Id;
                    }
                }
                Response.Write("{ success: true, fileUrl:'../" +dir+ fileName + "',id:"+id+" }");
                Response.End();
            }
        }

        if (!success)
        {
            Response.Write("{ success: false, fileUrl:'' }");
            Response.End();
        }
    }
}