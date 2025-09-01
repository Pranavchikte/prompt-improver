from flask import Flask, jsonify
from flask_cors import CORS

def create_app():
    """
    Application factory function.
    Creates and configures the Flask application instance.
    """
    app = Flask(__name__)

    CORS(app)

    @app.route('/health')
    def health_check():
        return jsonify({"status": "healthy"}), 200

    from .api import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    return app