(function () {
    function USER() { }
    function successCallBack(result, context) {
        if (context.userContent == "addUser") {
            var user = result;
            if (user) {
                $.jBox.tip('完成。', 'success');
                pageselectCallback(UU.pd.currentPageNumber, null);
            }
            else {
                $.jBox.tip('添加失败。', 'error');
            }
        }
        else if (context.userContent == "getUserByUserId") {

            var obj = result;
            var id1 = context.id;
            var type = context.type;
            var jsonsArray = createJson();
            conventToDateTime(obj, jsonsArray);

            if (type == "update") {
                new bindDiv(jsonsArray, obj, id1, { type: "update", align: "y" }, _clickUpdate_User);
                var arr = jsonsArray.findAll("type", "upload");
                if (arr.length > 0) {
                    $.jUploader.setDefaults({
                        cancelable: true, // 可取消上传
                        allowedExtensions: ['jpg', 'png', 'gif'], // 只允许上传图片
                        messages: {
                            upload: '上传',
                            cancel: '取消',
                            emptyFile: "{file} 为空，请选择一个文件.",
                            invalidExtension: "{file} 后缀名不合法. 只有 {extensions} 是允许的.",
                            onLeave: "文件正在上传，如果你现在离开，上传将会被取消。"
                        }
                    });
                    var btId = arr[0].options.btId;
                    var photoId = arr[0].options.photoId;
                    var callback = arr[0].options.callback;
                    var pars = "?type=" + arr[0].options.type;
                    pars += "&id=" + obj.jl_Id;
    $.jUploader({

        button: btId, // 这里设置按钮id
        action: '../upload.aspx' + pars, // 这里设置上传处理接口

        // 开始上传事件
        onUpload: function (fileName) {
            $.jBox.tip('正在上传 ' + fileName + ' ...', 'loading');
        },

        // 上传完成事件
        onComplete: function (fileName, response) {
            // response是json对象，格式可以按自己的意愿来定义，例子为： { success: true, fileUrl:'' }
            
            callback(arr[0], fileName, response);

        },

        // 系统信息显示（例如后缀名不合法）
        showMessage: function (message) {
            $.jBox.tip(message, 'error');
        },

        // 取消上传事件
        onCancel: function (fileName) {
            $.jBox.tip(fileName + ' 上传取消。', 'info');
        }
    });

                }
            }
            else if (type == "review") {
                new bindDiv(jsonsArray, obj, id1, { type: "review", align: "y" }, null);
            }
        }
        else if (context.userContent == "updateUser") {
            if (result) {
                $.jBox.tip('更新成功', 'success');
                pageselectCallback(UU.pd.currentPageNumber, null);
                //*更新User主界面列表
            }
            else {

                $.jBox.tip('更新失败', 'error');
            }
        }
        else if (context.userContent == "delUser") {
            if (result) {
                $.jBox.tip('删除成功。', 'success');
                pageselectCallback(UU.pd.currentPageNumber, null);
            }
            else {
                $.jBox.tip('删除失败。', 'success');
            }
        }
    }
    function errorCallBack(result, context) { }
    //#region 句柄
    USER.click_AddUser = function () {
        var id = String.randomString(6);
        var id1 = String.randomString(6);
        var id2 = String.randomString(6);
        var html = getTabsHtml(id, id1, id2);

        $.jBox(html, { title: "添加人员", showClose: false, buttons: { "取消": "0" }, width: 900, top: '3%', submit: USER._clickCancelAdd });
        $("#" + id1).html(loading);
        $("#" + id2).html(loading);
        $("#" + id).tabs();
        var jsonOfHeTong = createJson();
        new bindDiv(jsonOfHeTong, null, id1, { type: "new",align:"y" }, USER._clickAdd);
        var arr = jsonOfHeTong.findAll("type", "upload");
        if (arr.length > 0) {
            $.jUploader.setDefaults({
                cancelable: true, // 可取消上传
                allowedExtensions: ['jpg', 'png', 'gif'], // 只允许上传图片
                messages: {
                    upload: '上传',
                    cancel: '取消',
                    emptyFile: "{file} 为空，请选择一个文件.",
                    invalidExtension: "{file} 后缀名不合法. 只有 {extensions} 是允许的.",
                    onLeave: "文件正在上传，如果你现在离开，上传将会被取消。"
                }
            });
            var btId = arr[0].options.btId;
            var photoId = arr[0].options.photoId;
            var callback = arr[0].options.callback;
            var pars = "?type=" + arr[0].options.type;
           
            
    $.jUploader({

        button: btId, // 这里设置按钮id
        action: '../upload.aspx' + pars, // 这里设置上传处理接口

        // 开始上传事件
        onUpload: function (fileName) {
            $.jBox.tip('正在上传 ' + fileName + ' ...', 'loading');
        },

        // 上传完成事件
        onComplete: function (fileName, response) {
            // response是json对象，格式可以按自己的意愿来定义，例子为： { success: true, fileUrl:'' }
            
            callback(arr[0], fileName, response);

        },

        // 系统信息显示（例如后缀名不合法）
        showMessage: function (message) {
            $.jBox.tip(message, 'error');
        },

        // 取消上传事件
        onCancel: function (fileName) {
            $.jBox.tip(fileName + ' 上传取消。', 'info');
        }
    });

        }
    }
    USER.click_EditUser = function (userId, Name) {
        var id = String.randomString(6);
        var id1 = String.randomString(6);
        var id2 = String.randomString(6);
        var id3 = String.randomString(6);
        var id4 = String.randomString(6);
        var id5 = String.randomString(6);
        var id6 = String.randomString(6);

        var html = getTabsHtml2(userId, id, id1, id2, id3, id4, id5,id6, "update");
        $.jBox(html, { title: Name, buttons: {}, width: 900, top: '3%' });
        $("#" + id1).html(loading);

        $("#" + id).tabs();
        $invokeWebService_2("~WebService_RenLi.getUserByUserId", { userId: userId }, null, successCallBack, errorCallBack, null, { userContent: "getUserByUserId", id: id1, type: "update" });
        new XXJL(userId, "update");
        new GZJL(userId, "update");
        new GCJL(userId, "update");
        new XL(userId, "update"); //学历
        new ZC(userId, "update"); //职称
        new ZYZG(userId,"update");//职业资格
        new XC(userId, "update"); //薪酬
        new KK(userId, "update")
        new DD(userId, "update"); //调动
        new PX(userId, "update"); //培训
        new JC(userId, "update"); //奖惩
    }
    USER.click_DelUser = function (userId, Name) {
        $.jBox.confirm(String.format("<input type='hidden' value='{0}'>删除后此用户的所有信息将会被删除,你确定要删除此用户吗？", userId), "确定删除吗？", _clickDel, { buttons: { "删除": "1", "取消": "0"} })
    }
    function _clickDel(v, h, f) {
        if (v == "1") {

            var id = h.find("input[type='hidden']").attr("value");
            $invokeWebService_2("~WebService_RenLi.delUser", { id: id }, null, successCallBack, errorCallBack, null, { userContent: "delUser" });
        }
        return true;
    }
    USER.click_DetailUser = function (userId, Name) {
        var id = String.randomString(6);
        var id1 = String.randomString(6);
        var id2 = String.randomString(6);
        var id3 = String.randomString(6);
        var id4 = String.randomString(6);
        var id5 = String.randomString(6);
        var id6 = String.randomString(6);
        var html = getTabsHtml2(userId, id, id1, id2, id3, id4, id5,id6, "review");
        $.jBox(html, { title: Name, buttons: { "关闭": "0" }, width: 900, top: '3%' });
        $("#" + id1).html(loading);

        $("#" + id).tabs();

        $invokeWebService_2("~WebService_RenLi.getUserByUserId", { userId: userId }, null, successCallBack, errorCallBack, null, { userContent: "getUserByUserId", id: id1, type: "review" });
        new XXJL(userId, "review");
        new GZJL(userId, "review");
        new GCJL(userId, "review");
        new XL(userId, "review"); //学历
        new ZC(userId, "review"); //职称
        new ZYZG(userId,"review");//职业资格
        new XC(userId, "review"); //薪酬
        new KK(userId, "review")
        new DD(userId, "review"); //调动
        new PX(userId, "review"); //培训
        new JC(userId, "review"); //奖惩

    }
    USER._clickCancelAdd = function (v, h, f) {

    }
    USER._clickAdd = function (event) {
        var bindObj = event.data.newBind;
        
        var jsonArray = bindObj.ShouJiData();
        var _newObj = bind.jsonToObject(jsonArray);
        $invokeWebService_2("~WebService_RenLi.addUser", { obj: _newObj }, function () {
            //        $.jBox.tip("传送数据，请稍后...", 'loading');
        }, successCallBack, errorCallBack, null, { userContent: "addUser" });
    }
    function _clickUpdate_User(event) {
        
        var jsonArray = event.data.newBind.ShouJiData();
        var obj = bind.jsonToObject(jsonArray);

        obj["jl_Id"] = event.data.obj.jl_Id;
        $invokeWebService_2("~WebService_RenLi.updateUser", { obj: obj }, null, successCallBack, errorCallBack, null, { userContent: "updateUser" });
    }
    function uploadPhoto(json, fileName, response) {

        if (response.success) {
            jBox.tip('上传成功', 'success');
            var photoId = json.options.photoId;
            $("#" + photoId).attr('src', response.fileUrl);
            $("input[itemId='" + json.itemId + "']").val(response.fileUrl);
        } else {
            jBox.tip('上传失败', 'error');
        }
    }
    //#endregion

    //#region HTML
    function getTabsHtml(id, id1, id2) {
        var str = [];
        str.push(String.format("<div id='{0}' class='tabsP'>", id));
        str.push("<ul>");
        str.push(String.format("<li><a href='#{0}'>基本信息</a></li>", id1));
        //        str.push(String.format("<li><a href='#{0}'>工作、工程经历</a></li>", id2));
        str.push("</ul>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'></div>", id1));
        //        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'></div>", id2));
        str.push("</div>");
        return str.join("");
    }
    function getTabsHtml2(userId, id, id1, id2, id3, id4, id5,id6, type) {
        var str = [];
        str.push(String.format("<div id='{0}' class='tabsP'>", id));
        str.push("<ul>");
        str.push(String.format("<li><a href='#{0}'>基本信息</a></li>", id1));
        str.push(String.format("<li><a href='#{0}'>工作、工程经历</a></li>", id2));
        str.push(String.format("<li><a href='#{0}'>职称、执业资格</a></li>", id3));
        //str.push(String.format("<li><a href='#{0}'>薪酬</a></li>", id4));
        //str.push(String.format("<li><a href='#{0}'>岗位调整</a></li>", id6));
        //str.push(String.format("<li><a href='#{0}'>培训、奖惩</a></li>", id5));
        str.push("</ul>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id1));
        str.push("</div>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id2));
        str.push(_getContent(userId, "xueXiJingLi", type));
        str.push(_getContent(userId, "gongZuoJingLi", type));
        str.push(_getContent(userId, "gongChengJingLi", type));
        str.push("</div>");
        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id3));
        str.push(_getContent(userId, "xueLiZheng", type));
        str.push(_getContent(userId, "zhiChengZheng", type));
        str.push(_getContent(userId, "zhiYeZiGeZheng",type));
        str.push("</div>");
//        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id4));
//        str.push(_getContent(userId, "xinChou", type));
//        str.push(_getContent(userId, "xinChouKouKuan", type));
//        str.push("</div>");
//        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id6));
//        str.push(_getContent(userId, "diaoDong", type));
//        str.push("</div>");
//        str.push(String.format("<div class='tabsContent' style='background-color:White;' id='{0}'>", id5));
//        str.push(_getContent(userId, "peiXun", type));
//        str.push(_getContent(userId, "jiangCheng", type));
//        str.push("</div>");
        str.push("</div>");
        return str.join("");
    }
    function _getContent(userId, content, type) {

        var str = [];
        str.push("<div class='ZX_BG_header ZX_h'>");
        str.push("<ul class='ulnone'>");
        if (content == "xueXiJingLi") {
            str.push("<li class='ZX_title'>学习经历</li>");
            if (type == "update") {
                str.push(String.format("<li class='bg_A' style='float:right;'><a href='javascript:void(0);' onclick=\"XXJL.Add('{0}')\" >添加</a></li>", userId));
            }
        }
        else if (content == "gongZuoJingLi") {
            str.push("<li class='ZX_title'>工作经历</li>");
            if (type == "update") {
                str.push(String.format("<li class='bg_A' style='float:right;'><a href='javascript:void(0);' onclick=\"GZJL.Add('{0}')\" >添加</a></li>", userId));
            }
        }
        else if (content == "gongChengJingLi") {
            str.push("<li class='ZX_title'>工程经历</li>");
            if (type == "update") {
                str.push(String.format("<li class='bg_A' style='float:right;'><a href='javascript:void(0);' onclick=\"GCJL.Add('{0}')\" >添加</a></li>", userId));
            }
        }
        else if (content == "xueLiZheng") {
            str.push("<li class='ZX_title'>学历证</li>");
            if (type == "update") {
                str.push(String.format("<li class='bg_A' style='float:right;'><a href='javascript:void(0);' onclick=\"XL.Add('{0}')\" >添加</a></li>", userId));
            }
        }
        else if (content == "zhiChengZheng") {
            str.push("<li class='ZX_title'>职称证</li>");
            if (type == "update") {
                str.push(String.format("<li class='bg_A' style='float:right;'><a href='javascript:void(0);' onclick=\"ZC.Add('{0}')\" >添加</a></li>", userId));
            }
        }
        else if (content == "zhiYeZiGeZheng") {
            str.push("<li class='ZX_title'>执业资格证</li>");
            if (type == "update") {
                str.push(String.format("<li class='bg_A' style='float:right;'><a href='javascript:void(0);' onclick=\"ZYZG.Add('{0}')\" >添加</a></li>", userId));
            }
        }
        else if (content == "xinChou") {
            str.push("<li class='ZX_title'>薪酬调整</li>");
            if (type == "update") {
                str.push(String.format("<li class='bg_A' style='float:right;'><a href='javascript:void(0);' onclick=\"XC.Add('{0}')\" >添加</a></li>", userId));
            }
        }

        else if (content == "xinChouKouKuan") {
            str.push("<li class='ZX_title'>零时变动（扣款、奖励）</li>");
            if (type == "update") {
                str.push(String.format("<li class='bg_A' style='float:right;'><a href='javascript:void(0);' onclick=\"KK.Add('{0}')\" >添加</a></li>", userId));
            }
        }
       
        else if (content == "diaoDong") {
            str.push("<li class='ZX_title'>岗位调动</li>");
            if (type == "update") {
                str.push(String.format("<li class='bg_A' style='float:right;'><a href='javascript:void(0);' onclick=\"DD.Add('{0}')\" >添加</a></li>", userId));
            }
        }
        else if (content == "peiXun") {
            str.push("<li class='ZX_title'>培训</li>");
            if (type == "update") {
                str.push(String.format("<li class='bg_A' style='float:right;'><a href='javascript:void(0);' onclick=\"PX.Add('{0}')\" >添加</a></li>", userId));
            }
        }
        else if (content == "jiangCheng") {
            str.push("<li class='ZX_title'>奖惩</li>");
            if (type == "update") {
                str.push(String.format("<li class='bg_A' style='float:right;'><a href='javascript:void(0);' onclick=\"JC.Add('{0}')\" >添加</a></li>", userId));
            }
        }
        str.push("</ul>");
        str.push("<br/>");
        str.push("</div>");
        if (content == "xueXiJingLi") {
            str.push(String.format("<div id='{0}' class='ZX_con h130'>{1}", XXJL.Prefix + userId, loading));
        }
        else if (content == "gongZuoJingLi") {
            str.push(String.format("<div id='{0}' class='ZX_con h130'>{1}", GZJL.Prefix + userId, loading));
        }
        else if (content == "gongChengJingLi") {
            str.push(String.format("<div id='{0}' class='ZX_con h130'>{1}", GCJL.Prefix + userId, loading));
        }
        else if (content == "xueLiZheng") {
            str.push(String.format("<div id='{0}' class='ZX_con h130'>{1}", XL.Prefix + userId, loading));
        }
        else if (content == "zhiChengZheng") {
            str.push(String.format("<div id='{0}' class='ZX_con h130'>{1}", ZC.Prefix + userId, loading));
        }
        else if (content == "zhiYeZiGeZheng") {
            str.push(String.format("<div id='{0}' class='ZX_con h130'>{1}", ZYZG.Prefix + userId, loading));
        }
        else if (content == "xinChou") {
            str.push(String.format("<div id='{0}' class='ZX_con h250'>{1}", XC.Prefix + userId, loading));
        }
        else if (content == "xinChouKouKuan") {
            str.push(String.format("<div id='{0}' class='ZX_con h250'>{1}", KK.Prefix + userId, loading));
        }
        else if (content == "diaoDong") {
            str.push(String.format("<div id='{0}' class='ZX_con h480'>{1}", DD.Prefix + userId, loading));
        }
        else if (content == "peiXun") {
            str.push(String.format("<div id='{0}' class='ZX_con h250'>{1}", PX.Prefix + userId, loading));
        }
        else if (content == "jiangCheng") {
            str.push(String.format("<div id='{0}' class='ZX_con h250'>{1}", JC.Prefix + userId, loading));
        }
        str.push("</div>");
        return str.join("");
    }
    //#endregion
    createJson = function () {
        var str = [];
        str.push({ itemId: "jl_Name", type: "text", title: "姓名" });
        
        
        str.push({ itemId: "jl_XingBie", type: "select", title: "性别", yesOrNo: true, init: [{ id: "1", title: "男" }, { id: "0", title: "女"}] });
        str.push({ itemId: "jl_ChuShengRiQi", type: "text", title: "出生日期", validate: "datetime" });
        str.push({ itemId: "ji_JiGuan", type: "text", title: "籍贯" });
        str.push({ itemId: "jl_HunYinZhuangKuang", type: "select", title: "婚姻状况", init: getInit(baseData["婚姻"], "hy_") });
        str.push({ itemId: "jl_MingZu", type: "select", title: "民族", init: getInit(baseData["民族"], "mz_") });
        str.push({ itemId: "jl_ZhengZhiMianMao", type: "select", title: "政治面貌", init: getInit(baseData["政治面貌"], "zzmm_") });
        str.push({ itemId: "jl_CanJIanGongZuoShiJian", type: "text", title: "参加工作时间", validate: "datetime" });
        str.push({ itemId: "jl_YuanDanWeiLiZhiShiJian", type: "text", title: "原单位离职时间", validate: "datetime" });
        str.push({ itemId: "jl_ShenFenZhengHao", type: "text", title: "身份证号" });
        str.push({ itemId: "jl_ShenFenZhengZhuZhi", type: "text", title: "身份证住址" }); 
        str.push({ itemId: "jl_ZongJianZiGeZhengShu", type: "select", title: "监理执业资格证书", yesOrNo: true, init: [{ id: "1", title: "有" }, { id: "0", title: "无"}] });
        str.push({ itemId: "jl_JianKangZhuangKuang", type: "text", title: "健康状况" });
        str.push({ itemId: "jl_HuJiDiZhi", type: "text", title: "户籍地址" });
        str.push({ itemId: "jl_HuJiXingZhi", type: "select", title: "户籍性质", init: getInit(baseData["户籍性质"], "hjxz_") });
        str.push({ itemId: "jl_LianXiFangShi_1", type: "text", title: "联系方式(手机)" });
        str.push({ itemId: "jl_LianXiFangShi_2", type: "text", title: "其他联系方式" });
        str.push({ itemId: "jl_LianXiFangShi_3", type: "text", title: "联系方式(QQ、邮箱...)" });
        str.push({ itemId: "jl_XianZhuZhi", type: "text", title: "本人现详细住址" });
        //str.push({ itemId: "jl_XianYouBian", type: "text", title: "邮编" });
        //str.push({ itemId: "jl_JuZhuZhengHao", type: "text", title: "暂(居)住证号" });
        //str.push({ itemId: "jl_JuZhuZhengRiQi", type: "text", title: "暂(居)住证有效日期", validate: "datetime" });
        str.push({ itemId: "jl_SheHuiGuanXi", type: "ntext", title: "社会关系" });
        str.push({ itemId: "jl_CanBaoZhuangKuang", type: "select", title: "社保关系", init: getInit(baseData["社保关系"], "cbzk_") });
//        str.push({ itemId: "jl_ZhaoPian", type: "upload", title: "照片", isOtherCol: true, options: { callback: uploadPhoto, btId: String.randomString(6), photoId: String.randomString(6), type: "userPhotos"} });
//        str.push({ itemId: "jl_YuanGongBianHao", type: "text", title: "员工编号" });
//        str.push({ itemId: "jl_RuZhiShiJian", type: "text", title: "入职时间", validate: "datetime" });
//        str.push({ itemId: "jl_RuZhiTuJing", type: "select", title: "入职途径", init: getInit(baseData["入职途径"], "rztj_") });
//        str.push({ itemId: "jl_SuShuBuMen", type: "select", title: "所属部门", init: getInit(baseData["部门"], "bm_") });
//        str.push({ itemId: "jl_RuZhiShouXuBanLi", type: "select", title: "入职手续办理", yesOrNo: true, init: [{ id: '1', title: "已办理" }, { id: '0', title: "未办理"}] });
//        str.push({ itemId: "jl_ShiYongKaiShiShiJian", type: "text", title: "试用时间段", validate: "datetime" });
//                str.push({ itemId: "jl_ShiYongJieShuShiJian", type: "text", title: "试用结束时间", validate: "datetime", parentId: "jl_ShiYongKaiShiShiJian" });
//        //str.push({ itemId: "jl_ShiYongJieShuShiJian", type: "text", title: "试用结束时间", validate: "datetime"});
//        str.push({ itemId: "jl_ShiFouCanBao", type: "select", title: "参保状况", yesOrNo: true, init: [{ id: "1", title: "已参保" }, { id: "0", title: "未参保"}] });
//       // str.push({ itemId: "jl_YingCanBaoShiJian", type: "text", title: "应参保时间", validate: "datetime" });
//        str.push({ itemId: "jl_ShangYeBaoXian", type: "select", title: "商业保险", yesOrNo: true, init: [{ id: "1", title: "已购买" }, { id: "0", title: "未购买"}] });
//        //str.push({ itemId: "jl_ShangBaoJieZhiShiJian", type: "text", title: "商保截止时间", validate: "datetime" });
//        //str.push({ itemId: "jl_LaoDongHeTongQianDing", type: "select", title: "劳动合同签订", yesOrNo: true, init: [{ id: "1", title: "是" }, { id: "0", title: "否"}] });
//        str.push({ itemId: "jl_LaoDongHeTongKaiShiShiJian", type: "text", title: "劳动合同有效时间段", validate: "datetime" });
//        //        str.push({ itemId: "jl_LaoDongHeTongJieShuShiJian", type: "text", title: "劳动合同结束时间", validate: "datetime", parentId: "jl_LaoDongHeTongKaiShiShiJian" });
//        str.push({ itemId: "jl_LaoDongHeTongJieShuShiJian", type: "text", title: "劳动合同结束时间", validate: "datetime" });
//        str.push({ itemId: "jl_FanPingXieYiQianDing", type: "select", title: "返聘协议签订", yesOrNo: true, init: [{ id: "1", title: "已签订" }, { id: "0", title: "未签订"}] });
//       // str.push({ itemId: "jl_FanPingQianDingShiJian", type: "text", title: "返聘签订时间", validate: "datetime" });
//        str.push({ itemId: "jl_LiuCunZhengJian", type: "text", title: "留存证件" });
//        str.push({ itemId: "jl_GongZuoZhuangTai", type: "select", title: "工作状态", init: getInit(baseData["工作状态"], "zt_") });
        return str;
    }
    //#region 其他
    //#endregion
    window.USER = USER;

})();