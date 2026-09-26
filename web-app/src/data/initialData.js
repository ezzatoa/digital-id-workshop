// initialData.js - Workshop master data, simulations state, and guides
// Institutional Training Program - Taibah University

export const PRESENTER_INFO = {
  name: 'د. عزت عمر عبدالله أبوعزه',
  title: 'أستاذ مساعد في قسم تقنية الأشعة',
  college: 'كلية العلوم الطبية التطبيقية - جامعة طيبة',
  university: 'جامعة طيبة - المدينة المنورة',
  year: '1448هـ / 2026م',
  workshopTitle: 'الهوية الرقمية الأكاديمية والحضور البحثي العالمي',
  workshopCode: '04',
  durationMinutes: 90
};

export const WORKSHOP_MODULES = [
  {
    id: 'intro',
    title: 'المدخل والتشخيص',
    duration: '15 دقيقة',
    timeRange: '00:00 - 00:15',
    desc: 'مفهوم الهوية الرقمية، أزمة تشابه الأسماء، واختبار النضج الرقمي الأولي.'
  },
  {
    id: 'platforms',
    title: 'المحاكيات الأربعة',
    duration: '30 دقيقة',
    timeRange: '00:15 - 00:45',
    desc: 'مختبرات محاكاة تفاعلية لمنصات ORCID و Scholar و ResearchGate و Scopus.'
  },
  {
    id: 'metrics',
    title: 'مؤشرات الأثر (h-index)',
    duration: '20 دقيقة',
    timeRange: '00:45 - 01:05',
    desc: 'حساب معامل هيرش، ومؤشر FWCI، والمختبر التفاعلي لاكتشاف الورقة الذهبية.'
  },
  {
    id: 'ai_studio',
    title: 'مختبر الذكاء الاصطناعي',
    duration: '20 دقيقة',
    timeRange: '01:05 - 01:25',
    desc: 'تطبيق أوامر موجهة مقيدة بملء الفراغات عبر Gemini Flash لتحسين الأثر.'
  },
  {
    id: 'action_plan',
    title: 'خطة العمل والتوصيات',
    duration: '05 دقائق',
    timeRange: '01:25 - 01:30',
    desc: 'إصدار خطة العمل الفردية المخصصة، مصفوفة التوصيات المبنية على النتائج، وقائمة مهام الـ 30 يوماً.'
  }
];

// 10 Targeted Diagnostic Maturity Questions
export const MATURITY_QUESTIONS = [
  {
    id: 1,
    category: 'ORCID',
    question: 'هل تمتلك معرف ORCID مسجلاً ومربوطاً بانتسابك الرسمي الحالي لجامعة طيبة (Taibah University)؟',
    tip: 'المعرف المكون من 16 رقماً هو شرط إلزامي للتقديم في معظم المجلات المصنفة.'
  },
  {
    id: 2,
    category: 'ORCID',
    question: 'هل قمت بضبط إعدادات الخصوصية في ORCID على وضع "الجميع" (Everyone) لكافة أبحاثك وجهة عملك؟',
    tip: 'الملفات المضبوطة على "Only Me" تظل مخفية تماماً عن خوارزميات التصنيف العالمية.'
  },
  {
    id: 3,
    category: 'Google Scholar',
    question: 'هل لديك حساب في Google Scholar تم التحقق منه بالبريد الجامعي الرسمي (@taibahu.edu.sa)؟',
    tip: 'ظهور عبارة "بريد تم التحقق منه في taibahu.edu.sa" يربط أبحاثك رسمياً بملف الجامعة.'
  },
  {
    id: 4,
    category: 'Google Scholar',
    question: 'هل قمت بجعل ملفك في Google Scholar "عاماً للجميع" (Public) وراجعت قائمة الأبحاث لاستبعاد أي أوراق مكررة أو لا تخصك؟',
    tip: 'الملفات غير العامة لا تظهر في نتائج البحث الأكاديمي ولا تُحتسب في مؤشرات الجامعة.'
  },
  {
    id: 5,
    category: 'Scopus',
    question: 'هل قمت بالبحث عن اسمك في Scopus للتأكد من عدم وجود ملفات مكررة أو منقسمة (Split Profiles) تشتت استشهاداتك؟',
    tip: 'انقسام الملف يحرم الباحث من نقاط حاسمة في معامل h-index الرسمي.'
  },
  {
    id: 6,
    category: 'Scopus & WoS',
    question: 'هل قمت بربط معرف Scopus ومعرف Web of Science بحسابك في ORCID للمزامنة الآلية؟',
    tip: 'الربط المباشر يتيح نقل الاستشهادات والأبحاث الجديدة تلقائياً بدون إدخال يدوي.'
  },
  {
    id: 7,
    category: 'ResearchGate',
    question: 'هل لديك ملف مفعل على ResearchGate ضمن قسمك الأكاديمي بجامعة طيبة وتتابع مؤشر اهتمام البحث (Research Interest)؟',
    tip: 'المنصة تضم أكثر من 25 مليون باحث وتعد أسرع قناة للتواصل العلمي المباشر.'
  },
  {
    id: 8,
    category: 'Open Access',
    question: 'هل تعرف الفرق القانوني بين نشر "نسخة المؤلف المقبولة" (AAM) و "نسخة الناشر النهائية" وفق سياسات Sherpa Romeo؟',
    tip: 'معرفة الفرق يحميك من مخالفات حقوق الملكية الفكرية وإخطارات الإزالة.'
  },
  {
    id: 9,
    category: 'Academic SEO',
    question: 'هل تراعي إدراج الكلمات المفتاحية الاستراتيجية في أول 60 حرفاً من عناوين أبحاثك وفي ملخصاتك لرفع قابليتها للاكتشاف؟',
    tip: 'العناوين المحسنة لمحركات البحث تنال استشهادات أعلى بنسبة تفوق 35%.'
  },
  {
    id: 10,
    category: 'Metrics & Altmetrics',
    question: 'هل تعرف ورقتك البحثية "الذهبية" التي يفصلها استشهاد واحد فقط عن رفع معامل h-index الخاص بك في الجامعة؟',
    tip: 'التركيز الترويجي على الورقة المفتاحية يوفر الجهد ويرفع معاملك أسرع.'
  }
];

