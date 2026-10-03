# SAFESTEP 🛡️

### Your financial incident, reconstructed.

SAFESTEP is an AI-powered financial safety assistant designed to help Indian retail investors understand and respond to suspicious financial incidents.

Instead of simply labeling something as a "scam", SAFESTEP reconstructs what happened from user-provided evidence such as messages, screenshots, receipts, text, and voice.

It transforms scattered information into a clear:

**Evidence → Incident → Timeline → Risk Signals → Response**

and helps users identify what they can verify, what remains uncertain, and what they should do next.

---

## 🎯 The Problem

Financial scams targeting retail investors are becoming increasingly sophisticated.

For first-time investors, elderly users, regional-language users, and people with low digital or financial literacy, it can be difficult to answer basic questions after something suspicious happens:

* What actually happened?
* What did the person claim?
* What did they ask me to do?
* Did I already send money?
* What evidence do I have?
* What should I do now?
* What should I avoid doing next?
* Is someone now trying to scam me again?

SAFESTEP is designed around these questions.

---

## 💡 Our Approach

SAFESTEP takes voluntarily provided evidence and reconstructs the incident into a structured, understandable representation.

### 1. Provide Evidence

Upload screenshots, receipts, documents, messages, or describe what happened using text or voice.

### 2. Reconstruct the Incident

SAFESTEP extracts relevant actors, claims, requests, actions, payments, timestamps, and other important events.

### 3. Build the Timeline

Scattered evidence is transformed into a chronological incident timeline.

### 4. Explain Risk Signals

Instead of relying on a mysterious percentage score, SAFESTEP explains specific signals such as urgency, escalating payment requests, authority claims, and unverified identities.

### 5. Guide the Next Step

Users receive clear, safety-focused guidance and are directed toward appropriate official channels.

### 6. Protect Against the Second Scam

If someone later contacts a victim claiming they can recover the lost money for another payment, SAFESTEP can analyze that communication in the context of the original incident.

---

## 🧠 Core Feature

### Incident Reconstruction

SAFESTEP represents an incident as a structured relationship between:

```text
INCIDENT
   ↓
ACTOR
   ↓
CLAIM
   ↓
CHANNEL
   ↓
REQUEST
   ↓
USER ACTION
   ↓
PAYMENT
   ↓
SECOND REQUEST
   ↓
RECOVERY CONTACT
   ↓
RESPONSE
```

Each important event can be connected back to the evidence that supports it.

This allows users to distinguish between:

* **Confirmed from evidence**
* **User reported**
* **Inferred**
* **Unverified**

---

## 🛡️ Recovery Shield

A financial loss can sometimes be followed by another attempt to exploit the victim.

For example:

> "We can recover your ₹38,500. Pay ₹4,999 processing fees."

SAFESTEP allows this new communication to be analyzed against the original incident.

It can identify potential indicators such as:

* Recovery promises
* Additional payment requests
* Urgency
* Connection to the previous incident
* Pressure to pay again

The new communication can then be attached to the original incident timeline.

---

## 🌏 Built for Bharat

SAFESTEP is designed for India's diverse users and supports:

* 🇮🇳 English
* हिन्दी Hindi
* বাংলা Bengali
* मराठी Marathi
* తెలుగు Telugu
* தமிழ் Tamil
* ગુજરાતી Gujarati
* ਪੰਜਾਬੀ Punjabi
* অসমীয়া Assamese
* মৈতৈলোন্ Manipuri
* ଓଡ଼ିଆ Odia

The goal is not simply to translate buttons.

Incident explanations, timelines, risk signals, voice interaction, and guidance are designed to work in the user's selected language.

Mixed-language input is also supported where possible, reflecting how people naturally communicate in India.

---

## ♿ Accessibility

SAFESTEP is designed with:

* Large touch targets
* High-contrast interfaces
* Simple language
* Voice-first interaction
* Regional-language support
* Clear visual hierarchy
* Minimal financial jargon
* Mobile-first design
* Reduced-motion support

