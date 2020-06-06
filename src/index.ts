// @see https://qiita.com/kudota/items/b480610cc3f575a8ec6f
import {ZoomImpl} from "./zoom/zoomImpl";
import {IZoom} from "./zoom/iZoom";

declare const global: {
    Zoom: any
};

global.Zoom = ZoomImpl;

export {
    ZoomImpl as Zoom,
    IZoom,
}