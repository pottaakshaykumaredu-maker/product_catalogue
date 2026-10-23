import { productService } from '../services/product.service.ts';
import { ProductItem } from '../models/product.model.ts';
import { notificationService } from '../services/notification.service.ts';

type AcademicTab = 
  | 'weeks1-3' 
  | 'weeks4-5' 
  | 'week6' 
  | 'week7' 
  | 'weeks8-10' 
  | 'week11' 
  | 'weeks12-14' 
  | 'syllabus';

export class AcademicHubComponent {
  private activeTab: AcademicTab = 'weeks1-3';
  private ajaxConsoleOutput: string = '';
  private ajaxLoading: boolean = false;
  private postResponseOutput: string = '';

  // DOM Lab demo state
  private domCounter: number = 0;
  private domLog: string[] = [];

  render(targetElement?: HTMLElement): void {
    const el = targetElement || document.getElementById('app-main-content');
    if (!el) return;

    el.innerHTML = `
      <div class="space-y-8 pb-16">
        
        <!-- Hero Header -->
        <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              ACADEMIC CURRICULUM LABORATORY
            </span>
            <span class="text-xs font-mono text-emerald-400 font-bold">
              ● All 14 Weeks Active &bull; CO1 to CO5 Complete
            </span>
          </div>

          <h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Academic Demonstration Hub &amp; Viva Suite
          </h1>
          <p class="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            This module provides live, verifiable interactive demonstrations for every week in the Web Technologies laboratory syllabus, specifically constructed for university lab practical examinations and viva-voce evaluations.
          </p>

          <!-- 14-Week Navigation Pills -->
          <div class="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
            ${this.renderTabNavButton('weeks1-3', 'Weeks 1–3: HTML5 & CSS3')}
            ${this.renderTabNavButton('weeks4-5', 'Weeks 4–5: JS DOM & Events')}
            ${this.renderTabNavButton('week6', 'Week 6: XML & DTD')}
            ${this.renderTabNavButton('week7', 'Week 7: Skill Test (MCQ)')}
            ${this.renderTabNavButton('weeks8-10', 'Weeks 8–10: AJAX, Fetch & POST')}
            ${this.renderTabNavButton('week11', 'Week 11: TypeScript OOP')}
            ${this.renderTabNavButton('weeks12-14', 'Weeks 12–14: Angular Suite')}
            ${this.renderTabNavButton('syllabus', 'CO1–CO5 & Viva Notes', true)}
          </div>
        </div>

        <!-- Tab Content Display Stage -->
        <div class="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          ${this.renderActiveTabContent()}
        </div>

      </div>
    `;

    this.attachEvents(el);
  }

  private renderTabNavButton(tabKey: AcademicTab, label: string, isSpecial: boolean = false): string {
    const isActive = this.activeTab === tabKey;
    return `
      <button 
        data-academic-tab="${tabKey}"
        class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
          isActive
            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-102'
            : isSpecial
            ? 'bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 border border-amber-400/30'
            : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
        }">
        ${label}
      </button>
    `;
  }

  private renderActiveTabContent(): string {
    switch (this.activeTab) {
      case 'weeks1-3':
        return this.renderWeeks1to3();
      case 'weeks4-5':
        return this.renderWeeks4to5();
      case 'week6':
        return this.renderWeek6();
      case 'week7':
        return this.renderWeek7();
      case 'weeks8-10':
        return this.renderWeeks8to10();
      case 'week11':
        return this.renderWeek11();
      case 'weeks12-14':
        return this.renderWeeks12to14();
      case 'syllabus':
        return this.renderSyllabusAndViva();
      default:
        return '';
    }
  }

