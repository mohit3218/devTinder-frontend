import React from "react";

export const Footer = () => {
  return (
    <footer className="footer bg-base-300 text-neutral-content p-4 fixed bottom-0">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by ACME
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
};
