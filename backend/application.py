from flask import Flask, request
from flask_cors import CORS
from Controllers import ProductController, UserController, PayPalController

application = Flask(__name__)
CORS(application)

# User Routes

@application.route('/User/Login', methods=['POST'])
def userGetProfile():
    email = request.json['email']
    response = UserController.GetProfile(email)
    return response

@application.route('/User/SignUp', methods=['POST'])
def userSaveProfile():
    profile = request.json
    response = UserController.SaveProfile(profile)
    return response

@application.route('/User/GetOrders', methods=['POST'])
def getOrders():
    email = request.json['email']
    response = UserController.GetOrders(email)
    return response

@application.route('/User/CreateOrder', methods=['POST'])
def createOrder():
    order = request.json
    response = UserController.CreateOrder(order)
    return response

@application.route('/User/GetCart', methods=['GET'])
def getCart():
    email = request.args.get('email')
    response = UserController.GetCart(email)
    return response

@application.route('/User/UpdateCart', methods=['POST'])
def createCart():
    cart = request.json
    response = UserController.CreateCart(cart)
    return response

# Product Routes

@application.route('/GetProducts', methods=['GET'])
def getProducts():
    response = ProductController.GetProducts()
    return response

@application.route('/CreateProduct', methods=['POST'])
def createProduct():
    product = request.json
    response = ProductController.CreateProduct(product)
    return response

# Paypal Routes

@application.route('/PaypalCredentials', methods=['GET'])
def getPaypalCredentials():
    response = PayPalController.GetCredentials()
    return response

# Production Route
@application.route('/Admin/AddData', methods=['POST'])
def addData():
    data = [
        {
            "name": "Boarding Sasquatch Tee",
            "description": "Super-soft triblend tee in Ice Blue. Water-based inks, 3.8 oz., 50% polyester, 25% combed and ringspun cotton, 25% rayon blend",
            "price": "39.00",
            "variants": [
                {
                    "color": "#b3cfcd",
                    "image": "https://tstore-products.s3.amazonaws.com/Boarding+Sasquatch-Ice+Blue.png",
                    "thumbnail": "https://tstore-products.s3.amazonaws.com/Boarding+Sasquatch.png",
                    "type": "Ice Blue"
                }
            ]
        },
        {
            "name": "UN-Busy Beaver Tee",
            "description": "Super-soft triblend tee in Mustard or Steel Blue, Water-based inks, 3.8 oz., 50% polyester, 25% combed and ringspun cotton, 25% rayon blend",
            "price": "35.00",
            "variants": [
                {
                    "color": "#2d6d7c",
                    "image": "https://tstore-products.s3.amazonaws.com/beaver-steel.png",
                    "thumbnail": "https://tstore-products.s3.amazonaws.com/beaver-steel-thumbnail.png",
                    "type": "Steel Blue"
                },
                {
                    "color": "#d09f3a",
                    "image": "https://tstore-products.s3.amazonaws.com/beaver-mustard.png",
                    "thumbnail": "https://tstore-products.s3.amazonaws.com/beaver-steel-thumbnail.png",
                    "type": "Mustard"
                }
            ]
        },
        {
            "name": "Bighorn Sheep Tee",
            "description": "Soft cotton-poly tee in forest green or indigo.Discharge print, 52% combed and ring-spun cotton, 48% polyester blend",
            "price": "31.00",
            "variants": [
                {
                    "color": "#435f51",
                    "image": "https://tstore-products.s3.amazonaws.com/BIGHORN+SHEEP+TEE-heather-forest.png",
                    "thumbnail": "https://tstore-products.s3.amazonaws.com/BIGHORN+SHEEP+TEE.png",
                    "type": "Heather Forest"
                },
                {
                    "color": "#729ca4",
                    "image": "https://tstore-products.s3.amazonaws.com/BIGHORN+SHEEP+TEE-indigo.png",
                    "thumbnail": "https://tstore-products.s3.amazonaws.com/BIGHORN+SHEEP+TEE.png",
                    "type": "Indigo"
                }
            ]
        },
        {
            "name": "Salty Sea Tee",
            "description": "Super-soft triblend tee in Teal. Water-based and discharge inks, 3.8 oz., 50% polyester, 25% combed and ringspun cotton, 25% rayon blend",
            "price": "39.00",
            "variants": [
                {
                    "color": "#318c8c",
                    "image": "https://tstore-products.s3.amazonaws.com/Salty+See+Tee-Teal.png",
                    "thumbnail": "https://tstore-products.s3.amazonaws.com/Salty+See+Tee.png",
                    "type": "Teal"
                }
            ]
        },
        {
            "name": "Surf Monster Tee",
            "description": "Super-soft triblend tee in Green. Water-based inks, 3.8 oz., 50% polyester, 25% combed and ringspun cotton, 25% rayon blend",
            "price": "27.00",
            "variants": [
                {
                    "color": "#70b98a",
                    "image": "https://tstore-products.s3.amazonaws.com/Surf+Monster-Green.png",
                    "thumbnail": "https://tstore-products.s3.amazonaws.com/Surf+Monster.png",
                    "type": "Green"
                }
            ]
        },
        {
            "name": "House Cat Tee",
            "description": "Super-soft triblend tee in Denim and Mauve. Water-based inks, 3.8 oz., 50% polyester, 25% combed and ringspun cotton, 25% rayon blend",
            "price": "29.00",
            "variants": [
                {
                    "color": "#7e93a1",
                    "image": "https://tstore-products.s3.amazonaws.com/House+Cat-Denim.png",
                    "thumbnail": "https://tstore-products.s3.amazonaws.com/House+Cat.png",
                    "type": "Denim"
                },
                {
                    "color": "#ac797f",
                    "image": "https://tstore-products.s3.amazonaws.com/House+Cat-Mauve.png",
                    "thumbnail": "https://tstore-products.s3.amazonaws.com/House+Cat.png",
                    "type": "Mauve"
                }
            ]
        }
    ]
    response = ProductController.CreateTestProducts(data)
    return response

if __name__ == "__main__":
    application.run(debug=True)