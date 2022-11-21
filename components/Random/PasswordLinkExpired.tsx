import Link from "next/link";
import React from "react";

function PasswordLinkExpired() {
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center text-center min-vh-100">
        <div>
          This password reset link has expired, please go back to
          <span style={{ color: "#922B21" }}>
            <b>
              <Link href="/"> Home </Link>
            </b>
          </span>
          or request for a new password reset link through the
          <span style={{ color: "#922B21" }}>
            <b>
              <Link href="/Auth/User/ChangePasswordPage">
                <span> Password reset page</span>
              </Link>
            </b>
          </span>
        </div>
      </div>
    </>
  );
}

export default PasswordLinkExpired;
