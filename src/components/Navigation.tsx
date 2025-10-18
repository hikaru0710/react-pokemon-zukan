// src/components/Navigation.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  const pathname = window.location.pathname;

  return (
    <nav className="nav-container">
      <div className="container mx-auto px-4 py-3">
        <ul className="flex space-x-6">
          <li>
            <Link 
              to="/" 
              className={`nav-link ${pathname === '/' ? 'nav-link-active' : ''}`}
            >
              ホーム
            </Link>
          </li>
          {/* 詳細画面の場合は戻るボタンを表示 */}
          {pathname !== '/' && (
            <li>
              <Link 
                to="/" 
                className="nav-link"
              >
                ← 一覧に戻る
              </Link>
            </li>
          )}
          {/* 追加のナビゲーションリンクをここに記載 */}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;

