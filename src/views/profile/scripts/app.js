var profilePage = {
    init: function() {
        this.headerFadeIn();
        this.headerHr();
        this.navBar();
        $(window).resize(function() {
            profilePage.watchWindow();
        });
    },
    headerFadeIn: function() {
        var $headerTitle = $('.header-title');
        var text = 'Chengkai Wang'.split('');
        var textGroup = '';
        for(i = 0; i < text.length; i ++) {
            textGroup += '<span class="opacity0">' + text[i] + '</span>';
        }
        var i = 0;
        $headerTitle.html(textGroup).find('span').each(function() {
            var $span = $(this);
            setTimeout(function() {
                $span.addClass('fade-in');
            }, 300*i-10*i*i);
            i++;
        });
    },
    headerHr: function() {
        $('.header-hr').velocity({width: ['100%', '0']}, {duration:3000, delay:2000,  easing: [250, 15]});
    },
    navBar: function() {
        var o = {duration: 800,delay:2000, easing: 'ease', complete: profilePage.content};
        $('.nav-row').velocity({height: ['70px', 0]}, o);
    },
    content: function () {
        var o = {duration: 800, easing: 'ease'};
        $('.body-main-content').velocity({height: [$('.body').height(), 0]} ,o);
    },
    watchWindow: function() {
        var watch = function(){
            var t = null;
            return function() {
                if (watch) {
                    clearTimeout(t);
                }
                setTimeout(function () {
                    profilePage.content();
                }, 500);
            }
        }();
    }
};

profilePage.init();
