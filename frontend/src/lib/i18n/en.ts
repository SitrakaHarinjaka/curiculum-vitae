import type { Dictionary } from './index';

export const en: Dictionary = {
  hero: {
    welcome: 'Welcome to my Resume',
    hello: 'Hello, I am',
    moreInfo: 'More info',
    defaultTitle: 'Front-End Developer',
  },
  about:{
    title: 'About',
    titleAccent: 'me'
  },
  services: {
    title: 'My',
    titleAccent: 'services',
    defaults: [
      { title: 'Front-End Development React / Next.js', description: 'I design and develop modern, high-performance and customizable interfaces with React and Next.js.' },
      { title: 'WordPress Website Development', description: 'I create professional, custom and easy-to-manage WordPress websites.' },
      { title: 'Web Design & UI/UX Design', description: 'I create elegant, intuitive and user-centered web designs.' },
    ],
  },
  parcours: {
    title: 'My',
    titleAccent: 'journey',
    biography: 'BIOGRAPHY',
    skills: 'SKILLS',
    education: 'EDUCATION',
    experiences: 'EXPERIENCES',
  },
  bio: {
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    nationality: 'Nationality',
    languages: 'Languages',
    freelance: 'Freelance',
  },
  months: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  today: 'Present',
  contact: {
    info: 'Contact Info',
    mailUs: 'MAIL US',
    contactUs: 'CONTACT US',
    location: 'LOCATION',
    social: 'Social Info',
    workTogether: "Let's Work",
    workTogetherAccent: 'Together.',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    yourSubject: 'Your Subject',
    sendMessage: 'Your Message',
    submitNow: 'Submit Now',
    sending: 'Sending...',
    success: 'Message sent successfully!',
    error: 'Error sending message',
    serverError: 'Server connection error',
  },
  footer: {
    role: 'Front-End Developer',
    rights: 'All rights reserved.',
    nav: ['Home', 'Portfolio', 'Blog', 'Contact'],
  },
  nav: {
    home: 'HOME',
    about: 'ABOUT',
    resume: 'RESUME',
    contact: 'CONTACT',
  },
  notFound: {
    title: 'Page not found',
    back: 'Back to home',
  },
  meta: {
    title: 'Sitraka Harinjaka - Full-stack Developer',
    description: 'Full-Stack Developer | React, Vue, Node.js, NestJS | 8+ years building scalable, high-performance web apps.',
  },
};
