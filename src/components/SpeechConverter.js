import React, { useState } from 'react';
import AWS from 'aws-sdk';
import './SpeechConverter.css';

AWS.config.update({ //replace with your AWS account configuration
  accessKeyId: '', 
  secretAccessKey: '',
  region: '',
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
      <h1>Text-to-Speech Converter</h1>
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
