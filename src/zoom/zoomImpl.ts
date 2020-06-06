'use strict';

class ZoomImpl {
    apiKey: string;
    apiSecret: string;
    token: string;

    constructor(apiKey: string, apiSecret: string) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.token = '';
    }

    updateToken() {
        const encodeText = `${Utilities.base64Encode(JSON.stringify({
            'alg': 'HS256',
            'typ': 'JWT'
        }))}.${Utilities.base64Encode(JSON.stringify({
            "iss": this.apiKey,
            "exp": Date.now() + 3600
        }))}`;
        this.token = encodeText + "." + Utilities.base64Encode(Utilities.computeHmacSha256Signature(encodeText, this.apiSecret));
    }

    getMeeting(userId: string, startTime: string): any {
        const response = UrlFetchApp.fetch(`https://api.zoom.us/v2/users/${userId}/meetings`, {
            'method': 'post',
            'contentType': 'application/json',
            'headers': {'Authorization': 'Bearer ' + this.token},
            'payload': JSON.stringify({
                'type': 2,
                'start_time': startTime,
                'duration': 60,
                'timezone': 'Asia/Tokyo'
            })
        });
        return JSON.parse(response.getContentText('UTF-8'));
    }

    getUsers() {
        const response = UrlFetchApp.fetch(`https://api.zoom.us/v2/users/`, {
            'method': 'get',
            'contentType': 'application/json',
            'headers': {'Authorization': 'Bearer ' + this.token},
        });
        return JSON.parse(response.getContentText('UTF-8'));
    }
}

export {ZoomImpl}