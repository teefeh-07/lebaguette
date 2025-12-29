import { useState } from "react";
export function useWallet() { const [connected, setConnected] = useState(false); return { connected, setConnected }; }
