# Contributing to Event Management System 🎉

Thank you for your interest in contributing to our Event Management System! We're excited to have you as part of our community during Hacktoberfest and beyond.

## 🎃 Hacktoberfest 2025

This repository is participating in **Hacktoberfest 2025**! We welcome contributions from developers of all skill levels.

### What is Hacktoberfest?
Hacktoberfest is a month-long celebration of open source software. Make 4 quality pull requests to participating repositories and earn a digital reward!

### Hacktoberfest 2025 Requirements

#### ✅ PR/MR Validation Criteria

Your pull requests must meet ALL of the following criteria to count for Hacktoberfest:

**[out-of-bounds]** Your PR must be within the bounds of Hacktoberfest:
- Created between **October 1, 2025 (10:00 AM UTC)** and **October 31, 2025 (11:59 PM UTC)**
- Made to a public, unarchived repository
- ⚠️ PRs created before October 1 but merged or marked as ready after do NOT count

**[spam]** Your PR must not be spammy:
- PRs labeled with "spam" by maintainers will NOT count
- We use the Node.js RegEx engine with `/\bspam\b/i` to detect spam labels
- PRs with "hacktoberfest-accepted" label cannot be marked as spam via label
- Merged PRs without "invalid" label cannot be marked as spam via label
- ⚠️ Any user with 2+ spammy PRs will be disqualified from Hacktoberfest

**[participating]** Your PR must be in a participating repository:
- This repo has the "hacktoberfest" topic ✅
- OR your PR must have the "hacktoberfest-accepted" label
- This is a one-time check - once passed, we won't check again

**[invalid]** Your PR must not be labeled as "invalid":
- PRs with "invalid" label won't count
- UNLESS they also have "hacktoberfest-accepted" label

**[accepted]** Your PR must be accepted:
- Must be **merged**, have "hacktoberfest-accepted" label, OR have an overall approving review
- Must NOT be a draft to be considered accepted
- If accepted via approving review, must NOT be closed
- Must be accepted by October 31, 2025 (in any timezone, UTC-12 through UTC+14)

**[7-day review period]** After passing all checks:
- PR enters a 7-day review period
- If it fails any check during this time, the timer resets
- After 7 days, PR is automatically accepted for Hacktoberfest
- PRs in review on October 31 can continue into November

### Hacktoberfest Guidelines
- **Quality over Quantity**: Focus on meaningful contributions
- **No Spam**: Low-quality PRs will be marked as `spam` or `invalid`
- **Be Respectful**: Follow our Code of Conduct
- **Learn and Grow**: This is a great opportunity to learn new technologies

## 🚀 Getting Started

### Prerequisites
- Git installed on your local machine
- GitHub account
- Basic knowledge of the technologies used in this project

### Setting Up Your Development Environment

1. **Fork the Repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/Event_Managment.git
   cd Event_Managment
   ```

2. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/GreenHacker420/Event_Managment.git
   ```

3. **Create a New Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-number
   ```

## 📝 How to Contribute

### Types of Contributions We Welcome

#### 🐛 Bug Fixes
- Fix existing bugs
- Improve error handling
- Resolve performance issues

#### ✨ New Features
- Add new event management features
- Implement user authentication
- Create notification systems
- Add calendar integrations

#### 📚 Documentation
- Improve README
- Add code comments
- Create user guides
- Write API documentation

#### 🎨 UI/UX Improvements
- Enhance user interface
- Improve accessibility
- Add responsive design
- Create better user flows

#### 🧪 Testing
- Add unit tests
- Create integration tests
- Improve test coverage
- Add end-to-end tests

#### 🔧 Code Quality
- Refactor existing code
- Improve code structure
- Add type annotations
- Optimize performance

### Contribution Process

1. **Check Existing Issues**
   - Look for existing issues that match your idea
   - Comment on the issue to let others know you're working on it
   - If no issue exists, create one first

2. **Follow the Development Workflow**
   ```bash
   # Update your fork
   git fetch upstream
   git checkout main
   git merge upstream/main
   
   # Create feature branch
   git checkout -b feature/your-feature-name
   
   # Make your changes
   # ... code, test, commit ...
   
   # Push to your fork
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request**
   - Use our PR template
   - Provide clear description of changes
   - Link related issues
   - Add screenshots for UI changes

## 📋 Coding Standards

### General Guidelines
- Write clean, readable code
- Follow existing code style and conventions
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable and function names

### Commit Message Format
```
type(scope): brief description

Detailed explanation if needed

Fixes #issue-number
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add user login functionality

fix(events): resolve date formatting issue
Fixes #123

docs(readme): update installation instructions
```

## 🧪 Testing Guidelines

### Before Submitting
- [ ] Test your changes locally
- [ ] Ensure all existing tests pass
- [ ] Add new tests for new features
- [ ] Check for console errors
- [ ] Verify responsive design (if applicable)

