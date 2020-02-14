function showDialog(message, level) {
    var html = '<div class="alert alert-' + level + ' alert-dismissible fade show" role="alert">' 
        + message 
        + '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
            + '<span aria-hidden="true">&times;</span>'
        + '</button>'
        + '</div>'
    
    $alert = $('<div>').html(html);
    $alert.hide();
    $('#alert-container').append($alert);
    $alert.fadeIn(200);
}

$(function() {
    var API_ENDPOINT = 'https://33dxm6mgj9.execute-api.us-east-2.amazonaws.com/v1/vote';
    
    // This avoids us importing 60kb of Bootstrap JS just to get the alert close effect
    $('body').on('click', 'button[data-dismiss="alert"]', function(e) {
        var $alert = $(e.target).closest('.alert');
        $alert.fadeOut(200);

        window.setTimeout(function() {
            $alert.remove();
        }, 250)
    });

    $('.vote-button').on('click', function() {
        var $button = $(this);
        var ide = $button.data('ide');
        $button.text('Loading...');
        
        $.post({
            url: API_ENDPOINT,
            data: {
                foo: 'bar'
            }
        }).done(function() {
            showDialog('🎉 Vote recorded successfuly!', 'success');
        }).fail(function(jqXHR, textStatus, errorThrown) {
            showDialog('We had an error trying to record your vote :(<br/>Please try again shortly.', 'danger');
            console.error(jqXHR)
        }).always(function() {
            $button.text('Vote!');
        });
    });
})