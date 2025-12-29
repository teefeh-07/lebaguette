import { useState, useEffect } from 'react';

export function useProfile() {
  const [data, setData] = useState(null);
  return { data, setData };
}
