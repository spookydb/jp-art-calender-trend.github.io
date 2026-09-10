# Searchable table website

This folder contains a complete static website. It does not need a paid server, database, or installation.

## Edit the information

Open `data.js` in any text editor. Change the title, introduction, column labels, and example rows. Save the file.

To add a row, copy one entire row block inside `rows`, paste it after another row, and change its four values. Keep a comma between row blocks.

## Test it on your computer

Double-click `index.html`. It opens in your web browser. Search works locally.

## Publish it free with GitHub Pages

1. Sign in to GitHub and select **New repository**.
2. Give it a simple name such as `information-calendar`.
3. Choose **Public**, add no template files, and select **Create repository**.
4. On the new repository page, choose **uploading an existing file**.
5. Upload `index.html`, `styles.css`, `script.js`, `data.js`, and this `README.md` directly—not the outer folder.
6. Enter a short message such as `Add website`, then select **Commit changes**.
7. Open the repository's **Settings** → **Pages**.
8. Under **Build and deployment**, choose **Deploy from a branch**.
9. Select branch **main**, folder **/(root)**, then select **Save**.
10. Wait a few minutes. The Pages screen will show the public address, usually `https://YOUR-USERNAME.github.io/information-calendar/`.

## Update it later

1. Open your GitHub repository.
2. Select `data.js`.
3. Select the pencil icon (**Edit this file**).
4. Add or change information, then select **Commit changes**.
5. GitHub Pages automatically republishes the updated page. GitHub says publishing can take up to 10 minutes.

If you change the repository name, the public address changes too. Do not rename or delete `index.html`.
