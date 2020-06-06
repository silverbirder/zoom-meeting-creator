'use strict';

// @see https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate#request-body
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

// @see https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate#responses
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

// @see https://marketplace.zoom.us/docs/api-reference/zoom-api/users/users#responses
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

interface IZoom {
    updateToken(): void;

    getUserByEmail(email: string): IUser;

    getUsers(): IUser[];

    createUserMeeting(userId: string, params: IUserMeetingParameter): IUserMeetingResponse;
}

export {IZoom, IUserMeetingParameter, IUserMeetingResponse, IUser}