# Updating Content in Multiverse Docs

This repository uses MDX files for its documentation pages. To update the content, follow these steps:

## 1. Locate the MDX Files

- All documentation content should be stored in the `/content` folder or in a direct subfolder, such as `/content/example`.
- **Note:** Do not use multiple sublayers (e.g., `/content/example/foo`). Only one level of subfolders is supported.

## 2. Edit an Existing Page

- Open the `.mdx` file you want to update in your code editor.
- Make your changes using Markdown and JSX as needed.
- Save the file.

## 3. Add a New Page

- Create a new file with the `.mdx` extension in the `/content` folder or a direct subfolder.
- Add your content using Markdown and JSX.
- Save the file.

## 4. Preview Your Changes (Optional)

- If you have a local development environment set up, **always use `pnpm`** to run commands.
- Start the development server: `pnpm dev`
- Visit the local site in your browser to preview your updates.

## 5. Commit and Push

- Stage your changes: `git add .`
- Commit your changes: `git commit -m "Update docs content"`
- Push to the repository: `git push`

## 6. Deployment

- Once changes are pushed, the site will be automatically redeployed (e.g., via Vercel) and your updates will go live.

---

**Tip:** Use clear commit messages and review your changes before pushing to keep the documentation organized and up to date.
