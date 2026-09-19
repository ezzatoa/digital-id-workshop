# -*- coding: utf-8 -*-
"""
Generate complete 40 slides for Taibah University Workshop:
"الهوية الرقمية الأكاديمية والحضور البحثي العالمي"
Presenter: د. عزت عمر عبدالله أبوعزه
Affiliation: أستاذ مساعد في قسم تقنية الأشعة - كلية العلوم الطبية التطبيقية - جامعة طيبة
"""

import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

NAVY_DEEP = RGBColor(11, 26, 72)       # #0b1a48
NAVY_MEDIUM = RGBColor(18, 42, 107)    # #122a6b
TEAL_EMERALD = RGBColor(0, 168, 135)   # #00a887
CYAN_ACCENT = RGBColor(0, 196, 216)    # #00c4d8
GOLD_ACCENT = RGBColor(217, 119, 6)    # #d97706
RED_ACCENT = RGBColor(220, 38, 38)     # #dc2626
TEXT_DARK = RGBColor(30, 41, 59)       # Slate 800
TEXT_MUTED = RGBColor(100, 116, 139)   # Slate 500
WHITE = RGBColor(255, 255, 255)
CARD_BG = RGBColor(248, 250, 252)      # Slate 50
CARD_BORDER = RGBColor(226, 232, 240)  # Slate 200
HIGHLIGHT_BG = RGBColor(240, 253, 250) # Teal 50
DARK_CARD_BG = RGBColor(18, 32, 85)    # Card on dark bg

BG_TITLE = '_template_extracted/ppt/media/image2.png'
BG_DARK = '_template_extracted/ppt/media/image3.png'
BG_LIGHT = '_template_extracted/ppt/media/image4.png'

prs = pptx.Presentation('خلفية البرامج الاسبوعية 1448.pptx')
slide_width = prs.slide_width
slide_height = prs.slide_height

while len(prs.slides) > 0:
    rId = prs.slides._sldIdLst[0].rId
    prs.part.drop_rel(rId)
    del prs.slides._sldIdLst[0]

blank_layout = prs.slide_layouts[6]

def add_bg(slide, bg_path):
    slide.shapes.add_picture(bg_path, 0, 0, slide_width, slide_height)

def add_header(slide, title_text, category="الهوية الرقمية الأكاديمية والحضور البحثي العالمي"):
    tb = slide.shapes.add_textbox(Inches(0.8), Inches(0.32), Inches(11.7), Inches(0.35))
    tf_b = tb.text_frame
    tf_b.word_wrap = True
    p_b = tf_b.paragraphs[0]
    p_b.text = f"جامعة طيبة  |  عمادة التطوير والجودة  |  {category}"
    p_b.alignment = PP_ALIGN.RIGHT
    p_b.font.size = Pt(11)
    p_b.font.bold = True
    p_b.font.color.rgb = TEAL_EMERALD
    p_b.font.name = "Arial"

    tx = slide.shapes.add_textbox(Inches(0.8), Inches(0.65), Inches(11.7), Inches(0.75))
    tf = tx.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = title_text
    p.alignment = PP_ALIGN.RIGHT
    p.font.size = Pt(22)
    p.font.bold = True
    p.font.color.rgb = NAVY_DEEP
    p.font.name = "Arial"

def add_speaker_notes(slide, notes_text):
    notes_slide = slide.notes_slide
    tf = notes_slide.notes_text_frame
    tf.text = notes_text

def create_card(slide, left, top, width, height, bg_color=CARD_BG, border_color=CARD_BORDER):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = bg_color
    shape.line.color.rgb = border_color
    shape.line.width = Pt(1.2)
    return shape

def add_card_content(shape, title, items, title_color=NAVY_DEEP, body_color=TEXT_DARK, badge=None):
    tf = shape.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = MSO_ANCHOR.TOP
    tf.margin_left = Inches(0.25)
    tf.margin_right = Inches(0.25)
    tf.margin_top = Inches(0.22)
    tf.margin_bottom = Inches(0.2)

    p0 = tf.paragraphs[0]
    if badge:
        p0.text = f"[{badge}]  {title}"
    else:
        p0.text = title
    p0.font.size = Pt(15)
    p0.font.bold = True
    p0.font.color.rgb = title_color
    p0.font.name = "Arial"
    p0.alignment = PP_ALIGN.RIGHT
    p0.space_after = Pt(8)

    for item in items:
        p = tf.add_paragraph()
        p.text = f"•  {item}"
        p.font.size = Pt(12)
        p.font.color.rgb = body_color
        p.font.name = "Arial"
        p.alignment = PP_ALIGN.RIGHT
        p.space_after = Pt(5)

def make_section_slide(title, subtitle, module_num, time_range, description, notes):
    slide = prs.slides.add_slide(blank_layout)
    add_bg(slide, BG_DARK)

    pill = create_card(slide, Inches(4.5), Inches(1.8), Inches(4.33), Inches(0.55), bg_color=NAVY_MEDIUM, border_color=CYAN_ACCENT)
    p_pill = pill.text_frame.paragraphs[0]
    p_pill.text = f"المحطة التدريبية {module_num}  |  الزمن المتوقع: {time_range}"
    p_pill.alignment = PP_ALIGN.CENTER
    p_pill.font.size = Pt(13)
    p_pill.font.bold = True
    p_pill.font.color.rgb = CYAN_ACCENT
    p_pill.font.name = "Arial"

    tx = slide.shapes.add_textbox(Inches(1.5), Inches(2.6), Inches(10.33), Inches(1.5))
    tf = tx.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = title
    p.alignment = PP_ALIGN.CENTER
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = WHITE
    p.font.name = "Arial"

    p_sub = tf.add_paragraph()
    p_sub.text = subtitle
    p_sub.alignment = PP_ALIGN.CENTER
    p_sub.font.size = Pt(18)
    p_sub.font.bold = False
    p_sub.font.color.rgb = CYAN_ACCENT
    p_sub.font.name = "Arial"
    p_sub.space_before = Pt(10)

    box = create_card(slide, Inches(2.2), Inches(4.5), Inches(8.93), Inches(1.5), bg_color=DARK_CARD_BG, border_color=TEAL_EMERALD)
    tf_b = box.text_frame
    tf_b.word_wrap = True
    tf_b.margin_left = Inches(0.4)
    tf_b.margin_right = Inches(0.4)
    tf_b.margin_top = Inches(0.25)
    p_desc = tf_b.paragraphs[0]
    p_desc.text = "الأهداف والمخرجات المباشرة لهذه المحطة:"
    p_desc.font.size = Pt(13)
    p_desc.font.bold = True
    p_desc.font.color.rgb = TEAL_EMERALD
    p_desc.alignment = PP_ALIGN.RIGHT
    p_desc.space_after = Pt(6)

    for d in description:
        p_item = tf_b.add_paragraph()
        p_item.text = f"✔  {d}"
        p_item.font.size = Pt(12)
        p_item.font.color.rgb = WHITE
        p_item.alignment = PP_ALIGN.RIGHT
        p_item.space_after = Pt(4)

    add_speaker_notes(slide, notes)
    return slide

# ==============================================================================
# SLIDE 1: COVER
# ==============================================================================
s1 = prs.slides.add_slide(blank_layout)
add_bg(s1, BG_TITLE)

tb1 = s1.shapes.add_textbox(Inches(4.5), Inches(2.3), Inches(7.2), Inches(2.3))
tf1 = tb1.text_frame
tf1.word_wrap = True
p_badge = tf1.paragraphs[0]
p_badge.text = "برنامج استقبال وتهيئة أعضاء هيئة التدريس الجدد  |  البرنامج رقم 04"
p_badge.font.size = Pt(13)
p_badge.font.bold = True
p_badge.font.color.rgb = CYAN_ACCENT
p_badge.alignment = PP_ALIGN.RIGHT
p_badge.font.name = "Arial"

p_main = tf1.add_paragraph()
p_main.text = "الهوية الرقمية الأكاديمية\nوالحضور البحثي العالمي"
p_main.font.size = Pt(36)
p_main.font.bold = True
p_main.font.color.rgb = WHITE
p_main.alignment = PP_ALIGN.RIGHT
p_main.font.name = "Arial"
p_main.space_before = Pt(8)

p_sub = tf1.add_paragraph()
p_sub.text = "Academic Digital Identity & Global Research Presence"
p_sub.font.size = Pt(16)
p_sub.font.italic = True
p_sub.font.color.rgb = TEAL_EMERALD
p_sub.alignment = PP_ALIGN.RIGHT
p_sub.font.name = "Arial"
p_sub.space_before = Pt(6)

pres_box = create_card(s1, Inches(4.5), Inches(4.8), Inches(7.2), Inches(1.5), bg_color=DARK_CARD_BG, border_color=TEAL_EMERALD)
tf_pres = pres_box.text_frame
tf_pres.word_wrap = True
tf_pres.margin_left = Inches(0.3)
tf_pres.margin_right = Inches(0.3)
tf_pres.margin_top = Inches(0.2)
p_pr1 = tf_pres.paragraphs[0]
p_pr1.text = "تقديم: د. عزت عمر عبدالله أبوعزه"
p_pr1.font.size = Pt(16)
p_pr1.font.bold = True
p_pr1.font.color.rgb = WHITE
p_pr1.alignment = PP_ALIGN.RIGHT
p_pr1.font.name = "Arial"

p_pr2 = tf_pres.add_paragraph()
p_pr2.text = "أستاذ مساعد في قسم تقنية الأشعة - كلية العلوم الطبية التطبيقية"
p_pr2.font.size = Pt(13)
p_pr2.font.color.rgb = CYAN_ACCENT
p_pr2.alignment = PP_ALIGN.RIGHT
p_pr2.font.name = "Arial"
p_pr2.space_before = Pt(3)

p_pr3 = tf_pres.add_paragraph()
p_pr3.text = "جامعة طيبة  |  الفصل الدراسي الثاني 1448هـ - 2026م"
p_pr3.font.size = Pt(11)
p_pr3.font.color.rgb = TEXT_MUTED
p_pr3.alignment = PP_ALIGN.RIGHT
p_pr3.font.name = "Arial"
p_pr3.space_before = Pt(3)

add_speaker_notes(s1, """[التوقيت المقترح: 00:00 - 00:03]
• الترحيب بالزملاء والزميلات أعضاء هيئة التدريس الجدد بجامعة طيبة.
• التعريف بنفسي: د. عزت عمر عبدالله أبوعزه، أستاذ مساعد بقسم تقنية الأشعة، كلية العلوم الطبية التطبيقية.
• الهدف العام: بناء حضور بحثي احترافي يضمن نسبة الأبحاث والاستشهادات للباحث ولجامعة طيبة، وفتح آفاق التعاون الدولي.
• نعتمد اليوم على تطبيق ويب تفاعلي طورناه خصيصاً ليمنحكم تجربة محاكاة واقعية بدون الحاجة لإنشاء حسابات أثناء الجلسة.""")

# ==============================================================================
# SLIDE 2: WORKSHOP CARD & OBJECTIVES
# ==============================================================================
s2 = prs.slides.add_slide(blank_layout)
add_bg(s2, BG_LIGHT)
add_header(s2, "بطاقة وصف البرنامج التدريبي والمخرجات الرئيسية")

c2_1 = create_card(s2, Inches(6.8), Inches(1.6), Inches(5.5), Inches(4.8))
add_card_content(c2_1, "بطاقة البرنامج المعتمدة (1448هـ)", [
    "الجهة المشرفة: إدارة التدريب والتطوير الأكاديمي - عمادة التطوير والجودة.",
    "الجدارة المستهدفة: التقنية والتحول الرقمي.",
    "الفئة المستفيدة: جميع أعضاء هيئة التدريس والباحثين بجامعة طيبة.",
    "نمط التقديم والمدة: ورشة عمل تفاعلية مكثفة مدتها 90 دقيقة (عن بعد).",
    "الرقم المرجعي للبرنامج: الدورة التدريبية رقم 04."
], title_color=NAVY_DEEP, badge="البيانات العامة")

c2_2 = create_card(s2, Inches(0.8), Inches(1.6), Inches(5.6), Inches(4.8), bg_color=HIGHLIGHT_BG, border_color=TEAL_EMERALD)
add_card_content(c2_2, "المخرجات التعليمية المستهدفة (KLOs)", [
    "بناء وإدارة المعرفات الأكاديمية العالمية بدقة (ORCID, Scholar, ResearchGate, Scopus).",
    "فهم وتفكيك مؤشرات الأثر البحثي (h-index, citations, FWCI, Altmetrics).",
    "تطبيق استراتيجيات عملية لمضاعفة الاستشهاد بالأوراق البحثية (Academic SEO).",
    "بناء شبكة تعاون بحثي دولية رقمياً لتعزيز مكانة جامعة طيبة في التصنيفات العالمية.",
    "توظيف أدوات الذكاء الاصطناعي التوليدي المنضبط بأوامر موجهة مقيدة."
], title_color=TEAL_EMERALD, badge="المخرجات")

