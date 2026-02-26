import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma';
import { env } from '../config/env';

const router = Router();

router.post('/', async (_req: Request, res: Response) => {
  try {
    // Admin user
    const hashedPassword = await bcrypt.hash(env.ADMIN_INITIAL_PASSWORD, 12);
    await prisma.user.upsert({
      where: { email: env.ADMIN_EMAIL },
      update: { password: hashedPassword },
      create: {
        email: env.ADMIN_EMAIL,
        password: hashedPassword,
        name: 'Sitraka Harinjaka',
        role: 'admin',
      },
    });

    // Biography
    await prisma.biography.upsert({
      where: { id: 1 },
      update: {},
      create: {
        fullName: 'Sitraka Harinjaka',
        title: 'Développeur Front-End',
        subtitle: 'Bienvenue dans mon Curriculum Vitae',
        aboutText: "Développeur front-end avec plus de huit ans d'expérience, spécialisé en React, Vue et intégration HTML/CSS. Je crée des interfaces modernes et performantes, et maîtrise les API REST et GraphQL. Mon parcours reflète rigueur, expertise et professionnalisme.",
        phone: '+1 504-899-822-457',
        email: 'info@bluebase3.com',
        address: '22 Baker Street Hangover, Stains W1U 3BW',
        nationality: 'Malagasy',
        languages: 'Français, Anglais',
        freelance: 'Available',
      },
    });

    // Skills
    const skills = [
      { name: 'React / Next.js', percentage: 95, category: 'frontend', sortOrder: 1 },
      { name: 'TypeScript', percentage: 90, category: 'frontend', sortOrder: 2 },
      { name: 'HTML / CSS', percentage: 95, category: 'frontend', sortOrder: 3 },
      { name: 'Tailwind CSS', percentage: 90, category: 'frontend', sortOrder: 4 },
      { name: 'Vue.js', percentage: 80, category: 'frontend', sortOrder: 5 },
      { name: 'Node.js', percentage: 75, category: 'backend', sortOrder: 6 },
      { name: 'WordPress', percentage: 85, category: 'cms', sortOrder: 7 },
      { name: 'Figma', percentage: 80, category: 'design', sortOrder: 8 },
      { name: 'Git', percentage: 90, category: 'tools', sortOrder: 9 },
      { name: 'GraphQL', percentage: 70, category: 'backend', sortOrder: 10 },
    ];

    for (const skill of skills) {
      await prisma.skill.upsert({
        where: { id: skill.sortOrder },
        update: skill,
        create: skill,
      });
    }

    // Services
    const services = [
      {
        title: 'Développement Front-End React / Next.js',
        icon: 'code',
        description: 'Je conçois et développe des interfaces modernes, performantes et customisables en React et Next.js. J\'assure un code propre, rapide, responsive et parfaitement aligné avec les besoins de votre application web.',
        sortOrder: 1,
      },
      {
        title: 'Développement de Sites WordPress',
        icon: 'wordpress',
        description: "Je crée des sites WordPress professionnels, personnalisés et faciles à gérer. Du thème sur mesure à l'optimisation des performances, j'offre une solution fiable, esthétique et adaptée à votre activité.",
        sortOrder: 2,
      },
      {
        title: 'Web Design & Design UI/UX',
        icon: 'palette',
        description: "Je réalise des designs web élégants, intuitifs et centrés utilisateur. Du maquettage à l'intégration visuelle, je conçois des interfaces harmonieuses qui valorisent votre identité et améliorent l'expérience de navigation.",
        sortOrder: 3,
      },
    ];

    for (const service of services) {
      await prisma.service.upsert({
        where: { id: service.sortOrder },
        update: service,
        create: service,
      });
    }

    // Experiences
    const experiences = [
      {
        company: 'Extraction de données automatisée',
        role: 'Développeur Front-End',
        startDate: new Date('2024-10-01'),
        endDate: null,
        description: "Je conçois et intègre des interfaces responsives avec React et Next.js pour une application permettant l'analyse de documents PDF et l'extraction automatique de données. J'ai également mis en place la connexion à une API d'intelligence artificielle pour affiner les résultats des items du fichier, ainsi qu'un système de gestion des rôles utilisateurs afin d'adapter les permissions selon les profils.",
        technologies: 'React, Next.js, TypeScript, API IA',
        sortOrder: 1,
      },
      {
        company: 'Hager France',
        role: 'Développeur Front-End',
        startDate: new Date('2023-06-01'),
        endDate: new Date('2025-09-01'),
        description: "J'assurais la maintenance et l'optimisation du site vitrine multilingue de l'entreprise afin de garantir une expérience utilisateur fluide. J'ai amélioré le processus d'authentification et de création de compte avec Vue.js, géré les fonctionnalités de téléchargement via Next.js, et pris en charge la partie front-end de la page MyShop dédiée à la gestion de produits en grande quantité.",
        technologies: 'Vue.js, Next.js, TypeScript',
        sortOrder: 2,
      },
      {
        company: 'Extension Interactive',
        role: 'Développeur Front-End',
        startDate: new Date('2021-07-01'),
        endDate: new Date('2023-06-01'),
        description: "Je réalisais l'intégration de landing pages et leur adaptation responsive. J'ajoutais de nouvelles fonctionnalités via des API REST, développais des animations interactives avec ScrollMagic, et intégrais des pages en Twig tout en concevant des dashboards en HTML/CSS pour différents projets web.",
        technologies: 'HTML/CSS, JavaScript, Twig, ScrollMagic',
        sortOrder: 3,
      },
      {
        company: 'Axa Assurance',
        role: 'Développeur Front-End',
        startDate: new Date('2020-07-01'),
        endDate: new Date('2021-06-01'),
        description: "Je réalisais l'intégration de landing pages et leur adaptation responsive. J'ajoutais de nouvelles fonctionnalités via des API REST, développais des animations interactives avec ScrollMagic, et intégrais des pages en Twig tout en concevant des dashboards en HTML/CSS pour différents projets web.",
        technologies: 'HTML/CSS, JavaScript, REST API',
        sortOrder: 4,
      },
      {
        company: 'Little Big Smala',
        role: 'Développeur Front-End',
        startDate: new Date('2018-06-01'),
        endDate: new Date('2020-06-01'),
        description: "Je développais des interfaces utilisateur basées sur les maquettes Figma, notamment des dashboards intégrant des fonctionnalités CRUD. Je gérais les sessions, les processus d'authentification et l'intégration CKAN REST pour permettre l'affichage et le traitement des données des applications web.",
        technologies: 'Figma, JavaScript, CRUD, CKAN REST',
        sortOrder: 5,
      },
      {
        company: 'Odisei Madagascar',
        role: 'Fondateur & Tech Lead',
        startDate: new Date('2018-07-01'),
        endDate: null,
        description: "Je dirige les activités tech de l'entreprise tout en développant des applications web et mobiles ainsi que des sites vitrines. Mon rôle inclut la gestion de projets, l'évaluation technique des candidats, ainsi que le contrôle qualité et la gestion de la relation client jusqu'à la livraison finale des projets.",
        technologies: 'React, React Native, Node.js, Project Management',
        sortOrder: 6,
      },
      {
        company: 'Esokia Madagascar',
        role: 'Développeur Front-End',
        startDate: new Date('2016-05-01'),
        endDate: new Date('2018-04-01'),
        description: "Je m'occupais de la maintenance du site vitrine d'Esokia Madagascar et des applications web de ses clients. Mon travail consistait à assurer leur bon fonctionnement, les mises à jour régulières et l'utilisation des outils pour garantir une expérience utilisateur optimale sur tous les appareils.",
        technologies: 'HTML/CSS, JavaScript, WordPress',
        sortOrder: 7,
      },
    ];

    for (const exp of experiences) {
      await prisma.experience.upsert({
        where: { id: exp.sortOrder },
        update: exp,
        create: exp,
      });
    }

    // Education
    const education = [
      {
        school: 'Université de Tananarive',
        degree: 'Licence',
        field: 'Informatique',
        startDate: new Date('2012-09-01'),
        endDate: new Date('2015-06-01'),
        description: 'Formation en informatique avec spécialisation en développement web.',
        sortOrder: 1,
      },
      {
        school: 'Formation en ligne',
        degree: 'Certifications',
        field: 'Développement Web',
        startDate: new Date('2015-06-01'),
        endDate: new Date('2016-12-01'),
        description: 'Certifications en React, JavaScript avancé et UI/UX Design.',
        sortOrder: 2,
      },
    ];

    for (const edu of education) {
      await prisma.education.upsert({
        where: { id: edu.sortOrder },
        update: edu,
        create: edu,
      });
    }

    // Social Links
    const socialLinks = [
      { platform: 'linkedin', url: 'https://linkedin.com/in/sitraka-harinjaka', icon: 'linkedin', sortOrder: 1 },
      { platform: 'facebook', url: 'https://facebook.com', icon: 'facebook', sortOrder: 2 },
      { platform: 'upwork', url: 'https://upwork.com', icon: 'upwork', sortOrder: 3 },
      { platform: 'behance', url: 'https://behance.net', icon: 'behance', sortOrder: 4 },
      { platform: 'dribbble', url: 'https://dribbble.com', icon: 'dribbble', sortOrder: 5 },
    ];

    for (const link of socialLinks) {
      await prisma.socialLink.upsert({
        where: { id: link.sortOrder },
        update: link,
        create: link,
      });
    }

    res.json({ success: true, message: 'Base de données initialisée avec succès' });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ success: false, message: 'Erreur lors du seed', error: String(error) });
  }
});

export default router;
