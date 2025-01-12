from flask import Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from auth import create_account

# 建立 Blueprint
user_bp = Blueprint('user', __name__)

# 註冊使用者
@user_bp.route('/register', methods=['POST'])

def register():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        # 驗證必填欄位
        if not username or not password or not email:
            return jsonify({'error': 'Username, password and email are required'}), 400
        
        result = create_account(username, password, email)

        if result is None:
            return jsonify({'error': 'An error occurred while creating account'}),500

        if result.get('error'):
            return jsonify(result), 400
        
        return jsonify({'message': 'Account created successfully!'}), 201
    
    except Exception as e:
        # 如果處理過程中發生錯誤，返回錯誤訊息
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    user_bp.run(host='0.0.0.0', port=5000)  # 運行 Flask 伺服器，預設 5000 端口

from werkzeug.security import generate_password_hash, check_password_hash
from database import db

user_bp = Blueprint('user', __name__)

@user_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not all([name, email, password]):
        return jsonify({"error": "Missing required fields"}), 400

    hashed_pwd = generate_password_hash(password)
    try:
        db.execute_query(
            '''
            INSERT INTO "User" (name, email, pwd_hash)
            VALUES (%s, %s, %s)
            ''',
            (name, email, hashed_pwd)
        )
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": f"Failed to register user: {e}"}), 500


@user_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({"error": "Missing email or password"}), 400

    try:
        user = db.fetch_one(
            '''
            SELECT * FROM "User" WHERE email = %s
            ''',
            (email,)
        )

        if user and check_password_hash(user['pwd_hash'], password):
            # 可選：移除密碼哈希，避免返回敏感資訊
            user.pop('pwd_hash', None)
            return jsonify({"message": "Login successful", "user": user}), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401
    except Exception as e:
        return jsonify({"error": f"Failed to login: {str(e)}"}), 500
>>>>>>> e378efd8075d7d32e6b8e4e2b6c22944c9e952d9