add_speaker_notes(s2, """[التوقيت المقترح: 00:03 - 00:06]
• التأكيد على مواءمة البرنامج مع معايير عمادة التطوير والجودة للعام 1448هـ.
• الإشارة إلى أن جدارة 'التحول الرقمي' تعني انتقال الباحث من العمل المنعزل إلى شبكات البحث المفتوحة والمترابطة عالمياً.
• التذكير بأن مخرجات اليوم لن تكون نظرية، بل سنطبقها عملياً داخل تطبيق الويب التفاعلي للورشة.""")

# ==============================================================================
# SLIDE 3: 90-MIN AGENDA & CHARTER
# ==============================================================================
s3 = prs.slides.add_slide(blank_layout)
add_bg(s3, BG_LIGHT)
add_header(s3, "خارطة الطريق الزمنية (90 دقيقة) وميثاق الورشة")

c3_1 = create_card(s3, Inches(6.3), Inches(1.6), Inches(6.0), Inches(4.8))
add_card_content(c3_1, "الجدول الزمني الموزع للورشة", [
    "00:00 - 00:15 (15 د): المدخل الاستراتيجي وأزمة تشابه الأسماء + تقييم النضج.",
    "00:15 - 00:45 (30 د): المنصات الأربع الكبرى (ORCID, Scholar, RG, Scopus) ومحاكاتها.",
    "00:45 - 01:05 (20 د): فك شفرة مؤشرات الأثر (h-index, FWCI) والمختبر التفاعلي.",
    "01:05 - 01:25 (20 د): استراتيجيات الاستشهاد ومختبر الذكاء الاصطناعي المنضبط.",
    "01:25 - 01:30 (05 د): خطة العمل الشخصية والتقييم الختامي."
], title_color=NAVY_DEEP, badge="الجدول الزمني")

c3_2 = create_card(s3, Inches(0.8), Inches(1.6), Inches(5.2), Inches(4.8))
add_card_content(c3_2, "ميثاق الورشة والتطبيق التفاعلي", [
    "استخدام تطبيق الويب التفاعلي المخصص للورشة المتاح على خادم الـ VPS.",
    "لا يشترط وجود حسابات مسبقة على المنصات أثناء الورشة؛ سنوفر محاكاة افتراضية شاملة.",
    "استخدام الذكاء الاصطناعي يتم عبر قوالب موجهة مقيدة (Fill-in-the-blanks) لضمان النزاهة وحسن الاستخدام.",
    "التفاعل المباشر عبر المحادثة وطرح الأسئلة في نهايات المحطات التدريبية.",
    "كل متدرب سيغادر الورشة وبيده خطة عمل فردية مطبوعة ومحكمة."
], title_color=GOLD_ACCENT, badge="ميثاق التعلم")

add_speaker_notes(s3, """[التوقيت المقترح: 00:06 - 00:09]
• استعراض خارطة الطريق والتأكيد على الانضباط الزمني (90 دقيقة موزعة بدقة).
• تشجيع المتدربين على فتح رابط تطبيق الويب على متصفحاتهم أو هواتفهم.
• التأكيد: لا تقلقوا إذا لم تكن لديكم حسابات سابقة على ORCID أو ResearchGate، صممنا محاكيات تحاكي الواجهات الحقيقية بنسبة 100%.""")

# ==============================================================================
# SLIDE 4: DIAGNOSTIC SELF-ASSESSMENT
# ==============================================================================
s4 = prs.slides.add_slide(blank_layout)
add_bg(s4, BG_LIGHT)
add_header(s4, "النشاط الافتتاحي: مقياس النضج الرقمي للباحث")

c4_1 = create_card(s4, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8), bg_color=HIGHLIGHT_BG, border_color=TEAL_EMERALD)
add_card_content(c4_1, "أين تقف هويتك الرقمية الأكاديمية الآن؟", [
    "توجه الآن إلى تطبيق الويب واختر تبويب: [مقياس النضج الرقمي].",
    "أجب عن 10 أسئلة تشخيصية سريعة بنعم أو لا.",
    "التقييم يشمل: توثيق البريد الجامعي، اكتمال ملف ORCID، دمج ملفات Scopus، وممارسات النشر المفتوح.",
    "ستحصل على نتيجة فورية بنسبة مئوية ومستوى تصنيفي من 4 مستويات:",
    "  1. باحث مبتدئ رقمياً (< 40%)",
    "  2. باحث ناشئ (40% - 69%)",
    "  3. باحث متميز ومكتمل الحضور (70% - 89%)",
    "  4. رائد بحثي عالمي متصل (≥ 90%)"
], title_color=TEAL_EMERALD, badge="نشاط تطبيقي - 5 دقائق")

c4_2 = create_card(s4, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c4_2, "لماذا نقيس نضج الهوية الرقمية؟", [
    "الوعي بنقاط الضعف: كثير من الباحثين لديهم أبحاث مميزة لكنها غير مفهرسة لصالحهم!",
    "تحديد الفجوة: هل هويتك الرقمية تخدم نقلك وترقيتك وتصنيف جامعتك؟",
    "إصدار التقرير: بنهاية الورشة ستتحول نتيجتك هذه إلى خطة تصحيحية عملية ومخصصة.",
    "الهدف اليوم: نقل كل متدرب خطوتين إلى الأمام في مؤشر النضج الرقمي."
], title_color=NAVY_DEEP, badge="القيمة المضافة")

add_speaker_notes(s4, """[التوقيت المقترح: 00:09 - 00:14]
• دعوة جميع المتدربين لفتح التطبيق والضغط على 'مقياس النضج الرقمي'.
• منح المتدربين 3 دقائق لتعبئة الأسئلة العشرة.
• سؤال سريع عبر الشات: كم زميلاً حصل على نتيجة 'ناشئ' أو 'مبتدئ'؟ نطمئنهم بأن الورشة مصممة خصيصاً لسد هذه الفجوة.""")

# ==============================================================================
# SLIDE 5: THE AMBIGUITY PROBLEM
# ==============================================================================
s5 = prs.slides.add_slide(blank_layout)
add_bg(s5, BG_LIGHT)
add_header(s5, "معضلة تشابه الأسماء وضياع الاستشهادات في النشر الدولي")

c5_1 = create_card(s5, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8))
add_card_content(c5_1, "كيف تضيع أبحاثك في قواعد البيانات؟", [
    "تعدد الصيغ اللاتينية للاسم العربي الواحد:",
    "  • مثال: Aboazza, M. / Abu Azza, M. O. / Abo-Azza, Mohammad",
    "  • تشتت الأبحاث بين ملفات متعددة غير مترابطة.",
    "تشابه الأسماء الشائعة (Name Homonyms):",
    "  • آلاف الباحثين يحملون أسماء مثل: M. Khan أو A. Al-Ghamdi أو M. Ali.",
    "تغير جهة الانتساب الأكاديمي (Institutional Mobility):",
    "  • انتقال الباحث من مرحلة الابتعاث أو جامعة أخرى إلى جامعة طيبة.",
    "النتيجة الحتمية: انقسام الاستشهادات، انخفاض معامل h-index، وضياع حقوق الباحث والجامعة!"
], title_color=RED_ACCENT, badge="المعضلة الشائعة")

c5_2 = create_card(s5, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8), bg_color=CARD_BG)
add_card_content(c5_2, "الحل الجذري: المعرفات الرقمية الدائمة (PIDs)", [
    "المعرف الرقمي الدائم (Persistent Identifier): رقم فريد عالمي غير قابل للتكرار.",
    "مثل رقم الهوية الوطنية تماماً، ولكن للباحث وإنتاجه العلمي.",
    "يربط جميع تنويعات اسمك بكيان رقمي واحد مدى الحياة.",
    "يضمن بقاء أبحاثك منسوبة لك مهما تغيرت جامعتك أو طريقة كتابة اسمك في المجلات.",
    "يربط استشهاداتك تلقائياً بجامعة طيبة ويدعم مؤشرات أدائها المؤسسي."
], title_color=TEAL_EMERALD, badge="الحل العلمي")

add_speaker_notes(s5, """[التوقيت المقترح: 00:14 - 00:18]
• ضرب مثل واقعي باسمي الشخصي (Aboazza مقابل Abuazza) وكيف يسبب حرف واحد انشطار الملف التعريفي إلى ملفين في Scopus!
• الإشارة إلى دراسات كشفت أن ما يصل إلى 25% من استشهادات الباحثين العرب تضيع بسبب أخطاء الترجمة الصوتية والتهجئة.
• التأكيد على أن الحل ليس بتوحيد الإملاء في المجلات فحسب، بل باستخدام المعرف الرقمي الموحد ORCID.""")

# ==============================================================================
# SLIDE 6: INSTITUTIONAL IMPACT & TAIBAH UNIVERSITY
# ==============================================================================
s6 = prs.slides.add_slide(blank_layout)
add_bg(s6, BG_LIGHT)
add_header(s6, "أثر الهوية الرقمية في تصنيف جامعة طيبة ورؤية 2030")

c6_1 = create_card(s6, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8))
add_card_content(c6_1, "كيف تنظر التصنيفات العالمية لأبحاثك؟", [
    "تصنيف QS وتصنيف THE وتصنيف شنغهاي (ARWU) تعتمد بنسبة تفوق 30% إلى 60% على:",
    "  • حجم الإنتاج البحثي المفهرس باسم الجامعة (Indexed Publications).",
    "  • عدد الاستشهادات لكل عضو هيئة تدريس (Citations per Faculty).",
    "  • التعاون البحثي الدولي (International Research Network - IRN).",
    "إذا نشرت بحثاً دون كتابة انتساب جامعة طيبة بالصيغة القياسية المعتمدة، فلن يُحسب للجامعة نهائياً!",
    "الصيغة الرسمية المعتمدة: Taibah University, Medina, Saudi Arabia."
], title_color=NAVY_DEEP, badge="التصنيفات الدولية")

c6_2 = create_card(s6, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8), bg_color=HIGHLIGHT_BG, border_color=TEAL_EMERALD)
add_card_content(c6_2, "مستهدفات رؤية 2030 وجامعة طيبة", [
    "الارتقاء بالجامعات السعودية ضمن أفضل 200 جامعة عالمياً.",
    "رفع كفاءة الإنفاق البحثي وتعظيم أثر النشر العلمي النوعي.",
    "كل استشهاد يحصده بحثك هو نقطة إضافية في رصيد جامعة طيبة عالمياً.",
    "إبراز الهوية الرقمية لأعضاء هيئة التدريس يرفع السمعة الأكاديمية (Academic Reputation) واستقطاب الشراكات.",
    "عضو هيئة التدريس هو السفير الرقمي الأول للجامعة في الساحة البحثية العالمية."
], title_color=TEAL_EMERALD, badge="رؤية 2030")

add_speaker_notes(s6, """[التوقيت المقترح: 00:18 - 00:22]
• التذكير بأهمية كتابة اسم جامعة طيبة بدقة باللغة الإنجليزية: Taibah University وليس University of Taibah أو طيبة يونيفيرستي.
• توضيح أن خوارزميات Scopus و Web of Science تجمع الأبحاث بناءً على الـ Affiliation المحدد بدقة.
• الإشارة إلى دور كل أستاذ في دعم مؤشرات أداء الجامعة ومستهدفات رؤية المملكة 2030.""")

# ==============================================================================
# SLIDE 7: SECTION 1 BREAKER
# ==============================================================================
make_section_slide(
    title="المحطة الأولى: المنصات الأربع الكبرى لإدارة الهوية الرقمية",
    subtitle="ORCID • Google Scholar • ResearchGate • Scopus Author ID",
    module_num="01",
    time_range="30 دقيقة",
    description=[
        "بناء وضبط معرف ORCID وربط الأبحاث والانتماء الرسمي لجامعة طيبة.",
        "توثيق حساب Google Scholar وتنظيفه ودمج النسخ المكررة للبحث.",
        "إدارة ملف ResearchGate ومراعاة حقوق النشر وسياسات الوصول المفتوح.",
        "فحص وتصحيح ملفات Scopus و Clarivate ودمج الحسابات المنقسمة."
    ],
    notes="""[التوقيت المقترح: 00:22 - 00:24]
• ننتقل الآن إلى صلب المهارات العملية: المنصات الأربع الكبرى.
• سنشرح كل منصة باختصار مكثف، ثم ننتقل فوراً لمحاكاتها التفاعلية داخل تطبيق الويب.
• تنبيه للمتدربين: ركزوا في الفروق بين المنصات؛ لكل منصة جمهور ووظيفة تختلف تماماً عن الأخرى."""
)

# ==============================================================================
# SLIDE 8: ORCID
# ==============================================================================
s8 = prs.slides.add_slide(blank_layout)
add_bg(s8, BG_LIGHT)
add_header(s8, "منصة ORCID: المعرف الرقمي المفتوح الشامل للباحثين")

