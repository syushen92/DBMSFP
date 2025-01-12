from flask_bcrypt import Bcrypt
from database import Database  # 從 database 資料夾引入資料庫模組

bcrypt = Bcrypt()

def create_account(username, password, email):
    try:
        db = Database()
        conn = db.connect()

        if conn is None:
            return {'error': 'Failed to connect to the database'}
        
        # 密碼加密
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        
        # 新增帳號到資料庫
        user_id = db.add_user(username, email, hashed_password)
        
        if user_id is None:
            return {'error': 'Username already exists or failed to create account'}
        
        # 關閉資料庫連線
        db.close()
        return {'message': 'Account created successfully'}

    except Exception as e:
        return {'error': f'An error occurred: {str(e)}'}