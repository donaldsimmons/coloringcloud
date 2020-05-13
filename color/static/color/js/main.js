(function($) {
    function colorArea() {
        $(this).attr('fill', "#FF0000");
    };

    selectedColor = $('.selected-color');
    outline_areas = $('#Color').children();
    $(outline_areas).on('click', colorArea);
})(jQuery);
