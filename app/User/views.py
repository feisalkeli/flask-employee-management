from flask import  request,Blueprint, jsonify
from User.models import User
from main import db
from User.blueprint import user_bp


user_bp = Blueprint('user', __name__)

#user routes
@user_bp.route("/",methods=['GET'])
def index():
 return "<h1>Hello world</h1>"


@user_bp.route("/user",methods=["GET"])
def getUsers():
  users = User.query.all()
  userData = [{'id':users.id,'email':users.email,'firstName':users.firstName,'lastName':users.lastName,'userName':users.userName} for user in users]
  
  return jsonify(users=userData)
#get  a single user
@user_bp.route("/user/<int:user_id>",methods=["GET"])
def getSingleUser(user_id):
  user= User.query.get(user_id)
  if user:
    user_data = {
      'id': user.id,
      'email': user.email,
      'firstName' : user.firstName,
      'lastName' : user.lastName,
      'userName' :user.userName
      
    }
    return jsonify (user=user_data)
  else:
    return jsonify(message='User with the id could not be found'),404
  
  #update a user
@user_bp.route("/user/<int:user_id>",methods=["PATCH"])
def update_user(user_id):
  #retrieve user from the database 
  
  user = User.query.get(user_id)
  
  #check if user exists
  if not user:
    return jsonify(message="user not found"),404
  #parse the json request
  data = request.json
  
  #update the users info
   # Update the user's info
  if 'email' in data:
        user.email = data['email']
  if 'userName' in data:
        user.userName = data['userName']
  if 'firstName' in data:
        user.firstName = data['firstName']
  if 'lastName' in data:
        user.lastName = data['lastName']

  try:
        # Commit the changes
        db.session.commit()
        return jsonify(id=user.id, email=user.email, userName=user.userName, firstName=user.firstName, lastName=user.lastName)
  except Exception as e:
        # Rollback changes on error
        db.session.rollback()
        return jsonify(message="An error occurred while updating user information"), 500
  
#create a single user
@user_bp.route("/create_user/", methods=['POST'])
def createUser():
 firstName = request.json.get("firstName")
 lastName = request.json.get("lastName")
 email = request.json.get("email")
 userName = request.json.get("userName")
 
 if not email or not userName or not lastName or not firstName:
   return jsonify(message=('Could not create user')),400
 
 new_user = User(userName = userName, email= email, firstName=firstName,lastName=lastName)
 try:
   db.session.add(new_user)
   db.session.commit()
   return jsonify(message='User created successfully'), 201
 except Exception as e:
        db.session.rollback()  # Roll back the session in case of an error
        return jsonify({"message": "Could not create user.", "error": str(e)}), 400
  
  
   
@user_bp.errorhandler(404)
def not_found(error):
  return jsonify({'message': str(error)})
 
 
 
  
# List all URLs
def list_urls():
    urls = []
    for rule in user_bp.url_map.iter_rules():
        urls.append(str(rule))
    return urls
  
if __name__ == "__main__":
    print("List of URLs:")
    for url in list_urls():
        print(url)