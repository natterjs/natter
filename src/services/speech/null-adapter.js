// A simple null adapter

const startRecording = () => {
  console.log("Starting the null adapter")
}

const stopRecording = () => {
  console.log("Stopping the null adapter")
}

module.exports.start = startRecording
module.exports.stop = stopRecording
