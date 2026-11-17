// COMPUTER SCIENCE — THE REAL WORK
// Interactive features for the website.

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
    document.querySelectorAll('.nav-link').forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  });
});

// Highlight the navigation item for the section currently on screen.
const sections = document.querySelectorAll('main section[id]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const matching = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (matching) {
        document.querySelectorAll('.nav-link').forEach(item => item.classList.remove('active'));
        matching.classList.add('active');
      }
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => observer.observe(section));

// Path details panel.
const pathInfo = {
  software: ['Software Development', 'Software developers turn a problem or an idea into a digital product. They plan, write, test and improve the code behind websites, apps and other software.', 'Build websites, mobile apps, business tools and software services.', 'Start with HTML, CSS and JavaScript, or try Python. Make a tiny project and improve it.', 'Visual Studio Code, Git, a web browser and programming languages.'],
  cyber: ['Cybersecurity', 'Cybersecurity is about keeping devices, networks, systems and information safer from misuse and digital attacks.', 'Help test security, monitor systems, investigate alerts and teach safer digital habits.', 'Learn computer basics, networking, operating systems and safe online practices.', 'Linux, networking tools, security labs and scripting languages.'],
  ai: ['Artificial Intelligence', 'Artificial Intelligence explores how computers can perform tasks that usually require human-like abilities, such as recognizing patterns or understanding language.', 'Build or evaluate systems that classify images, understand text or make predictions.', 'Start with Python, logical thinking, basic statistics and responsible use of AI.', 'Python, notebooks, datasets and machine-learning libraries.'],
  data: ['Data Science', 'Data Science combines questions, data and analysis to help people understand what is happening and make informed decisions.', 'Clean information, look for patterns, create charts and explain findings.', 'Practice spreadsheets, basic statistics, Python and asking clear questions.', 'Spreadsheets, SQL, Python and data visualization tools.'],
  network: ['Networking', 'Computer networking connects devices and systems so they can exchange information locally and across the internet.', 'Set up, maintain and troubleshoot networks and connected devices.', 'Learn how the internet works, IP addresses, routers and network protocols.', 'Network simulators, command-line tools and router configuration interfaces.'],
  cloud: ['Cloud Computing', 'Cloud computing provides computing resources such as storage, servers and software over the internet.', 'Deploy applications, manage cloud services and help keep online systems reliable.', 'Learn networking, operating systems, web basics and command-line skills.', 'Cloud platforms, Linux, containers and automation tools.'],
  game: ['Game Development', 'Game development brings together programming, art, sound, storytelling and design to create interactive experiences.', 'Build game mechanics, characters, levels, physics and user interfaces.', 'Try a small 2D game and learn programming fundamentals.', 'Game engines, graphics tools and languages such as C# or C++.'],
  robotics: ['Robotics', 'Robotics combines software with electronics and mechanical systems to make machines sense and act in the physical world.', 'Program robots, connect sensors and test how machines respond to their surroundings.', 'Explore basic programming, electronics, sensors and problem-solving.', 'Microcontrollers, sensors, robotics kits and programming tools.'],
  ux: ['UI/UX Design', 'User interface and user experience design focus on making digital products clear, useful and pleasant for people.', 'Research user needs, sketch screens, test prototypes and improve product experiences.', 'Practice observation, layout, accessibility and simple design prototypes.', 'Figma, sketching tools, design systems and user feedback.'],
  database: ['Database Management', 'Databases store information in an organized way so applications and people can find and update it reliably.', 'Design data structures, manage access, back up information and improve database performance.', 'Start with tables, relationships and simple SQL queries.', 'SQL, database tools and data modeling diagrams.']
};
document.querySelectorAll('.path-detail').forEach(button => {
  button.addEventListener('click', () => {
    const info = pathInfo[button.dataset.detail];
    document.getElementById('detailTitle').textContent = info[0];
    document.getElementById('detailDescription').textContent = info[1];
    document.getElementById('detailWork').textContent = info[2];
    document.getElementById('detailSteps').textContent = info[3];
    document.getElementById('detailTools').textContent = info[4];
    const panel = document.getElementById('pathDetail');
    panel.hidden = false;
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});
document.getElementById('closeDetail').addEventListener('click', () => {
  document.getElementById('pathDetail').hidden = true;
});

// Web page mini-demo.
const demoMessage = document.getElementById('demoMessage');
const demoColor = document.getElementById('demoColor');
const webPreview = document.getElementById('webPreview');
function updatePreview() {
  webPreview.querySelector('strong').textContent = demoMessage.value || 'Your headline goes here';
  webPreview.style.background = demoColor.value;
}
demoMessage.addEventListener('input', updatePreview);
demoColor.addEventListener('input', updatePreview);

// Password strength teaching demo. It does not store or transmit the input.
const passwordInput = document.getElementById('passwordSample');
const strengthBar = document.getElementById('strengthBar');
const strengthResult = document.getElementById('strengthResult');
const securityTips = document.getElementById('securityTips');
passwordInput.addEventListener('input', () => {
  const value = passwordInput.value;
  let score = 0;
  if (value.length >= 8) score++;
  if (value.length >= 12) score++;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  const levels = [
    ['Too short or empty', '0%', '#d8dce5'],
    ['Very weak', '20%', '#ed7777'],
    ['Weak', '40%', '#ef9b62'],
    ['Getting stronger', '60%', '#e8c04e'],
    ['Strong sample', '80%', '#70bd8c'],
    ['Very strong sample', '100%', '#299b70']
  ];
  strengthResult.textContent = value ? levels[score][0] : 'Waiting for a sample password';
  strengthBar.style.width = value ? levels[score][1] : '0%';
  strengthBar.style.background = levels[score][2];
  securityTips.innerHTML = '';
  const tips = [];
  if (value.length < 12) tips.push('Try a longer passphrase (12+ characters)');
  if (!/[A-Z]/.test(value) || !/[a-z]/.test(value)) tips.push('Mix uppercase and lowercase letters');
  if (!/\d/.test(value)) tips.push('Consider adding numbers');
  if (!/[^A-Za-z0-9]/.test(value)) tips.push('Consider adding a symbol');
  if (!tips.length) tips.push('Great sample. Use a unique password for every account.');
  tips.forEach(tip => { const li = document.createElement('li'); li.textContent = tip; securityTips.appendChild(li); });
});
document.getElementById('togglePassword').addEventListener('click', event => {
  const show = passwordInput.type === 'password';
  passwordInput.type = show ? 'text' : 'password';
  event.currentTarget.textContent = show ? 'Hide' : 'Show';
});

// Networking packet animation.
document.getElementById('sendPacket').addEventListener('click', () => {
  const packet = document.getElementById('packet');
  const status = document.getElementById('networkStatus');
  const button = document.getElementById('sendPacket');
  button.disabled = true;
  button.textContent = 'Sending...';
  packet.style.transition = 'none';
  packet.style.left = '0%';
  packet.style.opacity = '1';
  void packet.offsetWidth;
  packet.style.transition = 'left 1.4s ease-in-out';
  packet.style.left = '100%';
  status.textContent = 'Your device is sending a request...';
  setTimeout(() => { status.textContent = 'The web server received the request and sent a response. Message delivered!'; button.disabled = false; button.innerHTML = 'Send another message <span>→</span>'; }, 1500);
});

// Sticky-note course filters.
document.querySelectorAll('.filter-button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-button').forEach(item => item.classList.remove('selected'));
    button.classList.add('selected');
    const filter = button.dataset.filter;
    let visible = 0;
    document.querySelectorAll('.sticky-note').forEach(note => {
      const show = filter === 'all' || note.dataset.level === filter;
      note.hidden = !show;
      if (show) visible++;
    });
    document.getElementById('courseCount').textContent = `${visible} learning note${visible === 1 ? '' : 's'}`;
  });
});

