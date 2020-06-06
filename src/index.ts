// @see https://qiita.com/kudota/items/b480610cc3f575a8ec6f
function myFunction() {
    const apiKey = '{API Key}';
    const apiSecret = '｛API Secret｝';
    const userId = '{user_id}';
    const startTime = '2020-05-20T23:00:00Z';

    const token = getToken(apiKey, apiSecret);

    getMeeting(token, userId, startTime);
}

function getToken(apiKey, apiSecret) {
    const header = Utilities.base64Encode(JSON.stringify({
        'alg':'HS256',
        'typ':'JWT'
    }));
    const claimSet = JSON.stringify({
        "iss": apiKey,
        "exp": Date.now() + 3600
    });
    const encodeText = header + "." + Utilities.base64Encode(claimSet);
    const signature = Utilities.computeHmacSha256Signature(encodeText, apiSecret);
    const jwtToken = encodeText + "." + Utilities.base64Encode(signature);
    return jwtToken;
}

function getMeeting(token, userId, startTime) {
    var data = {
        'type': 2,
        'start_time': startTime,
        'duration': 60,
        'timezone': 'Asia/Tokyo'
    };
    var options = {
        'method' : 'post',
        'contentType': 'application/json',
        'headers': {'Authorization' : 'Bearer ' + token},
        // Convert the JavaScript object to a JSON string.
        'payload' : JSON.stringify(data)
    };
    const response = UrlFetchApp.fetch('https://api.zoom.us/v2/users/' + userId + '/meetings', options);
    var cont = JSON.parse(response.getContentText('UTF-8'));
    console.log(cont['start_time']);
    console.log(cont['join_url']);
}