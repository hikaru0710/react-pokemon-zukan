// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 text-center p-6 mt-auto border-t border-gray-200">
      <div className="container mx-auto">
        <p className="text-gray-600 font-medium">
          &copy; 2024 Reactポケモン図鑑 - 
          <span className="text-brand ml-1">PokeAPI</span>を使用
        </p>
        <p className="text-sm text-gray-500 mt-2">
          すべてのポケモンに関する情報は任天堂・クリーチャーズ・ゲームフリークに帰属します
        </p>
      </div>
    </footer>
  );
};

export default Footer;

