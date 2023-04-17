from Configs import AWSConfig
import boto3
from boto3.dynamodb.conditions import Key

def get_dynamodb():
    session = boto3.session.Session(aws_access_key_id=AWSConfig.AWS_ACCESS_KEY_ID,
                                    aws_secret_access_key=AWSConfig.AWS_SECRET_ACCESS_KEY, aws_session_token=AWSConfig.AWS_SESSION_TOKEN)
    dynamodb = session.resource('dynamodb', region_name='us-east-1')
    return dynamodb

def createItem(databaseItem, TableName):
    dynamodb = get_dynamodb()
    table = dynamodb.Table(TableName)
    response = table.put_item(
        Item=databaseItem
    )
    if response["ResponseMetadata"]['HTTPStatusCode'] == 200:
        return "Successfully Request Inserted", 200
    else:
        return "User registration failed.", 500

def readItem(primaryKeyName, primaryKeyValue, TableName):
    dynamodb = get_dynamodb()
    table = dynamodb.Table(TableName)
    response = table.get_item(
        Key={primaryKeyName: primaryKeyValue}
    )
    if 'Item' not in response:
        return "No user found", 500
    else:
        return response['Item'], 200

def queryItems(searchKey, searchValue, TableName):
    dynamodb = get_dynamodb()
    table = dynamodb.Table(TableName)
    response = table.scan(
        FilterExpression=Key(searchKey).eq(searchValue)
    )
    data = response['Items']
    return data, 200

def readAllItems(TableName):
    dynamodb = get_dynamodb()
    table = dynamodb.Table(TableName)
    response = table.scan()
    data = response['Items']
    return data, 200


def deleteItem(primaryKeyName, primaryKeyValue, TableName):
    dynamodb = get_dynamodb()
    table = dynamodb.Table(TableName)
    response = table.delete_item(
        Key={primaryKeyName: primaryKeyValue}
    )
    if response["ResponseMetadata"]['HTTPStatusCode'] == 200:
        return "Successfully Request Deleted", 200
    else:
        return "Error Occurred Data not deleted", 404