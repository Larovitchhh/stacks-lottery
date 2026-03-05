"use client";
import { useState, useEffect } from 'react';
import { AppConfig, UserSession, showConnect, openContractCall } from '@stacks/connect';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const appConfig = new AppConfig(['store_write']);
  const userSession = new UserSession({ appConfig });

  useEffect(() => { setMounted(true); }, []);

  const connect = () => {
    showConnect({
      appDetails: { 
        name: 'Stacks Lottery', 
        icon: 'https://cryptologos.cc/logos/stacks-stx-logo.png' 
      },
      userSession,
      onFinish: () => { window.location.reload(); }
    });
  };

  const mint = async () => {
    await openContractCall({
      contractAddress: 'SP1AJVMEGSMD6QCSZ1669Z5G90GEHVK2MEM7J0AHH',
      contractName: 'lottery-nft',
      functionName: 'mint',
      functionArgs: [],
      onFinish: (data: any) => alert("Transacción enviada: " + data.txId),
    });
  };

  if (!mounted) return null;

  return (
    <div style={{ color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#fbbf24', fontSize: '2.5rem' }}>STX Lottery</h1>
      
      {!userSession.isUserSignedIn() ? (
        <button onClick={connect} style={{ background: '#ea580c', padding: '15px 30px', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
          Conectar Wallet
        </button>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#22c55e' }}>Conectado: {userSession.loadUserData().profile.stxAddress.mainnet.slice(0,8)}...</p>
          <div style={{ background: 'white', color: 'black', padding: '40px', borderRadius: '20px', border: '5px dashed #fbbf24', margin: '20px 0' }}>
            <h2 style={{ fontSize: '4rem', margin: 0 }}>#???</h2>
            <p style={{ fontWeight: 'bold', color: '#64748b' }}>TICKET DE LOTERÍA</p>
          </div>
          <button onClick={mint} style={{ background: '#16a34a', padding: '20px 40px', color: 'white', border: 'none', borderRadius: '50px', fontSize: '1.4rem', fontWeight: 'bold', cursor: 'pointer' }}>
            MINTEAR AHORA
          </button>
        </div>
      )}
    </div>
  );
}
