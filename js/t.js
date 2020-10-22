$(document).ready(function() {

    let d = {
        uri: window.location.href,
        bsize: {
            w: {
                h: $(window).height(),
                w: $(window).width()
            },
            d: {
                h: $(document).height(),
                w: $(document).width()
            }
        }
    }

    $.ajax({
        url: 'https://8gi6uzivm6.execute-api.eu-west-1.amazonaws.com/t',
        type: 'POST',
        data: d,
        success: function(res) {

        }
    })
})
