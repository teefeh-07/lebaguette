
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Helper to run commands
function run(command) {
    try {
        console.log(`Running: ${command}`);
        return execSync(command, { encoding: 'utf8', stdio: 'inherit' });
    } catch (e) {
        console.error(`Command failed: ${command}`);
        process.exit(1);
    }
}

// Generate a random branch name
function generateBranchName(prefix = 'feat') {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}/micro-${timestamp}-${random}`;
}

// Main logic
const args = process.argv.slice(2);
const action = args[0];
const message = args[1] || 'update';

if (action === 'commit-all') {
    // 1. Create a branch
    const branchName = generateBranchName();
    run(`git checkout -b ${branchName}`);
    
    // 2. Add all changes
    run('git add .');
    
    // 3. Commit
    run(`git commit -m "${message}"`);
    
    // 4. Push (assuming origin exists)
    try {
       run(`git push -u origin ${branchName}`);
    } catch (e) {
        console.log('Push failed, likely no remote or auth issue. Continuing locally.');
    }
    
    // 5. Checkout main (or previous branch)
    run('git checkout main');
    
    // 6. Merge (simulate PR merge for now, or just merge locally)
    run(`git merge ${branchName}`);
    
    // 7. Push main
    try {
        run('git push origin main');
    } catch (e) {
         console.log('Push main failed.');
    }
    
    console.log(`Completed micro-commit flow for branch ${branchName}`);
} else if (action === 'init') {
    console.log('Automation scripts initialized.');
} else {
    console.log('Usage: node automation.js [commit-all] [message]');
}
