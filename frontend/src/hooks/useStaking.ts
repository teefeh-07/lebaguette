import { useState, useEffect } from 'react';

export function useStaking() {
  const [data, setData] = useState(null);
  return { data, setData };
}