// Everyday technology explainer.
const lifeInfo = {
  bank: ['🏧', 'That ATM is a computer system.', 'When you withdraw cash, software checks your request, communicates with banking systems, verifies information and updates records.', ['Software', 'Networking', 'Databases', 'Security']],
  chat: ['💬', 'A message travels through networks.', 'Messaging apps use networks to move information between devices. Encryption can help keep message contents private while they travel.', ['Networking', 'Encryption', 'Software']],
  maps: ['🗺️', 'A map app solves a route problem.', 'Navigation apps combine location information, digital maps and algorithms to estimate routes and help people find their way.', ['GPS', 'Algorithms', 'Data Science']],
  stream: ['🎬', 'Streaming services learn what you enjoy.', 'Streaming platforms store huge media libraries and may use recommendation systems to suggest films or shows based on viewing patterns.', ['Cloud Computing', 'Data', 'Artificial Intelligence']],
  shop: ['🛍️', 'An online shop is many systems working together.', 'A shopping website displays products, stores account and order information, processes payments through providers and tracks deliveries.', ['Web Development', 'Databases', 'Cybersecurity']]
};
document.querySelectorAll('.life-item').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.life-item').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const info = lifeInfo[button.dataset.life];
    document.getElementById('lifeEmoji').textContent = info[0];
    document.getElementById('lifeTitle').textContent = info[1];
    document.getElementById('lifeDescription').textContent = info[2];
    document.getElementById('lifeTags').innerHTML = info[3].map(tag => `<span>${tag}</span>`).join('');
  });
});

