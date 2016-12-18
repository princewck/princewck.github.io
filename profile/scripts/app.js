var profilePage = {
    init: function() {
        this.headerFadeIn();
        this.headerHr();
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
            }, 200*i);
            i++;
        });
    },
    headerHr: function() {
        $('.header-hr').velocity({width: ['100%', '0']}, {duration:2000, delay:4000,  easing: [250, 15]});
    },
};

profilePage.init();
