$(document).ready(function() {

    let data = {
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

    let d = btoa(JSON.stringify(data))

    $.ajax({
        url: 'https://8gi6uzivm6.execute-api.eu-west-1.amazonaws.com/t?d='+d,
        type: 'GET',

        success: function(res) {

        }
    })
})
