import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Persistent Storage Directory (Mountable via Docker Volume)
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (err) {
  console.warn('Persistent storage directory warning:', err.message);
}

// Activity and Metrics Recording Helper
function recordWorkshopActivity(event, meta = {}) {
  try {
    const timestamp = new Date().toISOString();
    const logEntry = JSON.stringify({ timestamp, event, ...meta }) + '\n';
    const logFile = path.join(DATA_DIR, 'activity.log');
    fs.appendFileSync(logFile, logEntry, 'utf8');

    // Update aggregated stats
    const statsFile = path.join(DATA_DIR, 'stats.json');
    let stats = { totalGenerations: 0, templates: {}, lastActive: timestamp };
    if (fs.existsSync(statsFile)) {
      try {
        stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
      } catch (e) {
        // fallback to fresh stats
      }
    }
    if (event === 'prompt_generation') {
      stats.totalGenerations = (stats.totalGenerations || 0) + 1;
      const tId = meta.templateId || 'unknown';
      stats.templates[tId] = (stats.templates[tId] || 0) + 1;
    }
    stats.lastActive = timestamp;
    fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2), 'utf8');
  } catch (err) {
    // Non-blocking: Logging failure should never interrupt workshop experience
    console.warn('Logging error:', err.message);
  }
}

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Anti-Abuse: Locked Prompt Templates
// Trainees are NOT allowed to send arbitrary prompts.
// Trainees only fill in predefined parameters into approved academic templates.
const PROMPT_TEMPLATES = {
  seo_title_keywords: {
    id: 'seo_title_keywords',
    title: 'تحسين عنوان البحث والكلمات المفتاحية لمحركات البحث الأكاديمية (Academic SEO)',
    systemInstruction: `أنت خبير واستشاري رائد في النشر الأكاديمي الدولي وتحسين محركات البحث الأكاديمية (Academic SEO) في المجلات المصنفة عالمياً (Q1/Q2).
مهمتك: مساعدة الباحث الأكاديمي في صياغة عنوان علمي جاذب ودقيق، واختيار كلمات مفتاحية استراتيجية تزيد من فرص اكتشاف بحثه في Google Scholar و Scopus و Web of Science و PubMed، وتضاعف استشهاداته المستقبلية.
القواعد الصارمة:
1. صِغ ثلاثة (3) بدائل لعناوين أكاديمية رصينة ومختلفة الأسلوب: (عنوان وصفي محكم، عنوان نتيجي تصريحي Declarative، وعنوان تساؤلي تحليلي).
2. اجعل الكلمات المفتاحية الرئيسية في أول 60 حرفاً من العنوان.
3. اقترح 6-8 كلمات مفتاحية استراتيجية (Keywords) معتمدة (مثل MeSH في المجالات الطبية) دون تكرار الكلمات الموجودة في العنوان نفسه.
4. اذكر نصيحة مخصصة للباحث لرفع قابلية استرجاع هذا البحث بالذات.
اللغة: قدم النتائج باللغة الإنجليزية للعنوان والكلمات (لأن النشر الدولي غالباً بالإنجليزية) مع شروحات وتوجيهات واضحة باللغة العربية.`,
    buildUserPrompt: (inputs) => {
      const field = inputs.field || 'العلوم الطبية والصحية';
      const currentTitle = inputs.currentTitle || 'عنوان مسودة البحث';
      const mainFindings = inputs.mainFindings || 'أهم المنهجيات والنتائج';
      return `بيانات البحث المقدمة من الباحث بجامعة طيبة:
- التخصص الدقيق: ${field}
- العنوان المقترح حالياً / فكرة البحث: ${currentTitle}
- المنهجية وأبرز النتائج والمفاهيم الجوهرية: ${mainFindings}

المطلوب:
قم بتوليد العناوين البديلة الثلاثة المحسنة، والكلمات المفتاحية الاستراتيجية، ونصيحة تحسين الظهور الأكاديمي، وفق المعايير العالمية.`;
    },
    mockFallback: (inputs) => {
      const field = inputs.field || 'تقنية الأشعة والتصوير الطبي';
      const currentTitle = inputs.currentTitle || 'تطبيقات الذكاء الاصطناعي في جودة الصور الشعاعية';
      return `### [محاكاة ذكية للمخرجات - Gemini Flash]

#### 1. خيارات العناوين الأكاديمية المحسنة (Optimized Titles):
* **العنوان النتيجي (Declarative - الأكثر جذباً للاستشهاد):**
  > **"Enhanced Diagnostic Accuracy of Low-Dose CT via Deep Learning Reconstruction: A Multicenter Validation in ${field}"**
  *(السبب: يبرز النتيجة الإيجابية والمنهجية فوراً للقارئ ومحركات البحث)*

* **العنوان الوصفي المباشر (Descriptive & High-SEO):**
  > **"${currentTitle}: Comparative Analysis and Performance Metrics in Clinical Practice"**
  *(السبب: يضع الكلمات المفتاحية الأكثر بحثاً في أول 50 حرفاً)*

* **العنوان التحليلي المقارن (Comparative / Methodological):**
  > **"Optimizing ${field} Workflow: An Evidence-Based Assessment of Emerging Protocols and Image Fidelity"**

---

#### 2. الكلمات المفتاحية الاستراتيجية (Target MeSH & Indexing Keywords):
*(مختارة لتجنب تكرار كلمات العنوان وضمان الظهور في بحوث ذات صلة)*
\`Diagnostic Imaging\` • \`Deep Learning Algorithms\` • \`Radiation Dose Reduction\` • \`Image Quality Assessment\` • \`Clinical Protocol Optimization\` • \`Sensitivity and Specificity\`

---

#### 💡 توصية مخصصة لزيادة الاستشهادات:
1. تجنب إدراج علامات ترقيم غير قياسية في العنوان (مثل النقطتين المتكررتين).
2. عند إيداع البحث في مستودع جامعة طيبة أو ResearchGate، اكتب الملخص بالصيغة الهيكلية (Background, Methods, Results, Conclusion) لرفع مطابقة خوارزميات Google Scholar بنسبة 40%.`;
    }
  },

  lay_summary: {
    id: 'lay_summary',
    title: 'صانع الملخص التبسيطي ونشر الأثر المجتمعي والإعلامي (Lay Summary & Altmetrics)',
    systemInstruction: `أنت أخصائي اتصال علمي وصحافة أكاديمية متخصص في ترجمة الأبحاث العلمية المعقدة إلى محتوى مبسط وسهل الفهم للجمهور العام والإعلاميين وصناع القرار (Lay Summary).
المطلوب:
1. صياغة ملخص تبسيطي دقيق خالي من المصطلحات المعقدة دون الإخلال بالأمانة العلمية (في حدود 150-200 كلمة).
2. توضيح رسالة رئيسية: "ما الذي يعنيه هذا الاكتشاف للشخص العادي في المجتمع أو المريض؟".
3. صياغة مسودة منشور احترافي وموجز لمنصة LinkedIn و منصة X مع الهاشتاقات المناسبة وإبراز انتساب جامعة طيبة.
4. بيان بكيفية مساهمة هذا الملخص في رفع مؤشرات الأثر البديل (Altmetric Score).`,
    buildUserPrompt: (inputs) => {
      const field = inputs.field || 'تقنية الأشعة والعلوم الطبية';
      const abstractText = inputs.abstractText || 'ملخص البحث';
      const targetAudience = inputs.targetAudience || 'الجمهور العام وصناع القرار';
      return `بيانات البحث:
- التخصص الدقيق: ${field}
- الجمهور المستهدف: ${targetAudience}
- ملخص البحث التقني / النتائج:
${abstractText}

المطلوب: كتابة الملخص التبسيطي ومنشورات النشر المجتمعي لرفع الأثر البديل.`;
    },
    mockFallback: (inputs) => {
      return `### [محاكاة ذكية للمخرجات - Gemini Flash]

#### 📢 الملخص التبسيطي للجمهور وصناع القرار (Plain-Language Summary):
"توصلت دراسة علمية حديثة أجراها باحثون في جامعة طيبة إلى حل تقني مبتكر يساهم في خفض جرعات الإشعاع التي يتعرض لها المرضى أثناء الفحوصات التشخيصية الروتينية بنسبة تصل إلى 40%، مع المحافظة التامة على نقاء الصورة الطبية ودقة التشخيص. تعتمد هذه التقنية على خوارزميات معالجة متقدمة تُمكّن أطباء الأشعة من اكتشاف التغيرات المرضية الدقيقة دون الحاجة لزيادة شدة الأشعة، وهو ما يمثل خطوة هامة لتعزيز سلامة المرضى ورفع كفاءة الخدمات الصحية في المستشفيات والمراكز التخصصية."

---

#### 📱 مسودة منشور احترافي لمنصة LinkedIn & X:
> 🔬 **بحث جديد من جامعة طيبة | خطوة نحو تشخيص أدق وسلامة أعلى للمرضى**
> يسعدني مشاركة نتائج أحدث دراساتنا في [${inputs.field || 'قسم تقنية الأشعة'}]، حيث ركزنا على ابتكار بروتوكولات تصوير متطورة تخفض التعرض الإشعاعي مع الحفاظ على أعلى معايير الجودة التشخيصية.
> 📄 لقراءة البحث كاملاً عبر الرابط الرسمي (Open Access): [DOI Link]
> #جامعة_طيبة #البحث_العلمي #الرعاية_الصحية #رؤية_السعودية_2030 #HealthTech #ResearchImpact

---

#### 🌟 أثر هذه الخطوة على مؤشرات Altmetric:
* مشاركة هذا الملخص على LinkedIn ووسائل الإعلام ترفع احتمالية اقتباسه في وثائق السياسات الصحية (Policy Documents) وحصوله على تغطيات إخبارية موثقة في دونات Altmetric.`;
    }
  },

  collaboration_pitch: {
    id: 'collaboration_pitch',
    title: 'صانع خطابات استقطاب الشراكات البحثية الدولية (International Collaboration Pitch)',
    systemInstruction: `You are an elite academic communications consultant and senior research fellowship advisor.
Your task is to draft a highly professional, respectful, concise, and compelling collaboration invitation email to an international research leader (PI / Lab Director).
Guidelines:
1. Strict academic etiquette and tone (concise, 200-250 words max).
2. Acknowledge a specific recent contribution or paper by the target PI.
3. Clearly articulate the mutual synergy and what Taibah University / the applicant brings to the table (e.g., unique clinical dataset, regional cohort, specialized analytical imaging expertise, or joint grant capabilities).
4. Concrete and low-friction call-to-action (e.g., a brief 15-minute introductory Zoom meeting).
5. Output the formal email in academic English, followed by a brief Arabic strategic advice note on how to follow up.`,
    buildUserPrompt: (inputs) => {
      const field = inputs.field || 'Radiologic Technology / Medical Imaging';
      const targetPI = inputs.targetPI || 'Prof. John Smith, Director of Imaging Research Lab';
      const researchTopic = inputs.researchTopic || 'AI-assisted medical image reconstruction';
      const ourContribution = inputs.ourContribution || 'Unique regional clinical imaging dataset from Medina hospitals & specialized expertise';
      return `Collaboration Pitch Details:
- Field: ${field}
- Target Scholar/Lab: ${targetPI}
- Proposed Research Topic / Synergy: ${researchTopic}
- What we offer from Taibah University: ${ourContribution}

Draft the formal collaboration pitch email.`;
    },
    mockFallback: (inputs) => {
      const targetPI = inputs.targetPI || 'Dr. Alex Miller, Center for Advanced Medical Imaging';
      return `### [محاكاة ذكية للمخرجات - Gemini Flash]

#### ✉️ Formal Collaboration Pitch Email (English):
**Subject:** Exploring Collaborative Research Opportunities in ${inputs.field || 'Medical Imaging'} | Taibah University

Dear ${targetPI},

I hope this email finds you well.

I have been following your lab's pioneering contributions to ${inputs.researchTopic || 'advanced diagnostic imaging protocols'}, particularly your recent impactful paper on quantitative evaluation frameworks. Your findings offer remarkable insights into current clinical challenges.

I am an Assistant Professor at the College of Applied Medical Sciences, Taibah University, Medina, Saudi Arabia. Our research group specializes in clinical optimization and protocol refinement in ${inputs.field || 'radiologic diagnostics'}. 

We are currently developing a targeted study addressing ${inputs.researchTopic || 'reconstruction accuracy'}, and we have established direct access to ${inputs.ourContribution || 'a validated multi-institutional regional clinical imaging repository'}. Given your lab's methodological leadership, we believe a collaborative initiative combining our datasets and contextual clinical data with your established analytical pipelines would yield high-impact, internationally co-authored publications and potential bilateral grant opportunities.

Would you or a senior member of your team be open to a brief 15-minute introductory virtual meeting (via Zoom or Teams) in the coming weeks to discuss potential synergies?

Thank you very much for your time and consideration, and I look forward to your thoughts.

Warm regards,

**Dr. [Your Name]**
Assistant Professor, Department of Radiologic Technology
College of Applied Medical Sciences, Taibah University
Medina, Kingdom of Saudi Arabia
ORCID: 0000-xxxx-xxxx-xxxx | Institutional Profile: taibahu.edu.sa

---

#### 💡 نصائح المحاضر (د. عزت أبوعزه) للمتابعة الناجحة:
1. أرسل الرسالة من إيميلك الجامعي الرسمي (@taibahu.edu.sa) صباح يوم الثلاثاء أو الأربعاء بتوقيت دولة الباحث لتفادي عطلة نهاية الأسبوع.
2. إذا لم تتلقَ رداً خلال 10 إلى 14 يوماً، أرسل تذكيراً مهذباً من جملتين (Polite Follow-up).`;
    }
  },

  dissemination_plan: {
    id: 'dissemination_plan',
    title: 'خطة الترويج الرقمي للأوراق البحثية بعد القبول (Post-Acceptance Dissemination Plan)',
    systemInstruction: `أنت مستشار استراتيجي لنشر الأبحاث العلمية وإدارة السمعة المؤسسية.
المهمة: إعداد خطة ترويج رقمية متدرجة للباحث لنشر أثر ورقته البحثية المقبولة للنشر عبر جدول زمني مقسم إلى:
1. الأسبوع الأول بعد القبول (Day 1 - 7).
2. الشهر الأول (Day 8 - 30).
3. بعد 90 يوماً (Day 90+).
تحديد المنصات: ORCID, Google Scholar, ResearchGate, المستودع الرقمي لجامعة طيبة, شبكات التواصل العلمي.
التأكيد الصارم على مراعاة حقوق النشر وسياسات Sherpa Romeo.`,
    buildUserPrompt: (inputs) => {
      const paperType = inputs.paperType || 'ورقة بحثية أصيلة Original Article';
      const openAccessStatus = inputs.openAccessStatus || 'وصول مفتوح أخضر (Green OA / AAM)';
      const platforms = inputs.platforms || 'ORCID, Google Scholar, ResearchGate, LinkedIn';
      return `بيانات الورقة المقبولة:
- نوع الورقة: ${paperType}
- حالة النشر والوصول: ${openAccessStatus}
- المنصات المتاحة للباحث: ${platforms}

المطلوب: إعداد جدول زمني مفصل ومحكم للإجراءات الرقمية للترويج للبحث وتعظيم استشهاداته.`;
    },
    mockFallback: (inputs) => {
      return `### [محاكاة ذكية للمخرجات - Gemini Flash]

#### 🗓️ خطة الترويج الرقمي المتدرجة للبحث بعد القبول (Dissemination Roadmap):

| المرحلة الزمنية | الإجراء العملي الموصى به | المنصة المستهدفة | الأثر المتوقع |
| :--- | :--- | :--- | :--- |
| **الأسبوع الأول (القبول الفوري)** | • تسجيل رقم الـ DOI وإضافة البيانات في ORCID.<br>• إيداع نسخة المؤلف المقبولة (AAM) في مستودع جامعة طيبة.<br>• تدقيق شروط فترة الحظر عبر Sherpa Romeo. | ORCID + مستودع الجامعة | حماية السبق العلمي وتوثيق الانتساب المؤسسي. |
| **الأسبوع الثاني (الظهور على الإنترنت)** | • التحقق من التقاط الورقة في Google Scholar ودمج أي نسخ أولية.<br>• رفع الملخص ورابط الـ DOI على ResearchGate وتفعيل خيار "طلب النص الكامل بصفة خاصة". | Google Scholar + ResearchGate | تسريع الفهرسة وفتح قنوات القراءة للزملاء. |
| **الشهر الأول (الانتشار المجتمعي)** | • صياغة ملخص تبسيطي باللغتين العربية والإنجليزية.<br>• نشر منشور مهني على LinkedIn مع الإشارة للشركاء وجامعة طيبة.<br>• إرسال بريد إلكتروني مخصص لـ 5 باحثين رواد تم الاستشهاد بهم في الورقة. | LinkedIn + البريد الأكاديمي | زيادة التفاعل والتحميلات ورفع مؤشر Altmetric. |
| **بعد 90 يوماً (المتابعة والتقييم)** | • فحص قائمة الاستشهادات الأولى في Scopus و Scholar.<br>• تقييم إمكانية تقديم نتائج البحث في مؤتمر تخصصي قادم.<br>• تحديث الملف الشخصي في موقع القسم والكلية. | Scopus + موقع الجامعة | استدامة أثر البحث ومراقبة مسار نمو الاقتباسات. |

---

#### ⚠️ تنبيه قانوني هام:
بما أن البحث (${inputs.openAccessStatus || 'اشتراكات / وصول أخضر'})، تأكد دائماً من عدم رفع النسخة النهائية المنسقة للناشر (Publisher PDF) على موقع عام إلا بموافقة صريحة من المجلة.`;
    }
  }
};

