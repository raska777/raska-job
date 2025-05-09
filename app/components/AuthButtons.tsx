

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import "styles/authbutton.css"
const AuthButtons = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="raskajob-auth-container">
        <div className="raskajob-auth-loading"></div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="raskajob-auth-container">
        <Link href="/profile" className="raskajob-profile-link">
          <span>👤 {session.user?.name}</span>
        </Link>
        <button 
          className="raskajob-auth-button raskajob-logout-button"
          onClick={() => signOut()}
        >
          로그아웃
        </button>
      </div>
    );
  } else {
    return (
      <div className="raskajob-auth-container">
        <button 
          className="raskajob-auth-button raskajob-login-button"
          onClick={() => signIn()}
        >
          로그인
        </button>
        {/* <Link href="/register">
          <button className="raskajob-auth-button raskajob-signup-button">
          회원가입
          </button>
        </Link> */}
      </div>
    );
  }
};

export default AuthButtons;