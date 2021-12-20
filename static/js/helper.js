// var http_url = 'http://www.zkwl.info/api/'
var http_url = sessionStorage.getItem('http_url') ? sessionStorage.getItem('http_url') : ''

// var uploadUrl = 'http://www.zkwl.info'
var uploadUrl = sessionStorage.getItem('uploadUrl') ? sessionStorage.getItem('uploadUrl') : ''

// var reg_url = 'http://www.zkwl.info/h5/reg.html?invicode='
var reg_url = sessionStorage.getItem('reg_url') ? sessionStorage.getItem('reg_url') : ''

const sys_version = '1.0.3';

var lock = true

var once_lock = true

const http_api = {

    http_send(api, data, type, callback) {
        if (http_url) {
            this.http_send1(api, data, type, (res) => {
                callback(res)
            })
        } else {
            this.test_success('http://www.zkwl.info', (res) => {
                if (lock) {
                    lock = false
                    console.log('接口1')
                    for (let i = 0; i < res.data.length; i++) {
                        this.test_success(res.data[i].api_link, (res) => {
                            if (once_lock) {
                                once_lock = false
                                console.log('啊实打实大所大', res)
                                sessionStorage.setItem('http_url', res.data[i].api_link + '/api/')
                                sessionStorage.setItem('uploadUrl', res.data[i].api_link)
                                sessionStorage.setItem('reg_url', res.ShareUrl + '/h5/reg.html?invicode=')

                                http_url = res.data[i].api_link + '/api/'
                                uploadUrl = res.data[i].api_link
                                reg_url = res.ShareUrl + '/h5/reg.html?invicode='

                                this.http_send1(api, data, type, (res) => {
                                    callback(res)
                                })
                            }
                        })
                    }
                }
            })
            this.test_success('http://www.zkwl.xyz', (res) => {
                if (lock) {
                    lock = false
                    console.log('接口2')
                    for (let i = 0; i < res.data.length; i++) {
                        this.test_success(res.data[i].api_link, (res) => {
                            if (once_lock) {
                                once_lock = true
                                console.log('啊实打实大所大', res)
                                sessionStorage.setItem('http_url', res.data[i].api_link + '/api/')
                                sessionStorage.setItem('uploadUrl', res.data[i].api_link)
                                sessionStorage.setItem('reg_url', res.ShareUrl + '/h5/reg.html?invicode=')

                                http_url = res.data[i].api_link + '/api/'
                                uploadUrl = res.data[i].api_link
                                reg_url = res.ShareUrl + '/h5/reg.html?invicode='

                                this.http_send1(api, data, type, (res) => {
                                    callback(res)
                                })
                            }
                        })
                    }
                }
            })
            this.test_success('http://www.zkwl.me', (res) => {
                if (lock) {
                    lock = false
                    console.log('接口3')
                    for (let i = 0; i < res.data.length; i++) {
                        this.test_success(res.data[i].api_link, (res) => {
                            if (once_lock) {
                                once_lock = true
                                console.log('啊实打实大所大', res)
                                sessionStorage.setItem('http_url', res.data[i].api_link + '/api/')
                                sessionStorage.setItem('uploadUrl', res.data[i].api_link)
                                sessionStorage.setItem('reg_url', res.ShareUrl + '/h5/reg.html?invicode=')

                                http_url = res.data[i].api_link + '/api/'
                                uploadUrl = res.data[i].api_link
                                reg_url = res.ShareUrl + '/h5/reg.html?invicode='

                                this.http_send1(api, data, type, (res) => {
                                    callback(res)
                                })
                            }
                        })
                    }
                }
            })
        }
    },
    test_success(api, callback) {

        var url = api + '/api/getapilink'
        $.ajax({
            url: url,
            dataType: "json",
            success: (res) => {
                callback(res)
            }
        });
    },
    http_send1(api, data, type, callback) {
        var user = localStorage.getItem("user");
        var lastsession = user ? user : 0;
        var timestamp = Date.parse(new Date()) / 1000;
        data.timestamp = timestamp;
        data.lastsession = lastsession;
        $.ajax({
            url: http_url + api,
            data: data,
            type: type,
            dataType: "json",
            success: (res) => {
                callback(res)
            },
            error: (res) => {
                console.log('请求错误', res)
                callback(res)
                return false;
            }
        });
    },
    GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

}