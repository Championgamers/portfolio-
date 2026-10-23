/*
  SINGLE SOURCE OF TRUTH for the whole portfolio.
  The page (script.js) and the chatbot (chatbot.js) both read from this object,
  so you only need to fill your details in here once.

  Every value that still says FILL inside double square brackets must be replaced with your
  real detail. Search this file for those double square brackets followed by FILL to find them
  all. When none are left, you're done.
*/
// Every GitHub link on the page is built from these two values. PORTFOLIO_REPO must be the exact name of your GitHub repo.
const GITHUB_USER = "Championgamers";
const PORTFOLIO_REPO = "arpits-portfolio";
const FOLDER = (name) => "https://github.com/" + GITHUB_USER + "/" + PORTFOLIO_REPO + "/tree/main/projects/" + name;

const PORTFOLIO = {
  name: "Arpit Ganeshaanand",
  role: "2nd Year B.Tech Student | Class Representative",
  taglines: ["Class Representative by duty, builder by passion.", "Turning ideas into working projects with the right prompt.", "Calm under pressure, curious about every gadget.", "Learning to build with AI, one project at a time."],
  tagline: "I build small, clean web projects and I'm learning to code with AI as a helper, not a shortcut.",

  about: [
    "I'm a second-year B.Tech student at JECRC University, Jaipur, and the Class Representative of my class for three semesters and still going. Leading my classmates has grown my leadership and communication skills, and I stay calm and cooperative when things get difficult.",
    "I love vibe coding, and I can write prompts that turn an idea into a real project using different AI tools. I enjoy understanding technology too, from phone and laptop specs to the parts inside them, and I got my first taste of robotics at a 2-hour boot camp at JECRC University.",
    "This portfolio brings together the projects I completed in my Code With AI course: Python programs, AI-assisted refactoring, bug fixing with Cursor AI, a JavaScript quiz and a deployed reading list app."
  ],

  education: [
    {
      degree: "B.Tech, 2nd year",
      institute: "JECRC University, Jaipur",
      period: ""
    }
  ],

  skills: {
    "AI and Building": ["Prompt engineering", "Vibe coding", "Cursor AI", "Bolt AI", "Many different AI tools"],
    "Languages": ["Python", "HTML", "CSS", "JavaScript", "C"],
    "Tech and Hardware": ["Phone and laptop specs", "How hardware parts work", "Basic robotics (JECRC boot camp)"],
    "People Skills": ["Leadership (Class Representative)", "Communication", "Teamwork", "Calm under pressure", "Responsibility"],
    "Tools": ["Git", "GitHub", "VS Code", "Vercel"],
    "Practices": ["Debugging with AI", "AI-assisted refactoring", "README documentation", "Responsive design"]
  },

  contact: {
    email: "arpitganeshaanand@gmail.com",
    github: "https://github.com/" + GITHUB_USER,
    linkedin: "https://www.linkedin.com/in/arpit-ganeshaanand-029182380",
    phone: ""
  },

  // My Journey: the Code With AI course told as chapters and steps.
  journey: [
    {
      season: "Thinking with AI",
      episodes: [
        { title: "Hallucinations and tokens", note: "Caught a made-up AI answer and checked it against a trusted source." },
        { title: "Chain prompting", note: "Identify, explain, fix: three-step prompts beat a lazy 'fix this code'." },
        { title: "Prompt framing", note: "Saw how a confident framing makes AI agree with a bug." },
        { title: "C to Python", note: "Translated C programs to Python and compared the output line by line." }
      ]
    },
    {
      season: "Git and the editor",
      episodes: [
        { title: "Git, GitHub and README audits", note: "Pushed my projects to GitHub with a README for each one, and checked each README against the code." },
        { title: "Cursor AI", note: "Ask, Inline Edit and multi-file refactors, plus a Cursor rules file." }
      ]
    },
    {
      season: "Proving it works",
      episodes: [
        { title: "LeetCode with AI hints", note: "Two Sum and Best Time to Buy and Sell Stock: O(n^2) first, then O(n)." },
        { title: "Debugging with Cursor AI", note: "Found why a loop printed only the last number and fixed it so the sum prints correctly." }
      ]
    },
    {
      season: "Build and ship",
      episodes: [
        { title: "Personal profile page", note: "HTML and CSS page, validated with the W3C checker." },
        { title: "JavaScript and the quiz", note: "A five-question quiz app that keeps score." },
        { title: "Reading list on Vercel", note: "Built with Bolt AI, pushed to GitHub and deployed." }
      ]
    },
    {
      season: "Talking to APIs",
      episodes: [
        { title: "Weather API", note: "Fetched live weather data with fetch and handled errors." },
        { title: "Groq chatbot", note: "The chatbot on this page, with the secret key kept off GitHub." }
      ]
    }
  ],

  // Put your photo at images/profile.jpg (square works best). If the file is
  // missing, the page shows your initials instead, so nothing looks broken.
  photo: "images/profile.jpg",
  photoCutout: "images/profile-cutout.webp",

  projects: [
    {
      title: "Python Programs Collection",
      description: "Three beginner Python programs in one folder: Factorial (a loop that also rejects negative numbers), Fibonacci (prints the number of terms you ask for) and Structure-to-Dictionary (a Student class turned into a dictionary with __dict__). The README explains each program and how to run it.",
      tech: ["Python", "Loops", "Classes", "Dictionaries", "Markdown"],
      links: [
        { label: "GitHub folder", url: FOLDER("python-programs-collection") }
      ]
    },
    {
      title: "Messy Python Code Improvement",
      description: "A Python script that finds the sum, average and maximum of a list of numbers, improved with Cursor AI: the logic was split into separate functions with clear names, docstrings and comments, so it is easier to read and maintain while giving the same results (sum 294, average 42.0, max 90).",
      tech: ["Python", "Cursor AI", "Refactoring"],
      links: [
        { label: "GitHub folder", url: FOLDER("messy-python-code-improvement") }
      ]
    },
    {
      title: "Bug Fixing Using Cursor AI",
      description: "A Python program that should add up a list of numbers but printed only the last number, because the loop replaced the total instead of adding to it. Cursor AI helped find the logic error, and changing the line to total += numbers[i] fixed it: the output is now Sum of numbers: 150.",
      tech: ["Python", "Cursor AI", "Debugging"],
      links: [
        { label: "GitHub folder", url: FOLDER("bug-fixing-using-cursor-ai") }
      ]
    },
    {
      title: "Interactive Quiz Application",
      description: "A five-question quiz built with plain HTML, CSS and JavaScript (Lecture 10). It shows one question at a time as option buttons, counts your correct answers and ends with Quiz Complete and your score out of 5. Play it from the button on this site.",
      tech: ["HTML", "CSS", "JavaScript", "Quiz"],
      links: [
        { label: "Play the quiz", url: "projects/interactive-quiz/index.html" },
        { label: "GitHub folder", url: FOLDER("interactive-quiz") }
      ]
    },
    {
      title: "Book Reading List Application",
      description: "A reading list app from Lecture 11, built with Bolt AI (React, TypeScript and Tailwind) and deployed on Vercel. Add books, give each a status (Want to Read, Reading or Finished), change it later, filter by status and delete books. It blocks duplicate titles and titles over 60 characters, and saves the list in your browser.",
      tech: ["Bolt AI", "React", "TypeScript", "Vercel", "Book"],
      links: [
        { label: "Live app", url: "https://reading-list-app-livid.vercel.app/" },
        { label: "GitHub folder", url: FOLDER("book-reading-list") }
      ]
    }
  ]
};
