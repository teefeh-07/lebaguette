
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Helper
function run(command) {
    try {
        console.log(`Running: ${command}`);
        return execSync(command, { encoding: 'utf8', stdio: 'inherit' });
    } catch (e) {
        console.error(e);
        // Don't exit, might be just git warning
    }
}

const componentName = process.argv[2];
if (!componentName) {
    console.error('Please provide component name');
    process.exit(1);
}

const baseDir = path.join(__dirname, '../frontend/src/components', componentName);

if (fs.existsSync(baseDir)) {
    console.error('Component already exists');
    process.exit(1);
}

fs.mkdirSync(baseDir, { recursive: true });

// Component
const componentContent = `import React from 'react';
import './${componentName}.css';

interface ${componentName}Props {
  children?: React.ReactNode;
}

export const ${componentName}: React.FC<${componentName}Props> = ({ children }) => {
  return (
    <div className="${componentName.toLowerCase()}-container">
      {children}
    </div>
  );
};
`;

// CSS
const cssContent = `.${componentName.toLowerCase()}-container {
  /* Add styles */
  display: flex;
}`;

// Index
const indexContent = `export * from './${componentName}';`;

fs.writeFileSync(path.join(baseDir, `${componentName}.tsx`), componentContent);
fs.writeFileSync(path.join(baseDir, `${componentName}.css`), cssContent);
fs.writeFileSync(path.join(baseDir, 'index.ts'), indexContent);

console.log(`Created component ${componentName}`);

// Auto-commit if requested? 
// The user wants granular commits. I should probably use the automation.cjs from here or manually.
// For now just create file.
