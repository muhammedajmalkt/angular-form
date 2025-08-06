'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error( err);
      }
    }
  }, []);

console.log(user);

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link href="/">MyApp</Link>
        </div>
        <div className="space-x-4">
          <Link href="/" className="hover:text-indigo-300">Home</Link>
          {user ? (
            <>
              <Link href="/dashboard" className="hover:text-indigo-300">Dashboard</Link>
              <Link href="/login" className="hover:text-red-300">👨🏻<span>{user.username}</span></Link>
            </>
          ) : (
            <Link href="/login" className="hover:text-indigo-300">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
