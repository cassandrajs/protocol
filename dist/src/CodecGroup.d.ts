import { CodecGroupRegistry } from "./CodecGroupRegistry";
export interface CodecGroup {
    registerCodecs(registry: CodecGroupRegistry): any;
}
