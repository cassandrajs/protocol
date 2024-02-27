import { AuthResponse } from "./request/AuthResponse";
import { Batch } from "./request/Batch";
import { Execute } from "./request/Execute";
import { Options } from "./request/Options";
import { Prepare } from "./request/Prepare";
import { Query } from "./request/Query";
import { Register } from "./request/Register";
import { Startup } from "./request/Startup";
import { AuthChallenge } from "./response/AuthChallenge";
import { Authenticate } from "./response/Authenticate";
import { AuthSuccess } from "./response/AuthSuccess";
import { ProtocolError } from "./response/ProtocolError";
import { ProtocolEvent } from "./response/ProtocolEvent";
import { Ready } from "./response/Ready";
import { Result } from "./response/Result";
import { Supported } from "./response/Supported";
import { ProtocolConstants } from "./util/ProtocolConstants";
export class ProtocolV6ClientCodecs {
    registerCodecs(registry) {
        registry
            .addEncoder(new AuthResponse.Codec(ProtocolConstants.Version.V6))
            .addEncoder(new Batch.Codec(ProtocolConstants.Version.V6))
            .addEncoder(new Execute.Codec(ProtocolConstants.Version.V6))
            .addEncoder(new Options.Codec(ProtocolConstants.Version.V6))
            .addEncoder(new Prepare.Codec(ProtocolConstants.Version.V6))
            .addEncoder(new Query.Codec(ProtocolConstants.Version.V6))
            .addEncoder(new Register.Codec(ProtocolConstants.Version.V6))
            .addEncoder(new Startup.Codec(ProtocolConstants.Version.V6));
        registry
            .addDecoder(new AuthChallenge.Codec(ProtocolConstants.Version.V6))
            .addDecoder(new Authenticate.Codec(ProtocolConstants.Version.V6))
            .addDecoder(new AuthSuccess.Codec(ProtocolConstants.Version.V6))
            .addDecoder(new ProtocolError.Codec(ProtocolConstants.Version.V6))
            .addDecoder(new ProtocolEvent.Codec(ProtocolConstants.Version.V6))
            .addDecoder(new Ready.Codec(ProtocolConstants.Version.V6))
            .addDecoder(new Result.Codec(ProtocolConstants.Version.V6))
            .addDecoder(new Supported.Codec(ProtocolConstants.Version.V6));
    }
}
