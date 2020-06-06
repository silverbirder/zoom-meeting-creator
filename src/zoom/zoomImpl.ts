'use strict';

import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;
import HttpMethod = GoogleAppsScript.URL_Fetch.HttpMethod;
import {IUser, IUserMeetingParameter, IUserMeetingResponse, IZoom} from "./iZoom";

const CHARSET = 'UTF-8';

class ZoomImpl implements IZoom {
    apiKey: string;
    apiSecret: string;
    token: string;

    constructor(apiKey: string, apiSecret: string) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.token = '';
    }

    updateToken(): void {
        const encodeText = `${Utilities.base64Encode(JSON.stringify({
            'alg': 'HS256',
            'typ': 'JWT'
        }))}.${Utilities.base64Encode(JSON.stringify({
            "iss": this.apiKey,
            "exp": Date.now() + 3600
        }))}`;
        this.token = `${encodeText}.${Utilities.base64Encode(Utilities.computeHmacSha256Signature(encodeText, this.apiSecret))}`;
    }

    createUserMeeting(userId: string, params: IUserMeetingParameter): IUserMeetingResponse {
        const requestOptions = this._requestOptions('post');
        requestOptions.payload = JSON.stringify(params);
        const response = UrlFetchApp.fetch(`https://api.zoom.us/v2/users/${userId}/meetings`, requestOptions);
        return JSON.parse(response.getContentText(CHARSET));
    }

    getUsers(): IUser[] {
        const response = UrlFetchApp.fetch(`https://api.zoom.us/v2/users/`, this._requestOptions('get'));
        return JSON.parse(response.getContentText(CHARSET)).users;
    }

    getUserByEmail(email: string): IUser {
        const users: IUser[] = this.getUsers();
        return users.filter((user: IUser) => user.email == email)[0];
    }

    _requestOptions(method: HttpMethod): URLFetchRequestOptions {
        return {
            'method': method,
            'contentType': 'application/json',
            'headers': {'Authorization': 'Bearer ' + this.token}
        }
    }
}

export {ZoomImpl}