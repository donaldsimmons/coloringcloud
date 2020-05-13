(function($) {
    function changeFillColor() {
        $(this).attr('fill', selectedColor);
    };

    function changeSelectedColor() {
        $('.selected-color').removeClass('selected-color');
        $(this).addClass('selected-color');
        selectedColor = $(this).css('background-color');
    };

    selectedColor = $('.selected-color').css('background-color');
    outline_areas = $('#Color').children();

    outline_areas.on('click', changeFillColor);
    $('.swatch').on('click', changeSelectedColor);
})(jQuery);
