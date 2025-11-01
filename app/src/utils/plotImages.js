// Array de nombres de imágenes disponibles
const plotImages = [
  '/parcela1.png',
  '/parcela2.png',
  '/parcela3.png',
  '/parcela4.png',
  '/parcela6.png',
  '/parcela7.png'
];

// Función para obtener una imagen aleatoria
export const getRandomPlotImage = () => {
  const randomIndex = Math.floor(Math.random() * plotImages.length);
  return plotImages[randomIndex];
};

// Cache de imágenes asignadas (para mantener consistencia durante la sesión)
const imageCache = new Map();

// Función para obtener o asignar una imagen a una parcela
export const getPlotImage = (plotId) => {
  if (!imageCache.has(plotId)) {
    imageCache.set(plotId, getRandomPlotImage());
  }
  return imageCache.get(plotId);
};