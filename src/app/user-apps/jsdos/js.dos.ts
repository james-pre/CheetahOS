import { DosOptions } from "emulators-ui/dist/types/js-dos";
import { ClientIdSupplier } from "js-dos";
import { CommandInterface, Emulators } from "emulators";
// import { Layers } from "../dom/layers";
// import { makeCache } from "./cache";

// const cacheName = "emulators-ui-saves";
// const cachePromise = makeCache(cacheName, {
//     onErr: console.error,
// });


// export function save(key: string,layers: Layers,ci: CommandInterface, emulators: Emulators) {
//     layers.setOnSave(async () => {
//     const cache = await cachePromise;
//     const updated = await ci.persist();
//     return cache.put(key, updated.buffer);
//     });
// }

// export async function load(key: string,  emulators: Emulators) {
// const cache = await cachePromise;
// return cache.get(key).then((buffer) => new Uint8Array(buffer as ArrayBuffer));
// }


export interface DosPlayerOptions extends DosOptions {
    style?: "default" | "none" | "hidden";
    clientId?: ClientIdSupplier;
    onExit?: () => void;
    noSideBar?: boolean;
    noFullscreen?: boolean;
    noSocialLinks?: boolean;
}
