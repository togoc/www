const Core = require('@alicloud/pop-core');

var client = new Core({
    accessKeyId: '',
    accessKeySecret: '',
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
});

var params = {
    "RegionId": "cn-hangzhou",
    "PhoneNumbers": "18907734551",
    "TemplateCode": "SMS_181862025" //您的验证码：${code}，您正进行身份验证，打死不告诉别人！
}

var requestOption = {
    method: 'POST'
};

const express = require('express');
const router = express.Router()


module.exports = (app) => {
    router.get('/sms', (req, res) => {
        client.request('SendSms', params, requestOption).then((result) => {
            res.status(200).json(result);
        }, (ex) => {
            res.status(200).json(ex);
        })
    });


    app.use(router);
}