// Realistic Google Scholar Author Case Studies (Low & High Citations / h-index)
export const SCHOLAR_AUTHOR_EXAMPLES = {
  high: {
    id: 'high',
    name: 'Prof. Tariq M. Al-Ghamdi',
    nameAr: 'أ.د. طارق بن محمد الغامدي',
    initials: 'TG',
    badgeText: 'مؤشرات عالية (High Impact)',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    title: 'Professor of Computer Science & Artificial Intelligence',
    titleAr: 'أستاذ الذكاء الاصطناعي وهندسة البيانات',
    department: 'College of Computer Science & Engineering, Taibah University',
    departmentAr: 'كلية علوم وهندسة الحاسب الآلي - جامعة طيبة',
    verifiedEmail: 'tghamdi@taibahu.edu.sa',
    interests: ['Artificial Intelligence', 'Health Informatics', 'Machine Learning', 'Data Science'],
    totalCitations: 3450,
    hIndex: 28,
    i10Index: 42,
    articles: [
      {
        id: 'h1_conf',
        title: 'Federated Learning for Privacy-Preserving Medical Imaging Systems (Conference Proceedings)',
        authors: 'TM Al-Ghamdi, H Zhao',
        venue: 'IEEE Healthcare Informatics Symposium, pp. 24-29',
        year: 2023,
        citations: 95,
        isDuplicateGroup: 'group_tg1'
      },
      {
        id: 'h1_journal',
        title: 'Federated Learning for Privacy-Preserving Medical Imaging Systems: Multicenter Clinical Deployment',
        authors: 'TM Al-Ghamdi, H Zhao, K Miller',
        venue: 'IEEE Transactions on Medical Imaging 43 (2), 410-425',
        year: 2024,
        citations: 260,
        isDuplicateGroup: 'group_tg1'
      },
      {
        id: 'h_intruder',
        title: 'High-Temperature Viscosity of Slag Systems in Steelmaking Converters',
        authors: 'T. Al-Ghamdi, B. Chen',
        venue: 'ISIJ International 62 (8), 1620-1628',
        year: 2022,
        citations: 78,
        isIntruder: true
      },
      {
        id: 'h2',
        title: 'Deep Convolutional Networks for Multimodal Clinical Data Fusion: A Comprehensive Survey',
        authors: 'TM Al-Ghamdi, A Smith, S Kumar',
        venue: 'Artificial Intelligence in Medicine 118, 102120',
        year: 2021,
        citations: 540,
        isIntruder: false
      },
      {
        id: 'h3',
        title: 'Explainable AI in Clinical Decision Support: Real-World Multi-Hospital Deployment and Physician Trust',
        authors: 'TM Al-Ghamdi, N Al-Otaibi',
        venue: 'Journal of Biomedical Informatics 122, 103890',
        year: 2022,
        citations: 185,
        isIntruder: false
      },
      {
        id: 'h4',
        title: 'Optimizing Neural Architecture Search for Edge Diagnostic Devices in Rural Health Centers',
        authors: 'TM Al-Ghamdi',
        venue: 'Sensors 23 (4), 1845',
        year: 2023,
        citations: 110,
        isIntruder: false
      },
      {
        id: 'h5',
        title: 'Benchmarking Foundation Large Language Models in Arabic Medical Dialogue Understanding',
        authors: 'TM Al-Ghamdi, M Hassan',
        venue: 'Computers in Biology and Medicine 160, 107001',
        year: 2024,
        citations: 88,
        isIntruder: false
      }
    ],
    calculatorPapers: [
      { id: 1, title: 'Deep Convolutional Networks for Multimodal Clinical Data Fusion: A Comprehensive Survey', citations: 540 },
      { id: 2, title: 'Federated Learning for Privacy-Preserving Medical Imaging Systems', citations: 355 },
      { id: 3, title: 'Explainable AI in Clinical Decision Support: Real-World Multi-Hospital Deployment', citations: 185 },
      { id: 4, title: 'Optimizing Neural Architecture Search for Edge Diagnostic Devices in Rural Health Centers', citations: 110 },
      { id: 5, title: 'Benchmarking Foundation Large Language Models in Arabic Medical Dialogue Understanding', citations: 88 },
      { id: 6, title: 'Privacy-Preserving Deep Learning in Cloud Healthcare Architectures', citations: 74 },
      { id: 7, title: 'Transfer Learning for Automated Diabetic Retinopathy Screening', citations: 65 },
      { id: 8, title: 'Federated Optimization in Heterogeneous Medical Sensor Networks', citations: 52 },
      { id: 9, title: 'Knowledge Graph Reasoning for Rare Disease Differential Diagnosis', citations: 44 },
      { id: 10, title: 'Robustness and Adversarial Attacks on Clinical Vision Transformers', citations: 27 }
    ]
  },
  low: {
    id: 'low',
    name: 'Dr. Fahad S. Al-Harbi',
    nameAr: 'د. فهد بن سلطان الحربي',
    initials: 'FH',
    badgeText: 'مرحلة التأسيس (Early Career)',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    title: 'Assistant Professor of Health Informatics',
    titleAr: 'أستاذ مساعد في نظم المعلومات الصحية',
    department: 'College of Applied Medical Sciences, Taibah University',
    departmentAr: 'كلية العلوم الطبية التطبيقية - جامعة طيبة',
    verifiedEmail: 'fharbi@taibahu.edu.sa',
    interests: ['Health Informatics', 'E-Health Protocols', 'Digital Health Transformation', 'Telemedicine'],
    totalCitations: 38,
    hIndex: 3,
    i10Index: 1,
    articles: [
      {
        id: 'l1_conf',
        title: 'Adoption Challenges of Cloud-Based Electronic Health Records (Symposium Paper)',
        authors: 'FS Al-Harbi',
        venue: 'Saudi Health Informatics Conference, pp. 12-16',
        year: 2024,
        citations: 5,
        isDuplicateGroup: 'group_fh1'
      },
      {
        id: 'l1_journal',
        title: 'Adoption Challenges of Cloud-Based Electronic Health Records in Regional Clinics: A Structural Equation Model',
        authors: 'FS Al-Harbi, O Nasser',
        venue: 'International Journal of Medical Informatics 182, 105310',
        year: 2025,
        citations: 16,
        isDuplicateGroup: 'group_fh1'
      },
      {
        id: 'l_intruder',
        title: 'Thermomechanical Properties of Concrete Aggregates Under High Compression',
        authors: 'F. Al-Harbi, D. Evans',
        venue: 'Construction and Building Materials 290, 123450',
        year: 2023,
        citations: 22,
        isIntruder: true
      },
      {
        id: 'l2',
        title: 'Evaluating Patient Engagement Portals in Primary Healthcare Centers',
        authors: 'FS Al-Harbi, A Al-Sharif',
        venue: 'BMC Health Services Research 24 (1), 89',
        year: 2024,
        citations: 11,
        isIntruder: false
      },
      {
        id: 'l3',
        title: 'Usability Evaluation Framework for Mobile Telemedicine Applications',
        authors: 'FS Al-Harbi',
        venue: 'Digital Health 10, 20552076241234567',
        year: 2024,
        citations: 4,
        isIntruder: false
      },
      {
        id: 'l4',
        title: 'Security and Consent Standards in Academic Medical Databases: A Review',
        authors: 'FS Al-Harbi',
        venue: 'Saudi Medical Informatics Review 3 (2), 45-52',
        year: 2025,
        citations: 2,
        isIntruder: false
      }
    ],
    calculatorPapers: [
      { id: 1, title: 'Adoption Challenges of Cloud-Based Electronic Health Records: A Structural Equation Model', citations: 21 },
      { id: 2, title: 'Evaluating Patient Engagement Portals in Primary Healthcare Centers', citations: 11 },
      { id: 3, title: 'Usability Evaluation Framework for Mobile Telemedicine Applications', citations: 4 },
      { id: 4, title: 'Security and Consent Standards in Academic Medical Databases: A Review', citations: 2 },
      { id: 5, title: 'Comparative Analysis of Digital Health Literacy Across Generational Cohorts', citations: 2 },
      { id: 6, title: 'Digital Transformation in Diagnostic Medical Informatics Curricula', citations: 1 },
      { id: 7, title: 'Assessing Artificial Intelligence Readiness in Secondary Care Clinics', citations: 1 },
      { id: 8, title: 'Tele-monitoring Compliance in Rural Outpatient Settings', citations: 1 },
      { id: 9, title: 'Patient Data Privacy Governance in Smart Hospital Infrastructures', citations: 0 },
      { id: 10, title: 'Quality Benchmarks for Electronic Health Records Usability', citations: 0 }
    ]
  }
};

