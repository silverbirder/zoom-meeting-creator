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
    const response = zoom.createUserMeeting(user.id, {
        type: 2,
        duration: 60,
        timezone: 'Asia/Tokyo',
    });

    const slack = new Slack();
    // @see
    slack.sendToWebHook(
        PropertiesService.getScriptProperties().getProperty('SLACK_WEB_HOOK'),
        {
            attachments: {
                blocks: [
                    {
                        type: "section",
                        "text": {
                            type: "plain_text",
                            text: "id:" + response.id + "join_url:" + response.join_url,
                            emoji: true,
                        }
                    }
                ]
            }
        }
    );
}