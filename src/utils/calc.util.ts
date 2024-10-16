// calcUtils.ts

// Función para obtener la mediana de un arreglo de números
export const obtenerMediana = (valores: number[]): number => {
  const ordenados = [...valores].sort((a, b) => a - b); // Ordenar como números
  const mitad =
    ordenados.length === 1
      ? 0
      : ordenados.length % 2 === 0
      ? Math.floor(ordenados.length / 2)
      : Math.floor((ordenados.length + 1) / 2);
  return ordenados[mitad];
};