// API: List Available Prompt Templates
app.get('/api/gemini/templates', (req, res) => {
  const list = Object.values(PROMPT_TEMPLATES).map(t => ({
    id: t.id,
    title: t.title
  }));
  res.json({ success: true, templates: list });
});

// API: Generate AI Output using Gemini Flash (Strictly Controlled Prompt)
app.post('/api/gemini/generate', async (req, res) => {
  const { templateId, inputs, userApiKey, requestedModel } = req.body;

  if (!templateId || !PROMPT_TEMPLATES[templateId]) {
    return res.status(400).json({
      success: false,
      error: 'قالب غير صالح. يسمح فقط باستخدام القوالب الأكاديمية الموجهة المعتمدة في الورشة.'
    });
  }

  const template = PROMPT_TEMPLATES[templateId];
  const safeInputs = inputs || {};

  // Resolve API Key: Environment Key (Preferred) or User Provided Key
  const apiKey = (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim()) || (userApiKey && userApiKey.trim());

  // Model Selection: default to gemini-3.8-flash (official recommendation), support user choice if requested
  const modelName = requestedModel || process.env.GEMINI_MODEL || 'gemini-3.8-flash';

  // If no API key is available, use the high-quality Smart Mock Fallback
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    const mockOutput = template.mockFallback(safeInputs);
    return res.json({
      success: true,
      isMock: true,
      model: `${modelName} (محاكاة ذكية - بيئة تدريبية بدون مفتاح API)`,
      output: mockOutput,
      note: 'تم توليد هذه المخرجات عبر المحاكي الأكاديمي الذكي المدمج في التطبيق لتسهيل التدريب بدون اشتراط مفتاح API.'
    });
  }

  try {
    const aiClient = new GoogleGenAI({ apiKey });
    const userPrompt = template.buildUserPrompt(safeInputs);

    // Call Gemini API
    const response = await aiClient.models.generateContent({
      model: modelName,
      contents: userPrompt,
      config: {
        systemInstruction: template.systemInstruction,
        temperature: 0.4,
        maxOutputTokens: 1500
      }
    });

    const generatedText = response.text || 'لم يتم استلام مخرجات من النموذج.';

    recordWorkshopActivity('prompt_generation', {
      templateId,
      model: modelName,
      isMock: false
    });

    return res.json({
      success: true,
      isMock: false,
      model: modelName,
      output: generatedText
    });
  } catch (err) {
    console.error('Gemini API Error, falling back to smart simulation:', err.message);
    const mockOutput = template.mockFallback(safeInputs);

    recordWorkshopActivity('prompt_generation', {
      templateId,
      model: `${modelName}-mock`,
      isMock: true
    });

    return res.json({
      success: true,
      isMock: true,
      fallbackReason: err.message,
      model: `${modelName} (محاكاة ذكية احتياطية نتيجة قيود الشبكة أو الحصة)`,
      output: mockOutput,
      note: 'تم تفعيل المحاكي الذكي الاحتياطي تلقائياً لضمان استمرار أنشطة الورشة دون انقطاع.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    apiKeyConfigured: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== 'YOUR_GEMINI_API_KEY_HERE'),
    model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
    persistentStorage: {
      dataDir: DATA_DIR,
      isMounted: fs.existsSync(DATA_DIR)
    }
  });
});

// Workshop Live Analytics & Stats (Stored in Persistent Volume)
app.get('/api/stats', (req, res) => {
  try {
    const statsFile = path.join(DATA_DIR, 'stats.json');
    let stats = { totalGenerations: 0, templates: {}, lastActive: null };
    if (fs.existsSync(statsFile)) {
      stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
    }
    res.json({
      success: true,
      storagePath: DATA_DIR,
      stats
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Serve static frontend assets in production
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`ورشة الهوية الرقمية الأكاديمية والحضور البحثي العالمي`);
  console.log(`مقدم الورشة: د. عزت عمر عبدالله أبوعزه - جامعة طيبة`);
  console.log(`الخادم يعمل بنجاح على: http://localhost:${PORT}`);
  console.log(`مفتاح Gemini API: ${process.env.GEMINI_API_KEY ? 'مضبوط في الخادم' : 'غير مضبوط (المحاكي الاحتياطي نشط)'}`);
  console.log(`=======================================================`);
});
