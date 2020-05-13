(function($) {
    function changeFillColor() {
        $(this).attr('fill', selectedColor);
    };

    function changeSelectedColor() {
        if (!event) {
            color = $('.selected-color').attr('id');
            selectedColor = $('.selected-color').css('background-color');
        } else {
            $('.selected-color').removeClass('selected-color');
            $(this).addClass('selected-color');
            selectedColor = $(this).css('background-color');
        };
    };

    function fillPalatte() {
        swatches = $('.swatch')
        for (i=0; i < swatches.length; i++) {
            fillColor = swatches[i].id;
            $(swatches[i]).css('background-color', fillColor);
        };
        changeSelectedColor();
    }

    outline_areas = $('#Color').children();

    outline_areas.on('click', changeFillColor);
    $('.swatch').on('click', changeSelectedColor);

    fillPalatte();
})(jQuery);
