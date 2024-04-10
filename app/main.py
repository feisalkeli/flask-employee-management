import os
from flask import Flask, jsonify, Blueprint, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Create the app
app = Flask(__name__)


# Get the path to the instance folder
instance_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'instance'))

# Configure the SQLite database, relative to the instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(instance_path, "project.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Create the extension
db = SQLAlchemy(app)
migrate = Migrate(app, db)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"


# Define the user blueprint
user_bp = Blueprint('user', __name__)

# Define routes within the user blueprint

@user_bp.route("/", methods=['GET'])
def index():
    return "<h1>Hello world</h1>"


@user_bp.route("/user", methods=["GET"])
def get_users():
    users = User.query.all()
    user_data = [{'id': user.id, 'email': user.email, 'firstName': user.first_name, 'lastName': user.last_name,
                  'userName': user.username} for user in users]
    return jsonify(users=user_data)


@user_bp.route("/user/<int:user_id>", methods=["GET"])
def get_single_user(user_id):
    user = User.query.get(user_id)
    if user:
        user_data = {
            'id': user.id,
            'email': user.email,
            'firstName': user.first_name,
            'lastName': user.last_name,
            'userName': user.username
        }
        return jsonify(user=user_data)
    else:
        return jsonify(message='User with the id could not be found'), 404


@user_bp.route("/user/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify(message="User not found"), 404

    data = request.json
    if 'email' in data:
        user.email = data['email']
    if 'userName' in data:
        user.username = data['userName']
    if 'firstName' in data:
        user.first_name = data['firstName']
    if 'lastName' in data:
        user.last_name = data['lastName']

    try:
        db.session.commit()
        return jsonify(id=user.id, email=user.email, userName=user.username, firstName=user.first_name,
                       lastName=user.last_name)
    except Exception as e:
        db.session.rollback()
        return jsonify(message="An error occurred while updating user information"), 500


@user_bp.route("/create_user", methods=['POST'])
def create_user():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    username = request.json.get("userName")

    if not email or not username or not last_name or not first_name:
        return jsonify(message='Could not create user'), 400

    new_user = User(username=username, email=email, first_name=first_name, last_name=last_name)
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify(message='User created successfully'), 201
    except Exception as e:
        db.session.rollback()
        return jsonify(message="Could not create user", error=str(e)), 400


@user_bp.errorhandler(404)
def not_found(error):
    return jsonify({'message': str(error)}), 404


# List all URLs
def list_urls():
    urls = []
    for rule in app.url_map.iter_rules():
        urls.append(str(rule))
    return urls


if __name__ == "__main__":
    print("List of URLs:")
    for url in list_urls():
        print(url)

# Register blueprints
app.register_blueprint(user_bp, url_prefix='/user')

if __name__ == "__main__":
    app.run(debug=True)
