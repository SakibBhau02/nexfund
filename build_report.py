#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Build professional Bangladesh Investor Matching + Finance Consultancy report (.docx)"""
from docx import Document
from docx.shared import Pt, Inches, RGBColor, Emu
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.section import WD_SECTION
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
import datetime

OUT = r"E:\opencode02\nexfund\Bangladesh_Investor_Matching_Finance_Consultancy_Report_2026.docx"

ACCENT = RGBColor(0x0F, 0x4C, 0x5C)  # deep teal
ACCENT_HEX = "0F4C5C"
BODY_COLOR = RGBColor(0x1A, 0x1A, 0x1A)
GRAY = RGBColor(0x5A, 0x6C, 0x7D)
FONT = "Nirmala UI"

doc = Document()

# -- page setup
for sec in doc.sections:
    sec.top_margin = Inches(1)
    sec.bottom_margin = Inches(1)
    sec.left_margin = Inches(1)
    sec.right_margin = Inches(1)
    sec.header_distance = Inches(0.5)
    sec.footer_distance = Inches(0.5)

style = doc.styles['Normal']
style.font.name = FONT
style.font.size = Pt(11)
style.font.color.rgb = BODY_COLOR
style.paragraph_format.space_after = Pt(6)
style.paragraph_format.line_spacing = 1.15
style.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
# ensure Bangla font mapping
rPr = style.element.get_or_add_rPr()
rFonts = rPr.find(qn('w:rFonts'))
if rFonts is None:
    rFonts = OxmlElement('w:rFonts')
    rPr.append(rFonts)
rFonts.set(qn('w:ascii'), FONT)
rFonts.set(qn('w:hAnsi'), FONT)
rFonts.set(qn('w:cs'), FONT)
rFonts.set(qn('w:eastAsia'), FONT)

for i, (sz, before, after) in {1:(16,18,8),2:(13,14,6),3:(12,10,4)}.items():
    hs = doc.styles[f'Heading {i}']
    hs.font.name = FONT
    hs.font.size = Pt(sz)
    hs.font.bold = True
    hs.font.color.rgb = ACCENT
    hs.paragraph_format.space_before = Pt(before)
    hs.paragraph_format.space_after = Pt(after)
    hs.paragraph_format.keep_with_next = True
    rPr2 = hs.element.get_or_add_rPr()
    rf2 = rPr2.find(qn('w:rFonts'))
    if rf2 is None:
        rf2 = OxmlElement('w:rFonts'); rPr2.append(rf2)
    rf2.set(qn('w:ascii'), FONT); rf2.set(qn('w:hAnsi'), FONT); rf2.set(qn('w:cs'), FONT)

def add_para(text, bold=False, italic=False, size=11, color=BODY_COLOR, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=6, bullet=False):
    p = doc.add_paragraph()
    p.alignment = align
    p.paragraph_format.space_after = Pt(space_after)
    if bullet:
        p.style = 'List Bullet'
        p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    r = p.add_run(text)
    r.font.name = FONT
    r.font.size = Pt(size)
    r.bold = bold
    r.italic = italic
    r.font.color.rgb = color
    return p

def add_mixed_para(segments, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=6, bullet=False):
    """segments: list of (text, dict{b,i,size,color})"""
    p = doc.add_paragraph()
    p.alignment = align
    p.paragraph_format.space_after = Pt(space_after)
    if bullet:
        p.style = 'List Bullet'
    for txt, fmt in segments:
        r = p.add_run(txt)
        r.font.name = FONT
        r.font.size = Pt(fmt.get('size', 11))
        r.bold = fmt.get('b', False)
        r.italic = fmt.get('i', False)
        r.font.color.rgb = fmt.get('color', BODY_COLOR)
    return p

def shade_cell(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), hex_color)
    tcPr.append(shd)

def make_table(headers, rows, col_widths=None, title=None, source=None):
    if title:
        t = doc.add_paragraph()
        t.alignment = WD_ALIGN_PARAGRAPH.LEFT
        t.paragraph_format.space_before = Pt(10)
        t.paragraph_format.space_after = Pt(4)
        r = t.add_run(title)
        r.font.name = FONT; r.font.size = Pt(11); r.bold = True; r.font.color.rgb = ACCENT
    table = doc.add_table(rows=1, cols=len(headers))
    table.style = 'Light Grid Accent 1'
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = True
    hdr = table.rows[0].cells
    for j, h in enumerate(headers):
        hdr[j].text = ''
        p = hdr[j].paragraphs[0]
        run = p.add_run(h)
        run.font.name = FONT; run.font.size = Pt(9.5); run.bold = True
        run.font.color.rgb = RGBColor(0xFF,0xFF,0xFF)
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        shade_cell(hdr[j], ACCENT_HEX)
    for row in rows:
        cells = table.add_row().cells
        for j, val in enumerate(row):
            cells[j].text = ''
            p = cells[j].paragraphs[0]
            run = p.add_run(str(val))
            run.font.name = FONT; run.font.size = Pt(9.5)
            run.font.color.rgb = BODY_COLOR
            # numbers right align for last cols handled generically left
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    # alternating row shading
    for i, row in enumerate(table.rows[1:]):
        if i % 2 == 1:
            for c in row.cells:
                shade_cell(c, "EFF3F5")
    if col_widths:
        for j, w in enumerate(col_widths):
            for row in table.rows:
                row.cells[j].width = Inches(w)
    if source:
        s = doc.add_paragraph()
        s.alignment = WD_ALIGN_PARAGRAPH.LEFT
        s.paragraph_format.space_after = Pt(8)
        r = s.add_run(source)
        r.font.name = FONT; r.font.size = Pt(8.5); r.italic = True; r.font.color.rgb = GRAY
    doc.add_paragraph().paragraph_format.space_after = Pt(2)
    return table

def add_horizontal_line():
    p = doc.add_paragraph()
    pPr = p._p.get_or_add_pPr()
    pBdr = OxmlElement('w:pBdr')
    bottom = OxmlElement('w:bottom')
    bottom.set(qn('w:val'), 'single'); bottom.set(qn('w:sz'), '9')
    bottom.set(qn('w:space'), '1'); bottom.set(qn('w:color'), ACCENT_HEX)
    pBdr.append(bottom); pPr.append(pBdr)
    return p

