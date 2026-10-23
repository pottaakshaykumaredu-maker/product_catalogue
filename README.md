# Product Catalogue — Academic Web Technologies Project Suite

A complete, production-grade Product Catalogue application developed for university **Web Technologies Laboratory** curriculum requirements and academic Viva Voce evaluations. 

Developed strictly in accordance with syllabus specifications: **Angular Architecture, TypeScript, HTML5, CSS3, JavaScript, XML, DTD, JSON, AJAX, and Fetch API**. Contains zero React or Vue code.

---

## 1. Project Overview & Quick Start

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Setup & Execution Commands
```bash
# 1. Install dependencies
npm install

# 2. Run the development server (runs on port 3000)
npm run dev

# 3. Compile / typecheck codebase
npm run lint

# 4. Production build
npm run build

# 5. Preview production build
npm run preview
```

The application runs at `http://localhost:3000/`.

---

## 2. Compact Feature-Based Architecture

```text
product-catalogue/
├── public/
│   └── data/
│       ├── products.json           # 18+ items across 7 departments with full metadata
│       ├── products.xml            # Valid XML document instance (Week 6)
│       ├── products.dtd            # Document Type Definition schema (Week 6)
│       └── products.txt            # TSV stream manifest for response.text() AJAX demo
├── src/
│   ├── app/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── header.component.ts # Responsive navbar with real-time cart badge
│   │   │   ├── footer.component.ts # CO mapping & syllabus quick navigation
│   │   │   ├── product-card.component.ts # Product card with stock badges & quick add
│   │   │   └── notification.component.ts # Animated toast alert notifications
│   │   ├── pages/                  # Routed application views
│   │   │   ├── home.component.ts   # Hero, category preview, featured products
│   │   │   ├── products.component.ts # Catalogue with faceted search, filter & sort
│   │   │   ├── product-detail.component.ts # Stock tracking, specs, XML tab & related items
│   │   │   ├── categories.component.ts # 7 core departments with sample previews
│   │   │   ├── cart.component.ts   # Cart CRUD, math breakdown & promo code engine
│   │   │   ├── login.component.ts  # Client validated portal with quick demo presets
│   │   │   ├── register.component.ts # Registration form with password strength meter
│   │   │   ├── quiz.component.ts   # Week 7: 10-Q MCQ Skill Test with instant grading
│   │   │   └── academic-hub.component.ts # Interactive 14-week practical demonstration lab
│   │   ├── services/               # Angular Injectable Service Singletons (DI)
│   │   │   ├── product.service.ts  # HTTP data fetching, XML/Text parsing, POST pipeline
│   │   │   ├── cart.service.ts     # Reactive state, stock limits, promo discounts
│   │   │   ├── auth.service.ts     # User authentication, role management & sessions
│   │   │   └── notification.service.ts # Reactive toast notifications
│   │   ├── models/                 # TypeScript Interfaces & OOP Classes
│   │   │   ├── product.model.ts    # Product interface & ProductItem class with methods
│   │   │   ├── cart-item.model.ts  # Cart item & summary models
│   │   │   └── user.model.ts       # User & form models
│   │   ├── app.component.ts        # Root Angular component with router outlet
│   │   └── app.routes.ts           # Hash-based client router & route definitions
│   ├── academic/                   # Academic practical reference implementations
│   │   ├── html/index.html         # HTML5 semantic document reference
│   │   ├── css/layout.css          # CSS3 Flexbox & Grid reference
│   │   ├── javascript/dom-lab.js   # JavaScript DOM manipulation & bubbling reference
│   │   └── typescript/types-demo.ts# TypeScript classes & interface reference
│   ├── styles.css                  # Global styles, variables & Tailwind CSS
│   ├── index.html                  # Semantic entry point (<app-root>)
│   └── main.ts                     # Angular application bootstrap
├── package.json                    # Project scripts & dependencies
├── angular.json                    # Angular workspace configuration descriptor
└── tsconfig.json                   # Strict TypeScript compiler options
```

---

## 3. Academic Coverage — All 14 Weeks Mapping

Every single week of the university Web Technologies curriculum is mapped to functional, verifiable files and interactive demonstrations:

| Week | Curriculum Topic | Source Files & Data | Verifiable Feature Demonstration |
|---|---|---|---|
| **Week 1** | HTML5 Semantic Elements & Document Structure | `index.html`, `src/academic/html/index.html` | Semantic layout using `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, and `<footer>` tags. |
| **Week 2** | CSS3 Styling & Box Model (Inline, Internal, External) | `src/styles.css`, `src/academic/css/layout.css` | Comparative demo of inline, internal, and external CSS specificity rules; border-box model; custom theme tokens. |
| **Week 3** | CSS3 Flexbox, CSS Grid & Responsive Layouts | `src/app/pages/products.component.ts`, `academic-hub` | Live Flexbox vs CSS Grid comparison lab; multi-column responsive catalogue grid adapting to viewport. |
| **Week 4** | JavaScript DOM Manipulation & Node Traversal | `src/academic/javascript/dom-lab.js`, `academic-hub` | Interactive DOM mutation sandbox: `createElement`, `appendChild`, dynamic style mutation, and counter. |
| **Week 5** | JavaScript Event Handling & Form Validation | `src/app/pages/login.component.ts`, `register.component.ts` | Event bubbling vs capturing lab; real-time client-side form validation; password strength score calculator. |
| **Week 6** | XML Schema Definition & DTD Validation | `public/data/products.dtd`, `public/data/products.xml` | Valid product XML document instance governed by `products.dtd`; browser `DOMParser` verification. |
| **Week 7** | Mid-Term Skill Test (Comprehensive MCQs) | `src/app/pages/quiz.component.ts` | 10 multiple-choice questions with real-time scoring, progress tracker, grading rubric, and academic explanations. |
| **Week 8** | Asynchronous Data Loading (JSON & Text via AJAX) | `public/data/products.json`, `public/data/products.txt` | `fetch()` API implementation with `response.json()` and plain text streaming via `response.text()`. |
| **Week 9** | XML Data Fetching & DOMParser Processing | `src/app/services/product.service.ts` | Asynchronous XML fetching via Fetch API, parsing with `DOMParser()`, and node traversal via `getElementsByTagName`. |
| **Week 10** | Promises, async/await & HTTP POST Demonstration | `src/app/pages/academic-hub.component.ts`, `product.service.ts` | Promise handling (`then`/`catch`/`async`/`await`); simulated `POST /api/products` JSON payload submission. |
| **Week 11** | TypeScript Classes, Interfaces & Business Methods | `src/app/models/product.model.ts`, `src/academic/typescript/` | `ProductItem` class implementing `Product` interface; access modifiers, constructor parameter properties, `isAvailable()` method, `discountPercentage` getter. |
| **Week 12** | Angular Components & Data Binding Architecture | `src/app/app.component.ts`, `components/` | Modular component architecture; demonstration of `{{}}` interpolation, `[]` property binding, `()` event binding, and `[()]` two-way synchronization. |
| **Week 13** | Directives (`*ngIf`, `*ngFor`) & Reactive Forms | `src/app/pages/products.component.ts`, `cart.component.ts` | Structural directives pattern for conditional rendering (`*ngIf`) and collection looping (`*ngFor`); reactive forms state. |
| **Week 14** | Dependency Injection, Singletons & Client Routing | `src/app/services/`, `src/app/app.routes.ts` | Dependency injection container with singleton services (`ProductService`, `CartService`, `AuthService`); hash router with route parameters. |

---

## 4. Course Outcomes (CO1 to CO5) Mapping Matrix

| Course Outcome | Description | Academic Implementation Details |
|---|---|---|
| **CO1** | Design responsive, accessible web pages using HTML5 semantic elements and CSS3 layout models. | Fully responsive HTML5 layout with mobile drawer, Flexbox navigation, and CSS Grid catalogue cards in `src/styles.css` and `src/app/components/`. |
| **CO2** | Implement client-side interactivity, DOM manipulation, form validation, and event handling with JavaScript. | Real-time search, filter and sort engine; cart increment/decrement arithmetic; form validation regex; event bubbling lab in `src/app/services/cart.service.ts`. |
| **CO3** | Author, structure, and validate XML documents using Document Type Definitions (DTD). | Validated `public/data/products.xml` conforms strictly to `public/data/products.dtd`. Validated dynamically via browser `DOMParser`. |
| **CO4** | Perform asynchronous data loading using Fetch API, Promises, async/await, and handle JSON/XML streams. | Multi-stream asynchronous data pipelines (JSON, XML, TSV) and `POST /api/products` simulation in `src/app/services/product.service.ts`. |
| **CO5** | Develop scalable enterprise applications with TypeScript OOP and Angular architecture. | Strong typing, OOP classes with encapsulation, Angular Component-Service-Router architecture, and Dependency Injection pattern throughout `src/app/`. |

---

## 5. Viva Voce Examiner Questions & Quick Reference

### Q1: What is the primary difference between a Well-Formed XML document and a Valid XML document?
**Answer:** A *well-formed* XML document conforms to basic XML syntax rules (has a single root, properly nested and closed tags, case sensitivity, quoted attributes). A *valid* XML document is well-formed AND adheres to an external schema definition, such as a Document Type Definition (`DTD`) or XML Schema (`XSD`).

### Q2: Why does Fetch API require two Promise steps (e.g. `await fetch()` then `await response.json()`)?
**Answer:** `fetch()` resolves as soon as the HTTP response headers arrive. The response body is a readable stream transmitted over the network in chunks. Calling `response.json()` or `response.text()` returns a second Promise that asynchronously streams and parses the complete payload.

### Q3: What is the difference between CSS Flexbox and CSS Grid?
**Answer:** Flexbox is primarily a **one-dimensional** layout system (laying out items in either a row OR a column at a time), ideal for navigation bars and linear alignments. CSS Grid is a **two-dimensional** layout system (handling rows AND columns simultaneously), ideal for complex page layouts and product catalogue grids.

### Q4: How does Dependency Injection (DI) enhance Angular application architecture?
**Answer:** Dependency Injection separates the creation of an object from its usage. Rather than components instantiating dependencies directly via `new Service()`, dependencies are provided by an injector. This ensures singleton state management across routes (e.g., preserving cart items between pages) and enables seamless mocking during unit testing.

### Q5: What is event bubbling in JavaScript?
**Answer:** When an event occurs on a DOM element, the event first runs handlers on that element, then on its parent, and upwards on all ancestors until `document` and `window`. This is known as event bubbling. It can be stopped using `event.stopPropagation()`.

---

## 6. Testing & Quality Assurance

- **Linter / Typecheck:** Passed with zero TypeScript errors (`tsc --noEmit`).
- **Production Build:** Passes cleanly via `npm run build`.
- **Cross-Browser Verification:** Works seamlessly across modern desktop and mobile browsers.