### Testing Commands
```bash
# Run tests (when implemented)
npm test

# Run linting (when implemented)
npm run lint

# Build project (when implemented)
npm run build
```

## 📊 Issue Guidelines

### Creating Issues
- Use descriptive titles
- Provide detailed descriptions
- Include steps to reproduce (for bugs)
- Add relevant labels
- Use issue templates when available

### Issue Labels
- `bug`: Something isn't working
- `enhancement`: New feature request
- `documentation`: Documentation improvements
- `good first issue`: Good for newcomers
- `hacktoberfest`: Hacktoberfest-friendly issues
- `help wanted`: Extra attention needed

## 🔍 Pull Request Guidelines

### Before Creating a PR
- [ ] Branch is up to date with main
- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] Documentation is updated
- [ ] Commit messages are clear

### PR Requirements
- **Title**: Clear and descriptive
- **Description**: Explain what and why
- **Testing**: How was this tested?
- **Screenshots**: For UI changes
- **Breaking Changes**: List any breaking changes

### PR Review Process
1. Automated checks must pass
2. At least one maintainer review required
3. Address review feedback promptly
4. Squash commits if requested
5. PR will be merged by maintainers

## 🏷️ Hacktoberfest-Specific Guidelines

### Valid Contributions
- ✅ Bug fixes with proper testing
- ✅ New features with documentation
- ✅ Documentation improvements (meaningful, not trivial)
- ✅ Code refactoring with clear benefits
- ✅ UI/UX enhancements
- ✅ Performance optimizations
- ✅ Accessibility improvements
- ✅ Security enhancements
- ✅ Test coverage improvements
- ✅ Low/Non-code contributions (technical writing, translations, UX testing, etc.)

### Invalid Contributions (Will be marked as `invalid` or `spam`)
- ❌ Minor text changes without value (e.g., fixing a single typo)
- ❌ Whitespace or formatting-only changes
- ❌ Duplicate PRs
- ❌ PRs that break existing functionality
- ❌ Auto-generated content without review
- ❌ Adding your name to a contributors list without actual contribution
- ❌ Automated PRs (e.g., dependency updates without testing)
- ❌ PRs that don't follow contribution guidelines

### Hacktoberfest Labels

**Automatic Labels:**
- `hacktoberfest`: Issues suitable for Hacktoberfest (applied to issues)
- `hacktoberfest-accepted`: PR accepted for Hacktoberfest (auto-applied to qualifying PRs)

**Maintainer Labels:**
- `spam`: Spam PR - does NOT count for Hacktoberfest
- `invalid`: Invalid PR - does NOT count unless also has `hacktoberfest-accepted`
- `needs-review`: Awaiting maintainer review
- `potential-spam`: Flagged for review by automated checks

**Important Notes:**
- PRs are automatically labeled `hacktoberfest-accepted` if created during October 2025
- Maintainers can manually add `hacktoberfest-accepted` to override other labels
- Spam label uses regex `/\bspam\b/i` - any label containing "spam" counts
- Once a PR has `hacktoberfest-accepted`, it cannot be marked spam via labels alone

### Low/Non-Code Contributions

We welcome non-technical contributions! Examples include:
- **Documentation**: Technical docs, tutorials, case studies
- **Writing**: Blog posts, technical articles
- **Translation**: Translating documentation or UI
- **Design**: UI/UX designs, graphics, icons
- **Testing**: User experience testing, bug reporting
- **Community**: Event organization, social media content

**Note:** Create a PR to track your contribution, even for non-code work.

### For Maintainers

**How to handle contributions:**
- ✅ **Accept**: Merge, approve, or add `hacktoberfest-accepted` label
- ❌ **Reject spam**: Add `spam` label
- ⚠️ **Mark invalid**: Add `invalid` label (can be overridden with `hacktoberfest-accepted`)
- 🔍 **Review needed**: Add `needs-review` label

**Repository is opted-in:**
- Repository has `hacktoberfest` topic ✅
- Issues labeled with `hacktoberfest` for contributors
- Automated workflows handle most labeling

## 🎯 Suggested First Contributions

Perfect for newcomers:
- [ ] Add input validation for event forms
- [ ] Improve error messages
- [ ] Add loading states for better UX
- [ ] Create unit tests for utility functions
- [ ] Add accessibility features
- [ ] Implement dark mode toggle
- [ ] Add event search functionality
- [ ] Create event categories
- [ ] Add event export features
- [ ] Implement email notifications

## 🤝 Community

### Getting Help
- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Discord/Slack**: [Add your community links]

### Recognition
Contributors will be recognized in:
- README.md contributors section
- Release notes
- Special Hacktoberfest acknowledgments

## 📜 Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## 🙏 Thank You

Thank you for contributing to our Event Management System! Your contributions help make this project better for everyone.

---

**Happy Coding and Happy Hacktoberfest 2025! 🎃👨‍💻👩‍💻**
