# Husky Pre-commit Hooks Setup

This project uses [Husky](https://typicode.github.io/husky/) for Git hooks to ensure code quality and consistency.

## Pre-commit Hook

The pre-commit hook runs the following checks on staged files:

1. **ESLint** - Checks and fixes code style and potential issues
2. **Jest Tests** - Runs tests related to changed files
3. **Type Checking** - Ensures TypeScript types are correct

### What happens when you commit:

1. Husky intercepts the commit
2. `lint-staged` runs only on staged files:
   - Runs ESLint with `--fix` to auto-fix issues
   - Runs Jest tests for files related to changes with `--findRelatedTests`
3. If any check fails, the commit is aborted

## Commit Message Hook

The commit-msg hook enforces conventional commit format:

```
type(scope): description

Examples:
- feat(auth): add login functionality
- fix: resolve navigation bug
- docs: update README
- test: add user service tests
```

### Valid commit types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `ci` - CI/CD changes
- `build` - Build system changes
- `perf` - Performance improvements
- `revert` - Reverting changes

## Manual Testing

You can manually run the pre-commit checks:

```bash
# Run all pre-commit checks
npm run pre-commit

# Run only linting
npm run lint

# Run only tests
npm run test:ci

# Run type checking
npm run type-check
```

## Skipping Hooks (Not Recommended)

In rare cases, you can skip hooks:

```bash
# Skip pre-commit hook
git commit --no-verify -m "commit message"

# Skip commit-msg hook
git commit --no-verify -m "any message format"
```

## Troubleshooting

### Hook not running
- Ensure `.husky/_/husky.sh` exists
- Check if hooks are executable: `ls -la .husky/`
- Re-install husky: `npm run prepare`

### Tests failing
- Run tests manually: `npm test`
- Check if related test files exist
- Ensure test setup is correct

### Linting errors
- Run linting manually: `npm run lint`
- Fix errors manually or let ESLint auto-fix
- Check ESLint configuration in `eslint.config.js` 