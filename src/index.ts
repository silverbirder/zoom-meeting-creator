// @see https://qiita.com/kudota/items/b480610cc3f575a8ec6f
import {ZoomImpl} from "./zoom/zoomImpl";
import {IZoom} from "./zoom/iZoom";
import {SlackImpl} from "./slack/slackImpl";
import {ISlack} from "./slack/iSlack";

declare const global: {
    Zoom: any,
    Slack: any,
};

global.Zoom = ZoomImpl;
global.Slack = SlackImpl;

export {
    ZoomImpl as Zoom,
    IZoom,
    SlackImpl as Slack,
    ISlack,
}