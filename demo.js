// 高内聚 低耦合
//封装插件 轮播功能


(function ($) {
    function Swiper(opt) {
        var opts = opt || {};
        this.wrap = opts.father;
        this.img = opts.image;
        this.interval = opts.interval;
        //入口函数
        this.init();
    }
    //入口函数

    Swiper.prototype.init = function () {
        this.nowindex = 0;
        this.len = this.img.length - 1;
        this.itemWidth = parseInt(this.wrap.css('width'));
        this.itemHeight = parseInt(this.wrap.css('height'));
        this.timer = undefined;
        this.flag = true;
        this.creatDom();
        this.sliderAuto();
        this.bindEvent();
    }
    //根据传参 添加Dom结构
    Swiper.prototype.creatDom = function () {
        var len = this.len;
        var str = '';
        var listStr = '';
        var order = $('<div class="order"></div>');
        var imgBox = $('<ul class="img-box"></ul>');
        var btn = $('<div class="btn"><a class="prevBtn" href="#">\
            <span></span></a><a class="nextBtn" href="#">\
            <span></span></a></div>');
        var list = $('<ul></ul>')
        for (i = 0; i < len; i++) {
            str += '<li><a href="#"><img src="' + this.img[i] + '" alt=""></a></li>';
            listStr += '<li></li>';
        }
        str += '<li><a href="#"><img src="' + this.img[0] + '" alt=""></a></li>';
        $(listStr).appendTo(list);
        this.wrap.append(imgBox.html(str))
            .append(btn)
            .append(order.append(list));
        $('.img-box').css({
            width: this.itemWidth * (len + 1) + 'px',
        });
        $('.img-box li').css({
            width: this.itemWidth + 'px',
        });
        $('.order li').eq(0).addClass('active');

    }
    Swiper.prototype.sliderAuto = function () {
        var self = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            self.move('next');
        }, self.interval);
    }
    Swiper.prototype.bindEvent = function () {
        var self = this;
        $('.order li').add('.prevBtn').add('.nextBtn').on('click', function () {
            if ($(this).attr('class') == 'prevBtn') {
                self.move('prev');
            } else if ($(this).attr('class') == 'nextBtn') {
                self.move('next');
            } else {
                var index = $(this).index();
                self.move(index);
            }
            this.changeStyle();
        })
        self.wrap.on('mouseenter', function () {
            $('.btn').show();
            clearTimeout(self.timer);
        }).on('mouseleave', function () {
            $('.btn').hide();
            self.sliderAuto();
        })
    }
    Swiper.prototype.move = function (dir) {
        var self = this;
        var len = this.len;
        var itemWidth = this.itemWidth;
        if (this.flag) {
            this.flag = false;
            if (dir == 'prev' || dir == 'next') {
                if (dir == 'prev') {
                    if (this.nowindex == 0) {
                        $('.img-box').css({
                            left: -(len * itemWidth)
                        });
                        this.nowindex = len - 1;
                    } else {
                        this.nowindex = this.nowindex - 1;
                    }
                } else {
                    if (this.nowindex == len-1) {
                        a = 0;
                        $('.img-box').animate({
                            left: -(len * itemWidth)
                        },
                            function () {
                                $(this).css({ left: 0 });
                                self.sliderAuto();
                                self.flag = true;
                            })
                        this.nowindex = 0;
                    } else {
                        this.nowindex = this.nowindex + 1;
                    }
                }
            } else {
                this.nowindex = dir;
            }

            // 运动函数
            this.slider();
            this.changeStyle();
        }
    }
    Swiper.prototype.slider = function () {
        var self = this;
        $('.img-box').animate({
            left: -(this.itemWidth * this.nowindex),
        }, function () {
            self.sliderAuto();
            self.flag = true;
        });
    }
    Swiper.prototype.changeStyle = function () {
        $('.active').removeClass('active');
        $('.order li').eq(this.nowindex).addClass('active');
    }
    $.fn.extend({
        sliderImg: function (options) {
            options.father = this || $('body');
            // console.log(options);
            new Swiper(options);
        }
    })
})(jQuery);