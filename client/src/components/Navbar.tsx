import React, { useCallback, useRef } from "react";
import { Modal, Button } from 'react-daisyui'
import LoginModal from "./LoginModal";

const AppNavbar = () => {
  const loginRef = useRef<HTMLDialogElement>(null);
  const handleShow = useCallback(() => {
    loginRef.current?.showModal();
  }, [loginRef]);


  return (
    <div className="navbar bg-accent shadow-2xl">
      <div className="flex-1">
        <a className="text-3xl text-primary pl-20">foodpanda</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-primary text-xl pr-20">
          <li>
            <a onClick={handleShow}>Log in</a>
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

      <Modal ref={loginRef}>
        <Modal.Header className="font-bold">Login to FoodPanda!</Modal.Header>
        <Modal.Body>
          <LoginModal />
        </Modal.Body>
        <Modal.Actions>
          <form method="dialog">
            <Button>Close</Button>
          </form>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default AppNavbar;