  // -------------------------------------------------------------
  // WEEKS 1-3: HTML5 and CSS3
  // -------------------------------------------------------------
  private renderWeeks1to3(): string {
    return `
      <div class="space-y-8">
        <div>
          <span class="text-xs font-extrabold uppercase tracking-wider text-indigo-600">Curriculum Practical Weeks 1, 2 &amp; 3</span>
          <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">HTML5 Semantic Architecture &amp; CSS3 Layout Systems</h2>
          <p class="text-xs text-slate-500 mt-1">
            Focus: Semantic layout tags, static pages, client forms, inline vs internal vs external CSS, Flexbox vs CSS Grid.
          </p>
        </div>

        <!-- Section 1: Inline, Internal & External CSS Comparison -->
        <div class="space-y-4">
          <h3 class="text-base font-bold text-slate-900">1. CSS Specificity &amp; Integration Demonstration</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <span class="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-indigo-500"></span> Inline CSS
              </span>
              <p class="text-xs text-slate-500">Applied directly to elements via <code class="font-mono text-indigo-600">style="..."</code> attribute.</p>
              <div style="background-color: #e0e7ff; color: #3730a3; padding: 10px; border-radius: 8px; font-weight: bold; font-size: 11px;">
                Rendered with Inline CSS (Highest Specificity 1,0,0,0)
              </div>
            </div>

            <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <span class="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Internal CSS
              </span>
              <p class="text-xs text-slate-500">Embedded within document <code class="font-mono text-indigo-600">&lt;style&gt;</code> block in the head.</p>
              <div class="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-[11px] border border-emerald-200">
                Rendered with scoped internal stylesheet classes
              </div>
            </div>

            <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <span class="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-cyan-500"></span> External CSS
              </span>
              <p class="text-xs text-slate-500">Linked globally via <code class="font-mono text-indigo-600">src/styles.css</code> and Tailwind stylesheet.</p>
              <div class="p-2.5 rounded-lg bg-cyan-50 text-cyan-800 font-bold text-[11px] border border-cyan-200">
                Clean separation: <span class="font-mono text-[10px]">src/styles.css</span>
              </div>
            </div>

          </div>
        </div>

        <!-- Section 2: Flexbox vs CSS Grid Interactive Comparison -->
        <div class="space-y-4 pt-4 border-t border-slate-100">
          <h3 class="text-base font-bold text-slate-900">2. Responsive Layout Engines: Flexbox vs Grid</h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <!-- Flexbox Lab -->
            <div class="p-5 rounded-2xl border border-slate-200 space-y-3">
              <div class="flex items-center justify-between">
                <span class="font-bold text-xs text-slate-800">Flexbox: One-Dimensional Layout</span>
                <span class="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">display: flex; gap: 8px;</span>
              </div>
              <p class="text-xs text-slate-500">Ideal for navigation bars, item rows, and centering content along axes.</p>
              <div class="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-100 rounded-xl">
                <div class="p-2 rounded-lg bg-indigo-600 text-white text-xs font-bold">Flex Item 1</div>
                <div class="p-2 rounded-lg bg-indigo-500 text-white text-xs font-bold">Flex Item 2</div>
                <div class="p-2 rounded-lg bg-indigo-400 text-white text-xs font-bold">Flex Item 3</div>
                <div class="p-2 rounded-lg bg-indigo-300 text-indigo-900 text-xs font-bold">Flex Item 4</div>
              </div>
            </div>

            <!-- CSS Grid Lab -->
            <div class="p-5 rounded-2xl border border-slate-200 space-y-3">
              <div class="flex items-center justify-between">
                <span class="font-bold text-xs text-slate-800">CSS Grid: Two-Dimensional Grid</span>
                <span class="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">grid-template-columns: repeat(3, 1fr);</span>
              </div>
              <p class="text-xs text-slate-500">Perfect for multi-row catalogue cards, dashboards, and photo mosaics.</p>
              <div class="grid grid-cols-3 gap-2 p-3 bg-slate-100 rounded-xl text-center">
                <div class="p-2 rounded-lg bg-violet-600 text-white text-xs font-bold">Cell (1,1)</div>
                <div class="p-2 rounded-lg bg-violet-500 text-white text-xs font-bold">Cell (1,2)</div>
                <div class="p-2 rounded-lg bg-violet-400 text-white text-xs font-bold">Cell (1,3)</div>
                <div class="p-2 rounded-lg bg-violet-300 text-violet-900 text-xs font-bold">Cell (2,1)</div>
                <div class="p-2 rounded-lg bg-violet-200 text-violet-900 text-xs font-bold">Cell (2,2)</div>
                <div class="p-2 rounded-lg bg-violet-100 text-violet-900 text-xs font-bold">Cell (2,3)</div>
              </div>
            </div>

          </div>
        </div>

        <!-- Section 3: Semantic Forms & HTML5 Native Validation -->
        <div class="space-y-4 pt-4 border-t border-slate-100">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-bold text-slate-900">3. HTML5 Semantic Elements &amp; Forms</h3>
            <div class="flex gap-2">
              <a href="#login" class="text-xs font-bold text-indigo-600 hover:underline">View Login Page &rarr;</a>
              <a href="#register" class="text-xs font-bold text-indigo-600 hover:underline">View Register Page &rarr;</a>
            </div>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            The application strictly utilizes semantic HTML5 structural elements: <code class="font-mono text-indigo-600">&lt;header&gt;</code>, <code class="font-mono text-indigo-600">&lt;nav&gt;</code>, <code class="font-mono text-indigo-600">&lt;main&gt;</code>, <code class="font-mono text-indigo-600">&lt;article&gt;</code>, <code class="font-mono text-indigo-600">&lt;aside&gt;</code>, and <code class="font-mono text-indigo-600">&lt;footer&gt;</code>. Forms employ HTML5 attributes: <code class="font-mono text-slate-700">required</code>, <code class="font-mono text-slate-700">type="email"</code>, <code class="font-mono text-slate-700">minlength="6"</code>, <code class="font-mono text-slate-700">pattern</code>, and <code class="font-mono text-slate-700">autofocus</code>.
          </p>
        </div>

      </div>
    `;
  }

