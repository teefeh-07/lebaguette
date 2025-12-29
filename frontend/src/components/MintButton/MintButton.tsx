import React, { useState } from 'react';
import { openContractCall } from '@stacks/connect';
import {
  uintCV,
  PostConditionMode,
  FungibleConditionCode,
  makeStandardSTXPostCondition
} from '@stacks/transactions';
import { StacksMainnet, StacksTestnet } from '@stacks/network';
import { CONTRACT_ADDRESS, CONTRACT_NAME, MINT_PRICE } from '../../lib/constants';
import { userSession } from '../../lib/stacks';
import './MintButton.css';

interface MintButtonProps {
  isWhitelist?: boolean;
}

export const MintButton: React.FC<MintButtonProps> = ({ isWhitelist = false }) => {
  const [isMinting, setIsMinting] = useState(false);
  const [txId, setTxId] = useState<string | null>(null);

  const handleMint = async () => {
    if (!userSession.isUserSignedIn()) {
      alert('Please connect your wallet first');
      return;
    }

    setIsMinting(true);

    try {
      const userData = userSession.loadUserData();
      const senderAddress = userData.profile.stxAddress.testnet; // Use testnet for now

      // Create post condition to ensure user pays the mint price
      const postConditions = [
        makeStandardSTXPostCondition(
          senderAddress,
          FungibleConditionCode.LessEqual,
          MINT_PRICE
        ),
      ];

      const functionName = isWhitelist ? 'whitelist-mint' : 'mint-baguette';

      const options = {
        network: new StacksTestnet(),
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName,
        functionArgs: [],
        postConditionMode: PostConditionMode.Deny,
        postConditions,
        onFinish: (data: any) => {
          console.log('Transaction submitted:', data);
          setTxId(data.txId);
          setIsMinting(false);
        },
        onCancel: () => {
          console.log('Transaction cancelled');
          setIsMinting(false);
        },
      };

      await openContractCall(options);
    } catch (error) {
      console.error('Minting failed:', error);
      setIsMinting(false);
    }
  };

  return (
    <div className="mintbutton-container">
      <button
        onClick={handleMint}
        disabled={isMinting}
        className="mint-btn"
      >
        {isMinting ? 'Minting...' : `Mint Baguette ${isWhitelist ? '(Whitelist)' : ''}`}
      </button>
      {txId && (
        <p className="tx-result">
          Transaction ID: <a href={`https://explorer.stacks.co/txid/${txId}?chain=testnet`} target="_blank" rel="noopener noreferrer">{txId}</a>
        </p>
      )}
    </div>
  );
};
