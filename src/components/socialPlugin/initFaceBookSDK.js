const initFaceBookSDK = () => {
    if (window.FB) {
        window.FB.XFBML.parse()
        // return
    }

    window.fbAsyncInit = function () {
        window.FB.init({
            appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
            cookie: true,
            xfbml: true,
            version: 'v11.0',
        })
    }

    // Load the SDK asynchronously
    ;(function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) return
        js = d.createElement(s)
        js.id = id
        js.src = 'https://connect.facebook.net/vi_VN/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
}

export default initFaceBookSDK
