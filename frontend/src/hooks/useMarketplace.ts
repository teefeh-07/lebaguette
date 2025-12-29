import { useState, useEffect } from 'react';

export function useMarketplace() {
  const [data, setData] = useState(null);
  return { data, setData };
}
