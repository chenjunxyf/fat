$(function() {
    var $ajaxData = $('.ajax_data');

    $('.ajax_btn').on('click', function() {
        $.ajax({
            url: '/ttdiscuss/concern/more/',
            method: 'POST',
            data: {},
            success: function(data) {
                console.log(data.students);
                $ajaxData.append('<div>' + data.teacher + '</div>');
            },
            error: function() {

            }
        });
    });
});