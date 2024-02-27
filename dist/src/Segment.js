export class Segment {
    static MAX_PAYLOAD_LENGTH = 128 * 1024 - 1;
    payload;
    isSelfContained;
    constructor(payload, isSelfContained) {
        this.payload = payload;
        this.isSelfContained = isSelfContained;
    }
}
