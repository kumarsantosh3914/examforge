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
      'The Air Force Common Admission Test (AFCAT) is the Indian Air Force’s entrance exam for commissioned officers in the Flying Branch and the Ground Duty (Technical and Non-Technical) branches. The IAF normally holds it twice a year, and the online test is followed by interviews and tests at an Air Force Selection Board (AFSB).',
      'ExamForge gives you 4 free, timed AFCAT mock tests of 63 to 95 questions each, covering General Awareness, Verbal Ability in English, Numerical Ability and Reasoning. Every question is in English and Hindi with an explanation after you submit. Your first three sets need no signup.',
      'The real AFCAT deducts 1 mark for every wrong answer. ExamForge sets have no negative marking, so to rehearse exam scoring, take off one mark for each wrong answer and give yourself three for each right one.',
    ],
    facts: {
      title: 'AFCAT at a glance',
      source: 'From published AFCAT exam-pattern summaries. Check afcat.cdac.in and the IAF careers site for the current notice before you apply.',
      items: [
        { label: 'Conducted by', value: 'Indian Air Force' },
        { label: 'Frequency', value: 'Twice a year' },
        { label: 'Written exam', value: '100 questions, 300 marks, 2 hours, online' },
        { label: 'Extra paper', value: 'Engineering Knowledge Test (EKT) for Ground Duty Technical branches' },
        { label: 'Qualification', value: 'Graduation; Class 12 Maths and Physics for the Flying Branch' },
        { label: 'Apply at', value: 'afcat.cdac.in' },
      ],
    },
    pattern: {
      summary: 'The AFCAT written paper is one objective test with four sections. Every question carries three marks.',
      caption: 'AFCAT written exam',
      sections: [
        { part: 'Section 1', subject: 'General Awareness', questions: 25, marks: 75 },
        { part: 'Section 2', subject: 'Verbal Ability in English', questions: 30, marks: 90 },
        { part: 'Section 3', subject: 'Numerical Ability', questions: 20, marks: 60 },
        { part: 'Section 4', subject: 'Reasoning and Military Aptitude', questions: 25, marks: 75 },
      ],
      duration: '2 hours',
      marking: [
        { response: 'Correct answer', marks: '+3' },
        { response: 'Wrong answer', marks: '−1' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'Candidates for the Ground Duty Technical branches also take the 50-question, 150-mark Engineering Knowledge Test, which ExamForge does not cover. Because a wrong answer costs a third of what a right one earns, guess only when you can rule out at least one option.',
    },
    syllabus: {
      intro: 'Questions are set at graduate level, with English and reasoning at the heart of the paper. ExamForge’s mock tests mix all four areas the way the exam does.',
      areas: [
        {
          title: 'General Awareness',
          summary: 'Current affairs and static facts, 25 questions.',
          topics: ['History, geography and polity of India', 'Defence, awards, sports and important days', 'Science and everyday technology', 'Current affairs and national events'],
        },
        {
          title: 'Verbal Ability in English',
          summary: 'The biggest section, with 30 questions.',
          topics: ['Reading comprehension and cloze tests', 'Error spotting and sentence correction', 'Synonyms, antonyms and idioms', 'Ordering of words and sentences'],
        },
        {
          title: 'Numerical Ability',
          summary: 'Arithmetic at Class 10 level, 20 questions.',
          topics: ['Percentage, ratio, average and profit and loss', 'Time and work, speed and distance', 'Simple and compound interest', 'Number system, decimals and fractions', 'Data interpretation'],
        },
        {
          title: 'Reasoning and Military Aptitude',
          summary: 'Verbal and non-verbal reasoning, 25 questions.',
          topics: ['Analogy, classification and series', 'Coding-decoding and blood relations', 'Directions, ranking and arrangements', 'Venn diagrams and syllogism', 'Spatial orientation and figure patterns'],
        },
      ],
    },
    eligibility: {
      intro: 'Requirements vary by branch and change between notices, so read the current AFCAT notification. In general:',
      items: [
        { title: 'Education', detail: 'A graduate degree with at least 60% marks. The Flying Branch also needs Class 12 with Maths and Physics at 50%; technical branches need an engineering degree in the relevant stream.' },
        { title: 'Age', detail: 'Usually 20 to 24 years for the Flying Branch and 20 to 26 for Ground Duty. Holders of a Commercial Pilot Licence get an age relaxation for the Flying Branch.' },
        { title: 'Nationality and fitness', detail: 'Indian citizen, unmarried at the time of joining training, and medically and physically fit to the IAF standard.' },
      ],
    },
    stages: {
      intro: 'Selection runs in this order.',
      items: [
        { title: 'AFCAT written exam', detail: 'The online test above, plus the EKT for technical branches.' },
        { title: 'AFSB tests', detail: 'Shortlisted candidates attend a five-day Air Force Selection Board with psychological tests, group tasks and an interview. Flying Branch candidates also take a computerised pilot aptitude test.' },
        { title: 'Medical examination and merit list', detail: 'Candidates recommended by the AFSB go to a medical board, and the final merit list combines the written and AFSB results.' },
      ],
    },
    tips: [
      { title: 'Give English the most time', detail: 'English carries the most marks of any section, and reading comprehension and error spotting reward daily practice.' },
      { title: 'Keep accuracy above 80% before you guess', detail: 'With −1 against +3, a wrong guess is cheap only if you usually get a question right once you narrow it down.' },
      { title: 'Attempt the sections you are strongest in first', detail: 'There are no sectional time limits, so spend your first thirty minutes on the questions you can answer fastest.' },
      { title: 'Read the daily defence news', detail: 'General Awareness often draws on exercises, procurement, appointments and air-force history.' },
    ],
    faq: [
      { question: 'How many questions does each ExamForge AFCAT set have?', answer: 'Mock tests 1 to 4 have 95, 83, 75 and 63 questions, with one minute for each question. The real paper has 100 questions in 2 hours.' },
      { question: 'Does ExamForge include the Engineering Knowledge Test?', answer: 'No. The sets cover the common written paper: General Awareness, English, Numerical Ability and Reasoning.' },
      { question: 'Does AFCAT have negative marking?', answer: 'Yes, 1 mark is deducted for each wrong answer. ExamForge does not deduct marks, so work out your real-exam score by hand after each set.' },
      { question: 'Can I practise in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'agniveer': {
    heading: 'About the Indian Army Agniveer exam',
    intro: [
      'Agniveer is the Indian Army’s recruitment route for soldiers under the Agnipath scheme: Agniveer General Duty (GD), Technical, Clerk and Store Keeper Technical, and Tradesmen. Selection starts with the online Common Entrance Examination (CEE), after which shortlisted candidates take the physical and medical tests.',
      'ExamForge gives you 10 free, timed practice sets of 47 to 50 questions each, built around General Knowledge, General Science and Mathematics. Every question is in English and Hindi with an explanation after you submit. Your first three sets need no signup.',
      'The real CEE deducts marks for wrong answers in most categories. ExamForge does not, so after each set take off the penalty from the current notice for every wrong answer to see your exam-style score.',
    ],
    facts: {
      title: 'Agniveer at a glance',
      source: 'From published Agniveer recruitment summaries. The pattern changes between rallies, so check joinindianarmy.nic.in for the current notice before you apply.',
      items: [
        { label: 'Conducted by', value: 'Indian Army, through its recruitment offices' },
        { label: 'Entrance exam', value: 'Online Common Entrance Examination (CEE)' },
        { label: 'General Duty paper', value: 'About 50 questions in 60 minutes (General Knowledge, General Science, Maths)' },
        { label: 'Education (General Duty)', value: 'Class 10 pass with at least 45% overall' },
        { label: 'Age', value: '17½ to 21 years' },
        { label: 'Apply at', value: 'joinindianarmy.nic.in' },
      ],
    },
    pattern: {
      summary: 'For Agniveer General Duty the CEE is an objective paper over three subject areas. Other categories use the same style with different subjects, such as Physics, Chemistry and Maths for Technical.',
      caption: 'Agniveer General Duty CEE',
      sections: [
        { part: 'Paper', subject: 'General Knowledge, General Science and Mathematics', questions: 50, marks: 100 },
      ],
      duration: '60 minutes',
      marking: [
        { response: 'Correct answer', marks: '+2' },
        { response: 'Wrong answer', marks: '−0.5' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'The subject split and the exact penalty differ between recruitment notices, so treat the table as a guide. ExamForge’s sets are mixed rather than sectional, so each one tests all three areas together.',
    },
    syllabus: {
      intro: 'Questions are set at Class 8 to 10 level.',
      areas: [
        {
          title: 'General Knowledge and current affairs',
          summary: 'Static and current facts.',
          topics: ['Indian history, geography and the Constitution', 'Defence, sports, awards and important days', 'Books, authors and first-in-India facts', 'Current affairs'],
        },
        {
          title: 'General Science',
          summary: 'NCERT Physics, Chemistry and Biology.',
          topics: ['Motion, force, light, sound and electricity', 'Acids, bases, metals and everyday chemistry', 'Human body, nutrition, diseases and plants', 'Units, inventions and instruments'],
        },
        {
          title: 'Mathematics',
          summary: 'Arithmetic and basic algebra and geometry.',
          topics: ['Percentage, ratio, profit and loss, and averages', 'Time, work, speed and distance', 'Simple and compound interest', 'Algebra, mensuration and basic geometry'],
        },
      ],
    },
    eligibility: {
      intro: 'Requirements depend on the category and are set in each recruitment notice. For Agniveer General Duty:',
      items: [
        { title: 'Education', detail: 'Class 10 with at least 45% overall and 33% in each subject. Technical, Clerk and Tradesmen categories have their own qualifications.' },
        { title: 'Age', detail: 'Between 17½ and 21 years on the date given in the notice.' },
        { title: 'Physical standard', detail: 'Minimum height, chest and weight standards apply, and vary by region and category.' },
      ],
    },
    stages: {
      intro: 'Selection runs in this order.',
      items: [
        { title: 'Online registration', detail: 'Register and choose your recruitment office and category on the Army’s website.' },
        { title: 'Common Entrance Examination', detail: 'The computer-based test above, held at centres across the country.' },
        { title: 'Physical fitness and measurement tests', detail: 'Shortlisted candidates take the running, pull-up, balance and ditch tests, followed by measurements.' },
        { title: 'Medical examination and merit list', detail: 'Candidates who pass the physical tests go to a medical, and the final merit list is based on the CEE score.' },
      ],
    },
    tips: [
      { title: 'Start from your NCERT books', detail: 'Class 8 to 10 Science and Maths cover most of the paper, so master formulas and units before you try harder material.' },
      { title: 'Revise current affairs weekly', detail: 'Defence news, awards and sports results are easy marks if you read them regularly.' },
      { title: 'Practise 50 questions in an hour', detail: 'Sit a full ExamForge set under the timer and see how many you can finish with time left to review.' },
      { title: 'Prepare for the physical test early', detail: 'The written exam is only the first stage, so train in parallel.' },
    ],
    faq: [
      { question: 'How many questions are in each ExamForge Agniveer set?', answer: 'Each set has between 47 and 50 questions, with one minute for each question.' },
      { question: 'Which Agniveer category do these sets suit?', answer: 'They are built for General Duty, and are also useful practice for the General Knowledge, Science and Maths parts of other categories.' },
      { question: 'Does the real exam have negative marking?', answer: 'In most categories, yes. ExamForge does not deduct marks, so check the penalty in the current notice and subtract it yourself.' },
      { question: 'Can I practise in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'bihar-police': {
    heading: 'About the Bihar Police exam',
    intro: [
      'The Central Selection Board of Constables (CSBC), Bihar recruits constables (sipahi) for the Bihar Police. Selection starts with a written exam at Class 10 level, and only candidates who qualify are called for the physical test.',
      'ExamForge gives you 10 free, timed Bihar Police mock tests of 93 to 100 questions each, covering General Knowledge, General Science, Mathematics, Hindi, English and Bihar GK. Every question is in English and Hindi with an explanation after you submit. Your first three sets need no signup.',
      'The written exam has no negative marking, and neither do these sets, so your score here is worked out the same way as in the exam.',
    ],
    facts: {
      title: 'Bihar Police at a glance',
      source: 'From CSBC Bihar recruitment notices. Check csbc.bihar.gov.in for the current advertisement before you apply.',
      items: [
        { label: 'Conducted by', value: 'CSBC, Bihar' },
        { label: 'Written exam', value: '100 questions, 2 hours, OMR sheet' },
        { label: 'Level', value: 'Matriculation (Class 10)' },
        { label: 'Negative marking', value: 'None' },
        { label: 'Qualifying mark', value: '30% in the written exam' },
        { label: 'Apply at', value: 'csbc.bihar.gov.in' },
      ],
    },
    pattern: {
      summary: 'The written exam is a single objective paper of 100 questions answered on an OMR sheet. Each question carries one mark.',
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
      note: 'The written exam is qualifying, and merit is decided at the physical stage, but a score well above the pass mark keeps you safe because many more candidates than posts are called. ExamForge sets give one minute for each question, so they run shorter than the real 2 hours; use them for speed and accuracy.',
    },
    syllabus: {
      intro: 'Questions are set at Class 10 level. Each ExamForge mock test mixes all of these areas.',
      areas: [
        {
          title: 'Bihar and general knowledge',
          summary: 'Bihar-specific GK carries real weight, alongside national affairs.',
          topics: ['History, geography and culture of Bihar', 'Bihar’s districts, rivers, national parks and festivals', 'Indian polity and the Constitution', 'Important dates, books, authors and awards', 'Current affairs'],
        },
        {
          title: 'General Science',
          summary: 'Physics, Chemistry and Biology at Class 10 level.',
          topics: ['Motion, light, sound and electricity', 'Acids, bases, metals and common compounds', 'Human body, vitamins and diseases', 'Plants and cells'],
        },
        {
          title: 'Mathematics',
          summary: 'Arithmetic and basic algebra.',
          topics: ['Percentage, ratio, average, profit and loss', 'Time, work, speed and distance', 'Simple and compound interest', 'Mensuration and geometry'],
        },
        {
          title: 'Hindi and English',
          summary: 'Language skills at Class 10 level.',
          topics: ['Hindi grammar, vocabulary, idioms and proverbs', 'English grammar, vocabulary and error spotting', 'Comprehension passages'],
        },
      ],
    },
    eligibility: {
      intro: 'Requirements are set in each CSBC advertisement. In general:',
      items: [
        { title: 'Education', detail: 'Class 12 pass or equivalent for most constable posts, with some posts open at Class 10. Check the advertisement.' },
        { title: 'Age', detail: 'Usually 18 to 25 years for general candidates, with relaxation for reserved categories and women.' },
        { title: 'Physical standard', detail: 'Minimum height and chest measurements apply, with separate standards for men and women.' },
      ],
    },
    stages: {
      intro: 'Selection runs in this order.',
      items: [
        { title: 'Written exam', detail: 'The 100-question paper above. You must reach the qualifying mark to continue.' },
        { title: 'Physical Efficiency Test', detail: 'Running and field events for qualified candidates, which decide merit.' },
        { title: 'Document verification and medical', detail: 'Candidates on the merit list have their documents and fitness checked.' },
      ],
    },
    tips: [
      { title: 'Focus on Bihar-specific GK', detail: 'Questions on Bihar history, geography, economy and government schemes appear in every paper.' },
      { title: 'Time yourself at one minute per question', detail: 'The ExamForge timer matches this pace, which leaves a buffer in the real 2 hours.' },
      { title: 'Read each explanation', detail: 'For GK and Science, the explanation is often worth more than the question, because the same fact returns in new wording.' },
    ],
    faq: [
      { question: 'How many questions does each set have?', answer: 'Between 93 and 100, with one minute for each question. The first two sets have 100.' },
      { question: 'Is there another Bihar Police exam on ExamForge?', answer: 'Yes. Bihar Police Constable is a separate exam page with sectional sets for General Knowledge and General Science. This page has 10 full mixed mock tests.' },
      { question: 'Does the exam have negative marking?', answer: 'No. A wrong answer costs nothing, so attempt every question.' },
      { question: 'Can I practise in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'delhi-police': {
    heading: 'About the Delhi Police Constable exam',
    intro: [
      'The Staff Selection Commission (SSC) recruits Constables (Executive) for Delhi Police through a computer-based test (CBT). Candidates who clear the CBT go on to the Physical Endurance and Measurement Test (PE&MT) and a medical.',
      'ExamForge gives you 10 free, timed Delhi Police mock tests of 80 to 90 questions each, covering General Knowledge and Current Affairs, Reasoning, Numerical Ability and Computer Fundamentals. Every question is in English and Hindi with an explanation after you submit. Your first three sets need no signup.',
      'The real CBT deducts a quarter of a mark for every wrong answer. ExamForge sets do not, so take a quarter off for each wrong answer to see your exam-style score.',
    ],
    facts: {
      title: 'Delhi Police Constable at a glance',
      source: 'From SSC Delhi Police Constable (Executive) notices. Check ssc.gov.in for the current notice before you apply.',
      items: [
        { label: 'Conducted by', value: 'Staff Selection Commission, for Delhi Police' },
        { label: 'CBT', value: '100 questions, 100 marks, 90 minutes' },
        { label: 'Negative marking', value: '0.25 per wrong answer' },
        { label: 'Qualification', value: 'Class 12 pass' },
        { label: 'Age', value: '18 to 25 years (relaxation for reserved categories)' },
        { label: 'Apply at', value: 'ssc.gov.in' },
      ],
    },
    pattern: {
      summary: 'The CBT is a single objective paper in four parts. Every question carries one mark.',
      caption: 'Delhi Police Constable CBT',
      sections: [
        { part: 'Part A', subject: 'General Knowledge and Current Affairs', questions: 50, marks: 50 },
        { part: 'Part B', subject: 'Reasoning', questions: 25, marks: 25 },
        { part: 'Part C', subject: 'Numerical Ability', questions: 15, marks: 15 },
        { part: 'Part D', subject: 'Computer Fundamentals', questions: 10, marks: 10 },
      ],
      duration: '90 minutes',
      marking: [
        { response: 'Correct answer', marks: '+1' },
        { response: 'Wrong answer', marks: '−0.25' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'The CBT is qualifying, with minimum percentages set by category, and final merit is decided by CBT marks among candidates who clear the physical and medical stages. ExamForge sets mix all four parts and give one minute for each question.',
    },
    syllabus: {
      intro: 'Half of the paper is General Knowledge, so it decides most results.',
      areas: [
        {
          title: 'General Knowledge and Current Affairs',
          summary: 'The largest part, 50 questions.',
          topics: ['Indian history, geography and polity', 'General science and environment', 'Delhi-specific facts and institutions', 'Awards, sports, books and appointments', 'Current affairs'],
        },
        {
          title: 'Reasoning',
          summary: 'Verbal and non-verbal reasoning, 25 questions.',
          topics: ['Analogy, classification and series', 'Coding-decoding and blood relations', 'Directions, ranking and Venn diagrams', 'Mirror and water images, paper folding'],
        },
        {
          title: 'Numerical Ability',
          summary: 'Arithmetic, 15 questions.',
          topics: ['Percentage, ratio, average and profit and loss', 'Time and work, speed and distance', 'Simple and compound interest', 'Number system and simplification'],
        },
        {
          title: 'Computer Fundamentals',
          summary: 'Basics, 10 questions that are quick to answer.',
          topics: ['Hardware, software and memory', 'MS Word, Excel and PowerPoint', 'Internet, email and security basics', 'Number systems and shortcuts'],
        },
      ],
    },
    eligibility: {
      intro: 'Requirements are set in each SSC notice. In general:',
      items: [
        { title: 'Education', detail: 'Class 12 pass from a recognised board.' },
        { title: 'Age', detail: '18 to 25 years on the cut-off date, with relaxation for SC, ST, OBC, ex-servicemen and other categories.' },
        { title: 'Driving licence', detail: 'Male candidates must hold a valid driving licence for light motor vehicles or motorcycle by the stage the notice specifies.' },
        { title: 'Physical standard', detail: 'Height and chest standards apply, separately for men and women.' },
      ],
    },
    stages: {
      intro: 'Selection runs in this order.',
      items: [
        { title: 'Computer-based test', detail: 'The 100-question paper above.' },
        { title: 'Physical Endurance and Measurement Test', detail: 'Race and jump events plus physical measurement for those who clear the CBT.' },
        { title: 'Medical and document verification', detail: 'Candidates on the provisional list are examined and their certificates are checked before the final merit list.' },
      ],
    },
    tips: [
      { title: 'Do not skip Computer Fundamentals', detail: 'Ten questions on basic MS Office and the internet are among the easiest marks in the paper.' },
      { title: 'Revise current affairs every day', detail: 'General Knowledge is half of the CBT, and the last six months of news matter most.' },
      { title: 'Watch your accuracy', detail: 'With −0.25 for a wrong answer, avoid wild guesses in the final minutes.' },
    ],
    faq: [
      { question: 'How many questions does each set have?', answer: 'Between 80 and 90, with one minute for each question. The real CBT has 100 questions in 90 minutes.' },
      { question: 'Does the exam have negative marking?', answer: 'Yes, 0.25 marks for each wrong answer. ExamForge does not deduct marks, so subtract the penalty yourself.' },
      { question: 'Can I practise in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'ibps-po': {
    heading: 'About the IBPS PO exam',
    intro: [
      'The Institute of Banking Personnel Selection (IBPS) runs the Common Recruitment Process for Probationary Officers and Management Trainees in public sector banks. It has three stages: a preliminary exam, a main exam and an interview.',
      'ExamForge gives you 10 free, timed practice sets with 5 options per question (A to E), as in the real exam. Set 1 is a full 100-question prelims-style paper; later sets are shorter and cover English, Quantitative Aptitude and Reasoning Ability. Every question has an explanation after you submit, and your first three sets need no signup.',
      'The real exam deducts a quarter of a mark for each wrong answer. ExamForge does not, so take a quarter off for each wrong answer to see your exam-style score.',
    ],
    facts: {
      title: 'IBPS PO at a glance',
      source: 'From published IBPS PO exam-pattern summaries. Check ibps.in for the current notification before you apply.',
      items: [
        { label: 'Conducted by', value: 'Institute of Banking Personnel Selection' },
        { label: 'Prelims', value: '100 questions, 100 marks, 60 minutes' },
        { label: 'Mains', value: '155 objective questions (200 marks, 3 hours) plus a descriptive paper' },
        { label: 'Interview', value: '100 marks' },
        { label: 'Qualification', value: 'Graduation in any stream' },
        { label: 'Apply at', value: 'ibps.in' },
      ],
    },
    pattern: {
      summary: 'The preliminary exam is a screening test with three timed sections, each with its own 20-minute limit. Every question carries one mark.',
      caption: 'IBPS PO preliminary exam',
      sections: [
        { part: 'Section 1', subject: 'English Language', questions: 30, marks: 30 },
        { part: 'Section 2', subject: 'Quantitative Aptitude', questions: 35, marks: 35 },
        { part: 'Section 3', subject: 'Reasoning Ability', questions: 35, marks: 35 },
      ],
      duration: '60 minutes (20 minutes for each section)',
      marking: [
        { response: 'Correct answer', marks: '+1' },
        { response: 'Wrong answer', marks: '−0.25' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'Prelims marks only decide who goes to the main exam. The main exam adds Reasoning and Computer Aptitude, Data Analysis and Interpretation, and General, Economy and Banking Awareness, and the final merit list weighs the main exam 80% and the interview 20%. ExamForge covers the prelims subjects and the common main-exam style of question.',
    },
    syllabus: {
      intro: 'Questions are set at graduate level and are mostly about speed.',
      areas: [
        {
          title: 'English Language',
          summary: 'Grammar and reading, 30 questions.',
          topics: ['Reading comprehension', 'Cloze test and error spotting', 'Para jumbles and sentence correction', 'Vocabulary, fillers and phrase replacement'],
        },
        {
          title: 'Quantitative Aptitude',
          summary: 'Speed arithmetic and data, 35 questions.',
          topics: ['Simplification and approximation', 'Number series and quadratic equations', 'Data interpretation: tables, bar and pie charts', 'Percentage, profit and loss, interest and averages', 'Time and work, speed and mixtures'],
        },
        {
          title: 'Reasoning Ability',
          summary: 'Puzzles and logic, 35 questions.',
          topics: ['Seating arrangement and puzzles', 'Syllogism and inequalities', 'Blood relations, direction sense and ranking', 'Coding-decoding and data sufficiency'],
        },
      ],
    },
    eligibility: {
      intro: 'Requirements are set in each IBPS notification. In general:',
      items: [
        { title: 'Education', detail: 'A graduate degree in any discipline from a recognised university, with proficiency in the official language of the state you apply to.' },
        { title: 'Age', detail: '20 to 30 years, with relaxation for SC, ST, OBC, PwBD and ex-servicemen.' },
        { title: 'Nationality', detail: 'Indian citizen, or a citizen of Nepal, Bhutan, or a person of Indian origin as the notification allows.' },
      ],
    },
    stages: {
      intro: 'Selection runs in this order.',
      items: [
        { title: 'Preliminary exam', detail: 'The online screening test above.' },
        { title: 'Main exam', detail: 'An objective paper and a descriptive English paper (letter and essay) on the same day.' },
        { title: 'Interview', detail: 'A 100-mark panel interview for those who clear the main exam.' },
        { title: 'Provisional allotment', detail: 'Banks are allotted by the final merit list and the preferences you gave.' },
      ],
    },
    tips: [
      { title: 'Practise one section at a time under the clock', detail: 'Each prelims section has its own 20 minutes, so the sectional sets are the best way to build that rhythm.' },
      { title: 'Learn shortcuts for calculation', detail: 'Simplification, approximation and series questions are won by speed rather than depth.' },
      { title: 'Solve two puzzles every day', detail: 'Seating arrangements get faster only with repetition.' },
      { title: 'Skip, then return', detail: 'With a penalty on wrong answers, leave the unclear question and come back if time remains.' },
    ],
    faq: [
      { question: 'Why are there 5 options per question?', answer: 'Banking exams such as IBPS and SBI use five options, A to E, for each question. ExamForge shows all five, in English and Hindi.' },
      { question: 'Why do later sets have fewer questions?', answer: 'Sets 1 to 10 have 100, 79, 59, 56, 46, 43, 26, 17, 19 and 9 questions. Set 1 is the full length; the later ones are short practice sets, with one minute for each question.' },
      { question: 'Does IBPS PO have negative marking?', answer: 'Yes, 0.25 marks for each wrong answer. ExamForge does not deduct marks, so subtract the penalty yourself.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'rajasthan-police': {
    heading: 'About the Rajasthan Police Constable exam',
    intro: [
      'The Rajasthan Police Recruitment Board holds a written exam to select constables for Rajasthan Police. Candidates who pass it go on to physical standard and efficiency tests, and then to document verification and a medical.',
      'ExamForge gives you 10 free, timed Rajasthan Police mock tests of 92 to 100 questions each, covering Reasoning, General Science, Computer Literacy, General Knowledge and Rajasthan GK: history, art, culture and geography. Every question is in English and Hindi with an explanation after you submit. Your first three sets need no signup.',
      'Whether the written exam deducts marks has varied between recruitment cycles. ExamForge sets have no negative marking, so check the current notice and apply any penalty yourself.',
    ],
    facts: {
      title: 'Rajasthan Police Constable at a glance',
      source: 'Details change between recruitment cycles. Check police.rajasthan.gov.in and the current advertisement before you apply.',
      items: [
        { label: 'Conducted by', value: 'Rajasthan Police Recruitment Board' },
        { label: 'Written exam', value: 'Objective paper, with questions on GK, Rajasthan GK, reasoning and more' },
        { label: 'Qualification', value: 'Class 12 pass' },
        { label: 'Language', value: 'Hindi and English' },
        { label: 'Apply at', value: 'Rajasthan recruitment portal (see the notice)' },
      ],
    },
    syllabus: {
      intro: 'Rajasthan-specific GK is the feature that sets this exam apart from other constable exams. Each ExamForge mock test mixes all of these areas.',
      areas: [
        {
          title: 'Rajasthan GK',
          summary: 'History, art, culture and geography of the state.',
          topics: ['Rajput dynasties, forts and palaces', 'Folk music, dance, fairs and festivals', 'Rivers, lakes, deserts and districts', 'Handicrafts, paintings and cuisine', 'Government schemes and administration'],
        },
        {
          title: 'General Knowledge and current affairs',
          summary: 'National and international facts.',
          topics: ['Indian history, geography and the Constitution', 'Awards, sports, books and important days', 'Current affairs'],
        },
        {
          title: 'Reasoning and Mathematics',
          summary: 'Mental ability.',
          topics: ['Series, analogy and classification', 'Coding-decoding, directions and blood relations', 'Percentage, ratio, average and profit and loss'],
        },
        {
          title: 'General Science and Computer',
          summary: 'Basics at school level.',
          topics: ['Physics, Chemistry and Biology', 'Health and the human body', 'Computer hardware, software and MS Office'],
        },
      ],
    },
    eligibility: {
      intro: 'Requirements are set in each recruitment notice. In general:',
      items: [
        { title: 'Education', detail: 'Class 12 pass from a recognised board.' },
        { title: 'Age', detail: 'Usually 18 to 24 years, with relaxation for reserved categories and women.' },
        { title: 'Physical standard', detail: 'Height, chest and weight standards apply, separately for men and women.' },
      ],
    },
    stages: {
      intro: 'Selection normally runs in this order.',
      items: [
        { title: 'Written exam', detail: 'The objective paper that decides who is called to the next stage.' },
        { title: 'Physical standard and efficiency tests', detail: 'Measurement, race and field events.' },
        { title: 'Document verification and medical', detail: 'Candidates on the merit list have their certificates and fitness checked.' },
      ],
    },
    tips: [
      { title: 'Give Rajasthan GK its own revision slot', detail: 'Forts, fairs, folk arts and districts return in every cycle and are easy to memorise from short notes.' },
      { title: 'Use explanations to build notes', detail: 'ExamForge explanations in Hindi and English make good revision cards for the state’s history and culture.' },
      { title: 'Attempt every question', detail: 'Unless the current notice says otherwise, review marks lost to blanks against marks lost to guesses.' },
    ],
    faq: [
      { question: 'How many questions does each set have?', answer: 'Between 92 and 100, with one minute for each question.' },
      { question: 'Is the exam available in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'rrb-technician': {
    heading: 'About the RRB Technician exam',
    intro: [
      'The Railway Recruitment Boards (RRBs) recruit Technicians for Indian Railways in two grades: Technician Grade I (Signal) and Technician Grade III. Selection is by computer-based tests (CBT), followed by document verification and a medical.',
      'ExamForge gives you 10 free, timed RRB Technician mock tests of 92 to 100 questions each, covering Mathematics, General Intelligence and Reasoning, Basic Science and Engineering, and General Awareness. Every question is in English and Hindi with an explanation after you submit. Your first three sets need no signup.',
      'The real CBT deducts one-third of a mark for every wrong answer. ExamForge does not, so take a third off for each wrong answer to see your exam-style score.',
    ],
    facts: {
      title: 'RRB Technician at a glance',
      source: 'From published RRB Technician exam-pattern summaries. The exact pattern depends on the notice, so check indianrailways.gov.in and your RRB’s website before you apply.',
      items: [
        { label: 'Conducted by', value: 'Railway Recruitment Boards' },
        { label: 'Posts', value: 'Technician Grade I (Signal) and Technician Grade III' },
        { label: 'Stage 1', value: 'CBT-1: 75 questions, 60 minutes (screening)' },
        { label: 'Negative marking', value: '1/3 per wrong answer' },
        { label: 'Grade I qualification', value: 'Diploma or degree in a relevant engineering field, or B.Sc. in Physics, Electronics, Computer Science or IT' },
        { label: 'Grade III qualification', value: 'Class 10 plus ITI or Act Apprenticeship' },
      ],
    },
    pattern: {
      summary: 'CBT-1 is a screening test common to both grades, in four parts. Every question carries one mark.',
      caption: 'RRB Technician CBT-1',
      sections: [
        { part: 'Part 1', subject: 'Mathematics', questions: 20, marks: 20 },
        { part: 'Part 2', subject: 'General Intelligence and Reasoning', questions: 25, marks: 25 },
        { part: 'Part 3', subject: 'Basic Science and Engineering', questions: 20, marks: 20 },
        { part: 'Part 4', subject: 'General Awareness', questions: 10, marks: 10 },
      ],
      duration: '60 minutes',
      marking: [
        { response: 'Correct answer', marks: '+1' },
        { response: 'Wrong answer', marks: '−1/3' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'CBT-1 only screens candidates; those shortlisted take a second CBT that carries the merit marks. ExamForge sets mix the four parts and give one minute for each question, which is slower than the real exam, so use them to learn the material first and build speed second.',
    },
    syllabus: {
      intro: 'Questions are set at Class 10 and ITI level, with the technical weight in Basic Science and Engineering.',
      areas: [
        {
          title: 'Mathematics',
          summary: 'Arithmetic and mensuration.',
          topics: ['Number system, BODMAS, HCF and LCM', 'Percentage, ratio, average, profit and loss', 'Time and work, speed and distance', 'Algebra, geometry and mensuration', 'Trigonometry and statistics'],
        },
        {
          title: 'General Intelligence and Reasoning',
          summary: 'The largest part of CBT-1.',
          topics: ['Analogy, classification and series', 'Coding-decoding and mathematical operations', 'Blood relations, directions and ranking', 'Syllogism and Venn diagrams', 'Mirror images and figure counting'],
        },
        {
          title: 'Basic Science and Engineering',
          summary: 'Class 10 science and the trade basics.',
          topics: ['Motion, force, work, energy and power', 'Heat, light, sound and magnetism', 'Electricity, circuits and measuring instruments', 'Materials, metals, acids and bases', 'Basic engineering drawing and tools'],
        },
        {
          title: 'General Awareness',
          summary: 'Current affairs and railways.',
          topics: ['Current affairs, sports and awards', 'Indian history, geography and polity', 'Science and technology news', 'Indian Railways facts'],
        },
      ],
    },
    eligibility: {
      intro: 'Requirements differ by grade and notice. In general:',
      items: [
        { title: 'Technician Grade I (Signal)', detail: 'Diploma or degree in a relevant engineering stream, or a B.Sc. in Physics, Electronics, Computer Science, IT or a similar subject.' },
        { title: 'Technician Grade III', detail: 'Matriculation (Class 10) with an ITI certificate or National Apprenticeship Certificate in a listed trade.' },
        { title: 'Age', detail: 'Usually 18 to 33 years for Grade I and 18 to 30 for Grade III, with relaxation for reserved categories.' },
      ],
    },
    stages: {
      intro: 'Selection runs in this order.',
      items: [
        { title: 'CBT-1', detail: 'The screening test above.' },
        { title: 'CBT-2', detail: 'A longer paper for those shortlisted, which carries the merit marks.' },
        { title: 'Document verification and medical', detail: 'Candidates on the merit list have their certificates and fitness checked before appointment.' },
      ],
    },
    tips: [
      { title: 'Treat Basic Science as a scoring section', detail: 'It is the part where the technical background of candidates helps most. Revise Class 9 and 10 Physics and basic electricity.' },
      { title: 'Learn the reasoning patterns first', detail: 'It has the most questions in CBT-1, and most question types repeat.' },
      { title: 'Mind the penalty', detail: 'With −1/3 per wrong answer, mark only the options you can defend, and use explanations to see where you guessed.' },
    ],
    faq: [
      { question: 'How many questions does each set have?', answer: 'Between 92 and 100, with one minute for each question.' },
      { question: 'Does ExamForge cover both Grade I and Grade III?', answer: 'Yes. The common subjects are the same, so the sets suit both grades.' },
      { question: 'Does the exam have negative marking?', answer: 'Yes, one-third of a mark for each wrong answer. ExamForge does not deduct marks, so subtract the penalty yourself.' },
      { question: 'Can I practise in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'sbi-clerk': {
    heading: 'About the SBI Clerk exam',
    intro: [
      'The State Bank of India recruits Junior Associates (Customer Support and Sales), usually called SBI Clerks, through a preliminary exam and a main exam, followed by a test of the local language. There is no interview.',
      'ExamForge gives you 10 free, timed practice sets with 5 options per question (A to E), as in the real exam. Set 1 is a full 100-question prelims-style paper; later sets are shorter and cover English, Numerical Ability and Reasoning Ability. Every question has an explanation after you submit, and your first three sets need no signup.',
      'The real exam deducts a quarter of a mark for each wrong answer. ExamForge does not, so take a quarter off for each wrong answer to see your exam-style score.',
    ],
    facts: {
      title: 'SBI Clerk at a glance',
      source: 'From published SBI Clerk exam-pattern summaries. Check sbi.co.in/careers for the current notification before you apply.',
      items: [
        { label: 'Conducted by', value: 'State Bank of India' },
        { label: 'Prelims', value: '100 questions, 100 marks, 60 minutes' },
        { label: 'Mains', value: '190 questions, 200 marks, 2 hours 40 minutes' },
        { label: 'Negative marking', value: '0.25 per wrong answer' },
        { label: 'Qualification', value: 'Graduation in any stream' },
        { label: 'Apply at', value: 'sbi.co.in/careers' },
      ],
    },
    pattern: {
      summary: 'The preliminary exam is a screening test with three timed sections, each with its own 20-minute limit. Every question carries one mark.',
      caption: 'SBI Clerk preliminary exam',
      sections: [
        { part: 'Section 1', subject: 'English Language', questions: 30, marks: 30 },
        { part: 'Section 2', subject: 'Numerical Ability', questions: 35, marks: 35 },
        { part: 'Section 3', subject: 'Reasoning Ability', questions: 35, marks: 35 },
      ],
      duration: '60 minutes (20 minutes for each section)',
      marking: [
        { response: 'Correct answer', marks: '+1' },
        { response: 'Wrong answer', marks: '−0.25' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'Prelims marks only decide who goes to the main exam. The main exam has four sections: General and Financial Awareness, General English, Quantitative Aptitude, and Reasoning Ability and Computer Aptitude. The final list is based on main exam marks alone, after a language test.',
    },
    syllabus: {
      intro: 'Questions are set at graduate level. Speed matters more than depth.',
      areas: [
        {
          title: 'English Language',
          summary: 'Grammar and reading, 30 questions.',
          topics: ['Reading comprehension', 'Cloze test and error spotting', 'Para jumbles and sentence improvement', 'Vocabulary and fill in the blanks'],
        },
        {
          title: 'Numerical Ability',
          summary: 'Arithmetic and data, 35 questions.',
          topics: ['Simplification and approximation', 'Number series and quadratic equations', 'Data interpretation', 'Percentage, profit and loss, interest and averages', 'Time and work, speed and distance'],
        },
        {
          title: 'Reasoning Ability',
          summary: 'Puzzles and logic, 35 questions.',
          topics: ['Seating arrangement and puzzles', 'Syllogism and inequalities', 'Blood relations, direction sense and ranking', 'Coding-decoding and input-output'],
        },
      ],
    },
    eligibility: {
      intro: 'Requirements are set in each SBI notification. In general:',
      items: [
        { title: 'Education', detail: 'A graduate degree in any discipline from a recognised university. Final-year students may apply if they can show a pass by the date in the notice.' },
        { title: 'Age', detail: '20 to 28 years, with relaxation for SC, ST, OBC, PwBD and ex-servicemen.' },
        { title: 'Language', detail: 'You must be able to read, write and speak the local language of the state or circle you apply to.' },
      ],
    },
    stages: {
      intro: 'Selection runs in this order.',
      items: [
        { title: 'Preliminary exam', detail: 'The online screening test above.' },
        { title: 'Main exam', detail: 'The longer online test, which decides merit.' },
        { title: 'Local language test', detail: 'A test of the official language of your state, unless you show a Class 10 or 12 certificate in it.' },
      ],
    },
    tips: [
      { title: 'Build speed in simplification and series', detail: 'These types repeat every year and are the fastest marks in Numerical Ability.' },
      { title: 'Use the 20-minute limits', detail: 'Each prelims section is timed, so do not carry spare time from English into reasoning; there is none.' },
      { title: 'Revise banking and finance news', detail: 'The main exam has a separate Financial Awareness section.' },
    ],
    faq: [
      { question: 'Why are there 5 options per question?', answer: 'Banking exams such as SBI and IBPS use five options, A to E, for each question. ExamForge shows all five, in English and Hindi.' },
      { question: 'Why do later sets have fewer questions?', answer: 'Sets 1 to 10 have 100, 82, 68, 39, 49, 29, 40, 22, 13 and 9 questions. Set 1 is the full length; the later ones are short practice sets, with one minute for each question.' },
      { question: 'Does SBI Clerk have negative marking?', answer: 'Yes, 0.25 marks for each wrong answer. ExamForge does not deduct marks, so subtract the penalty yourself.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'sbi-po': {
    heading: 'About the SBI PO exam',
    intro: [
      'The State Bank of India recruits Probationary Officers through a three-phase process: a preliminary exam, a main exam, and a final phase of psychometric test, group exercise and interview. It is among the most sought-after bank jobs in India.',
      'ExamForge gives you 10 free, timed practice sets with 5 options per question (A to E), as in the real exam. Set 1 is a full 100-question prelims-style paper; later sets are shorter and cover English, Quantitative Aptitude and Reasoning Ability. Every question has an explanation after you submit, and your first three sets need no signup.',
      'The real exam deducts a quarter of a mark for each wrong answer. ExamForge does not, so take a quarter off for each wrong answer to see your exam-style score.',
    ],
    facts: {
      title: 'SBI PO at a glance',
      source: 'From published SBI PO exam-pattern summaries. Check sbi.co.in/careers for the current notification before you apply.',
      items: [
        { label: 'Conducted by', value: 'State Bank of India' },
        { label: 'Prelims', value: '100 questions, 100 marks, 60 minutes' },
        { label: 'Mains', value: '157 objective questions (200 marks, 3 hours) plus a descriptive paper' },
        { label: 'Final phase', value: 'Psychometric test, group exercise and interview' },
        { label: 'Qualification', value: 'Graduation in any stream' },
        { label: 'Apply at', value: 'sbi.co.in/careers' },
      ],
    },
    pattern: {
      summary: 'The preliminary exam is a screening test with three timed sections, each with its own 20-minute limit. Every question carries one mark.',
      caption: 'SBI PO preliminary exam',
      sections: [
        { part: 'Section 1', subject: 'English Language', questions: 30, marks: 30 },
        { part: 'Section 2', subject: 'Quantitative Aptitude', questions: 35, marks: 35 },
        { part: 'Section 3', subject: 'Reasoning Ability', questions: 35, marks: 35 },
      ],
      duration: '60 minutes (20 minutes for each section)',
      marking: [
        { response: 'Correct answer', marks: '+1' },
        { response: 'Wrong answer', marks: '−0.25' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'Prelims marks only decide who goes to the main exam. The main exam adds Data Analysis and Interpretation, General, Economy and Banking Awareness, and Reasoning and Computer Aptitude, plus a descriptive paper. Main exam marks and the final phase are combined for the final merit list.',
    },
    syllabus: {
      intro: 'Questions are set at graduate level, with more depth in Quantitative Aptitude and Reasoning than in other bank exams.',
      areas: [
        {
          title: 'English Language',
          summary: 'Grammar and reading, 30 questions.',
          topics: ['Reading comprehension', 'Cloze test and error spotting', 'Para jumbles and sentence correction', 'Vocabulary and phrase replacement'],
        },
        {
          title: 'Quantitative Aptitude',
          summary: 'Arithmetic and data, 35 questions.',
          topics: ['Simplification, approximation and number series', 'Data interpretation and caselets', 'Quadratic equations and inequalities', 'Percentage, profit and loss, interest and mixtures', 'Time and work, speed, boats and streams'],
        },
        {
          title: 'Reasoning Ability',
          summary: 'Puzzles and logic, 35 questions.',
          topics: ['Seating arrangement and puzzles', 'Syllogism and inequalities', 'Blood relations, direction sense and ranking', 'Input-output and data sufficiency'],
        },
      ],
    },
    eligibility: {
      intro: 'Requirements are set in each SBI notification. In general:',
      items: [
        { title: 'Education', detail: 'A graduate degree in any discipline from a recognised university. Final-year students may apply if they can show a pass by the date in the notice.' },
        { title: 'Age', detail: '21 to 30 years, with relaxation for SC, ST, OBC, PwBD and ex-servicemen.' },
        { title: 'Nationality', detail: 'Indian citizen, or a person in the categories the notification lists.' },
      ],
    },
    stages: {
      intro: 'Selection runs in this order.',
      items: [
        { title: 'Preliminary exam', detail: 'The online screening test above.' },
        { title: 'Main exam', detail: 'An objective paper and a descriptive English paper on the same day.' },
        { title: 'Psychometric test, group exercise and interview', detail: 'Held for candidates who clear the main exam, and combined with main exam marks for the final list.' },
      ],
    },
    tips: [
      { title: 'Practise caselets and data interpretation', detail: 'These carry heavy weight in the main exam and take the longest to solve; learn to pick the right data first.' },
      { title: 'Use the 20-minute limits', detail: 'Each prelims section is timed, so rehearse finishing English in 15 minutes to leave time for the rest.' },
      { title: 'Review every explanation', detail: 'For puzzles, the explanation shows a faster path, which matters more than getting the right answer slowly.' },
    ],
    faq: [
      { question: 'Why are there 5 options per question?', answer: 'Banking exams such as SBI and IBPS use five options, A to E, for each question. ExamForge shows all five, in English and Hindi.' },
      { question: 'Why do later sets have fewer questions?', answer: 'Sets 1 to 10 have 100, 81, 60, 45, 37, 33, 31, 28, 22 and 11 questions. Set 1 is the full length; the later ones are short practice sets, with one minute for each question.' },
      { question: 'Does SBI PO have negative marking?', answer: 'Yes, 0.25 marks for each wrong answer. ExamForge does not deduct marks, so subtract the penalty yourself.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'tet': {
    heading: 'About the Teacher Eligibility Test (TET)',
    intro: [
      'A Teacher Eligibility Test (TET) is the qualifying exam you must pass to teach in a government school. The Central Board of Secondary Education holds the national CTET, and many states hold their own, such as UPTET, REET and Bihar TET. Paper I is for classes 1 to 5 and Paper II is for classes 6 to 8.',
      'ExamForge gives you 4 free, timed TET mock tests of 114, 41, 33 and 28 questions, covering Child Development and Pedagogy, Mathematics, Environmental Studies, Hindi and English. Every question is in English and Hindi with an explanation after you submit. Your first three sets need no signup.',
      'Most TETs have no negative marking, and these sets do not, so your score here is worked out the same way as in the exam.',
    ],
    facts: {
      title: 'TET at a glance',
      source: 'Patterns differ by state and board. Check ctet.nic.in or your state board’s website for the current notice before you apply.',
      items: [
        { label: 'Conducted by', value: 'CBSE (CTET) and state boards' },
        { label: 'Typical paper', value: '150 questions, 150 marks, 2 hours 30 minutes' },
        { label: 'Negative marking', value: 'None in most TETs' },
        { label: 'Paper I', value: 'For teaching classes 1 to 5' },
        { label: 'Paper II', value: 'For teaching classes 6 to 8' },
        { label: 'Qualifying mark', value: '60% (relaxation for reserved categories)' },
      ],
    },
    pattern: {
      summary: 'A typical TET paper has five sections of 30 questions each. Every question carries one mark.',
      caption: 'Typical TET Paper I',
      sections: [
        { part: 'Section 1', subject: 'Child Development and Pedagogy', questions: 30, marks: 30 },
        { part: 'Section 2', subject: 'Language I (Hindi)', questions: 30, marks: 30 },
        { part: 'Section 3', subject: 'Language II (English)', questions: 30, marks: 30 },
        { part: 'Section 4', subject: 'Mathematics', questions: 30, marks: 30 },
        { part: 'Section 5', subject: 'Environmental Studies', questions: 30, marks: 30 },
      ],
      duration: '2 hours 30 minutes',
      marking: [
        { response: 'Correct answer', marks: '+1' },
        { response: 'Wrong answer', marks: '0' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'This is the CTET Paper I pattern; state TETs differ in languages and subjects. Paper II replaces Mathematics and Environmental Studies with Mathematics and Science, or Social Studies. ExamForge also has separate exam pages for CTET Paper 1 and Paper 2, with sectional sets.',
    },
    syllabus: {
      intro: 'Child Development and Pedagogy is common to both papers.',
      areas: [
        {
          title: 'Child Development and Pedagogy',
          summary: 'How children grow and learn.',
          topics: ['Piaget, Vygotsky and Kohlberg', 'Inclusive education and children with special needs', 'Learning, motivation and intelligence', 'Assessment, evaluation and teaching methods'],
        },
        {
          title: 'Languages',
          summary: 'Hindi and English, grammar and pedagogy.',
          topics: ['Unseen passages', 'Grammar, vocabulary and idioms', 'Language acquisition and teaching methods', 'Listening, speaking and writing skills'],
        },
        {
          title: 'Mathematics',
          summary: 'Primary-level content and its teaching.',
          topics: ['Number system, fractions and decimals', 'Geometry, measurement and data handling', 'Pedagogy of Mathematics', 'Problem solving and errors in learning'],
        },
        {
          title: 'Environmental Studies',
          summary: 'Primary-level EVS.',
          topics: ['Family, food, water and shelter', 'Plants, animals and the environment', 'Concepts and pedagogy of EVS', 'Environmental issues'],
        },
      ],
    },
    eligibility: {
      intro: 'Requirements are set by each board. For the national CTET:',
      items: [
        { title: 'Paper I', detail: 'Class 12 with at least 50% and a D.El.Ed or B.El.Ed, or a graduate degree with the qualifications the notice lists.' },
        { title: 'Paper II', detail: 'A graduate degree and a B.Ed, or an equivalent teaching qualification in the notice.' },
        { title: 'Age', detail: 'There is no upper age limit for most TETs.' },
      ],
    },
    stages: {
      intro: 'A TET is only the first step to a teaching job.',
      items: [
        { title: 'Pass the TET', detail: 'Score at least the qualifying mark to receive an eligibility certificate.' },
        { title: 'Apply for a teaching post', detail: 'Schools and recruiting boards open posts separately, and TET marks usually count toward merit.' },
      ],
    },
    tips: [
      { title: 'Treat Child Development as your base', detail: 'It appears in every paper and every state TET, so theories and terms are worth learning exactly.' },
      { title: 'Learn pedagogy along with content', detail: 'Every language and Maths question can be about content or about how to teach it.' },
      { title: 'Revise from the explanations', detail: 'They state the principle behind the answer, which is what the next question will test.' },
    ],
    faq: [
      { question: 'Who should take these sets?', answer: 'Candidates preparing for CTET, UPTET, REET, Bihar TET and other state tests.' },
      { question: 'How many questions does each set have?', answer: 'The four sets have 114, 41, 33 and 28 questions, with one minute for each question.' },
      { question: 'Can I practise in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'up-police': {
    heading: 'About the UP Police Constable exam',
    intro: [
      'The Uttar Pradesh Police Recruitment and Promotion Board (UPPRPB) recruits civil police constables through a written exam, followed by document verification, a physical standard test, a physical efficiency test and a medical. Recruitment drives are among the largest in the country.',
      'ExamForge gives you 10 free, timed UP Police mock tests of 132 to 150 questions each, covering General Knowledge, General Hindi, Numerical and Mental Ability, and Mental Aptitude and Reasoning. Every question is in English and Hindi with an explanation after you submit. Your first three sets need no signup.',
      'The real exam deducts marks for wrong answers. ExamForge does not, so after each set take off the penalty to see your exam-style score.',
    ],
    facts: {
      title: 'UP Police Constable at a glance',
      source: 'From UPPRPB constable recruitment notices. Check uppbpb.gov.in for the current advertisement before you apply.',
      items: [
        { label: 'Conducted by', value: 'Uttar Pradesh Police Recruitment and Promotion Board' },
        { label: 'Written exam', value: '150 questions, 300 marks, 2 hours' },
        { label: 'Negative marking', value: '0.5 per wrong answer' },
        { label: 'Qualification', value: 'Class 12 pass' },
        { label: 'Age', value: '18 to 22 years (relaxation for reserved categories)' },
        { label: 'Apply at', value: 'uppbpb.gov.in' },
      ],
    },
    pattern: {
      summary: 'The written exam is a single objective paper with four parts. Every question carries two marks.',
      caption: 'UP Police Constable written exam',
      sections: [
        { part: 'Part A', subject: 'General Knowledge', questions: 38, marks: 76 },
        { part: 'Part B', subject: 'General Hindi', questions: 37, marks: 74 },
        { part: 'Part C', subject: 'Numerical and Mental Ability', questions: 38, marks: 76 },
        { part: 'Part D', subject: 'Mental Aptitude, IQ and Reasoning', questions: 37, marks: 74 },
      ],
      duration: '2 hours',
      marking: [
        { response: 'Correct answer', marks: '+2' },
        { response: 'Wrong answer', marks: '−0.5' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'The split between parts and the penalty are from recent notices and can change; check the current advertisement. ExamForge gives one minute for each question, so the 150-question sets allow 150 minutes, which is longer than the real 2 hours. Practise at a tighter pace to match.',
    },
    syllabus: {
      intro: 'Questions are set at Class 12 level. Each ExamForge mock test mixes all four parts.',
      areas: [
        {
          title: 'General Knowledge',
          summary: 'Static and current facts, with a lot on Uttar Pradesh.',
          topics: ['History, geography and culture of Uttar Pradesh', 'Indian polity, economy and the Constitution', 'General science and environment', 'Awards, sports, books and current affairs'],
        },
        {
          title: 'General Hindi',
          summary: 'A high-scoring part for well-read candidates.',
          topics: ['Grammar: sandhi, samas, upsarg and pratyay', 'Synonyms, antonyms, idioms and proverbs', 'Correct spelling and sentence correction', 'Hindi literature and writers'],
        },
        {
          title: 'Numerical and Mental Ability',
          summary: 'Arithmetic at Class 10 level.',
          topics: ['Percentage, ratio, average and profit and loss', 'Time and work, speed and distance', 'Simple and compound interest', 'Number system, simplification and mensuration'],
        },
        {
          title: 'Mental Aptitude, IQ and Reasoning',
          summary: 'Verbal and non-verbal reasoning.',
          topics: ['Analogy, classification and series', 'Coding-decoding, blood relations and directions', 'Venn diagrams and syllogism', 'Figure patterns and mirror images'],
        },
      ],
    },
    eligibility: {
      intro: 'Requirements are set in each UPPRPB notice. In general:',
      items: [
        { title: 'Education', detail: 'Class 12 pass from a recognised board.' },
        { title: 'Age', detail: '18 to 22 years on the cut-off date, with relaxation for SC, ST, OBC, women and other categories.' },
        { title: 'Domicile and fitness', detail: 'Candidates need to meet the physical standard, which differs for men and women and by category.' },
      ],
    },
    stages: {
      intro: 'Selection runs in this order.',
      items: [
        { title: 'Written exam', detail: 'The 150-question paper above, which decides merit.' },
        { title: 'Document verification and physical standard test', detail: 'Height and chest measurements for candidates shortlisted from the written exam.' },
        { title: 'Physical efficiency test', detail: 'A timed race, qualifying only.' },
        { title: 'Medical examination', detail: 'Candidates on the final list are checked before appointment.' },
      ],
    },
    tips: [
      { title: 'Make General Hindi a daily habit', detail: 'About a quarter of the paper is Hindi, and grammar rules are the same every year.' },
      { title: 'Practise 150 questions in one sitting', detail: 'Stamina matters. Take at least a few full sets in a single go before the exam.' },
      { title: 'Revise Uttar Pradesh facts', detail: 'Districts, rivers, places, schemes and leaders of the state appear in every paper.' },
      { title: 'Watch the penalty', detail: 'At −0.5 per wrong answer, four correct answers pay for each pair of mistakes.' },
    ],
    faq: [
      { question: 'How many questions does each set have?', answer: 'Between 132 and 150, with one minute for each question. The first set has 150 questions.' },
      { question: 'Does the exam have negative marking?', answer: 'Yes, 0.5 marks for each wrong answer in recent notices. ExamForge does not deduct marks, so subtract the penalty yourself.' },
      { question: 'Can I practise in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'ssc-cpo': {
    heading: 'About the SSC CPO exam',
    intro: [
      'SSC CPO is the Staff Selection Commission’s recruitment exam for Sub-Inspectors in Delhi Police and the Central Armed Police Forces (BSF, CRPF, CISF, ITBP and SSB), and for Assistant Sub-Inspectors in CISF. Selection runs through two written papers, a physical test and a medical examination.',
      'ExamForge gives you 49 free, timed practice sets for Paper 1: 10 full-length mock tests of 188 to 200 questions, plus subject sets in Reasoning, Aptitude, General Knowledge and English. Every question is in English and Hindi with an explanation after you submit. Your first three sets need no signup.',
      'Paper 1 deducts a quarter of a mark for each wrong answer. ExamForge sets do not, so to rehearse exam scoring, take 0.25 off for each wrong answer yourself.',
    ],
    facts: {
      title: 'SSC CPO at a glance',
      source: 'From published SSC CPO exam-pattern summaries, which differ on timing and one 2026 summary reports a changed Paper 1 format. Check ssc.gov.in for the current notice before you apply.',
      items: [
        { label: 'Conducted by', value: 'Staff Selection Commission' },
        { label: 'Posts', value: 'Sub-Inspector in Delhi Police and the CAPFs; Assistant Sub-Inspector in CISF' },
        { label: 'Paper 1', value: 'Online objective test, usually reported as 200 questions and 200 marks in 2 hours' },
        { label: 'Paper 2', value: 'English Language and Comprehension, taken after the physical test' },
        { label: 'Physical test', value: 'PET and PST, qualifying only' },
        { label: 'Apply at', value: 'ssc.gov.in' },
      ],
    },
    pattern: {
      summary: 'Paper 1 is an online objective test in four sections of 50 questions each. Every question carries one mark.',
      caption: 'SSC CPO Paper 1',
      sections: [
        { part: 'Section 1', subject: 'General Intelligence and Reasoning', questions: 50, marks: 50 },
        { part: 'Section 2', subject: 'General Knowledge and General Awareness', questions: 50, marks: 50 },
        { part: 'Section 3', subject: 'Quantitative Aptitude', questions: 50, marks: 50 },
        { part: 'Section 4', subject: 'English Comprehension', questions: 50, marks: 50 },
      ],
      duration: '2 hours',
      marking: [
        { response: 'Correct answer', marks: '+1' },
        { response: 'Wrong answer', marks: '−0.25' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'Summaries differ on sectional timing, and one 2026 summary describes a 100-question version of Paper 1, so confirm the format in the notice you apply under. Paper 2 (English Language and Comprehension) is not covered by a separate ExamForge subject.',
    },
    syllabus: {
      intro: 'Each ExamForge subject matches one Paper 1 section. The full mock tests put all four together in the order of the real paper.',
      areas: [
        {
          title: 'General Intelligence and Reasoning', subjects: ['reasoning'],
          summary: 'Verbal and non-verbal reasoning, 50 questions.',
          topics: ['Analogy, classification and series', 'Coding-decoding and mathematical operations', 'Blood relations, directions and ranking', 'Syllogism and Venn diagrams', 'Non-verbal reasoning: mirror images, paper folding and embedded figures'],
        },
        {
          title: 'Quantitative Aptitude', subjects: ['aptitude'],
          summary: 'Arithmetic and basic geometry, 50 questions.',
          topics: ['Percentage, ratio, average, profit and loss', 'Time and work, speed, time and distance', 'Simple and compound interest', 'Algebra, geometry and mensuration', 'Trigonometry basics and data interpretation'],
        },
        {
          title: 'General Knowledge and General Awareness', subjects: ['general-knowledge'],
          summary: 'Static and current awareness, 50 questions.',
          topics: ['Current affairs, sports, books and awards', 'Indian history, geography and polity', 'General science and everyday facts', 'Economy and important organisations'],
        },
        {
          title: 'English Comprehension', subjects: ['english'],
          summary: 'Grammar, vocabulary and comprehension, 50 questions.',
          topics: ['Error spotting and sentence improvement', 'Fill in the blanks and cloze passages', 'Synonyms, antonyms and one-word substitution', 'Idioms and phrases, active and passive voice', 'Reading comprehension'],
        },
      ],
    },
    eligibility: {
      intro: 'The main conditions, in short. Each notice sets the posts, exact cut-off dates, relaxations and physical standards.',
      items: [
        { title: 'Qualification', detail: 'A bachelor’s degree from a recognised university.' },
        { title: 'Age and physical standards', detail: 'Age limits, height, chest and running standards differ by force and post and by male and female candidates. Check the current notice rather than relying on a summary.' },
      ],
    },
    stages: {
      intro: 'Each stage has to be cleared before the next.',
      items: [
        { title: 'Paper 1', detail: 'The computer-based paper above. Candidates are shortlisted for the physical tests in order of merit.' },
        { title: 'Physical Endurance Test and Physical Standard Test', detail: 'PET and PST are qualifying: they carry no marks, but failing them ends your candidature whatever your written score.' },
        { title: 'Paper 2', detail: 'A computer-based English Language and Comprehension paper for those who clear the physical tests.' },
        { title: 'Medical examination and document verification', detail: 'A detailed medical examination and a check of your original certificates before appointment.' },
      ],
    },
    merit: [
      { title: 'Written marks decide rank', detail: 'The final merit list is drawn up on Paper 1 and Paper 2 marks only. The physical tests and medical examination are qualifying.' },
      { title: 'No interview', detail: 'There is no interview stage in SSC CPO.' },
    ],
    tips: [
      { title: 'Treat negative marking as a tax', detail: 'A wrong answer costs a quarter of a correct one. Answer when you can rule out at least two options; leave the rest.' },
      { title: 'Practise the full paper', detail: 'The full mock tests are the length of the real Paper 1, so use them to build the stamina to stay accurate through 200 questions.' },
      { title: 'Use subject sets to fix weak sections', detail: 'After each full mock, find the section where you lost the most marks and drill it with a subject set.' },
      { title: 'Start preparing for physical tests early', detail: 'PET and PST are qualifying, but they come before Paper 2. Do not leave fitness until the written result.' },
    ],
    faq: [
      { question: 'Does ExamForge cover Paper 2?', answer: 'Not as a separate subject. The English sets practise the English section of Paper 1, which overlaps with Paper 2’s skills, but the practice sets are modelled on Paper 1.' },
      { question: 'Is there negative marking in ExamForge sets?', answer: 'No. The real Paper 1 deducts 0.25 mark per wrong answer, so apply that to your score yourself to see how you would have done.' },
      { question: 'How long are the full mock tests?', answer: 'The 10 full mock tests have between 188 and 200 questions, matching the length of Paper 1 as it is usually reported.' },
      { question: 'Are the questions available in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'rrb-ntpc-cbt-2': {
    heading: 'About the RRB NTPC CBT-2 exam',
    intro: [
      'CBT-2 is the second computer-based test in graduate-level RRB NTPC recruitment, for posts such as Station Master, Goods Train Manager and Commercial cum Ticket Clerk in Indian Railways. Candidates who clear CBT-1 are shortlisted for it, and its marks decide the merit list.',
      'ExamForge gives you 14 free, timed practice sets for CBT-2’s three sections: five in Mathematics, five in Reasoning and four in General Awareness. Every question is in English and Hindi, and almost every one comes with an explanation after you submit. Your first three sets need no signup.',
      'CBT-2 deducts one-third of a mark for each wrong answer. ExamForge does not, so to rehearse exam scoring, take a third of a mark off for each wrong answer yourself.',
    ],
    facts: {
      title: 'RRB NTPC CBT-2 at a glance',
      source: 'From published RRB NTPC exam-pattern summaries. Check rrbapply.gov.in and your RRB’s website for the current notice before you apply.',
      items: [
        { label: 'Conducted by', value: 'Railway Recruitment Boards' },
        { label: 'Stage', value: 'Second computer-based test for graduate-level posts' },
        { label: 'CBT-2', value: '120 questions, 120 marks, 90 minutes' },
        { label: 'Level', value: 'Same subjects as CBT-1, set at a higher level' },
        { label: 'Extra test', value: 'Typing skill test or Computer Based Aptitude Test for some posts' },
        { label: 'Apply at', value: 'rrbapply.gov.in' },
      ],
    },
    pattern: {
      summary: 'CBT-2 is a single objective paper with three sections. Every question carries one mark, and wrong answers cost a third of a mark.',
      caption: 'RRB NTPC CBT-2',
      sections: [
        { part: 'Section 1', subject: 'Mathematics', questions: 35, marks: 35 },
        { part: 'Section 2', subject: 'General Intelligence and Reasoning', questions: 35, marks: 35 },
        { part: 'Section 3', subject: 'General Awareness', questions: 50, marks: 50 },
      ],
      duration: '90 minutes',
      marking: [
        { response: 'Correct answer', marks: '+1' },
        { response: 'Wrong answer', marks: '−1/3' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'CBT-2 covers the same subjects as CBT-1 at a higher level of difficulty. Some posts add a typing skill test or a Computer Based Aptitude Test. Summaries differ on which posts need which, so check your notice.',
    },
    syllabus: {
      intro: 'Each ExamForge subject matches one CBT-2 section. General Awareness is the largest section, with 50 questions.',
      areas: [
        {
          title: 'Mathematics', subjects: ['mathematics'],
          summary: 'Arithmetic and more advanced topics than CBT-1, 35 questions.',
          topics: ['Number system, HCF and LCM, simplification', 'Percentage, ratio, profit and loss, averages', 'Time and work, speed, time and distance', 'Simple and compound interest', 'Algebra, geometry, trigonometry and mensuration', 'Data interpretation and statistics'],
        },
        {
          title: 'General Intelligence and Reasoning', subjects: ['reasoning'],
          summary: '35 questions, from simple series to multi-step puzzles.',
          topics: ['Analogy, classification and series', 'Coding-decoding and mathematical operations', 'Blood relations, directions and ranking', 'Syllogism, Venn diagrams and statement-conclusion', 'Seating arrangement and puzzles', 'Non-verbal reasoning'],
        },
        {
          title: 'General Awareness', subjects: ['general-awareness'],
          summary: 'The largest section, so it often decides the cut-off.',
          topics: ['Current affairs, sports, books and awards', 'Indian history and the national movement', 'Geography of India and the world', 'Indian polity and the Constitution', 'General science and everyday facts', 'Economics, computers and the railways'],
        },
      ],
    },
    stages: {
      intro: 'The stages depend on the post. Each has to be cleared before the next.',
      items: [
        { title: 'CBT-1', detail: 'The screening paper that every candidate takes. Candidates are shortlisted for CBT-2 in order of merit.' },
        { title: 'CBT-2', detail: 'The paper above, which decides merit for graduate-level posts.' },
        { title: 'Skill or aptitude test', detail: 'Some posts need a typing skill test or a Computer Based Aptitude Test. These are qualifying for most posts.' },
        { title: 'Document verification and medical', detail: 'Original certificates are checked and a medical examination confirms you meet the standard of the post you are offered.' },
      ],
    },
    merit: [
      { title: 'CBT-2 decides rank', detail: 'The graduate-level merit list is drawn up on CBT-2 marks. CBT-1 only has to be qualified.' },
      { title: 'Choice of post', detail: 'Posts are allotted by merit, the preferences you give and the medical standard you meet.' },
    ],
    tips: [
      { title: 'Expect harder questions', detail: 'CBT-2 repeats the subjects of CBT-1 at a higher level, so time yourself on the Mathematics sets to keep up with 35 questions.' },
      { title: 'Win General Awareness', detail: 'It has 50 of the 120 questions. Revise current affairs a little every day rather than before the exam.' },
      { title: 'Answer with care', detail: 'A wrong answer costs a third of a correct one. Answer when you can rule out at least two options; otherwise leave it.' },
      { title: 'Review explanations', detail: 'After each set, read the explanation for every question you got wrong or guessed.' },
    ],
    faq: [
      { question: 'What is the difference between CBT-1 and CBT-2?', answer: 'CBT-1 is a 100-question screening test. CBT-2 has 120 questions at a higher level and its marks decide merit for graduate-level posts.' },
      { question: 'Does ExamForge deduct marks for wrong answers?', answer: 'No. The real CBT-2 deducts a third of a mark per wrong answer, so apply that yourself to your score.' },
      { question: 'Are the questions available in Hindi?', answer: 'Yes. Every question and option has a Hindi version, and nearly every explanation does too. You can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'rpf-si': {
    heading: 'About the RPF SI exam',
    intro: [
      'RPF SI is the Railway Recruitment Boards’ exam for Sub-Inspectors in the Railway Protection Force, the force that guards railway property, passengers and the railway network. The written paper is set at graduation level, and selection continues with physical tests and document verification.',
      'ExamForge gives you 39 free, timed practice sets: 10 full-length mock tests of 97 to 120 questions, plus subject sets in General Awareness, Arithmetic and Reasoning. Every question is in English and Hindi with an explanation after you submit. Your first three sets need no signup.',
      'The real paper deducts one-third of a mark for each wrong answer. ExamForge sets do not, so to rehearse exam scoring, take a third of a mark off for each wrong answer yourself.',
    ],
    facts: {
      title: 'RPF SI at a glance',
      source: 'From published RPF SI exam-pattern summaries. Check rrbapply.gov.in and your RRB’s website for the current notice before you apply.',
      items: [
        { label: 'Conducted by', value: 'Railway Recruitment Boards' },
        { label: 'Written exam', value: 'Computer-based test, 120 questions, 120 marks, 90 minutes' },
        { label: 'Level', value: 'Graduation' },
        { label: 'Qualifying marks', value: 'Reported as 35% for UR and OBC and 30% for SC and ST' },
        { label: 'Physical tests', value: 'PET and PMT, qualifying only' },
        { label: 'Interview', value: 'None' },
      ],
    },
    pattern: {
      summary: 'The written exam is a single computer-based paper with three sections. Every question carries one mark, and wrong answers cost a third of a mark.',
      caption: 'RPF SI computer-based test',
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
      note: 'The qualifying percentage is reported to differ by category, so check the notice for the current figures. Candidates in the written paper are shortlisted for the physical tests in a multiple of the vacancies.',
    },
    syllabus: {
      intro: 'Each ExamForge subject matches one section of the paper. General Awareness is the largest, with 50 questions.',
      areas: [
        {
          title: 'General Awareness', subjects: ['general-awareness'],
          summary: 'The largest section, so it often decides the cut-off.',
          topics: ['Current affairs, sports, books and awards', 'Indian history and the national movement', 'Geography of India and the world', 'Indian polity and the Constitution', 'General science and everyday facts', 'Economy, computers and the railways'],
        },
        {
          title: 'Arithmetic', subjects: ['arithmetic'],
          summary: 'Number work and word problems, 35 questions.',
          topics: ['Number system, HCF and LCM, simplification', 'Percentage, ratio, average, profit and loss', 'Time and work, speed, time and distance', 'Simple and compound interest', 'Mensuration and data interpretation'],
        },
        {
          title: 'General Intelligence and Reasoning', subjects: ['reasoning'],
          summary: '35 questions, mostly quick to solve once you know the method.',
          topics: ['Analogy, classification and series', 'Coding-decoding and mathematical operations', 'Blood relations, directions and ranking', 'Syllogism and Venn diagrams', 'Seating arrangement, calendar and clock'],
        },
      ],
    },
    stages: {
      intro: 'Each stage has to be cleared before the next.',
      items: [
        { title: 'Computer-based test', detail: 'The 120-question paper above. Candidates who clear the qualifying marks are shortlisted for the physical tests.' },
        { title: 'Physical Endurance Test and Physical Measurement Test', detail: 'PET and PMT are qualifying and carry no marks. Standards such as height and running time differ by gender and category, so check the notice.' },
        { title: 'Document verification', detail: 'Your original certificates are checked against your application before the final list is released.' },
      ],
    },
    merit: [
      { title: 'Written marks decide rank', detail: 'Final selection is made on the marks of the computer-based test; the physical tests are qualifying.' },
      { title: 'No interview', detail: 'There is no interview stage in RPF SI.' },
    ],
    tips: [
      { title: 'Answer with care', detail: 'A wrong answer costs a third of a correct one. Answer when you can rule out at least two options; otherwise leave it.' },
      { title: 'Prepare General Awareness every day', detail: 'It has 50 of 120 questions. A little reading daily beats a rush before the exam.' },
      { title: 'Use the full mocks for timing', detail: 'The full mock tests are the length of the real paper. Practise finishing 120 questions in 90 minutes.' },
      { title: 'Plan fitness alongside study', detail: 'PET and PMT are qualifying, so start training for them early.' },
    ],
    faq: [
      { question: 'Is there negative marking in ExamForge sets?', answer: 'No. The real paper deducts a third of a mark per wrong answer, so apply that yourself to your score.' },
      { question: 'How long are the full mock tests?', answer: 'The 10 full mock tests have between 97 and 120 questions, close to the length of the real paper.' },
      { question: 'Are the questions available in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'rrb-alp': {
    heading: 'About the RRB ALP exam',
    intro: [
      'ALP stands for Assistant Loco Pilot, the post that assists the driver of a locomotive in Indian Railways. The Railway Recruitment Boards fill it through computer-based tests, CBT-1 and CBT-2, followed by a Computer Based Aptitude Test (CBAT), document verification and a medical examination.',
      'ExamForge gives you 38 free, timed practice sets for CBT-1: nine full-length mock tests of 50 to 75 questions, plus subject sets in Mathematics, Reasoning and General Science. Every question is in English and Hindi with an explanation after you submit. Your first three sets need no signup.',
      'CBT-1 deducts one-third of a mark for each wrong answer. ExamForge does not, so to rehearse exam scoring, take a third of a mark off for each wrong answer yourself.',
    ],
    facts: {
      title: 'RRB ALP CBT-1 at a glance',
      source: 'From published RRB ALP exam-pattern summaries, which differ on the subject split of CBT-1. Check rrbapply.gov.in and your RRB’s website for the current notice before you apply.',
      items: [
        { label: 'Conducted by', value: 'Railway Recruitment Boards' },
        { label: 'CBT-1', value: '75 questions, 75 marks, 60 minutes (screening)' },
        { label: 'CBT-2', value: 'Second computer-based test, not covered by ExamForge' },
        { label: 'Aptitude test', value: 'CBAT for ALP candidates who clear CBT-2' },
        { label: 'Apply at', value: 'rrbapply.gov.in' },
      ],
    },
    pattern: {
      summary: 'CBT-1 is a single objective paper that screens candidates for CBT-2. Every question carries one mark, and wrong answers cost a third of a mark.',
      caption: 'RRB ALP CBT-1',
      sections: [
        { part: 'Section 1', subject: 'Mathematics', questions: 20, marks: 20 },
        { part: 'Section 2', subject: 'General Intelligence and Reasoning', questions: 25, marks: 25 },
        { part: 'Section 3', subject: 'General Science', questions: 20, marks: 20 },
        { part: 'Section 4', subject: 'General Awareness and Current Affairs', questions: 10, marks: 10 },
      ],
      duration: '60 minutes',
      marking: [
        { response: 'Correct answer', marks: '+1' },
        { response: 'Wrong answer', marks: '−1/3' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'A 2026 guide reports that General Awareness has been dropped from CBT-1, while older guides show the four sections above, so confirm the split in your notice. ExamForge has no General Awareness subject for ALP. CBT-1 only screens: marks are normalised across shifts and are not counted in the final panel.',
    },
    syllabus: {
      intro: 'Each ExamForge subject matches one CBT-1 section. Reasoning has the most questions, so it carries the most weight.',
      areas: [
        {
          title: 'Mathematics', subjects: ['mathematics'],
          summary: 'Arithmetic and basic algebra, about 20 questions.',
          topics: ['Number system, HCF and LCM, simplification', 'Percentage, ratio, profit and loss, averages', 'Time and work, speed, time and distance', 'Simple and compound interest', 'Algebra, geometry, trigonometry and mensuration'],
        },
        {
          title: 'General Intelligence and Reasoning', subjects: ['reasoning'],
          summary: 'The largest section, about 25 questions.',
          topics: ['Analogy, classification and series', 'Coding-decoding and mathematical operations', 'Blood relations, directions and ranking', 'Syllogism and Venn diagrams', 'Seating arrangement, calendar and clock', 'Non-verbal reasoning'],
        },
        {
          title: 'General Science', subjects: ['general-science'],
          summary: 'School-level science, about 20 questions.',
          topics: ['Physics: motion, force, work and energy, heat, light, sound and electricity', 'Chemistry: matter, acids and bases, metals and non-metals, carbon compounds', 'Biology: cells, human body, nutrition, diseases and plants', 'Everyday science and technology'],
        },
      ],
    },
    stages: {
      intro: 'Each stage has to be cleared before the next.',
      items: [
        { title: 'CBT-1', detail: 'The 75-question screening paper above. Candidates are shortlisted for CBT-2 on normalised marks.' },
        { title: 'CBT-2', detail: 'A second computer-based test that decides merit. It is not covered by ExamForge.' },
        { title: 'Computer Based Aptitude Test (CBAT)', detail: 'For ALP candidates. It tests aptitude for driving duties, has no negative marking, and is reported to need a minimum T-score of 42 in each test battery.' },
        { title: 'Document verification and medical', detail: 'Original certificates are checked and a medical examination, including vision standards for the post, is carried out.' },
      ],
    },
    tips: [
      { title: 'Win Reasoning and Science', detail: 'Together they are the bulk of CBT-1. Both reward practice more than memorisation.' },
      { title: 'Answer with care', detail: 'A wrong answer costs a third of a correct one. Answer when you can rule out at least two options; otherwise leave it.' },
      { title: 'Practise to the clock', detail: 'CBT-1 gives under a minute per question. Use the full mocks to practise finishing 75 questions in 60 minutes.' },
      { title: 'Review explanations', detail: 'After each set, read the explanation for every question you got wrong or guessed.' },
    ],
    faq: [
      { question: 'Why are some sets shorter than others?', answer: 'The sets are kept as they came in the question bank, so their lengths vary. Some General Science sets have fewer than 20 questions; the full mock tests are the best guide to the length of the real paper.' },
      { question: 'Is there negative marking in ExamForge sets?', answer: 'No. The real CBT-1 deducts a third of a mark per wrong answer, so apply that yourself to your score.' },
      { question: 'Are the questions available in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'bseb-10th': {
    heading: 'About the Bihar Board Class 10 exam',
    intro: [
      'The Bihar School Examination Board (BSEB) holds the Class 10 matriculation exam every year, usually in February. The paper for each subject mixes objective questions, where you mark the right option, with written short-answer and long-answer questions.',
      'ExamForge gives you 135 free practice sets for the objective part: 31 in Science, 48 in Social Science, 13 in Sanskrit, 22 in English, 12 in Mathematics and 9 mixed Subject Wise sets of 50 questions. Every question is in English and Hindi, and most come with an explanation after you submit. Your first three sets need no signup.',
      'These sets practise multiple-choice answering. They do not replace writing out answers for the subjective part, so use them alongside your textbook and past papers.',
    ],
    facts: {
      title: 'BSEB Class 10 at a glance',
      source: 'From published Bihar Board exam-pattern summaries, which differ on passing marks and the practical split. Check biharboardonline.com for the current notice and your subject’s marking scheme.',
      items: [
        { label: 'Conducted by', value: 'Bihar School Examination Board, Patna' },
        { label: 'Exam', value: 'Class 10 (matriculation) annual board exam' },
        { label: 'Objective part', value: 'Reported as 100 multiple-choice questions, of which you answer 50, at one mark each' },
        { label: 'Subjective part', value: 'Short-answer and long-answer questions, roughly the other half of the marks' },
        { label: 'Subjects on ExamForge', value: 'Science, Social Science, Mathematics, English and Sanskrit' },
      ],
    },
    syllabus: {
      intro: 'Questions follow the Class 10 Bihar Board textbooks. ExamForge’s practice subjects match the papers below.',
      areas: [
        {
          title: 'Science', subjects: ['science'],
          summary: 'Physics, chemistry and biology.',
          topics: ['Chemical reactions, acids, bases and salts', 'Metals, non-metals and carbon compounds', 'Life processes, control and coordination, heredity', 'Light, electricity and magnetic effects of current', 'Sources of energy and the environment'],
        },
        {
          title: 'Social Science', subjects: ['social-science'],
          summary: 'History, geography, political science and economics.',
          topics: ['History: nationalism, the making of modern India and industrialisation', 'Geography: resources, agriculture, minerals and industries', 'Political science: power sharing, federalism and democracy', 'Economics: development, sectors of the economy, money and credit'],
        },
        {
          title: 'Mathematics', subjects: ['math'],
          summary: 'The Class 10 mathematics course.',
          topics: ['Real numbers, polynomials and linear equations', 'Quadratic equations and arithmetic progressions', 'Triangles, circles and coordinate geometry', 'Trigonometry and its applications', 'Surface areas and volumes, statistics and probability'],
        },
        {
          title: 'English', subjects: ['english'],
          summary: 'Textbook, grammar and usage.',
          topics: ['Prose and poetry from the textbook', 'Reading comprehension', 'Grammar: tenses, voice, narration and prepositions', 'Vocabulary, synonyms and antonyms'],
        },
        {
          title: 'Sanskrit', subjects: ['sanskrit'],
          summary: 'Language and textbook practice.',
          topics: ['Textbook passages and meanings', 'Vocabulary and grammar', 'Translation between Sanskrit and Hindi or English'],
        },
        {
          title: 'Mixed practice', subjects: ['subject-wise'],
          summary: 'Sets of 50 questions across subjects.',
          topics: ['Questions drawn from the subjects above', 'Useful for revision close to the exam'],
        },
      ],
    },
    tips: [
      { title: 'Read the textbook first', detail: 'Board questions follow the textbook closely. Use the sets to test what you have read, and go back to the chapter for anything you miss.' },
      { title: 'Learn from explanations', detail: 'Read the explanation after every set, including for answers you got right by guessing.' },
      { title: 'Practise writing too', detail: 'Roughly half of each paper is written answers. Keep solving previous papers on paper alongside these sets.' },
      { title: 'Revise with mixed sets', detail: 'In the last weeks, switch from single-subject sets to the Subject Wise sets to practise changing topics quickly.' },
    ],
    faq: [
      { question: 'Do these sets cover the written part of the exam?', answer: 'No. They practise multiple-choice questions only. The written short-answer and long-answer questions need practice on paper.' },
      { question: 'Are the questions available in Hindi?', answer: 'Yes. Every question and option has a Hindi version, and most explanations do too. You can switch language during the test.' },
      { question: 'Do wrong answers lose marks in ExamForge?', answer: 'No. Practice sets do not deduct marks, so you can attempt every question and learn from the explanation.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'bpsc-tre-4.0/math-high-school': {
    heading: 'About the BPSC TRE 4.0 Mathematics (High School) exam',
    intro: [
      'The Bihar Public Service Commission Teacher Recruitment Exam (BPSC TRE) is one of the largest teacher hiring drives in India. TRE 4.0 includes posts for Mathematics teachers in high schools (Classes 9–10), where a strong command of the school mathematics course decides your score.',
      'ExamForge gives you 43 free, timed practice sets for the Mathematics paper: 9 full-length mock tests, and 34 chapter sets of 20 questions each across seven areas, from number system and algebra to mensuration, statistics and probability. Every question is in English and Hindi, and each one comes with an explanation after you submit. Your first three sets need no signup.',
      'TRE 4.0 deducts one-third of a mark for each wrong answer. ExamForge sets do not, so to rehearse TRE 4.0 scoring, take one-third of a mark off for each wrong answer yourself.',
    ],
    facts: {
      title: 'TRE 4.0 Mathematics at a glance',
      source: 'Check the current BPSC TRE 4.0 advertisement and corrigenda at bpsc.bihar.gov.in for the number of posts, dates, eligibility and the paper structure for Classes 9–10. ExamForge has not reproduced figures it could not confirm.',
      items: [
        { label: 'Conducted by', value: 'Bihar Public Service Commission' },
        { label: 'Post', value: 'Mathematics teacher, high school (Classes 9–10)' },
        { label: 'Written exam', value: 'Objective computer-based paper; check the notice for its structure' },
        { label: 'Apply at', value: 'bpsconline.bihar.gov.in' },
      ],
    },
    syllabus: {
      intro: 'Subject questions follow the school curriculum for the classes you would teach. ExamForge’s seven chapter subjects are grouped below, and the full mock tests mix all of them.',
      areas: [
        {
          title: 'Number system and algebra', subjects: ['number-system', 'algebra'],
          summary: 'The foundation of the course.',
          topics: ['Real numbers, rational and irrational numbers', 'HCF, LCM and divisibility', 'Polynomials and factorisation', 'Linear equations and quadratic equations', 'Arithmetic progressions'],
        },
        {
          title: 'Geometry and coordinate geometry', subjects: ['geometry', 'coordinate-geometry'],
          summary: 'Shapes, proofs and the Cartesian plane.',
          topics: ['Lines, angles and triangles', 'Congruence and similarity', 'Circles and tangents', 'Distance, section and midpoint formulas', 'Area of a triangle in the plane'],
        },
        {
          title: 'Trigonometry and mensuration', subjects: ['trigonometry', 'mensuration'],
          summary: 'Ratios, heights and measurement.',
          topics: ['Trigonometric ratios and identities', 'Heights and distances', 'Areas of plane figures', 'Surface areas and volumes of solids', 'Combinations of solids'],
        },
        {
          title: 'Statistics and probability', subjects: ['statistics-probability'],
          summary: 'Data and chance.',
          topics: ['Mean, median and mode of grouped data', 'Cumulative frequency and ogives', 'Classical probability'],
        },
      ],
    },
    tips: [
      { title: 'Work every chapter set', detail: 'Chapter sets of 20 questions are short enough to finish in one sitting. Work through all seven areas before moving on to full mocks.' },
      { title: 'Answer with care', detail: 'A wrong answer costs a third of a correct one. Answer when you can rule out at least two options; otherwise leave it.' },
      { title: 'Use full mocks for timing', detail: 'The full mock tests mix every area. Use them to practise pace and to find the areas where you drop marks.' },
      { title: 'Review explanations', detail: 'After each set, read the worked explanation for every question you got wrong or guessed.' },
    ],
    faq: [
      { question: 'Do the sets follow the Bihar teacher recruitment syllabus?', answer: 'They cover the school mathematics course for Classes 9–10, which is the subject core of the paper. Check the current BPSC notice for the official syllabus and paper structure.' },
      { question: 'Is there negative marking in ExamForge sets?', answer: 'No. TRE 4.0 deducts a third of a mark per wrong answer, so apply that yourself to your score.' },
      { question: 'Are the questions available in Hindi?', answer: 'Yes. Every question, option and explanation has a Hindi version, and you can switch language during the test.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'ssc-cgl': {
    heading: 'About the SSC CGL exam',
    intro: [
      'SSC CGL (Combined Graduate Level) is the Staff Selection Commission’s exam for graduate-level posts in central ministries, departments and offices. Tier 1 is the computer-based screening paper: you have to clear its cut-off to reach Tier 2.',
      'ExamForge gives you free, timed full-length mock tests in the Tier 1 format: 100 questions in four sections of 25 (Reasoning, General Awareness, Quantitative Aptitude and English). Each question is explained after you submit. Your first three sets need no signup.',
      'The question banks are in English only. Several of the later mock tests reuse questions from the earlier ones, with some numbers changed, so use them for repeated timing practice rather than as new material each time. Sets give you one minute per question, which is more time than the real 60 minutes, and they do not deduct marks for wrong answers.',
    ],
    facts: {
      title: 'SSC CGL Tier 1 at a glance',
      source: 'From published SSC CGL exam-pattern summaries. Check ssc.gov.in for the notice of the cycle you apply under.',
      items: [
        { label: 'Conducted by', value: 'Staff Selection Commission' },
        { label: 'Tier 1', value: 'Computer-based, 100 questions, 200 marks' },
        { label: 'Duration', value: '60 minutes' },
        { label: 'Negative marking', value: '0.50 mark per wrong answer' },
        { label: 'Tier 1 role', value: 'Qualifying; marks are not added to the final merit' },
        { label: 'Apply at', value: 'ssc.gov.in' },
      ],
    },
    pattern: {
      summary: 'Tier 1 is a single computer-based paper with four sections of 25 questions each. Every question carries 2 marks.',
      caption: 'SSC CGL Tier 1',
      sections: [
        { part: 'Section 1', subject: 'General Intelligence and Reasoning', questions: 25, marks: 50 },
        { part: 'Section 2', subject: 'General Awareness', questions: 25, marks: 50 },
        { part: 'Section 3', subject: 'Quantitative Aptitude', questions: 25, marks: 50 },
        { part: 'Section 4', subject: 'English Comprehension', questions: 25, marks: 50 },
      ],
      duration: '60 minutes',
      marking: [
        { response: 'Correct answer', marks: '+2' },
        { response: 'Wrong answer', marks: '−0.50' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'There is no sectional time limit. ExamForge sets do not deduct marks, so to rehearse the real scoring, take 0.50 off for each wrong answer yourself. Tier 2 is not covered.',
    },
    syllabus: {
      intro: 'Each mock test puts the four Tier 1 sections together in the order of the real paper.',
      areas: [
        { title: 'General Intelligence and Reasoning', summary: 'The first 25 questions.', topics: ['Analogy, series and odd one out', 'Coding-decoding and mathematical operations', 'Blood relations, directions and ranking', 'Statement and conclusion'] },
        { title: 'General Awareness', summary: 'Static and current awareness, 25 questions.', topics: ['Indian history, geography and polity', 'Economy, schemes and government bodies', 'General science and environment'] },
        { title: 'Quantitative Aptitude', summary: 'Arithmetic and basic mathematics, 25 questions.', topics: ['Percentage, profit and loss, ratio and average', 'Time and work, pipes and cisterns, speed and distance', 'Simplification, algebra and geometry'] },
        { title: 'English Comprehension', summary: 'Grammar and vocabulary, 25 questions.', topics: ['Synonyms and antonyms', 'Error spotting and sentence improvement', 'Idioms, spellings and fill in the blanks'] },
      ],
    },
    eligibility: {
      intro: 'The main condition, in short. Each notice sets the posts, age limits and relaxations.',
      items: [
        { title: 'Qualification', detail: 'A bachelor’s degree from a recognised university for most posts; some posts ask for extra qualifications. Check the current notice.' },
      ],
    },
    tips: [
      { title: 'Practise against the clock', detail: 'The real paper gives you about 36 seconds a question. Time yourself to 60 minutes even though the set allows longer.' },
      { title: 'Treat negative marking as a tax', detail: 'A wrong answer costs a quarter of a correct one. Answer when you can rule out at least two options.' },
      { title: 'Review explanations', detail: 'After each set, read the explanation for every question you got wrong or guessed.' },
    ],
    faq: [
      { question: 'Is there negative marking in ExamForge sets?', answer: 'No. The real Tier 1 deducts 0.50 mark per wrong answer, so apply that to your score yourself.' },
      { question: 'Are the questions available in Hindi?', answer: 'No. This question bank is in English only.' },
      { question: 'Do the mock tests repeat questions?', answer: 'Yes. Mock tests 5 to 10 largely reuse questions from tests 1 to 4, so the bank holds about four tests’ worth of distinct material.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'ssc-je': {
    heading: 'About the SSC JE exam',
    intro: [
      'SSC JE is the Staff Selection Commission’s recruitment exam for Junior Engineers in Civil, Mechanical and Electrical Engineering. Paper 1 is a computer-based test of 200 questions: 50 General Intelligence and Reasoning, 50 General Awareness and 100 from your engineering branch.',
      'ExamForge covers only the first two of those parts. The ten mock tests here are 100 questions each of reasoning, number puzzles and general awareness, with an explanation after you submit. They contain no Civil, Mechanical or Electrical Engineering questions, so use them alongside a technical question bank, not instead of one.',
      'The question bank is in English only. Sets give you one minute per question and do not deduct marks for wrong answers.',
    ],
    facts: {
      title: 'SSC JE Paper 1 at a glance',
      source: 'From published SSC JE exam-pattern summaries, which vary between cycles. Check ssc.gov.in for the current notice.',
      items: [
        { label: 'Conducted by', value: 'Staff Selection Commission' },
        { label: 'Paper 1', value: 'Computer-based, 200 questions, 200 marks' },
        { label: 'Duration', value: '2 hours' },
        { label: 'Negative marking', value: '0.25 mark per wrong answer' },
        { label: 'Branches', value: 'Civil, Mechanical, Electrical' },
        { label: 'Apply at', value: 'ssc.gov.in' },
      ],
    },
    pattern: {
      summary: 'Paper 1 has three parts. ExamForge practises the first two; the engineering part is not covered.',
      caption: 'SSC JE Paper 1',
      sections: [
        { part: 'Part A', subject: 'General Intelligence and Reasoning', questions: 50, marks: 50 },
        { part: 'Part B', subject: 'General Awareness', questions: 50, marks: 50 },
        { part: 'Part C', subject: 'General Engineering (Civil and Structural, Electrical or Mechanical)', questions: 100, marks: 100 },
      ],
      duration: '2 hours',
      marking: [
        { response: 'Correct answer', marks: '+1' },
        { response: 'Wrong answer', marks: '−0.25' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'Paper 2, the descriptive-technical paper, is not covered. Confirm both papers’ formats in the notice you apply under.',
    },
    syllabus: {
      intro: 'What the ExamForge mock tests practise.',
      areas: [
        { title: 'General Intelligence and Reasoning', summary: 'Verbal and number reasoning.', topics: ['Day and calendar puzzles', 'Letter and alphabet position', 'Number analogies and series', 'Distance and direction'] },
        { title: 'General Awareness', summary: 'Static general knowledge.', topics: ['Indian history, polity and geography', 'Basic science', 'Economy and current basics'] },
      ],
    },
    tips: [
      { title: 'Add technical practice', detail: 'Half the real paper is engineering, which these tests do not include. Spend most of your time on your branch.' },
      { title: 'Review explanations', detail: 'After each set, read the explanation for every question you got wrong or guessed.' },
    ],
    faq: [
      { question: 'Do these tests include Civil, Mechanical or Electrical Engineering questions?', answer: 'No. They cover Reasoning and General Awareness only.' },
      { question: 'Are the questions available in Hindi?', answer: 'No. This question bank is in English only.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'ssc-selection-post': {
    heading: 'About the SSC Selection Post exam',
    intro: [
      'The SSC Selection Post exam fills posts at Matriculation, Higher Secondary (12th pass) and Graduate levels in central government offices. SSC runs separate computer-based tests by qualification level, with the same structure at each level and harder questions as the level rises.',
      'ExamForge gives you free, timed full-length mock tests: 100 questions in four sections (General Intelligence, General Awareness, Quantitative Aptitude and English), with an explanation after you submit. Your first three sets need no signup.',
      'The questions are at an introductory level, so use them to build speed and basics before moving on to harder papers. The bank is in English only. Sets give you one minute per question, more than the real 60 minutes, and do not deduct marks for wrong answers.',
    ],
    facts: {
      title: 'SSC Selection Post at a glance',
      source: 'From published SSC Selection Post exam-pattern summaries. Check ssc.gov.in for the current phase notice.',
      items: [
        { label: 'Conducted by', value: 'Staff Selection Commission' },
        { label: 'Levels', value: 'Matriculation, Higher Secondary, Graduate' },
        { label: 'Computer-based test', value: '100 questions, 200 marks' },
        { label: 'Duration', value: '60 minutes' },
        { label: 'Negative marking', value: '0.50 mark per wrong answer' },
        { label: 'Apply at', value: 'ssc.gov.in' },
      ],
    },
    pattern: {
      summary: 'The computer-based test has four sections of 25 questions each, worth 2 marks per question. A skill test applies only to posts that need one.',
      caption: 'SSC Selection Post computer-based test',
      sections: [
        { part: 'Section 1', subject: 'General Intelligence', questions: 25, marks: 50 },
        { part: 'Section 2', subject: 'General Awareness', questions: 25, marks: 50 },
        { part: 'Section 3', subject: 'Quantitative Aptitude', questions: 25, marks: 50 },
        { part: 'Section 4', subject: 'English Language', questions: 25, marks: 50 },
      ],
      duration: '60 minutes',
      marking: [
        { response: 'Correct answer', marks: '+2' },
        { response: 'Wrong answer', marks: '−0.50' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'ExamForge sets do not deduct marks, so take 0.50 off for each wrong answer yourself to rehearse the real scoring.',
    },
    syllabus: {
      intro: 'Each mock test puts the four sections together in the order of the real paper.',
      areas: [
        { title: 'General Intelligence', summary: 'The first 25 questions.', topics: ['Day, calendar and alphabet puzzles', 'Number analogies and series'] },
        { title: 'General Awareness', summary: 'Static and basic current awareness.', topics: ['Indian polity, geography and economy', 'General science'] },
        { title: 'Quantitative Aptitude', summary: 'Basic arithmetic.', topics: ['Percentage, area and speed', 'Profit and loss, ratio and time'] },
        { title: 'English Language', summary: 'Vocabulary and grammar.', topics: ['Spelling, synonyms and antonyms', 'One-word substitution and idioms'] },
      ],
    },
    tips: [
      { title: 'Practise against the clock', detail: 'Time yourself to 60 minutes for 100 questions even though the set allows longer.' },
      { title: 'Review explanations', detail: 'After each set, read the explanation for every question you got wrong or guessed.' },
    ],
    faq: [
      { question: 'Is there negative marking in ExamForge sets?', answer: 'No. The real exam deducts 0.50 mark per wrong answer, so apply that to your score yourself.' },
      { question: 'Are the questions available in Hindi?', answer: 'No. This question bank is in English only.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'ssc-stenographer': {
    heading: 'About the SSC Stenographer exam',
    intro: [
      'SSC Stenographer Grade C and D is the Staff Selection Commission’s exam for stenographers in central government offices. Selection has a computer-based written test followed by a stenography skill test.',
      'ExamForge gives you free, timed full-length mock tests for the written stage: 200 questions each, with 50 Reasoning, 50 General Awareness and 100 English, and an explanation after you submit. Your first three sets need no signup.',
      'The question bank is in English only. Sets give you one minute per question, which is more than the real 2 hours for 200 questions, and they do not deduct marks for wrong answers. The skill test is not covered.',
    ],
    facts: {
      title: 'SSC Stenographer at a glance',
      source: 'From published exam-pattern summaries; one reports a corrigendum on negative marking for the 2026 cycle. Check ssc.gov.in for the current notice.',
      items: [
        { label: 'Conducted by', value: 'Staff Selection Commission' },
        { label: 'Written test', value: 'Computer-based, 200 questions, 200 marks' },
        { label: 'Duration', value: '2 hours' },
        { label: 'Negative marking', value: '0.25 mark per wrong answer' },
        { label: 'Skill test', value: 'Dictation, 100 wpm for Grade C and 80 wpm for Grade D' },
        { label: 'Apply at', value: 'ssc.gov.in' },
      ],
    },
    pattern: {
      summary: 'The computer-based test has three parts, 200 questions in all, worth 1 mark each.',
      caption: 'SSC Stenographer Grade C and D computer-based test',
      sections: [
        { part: 'Part 1', subject: 'General Intelligence and Reasoning', questions: 50, marks: 50 },
        { part: 'Part 2', subject: 'General Awareness', questions: 50, marks: 50 },
        { part: 'Part 3', subject: 'English Language and Comprehension', questions: 100, marks: 100 },
      ],
      duration: '2 hours',
      marking: [
        { response: 'Correct answer', marks: '+1' },
        { response: 'Wrong answer', marks: '−0.25' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'Older summaries list only the Reasoning and General Awareness parts, so confirm the format in the current notice. ExamForge sets do not deduct marks; take 0.25 off for each wrong answer yourself.',
    },
    syllabus: {
      intro: 'Each mock test follows the order of the written test.',
      areas: [
        { title: 'General Intelligence and Reasoning', summary: 'The first 50 questions.', topics: ['Day and calendar puzzles', 'Number analogies and series', 'Alphabet position'] },
        { title: 'General Awareness', summary: 'Questions 51 to 100.', topics: ['Indian geography, polity and culture', 'General science and economy'] },
        { title: 'English Language and Comprehension', summary: 'The last 100 questions.', topics: ['Spelling, vocabulary and one-word substitution', 'Error spotting and grammar'] },
      ],
    },
    tips: [
      { title: 'Practise the full length', detail: 'Two hundred questions is a long sitting. Use the full mock tests to build stamina and time yourself to 2 hours.' },
      { title: 'Practise the skill test separately', detail: 'The dictation test decides your final selection, and ExamForge does not cover it.' },
    ],
    faq: [
      { question: 'Does ExamForge cover the stenography skill test?', answer: 'No. These are practice sets for the written test only.' },
      { question: 'Are the questions available in Hindi?', answer: 'No. This question bank is in English only.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
  'uppsc': {
    heading: 'About the UPPSC PCS prelims',
    intro: [
      'The Uttar Pradesh Public Service Commission (UPPSC) recruits Provincial Civil Services officers through a preliminary exam, the mains and an interview. The prelims has two objective papers: General Studies Paper I and Paper II (CSAT).',
      'ExamForge gives you free, timed practice in that shape: three General Studies sets of 150 questions and three CSAT sets of 100, with an explanation after you submit. Your first three sets need no signup.',
      'The questions are at an introductory level, well below the difficulty of the real prelims, and the CSAT sets are mostly English vocabulary, simple arithmetic and letter puzzles rather than comprehension passages. Use them to warm up, not as a measure of readiness. The bank is in English only, sets give you one minute per question and no marks are deducted for wrong answers.',
    ],
    facts: {
      title: 'UPPSC PCS prelims at a glance',
      source: 'From a published exam-pattern summary. The per-answer penalty is not stated here; check uppsc.up.nic.in for the current notice.',
      items: [
        { label: 'Conducted by', value: 'Uttar Pradesh Public Service Commission' },
        { label: 'Paper I', value: 'General Studies, 150 questions, 200 marks, 2 hours' },
        { label: 'Paper II', value: 'CSAT, 100 questions, 200 marks, 2 hours' },
        { label: 'Paper II role', value: 'Qualifying, at least 33%' },
        { label: 'Negative marking', value: 'Yes; confirm the rate in the notice' },
        { label: 'Apply at', value: 'uppsc.up.nic.in' },
      ],
    },
    pattern: {
      summary: 'Both papers are objective. Only Paper I counts towards the mains shortlist; Paper II has to be qualified.',
      caption: 'UPPSC PCS prelims',
      sections: [
        { part: 'Paper I', subject: 'General Studies', questions: 150, marks: 200 },
        { part: 'Paper II', subject: 'General Studies II (CSAT, qualifying)', questions: 100, marks: 200 },
      ],
      duration: '2 hours per paper',
      marking: [
        { response: 'Correct answer', marks: 'Full marks for the question' },
        { response: 'Wrong answer', marks: 'Negative marking applies' },
        { response: 'Not attempted', marks: '0' },
      ],
      note: 'Check the notice for the exact deduction. ExamForge sets deduct nothing, so apply the real rate to your score yourself. The mains and interview are not covered.',
    },
    syllabus: {
      intro: 'The first three sets are Paper I and the last three are Paper II.',
      areas: [
        { title: 'Paper I: General Studies', summary: 'Sets 1 to 3, 150 questions each.', topics: ['Indian history and polity', 'Geography, science and environment', 'Economy, sports and general knowledge'] },
        { title: 'Paper II: CSAT', summary: 'Sets 4 to 6, 100 questions each.', topics: ['English vocabulary and spelling', 'Basic arithmetic and percentages', 'Alphabet and sequence puzzles'] },
      ],
    },
    tips: [
      { title: 'Move on to harder material', detail: 'These sets are introductory. Pair them with past UPPSC papers for the real difficulty.' },
      { title: 'Review explanations', detail: 'After each set, read the explanation for every question you got wrong or guessed.' },
    ],
    faq: [
      { question: 'Are these questions as hard as the real prelims?', answer: 'No. They are introductory and well below the real exam’s difficulty.' },
      { question: 'Are the questions available in Hindi?', answer: 'No. This question bank is in English only.' },
      { question: 'Is ExamForge free?', answer: 'Yes. Your first three sets need no account; create a free account to keep practising and keep your history.' },
    ],
  },
};
