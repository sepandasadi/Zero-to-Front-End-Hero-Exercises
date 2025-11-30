# Exercise 4: Refactoring with Core Principles

## Overview

Apply ALL 5 core CSS principles to refactor a messy component library.

## The Scenario

You've inherited a small component library with these problems:
- ❌ No encapsulation (components affect each other)
- ❌ No reusable patterns (everything custom)
- ❌ No design tokens (hardcoded values)
- ❌ Override chains (specificity wars)
- ❌ No automation (manual quality control)

## Your Task

Refactor the component library applying:

1. **Encapsulation** - Scope styles to components
2. **Reusable Patterns** - Create utility classes
3. **Design Tokens** - No magic numbers
4. **Composition** - Avoid override chains
5. **Automation** - Add linting rules

## Files

- `starter/messy-components.css` - The messy CSS
- `starter/index.html` - HTML using the components
- `solution/` - Your refactored code

## Deliverables

1. Refactored CSS with BEM naming
2. Design token system
3. Utility class library
4. `.stylelintrc.json` configuration
5. Before/after comparison document

## Success Criteria

- [ ] All components use BEM naming
- [ ] Design tokens for all values
- [ ] At least 10 utility classes
- [ ] Maximum specificity: (0,2,0)
- [ ] Stylelint passes with no errors
- [ ] 50%+ CSS reduction

## Time Estimate

90-120 minutes