c8_1 = create_card(s8, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8))
add_card_content(c8_1, "ما هو ORCID ولماذا هو إلزامي؟", [
    "منظمة دولية غير ربحية تمنح كل باحث كوداً فريداً مكوناً من 16 رقماً:",
    "  • مثال: https://orcid.org/0000-0002-1825-0097",
    "شرط إلزامي للتقديم في معظم المجلات المصنفة (Elsevier, Springer, Wiley, Nature).",
    "مطلب أساسي لجهات التمويل الوطنية والدولية (هيئة تنمية البحث والتطوير والابتكار RDIA).",
    "يعمل كحلقة وصل مركزية بين Scopus و Web of Science و Crossref و DataCite.",
    "يظل ملكاً لك مدى الحياة بصرف النظر عن جامعتك أو وظيفتك."
], title_color=NAVY_DEEP, badge="الهوية الدائمة")

c8_2 = create_card(s8, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c8_2, "المكونات الأساسية لملف ORCID الناجح", [
    "الاسم والبدائل (Also known as): أضف كافة الصيغ التي كتبت بها اسمك سابقاً.",
    "جهة الانتساب (Employment): ربط جامعة طيبة باستخدام كود ROR المؤسسي.",
    "السيرة العلمية (Biography): نبذة مقتضبة تركز على التخصص الدقيق والاهتمامات.",
    "الأعمال والأبحاث (Works): استيراد مؤتمت عبر الـ DOI أو أدوات الربط (Search & Link).",
    "التمويل والجوائز (Funding): توثيق المشاريع والمنح البحثية الممولة."
], title_color=TEAL_EMERALD, badge="مكونات الملف")

add_speaker_notes(s8, """[التوقيت المقترح: 00:24 - 00:28]
• شرح مبسط للـ 16 رقماً الخاص بـ ORCID وأن الرقم الأخير قد يكون حرف 'X' لأنه خانة تحقق حسابية (Checksum).
• التأكيد على أهمية خانة 'Also known as' لكتابة الاسم باللغة العربية وبالحروف اللاتينية بمختلف أشكالها.
• الآن سننتقل لتطبيق المحاكاة ليرى المتدربون كيف يتم بناء الملف خطوة بخطوة.""")

# ==============================================================================
# SLIDE 9: ORCID SIMULATION
# ==============================================================================
s9 = prs.slides.add_slide(blank_layout)
add_bg(s9, BG_LIGHT)
add_header(s9, "نشاط عملي (1): محاكاة منصة ORCID على تطبيق الويب")

c9_1 = create_card(s9, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8), bg_color=HIGHLIGHT_BG, border_color=TEAL_EMERALD)
add_card_content(c9_1, "مهام المحاكاة الافتراضية داخل التطبيق", [
    "انتقل إلى نافذة: [محاكي منصة ORCID] في تطبيق الويب.",
    "المهمة 1: تسجيل باحث افتراضي وإدخال الاسم وبدائل التهجئة.",
    "المهمة 2: إضافة جهة العمل (جامعة طيبة - كلية العلوم الطبية التطبيقية).",
    "المهمة 3: إضافة ورقة بحثية تجريبية عبر رقم المعرف الرقمي (DOI).",
    "المهمة 4: تجربة مستويات الخصوصية الثلاثة (الجميع، الجهات الموثوقة، أنا فقط).",
    "المهمة 5: الحصول على شارة إتمام محاكاة ORCID واستعراض دليل ما بعد الورشة."
], title_color=TEAL_EMERALD, badge="مختبر المحاكاة - 7 دقائق")

c9_2 = create_card(s9, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c9_2, "لماذا المحاكاة أفضل أثناء الورشة؟", [
    "تجنب تعطل رسائل التحقق عبر البريد الإلكتروني أثناء التدريب المباشر.",
    "توفير بيئة تجريبية آمنة خالية من الأخطاء يمكن التدرب عليها دون قلق.",
    "تزويدك بدليل مطبوع مفصل (خطوة بخطوة) للتسجيل الفعلي فور انتهاء الورشة.",
    "التعرف على خفايا الإعدادات قبل تطبيقها على حسابك الرسمي الحقيقي."
], title_color=NAVY_DEEP, badge="مزايا المحاكاة")

add_speaker_notes(s9, """[التوقيت المقترح: 00:28 - 00:35]
• توجيه المتدربين لفتح محاكي ORCID في التطبيق.
• إعطاء المتدربين 5 دقائق لتجربة إدخال البيانات وملاحظة كيف تظهر شارة ORCID الخضراء.
• التعليق على أهمية اختيار مستوى الخصوصية 'Everyone' (الأخضر) ليتمكن محرك Google ومسؤولو التصنيف من قراءة السجل.""")

# ==============================================================================
# SLIDE 10: ORCID BEST PRACTICES
# ==============================================================================
s10 = prs.slides.add_slide(blank_layout)
add_bg(s10, BG_LIGHT)
add_header(s10, "أفضل ممارسات ORCID: الخصوصية والمزامنة التلقائية")

c10_1 = create_card(s10, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8))
add_card_content(c10_1, "مصفوفة الخصوصية الثلاثية (Privacy Matrix)", [
    "الجميع (Everyone - الأخضر):",
    "  • يجب تطبيقه على الاسم، جهة الانتساب الحالية، وقائمة الأبحاث المنشورة.",
    "  • بدون هذا الخيار، تظل أبحاثك مخفية عن قواعد بيانات التصنيف!",
    "الجهات الموثوقة (Trusted Parties - الأصفر):",
    "  • منح الإذن لمجلات مثل Elsevier و Springer Nature لإضافة أبحاثك تلقائياً.",
    "أنا فقط (Only Me - الأحمر):",
    "  • للبيانات الشخصية الحساسة فقط (مثل البريد الشخصي الاحتياطي أو تاريخ الميلاد)."
], title_color=NAVY_DEEP, badge="إدارة الخصوصية")

c10_2 = create_card(s10, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c10_2, "ميزة التحديث التلقائي (Auto-Update)", [
    "تفعيل ربط Crossref و DataCite مع حسابك في ORCID:",
    "  • بمجرد قبول بحثك ونشره ومنحه رقم DOI، يتم إرساله لحساب ORCID الخاص بك آلياً دون أي تدخل منك!",
    "توفير ساعات من إدخال البيانات اليدوي المتكرر في كل مرة تنشر فيها بحثاً.",
    "ضمان عدم نسيان أو سقوط أي ورقة بحثية جديدة من سجلك الأكاديمي.",
    "تكامل ORCID مع أنظمة إدارة البحث بالجامعة (Pure / Converis)."
], title_color=TEAL_EMERALD, badge="الأتمتة الذكية")

add_speaker_notes(s10, """[التوقيت المقترح: 00:35 - 00:38]
• التأكيد بشدة: لا تجعل حساب ORCID خاصاً (Only Me)، فهذا يفقده 90% من قيمته!
• شرح كيفية عمل Crossref: عندما توافق على إذن Crossref في صندوق بريد ORCID، لن تضطر مستقبلاً لإضافة أبحاثك يدوياً.""")

# ==============================================================================
# SLIDE 11: GOOGLE SCHOLAR
# ==============================================================================
s11 = prs.slides.add_slide(blank_layout)
add_bg(s11, BG_LIGHT)
add_header(s11, "باحث Google العلمي: واجهة الاكتشاف والاستشهاد الأوسع")

c11_1 = create_card(s11, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8))
add_card_content(c11_1, "مكانة Google Scholar عالمياً", [
    "محرك البحث الأكاديمي الأكثر استخداماً بين الباحثين والطلاب حول العالم.",
    "أوسع تغطية للفهرسة: يشمل المجلات المحكمة، وقائع المؤتمرات، الأطروحات، والكتب.",
    "يحدث مؤشرات الاستشهاد بسرعة فائقة مقارنة بقواعد البيانات الأخرى.",
    "يقدم لوحة مؤشرات واضحة: إجمالي الاستشهادات، معامل h-index، ومعامل i10-index.",
    "حسابك فيه هو واجهتك الأولى عندما يبحث أي شخص عن اسمك في محرك بحث Google!"
], title_color=NAVY_DEEP, badge="الأهمية والانتشار")

c11_2 = create_card(s11, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8), bg_color=HIGHLIGHT_BG, border_color=TEAL_EMERALD)
add_card_content(c11_2, "الشروط الثلاثة لظهور الملف وتوثيقه", [
    "1. التوثيق بالبريد الجامعي الرسمي (@taibahu.edu.sa):",
    "   • يمنحك عبارة 'بريد إلكتروني تم التحقق منه في taibahu.edu.sa'.",
    "   • يربط أبحاثك بملف جامعة طيبة في تصنيف الجامعات.",
    "2. تفعيل خيار 'الملف الشخصي متاح للعامة' (Make my profile public).",
    "3. إضافة كلمات مفتاحية دقيقة (Keywords) تمثل تخصصك لسهولة الاكتشاف."
], title_color=TEAL_EMERALD, badge="شروط التوثيق")

add_speaker_notes(s11, """[التوقيت المقترح: 00:38 - 00:42]
• توضيح أن الكثير من الباحثين ينشئون حساباً على Google Scholar ولكنهم ينسون تفعيل خيار 'Public' فيظل الملف مخفياً تماماً!
• التأكيد على استخدام الإيميل الجامعي الرسمي، وتنبيههم بأنه يمكن تسجيل الدخول بحساب Gmail عادي ولكن توثيق المؤسسة يتطلب إيميل الجامعة.""")

# ==============================================================================
# SLIDE 12: GOOGLE SCHOLAR SIMULATION
# ==============================================================================
s12 = prs.slides.add_slide(blank_layout)
add_bg(s12, BG_LIGHT)
add_header(s12, "نشاط عملي (2): محاكاة منصة Google Scholar على تطبيق الويب")

c12_1 = create_card(s12, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8), bg_color=HIGHLIGHT_BG, border_color=TEAL_EMERALD)
add_card_content(c12_1, "مهام محاكاة Google Scholar في التطبيق", [
    "انتقل إلى نافذة: [محاكي Google Scholar] في تطبيق الويب.",
    "المهمة 1: إدخال البريد الجامعي (@taibahu.edu.sa) وتجربة التوثيق.",
    "المهمة 2: فحص قائمة أبحاث تجريبية ورصد أبحاث دخيلة لباحث يحمل اسماً مشابهاً.",
    "المهمة 3: استبعاد الأبحاث غير الخاصة بك لحماية النزاهة العلمية.",
    "المهمة 4: دمج نسختين مكررتين لنفس البحث لتوحيد الاستشهادات.",
    "المهمة 5: ضبط إعدادات إضافة المقالات (المراجعة اليدوية vs الإضافة التلقائية)."
], title_color=TEAL_EMERALD, badge="مختبر المحاكاة - 6 دقائق")

c12_2 = create_card(s12, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c12_2, "مخاطر إهمال تنظيف الحساب", [
    "إضافة أبحاث لباحثين آخرين يضر بسمعتك الأكاديمية ويعرض الحساب للشبهات.",
    "تكرار نفس البحث يشتت الاقتباسات (مثلاً: نسخة المؤتمر 10 استشهادات ونسخة المجلة 15، بالدمج تصبح 25 استشهاداً!).",
    "دمج النسخ يرفع معامل h-index فوراً إذا تخطى الاستشهاد الموحد حاجز العتبة المطلوبة.",
    "التحقق الدوري كل شهر يضمن نظافة سجلك العلمي."
], title_color=RED_ACCENT, badge="تحذير منهجي")

add_speaker_notes(s12, """[التوقيت المقترح: 00:42 - 00:48]
• توجيه المتدربين لتجربة محاكي Google Scholar.
• التركيز على زر 'Merge' (دمج الأبحاث): إيضاح كيف يرفع الدمج رقم الاقتباسات للبحث الواحد ويصحح مؤشر هيرش.
• التنبيه على خيار 'Don't automatically add articles to profile; email me for review' لمن لديهم أسماء شائعة.""")

# ==============================================================================
# SLIDE 13: GOOGLE SCHOLAR CLEANING
# ==============================================================================
s13 = prs.slides.add_slide(blank_layout)
add_bg(s13, BG_LIGHT)
add_header(s13, "استراتيجيات تنظيف وضبط حساب باحث Google العلمي")

c13_1 = create_card(s13, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8))
add_card_content(c13_1, "معالجة التكرارات والأخطاء الشائعة", [
    "البحث عن أبحاث المؤتمرات والمسودات ومقارنتها بنسخة المجلة النهائية.",
    "تحديد المربعات بجانب النسخ المتطابقة والضغط على [Merge / دمج].",
    "اختيار النسخة الأصح في العنوان وبيانات النشر لتكون هي الواجهة الأساسية.",
    "في حال وجود بحث لا يخصك مطلقاً: اختر البحث واضغط على [Delete / حذف].",
    "يمكن استعادة الأبحاث المحذوفة خطأً من سلة المهملات داخل الملف الشخصي."
], title_color=NAVY_DEEP, badge="خطوات الدمج")

