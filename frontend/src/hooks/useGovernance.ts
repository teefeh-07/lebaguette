import { useState, useEffect } from 'react';

export function useGovernance() {
  const [data, setData] = useState(null);
  return { data, setData };
}
