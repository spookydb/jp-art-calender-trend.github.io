# Searchable table website

This folder contains a complete static website connected to a published Google Sheet. It does not need a paid server, database, or installation.

## Edit the entries

Open the connected Google Sheet and edit it normally. The first row supplies the table headings and every following row becomes a website entry.

The current columns are `Date`, `Name`, `Hashtag / Link`, and `Explanation`. You can add, change, or remove rows without editing the website files. Avoid completely blank column headings.

The sheet must remain published through **File → Share → Publish to web** with automatic republishing enabled. Published sheet contents can be read by anyone, while editing remains restricted to people you authorize in Google Sheets.

## Test it on your computer

Because browsers restrict online data when a page is opened directly from a computer, test the final version after publishing it through GitHub Pages.

## Publish it free with GitHub Pages

1. Sign in to GitHub and select **New repository**.
2. Give it a simple name such as `information-calendar`.
3. Choose **Public**, add no template files, and select **Create repository**.
4. On the new repository page, choose **uploading an existing file**.
5. Upload `index.html`, `styles.css`, `script.js`, and this `README.md` directly—not the outer folder or ZIP file.
6. Enter a short message such as `Add website`, then select **Commit changes**.
7. Open the repository's **Settings** → **Pages**.
8. Under **Build and deployment**, choose **Deploy from a branch**.
9. Select branch **main**, folder **/(root)**, then select **Save**.
10. Wait a few minutes. The Pages screen will show the public address, usually `https://YOUR-USERNAME.github.io/information-calendar/`.

## Update entries later

1. Open the connected Google Sheet.
2. Add, change, or remove rows.
3. The published data updates automatically. Refresh the website to read the latest version.

You only need GitHub again when changing the website's design, title, introductory text, or behavior.

If you change the repository name, the public address changes too. Do not rename or delete `index.html`.
