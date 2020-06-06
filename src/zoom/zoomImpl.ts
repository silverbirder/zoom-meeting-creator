'use strict';

import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

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
        const header = Utilities.base64Encode(JSON.stringify({
            'alg': 'HS256',
            'typ': 'JWT'
        }));
        const claimSet = JSON.stringify({
            "iss": this.apiKey,
            "exp": Date.now() + 3600
        });
        const encodeText = header + "." + Utilities.base64Encode(claimSet);
        const signature = Utilities.computeHmacSha256Signature(encodeText, this.apiSecret);
        const jwtToken = encodeText + "." + Utilities.base64Encode(signature);
        this.token = jwtToken;
    }

    getMeeting(userId: string, startTime: string): any {
        const data = {
            'type': 2,
            'start_time': startTime,
            'duration': 60,
            'timezone': 'Asia/Tokyo'
        };
        const options: URLFetchRequestOptions = {
            'method': 'post',
            'contentType': 'application/json',
            'headers': {'Authorization': 'Bearer ' + this.token},
            'payload': JSON.stringify(data)
        };
        const response = UrlFetchApp.fetch('https://api.zoom.us/v2/users/' + userId + '/meetings', options);
        var cont = JSON.parse(response.getContentText('UTF-8'));
        return cont;
    }
}

export {ZoomImpl}