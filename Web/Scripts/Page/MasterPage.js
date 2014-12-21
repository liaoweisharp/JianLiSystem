$(function () {

    $.fn.numeral = function () {

        $(this).css("ime-mode", "disabled");
        this.bind("keypress", function (e) {
         
            var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE   
            if (!$.browser.msie && (e.keyCode == 0x8))  //火狐下 不能使用退格键  
            {
                return;
            }
            return code >= 48 && code <= 57 || code == 46;
        });
        this.bind("blur", function () {
           
            //                if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
            //                    this.value = this.value.substr(0, this.value.length - 1);
            //                } else if (isNaN(this.value)) {
            //                    this.value = " ";
            //     
            //下面是我写的，上面是原来的
            if (isNaN(this.value)) {
                if (this.value != "-") {
                    this.value = " ";
                }
            }

        });
        this.bind("paste", function () {
          
            var s = clipboardData.getData('text');
            if (!/\D/.test(s));
            value = s.replace(/^0*/, '');
            return false;
        });
        this.bind("dragenter", function () {
          
            return false;
        });
        this.bind("keyup", function () {
            var t = obj.value.charAt(0);    
            this.value = this.value.replace(/[^\d.]/g, "");
            //必须保证第一个为数字而不是.
            this.value = this.value.replace(/^\./g, "");
            //保证只有出现一个.而没有多个.
            this.value = this.value.replace(/\.{2,}/g, ".");
            //保证.只出现一次，而不能出现两次以上
            this.value = this.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            //如果第一位是负号，则允许添加 
            if (t == '-') {
                obj.value = '-' + obj.value;
            }  
        });
    };

    //#region 格式化金额
    jQuery.formatCurrency = {};

    jQuery.formatCurrency.regions = [];

    // default Region is en
    jQuery.formatCurrency.regions[''] = {
        symbol: '',
        positiveFormat: '%s%n',
        negativeFormat: ' -%s%n',
        decimalSymbol: '.',
        digitGroupSymbol: ',',
        groupDigits: true
    };

    jQuery.fn.formatCurrency = function (destination, settings) {

        if (arguments.length == 1 && typeof destination !== "string") {
            settings = destination;
            destination = false;
        }

        // initialize defaults
        var defaults = {
            name: "formatCurrency",
            colorize: true,
            region: '',
            global: true,
            roundToDecimalPlace: 6, // roundToDecimalPlace: -1; for no rounding; 0 to round to the dollar; 1 for one digit cents; 2 for two digit cents; 3 for three digit cents; ...
            eventOnDecimalsEntered: false
        };
        // initialize default region
        defaults = $.extend(defaults, $.formatCurrency.regions['']);
        // override defaults with settings passed in
        settings = $.extend(defaults, settings);

        // check for region setting
        if (settings.region.length > 0) {
            settings = $.extend(settings, getRegionOrCulture(settings.region));
        }
        settings.regex = generateRegex(settings);

        return this.each(function () {

            $this = $(this);

            // get number
            var num = '0';
            num = $this[$this.is('input, select, textarea') ? 'val' : 'html']();
            if (num == "null") {
                $this[$this.is('input, select, textarea') ? 'val' : 'html']("");
                return;
            }
            //identify '(123)' as a negative number
            if (num.search('\\(') >= 0) {
                num = '-' + num;
            }

            if (num === '' || (num === '-' && settings.roundToDecimalPlace === -1)) {
                return;
            }

            // if the number is valid use it, otherwise clean it
            if (isNaN(num)) {
                // clean number
                num = num.replace(settings.regex, '');

                if (num === '' || (num === '-' && settings.roundToDecimalPlace === -1)) {
                    return;
                }

                if (settings.decimalSymbol != '.') {
                    num = num.replace(settings.decimalSymbol, '.');  // reset to US decimal for arithmetic
                }
                if (isNaN(num)) {
                    num = '0';
                }
            }

            // evalutate number input
            var numParts = String(num).split('.');
            var isPositive = (num == Math.abs(num));
            var hasDecimals = (numParts.length > 1);
            var decimals = (hasDecimals ? numParts[1].toString() : '0');
            var originalDecimals = decimals;

            // format number
            num = Math.abs(numParts[0]);
            num = isNaN(num) ? 0 : num;
            if (settings.roundToDecimalPlace >= 0) {
                decimals = parseFloat('1.' + decimals); // prepend "0."; (IE does NOT round 0.50.toFixed(0) up, but (1+0.50).toFixed(0)-1
                decimals = decimals.toFixed(settings.roundToDecimalPlace); // round
                if (decimals.substring(0, 1) == '2') {
                    num = Number(num) + 1;
                }
                decimals = decimals.substring(2); // remove "0."
            }
            num = String(num);

            if (settings.groupDigits) {
                for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
                    num = num.substring(0, num.length - (4 * i + 3)) + settings.digitGroupSymbol + num.substring(num.length - (4 * i + 3));
                }
            }

            if ((hasDecimals && settings.roundToDecimalPlace == -1) || settings.roundToDecimalPlace > 0) {
                num += settings.decimalSymbol + decimals;
            }

            // format symbol/negative
            var format = isPositive ? settings.positiveFormat : settings.negativeFormat;
            var money = format.replace(/%s/g, settings.symbol);
            money = money.replace(/%n/g, num);

            // setup destination
            var $destination = $([]);
            if (!destination) {
                $destination = $this;
            } else {
                $destination = $(destination);
            }
            // set destination

            $destination[$destination.is('input, select, textarea') ? 'val' : 'html']("￥&nbsp;" + money);


            if (
                hasDecimals &&
                settings.eventOnDecimalsEntered &&
                originalDecimals.length > settings.roundToDecimalPlace
            ) {
                $destination.trigger('decimalsEntered', originalDecimals);
            }

            // colorize
            if (settings.colorize) {
                $destination.css('color', isPositive ? 'green' : 'red');
            }
        });
    };

    // Remove all non numbers from text
    jQuery.fn.toNumber = function (settings) {
        var defaults = $.extend({
            name: "toNumber",
            region: '',
            global: true
        }, $.formatCurrency.regions['']);

        settings = jQuery.extend(defaults, settings);
        if (settings.region.length > 0) {
            settings = $.extend(settings, getRegionOrCulture(settings.region));
        }
        settings.regex = generateRegex(settings);

        return this.each(function () {
            var method = $(this).is('input, select, textarea') ? 'val' : 'html';
            $(this)[method]($(this)[method]().replace('(', '(-').replace(settings.regex, ''));
        });
    };

    // returns the value from the first element as a number
    jQuery.fn.asNumber = function (settings) {
        var defaults = $.extend({
            name: "asNumber",
            region: '',
            parse: true,
            parseType: 'Float',
            global: true
        }, $.formatCurrency.regions['']);
        settings = jQuery.extend(defaults, settings);
        if (settings.region.length > 0) {
            settings = $.extend(settings, getRegionOrCulture(settings.region));
        }
        settings.regex = generateRegex(settings);
        settings.parseType = validateParseType(settings.parseType);

        var method = $(this).is('input, select, textarea') ? 'val' : 'html';
        var num = $(this)[method]();
        num = num ? num : "";
        num = num.replace('(', '(-');
        num = num.replace(settings.regex, '');
        if (!settings.parse) {
            return num;
        }

        if (num.length == 0) {
            num = '0';
        }

        if (settings.decimalSymbol != '.') {
            num = num.replace(settings.decimalSymbol, '.');  // reset to US decimal for arthmetic
        }

        return window['parse' + settings.parseType](num);
    };

    function getRegionOrCulture(region) {
        var regionInfo = $.formatCurrency.regions[region];
        if (regionInfo) {
            return regionInfo;
        }
        else {
            if (/(\w+)-(\w+)/g.test(region)) {
                var culture = region.replace(/(\w+)-(\w+)/g, "$1");
                return $.formatCurrency.regions[culture];
            }
        }
        // fallback to extend(null) (i.e. nothing)
        return null;
    }

    function validateParseType(parseType) {
        switch (parseType.toLowerCase()) {
            case 'int':
                return 'Int';
            case 'float':
                return 'Float';
            default:
                throw 'invalid parseType';
        }
    }

    function generateRegex(settings) {
        if (settings.symbol === '') {
            return new RegExp("[^\\d" + settings.decimalSymbol + "-]", "g");
        }
        else {
            var symbol = settings.symbol.replace('$', '\\$').replace('.', '\\.');
            return new RegExp(symbol + "|[^\\d" + settings.decimalSymbol + "-]", "g");
        }
    }
    //#endregion  


})
var loading = "<div class='loading'><center><img src='../Images/ajax-loader_b.gif'></center></div>";
function getInit(arr, prefix) {

    var init = [];
    for (var i = 0; i < arr.length; i++) {
        if (typeof (prefix) != "undefined") {
            var id = arr[i][prefix + "Id"]; //Id是固定属性
            var value = arr[i][prefix + "Name"]; //name是固定属性
        }
        else {
            var id = arr[i].key;
            var value = arr[i].value;
        }
        init.push({ id: id, title: value })
    }
    return init;
}
function getYesAndNo() {
    var init = [];
    init.push({ id: '1', title: "是" });
    init.push({ id: '0', title: "否" });
    return init;
}
//把obj属性是时间转化成日期字符串
function conventToDateTime(obj, jsonArray) {
    var datetimes = jsonArray.findAll("validate", "datetime");
    for (var i = 0; i < datetimes.length; i++) {
        if (obj && obj[datetimes[i].itemId]) {
            obj[datetimes[i].itemId] = strToDate(obj[datetimes[i].itemId]).pattern("yyyy-MM-dd");
        }
    }
}
//把objs属性是时间转化成日期字符串
function conventObjsToDateTime(objs, jsonArray) {
    var datetimes = jsonArray.findAll("validate", "datetime");
    for (var i = 0; i < objs.length; i++) {
        conventToDateTime(objs[i], jsonArray);
    }
}
//把为null的字段赋值为"";
function NullToStr(datas) {
    for (var i = 0; i < datas.length; i++) {
        for (var key in datas[i]) { 
            if(datas[i][key]==null){
                datas[i][key]="";
            }
        }
    }
}
function getJsonYear() {
    var years = [];
    years.push({ id: "2010", title: "2010" });
    years.push({ id: "2011", title: "2011" });
    years.push({ id: "2012", title: "2012" });
    years.push({ id: "2013", title: "2013" });
    years.push({ id: "2014", title: "2014" });
    years.push({ id: "2015", title: "2015" });
    years.push({ id: "2016", title: "2016" });
    return years;
}
function getJsonMonth() {
    var months = [];
    months.push({ id: "1", title: "01" });
    months.push({ id: "2", title: "02" });
    months.push({ id: "3", title: "03" });
    months.push({ id: "4", title: "04" });
    months.push({ id: "5", title: "05" });
    months.push({ id: "6", title: "06" });
    months.push({ id: "7", title: "07" });
    months.push({ id: "8", title: "08" });
    months.push({ id: "9", title: "09" });
    months.push({ id: "10", title: "10" });
    months.push({ id: "11", title: "11" });
    months.push({ id: "12", title: "12" });
    return months;
}

jQuery.fn.rowspan = function (colIdx) { //封装的一个JQuery小插件 
    return this.each(function () {
        var that;
        $('tr', this).each(function (row) {
            $('td:eq(' + colIdx + ')', this).filter(':visible').each(function (col) {
                if (that != null && $(this).html() == $(that).html()) {
                    rowspan = $(that).attr("rowSpan");
                    if (rowspan == undefined) {
                        $(that).attr("rowSpan", 1);
                        rowspan = $(that).attr("rowSpan");
                    }
                    rowspan = Number(rowspan) + 1;
                    $(that).attr("rowSpan", rowspan);
                    $(this).hide();
                } else {
                    that = this;
                }
            });
        });
    });
}
function validateForm() {
    var validator = $("#formdate").validate();
    return validator.form();
}
var loading = "<p><center><img src='../Images/ajax-loader_b.gif'/></center></p>";
var loading_small = "<center><img src='../Images/ajax-loader_m.gif'/></center>";
var noResult = "<div class='noResult'>还没有信息</div>";




