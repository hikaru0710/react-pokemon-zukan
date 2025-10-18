// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Header: React.FC = () => {
  return (
    <header className="gradient-pokemon text-white p-6 shadow-pokemon">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold">
          <Link to="/" className="inline-flex items-center gap-3 text-white no-underline hover-glow transition-all duration-300">
            <img 
              src={logo} 
              alt="モンスターボールのアイコン" 
              className="w-12 h-12 animate-pokeball"
            />
            <span className="text-gradient-white">ポケモン図鑑</span>
          </Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;

