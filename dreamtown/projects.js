// Public portfolio summaries. Source material stays in its original repository or post.
window.PROJECTS = [
  {
    id: 'namfrel', title: 'NAMFREL · BARMM Election Analytics',
    category: 'Civic data', status: '2026 election', initials: 'BI', tone: 'rose',
    role: 'Dashboard Team · Data Cleaning & Preparation',
    summary: 'Preparing dependable election data for the BARMM parliamentary election dashboard.',
    context: 'I worked with the Dashboard Team supporting the 2026 BARMM Parliamentary Election. My contribution focused on the quality of the data behind the visual reports.',
    contributions: ['Checked cumulative election-result files and compared changes between releases.', 'Identified duplicate and inconsistent records, and validated relationships.', 'Improved the Power Query preparation workflow with the team.'],
    takeaway: 'Reliable dashboards begin with understanding how the underlying data changes—not just removing duplicate rows.',
    tools: ['Power Query', 'Power BI', 'Data validation'],
    image: 'img/namfrel-barmm.jpg', imageAlt: 'The NAMFREL election analytics team in front of the election dashboards, from Eli’s LinkedIn post',
    links: [{label: 'Read my project reflection', url: 'https://www.linkedin.com/posts/elijahnollen_i-was-part-of-the-dashboard-team-for-the-ugcPost-7508755510645432322-sdhq/'}]
  },
  {
    id: 'techzone', title: 'TechZone 2.0', category: 'Database & web application', status: 'DATAMA2 · 2026', initials: 'TZ', tone: 'mint',
    role: 'Team Lead · Documentation & Integration',
    summary: 'A computer-parts storefront and admin platform connecting transactional and document databases.',
    context: 'Our Atomic 7 team extended TechZone’s SQL-based sales and inventory foundation into a customer-facing e-commerce platform. MySQL handled structured transactions; MongoDB supported the catalog and other document-based workflows.',
    contributions: ['Coordinated the team and prepared the proposal and project documentation.', 'Co-designed the storefront and admin prototype, then refined frontend features.', 'Helped integrate the backend and UI, added payment-related SQL tables, and set up MongoDB collections and synchronization.', 'Participated in system testing before the final presentation.'],
    takeaway: 'Connecting the storefront to reliable inventory and transaction records mattered as much as the interface.',
    tools: ['MySQL', 'MongoDB', 'PHP', 'React', 'TypeScript'],
    links: [{label: 'View repository',url:'https://github.com/elijahnollen/datama2-techzone'}, {label:'Read project documentation',url:'https://github.com/elijahnollen/datama2-techzone/blob/main/techzone/docs/Project%20Documentation.md'}]
  },
  {
    id: 'jose', title: 'JOSE', category: 'Collaborative learning application', status: 'Team contribution', initials: 'J', tone: 'lilac',
    role: 'Learning Content Contributor · Modules 4–6',
    summary: 'Structured learning modules for a historical investigation adventure about the life and works of Rizal.',
    context: 'JOSE is a team-built learning application for APC RIZLIFE. My contribution was the module content and its import readiness; the application itself is a collaborative project.',
    contributions: ['Prepared JMM v1 content for Module 4: Roots, Family, and Early Formation; Module 5: Higher Education, Reform, and Personal Relationships; and Module 6: Return, Exile, Trial, Retraction, and Death.', 'Included lesson objectives, historical content, images and attribution, references, checkpoints, glossaries, and learning games.', 'Revised Modules 4 and 5 to resolve dateHints validation and the Module 4 quiz-source title/label mismatch.', 'Shared feedback and coordinated content revisions with the team.'],
    takeaway: 'Content quality includes structure and validation as well as the lesson itself.',
    tools: ['JMM v1', 'Learning content', 'Import validation', 'GitHub collaboration'],
    image: 'img/jose-module-cover.png', imageAlt: 'A book-cover artwork asset from the JOSE team repository',
    links: [{label:'View team repository',url:'https://github.com/gelolaus/jose'}, {label:'See my module contribution',url:'https://github.com/gelolaus/jose/issues/72'}]
  },
  {
    id: 'wah', title: 'WAHgyu · Wireless Access for Health', category: 'Healthcare systems', status: 'In progress', initials: 'QA', tone: 'peach',
    role: 'Quality Analyst',
    summary: 'Supporting the quality and clarity of an ongoing healthcare-system project.',
    context: 'I am the Quality Analyst on our current Wireless Access for Health project, WAHgyu. The work includes healthcare workflows and clearly defined interactions with other WAH systems.',
    contributions: ['Review use-case descriptions, user stories, and test-case updates for consistency.', 'Help clarify main, alternative, and exception flows so requirements can be understood and checked.', 'Check the alignment of use cases and activity diagrams, including the boundary between WAHgyu and external systems such as WAH4Security.', 'Review medicine-list, prescribing, and clinic-stock workflow requirements as the project evolves.'],
    takeaway: 'My current focus is making requirements clear, consistent, and testable while the team continues development.',
    tools: ['Quality analysis', 'Requirements review', 'Test cases', 'UML'],
    links: []
  }
];