c13_2 = create_card(s13, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c13_2, "تحسين الظهور والكلمات المفتاحية", [
    "كتابة مجالات الاهتمام بدقة (مثال: Medical Imaging, Radiology, AI in Healthcare).",
    "تجنب الكلمات العامة جداً مثل (Medicine أو Science) لأنها لا تظهرك في قوائم التخصص.",
    "الضغط على الكلمة المفتاحية يتيح لك رؤية ترتيبك وترتيب زملائك في التخصص بالجامعة.",
    "إضافة رابط صفحتك الجامعية الرسمية على موقع جامعة طيبة في خانة (Homepage)."
], title_color=TEAL_EMERALD, badge="تحسين الكلمات")

add_speaker_notes(s13, """[التوقيت المقترح: 00:48 - 00:51]
• نصيحة عملية: استعرض الكلمات المفتاحية في تخصصك واعرف من هم الرواد فيها على Google Scholar.
• الإشارة إلى أن الباحثين يزورون صفحات المتخصصين عبر النقر على تلك الكلمات، وهي وسيلة ممتازة لجذب قراء واستشهادات جديدة.""")

# ==============================================================================
# SLIDE 14: RESEARCHGATE
# ==============================================================================
s14 = prs.slides.add_slide(blank_layout)
add_bg(s14, BG_LIGHT)
add_header(s14, "ResearchGate: مجتمع التواصل الأكاديمي وبناء السمعة")

c14_1 = create_card(s14, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8))
add_card_content(c14_1, "فيسبوك العلماء والباحثين", [
    "شبكة تواصل اجتماعي مخصصة حصرياً للمجتمع الأكاديمي والبحثي (+25 مليون باحث).",
    "منصة استثنائية للاكتشاف السريع، قراءة الأوراق الحديثة، والتواصل المباشر مع المؤلفين.",
    "مؤشر اهتمام البحث (Research Interest Score): يقيس تفاعل الباحثين مع إنتاجك (قراءات، توصيات، اقتباسات).",
    "خاصية طلب النص الكامل (Request Full-text): تتيح للزملاء حول العالم طلب أبحاثك المغلقة بموجب الاستخدام الشخصي المسموح.",
    "تتبع مشاريع الأبحاث الجارية (Projects) قبل نشرها الرسمي."
], title_color=NAVY_DEEP, badge="شبكة التواصل")

c14_2 = create_card(s14, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c14_2, "الاستخدام الأكاديمي الذكي للمنصة", [
    "متابعة الباحثين الرواد في تخصصك الدقيق وتلقي إشعارات بأبحاثهم الجديدة.",
    "المشاركة في الإجابة عن الأسئلة العلمية في مجالك لبناء سمعتك الدولية.",
    "إنشاء مشاريع بحثية ومشاركة التحديثات والبيانات الأولية مع فريقك.",
    "تحميل تقارير أسبوعية تفصيلية تظهر من قرأ أبحاثك ومن أي جامعات ودول!"
], title_color=GOLD_ACCENT, badge="التفاعل الاحترافي")

add_speaker_notes(s14, """[التوقيت المقترح: 00:51 - 00:54]
• التأكيد على أن ResearchGate منصة ممتازة لكسر العزلة البحثية.
• التنويه بوجود محاذير قانونية في رفع الأبحاث سنشرحها في الشريحة التالية (شريحة حقوق النشر).
• الاستعداد للانتقال لمحاكي ResearchGate.""")

# ==============================================================================
# SLIDE 15: RESEARCHGATE SIMULATION
# ==============================================================================
s15 = prs.slides.add_slide(blank_layout)
add_bg(s15, BG_LIGHT)
add_header(s15, "نشاط عملي (3): محاكاة منصة ResearchGate على تطبيق الويب")

c15_1 = create_card(s15, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8), bg_color=HIGHLIGHT_BG, border_color=TEAL_EMERALD)
add_card_content(c15_1, "مهام محاكاة ResearchGate في التطبيق", [
    "انتقل إلى نافذة: [محاكي ResearchGate] في تطبيق الويب.",
    "المهمة 1: إعداد الملف الشخصي وتحديد الانتماء: Taibah University.",
    "المهمة 2: تجربة رفع بحث وفحص شاشة حقوق الملكية الفكرية.",
    "المهمة 3: التفريق العملي بين رفع (نسخة المؤلف المقبولة AAM) و (نسخة الناشر النهائية).",
    "المهمة 4: تجربة خاصية الرد على طلب نص كامل خاص (Private Sharing).",
    "المهمة 5: قراءة مؤشرات التفاعل (Reads, Citations, Research Interest)."
], title_color=TEAL_EMERALD, badge="مختبر المحاكاة - 6 دقائق")

c15_2 = create_card(s15, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c15_2, "ماذا نتعلم من هذه التجربة؟", [
    "كيف تنشر أبحاثك دون الوقوع في أي نزاع قضائي مع دور النشر العالمية.",
    "الفرق الجوهري بين المشاركة العامة للجميع (Public) والمشاركة الفردية (Private).",
    "كيف يؤدي التفاعل المنتظم إلى مضاعفة قراءات أبحاثك بمعدل 4 أضعاف مقارنة بتركها راكدة.",
    "أهمية وضع ملخص جذاب وكلمات واضحة تشجع الباحثين على تحميل الورقة."
], title_color=NAVY_DEEP, badge="الدروس المستفادة")

add_speaker_notes(s15, """[التوقيت المقترح: 00:54 - 01:00]
• فتح محاكي ResearchGate بالتطبيق.
• تتبع تجربة رفع الملف: إبراز التنبيه القانوني الذي يظهر للمتدربين عند محاولة رفع PDF النهائي لمجلة تجارية مغلقة.""")

# ==============================================================================
# SLIDE 16: COPYRIGHT & SHERPA ROMEO
# ==============================================================================
s16 = prs.slides.add_slide(blank_layout)
add_bg(s16, BG_LIGHT)
add_header(s16, "حقوق النشر والأرشفة الذاتية: ما المسموح نشره؟")

c16_1 = create_card(s16, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8))
add_card_content(c16_1, "الصيغ الثلاث للورقة البحثية", [
    "1. المسودة الأولى للمؤلف (Preprint):",
    "   • النسخة التي كتبتها قبل إرسالها للمجلة وقبل التحكيم (مسموح نشرها غالباً).",
    "2. النسخة المقبولة للنشر (Author Accepted Manuscript - AAM / Postprint):",
    "   • النسخة بعد التحكيم وتعديل الملاحظات ولكن بدون تنسيق الناشر وشعاره.",
    "   • يسمح معظم الناشرين بمشاركتها في المستودعات أو بطلب خاص!",
    "3. نسخة الناشر النهائية (Version of Record - Publisher PDF):",
    "   • النسخة المنسقة بشعار المجلة ورقم الصفحات. يمنع نشرها علناً إلا إذا كانت المجلة وصولاً مفتوحاً (Open Access)!"
], title_color=NAVY_DEEP, badge="أنواع النسخ")

c16_2 = create_card(s16, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c16_2, "أداة Sherpa Romeo للتحقق الفوري", [
    "موقع عالمي رسمي مجاني (v2.sherpa.ac.uk/romeo) للتحقق من سياسات المجلات.",
    "ابحث باسم المجلة لمعرفة ما تسمح به بدقة:",
    "  • هل تسمح بالنشر الذاتي لنسخة المؤلف المقبولة؟",
    "  • ما هي فترة الحظر (Embargo Period) إن وجدت؟ (مثال: 12 شهراً).",
    "  • ما هي الشروط الواجب كتابتها (مثل وضع رابط الـ DOI الرسمي للمجلة).",
    "احمِ نفسك وجامعتك من مخالفات الملكية الفكرية باتباع هذه القواعد."
], title_color=GOLD_ACCENT, badge="الفحص القانوني")

add_speaker_notes(s16, """[التوقيت المقترح: 01:00 - 01:04]
• هذه الشريحة من أهم الشرائح التوعوية: كثير من أعضاء هيئة التدريس يرفعون الـ Publisher PDF على ResearchGate فتأتيهم إخطارات إزالة (DMCA Takedown) من Elsevier أو Springer.
• توضيح مفهوم 'الوصول المفتوح الأخضر' (Green Open Access) والاعتماد على نسخة الـ AAM.""")

# ==============================================================================
# SLIDE 17: SCOPUS & WEB OF SCIENCE
# ==============================================================================
s17 = prs.slides.add_slide(blank_layout)
add_bg(s17, BG_LIGHT)
add_header(s17, "Scopus Author ID و Clarivate ResearcherID")

c17_1 = create_card(s17, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8))
add_card_content(c17_1, "معرفات النشر المفهرس المرموق", [
    "Scopus (Elsevier) و Web of Science (Clarivate):",
    "  • هما المعياران الرسميان لتقييم الجامعات والترقيات والجوائز والاعتماد الأكاديمي.",
    "لا تقوم بالتسجيل فيهما يدوياً؛ بل تنشئ المنظومة ملفاً تلقائياً بمجرد نشر أول بحث مفهرس لك!",
    "معرف Scopus Author ID: رقم فريد مكون من 11 رقماً يربط أبحاثك في قاعدة Scopus.",
    "معرف Web of Science ResearcherID: يربط سجلك ومراجعاتك في WoS و Publons سابقاً.",
    "كلا المعرفين يعتمدان على الانتساب الصحيح لجامعة طيبة."
], title_color=NAVY_DEEP, badge="المعيار المؤسسي")

c17_2 = create_card(s17, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8), bg_color=CARD_BG)
add_card_content(c17_2, "مشكلة انقسام الحساب (Split Profiles)", [
    "الظاهرة الأكثر شيوعاً: يكتشف الباحث أن لديه حسابين أو ثلاثة في Scopus!",
    "الأسباب: تغير طريقة كتابة الاسم، أو كتابة انتسابات مختلفة في أبحاث متعاقبة.",
    "الأثر السلبي: تشتت الاستشهادات، انخفاض معامل h-index الرسمي في Scopus، وضعف مؤشرات الباحث والجامعة.",
    "الحل: تقديم طلب دمج رسمي فوري عبر خدمة (Author Feedback Wizard) المجانية في Scopus.",
    "ربط حساب Scopus بـ ORCID لضمان تحديث السجلين بضغطة زر واحدة."
], title_color=RED_ACCENT, badge="المشكلة والحل")

add_speaker_notes(s17, """[التوقيت المقترح: 01:04 - 01:08]
• تأكيد أن الترقيات في معظم الجامعات السعودية تعتمد على تقرير Scopus أو Clarivate.
• شرح كيف يؤدي انقسام الملف إلى حرمان الباحث من نقاط حاسمة في معامل هيرش.""")

# ==============================================================================
# SLIDE 18: SCOPUS MERGE SIMULATION
# ==============================================================================
s18 = prs.slides.add_slide(blank_layout)
add_bg(s18, BG_LIGHT)
add_header(s18, "نشاط عملي (4): محاكاة دمج وتصحيح ملفات Scopus المنقسمة")

c18_1 = create_card(s18, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8), bg_color=HIGHLIGHT_BG, border_color=TEAL_EMERALD)
add_card_content(c18_1, "مهام محاكاة Scopus في التطبيق التفاعلي", [
    "انتقل إلى نافذة: [محاكي Scopus & WoS] في تطبيق الويب.",
    "المهمة 1: البحث عن باحث واكتشاف وجود ملفين منفصلين له في Scopus.",
    "المهمة 2: تحديد الملفين والضغط على زر [دمج الملفات / Request Merge].",
    "المهمة 3: مراجعة قائمة الأبحاث واستبعاد بحث دخيل واختيار الاسم المفضل.",
    "المهمة 4: اعتماد انتساب (Taibah University) كجهة عمل رئيسية.",
    "المهمة 5: تجربة خاصية المزامنة والتصدير المباشر إلى حساب ORCID."
], title_color=TEAL_EMERALD, badge="مختبر المحاكاة - 6 دقائق")

c18_2 = create_card(s18, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c18_2, "ماذا تفعل بعد الورشة في Scopus الفعلي؟", [
    "الدخول إلى: scopus.com/feedback/author/home.uri (متاح مجاناً دون اشتراك).",
    "البحث عن اسمك بكافة التهجئات المحتملة.",
    "في حال وجود أكثر من ملف، اتبع الخطوات التي تدربت عليها اليوم بدقة.",
    "فريق Elsevier يقوم بمعالجة الطلب وتوحيد الملف خلال 48 إلى 72 ساعة عمل.",
    "الاحتفاظ برقم التذكرة (Case Number) حتى يتم تأكيد الدمج النهائي."
], title_color=NAVY_DEEP, badge="التطبيق الفعلي")