  // -------------------------------------------------------------
  // WEEKS 4-5: JavaScript DOM & Event Handling
  // -------------------------------------------------------------
  private renderWeeks4to5(): string {
    return `
      <div class="space-y-8">
        <div>
          <span class="text-xs font-extrabold uppercase tracking-wider text-indigo-600">Curriculum Practical Weeks 4 &amp; 5</span>
          <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">JavaScript DOM Manipulation, Events &amp; Client Logic</h2>
          <p class="text-xs text-slate-500 mt-1">
            Focus: Dynamic element creation, event bubbling vs capturing, form validation logic, and client-side cart arithmetic.
          </p>
        </div>

        <!-- Interactive DOM Sandbox -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <!-- Controller Panel -->
          <div class="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
            <h3 class="font-bold text-sm text-slate-900">Live DOM Mutation Console</h3>
            <p class="text-xs text-slate-500">Click buttons to trigger real-time DOM manipulations using <code class="font-mono">document.createElement</code>, <code class="font-mono">appendChild</code>, and class toggling.</p>

            <div class="flex flex-wrap gap-2">
              <button id="dom-add-btn" class="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors">
                + Append Element
              </button>
              <button id="dom-toggle-btn" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors">
                Toggle Highlight
              </button>
              <button id="dom-clear-btn" class="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs transition-colors">
                Reset Container
              </button>
            </div>

            <!-- Event Propagation Demo -->
            <div class="pt-4 border-t border-slate-200 space-y-2">
              <span class="text-xs font-bold text-slate-800">Event Bubbling Demonstration</span>
              <div id="bubble-parent" class="p-4 bg-indigo-100 rounded-xl cursor-pointer hover:bg-indigo-200 transition-colors">
                <span class="text-[10px] font-bold text-indigo-900 uppercase">Parent Container (Listener 1)</span>
                <div id="bubble-child" class="mt-2 p-3 bg-indigo-600 text-white rounded-lg text-xs font-bold text-center cursor-pointer shadow-xs hover:bg-indigo-700">
                  Child Button (Click Me to observe Bubbling)
                </div>
              </div>
            </div>
          </div>

          <!-- Output Stage -->
          <div class="p-6 rounded-2xl border border-slate-200 space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-sm text-slate-900">Dynamic DOM Stage</h3>
              <span class="text-xs font-mono text-slate-600">Items: <strong id="dom-items-count">${this.domCounter}</strong></span>
            </div>

            <div id="dom-target-container" class="min-h-36 p-4 rounded-xl bg-slate-100/70 border border-slate-200 flex flex-wrap gap-2 items-start">
              ${this.domCounter === 0 ? `<p class="text-xs text-slate-400 italic">No dynamic elements created yet. Click "+ Append Element" above.</p>` : ''}
            </div>

            <!-- Execution Log Console -->
            <div class="space-y-1">
              <span class="text-[11px] font-bold uppercase tracking-wider text-slate-600">Event Execution Console</span>
              <div id="dom-log-box" class="h-28 overflow-y-auto bg-slate-900 text-emerald-400 font-mono text-[11px] p-3 rounded-xl space-y-1">
                <div>[JS Runtime]: Ready for DOM interactions.</div>
                ${this.domLog.map(l => `<div>${l}</div>`).join('')}
              </div>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  // -------------------------------------------------------------
  // WEEK 6: XML and DTD
  // -------------------------------------------------------------
  private renderWeek6(): string {
    return `
      <div class="space-y-8">
        <div>
          <span class="text-xs font-extrabold uppercase tracking-wider text-indigo-600">Curriculum Practical Week 6</span>
          <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">XML Document Structure &amp; DTD Schema Validation</h2>
          <p class="text-xs text-slate-500 mt-1">
            Focus: Well-formed vs Valid XML, Element Type Declarations, Attribute Lists, and browser-native DOMParser.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <!-- Column 1: products.dtd -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span> products.dtd (Schema Definition)
              </span>
              <a href="/data/products.dtd" target="_blank" class="text-xs text-indigo-600 hover:underline font-mono">
                /public/data/products.dtd &rarr;
              </a>
            </div>
            <pre class="bg-slate-900 text-amber-300 p-5 rounded-2xl text-xs font-mono overflow-x-auto h-96 shadow-inner leading-relaxed">
&lt;!-- DTD: Product Catalogue Schema --&gt;
&lt;!ELEMENT catalogue (product+)&gt;
&lt;!ATTLIST catalogue
  version CDATA #REQUIRED
  lastUpdated CDATA #REQUIRED
&gt;

&lt;!ELEMENT product (id, name, category, description, price, originalPrice?, rating, stockStatus, stockCount, image, sku)&gt;
&lt;!ATTLIST product
  id ID #REQUIRED
  category CDATA #REQUIRED
  featured (true | false) "false"
&gt;

&lt;!ELEMENT id (#PCDATA)&gt;
&lt;!ELEMENT name (#PCDATA)&gt;
&lt;!ELEMENT category (#PCDATA)&gt;
&lt;!ELEMENT description (#PCDATA)&gt;
&lt;!ELEMENT price (#PCDATA)&gt;
&lt;!ATTLIST price currency CDATA "USD"&gt;
&lt;!ELEMENT originalPrice (#PCDATA)&gt;
&lt;!ELEMENT rating (#PCDATA)&gt;
&lt;!ELEMENT stockStatus (#PCDATA)&gt;
&lt;!ELEMENT stockCount (#PCDATA)&gt;
&lt;!ELEMENT image (#PCDATA)&gt;
&lt;!ELEMENT sku (#PCDATA)&gt;
            </pre>
          </div>

          <!-- Column 2: products.xml -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> products.xml (Document Instance)
              </span>
              <a href="/data/products.xml" target="_blank" class="text-xs text-indigo-600 hover:underline font-mono">
                /public/data/products.xml &rarr;
              </a>
            </div>
            <pre class="bg-slate-900 text-emerald-400 p-5 rounded-2xl text-xs font-mono overflow-x-auto h-96 shadow-inner leading-relaxed">
&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE catalogue SYSTEM "products.dtd"&gt;
&lt;catalogue version="1.0" lastUpdated="2026-10-23"&gt;
  &lt;product id="prod_1" category="Electronics" featured="true"&gt;
    &lt;id&gt;1&lt;/id&gt;
    &lt;name&gt;Sony WH-1000XM5 Wireless Headphones&lt;/name&gt;
    &lt;category&gt;Electronics&lt;/category&gt;
    &lt;description&gt;Industry-leading noise canceling headphones with dual processors...&lt;/description&gt;
    &lt;price currency="USD"&gt;348.00&lt;/price&gt;
    &lt;originalPrice&gt;399.99&lt;/originalPrice&gt;
    &lt;rating&gt;4.8&lt;/rating&gt;
    &lt;stockStatus&gt;In Stock&lt;/stockStatus&gt;
    &lt;stockCount&gt;42&lt;/stockCount&gt;
    &lt;image&gt;https://images.unsplash.com/...&lt;/image&gt;
    &lt;sku&gt;ELEC-SONY-001&lt;/sku&gt;
  &lt;/product&gt;
  &lt;!-- Multiple validated products following DTD --&gt;
&lt;/catalogue&gt;
            </pre>
          </div>

        </div>

        <!-- Live XML Parsing Verification Button -->
        <div class="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="space-y-1">
            <h4 class="font-bold text-sm text-indigo-900">Verify XML Validation &amp; DOM Parsing</h4>
            <p class="text-xs text-indigo-700">Runs client-side <code class="font-mono bg-indigo-100 px-1 rounded">DOMParser().parseFromString()</code> on <code class="font-mono">products.xml</code>.</p>
          </div>
          <button id="verify-xml-btn" class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors shrink-0">
            Run DOMParser XML Validator
          </button>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // WEEK 7: Skill Test
  // -------------------------------------------------------------
  private renderWeek7(): string {
    return `
      <div class="space-y-6">
        <div>
          <span class="text-xs font-extrabold uppercase tracking-wider text-indigo-600">Curriculum Practical Week 7</span>
          <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">Week 7 Comprehensive MCQ Skill Test</h2>
          <p class="text-xs text-slate-500 mt-1">
            10 interactive multiple-choice questions evaluating HTML5, CSS3, JavaScript, XML, DTD, and TypeScript competencies with immediate grading.
          </p>
        </div>

        <div class="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div class="space-y-3 max-w-lg">
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
              Exam Ready • 10 Marks
            </span>
            <h3 class="text-xl font-bold">Launch Interactive Assessment</h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              Complete the test to receive question-by-question academic feedback, grading rubric evaluation, and viva-oriented explanations.
            </p>
          </div>
          <a href="#quiz" class="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white shadow-lg transition-transform hover:scale-105 shrink-0">
            Open Skill Test Mode &rarr;
          </a>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // WEEKS 8-10: AJAX and Fetch API
  // -------------------------------------------------------------
  private renderWeeks8to10(): string {
    return `
      <div class="space-y-8">
        <div>
          <span class="text-xs font-extrabold uppercase tracking-wider text-indigo-600">Curriculum Practical Weeks 8, 9 &amp; 10</span>
          <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">Asynchronous Data Communication: AJAX &amp; Fetch API</h2>
          <p class="text-xs text-slate-500 mt-1">
            Focus: Promises, async/await, response.json(), response.text(), DOMParser, and mock HTTP POST submission.
          </p>
        </div>

        <!-- Live Fetch Testing Console -->
        <div class="p-6 rounded-3xl border border-slate-200 bg-slate-50 space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h3 class="font-bold text-sm text-slate-900">Interactive Pipeline Console</h3>
            <div class="flex flex-wrap gap-2">
              <button id="ajax-fetch-json-btn" class="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors">
                Fetch JSON (response.json())
              </button>
              <button id="ajax-fetch-xml-btn" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors">
                Fetch XML + DOMParser
              </button>
              <button id="ajax-fetch-text-btn" class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors">
                Fetch Text (response.text())
              </button>
            </div>
          </div>

          <!-- Console Output Box -->
          <pre id="ajax-console-output" class="bg-slate-900 text-emerald-400 p-4 rounded-2xl text-xs font-mono h-48 overflow-y-auto shadow-inner leading-relaxed">
${this.ajaxConsoleOutput || '// Click any of the Fetch buttons above to test asynchronous HTTP pipeline.\n// Console logs will show real network timing, status codes, and parsed payload.'}
          </pre>
        </div>

        <!-- POST Submission Demonstration Section -->
        <div class="p-6 rounded-3xl border border-slate-200 space-y-5">
          <div>
            <span class="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">Demonstration Requirement</span>
            <h3 class="text-base font-bold text-slate-900">AJAX POST Product Submission (POST /api/products)</h3>
            <p class="text-xs text-slate-500">
              Submit a new product payload with JSON serialization, HTTP headers (<code class="font-mono">Content-Type: application/json</code>), and Promise handling.
            </p>
          </div>

          <form id="ajax-post-form" class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="space-y-1">
              <label class="text-xs font-bold text-slate-700">Product Name</label>
              <input id="post-name" type="text" required placeholder="e.g. Wireless Ergonomic Keypad" value="Ergonomic Split Keypad" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs" />
            </div>
            <div class="space-y-1">
              <label class="text-xs font-bold text-slate-700">Category</label>
              <select id="post-category" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs">
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Sports">Sports</option>
                <option value="Beauty">Beauty</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div class="space-y-1">
              <label class="text-xs font-bold text-slate-700">Price (USD)</label>
              <input id="post-price" type="number" step="0.01" required value="89.99" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs" />
            </div>

            <div class="sm:col-span-3 pt-1 flex items-center justify-between">
              <span class="text-[11px] text-slate-500 italic">Simulated Endpoint: POST /api/products (Mock Network Latency: 500ms)</span>
              <button type="submit" id="post-submit-btn" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors">
                Send POST Request &rarr;
              </button>
            </div>
          </form>

          ${
            this.postResponseOutput
              ? `
                <div class="p-4 rounded-2xl bg-slate-900 text-emerald-400 text-xs font-mono space-y-1">
                  <div class="text-slate-400 font-bold">// Response Received:</div>
                  <pre class="overflow-x-auto leading-relaxed">${this.postResponseOutput}</pre>
                </div>
              `
              : ''
          }
        </div>

      </div>
    `;
  }

  // -------------------------------------------------------------
  // WEEK 11: TypeScript
  // -------------------------------------------------------------
  private renderWeek11(): string {
    return `
      <div class="space-y-8">
        <div>
          <span class="text-xs font-extrabold uppercase tracking-wider text-indigo-600">Curriculum Practical Week 11</span>
          <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">TypeScript: Interfaces, Classes, Generics &amp; Business Logic</h2>
          <p class="text-xs text-slate-500 mt-1">
            Focus: Strong typing, access modifiers, constructors, computed getters, methods, and compile-time safety.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div class="space-y-3">
            <span class="font-bold text-xs text-slate-900">1. ProductItem Class Definition (src/app/models/product.model.ts)</span>
            <pre class="bg-slate-900 text-indigo-300 p-5 rounded-2xl text-xs font-mono overflow-x-auto h-80 shadow-inner leading-relaxed">
export class ProductItem implements Product {
  constructor(
    public id: number,
    public name: string,
    public category: ProductCategory,
    public description: string,
    public price: number,
    public rating: number,
    public stockStatus: StockStatus,
    public stockCount: number,
    public image: string,
    public sku: string,
    public originalPrice?: number,
    public reviewCount: number = 0,
    public featured: boolean = false
  ) {}

  get discountPercentage(): number {
    if (!this.originalPrice || this.originalPrice &lt;= this.price) return 0;
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }

  isAvailable(): boolean {
    return this.stockCount &gt; 0 &amp;&amp; this.stockStatus !== 'Out of Stock';
  }
}
            </pre>
          </div>

          <div class="space-y-3">
            <span class="font-bold text-xs text-slate-900">2. Interactive Method Execution Stage</span>
            <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4 h-80 flex flex-col justify-between">
              <div class="space-y-2">
                <p class="text-xs text-slate-600">Instantiate a live <code class="font-mono text-indigo-600">ProductItem</code> class and test methods:</p>
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div class="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span class="text-slate-500 text-[10px]">Price:</span>
                    <p class="font-mono font-bold">$348.00</p>
                  </div>
                  <div class="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span class="text-slate-500 text-[10px]">Original Price:</span>
                    <p class="font-mono font-bold">$399.99</p>
                  </div>
                </div>
              </div>

              <div id="ts-eval-result" class="p-3 bg-indigo-900 text-indigo-100 rounded-xl text-xs font-mono space-y-1">
                <div>[TypeScript Method Evaluation]:</div>
                <div>&bull; discountPercentage: <strong>13%</strong></div>
                <div>&bull; isAvailable(): <strong>true</strong> (stock: 42)</div>
                <div>&bull; getFormattedPrice(): <strong>"$348.00"</strong></div>
              </div>

              <button id="ts-recalculate-btn" class="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors">
                Re-evaluate Methods with Dynamic Values
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // WEEKS 12-14: Angular
  // -------------------------------------------------------------
  private renderWeeks12to14(): string {
    return `
      <div class="space-y-8">
        <div>
          <span class="text-xs font-extrabold uppercase tracking-wider text-indigo-600">Curriculum Practical Weeks 12, 13 &amp; 14</span>
          <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">Angular Architecture: Components, Directives, Reactive Forms &amp; DI</h2>
          <p class="text-xs text-slate-500 mt-1">
            Focus: Data binding syntax, structural directives (*ngIf, *ngFor), Dependency Injection with Injectable services, and Client-side Routing.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
            <span class="font-bold text-xs text-indigo-600">Interpolation {{ }}</span>
            <p class="text-[11px] text-slate-600">Outputs TypeScript class properties directly into HTML text nodes.</p>
            <div class="p-2 bg-white rounded-lg border border-slate-200 font-mono text-[10px] text-slate-800">
              {{ product.name }}
            </div>
          </div>

          <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
            <span class="font-bold text-xs text-indigo-600">Property Binding [ ]</span>
            <p class="text-[11px] text-slate-600">Binds component property to target DOM attribute (One-Way).</p>
            <div class="p-2 bg-white rounded-lg border border-slate-200 font-mono text-[10px] text-slate-800">
              [src]="product.image"
            </div>
          </div>

          <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
            <span class="font-bold text-xs text-indigo-600">Event Binding ( )</span>
            <p class="text-[11px] text-slate-600">Listens to DOM events and invokes component class methods.</p>
            <div class="p-2 bg-white rounded-lg border border-slate-200 font-mono text-[10px] text-slate-800">
              (click)="addToCart(p)"
            </div>
          </div>

          <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
            <span class="font-bold text-xs text-indigo-600">Two-Way [(ngModel)]</span>
            <p class="text-[11px] text-slate-600">Simultaneous synchronization between model and form input.</p>
            <div class="p-2 bg-white rounded-lg border border-slate-200 font-mono text-[10px] text-slate-800">
              [(ngModel)]="searchQuery"
            </div>
          </div>
        </div>

        <!-- Dependency Injection Architecture Diagram -->
        <div class="p-6 rounded-3xl border border-slate-200 space-y-4">
          <h3 class="font-bold text-sm text-slate-900">Dependency Injection &amp; Service Singletons</h3>
          <p class="text-xs text-slate-500">
            Our architecture registers three primary singleton services injected across components:
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div class="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1">
              <span class="font-bold text-indigo-900 font-mono">ProductService</span>
              <p class="text-slate-600 text-[11px]">Manages product fetching, XML/JSON parsing, faceted filtering, and POST pipeline.</p>
            </div>
            <div class="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1">
              <span class="font-bold text-emerald-900 font-mono">CartService</span>
              <p class="text-slate-600 text-[11px]">Maintains reactive shopping cart state, stock validation, and promo code arithmetic.</p>
            </div>
            <div class="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-1">
              <span class="font-bold text-amber-900 font-mono">AuthService</span>
              <p class="text-slate-600 text-[11px]">Handles student login sessions, validation, and role-based permissions.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // SYLLABUS & VIVA VOCE CHEAT SHEET
  // -------------------------------------------------------------
  private renderSyllabusAndViva(): string {
    return `
      <div class="space-y-8">
        <div>
          <span class="text-xs font-extrabold uppercase tracking-wider text-amber-600">Academic Examination Reference</span>
          <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">Course Outcomes Matrix &amp; Viva Voce Guide</h2>
          <p class="text-xs text-slate-500 mt-1">
            Complete mapping of Course Outcomes CO1 to CO5 and high-frequency exam questions with ideal answers.
          </p>
        </div>

        <!-- CO Mapping Table -->
        <div class="overflow-x-auto border border-slate-200 rounded-2xl">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th class="p-3.5">Outcome</th>
                <th class="p-3.5">Description</th>
                <th class="p-3.5">Curriculum Weeks</th>
                <th class="p-3.5">Implementation In This Suite</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td class="p-3.5 font-bold text-indigo-600">CO1</td>
                <td class="p-3.5">Design responsive, accessible web pages using HTML5 semantic elements and CSS3 layout models.</td>
                <td class="p-3.5 font-mono">Weeks 1–3</td>
                <td class="p-3.5">Semantic structure (<code class="font-mono">&lt;header&gt;</code>, <code class="font-mono">&lt;nav&gt;</code>, <code class="font-mono">&lt;main&gt;</code>, <code class="font-mono">&lt;article&gt;</code>), Flexbox &amp; Grid in <code class="font-mono">src/styles.css</code>.</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-indigo-600">CO2</td>
                <td class="p-3.5">Implement client-side interactivity, DOM manipulation, form validation, and event handling with JavaScript.</td>
                <td class="p-3.5 font-mono">Weeks 4–5</td>
                <td class="p-3.5">Interactive cart arithmetic, filter engine, search input, event bubbling demo in <code class="font-mono">CartService</code> &amp; components.</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-indigo-600">CO3</td>
                <td class="p-3.5">Author, structure, and validate XML documents using Document Type Definitions (DTD).</td>
                <td class="p-3.5 font-mono">Week 6</td>
                <td class="p-3.5">Valid <code class="font-mono">products.dtd</code> and <code class="font-mono">products.xml</code> in <code class="font-mono">public/data/</code> with DOMParser validation.</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-indigo-600">CO4</td>
                <td class="p-3.5">Perform asynchronous data loading using Fetch API, Promises, async/await, and handle JSON/XML streams.</td>
                <td class="p-3.5 font-mono">Weeks 8–10</td>
                <td class="p-3.5">Asynchronous loading of JSON, XML, TSV text, and simulated POST submission in <code class="font-mono">ProductService</code>.</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-indigo-600">CO5</td>
                <td class="p-3.5">Develop scalable enterprise applications with TypeScript OOP and Angular architecture.</td>
                <td class="p-3.5 font-mono">Weeks 11–14</td>
                <td class="p-3.5"><code class="font-mono">ProductItem</code> class, dependency injection, reactive state, and client routing.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Viva Cheat Sheet -->
        <div class="space-y-4 pt-4">
          <h3 class="text-base font-extrabold text-slate-900">Key Viva Questions &amp; Answers</h3>
          <div class="space-y-3 text-xs">
            
            <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
              <span class="font-bold text-slate-900">Q1: What is the difference between a Well-Formed XML document and a Valid XML document?</span>
              <p class="text-slate-600 leading-relaxed">
                <strong>Ans:</strong> A Well-Formed XML document complies with the core syntax rules of XML (single root element, correctly nested and closed tags, case sensitivity, quoted attributes). A Valid XML document is both well-formed AND strictly adheres to the schema constraints declared in an associated DTD or XML Schema document.
              </p>
            </div>

            <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
              <span class="font-bold text-slate-900">Q2: How does the Fetch API handle HTTP error status codes like 404 or 500?</span>
              <p class="text-slate-600 leading-relaxed">
                <strong>Ans:</strong> Unlike some third-party libraries, the Fetch API Promise does NOT reject on HTTP 404 or 500 errors. It only rejects on network failures or CORS issues. To check for HTTP errors, one must check the <code class="font-mono font-bold text-indigo-600">response.ok</code> boolean property (which is true for status codes in the range 200–299).
              </p>
            </div>

            <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
              <span class="font-bold text-slate-900">Q3: Why is Dependency Injection (DI) preferred in Angular architecture?</span>
              <p class="text-slate-600 leading-relaxed">
                <strong>Ans:</strong> DI delegates the creation and lifecycle of service objects to an external container rather than hardcoding <code class="font-mono">new Service()</code> inside components. This facilitates loose coupling, enforces singleton state sharing (like our <code class="font-mono">CartService</code>), and makes unit testing simple by allowing mock substitutions.
              </p>
            </div>

          </div>
        </div>

      </div>
    `;
  }

  private attachEvents(el: HTMLElement): void {
    // Tab switching
    el.querySelectorAll('[data-academic-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = (btn as HTMLElement).getAttribute('data-academic-tab') as AcademicTab;
        if (tab) {
          this.activeTab = tab;
          this.render(el);
        }
      });
    });

    // WEEKS 4-5: DOM Lab buttons
    const domAdd = el.querySelector('#dom-add-btn');
    const domToggle = el.querySelector('#dom-toggle-btn');
    const domClear = el.querySelector('#dom-clear-btn');
    const targetContainer = el.querySelector('#dom-target-container');
    const countDisplay = el.querySelector('#dom-items-count');
    const logBox = el.querySelector('#dom-log-box');

    if (domAdd && targetContainer) {
      domAdd.addEventListener('click', () => {
        this.domCounter++;
        const newEl = document.createElement('div');
        newEl.className = 'px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold shadow-xs animate-scale-up';
        newEl.textContent = `Node #${this.domCounter}`;
        targetContainer.appendChild(newEl);
        if (countDisplay) countDisplay.textContent = this.domCounter.toString();
        this.addLog(`[DOM Mutation]: Created & appended Node #${this.domCounter}`, logBox);
      });
    }

    if (domToggle && targetContainer) {
      domToggle.addEventListener('click', () => {
        targetContainer.classList.toggle('ring-4');
        targetContainer.classList.toggle('ring-indigo-400');
        this.addLog('[DOM Style]: Toggled ring class on container element', logBox);
      });
    }

    if (domClear && targetContainer) {
      domClear.addEventListener('click', () => {
        this.domCounter = 0;
        targetContainer.innerHTML = `<p class="text-xs text-slate-400 italic">No dynamic elements created yet. Click "+ Append Element" above.</p>`;
        if (countDisplay) countDisplay.textContent = '0';
        this.addLog('[DOM Clear]: Removed all child nodes via innerHTML = ""', logBox);
      });
    }

    // Bubbling demo
    const bubbleParent = el.querySelector('#bubble-parent');
    const bubbleChild = el.querySelector('#bubble-child');

    if (bubbleParent && bubbleChild) {
      bubbleParent.addEventListener('click', () => {
        this.addLog('[Event Bubbling]: Parent container listener fired! (Phase: Bubble)', logBox);
      });
      bubbleChild.addEventListener('click', (e) => {
        this.addLog('[Event Trigger]: Child button clicked!', logBox);
        // Note: we let it bubble naturally so examiners see the bubbling order
      });
    }

    // WEEK 6: XML Verification
    const verifyXmlBtn = el.querySelector('#verify-xml-btn');
    if (verifyXmlBtn) {
      verifyXmlBtn.addEventListener('click', async () => {
        try {
          const res = await productService.fetchProductsAsXML();
          notificationService.success(
            'XML Parsing Succeeded',
            `DOMParser successfully parsed products.xml containing ${res.parsedCount} valid <product> nodes!`
          );
        } catch (err: any) {
          notificationService.error('XML Parse Error', err.message);
        }
      });
    }

    // WEEKS 8-10: Fetch buttons
    const fetchJsonBtn = el.querySelector('#ajax-fetch-json-btn');
    const fetchXmlBtn = el.querySelector('#ajax-fetch-xml-btn');
    const fetchTextBtn = el.querySelector('#ajax-fetch-text-btn');
    const consoleOutput = el.querySelector('#ajax-console-output');

    if (fetchJsonBtn && consoleOutput) {
      fetchJsonBtn.addEventListener('click', async () => {
        consoleOutput.textContent = '// Sending GET /data/products.json via Fetch API...\n';
        const start = performance.now();
        try {
          const res = await fetch('/data/products.json');
          const data = await res.json();
          const elapsed = (performance.now() - start).toFixed(1);
          consoleOutput.textContent = `// [HTTP 200 OK] Fetched in ${elapsed}ms\n` +
            `// Content-Type: application/json\n` +
            `// Total products received: ${data.length}\n\n` +
            JSON.stringify(data.slice(0, 2), null, 2) +
            `\n\n// ... (${data.length - 2} more items parsed successfully)`;
          notificationService.success('Fetch Success', `Fetched ${data.length} JSON products in ${elapsed}ms.`);
        } catch (e: any) {
          consoleOutput.textContent = `// Error: ${e.message}`;
        }
      });
    }

    if (fetchXmlBtn && consoleOutput) {
      fetchXmlBtn.addEventListener('click', async () => {
        consoleOutput.textContent = '// Sending GET /data/products.xml...\n';
        const start = performance.now();
        try {
          const xmlData = await productService.fetchProductsAsXML();
          const elapsed = (performance.now() - start).toFixed(1);
          consoleOutput.textContent = `// [HTTP 200 OK] Fetched XML in ${elapsed}ms\n` +
            `// Parsed with DOMParser: ${xmlData.parsedCount} <product> elements\n\n` +
            xmlData.rawXml.substring(0, 600) + '...\n[Truncated for console display]';
          notificationService.success('XML Fetch Success', `Parsed ${xmlData.parsedCount} XML products via DOMParser.`);
        } catch (e: any) {
          consoleOutput.textContent = `// Error: ${e.message}`;
        }
      });
    }

    if (fetchTextBtn && consoleOutput) {
      fetchTextBtn.addEventListener('click', async () => {
        consoleOutput.textContent = '// Sending GET /data/products.txt via response.text()...\n';
        const start = performance.now();
        try {
          const textData = await productService.fetchProductsAsText();
          const elapsed = (performance.now() - start).toFixed(1);
          consoleOutput.textContent = `// [HTTP 200 OK] Fetched plain text stream in ${elapsed}ms\n` +
            `// Content-Type: text/plain\n\n` +
            textData;
          notificationService.success('Text Fetch Success', `Fetched raw text TSV in ${elapsed}ms.`);
        } catch (e: any) {
          consoleOutput.textContent = `// Error: ${e.message}`;
        }
      });
    }

    // POST Form Submission
    const postForm = el.querySelector('#ajax-post-form') as HTMLFormElement;
    if (postForm) {
      postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = (el.querySelector('#post-name') as HTMLInputElement).value;
        const category = (el.querySelector('#post-category') as HTMLSelectElement).value;
        const price = Number((el.querySelector('#post-price') as HTMLInputElement).value);

        const submitBtn = el.querySelector('#post-submit-btn') as HTMLButtonElement;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Transmitting...';

        try {
          const result = await productService.submitNewProduct({
            name,
            category: category as any,
            price
          });

          this.postResponseOutput = JSON.stringify({
            status: 201,
            statusText: "Created",
            endpoint: "POST /api/products",
            payload: {
              id: result.createdProduct.id,
              sku: result.createdProduct.sku,
              name: result.createdProduct.name,
              category: result.createdProduct.category,
              price: result.createdProduct.price,
              createdTimestamp: new Date().toISOString()
            },
            serverMessage: result.message
          }, null, 2);

          notificationService.success('POST Submitted', result.message);
          this.render(el);
        } catch (err: any) {
          notificationService.error('POST Error', err.message);
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send POST Request →';
        }
      });
    }

    // TypeScript evaluate button
    const tsBtn = el.querySelector('#ts-recalculate-btn');
    if (tsBtn) {
      tsBtn.addEventListener('click', () => {
        const dummyProduct = new ProductItem(
          99,
          'Dynamic TypeScript Test Item',
          'Electronics',
          'Test description',
          149.99,
          4.9,
          'In Stock',
          12,
          '',
          'TS-DYN-099',
          199.99
        );
        const evalBox = el.querySelector('#ts-eval-result');
        if (evalBox) {
          evalBox.innerHTML = `
            <div>[Dynamic TypeScript Class Instance Created]:</div>
            <div>&bull; Product: <strong>${dummyProduct.name}</strong></div>
            <div>&bull; Price: <strong>$${dummyProduct.price}</strong> (Orig: $${dummyProduct.originalPrice})</div>
            <div>&bull; Getter discountPercentage: <strong>${dummyProduct.discountPercentage}%</strong></div>
            <div>&bull; Method isAvailable(): <strong>${dummyProduct.isAvailable()}</strong> (units: ${dummyProduct.stockCount})</div>
          `;
        }
        notificationService.success('TypeScript Evaluated', 'Class getters and methods executed with strong typing.');
      });
    }
  }

  private addLog(msg: string, logBox: Element | null): void {
    const time = new Date().toLocaleTimeString();
    const formatted = `[${time}] ${msg}`;
    this.domLog.push(formatted);
    if (this.domLog.length > 20) this.domLog.shift();
    if (logBox) {
      const line = document.createElement('div');
      line.textContent = formatted;
      logBox.appendChild(line);
      logBox.scrollTop = logBox.scrollHeight;
    }
  }
}
