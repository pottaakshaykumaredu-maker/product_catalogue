export interface QuizQuestion {
  id: number;
  category: 'HTML5' | 'CSS3' | 'JavaScript' | 'XML & DTD' | 'AJAX' | 'TypeScript' | 'Angular';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export class QuizComponent {
  private questions: QuizQuestion[] = [
    {
      id: 1,
      category: 'HTML5',
      question: 'Which HTML5 semantic element is most appropriate for enclosing independent, self-contained syndicated content such as a product card or blog post?',
      options: ['<aside>', '<section>', '<article>', '<div>'],
      correctAnswer: 2,
      explanation: '<article> represents a self-contained composition in a document, page, application, or site, intended to be independently distributable or reusable.'
    },
    {
      id: 2,
      category: 'CSS3',
      question: 'In the CSS3 Flexbox layout model, which property aligns flex items along the cross axis?',
      options: ['justify-content', 'align-items', 'flex-direction', 'align-content'],
      correctAnswer: 1,
      explanation: 'align-items defines the default behavior for how flex items are laid out along the cross axis on the current line, whereas justify-content aligns along the main axis.'
    },
    {
      id: 3,
      category: 'JavaScript',
      question: 'In JavaScript DOM event handling, which method terminates the propagation of an event through the capture and bubbling phases?',
      options: ['event.preventDefault()', 'event.stopPropagation()', 'event.stopImmediate()', 'event.cancelBubble = false'],
      correctAnswer: 1,
      explanation: 'event.stopPropagation() prevents further propagation of the current event in the capturing and bubbling phases, whereas preventDefault() merely stops the default browser action.'
    },
    {
      id: 4,
      category: 'XML & DTD',
      question: 'In a Document Type Definition (DTD), what is the primary difference between #PCDATA and CDATA?',
      options: [
        '#PCDATA is used for unparsed character data in elements, while CDATA is parsed',
        '#PCDATA is parsed character data used inside elements; CDATA is character data used for attribute values',
        'Both are identical keywords in XML DTD specifications',
        'CDATA can only contain binary image data'
      ],
      correctAnswer: 1,
      explanation: '#PCDATA stands for Parsed Character Data (XML parser will analyze text for markup), used in element definitions. CDATA is Character Data, primarily used for attribute values or <![CDATA[ ]]> blocks where markup is ignored.'
    },
    {
      id: 5,
      category: 'XML & DTD',
      question: 'When is an XML document considered "Valid" rather than merely "Well-Formed"?',
      options: [
        'When it contains a closing tag for every opening tag',
        'When it conforms strictly to an associated DTD or XML Schema definition',
        'When it uses UTF-8 encoding without any special characters',
        'When it is parsed using JavaScript DOMParser without errors'
      ],
      correctAnswer: 1,
      explanation: 'An XML document is Well-Formed if it satisfies basic XML syntax rules (root element, closed tags, case sensitivity). It is "Valid" only if it conforms to the structure defined in a referenced DTD or XML Schema.'
    },
    {
      id: 6,
      category: 'AJAX',
      question: 'When fetching JSON data with the standard Fetch API, why is a two-step Promise resolution required (await response.json())?',
      options: [
        'The first step waits for HTTP headers to arrive; the second asynchronously streams and parses the HTTP response body stream',
        'Fetch API is legacy and was originally written for synchronous XHR',
        'The browser converts the JSON into XML first before executing DOMParser',
        'It is a redundant legacy syntax from ES5'
      ],
      correctAnswer: 0,
      explanation: 'The fetch() promise resolves as soon as the server responds with headers. Because the body may still be streaming over the network, response.json() returns a second promise that resolves once the entire stream is received and parsed.'
    },
    {
      id: 7,
      category: 'TypeScript',
      question: 'In TypeScript, what is the role of constructor parameter properties (e.g., constructor(public id: number))?',
      options: [
        'They define private static global variables accessible throughout the class',
        'They declare a constructor parameter and automatically create and initialize a class member with the same name and access modifier in one step',
        'They enforce runtime validation on the JSON response',
        'They are only used in Unit tests for mock injection'
      ],
      correctAnswer: 1,
      explanation: 'TypeScript parameter properties allow you to create and initialize a member variable directly from a constructor parameter by prefixing it with an accessibility modifier (public, private, or protected).'
    },
    {
      id: 8,
      category: 'Angular',
      question: 'In Angular template syntax, what do square brackets [property] and parentheses (event) signify?',
      options: [
        '[property] is Event Binding; (event) is Property Binding',
        '[property] is One-Way Property Binding (Component to DOM); (event) is Event Binding (DOM to Component)',
        'Both denote Two-Way Data Binding identical to [(ngModel)]',
        'Square brackets define CSS selectors; parentheses define HTML attributes'
      ],
      correctAnswer: 1,
      explanation: 'In Angular, [] indicates one-way property binding from component class to target DOM property, while () represents event binding from the DOM event back to the component class handler.'
    },
    {
      id: 9,
      category: 'Angular',
      question: 'Which Angular structural directive conditionally includes or excludes a subtree of elements from the DOM based on a truthy expression?',
      options: ['*ngIf', '[ngClass]', '*ngFor', '[ngStyle]'],
      correctAnswer: 0,
      explanation: '*ngIf inserts or removes elements from the DOM tree based on the evaluation of an expression, in contrast to [hidden] which merely alters CSS visibility.'
    },
    {
      id: 10,
      category: 'Angular',
      question: 'What is the primary benefit of Dependency Injection (DI) and @Injectable() services in Angular architecture?',
      options: [
        'To prevent client-side JavaScript execution in the browser',
        'To decouple component classes from the instantiation and lifecycle of their dependencies, promoting modularity, reusability, and testability',
        'To compile TypeScript directly to WebAssembly bytecode',
        'To replace HTML templates with JSX expressions'
      ],
      correctAnswer: 1,
      explanation: 'Dependency Injection is an architectural design pattern in which an object or component receives its dependencies from an external injector rather than instantiating them directly, enabling loose coupling and singletons.'
    }
  ];

  private userAnswers: Record<number, number> = {};
  private isSubmitted: boolean = false;
  private currentQuestionIndex: number = 0;

  render(targetElement?: HTMLElement): void {
    const el = targetElement || document.getElementById('app-main-content');
    if (!el) return;

    const totalQuestions = this.questions.length;
    const answeredCount = Object.keys(this.userAnswers).length;
    const currentQ = this.questions[this.currentQuestionIndex];

    el.innerHTML = `
      <div class="max-w-3xl mx-auto space-y-8 pb-16">
        
        <!-- Header -->
        <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              WEEK 7 ACADEMIC EVALUATION
            </span>
            <span class="text-xs text-slate-300 font-mono">
              Progress: ${answeredCount} / ${totalQuestions} Answered
            </span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Web Technologies Comprehensive Skill Test
          </h1>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
            10 multiple-choice questions evaluating core competencies across HTML5, CSS3, JavaScript DOM, XML/DTD schemas, AJAX pipelines, TypeScript, and Angular architecture.
          </p>

          <!-- Progress Bar -->
          <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden mt-3">
            <div class="bg-gradient-to-r from-amber-400 to-emerald-400 h-full transition-all duration-300" style="width: ${(answeredCount / totalQuestions) * 100}%"></div>
          </div>
        </div>

        ${
          this.isSubmitted
            ? this.renderResults()
            : `
              <!-- Question Card -->
              <div class="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
                
                <!-- Question Metadata Header -->
                <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div class="flex items-center gap-2">
                    <span class="w-7 h-7 rounded-lg bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center">
                      ${currentQ.id}
                    </span>
                    <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                      ${currentQ.category}
                    </span>
                  </div>
                  <span class="text-xs text-slate-600 font-mono">Question ${this.currentQuestionIndex + 1} of ${totalQuestions}</span>
                </div>

                <!-- Question Text -->
                <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  ${currentQ.question}
                </h3>

                <!-- Options List -->
                <div class="space-y-3 pt-2">
                  ${currentQ.options.map((opt, idx) => {
                    const isSelected = this.userAnswers[currentQ.id] === idx;
                    return `
                      <button 
                        data-option-idx="${idx}"
                        class="w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-indigo-50/80 border-indigo-500 text-indigo-950 font-bold shadow-xs'
                            : 'bg-slate-50/60 border-slate-200/80 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                        }">
                        <span class="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                          isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 text-slate-500'
                        }">
                          ${String.fromCharCode(65 + idx)}
                        </span>
                        <span class="leading-relaxed flex-1">${opt}</span>
                      </button>
                    `;
                  }).join('')}
                </div>

                <!-- Navigation Controls -->
                <div class="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button 
                    id="prev-question-btn"
                    ${this.currentQuestionIndex === 0 ? 'disabled' : ''}
                    class="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    &larr; Previous
                  </button>

                  <div class="flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-none">
                    ${this.questions.map((q, qIdx) => `
                      <button 
                        data-jump-question="${qIdx}"
                        class="w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                          qIdx === this.currentQuestionIndex
                            ? 'bg-indigo-600 text-white'
                            : this.userAnswers[q.id] !== undefined
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }">
                        ${q.id}
                      </button>
                    `).join('')}
                  </div>

                  ${
                    this.currentQuestionIndex === totalQuestions - 1
                      ? `
                        <button 
                          id="submit-quiz-btn"
                          class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5">
                          <span>Submit &amp; Score</span>
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      `
                      : `
                        <button 
                          id="next-question-btn"
                          class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors">
                          Next &rarr;
                        </button>
                      `
                  }
                </div>

              </div>
            `
        }

      </div>
    `;

    this.attachEvents(el);
  }

  private renderResults(): string {
    let score = 0;
    this.questions.forEach(q => {
      if (this.userAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    const percentage = Math.round((score / this.questions.length) * 100);
    let grade = 'Distinction (First Class Exemplary)';
    let gradeBadge = 'bg-emerald-100 text-emerald-800 border-emerald-300';

    if (percentage < 60) {
      grade = 'Pass (Needs Practical Revision)';
      gradeBadge = 'bg-amber-100 text-amber-800 border-amber-300';
    } else if (percentage < 80) {
      grade = 'First Class';
      gradeBadge = 'bg-blue-100 text-blue-800 border-blue-300';
    }

    return `
      <div class="space-y-8 animate-fade-in">
        
        <!-- Score Summary Card -->
        <div class="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs text-center space-y-4">
          <div class="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl font-extrabold ${percentage >= 70 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}">
            ${score}/10
          </div>
          <div class="space-y-1">
            <h2 class="text-2xl font-extrabold text-slate-900">Skill Test Results</h2>
            <p class="text-xs text-slate-500">You scored <strong>${percentage}%</strong> on the Week 7 curriculum evaluation.</p>
            <div class="inline-block mt-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold border ${gradeBadge}">
                Grade: ${grade}
              </span>
            </div>
          </div>

          <div class="pt-4 flex justify-center gap-3">
            <button id="retake-quiz-btn" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors">
              Retake Test
            </button>
            <a href="#academic" class="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors">
              Review Lab Syllabus (Weeks 1-14)
            </a>
          </div>
        </div>

        <!-- Detailed Question Review & Explanations -->
        <div class="space-y-4">
          <h3 class="text-lg font-extrabold text-slate-900">Detailed Question-by-Question Review</h3>
          ${this.questions.map((q, idx) => {
            const userAns = this.userAnswers[q.id];
            const isCorrect = userAns === q.correctAnswer;
            return `
              <div class="bg-white rounded-2xl border ${isCorrect ? 'border-emerald-200' : 'border-rose-200'} p-5 sm:p-6 shadow-xs space-y-3">
                <div class="flex items-center justify-between text-xs">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center ${isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}">
                      ${q.id}
                    </span>
                    <span class="font-bold text-slate-700">${q.category}</span>
                  </div>
                  <span class="font-bold text-xs ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}">
                    ${isCorrect ? '✓ Correct (+1 Mark)' : '✗ Incorrect (0 Marks)'}
                  </span>
                </div>

                <p class="font-bold text-slate-900 text-sm leading-snug">${q.question}</p>

                <div class="space-y-1.5 text-xs">
                  <p class="text-slate-600">
                    <span class="font-bold">Your Answer:</span> 
                    <span class="${isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}">
                      ${userAns !== undefined ? q.options[userAns] : 'Not answered'}
                    </span>
                  </p>
                  ${
                    !isCorrect
                      ? `
                        <p class="text-emerald-800 font-medium">
                          <span class="font-bold text-emerald-900">Correct Answer:</span> ${q.options[q.correctAnswer]}
                        </p>
                      `
                      : ''
                  }
                </div>

                <!-- Explanation Box -->
                <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
                  <span class="font-bold text-slate-800">Academic Explanation:</span>
                  <p class="leading-relaxed">${q.explanation}</p>
                </div>
              </div>
            `;
          }).join('')}
        </div>

      </div>
    `;
  }

  private attachEvents(el: HTMLElement): void {
    if (this.isSubmitted) {
      const retakeBtn = el.querySelector('#retake-quiz-btn');
      if (retakeBtn) {
        retakeBtn.addEventListener('click', () => {
          this.userAnswers = {};
          this.isSubmitted = false;
          this.currentQuestionIndex = 0;
          this.render(el);
        });
      }
      return;
    }

    // Option selection
    const currentQ = this.questions[this.currentQuestionIndex];
    el.querySelectorAll('[data-option-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number((btn as HTMLElement).getAttribute('data-option-idx'));
        this.userAnswers[currentQ.id] = idx;
        this.render(el);
      });
    });

    // Navigation buttons
    const prevBtn = el.querySelector('#prev-question-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentQuestionIndex > 0) {
          this.currentQuestionIndex--;
          this.render(el);
        }
      });
    }

    const nextBtn = el.querySelector('#next-question-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentQuestionIndex < this.questions.length - 1) {
          this.currentQuestionIndex++;
          this.render(el);
        }
      });
    }

    // Jump to question buttons
    el.querySelectorAll('[data-jump-question]').forEach(btn => {
      btn.addEventListener('click', () => {
        const qIdx = Number((btn as HTMLElement).getAttribute('data-jump-question'));
        this.currentQuestionIndex = qIdx;
        this.render(el);
      });
    });

    // Submit button
    const submitBtn = el.querySelector('#submit-quiz-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        this.isSubmitted = true;
        this.render(el);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }
}
