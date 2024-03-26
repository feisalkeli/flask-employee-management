from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from User.blueprint import user_bp 

# Create the app
app = Flask(__name__)

# Configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Create the extension
db = SQLAlchemy()
db.init_app(app)


# Register blueprints
app.register_blueprint(user_bp, url_prefix='/user')

if __name__ == "__main__":
    app.run(debug=True)
