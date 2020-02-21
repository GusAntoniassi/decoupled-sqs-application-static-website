function showDialog(message, level) {
    var html = '<div class="alert alert-' + level + ' alert-dismissible fade show" role="alert">' 
        + message 
        + '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
            + '<span aria-hidden="true">&times;</span>'
        + '</button>'
        + '</div>'
    
    $alert = $('<div class="alert-item">').html(html);
    $alert.hide();
    $('#alert-container').append($alert);
    $alert.fadeIn(200).delay(3000).fadeOut(200);

    window.setTimeout(function() {
        $('#alert-container .alert-item:hidden').remove()
    }, 3500)
}

$(function() {
    var API_ENDPOINT = '{{API_GATEWAY_URL}}';
    
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
        var ide = $button.data('ide-id');
        $button.text('Loading...');

        console.log(ide);
        
        $.ajax({
            url: API_ENDPOINT,
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                Vote: ide
            })
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