"use client";

import { useState, useEffect } from 'react';
import { AppConfig, UserSession, showConnect, openContractCall } from '@stacks/connect';
import { StacksMainnet } from '@stacks/network';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  // Configuración de la sesión de usuario
  const appConfig = new AppConfig(['store_write']);
  const userSession = new UserSession({ appConfig });

  // Evita errores de hidratación en Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  const connectWallet = () => {
    showConnect({
      appDetails: {
        name: 'Stacks NFT Lottery',
        icon: 'https://cryptologos.cc/logos/stacks-stx-logo.png',
      },
      onFinish: () => {
        window.location.reload();
      },
      userSession,
    });
  };

  const disconnectWallet = () => {
    userSession.signUserOut();
    window.location.reload();
  };

  const mintTicket = async () => {
    const network = new StacksMainnet();
    
    await openContractCall({
      network,
      contractAddress: 'SP1AJVMEGSMD6QCSZ1669Z5G90GEHVK2MEM7J0AHH',
      contractName: 'lottery-nft',
      functionName: 'mint',
      functionArgs: [],
      onFinish: (data) => {
        console.log("Transacción enviada:", data);
        alert("¡Transacción enviada con éxito! TXID: " + data.txId);
      },
      onCancel: () => {
        console.log("Transacción cancelada");
      }
    });
  };

  if (!mounted) return null;

  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fbbf24', marginBottom: '10px' }}>
          STX Lottery
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '40px' }}>
          Participa en la campaña de Talent Protocol
        </p>

        {!userSession.isUserSignedIn() ? (
          <button 
            onClick={connectWallet}
            style={{
              backgroundColor: '#ea580c',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          >
            Conectar Wallet
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ marginBottom: '20px', fontSize: '0.9rem', color: '#22c55e' }}>
              ● Wallet conectada: {userSession.loadUserData().profile.stxAddress.mainnet.slice(0, 10)}...
            </p>

            <div style={{
              backgroundColor: 'white',
              color: '#1e293b',
              padding: '40px',
              borderRadius: '24px',
              border: '6px dashed #fbbf24',
              marginBottom: '30px',
              width: '100%',
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
            }}>
              <p style={{ margin: 0, fontWeight: 'bold', letterSpacing: '0.1em', color: '#64748b' }}>NFT TICKET</p>
              <h2 style={{ fontSize: '5rem', margin: '10px 0', fontWeight: '900' }}>#???</h2>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>Lotería Stacks Blockchain</p>
            </div>

            <button 
              onClick={mintTicket}
              style={{
                backgroundColor: '#16a34a',
                color: 'white',
                padding: '20px 40px',
                borderRadius: '9999px',
                fontSize: '1.5rem',
                fontWeight: '900',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '20px',
                width: '100%'
              }}
            >
              ¡MINTEAR MI NÚMERO!
            </button>

            <button 
              onClick={disconnectWallet}
              style={{
                background: 'transparent',
                color: '#ef4444',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.9rem',
                textDecoration: 'underline'
              }}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
