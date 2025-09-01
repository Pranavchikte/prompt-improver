import os
from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    
    frontend_url = os.getenv("FRONTEND_URL", "*") 
    CORS(app, resources={r"/api/*": {"origins": frontend_url}})

    from .api import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    return app