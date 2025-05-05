#!/bin/bash

# Ensure we are in the test-importing directory
cd "$(dirname "$0")"

echo "📁 Setting up test-importing as a standalone Yarn project..."

# Step 1: Ensure it's not a Git submodule
echo "🔧 Removing submodule links (if any)..."
git rm --cached . >/dev/null 2>&1
rm -rf ../.git/modules/test-importing
rm -f ../.gitmodules

# Step 2: Create minimal package.json if missing
if [ ! -f "package.json" ]; then
  echo "📝 Creating package.json..."
  cat <<EOF > package.json
{
  "name": "test-importing",
  "private": true,
  "type": "module",
  "packageManager": "yarn@3.6.0",
  "dependencies": {
    "@ktr-srt/util": "git+https://github.com/luketych/ktr-util.git"
  }
}
EOF
fi

# Step 3: Create an empty yarn.lock file
touch yarn.lock

# Step 4: Run yarn install in isolated mode
echo "📦 Running yarn install..."
yarn install

echo "✅ test-importing is ready. You can now import from GitHub and test cleanly."