
import { useEffect, useState } from 'react';
import { userSession, authenticate, getUserData, signout } from './lib/stacks';
// import { openContractCall } from '@stacks/connect'; // Will be used for minting

function App() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setUserData(getUserData());
    } else if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((pd) => {
        setUserData(pd);
      });
    }
  }, []);

  const handleConnect = () => {
    authenticate();
  };

  const handleDisconnect = () => {
    signout();
  };

  return (
    <div className="app-container">
      <header className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="title">Le Baguette</h1>
        {userData ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>{userData.profile?.stxAddress?.mainnet || userData.profile?.stxAddress?.testnet}</span>
            <button onClick={handleDisconnect} style={{ background: '#ff4444' }}>Disconnect</button>
          </div>
        ) : (
          <button onClick={handleConnect}>Connect Wallet</button>
        )}
      </header>

      <main className="glass-panel">
        <h2>Bienvenue to the Artisan Bakery</h2>
        <p>Mint your unique digital Baguette. Crispy, chewy, and forever on the blockchain.</p>

        <div style={{ padding: '2rem', textAlign: 'center' }}>
          {/* Minting Logic Placeholders */}
          <div style={{
            width: '200px',
            height: '300px',
            background: '#2a2a2a',
            margin: '0 auto',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            🥖
          </div>

          {userData ? (
            <button onClick={() => alert('Mint feature coming in next micro-commit!')}>
              Mint Fresh Baguette (0.5 STX)
            </button>
          ) : (
            <p style={{ opacity: 0.7 }}>Connect wallet to start baking.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
