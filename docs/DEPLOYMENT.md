# Deployment Guide: Publishing to npm via GitHub

This guide will walk you through the complete process of deploying the `@ppramanik62/lab-works` package to npm using GitHub as the source repository.

## Prerequisites

1. **GitHub Account**: Make sure you have a GitHub account
2. **npm Account**: Create an account at [npmjs.com](https://www.npmjs.com/)
3. **Git**: Ensure Git is installed on your machine
4. **Node.js & npm**: Version 16 or higher

## Step 1: Set up GitHub Repository

### 1.1 Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Set the repository name: `lab-works`
4. Set description: `A comprehensive CLI toolkit for hydraulic turbine calculations`
5. Make it **Public** (required for npm publishing with free account)
6. **Don't** initialize with README (we already have one)
7. Click "Create repository"

### 1.2 Initialize Git and Connect to GitHub

```bash
# Navigate to your project directory
cd /home/ppramanik62/Desktop/todo/assignments/lab-work

# Initialize git (if not already done)
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: Hydraulic Turbine Lab Toolkit with CLI interface"

# Add GitHub remote (replace PPRAMANIK62 with your actual GitHub username)
git remote add origin https://github.com/PPRAMANIK62/lab-works.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 2: Verify Package Configuration

### 2.1 Ensure the Build Works

```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build

# Verify the built files exist
ls -la dist/
```

### 2.2 Test the Package Locally

```bash
# Test the CLI works
node dist/cli/main.js --help

# Should show the help menu with colored output
```

### 2.3 Verify Package Contents

```bash
# Check what will be included in the npm package
npm pack --dry-run

# This should show only the essential files:
# - dist/ directory
# - package.json
# - README.md
# - LICENSE
```

## Step 3: npm Authentication and Publishing

### 3.1 Set up npm Authentication

```bash
# Login to npm (you'll be prompted for username, password, email)
npm login

# Verify you're logged in
npm whoami
```

### 3.2 Verify Package Name Availability

```bash
# Check if the scoped package name is available
npm view @ppramanik62/lab-works

# If it returns an error "404 Not Found", the name is available
```

### 3.3 Publish to npm

```bash
# Final build before publishing
npm run build

# Publish the package
npm publish

# If this is your first scoped package, you might need:
npm publish --access public
```

## Step 4: Verify the Published Package

### 4.1 Check npm Registry

1. Visit: https://www.npmjs.com/package/@ppramanik62/lab-works
2. Verify all information looks correct
3. Check the file listing to ensure only necessary files are included

### 4.2 Test Installation

```bash
# Test global installation (in a different directory)
cd /tmp
npm install -g @ppramanik62/lab-works

# Test the CLI
labworks --help
labworks list
labworks francis --help

# Test with actual calculation
labworks francis --ppg 0.4 --npg 0.2 --w1 20 --w2 10 --rpm 900
```

## Step 5: Post-Publication Setup

### 5.1 Update GitHub Repository

```bash
# Tag the release
git tag -a v1.0.0 -m "Release v1.0.0: Initial npm package"
git push origin v1.0.0

# Create a GitHub release (optional, via web interface)
```

### 5.2 Add Badges to README (Optional)

Add these badges to your README.md:

```markdown
[![npm version](https://badge.fury.io/js/%40ppramanik62%2Flab-works.svg)](https://badge.fury.io/js/%40ppramanik62%2Flab-works)
[![GitHub issues](https://img.shields.io/github/issues/PPRAMANIK62/lab-works)](https://github.com/PPRAMANIK62/lab-works/issues)
[![GitHub license](https://img.shields.io/github/license/PPRAMANIK62/lab-works)](https://github.com/PPRAMANIK62/lab-works/blob/main/LICENSE)
```

## Step 6: Version Management and Updates

### 6.1 For Future Updates

```bash
# Make your changes...
git add .
git commit -m "Description of changes"

# Update version (patch, minor, or major)
npm version patch  # for bug fixes (1.0.0 -> 1.0.1)
npm version minor  # for new features (1.0.0 -> 1.1.0)
npm version major  # for breaking changes (1.0.0 -> 2.0.0)

# Push changes and tags
git push && git push --tags

# Publish the update
npm run build
npm publish
```

### 6.2 Version Strategy

- **Patch** (x.x.X): Bug fixes, documentation updates
- **Minor** (x.X.x): New features, new calculators
- **Major** (X.x.x): Breaking changes to CLI interface

## Troubleshooting

### Common Issues and Solutions

1. **"Package name already exists"**
   - The name might be taken. Try a different scope or name variation

2. **"403 Forbidden"**
   - Make sure you're logged in: `npm whoami`
   - For scoped packages, ensure `"publishConfig": {"access": "public"}` in package.json

3. **"Files not included in package"**
   - Check your `.npmignore` file
   - Verify `"files"` array in package.json

4. **"Command not found after global install"**
   - Check the `"bin"` configuration in package.json
   - Verify npm global path: `npm config get prefix`

5. **"Module not found errors"**
   - Ensure all dependencies are in `"dependencies"` (not `"devDependencies"`)
   - Check that TypeScript is properly compiled to JavaScript

### Testing Before Publishing

```bash
# Test package installation locally
npm pack
npm install -g ./ppramanik62-lab-works-1.0.0.tgz
labworks --help

# Clean up test installation
npm uninstall -g @ppramanik62/lab-works
```

## Security Best Practices

1. **Never commit sensitive data**: Use `.gitignore` for secrets
2. **Use npm 2FA**: Enable two-factor authentication on your npm account
3. **Audit dependencies**: Run `npm audit` regularly
4. **Use specific versions**: Pin dependency versions in package.json

## Final Checklist

Before publishing:

- [ ] ✅ GitHub repository created and code pushed
- [ ] ✅ Package builds successfully (`npm run build`)
- [ ] ✅ CLI works locally (`node dist/cli/main.js --help`)
- [ ] ✅ Package contents verified (`npm pack --dry-run`)
- [ ] ✅ Logged into npm (`npm whoami`)
- [ ] ✅ Package name available (`npm view @ppramanik62/lab-works`)
- [ ] ✅ README.md updated with installation instructions
- [ ] ✅ LICENSE file present
- [ ] ✅ Version number appropriate

After publishing:

- [ ] ✅ Package visible on npmjs.com
- [ ] ✅ Global installation works
- [ ] ✅ CLI commands functional
- [ ] ✅ GitHub release tagged
- [ ] ✅ Documentation updated

## Success! 🎉

Once published, users can install your package with:

```bash
npm install -g @ppramanik62/lab-works
labworks --help
```

Your package will be available at: https://www.npmjs.com/package/@ppramanik62/lab-works
