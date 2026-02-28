const projects = [
  {
    title: 'Job Connect',
    type: 'Django',
    stack: ['Python', 'Django', 'Django ORM', 'SQLite', 'Channels'],
    summary: 'Developed a web-based job portal connecting seekers and employers through role-based workflows.',
    contributions: [
      'Built backend using Django and Django ORM',
      'Implemented dual role-based authentication (seeker & employer)',
      'Designed separate dashboards for each role',
      'Added real-time messaging with Django Channels',
      'Applied custom decorators for role-based access control'
    ],
    live: 'https://web-production-1e213.up.railway.app/',
    github: 'https://github.com/salamlakhan7/Job-connect-Full-stack/'
  },
  {
    title: 'Real Time Object Detection and Tracking',
    type: 'AI',
    stack: ['Python', 'OpenCV', 'PyTorch', 'YOLOv8', 'SORT', 'Deep SORT'],
    summary: 'Built a system to detect and track multiple objects in videos and live webcam feeds.',
    contributions: [
      'Integrated YOLOv8 for object detection',
      'Implemented SORT and Deep SORT tracking',
      'Displayed bounding boxes and persistent tracking IDs in realtime'
    ],
    live: 'https://abdul-salam-vision.streamlit.app/',
    github: 'https://github.com/salamlakhan7/VisionX-Tracker/tree/main'
  },
  {
    title: 'Genetic Algorithm for Optimization Results',
    type: 'AI',
    stack: ['Python', 'NumPy', 'Matplotlib'],
    summary: 'Implemented a Genetic Algorithm to search for optimized solutions to complex problems.',
    contributions: [
      'Built population generation and fitness evaluation',
      'Implemented tournament and roulette-wheel selection',
      'Added crossover and mutation with tunable parameters',
      'Visualized outcomes for performance analysis'
    ],
    live: 'https://genetics-algorithm-solver-iduxqpmhuhwqtm6klxpxmn.streamlit.app/',
    github: 'https://github.com/salamlakhan7/Genetics-Algorithm-Solver'
  }
];

const skills = [
  ['Languages: Python, JavaScript (basic), C++ (basic)', 88],
  ['Frameworks: Django, DRF (basic), Flask (basic)', 84],
  ['Databases: SQLite, PostgreSQL (familiar)', 80],
  ['Tools: Git, VS Code, Colab, Jupyter', 86],
  ['Concepts: REST APIs, Django ORM, MVT, Auth', 85],
  ['Frontend: HTML, CSS, Bootstrap, Tailwind (familiar)', 78]
];

const projectGrid = document.querySelector('#projectGrid');
const filter = document.querySelector('#stackFilter');
const skillsEl = document.querySelector('#skills');
const toastEl = document.querySelector('#toast');

function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toastEl.classList.remove('show'), 1600);
}

function renderProjects(tag = 'All') {
  if (!projectGrid) return;
  const visible = tag === 'All' ? projects : projects.filter((p) => p.stack.includes(tag) || p.type === tag);
  projectGrid.innerHTML = visible.map((project) => `
    <article class="project">
      <h4>${project.title}</h4>
      <p>${project.summary}</p>
      <div class="badges">${project.stack.map((s) => `<span>${s}</span>`).join('')}</div>
      <ul>${project.contributions.map((c) => `<li>${c}</li>`).join('')}</ul>
      <div class="project-links">
        <a href="${project.live}" target="_blank" rel="noreferrer">Live Demo</a>
        <a href="${project.github}" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </article>
  `).join('');

  if (!visible.length) {
    projectGrid.innerHTML = '<article class="project"><p>No project matches this filter yet.</p></article>';
  }
}

function initFilter() {
  const tags = ['All', ...new Set(projects.flatMap((p) => [p.type, ...p.stack]))];
  if (!filter) return;
  filter.innerHTML = tags.map((tag) => `<option value="${tag}">${tag}</option>`).join('');
  filter.addEventListener('change', (e) => renderProjects(e.target.value));
}

function renderSkills() {
  if (!skillsEl) return;
  skillsEl.innerHTML = skills.map(([name, score]) => `
    <div class="row">
      <span>${name}</span>
      <div class="bar"><div class="fill" style="width:${score}%"></div></div>
      <strong>${score}%</strong>
    </div>
  `).join('');
}

function initTheme() {
  const btn = document.querySelector('#themeToggle');
  if (!btn) return;
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  btn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const light = document.body.classList.contains('light');
    btn.innerHTML = light ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem('theme', light ? 'light' : 'dark');
    showToast(light ? 'Light mode enabled' : 'Dark mode enabled');
  });
}

function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('in');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = btn.getAttribute('data-copy') || '';
      try {
        await navigator.clipboard.writeText(value);
        showToast(`Copied: ${value}`);
      } catch {
        showToast('Copy failed. Please copy manually.');
      }
    });
  });
}

function initSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetSelector = link.getAttribute('href');
      const target = document.querySelector(targetSelector);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initBackToTop() {
  const topBtn = document.querySelector('#toTop');
  if (!topBtn) return;
  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('show', window.scrollY > 260);
  });
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initCvDownload() {
  const cvBtn = document.querySelector('#downloadCv');
  if (!cvBtn) return;
  cvBtn.addEventListener('click', () => {
    const text = `ABDUL SALAM\nBackend Developer (Python | Django)\nEmail: Salamlakhan7@gmail.com\nPhone: +92 318 4096277\nLinkedIn: https://www.linkedin.com/in/abdul-salam-501b2025b/\nGitHub: https://github.com/salamlakhan7\n\nSkills: Python, Django, DRF, Flask, SQLite, PostgreSQL, REST APIs, Django ORM\nEducation: BS Computer Science (2022-2026), COMSATS University Islamabad, Vehari Campus.`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Abdul_Salam_CV.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('CV downloaded');
  });
}

function init() {
  initTheme();
  initFilter();
  renderProjects();
  renderSkills();
  initReveal();
  initCopyButtons();
  initSmoothLinks();
  initBackToTop();
  initCvDownload();
  const yearEl = document.querySelector('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

init();
