// The parser is responsible for analysing strings
//
// The parser will be required to interact with the store and perform
// pattern matching on the strings it recieves to form the commands
//
// Any parser should be able to take a string and produce an object
// It will need to find command keywords in strings of text
// ---------------------------------
// Example
// recieve -> phrase = "proper gold ball"
// analyses -> phrase.split(' ') -> etc.

import speechParser from './parser/speech-parser'

const parsers = {
  speech: speechParser
}

export default parsers
