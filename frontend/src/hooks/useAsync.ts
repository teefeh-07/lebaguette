import { useState, useEffect } from 'react';

export function useAsync() {
  const [data, setData] = useState(null);
  return { data, setData };
}
