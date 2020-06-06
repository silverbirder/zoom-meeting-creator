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
        start_time: '2020-05-20T23:00:00Z',
        duration: 60,
        timezone: 'Asia/Tokyo',
    });
    Logger.log(response);
}