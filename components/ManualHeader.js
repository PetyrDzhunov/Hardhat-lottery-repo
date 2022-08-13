import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';

export default function ManualHeader() {
  const {
    enableWeb3,
    account,
    isWeb3Enabled,
    Moralis,
    deactivateWeb3,
    isWeb3EnableLoading,
  } = useMoralis();

  const connect = async () => {
    await enableWeb3();
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('connected', 'injected');
    }
  };

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`);
      if (account == null) {
        window.localStorage.removeItem('connected');
        deactivateWeb3();
        console.log(`Null account found`);
      }
    });
  }, []);

  useEffect(() => {
    if (isWeb3Enabled) return;
    if (typeof window !== 'undefined') {
      if (window.localStorage.getItem('connected')) {
        enableWeb3();
      }
    }
  }, []);

  return (
    <div>
      {account ? (
        <div>
          Conncted to {account.slice(0, 6)}...
          {account.slice(account.length - 4)}
        </div>
      ) : (
        <button onClick={connect} disabled={isWeb3EnableLoading}>
          Connect
        </button>
      )}
    </div>
  );
}
