window.PROJECTS = [
  {
    id: 'namfrel',
    title: 'NAMFREL · BARMM Election Analytics',
    category: 'Civic data',
    status: '2026 election',
    initials: 'BI',
    tone: 'rose',
    role: 'Dashboard Team · Data Cleaning & Preparation',
    summary: 'Preparing dependable election data for the BARMM parliamentary election dashboard.',
    context:
      'I worked with the Dashboard Team supporting the 2026 BARMM Parliamentary Election. ' +
      'My contribution focused on the quality of the data behind the visual reports.',
    contributions: [
      'Checked cumulative election-result files and compared changes between releases.',
      'Identified duplicate and inconsistent records, and validated relationships.',
      'Improved the Power Query preparation workflow with the team.',
    ],
    takeaway:
      'Reliable dashboards begin with understanding how the underlying data changes, not just removing duplicate rows.',
    tools: ['Power Query', 'Power BI', 'Data validation'],
    image: 'img/namfrel-barmm.jpg',
    imageAlt:
      'The NAMFREL election analytics team in front of the election dashboards, from Eli’s LinkedIn post',
    links: [
      {
        label: 'Read my project reflection',
        url: 'https://www.linkedin.com/posts/elijahnollen_i-was-part-of-the-dashboard-team-for-the-ugcPost-7508755510645432322-sdhq/',
      },
    ],
  },
  {
    id: 'techzone',
    title: 'TechZone 2.0',
    category: 'Database & web application',
    status: 'DATAMA2 · 2026',
    initials: 'TZ',
    tone: 'mint',
    role: 'Team Lead',
    summary:
      'Led the Atomic 7 team in developing a computer-parts storefront and admin platform ' +
      'connecting MySQL and MongoDB.',
    context:
      'Our Atomic 7 team extended TechZone’s SQL-based sales and inventory foundation into ' +
      'a customer-facing e-commerce platform. MySQL handled structured transactions; ' +
      'MongoDB supported the catalog and other document-based workflows.',
    contributions: [
      'Led team coordination and prepared the proposal and project documentation.',
      'Co-designed the storefront and admin prototype, then refined frontend features.',
      'Helped integrate the backend and UI, added payment-related SQL tables, and set up ' +
        'MongoDB collections and synchronization.',
      'Participated in system testing before the final presentation.',
    ],
    takeaway:
      'Connecting the storefront to reliable inventory and transaction records mattered as much as the interface.',
    tools: ['MySQL', 'MongoDB', 'PHP', 'React', 'TypeScript'],
    links: [
      { label: 'View repository', url: 'https://github.com/elijahnollen/datama2-techzone' },
      {
        label: 'Read project documentation',
        url: 'https://github.com/elijahnollen/datama2-techzone/blob/main/techzone/docs/Project%20Documentation.md',
      },
    ],
  },
  {
    id: 'jose',
    title: 'JOSE',
    category: 'Collaborative learning application',
    status: 'Team contribution',
    initials: 'J',
    tone: 'lilac',
    role: 'Documentation Team Member',
    summary:
      'Contributed to the documentation team by compiling and organizing lessons for the JOSE web app.',
    context:
      'JOSE is a collaborative learning web app for APC RIZLIFE about the life and works of ' +
      'Rizal. I was part of the documentation team.',
    contributions: [
      'Compiled and organized the modules and lessons that needed to be included in the web app.',
      'Shared feedback and coordinated content revisions with the team.',
    ],
    takeaway:
      'Clear, organized documentation helps the team prepare learning material for the web app.',
    tools: ['Documentation', 'Content organization', 'GitHub collaboration'],
    image: 'img/jose-module-cover.png',
    imageAlt: 'A book-cover artwork asset from the JOSE team repository',
    links: [{ label: 'View team repository', url: 'https://github.com/gelolaus/jose' }],
  },
  {
    id: 'wah',
    title: 'WAHgyu · Wireless Access for Health',
    category: 'Healthcare systems',
    status: 'In progress',
    initials: 'QA',
    tone: 'peach',
    role: 'Quality Analyst',
    summary: 'Supporting the quality and clarity of an ongoing healthcare-system project.',
    context:
      'I serve as a Quality Analyst for WAHgyu, an ongoing Wireless Access for Health ' +
      'project. I help the team check that requirements and expected behavior are clear and ' +
      'consistent as the application develops.',
    contributions: [
      'Review requirements, user stories, and test cases for clarity, consistency, and coverage.',
      'Compare expected behavior across workflows and project documentation, and flag gaps or conflicting details.',
      'Share findings with the team and help refine what needs to be checked as features evolve.',
    ],
    takeaway:
      'My focus is helping the team build a healthcare application whose behavior can be ' +
      'understood, checked, and trusted.',
    tools: ['Quality analysis', 'Requirements review', 'Test cases', 'Team collaboration'],
    links: [],
  },
];
