# Chapter 18: Build Tools - Quiz

## Multiple Choice
**1. What does npm stand for?** a) New Package Manager b) Node Package Manager c) Next Programming Module d) Network Protocol Manager | **Answer**: b
**2. What is package.json?** a) JavaScript file b) Project metadata and dependencies c) Build output d) Config for npm only | **Answer**: b
**3. What does `npm install -D` do?** a) Deletes package b) Installs dev dependency c) Downloads documentation d) Installs globally | **Answer**: b
**4. What is Vite's main advantage?** a) Older and stable b) Lightning-fast HMR with ES modules c) Works without npm d) No configuration | **Answer**: b
**5. What does bundling do?** a) Zips files b) Combines modules into optimized files c) Minifies code only d) Removes comments | **Answer**: b

## True/False
**6. devDependencies are included in production builds.** **Answer**: False
**7. Vite uses ES modules in development.** **Answer**: True
**8. npm scripts can run any command.** **Answer**: True
**9. package-lock.json should be gitignored.** **Answer**: False
**10. Code splitting reduces bundle size.** **Answer**: True

## Code Output
**11. What installs?** `npm install lodash --save-dev` **Answer**: Installs as devDependency
**12. What runs?** `package.json: {"scripts": {"start": "vite"}}` then `npm start` **Answer**: Starts Vite dev server
**13. Semantic version?** `"^1.2.3"` allows? **Answer**: 1.2.3 to <2.0.0
**14. Build command?** Vite production build: **Answer**: npm run build
**15. Environment variable in Vite?** Access `VITE_API_KEY` **Answer**: import.meta.env.VITE_API_KEY
