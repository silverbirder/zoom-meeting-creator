'use strict';

import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;
import HttpMethod = GoogleAppsScript.URL_Fetch.HttpMethod;

// @see https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate
interface IUserMeetingParameter {
    topic: string,
    type: number,
    start_time: string[],
    duration: number,
    schedule_for: string,
    timezone: string,
    password: string,
    agenda: string,
    recurrence: {
        type: number,
        repeat_interval: number,
        weekly_days: string,
        monthly_day: number,
        monthly_week: number,
        monthly_week_day: number,
        end_times: number,
        end_date_time: string[]
    },
    settings: {
        host_video: boolean,
        participant_video: boolean,
        cn_meeting: boolean,
        in_meeting: boolean,
        join_before_host: boolean,
        mute_upon_entry: boolean,
        watermark: boolean,
        use_pmi: boolean,
        approval_type: number,
        registration_type: number,
        audio: string,
        auto_recording: string,
        enforce_login: boolean,
        enforce_login_domains: string,
        alternative_hosts: string,
        global_dial_in_countries: string[],
        registrants_email_notification: boolean
    }
}
interface IUserMeetingResponse {
    id: number,
    topic: string,
    start_time: string,
    duration: number,
    timezone: string,
    created_at: string,
    agenda: string,
    start_url: string,
    join_url: string,
    password: string,
}

// @see https://marketplace.zoom.us/docs/api-reference/zoom-api/users/users
interface IUser {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    type: number,
    pmi: number,
    timezone: string,
    verified: number,
    dept: string,
    created_at: string,
    last_login_time: string,
    last_client_version: string,
    pic_url: string,
    im_group_ids: string[],
    status: string,
}

const CHARSET = 'UTF-8';

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