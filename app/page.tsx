"use client";
import { useState, useEffect } from 'react';
import { AppConfig, UserSession, showConnect, openContractCall } from '@stacks/connect';
import { StacksMainnet } from '@stacks/network';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const appConfig = new AppConfig(['store_write']);
  const userSession = new UserSession({ appConfig });

  useEffect(() => { setMounted(true); }, []);

  const connect = () => {
    showConnect({
      appDetails: { name: 'Stacks Lottery', icon: 'https://cryptologos.cc/logos/stacks-stx-logo.png' },
      onFinish: () => { window.location.reload(); },
      userSession
    });
  };

  const mint = async () => {
    await openContractCall({
      network: new StacksMainnet(),
      contractAddress: 'SP1AJVMEGSMD6QCSZ1669Z5G90GEHVK2MEM7J0AHH',
      contractName: 'lottery-nft',
      functionName: 'mint',
      functionArgs: [],
      onFinish: (data) => alert("Transacción enviada: " + data.txId),
    });
  };

  if (!mounted) return null;

  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#fbbf24', fontSize: '3rem' }}>STX Lottery</h1>
      {!userSession.isUserSignedIn() ? (
        <button onClick={connect} style={{ background: '#ea580c', padding: '15px 30px', borderRadius: '10px', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
          Conectar Wallet
        </button>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p>Wallet: {userSession.loadUserData().profile.stxAddress.mainnet.slice(0,10)}...</p>
          <div style={{ background: 'white', color: 'black', padding: '40px', borderRadius: '20px', margin: '20px', border: '5px dashed #fbbf24' }}>
            <h2 style={{ fontSize: '4rem', margin: 0 }}>#???</h2>
            <p>TU NÚMERO DE LA SUERTE</p>
          </div>
          <button onClick={mint} style={{ background: '#16a34a', padding: '20px 40px', borderRadius: '50px', border: 'none', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer' }}>
            MINTEAR NFT
          </button>
        </div>
      )}
    </div>
  );
}
