#!/bin/bash

# Hydraulic Turbine Lab Toolkit - Deployment Script
# This script helps automate the deployment process

set -e  # Exit on any error

echo "🚀 Starting deployment process for @ppramanik62/lab-works"
echo "================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Step 1: Check prerequisites
echo -e "\n${BLUE}Step 1: Checking prerequisites...${NC}"

# Check if npm is logged in
if ! npm whoami > /dev/null 2>&1; then
    print_error "You are not logged into npm. Please run 'npm login' first."
    exit 1
else
    print_status "npm authentication verified ($(npm whoami))"
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    print_warning "Git not initialized. Initializing..."
    git init
fi

# Step 2: Build the project
echo -e "\n${BLUE}Step 2: Building the project...${NC}"

print_info "Cleaning previous build..."
rm -rf dist

print_info "Installing dependencies..."
pnpm install

print_info "Building TypeScript..."
pnpm run build

print_status "Build completed successfully"

# Step 3: Verify build
echo -e "\n${BLUE}Step 3: Verifying build...${NC}"

if [ ! -f "dist/cli/main.js" ]; then
    print_error "Build failed: main.js not found in dist/cli/"
    exit 1
fi

print_info "Testing CLI functionality..."
if node dist/cli/main.js --help > /dev/null 2>&1; then
    print_status "CLI verification successful"
else
    print_error "CLI test failed"
    exit 1
fi

# Step 4: Check package contents
echo -e "\n${BLUE}Step 4: Checking package contents...${NC}"

print_info "Files that will be included in the npm package:"
npm pack --dry-run

# Step 5: Version management
echo -e "\n${BLUE}Step 5: Version management...${NC}"

CURRENT_VERSION=$(node -p "require('./package.json').version")
print_info "Current version: $CURRENT_VERSION"

echo "What type of version update is this?"
echo "1) patch (bug fixes: $CURRENT_VERSION -> $(node -p "require('semver').inc('$CURRENT_VERSION', 'patch')"))"
echo "2) minor (new features: $CURRENT_VERSION -> $(node -p "require('semver').inc('$CURRENT_VERSION', 'minor')"))"
echo "3) major (breaking changes: $CURRENT_VERSION -> $(node -p "require('semver').inc('$CURRENT_VERSION', 'major')"))"
echo "4) skip version update"

read -p "Enter your choice (1-4): " version_choice

case $version_choice in
    1)
        npm version patch
        print_status "Version updated to patch"
        ;;
    2)
        npm version minor
        print_status "Version updated to minor"
        ;;
    3)
        npm version major
        print_status "Version updated to major"
        ;;
    4)
        print_info "Skipping version update"
        ;;
    *)
        print_error "Invalid choice. Exiting."
        exit 1
        ;;
esac

# Step 6: Git operations
echo -e "\n${BLUE}Step 6: Git operations...${NC}"

if [ -n "$(git status --porcelain)" ]; then
    print_info "Committing changes..."
    git add .
    read -p "Enter commit message (or press Enter for default): " commit_msg
    if [ -z "$commit_msg" ]; then
        commit_msg="chore: prepare for release"
    fi
    git commit -m "$commit_msg"
    print_status "Changes committed"
else
    print_info "No changes to commit"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    print_warning "No GitHub remote configured. Skipping git push."
    print_info "To configure GitHub remote, run:"
    print_info "git remote add origin https://github.com/PPRAMANIK62/lab-works.git"
else
    read -p "Push to GitHub? (y/N): " push_github
    if [ "$push_github" = "y" ] || [ "$push_github" = "Y" ]; then
        git push origin main
        git push --tags
        print_status "Pushed to GitHub"
    fi
fi

# Step 7: npm publishing
echo -e "\n${BLUE}Step 7: Publishing to npm...${NC}"

print_info "Final build before publishing..."
pnpm run build

read -p "Are you ready to publish to npm? (y/N): " publish_confirm
if [ "$publish_confirm" = "y" ] || [ "$publish_confirm" = "Y" ]; then
    print_info "Publishing to npm..."
    if npm publish --access public; then
        NEW_VERSION=$(node -p "require('./package.json').version")
        print_status "Successfully published @ppramanik62/lab-works@$NEW_VERSION"
        print_info "Package available at: https://www.npmjs.com/package/@ppramanik62/lab-works"
        print_info "Users can install with: npm install -g @ppramanik62/lab-works"

        echo -e "\n🎉 Deployment successful! 🎉"
        echo "Next steps:"
        echo "  1. Test installation: npm install -g @ppramanik62/lab-works"
        echo "  2. Test CLI: labworks --help"
        echo "  3. Create GitHub release (optional)"
        echo "  4. Update documentation if needed"
    else
        print_error "Publishing failed"
        exit 1
    fi
else
    print_info "Publishing skipped"
fi

echo -e "\n✨ Deployment process completed!"
