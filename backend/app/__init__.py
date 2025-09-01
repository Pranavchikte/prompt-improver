from flask import Flask, jsonify
from flask_cors import CORS

def create_app():
    """
    Application factory function.
    Creates and configures the Flask application instance.
    """
    app = Flask(__name__)

    # Enable Cross-Origin Resource Sharing
    CORS(app)

    # A simple health check route to confirm the app is running
    @app.route('/health')
    def health_check():
        return jsonify({"status": "healthy"}), 200

    # This is the crucial connection.
    # We import our api_bp and register it with the main app.
    from .api import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    return app