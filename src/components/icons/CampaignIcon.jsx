import React from "react";

const CampaignIcon = ({ size = 32, color = "black", active = false }) => {
  if (active) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 14 13"
        fill="none"
      >
        <path
          d="M13.2775 4.58371L7.2775 0.583709C7.19533 0.528889 7.09877 0.499634 7 0.499634C6.90123 0.499634 6.80467 0.528889 6.7225 0.583709L0.7225 4.58371C0.654007 4.62941 0.597859 4.69131 0.559044 4.76393C0.520228 4.83654 0.499947 4.91762 0.5 4.99996V11.5C0.5 11.7652 0.605357 12.0195 0.792893 12.2071C0.98043 12.3946 1.23478 12.5 1.5 12.5H12.5C12.7652 12.5 13.0196 12.3946 13.2071 12.2071C13.3946 12.0195 13.5 11.7652 13.5 11.5V4.99996C13.5001 4.91762 13.4798 4.83654 13.441 4.76393C13.4021 4.69131 13.346 4.62941 13.2775 4.58371ZM5.045 8.49996L1.5 11V5.97058L5.045 8.49996ZM6.06812 8.99996H7.93188L11.4712 11.5H2.52875L6.06812 8.99996ZM8.955 8.49996L12.5 5.97058V11L8.955 8.49996Z"
          fill="#6E30B0"
        />
      </svg>
    );
  }
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
      >
        <path
          d="M28.555 11.1674L16.555 3.16742C16.3907 3.05778 16.1975 2.99927 16 2.99927C15.8025 2.99927 15.6093 3.05778 15.445 3.16742L3.445 11.1674C3.30801 11.2588 3.19572 11.3826 3.11809 11.5279C3.04046 11.6731 2.99989 11.8352 3 11.9999V24.9999C3 25.5304 3.21071 26.0391 3.58579 26.4141C3.96086 26.7892 4.46957 26.9999 5 26.9999H27C27.5304 26.9999 28.0391 26.7892 28.4142 26.4141C28.7893 26.0391 29 25.5304 29 24.9999V11.9999C29.0001 11.8352 28.9595 11.6731 28.8819 11.5279C28.8043 11.3826 28.692 11.2588 28.555 11.1674ZM12.09 18.9999L5 23.9999V13.9412L12.09 18.9999ZM14.1362 19.9999H17.8638L24.9425 24.9999H7.0575L14.1362 19.9999ZM19.91 18.9999L27 13.9412V23.9999L19.91 18.9999ZM16 5.20117L26.2388 12.0274L17.8638 17.9999H14.1388L5.76375 12.0274L16 5.20117Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default CampaignIcon;