// Initial default mock papers for the h-index dynamic calculator (Defaults to Low-h-index researcher for learning)
export const DEFAULT_PAPERS = SCHOLAR_AUTHOR_EXAMPLES.low.calculatorPapers;

// Curated Prompts for Controlled AI Studio (Fill-in-the-blanks)
export const AI_PROMPT_TEMPLATES_CONFIG = [
  {
    id: 'seo_title_keywords',
    name: 'محسّن العنوان والكلمات المفتاحية (Academic SEO)',
    description: 'صياغة 3 بدائل أكاديمية قوية لعنوان البحث واختيار كلمات مفتاحية معتمدة تزيد من جاذبية الاستشهاد وظهور البحث في Google Scholar.',
    icon: 'Search',
    fields: [
      {
        name: 'field',
        label: 'التخصص الدقيق للباحث',
        placeholder: 'مثال: تقنية الأشعة - التصوير بالرنين المغناطيسي',
        required: true,
        defaultValue: 'تقنية الأشعة والتصوير الطبي'
      },
      {
        name: 'currentTitle',
        label: 'العنوان الحالي للبحث أو الفكرة المبدئية',
        placeholder: 'مثال: دراسة استخدام الذكاء الاصطناعي في جودة صور الأشعة المقطعية',
        required: true,
        defaultValue: 'Evaluating Low-Dose CT Protocols in Diagnostic Imaging'
      },
      {
        name: 'mainFindings',
        label: 'أبرز 3 نتائج أو مفاهيم تركز عليها الدراسة',
        placeholder: 'مثال: خفض جرعة الإشعاع 30%، تحسين تباين الصورة، عينة 200 مريض في المدينة المنورة',
        required: true,
        defaultValue: '30% radiation dose reduction, deep learning image denoising, multicenter validation in Medina hospitals'
      }
    ]
  },
  {
    id: 'lay_summary',
    name: 'مُولّد الملخص التبسيطي ونشر الأثر المجتمعي (Lay Summary)',
    description: 'ترجمة البحث المعقد إلى ملخص إعلامي ومجتمعي مبسط لصناع القرار والصحافة مع مسودة منشور مهني لـ LinkedIn ومنصة X.',
    icon: 'Share2',
    fields: [
      {
        name: 'field',
        label: 'التخصص الدقيق للباحث',
        placeholder: 'مثال: قسم تقنية الأشعة - كلية العلوم الطبية التطبيقية',
        required: true,
        defaultValue: 'تقنية الأشعة والتصوير التشخيصي'
      },
      {
        name: 'targetAudience',
        label: 'الفئة المستهدفة بالملخص',
        placeholder: 'مثال: عموم المجتمع، الصحفيون، أو مسؤولو وزارة الصحة',
        required: true,
        defaultValue: 'الجمهور العام وصناع القرار في القطاع الصحي'
      },
      {
        name: 'abstractText',
        label: 'ملخص البحث التقني أو الفكرة الجوهرية للنتائج',
        placeholder: 'اكتب هنا فقرة مقتضبة تلخص ما تم التوصل إليه...',
        required: true,
        defaultValue: 'We developed an optimized CT imaging protocol using convolutional neural networks that reduces radiation dose by 35% without degrading structural fidelity in acute abdominal scans.'
      }
    ]
  },
  {
    id: 'collaboration_pitch',
    name: 'صائغ خطابات استقطاب الشراكات الدولية (Collaboration Pitch)',
    description: 'صياغة رسالة بريد إلكتروني أكاديمية رصينة باللغة الإنجليزية لمراسلة باحث دولي مرموق واقتراح شراكة بحثية مشتركة مع جامعة طيبة.',
    icon: 'Globe',
    fields: [
      {
        name: 'field',
        label: 'التخصص الدقيق للباحث',
        placeholder: 'مثال: Medical Imaging / Radiologic Technology',
        required: true,
        defaultValue: 'Diagnostic Medical Imaging & AI'
      },
      {
        name: 'targetPI',
        label: 'اسم الباحث أو المختبر الدولي المستهدف وجهته',
        placeholder: 'مثال: Prof. Alex Miller, Imaging Core Facility, Stanford University',
        required: true,
        defaultValue: 'Prof. David Reynolds, Director of Biomedical Imaging Lab, Imperial College London'
      },
      {
        name: 'researchTopic',
        label: 'المشروع البحثي المشترك المقترح',
        placeholder: 'مثال: دراسة مقارنة دولية لنماذج الذكاء الاصطناعي في فحص الصدر',
        required: true,
        defaultValue: 'Cross-population validation of automated radiation dose tracking algorithms'
      },
      {
        name: 'ourContribution',
        label: 'ما تقدمه مجموعتك البحثية في جامعة طيبة كقيمة مضافة',
        placeholder: 'مثال: بيانات مرضى فريدة، كفاءات تحليلية، أو تمويل داعم',
        required: true,
        defaultValue: 'A curated dataset of 1,200 annotated clinical CT scans from Medina regional medical centers and dedicated team of imaging specialists'
      }
    ]
  },
  {
    id: 'dissemination_plan',
    name: 'خطة الترويج الرقمي للبحث بعد القبول (Dissemination Plan)',
    description: 'جدول زمني منظم للمهام الرقمية والتسويقية لنشر البحث في الأسبوع الأول والشهر الأول وبعد 90 يوماً بما يراعي حقوق الملكية.',
    icon: 'Calendar',
    fields: [
      {
        name: 'paperType',
        label: 'نوع الورقة البحثية',
        placeholder: 'ورقة أصيلة، مراجعة منهجية، تقرير حالة، أو بيانات',
        required: true,
        defaultValue: 'ورقة بحثية أصيلة (Original Research Article)'
      },
      {
        name: 'openAccessStatus',
        label: 'حالة النشر والوصول الحر',
        placeholder: 'وصول ذهبي مفتوح OA، أو مجلة اشتراكات مع وصول أخضر AAM',
        required: true,
        defaultValue: 'وصول مفتوح أخضر (Green OA - مسموح مشاركة نسخة المؤلف AAM)'
      },
      {
        name: 'platforms',
        label: 'المنصات الرقمية التي ترغب في تفعيلها',
        placeholder: 'مثال: ORCID, Google Scholar, ResearchGate, مستودع جامعة طيبة, LinkedIn',
        required: true,
        defaultValue: 'ORCID, Google Scholar, ResearchGate, مستودع جامعة طيبة الرقمي, LinkedIn'
      }
    ]
  }
];

