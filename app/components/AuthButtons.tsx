// components/Auth.tsx
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import "styles/global.css"

const AuthButtons = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <Link href="/profile" className="text-gray-800">
          <span>👤 {session.user?.name}</span>
        </Link>
        <button 
          className="bg-red-600 text-white px-4 py-2 rounded-md"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex space-x-4">
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={() => signIn()}
        >
          Login
        </button>
        <Link href="/register">
          <button className="bg-green-600 text-blue px-4 py-2 rounded-md">
            Sign Up
          </button>
        </Link>
      </div>
    );
  }
};

export default AuthButtons;
