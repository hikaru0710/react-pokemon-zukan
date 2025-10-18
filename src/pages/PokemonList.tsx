// src/pages/PokemonList.tsx
import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { apiQueryKeys } from '../queryKeys.ts';
import { fetchPokemonListWithJapaneseNames, type PokemonWithJapaneseName } from '../api/pokemonWithJapaneseName.ts';
import PokemonCard from '../components/PokemonCard.tsx';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PokemonList: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [apiQueryKeys.pokemon.list()],
    queryFn: ({ pageParam = 0 }) => fetchPokemonListWithJapaneseNames(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.next) {
        return pages.length * 20;
      }
      return undefined;
    },
  });

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <PokemonListSkeleton />;
  if (status === 'error') return <div>エラーが発生しました</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto">
        <div className="responsive-grid">
          {data?.pages.map((page) =>
            page.results.map((pokemon: PokemonWithJapaneseName) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))
          )}
        </div>
        <div ref={loadMoreRef} className="loading-container">
          {isFetchingNextPage ? (
            <div className="flex items-center space-x-2">
              <Loader />
              <span className="text-gray-600 font-medium">読み込み中...</span>
            </div>
          ) : hasNextPage ? (
            <div className="text-gray-500 font-medium">続きを読み込む</div>
          ) : (
            <div className="text-gray-400 font-medium">すべてのポケモンを表示しました</div>
          )}
        </div>
      </div>
    </div>
  );
};

// ローダーコンポーネント
const Loader: React.FC = () => (
  <div className="loading-spinner"></div>
);

const PokemonListSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto">
        <div className="responsive-grid">
          {[...Array(18)].map((_, index) => (
            <div key={index} className="skeleton-card">
              <Skeleton height={120} />
              <Skeleton width={80} height={20} className="mt-2" />
              <Skeleton width={100} height={16} className="mt-1" />
            </div>
          ))}
        </div>
        <div className="loading-container">
          <Skeleton width={100} height={20} />
        </div>
      </div>
    </div>
  );
};

export default PokemonList;

