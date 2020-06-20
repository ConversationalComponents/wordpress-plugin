import React from "react";

export const ShowJsonButton = (p: { onClick: () => void }) => {
  return (
    <div
      onClick={p.onClick}
      style={{
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column",
        marginLeft: "6px",
        marginBottom: "12px"
      }}
    >
      <div
        style={{
          display: "flex",
          color: "white",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#9c27b0",
          borderRadius: "50%",
          cursor: "pointer",
          width: "24px",
          height: "24px"
        }}
      >
        <svg style={{ width: "17px", height: "17px" }} viewBox="0 0 24 24">
          <path
            fill="white"
            d="M5,3H7V5H5V10A2,2 0 0,1 3,12A2,2 0 0,1 5,14V19H7V21H5C3.93,20.73 3,20.1 3,19V15A2,2 0 0,0 1,13H0V11H1A2,2 0 0,0 3,9V5A2,2 0 0,1 5,3M19,3A2,2 0 0,1 21,5V9A2,2 0 0,0 23,11H24V13H23A2,2 0 0,0 21,15V19A2,2 0 0,1 19,21H17V19H19V14A2,2 0 0,1 21,12A2,2 0 0,1 19,10V5H17V3H19M12,15A1,1 0 0,1 13,16A1,1 0 0,1 12,17A1,1 0 0,1 11,16A1,1 0 0,1 12,15M8,15A1,1 0 0,1 9,16A1,1 0 0,1 8,17A1,1 0 0,1 7,16A1,1 0 0,1 8,15M16,15A1,1 0 0,1 17,16A1,1 0 0,1 16,17A1,1 0 0,1 15,16A1,1 0 0,1 16,15Z"
          />
        </svg>
      </div>
    </div>
  );
};
