interface ISlack {
    sendToWebHook(webHookUrl: string, payload: ISlackWebHookPayload): void;
}

// @see https://api.slack.com/messaging/composing/layouts#attachments
// try https://app.slack.com/block-kit-builder
interface ISlackWebHookPayload {
    channel: string,
    attachments: {
        fallback: string,
        color: string,
        pretext: string,
        author_name: string,
        author_link: string,
        author_icon: string,
        title: string,
        title_link: string,
        text: string,
        fields:
            {
                title: string,
                value: string,
                short: boolean
            }[],
        image_url: string,
        thumb_url: string,
        footer: string,
        footer_icon: string,
        ts: number,
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
            value: string,
        }[]
    },
    elements: {
        type: string,
        text: string,
        image_url: string,
        alt_text: string,
    }[]
    image_url: string,
    alt_text: string,
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