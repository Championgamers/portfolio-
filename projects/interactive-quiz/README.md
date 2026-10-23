# Interactive Quiz Application

A five-question quiz built with plain HTML, CSS and JavaScript for the Code With AI course (Lecture 10), following the teacher's guidelines.

## Description
The page shows the heading "Code With AI Quiz" and one question at a time. Each question has four option buttons. Clicking an option counts the answer (a correct one adds 1 to the score) and moves to the next question. After the fifth question the page shows "Quiz Complete" and "Your score is X out of 5".

## Features
- Five multiple-choice questions taken from the course
- Questions and answers kept in a JavaScript array of objects
- Options created with JavaScript and shown as buttons
- Score counted in a variable and shown at the end
- Styling kept in a separate CSS file (navy, blue and gold)

## Technologies Used
- HTML, CSS and JavaScript (no framework)

## How to Run
Open `index.html` in a browser. No installation is needed.

## Files
- `index.html` page structure (heading, question, options, result)
- `script.js` questions, answer check, score and result
- `style.css` styling

## How to Change the Questions
Edit the `questions` array at the top of `script.js`. Each item has `question`, `options` (four texts) and `answer` (the exact text of the correct option).
