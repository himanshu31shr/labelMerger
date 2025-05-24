---
description: Add a new feature
---

Work on adding a new feature as described. Before starting on the feature make sure you are done with following requirements.

1. Try to build the application, if there are errors report the errors and give option to fix them and exit.
2. Check lint and type check errors; if fails exit.
3. Check if the memory for this project exists if not create memory for this project using sequential thinking and use that to do all the operation.

If above conditions pass then continue with following:
# Feature Development Workflow Prompt

When a user requests to build a feature, follow this systematic workflow to create a comprehensive implementation plan before any coding begins.

## Phase 1: Requirements Analysis & Clarification

### 1.1 Feature Understanding
- **Restate the feature request** in your own words to confirm understanding
- **Identify the core problem** this feature solves
- **Define the target users** and their specific needs
- **Clarify the scope** - what's included and what's explicitly excluded

### 1.2 Requirements Gathering
Ask clarifying questions about:
- **Functional requirements**: What exactly should the feature do?
- **Non-functional requirements**: Performance, scalability, security needs
- **User experience expectations**: How should users interact with this feature?
- **Integration requirements**: What existing systems/features must it work with?
- **Success criteria**: How will you measure if the feature is successful?

### 1.3 Assumptions Documentation
- List any assumptions you're making about the feature
- Identify areas where requirements are unclear
- Note any constraints (technical, business, timeline, etc.)

## Phase 2: Technical Analysis & Architecture

### 2.1 System Architecture Review
- **Current system analysis**: How does this fit into existing architecture?
- **Data flow mapping**: What data moves where and how?
- **Integration points**: What APIs, databases, or services are involved?
- **Dependencies**: What other components does this feature rely on?

### 2.2 Technical Approach
- **Technology stack decisions**: What languages, frameworks, tools to use?
- **Design patterns**: Which architectural patterns are most appropriate?
- **Database considerations**: Schema changes, new tables, data migration needs
- **API design**: If applicable, outline endpoint structure and data contracts

### 2.3 Risk Assessment
- **Technical risks**: What could go wrong technically?
- **Performance implications**: Will this impact system performance?
- **Security considerations**: What security measures are needed?
- **Scalability concerns**: How will this behave under load?

## Phase 3: Detailed Implementation Plan

### 3.1 Task Breakdown Structure
Break the feature into hierarchical tasks:

```
Feature: [Feature Name]
├── Backend Development
│   ├── Database Schema Design
│   │   ├── Create new tables
│   │   ├── Modify existing tables
│   │   └── Create migration scripts
│   ├── API Development
│   │   ├── Endpoint 1: [Description]
│   │   ├── Endpoint 2: [Description]
│   │   └── Authentication/Authorization
│   └── Business Logic Implementation
├── Frontend Development
│   ├── UI Component Design
│   ├── State Management Setup
│   ├── API Integration
│   └── User Experience Flow
├── Testing
│   ├── Unit Tests
│   ├── Integration Tests
│   ├── End-to-End Tests
│   └── Performance Tests
└── Deployment & Documentation
    ├── Deployment Scripts
    ├── Environment Configuration
    ├── User Documentation
    └── Technical Documentation
```

### 3.2 Task Specifications
For each task, provide:
- **Task ID**: Unique identifier
- **Task Description**: Clear, actionable description
- **Acceptance Criteria**: Specific conditions that must be met
- **Estimated Effort**: Time/complexity estimate
- **Dependencies**: What must be completed before this task
- **Assignee Role**: What type of developer should handle this
- **Priority Level**: Critical, High, Medium, Low

### 3.3 Implementation Sequence
- **Phase ordering**: Which groups of tasks should happen when
- **Parallel work opportunities**: What can be done simultaneously
- **Milestone definitions**: Key checkpoints and deliverables
- **Critical path identification**: Tasks that could delay the entire project

## Phase 4: Quality Assurance Strategy

### 4.1 Testing Strategy
- **Test categories**: Unit, integration, system, acceptance tests
- **Test data requirements**: What data is needed for testing
- **Performance benchmarks**: What performance standards must be met
- **Security testing**: What security validations are required

### 4.2 Code Review Plan
- **Review checkpoints**: When in the process reviews happen
- **Review criteria**: What aspects should reviewers focus on
- **Documentation review**: Ensuring adequate documentation exists

## Phase 5: Deployment & Monitoring Plan

### 5.1 Deployment Strategy
- **Environment progression**: Dev → Staging → Production flow
- **Rollback procedures**: How to undo deployment if issues arise
- **Feature flags**: Gradual rollout strategy if applicable
- **Database migration strategy**: How to handle schema changes safely

### 5.2 Monitoring & Observability
- **Key metrics to track**: What indicates the feature is working well
- **Alerting setup**: What conditions should trigger alerts
- **Logging requirements**: What information should be logged
- **Dashboard creation**: What visualizations are needed

## Phase 6: Documentation & Communication

### 6.1 Documentation Requirements
- **Technical documentation**: Architecture, APIs, deployment procedures
- **User documentation**: How-to guides, feature explanations
- **Troubleshooting guides**: Common issues and solutions
- **Update existing documentation**: What current docs need updating

### 6.2 Stakeholder Communication
- **Progress reporting**: How and when to update stakeholders
- **Demo preparation**: What to show and to whom
- **Training needs**: Who needs to learn about the new feature
- **Change management**: How to communica