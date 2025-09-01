from flask import Blueprint

# This creates the Blueprint object, naming it 'api'.
api_bp = Blueprint('api', __name__)

# This line imports the routes after the blueprint is created to avoid errors.
from . import routes