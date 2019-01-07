// A simple null adapter
import speechBroadcaster from '../broadcaster/speech-broadcaster'

const startRecording = () => {
  speechBroadcaster("Starting the null adapter")
}

const stopRecording = () => {
  speechBroadcaster("Stopping the null adapter")
}

module.exports.start = startRecording
module.exports.stop = stopRecording
