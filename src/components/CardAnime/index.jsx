import React from 'react';
import Image from 'next/image';

const CardAnime = ({ anime }) => {
  const {
    id,
    title,
    description,
    rating,
    imageUrl
  } = anime;

  // Função para formatar a descrição se for muito longa
  const truncateDescription = (text, maxLength = 120) => {
    if (!text) return 'Descrição não disponível';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  // Função para renderizar as estrelas do rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Estrelas cheias
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-400 text-lg">★</span>
      );
    }
    
    // Meia estrela
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 text-lg">☆</span>
      );
    }
    
    // Estrelas vazias para completar 5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-400 text-lg">☆</span>
      );
    }
    
    return stars;
  };

  return (
    <div className="group w-[350px] relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-red-400/50">
      {/* Imagem do anime */}
      <div className="relative h-64 w-full overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="object-cover group-hover:scale-110 transition-transform duration-300 w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
            <span className="text-gray-400 text-4xl">🎬</span>
          </div>
        )}
        
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
        
        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <span className="text-yellow-400 text-sm font-semibold">{rating?.toFixed(1) || 'N/A'}</span>
          <span className="text-yellow-400 text-xs">★</span>
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="p-6">
        {/* Título */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-red-400 transition-colors duration-300">
          {title || 'Título não disponível'}
        </h3>
        
        {/* Descrição */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {truncateDescription(description)}
        </p>
        
        {/* Rating com estrelas */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            {renderStars(rating || 0)}
          </div>
          <span className="text-gray-400 text-sm">
            {rating ? `${rating.toFixed(1)}/10` : 'Sem avaliação'}
          </span>
        </div>
        
        {/* Botão de ação */}
        <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 shadow-lg hover:shadow-xl">
          Ver Detalhes
        </button>
      </div>

      {/* Efeito de brilho no hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default CardAnime;
