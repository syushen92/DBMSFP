<<<<<<< HEAD
from flask import Blueprint
from .user_routes import user_routes  # 匯入 user_routes 中的 Blueprint

# 定義主 Blueprint，用於註冊子 Blueprint
def register_blueprints(app):
    app.register_blueprint(user_routes)  # 註冊使用者相關路由
=======
# routes/__init__.py
>>>>>>> e378efd8075d7d32e6b8e4e2b6c22944c9e952d9
