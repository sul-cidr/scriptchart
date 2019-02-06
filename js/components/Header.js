import React from "react";

class Header extends React.Component {
  render() {
    return (
      <nav className={"navbar"} role={"navigation"}>
        <div className={"navbar-brand"}>
          <h1 className={"title is-4"}>
            <a className={"navbar-item"} href={"."}>
              Digital Syriac Manuscripts
            </a>
          </h1>
        </div>

        <div className={"navbar-menu is-active"}>
          <div className={"navbar-start"}>
            <div className={"navbar-item has-dropdown is-hoverable"}>
              <a className={"navbar-link"} href=".">
                About
              </a>
              <div className={"navbar-dropdown"}>
                <a className={"navbar-item"} href={"."}>
                  Participants
                </a>{" "}
                <a className={"navbar-item"} href={"."}>
                  Publications
                </a>
              </div>
            </div>
            <a className={"navbar-item"} href=".">
              Results
            </a>
            <a className={"navbar-item"} href=".">
              Contact
            </a>
          </div>
          <div className={"navbar-end"}>
            <div className={"navbar-item"}>
              <button className={"button"} onClick={this.props.sidebarToggle}>
                Show/hide form
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
