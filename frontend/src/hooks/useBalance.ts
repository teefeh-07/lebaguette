import { useState, useEffect } from 'react';

export function useBalance() {
  const [data, setData] = useState(null);
  return { data, setData };
}
