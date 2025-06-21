# Release Management Setup

This document explains how to configure the automated release management system to work properly with GitHub Actions.

## GitHub Actions Permission Issues

Both the release workflow and deployment workflow require elevated permissions that the default `GITHUB_TOKEN` cannot provide due to GitHub's security restrictions.

### Affected Workflows
1. **Release Workflow** - Creates pull requests for version management
2. **Deployment Workflow** - Deploys to GitHub Pages (`gh-pages` branch)

## Setup Solutions

### Option 1: Use Personal Access Token (Recommended)

1. **Create a Personal Access Token (PAT)**:
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Select scopes:
     - `repo` (Full control of private repositories) - **Required for both workflows**
     - `workflow` (Update GitHub Action workflows) - **Required for release workflow**
     - `write:packages` (Upload packages to GitHub Package Registry) - **Optional, for npm publishing**

   **Note**: GitHub Pages deployment is covered by the `repo` scope, which includes push access to all branches including `gh-pages`.

2. **Add PAT to Repository Secrets**:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `PAT`
   - Value: Your generated PAT

3. **Both workflows will automatically use the PAT** when available

### Option 2: Manual Workflows

If you prefer not to use a PAT:

**For Releases:**
1. Workflow creates the release branch (`changeset-release/master`)
2. Shows a helpful message about manual PR creation
3. Manually create a PR from that branch

**For Deployments:**
1. Run `npm run build` locally
2. Use `npm run deploy` command which uses gh-pages package
3. Or manually deploy the `dist` folder to `gh-pages` branch

## Common Errors

### Release Workflow Error
```
Error: GitHub Actions is not permitted to create or approve pull requests.
```
**Solution**: Set up PAT or use manual PR creation

### Deployment Workflow Error
```
remote: Permission to himanshu31shr/flipkart-amazon-tools.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/...': The requested URL returned error: 403
```
**Solution**: Set up PAT with proper permissions or use manual deployment

## Repository Configuration

The changesets configuration is set to:
```json
{
  "changelog": ["@changesets/changelog-github", { "repo": "himanshu31shr/labelMerger" }]
}
```

## Troubleshooting

### Repository Name Mismatch
- If you see references to "flipkart-amazon-tools", this might be from old configuration
- Current repository: `himanshu31shr/labelMerger`
- Update any hardcoded references if needed

### GitHub Pages Not Working
1. Check repository settings → Pages
2. Ensure source is set to "Deploy from a branch"
3. Select `gh-pages` branch as source
4. Ensure PAT has `repo` scope (covers GitHub Pages deployment)

### PAT Scope Issues
If you're getting permission errors, ensure your PAT has these **minimum required scopes**:
- `repo` - Required for both release and deployment workflows
- `workflow` - Required for release workflow to create PRs

**Optional scopes**:
- `write:packages` - Only needed if publishing to npm registry

## Workflow Process

1. **Push changes to master** → Triggers release workflow
2. **Changesets detects changes** → Creates/updates release PR
3. **Merge release PR** → Triggers publish and GitHub release creation
4. **GitHub release published** → Triggers deployment workflow
5. **Automated deployment** → Production deployment to GitHub Pages

## Commands

- `npm run changeset` - Create a new changeset
- `npm run version` - Apply changesets (usually done by CI)
- `npm run release` - Publish packages (usually done by CI)
- `npm run build` - Build application for deployment
- `npm run deploy` - Manual deployment to GitHub Pages 