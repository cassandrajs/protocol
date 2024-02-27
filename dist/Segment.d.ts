export declare class Segment<B> {
    static MAX_PAYLOAD_LENGTH: number;
    payload: B;
    isSelfContained: boolean;
    constructor(payload: B, isSelfContained: boolean);
}