add_speaker_notes(s18, """[التوقيت المقترح: 01:08 - 01:14]
• فتح محاكي Scopus في تطبيق الويب.
• استعراض تجربة الدمج: المتدربون سيشاهدون عملياً كيف يندمج الحسابين ويقفز معامل h-index بعد دمج استشهادات الورقتين المفصولتين.""")

# ==============================================================================
# SLIDE 19: COMPARATIVE MATRIX
# ==============================================================================
s19 = prs.slides.add_slide(blank_layout)
add_bg(s19, BG_LIGHT)
add_header(s19, "مصفوفة المقارنة الشاملة للمنصات الأربع الكبرى")

# Create a 3-column comparative view
c19_1 = create_card(s19, Inches(8.5), Inches(1.6), Inches(3.8), Inches(4.8))
add_card_content(c19_1, "ORCID و Google Scholar", [
    "ORCID:",
    "  • الطبيعة: معرف رقمي موحد ومفتوح.",
    "  • التغطية: شاملة لكل الإنتاج والجهات.",
    "  • التحكم: يدوي ومؤتمت من الباحث.",
    "  • القوة: المعيار الأساسي للنشر والتمويل.",
    "Google Scholar:",
    "  • الطبيعة: محرك بحث واكتشاف عالمي.",
    "  • التغطية: الأوسع إطلاقاً (كل المصادر).",
    "  • الميزة: سريع جداً ومجاني ومرئي للجميع."
], title_color=NAVY_DEEP, badge="المعرف والمحرك")

c19_2 = create_card(s19, Inches(4.65), Inches(1.6), Inches(3.6), Inches(4.8))
add_card_content(c19_2, "ResearchGate", [
    "الطبيعة: شبكة تواصل أكاديمي وتفاعل اجتماعي.",
    "الجمهور: باحثون، زملاء، طلاب دراسات عليا.",
    "الميزة التنافسية: طلب النصوص الكاملة والمناقشات العلمية وتتبع قراءات الأبحاث أسبوعياً.",
    "التنبيه: الانتباه لحقوق الناشر عند رفع الأبحاث.",
    "الأثر: نشر سريع للسمعة وجذب الاستشهادات."
], title_color=GOLD_ACCENT, badge="التواصل الأكاديمي")

c19_3 = create_card(s19, Inches(0.8), Inches(1.6), Inches(3.6), Inches(4.8))
add_card_content(c19_3, "Scopus / Web of Science", [
    "الطبيعة: قواعد بيانات مفهرسة ومحكمة صارمة.",
    "الإنشاء: تلقائي بناءً على النشر المفهرس.",
    "الأهمية: المعيار الرسمي للترقيات والتصنيفات والجوائز الوطنية والاعتماد الدولي.",
    "الإدارة: مراجعة دورية لمنع انقسام الملفات.",
    "القوة: قياس مؤشرات h-index و FWCI المعتمدة."
], title_color=TEAL_EMERALD, badge="المعيار المؤسسي")

add_speaker_notes(s19, """[التوقيت المقترح: 01:14 - 01:17]
• تلخيص المحطة الأولى بهذه المصفوفة الجامعة.
• الإجابة عن السؤال المتكرر: هل يغني أحدهم عن الآخر؟ الجواب: لا، كل منصة تكمل الأخرى وتشكل معاً منظومة الهوية الرقمية الكاملة.""")

# ==============================================================================
# SLIDE 20: SECTION 2 BREAKER
# ==============================================================================
make_section_slide(
    title="المحطة الثانية: فك شفرة مؤشرات الأثر البحثي والاقتباسات",
    subtitle="معامل هيرش h-index • مؤشر i10 • مؤشر FWCI • المؤشرات البديلة Altmetrics",
    module_num="02",
    time_range="20 دقيقة",
    description=[
        "الفهم الرياضي والبياني الدقيق لمعامل هيرش (h-index) ونقاط قوته وحدوده.",
        "التعرف على مؤشر الاقتباس الموزون حقلياً (FWCI) المعتمد في التصنيفات.",
        "قياس الأثر المجتمعي والإعلامي والسياسي عبر المؤشرات البديلة (Altmetrics).",
        "تطبيق عملي عبر المختبر التفاعلي لحساب معامل h والتنبؤ بنموه."
    ],
    notes="""[التوقيت المقترح: 01:17 - 01:19]
• ننتقل إلى المحطة الثانية: فهم مؤشرات الأثر العلمي.
• كثير من الباحثين يسمعون عن h-index لكنهم لا يعرفون بدقة كيف يُحسب، ولماذا قد ينشر باحث أوراقاً جديدة ولا يرتفع معامله إطلاقاً!
• سنكشف الشفرة الرياضية وكيف تركز مجهودك الترويجي على الأوراق الصحيحة."""
)

# ==============================================================================
# SLIDE 21: H-INDEX DEFINITION
# ==============================================================================
s21 = prs.slides.add_slide(blank_layout)
add_bg(s21, BG_LIGHT)
add_header(s21, "معامل هيرش (h-index): تعريفه، حسابه، ورسمه البياني")

c21_1 = create_card(s21, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8))
add_card_content(c21_1, "التعريف العلمي الدقيق لمعامل h", [
    "ابتكره الفيزيائي خورخي هيرش (Jorge Hirsch) عام 2005.",
    "التعريف: الباحث لديه معامل هيرش يساوي (h) إذا كان قد نشر (h) من الأوراق البحثية، بحيث نالت كل ورقة منها على الأقل (h) من الاستشهادات.",
    "طريقة الحساب الرياضية البسيطة:",
    "  1. رتّب جميع أبحاثك تنازلياً حسب عدد الاستشهادات من الأكبر للأصغر.",
    "  2. ابحث عن آخر ورقة يكون فيها: [عدد الاستشهادات ≥ ترتيب الورقة].",
    "  3. هذا الترتيب هو معامل h-index الخاص بك!"
], title_color=NAVY_DEEP, badge="المفهوم الرياضي")

c21_2 = create_card(s21, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8), bg_color=HIGHLIGHT_BG, border_color=TEAL_EMERALD)
add_card_content(c21_2, "مثال توضيحي بالأرقام", [
    "باحث لديه 5 أبحاث بالاستشهادات التالية:",
    "  • البحث 1 (الترتيب 1): 45 استشهاداً (45 ≥ 1) ✔",
    "  • البحث 2 (الترتيب 2): 20 استشهاداً (20 ≥ 2) ✔",
    "  • البحث 3 (الترتيب 3): 8 استشهادات (8 ≥ 3) ✔",
    "  • البحث 4 (الترتيب 4): 4 استشهادات (4 ≥ 4) ✔",
    "  • البحث 5 (الترتيب 5): 2 استشهادين (2 ليست ≥ 5) ✘",
    "النتيجة: معامل h-index لهذا الباحث هو (4).",
    "لكي يصبح معامله (5)، يحتاج البحث رقم 5 إلى 3 استشهادات إضافية فقط!"
], title_color=TEAL_EMERALD, badge="تطبيق رقمي")

add_speaker_notes(s21, """[التوقيت المقترح: 01:19 - 01:24]
• التأكيد على الفكرة العبقرية لـ h-index: يجمع بين الإنتاجية (الكم) والجودة (الكيف / الاستشهادات).
• الإيضاح: لو نشرت 100 بحث وكل بحث نال استشهاداً واحداً فقط، فمعاملك هو 1 فقط!
• ولو نشرت بحثاً واحداً ونال 10,000 استشهاد، فمعاملك هو 1 أيضاً!
• لذلك يتطلب رفع معامل h توازناً مستمراً.""")

# ==============================================================================
# SLIDE 22: H-INDEX CRITIQUE & LIMITATIONS
# ==============================================================================
s22 = prs.slides.add_slide(blank_layout)
add_bg(s22, BG_LIGHT)
add_header(s22, "تحليل نقدي لمعامل h-index: حالات مقارنة وما يخفيه")

c22_1 = create_card(s22, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8))
add_card_content(c22_1, "دراسة حالة: باحث (أ) مقابل باحث (ب)", [
    "الباحث (أ) - استشهاد تراكمي ضخم:",
    "  • نشر 4 أبحاث نالت: [200, 150, 80, 70]. المجموع: 500 استشهاد.",
    "  • معامل هيرش له = (4) فقط!",
    "الباحث (ب) - أبحاث عديدة باقتباسات معتدلة:",
    "  • نشر 10 أبحاث نالت كل منها: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10].",
    "  • المجموع: 100 استشهاد فقط.",
    "  • معامل هيرش له = (10)!",
    "المفارقة: الباحث (ب) معامله أكثر من ضعف الباحث (أ) رغم أن الباحث (أ) نال 5 أضعاف الاستشهادات!"
], title_color=NAVY_DEEP, badge="مفارقة المقارنة")

c22_2 = create_card(s22, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c22_2, "العيوب الهيكلية لمعامل h-index", [
    "التحيز لعمر الباحث (Career Age Bias): ينحاز تلقائياً للأساتذة القدامى على حساب الشباب لأن تراكم الاقتباسات يحتاج سنوات.",
    "اختلاف الحقول العلمية: معدل الاستشهاد في العلوم الطبية الحيوية أعلى بعشرات المرات من الرياضيات أو الدراسات الإنسانية.",
    "إهمال ترتيب المؤلفين: يعامل المؤلف الأول والمؤلف العاشر بنفس النتيجة تماماً.",
    "الخلاصة: h-index مؤشر مفيد ومهم ولكنه لا يجوز أن يكون المقياس الوحيد لتقييم جدارة الباحث!"
], title_color=RED_ACCENT, badge="الحدود المنهجية")

add_speaker_notes(s22, """[التوقيت المقترح: 01:24 - 01:28]
• إبراز النضج الفكري للباحث في فهم المؤشرات: المؤشرات أدوات قياس وليست غايات بحد ذاتها.
• تحذير من مقارنة باحث في قسم الأشعة أو الصيدلة بزميل له في قسم الرياضيات أو القانون باستخدام h-index المجرد.""")

# ==============================================================================
# SLIDE 23: I10 & TOTAL CITATIONS
# ==============================================================================
s23 = prs.slides.add_slide(blank_layout)
add_bg(s23, BG_LIGHT)
add_header(s23, "مؤشر i10-index وإجمالي الاستشهادات (Total Citations)")

c23_1 = create_card(s23, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8))
add_card_content(c23_1, "مؤشر i10-index الخاص بـ Google Scholar", [
    "ابتكرته شركة Google عام 2011 لمرافقة مؤشر هيرش.",
    "التعريف: عدد الأوراق البحثية للباحث التي نال كل منها (10) استشهادات على الأقل.",
    "مؤشر بسيط وسهل الفهم لقياس عدد الأبحاث ذات الأثر الملموس.",
    "يساعد الباحثين الشباب وحديثي التخرج في إبراز أثر أبحاثهم سريعاً قبل تضخم معامل h.",
    "يظهر مباشرة في لوحة معلومات حسابك على Google Scholar."
], title_color=NAVY_DEEP, badge="مؤشر i10")

c23_2 = create_card(s23, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c23_2, "إجمالي الاستشهادات ومعدل النمو السنوي", [
    "إجمالي الاستشهادات (Total Citations): المجموع الكلي لكل استشهاد نالته أي ورقة منسوبة لك.",
    "الرسم البياني السنوي: يظهر مسار نمو تأثيرك العلمي وتصاعد الاهتمام بأبحاثك.",
    "استشهادات آخر 5 سنوات (Since 2021): معيار حيوي يوضح حداثة نشاطك البحثي الحالي.",
    "الأبحاث قاطرة الاستشهاد (Citation Engines): عادة ما تمثل 20% من أبحاث الباحث أكثر من 80% من مجموع استشهاداته الكلي (مبدأ باريتو)."
], title_color=TEAL_EMERALD, badge="مجموع الاقتباسات")

add_speaker_notes(s23, """[التوقيت المقترح: 01:28 - 01:31]
• توضيح كيف يقرأ المقيمون لوحة Google Scholar: ينظرون للـ h-index ولإجمالي الاستشهادات ولعمود 'Since 2021' لمعرفة هل الباحث ما زال نشطاً أم أن أبحاثه قديمة.""")

# ==============================================================================
# SLIDE 24: FWCI IN SCOPUS
# ==============================================================================
s24 = prs.slides.add_slide(blank_layout)
add_bg(s24, BG_LIGHT)
add_header(s24, "مؤشر الاقتباس الموزون حقلياً (FWCI): المعيار الذهبي في Scopus")

