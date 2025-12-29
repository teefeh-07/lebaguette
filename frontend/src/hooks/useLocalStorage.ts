import { useState, useEffect } from 'react';

export function useLocalStorage() {
  const [data, setData] = useState(null);
  return { data, setData };
}