// Post Workshop Detailed Reference Guides
export const PLATFORM_GUIDES = {
  orcid: {
    title: 'دليل الاستخدام الفعلي لمنصة ORCID',
    officialUrl: 'https://orcid.org',
    checklist: [
      'التسجيل المجاني بالاسم الثلاثي كما يظهر في أبحاثك باللغة الإنجليزية.',
      'إضافة جميع تنويعات كتابة الاسم في خانة (Also known as).',
      'إضافة جهة الانتساب الرسمية: Taibah University (مع ربط معرف ROR الرسمي).',
      'ضبط خصوصية الاسم وجهة العمل والأبحاث على وضع (Everyone - الأخضر).',
      'ربط حساب Crossref و DataCite لمنح الإذن بإضافة أبحاثك الجديدة آلياً.'
    ],
    commonErrors: 'الخطأ الأكثر شيوعاً: جعل السجل "Only Me" خوفاً من الخصوصية، مما يمنع محركات البحث والمجلات ولجان الترقيات من التحقق من إنتاجك العلمي.'
  },
  scholar: {
    title: 'دليل الاستخدام الفعلي لـ Google Scholar',
    officialUrl: 'https://scholar.google.com',
    checklist: [
      'تسجيل الدخول بحساب Google ثم إدخال البريد الجامعي (@taibahu.edu.sa) في خانة التحقق.',
      'الضغط على رابط التفعيل المرسل إلى بريدك الجامعي ليظهر ختم التوثيق.',
      'تفعيل خيار: (Make my profile public / جعل الملف الشخصي عاماً).',
      'إجراء فحص شهري للأبحاث المكررة وتحديدها ثم الضغط على (Merge / دمج).',
      'حذف أي بحث لباحث آخر يحمل اسماً مشابهاً فوراً لحماية نزاهة السجل.'
    ],
    commonErrors: 'الخطأ الأكثر شيوعاً: عدم مراجعة الأبحاث المضافة تلقائياً، مما يؤدي إلى تراكم أبحاث لباحثين آخرين ونسبها إليك بالخطأ.'
  },
  researchgate: {
    title: 'دليل الاستخدام الفعلي لـ ResearchGate',
    officialUrl: 'https://www.researchgate.net',
    checklist: [
      'التسجيل باستخدام بريدك الجامعي (@taibahu.edu.sa) لاكتساب العضوية الأكاديمية الفورية.',
      'الانضمام إلى قسمك العلمي في جامعة طيبة لمتابعة أبحاث زملائك.',
      'التحقق من سياسة المجلة عبر موقع Sherpa Romeo قبل رفع النص الكامل.',
      'إذا كانت المجلة مغلقة: ارفع فقط (نسخة المؤلف المقبولة AAM) أو ضع الملخص واعتمد على خيار (Request full-text).',
      'المشاركة في الإجابة عن الأسئلة العلمية في تخصصك لبناء السمعة الأكاديمية الدولية.'
    ],
    commonErrors: 'الخطأ الأكثر شيوعاً: رفع النسخة المنسقة النهائية لدار النشر (Publisher PDF) للمجلات غير المفتوحة، مما يعرضك لإخطار انتهاك حقوق الملكية الفكرية (DMCA).'
  },
  scopus: {
    title: 'دليل تصحيح ودمج ملفات Scopus و Clarivate',
    officialUrl: 'https://www.scopus.com/feedback/author/home.uri',
    checklist: [
      'الدخول إلى معالج تصحيح المؤلفين المجاني (Scopus Author Feedback Wizard).',
      'البحث عن اسمك بكافة الصيغ المحتملة وتحديد الملفات المشتتة.',
      'اختيار الاسم المعتمد وتحديد انتسابك الدائم: Taibah University.',
      'استبعاد أي ورقة بحثية أُضيفت بالخطأ واختيار كافة أوراقك الحقيقية.',
      'إرسال الطلب والاحتفاظ برقم المتابعة (يتم الرد خلال 48 إلى 72 ساعة عمل).',
      'تصدير السجل الموحد مباشرة إلى ORCID بنقرة زر واحدة.'
    ],
    commonErrors: 'الخطأ الأكثر شيوعاً: عدم فحص Scopus إلا عند موعد الترقية، فيتفاجأ الباحث بنقص أبحاثه أو تشتت معامله في ملفات متعددة.'
  }
};
