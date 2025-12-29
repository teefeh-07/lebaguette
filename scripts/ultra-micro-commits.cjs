const { execSync } = require('child_process');

// Ultra micro-commit generator
// Creates branches and commits for every tiny change

function run(cmd, ignoreError = false) {
    try {
        console.log(`▶ ${cmd}`);
        return execSync(cmd, { encoding: 'utf8', stdio: 'inherit', cwd: 'c:\\Users\\HP\\Desktop\\Blockchain\\Stacks Blockchain\\lebaguette' });
    } catch (e) {
        if (!ignoreError) {
            console.error(`✖ Failed: ${cmd}`);
        }
    }
}

function createBranch(prefix = 'feat') {
    return `${prefix}/ultra-${Date.now()}-${Math.floor(Math.random() * 9999)}`;
}

// Generate commits for various atomic changes
const microChanges = [
    { file: 'frontend/src/App.css', content: '/* App styles */\n.app-container { min-height: 100vh; }\n', msg: 'style: add app container styles' },
    { file: 'frontend/src/lib/api.ts', content: 'export const API_URL = "https://api.lebaguette.io";\n', msg: 'feat: add API configuration' },
    { file: 'frontend/src/lib/utils.ts', content: 'export function truncateAddress(addr: string) { return `${addr.slice(0,6)}...${addr.slice(-4)}`; }\n', msg: 'feat: add address truncation util' },
    { file: 'frontend/src/hooks/useWallet.ts', content: 'import { useState } from "react";\nexport function useWallet() { const [connected, setConnected] = useState(false); return { connected, setConnected }; }\n', msg: 'feat: create useWallet hook' },
    { file: 'frontend/src/types/nft.ts', content: 'export interface NFT { id: number; owner: string; attributes: any; }\n', msg: 'feat: add NFT type definitions' },
    { file: 'contracts/traits.clar', content: ';; NFT trait definition\n(define-trait nft-trait\n  ((get-owner (uint) (response (optional principal) uint)))\n)\n', msg: 'feat: add NFT trait contract' },
    { file: '.env.example', content: 'VITE_CONTRACT_ADDRESS=\nVITE_NETWORK=testnet\n', msg: 'docs: add environment example' },
    { file: '.gitattributes', content: '*.clar linguist-language=Lisp\n', msg: 'chore: configure git attributes for Clarity' },
    { file: 'tsconfig.paths.json', content: '{ "compilerOptions": { "paths": { "@/*": ["./src/*"] } } }\n', msg: 'config: add path aliases' },
    { file: 'docs/DEPLOYMENT.md', content: '# Deployment Guide\n\n## Prerequisites\n- Clarinet installed\n- Node.js 18+\n', msg: 'docs: create deployment guide' },
];

for (const change of microChanges) {
    const branch = createBranch(change.msg.split(':')[0]);

    run(`git checkout main`, true);
    run(`git checkout -b ${branch}`);

    // Write file
    const fs = require('fs');
    const path = require('path');
    const fullPath = path.join('c:\\Users\\HP\\Desktop\\Blockchain\\Stacks Blockchain\\lebaguette', change.file);
    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(fullPath, change.content);

    run(`git add "${change.file}"`);
    run(`git commit -m "${change.msg}"`);
    run(`git push -u origin ${branch}`, true);

    run(`git checkout main`, true);
    run(`git merge ${branch} --no-ff -m "Merge: ${change.msg}"`, true);
}

run(`git push origin main`, true);

console.log('\n✅ Generated ' + microChanges.length + ' micro-commits!');
