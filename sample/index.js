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
    const templateString1 = ({lastName}) => lastName + "さんがあなたを予約されたZoomミーティングに招待しています。";
    const templateString2 = ({joinUrl}) => "Zoomミーティングに参加する  <" + joinUrl + "|" + joinUrl + ">";
    const templateString3 = ({id, password}) => "ミーティングID: " + id + "  パスワード: " + password;

    const str1 = templateString1({
        lastName: user.first_name,
    });
    const str2 = templateString2({
        joinUrl: zoomResponse.join_url,
    });
    const str3 = templateString3({
        id: zoomResponse.id,
        password: zoomResponse.password
    });

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
                            "text": str1,
                        }
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": str2,
                        }
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": str3,
                        }
                    }
                ]
            }]
        }
    );
}