"use client";

import { useState } from "react";

export default function ClockApp() {
  // 通算時間のステート（1月1日 午前0時 = 0時間 からスタート）
  const [totalHours, setTotalHours] = useState(0);

  // 1時間進める
  const incrementHour = () => {
    setTotalHours((prev) => prev + 1);
  };

  // 1時間戻す
  const decrementHour = () => {
    setTotalHours((prev) => (prev > 0 ? prev - 1 : 0));
  };

  // 通算時間から日付、24時間制の「時」、12時間制の「短針の角度」を計算
  const currentDay = Math.floor(totalHours / 24) + 1; // 1日目 = 1月1日
  const hours24 = totalHours % 24;                    // 0〜23時（24時間表示用）
  
  // 文字盤表示のための12時間制（0時は12時と表記）
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const hourAngle = hours12 * 30;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>とけいと ひづけの おべんきょう</h1>

      {/* SVGによるアナログ時計の描画 */}
      <svg width="300" height="300" viewBox="0 0 200 200" style={styles.clock}>
        {/* 外枠 */}
        <circle cx="100" cy="100" r="95" fill="#ffffff" stroke="#333333" strokeWidth="6" />

        {/* 文字盤の数字 */}
        {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
          const angle = i * 30 * (Math.PI / 180);
          const x = 100 + 72 * Math.sin(angle);
          const y = 100 - 72 * Math.cos(angle);
          return (
            <text
              key={num}
              x={x}
              y={y}
              fontSize="16"
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#333333"
            >
              {num}
            </text>
          );
        })}

        {/* 文字盤の目盛り */}
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="12"
            x2="100"
            y2="20"
            stroke="#666666"
            strokeWidth="3"
            transform={`rotate(${i * 30} 100 100)`}
          />
        ))}

        {/* 短針（時針） */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="55"
          stroke="#ff4d4d"
          strokeWidth="8"
          strokeLinecap="round"
          transform={`rotate(${hourAngle} 100 100)`}
          style={{ transition: "transform 0.3s ease-in-out" }}
        />

        {/* 長針（分針） - 今回は0分固定 */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="30"
          stroke="#333333"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* 中心軸 */}
        <circle cx="100" cy="100" r="6" fill="#333333" />
      </svg>

      {/* 日付と時刻の表記（ひらがな） */}
      <div style={styles.infoDisplay}>
        <div style={styles.dateText}>1がつ {currentDay}にち</div>
        <div style={styles.timeText}>
          {hours24 < 12 ? "ごぜん" : "ごご"} {hours24}じ
        </div>
      </div>

      {/* 操作ボタン */}
      <div style={styles.buttonGroup}>
        <button onClick={decrementHour} style={styles.button}>
          -1じかん
        </button>
        <button onClick={incrementHour} style={styles.buttonPrimary}>
          +1じかん
        </button>
      </div>
    </div>
  );
}

// スタイル定義
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "sans-serif",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "16px",
    maxWidth: "400px",
    margin: "40px auto",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "22px",
    color: "#2c3e50",
    marginBottom: "16px",
  },
  clock: {
    filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.1))",
  },
  infoDisplay: {
    textAlign: "center",
    margin: "20px 0 16px",
    backgroundColor: "#ffffff",
    padding: "12px 32px",
    borderRadius: "8px",
    border: "2px solid #e0e0e0",
    width: "100%",
    boxSizing: "border-box",
  },
  dateText: {
    fontSize: "18px",
    color: "#555",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  timeText: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ff4d4d",
  },
  buttonGroup: {
    display: "flex",
    gap: "16px",
    width: "100%",
  },
  button: {
    flex: 1,
    padding: "12px 0",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#ffffff",
    border: "2px solid #ddd",
    borderRadius: "8px",
    fontWeight: "bold",
    transition: "background 0.2s",
  },
  buttonPrimary: {
    flex: 1,
    padding: "12px 0",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    boxShadow: "0 4px 6px rgba(255, 77, 77, 0.3)",
    transition: "background 0.2s",
  },
};
