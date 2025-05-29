# main application python3 run.py
from app import create_app
from flask import Flask, render_template
from flask_restx import Api
from flask_jwt_extended import JWTManager
from app.api.v1.users import api as users_n


