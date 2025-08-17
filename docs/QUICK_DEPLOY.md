# Quick Deploy Reference

## 🚀 One-Command Deployment

```bash
# Make sure you're in the project directory
cd /home/ppramanik62/Desktop/todo/assignments/lab-work

# Run the automated deployment script
./scripts/deploy.sh
```

## 📋 Manual Steps (if you prefer)

### 1. Prerequisites
```bash
# Login to npm
npm login

# Verify login
npm whoami
```

### 2. Build & Test
```bash
# Clean build
rm -rf dist && pnpm run build

# Test locally
node dist/cli/main.js --help
```

### 3. Publish
```bash
# Publish to npm
npm publish --access public
```

## 📦 After Publishing

Users can install your package:

```bash
# Install globally
npm install -g @ppramanik62/lab-works

# Use the CLI
labworks --help
labworks francis --ppg 0.4 --npg 0.2 --w1 20 --w2 10 --rpm 900
labworks pelton --pg 0.5 --w1 15 --w2 8 --rpm 850 --hf 120
labworks interactive
```

## 🔄 Update Workflow

For future updates:

```bash
# Make changes...
git add .
git commit -m "Your changes"

# Update version and publish
npm version patch  # or minor/major
npm run build
npm publish

# Push to GitHub
git push && git push --tags
```

## 📊 Package Information

- **Name**: `@ppramanik62/lab-works`
- **CLI Command**: `labworks`
- **Repository**: https://github.com/PPRAMANIK62/lab-works
- **npm Page**: https://www.npmjs.com/package/@ppramanik62/lab-works

## ✅ Success Indicators

After successful deployment:

1. ✅ Package appears on https://www.npmjs.com/package/@ppramanik62/lab-works
2. ✅ `npm install -g @ppramanik62/lab-works` works
3. ✅ `labworks --help` shows colored help menu
4. ✅ All calculator commands work properly
5. ✅ Interactive mode functions correctly

## 🆘 Troubleshooting

- **403 Forbidden**: Check npm login status
- **Package exists**: Name might be taken, choose different scope
- **Command not found**: Check `bin` configuration in package.json
- **Module errors**: Ensure dependencies are in `dependencies`, not `devDependencies`

For detailed troubleshooting, see [DEPLOYMENT.md](./DEPLOYMENT.md).
