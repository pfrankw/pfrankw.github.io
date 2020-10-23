function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function sc(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

$(document).ready(function() {

    if (!document.cookie || !document.cookie.length)
        sc('t', makeid(10), 30*365)

    let d = {
        uri: window.location.href,
        c: document.cookie,
        r: document.referrer,
        cpu: navigator.oscpu,
        platform: navigator.platform,
        screen: screen.width+'x'+screen.height,
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
        data: {
            d: btoa(JSON.stringify(d))
        },
        success: function(res) {

        }
    })
})
