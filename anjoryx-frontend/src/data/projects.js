export const projects = [
  {
    slug: 'shareup',
    name: 'ShareUp',
    tagline: 'Community Item Sharing Platform',
    description:
      'A full-stack community platform designed to allow users to list, request, borrow and return household items.',
    technology: [
      'React', 'Spring Boot', 'Microservices', 'MongoDB', 'MySQL',
      'JWT', 'Spring Security', 'Docker', 'Cloudinary',
    ],
    liveUrl: 'https://share-up-roan.vercel.app/',
    githubUrl: 'https://github.com/Harsh5453/ShareUp',
    problem:
      'People often own items they rarely use, while neighbors and community members may need those same items only occasionally. There was no simple, trustworthy way to share them locally.',
    solution:
      'ShareUp lets users list items they own, browse what others are sharing nearby, request to borrow, and track the borrow/return lifecycle — with authentication and role-based access to keep listings and requests secure.',
    challenges:
      'Coordinating a microservice-based backend with two different databases (MySQL and MongoDB) for different data shapes, and designing a borrow/return state machine that stays consistent under concurrent requests.',
    outcome:
      'A working, deployed full-stack platform demonstrating a complete borrow/request/return workflow, secured with JWT-based authentication.',
  },
];

// Placeholder for future case studies — intentionally left empty.
// Do not populate with fabricated projects.
export const upcomingProjectsNote = 'More case studies coming soon.';
