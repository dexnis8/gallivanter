/* eslint-disable react/prop-types */
// UserCard.js
// import React from 'react';

function UserCard({ imageUrl, message, name, role }) {
  return (
    <div className="mr-5 bg-white flex align-middle justify-center text-center flex-col shadow-xl">
      <img src={imageUrl} alt="" />
      <p className="mt-2">{message}</p>
      <p className="mt-2 text-[#23A6F0]">{name}</p>
      <p className="font-medium">{role}</p>
    </div>
  );
}

export default UserCard;
