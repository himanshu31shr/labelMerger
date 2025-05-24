# Contributing to E-commerce Management Dashboard

Thank you for your interest in contributing to our project! We welcome contributions from the community to help improve this application.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)
- [License](#license)

## Code of Conduct

This project adheres to the [Contributor Covenant](https://www.contributor-covenant.org/). By participating, you are expected to uphold this code.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
   ```bash
   git clone https://github.com/your-username/ecommerce-dashboard.git
   cd ecommerce-dashboard
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Create a branch** for your feature or bugfix
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b bugfix/description-of-fix
   ```
5. **Start the development server**
   ```bash
   npm run dev
   ```

## Development Workflow

1. **Create an issue** describing the bug or feature
2. **Assign the issue** to yourself
3. **Create a branch** from `main`
4. **Make your changes** following the code style
5. **Write tests** for your changes
6. **Run tests** and ensure they pass
   ```bash
   npm test
   ```
7. **Lint your code**
   ```bash
   npm run lint
   ```
8. **Commit your changes** following the commit guidelines
9. **Push your changes** to your fork
   ```bash
   git push origin your-branch-name
   ```
10. **Open a Pull Request**

## Code Style

We use the following tools to maintain code quality:

- **ESLint** with TypeScript and React plugins
- **Prettier** for code formatting
- **TypeScript** for type checking

### Linting

```bash
# Run linter
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

### Type Checking

```bash
npm run type-check
```

### Formatting

```bash
# Check formatting
npm run format:check

# Format code
npm run format:write
```

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries

### Examples

```
feat(products): add bulk edit functionality

Add the ability to edit multiple products at once in the products table.

Closes #123
```

```
fix(auth): handle expired refresh tokens

- Add logic to handle token refresh
- Update error messages for expired sessions

Fixes #456
```

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, including new environment variables, exposed ports, useful file locations, and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## Reporting Issues

When reporting issues, please include the following information:

1. **Description**: A clear and concise description of the issue
2. **Steps to Reproduce**:
   - Step 1
   - Step 2
   - ...
3. **Expected Behavior**: What you expected to happen
4. **Actual Behavior**: What actually happened
5. **Screenshots**: If applicable, add screenshots to help explain your problem
6. **Environment**:
   - OS: [e.g., Windows 10, macOS Big Sur, Ubuntu 20.04]
   - Browser: [e.g., Chrome 95, Safari 15, Firefox 93]
   - Node.js version: [e.g., 16.13.0]
   - npm version: [e.g., 8.1.0]

## Feature Requests

We welcome feature requests! Please create an issue with the following information:

1. **Feature Description**: A clear and concise description of the feature
2. **Use Case**: Why this feature would be useful
3. **Alternatives**: Any alternative solutions or features you've considered
4. **Additional Context**: Add any other context or screenshots about the feature request

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
