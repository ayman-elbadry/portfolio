require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Timeline = require('./models/Timeline');
const Profile = require('./models/Profile');

const seedData = async () => {
  await connectDB();
  console.log('🌱 Seeding de la base de données...\n');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Project.deleteMany({}),
    Skill.deleteMany({}),
    Timeline.deleteMany({}),
    Profile.deleteMany({}),
  ]);

  // ─── ADMIN USER ───
  await User.create({
    name: 'Aymane El Badry',
    email: 'admin@portfolio.com',
    password: 'Admin123!',
  });
  console.log('✅ Admin créé: admin@portfolio.com / Admin123!');

  // ─── PROFILE ───
  await Profile.create({
    name: 'Aymane El Badry',
    title: "Étudiant en Master d'Excellence en IA & Développeur Web Full Stack",
    subtitle: "Étudiant en Master d'Excellence en IA & Développeur Web Full Stack",
    description: "Passionné par la conception d'architectures web robustes et le développement de modèles d'Intelligence Artificielle performants. Je transforme des problèmes complexes en solutions logicielles intelligentes.",
    about: "Étudiant de 21 ans basé à Casablanca, Maroc, je suis animé par une double passion : l'ingénierie logicielle avec les frameworks modernes (Angular, React, .NET, Laravel) et la modélisation avancée en Data/IA (Machine Learning, Deep Learning, NLP).",
    email: 'elbaderyayman47@gmail.com',
    phone: '+212 684 795 036',
    linkedin: 'https://www.linkedin.com/in/aymane-el-badry/',
    github: 'https://github.com/',
    location: 'Casablanca, Maroc',
  });
  console.log('✅ Profil créé');

  // ─── PROJECTS ───
  await Project.insertMany([
    {
      title: 'Chatbot Universitaire',
      description: "Agent conversationnel intelligent en IA pour l'assistance aux nouveaux étudiants. Réponses automatisées, compréhension du langage naturel et orientation personnalisée.",
      category: 'ai',
      tags: ['NLP', 'Python', 'Deep Learning'],
      icon: 'bot',
      order: 1,
    },
    {
      title: 'Recommandation de Films',
      description: 'Système de recommandation hybride combinant filtrage collaboratif et filtrage basé sur le contenu pour suggérer des films personnalisés.',
      category: 'ai',
      tags: ['Machine Learning', 'Python', 'Filtrage collaboratif'],
      icon: 'film',
      order: 2,
    },
    {
      title: 'Détection de Plaques',
      description: "Modèle de Deep Learning pour la reconnaissance automatique des plaques d'immatriculation marocaines à partir d'images et de vidéos.",
      category: 'ai',
      tags: ['Deep Learning', 'Computer Vision', 'Python'],
      icon: 'scan-eye',
      order: 3,
    },
    {
      title: 'Prédiction Prix Automobiles',
      description: "Modèle prédictif d'estimation de la valeur des véhicules sur le marché automobile, basé sur les caractéristiques techniques et l'historique des ventes.",
      category: 'ai',
      tags: ['Machine Learning', 'Python', 'Régression'],
      icon: 'car',
      order: 4,
    },
    {
      title: 'Plateforme E-commerce',
      description: "Site e-commerce complet avec gestion de produits, panier d'achat, système d'authentification et tableau de bord administrateur.",
      category: 'web',
      tags: ['React JS', 'Laravel', 'MySQL'],
      icon: 'shopping-cart',
      order: 5,
    },
    {
      title: 'Location de Voitures',
      description: "Application complète de réservation et gestion de flotte automobile avec interface utilisateur intuitive et panel d'administration.",
      category: 'web',
      tags: ['React JS', 'Laravel', 'MySQL'],
      icon: 'car-front',
      order: 6,
    },
  ]);
  console.log('✅ 6 projets créés');

  // ─── SKILLS ───
  await Skill.insertMany([
    // AI & Data
    { name: 'Machine Learning', category: 'ai', level: 85 },
    { name: 'Deep Learning', category: 'ai', level: 80 },
    { name: 'Analyse de données', category: 'ai', level: 85 },
    { name: 'NLP', category: 'ai', level: 75 },
    { name: 'Data Mining', category: 'ai', level: 80 },
    { name: 'Python', category: 'ai', level: 90 },
    // Front-end
    { name: 'Angular', category: 'front', level: 85 },
    { name: 'React JS', category: 'front', level: 85 },
    { name: 'HTML5', category: 'front', level: 95 },
    { name: 'CSS3', category: 'front', level: 90 },
    { name: 'JavaScript', category: 'front', level: 90 },
    // Back-end
    { name: '.NET', category: 'back', level: 80 },
    { name: 'Laravel', category: 'back', level: 85 },
    { name: 'PHP', category: 'back', level: 80 },
    // Databases
    { name: 'MySQL', category: 'db', level: 85 },
    { name: 'MongoDB', category: 'db', level: 80 },
    { name: 'Oracle', category: 'db', level: 70 },
    // Tools
    { name: 'Git', category: 'tool', level: 90 },
    { name: 'GitHub', category: 'tool', level: 90 },
    { name: 'GitLab', category: 'tool', level: 80 },
    { name: 'Docker', category: 'tool', level: 75 },
    // Languages
    { name: 'Arabe', category: 'lang', level: 100, icon: 'Maternelle' },
    { name: 'Français', category: 'lang', level: 80, icon: 'B2' },
    { name: 'Anglais', category: 'lang', level: 65, icon: 'B1' },
  ]);
  console.log('✅ 24 compétences créées');

  // ─── TIMELINE ───
  await Timeline.insertMany([
    // Experience
    {
      type: 'experience',
      title: 'Développeur Web',
      company: 'INVOLYS',
      location: 'Casablanca',
      dates: 'Stage — 2 mois',
      description: "Développement et maintenance d'applications web en utilisant l'écosystème .NET et Angular. Collaboration avec l'équipe de développement pour l'amélioration continue des produits.",
      tags: ['.NET', 'Angular', 'Web'],
      icon: 'building-2',
      order: 1,
    },
    {
      type: 'experience',
      title: 'Développeur Back-end',
      company: 'Enduris',
      location: 'Casablanca',
      dates: 'Stage — 1 mois (Avril)',
      description: "Missions axées sur le développement back-end et la gestion des bases de données. Participation à l'optimisation des requêtes et à l'architecture serveur.",
      tags: ['Back-end', 'Base de données'],
      icon: 'building-2',
      order: 2,
    },
    // Education
    {
      type: 'education',
      title: "Master d'Excellence en Intelligence Artificielle",
      company: 'Université — Casablanca',
      location: 'Casablanca',
      dates: 'En cours',
      description: 'Formation avancée en Intelligence Artificielle, Machine Learning, Deep Learning et traitement des données massives.',
      icon: 'sparkles',
      isCurrent: true,
      order: 1,
    },
    {
      type: 'education',
      title: "Licence d'Excellence en Intelligence Artificielle",
      company: 'Université — Casablanca',
      location: 'Casablanca',
      dates: '2024 — 2025',
      description: "Mention Bien. Fondamentaux de l'IA, algorithmes d'apprentissage, statistiques et programmation avancée.",
      icon: 'award',
      order: 2,
    },
    {
      type: 'education',
      title: 'Technicien Spécialisé en Développement Digital',
      company: 'ISTA Sidi Moumen',
      location: 'Casablanca',
      dates: '2022 — 2024',
      description: 'Option Web Full Stack. Mention Très Bien. Formation intensive couvrant le développement front-end, back-end, bases de données et méthodologies agiles.',
      icon: 'code-2',
      order: 3,
    },
    {
      type: 'education',
      title: 'Baccalauréat',
      company: 'Lycée Abdelmalek Essaadi',
      location: 'Casablanca',
      dates: '2022',
      description: "Obtention du diplôme de Baccalauréat, ouvrant la voie aux études supérieures en technologie.",
      icon: 'book-open',
      order: 4,
    },
  ]);
  console.log('✅ 6 éléments timeline créés');

  console.log('\n🎉 Seeding terminé avec succès !');
  process.exit(0);
};

seedData().catch((err) => {
  console.error('❌ Erreur seed:', err);
  process.exit(1);
});
