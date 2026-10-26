import {
  Globe, Boxes, Server, Layers, Cloud, Sparkles, Rocket, LifeBuoy,
} from 'lucide-react';

export const services = [
  {
    slug: 'web-development',
    stack: ['React', 'JavaScript', 'Tailwind CSS'],
    title: 'Web Development',
    icon: Globe,
    description: 'Modern, responsive websites and web applications built with React and Tailwind CSS.',
  },
  {
    slug: 'software-development',
    stack: ['Java', 'Spring Boot', 'MongoDB'],
    title: 'Custom Software',
    icon: Boxes,
    description: 'Business-specific software designed around real workflows, not generic templates.',
  },
  {
    slug: 'backend-api',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'REST APIs'],
    title: 'Backend & APIs',
    icon: Server,
    description: 'Secure, scalable REST APIs and backend systems built on Spring Boot.',
  },
  {
    slug: 'full-stack-development',
    stack: ['React', 'Spring Boot', 'MySQL', 'MongoDB'],
    title: 'Full-Stack Development',
    icon: Layers,
    description: 'Complete frontend + backend application development, end to end.',
  },
  {
    slug: 'cloud-deployment',
    stack: ['Docker', 'Vercel', 'Render', 'Git'],
    title: 'Cloud & Deployment',
    icon: Cloud,
    description: 'Deployment, configuration and production support across modern cloud platforms.',
  },
  {
    slug: 'ai-automation',
    stack: ['AI APIs', 'LLM Integrations', 'Automation'],
    title: 'AI & Automation',
    icon: Sparkles,
    description: 'AI integrations and automation solutions for repetitive business workflows.',
  },
  {
    slug: 'mvp-development',
    stack: ['React', 'Spring Boot', 'MySQL'],
    title: 'MVP Development',
    icon: Rocket,
    description: 'Turn an idea into a functional MVP quickly, with a clear path to iterate.',
  },
  {
    slug: 'technical-support',
    stack: ['Git', 'GitHub', 'Docker'],
    title: 'Technical Support',
    icon: LifeBuoy,
    description: 'Debugging, optimization, integration and deployment assistance.',
  },
];

// Rotating pastel surfaces so the service grid reads as varied, not repeated.
export const serviceTints = ['bg-tint-sky', 'bg-tint-mint', 'bg-tint-lilac', 'bg-tint-peach'];
