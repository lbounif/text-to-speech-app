import React, { useState } from 'react';
import AWS from 'aws-sdk';
import './SpeechConverter.css';

AWS.config.update({
  accessKeyId: 'AKIA6ODU7LEHLYAH3YMR',
  secretAccessKey: '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',
  region: 'us-east-1',
});

const polly = new AWS.Polly();

const SpeechConverter = () => {
  const [textToSpeech, setTextToSpeech] = useState('');
  const [audioSrc, setAudioSrc] = useState('');

  const handleConvertToSpeech = async () => {
    try {
      const data = await polly
        .synthesizeSpeech({
          Text: textToSpeech,
          OutputFormat: 'mp3',
          VoiceId: 'Joanna', // You can change the VoiceId
        })
        .promise();

      setAudioSrc(`data:audio/mp3;base64,${data.AudioStream.toString('base64')}`);
    } catch (error) {
      console.error('Error synthesizing speech:', error);
    }
  };

  return (
    <div>
      <h1>Speech-to-Text Converter</h1>
      <textarea
        placeholder="Enter text to convert to speech..."
        value={textToSpeech}
        onChange={(e) => setTextToSpeech(e.target.value)}
      />
      <button onClick={handleConvertToSpeech}>Convert to Speech</button>
      {audioSrc && <audio controls src={audioSrc} />}
    </div>
  );
};

export default SpeechConverter;