// Three-question interest quiz.
const questions = [
  { q: 'What sounds most exciting to you?', a: [['building','Building apps and websites'],['protecting','Protecting people and information'],['patterns','Finding patterns and solving puzzles'],['designing','Designing creative experiences']] },
  { q: 'Which activity would you enjoy most?', a: [['building','Making something that people can use'],['protecting','Finding weaknesses and fixing them'],['patterns','Studying information to discover answers'],['designing','Making an experience simple and beautiful']] },
  { q: 'Which result would make you proud?', a: [['building','A working app or website'],['protecting','A safer system or network'],['patterns','A useful discovery from data'],['designing','A product people enjoy using']] }
];
let quizIndex = 0;
const quizAnswers = [];
function renderQuestion() {
  const item = questions[quizIndex];
  document.getElementById('quizStep').textContent = `QUESTION ${quizIndex + 1} OF ${questions.length}`;
  document.getElementById('quizQuestion').textContent = item.q;
  document.getElementById('quizOptions').innerHTML = item.a.map(([key,label]) => `<button data-answer="${key}">${label}</button>`).join('');
  document.getElementById('quizOptions').hidden = false;
  document.getElementById('quizResult').hidden = true;
  document.querySelectorAll('#quizOptions button').forEach(button => button.addEventListener('click', () => {
    quizAnswers.push(button.dataset.answer);
    quizIndex++;
    if (quizIndex < questions.length) renderQuestion();
    else showQuizResult();
  }));
}
function showQuizResult() {
  const counts = quizAnswers.reduce((all, answer) => { all[answer] = (all[answer] || 0) + 1; return all; }, {});
  const winner = Object.keys(counts).sort((a,b) => counts[b] - counts[a])[0];
  const results = {
    building: ['You may enjoy building things.', 'Explore Software Development, Web Development and Game Development. Start by making a small webpage or simple app.'],
    protecting: ['You may enjoy keeping systems safe.', 'Explore Cybersecurity and Networking. Start with computer fundamentals and safe, ethical practice.'],
    patterns: ['You may enjoy solving data problems.', 'Explore Data Science and Artificial Intelligence. Start with Python, simple datasets and logical problem-solving.'],
    designing: ['You may enjoy shaping digital experiences.', 'Explore UI/UX Design and Software Development. Start by sketching an app screen and asking someone to try it.']
  };
  document.getElementById('quizOptions').hidden = true;
  document.getElementById('quizStep').textContent = 'YOUR EXPLORATION STARTS HERE';
  document.getElementById('resultTitle').textContent = results[winner][0];
  document.getElementById('resultText').textContent = results[winner][1];
  document.getElementById('quizResult').hidden = false;
}
document.getElementById('restartQuiz').addEventListener('click', () => { quizIndex = 0; quizAnswers.length = 0; renderQuestion(); });
renderQuestion();

document.getElementById('year').textContent = new Date().getFullYear();
