// Long-form "about this exam" content shown under an exam's subject list.
// Keyed by exam document _id, like `liveExamMeta`. Every section after the intro is optional.
// `subjects` on a syllabus area lists practice subject slugs; links appear only for subjects that are live.
export interface ExamGuide {
  heading: string;
  intro: string[];
  facts?: { title: string; source: string; items: { label: string; value: string }[] };
  pattern?: {
    summary: string;
    caption: string;
    sections: { part: string; subject: string; questions: number; marks: number }[];
    duration: string;
    marking: { response: string; marks: string }[];
    note: string;
  };
  syllabus?: { intro?: string; areas: { title: string; subjects?: string[]; summary: string; topics: string[] }[] };
  eligibility?: { intro: string; items: { title: string; detail: string }[] };
  stages?: { intro: string; items: { title: string; detail: string }[] };
  merit?: { title: string; detail: string }[];
  tips?: { title: string; detail: string }[];
  faq?: { question: string; answer: string }[];
}

export const examGuides: Record<string, ExamGuide> = {
  'bpsc-tre-4.0/computer': {
    heading: 'About the BPSC TRE 4.0 Computer Science exam',
    intro: [
      'The Bihar Public Service Commission Teacher Recruitment Exam (BPSC TRE) is one of the largest teacher hiring drives in India. TRE 4.0 is recruiting for 33,320 posts in Bihar’s government schools, and 407 of them are for Computer Science teachers in higher secondary schools (Classes 11–12). With lakhs of candidates competing, a planned approach to preparation matters.',
      'ExamForge gives you free, timed practice for the Computer Science paper: 70 sets across 14 subjects, from computer fundamentals and digital logic to DBMS, networks, AI and cyber security. Every question is in English and Hindi, and each one comes with an explanation after you submit. Your first three sets need no signup.',
      'Start with the subjects you find hardest to build your concepts, then work through every set under the clock to build speed and accuracy. Sets give you one minute per question, the same pace as the real paper. They do not deduct marks for wrong answers, so to rehearse TRE 4.0 scoring, take one-third of a mark off for each wrong answer yourself.',
    ],
    facts: {
      title: 'TRE 4.0 at a glance',
      source: 'From BPSC Advertisement 15/2026 (22 September 2026) and its corrigendum of 29 September 2026. Check bpsc.bihar.gov.in for later notices.',
      items: [
        { label: 'Computer Science posts', value: '407 (Classes 11–12)' },
        { label: 'Online application', value: '25 September to 26 October 2026' },
        { label: 'Exam fee', value: '₹100' },
        { label: 'Starting basic pay', value: '₹32,000 a month' },
        { label: 'Exam date', value: 'Not announced yet' },
        { label: 'Apply at', value: 'bpsconline.bihar.gov.in' },
      ],
    },
    pattern: {
      summary: 'The written exam is a single objective paper of 150 questions in three parts, with 2 hours 30 minutes for the whole paper. Each question has five options: A to D, and E for “I do not want to answer”.',
      caption: 'BPSC TRE 4.0 written exam for Class 11–12 teachers',
      sections: [
        { part: 'Part I', subject: 'Language: English and Hindi, Urdu or Bangla (qualifying)', questions: 30, marks: 30 },
        { part: 'Part II', subject: 'General Studies', questions: 40, marks: 40 },
        { part: 'Part III', subject: 'Computer Science', questions: 80, marks: 80 },
      ],
      duration: '2 hours 30 minutes',
      marking: [
        { response: 'Correct answer', marks: '+1' },
        { response: 'Wrong answer', marks: '−⅓' },
        { response: 'Option E (chose not to answer)', marks: '0' },
        { response: 'No option marked', marks: '−⅓' },
      ],
      note: 'Part I only has to be qualified, with at least 30%. Your rank comes from the 120 marks in Parts II and III, and 80 of those are Computer Science. If two candidates tie, the Computer Science score decides, then Part I, then age. There is no re-evaluation.',
    },
    syllabus: {
      intro: 'Subject papers follow the SCERT/NCERT curriculum, set at the level of the post’s minimum qualification. Computer Science carries two-thirds of the marks that decide your rank; ExamForge groups its 14 practice subjects into the areas below.',
      areas: [
        {
          title: 'Computer fundamentals and digital logic', subjects: ['computer-fundamentals', 'digital-logic'],
          summary: 'How a computer is built and how it represents and processes data.',
          topics: ['Generations, components and the CPU', 'Memory hierarchy, storage and input/output', 'Number systems and binary arithmetic', 'Logic gates, Boolean algebra and K-maps', 'Combinational and sequential circuits'],
        },
        {
          title: 'Programming and software', subjects: ['programming-languages', 'data-structures', 'software-engineering'],
          summary: 'Writing, organising and engineering programs.',
          topics: ['C, C++, Java and Python basics', 'Object-oriented concepts', 'Arrays, stacks, queues, linked lists, trees and graphs', 'Searching, sorting and complexity', 'Software development life cycle models, testing and design'],
        },
        {
          title: 'Systems, databases and networks', subjects: ['operating-systems', 'dbms', 'computer-networks'],
          summary: 'The software and infrastructure that every application runs on.',
          topics: ['Processes, scheduling, deadlocks and memory management', 'Relational model, SQL and normalisation', 'Transactions and concurrency', 'OSI and TCP/IP models, protocols and addressing', 'Network devices and topologies'],
        },
        {
          title: 'Web, cloud and security', subjects: ['web-technologies', 'cloud-computing', 'iot', 'cyber-security'],
          summary: 'Modern computing on the internet and keeping it safe.',
          topics: ['HTML, CSS, JavaScript and HTTP', 'Cloud service and deployment models', 'IoT devices, sensors and protocols', 'Threats, malware and attacks', 'Cryptography and cyber law'],
        },
        {
          title: 'Artificial intelligence and machine learning', subjects: ['ai', 'machine-learning'],
          summary: 'How machines search, reason and learn from data.',
          topics: ['Search algorithms and heuristics', 'Knowledge representation and expert systems', 'Natural language processing and neural networks', 'Supervised and unsupervised learning', 'Model evaluation'],
        },
        {
          title: 'General Studies and language',
          summary: 'Parts I and II of the paper. ExamForge does not have practice sets for these yet.',
          topics: ['Elementary mathematics', 'General awareness', 'General science', 'The Indian national movement', 'Geography', 'Practical knowledge of English and Hindi, Urdu or Bangla (qualifying)'],
        },
      ],
    },
    eligibility: {
      intro: 'The main conditions for a Class 11–12 Computer Science teacher, in short. The advertisement lists every accepted qualification.',
      items: [
        { title: 'Qualification', detail: 'At least 50% in an accepted qualification, such as B.E./B.Tech in Computer Science or IT, M.Sc. Computer Science or MCA, or BCA/B.Sc. Computer Science with a postgraduate degree in any subject. A B.Ed. is not required for Computer Science.' },
        { title: 'Teacher eligibility test', detail: 'STET Paper-II passed. Candidates taking STET 2026 can apply, but must pass it before the written exam to get an admit card.' },
        { title: 'Age', detail: 'At least 21 on 1 August 2026. The upper limit, counted on 1 August 2024, is 37 for unreserved men, 40 for BC and EBC candidates and unreserved women, and 42 for SC, ST and transgender candidates.' },
        { title: 'Attempts', detail: 'A candidate can take the exam at most five times.' },
      ],
    },
    stages: {
      intro: 'TRE 4.0 has no interview: selection rests on the written exam.',
      items: [
        { title: 'Written examination', detail: 'The objective paper above. Part I must be qualified with at least 30%.' },
        { title: 'Provisional merit list', detail: 'BPSC ranks qualified candidates on their Part II and Part III marks and sends the list to the Education Department.' },
        { title: 'Document verification and posting', detail: 'The department verifies original certificates, including STET, before appointment and allots districts.' },
      ],
    },
    merit: [
      { title: 'Minimum qualifying marks', detail: 'In the written exam: 40% for unreserved candidates, 36.5% for BC, 34% for EBC, and 32% for SC and ST candidates and for women and candidates with disabilities who are residents of Bihar.' },
      { title: 'Guest teacher weightage', detail: 'Eligible guest teachers can get 5 marks for each year of service, up to 25, added after they reach the qualifying marks. This depends on a pending High Court appeal.' },
      { title: 'Several posts', detail: 'If you qualify for more than one class group, you set an order of preference in your application, and results follow that order.' },
      { title: 'Reservation and domicile', detail: 'Reservation, including 35% horizontal reservation for women, applies only to residents of Bihar. 40% of posts go to candidates who passed Class 10 or 12 from an institution in Bihar.' },
    ],
    tips: [
      { title: 'Mark Option E when you skip', detail: 'A wrong answer costs one-third of a mark, and so does leaving a question with no option marked. If you do not know an answer, mark E: it is the only way to score zero instead of losing marks.' },
      { title: 'Guess only when you can eliminate', detail: 'With −⅓ for a wrong answer, a blind guess among four options gains nothing on average. Once you can rule out even one option, a guess is worth taking.' },
      { title: 'Treat Computer Science as the main event', detail: 'It is 80 of the 120 merit marks and also breaks ties. Work through every subject on ExamForge rather than only your favourites.' },
      { title: 'Do not skip General Studies', detail: 'Its 40 marks often separate candidates with similar subject scores. Give elementary mathematics, general science and current affairs regular time.' },
      { title: 'Trace code by hand', detail: 'Output and error questions on C, C++, Java and Python are common. Work through short programs on paper instead of running them.' },
      { title: 'Revise in both languages', detail: 'The paper is set in Hindi and English. Switching a question to Hindi helps you learn the technical terms either way.' },
    ],
    faq: [
      { question: 'Is there negative marking in BPSC TRE 4.0?', answer: 'Yes. One-third of a mark is deducted for each wrong answer, and also for each question where you mark none of the five options. Marking option E (“I do not want to answer”) scores zero. Earlier rounds had no negative marking, so this is new in TRE 4.0.' },
      { question: 'When is the TRE 4.0 exam?', answer: 'BPSC has not announced the exam date yet. Online applications are open from 25 September to 26 October 2026, and the exam may be held in more than one phase depending on the number of candidates.' },
      { question: 'Do I need a B.Ed. to apply for Computer Science?', answer: 'No. The advertisement says a B.Ed. is not mandatory for Computer Science candidates, but you do need an accepted degree with at least 50% and a STET Paper-II pass.' },
      { question: 'How many questions are in each ExamForge set?', answer: 'Each Computer Science set has 30 questions and a 30-minute timer (one set has 29 questions and 29 minutes). There are 5 sets in each of the 14 subjects.' },
      { question: 'Are the questions available in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'bpsc-tre-4.0/physics-11-12': {
    heading: 'About the BPSC TRE 4.0 Physics exam',
    intro: [
      'The Bihar Public Service Commission Teacher Recruitment Exam (BPSC TRE) is one of the largest teacher hiring drives in India. TRE 4.0 is recruiting for 33,320 posts in Bihar’s government schools, and 1,758 of them are for Physics teachers in higher secondary schools (Classes 11–12), one of the largest subjects at that level.',
      'ExamForge gives you free, timed practice for the Physics paper: 100 sets across all 20 units of the Class 11–12 course, from measurement and kinematics to optics, nuclei and semiconductor devices. Every question is in English and Hindi, and each one comes with an explanation after you submit. Your first three sets need no signup.',
      'Start with the units you find hardest, then work through every set under the clock. Sets give you one minute per question, the same pace as the real paper. They do not deduct marks for wrong answers, so to rehearse TRE 4.0 scoring, take one-third of a mark off for each wrong answer yourself.',
    ],
    facts: {
      title: 'TRE 4.0 at a glance',
      source: 'From BPSC Advertisement 15/2026 (22 September 2026) and its corrigendum of 29 September 2026. Check bpsc.bihar.gov.in for later notices.',
      items: [
        { label: 'Physics posts', value: '1,758 (Classes 11–12)' },
        { label: 'Online application', value: '25 September to 26 October 2026' },
        { label: 'Exam fee', value: '₹100' },
        { label: 'Starting basic pay', value: '₹32,000 a month' },
        { label: 'Exam date', value: 'Not announced yet' },
        { label: 'Apply at', value: 'bpsconline.bihar.gov.in' },
      ],
    },
    pattern: {
      summary: 'The written exam is a single objective paper of 150 questions in three parts, with 2 hours 30 minutes for the whole paper. Each question has five options: A to D, and E for “I do not want to answer”.',
      caption: 'BPSC TRE 4.0 written exam for Class 11–12 teachers',
      sections: [
        { part: 'Part I', subject: 'Language: English and Hindi, Urdu or Bangla (qualifying)', questions: 30, marks: 30 },
        { part: 'Part II', subject: 'General Studies', questions: 40, marks: 40 },
        { part: 'Part III', subject: 'Physics', questions: 80, marks: 80 },
      ],
      duration: '2 hours 30 minutes',
      marking: [
        { response: 'Correct answer', marks: '+1' },
        { response: 'Wrong answer', marks: '−⅓' },
        { response: 'Option E (chose not to answer)', marks: '0' },
        { response: 'No option marked', marks: '−⅓' },
      ],
      note: 'Part I only has to be qualified, with at least 30%. Your rank comes from the 120 marks in Parts II and III, and 80 of those are Physics. If two candidates tie, the Physics score decides, then Part I, then age. There is no re-evaluation.',
    },
    syllabus: {
      intro: 'Subject papers follow the SCERT/NCERT curriculum, set at the level of the post’s minimum qualification. Physics carries two-thirds of the marks that decide your rank; ExamForge’s 20 practice subjects follow the Class 11–12 units and are grouped below.',
      areas: [
        {
          title: 'Measurement and mechanics', subjects: ['physical-world-measurement', 'kinematics', 'laws-of-motion', 'work-energy-and-power', 'motion-of-system-of-particles-rigid-body', 'gravitation'],
          summary: 'Class 11 mechanics, the largest block of the course.',
          topics: ['Units, dimensions, errors and significant figures', 'Motion in one and two dimensions, projectiles and relative velocity', 'Newton’s laws, friction and circular motion', 'Work–energy theorem, power and collisions', 'Centre of mass, torque, angular momentum and moment of inertia', 'Kepler’s laws, g and its variation, orbits and escape speed'],
        },
        {
          title: 'Matter, heat and thermodynamics', subjects: ['properties-of-bulk-matter', 'thermodynamics', 'kinetic-theory-of-gases'],
          summary: 'How solids, liquids and gases behave, and the laws of heat.',
          topics: ['Elasticity, stress, strain and moduli', 'Pressure, viscosity, surface tension and Bernoulli’s principle', 'Thermal expansion, calorimetry and heat transfer', 'Laws of thermodynamics, processes and heat engines', 'Kinetic theory, degrees of freedom and specific heats'],
        },
        {
          title: 'Oscillations, waves and optics', subjects: ['oscillations-waves', 'electromagnetic-waves', 'optics'],
          summary: 'Periodic motion, waves and the behaviour of light.',
          topics: ['Simple harmonic motion and pendulums', 'Wave speed, superposition, standing waves, beats and the Doppler effect', 'Electromagnetic spectrum and its uses', 'Reflection, refraction, lenses, prisms and optical instruments', 'Interference, diffraction and polarisation'],
        },
        {
          title: 'Electricity and magnetism', subjects: ['electrostatics', 'current-electricity', 'magnetic-effects-magnetism', 'electromagnetic-induction-ac'],
          summary: 'The core of Class 12, from charges at rest to alternating current.',
          topics: ['Coulomb’s law, electric field, Gauss’s law and potential', 'Capacitors and dielectrics', 'Ohm’s law, Kirchhoff’s rules, Wheatstone bridge and potentiometer', 'Biot–Savart and Ampère’s laws, moving coil galvanometer and magnetic materials', 'Faraday’s and Lenz’s laws, inductance, AC circuits, resonance and transformers'],
        },
        {
          title: 'Modern physics and electronics', subjects: ['dual-nature-of-matter', 'atoms-nuclei', 'electronic-devices', 'communication-systems'],
          summary: 'Quantum ideas, the atom and nucleus, and the devices built on them.',
          topics: ['Photoelectric effect and de Broglie waves', 'Bohr model and hydrogen spectrum', 'Radioactivity, binding energy, fission and fusion', 'Semiconductors, p-n junctions, diodes, transistors and logic gates', 'Modulation, bandwidth and propagation of signals'],
        },
        {
          title: 'General Studies and language',
          summary: 'Parts I and II of the paper. ExamForge does not have practice sets for these yet.',
          topics: ['Elementary mathematics', 'General awareness', 'General science', 'The Indian national movement', 'Geography', 'Practical knowledge of English and Hindi, Urdu or Bangla (qualifying)'],
        },
      ],
    },
    eligibility: {
      intro: 'The main conditions for a Class 11–12 Physics teacher, in short. The advertisement lists every accepted qualification.',
      items: [
        { title: 'Qualification', detail: 'A postgraduate degree in Physics with at least 50% and a B.Ed., or a postgraduate degree with a four-year integrated B.Sc.Ed., or a postgraduate degree with 55% and a three-year integrated B.Ed.–M.Ed. Reserved categories and women get the relaxation in marks set out in the advertisement.' },
        { title: 'Teacher eligibility test', detail: 'STET Paper-II in Physics passed. Candidates taking STET 2026 can apply, but must pass it before the written exam to get an admit card.' },
        { title: 'Age', detail: 'At least 21 on 1 August 2026. The upper limit, counted on 1 August 2024, is 37 for unreserved men, 40 for BC and EBC candidates and unreserved women, and 42 for SC, ST and transgender candidates.' },
        { title: 'Attempts', detail: 'A candidate can take the exam at most five times.' },
      ],
    },
    stages: {
      intro: 'TRE 4.0 has no interview: selection rests on the written exam.',
      items: [
        { title: 'Written examination', detail: 'The objective paper above. Part I must be qualified with at least 30%.' },
        { title: 'Provisional merit list', detail: 'BPSC ranks qualified candidates on their Part II and Part III marks and sends the list to the Education Department.' },
        { title: 'Document verification and posting', detail: 'The department verifies original certificates, including STET, before appointment and allots districts.' },
      ],
    },
    merit: [
      { title: 'Minimum qualifying marks', detail: 'In the written exam: 40% for unreserved candidates, 36.5% for BC, 34% for EBC, and 32% for SC and ST candidates and for women and candidates with disabilities who are residents of Bihar.' },
      { title: 'Guest teacher weightage', detail: 'Eligible guest teachers can get 5 marks for each year of service, up to 25, added after they reach the qualifying marks. This depends on a pending High Court appeal.' },
      { title: 'Several posts', detail: 'If you qualify for more than one class group, you set an order of preference in your application, and results follow that order.' },
      { title: 'Reservation and domicile', detail: 'Reservation, including 35% horizontal reservation for women, applies only to residents of Bihar. 40% of posts go to candidates who passed Class 10 or 12 from an institution in Bihar.' },
    ],
    tips: [
      { title: 'Mark Option E when you skip', detail: 'A wrong answer costs one-third of a mark, and so does leaving a question with no option marked. If you do not know an answer, mark E: it is the only way to score zero instead of losing marks.' },
      { title: 'Guess only when you can eliminate', detail: 'With −⅓ for a wrong answer, a blind guess among four options gains nothing on average. Once you can rule out even one option, a guess is worth taking.' },
      { title: 'Cover all 20 units', detail: 'Physics is 80 of the 120 merit marks and also breaks ties. Questions come from every unit, so work through each subject on ExamForge rather than only mechanics and electricity.' },
      { title: 'Check units and dimensions first', detail: 'Many numerical options can be ruled out by their units or by an order-of-magnitude estimate before you calculate anything.' },
      { title: 'Keep a formula sheet', detail: 'Short numericals reward instant recall: kinematic equations, moments of inertia, lens and mirror formulas, Bohr-model results and semiconductor relations. Revise them from the explanations after each set.' },
      { title: 'Revise in both languages', detail: 'The paper is set in Hindi and English. Switching a question to Hindi helps you learn the technical terms either way.' },
    ],
    faq: [
      { question: 'Is there negative marking in BPSC TRE 4.0?', answer: 'Yes. One-third of a mark is deducted for each wrong answer, and also for each question where you mark none of the five options. Marking option E (“I do not want to answer”) scores zero. Earlier rounds had no negative marking, so this is new in TRE 4.0.' },
      { question: 'When is the TRE 4.0 exam?', answer: 'BPSC has not announced the exam date yet. Online applications are open from 25 September to 26 October 2026, and the exam may be held in more than one phase depending on the number of candidates.' },
      { question: 'Do I need a B.Ed. to apply for Physics?', answer: 'Yes, or one of the integrated alternatives: a postgraduate degree in Physics with at least 50% and a B.Ed., a four-year integrated B.Sc.Ed., or 55% with a three-year integrated B.Ed.–M.Ed. You also need a STET Paper-II pass in Physics.' },
      { question: 'How many questions are in each ExamForge set?', answer: 'Each Physics set has 20 questions and a 20-minute timer (four sets have 19 questions and 19 minutes). There are 5 sets in each of the 20 subjects.' },
      { question: 'Are the questions available in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'ssc-gd-constable': {
    heading: 'About the SSC GD Constable exam',
    intro: [
      'SSC GD Constable is one of the most widely taken government exams in India. Every year lakhs of candidates apply for General Duty posts in the BSF, CISF, CRPF, ITBP and SSB, the Secretariat Security Force (SSF) and Assam Rifles (Rifleman GD), so a planned approach to preparation matters.',
      'ExamForge gives you free, timed practice sets for every written section, with each question in English and Hindi and a worked explanation after you submit. Start with subject-wise sets to build your basics, then move to the full 80-question mock tests to train speed and accuracy. Your first three sets need no signup.',
      'Practice sets here allow one minute per question and do not deduct marks for wrong answers. To rehearse the real paper, aim to finish a full mock test in 60 minutes and score it the SSC way: +2 for a correct answer and −0.25 for a wrong one.',
    ],
    pattern: {
      summary: 'The Computer Based Examination (CBE) is a single objective paper of 80 questions in four parts. Every question carries 2 marks, and you have 60 minutes for the whole paper.',
      caption: 'Computer Based Examination sections',
      sections: [
        { part: 'Part A', subject: 'General Intelligence and Reasoning', questions: 20, marks: 40 },
        { part: 'Part B', subject: 'General Knowledge and General Awareness', questions: 20, marks: 40 },
        { part: 'Part C', subject: 'Elementary Mathematics', questions: 20, marks: 40 },
        { part: 'Part D', subject: 'English or Hindi', questions: 20, marks: 40 },
      ],
      duration: '60 minutes',
      marking: [
        { response: 'Correct answer', marks: '+2' },
        { response: 'Wrong answer', marks: '−0.25' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'With 80 questions in 60 minutes you have 45 seconds a question, so speed decides the paper as much as knowledge does.',
    },
    syllabus: {
      areas: [
        {
          title: 'General Intelligence and Reasoning', subjects: ['reasoning'],
          summary: 'Tests analytical aptitude and your ability to observe and tell patterns apart, through verbal and non-verbal questions.',
          topics: ['Analogies, similarities and differences', 'Spatial visualisation and orientation', 'Visual memory and discrimination', 'Arithmetical reasoning and figural classification', 'Number series and non-verbal series', 'Coding and decoding', 'Blood relations'],
        },
        {
          title: 'General Knowledge and General Awareness', subjects: ['general-awareness'],
          summary: 'Tests your awareness of the world around you and how it applies to society.',
          topics: ['Sports: history, terms and recent championships', 'History of India and its neighbouring countries', 'Culture: folk dances, festivals and Indian art', 'Physical and economic geography of India', 'The Indian economy and five-year plans', 'Polity, the Indian Constitution and scientific research'],
        },
        {
          title: 'Elementary Mathematics', subjects: ['mathematics'],
          summary: 'Number systems and basic arithmetic, mostly at matriculation (Class 10) level.',
          topics: ['Number systems and computation of whole numbers', 'Decimals, fractions and relationships between numbers', 'Fundamental operations, percentages and averages', 'Ratio and proportion, interest, profit and loss, discount', 'Mensuration, time and distance, time and work'],
        },
        {
          title: 'English or Hindi', subjects: ['hindi', 'english'],
          summary: 'Tests basic understanding and comprehension of the language you choose.',
          topics: ['Error spotting and fill in the blanks', 'Synonyms, antonyms and spelling', 'Idioms and phrases, one-word substitution', 'Sentence improvement, active and passive voice', 'Comprehension passages'],
        },
      ],
    },
    stages: {
      intro: 'Candidates go through four stages, and each one has to be cleared before the next.',
      items: [
        { title: 'Computer Based Examination (CBE)', detail: 'The objective online test above. It screens candidates and decides merit.' },
        { title: 'Physical Efficiency Test (PET)', detail: 'A timed run, qualifying in nature: 5 km in 24 minutes for men and 1.6 km in 8½ minutes for women.' },
        { title: 'Physical Standard Test (PST)', detail: 'Measurement of height, chest (for men) and weight against the notified standards.' },
        { title: 'Medical examination and document verification', detail: 'A detailed medical examination (DME) and checks of your original educational and identity documents.' },
      ],
    },
    merit: [
      { title: 'CBE marks', detail: 'The final merit list is drawn up on the marks you score in the CBE.' },
      { title: 'Qualifying PET and PST', detail: 'You must clear the physical tests to stay in the selection.' },
      { title: 'Medical fitness', detail: 'You must be declared fit in the medical examination to join.' },
      { title: 'Force allocation', detail: 'Forces such as the BSF, CISF and CRPF are allotted by merit rank and the preferences you filled in your application.' },
    ],
    tips: [
      { title: 'Take a mock test every day', detail: 'With only 60 minutes for 80 questions, speed matters most. Attempt at least one full mock test daily and review every explanation.' },
      { title: 'Build calculation speed', detail: 'Learn tables up to 30 and squares up to 50 to get through the mathematics section faster.' },
      { title: 'Plan current affairs', detail: 'Cover the last six to eight months, with extra attention to sports and government appointments.' },
      { title: 'Choose your language carefully', detail: 'Pick English or Hindi, whichever you are more comfortable in. This section can be very scoring.' },
      { title: 'Train for the PET early', detail: 'Start running alongside your written preparation (5 km for men, 1.6 km for women), because the physical stage is demanding.' },
    ],
    faq: [
      { question: 'Is there negative marking in SSC GD?', answer: 'Yes. In the real exam 0.25 marks are deducted for each wrong answer. ExamForge practice sets do not deduct marks, so score your full mock tests by hand if you want the exact SSC result.' },
      { question: 'How are the ExamForge mock tests structured?', answer: 'Each full mock test has 80 questions covering all four parts, like the real paper. There are also 5 shorter sets each for Reasoning, General Awareness, Mathematics and Hindi.' },
      { question: 'Can I practise in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'ssc-mts': {
    heading: 'About the SSC MTS exam',
    intro: [
      'The Staff Selection Commission’s Multi-Tasking (Non-Technical) Staff and Havaldar examination fills Group C posts across central government ministries and offices, and Havaldar posts in CBIC and CBN. It needs only a Class 10 pass, so it is one of the most widely taken SSC exams. Selection rests on a single computer-based exam taken in two sessions.',
      'ExamForge gives you free, timed practice for both sessions: 10 Session I mock tests (Mathematics and Reasoning) and 9 Session II mock tests (General Awareness and English), each on the real 45-minute timer, plus sectional sets for all four subjects. Every question is in English and Hindi with an explanation after you submit. Your first three sets need no signup.',
      'Session I has no negative marking, and neither do these sets. Session II deducts 1 of a question’s 3 marks for each wrong answer; ExamForge does not, so to rehearse Session II scoring, take one-third of a mark off for each wrong answer yourself.',
    ],
    facts: {
      title: 'SSC MTS at a glance',
      source: 'From recent SSC MTS (Non-Technical) Staff and Havaldar examination notices. Reports of the 2026 cycle’s dates and vacancies conflict, so check ssc.gov.in for the current notice.',
      items: [
        { label: 'Conducted by', value: 'Staff Selection Commission' },
        { label: 'Qualification', value: 'Class 10 (matriculation) pass' },
        { label: 'Exam', value: '90 questions, 270 marks, two 45-minute sessions' },
        { label: 'Pay', value: 'Level 1 of the 7th Pay Commission (₹18,000–56,900)' },
        { label: 'Exam fee', value: '₹100; no fee for women, SC, ST, PwBD and ex-servicemen' },
        { label: 'Apply at', value: 'ssc.gov.in' },
      ],
    },
    pattern: {
      summary: 'The Computer Based Examination has two sessions taken on the same day, both compulsory. Every question carries 3 marks, and each session has 45 minutes.',
      caption: 'SSC MTS Computer Based Examination',
      sections: [
        { part: 'Session I', subject: 'Numerical and Mathematical Ability', questions: 20, marks: 60 },
        { part: 'Session I', subject: 'Reasoning Ability and Problem Solving', questions: 20, marks: 60 },
        { part: 'Session II', subject: 'General Awareness', questions: 25, marks: 75 },
        { part: 'Session II', subject: 'English Language and Comprehension', questions: 25, marks: 75 },
      ],
      duration: '45 minutes for each session',
      marking: [
        { response: 'Correct answer', marks: '+3' },
        { response: 'Wrong answer in Session I', marks: '0' },
        { response: 'Wrong answer in Session II', marks: '−1' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'Session I is qualifying: Session II is only evaluated for candidates who clear it, and the merit list is drawn up on Session II marks alone. Scores are normalised across shifts.',
    },
    syllabus: {
      intro: 'Questions are set at Class 10 level. The Session I and Session II mock tests cover every area below; the sectional subjects give focused practice on each.',
      areas: [
        {
          title: 'Numerical and Mathematical Ability', subjects: ['mathematical-ability', 'mock-test-session-i'],
          summary: 'Arithmetic and basic geometry, half of Session I.',
          topics: ['Number system, HCF and LCM, fractions and decimals', 'Percentage, ratio and proportion, averages', 'Profit and loss, discount, simple and compound interest', 'Time and work, time and distance', 'Mensuration: area and volume of basic shapes', 'Simplification and square roots'],
        },
        {
          title: 'Reasoning Ability and Problem Solving', subjects: ['reasoning-ability', 'mock-test-session-i'],
          summary: 'Verbal and non-verbal reasoning, the other half of Session I.',
          topics: ['Analogy, classification and odd one out', 'Number and letter series', 'Coding and decoding', 'Blood relations and directions', 'Dictionary order and word arrangement', 'Venn diagrams, mirror and water images'],
        },
        {
          title: 'General Awareness', subjects: ['general-awareness', 'mock-test-session-ii'],
          summary: 'Static GK, science and current affairs; half of the merit marks.',
          topics: ['Indian history, culture and the national movement', 'Geography of India and the world', 'Indian polity and the Constitution', 'Economy, budget and government schemes', 'Everyday science', 'Sports, awards, books and current affairs'],
        },
        {
          title: 'English Language and Comprehension', subjects: ['english-language', 'mock-test-session-ii'],
          summary: 'Grammar and vocabulary; the other half of the merit marks.',
          topics: ['Spotting errors and subject–verb agreement', 'Fill in the blanks and sentence improvement', 'Synonyms, antonyms and spelling', 'Idioms, phrases and one-word substitution', 'Active and passive voice, direct and indirect speech', 'Reading comprehension'],
        },
      ],
    },
    eligibility: {
      intro: 'The main conditions, in short. Each notice sets the exact cut-off dates, relaxations and post-wise limits.',
      items: [
        { title: 'Qualification', detail: 'Matriculation (Class 10) or an equivalent from a recognised board.' },
        { title: 'Age', detail: '18 to 25 for most MTS posts; 18 to 27 for Havaldar in CBIC and CBN and some MTS posts. SC, ST, OBC, PwBD and ex-servicemen candidates get the usual age relaxation.' },
        { title: 'Nationality', detail: 'A citizen of India, or a subject of Nepal or Bhutan, among the other categories the notice lists.' },
      ],
    },
    stages: {
      intro: 'MTS posts are filled on the computer-based exam alone. Havaldar candidates have a physical stage as well.',
      items: [
        { title: 'Computer Based Examination', detail: 'The two-session exam above, offered in English, Hindi and 13 regional languages.' },
        { title: 'PET and PST (Havaldar only)', detail: 'Qualifying physical tests: men walk 1,600 metres in 15 minutes and women 1 km in 20 minutes, followed by height, chest and weight checks.' },
        { title: 'Document verification', detail: 'Original certificates are checked before a post and region are allotted.' },
      ],
    },
    merit: [
      { title: 'Clear Session I', detail: 'You must reach the minimum qualifying marks in Session I (30% for unreserved, 25% for OBC and EWS, 20% for others) for Session II to be evaluated.' },
      { title: 'Session II decides rank', detail: 'The merit list is drawn up on the normalised Session II score, out of 150.' },
      { title: 'Separate lists', detail: 'MTS and Havaldar have separate merit lists, and MTS vacancies are filled state- and UT-wise.' },
      { title: 'Havaldar fitness', detail: 'Havaldar candidates must also clear the PET and PST; the physical tests carry no marks.' },
    ],
    tips: [
      { title: 'Treat Session I as a gate', detail: 'It only has to be qualified, and there is no negative marking, so attempt every question and move on quickly from the hard ones.' },
      { title: 'Put your effort into Session II', detail: 'General Awareness and English decide your rank. Revise static GK and current affairs every day, and review each grammar explanation after a test.' },
      { title: 'Answer Session II with care', detail: 'A wrong answer costs a third of a correct one. Answer when you can rule out at least two options; otherwise leave it.' },
      { title: 'Practise the full session under the clock', detail: 'Take the Session I and Session II mock tests in one sitting with the 45-minute timer to learn your pace.' },
      { title: 'Learn the reasoning patterns', detail: 'Coding, series, dictionary order, Venn diagrams and mirror images repeat in every paper and are quick marks once you know the method.' },
    ],
    faq: [
      { question: 'Is there negative marking in SSC MTS?', answer: 'Only in Session II, where 1 mark is deducted for each wrong answer (each question carries 3). Session I has none. ExamForge sets do not deduct marks, so score Session II mock tests by hand for the exact result.' },
      { question: 'Do Session I marks count in the final merit?', answer: 'No. Session I is qualifying. Session II is evaluated only if you clear Session I, and the merit list is drawn up on Session II marks alone.' },
      { question: 'How are the ExamForge mock tests structured?', answer: 'There are 10 Session I mock tests and 9 Session II mock tests, each with a 45-minute timer like the real session. Session II tests have 48 to 50 questions; Session I tests have 33 to 39 questions, against the paper’s 40. Sectional sets have 20 questions for Mathematics and Reasoning and 25 for General Awareness and English, at one minute per question.' },
      { question: 'Can I practise in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'bihar-police-constable': {
    heading: 'About the Bihar Police Constable exam',
    intro: [
      'The Central Selection Board of Constables (CSBC), Bihar recruits constables (sipahi) for the Bihar Police and the Bihar Special Armed Police. Recruitment drives are large: the 2025 advertisement was for 19,838 posts. Selection starts with a written exam at Class 10 level, and only those who clear it are called to the physical test that decides merit.',
      'ExamForge gives you free, timed practice for the written exam: 5 full mock tests of 100 questions with the real 2-hour limit, mixing Hindi, English, Mathematics, Science, Social Science and Bihar GK the way the paper does, plus 5 sets each for General Knowledge and General Science. Every question is in English and Hindi with an explanation after you submit. Your first three sets need no signup.',
      'The written exam has no negative marking, and neither do these sets, so your score here is worked out the same way as in the exam. Take the full mock tests under the clock and aim well above the qualifying mark.',
    ],
    facts: {
      title: 'Bihar Police Constable at a glance',
      source: 'From CSBC Advertisement 01/2025. Check csbc.bihar.gov.in for the current advertisement before you apply.',
      items: [
        { label: 'Conducted by', value: 'CSBC, Bihar' },
        { label: 'Last recruitment', value: '19,838 posts (Advertisement 01/2025)' },
        { label: 'Written exam', value: '100 questions, 2 hours, OMR sheet' },
        { label: 'Qualifying mark', value: '30% in the written exam' },
        { label: 'Merit decided by', value: 'Physical Efficiency Test marks' },
        { label: 'Apply at', value: 'csbc.bihar.gov.in' },
      ],
    },
    pattern: {
      summary: 'The written exam is a single objective paper of 100 questions at matriculation (Class 10) level, answered on an OMR sheet. Each question carries one mark.',
      caption: 'CSBC constable written exam',
      sections: [
        { part: 'Paper', subject: 'Hindi, English, Mathematics, Science, Social Science and General Knowledge', questions: 100, marks: 100 },
      ],
      duration: '2 hours',
      marking: [
        { response: 'Correct answer', marks: '+1' },
        { response: 'Wrong answer', marks: '0' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'The written exam is qualifying: you need at least 30% to be called for the physical test, and the written marks are not added to your merit score. CSBC calls about five times as many candidates as there are posts in each category, so a score well above 30% is safer.',
    },
    syllabus: {
      intro: 'Questions are set at Class 10 level. ExamForge’s full mock tests cover every area below; the General Knowledge and General Science subjects give extra practice on the two largest.',
      areas: [
        {
          title: 'General Knowledge and current affairs', subjects: ['general-knowledge'],
          summary: 'Bihar-specific GK carries real weight, alongside national affairs.',
          topics: ['History, geography and culture of Bihar', 'Bihar’s districts, rivers, national parks and festivals', 'Indian polity and the Constitution', 'Important dates, books, authors and slogans', 'Current affairs and appointments'],
        },
        {
          title: 'General Science', subjects: ['general-science'],
          summary: 'Physics, Chemistry and Biology at Class 10 level.',
          topics: ['Units, motion, light, sound and electricity', 'Acids, bases, metals, alloys and common compounds', 'Human body, vitamins, diseases and nutrition', 'Cells, plants and photosynthesis', 'Instruments and inventions'],
        },
        {
          title: 'Social Science', subjects: ['mock-test'],
          summary: 'History, geography and civics from the school syllabus.',
          topics: ['Ancient, medieval and modern Indian history', 'The national movement', 'Physical and economic geography of India', 'Parliament, the President and the courts'],
        },
        {
          title: 'Mathematics', subjects: ['mock-test'],
          summary: 'Arithmetic and basic mensuration.',
          topics: ['Percentage, profit and loss, simple interest', 'Ratio, average, time and work, speed and distance', 'HCF, LCM, squares and square roots', 'Area and perimeter, triangles and circles'],
        },
        {
          title: 'Hindi and English', subjects: ['mock-test'],
          summary: 'Grammar and vocabulary in both languages.',
          topics: ['Sandhi, samas, tadbhav and muhavare', 'Synonyms and antonyms (paryayvachi, vilom)', 'Prepositions, articles, tenses and voice', 'Spelling, plurals and one-word substitution'],
        },
      ],
    },
    eligibility: {
      intro: 'The main conditions, in short. Each advertisement sets the exact cut-off dates, relaxations and physical standards.',
      items: [
        { title: 'Qualification', detail: 'Intermediate (Class 12) or an equivalent qualification from a recognised board.' },
        { title: 'Age', detail: 'At least 18. The upper limit for unreserved men has been 25, with higher limits for BC, EBC, women and SC and ST candidates.' },
        { title: 'Height', detail: 'For men, 165 cm for unreserved, BC and EBC candidates and 160 cm for SC and ST candidates; for women, 155 cm. Men also have a chest standard.' },
      ],
    },
    stages: {
      intro: 'Each stage has to be cleared before the next.',
      items: [
        { title: 'Written examination', detail: 'The objective paper above. It only qualifies you for the next stage.' },
        { title: 'Physical Efficiency Test (PET) and measurements', detail: 'Height and chest are checked, then the PET: running, shot put and high jump, scored out of 100.' },
        { title: 'Document verification and medical', detail: 'Original certificates are checked and a medical examination confirms fitness before appointment.' },
      ],
    },
    merit: [
      { title: 'PET marks decide rank', detail: 'The final merit list is drawn up on the PET marks: running carries 50, shot put 25 and high jump 25.' },
      { title: 'Running', detail: 'Men run 1.6 km and must finish within 6 minutes; women run 1 km within 5 minutes. Faster times earn more marks.' },
      { title: 'Shot put and high jump', detail: 'Men put a 16 lb shot at least 16 feet and clear 4 feet in the high jump; women put a 12 lb shot at least 12 feet and clear 3 feet.' },
      { title: 'Written exam is qualifying', detail: 'You must score at least 30% to reach the PET, but the written marks are not counted in the merit list.' },
    ],
    tips: [
      { title: 'Attempt every question', detail: 'There is no negative marking, so never leave a bubble empty. Rule out what you can and pick the best remaining option.' },
      { title: 'Learn Bihar GK thoroughly', detail: 'Questions on Bihar’s history, districts, rivers, festivals and personalities appear in every paper. The General Knowledge sets here lean heavily on them.' },
      { title: 'Practise the full paper under the clock', detail: 'Take the 100-question mock tests in one sitting with the 2-hour timer, and practise marking answers quickly, as you will on the OMR sheet.' },
      { title: 'Revise Hindi grammar', detail: 'Sandhi, samas, muhavare and paryayvachi are quick marks if you know them. Review the explanations after each mock test.' },
      { title: 'Train for the PET from day one', detail: 'Your rank comes from the physical test, so build running speed alongside your written preparation rather than after it.' },
    ],
    faq: [
      { question: 'Is there negative marking in the Bihar Police Constable exam?', answer: 'No. A wrong answer costs nothing, so attempt every question. ExamForge sets do not deduct marks either.' },
      { question: 'Do written exam marks count in the final merit?', answer: 'No. The written exam is qualifying, with a minimum of 30%. The merit list is drawn up on the Physical Efficiency Test marks.' },
      { question: 'How are the ExamForge mock tests structured?', answer: 'Each full mock test has 100 questions across all subjects and a 2-hour timer, like the real paper. There are also 5 sets of 20 questions for General Knowledge and 5 sets of 15 questions for General Science, each with one minute per question.' },
      { question: 'Can I practise in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'rrb-group-d': {
    heading: 'About the RRB Group D exam',
    intro: [
      'The Railway Recruitment Boards recruit for Level 1 posts in Indian Railways, such as track maintainer, assistant (in workshops, signal and telecom, electrical and other departments) and pointsman. It needs only a Class 10 pass or an ITI, and drives are among the largest in the country: the CEN 09/2025 notice was for 22,195 posts. Selection starts with a computer-based test (CBT) of 100 questions in 90 minutes.',
      'ExamForge gives you free, timed practice for every CBT section: 5 sets each for General Science, Mathematics and Reasoning, and 4 for General Awareness and Current Affairs, sized like the real sections. Every question is in English and Hindi with an explanation after you submit. Your first three sets need no signup.',
      'The CBT deducts one-third of a mark for each wrong answer. ExamForge does not, so to rehearse exam scoring, take a third of a mark off for each wrong answer yourself.',
    ],
    facts: {
      title: 'RRB Group D at a glance',
      source: 'From RRB CEN 09/2025 (Level 1 posts). Check rrbapply.gov.in and your RRB’s website for the current notice before you apply.',
      items: [
        { label: 'Conducted by', value: 'Railway Recruitment Boards' },
        { label: 'Last recruitment', value: '22,195 posts (CEN 09/2025)' },
        { label: 'Qualification', value: 'Class 10 pass, ITI or National Apprenticeship Certificate' },
        { label: 'Exam', value: '100 questions, 100 marks, 90 minutes' },
        { label: 'Pay', value: 'Level 1 of the 7th Pay Commission (₹18,000 basic)' },
        { label: 'Apply at', value: 'rrbapply.gov.in' },
      ],
    },
    pattern: {
      summary: 'The CBT is a single objective paper at Class 10 level. Every question carries one mark, and wrong answers cost a third of a mark.',
      caption: 'RRB Group D Computer Based Test',
      sections: [
        { part: 'Part A', subject: 'General Science', questions: 25, marks: 25 },
        { part: 'Part B', subject: 'Mathematics', questions: 25, marks: 25 },
        { part: 'Part C', subject: 'General Intelligence and Reasoning', questions: 30, marks: 30 },
        { part: 'Part D', subject: 'General Awareness and Current Affairs', questions: 20, marks: 20 },
      ],
      duration: '90 minutes (120 minutes for eligible PwBD candidates using a scribe)',
      marking: [
        { response: 'Correct answer', marks: '+1' },
        { response: 'Wrong answer', marks: '−1/3' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'There are no sectional time limits; you can move between sections freely. Scores are normalised across shifts, and you need at least 40% (unreserved and EWS) or 30% (OBC and SC) to be considered; check the notice for ST and PwBD relaxations.',
    },
    syllabus: {
      intro: 'Questions are set at Class 10 level. Each ExamForge subject matches one CBT section.',
      areas: [
        {
          title: 'General Science', subjects: ['general-science'],
          summary: 'Physics, Chemistry and Life Sciences up to Class 10, a quarter of the paper.',
          topics: ['Units, motion, force, work and energy', 'Light, sound, electricity and magnetism', 'Acids, bases, metals, alloys and everyday chemicals', 'Human body, vitamins, diseases and nutrition', 'Cells, plants and photosynthesis', 'Scientists, discoveries and instruments'],
        },
        {
          title: 'Mathematics', subjects: ['mathematics'],
          summary: 'Arithmetic, algebra, geometry and trigonometry basics, a quarter of the paper.',
          topics: ['Number system, HCF and LCM, BODMAS, square roots', 'Percentage, ratio, average, profit and loss', 'Simple and compound interest, time and work, speed and distance', 'Algebraic identities and simple equations', 'Mensuration and geometry', 'Trigonometric values, statistics and probability'],
        },
        {
          title: 'General Intelligence and Reasoning', subjects: ['reasoning'],
          summary: 'The largest section, with 30 questions.',
          topics: ['Analogy, classification and series', 'Coding-decoding and mathematical operations', 'Blood relations, directions and ranking', 'Syllogism and statement–conclusion', 'Calendar, clock, dice and dictionary order', 'Venn diagrams and mirror images'],
        },
        {
          title: 'General Awareness and Current Affairs', subjects: ['general-awareness-and-current-affairs'],
          summary: 'Static GK and recent events, 20 questions.',
          topics: ['Indian history and the national movement', 'Geography of India and the world', 'Indian polity and the Constitution', 'Art, culture, dances and festivals', 'Sports, books, awards and important days', 'Current office holders and recent events'],
        },
      ],
    },
    eligibility: {
      intro: 'The main conditions, in short. Each notice sets the exact cut-off dates, relaxations and medical standards for each post.',
      items: [
        { title: 'Qualification', detail: 'Class 10 pass, or an ITI from an NCVT/SCVT-recognised institution, or a National Apprenticeship Certificate (NAC) granted by NCVT.' },
        { title: 'Age', detail: '18 to 33 under CEN 09/2025 (as on 1 January 2026), with the usual relaxation for SC, ST, OBC, PwBD and ex-servicemen candidates.' },
        { title: 'Medical standard', detail: 'Each post has a medical category (for example A2 or B1) with its own vision standard, checked before appointment.' },
      ],
    },
    stages: {
      intro: 'Each stage has to be cleared before the next.',
      items: [
        { title: 'Computer Based Test (CBT)', detail: 'The 100-question paper above, offered in English, Hindi and several regional languages.' },
        { title: 'Physical Efficiency Test (PET)', detail: 'A qualifying test. Men carry 35 kg for 100 metres in 2 minutes and run 1,000 metres in 4 minutes 15 seconds; women carry 20 kg for 100 metres in 2 minutes and run 1,000 metres in 5 minutes 40 seconds.' },
        { title: 'Document verification and medical', detail: 'Original certificates are checked and a medical examination confirms you meet the standard of the post you are offered.' },
      ],
    },
    merit: [
      { title: 'CBT decides rank', detail: 'The merit list is drawn up on normalised CBT marks. PET only has to be passed; it carries no marks.' },
      { title: 'PET shortlist', detail: 'Candidates are called to the PET in order of CBT merit, about three times the number of vacancies in each category.' },
      { title: 'Choice of post', detail: 'Posts are allotted by merit and the preferences you give in the application, subject to the medical standard you meet.' },
    ],
    tips: [
      { title: 'Answer with care', detail: 'A wrong answer costs a third of a correct one. Answer when you can rule out at least two options; otherwise leave it.' },
      { title: 'Bank the Science marks', detail: 'General Science questions come straight from Class 9 and 10 textbooks. Revise units, instruments, vitamins and everyday chemicals; they repeat often.' },
      { title: 'Make Reasoning your strongest section', detail: 'With 30 questions it carries the most marks, and series, coding, directions and dictionary order are quick once you know the method.' },
      { title: 'Rehearse the full paper', detail: 'Take one set from each subject back to back and aim to finish in 90 minutes, the real time for 100 questions.' },
      { title: 'Train for the PET early', detail: 'Practise the 1,000-metre run and carrying weight alongside your written preparation, so the physical test is not a last-minute worry.' },
    ],
    faq: [
      { question: 'Is there negative marking in RRB Group D?', answer: 'Yes. One-third of a mark is deducted for each wrong answer. ExamForge sets do not deduct marks, so take a third off for each wrong answer yourself for the exact result.' },
      { question: 'Do PET marks count in the final merit?', answer: 'No. The PET is qualifying. The merit list is drawn up on normalised CBT marks.' },
      { question: 'How are the ExamForge sets structured?', answer: 'There are 5 General Science sets and 5 Mathematics sets of 25 questions, 5 Reasoning sets of 27 to 30 questions, and 4 General Awareness and Current Affairs sets of 19 or 20 questions, each with one minute per question. Together they mirror the CBT’s four sections.' },
      { question: 'Can I practise in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'rpf-constable': {
    heading: 'About the RPF Constable exam',
    intro: [
      'The Railway Protection Force guards railway property, passengers and passenger areas. Constables are recruited through the Railway Recruitment Boards (RRBs), and the CEN RPF 02/2024 notice was for 4,208 constable posts. It needs only a Class 10 pass. Selection starts with a computer-based test (CBT) of 120 questions in 90 minutes.',
      'ExamForge gives you free, timed practice for the CBT: ten full mock tests of up to 120 questions on a 90-minute clock, and ten sets each for General Awareness, Mathematics (the Arithmetic section) and Reasoning. Every question is in English and Hindi with an explanation after you submit. Your first three sets need no signup.',
      'The CBT deducts one-third of a mark for each wrong answer. ExamForge does not, so to rehearse exam scoring, take a third of a mark off for each wrong answer yourself.',
    ],
    facts: {
      title: 'RPF Constable at a glance',
      source: 'From RRB CEN RPF 02/2024 and published exam-pattern summaries. Check rrbapply.gov.in and your RRB’s website for the current notice before you apply.',
      items: [
        { label: 'Conducted by', value: 'Railway Recruitment Boards, for the Railway Protection Force' },
        { label: 'Last recruitment', value: '4,208 constable posts (CEN RPF 02/2024)' },
        { label: 'Qualification', value: 'Class 10 pass from a recognised board' },
        { label: 'Exam', value: '120 questions, 120 marks, 90 minutes' },
        { label: 'Apply at', value: 'rrbapply.gov.in' },
      ],
    },
    pattern: {
      summary: 'The CBT is a single objective paper. Every question carries one mark, and wrong answers cost a third of a mark.',
      caption: 'RPF Constable Computer Based Test',
      sections: [
        { part: 'Section 1', subject: 'General Awareness', questions: 50, marks: 50 },
        { part: 'Section 2', subject: 'Arithmetic', questions: 35, marks: 35 },
        { part: 'Section 3', subject: 'General Intelligence and Reasoning', questions: 35, marks: 35 },
      ],
      duration: '90 minutes',
      marking: [
        { response: 'Correct answer', marks: '+1' },
        { response: 'Wrong answer', marks: '−1/3' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'There are no sectional time limits. To be considered you need at least 35% (unreserved and EWS) or 30% (SC and ST); check the notice for the other categories.',
    },
    syllabus: {
      intro: 'Questions are set at Class 10 level. Each ExamForge subject matches one CBT section, and the full mock tests mix all three.',
      areas: [
        {
          title: 'General Awareness', subjects: ['general-awareness', 'mock-test-full-test'],
          summary: 'The largest section, with 50 questions, so it decides many results.',
          topics: ['Indian history and the national movement', 'Geography of India and the world', 'Indian polity and the Constitution', 'General science and everyday facts', 'Sports, books, awards and important days', 'Current affairs and the railways'],
        },
        {
          title: 'Arithmetic', subjects: ['mathematics', 'mock-test-full-test'],
          summary: 'Class 10 arithmetic, 35 questions. ExamForge calls this subject Mathematics.',
          topics: ['Number system, HCF and LCM, simplification', 'Percentage, ratio, average, profit and loss', 'Simple and compound interest', 'Time and work, speed, time and distance', 'Mensuration and basic geometry', 'Data interpretation and statistics'],
        },
        {
          title: 'General Intelligence and Reasoning', subjects: ['reasoning', 'mock-test-full-test'],
          summary: 'Verbal and non-verbal reasoning, 35 questions.',
          topics: ['Analogy, classification and series', 'Coding-decoding and mathematical operations', 'Blood relations, directions and ranking', 'Syllogism and Venn diagrams', 'Calendar, clock and dice', 'Mirror images and counting figures'],
        },
      ],
    },
    eligibility: {
      intro: 'The main conditions, in short. Each notice sets the exact cut-off dates, relaxations and standards.',
      items: [
        { title: 'Qualification', detail: 'Class 10 pass (matriculation) from a recognised board.' },
        { title: 'Age', detail: 'CEN RPF 02/2024 set 18 to 28 years as on 1 July 2024, with relaxation for SC, ST, OBC and other categories. Check the current notice, as limits can change.' },
        { title: 'Physical standards', detail: 'Candidates must meet the height and chest standards of the Physical Measurement Test, with relaxations for some categories and regions.' },
      ],
    },
    stages: {
      intro: 'Each stage has to be cleared before the next.',
      items: [
        { title: 'Computer Based Test (CBT)', detail: 'The 120-question paper above. Candidates are shortlisted for the next stage in order of merit, up to about ten times the vacancies.' },
        { title: 'Physical Efficiency Test (PET)', detail: 'A qualifying test. In CEN RPF 02/2024, men ran 1,600 metres in 5 minutes 45 seconds, with a 14 ft long jump and a 4 ft high jump; women ran 800 metres in 3 minutes 40 seconds, with a 9 ft long jump and a 3 ft high jump.' },
        { title: 'Physical Measurement Test (PMT)', detail: 'Height and chest are measured against the standard for your category.' },
        { title: 'Document verification', detail: 'Original certificates are checked before the final merit list is published.' },
      ],
    },
    merit: [
      { title: 'CBT decides rank', detail: 'The merit list is drawn up on CBT marks. The PET and PMT only have to be passed.' },
      { title: 'Shortlisting', detail: 'Candidates are called for the PET, PMT and document verification in order of CBT merit, category by category.' },
    ],
    tips: [
      { title: 'Answer with care', detail: 'A wrong answer costs a third of a correct one. Answer when you can rule out at least two options; otherwise leave it.' },
      { title: 'Win General Awareness', detail: 'It has 50 questions, more than any other section. Revise static GK in short rounds, plus the last six months of current affairs.' },
      { title: 'Keep arithmetic quick', detail: 'Learn tables, squares and percentage-to-fraction conversions so each question takes under a minute.' },
      { title: 'Rehearse the full paper', detail: 'Take the full mock tests on the 90-minute clock and review every wrong answer before the next one.' },
      { title: 'Train for the PET early', detail: 'Build running stamina and practise the jumps alongside your written preparation, so the physical test is not a last-minute worry.' },
    ],
    faq: [
      { question: 'Is there negative marking in the RPF Constable exam?', answer: 'Yes. One-third of a mark is deducted for each wrong answer. ExamForge sets do not deduct marks, so take a third off for each wrong answer yourself for the exact result.' },
      { question: 'How are the ExamForge sets timed?', answer: 'The full mock tests carry the real 90-minute clock, scaled down for papers with fewer than 120 questions. The subject sets give one minute per question.' },
      { question: 'Does the PET count towards merit?', answer: 'No. The PET is qualifying. Merit is drawn up on CBT marks.' },
      { question: 'Can I practise in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'rrb-je': {
    heading: 'About the RRB JE exam',
    intro: [
      'The Railway Recruitment Boards recruit Junior Engineers (JE), Depot Material Superintendents, Chemical and Metallurgical Assistants and similar posts. It needs an engineering diploma or degree in a relevant discipline, and the pay is Level 6 of the 7th Pay Commission. Selection has two computer-based tests: CBT-1 screens candidates, and CBT-2 decides the rank.',
      'ExamForge covers CBT-1, the first and largest hurdle: ten full 100-question mock tests on a 90-minute clock, and sets for Mathematics, General Science, Reasoning and General Awareness. Every question is in English and Hindi with an explanation after you submit. Your first three sets need no signup.',
      'CBT-1 deducts one-third of a mark for each wrong answer. ExamForge does not, so to rehearse exam scoring, take a third of a mark off for each wrong answer yourself.',
    ],
    facts: {
      title: 'RRB JE at a glance',
      source: 'From published RRB JE exam-pattern summaries. Check rrbapply.gov.in and your RRB’s website for the current notice before you apply.',
      items: [
        { label: 'Conducted by', value: 'Railway Recruitment Boards' },
        { label: 'Qualification', value: 'Diploma or degree in engineering relevant to the post' },
        { label: 'Pay', value: 'Level 6 of the 7th Pay Commission (₹35,400 basic)' },
        { label: 'CBT-1', value: '100 questions, 100 marks, 90 minutes (screening)' },
        { label: 'CBT-2', value: '150 questions, 150 marks, 120 minutes (merit)' },
        { label: 'Apply at', value: 'rrbapply.gov.in' },
      ],
    },
    pattern: {
      summary: 'CBT-1 is a single objective paper at screening level. Every question carries one mark, and wrong answers cost a third of a mark.',
      caption: 'RRB JE CBT-1',
      sections: [
        { part: 'Section 1', subject: 'Mathematics', questions: 30, marks: 30 },
        { part: 'Section 2', subject: 'General Intelligence and Reasoning', questions: 25, marks: 25 },
        { part: 'Section 3', subject: 'General Awareness', questions: 15, marks: 15 },
        { part: 'Section 4', subject: 'General Science', questions: 30, marks: 30 },
      ],
      duration: '90 minutes (120 minutes for eligible PwBD candidates using a scribe)',
      marking: [
        { response: 'Correct answer', marks: '+1' },
        { response: 'Wrong answer', marks: '−1/3' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'There are no sectional time limits. CBT-1 marks do not count towards the final merit list, but you must clear the qualifying cut-off to be called for CBT-2. CBT-2 has 150 questions in 120 minutes and includes a technical section for your discipline, which ExamForge does not cover.',
    },
    syllabus: {
      intro: 'Questions are set at the level of the Class 10 and diploma-entry syllabus. Each ExamForge subject matches one CBT-1 section, and the full mock tests mix all four.',
      areas: [
        {
          title: 'Mathematics', subjects: ['mathematics', 'mock-test-cbt-1-full-test'],
          summary: 'Arithmetic, algebra, geometry and trigonometry, 30 questions.',
          topics: ['Number system, BODMAS, HCF and LCM', 'Percentage, ratio, profit and loss, interest', 'Time and work, speed, time and distance', 'Algebra, geometry and mensuration', 'Trigonometry and elementary statistics'],
        },
        {
          title: 'General Intelligence and Reasoning', subjects: ['reasoning', 'mock-test-cbt-1-full-test'],
          summary: '25 questions, mostly quick to solve once you know the method.',
          topics: ['Analogy, classification and series', 'Coding-decoding and mathematical operations', 'Blood relations, directions and ranking', 'Syllogism and Venn diagrams', 'Mirror images and counting figures'],
        },
        {
          title: 'General Awareness', subjects: ['general-awareness', 'mock-test-cbt-1-full-test'],
          summary: 'Current events and everyday knowledge, 15 questions.',
          topics: ['Current affairs, sports and awards', 'Indian history, geography and polity', 'Science and technology in everyday life', 'Economics and the railways'],
        },
        {
          title: 'General Science', subjects: ['general-science', 'mock-test-cbt-1-full-test'],
          summary: 'Class 10 Physics, Chemistry and Life Sciences, 30 questions.',
          topics: ['Units, motion, force, work and energy', 'Light, sound, electricity and magnetism', 'Acids, bases, metals and everyday chemicals', 'Human body, nutrition and diseases', 'Cells, plants and the environment'],
        },
      ],
    },
    eligibility: {
      intro: 'The main conditions, in short. Each notice sets the exact posts, cut-off dates, relaxations and medical standards.',
      items: [
        { title: 'Qualification', detail: 'A diploma or degree in engineering in the discipline required for the post (for example Civil, Mechanical, Electrical, or Electronics).' },
        { title: 'Age', detail: 'Set in each notice as on a cut-off date, with relaxation for SC, ST, OBC, PwBD and ex-servicemen candidates. Check the current notice.' },
        { title: 'Medical standard', detail: 'Each post has a medical category (for example B1 or A3) with its own vision standard, checked before appointment.' },
      ],
    },
    stages: {
      intro: 'Each stage has to be cleared before the next.',
      items: [
        { title: 'CBT-1', detail: 'The 100-question screening paper above. Candidates are shortlisted for CBT-2 in order of merit.' },
        { title: 'CBT-2', detail: '150 questions in 120 minutes: General Awareness, Physics and Chemistry, Basics of Computers, Environment and Pollution Control, and a Technical Abilities section for your discipline.' },
        { title: 'Document verification and medical', detail: 'Original certificates are checked and a medical examination confirms you meet the standard of the post you are offered.' },
      ],
    },
    merit: [
      { title: 'CBT-2 decides rank', detail: 'The final merit list is drawn up on CBT-2 marks. CBT-1 only has to be qualified.' },
      { title: 'Choice of post', detail: 'Posts are allotted by merit, the preferences you give and the medical standard you meet.' },
    ],
    tips: [
      { title: 'Answer with care', detail: 'A wrong answer costs a third of a correct one. Answer when you can rule out at least two options; otherwise leave it.' },
      { title: 'Bank the Science marks', detail: 'General Science has 30 questions from textbooks you have already studied. Revise units, instruments, acids and bases, and the human body.' },
      { title: 'Keep Mathematics quick', detail: 'With 30 questions in a 90-minute paper, aim for about a minute each and save difficult ones for the end.' },
      { title: 'Rehearse the full paper', detail: 'Take the full mock tests on the 90-minute clock and review every wrong answer before the next one.' },
      { title: 'Start CBT-2 early', detail: 'CBT-1 only qualifies you. Begin your technical subject once you score comfortably above the cut-off.' },
    ],
    faq: [
      { question: 'Is there negative marking in RRB JE?', answer: 'Yes. One-third of a mark is deducted for each wrong answer. ExamForge sets do not deduct marks, so take a third off for each wrong answer yourself for the exact result.' },
      { question: 'Does CBT-1 count towards the final rank?', answer: 'No. CBT-1 is a screening test, and you must clear the qualifying cut-off. The final merit list uses CBT-2.' },
      { question: 'Does ExamForge cover CBT-2?', answer: 'Not yet. These sets cover CBT-1; CBT-2 includes a technical section specific to each engineering discipline.' },
      { question: 'Can I practise in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'rrb-ntpc-cbt-1': {
    heading: 'About the RRB NTPC exam',
    intro: [
      'NTPC stands for Non-Technical Popular Categories, the large group of clerical, commercial and traffic posts in Indian Railways: Station Master, Goods Train Manager, Commercial cum Ticket Clerk, Accounts Clerk cum Typist and similar. The Railway Recruitment Boards (RRBs) fill them through separate graduate-level and undergraduate-level notices, such as CEN 06/2025 and CEN 07/2025. Selection starts with a computer-based test, CBT-1, that every candidate takes.',
      'ExamForge covers CBT-1 with free, timed practice sets for each of its three sections: Mathematics, Reasoning and General Awareness. Every question is in English and Hindi with an explanation after you submit. Your first three sets need no signup.',
      'CBT-1 deducts one-third of a mark for each wrong answer. ExamForge does not, so to rehearse exam scoring, take a third of a mark off for each wrong answer yourself.',
    ],
    facts: {
      title: 'RRB NTPC CBT-1 at a glance',
      source: 'From published RRB NTPC exam-pattern summaries. Check rrbapply.gov.in and your RRB’s website for the current notice before you apply.',
      items: [
        { label: 'Conducted by', value: 'Railway Recruitment Boards' },
        { label: 'Recent notices', value: 'CEN 06/2025 (graduate level) and CEN 07/2025 (undergraduate level)' },
        { label: 'Qualification', value: 'Graduation for graduate-level posts; Class 12 for undergraduate-level posts' },
        { label: 'CBT-1', value: '100 questions, 100 marks, 90 minutes (screening)' },
        { label: 'Apply at', value: 'rrbapply.gov.in' },
      ],
    },
    pattern: {
      summary: 'CBT-1 is a single objective paper, common to graduate and undergraduate posts. Every question carries one mark, and wrong answers cost a third of a mark.',
      caption: 'RRB NTPC CBT-1',
      sections: [
        { part: 'Section 1', subject: 'Mathematics', questions: 30, marks: 30 },
        { part: 'Section 2', subject: 'General Intelligence and Reasoning', questions: 30, marks: 30 },
        { part: 'Section 3', subject: 'General Awareness', questions: 40, marks: 40 },
      ],
      duration: '90 minutes (120 minutes for eligible PwBD candidates using a scribe)',
      marking: [
        { response: 'Correct answer', marks: '+1' },
        { response: 'Wrong answer', marks: '−1/3' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'There are no sectional time limits. Because CBT-1 is held over several shifts, marks are normalised across shifts. CBT-1 only screens candidates: you must clear the qualifying cut-off to be called for CBT-2, which has its own merit marks and is not covered by ExamForge.',
    },
    syllabus: {
      intro: 'Questions are set at Class 10 level (General Awareness runs to graduate-level current affairs). Each ExamForge subject matches one CBT-1 section.',
      areas: [
        {
          title: 'Mathematics', subjects: ['mathematics'],
          summary: 'Arithmetic, algebra and mensuration, 30 questions.',
          topics: ['Number system, BODMAS, HCF and LCM', 'Percentage, ratio, average, profit and loss', 'Simple and compound interest', 'Time and work, speed, time and distance', 'Algebra, geometry and mensuration', 'Data interpretation and elementary statistics'],
        },
        {
          title: 'General Intelligence and Reasoning', subjects: ['reasoning'],
          summary: '30 questions, mostly quick to solve once you know the method.',
          topics: ['Analogy, classification and series', 'Coding-decoding and mathematical operations', 'Blood relations, directions and ranking', 'Syllogism and Venn diagrams', 'Calendar, clock and dice', 'Mirror images and counting figures'],
        },
        {
          title: 'General Awareness', subjects: ['general-awareness'],
          summary: 'The largest section, with 40 questions, so it often decides the cut-off.',
          topics: ['Current affairs, sports, books and awards', 'Indian history and the national movement', 'Geography of India and the world', 'Indian polity and the Constitution', 'General science and everyday facts', 'Economics and the railways'],
        },
      ],
    },
    eligibility: {
      intro: 'The main conditions, in short. Each notice sets the posts, exact cut-off dates, relaxations and medical standards.',
      items: [
        { title: 'Qualification', detail: 'Graduation from a recognised university for graduate-level posts (Levels 4 to 6). Class 12 pass for undergraduate-level posts (Levels 2 and 3).' },
        { title: 'Age', detail: 'Recent notices have set 18 to 33 years for graduate-level posts and 18 to 30 years for undergraduate-level posts, with relaxation for SC, ST, OBC, PwBD and ex-servicemen candidates. Check the current notice, as limits can change.' },
        { title: 'Medical standard', detail: 'Each post has a medical category (for example A-2 or B-2) with its own vision standard, checked before appointment.' },
      ],
    },
    stages: {
      intro: 'The stages depend on the post. Each has to be cleared before the next.',
      items: [
        { title: 'CBT-1', detail: 'The 100-question screening paper above. Candidates are shortlisted for CBT-2 in order of merit, category by category.' },
        { title: 'CBT-2', detail: 'A second computer-based test of General Awareness, Mathematics and Reasoning that decides merit for most posts.' },
        { title: 'Skill or aptitude test', detail: 'Some posts need a typing skill test (clerk and typist posts) or a Computer Based Aptitude Test (Station Master and Traffic Assistant). These are qualifying for most posts.' },
        { title: 'Document verification and medical', detail: 'Original certificates are checked and a medical examination confirms you meet the standard of the post you are offered.' },
      ],
    },
    merit: [
      { title: 'CBT-2 decides rank', detail: 'The merit list is drawn up on CBT-2 marks, with the skill or aptitude test as a qualifying step. CBT-1 only has to be qualified.' },
      { title: 'Choice of post', detail: 'Posts are allotted by merit, the preferences you give and the medical standard you meet.' },
    ],
    tips: [
      { title: 'Answer with care', detail: 'A wrong answer costs a third of a correct one. Answer when you can rule out at least two options; otherwise leave it.' },
      { title: 'Win General Awareness', detail: 'It has 40 questions, more than any other section. Revise static GK in short rounds, plus the last six months of current affairs.' },
      { title: 'Keep arithmetic quick', detail: 'Learn tables, squares and percentage-to-fraction conversions so each question takes under a minute.' },
      { title: 'Bank the Reasoning marks', detail: 'Series, analogy, coding and blood-relation questions can be solved in 30 seconds with practice, which buys time for the harder ones.' },
      { title: 'Practise the full 100 on the clock', detail: 'Take the three sections back to back in 90 minutes, and review every wrong answer before the next attempt.' },
    ],
    faq: [
      { question: 'Is there negative marking in RRB NTPC CBT-1?', answer: 'Yes. One-third of a mark is deducted for each wrong answer. ExamForge sets do not deduct marks, so take a third off for each wrong answer yourself for the exact result.' },
      { question: 'Is CBT-1 the same for graduate and undergraduate posts?', answer: 'Yes. Both levels take the same 100-question CBT-1 pattern. The posts and CBT-2 differ.' },
      { question: 'How are the ExamForge sets timed?', answer: 'Each set gives one minute per question. The sets are sectional, so they are shorter than the full 100-question, 90-minute paper.' },
      { question: 'Does ExamForge cover CBT-2?', answer: 'Not yet. These sets cover CBT-1.' },
      { question: 'Can I practise in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'dsssb-tgt/computer-science': {
    heading: 'About the DSSSB TGT Computer Science exam',
    intro: [
      'The Delhi Subordinate Services Selection Board (DSSSB) recruits Trained Graduate Teachers (TGTs) for Delhi government schools. TGT Computer Science is filled through a single computer-based exam, so one paper decides your place on the merit list.',
      'ExamForge’s DSSSB sets are short, timed mock tests built from questions asked in the 2021 and 2023 TGT Computer Science papers. Each set has 30 questions in the same mix as the real paper (half from the general sections, half from Computer Science and teaching) and gives you 10 minutes. Every question is in English and Hindi with an explanation after you submit, and your first three sets need no signup.',
      'Wrong answers cost 0.25 marks here, exactly as in the exam, so each result is scored the DSSSB way. Use the review to see where guesses cost you marks.',
    ],
    pattern: {
      summary: 'TGT is a one-tier exam: a single objective paper of 200 questions, one mark each, with 2 hours for the whole paper. Section A tests general ability and Section B tests your subject.',
      caption: 'DSSSB TGT one-tier exam sections',
      sections: [
        { part: 'Section A', subject: 'General Awareness', questions: 20, marks: 20 },
        { part: 'Section A', subject: 'General Intelligence and Reasoning Ability', questions: 20, marks: 20 },
        { part: 'Section A', subject: 'Arithmetical and Numerical Ability', questions: 20, marks: 20 },
        { part: 'Section A', subject: 'Hindi Language and Comprehension', questions: 20, marks: 20 },
        { part: 'Section A', subject: 'English Language and Comprehension', questions: 20, marks: 20 },
        { part: 'Section B', subject: 'Computer Science (subject paper)', questions: 100, marks: 100 },
      ],
      duration: '2 hours',
      marking: [
        { response: 'Correct answer', marks: '+1' },
        { response: 'Wrong answer', marks: '−0.25' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'From the DSSSB examination scheme for one-tier technical and teaching posts. In the 2023 paper, 10 of the 100 Section B questions were on teaching methodology. DSSSB can also set a minimum qualifying score for a post, so check the advertisement you apply under.',
    },
    syllabus: {
      areas: [
        {
          title: 'Section A: general ability',
          summary: 'Five short sections of 20 questions each, mostly testing speed and accuracy.',
          topics: ['Current affairs, history, polity, geography, science and the economy', 'Series, analogies, coding, directions and seating arrangements', 'Number system, percentages, profit and loss, time and work, mensuration', 'Hindi grammar: sandhi, samas, vocabulary and sentence correction', 'English grammar, vocabulary, idioms and comprehension'],
        },
        {
          title: 'Section B: Computer Science', subjects: ['mock-test'],
          summary: 'Graduate-level Computer Science, with a short teaching methodology block.',
          topics: ['Computer fundamentals, number systems and digital logic', 'C, C++ and Java programming, data structures and algorithms', 'Operating systems, DBMS and SQL', 'Computer networks, web technologies and software engineering', 'Teaching methodology and child development'],
        },
      ],
    },
    tips: [
      { title: 'Guess only after eliminating', detail: 'A wrong answer costs a quarter mark, so a blind guess among four options is worth only about +0.06 marks on average. Rule out one or two options first and the odds turn clearly in your favour.' },
      { title: 'Bank Section A', detail: 'Half the paper is general ability. Steady practice in arithmetic and reasoning gives quick, reliable marks that offset harder Computer Science questions.' },
      { title: 'Revise the topics that repeat', detail: 'Number systems, logic gates, memory management, page replacement, SQL, OSI layers and C output questions come up again and again in past papers.' },
      { title: 'Practise under the clock', detail: 'Sets here allow 20 seconds a question, faster than the real paper’s 36 seconds, so the exam itself feels comfortable.' },
    ],
    faq: [
      { question: 'Is there negative marking in DSSSB TGT?', answer: 'Yes. DSSSB deducts 0.25 marks for each wrong answer, and an unanswered question scores zero. ExamForge’s DSSSB sets apply the same deduction, so your result matches how the board would score it.' },
      { question: 'Where do the questions come from?', answer: 'From the DSSSB TGT Computer Science papers of 1 August 2021, 7 August 2021 (Shift 3) and 24 June 2023 (Shift 3), with the answer marked correct in the official response sheets. Questions that depend on a figure, or whose official answer looked doubtful, were left out.' },
      { question: 'Why 10 minutes for 30 questions?', answer: 'The sets are built for short, focused sessions that train speed. Ten minutes for 30 questions is 20 seconds each, quicker than the real paper.' },
      { question: 'Can I practise in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version. English language questions keep their English sentences, as in the real paper.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'ctet-paper-2': {
    heading: 'About the CTET Paper 2 exam',
    intro: [
      'The Central Teacher Eligibility Test (CTET) is run by the Central Board of Secondary Education (CBSE) and is the eligibility test for teachers in central government schools such as Kendriya Vidyalayas and Navodaya Vidyalayas. Paper 2 is for upper primary teachers (Classes 6–8). It is a qualifying test, not a recruitment exam: passing it makes you eligible to apply for teaching posts.',
      'ExamForge has 90 free, timed sets for Paper 2. Twenty are full 150-question mock tests, ten for each stream (Mathematics & Science, and Social Studies/Social Science), and the rest are 30-question sets for each section. Every question is in English and Hindi, and each one comes with an explanation after you submit. Your first three sets need no signup.',
      'Build your basics with the section sets first, starting with Child Development and Pedagogy because it counts in every paper. Then take full mock tests for your stream: they give you 150 minutes for 150 questions, the same as the real paper, and like CTET they do not deduct marks for wrong answers.',
    ],
    pattern: {
      summary: 'Paper 2 is a single objective paper of 150 multiple-choice questions, one mark each, with 2 hours 30 minutes for the whole paper. Child Development and Pedagogy and both languages are compulsory; for the last section you take Mathematics and Science or Social Studies/Social Science, depending on the subject you want to teach.',
      caption: 'CTET Paper 2 sections for Classes 6–8 teachers',
      sections: [
        { part: 'I', subject: 'Child Development and Pedagogy (compulsory)', questions: 30, marks: 30 },
        { part: 'II', subject: 'Language I (compulsory)', questions: 30, marks: 30 },
        { part: 'III', subject: 'Language II (compulsory)', questions: 30, marks: 30 },
        { part: 'IV', subject: 'Mathematics and Science, or Social Studies/Social Science', questions: 60, marks: 60 },
      ],
      duration: '2 hours 30 minutes',
      marking: [
        { response: 'Correct answer', marks: '+1' },
        { response: 'Wrong answer', marks: '0' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'Language I and Language II must be different languages, chosen from the languages CBSE offers. Teachers of other subjects can take either stream. Each section mixes content questions with questions on how to teach it, and the pedagogy share is large. Check the information bulletin on ctet.nic.in for the current cycle.',
    },
    syllabus: {
      intro: 'Content questions are set at the Class 6–8 level, but a large share of every section tests teaching: how children learn, and how to teach and assess the subject. ExamForge’s nine subjects map to the sections below.',
      areas: [
        {
          title: 'Child Development and Pedagogy', subjects: ['child-development-and-pedagogy'],
          summary: 'The educational psychology of teaching and learning for children aged 11 to 14.',
          topics: ['Principles of development, heredity and environment', 'Piaget, Kohlberg and Vygotsky', 'Child-centred and progressive education', 'Intelligence, language and thought, gender and individual differences', 'Inclusive education and children with special needs', 'Assessment for learning and continuous and comprehensive evaluation', 'Motivation, learning difficulties and how children think'],
        },
        {
          title: 'Language I and Language II', subjects: ['language-i-hindi', 'language-ii-english'],
          summary: 'Comprehension and grammar in the language, and how languages are learned and taught.',
          topics: ['Unseen prose and poetry passages', 'Grammar and verbal ability', 'Language acquisition and learning', 'Listening, speaking, reading and writing skills', 'Teaching in a multilingual classroom', 'Teaching materials, assessment and remedial teaching'],
        },
        {
          title: 'Mathematics and Science', subjects: ['mathematics', 'science', 'mock-test-mathematics-science-full-test'],
          summary: 'For Mathematics and Science teachers: 30 questions on each subject, with content and pedagogy.',
          topics: ['Number system, algebra, geometry, mensuration and data handling', 'Nature of mathematics, mathematical language and remedial teaching', 'Food, materials and the world of the living', 'Moving things, how things work, natural phenomena and natural resources', 'Science teaching approaches, experiments, aids and evaluation'],
        },
        {
          title: 'Social Studies/Social Science', subjects: ['social-studies', 'social-science', 'mock-test-social-studies-social-science-full-test'],
          summary: 'For Social Studies teachers: history, geography and civics, with how to teach them.',
          topics: ['History: early societies to the national movement', 'Geography: the earth, resources and the environment', 'Social and political life: democracy, government and the Constitution', 'Nature of social science and developing critical thinking', 'Sources, enquiry, project work and evaluation'],
        },
      ],
    },
    eligibility: {
      intro: 'The main conditions for Paper 2, in short. The CTET information bulletin lists every accepted combination.',
      items: [
        { title: 'Qualification', detail: 'A graduation degree with a B.Ed. or a two-year Diploma in Elementary Education, or one of the other combinations in the bulletin, such as a four-year integrated B.El.Ed. or B.A./B.Sc.Ed. Candidates in the final year of their teacher training course can also apply.' },
        { title: 'Age', detail: 'CTET sets no upper age limit. Age limits for jobs are set by each employer.' },
        { title: 'Attempts', detail: 'There is no limit on the number of attempts, and you can sit again to improve your score.' },
      ],
    },
    merit: [
      { title: 'Pass mark', detail: 'You qualify with 60% or more: at least 90 of the 150 marks. Employing schools and governments may give concessions to SC, ST, OBC and differently abled candidates under their own rules.' },
      { title: 'Certificate', detail: 'Qualified candidates get a CTET eligibility certificate, issued through DigiLocker, and it stays valid for life.' },
      { title: 'After CTET', detail: 'The certificate makes you eligible to apply; it does not guarantee a job. Posts are filled through each employer’s own recruitment, such as KVS or NVS.' },
    ],
    tips: [
      { title: 'Answer every question', detail: 'There is no negative marking, so never leave a bubble empty. Rule out what you can and make your best guess on the rest.' },
      { title: 'Master pedagogy', detail: 'Child Development and Pedagogy is 30 marks on its own, and pedagogy questions also appear in the language and subject sections. Learn the theorists and the ideas behind child-centred teaching.' },
      { title: 'Read the question as a teacher', detail: 'Many questions describe a classroom situation. The expected answer is usually the one that encourages the child, includes everyone and builds understanding, not the one that punishes or drills.' },
      { title: 'Practise both languages', detail: 'The two language sections are 60 marks together. Comprehension passages reward steady reading practice in both languages.' },
      { title: 'Finish full papers under the clock', detail: 'Once your basics are in place, take a full 150-minute mock test for your stream every few days to build stamina and timing.' },
    ],
    faq: [
      { question: 'Is there negative marking in CTET?', answer: 'No. Each correct answer gets one mark and a wrong answer costs nothing. ExamForge scores CTET sets the same way.' },
      { question: 'What are the qualifying marks?', answer: '60% or more, which is 90 out of 150. Employers may give reserved-category candidates a concession under their own rules.' },
      { question: 'How long is the CTET certificate valid?', answer: 'For life. Qualified candidates download their certificate from DigiLocker.' },
      { question: 'When is the next CTET?', answer: 'CBSE usually holds CTET twice a year and announces each cycle on ctet.nic.in. Check the official site for the current date and admit cards.' },
      { question: 'How are the ExamForge sets structured?', answer: 'Full mock tests have 150 questions and a 150-minute timer: 30 each on English, Hindi and Child Development and Pedagogy, and 60 on your stream. The sections come in a different order from the real paper. There are also 10 sets of 30 questions with 30 minutes for each of the seven section subjects. Mathematics set 6 has 29 questions and Mathematics & Science Full Test 5 has 149, because one question in each repeated its correct answer as another option and was left out.' },
      { question: 'Can I practise in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'ctet-paper-1': {
    heading: 'About the CTET Paper 1 exam',
    intro: [
      'The Central Teacher Eligibility Test (CTET) is run by the Central Board of Secondary Education (CBSE) and is the eligibility test for teachers in central government schools such as Kendriya Vidyalayas and Navodaya Vidyalayas. Paper 1 is for primary teachers (Classes 1–5). It is a qualifying test, not a recruitment exam: passing it makes you eligible to apply for teaching posts.',
      'ExamForge has 60 free, timed sets for Paper 1. Ten are full 150-question mock tests, and the rest are 30-question sets for each of the five sections: Child Development and Pedagogy, Language I (Hindi), Language II (English), Mathematics and Environmental Studies. Every question is in English and Hindi, and each one comes with an explanation after you submit. Your first three sets need no signup.',
      'Build your basics with the section sets first, starting with Child Development and Pedagogy because it is the heart of the paper. Then take full mock tests: they give you 150 minutes for 150 questions, the same as the real paper, and like CTET they do not deduct marks for wrong answers.',
    ],
    pattern: {
      summary: 'Paper 1 is a single objective paper of 150 multiple-choice questions, one mark each, with 2 hours 30 minutes for the whole paper. All five sections are compulsory and carry 30 questions each.',
      caption: 'CTET Paper 1 sections for Classes 1–5 teachers',
      sections: [
        { part: 'I', subject: 'Child Development and Pedagogy', questions: 30, marks: 30 },
        { part: 'II', subject: 'Language I', questions: 30, marks: 30 },
        { part: 'III', subject: 'Language II', questions: 30, marks: 30 },
        { part: 'IV', subject: 'Mathematics', questions: 30, marks: 30 },
        { part: 'V', subject: 'Environmental Studies', questions: 30, marks: 30 },
      ],
      duration: '2 hours 30 minutes',
      marking: [
        { response: 'Correct answer', marks: '+1' },
        { response: 'Wrong answer', marks: '0' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'Language I and Language II must be different languages, chosen from the languages CBSE offers. Mathematics and Environmental Studies each mix content questions with questions on how to teach the subject. Check the information bulletin on ctet.nic.in for the current cycle.',
    },
    syllabus: {
      intro: 'Content questions are set at the Class 1–5 level, but a large share of every section tests teaching: how young children learn, and how to teach and assess each subject. ExamForge’s six subjects map to the sections below.',
      areas: [
        {
          title: 'Child Development and Pedagogy', subjects: ['child-development-and-pedagogy'],
          summary: 'The educational psychology of teaching and learning for children aged 6 to 11.',
          topics: ['Principles of development, heredity and environment', 'Socialisation, and Piaget, Kohlberg and Vygotsky', 'Child-centred and progressive education', 'Intelligence, language and thought, gender and individual differences', 'Inclusive education, learning difficulties and children with special needs', 'Assessment for learning and continuous and comprehensive evaluation', 'How children think and learn, motivation and the role of the teacher'],
        },
        {
          title: 'Language I and Language II', subjects: ['language-i-hindi', 'language-ii-english'],
          summary: 'Comprehension and grammar in the language, and how young children learn and are taught languages.',
          topics: ['Unseen prose and poetry passages', 'Grammar and verbal ability', 'Language acquisition and learning', 'Listening, speaking, reading and writing skills', 'Teaching in a multilingual classroom', 'Teaching materials, assessment and remedial teaching'],
        },
        {
          title: 'Mathematics', subjects: ['mathematics'],
          summary: 'Primary-level mathematics, and how children come to understand it.',
          topics: ['Numbers, addition and subtraction, multiplication and division', 'Shapes, spatial understanding and solids around us', 'Measurement, weight, time, volume and money', 'Data handling and patterns', 'Nature of mathematics, its language and community mathematics', 'Evaluation, remedial teaching and problems of teaching'],
        },
        {
          title: 'Environmental Studies', subjects: ['environmental-studies-evs'],
          summary: 'The child’s world of family, food, shelter, water and travel, and how EVS is taught as an integrated subject.',
          topics: ['Family and friends: relationships, work and play, animals and plants', 'Food, shelter and water', 'Travel, and things we make and do', 'Concept and scope of EVS, and EVS and environmental education', 'Activities, experimentation, discussion and continuous evaluation', 'Teaching materials and aids, and problems of teaching EVS'],
        },
      ],
    },
    eligibility: {
      intro: 'The main conditions for Paper 1, in short. The CTET information bulletin lists every accepted combination.',
      items: [
        { title: 'Qualification', detail: 'Senior Secondary (Class 12) with at least 50% marks and a two-year Diploma in Elementary Education or a four-year B.El.Ed., or graduation with a two-year Diploma in Elementary Education. Candidates in the final year of their course can also apply. Recent bulletins do not accept a B.Ed. for Paper 1, so check the current bulletin.' },
        { title: 'Age', detail: 'CTET sets no upper age limit. Age limits for jobs are set by each employer.' },
        { title: 'Attempts', detail: 'There is no limit on the number of attempts, and you can sit again to improve your score.' },
      ],
    },
    merit: [
      { title: 'Pass mark', detail: 'You qualify with 60% or more: at least 90 of the 150 marks. Employing schools and governments may give concessions to SC, ST, OBC and differently abled candidates under their own rules.' },
      { title: 'Certificate', detail: 'Qualified candidates get a CTET eligibility certificate, issued through DigiLocker, and it stays valid for life.' },
      { title: 'After CTET', detail: 'The certificate makes you eligible to apply; it does not guarantee a job. Posts are filled through each employer’s own recruitment, such as KVS or NVS.' },
    ],
    tips: [
      { title: 'Answer every question', detail: 'There is no negative marking, so never leave a bubble empty. Rule out what you can and make your best guess on the rest.' },
      { title: 'Master pedagogy', detail: 'Child Development and Pedagogy is 30 marks on its own, and pedagogy questions also appear in the language, Mathematics and EVS sections. Learn the theorists and the ideas behind child-centred teaching.' },
      { title: 'Read the question as a teacher', detail: 'Many questions describe a classroom situation. The expected answer is usually the one that encourages the child, includes everyone and builds understanding, not the one that punishes or drills.' },
      { title: 'Do not skip EVS pedagogy', detail: 'EVS questions are as much about how to teach the subject as about the facts. Know why EVS is taught as one integrated subject at the primary level.' },
      { title: 'Finish full papers under the clock', detail: 'Once your basics are in place, take a full 150-minute mock test every few days to build stamina and timing.' },
    ],
    faq: [
      { question: 'Is there negative marking in CTET?', answer: 'No. Each correct answer gets one mark and a wrong answer costs nothing. ExamForge scores CTET sets the same way.' },
      { question: 'What are the qualifying marks?', answer: '60% or more, which is 90 out of 150. Employers may give reserved-category candidates a concession under their own rules.' },
      { question: 'What is the difference between Paper 1 and Paper 2?', answer: 'Paper 1 is for teachers of Classes 1–5 and has Mathematics and Environmental Studies as its subject sections. Paper 2 is for Classes 6–8 and has Mathematics and Science or Social Studies instead. To teach both levels you take both papers.' },
      { question: 'When is the next CTET?', answer: 'CBSE usually holds CTET twice a year and announces each cycle on ctet.nic.in. Check the official site for the current date and admit cards.' },
      { question: 'How are the ExamForge sets structured?', answer: 'Full mock tests have 150 questions and a 150-minute timer, 30 on each section, though the sections come in a different order from the real paper. There are also 10 sets of 30 questions with 30 minutes for each of the five sections. Mathematics set 5 has 29 questions and Full Test 5 has 149, because one question in each repeated its correct answer as another option and was left out.' },
      { question: 'Can I practise in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'afcat': {
    heading: 'About the AFCAT exam',
    intro: [
      'The Air Force Common Admission Test (AFCAT) is conducted by the Indian Air Force twice a year for recruitment into Flying and Ground Duty (Technical and Non-Technical) branches.',
      'ExamForge provides full timed mock tests matching the real exam questions in English and Hindi, covering General Awareness, Verbal Ability, Numerical Ability, and Reasoning.',
    ],
    tips: [
      { title: 'Focus on Verbal and Reasoning', detail: 'Reasoning and English account for a substantial portion of the paper. Practicing patterns and reading comprehension regularly yields high accuracy.' },
      { title: 'Manage time carefully', detail: 'Aim to complete 100 questions within the allocated time. Skip lengthy calculations and return to them if time permits.' },
    ],
    faq: [
      { question: 'What subjects are tested in AFCAT?', answer: 'General Awareness, Verbal Ability in English, Numerical Ability, and Reasoning and Military Aptitude.' },
      { question: 'Can I practise in Hindi?', answer: 'Yes, questions and explanations are available in both English and Hindi on ExamForge.' },
    ],
  },
  'agniveer': {
    heading: 'About the Indian Army Agniveer exam',
    intro: [
      'The Indian Army Agniveer Common Entrance Exam (CEE) recruits candidates for General Duty (GD), Technical, and Tradesmen roles under the Agnipath scheme.',
      'ExamForge offers timed practice tests covering General Knowledge, General Science, and Elementary Mathematics with detailed step-by-step solutions.',
    ],
    tips: [
      { title: 'Strengthen basic science and math', detail: 'Most questions are drawn from Class 8–10 NCERT science and arithmetic topics. Master formulas and unit conversions.' },
      { title: 'Revise current affairs and GK', detail: 'Stay updated on national defense developments, awards, sports, and Indian history.' },
    ],
    faq: [
      { question: 'What is the pattern of the Agniveer exam?', answer: 'The exam covers General Knowledge, General Science, and Mathematics with 50 objective questions.' },
    ],
  },
  'bihar-police': {
    heading: 'About the Bihar Police exam',
    intro: [
      'The Bihar Police recruitment examination tests candidates on General Studies, General Science, Mathematics, Hindi, and Bihar General Knowledge.',
      'ExamForge provides 10 full 100-question practice papers with complete explanations in English and Hindi to help candidates score high in the written stage.',
    ],
    tips: [
      { title: 'Focus on Bihar-specific GK', detail: 'Questions on Bihar history, geography, economy, and government schemes appear frequently in the paper.' },
      { title: 'Practice previous papers', detail: 'Solve full-length mock tests to get used to the pace of 100 questions in 2 hours.' },
    ],
    faq: [
      { question: 'What subjects are covered?', answer: 'General Studies, General Science, Mathematics, Hindi, English, and Bihar GK.' },
    ],
  },
  'delhi-police': {
    heading: 'About the Delhi Police Constable exam',
    intro: [
      'The Delhi Police Constable (Executive) exam is conducted by the Staff Selection Commission (SSC) to select personnel for the Delhi Police force.',
      'ExamForge features 10 comprehensive practice sets covering Reasoning, General Knowledge/Current Affairs, Numerical Ability, and Computer Fundamentals.',
    ],
    tips: [
      { title: 'Master Computer Fundamentals', detail: 'Basic MS Office, internet, and email questions are high-scoring. Do not leave these marks on the table.' },
      { title: 'Prioritize General Knowledge', detail: 'GK forms half of the entire question paper; continuous daily revision is essential.' },
    ],
    faq: [
      { question: 'What is the exam structure?', answer: '100 questions total: 50 GK/Current Affairs, 25 Reasoning, 15 Numerical Ability, and 10 Computer Fundamentals.' },
    ],
  },
  'ibps-po': {
    heading: 'About the IBPS PO exam',
    intro: [
      'The Institute of Banking Personnel Selection (IBPS) PO/MT examination is the gateway to officer positions across nationalized banks in India.',
      'ExamForge provides 10 realistic practice sets featuring 5-option question formats across English Language, Quantitative Aptitude, and Reasoning Ability.',
    ],
    tips: [
      { title: 'Build sectional speed', detail: 'Banking exams test quick decision-making. Learn shortcut methods for arithmetic, series, and quadratic equations.' },
      { title: 'Focus on puzzles and seating arrangement', detail: 'Reasoning relies heavily on analytical puzzles. Practice at least two new arrangements daily.' },
    ],
    faq: [
      { question: 'Why are there 5 options per question?', answer: 'Banking exams such as IBPS and SBI traditionally use 5 options (A to E) for each question.' },
    ],
  },
  'rajasthan-police': {
    heading: 'About the Rajasthan Police Constable exam',
    intro: [
      'The Rajasthan Police Constable examination tests candidates on General Knowledge, General Science, Rajasthan History, Culture, Geography, and Reasoning.',
      'ExamForge offers 10 full-length mock tests with bilingual explanations to prepare candidates for the written selection round.',
    ],
    tips: [
      { title: 'Deep dive into Rajasthan GK', detail: 'A significant portion of the paper is dedicated to Rajasthan culture, art, forts, and history.' },
    ],
    faq: [
      { question: 'Is the exam available in Hindi?', answer: 'Yes, full questions and explanations are available in both Hindi and English.' },
    ],
  },
  'rrb-technician': {
    heading: 'About the RRB Technician exam',
    intro: [
      'The Railway Recruitment Boards (RRB) recruit Technician Grade I and III personnel across Indian Railways.',
      'ExamForge provides 10 timed practice sets covering Mathematics, General Intelligence & Reasoning, Basic Science, and General Awareness.',
    ],
    tips: [
      { title: 'Revise Basic Science and Engineering', detail: 'Understand physics principles, electricity, mechanics, and measurement standards.' },
    ],
    faq: [
      { question: 'How many questions are in each mock test?', answer: 'Each set contains approximately 100 questions covering the complete technician syllabus.' },
    ],
  },
  'sbi-clerk': {
    heading: 'About the SBI Clerk exam',
    intro: [
      'The State Bank of India conducts the SBI Clerk (Junior Associates) exam for clerical cadre roles in branches nationwide.',
      'ExamForge mock tests feature 5 options per question across English, Numerical Ability, and Reasoning with comprehensive answer explanations.',
    ],
    tips: [
      { title: 'Improve calculation speed', detail: 'Simplification and approximation questions allow rapid scoring if you know mental math techniques.' },
    ],
    faq: [
      { question: 'What subjects are tested?', answer: 'English Language, Numerical Ability, and Reasoning Ability.' },
    ],
  },
  'sbi-po': {
    heading: 'About the SBI PO exam',
    intro: [
      'The SBI PO exam is among the most prestigious banking tests in India, known for testing conceptual depth in Quantitative Aptitude and Reasoning.',
      'ExamForge offers timed practice sets with five options per question and in-depth explanations for every answer.',
    ],
    tips: [
      { title: 'Tackle high-level Data Interpretation', detail: 'Data interpretation and caselets carry heavy weight; practice table, pie, and bar chart analysis.' },
    ],
    faq: [
      { question: 'Does SBI PO have negative marking?', answer: 'In the real exam, 0.25 marks are deducted per wrong answer. ExamForge provides timed sets to build speed.' },
    ],
  },
  'tet': {
    heading: 'About the Teacher Eligibility Test (TET)',
    intro: [
      'Teacher Eligibility Tests evaluate the proficiency of candidates aspiring to teach in primary and upper primary schools.',
      'ExamForge features timed mock tests covering Child Development & Pedagogy, Mathematics, Environmental Studies, and Languages.',
    ],
    tips: [
      { title: 'Master child development theories', detail: 'Understand developmental stages, inclusive education, and learning principles by Piaget, Vygotsky, and Kohlberg.' },
    ],
    faq: [
      { question: 'Who should take TET practice sets?', answer: 'Candidates preparing for central and state TETs (CTET, UPTET, REET, Bihar TET, etc.).' },
    ],
  },
  'up-police': {
    heading: 'About the UP Police Constable exam',
    intro: [
      'The Uttar Pradesh Police Recruitment and Promotion Board (UPPRPB) conducts this exam for the recruitment of civil police constables.',
      'ExamForge provides 10 full 150-question mock tests covering General Science, General Hindi, Numerical & Mental Ability, and Mental Aptitude/Reasoning.',
    ],
    tips: [
      { title: 'Give special attention to General Hindi', detail: 'General Hindi is high-scoring; revise grammar, idioms, vocabulary, and Hindi literature basics.' },
      { title: 'Practice 150 questions in one sitting', detail: 'Solving 150 questions requires speed and sustained concentration over 2 hours.' },
    ],
    faq: [
      { question: 'What is the full paper structure?', answer: '150 questions: General Science/GK (38), General Hindi (37), Numerical & Mental Ability (38), and Mental Aptitude/Reasoning (37).' },
    ],
  },
};
