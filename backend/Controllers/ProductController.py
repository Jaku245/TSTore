from Utils.DynamoDBUtils import *
from flask import jsonify

def GetProducts():
    response, status_code = readAllItems("Products")
    return jsonify(response=response, status_code=status_code)


def CreateProduct(product):
    Item = {
        "name": product['name'],
        "description": product['description'],
        "price": product['price'],
        "variants": product['variants']
    }
    message, status_code = createItem(Item, 'Products')
    return jsonify(message=message, status_code=status_code)

def CreateTestProducts(data):
    totalSuccess = 0
    for product in data:
        Item = {
            "name": product['name'],
            "description": product['description'],
            "price": product['price'],
            "variants": product['variants']
        }
        _, status_code = createItem(Item, 'Products')
        if status_code == 200:
            totalSuccess += 1
    if totalSuccess == len(data):
        return jsonify(message="All products created", status_code=200)
    else:
        return jsonify(message="" + totalSuccess + "Products created", status_code=500)