The product is intended to be usable by first-time investors, elderly users, and people with limited digital or financial literacy.

---

## 🔐 Privacy & Safety

SAFESTEP follows a data-minimization approach.

The application does **not** ask users to provide:

* OTPs
* Passwords
* PINs
* CVVs
* Banking credentials

Users provide only the evidence they choose to analyze.

SAFESTEP clearly distinguishes between information that can be verified and information that cannot.

---

## 🚫 What SAFESTEP Does Not Do

SAFESTEP is **not** an investment advisor.

It does not provide:

* Stock recommendations
* Buy/sell/hold advice
* Price predictions
* Guaranteed returns
* Investment schemes
* Broker recommendations
* Speculative financial advice

Its purpose is financial safety, incident understanding, and response guidance.

---

## 🏗️ Technology

The prototype is built using modern web technologies including:

* **React**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **Framer Motion**
* AI / multimodal analysis
* OCR / document processing
* Speech-to-text
* Rule-based safety engine
* Structured incident data model
* Official-source information layer

The architecture separates AI processing, deterministic safety rules, official-source guidance, storage, and presentation.

---

## 🎨 Design System

SAFESTEP uses a nature-inspired Indian safety palette:

| Color          | Hex       | Purpose                |
| -------------- | --------- | ---------------------- |
| Dark Green     | `#0A3323` | Primary background     |
| Moss Green     | `#839958` | Primary accent         |
| Beige          | `#F7F4D5` | Main surfaces          |
| Rosy Brown     | `#D3968C` | Human/emotional accent |
| Midnight Green | `#105666` | Secondary dark accent  |

The interface combines these colors through subtle gradients, structured surfaces, and purposeful motion.

The design philosophy is:

> **Calm under pressure. Clear when it matters.**

---

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/SAFESTEP.git
cd SAFESTEP
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Add the required API configuration to `.env`.

Start the development server:

```bash
npm run dev
```

Then open the local development URL shown in the terminal.

---

## 🧪 Demo Mode

SAFESTEP includes a deterministic demo incident so the core experience remains usable even when external AI services are unavailable.

### Demo scenario

**Fake IPO Allotment**

```text
Investment message
        ↓
IPO allocation claim
        ↓
₹38,500 payment request
        ↓
Payment made
        ↓
₹12,000 additional request
        ↓
Recovery agent contacts victim
        ↓
₹4,999 recovery fee request
```

This demonstrates the complete SAFESTEP journey:

**Evidence → Reconstruction → Timeline → Risk Signals → Response → Recovery Shield**

---

## 📁 Project Philosophy

SAFESTEP prioritizes **depth over feature overload**.

The core journey is:

```text
Something happened
       ↓
Show us what you have
       ↓
Reconstruct the incident
       ↓
Understand what can be verified
       ↓
Identify potential warning signals
       ↓
Understand what to do next
       ↓
Avoid the next scam
```

Every feature should strengthen this journey.

---

## 🌱 Future Possibilities

Potential future extensions include:

* More Indian languages
* Offline-first capabilities
* Advanced voice interaction
* Additional accessibility modes
* Family-assisted incident support
* Structured incident export
* More official verification integrations
* Expanded multilingual evidence processing

---

## ⚠️ Disclaimer

SAFESTEP is an informational safety and incident-reconstruction prototype.

It does not provide legal, financial, or investment advice and does not guarantee fraud detection, prevention, or recovery of funds.

Users should rely on appropriate official authorities and verified channels when reporting financial fraud or seeking assistance.

---

## 🏆 Built for SANGYAN

SAFESTEP is being developed as a technology-driven solution for **SANGYAN**, focused on making financial safety more understandable, accessible, and resilient for India's retail investors.

---

### SAFESTEP

**Pause. Understand. Act.**

**Your financial incident, reconstructed.**
