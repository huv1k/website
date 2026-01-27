# Claude AI Rules for Zed Editor

## Project Overview

This is a personal website built with Astro, TypeScript, and Tailwind CSS, deployed on Cloudflare Workers. The project uses Bun as the package manager and includes modern tooling for linting, formatting, and development.

## Technology Stack

- **Framework**: Astro 5.10.1 with SSR/SSG capabilities
- **Styling**: Tailwind CSS 4.1.17 (latest version)
- **Runtime**: Cloudflare Workers with platformProxy
- **Package Manager**: Bun (with bun.lock)
- **Language**: TypeScript with strict configuration
- **Linting**: Oxlint with comprehensive rules
- **Formatting**: Oxfmt (Oxc's formatter)
- **Content**: MDX support for rich content

## Code Style & Formatting

- Use **2 spaces** for indentation (never tabs)
- Use **single quotes** for strings
- Follow Oxfmt formatting conventions
- Respect Oxlint rules defined in `.oxlintrc.json`
- Use TypeScript strict mode with null checks enabled

## File Structure Patterns

```
src/
├── components/     # Reusable Astro/React components
├── content/        # Content collections (MDX files)
├── layouts/        # Page layouts
├── pages/          # File-based routing
├── styles/         # Global styles and Tailwind
├── consts.ts       # Global constants
└── content.config.ts # Content collection definitions
```

## Astro-Specific Guidelines

- Use `.astro` files for components with frontmatter
- Prefer Astro components over framework components when possible
- Use `---` frontmatter for server-side logic
- Follow Astro's component script + template pattern
- Use `astro:content` for content collections
- Implement proper SEO with sitemap integration

## TypeScript Rules

- Use strict type checking with null safety
- Import types with `import type` syntax when appropriate
- Follow Astro's TypeScript configuration extending `astro/tsconfigs/strict`
- Include proper type definitions for Cloudflare Workers
- Use explicit return types for functions when beneficial

## Tailwind CSS Guidelines

- Use Tailwind CSS 4.x syntax and features
- Prefer utility classes over custom CSS
- Use responsive design patterns (`sm:`, `md:`, `lg:`, etc.)
- Follow mobile-first design approach
- Keep utility classes organized and readable

## Component Development

- Create reusable components in `src/components/`
- Use proper TypeScript interfaces for props
- Follow Astro's component naming conventions
- Implement proper accessibility (a11y) practices
- Use Lucide icons from `@lucide/astro`

## Content Management

- Use MDX for rich content with components
- Define content collections in `content.config.ts`
- Follow consistent frontmatter schemas
- Implement proper content validation

## Performance & SEO

- Optimize for Cloudflare Workers deployment
- Use Astro's built-in optimizations
- Implement proper meta tags and structured data
- Generate XML sitemap automatically
- Optimize images and assets for web delivery

## Development Workflow

- Use `bun dev` for development server
- Run `bun run check` for linting and formatting
- Use `bun run check-build` before deployment
- Follow conventional commit messages
- Test builds locally with `bun run preview`

## Deployment & Infrastructure

- Deploy to Cloudflare Workers using Wrangler
- Use environment variables for configuration
- Implement proper error handling for edge runtime
- Follow Cloudflare Workers best practices
- Use `wrangler.json` for deployment configuration

## Dependencies Management

- Keep dependencies updated via Renovate
- Use exact versions for critical dependencies
- Prefer lightweight packages for edge deployment
- Audit packages for security vulnerabilities

## Error Handling

- Implement proper error boundaries
- Use TypeScript strict mode for error prevention
- Handle edge runtime limitations gracefully
- Implement proper 404 and error pages

## Code Quality Standards

- Write self-documenting code with clear variable names
- Add JSDoc comments for complex functions
- Use TypeScript for type safety
- Follow functional programming patterns when appropriate
- Implement proper separation of concerns

## Common Patterns to Follow

- Use Astro's island architecture for interactivity
- Implement lazy loading for images and components
- Use CSS custom properties with Tailwind
- Follow RESTful patterns for API routes
- Implement proper caching strategies

## Things to Avoid

- Don't use client-side JavaScript unnecessarily
- Avoid heavy dependencies that increase bundle size
- Don't bypass TypeScript strict checks
- Avoid inline styles over Tailwind utilities
- Don't ignore accessibility best practices

## Testing Considerations

- Test components in isolation
- Verify SSG/SSR behavior
- Test responsive design across devices
- Validate content collection schemas
- Ensure Cloudflare Workers compatibility

Remember: This is a modern, performance-focused website that leverages Astro's strengths for content-driven sites with excellent developer experience and deployment on the edge.
