import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="text-primary mb-4">歡迎使用分帳系統</h1>
      <p className="lead text-center">管理您的分帳、消費與紀錄</p>
      <div className="d-flex gap-3">
        <button className="btn btn-success px-4" onClick={() => navigate('/login')}>
          登入
        </button>
        <button className="btn btn-primary px-4" onClick={() => navigate('/signup')}>
          註冊
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
