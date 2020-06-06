import {ISlack, ISlackWebHookPayload} from "./iSlack";
import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

class SlackImpl implements ISlack {
    sendToWebHook(webHookUrl: string, payload: ISlackWebHookPayload): void {
        const options: URLFetchRequestOptions =
            {
                "method": "post",
                "contentType": "application/json",
                "payload": JSON.stringify(payload)
            };
        UrlFetchApp.fetch(webHookUrl, options);
    }
}

export {SlackImpl}