c24_1 = create_card(s24, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8), bg_color=HIGHLIGHT_BG, border_color=TEAL_EMERALD)
add_card_content(c24_1, "ما هو مؤشر FWCI ولماذا هو الأعدل؟", [
    "Field-Weighted Citation Impact (FWCI): المؤشر المعتمد لدى Elsevier وهيئة تقويم التعليم (ETEC).",
    "يقارن عدد الاستشهادات التي نالها بحثك بالمتوسط العالمي المتوقع لأبحاث من نفس:",
    "  1. التخصص الدقيق (Subject Area).",
    "  2. نوع الوثيقة (مقالة، مراجعة، مؤتمر).",
    "  3. سنة النشر (Year of Publication).",
    "قيمة (1.00) تعني أن بحثك يؤدي تماماً عند المتوسط العالمي لإنتاج العالم في تخصصك.",
    "قيمة (1.50) تعني أن بحثك استُشهد به بنسبة 50% أكثر من المتوسط العالمي!"
], title_color=TEAL_EMERALD, badge="المعيار العادل")

c24_2 = create_card(s24, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c24_2, "تطبيقات FWCI في ترقيات ودعم جامعة طيبة", [
    "يحل مشكلة المقارنة الظالمة بين التخصصات الطبية والهندسية والإنسانية.",
    "تعتمد عليه تصنيفات الجامعات (THE World University Rankings) لقياس جودة البحث.",
    "استهداف مؤشر FWCI > 1.20 في أبحاثك يضعك ضمن نخبة الباحثين المؤثرين عالمياً.",
    "أوراق المراجعة المنهجية (Systematic Reviews) والأوراق ذات التعاون الدولي تحقق عادة أعلى معدلات FWCI."
], title_color=NAVY_DEEP, badge="الأثر المؤسسي")

add_speaker_notes(s24, """[التوقيت المقترح: 01:31 - 01:34]
• التأكيد على أن FWCI هو المقياس الأكثر إنصافاً عند تقييم الباحثين في لجان الجوائز والترقيات المؤسسية.
• إيضاح أن استشهاداً واحداً في ورقة متخصصة في الرياضيات قد يمنح FWCI = 2.5، بينما 10 استشهادات في ورقة طب عام قد تمنح FWCI = 1.1.""")

# ==============================================================================
# SLIDE 25: ALTMETRICS
# ==============================================================================
s25 = prs.slides.add_slide(blank_layout)
add_bg(s25, BG_LIGHT)
add_header(s25, "المؤشرات البديلة (Altmetrics): قياس الحضور المجتمعي والسياسي")

c25_1 = create_card(s25, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8))
add_card_content(c25_1, "ما وراء الاستشهادات الأكاديمية التقليدية", [
    "الاستشهادات في المجلات تحتاج عادة من سنة إلى 3 سنوات لتظهر في Scopus و WoS.",
    "المؤشرات البديلة (Alternative Metrics - Altmetrics): ترصد التأثير الفوري لبحثك عبر:",
    "  • الاستشهاد في وثائق السياسات الحكومية ومنظمة الصحة العالمية (Policy Documents).",
    "  • براءات الاختراع والتطبيقات الصناعية المعتمدة (Patents).",
    "  • التغطيات الإعلامية والصحف العالمية المرموقة (News Mentions).",
    "  • التفاعل عبر شبكات التواصل (X / Twitter, LinkedIn, Wikipedia).",
    "  • الحفظ في منصات إدارة المراجع مثل Mendeley."
], title_color=NAVY_DEEP, badge="الأثر الشامل")

c25_2 = create_card(s25, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c25_2, "شعار Altmetric Donut وألوانه", [
    "دونات الألتمركس متعددة الألوان؛ كل لون يمثل مصدراً مختلفاً للأثر:",
    "  • الأزرق الداكن: تويتر / إكس.",
    "  • الأحمر: الأخبار والصحف العالمية.",
    "  • الأخضر الفاتح: ويكيبيديا.",
    "  • البنفسجي: وثائق السياسات وصناع القرار.",
    "ارتفاع مؤشر Altmetric يعطي إشارة مبكرة قوية بأن البحث سينال استشهادات أكاديمية عالية مستقبلاً."
], title_color=GOLD_ACCENT, badge="دونات الألتمركس")

add_speaker_notes(s25, """[التوقيت المقترح: 01:34 - 01:37]
• إيضاح أن صناع القرار وهيئات التمويل تركز اليوم على الأثر المجتمعي (Societal Impact): هل بقي بحثك حبيس الأدراج أم أثر في خطة علاجية أو قرار وزاري؟
• الإشارة إلى أن شارة Altmetric تظهر بجانب الأوراق في معظم المجلات الكبرى.""")

# ==============================================================================
# SLIDE 26: H-INDEX DYNAMIC SIMULATOR
# ==============================================================================
s26 = prs.slides.add_slide(blank_layout)
add_bg(s26, BG_LIGHT)
add_header(s26, "نشاط عملي (5): المختبر التفاعلي لحساب معامل h ومحاكاة القفزات")

c26_1 = create_card(s26, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8), bg_color=HIGHLIGHT_BG, border_color=TEAL_EMERALD)
add_card_content(c26_1, "مهام المختبر التفاعلي في تطبيق الويب", [
    "توجه إلى نافذة: [المختبر التفاعلي لحساب معامل h] في تطبيق الويب.",
    "المهمة 1: تحريك أشرطة الاستشهاد للأوراق الـ 10 الافتراضية وملاحظة حركة خط العتبة (Threshold Line).",
    "المهمة 2: اختبار حالة الهضبة (Plateau): زيادة استشهادات الورقة الأولى من 50 إلى 100 وملاحظة ثبات h-index!",
    "المهمة 3: تفعيل مؤشر [الورقة الذهبية المستهدفة]: اكتشف الورقة التي يفصلها استشهاد واحد فقط عن رفع معاملك بالكامل.",
    "المهمة 4: إدخال بيانات أبحاثك الحقيقية لرؤية خارطة طريقك لرفع المعامل في المرحلة القادمة."
], title_color=TEAL_EMERALD, badge="مختبر المحاكاة - 6 دقائق")

c26_2 = create_card(s26, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c26_2, "الاستراتيجية الذهبية لرفع معامل h", [
    "قاعدة التركيز الذكي: لا توزع جهدك الترويجي عشوائياً.",
    "حدد أوراقك البحثية التي تقع تحت خط الـ h-index مباشرة بفارق استشهاد أو اثنين.",
    "قم بتنشيط هذه الأوراق المحددة بمشاركتها في المؤتمرات وعبر LinkedIn وإرسالها للمتخصصين في مجالك.",
    "كل استشهاد جديد تحصده هذه الورقة الذهبية يرفع معامل هيرش لحسابك بالكامل درجة كاملة!"
], title_color=NAVY_DEEP, badge="الاستراتيجية الذكية")

add_speaker_notes(s26, """[التوقيت المقترح: 01:37 - 01:43]
• توجيه المتدربين لفتح حاسبة h-index التفاعلية في التطبيق.
• متابعة المتدربين أثناء سحب الأشرطة: ليرى الجميع بأعينهم متى يقفز المعامل وكيف تبرز 'الورقة الذهبية' بلون أخضر مميز.""")

# ==============================================================================
# SLIDE 27: SECTION 3 BREAKER
# ==============================================================================
make_section_slide(
    title="المحطة الثالثة: استراتيجيات مضاعفة الاستشهاد والشراكات الدولية",
    subtitle="الوصول المفتوح • تحسين محركات البحث الأكاديمية (SEO) • بناء شبكات التعاون",
    module_num="03",
    time_range="15 دقيقة",
    description=[
        "استثمار ميزة الوصول المفتوح (Open Access Advantage) لرفع القراءات.",
        "هندسة العناوين والملخصات لزيادة الاكتشاف في محركات البحث الأكاديمية.",
        "استراتيجيات تشكيل وتوسيع شبكات التعاون والفرق البحثية الدولية."
    ],
    notes="""[التوقيت المقترح: 01:43 - 01:45]
• ننتقل للمحطة الثالثة: كيف نجعل الأبحاث التي ننشرها تُقرأ وتُقتبس عالمياً؟
• النشر وحده لا يكفي؛ العالم ينشر يومياً آلاف الأوراق، والبحث الجيد الذي لا يُرى كأنه لم يُكتب!"""
)

# ==============================================================================
# SLIDE 28: OPEN ACCESS ADVANTAGE
# ==============================================================================
s28 = prs.slides.add_slide(blank_layout)
add_bg(s28, BG_LIGHT)
add_header(s28, "ميزة الوصول المفتوح (The Open Access Citation Advantage)")

c28_1 = create_card(s28, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8))
add_card_content(c28_1, "حقائق مثبتة بالأرقام حول الوصول المفتوح", [
    "الأبحاث المنشورة بنظام الوصول المفتوح (Open Access) تنال استشهادات أكثر بنسبة تتراوح بين 30% إلى 200% مقارنة بالأبحاث المغلقة المدفوعة.",
    "تحصل على عدد تحميلات وقراءات (Downloads / Views) أعلى بما يعادل 4 أضعاف.",
    "تنتشر بين الباحثين في الدول النامية والجامعات التي لا تملك اشتراكات سنوية مكلفة في دور النشر.",
    "تخدم مستهدفات جامعة طيبة في سرعة تداول المعرفة والمشاركة العلمية العالمية."
], title_color=NAVY_DEEP, badge="تفوق الوصول المفتوح")

c28_2 = create_card(s28, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c28_2, "مسارات الوصول المفتوح وخيارات الباحث", [
    "الوصول المفتوح الذهبي (Gold OA): نشر الورقة في مجلة مفتوحة بالكامل وتكون متاحة للجميع فوراً.",
    "الوصول المفتوح الأخضر (Green OA / Self-archiving):",
    "  • نشر البحث في مجلة اشتراكات تقليدية بدون دفع أي رسوم.",
    "  • ثم إيداع نسخة المؤلف المقبولة (AAM) في مستودع جامعة طيبة الرقمي أو مستودعات التخصص (مثل arXiv و bioRxiv و SSRN).",
    "الوصول المفتوح الماسي (Diamond OA): مجلات مفتوحة بالكامل مدعومة ومجانية للمؤلف والقارئ معاً."
], title_color=TEAL_EMERALD, badge="المسارات الثلاثة")

add_speaker_notes(s28, """[التوقيت المقترح: 01:45 - 01:48]
• الإشارة إلى الدعم الذي تقدمه جامعة طيبة والجامعات السعودية لاتفاقيات النشر المفتوح (Transformative Agreements) مع دور النشر مثل Springer و Wiley عبر المكتبة الرقمية السعودية (SDL).
• تشجيع الباحثين على استغلال النشر المفتوح المدعوم دون دفع رسوم شخصية.""")

# ==============================================================================
# SLIDE 29: ACADEMIC SEO
# ==============================================================================
s29 = prs.slides.add_slide(blank_layout)
add_bg(s29, BG_LIGHT)
add_header(s29, "تحسين محركات البحث الأكاديمية (Academic SEO)")

c29_1 = create_card(s29, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8))
add_card_content(c29_1, "كيف تبحث خوارزميات Scholar و PubMed؟", [
    "صياغة عنوان البحث (Article Title):",
    "  • ضع الكلمات المفتاحية الرئيسية في أول 65 حرفاً من العنوان.",
    "  • تجنب العناوين الغامضة أو الشعرية؛ استخدم عناوين تصف المشكلة والمنهجية والنتيجة بدقة.",
    "  • مثال ضعيف: (A Novel Insight into Healing) | مثال ممتاز: (Comparative Efficacy of Low-Dose CT vs MRI in Early Detection of Spinal Injuries: A Multicenter Cohort).",
    "الملخص التنفيذي (Structured Abstract):",
    "  • تكرار المصطلحات المفتاحية بذكاء وطبيعية (3 إلى 4 مرات) في الملخص.",
    "  • توضيح سياق الدراسة والأدوات المستخدمة والنتائج القابلة للاقتباس المباشر."
], title_color=NAVY_DEEP, badge="هندسة المحتوى")

c29_2 = create_card(s29, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c29_2, "اختيار الكلمات المفتاحية (Keywords)", [
    "لا تكرر الكلمات الموجودة بالفعل في العنوان؛ استغل حقل الكلمات المفتاحية لمصطلحات بديلة ومرادفات يبحث بها الآخرون.",
    "استخدم المكانز الطبية والعلمية المعتمدة (مثل MeSH في الطب والعلوم الصحية).",
    "فحص العبارات الأكثر بحثاً في تخصصك عبر Google Trends و Scholar Metrics.",
    "كلما كان ظهور بحثك في الصفحة الأولى لنتائج البحث أعلى، تضاعفت احتمالية اقتباسه!"
], title_color=TEAL_EMERALD, badge="الكلمات المفتاحية")

add_speaker_notes(s29, """[التوقيت المقترح: 01:48 - 01:52]
• ضرب أمثلة من التخصص الطبي (تقنية الأشعة والتصوير الطبي) وكيف أن العنوان الدقيق المبني على SEO يجذب استشهادات من باحثين حول العالم.
• التمهيد لمختبر الذكاء الاصطناعي: كيف سيساعدنا Gemini Flash في تحسين عناوين مسوداتنا في ثوانٍ!""")