def add_callout(text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    pPr = p._p.get_or_add_pPr()
    shd = OxmlElement('w:shd'); shd.set(qn('w:val'),'clear'); shd.set(qn('w:color'),'auto'); shd.set(qn('w:fill'),'EAF2F5')
    pPr.append(shd)
    r = p.add_run("  ▶  " + text)
    r.font.name = FONT; r.font.size = Pt(11); r.bold = True; r.font.color.rgb = ACCENT
    p.paragraph_format.space_before = Pt(6); p.paragraph_format.space_after = Pt(6)
    return p

def add_page_number_footer():
    footer = doc.sections[0].footer
    footer.is_linked_to_previous = False
    p = footer.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run("Bangladesh Investor Matching & Finance Consultancy — Market Research 2026  |  ")
    r.font.name = FONT; r.font.size = Pt(8); r.font.color.rgb = GRAY
    # PAGE field
    fld1 = OxmlElement('w:fldSimple'); fld1.set(qn('w:instr'), 'PAGE')
    r2 = OxmlElement('w:r'); r2_ = OxmlElement('w:t'); r2_.text = "1"
    r2.append(r2_); fld1.append(r2)
    p._p.append(fld1)

def add_header():
    header = doc.sections[0].header
    p = header.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    r = p.add_run("NexFund — Confidential  •  সেপ্টেম্বর ২০২৬")
    r.font.name = FONT; r.font.size = Pt(8); r.font.color.rgb = GRAY

def add_toc():
    p = doc.add_paragraph()
    run = p.add_run()
    fldChar1 = OxmlElement('w:fldChar'); fldChar1.set(qn('w:fldCharType'), 'begin')
    instr = OxmlElement('w:instrText'); instr.set(qn('xml:space'), 'preserve')
    instr.text = 'TOC \\o "1-2" \\h \\z \\u'
    fldChar2 = OxmlElement('w:fldChar'); fldChar2.set(qn('w:fldCharType'), 'end')
    run._r.append(fldChar1); run2 = p.add_run(); run2._r.append(instr)
    run3 = p.add_run(); run3._r.append(fldChar2)

# ================= COVER =================
add_header(); add_page_number_footer()
for _ in range(3):
    sp = doc.add_paragraph(); sp.paragraph_format.space_after = Pt(2)
    r = sp.add_run(""); r.font.size = Pt(6)

kicker = doc.add_paragraph(); kicker.alignment = WD_ALIGN_PARAGRAPH.CENTER
rk = kicker.add_run("BANGLADESH  •  MARKET INTELLIGENCE  •  SEPTEMBER 2026")
rk.font.name = FONT; rk.font.size = Pt(10); rk.bold = True; rk.font.color.rgb = ACCENT
rk.font.all_caps = True

title = doc.add_paragraph(); title.alignment = WD_ALIGN_PARAGRAPH.CENTER
rt = title.add_run("Investor Matching\nPlatform ও Finance Consultancy")
rt.font.name = FONT; rt.font.size = Pt(28); rt.bold = True; rt.font.color.rgb = ACCENT
title.paragraph_format.space_after = Pt(4)

sub = doc.add_paragraph(); sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
rs = sub.add_run("বাংলাদেশে কারা কাজ করে, মার্কেট সাইজ কত, SWOT কী — এবং নতুন entrant-এর জন্য করণীয়")
rs.font.name = FONT; rs.font.size = Pt(12); rs.font.color.rgb = BODY_COLOR
sub.paragraph_format.space_after = Pt(10)

add_horizontal_line()

meta = doc.add_paragraph(); meta.alignment = WD_ALIGN_PARAGRAPH.CENTER
rm = meta.add_run("প্রস্তুতকৃত: NexFund রিসার্চ টিম  •  সোর্স-ভেরিফাইড (2-source rule)  •  ডেটা কাট-অফ: সেপ্টেম্বর ২০২৬\n সিদ্ধান্ত-কেন্দ্রিক রিপোর্ট: মার্কেট এন্ট্রি / পজিশনিং / পার্টনারশিপ")
rm.font.name = FONT; rm.font.size = Pt(9.5); rm.font.color.rgb = GRAY

add_callout("মূল বার্তা: মার্কেট ছোট কিন্তু ফাঁকা — কোনো dominant investor-matching marketplace নেই; 2021 পিকের পর ফান্ডিং 90% কমেছে, এখন bank-backed $35M ফান্ড + SME গ্যাপই সবচেয়ে বড় সুযোগ।")

cov_note = doc.add_paragraph(); cov_note.alignment = WD_ALIGN_PARAGRAPH.CENTER
rn = cov_note.add_run("Word-এ খুলে F9 চাপলে Table of Contents auto-update হবে  •  সব সংখ্যার পাশে বছর + সোর্স দেওয়া")
rn.font.name = FONT; rn.font.size = Pt(8.5); rn.italic = True; rn.font.color.rgb = GRAY

doc.add_page_break()

# ================= TOC =================
h = doc.add_heading("সূচিপত্র", level=1)
add_toc()
tip = doc.add_paragraph()
rtip = tip.add_run("নোট: Microsoft Word-এ এই ফাইল খুলে F9 চাপুন — পেজ নম্বরসহ সূচি তৈরি হয়ে যাবে।")
rtip.font.name = FONT; rtip.font.size = Pt(8.5); rtip.italic = True; rtip.font.color.rgb = GRAY

# ================= EXEC SUMMARY =================
doc.add_heading("১. Executive Summary — সারসংক্ষেপ (শুধু এই পাতা পড়লেই সিদ্ধান্ত নেওয়া যাবে)", level=1)
add_mixed_para([
    ("Governing finding: ", {'b': True, 'color': ACCENT}),
    ("বাংলাদেশে investor-matching ও finance consultancy দুটি আলাদা maturity-তে আছে — consultancy ($150–200M/বছর) তুলনামূলক mature ও bank/merchant-bank dominated, আর startup investor-matching এখনো early, fragmented ও 93–99% বিদেশি পুঁজিনির্ভর। কোনো single dominant matching marketplace নেই — এটাই NexFund-এর মতো নতুন প্ল্যাটফর্মের window।", {}),
])
bullets = [
    ("বাজার fragmented, লিডার ছাড়া: 28টি VC ফান্ড + 500+ angel (BAN) + 11টি BSEC-registered AIF থাকলেও early-stage matching-এ কোনো clear winner নেই। BAN ($12M+, 51 কোম্পানি) সবচেয়ে বড় angel network, Startup Bangladesh Ltd (30 invest) সবচেয়ে সক্রিয় local VC।", "High — bdangels.co 2026; BSEC AIF list Sep 2026; Tracxn 2026"),
    ("ফান্ডিং boom-to-bust: 2021-এ $434M (94 deals) পিক → 2024-এ $42M → 2025-এ $124M (কিন্তু $110M একটাই SILQ M&A) → H1 2026-এ মাত্র $6M (-95% YoY)। 2010 থেকে মোট $1.126B (460+ deals), যার $1B+ বিদেশি, local মাত্র ~$76M।", "High — LightCastle/Startup Bangladesh/Anchorless/ExitStack Jan 2026 & Jul 2026; Daily Star Sep 2026"),
    ("Consultancy pool বড় কিন্তু top-heavy: বার্ষিক ~$150–200M (2022 estimate), LightCastle + Big4 affiliates + BRAC EPL / IDLC / UCB / LankaBangla merchant banks dominate করে। SME/startup-দের জন্য affordable valuation, due-diligence, fundraising সাপোর্টে বড় gap।", "Medium — LightCastle CEO 2022; BRAC EPL/IDLC/UCB disclosures"),
    ("SME finance gap-ই আসল TAM: World Bank হিসাবে gap BDT 193–237B এবং বাড়ছে; ADB বলছে SME-র GDP share 25%→32% লক্ষ্য, অথচ bank NPL 20%+ ও liquidity crisis-এ SME loan কঠিন। Startup investment GDP-র মাত্র 0.03% ($0.7 per capita)।", "High/Medium — WB 2019; SME Foundation policy paper; ADB 2025; Startup Report 2025"),
    ("Regulatory tailwind তৈরি হচ্ছে: BSEC Alternative Investment Rules 2015 + 2025 Bangladesh Bank startup directives (cross-border share-swap, offshore HoldCo) + 39 ব্যাংকের Tk425cr ($35M) BSIC Onkur Fund I (May 2026) — domestic capital প্রথমবার institutional হচ্ছে।", "High — BSEC; BB; TBS/Daily Star May–Sep 2026"),
    ("NexFund-এর জন্য সুপারিশ: (1) curated SME/growth-stage matching + paid due-diligence/valuation bundle, (2) bank/VC co-investment rail (BSIC, BAN, SBK), (3) success-fee + retainer hybrid pricing — বিস্তারিত §8-এ 7টি prioritized action।", "Analysis — §5–§8 থেকে mapped"),
]
for b, conf in bullets:
    add_mixed_para([("•  ", {'b': True, 'color': ACCENT}), (b, {}), (f"  [Confidence: {conf}]", {'i': True, 'size': 8.5, 'color': GRAY})])

add_callout("পাঠক-পরীক্ষা: Situation = পুঁজি আছে কিন্তু matching নেই; Complication = বিদেশি পুঁজি পিছু হটেছে; Question = NexFund কোথায় ঢুকবে? Answer = SME/growth matching + trust infrastructure (§8)।")

# ================= SITUATION =================
doc.add_heading("২. Situation & Context — SCQA + Scope (সংক্ষেপে প্রেক্ষাপট)", level=1)
doc.add_heading("Situation — এখন কী হচ্ছে", level=2)
add_para("বাংলাদেশের GDP growth (~5% FY2026 est.) resilient, কিন্তু startup investment intensity এশিয়ায় সর্বনিম্নদের একটি (GDP-র 0.03%)। 2021-এর SoftBank-bKash ($250M) driven boom-এর পর global rate-hike, forex চাপ, রাজনৈতিক transition ও banking NPL crisis-এ venture funding শুকিয়ে গেছে। একই সময়ে traditional corporate finance (IPO, bond, syndication) merchant banks-এর হাতে concentrated, আর SME-রা formal credit পাচ্ছে না।")
doc.add_heading("Complication — সমস্যা কোথায়", level=2)
add_para("Founder-রা বলে investor পাওয়া যায় না, investor-রা বলে investable, diligenced deal পাওয়া যায় না — মাঝখানে trusted matching + valuation/due-diligence layer নেই। Local HNI/family-office পুঁজি থাকলেও (bank deposit বড়) তা startup/SME-তে আসে না — governance, exit fear ও deal-flow opacity-র কারণে। 2024-এ local investor participation 95% পড়ে যাওয়া এটাই প্রমাণ করে।")
doc.add_heading("Question — এই রিপোর্ট কোন প্রশ্নের উত্তর দেয়", level=2)
add_para("১) Investor-matching platform ও finance consultancy-তে বাংলাদেশে কারা সক্রিয়? ২) প্রতিটির positioning/pricing কী? ৩) Overall market value (funding + advisory fee + SME gap) কত? ৪) SWOT কী? ৫) NexFund-এর মতো নতুন venture-এর entry strategy কী হওয়া উচিত?")
doc.add_heading("Scope, method ও honesty note", level=2)
make_table(
    ["বিষয়", "সিদ্ধান্ত"],
    [
        ["Geography / Time", "বাংলাদেশ only; 2022–Sep 2026 ডেটা; DSE/BB/BSEC official + LightCastle/Startup Bangladesh + TBS/Daily Star triangulated"],
        ["Inclusion", "Angel networks, VC/PE/AIF, accelerators, investment banks/merchant banks, Big4 affiliates, boutique advisory; Exclusion: pure retail bank lending, insurance broking"],
        ["Method", "Hypothesis-first → MECE 7 sub-questions → 3 search passes → 2-source rule; critical claim-এ ≥2 independent source, না হলে confidence Low/Medium ট্যাগ"],
        ["Currency", "BDT + USD দুটোই; 2026 rate ~Tk120 = $1 ধরা (BSIC Tk425cr ≈ $35M হিসাবে); সব সংখ্যায় বছর উল্লেখ"],
        ["সীমাবদ্ধতা", "Private advisory fee ও deal success-fee publicly disclosed নয় — estimate হিসেবে চিহ্নিত; consultancy $150–200M single-source (2022) তাই Medium confidence"],
    ],
    title="টেবিল ১: Scope ও methodology — কী ধরা হয়েছে, কী বাদ দেওয়া হয়েছে",
    source="Source: রিপোর্ট methodology (deep-research-method + marketing-research protocol), Sep 2026"
)

# ================= KEY FINDINGS =================
doc.add_heading("৩. Key Findings — ৫টি action-title theme (প্রতিটি শিরোনামই একটি সিদ্ধান্ত)", level=1)

doc.add_heading("৩.১ Matching মার্কেটে কোনো dominant marketplace নেই — BAN সবচেয়ে বড়, কিন্তু $12M স্কেলই প্রমাণ করে বাজার কত early", level=2)
add_para("Bangladesh Angels Network (BAN) — 500+ angel, $12M+ facilitated, 51 portfolio (Pathao, Chaldal, Shajgoj সহ) — দেশের প্রথম ও বৃহত্তম angel platform। কিন্তু 2019 থেকে 7 বছরে $12M মানে বছরে গড়ে <$2M — অর্থাৎ angel rail এখনো niche। Startup Bangladesh Ltd (সরকারি VC, 2020) 30 invest নিয়ে সবচেয়ে সক্রিয় local institutional checker, আর BSIC Onkur Fund I ($35M, 39 banks, May 2026) প্রথম bank-backed institutional pool। Tracxn-এ 28 VC, Fundraising Fox-এ Dhaka-তে 12 firms — সংখ্যা অনেক, কিন্তু প্রতিটির ticket ছোট ($36K–$1.5M range) ও deal-count কম।")
add_callout("$12M / 51 deals (BAN) + $35M Onkur (BSIC) = local early-stage rail-এর মোট visible pool এখনো <$50M — SILQ-এর একটা M&A ($110M)-এর অর্ধেকও নয়।")

doc.add_heading("৩.২ Startup funding 2021 পিক থেকে 90%+ পড়েছে — এখন বাজার late-stage M&A নির্ভর, early-stage-এ খরা", level=2)
add_para("LightCastle + Startup Bangladesh + Anchorless + ExitStack Year Review (Jan 2026) ও H1 2026 রিপোর্ট (Jul 2026) একই গল্প বলে: 2021: $434–435M (94 deals) → 2024: $42M → 2025: $124M (12 deals, যার $110M SILQ ShopUp-Sary M&A = 90%+) → H1 2026: $6M (-95% YoY)। 2013 থেকে 80% পুঁজি late-stage-এ গেছে ($879M / $1.1B)। Pre-seed/Seed টিকিট বড় হচ্ছে (selectivity), কিন্তু deal সংখ্যা কমছে — top-3 deals = 80–95% funding। Global VC 2025-এ +47% ($469B) বাড়লেও Bangladesh decoupling — political transition, currency devaluation, NPL ও outdated regulation-কে দায়ী করা হয়েছে।")
doc.add_heading("৩.৩ Consultancy মার্কেট mature ও bank-led — কিন্তু SME/startup-এর affordable growth advisory-তে শূন্যতা", level=2)
add_para("LightCastle CEO (2022) estimate: বছরে $150–200M consultancy market। Structure: (a) Investment banks/merchant banks — BRAC EPL (BDT 6B AUM, 3,000 clients, first book-building/green-shoe IPO track), IDLC Investments (1998 merchant banker, largest NBFI group, 215,700+ customers), UCB Investment (self-claimed Best Investment Bank, M&A/syndication/bond), LankaBangla, Prime Bank Investment, ICB Capital; (b) Big4 affiliates — Rahman Rahman Huq (KPMG), Hoda Vasi (PwC), ACNABIN (Grant Thornton), A Qasem (ECOVIS), EY Advisory BD, Deloitte BD (2018 launch); (c) Boutiques — LightCastle (150+ clients, $150M+ mobilized claim, 30+ industries dataset), KMS, Business Globalizer (3,000+ entrepreneurs, 50 countries, IRS-CAA), RPS, PP Associates। Gap: বড়রা large-corporate/development-partner নিয়ে busy; SME-র valuation, IM/dataroom, lender/investor matching-এর জন্য trusted, fixed-price সেবা প্রায় নেই।")
doc.add_heading("৩.৪ আসল সুযোগ SME growth-stage-তে — finance gap বাড়ছে, bank loan কঠিন, equity rail অনুপস্থিত", level=2)
add_para("World Bank/SME Foundation: MSME finance gap BDT 130B (2011) → BDT 193B (2019) → BDT 237B (adjusted) — trend বাড়ছে। ADB 2025 Monitor: SME GDP share 25%→32% target, কিন্তু bank NPL 20.2% (Dec 2024, নতুন 90-day rule-এ 30%+ হতে পারে), call-money 10%, liquidity tight — bank SME loan risk-averse। DSE market-cap/GDP মাত্র 13.06% (BB Sep 2025; WB হিসাবে 19.54% 2024 — methodology পার্থক্য) বনাম world avg 86% — public-market exit rail-ও অগভীর। অর্থাৎ debt ও public equity দুটোই SME-র জন্য কঠিন — private matching + blended (debt+equity+grant) rail-এর demand structural।")
doc.add_heading("৩.৫ Regulation এখন tailwind — 2025–26 turning point: BB directives + BSEC AIF + bank-backed VC", level=2)
add_para("BSEC Alternative Investment Rules 2015-এর অধীনে এখন 11টি AIF registered (UCB Venture 150cr + UCB PE 150cr, X Angel PE 200cr + VC 100cr, IDLC VC I 45cr, BD Venture 50cr, SBK R Ventures PE 15cr সহ)। BB-এর 2025 startup directives cross-border share-swap/offshore HoldCo (Singapore/Delaware) formalize করেছে — foreign round-এর legal friction কমেছে। iDEA pre-seed grant (BDT 10M পর্যন্ত non-dilutive) + BIRDI industrial R&D grant pipeline-এ আছে। সবচেয়ে বড় signal: BSIC Onkur Fund I — 39 banks net-profit-এর 1% দিয়ে evergreen pool — domestic institutional capital-এর জন্ম।")

# ================= DIRECTORY A =================
doc.add_heading("৪. Company Directory (A) — Investor Matching Platform: কারা, কী করে, কত বড়", level=1)
add_para("নিচের টেবিলে 18টি core matching vehicle — angel network, local VC/PE/AIF, accelerator ও bank-backed fund। Foreign active VCs আলাদা তালিকায়। Pricing/channel/strength/weakness সহ — শেষ কলামে NexFund-এর জন্য exploitability।")
make_table(
    ["#", "প্রতিষ্ঠান (ধরন, সাল)", "স্কেল / টিকিট", "ফোকাস ও চ্যানেল", "Strength → Exploitable gap"],
    [
        ["1", "Bangladesh Angels Network — angel network, 2018/19", "500+ angels, $12M+, 51 cos; member $399–999/yr", "Pre-seed/Seed $25k–500k; Pathao/Chaldal/Shajgoj; pitch+dataprep+diligence", "সবচেয়ে বড় network → কিন্তু throughput কম; NexFund pipeline partner হতে পারে"],
        ["2", "Startup Bangladesh Ltd — govt VC, 2020", "30 invest; BDT 10M–500M; 9 startups-এ BDT 9cr (Sep24–Jan25)", "Pre-seed–Series A, fintech/health/edtech; Fund-of-Funds plan", "Policy + capital → slow process; co-invest rail সুযোগ"],
        ["3", "BSIC / Onkur Fund I — bank-backed VC, 2026", "$35M (Tk425cr), 39 banks, 1% profit evergreen", "Seed–Series A, agro+tech priority; global co-invest", "প্রথম domestic institutional pool → deal-sourcing partner critical"],
        ["4", "Anchorless Bangladesh — early VC, 2019", "11 invest (PitchBook); Agroshift, Shikho, Pathao, Revora", "Seed, tech-enabled scalable; NY+Dhaka+SG", "Global capital access → local sourcing-এ NexFund value-add"],
        ["5", "SBK Tech Ventures — woman-led VC, 2019", "$7.1M/6 deals Q2-24; 46 portfolio; 1 exit 1700%", "Fintech/Agri/Health/Mobility; Net Positive accelerator", "Gender-lens + climate → SME pipeline overlap"],
        ["6", "BYLC Ventures — accelerator, 2009", "37 invest, 20 portfolio; seed BDT 8L + 15L scale-up", "Idea–MVP youth founders; bootcamp+CFO+legal", "Top-of-funnel → graduate-দের growth funding-এ gap"],
        ["7", "BD Venture Ltd — VC, AIF 50cr (2019)", "BDVL Venture Fund 1: Tk50cr (IPDC trustee)", "Seed–Growth $36k–100k", "Licensed AIF → distribution weak"],
        ["8", "Dekko ISHO VC / RC Ventures / BD Venture (Fox list)", "RC leads rounds $825k–6M", "Pre-seed–Series A/B", "Corporate-backed → deal-flow সীমিত"],
        ["9", "UCB Asset Mgmt — VC I 150cr + PE 150cr (2023)", "Each Tk150cr, DBH trustee", "VC+PE dual rail", "Bank balance-sheet → SME reach নেই"],
        ["10", "X Angel — Vision VC 100cr + First PE 200cr", "Total Tk300cr", "Early + growth", "নতুন manager → track-record গড়ছে"],
        ["11", "IDLC VC Fund I — 45cr (2020)", "Tk45cr, Green Delta trustee", "Early tech, scalable", "NBFI brand → conservative deployment"],
        ["12", "SAJIDA Foundation — impact", "$38k–900k, Pre-seed/Seed", "Inclusive business", "Impact mandate → commercial SME বাইরে"],
        ["13", "Maslin / UFS / Strategic Equity (500cr) / others", "UFS VC+PE 125cr each; Strategic 500cr", "PE/VC mixed", "Licensed কিন্তু deployment opaque"],
        ["14", "Foreign active: Cocoon, Flourish, Peak XV, 500 Global, Wavemaker, GFR, Sturgeon, ADB Ventures", "Global tickets $250k–7.5M", "Cross-border, HoldCo rounds", "99% capital 2025-এ global → local diligence partner চায়"],
        ["15", "Grants: iDEA (BDT 10M) + BIRDI industrial R&D", "Non-dilutive", "Pre-seed / deep-tech", "Free capital → investable হতে advisory লাগে"],
    ],
    title="টেবিল ২: Investor-matching landscape — 15 গ্রুপে 28 VC + 500 angel + 11 AIF + grants (takeaway: ভিড় আছে, depth নেই)",
    source="Sources: bdangels.co (2026); startupbangladesh.vc Year Review Jan 2026; bsic.vc; anchorless.vc; TBS 14 May 2024; bylc.org; BSEC AIF list 10 Sep 2026; Fundraising Fox 2026; Tracxn 2026; startups.bd"
)

# ================= DIRECTORY B =================
doc.add_heading("৫. Company Directory (B) — Finance Consultancy: কারা, কী বেচে, কাদের কাছে", level=1)
add_para("Merchant/investment banks (capital-market led), Big4 affiliates (audit-tax-risk led) ও boutiques (research/market-entry/SME led) — তিন layer। নিচে 16টি archetype; প্রতিটির pricing model উল্লেখ (disclosed না হলে estimate ট্যাগ)।")
make_table(
    ["#", "প্রতিষ্ঠান (layer)", "Core সেবা + প্রমাণ", "টার্গেট + Pricing signal"],
    [
        ["1", "LightCastle Partners (boutique leader, 2013)", "Market assessment, value-chain, investment advisory, accelerator mgmt; 150+ clients, $150M+ mobilized (claim)", "Dev-partners + MNC + large local; project-fee (estimate: $15k–100k+)"],
        ["2", "BRAC EPL Investments (investment bank)", "IPO/bond/ECM/DCM, corporate advisory, PMS; AUM BDT 6B, 3,000 clients; first book-building IPO", "Corporate issuers + HNI; success-fee 1–3% + retainer (industry norm)"],
        ["3", "IDLC Investments / Finance (NBFI group)", "IPO issue-mgmt, portfolio (MAXCAP/CAP Invest), research; group customers 215k+, CAR 21%", "Mid-large corporate + retail; AUM-fee + brokerage"],
        ["4", "UCB Investment (merchant bank)", "Syndication, fixed-income, M&A, valuation, issue-mgmt", "Corporate + banks; bilateral success-fee"],
        ["5", "LankaBangla / Prime Bank Investment / ICB Capital / Green Delta Capital", "Underwriting, trustee, portfolio, bond structuring", "Listed + bank issuers; regulated fee-scale"],
        ["6", "Deloitte BD (2018) / EY Advisory BD / Rahman Rahman Huq-KPMG / Hoda Vasi-PwC / ACNABIN-Grant Thornton / A Qasem-ECOVIS", "Audit, tax, deal-advisory, risk, M&A valuation; BB hired EY/Deloitte/KPMG for bank audit 2025", "Regulated + large corporate; day-rate premium (estimate)"],
        ["7", "KMS & Associates (SME boutique, 7+ yrs)", "Bookkeeping, tax/VAT, audit, financial advisory; 700+ cos (350+ IT)", "SME/startup; retainer + fixed-package (affordable tier)"],
        ["8", "Business Globalizer (cross-border, 2016)", "US/UK/UAE incorporation, banking/Stripe/PayPal, tax; 3,000+ founders, 50 countries; IRS-CAA", "Freelancer/startup going global; package $200–2k (public packages)"],
        ["9", "RPS / House of Bookkeepers / Infinigent / PP Associates / Strategic Finance / My Advisor", "Loan-arrangement, feasibility, IM, VAT/tax, JV docs, procurement support", "SME + foreign entrants; success + hourly mix (opaque)"],
        ["10", "CAPM Advisory / UFS Equity / Maslin Capital (AIF managers)", "VC/PE fund mgmt; BSEC fee cap: VC 3%, PE 2%, impact 4% of NAV", "HNI/institutional LPs; NAV-based fee (regulated)"],
    ],
    title="টেবিল ৩: Finance consultancy — 3-layer structure (takeaway: top-heavy, SME-affordable layer পাতলা)",
    source="Sources: lightcastlepartners.com; bracepl.com; IDLC Annual 2024; ucb-investment.com; BSEC panel of auditors 2023–25; clutch.co; businessglobalizer.com; BSEC AIF Rules fee clause"
)
add_mixed_para([
    ("Perceptual map (customers আসলে যে 2 axis-এ বেছে নেয়): ", {'b': True, 'color': ACCENT}),
    ("X = Ticket-size (ছোট SME ticket ↔ বড় corporate deal), Y = Trust/Compliance depth (light-touch matching ↔ regulated diligence)। Top-right (বড় + deep) crowded — BRAC EPL/IDLC/Big4। Bottom-left (ছোট + light) crowded — generic company-formation। ফাঁকা quadrant: mid-ticket (BDT 50L–5cr) + deep-trust (diligenced matching) — এটাই NexFund white-space।", {}),
])

# ================= ANALYTICS =================
doc.add_heading("৬. Analytics — Market Value Deep-Dive (সংখ্যার স্তর)", level=1)
doc.add_heading("Startup funding trend: boom, bust ও concentration", level=2)
make_table(
    ["বছর / পিরিয়ড", "Funding", "Deals", "মন্তব্য"],
    [
        ["2021 (peak)", "$434–435M", "94", "bKash $250M SoftBank incl.; সর্বোচ্চ"],
        ["2023", "~$55–60M est.", "—", "Top-8 2024 $35M ছিল -36% YoY → implied 2023 ~$55M"],
        ["2024", "$42M", "—", "Logistics $13.5M (Pathao $12M), Fin $7.6M; local participation -95%"],
        ["H1 2025", "$119.9M", "—", "$110M SILQ M&A = 92%; VC = 98% ($117M)"],
        ["2025 full", "$124M", "12", "Top-3 = 95%; global investors = 99%; avg ticket বড়, count কম"],
        ["H1 2026", "$6M", "—", "-95% YoY (vs $120M H1-25); H2-25 vs +51%; Enterprise SW 35%, Health 26%"],
        ["2010–Sep 2026 cum.", "$1.126B", "460+", "Foreign ~$1.05B, local ~$76M; 80% late-stage"],
    ],
    title="টেবিল ৪: Startup funding timeline — পিক থেকে খরা (takeaway: volume নয়, concentration-ই গল্প)",
    source="Sources: LightCastle/Startup Bangladesh/Anchorless/ExitStack Year Review Jan 2026 & H1 2025/2026; FE 6 Jan 2025; Dhaka Tribune 28 Jul 2026; Daily Star 20 Sep 2026"
)
add_callout("Intensity check: $0.7 per capita ও 0.03% of GDP — India ($14, 1.07%) ও Pakistan ($0.23–0.2, 0.03%)-এর সাথে তুলনায় structural under-investment স্পষ্ট।")

doc.add_heading("Advisory fee pool + SME gap: TAM / SAM / SOM গণিতসহ", level=2)
add_para("দুটি method-এ sizing — top-down (LightCastle $150–200M) ও bottom-up (deal-count × fee) — 30%+ diverge করলে investigate করতে হয় (protocol)। এখানে converge করে ~$120–200M range-এ, তাই confidence Medium-High।")
make_table(
    ["Layer", "Assumption (explicit)", "Math", "Value (2025–26)"],
    [
        ["TAM: addressable fee + carry-adjacent", "5,000 growth-SMEs/startups × avg raise BDT 2cr × 3% success-fee + 500 corporate deals × BDT 50L fee", "(5,000×60L? না) সরলীকৃত: (5,000×BDT 6L avg fee-equivalent) + corporate", "~BDT 1,500–2,000cr (~$125–165M)"],
        ["SAM: capturable via matching platform", "TAM-এর 20% intermediated + diligence/retainer BDT 50cr", "TAM×20% + 50cr", "~BDT 350–450cr (~$30–37M)"],
        ["SOM: NexFund 3-yr winnable", "SAM-এর 10–15% (200–300 deals × BDT 8–12L blended revenue)", "Bottom-up", "~BDT 35–60cr (~$3–5M annual revenue potential)"],
        ["SME credit gap (context)", "WB 193B + growth → 237B adjusted", "Supply-demand mismatch", "BDT 19,000–24,000cr (~$1.6–2B) — debt-side TAM"],
        ["DSE depth (exit context)", "Mkt-cap/GDP 13% (BB) / 19.5% (WB) vs world 86%", "Shallow exit", "IPO/M&A exit rail অগভীর — private matching-এর প্রয়োজন বাড়ায়"],
    ],
    title="টেবিল ৫: Market sizing — top-down + bottom-up (takeaway: fee pool $125M+, NexFund SOM $3–5M/yr realistic)",
    source="Base: LightCastle $150–200M (2022); BSEC fee caps; BAN/BYLC tickets; SME Foundation gap paper; BB Sep 2025; WB. Method: marketing-research TAM/SAM/SOM protocol"
)
add_mixed_para([
    ("Contradiction note (data হিসেবে রাখা): ", {'b': True, 'color': ACCENT}),
    ("DSE cap/GDP-তে BB (13.06% Sep 2025, current market price), WB (19.54% 2024, listed domestic cos), CEIC (6.0% Jun 2025, nominal GDP) — তিনটি ভিন্ন definition/year। Verdict: trend একই — shallow (10–20%) ও world avg (86%)-এর অনেক নিচে — তাই exact % নয়, range হিসেবে ব্যবহার করুন।", {}),
])

# ================= REGULATORY =================
doc.add_heading("৭. Regulatory Landscape — কী মানতে হবে, কী সুবিধা নেওয়া যাবে", level=1)
make_table(
    ["Regulator / Rule", "মূল কথা", "NexFund-এর জন্য implication"],
    [
        ["BSEC (1993) + Alternative Investment Rules 2015", "VC/PE/impact fund = closed-end, private placement only, single-company ≤25% corpus; manager fee VC 3%, PE 2%, impact 4% NAV; 11 AIF registered", "Fund তুলতে হলে AIF license; pure marketplace (no pooling) হলে license লাগে না — কিন্তু trustee/AD-bank দিয়ে escrow রাখা best-practice"],
        ["Bangladesh Bank 2025 startup directives", "Startup financing, cross-border share-swap, outbound investment, HoldCo formalized; banks net-profit-এর 1% BSIC-তে দিতে পারে", "Foreign co-invest + flip-structure এখন legal — term-sheet-এ BB reporting clause রাখুন"],
        ["RJSC / BIDA / NBR", "JV/incorporation, FDI registration, ICT tax-holiday (SRO-based)", "One-stop matching-এ compliance checklist bundle করুন — SME-র willingness-to-pay বাড়ে"],
        ["iDEA (BDT 10M grant) / BIRDI industrial grant", "Non-dilutive, milestone-based, local incorporation mandatory", "Grant-to-equity bridge product বানান — grant-winner-দের diligenced pipeline"],
    ],
    title="টেবিল ৬: Regulation snapshot (takeaway: pooling করলেই license, matching + advisory-তে জটিলতা কম)",
    source="Sources: sec.gov.bd (BSEC functions, AIF list, Rules gazette 24 May 2021); startups.bd FAQ; TBS/BSIC disclosures May 2026"
)

# ================= SWOT =================
doc.add_heading("৮. SWOT — Sector-level (evidence per cell) + Top-5 player snapshot", level=1)
add_para("Framework: marketing-research SWOT protocol — প্রতিটি cell-এ evidence। Rating: sector SWOT descriptive; Porter summary শেষে।")
make_table(
    ["", "সহায়ক (Internal/External +)", "বাধা (Internal/External –)"],
    [
        ["Internal", "S — Strengths:\n• Govt + bank capital প্রথমবার (BSIC $35M evergreen; SBL track)\n• BAN/SBK/BYLC-এর diligenced pipeline ও global co-investor link\n• LightCastle-এর 30-industry dataset + merchant-bank execution muscle\n• Low-cost talent, digital (MFS transaction high) ও diaspora angel interest", "W — Weaknesses:\n• Early-stage throughput অতি কম (BAN 7yr $12M; H1-26 $6M)\n• 99% foreign-নির্ভরতা + local LP -95% (2024)\n• Exit rail shallow (DSE 13–19% GDP) + NPL 20%+ → risk-aversion\n• Affordable SME diligence/valuation সেবা নেই; data opacity"],
        ["External", "O — Opportunities:\n• SME gap BDT 20,000cr+ + 0.03% GDP intensity = headroom\n• BB share-swap + BSEC AIF + iDEA/BIRDI = formal rail\n• M&A/secondaries/IPO white-space (SILQ first M&A precedent)\n• Gender-lens, climate/agri-tech, enterprise-SaaS underserved", "T — Threats:\n• Macro: FX, inflation, high rates, political cycle → valuation cut\n• Informal family funding + AngelList/Crunchbase + Singapore flip → disintermediation\n• Regulatory delay (exit/repatriation friction) ও bank liquidity crisis\n• Trust deficit: governance scandal ($17B siphon allegation, FT Jan 2025) → diligence cost বাড়ায়"],
    ],
    title="টেবিল ৭: Sector SWOT — investor-matching + finance consultancy combined (takeaway: সুযোগ structural, ঝুঁকি macro-trust)",
    source="Synthesized from §4–§7 evidence; FT/Reuters 26–27 Jan 2025 (bank audit); WB NPL data; LightCastle H1 2026"
)
make_table(
    ["Player", "Strength", "Weakness (exploitable)", "NexFund move"],
    [
        ["BAN", "500 angels, brand, diligence process", "Throughput কম, ticket ছোট, revenue member-fee নির্ভর", "Deal-sourcing + diligence outsource partner"],
        ["Startup Bangladesh / BSIC", "Capital + policy", "Slow, mandate-bound, sourcing capacity gap", "Co-invest + pipeline agreement"],
        ["SBK / Anchorless", "Curated portfolio, global link", "Sector/stage narrow, follow-on সীমিত", "Syndicate / SPV rail"],
        ["BRAC EPL / IDLC / UCB", "Execution, license, balance-sheet", "SME ticket-এ unit-economics মেলে না", "Referral: sub-BDT 5cr deals NexFund-এ"],
        ["LightCastle", "Data + thought-leadership", "Premium pricing, dev-partner heavy", "Research co-brand + SME product carve-out"],
    ],
    title="টেবিল ৮: Top-5 player SWOT snapshot (takeaway: কেউ SME mid-ticket diligenced matching-এ নেই)",
    source="Author synthesis; company disclosures §4–§5"
)
add_mixed_para([
    ("Porter Five Forces (সংক্ষেপ): ", {'b': True, 'color': ACCENT}),
    ("Rivalry M (fragmented, no price war yet) | New entry M (license হালকা, trust-ই moat) | Buyer power H (investor-রা selective, founder-রা price-sensitive) | Supplier power M (quality deal-flow scarce) | Substitutes H (family funds, foreign direct, bank loan চেষ্টা) → জেতার পথ = trust-moat (diligence + escrow + exit-support)।", {}),
])

# ================= RECOMMENDATIONS =================
doc.add_heading("৯. Solutions / Recommendations — 7টি prioritized action (finding-এর সাথে mapped)", level=1)
recs = [
    ("১. Mid-ticket curated matching-এ position নিন (BDT 50L–5cr) — [§3.১, §3.৪]।", "Pre-seed micro (BYLC/iDEA) বা large corporate (merchant banks) নয় — growth-SME + post-revenue startup। Owner: CPO। Effort: M। Impact: H।"),
    ("২. Trust bundle বাধ্যতামূলক করুন: valuation + IM/dataroom + light due-diligence + escrow-term-sheet — fixed-price (e.g., BDT 1.5–3L) + success-fee 2–4% (BSEC cap-এর ভেতরে)। [§3.৩, §8-W]", "Owner: Head of Advisory। Effort: M। Impact: H — willingness-to-pay-এর প্রমাণ BAN $999 institutional tier।"),
    ("৩. BSIC/BAN/SBK-এর সাথে formal pipeline agreement — NexFund sourcing + তারা capital (co-invest)। [§3.৫]", "Owner: CEO। Effort: L–M। Impact: H। 90-day target: 1 MoU।"),
    ("৪. Blended rail: grant (iDEA/BIRDI) → angel → bank/NBFI debt → AIF equity — এক ছাদে sequencing। [§6-TAM]", "Owner: Partnerships। Effort: M। Impact: M–H।"),
    ("৫. Sector beachhead: agri/climate + enterprise-SaaS + health — যেখানে H1-26-এও টাকা গেছে (35%+26%) ও SBK thesis overlap। [§6]", "Owner: Sector leads। Effort: L। Impact: M।"),
    ("৬. Exit-path productize করুন: M&A buyer-list, secondary SPV, DSE-SME listing checklist — এখন differentiator, পরে moat। [§3.৪, SILQ precedent]", "Owner: Investment team। Effort: H। Impact: H (long-term)।"),
    ("৭. Pricing discipline: SME-র জন্য freemium listing + paid diligence; investor-র জন্য annual access (BAN-এর $399–999 benchmark) + success-fee। No pooling without AIF license — marketplace model-এ থাকুন। [§7]", "Owner: Finance/Legal। Effort: L। Impact: M (compliance risk কমায়)।"),
]
for title_r, desc in recs:
    add_mixed_para([("•  " + title_r + " ", {'b': True, 'color': ACCENT}), (desc, {})])
add_callout("What success looks like (12 মাস): 150 diligenced deals listed → 20 funded (BDT 40cr mobilized) → 2.5% blended take ≈ BDT 1cr revenue + advisory retainer — SOM-এর 20–30% capture।")

# ================= RISKS =================
doc.add_heading("১০. Risks, Unknowns & What-would-change-my-mind", level=1)
make_table(
    ["ঝুঁকি / Unknown", "Confidence", "Mitigation / কী বদলালে মত বদলাবো"],
    [
        ["Consultancy $150–200M single-source (2022) — এখন কত?", "Medium", "LightCastle/BSEC-এর কাছে refresh চাওয়া; bottom-up দিয়ে cross-check করা হয়েছে — range ব্যবহার করুন, point নয়"],
        ["Private success-fee / retainer undisclosed", "Low (estimate)", "10 founder + 10 investor interview (JTBD) + 3 merchant-bank quote — pricing validate করুন"],
        ["H1-26 $6M কি cyclical না structural collapse?", "Medium", "H2-26 + BSIC deployment দেখুন; BSIC 3 deals/4 months হলে মত positive-এ বদলাবে"],
        ["Bank NPL 20–30% + liquidity → SME lending freeze দীর্ঘায়িত?", "High (WB/BB)", "Blended/equity tilt বাড়ান; debt-নির্ভরতা কমান"],
        ["Foreign LPs ফিরবে? (99% share fragile)", "Medium", "BB share-swap execution time + repatriation TAT track করুন — 60 দিনের নিচে এলে bullish"],
        ["Opposite hypothesis risk: local platform viable নয়?", "Medium", "Pilot-এ CAC vs take-rate test — 6 মাসে 5 paid diligence না বিক্রি হলে pivot (pure B2B advisory)"],
    ],
    title="টেবিল ৯: Honest limitations — skeptic প্রথমে এগুলোই আক্রমণ করবে",
    source="Gap audit per deep-research-method Phase 5"
)

# ================= APPENDIX =================
doc.add_heading("১১. Appendix — Methodology, Source Catalog (তারিখসহ) ও Data Gaps", level=1)
doc.add_heading("Method note (1 para)", level=2)
add_para("Hypothesis-first (5 hypotheses, opposite-test সহ), MECE 7 sub-questions, 3 search passes (Pass-1: landscape, Pass-2: gaps/regulation/SME, Pass-3: Big4/DSE/pricing), 2-source rule, contradiction-as-data (DSE cap/GDP, funding totals)। Surprise: consultancy pool ভাবনার চেয়ে বড়, আর foreign-নির্ভরতা ভাবনার চেয়েও extreme (99%) — H5 (viability doubt) আংশিক সত্য, তাই SOM conservative ($3–5M) রাখা হয়েছে।")
doc.add_heading("Source catalog (core, date-stamped)", level=2)
sources = [
    "bdangels.co — 500+ angels, $12M+, 51 cos; membership $399/$599/$999 (accessed Sep 2026) — Tier 5 (company claim, High for existence, Medium for scale)",
    "Startup Bangladesh Year Review Jan 2026 (PDF) — 2025 $124M/12 deals, 0.03% GDP, $0.7 per capita — Tier 3 (institutional, High)",
    "LightCastle/Anchorless/ExitStack H1 2025 & H1 2026 via Dhaka Tribune 28 Jul 2026; TBS; investbangladesh.co — H1-25 $119.9M, H1-26 $6M -95% — Tier 3/4 (High, triangulated)",
    "Daily Star 20 Sep 2026 + TBS 12 May 2026 + bsic.vc — BSIC Onkur $35M/Tk425cr, 39 banks, 1% profit — Tier 4 + official (High)",
    "BSEC sec.gov.bd — AIF list 10 Sep 2026 (11 funds), Alternative Investment Rules gazette, panel of auditors 2023–25 — Tier 1 (High)",
    "TBS 14 May 2024 — SBK $7.1M/6 deals, 46 portfolio — Tier 4 (High, single but specific)",
    "bylc.org + PitchBook — BYLC 37 invest, BDT 8L+15L — Tier 4/5 (Medium-High)",
    "Future Startup 29 Nov 2022 (Bijon Islam) — consultancy $150–200M — Tier 4 interview (Medium, dated)",
    "lightcastlepartners.com; bracepl.com; IDLC Annual 2024; ucb-investment.com — scale claims — Tier 5 (Medium)",
    "SME Foundation Policy Paper (Financing SMEs) + WB MSME Gap + ADB SME Monitor 2025 + WB FY25 doc (NPL 20.2%) — Tier 1/2 (High for direction, Medium for exact gap)",
    "BB Monthly Capital Market Sep 2025 (DSE/GDP 13.06%); WB 19.54% (2024); CEIC 6.0% — Tier 1/2 (contradiction documented)",
    "FT/Reuters 26–27 Jan 2025 — $17B bank audit, EY/Deloitte/KPMG hired — Tier 4 quality press (Medium-High)",
    "Fundraising Fox 2026 (12 Dhaka firms); Tracxn 2026 (28 VCs); startups.bd funding directory; Shizune Aug 2026 — Tier 5 directories (Low-Medium, directional)",
]
for s in sources:
    add_mixed_para([("•  ", {'b': True, 'color': ACCENT}), (s, {'size': 9.5})])
doc.add_heading("Data gaps — কী করলে sharper হবে", level=2)
add_para("১) 10+10 JTBD interview (founder/investor) — max 12 Q, screener-first, n≥100 directional; ২) 3 merchant-bank fee quote (IPO/bond/advisory); ৩) BSIC deployment tracker (quarterly); ৪) DSE-SME board listing funnel। এগুলো পেলে SOM ±30% নির্ভুল হবে।")

# closing
add_horizontal_line()
end = doc.add_paragraph(); end.alignment = WD_ALIGN_PARAGRAPH.CENTER
re_ = end.add_run("— রিপোর্ট সমাপ্ত —  •  Prepared for NexFund  •  Cut-off Sep 2026  •  Next refresh: BSIC deployment + H2 2026 funding পরে")
re_.font.name = FONT; re_.font.size = Pt(9); re_.italic = True; re_.font.color.rgb = GRAY

# save
doc.save(OUT)
print(f"Saved: {OUT}")

