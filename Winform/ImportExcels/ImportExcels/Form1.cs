using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Data.OleDb;

namespace ImportExcels
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            string connStr=null;
            try
            {
                DAL.WebService.WebService_ExportExcel ddd = new DAL.WebService.WebService_ExportExcel();
                connStr = ddd.getConnString();
                label1.Text = "服务器连接成功!";
                label1.ForeColor = Color.Green;
                DAL.Base.Base.connStr = connStr;
                button1.Visible = true;
                button2.Visible = true;
                ddd.Dispose();
            }
            catch (Exception e)
            {
                label1.Text = "连接失败:"+e.Message;
            }
            
        }

        private char splitChar='#';
        private void button1_Click(object sender, EventArgs e)
        {
            //this.lb_status.Visible = false;
            System.Windows.Forms.OpenFileDialog fd = new OpenFileDialog();
            if (fd.ShowDialog() == DialogResult.OK)
            {
                
               // string strConn = "Provider=Microsoft.Jet.OLEDB.4.0;" + "Data Source=" + fd.FileName + ";" + "Extended Properties=Excel 8.0;";
                //string strConn = "Provider=Microsoft.Jet.OLEDB.4.0;" +
                //        "Extended Properties=\"Excel 8.0;HDR=NO\";" +
                //        "data source=" + fd.FileName;
                string strConn = "provider=microsoft.jet.oledb.4.0;Extended properties='excel 8.0;hdr=no';data source=" + fd.FileName;
                OleDbConnection conn = new OleDbConnection(strConn);
                conn.Open();

                DataTable dtSheetName = conn.GetOleDbSchemaTable (
                OleDbSchemaGuid.Tables, new object[] { null, null, null, "Table" });
                //conn.Close();
                //包含excel中表名的字符串数组  
                string[] strTableNames = new string[dtSheetName.Rows.Count];  
                for (int k = 0; k <  dtSheetName.Rows.Count; k++)  
                {
                    strTableNames[k] = dtSheetName.Rows[k]["TABLE_NAME"].ToString();
                }
                DAL.Base.ExcelZhengShu base_ZhengShu = new DAL.Base.ExcelZhengShu();
                List<DAL.DTO.Tab_Excel_ZhengShu> zhengShuList= base_ZhengShu.getAll();
                string strExcel = "";
                OleDbDataAdapter myCommand = null;
                List<ZhuanYeClass> datas = new List<ZhuanYeClass>();
                for (int i = 0; i < strTableNames.Length; i++)
                {
                    DataSet ds = new DataSet();
                    strExcel = string.Format("select * from [{0}]", strTableNames[i]); //Bicycle为excel中工作薄
                    myCommand = new OleDbDataAdapter(strExcel, strConn);
                    myCommand.Fill(ds);
                    DataTable dt = ds.Tables[0];
                    ZhuanYeClass obj = new ZhuanYeClass();

                    foreach (DataRow row in dt.Rows)
                    {
                        if (row[0].ToString() != "")
                        {
                            //姓名重名要系统改名
                            if (obj.ZhuanYe != null)
                            {
                                if (obj.ZhuanYe.FirstOrDefault(p => p.Split(splitChar)[0] == row[0].ToString())!=null) {
                                    Random ran=new Random();
                                    int RandKey = ran.Next(1, 10);
                                    row[0] = row[0].ToString() + RandKey.ToString();
                                }
                            }
                        }
                        if (row.ItemArray.Length == 1) {
                            ///没有专业
                            obj.ZhuanYe.Add(row[0].ToString());
                        }
                        else if (row.ItemArray.Length>1)
                        {
                            ///有多个专业
                            bool isOnleOne = true;//只有第一列的标记

                            string str1 = row[0].ToString();
                            string str2 = row[0].ToString();
                            
                            if (row[1].ToString() != String.Empty)
                            {
                                str1 += splitChar + row[1].ToString();
                                obj.ZhuanYe.Add(str1);
                                isOnleOne = false;
                            }
                            
                            if (row.ItemArray.Length > 2)
                            {
                                if (row[2].ToString() != String.Empty)
                                {
                                    str2 += splitChar + row[2].ToString();
                                    obj.ZhuanYe.Add(str2);
                                    isOnleOne = false;
                                }
                            }
                            if (isOnleOne) {
                                obj.ZhuanYe.Add(str1);
                            }
                            
                        }
                    }
                    obj.ZhengShu = strTableNames[i].Split('$')[0];//去掉证书名的$符号;
                    datas.Add(obj);
                }
                //#region 验证
                List<ZhuanYeClass> lastDatas = new List<ZhuanYeClass>();
                foreach (ZhuanYeClass obj in datas) {
                    if (obj.ZhengShu.ToLower().Contains("sheet")) {
                        if (obj.ZhuanYe.FindAll(p => p.Trim() == "").Count() == obj.ZhuanYe.Count())
                        {
                            //空的Sheet,跳过
                            continue;
                        }
                        else {
                            MessageBox.Show(" \"" + obj.ZhengShu + "\"名字需要修改成证书名后重试。", "请更正再试", System.Windows.Forms.MessageBoxButtons.OK, MessageBoxIcon.Error);
                            return ;
                        }
                    }
                    DAL.DTO.Tab_Excel_ZhengShu zhengShu= zhengShuList.FirstOrDefault(p=>p.ezs_Name==obj.ZhengShu.Trim());
                    obj.ZhuanYe.RemoveAll(p => p.Trim() == "" || p=="#");//去掉sheet下没有内容的记录
                    for (int j = 0; j < obj.ZhuanYe.Count; j++)
                    {
                        string[] tempStr = obj.ZhuanYe[j].Split(splitChar);
                        if (j == 0)
                        {
                            string name=tempStr[0].Trim();
                            if (name == String.Empty) { 
                                //第一个人必须要有名字
                                MessageBox.Show(" \"" + obj.ZhengShu + "\"下第一条记录没有人名，请完善后重试。", "请更正再试", System.Windows.Forms.MessageBoxButtons.OK, MessageBoxIcon.Error);
                                return;
                            }
                        }
                        else {
                            //解决合并单元格的赋值
                            if (tempStr.Count() == 2)
                            {
                                if (tempStr[0] == "" && tempStr[1]!="") {
                                    obj.ZhuanYe[j] = obj.ZhuanYe[j - 1].Split(splitChar)[0] + splitChar + tempStr[1];
                                }
                            }
                        }
                        //解决该有专业的没专业，没有专业的写了专业
                        if (zhengShu != null)
                        {
                            if (zhengShu.ezs_HaveZhuanYe && (tempStr.Length<2 || tempStr[1].Trim() == String.Empty))
                            {
                                MessageBox.Show(" \"" + zhengShu.ezs_Name + "\"下有部分人员没有填写专业，请完善或者去掉这些人后重试。", "请更正再试", System.Windows.Forms.MessageBoxButtons.OK, MessageBoxIcon.Error);
                                return;
                            }
                            if (zhengShu.ezs_HaveZhuanYe == false && tempStr.Count()>1)
                            {
                                MessageBox.Show(" \"" + zhengShu.ezs_Name + "\"是没有专业的，请去掉专业后重试。", "请更正再试", System.Windows.Forms.MessageBoxButtons.OK, MessageBoxIcon.Warning);
                                return;
                            }
                        }
                    }
                        lastDatas.Add(obj);
                }
                //#endregion
                //
                MessageBox.Show(" 成功","",System.Windows.Forms.MessageBoxButtons.OK,MessageBoxIcon.Information);

                string companyName = fd.SafeFileName.Split('.')[0];
                SaveToDB(companyName, lastDatas);
            }
        }

        private bool SaveToDB(string companyName,List<ZhuanYeClass> datas)
        {
            bool bo=false;
            //Company
            DAL.Base.ExcelCompany base_Company = new DAL.Base.ExcelCompany();
            DAL.DTO.Tab_Excel_Company company = base_Company.getByName(companyName.Trim());
            if (company != null)
            {
                //存在则先删除这个公司，再添加新数据
                int status = base_Company.Deletes(new int[] { company.ec_ID });
                if (status == 0)
                {
                    return false;
                }
            }
                DAL.DTO.Tab_Excel_Company company_new = new DAL.DTO.Tab_Excel_Company();
                company_new.ec_Name = companyName;
                company_new.ec_Date = DateTime.Now;
                company = base_Company.Save(company_new);//添加
                int companyId = company.ec_ID;
            foreach(ZhuanYeClass ins in datas){
                //证书
                string zhengShuName = ins.ZhengShu.Trim(); 
                DAL.Base.ExcelZhengShu base_ZhengShu = new DAL.Base.ExcelZhengShu();
                DAL.DTO.Tab_Excel_ZhengShu zhengShu = base_ZhengShu.getByName(zhengShuName);
                int zhengShuId = 0;
                bool haveZhuanYe = false;
                if (zhengShu == null)
                {
                    if (ins.ZhuanYe == null || ins.ZhuanYe.Count == 0) {
                        //空证书则跳过。
                        continue;
                    }
                    //证书不存在则添加
                    DAL.DTO.Tab_Excel_ZhengShu zhengShu_New = new DAL.DTO.Tab_Excel_ZhengShu();
                    zhengShu_New.ezs_Name = zhengShuName;
                    haveZhuanYe=zhengShu_New.ezs_HaveZhuanYe = ins.ZhuanYe[0].IndexOf(splitChar) == -1 ? false : true;//这里判断是否有专业
                    zhengShu_New = base_ZhengShu.Save(zhengShu_New);
                    if (zhengShu_New == null) return false;
                    zhengShuId = zhengShu_New.ezs_ID;
                }
                else {
                    zhengShuId = zhengShu.ezs_ID;
                    haveZhuanYe = zhengShu.ezs_HaveZhuanYe;
                }
                //专业
                DAL.Base.ExcelCompanyUserZhengShu base_ZhuanYe = new DAL.Base.ExcelCompanyUserZhengShu();
                List<DAL.DTO.Tab_Excel_Company_User_ZhuanYe> zhuanYeList=new List<DAL.DTO.Tab_Excel_Company_User_ZhuanYe>();
                foreach (string zhuanYes in ins.ZhuanYe) {
                    string[] tempStr= zhuanYes.Split(splitChar);
                    string xingMing = tempStr[0];
                    string zhuanYe="";
                    if (haveZhuanYe)
                    {
                        zhuanYe = tempStr[1];
                    }
                   
                    
                    DAL.DTO.Tab_Excel_Company_User_ZhuanYe zhuanYeObj=new DAL.DTO.Tab_Excel_Company_User_ZhuanYe();
                    zhuanYeObj.ecu_CompanyId = companyId;
                    zhuanYeObj.ecu_CreateDate = DateTime.Now;
                    zhuanYeObj.ecu_UserName = xingMing.Trim();
                    zhuanYeObj.ecu_ZhengShuId = zhengShuId;
                    zhuanYeObj.ecu_ZhuangYe = zhuanYe.Trim();
                    zhuanYeList.Add(zhuanYeObj);
                    
                }
                base_ZhuanYe.Saves(zhuanYeList);
            }
            

            return bo;
        }

        private void button2_Click(object sender, EventArgs e)
        {
            DAL.Base.ExcelZhengShu baseZhengShu = new DAL.Base.ExcelZhengShu();
            int num=baseZhengShu.delNoUseZhengShu();
            string msg = num == 0 ? " 删除0个证书。所有证书都有对应人员。" : " 共删除" + num + "个多余证书";
            MessageBox.Show(msg, "", System.Windows.Forms.MessageBoxButtons.OK, MessageBoxIcon.Information);
        }
    }
}
