import React from "react";

function CPspinnerLoader({
  size = 30,
  color = "#00AEEF",
}: {
  size?: number;
  color?: string;
}) {
  const borderwidth = (6 * size) / 60;
  const borderColor = `${color}1A`;
  const borderColorActive = `${color}CC`;
  return (
    <div className="spin_container">
      <div
        className="spinner"
        style={{
          height: size,
          width: size,
          borderWidth: borderwidth,
          borderColor: borderColor,
          borderTopColor: borderColorActive,
        }}
      ></div>
    </div>
  );
}

export default CPspinnerLoader;