# ==============================================================================
# SLIDE 30: INTERNATIONAL COLLABORATION
# ==============================================================================
s30 = prs.slides.add_slide(blank_layout)
add_bg(s30, BG_LIGHT)
add_header(s30, "بناء شبكات التعاون والفرق البحثية الدولية")

c30_1 = create_card(s30, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8))
add_card_content(c30_1, "قوة النشر الدولي المشترك (International Co-authorship)", [
    "الأبحاث التي تضم مؤلفين دوليين من عدة دول تحظى بـ 3 أضعاف الاستشهادات مقارنة بالأبحاث المحلية الفردية.",
    "مؤشر رئيسي في تصنيف الجامعات (International Research Network - IRN).",
    "تكامل الخبرات والموارد: الوصول إلى مختبرات متقدمة، عينات نادرة، وحسابات سحابية فائقة.",
    "توسيع دائرة الاقتباس الجغرافي: أبحاثك تصبح معروفة ومقروءة في جامعات شركائك في أوروبا وأمريكا وآسيا."
], title_color=NAVY_DEEP, badge="أثر التعاون")

c30_2 = create_card(s30, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c30_2, "كيف تستقطب شريكاً بحثياً دولياً مرموقاً؟", [
    "1. الاستكشاف الذكي: استخدم Scopus و Scholar لتحديد الباحثين الرواد في تخصصك الدقيق.",
    "2. تحديد نقطة التقاء واقعية: ما القيمة المضافة التي ستقدمها لمجموعتهم؟ (بيانات محلية فريدة، عينات مرضى، تمويل مشترك، أو تحليل تقني متخصص).",
    "3. الخطاب الاحترافي المقنع (Pitch Email): خطاب مقتضب ومباشر يشيد بآخر أوراقهم ويقترح مشروعاً محدداً بوضوح.",
    "4. سنطبق الآن صياغة هذا الخطاب باحترافية عبر مختبر الذكاء الاصطناعي الموجه."
], title_color=GOLD_ACCENT, badge="خطوات الشراكة")

add_speaker_notes(s30, """[التوقيت المقترح: 01:52 - 01:56]
• التأكيد على أهمية المبادرة: لا تنتظر أن يطرق أحد بابك؛ الباحثون الكبار يرحبون دائماً بالأفكار الجادة والبيانات القيمة.
• التنبيه على ضرورة تجنب الرسائل المعممة الباهتة (Spam) وكتابة رسائل مخصصة بدقة.""")

# ==============================================================================
# SLIDE 31: SECTION 4 BREAKER
# ==============================================================================
make_section_slide(
    title="المحطة الرابعة: مختبر الذكاء الاصطناعي التوليدي المنضبط",
    subtitle="Google AI Studio • Gemini Flash • الأوامر الموجهة المقيدة (Prompt Guardrails)",
    module_num="04",
    time_range="20 دقيقة",
    description=[
        "حوكمة استخدام الذكاء الاصطناعي في البحث الأكاديمي وضمان النزاهة العلمية.",
        "توظيف الأوامر الموجهة المقيدة بملء الفراغات لمنع الهلوسة وإساءة الاستخدام.",
        "تطبيق 4 أدوات ذكية: محسّن العناوين، الملخص التبسيطي، خطاب الشراكة، وخطة الترويج.",
        "تجربة حية متكاملة داخل تطبيق الويب بنموذج Gemini Flash."
    ],
    notes="""[التوقيت المقترح: 01:56 - 01:58]
• ننتقل للمحطة الرابعة: الابتكار والذكاء الاصطناعي التوليدي.
• الذكاء الاصطناعي أداة تمكين جبارة، ولكن سوء استخدامه قد يهدد النزاهة العلمية.
• سنشاهد كيف بنينا في تطبيق الويب بيئة ذكاء اصطناعي منضبطة ومحكومة بقوالب دقيقة تخدم أهداف الباحث تماماً."""
)

# ==============================================================================
# SLIDE 32: CONTROLLED AI & PROMPT GUARDRAILS
# ==============================================================================
s32 = prs.slides.add_slide(blank_layout)
add_bg(s32, BG_LIGHT)
add_header(s32, "حوكمة الذكاء الاصطناعي: الأوامر الموجهة المقيدة (Prompt Guardrails)")

c32_1 = create_card(s32, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8))
add_card_content(c32_1, "مبدأ النزاهة والحد من إساءة الاستخدام", [
    "الذكاء الاصطناعي ليس مؤلفاً بديلاً (Author)، ولا يمتلك الأهلية الأخلاقية للأصالة.",
    "الاستخدام السليم: مساعد بحثي استشاري لتحسين الصياغة، التدقيق، وتحليل القنوات والترويج.",
    "مخاطر المدخلات الحرة المفتوحة في الورش التدريبية:",
    "  • استهلاك غير منضبط للحصص (API Quota).",
    "  • الحصول على مخرجات مضللة أو هلوسة (Hallucination) غير أكاديمية.",
    "الحل المعتمد في تطبيقنا: الأوامر الموجهة المقيدة والمغلقة (Locked Prompt Templates)."
], title_color=NAVY_DEEP, badge="النزاهة الأكاديمية")

c32_2 = create_card(s32, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8), bg_color=HIGHLIGHT_BG, border_color=TEAL_EMERALD)
add_card_content(c32_2, "كيف تعمل قوالبنا المقيدة في التطبيق؟", [
    "الأمر الموجه الأساسي (System Prompt) مصمم مسبقاً ومحكم أكاديمياً ومغلق من التعديل.",
    "المتدرب يطلب منه فقط ملء فراغات محددة تناسب بحثه وتخصصه:",
    "  • [التخصص الدقيق] + [عنوان المسودة] + [الكلمات المفتاحية] + [الجهة المستهدفة].",
    "يتم دمج مدخلاتك داخل القالب الآمن وإرسالها لنموذج Gemini Flash عبر الخادم بأمان.",
    "تحصل على نتائج أكاديمية منضبطة وعالية الجودة متوافقة مع معايير النشر العالمي."
], title_color=TEAL_EMERALD, badge="منهجية العمل")

add_speaker_notes(s32, """[التوقيت المقترح: 01:58 - 02:02]
• توضيح فلسفة التصميم: حرصنا على حماية مفتاح الـ API والحد من أي إساءة استخدام عبر توفير قوالب محكمة.
• المتدرب يركز في جوهر تخصصه دون أن يتشتت في كتابة برومبت طويل قد لا يفي بالغرض.""")

# ==============================================================================
# SLIDE 33: AI TOOL 1 - SEO
# ==============================================================================
s33 = prs.slides.add_slide(blank_layout)
add_bg(s33, BG_LIGHT)
add_header(s33, "أداة AI (1): مُحسّن العناوين والكلمات المفتاحية (Academic SEO)")

c33_1 = create_card(s33, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8), bg_color=HIGHLIGHT_BG, border_color=TEAL_EMERALD)
add_card_content(c33_1, "مهام الأداة في تطبيق الويب", [
    "انتقل إلى نافذة: [مختبر الذكاء الاصطناعي] وافتح [أداة تحسين العنوان والكلمات].",
    "الفراغات المطلوبة منك:",
    "  1. تخصصك الدقيق (مثال: تقنية الأشعة والتصوير المقطعي).",
    "  2. العنوان المقترح أو فكرة البحث الحالية.",
    "  3. الكلمات المفتاحية الأساسية في دراستك.",
    "اضغط على زر [توليد الخيارات المحسنة عبر Gemini Flash].",
    "المخرجات:",
    "  • 3 صياغات بديلة للعناوين مصنفة حسب الجاذبية وسهولة الاسترجاع في Scholar.",
    "  • قائمة كلمات مفتاحية استراتيجية (MeSH) مقترحة لزيادة الاقتباس."
], title_color=TEAL_EMERALD, badge="تطبيق عملي - 4 دقائق")

c33_2 = create_card(s33, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c33_2, "القيمة المضافة للأداة", [
    "تحويل العناوين الوصفية السردية إلى عناوين محددة الأثر والنتائج.",
    "ضمان مطابقة الكلمات لأحدث مصطلحات الفهرسة العالمية.",
    "توفير وقت الباحث في صياغة العناوين التنافسية المناسبة للمجلات من الفئة الأولى (Q1).",
    "إمكانية نسخ النتائج وحفظها في خطتك الشخصية بنقرة زر واحدة."
], title_color=NAVY_DEEP, badge="الفائدة البحثية")

add_speaker_notes(s33, """[التوقيت المقترح: 02:02 - 02:06]
• دعوة المتدربين لفتح الأداة الأولى وتجربة إدخال عنوان بحث حقيقي يعملون عليه حالياً.
• الإشارة إلى سرعة استجابة نموذج Gemini Flash وجودة الخيارات المقترحة.""")

# ==============================================================================
# SLIDE 34: AI TOOL 2 - LAY SUMMARY
# ==============================================================================
s34 = prs.slides.add_slide(blank_layout)
add_bg(s34, BG_LIGHT)
add_header(s34, "أداة AI (2): مُولّد الملخص التبسيطي للجمهور والإعلام (Lay Summary)")

c34_1 = create_card(s34, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8), bg_color=HIGHLIGHT_BG, border_color=TEAL_EMERALD)
add_card_content(c34_1, "مهام الأداة في تطبيق الويب", [
    "انتقل إلى: [أداة الملخص التبسيطي ونشر الأثر المجتمعي].",
    "الفراغات المطلوبة منك:",
    "  1. التخصص والجمهور المستهدف (إعلاميون، عموم المجتمع، أو صناع قرار).",
    "  2. ملخص البحث التقني أو الفكرة الجوهرية للنتائج.",
    "اضغط على [توليد الملخص التبسيطي].",
    "المخرجات:",
    "  • ملخص علمي مبسط ومحكم بلغة واضحة خالية من التعقيد الاصطلاحي الجاف.",
    "  • مسودة منشور احترافي جاهز للمشاركة على منصة LinkedIn و X.",
    "  • بيان بأهمية البحث للرأي العام والتطبيق العملي في المجتمع."
], title_color=TEAL_EMERALD, badge="تطبيق عملي - 4 دقائق")

c34_2 = create_card(s34, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c34_2, "لماذا يحتاج الباحث للملخص التبسيطي؟", [
    "تطلبه كبرى دور النشر والمجلات المرموقة اليوم (مثل Elsevier و PNAS).",
    "المفتاح الأول لرفع مؤشرات Altmetrics وجذب التغطيات الصحفية.",
    "يمكن صناع القرار في وزارة الصحة أو التعليم من الاستفادة من مخرجاتك.",
    "إبراز جهود جامعة طيبة في خدمة المجتمع وحل التحديات الوطنية."
], title_color=NAVY_DEEP, badge="الأثر المجتمعي")

add_speaker_notes(s34, """[التوقيت المقترح: 02:06 - 02:10]
• توضيح أن معظم أفراد المجتمع والإعلاميين لا يقرأون الأوراق البحثية المعقدة، والملخص التبسيطي هو الجسر الذي ينقل العلم من الدوريات إلى المجتمع.""")

# ==============================================================================
# SLIDE 35: AI TOOL 3 - COLLABORATION PITCH
# ==============================================================================
s35 = prs.slides.add_slide(blank_layout)
add_bg(s35, BG_LIGHT)
add_header(s35, "أداة AI (3): صانع خطابات الشراكات الدولية (Collaboration Pitch)")

c35_1 = create_card(s35, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8), bg_color=HIGHLIGHT_BG, border_color=TEAL_EMERALD)
add_card_content(c35_1, "مهام الأداة في تطبيق الويب", [
    "انتقل إلى: [أداة صانع خطابات استقطاب الشراكات الدولية].",
    "الفراغات المطلوبة منك:",
    "  1. اسم الباحث أو المختبر الدولي المستهدف وجهته الأكاديمية.",
    "  2. موضوع أو ورقة الباحث التي أثارت اهتمامك وتريد البناء عليها.",
    "  3. ما الذي تقدمه أنت ومجموعتك البحثية بجامعة طيبة كقيمة مضافة.",
    "اضغط على [صياغة خطاب الشراكة الاحترافي بالإنجليزية].",
    "المخرجات:",
    "  • رسالة بريد إلكتروني أكاديمية محكمة باللغة الإنجليزية وفق التقاليد الجامعية العالمية، مقتضبة وواضحة وجاذبة للرد والتعاون."
], title_color=TEAL_EMERALD, badge="تطبيق عملي - 4 دقائق")

