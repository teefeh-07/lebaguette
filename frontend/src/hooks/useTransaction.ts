import { useState, useEffect } from 'react';

export function useTransaction() {
  const [data, setData] = useState(null);
  return { data, setData };
}
