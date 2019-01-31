import React from "react";

const Footer = () => {
  return (
    <nav className={"navbar is-light is-fixed-bottom"}>
      <div className={"navbar-brand"} />
      <div className={"navbar-menu"}>
        <div className={"navbar-end"}>
          <div className={"navbar-item"}>
            <p>
              Built by the Center for Interdisciplinary Digital Research (CIDR)
              at Stanford Libraries.
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Footer;
