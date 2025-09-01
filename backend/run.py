from app import create_app

# Create the Flask app instance using the factory
app = create_app()

if __name__ == '__main__':
    # The debug=True flag enables hot-reloading for easier development
    app.run(debug=True)