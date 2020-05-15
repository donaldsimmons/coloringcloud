(function($) {
    function rgbColorToHex(color) {
        sep = color.indexOf(",") > -1 ? "," : " ";
        rgb = color.substr(4).split(')')[0].split(sep);
        hexPieces = [
            (+rgb[0]).toString(16),
            (+rgb[1]).toString(16),
            (+rgb[2]).toString(16)
        ];

        for (i=0; i<hexPieces.length; i++) {
            if (hexPieces[i].length == 1) {
                hexPieces[i] = "0" + hexPieces[i];
            };
        };

        return "#" + hexPieces[0] + hexPieces[1] + hexPieces[2];
    };

    function lockPathColor(path) {
        $(path).addClass('locked');
        unlockedPaths--;
    };

    function checkColorPlacement(path) {
        selectedPath = $(path);
        correctColor = selectedPath.attr('data-match-color').toUpperCase();
        currentColor = rgbColorToHex(selectedPath.attr('fill')).toUpperCase();
        return (correctColor == currentColor);
    };

    function changeFillColor() {
        selectedPath = $(this);
        unlocked = !selectedPath.hasClass('locked');
        if (unlocked) {
            selectedPath.attr('fill', selectedColor);
            isColorCorrect = checkColorPlacement(selectedPath);
            if (isColorCorrect) {
                lockPathColor(selectedPath);
            };
        };
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
            fillColor = $(swatches[i]).attr('data-color');
            $(swatches[i]).css('background-color', fillColor);
        };
        changeSelectedColor();
    }

    unlockedPaths = $('path').not('.locked')

    outline_areas = $('#Color').children();
    outline_areas.on('click', changeFillColor);

    $('.swatch').on('click', changeSelectedColor);

    $('#palatte').draggable({containment: 'parent'});

    fillPalatte();
})(jQuery);
