import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="text-center text-success mb-4">首頁</h2>
      <div className="d-flex justify-content-center gap-3">
        <button className="btn btn-info" onClick={() => navigate('/friendlist')}>
          好友清單
        </button>
        <button className="btn btn-warning" onClick={() => navigate('/accounting')}>
          分帳功能
        </button>
        <button className="btn btn-primary" onClick={() => navigate('/score')}>
          個人積分
        </button>
      </div>
    </div>
  );
};

export default HomePage;
