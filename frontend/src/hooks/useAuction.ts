import { useState, useEffect } from 'react';

export function useAuction() {
  const [data, setData] = useState(null);
  return { data, setData };
}
