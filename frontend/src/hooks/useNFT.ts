import { useState, useEffect } from 'react';

export function useNFT() {
  const [data, setData] = useState(null);
  return { data, setData };
}
