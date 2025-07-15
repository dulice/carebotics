import React from "react";

const Footer = () => {
  const date = new Date();
  return (
    <div className="border-t p-2 text-center shadow">
      Copyright &copy; {date.getFullYear()} - Carebotics all rights and reserved
    </div>
  );
};

export default Footer;
