interface ISlack {
    sendToWebHook(webHookUrl: string, payload: ISlackWebHookPayload): void;
}

// @see https://api.slack.com/messaging/composing/layouts#attachments
// try https://app.slack.com/block-kit-builder
interface ISlackWebHookPayload {
    channel: string,
    attachments: {
        blocks: ISlackWebHookPayloadBlock[]
    }[]
}

interface ISlackWebHookPayloadBlock {
    type: string,
    text: ISlackWebHookPayloadText,
    fields: ISlackWebHookPayloadText[],
    accessory: {
        type: string,
        options: {
            text: ISlackWebHookPayloadText,
            value: string
        }[]
    }
}

interface ISlackWebHookPayloadText {
    type: string,
    text: string,
    emoji: boolean,
}

export {
    ISlack,
    ISlackWebHookPayload
}