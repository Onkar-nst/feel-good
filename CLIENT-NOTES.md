# TFGC — Client Strategy Notes & To-Do

Working notes from the client's competitive review. This file is the running record:
add new client feedback under **Change log** at the bottom, keep the to-do lists current.

Last updated: 2 September 2026

---

## 1. The core insight: the market has segmented into layers

The client's most important point. This is not one market with four competitors — it is
four *price/positioning tiers*, and TFGC has to deliberately own one.

| Tier | Who | Price | The customer's thought |
|---|---|---|---|
| 🟢 Low-cost / accessible | **Sunno** | ₹5/min, marketplace, many listeners | "I just need someone right now." |
| 🟡 Affordable personal | **SunLo** | ₹299–₹599, founder-led | "I want to talk to somebody, but I don't need therapy." |
| 🟠 Experienced-professional | **HearMe** | ₹499, senior professional / people coach | "I want someone who's been through professional pressure and gets it." |
| 🔵 **Premium intentional** | **TFGC** | ₹1,000–₹2,499, Kinjal | "I want dedicated time with someone I trust, who knows how to hold space for me." |

**What this means for us:** TFGC is priced 3–5× above the field. That gap is only
defensible if the brand visibly justifies it. Every design and copy decision from here
should be asked against one question: *does this make ₹1,799 feel obviously right?*

Competitor sites to review: `thehearme.com`, `sunlo.co.in/blog`, `allears.world`, `safe-ear.com`.

---

## 2. The USP — this replaces our current messaging

The client is explicit that our current lines are now **commodity claims** — every
competitor says them:

- ~~"We listen without judgment"~~ — everyone says this
- ~~"Human connection"~~ — everyone says this
- ~~"We're not therapy"~~ — everyone says this

**New positioning:**

> **TFGC is a dedicated space to put down what you've been carrying.**

**Brand philosophy line:**

> **You don't have to be in crisis to deserve to be heard.**

**The territory TFGC owns:** *everyday emotional release* — the things people don't need
therapy for, but also don't want to carry alone.

Competitors' territories (do not compete here): Sunno = loneliness · SunLo = emotional
burdens · HearMe = experienced professionals & decision-making.

> ⚠️ **Site conflict:** our current copy leans hard on exactly the three retired claims.
> "No therapy. No fixing. Just listening, with heart." appears in the Hero proof strip and
> the Services intro; "judgment free" appears in ~6 places. This needs a copy pass, not a
> find-and-replace — the claims aren't *wrong*, they just can't be the headline any more.

---

## 3. Target customer — narrow it

Stop serving "everyone who needs someone to talk to." Too broad.

**Start here:**

> **The person who looks completely fine from the outside — but doesn't feel fine inside.**

Includes: working professionals · people carrying family expectations · women who are
always the "strong one" · people overwhelmed by relationships · people in career
uncertainty · people living away from home · entrepreneurs · people who have friends but
don't feel safe telling them everything.

---

## 4. Rename the sessions — sell an experience, not a menu of minutes

| Client's proposed name | Duration | Price | Status on site today |
|---|---|---|---|
| **The Feel-Good First Step** | 30 min | ₹799 | ❌ **New product** — no service-detail entry, no price anywhere |
| **The Feel-Good Session** | 50 min | ₹1,799 | ✅ exists as "1:1 Virtual Listening Sessions" |
| **The Deep-Dive Session** | 75 min | ₹2,499 | ✅ exists (same entry, 75-min option) |
| **The Follow-Up** | 30 min | ₹1,000 | ✅ exists as "Quick Catch Up Session (Returning Clients Only)" |

