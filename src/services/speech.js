// Speech loads a list of adapters from the speech folder
//
// Speech adapters must export the @start and @stop method
// The speech adapter should continue to record audio until it's @stop method is
// called

// Adapters
const google = require('./speech/google-cloud-speech')
const witAI = require('./speech/wit-ai')
const nullAdapter = require('./speech/null-adapter')

// Availble Adapters
const adapters = {
  "no-adapter": nullAdapter,
  "google-speech-api": google,
  "wit-ai-api": witAI
}

// Export the Speech Adapters
module.exports = {
  adapters: adapters
}
