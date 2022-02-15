base_url = window.location.href;

function call_api(url, method, body)
{
    return fetch(url, {
        method: method,
        headers: {
            'content-type' : 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(body)
    })
}

const app = Vue.createApp({
    data() {
        return {
            show_result: false,
            ready: false,
            error: false,
            user_input: "",
            link: "",
            beautify_link: "",
            error_msg: "",
            b_color: "#2e86de"
        }
    },

    methods: {
        shortLink(link)
        {
            this.show_result = true;
            this.error = false;
            this.ready = false;
            this.b_color = "#2e86de";
            call_api(base_url + "api/shortener/", "POST", {link: link})
                .then(res => res.json())
                .then((res) => {
                    if (res.error != null)
                        throw new Error(res.error);
                    this.ready = true;
                    this.link = base_url + res.hash;
                    this.beautify_link = this.link.replace("https://", "").replace("http://", "");
                })
                .catch((error) => {
                    this.error = true;
                    this.error_msg = error;
                    this.b_color = "#e74c3c";
                })
        },
        copyLink()
        {
            navigator.clipboard.writeText(this.link);
        }
    }
})

app.mount('#app')