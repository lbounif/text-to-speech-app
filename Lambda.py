import json
import boto3

def lambda_handler(event, context):
    # Create an S3 client
    polly = boto3.client('polly')

    # Extract text from the event
    text = event['text']

    # Set the voice ID (you can choose a different voice)
    voice_id = 'Lynda'

    # Set the output format
    output_format = 'mp3'

    # Request speech synthesis
    response = polly.synthesize_speech(
        Text=text,
        OutputFormat=output_format,
        VoiceId=voice_id
    )

    # Get audio stream and convert it to base64
    audio_data = response['AudioStream'].read().encode('base64')

    # Return the audio data
    return {
        'statusCode': 200,
        'body': audio_data,
        'isBase64Encoded': True
    }
