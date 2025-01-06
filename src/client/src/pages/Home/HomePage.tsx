import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 月份資料
  const months = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  // Mock data for expenses
  const transactions = [
    {
      name: "12/31跨年市集",
      amount: -400,
      details: "Lunch at restaurant",
      status: "Paid",
    },
    { name: "Rent", amount: 800, details: "Monthly rent", status: "Paid" },
    {
      name: "Entertainment",
      amount: 300,
      details: "Movie tickets",
      status: "Pending",
    },
    { name: "Others", amount: 200, details: "Miscellaneous", status: "Paid" },
    {
      name: "12/31跨年市集",
      amount: -400,
      details: "Lunch at restaurant",
      status: "Paid",
    },
    { name: "Rent", amount: 800, details: "Monthly rent", status: "Paid" },
    {
      name: "Entertainment",
      amount: 300,
      details: "Movie tickets",
      status: "Pending",
    },
    { name: "Others", amount: 200, details: "Miscellaneous", status: "Paid" },
  ];

  // 計算總支出
  const totalExpense = transactions.reduce(
    (sum, entry) => sum + entry.amount,
    0
  );

  // 計算比例分割線
  const calculateDividers = () => {
    const total = transactions.reduce((sum, entry) => sum + entry.amount, 0);
    let startAngle = 0;

    return transactions.map((entry) => {
      const value = entry.amount / total;
      const endAngle = startAngle + value;

      const x1 = Math.cos(2 * Math.PI * startAngle) * 16 + 16;
      const y1 = Math.sin(2 * Math.PI * startAngle) * 16 + 16;

      startAngle = endAngle;

      return (
        <line
          key={startAngle}
          x1="16"
          y1="16"
          x2={x1}
          y2={y1}
          stroke="white"
          strokeWidth="0.5"
        />
      );
    });
  };

  // 切換到上一個月份
  const goToPreviousMonth = () => {
    setCurrentMonthIndex((prevIndex) =>
      prevIndex === 0 ? months.length - 1 : prevIndex - 1
    );
  };

  // 切換到下一個月份
  const goToNextMonth = () => {
    setCurrentMonthIndex((prevIndex) =>
      prevIndex === months.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      style={{
        maxHeight: "100vh",
      }}
    >
      <div
        style={{
          fontFamily: "Poppins, sans-serif",
          background: "#FFFFFF",
          //padding: "10px",
        }}
      >
        {/* Page Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            //marginBottom: "10px",
          }}
        >
          <button
            onClick={goToPreviousMonth}
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: "#6c5ce7",
            }}
          >
            &#8249; {/* 左箭頭 */}
          </button>
          <h2
            style={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              margin: "0 20px",
              color: "#6c5ce7",
            }}
          >
            {months[currentMonthIndex]}
          </h2>
          <button
            onClick={goToNextMonth}
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: "#6c5ce7",
            }}
          >
            &#8250; {/* 右箭頭 */}
          </button>
        </div>

        {/* Pie Chart Section */}
        <div
          style={{
            width: "200px",
            height: "200px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <svg
            viewBox="0 0 32 32"
            style={{
              transform: "rotate(-90deg)",
              width: "100%",
              height: "100%",
            }}
          >
            <defs>
              <radialGradient id="gradient-circle" cx="50%" cy="50%" r="50%">
                <stop offset="50%" stopColor="#FFECF5" />
                <stop offset="100%" stopColor="#F1E1FF" />
              </radialGradient>
            </defs>
            {/* 漸層背景圓 */}
            <circle cx="16" cy="16" r="16" fill="url(#gradient-circle)" />
            {/* 分割線 */}
            {calculateDividers()}
          </svg>
          {/* 總支出數字 */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#FFFFFF",
              borderRadius: "50%",
              width: "120px",
              height: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "16px",
                color: "#6c5ce7",
                fontWeight: "bold",
              }}
            >
              ${totalExpense}
            </p>
          </div>
        </div>

        {/* Transaction Records */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            boxShadow: "0px 0px 10px rgb(193, 193, 193)",
            padding: "20px",
            marginTop: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h5
              style={{
                margin: 0,
                color: "#6c5ce7",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              帳務紀錄
            </h5>

            <button
              style={{
                background: "#FFF",
                color: "#6A6AFF		",
                border: "2px solid #6A6AFF	",
                borderRadius: "100px",
                padding: "2px 10px",
                fontSize: "14px",
                cursor: "pointer",
                fontWeight: "bold",
                //boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              分帳
            </button>
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: "Poppins, sans-serif",
              display: "inline-block", // 讓背景和文字範圍匹配
              background: "#F8F0FF", // 背景色
              padding: "2px 12px 12px", // 內邊距
              borderRadius: "8px", // 背景的圓角
            }}
          >
            <thead>
              <tr
                style={{
                  color: "#000000",
                  fontSize: "14px",
                }}
              >
                <th style={{ padding: "5px", textAlign: "center" }}>名稱</th>
                <th style={{ padding: "5px", textAlign: "center" }}>金額</th>
                <th style={{ padding: "5px", textAlign: "center" }}>描述</th>
                <th style={{ padding: "5px", textAlign: "center" }}>付款</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  key={index}
                  style={{
                    background: "#FFF",
                    borderBottom: "1.5px solid #FAF4FF", // 新增分隔線
                  }}
                >
                  <td
                    style={{
                      padding: "5px",
                      textAlign: "left",
                      color: "#272727",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {transaction.name}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      color: transaction.amount < 0 ? "#FFAAD5" : "#B9B9FF",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    {transaction.amount < 0
                      ? `-$${Math.abs(transaction.amount)}`
                      : ` $${transaction.amount}`}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      color: "#272727",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {transaction.details}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
                  >
                    {transaction.status == "Paid" ? `✅` : `⬜`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            style={{
              background: "linear-gradient(to right, #FFECF5, #F1E1FF)",
              color: "white",
              border: "none",
              borderRadius: "100%",
              width: "60px",
              height: "60px",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
              //boxShadow: "0px 0px 10px rgb(193, 193, 193)",
              marginRight: "20px",
            }}
            onClick={() => navigate("/add")}
          >
            +
          </button>
          <button
            style={{
              background: "linear-gradient(to right, #6c5ce7, #74b9ff)",
              color: "white",
              border: "none",
              borderRadius: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
            onClick={() => navigate("/score")}
          >
            View Score
          </button>
        </div>

        {/* Sidebar */}
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            height: "100%",
            width: isSidebarOpen ? "300px" : "0",
            background: "linear-gradient(to right, #6c5ce7, #74b9ff)",
            color: "#fff",
            overflow: "hidden",
            transition: "width 0.3s ease",
            boxShadow: isSidebarOpen ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
          }}
        >
          {isSidebarOpen && (
            <div style={{ padding: "20px" }}>
              <button
                style={{
                  background: "none",
                  color: "#fff",
                  border: "none",
                  fontSize: "16px",
                  marginBottom: "20px",
                  cursor: "pointer",
                }}
                onClick={() => setIsSidebarOpen(false)}
              >
                Close
              </button>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li style={{ marginBottom: "15px" }}>
                  <button
                    style={{
                      background: "none",
                      color: "#fff",
                      border: "none",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/friendlist")}
                  >
                    Friend List
                  </button>
                </li>
                <li style={{ marginBottom: "15px" }}>
                  <button
                    style={{
                      background: "none",
                      color: "#fff",
                      border: "none",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/accounting")}
                  >
                    Split Bills
                  </button>
                </li>
                <li>
                  <button
                    style={{
                      background: "none",
                      color: "#fff",
                      border: "none",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/settings")}
                  >
                    Settings
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar Toggle Button */}
        <button
          style={{
            position: "fixed",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            background: "linear-gradient(to right, #6c5ce7, #74b9ff)",
            color: "#fff",
            border: "none",
            borderRadius: "20px 0 0 20px",
            padding: "10px 20px",
            cursor: "pointer",
            zIndex: 1050,
          }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "<" : ">"}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