> ⚠️ **Two conflicts to resolve with the client before building:**
> 1. **Is the ₹799 First Step real?** It contradicts the tier table in point 1, which puts
>    TFGC at ₹1,000–₹2,499. A ₹799 entry price undercuts HearMe's ₹499 far less
>    comfortably and weakens the premium position. **Ask before shipping a price.**
> 2. **The FAQ says "Sessions start at ₹1,799 for 50 minutes"**
>    ([ReviewForm.vue:159](app/pages/home/components/ReviewForm.vue#L159)). That sentence
>    becomes false the moment a ₹799 tier launches. Same for the Services page copy.
>
> Also note: **The Follow-Up is currently restricted to returning clients only.** The
> client's renaming doesn't say whether that restriction survives. Confirm.

---

## 5. Customer-specific landing pages — the one thing to copy from Sunno

The client's clearest tactical instruction. Not Sunno's pricing, not their Buddy model —
their **per-problem landing pages**. This is where Sunno is genuinely ahead, and it's fixable.

Each page becomes a funnel: **Google SEO + Instagram content + paid ads → landing page → TFGC service CTA.**

### Good news: we're already 80% there

The `HowWeHelp` section on the home page
([HowWeHelp.vue](app/pages/home/components/HowWeHelp.vue)) already ships 8 feeling-based
entry cards. They currently all link to `/contact`. **They should become links to these
landing pages instead** — the section is already the perfect internal hub for them.

| # | Client's landing page | Proposed slug | Existing HowWeHelp card |
|---|---|---|---|
| 1 | Need Someone to Talk to About Your Relationship? | `/talk-about/relationship` | ⚠️ **gap** — we only cover breakups |
| 2 | Feeling Lonely Even When You're Surrounded by People? | `/talk-about/loneliness` | ✅ "I'm Lonely" |
| 3 | Need Someone to Talk to About Work Stress? | `/talk-about/work-stress` | ✅ "Work Is Getting Too Much" |
| 4 | Moved Away From Home and Feeling Alone? | `/talk-about/living-away-from-home` | ✅ "I'm Living Abroad & Missing Home" |
| 5 | Can't Tell Your Family What You're Really Feeling? | `/talk-about/family-pressure` | ✅ "I'm Struggling With Family Pressure" |
| 6 | Going Through a Breakup and Don't Want Advice? | `/talk-about/breakup` | ✅ "I'm Going Through a Breakup" |
| 7 | Overthinking Everything and Need to Get It Out? | `/talk-about/overthinking` | ⚠️ close — ours says "I'm Feeling Overwhelmed" |
| 8 | Having One of Those Days Where You Just Need Someone? | `/talk-about/just-need-someone` | ✅ "I Just Need Someone to Talk To" |

**Two mismatches to settle:**
- We have a **9th card, "I'm Confused About My Career or Life"**, which isn't on the
  client's list. Keep it (it matches the "career uncertainty" target segment) or drop it?
- The client wants **"Relationship"** as its own page — broader than our breakup card.
  Suggest: keep both, breakup as a child of relationship.

**Build recommendation:** one dynamic route (`/talk-about/[slug].vue`) driven by a content
array, not 8 hand-built pages. Same layout, different copy/imagery per entry. Each page
needs its own `<title>`, meta description, and an H1 matching the search phrase.

---

## 6. To-do list

### Ready to build now — no client input needed
- [ ] Wire the 8 `HowWeHelp` cards to `/talk-about/<slug>` instead of `/contact`
- [ ] Build the `/talk-about/[slug]` dynamic route + content model
- [ ] Write the 8 landing pages (H1 = search phrase, story, CTA to the matching session)
- [ ] Per-page SEO: title, meta description, OG image
- [ ] Copy pass retiring "without judgment" / "human connection" / "not therapy" as *headlines*
- [ ] Put **"You don't have to be in crisis to deserve to be heard"** somewhere prominent — Hero is the natural home
- [ ] Rework Hero + Services intro around "a dedicated space to put down what you've been carrying"

### Blocked — needs a client decision first
- [ ] **Confirm the ₹799 First Step exists**, and whether it undercuts the premium tier (see §4)
- [ ] Rename all four sessions once pricing is confirmed — home Services, service-detail, FAQ
- [ ] Fix the "Sessions start at ₹1,799" FAQ line to match the final price ladder
- [ ] Decide whether The Follow-Up stays returning-clients-only
- [ ] Decide on the "Career/Life" card and the Relationship-vs-Breakup split

### Site hygiene, already known
- [ ] Unhide `/service-detail` and `/blog` in [hiddenPages.ts](app/utils/hiddenPages.ts) — all
      Services cards and the Resources section are dead links until this happens
- [ ] Replace `office-dubai.jpg` / `office-paris.jpg` — both are 100×100px placeholders

### Not doing (deliberately)
- ❌ Don't copy Sunno's **₹5/minute** pricing — it destroys the premium tier
- ❌ Don't copy Sunno's **Buddy / multi-listener marketplace** model — TFGC is founder-led,
      and "someone you trust" is the whole basis of the price
- ❌ Don't chase competitors' territories (loneliness / burdens / professional decision-making)

---

---

## 7. Credentials (5 PDFs from the client) — now live on the About page

All five are proof documents. Four are counselling certifications from the same institute;
one is the business registration.

| Document | What it certifies | Issuer | Date |
|---|---|---|---|
| Counselling Diploma | **Diploma in Integrative Counselling** — 150 hours across Carkhuff's Model, REBT and Transactional Analysis | Heart to Heart Counselling Centre, India | 08 Mar 2021 |
| Kinjal Shah.pdf | Certificate in **Personal Counselling** (Carkhuff's Model) | Institute of Human Technology | Jun–Jul 2020 |
| Kinjal Shah (1).pdf | Certificate in **Applied Transactional Analysis** | Institute of Human Technology | Aug–Oct 2020 |
| Kinjal Shah (2).pdf | Certificate in **Counselling** — advanced REBT | Institute of Human Technology | Jan–Mar 2021 |
| Udyam MSME | **UDYAM-MH-18-0458945** — The Feel Good Center, Micro / Services, NIC 86909 | Ministry of MSME, Govt. of India | Registered 08 Jul 2025 |

**Why this matters strategically:** the client's own analysis says the ₹1,799 premium tier
only works "if you build the brand to justify it." Verifiable training is the single
strongest justification available, and none of the three competitors lead with it.
This is a direct answer to §1.

**Shipped:** a new `Credentials` section on the About page
([Credentials.vue](app/pages/about/components/Credentials.vue)), showing the four
certificates as images plus the Udyam registration. PDFs converted to web JPEGs in
`public/images/credentials/`.

### ⚠️ Two judgment calls made — please review

1. **The MSME certificate scan is NOT published.** It contains Kinjal's personal mobile
   number, personal email and home address (Flat 65, Sati Darshan, Malad West). Publishing
   that scan would put her home address on the public internet. The section shows the
   Udyam registration *number* as text instead, which is public-registry information.
   **Do not swap the scan in without redacting it first.**
2. **Framing guards against implying therapy.** The positioning is explicitly "not a
   therapist, not therapy" — but a wall of counselling certificates reads as clinical
   credentials, and one is literally titled *Rational Emotive Behavior **Therapy***. The
   section is therefore introduced with: *"Kinjal is a listener, not a therapist. These
   certifications aren't a licence to treat anyone. They are simply the training that
   shaped how she holds a conversation."* Keep that guard in place if the copy is edited.
   This is a legal/regulatory exposure point, not just a tone one.

---

## 8. Open questions for the client

1. Is ₹799 confirmed for the First Step, given the ₹1,000–₹2,499 tier you described?
2. Does the Follow-Up stay restricted to returning clients?
3. Relationship and Breakup as two landing pages, or one?
4. Keep the "Confused about career/life" entry point?
5. Who writes the 8 landing pages' copy — you, or should we draft and you edit?
6. Do you want a redacted MSME certificate image shown, or is the registration number enough?
7. Are there more credentials (the "10 years in events/hospitality" claim has no document)?

---

## Change log

- **2 Sep 2026** — Client shared 5 credential PDFs. Four certificates published to a new
  About → Credentials section; MSME shown as a registration number only (PII in the scan).
- **2 Sep 2026** — Initial notes from the client's competitive review (Sunno / SunLo /
  HearMe positioning, USP, target customer, session renaming, landing-page strategy).
