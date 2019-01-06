// Speech loads a list of adapters from the speech folder
//
// Speech adapters must export the @start and @stop method
// The speech adapter should continue to record audio until it's @stop method is
// called

const google = require('./speech/google-cloud-speech')

module.exports = google
