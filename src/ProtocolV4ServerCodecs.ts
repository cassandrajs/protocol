import { CodecGroup } from "./CodecGroup"
import { CodecGroupRegistry } from "./CodecGroupRegistry"
import { AuthResponse } from "./request/AuthResponse"
import { Batch } from "./request/Batch"
import { Execute } from "./request/Execute"
import { Options } from "./request/Options"
import { Prepare } from "./request/Prepare"
import { Query } from "./request/Query"
import { Register } from "./request/Register"
import { Startup } from "./request/Startup"
import { AuthChallenge } from "./response/AuthChallenge"
import { Authenticate } from "./response/Authenticate"
import { AuthSuccess } from "./response/AuthSuccess"
import { ProtocolError } from "./response/ProtocolError"
import { ProtocolEvent } from "./response/ProtocolEvent"
import { Ready } from "./response/Ready"
import { Result } from "./response/Result"
import { Supported } from "./response/Supported"
import { ProtocolConstants } from "./util/ProtocolConstants"

export class ProtocolV4ServerCodecs implements CodecGroup {
	registerCodecs(registry: CodecGroupRegistry) {
		registry
			.addDecoder(new AuthResponse.Codec(ProtocolConstants.Version.V4))
			.addDecoder(new Batch.Codec(ProtocolConstants.Version.V4))
			.addDecoder(new Execute.Codec(ProtocolConstants.Version.V4))
			.addDecoder(new Options.Codec(ProtocolConstants.Version.V4))
			.addDecoder(new Prepare.Codec(ProtocolConstants.Version.V4))
			.addDecoder(new Query.Codec(ProtocolConstants.Version.V4))
			.addDecoder(new Register.Codec(ProtocolConstants.Version.V4))
			.addDecoder(new Startup.Codec(ProtocolConstants.Version.V4))

		registry
			.addEncoder(new AuthChallenge.Codec(ProtocolConstants.Version.V4))
			.addEncoder(new Authenticate.Codec(ProtocolConstants.Version.V4))
			.addEncoder(new AuthSuccess.Codec(ProtocolConstants.Version.V4))
			.addEncoder(new ProtocolError.Codec(ProtocolConstants.Version.V4))
			.addEncoder(new ProtocolEvent.Codec(ProtocolConstants.Version.V4))
			.addEncoder(new Ready.Codec(ProtocolConstants.Version.V4))
			.addEncoder(new Result.Codec(ProtocolConstants.Version.V4))
			.addEncoder(new Supported.Codec(ProtocolConstants.Version.V4))
	}
}
