// src/pages/PokemonDetail.tsx
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchPokemonDetail } from '../api/pokemonDetail.ts';
import PokemonTypeLabel from '../components/PokemonTypeLabel.tsx';
import { apiQueryKeys } from '../queryKeys.ts';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: [apiQueryKeys.pokemon.detail(Number(id))],
    queryFn: () => fetchPokemonDetail(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    console.log(data);
  }, [data])

  if (isLoading) return <PokemonDetailSkeleton />;
  if (error instanceof Error) return <div className="p-4 text-center text-red-600 font-medium">エラー: {error.message}</div>;
  if (!data) return <div className="p-4 text-center text-gray-600">ポケモンが見つかりません</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <Link to="/" className="btn-primary mb-6 inline-flex items-center space-x-2 hover-glow">
          <span>← 一覧に戻る</span>
        </Link>
        
        <div className="pokemon-detail-container hover-glow">
          <img src={data.image} alt={data.japaneseName} className="pokemon-detail-image" />
          <h1 className="pokemon-detail-title text-gradient">
            {data.japaneseName} 
            <span className="text-lg text-gray-500 font-normal">#{data.id}</span>
          </h1>
          <p className="pokemon-detail-description">{data.description}</p>
          
          {/* タイプ表示 */}
          <div className="flex justify-center gap-3 mb-6">
            {data?.types?.map((type: string) => (
              <PokemonTypeLabel key={type} type={type} />
            ))}
          </div>
          
          {/* 特性表示 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">特性</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {data?.abilities?.map((ability: string) => (
                <span key={ability} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                  {ability}
                </span>
              ))}
            </div>
          </div>
          
          {/* 種族値表示 */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">種族値</h3>
            <div className="space-y-3">
              {data?.baseStats?.map((stat: { name: string; value: number }) => (
                <div key={stat.name} className="stat-bar-container">
                  <span className="stat-bar-label">{stat.name}</span>
                  <div className="stat-bar">
                    <div
                      className="stat-bar-fill bg-gradient-to-r from-brand to-brand-dark"
                      style={{ width: `${(stat.value / 255) * 100}%` }}
                    ></div>
                  </div>
                  <span className="stat-bar-value">{stat.value}</span>
                </div>
              ))}
              
              {/* 合計種族値 */}
              <div className="stat-bar-container border-t pt-3 mt-4">
                <span className="stat-bar-label font-bold">合計</span>
                <div className="stat-bar">
                  <div
                    className="stat-bar-fill bg-gradient-to-r from-pokemon-red to-brand"
                    style={{ width: `${(data?.baseStats?.reduce((sum: number, stat: { name: string; value: number }) => sum + stat.value, 0) / 780) * 100}%` }}
                  ></div>
                </div>
                <span className="stat-bar-value font-bold">
                  {data?.baseStats?.reduce((sum: number, stat: { name: string; value: number }) => sum + stat.value, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* ナビゲーションボタン */}
        <div className="mt-6 flex justify-between">
          {Number(id) !== 1 ? (
            <Link to={`/pokemon/${Number(id) - 1}`} className="btn-secondary hover-lift">
              ← 前へ
            </Link>
          ) : (
            <div></div>
          )}
          <Link to={`/pokemon/${Number(id) + 1}`} className="btn-secondary hover-lift">
            次へ →
          </Link>
        </div>
      </div>
    </div>
  );
};

const PokemonDetailSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Skeleton width={120} height={48} className="rounded-xl" />
        </div>
        
        <div className="pokemon-detail-container">
          <Skeleton circle={true} width={192} height={192} className="mx-auto mb-4" />
          <Skeleton width={200} height={32} className="mx-auto mb-2" />
          <Skeleton width={300} height={60} className="mx-auto mb-6" />
          
          {/* タイプスケルトン */}
          <div className="flex justify-center gap-3 mb-6">
            <Skeleton width={80} height={32} className="rounded-full" />
            <Skeleton width={80} height={32} className="rounded-full" />
          </div>
          
          {/* 特性スケルトン */}
          <div className="mb-6">
            <Skeleton width={100} height={24} className="mx-auto mb-3" />
            <div className="flex justify-center gap-2">
              <Skeleton width={80} height={28} className="rounded-lg" />
              <Skeleton width={80} height={28} className="rounded-lg" />
            </div>
          </div>
          
          {/* ステータススケルトン */}
          <div className="mb-4">
            <Skeleton width={100} height={24} className="mx-auto mb-4" />
            <div className="space-y-3">
              {[...Array(7)].map((_, index) => (
                <div key={index} className="stat-bar-container">
                  <Skeleton width={60} height={20} />
                  <div className="flex-1 mx-3">
                    <Skeleton height={12} className="rounded-full" />
                  </div>
                  <Skeleton width={32} height={20} />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* ナビゲーションスケルトン */}
        <div className="mt-6 flex justify-between">
          <Skeleton width={80} height={40} className="rounded-lg" />
          <Skeleton width={80} height={40} className="rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;