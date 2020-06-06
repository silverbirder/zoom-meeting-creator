function myFunction() {
    const zoom = new Zoom(
        PropertiesService.getScriptProperties().getProperty('ZOOM_API_KEY'),
        PropertiesService.getScriptProperties().getProperty('ZOOM_API_SECRET')
    );
    zoom.updateToken();
    const user = zoom.getUserByEmail(
        PropertiesService.getScriptProperties().getProperty('ZOOM_USER_EMAIL')
    );
    // @see https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate#request-body
    const zoomResponse = zoom.createUserMeeting(user.id, {
        type: 2,
        duration: 60,
        timezone: 'Asia/Tokyo',
    });
    const slack = new Slack();

    // @see https://api.slack.com/messaging/composing/layouts#attachments
    slack.sendToWebHook(
        PropertiesService.getScriptProperties().getProperty('SLACK_WEB_HOOK'),
        {
            attachments: [{
                blocks: [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": user.first_name + "" + user.last_name + " is inviting you to a scheduled Zoom meeting",
                        }
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "Join Zoom Meeting",
                        }
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "<" + zoomResponse.join_url + "|" + zoomResponse.join_url + ">",
                        }
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "Meeting ID: " + zoomResponse.id,
                        }
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "Password: " + zoomResponse.password,
                        }
                    }
                ]
            }]
        }
    );
}