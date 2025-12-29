// WalletConnect Integration
// Note: WalletConnect v2 requires project ID from https://cloud.walletconnect.com/

import { Core } from '@walletconnect/core';
import { Web3Wallet } from '@walletconnect/web3wallet';

let web3wallet: any = null;

export async function initializeWalletConnect(projectId: string) {
    try {
        const core = new Core({
            projectId: projectId || 'YOUR_PROJECT_ID_HERE',
        });

        web3wallet = await Web3Wallet.init({
            core,
            metadata: {
                name: 'Le Baguette',
                description: 'Artisan NFT Bakery on Stacks',
                url: 'https://lebaguette.app',
                icons: ['https://lebaguette.app/icon.png'],
            },
        });

        console.log('WalletConnect initialized');
        return web3wallet;
    } catch (error) {
        console.error('Failed to initialize WalletConnect:', error);
        throw error;
    }
}

export function getWalletConnect() {
    return web3wallet;
}

export async function pairWalletConnect(uri: string) {
    if (!web3wallet) {
        throw new Error('WalletConnect not initialized');
    }

    try {
        await web3wallet.core.pairing.pair({ uri });
        console.log('Paired with WalletConnect');
    } catch (error) {
        console.error('Pairing failed:', error);
        throw error;
    }
}
