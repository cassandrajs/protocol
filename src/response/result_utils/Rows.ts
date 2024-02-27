import { ProtocolConstants } from "../../util/ProtocolConstants"
import { Result } from "../Result"
import { RowsMetadata } from "./RowsMetadata"

export abstract class Rows extends Result {
	abstract getMetadata(): RowsMetadata
	abstract getData(): Uint8Array[][]

	protected constructor() {
		super(ProtocolConstants.ResultKind.ROWS)
	}
}
