import { useState, useEffect } from 'react';

export function useDebounce() {
  const [data, setData] = useState(null);
  return { data, setData };
}
