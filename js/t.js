$(document).ready(function() {
    $.ajax({
        url: 'https://8gi6uzivm6.execute-api.eu-west-1.amazonaws.com/t',
        type: 'POST',
        data: {
            'uri': window.location.href,
            
        },
        success: function(res) {

        }
    })
})
