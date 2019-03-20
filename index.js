var nowindex = 0,
    len = 5,
    itemWidth = 520,
    timer = null;
    flag = true;
function init() {
    bindEvent();
    sliderAuto();
}
init();
function bindEvent() {
    $('.list li').add('.btn1').add('.btn2').on('click', function () {
        if ($(this).attr('class') == 'btn1') {
            move('prev');
        } else if ($(this).attr('class') == 'btn2') {
            move('next');
        } else {
            var index = $(this).index();
            move(index);
        }
        changeStyle();
    })
    $('.wrapper').on('mouseenter', function () {
        $('.btn-box').show();
        clearTimeout(timer);
    }).on('mouseleave', function () {
        $('.btn-box').hide();
        sliderAuto();
    })
}
function move(dir) {
    if(flag) {
        flag = false;
        var a = 1;
        if (dir == 'prev' || dir == 'next') {
            if (dir == 'prev') {
                if (nowindex == 0) {
                    $('.img-box').css({ left: -(len * itemWidth) });
                    nowindex = len - 1;
                } else {
                    nowindex = nowindex - 1;
                }
            } else {
                if (nowindex == 4) {
                    a = 0;
                    $('.img-box').animate({ left: -(len * itemWidth) }, function () {
                        $(this).css({ left: 0 });
                        sliderAuto();
                        flag = true;
                    })
                    nowindex = 0;
                } else {
                    nowindex = nowindex + 1;
                }
            }
        } else {
            nowindex = dir;
        }

        if (a) {
            slider();
        }
    }
}

function slider() {
    $('.img-box').animate({ left: -(itemWidth * nowindex) }, function () {
        sliderAuto();
        flag = true;
    });
}
function changeStyle() {
    $('.active').removeClass('active');
    $('.list li').eq(nowindex).addClass('active');
}
function sliderAuto() {
    clearTimeout(timer);
    timer = setTimeout(function () {
        move('next');
        changeStyle();
    }, 2000);
}