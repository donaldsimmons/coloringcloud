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

        if (unlockedPaths == 0) {
            console.log('Game Over: All Areas Colored Completely');
        };
    };

    function resetFillColors() {
        $('[data-match-color]').attr('fill', '#FFFFFF').removeClass('locked');
        unlockedPaths = $('path').not('.locked').length;
    };

    function toggleMenu() {
        $('#menu').toggle('slide');
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
        colors = $('.color');
        for (i=0; i < colors.length; i++) {
            fillColor = $(colors[i]).attr('data-color');
            $(colors[i]).css('background-color', fillColor);
        };
        changeSelectedColor();
    };

    unlockedPaths = $('path').not('.locked').length;

    outline_areas = $('#Color').children();
    outline_areas.on('click', changeFillColor);

    $('.color').on('click', changeSelectedColor);
    $('#reset').on('click', resetFillColors);
    $('#menu-icon').on('click', toggleMenu);

    $('#palatte').draggable({containment: 'parent'});

    fillPalatte();
})(jQuery);
