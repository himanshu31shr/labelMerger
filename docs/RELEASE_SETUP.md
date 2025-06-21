# Release Management Setup

This document explains how to configure the automated release management system to work properly with GitHub Actions.

## GitHub Actions Permission Issue

The release workflow requires creating pull requests, which the default `GITHUB_TOKEN` cannot do due to GitHub's security restrictions. You have two options:

### Option 1: Use Personal Access Token (Recommended)

1. **Create a Personal Access Token (PAT)**:
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Select scopes:
     - `repo` (Full control of private repositories)
     - `write:packages` (Upload packages to GitHub Package Registry)
     - `workflow` (Update GitHub Action workflows)

2. **Add PAT to Repository Secrets**:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `PAT`
   - Value: Your generated PAT

3. **The workflow will automatically use the PAT** when available

### Option 2: Manual PR Creation

If you prefer not to use a PAT, the workflow will:
1. Create the release branch (`changeset-release/master`)
2. Show a helpful message about manual PR creation
3. You can then manually create a PR from that branch

## Repository Configuration

The changesets configuration is set to:
```json
{
  "changelog": ["@changesets/changelog-github", { "repo": "himanshu31shr/labelMerger" }]
}
```

## Troubleshooting

### Error: "GitHub Actions is not permitted to create or approve pull requests"
- This is expected with the default `GITHUB_TOKEN`
- Solution: Set up a PAT as described above

### Repository Name Mismatch
- If you see references to "flipkart-amazon-tools", this might be from old configuration
- Current repository: `himanshu31shr/labelMerger`
- Update any hardcoded references if needed

## Workflow Process

1. **Push changes to master** → Triggers release workflow
2. **Changesets detects changes** → Creates/updates release PR
3. **Merge release PR** → Triggers publish and GitHub release creation
4. **Automated deployment** → Production deployment follows

## Commands

- `npm run changeset` - Create a new changeset
- `npm run version` - Apply changesets (usually done by CI)
- `npm run release` - Publish packages (usually done by CI) 