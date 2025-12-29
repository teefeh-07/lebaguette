import { useState, useEffect } from 'react';

export function useInterval() {
  const [data, setData] = useState(null);
  return { data, setData };
}
