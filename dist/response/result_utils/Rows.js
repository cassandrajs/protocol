import { ProtocolConstants } from "../../util/ProtocolConstants";
import { Result } from "../Result";
export class Rows extends Result {
    constructor() {
        super(ProtocolConstants.ResultKind.ROWS);
    }
}
