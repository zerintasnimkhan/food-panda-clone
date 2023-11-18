import React from "react";

const AppNavbar = () => {
  return (
    <div className="navbar bg-accent shadow-2xl">
      <div className="flex-1">
        <a className="text-3xl text-primary pl-20">foodpanda</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-primary text-xl pr-20">
          <li>
            <a>Log in</a>
          </li>
          <li>
            <a>Sign up</a>
          </li>
          <li>
            <details>
              <summary>EN</summary>
              <ul className="bg-accent p-2">
                <li> 
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AppNavbar;
