# Book Reading List Application

A reading list app built with Bolt AI for the Code With AI course (Lecture 11) and deployed on Vercel.

**Live app:** https://reading-list-app-livid.vercel.app/

## Description
Add the books you want to read, are reading, or have finished, and keep track of them in one place. Your list is saved in your browser, so it is still there when you come back.

## Features
- Add a book with a title and a status: Want to Read, Reading or Finished
- Change a book's status later, or delete the book
- Filter the list by status, with a count on each filter
- Totals for all books, books being read and finished books
- Blocks titles longer than 60 characters and duplicate titles
- Friendly empty states when the list or a filter has no books
- Data is stored in the browser (localStorage), not on a server

## Technologies Used
- React and TypeScript
- Tailwind CSS
- Vite
- Bolt AI (to generate the first version)
- Vercel (hosting) and GitHub (version control)

## Setup
1. Install Node.js.
2. In this folder run `npm install`.
3. Run `npm run dev` and open the address it prints.
4. Run `npm run build` to create the production version.
