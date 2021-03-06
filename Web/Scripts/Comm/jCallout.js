
var tipD = { "backgroundColor": '#81b895', "position": 'right', "textColor": 'white' };
(function($) {
    var DATA_PREFIX = "jCallout.";

    var methods = {
        init: function(options) {
            methods.initWithoutShow.apply(this, arguments);
            methods.show.apply(this, arguments);
        },
        initWithoutShow: function(options) {
            var defaults = {
                message: "no message given",
                position: 'bottom',
                backgroundColor: '#ffc0cb',
                borderColor: 'transparent',
                textColor: 'red',
                $closeElement: $('<span style="float: right; cursor: pointer">(X)</span>'),
                showEffect: 'fade',
                showSpeed: 0,
                hideEffect: 'fade',
                hideSpeed: 0
            };

            var options = $.extend(defaults, options);

            return this.each(function() {
                var o = options;
                var obj = $(this);
                if (!obj.data(DATA_PREFIX)) { //prevents initializing jCallout on an element twice.
                    var msg = o.message;
                    var obj_position = obj.position();
                    var containerDiv = $('<div class="callout">').append(o.$closeElement).append('<b class="notch"></b>' + msg);
                    obj.data(DATA_PREFIX + "options", o); //store option for use in other methods
                    o.$closeElement.click(function() { methods.hide.apply(obj) });
                    containerDiv.css({
                        'background-color': o.backgroundColor,
                        'border-color': o.borderColor,
                        'color': o.textColor
                    });

                    //var items = $("li", obj);
                    switch (o.position) {
                    case "bottom":
                        obj.after(containerDiv);
                        var setLeft = obj_position.left + (obj.width() / 2) - (containerDiv.width() / 2) - 5;
                        var setTop = obj_position.top + obj.height();
                        containerDiv.css({
                            'left': setLeft,
                            'top': setTop
                        });
                        $(".notch", containerDiv).css({
                            'left': (containerDiv.width() / 2) - 5,
                            'border-bottom-color': o.backgroundColor
                        });
                        break;
                    case "right":
                        obj.after(containerDiv);
                        $("b.notch", containerDiv).addClass('notch_right').removeClass('notch');
                        var setLeft = obj_position.left + obj.width() + 15;
                        var setTop = obj_position.top + (obj.height() / 2) - (containerDiv.height() / 2) - 10;
                        containerDiv.css({
                            'left': setLeft,
                            'top': setTop,
                            'margin': '0'
                        });
                        $(".notch_right", containerDiv).css({
                            'left': '-10px',
                            'top': (containerDiv.height() / 2) - 5,
                            'border-right-color': o.backgroundColor
                        });
                        break;
                    case "top":
                        obj.before(containerDiv);
                        $("b.notch", containerDiv).addClass('notch_top').removeClass('notch');
                        var setLeft = obj_position.left + (obj.width() / 2) - (containerDiv.width() / 2) - 10;
                        var setTop = obj_position.top - (containerDiv.height()) - 45;
                        containerDiv.css({
                            'left': setLeft,
                            'top': setTop
                        });
                        $(".notch_top", containerDiv).css({
                            'left': (containerDiv.width() / 2) - 5,
                            'top': containerDiv.height() + 10,
                            'border-top-color': o.backgroundColor
                        });
                        break;
                    case "left":
                        obj.before(containerDiv);
                        $("b.notch", containerDiv).addClass('notch_left').removeClass('notch');
                        var setLeft = obj_position.left - containerDiv.width() - 25;
                        var setTop = obj_position.top + (obj.height() / 2) - (containerDiv.height() / 2) - 20;
                        containerDiv.css({
                            'left': setLeft,
                            'top': setTop
                        });
                        $(".notch_left", containerDiv).css({
                            'right': '-10px',
                            'top': (containerDiv.height() / 2) - 5,
                            'border-left-color': o.backgroundColor
                        });
                        break;
                    }
                    containerDiv.hide();
                    obj.data(DATA_PREFIX, true); //Store the fact that we've initialized this object.
                }
            });
        },
        hide: function() {
            return this.each(function() {
                var obj = $(this);
                var o = obj.data(DATA_PREFIX + "options");
                obj.parent().children('.callout').hide(o.hideEffect, {}, o.hideSpeed);
            })
        },
        show: function() {
            return this.each(function() {
                var obj = $(this);
                var o = obj.data(DATA_PREFIX + "options");
                obj.parent().children('.callout').show(o.showEffect, {}, o.showSpeed);
            })
        },
        update: function(content) {}
    };

    $.fn.jCallout = function(method) {

        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.jCallout');
        }

    };

})(jQuery);
