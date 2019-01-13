// The broadcasters are a selection of channels which will be used in order to send
// between the channels
//
//
// This collection of broadcasters would be used outside the main thread and
// and you would use them to broadcast back into the main channel

import clientBroadcaster from './broadcaster/client-broadcaster'

const broadcasters = {
  client: clientBroadcaster
}

export default broadcasters
