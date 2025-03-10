"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "esto esta en el back en routes"
    }

    return jsonify(response_body), 200

@api.route('/test', methods=['POST', 'GET'])
def test():

    response_body = {
        "message": "esto es una prueba"
    }

    return jsonify(response_body), 200

# buscar correo y clave para darle el token de acceso

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()
    print (user)

    if user == None:
        return jsonify({"msg": "Could not find email"}), 401
    if email != user.email or password != user.password:
        return jsonify({"msg": "Bad Email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route("/signup", methods=["POST"])
def signup():
    body = request.get_json()
    print(body)

    # Verificar si el usuario ya existe
    user = User.query.filter_by(email=body["email"]).first()
    print(user)

    if user != None:
        return jsonify({"msg": "Ya se encuentra un usuario creado con ese correo"}), 401
    
    user = User(email=body["email"], password=body["password"], is_active=True)
    db.session.add(user)
    db.session.commit()
    response_body = {
            "msg": "Usuario creado"
        }
    return jsonify(response_body), 200



