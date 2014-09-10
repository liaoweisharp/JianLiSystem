<%@ page language="C#" autoeventwireup="true" inherits="Default2, App_Web_hkon342b" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>jQuery UI Tabs - Default functionality</title>
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
       <script src="../Scripts/jQuery/jquery-1.6.1.min.js" type="text/javascript"></script>
        <script src="../Scripts/jQuery/jquery.ajax.emath.js" type="text/javascript"></script>
        <script src="../Scripts/Comm/Array.js" type="text/javascript"></script>
        <script src="../Scripts/Comm/String.js" type="text/javascript"></script>
        <script src="../Scripts/Comm/Comm.js" type="text/javascript"></script>
   
    <script src="../Scripts/Comm/Date.js" type="text/javascript"></script>
    <script src="../Scripts/Comm/Bind.js" type="text/javascript"></script>
    <script src="../Scripts/Comm/BindDiv.js" type="text/javascript"></script>
        <script src="../Scripts/Page/MasterPage.js" type="text/javascript"></script>  
    <link href="../Style/Base/base.css" rel="stylesheet" type="text/css" />
    <link href="../Style/Base/baseHeTong.css" rel="stylesheet" type="text/css" />
    <link href="../Scripts/JQuery/plugins/jBox/Skins/Default/jbox.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/JQuery/plugins/jBox/jquery.jBox-2.3.min.js?ver=Acepherics120317" type="text/javascript"></script>
   
    <script src="../Scripts/JQuery/plugins/jBox/i18n/jquery.jBox-zh-CN.js?ver=Acepherics120317" type="text/javascript"></script>

     <link href="../Scripts/jQuery/plugins/jquery-ui-1.10.3.custom/css/ui-lightness/jquery-ui-1.10.3.custom.min.css"
        rel="stylesheet" type="text/css" />
    <script src="../Scripts/jQuery/plugins/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"
        type="text/javascript"></script>
    <script src="../Scripts/jQuery/plugins/jquery.pagination.js" type="text/javascript"></script>
    <link href="../Style/JQuery/pagination.css" rel="stylesheet" type="text/css" />


    <script src="../Scripts/jQuery/plugins/jquery-ui-1.10.3.custom/js/jquery-ui.js" type="text/javascript"></script>
    <link href="../Scripts/jQuery/plugins/jquery-ui-1.10.3.custom/css/ui-lightness/jquery-ui-1.10.3.custom.css"
        rel="stylesheet" type="text/css" />
    <script src="../Scripts/jQuery/plugins/jquery-ui/ui/jquery.ui.core.js" type="text/javascript"></script>
    <script src="../Scripts/Comm/TextSelect.js" type="text/javascript"></script>
    <link href="../Style/Base/base.css" rel="stylesheet" type="text/css" />
    <script src="Scripts/Page/Default.js" type="text/javascript"></script>
     <script src="../Scripts/jQuery/plugins/jquery.watermark.js" type="text/javascript"></script>
    <script src="../Scripts/jQuery/plugins/jquery.jUploader-1.01.min.js" type="text/javascript"></script>
    <script src="../Scripts/jQuery/plugins/zTree_v3.5.14/js/jquery.ztree.core-3.5.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="../Scripts/jQuery/plugins/zTree_v3.5.14/css/zTreeStyle/zTreeStyle.css" />
    <script type="text/javascript">
        
        </script>
</head>
<body>
    <div id="tabs">
        <ul>
            <li><a href="#tabs-1">Nunc tincidunt</a></li>
            <li><a href="#tabs-2">Proin dolor</a></li>
            <li><a href="#tabs-3">Aenean lacinia</a></li>
        </ul>
        <div id="tabs-1">
            <p>
                Proin elit arcu, rutrum commodo, vehicula tempus, commodo a, risus. Curabitur nec
                arcu. Donec sollicitudin mi sit amet mauris. Nam elementum quam ullamcorper ante.
                Etiam aliquet massa et lorem. Mauris dapibus lacus auctor risus. Aenean tempor ullamcorper
                leo. Vivamus sed magna quis ligula eleifend adipiscing. Duis orci. Aliquam sodales
                tortor vitae ipsum. Aliquam nulla. Duis aliquam molestie erat. Ut et mauris vel
                pede varius sollicitudin. Sed ut dolor nec orci tincidunt interdum. Phasellus ipsum.
                Nunc tristique tempus lectus.</p>
        </div>
        <div id="tabs-2">
            <p>
                Morbi tincidunt, dui sit amet facilisis feugiat, odio metus gravida ante, ut pharetra
                massa metus id nunc. Duis scelerisque molestie turpis. Sed fringilla, massa eget
                luctus malesuada, metus eros molestie lectus, ut tempus eros massa ut dolor. Aenean
                aliquet fringilla sem. Suspendisse sed ligula in ligula suscipit aliquam. Praesent
                in eros vestibulum mi adipiscing adipiscing. Morbi facilisis. Curabitur ornare consequat
                nunc. Aenean vel metus. Ut posuere viverra nulla. Aliquam erat volutpat. Pellentesque
                convallis. Maecenas feugiat, tellus pellentesque pretium posuere, felis lorem euismod
                felis, eu ornare leo nisi vel felis. Mauris consectetur tortor et purus.</p>
        </div>
        <div id="tabs-3">
            <p>
                Mauris eleifend est et turpis. Duis id erat. Suspendisse potenti. Aliquam vulputate,
                pede vel vehicula accumsan, mi neque rutrum erat, eu congue orci lorem eget lorem.
                Vestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Fusce sodales. Quisque eu urna vel enim commodo
                pellentesque. Praesent eu risus hendrerit ligula tempus pretium. Curabitur lorem
                enim, pretium nec, feugiat nec, luctus a, lacus.</p>
            <p>
                Duis cursus. Maecenas ligula eros, blandit nec, pharetra at, semper at, magna. Nullam
                ac lacus. Nulla facilisi. Praesent viverra justo vitae neque. Praesent blandit adipiscing
                velit. Suspendisse potenti. Donec mattis, pede vel pharetra blandit, magna ligula
                faucibus eros, id euismod lacus dolor eget odio. Nam scelerisque. Donec non libero
                sed nulla mattis commodo. Ut sagittis. Donec nisi lectus, feugiat porttitor, tempor
                ac, tempor vitae, pede. Aenean vehicula velit eu tellus interdum rutrum. Maecenas
                commodo. Pellentesque nec elit. Fusce in lacus. Vivamus a libero vitae lectus hendrerit
                hendrerit.</p>
        </div>
    </div>
    <label id="dd">0.123456</label>
</body>
</html>
