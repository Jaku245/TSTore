from Configs import AWSConfig
import boto3
from flask import jsonify
import json
from botocore.exceptions import ClientError

def GetCredentials():

    secret_name = "tstore/paypalSecret"
    region_name = "us-east-1"

    # Create a Secrets Manager client
    session = boto3.session.Session(aws_access_key_id=AWSConfig.AWS_ACCESS_KEY_ID,
                                    aws_secret_access_key=AWSConfig.AWS_SECRET_ACCESS_KEY, aws_session_token=AWSConfig.AWS_SESSION_TOKEN)
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )

    # try:
    get_secret_value_response = client.get_secret_value(
        SecretId=secret_name
    )
    # except ClientError as e:
    #     # For a list of exceptions thrown, see
    #     # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    #     return jsonify(response="Failed to get secret", status_code=500)

    # Decrypts secret using the associated KMS key.
    response = json.loads(get_secret_value_response['SecretString'])['CLIENT_ID']
    return jsonify(response=response, status_code=200)