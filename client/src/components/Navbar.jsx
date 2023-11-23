import React from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal"; 

const AppNavbar = () => {

  return (
    <div className="navbar bg-accent shadow-2xl">
      <div className="flex-1">
        <a className="text-3xl text-primary pl-20">foodpanda</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-primary text-xl pr-20">
          <li>
            <a onClick={() => document.getElementById('login-modal').showModal()}>Log in</a>
          </li>
          <li>
            <a onClick={() => document.getElementById('signup-modal').showModal()}>Sign up</a>
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

      <dialog id="login-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Login to FoodPanda</h3>
          <LoginModal />
          <div className="modal-action">
            <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="signup-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Sign Up to FoodPanda</h3>
          <SignupModal />
          <div className="modal-action">
            <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AppNavbar;