c35_2 = create_card(s35, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c35_2, "معايير الخطاب الناجح المقبول عالمياً", [
    "الابتعاد عن التملق المبالغ فيه؛ التركيز على الاحترام العلمي والمشترك البحثي.",
    "الوضوح في طلب الاجتماع الافتراضي الأولي (مثال: لقاء 15 دقيقة عبر Zoom).",
    "إبراز الإمكانات الحقيقية والتزام جامعة طيبة بدعم المشاريع النوعية.",
    "تجنب الرسائل الطويلة المجهدة؛ الخطاب الفعال لا يتجاوز 250 إلى 300 كلمة."
], title_color=GOLD_ACCENT, badge="البروتوكول الأكاديمي")

add_speaker_notes(s35, """[التوقيت المقترح: 02:10 - 02:14]
• التأكيد على تجربة كتابة رسالة باللغة الإنجليزية عبر الأداة، وملاحظة كيف يوظف Gemini Flash المصطلحات الأكاديمية اللبقة التي تفتح الأبواب للتعاون الدولي.""")

# ==============================================================================
# SLIDE 36: AI TOOL 4 - DISSEMINATION PLAN
# ==============================================================================
s36 = prs.slides.add_slide(blank_layout)
add_bg(s36, BG_LIGHT)
add_header(s36, "أداة AI (4): خطة الترويج الرقمي للبحث بعد القبول")

c36_1 = create_card(s36, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8), bg_color=HIGHLIGHT_BG, border_color=TEAL_EMERALD)
add_card_content(c36_1, "مهام الأداة في تطبيق الويب", [
    "انتقل إلى: [أداة خطة الترويج والنشر بعد القبول].",
    "الفراغات المطلوبة منك:",
    "  1. نوع الورقة (بحث أصيل Original / مراجعة Review / تقرير حالة Case Report).",
    "  2. حالة النشر (وصول مفتوح OA أو اشتراكات تقليدية).",
    "  3. المنصات المتوفرة لديك (ORCID, RG, LinkedIn, مستودع الجامعة).",
    "اضغط على [توليد خطة الترويج الزمنية].",
    "المخرجات:",
    "  • جدول زمني تفصيلي للمهام التسويقية للبحث: الأسبوع 1، الشهر 1، والشهر 3.",
    "  • قائمة بالوسوم والشبكات والمستودعات المناسبة لطبيعة بحثك."
], title_color=TEAL_EMERALD, badge="تطبيق عملي - 4 دقائق")

c36_2 = create_card(s36, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c36_2, "الترويج العلمي ليس تفاخراً بل واجب!", [
    "نشر البحث هو بداية الرحلة وليس نهايتها.",
    "واجبك كباحث إيصال المعرفة لمن يحتاجها من الأطباء والعلماء وصناع القرار.",
    "الأبحاث التي تتبع خطة ترويجية منتظمة تتضاعف استشهاداتها في أول سنتين.",
    "الحفاظ على حضورك النشط يجعلك مرجعاً موثوقاً للصحافة والمجلات كمحكم ومستشار."
], title_color=NAVY_DEEP, badge="الواجب المعرفي")

add_speaker_notes(s36, """[التوقيت المقترح: 02:14 - 02:18]
• تشجيع الباحثين على تبني عقلية 'ما بعد القبول': النشر دون نشر ترويجي كمن يصنع دواءً ويخبئه في الخزانة!""")

# ==============================================================================
# SLIDE 37: SECTION 5 BREAKER
# ==============================================================================
make_section_slide(
    title="المحطة الخامسة: خطة العمل الفردية والختام",
    subtitle="خطة الـ 30 يوماً • تقرير النضج الرقمي الشخصي • التوصيات المستدامة",
    module_num="05",
    time_range="05 دقائق",
    description=[
        "صياغة واعتماد خطة العمل الشخصية للـ 30 يوماً الأولى بعد الورشة.",
        "تصدير تقرير النضج الرقمي وخريطة الطريق الفردية بصيغة جاهزة للطباعة.",
        "الاستبيان التقييمي للورشة واعتماد التوصيات الختامية وتوزيع قنوات التواصل."
    ],
    notes="""[التوقيت المقترح: 02:18 - 02:20]
• وصلنا للمحطة الختامية: تحويل كل ما تعلمناه إلى خطة عمل شخصية قابلة للتنفيذ.
• ننتقل إلى شاشة إصدار التقرير والشهادة التفاعلية في تطبيق الويب."""
)

# ==============================================================================
# SLIDE 38: 30-DAY CHECKLIST
# ==============================================================================
s38 = prs.slides.add_slide(blank_layout)
add_bg(s38, BG_LIGHT)
add_header(s38, "خطة العمل للـ 30 يوماً الأولى بعد الورشة (Checklist)")

c38_1 = create_card(s38, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8))
add_card_content(c38_1, "الأسبوع الأول: التأسيس والتوثيق الموحد", [
    "اليوم 1 - 2: إنشاء حساب ORCID أو تدقيقه وإضافة انتساب جامعة طيبة وضبط الخصوصية على 'Everyone'.",
    "اليوم 3 - 4: الدخول إلى Google Scholar، توثيق إيميل الجامعة (@taibahu.edu.sa)، دمج الأبحاث المكررة، وجعل الملف عاماً.",
    "اليوم 5: تفعيل حساب ResearchGate وإضافة الاهتمامات البحثية وطلب الانضمام لقسمك العلمي بالجامعة.",
    "اليوم 6 - 7: البحث في Scopus عن وجود أي ملفات منقسمة وتقديم طلب الدمج الفوري."
], title_color=NAVY_DEEP, badge="الأسبوع 1: التأسيس")

c38_2 = create_card(s38, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c38_2, "الأسابيع 2 إلى 4: الانطلاق والأثر", [
    "الأسبوع 2: إيداع نسخ أبحاثك المقبولة (AAM) في المستودعات المفتوحة المتوافقة مع Sherpa Romeo.",
    "الأسبوع 3: تحديد 'الورقة الذهبية' الأقرب لرفع معامل h-index وصياغة ملخص تبسيطي لها عبر أدوات الذكاء الاصطناعي ومشاركتها في LinkedIn.",
    "الأسبوع 4: تحديد باحثين دوليين مرموقين في مجالك وصياغة أول خطاب استقطاب شراكة بحثية.",
    "اليوم 30: إعادة قياس نضجك الرقمي والاحتفال بالانتقال إلى فئة 'الباحث المتميز'!"
], title_color=TEAL_EMERALD, badge="الأسابيع 2-4: الأثر")

add_speaker_notes(s38, """[التوقيت المقترح: 02:20 - 02:24]
• استعراض قائمة الـ 30 يوماً والتأكيد على أن تطبيق خطوة واحدة كل يومين يضمن الوصول إلى قمة الحضور الرقمي دون أي ضغط أو عناء.""")

# ==============================================================================
# SLIDE 39: EXPORT PERSONAL ACTION PLAN
# ==============================================================================
s39 = prs.slides.add_slide(blank_layout)
add_bg(s39, BG_LIGHT)
add_header(s39, "إصدار وثيقة خطة العمل الشخصية والشهادة من تطبيق الويب")

c39_1 = create_card(s39, Inches(6.5), Inches(1.6), Inches(5.8), Inches(4.8), bg_color=HIGHLIGHT_BG, border_color=TEAL_EMERALD)
add_card_content(c39_1, "خطوات إصدار وثيقتك الفردية الآن", [
    "انتقل إلى الشاشة الأخيرة في تطبيق الويب: [خطة العمل والتقييم الختامي].",
    "اكتب اسمك الثلاثي وقسمك العلمي وكلية انتسابك بجامعة طيبة.",
    "التطبيق سيجمع تلقائياً:",
    "  • نتيجة اختبار النضج الرقمي التي حصلت عليها في البداية.",
    "  • شارات إتمام المحاكيات الأربعة (ORCID, Scholar, RG, Scopus).",
    "  • ملخص مخرجاتك من مختبر الذكاء الاصطناعي.",
    "اضغط على زر [طباعة / حفظ خطة العمل الشخصية PDF].",
    "احتفظ بهذه الوثيقة كدليل إرشادي يوجهك في خطتك البحثية القادمة."
], title_color=TEAL_EMERALD, badge="التوثيق الشخصي")

c39_2 = create_card(s39, Inches(0.8), Inches(1.6), Inches(5.4), Inches(4.8))
add_card_content(c39_2, "أدلة الاستخدام لما بعد الورشة المتاحة بالتطبيق", [
    "التطبيق يظل متاحاً لك عبر الرابط السحابي مع موسوعة أدلة شاملة:",
    "  • الدليل المصور الكامل لتوثيق وحل مشكلات ORCID.",
    "  • دليل صيانة وتنظيف وتأكيد أبحاث Google Scholar.",
    "  • دليل سياسات النشر الأخضر وحقوق الناشرين في ResearchGate.",
    "  • دليل طلبات تصحيح ودعم Scopus و Clarivate.",
    "  • نماذج وقوالب جاهزة لمراسلات التعاون الأكاديمي الدولي."
], title_color=NAVY_DEEP, badge="الموسوعة المستمرة")

add_speaker_notes(s39, """[التوقيت المقترح: 02:24 - 02:27]
• توجيه جميع الزملاء للضغط على 'طباعة / حفظ التقرير' ليحتفظ كل متدرب بوثيقته وخريطة طريقه الفردية.""")

# ==============================================================================
# SLIDE 40: CLOSING & CONTACT
# ==============================================================================
s40 = prs.slides.add_slide(blank_layout)
add_bg(s40, BG_TITLE)

tb40 = s40.shapes.add_textbox(Inches(4.5), Inches(1.8), Inches(7.2), Inches(2.0))
tf40 = tb40.text_frame
tf40.word_wrap = True
p40_1 = tf40.paragraphs[0]
p40_1.text = "شكراً لحضوركم وتفاعلكم المتميز"
p40_1.font.size = Pt(32)
p40_1.font.bold = True
p40_1.font.color.rgb = WHITE
p40_1.alignment = PP_ALIGN.RIGHT
p40_1.font.name = "Arial"

p40_2 = tf40.add_paragraph()
p40_2.text = "معاً نبني حضوراً بحثياً عالمياً يعزز مكانة جامعة طيبة في مصاف الجامعات المرموقة"
p40_2.font.size = Pt(15)
p40_2.font.color.rgb = CYAN_ACCENT
p40_2.alignment = PP_ALIGN.RIGHT
p40_2.font.name = "Arial"
p40_2.space_before = Pt(8)

contact_box = create_card(s40, Inches(4.5), Inches(4.0), Inches(7.2), Inches(2.3), bg_color=DARK_CARD_BG, border_color=TEAL_EMERALD)
tf_c = contact_box.text_frame
tf_c.word_wrap = True
tf_c.margin_left = Inches(0.3)
tf_c.margin_right = Inches(0.3)
tf_c.margin_top = Inches(0.2)
p_c1 = tf_c.paragraphs[0]
p_c1.text = "د. عزت عمر عبدالله أبوعزه"
p_c1.font.size = Pt(16)
p_c1.font.bold = True
p_c1.font.color.rgb = WHITE
p_c1.alignment = PP_ALIGN.RIGHT
p_c1.font.name = "Arial"

p_c2 = tf_c.add_paragraph()
p_c2.text = "أستاذ مساعد - قسم تقنية الأشعة - كلية العلوم الطبية التطبيقية"
p_c2.font.size = Pt(12)
p_c2.font.color.rgb = CYAN_ACCENT
p_c2.alignment = PP_ALIGN.RIGHT
p_c2.font.name = "Arial"
p_c2.space_before = Pt(4)

p_c3 = tf_c.add_paragraph()
p_c3.text = "جامعة طيبة  |  المدينة المنورة  |  المملكة العربية السعودية"
p_c3.font.size = Pt(11)
p_c3.font.color.rgb = TEXT_MUTED
p_c3.alignment = PP_ALIGN.RIGHT
p_c3.font.name = "Arial"
p_c3.space_before = Pt(4)

p_c4 = tf_c.add_paragraph()
p_c4.text = "رابط منصة الورشة التفاعلية المستمرة متاح على خادم الـ VPS"
p_c4.font.size = Pt(12)
p_c4.font.bold = True
p_c4.font.color.rgb = GOLD_ACCENT
p_c4.alignment = PP_ALIGN.RIGHT
p_c4.font.name = "Arial"
p_c4.space_before = Pt(6)

add_speaker_notes(s40, """[التوقيت المقترح: 02:27 - 02:30 | الدقائق الختامية]
• توجيه خالص الشكر والتقدير لعمادة التطوير والجودة ولجميع الزملاء والزميلات على تفاعلهم البناء.
• تذكيرهم بأن بناء الحضور الرقمي هو مسار مستمر يبدأ بخطوات اليوم.
• فتح الباب للأسئلة الختامية وتمنياتي للجميع بمسيرة بحثية زاهرة ومؤثرة عالمياً.""")

# Save Presentation
output_filename = 'الهوية_الرقمية_الأكاديمية_والحضور_البحثي_العالمي.pptx'
prs.save(output_filename)
print(f"Presentation generated successfully with {len(prs.slides)} slides: {output_filename}")
