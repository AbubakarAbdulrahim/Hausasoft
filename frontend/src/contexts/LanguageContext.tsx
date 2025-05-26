import React, { createContext, useState, useEffect } from 'react';

type Language = 'en' | 'ha';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Common
    'app.name': 'Hausasoft Technologies',
    'app.tagline': 'Empowering Africa with Digital Skills',
    
    // Navigation
    'nav.home': 'Home',
    'nav.courses': 'Courses',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    'nav.ai': 'Learn with AI',
    'nav.support': 'Support',
    
    // Home page
    'home.hero.title': 'Learn Digital Skills in Your Language',
    'home.hero.subtitle': 'Accessible tech education for Hausa-speaking communities and beyond',
    'home.hero.cta': 'Start Learning',
    'home.features.title': 'Why Choose Hausasoft Technologies?',
    'home.popular.title': 'Popular Courses',
    'home.testimonials.title': 'What Our Students Say',
    'home.about.title': 'About Us',
    'home.about.desc': 'Hausasoft Technologies is dedicated to making quality tech education accessible to everyone. Our mission is to empower learners by providing bilingual courses, engaging content, and industry-recognized certifications. We believe in breaking barriers and building a community where everyone can thrive in the digital world.',
    'home.about.mission.title': 'Our Mission',
    'home.about.mission.desc': 'To bridge the digital divide by offering high-quality, accessible, and inclusive technology education in both English and Hausa languages.',
    'home.about.values.title': 'Our Values',
    'home.about.values.item1': 'Accessibility for all',
    'home.about.values.item2': 'Community-driven learning',
    'home.about.values.item3': 'Continuous innovation',
    'home.about.values.item4': 'Empowerment through knowledge',
    'home.about.values.item5': 'Celebrating diversity',
    'home.testimonials.desc': 'Hear from our students who have transformed their careers through our courses',
    'home.testimonials.1.text': 'Hausasoft Technologies changed my life. Being able to learn in Hausa made complex tech concepts clear to me. I now work as a web developer at a leading tech company in Kano.',
    'home.testimonials.1.name': 'Amina Ibrahim',
    'home.testimonials.1.role': 'Web Developer',
    'home.testimonials.2.text': 'I was struggling to understand programming until I found courses in Hausa. The instructors explain everything clearly, and the practical exercises helped me build real skills.',
    'home.testimonials.2.name': 'Yusuf Mohammed',
    'home.testimonials.2.role': 'Mobile App Developer',
    'home.testimonials.3.text': 'As an instructor, I\'ve seen how Hausasoft Technologies bridges the tech education gap. My students can finally learn in their native language, accelerating their understanding.',
    'home.testimonials.3.name': 'Fatima Abubakar',
    'home.testimonials.3.role': 'Digital Marketing Instructor',
    'home.contact.title': 'Contact Us',
    'home.contact.desc': 'We\'d love to hear from you! Fill out the form below or reach us directly at Location: Kano, Nigeria, Phone: 08169920252, Email: hausasoft@gmail.com.',
    'home.contact.name': 'Name',
    'home.contact.namePlaceholder': 'Your Name',
    'home.contact.email': 'Email',
    'home.contact.emailPlaceholder': 'you@email.com',
    'home.contact.message': 'Message',
    'home.contact.messagePlaceholder': 'Type your message...',
    'home.contact.send': 'Send Message',
    
    // Courses
    'courses.title': 'Explore Our Courses',
    'courses.search': 'Search courses...',
    'courses.filter': 'Filter',
    'courses.sort': 'Sort by',
    'courses.category': 'Category',
    'courses.level': 'Level',
    'courses.free': 'Free',
    'courses.price': 'Price',
    'courses.notFound': 'No courses found',
    
    // Course details
    'course.enroll': 'Enroll Now',
    'course.enrolled': 'You are enrolled',
    'course.start': 'Start Learning',
    'course.continue': 'Continue Learning',
    'course.lessons': 'Lessons',
    'course.reviews': 'Reviews',
    'course.instructor': 'Instructor',
    'course.requirements': 'Requirements',
    'course.description': 'Description',
    
    // Dashboard
    'dashboard.student.title': 'Student Dashboard',
    'dashboard.instructor.title': 'Instructor Dashboard',
    'dashboard.admin.title': 'Admin Dashboard',
    'dashboard.courses': 'My Courses',
    'dashboard.progress': 'Progress',
    'dashboard.achievements': 'Achievements',
    'dashboard.analytics': 'Analytics',

    // Auth
    'auth.login.title': 'Login to Your Account',
    'auth.register.title': 'Create an Account',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.role': 'I am a',
    'auth.login.button': 'Login',
    'auth.register.button': 'Register',
    'auth.login.noAccount': 'Don\'t have an account?',
    'auth.register.hasAccount': 'Already have an account?',

    // Learn with AI
    'ai.heading': 'Learn with AI',
    'ai.description': 'Ask any question about tech, coding, or learning. Our AI is here to help you 24/7!',
    'ai.inputPlaceholder': 'Type your question...',
    'ai.startMessage': 'Start the conversation...',
    'ai.send': 'Send',
    'ai.mockResponse': 'AI says: "{question}" (This is a mock response.)',
    'ai.recommend.q1': 'How do I start learning web development?',
    'ai.recommend.q2': 'What is the best way to practice coding?',
    'ai.recommend.q3': 'Can you explain the difference between HTML and CSS?',

    // Footer
    'footer.about': 'About Us',
    'footer.testimonials': 'Testimonials',

    // Support page
    'support.heading': 'Support',
    'support.description': 'Need help? Fill out the form below and our team will get back to you as soon as possible.',
    'support.name': 'Name',
    'support.namePlaceholder': 'Your Name',
    'support.email': 'Email',
    'support.emailPlaceholder': 'you@email.com',
    'support.message': 'Message',
    'support.messagePlaceholder': 'Type your message...',
    'support.send': 'Send Message',
    'support.error': 'Please fill in all fields.',
    'support.success': 'Thank you! Your message has been sent.',
  },
  ha: {
    // Common
    'app.name': 'Hausasoft Koyo',
    'app.tagline': 'Ilimin Fasaha Ga Kowa',
    
    // Navigation
    'nav.home': 'Gida',
    'nav.courses': 'Darussan',
    'nav.dashboard': 'Dashbod',
    'nav.login': 'Shiga',
    'nav.register': 'Yi Rajista',
    'nav.logout': 'Fita',
    'nav.ai': 'Koyo da AI',
    'nav.support': 'Taimako',
    
    // Home page
    'home.hero.title': 'Koya Ilimin Fasaha Da Yarenku',
    'home.hero.subtitle': 'Ilimin fasaha mai saukin samowa ga al\'ummar Hausa da sauran',
    'home.hero.cta': 'Fara Koyo',
    'home.features.title': 'Me Ya Sa Za Ka Zaɓi Hausasoft Technologies?',
    'home.popular.title': 'Darussan Da Aka Fi So',
    'home.testimonials.title': 'Abin Da Dalibai Suka Ce',
    'home.about.title': 'Game da Mu',
    'home.about.desc': 'Hausasoft Technologies ta kuduri aniyar samar da ingantaccen ilimin fasaha ga kowa. Manufarmu ita ce karfafa gwiwar masu koyo ta hanyar samar da darussa a Hausa da Turanci, abun koyo mai kayatarwa, da takardun shaida masu daraja. Muna da yakinin karya shinge da gina al\'umma mai cike da ci gaba a duniyar fasaha.',
    'home.about.mission.title': 'Manufarmu',
    'home.about.mission.desc': 'Kawo karshen gibin fasaha ta hanyar samar da ilimi mai inganci, mai saukin samu, kuma mai hada kowa a Hausa da Turanci.',
    'home.about.values.title': 'Dabi\'unmu',
    'home.about.values.item1': 'Ilimi ga kowa',
    'home.about.values.item2': 'Koyo tare da al\'umma',
    'home.about.values.item3': 'Ci gaba da kirkire-kirkire',
    'home.about.values.item4': 'Karfi ta hanyar ilimi',
    'home.about.values.item5': 'Murna da bambance-bambance',
    'home.testimonials.desc': 'Ji daga dalibanmu da suka canza rayuwarsu ta hanyar darussanmu',
    'home.testimonials.1.text': 'Hausasoft Technologies ta canza rayuwata. Samun damar koyo da Hausa ya sa na fahimci abubuwan fasaha cikin sauki. Yanzu ina aiki a matsayin mai haɓaka yanar gizo a kamfani mai suna Kano.',
    'home.testimonials.1.name': 'Amina Ibrahim',
    'home.testimonials.1.role': 'Mai Haɓaka Yanar Gizo',
    'home.testimonials.2.text': 'Na sha wahala wajen fahimtar shirye-shirye har sai da na samu darussa a Hausa. Malaman suna bayyana komai a fili, kuma atisayen hannu sun taimaka min wajen gina kwarewa.',
    'home.testimonials.2.name': 'Yusuf Mohammed',
    'home.testimonials.2.role': 'Mai Haɓaka Manhajar Wayar Salula',
    'home.testimonials.3.text': 'A matsayina na malami, na ga yadda Hausasoft Technologies ke cike gibin ilimin fasaha. Dalibaina yanzu na iya koyo da harshensu, hakan yana hanzarta fahimtarsu.',
    'home.testimonials.3.name': 'Fatima Abubakar',
    'home.testimonials.3.role': 'Malamar Tallan Dijital',
    'home.contact.title': 'Tuntube Mu',
    'home.contact.desc': 'Muna son jin ra\'ayinka! Cika fom ɗin da ke ƙasa ko tuntuɓe mu kai tsaye a: Wuri: Kano, Najeriya, Waya: 08169920252, Imel: hausasoft@gmail.com.',
    'home.contact.name': 'Suna',
    'home.contact.namePlaceholder': 'Sunan ka',
    'home.contact.email': 'Imel',
    'home.contact.emailPlaceholder': 'imel@misali.com',
    'home.contact.message': 'Saƙo',
    'home.contact.messagePlaceholder': 'Rubuta saƙonka...',
    'home.contact.send': 'Aika Saƙo',
    
    // Courses
    'courses.title': 'Bincika Darussan Mu',
    'courses.search': 'Bincika darussan...',
    'courses.filter': 'Tace',
    'courses.sort': 'Tsara ta',
    'courses.category': 'Rukuni',
    'courses.level': 'Matakai',
    'courses.free': 'Kyauta',
    'courses.price': 'Farashi',
    'courses.notFound': 'Ba a sami darussan ba',
    
    // Course details
    'course.enroll': 'Yi Rajista Yanzu',
    'course.enrolled': 'An Yi Rajista',
    'course.start': 'Fara Koyo',
    'course.continue': 'Ci Gaba Da Koyo',
    'course.lessons': 'Darussan',
    'course.reviews': 'Martanai',
    'course.instructor': 'Malami',
    'course.requirements': 'Bukatun',
    'course.description': 'Bayani',
    
    // Dashboard
    'dashboard.student.title': 'Dashbod na Dalibi',
    'dashboard.instructor.title': 'Dashbod na Malami',
    'dashboard.admin.title': 'Dashbod na Admin',
    'dashboard.courses': 'Darussan Na',
    'dashboard.progress': 'Cigaba',
    'dashboard.achievements': 'Nasarori',
    'dashboard.analytics': 'Nazari',

    // Auth
    'auth.login.title': 'Shiga Cikin Asusunka',
    'auth.register.title': 'Ƙirƙiri Asusun',
    'auth.email': 'Imel',
    'auth.password': 'Kalmar Sirri',
    'auth.name': 'Suna Cikakke',
    'auth.role': 'Ni ',
    'auth.login.button': 'Shiga',
    'auth.register.button': 'Yi Rajista',
    'auth.login.noAccount': 'Ba ka da asusun?',
    'auth.register.hasAccount': 'Kana da asusun?',

    // Learn with AI
    'ai.heading': 'Koyo da AI',
    'ai.description': 'Tambayi kowanne abu game da fasaha, lissafi, ko koyo. AI ɗinmu na nan don taimaka maka a kowane lokaci!',
    'ai.inputPlaceholder': 'Rubuta tambayarka...',
    'ai.startMessage': 'Fara tattaunawa...',
    'ai.send': 'Aika',
    'ai.mockResponse': 'AI tace: "{question}" (Wannan amsa ce ta gwaji.)',
    'ai.recommend.q1': 'Ta yaya zan fara koyon yanar gizo?',
    'ai.recommend.q2': 'Menene hanya mafi kyau don yin atisaye da lissafi?',
    'ai.recommend.q3': 'Za ka iya bayyana bambanci tsakanin HTML da CSS? ',

    // Footer
    'footer.about': 'Game da Mu',
    'footer.testimonials': 'Shaidun Dalibai',

    // Support page
    'support.heading': 'Taimako',
    'support.description': 'Kana bukatar taimako? Cika fom ɗin da ke ƙasa, ƙungiyarmu za ta tuntube ka da wuri-wuri.',
    'support.name': 'Suna',
    'support.namePlaceholder': 'Sunan ka',
    'support.email': 'Imel',
    'support.emailPlaceholder': 'imel@misali.com',
    'support.message': 'Saƙo',
    'support.messagePlaceholder': 'Rubuta saƙonka...',
    'support.send': 'Aika Saƙo',
    'support.error': 'Da fatan za a cika dukkan filayen.',
    'support.success': 'Na gode! An aika saƙonka.',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('hausasoft_language') as Language;
    return savedLanguage || 'en';
  });

  useEffect(() => {
    localStorage.setItem('hausasoft_language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};