"use client";

import { useState } from "react";

export default function ClockApp() {
  const [totalHours, setTotalHours] = useState(0);
  const [isAutomating, setIsAutomating] = useState(false);

  const incrementHour = () => {
    if (isAutomating) return;
    setTotalHours((prev) => prev + 1);
  };

  const decrementHour = () => {
    if (isAutomating) return;
    setTotalHours((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const startDayAutomation = () => {
    if (isAutomating) return;
    setIsAutomating(true);

    let advanceCount = 0;
    const interval = setInterval(() => {
      setTotalHours((prev) => prev + 1);
      advanceCount++;

      if (advanceCount >= 24) {
        clearInterval(interval);
        setIsAutomating(false);
      }
    }, 150);
  };

  const currentDay = Math.floor(totalHours / 24) + 1;
  const hours24 = totalHours % 24;
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const hourAngle = hours12 * 30;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>とけいと ひづけの おべんきょう</h1>

      {/* 画面サイズに合わせて伸縮するSVG時計 */}
      <div style={styles.clockWrapper}>
        <svg width="100%" height="100%" viewBox="0 0 200 200" style={styles.clock}>
          <circle cx="100" cy="100" r="95" fill="#ffffff" stroke="#333333" strokeWidth="6" />

          {/* 文字盤の数字 */}
          {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
            const angle = i * 30 * (Math.PI / 180);
            const x = 100 + 72 * Math.sin(angle);
            const y = 100 - 72 * Math.cos(angle);
            return (
              <text key={num} x={x} y={y} fontSize="16" fontWeight="bold" textAnchor="middle" dominantBaseline="central" fill="#333333">
                {num}
              </text>
            );
          })}

          {/* 文字盤の目盛り */}
          {[...Array(12)].map((_, i) => (
            <line key={i} x1="100" y1="12" x2="100" y2="20" stroke="#666666" strokeWidth="3" transform={`rotate(${i * 30} 100 100)`} />
          ))}

          {/* 短針（時針） */}
          <line
            x1="100" y1="100" x2="100" y2="55"
            stroke="#ff4d4d" strokeWidth="8" strokeLinecap="round"
            transform={`rotate(${hourAngle} 100 100)`}
            style={{ transition: isAutomating ? "transform 0.1s linear" : "transform 0.3s ease-in-out" }}
          />

          {/* 長針（分針） */}
          <line x1="100" y1="100" x2="100" y2="30" stroke="#333333" strokeWidth="5" strokeLinecap="round" />

          {/* 中心軸 */}
          <circle cx="100" cy="100" r="6" fill="#333333" />
        </svg>
      </div>

      {/* 日付と時刻の表記 */}
      <div style={styles.infoDisplay}>
        <div style={styles.dateText}>1がつ {currentDay}にち</div>
        <div style={styles.timeWrapper}>
          <div style={styles.time12}>
            <span style={styles.label}>12じかん：</span>
            {hours24 < 12 ? "ごぜん" : "ごご"} {hours12}じ
          </div>
          <div style={styles.time24}>
            <span style={styles.label}>24じかん：</span>
            {hours24}じ
          </div>
        </div>
      </div>

      {/* 操作ボタン */}
      <div style={styles.buttonContainer}>
        <button 
          onClick={startDayAutomation} 
          disabled={isAutomating} 
          style={isAutomating ? styles.buttonDisabled : styles.buttonAutomate}
        >
          {isAutomating ? "すすんでいるよ..." : "1にち すすむ"}
        </button>

        <div style={styles.buttonGroup}>
          <button onClick={decrementHour} disabled={isAutomating} style={styles.button}>
            -1じかん
          </button>
          <button onClick={incrementHour} disabled={isAutomating} style={styles.buttonPrimary}>
            +1じかん
          </button>
        </div>
      </div>
    </div>
  );
}

// スタイル
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "sans-serif",
    padding: "24px",
    backgroundColor: "#f9f9f9",
    borderRadius: "24px",
    width: "90vw",
    maxWidth: "600px",
    margin: "20px auto",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "28px",
    color: "#2c3e50",
    marginBottom: "20px",
    textAlign: "center",
  },
  clockWrapper: {
    width: "100%",
    maxWidth: "450px", 
    aspectRatio: "1 / 1",
    marginBottom: "16px",
  },
  clock: {
    filter: "drop-shadow(0px 6px 8px rgba(0,0,0,0.12))",
  },
  infoDisplay: {
    textAlign: "center",
    margin: "16px 0 20px",
    backgroundColor: "#ffffff",
    padding: "16px 24px",
    borderRadius: "12px",
    border: "2px solid #e0e0e0",
    width: "100%",
    boxSizing: "border-box",
  },
  dateText: {
    fontSize: "22px",
    color: "#555",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  timeWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    alignItems: "center",
  },
  time12: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#ff4d4d",
  },
  time24: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  label: {
    fontSize: "18px",
    color: "#7f8c8d",
    fontWeight: "normal",
    marginRight: "4px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "100%",
  },
  buttonAutomate: {
    width: "100%",
    padding: "18px 0",
    fontSize: "22px",
    cursor: "pointer",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    boxShadow: "0 4px 6px rgba(76, 175, 80, 0.3)",
    transition: "background 0.2s",
  },
  buttonDisabled: {
    width: "100%",
    padding: "18px 0",
    fontSize: "22px",
    backgroundColor: "#b0bec5",
    color: "#eceff1",
    border: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    cursor: "not-allowed",
  },
  buttonGroup: {
    display: "flex",
    gap: "16px",
    width: "100%",
  },
  button: {
    flex: 1,
    padding: "16px 0",
    fontSize: "20px",
    cursor: "pointer",
    backgroundColor: "#ffffff",
    border: "2px solid #ddd",
    borderRadius: "12px",
    fontWeight: "bold",
    transition: "background 0.2s",
  },
  buttonPrimary: {
    flex: 1,
    padding: "16px 0",
    fontSize: "20px",
    cursor: "pointer",
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    boxShadow: "0 4px 6px rgba(255, 77, 77, 0.3)",
    transition: "background 0.2s",
  },
};
