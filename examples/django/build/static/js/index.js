$(function() {
    $('.ajax_btn').on('click', function() {
        $.ajax({
            url: '/ttdiscuss/concern/more/',
            method: 'POST',
            data: {},
            success: function(data) {
                console.log(data.students);
            },
            error: function() {

            }
        });
    });
});