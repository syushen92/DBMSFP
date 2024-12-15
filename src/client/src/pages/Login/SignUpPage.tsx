import React from 'react';

const SignUpPage: React.FC = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">註冊</h2>
      <form className="mx-auto" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">使用者名稱</label>
          <input type="text" className="form-control" id="username" placeholder="輸入您的使用者名稱" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">密碼</label>
          <input type="password" className="form-control" id="password" placeholder="輸入您的密碼" />
        </div>
        <button type="submit" className="btn btn-success w-100">註冊</button>
      </form>
    </div>
  );
};

export default SignUpPage; 
