# Changeset Workflow Guide

> **Semantic Versioning and Automated Release Management**  
> Sacred Sutra Tools - Developer Guide

## 🎯 Overview

This project uses [Changesets](https://github.com/changesets/changesets) for:
- **Semantic Versioning:** Automatic version bumping based on change type
- **Changelog Generation:** Automated changelog from your changeset descriptions
- **Release Management:** Coordinated releases with proper GitHub integration

## 🚀 Quick Start

### 1. Making Changes with Changesets

When you make changes that should trigger a new release:

```bash
# Create a changeset for your changes
npm run changeset
```

This will:
- Ask you what type of change you're making (patch, minor, major)
- Prompt for a description of your changes
- Create a changeset file in `.changeset/`

### 2. Change Types

Choose the appropriate change type:

- **🔴 Major (Breaking Change):** Changes that break existing functionality
  - API changes that require user code updates
  - Removing features or changing behavior significantly
  
- **🟡 Minor (New Feature):** New features that don't break existing functionality
  - Adding new pages, components, or features
  - Enhancing existing functionality without breaking changes
  
- **🟢 Patch (Bug Fix):** Bug fixes and small improvements
  - Fixing bugs or issues
  - Performance improvements
  - Documentation updates

### 3. Example Workflow

```bash
# 1. Make your code changes
git checkout -b feature/new-dashboard-widget

# 2. Create a changeset
npm run changeset
? Which packages would you like to include? → material-ui-vite-ts
? Which type of change is this for material-ui-vite-ts? → minor
? Please enter a summary for this change → Add new dashboard widget for inventory alerts

# 3. Commit your changes AND the changeset
git add .
git commit -m "feat: add inventory alert dashboard widget"

# 4. Push and create PR
git push origin feature/new-dashboard-widget
```

## 📝 Changeset Best Practices

### Writing Good Changeset Descriptions

**✅ Good Examples:**
- `Add user authentication with Firebase Auth`
- `Fix PDF export not working with special characters`
- `Improve dashboard loading performance by 40%`
- `Add keyboard navigation support for accessibility`

**❌ Avoid:**
- `Fix bug` (too vague)
- `Update code` (not descriptive)
- `Minor changes` (not helpful)

### When to Create Changesets

**Always create a changeset for:**
- ✅ New features or pages
- ✅ Bug fixes that users will notice
- ✅ Performance improvements
- ✅ API changes
- ✅ Breaking changes
- ✅ Security updates

**Skip changesets for:**
- ❌ Internal refactoring (no user impact)
- ❌ Test updates
- ❌ Documentation-only changes
- ❌ Development tooling changes
- ❌ Code formatting/linting fixes

## 🔄 Release Process

### Automated Release Workflow

1. **Merge PR:** When your PR with changeset is merged to `master`
2. **Version PR:** Changesets bot creates a "Version Packages" PR
3. **Merge Version PR:** Maintainer merges the version PR
4. **Automatic Release:** GitHub Actions automatically:
   - Creates a Git tag
   - Generates GitHub release
   - Updates CHANGELOG.md
   - Triggers deployment pipeline

### Manual Release Commands

```bash
# Check what changes are pending release
npm run changeset status

# Create version update (usually done via PR)
npm run version

# Publish release (handled by CI/CD)
npm run release
```

## 🛠️ Advanced Usage

### Multiple Changes in One PR

If your PR includes multiple types of changes:

```bash
# Create multiple changesets
npm run changeset  # For the main feature (minor)
npm run changeset  # For the bug fix (patch)
```

### Emergency Releases

For critical bug fixes that need immediate release:

1. Create a `hotfix/` branch from `master`
2. Make the fix and create a patch changeset
3. Create PR with `[HOTFIX]` in title
4. Maintainer can merge and release immediately

## 🎯 Integration with CI/CD

### GitHub Actions Integration

Our CI/CD pipeline automatically:
- **On PR:** Runs tests and builds
- **On Merge:** Creates version PR if changesets exist
- **On Version Merge:** Creates release and deploys

### Release Validation

Each release includes:
- ✅ Automated testing
- ✅ Build verification
- ✅ Deployment health checks
- ✅ Rollback capability

## 📚 Additional Resources

- [Changesets Documentation](https://github.com/changesets/changesets)
- [Semantic Versioning Guide](https://semver.org/)
- [Sacred Sutra Tools Contributing Guide](../CONTRIBUTING.md)

## 🆘 Troubleshooting

### Common Issues

**"No changeset found"**
```bash
# You forgot to create a changeset
npm run changeset
```

**"Changeset already exists"**
```bash
# Check existing changesets
ls .changeset/
# Edit existing changeset or create additional one
```

**"Version conflict"**
```bash
# Pull latest changes and resolve conflicts
git pull origin master
npm run version
```

---

**Questions?** Contact the development team or create an issue in the repository. 