from Utils.DynamoDBUtils import *
from flask import jsonify

def GetProfile(email):
    response, status_code = readItem("email", email, "User_Profile")
    return jsonify(response=response, status_code=status_code)

def SaveProfile(profile):
    Item = {
        "firstname": profile['firstname'],
        "lastname": profile['lastname'],
        "email": profile['email'],
        "password": profile['password']
    }
    message, status_code = createItem(Item, 'User_Profile')
    return jsonify(message=message, status_code=status_code)

def GetOrders(email):
    response, status_code = queryItems("email", email, "Orders")
    return jsonify(response=response, status_code=status_code)

def CreateOrder(order):
    order = {
        "id": order['id'],
        "email": order['email'],
        "products": order['products'],
        "date": order['date']
    }
    message, status_code = createItem(order, 'Orders')
    return jsonify(message=message, status_code=status_code)

def GetCart(email):
    response, status_code = readItem("email", email, "Cart")
    return jsonify(response=response, status_code=status_code)

def CreateCart(cart):
    Item = {
        "email": cart['email'],
        "products": cart['products']
    }
    message, status_code = createItem(Item, 'Cart')
    return jsonify(message=message, status_code=status_code)