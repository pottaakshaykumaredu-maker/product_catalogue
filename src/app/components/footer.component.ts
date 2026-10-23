export class FooterComponent {
  render(targetElement?: HTMLElement): void {
    const el = targetElement || document.getElementById('app-footer');
    if (!el) return;

    el.innerHTML = `
      <footer class="bg-slate-900 text-slate-400 text-sm border-t border-slate-800 mt-20">
        <!-- Top Curriculum Matrix -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            
            <!-- Col 1: Project Identity -->
            <div class="lg:col-span-2 space-y-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-base">
                  WT
                </div>
                <span class="font-extrabold text-lg text-white tracking-tight">
                  Product Catalogue Suite
                </span>
              </div>
              <p class="text-xs text-slate-400 leading-relaxed max-w-sm">
                A full-stack client-side application developed for the college Web Technologies Laboratory curriculum. Complete coverage of Weeks 1 through 14 with modular architecture, strict separation of concerns, and viva-ready demonstrations.
              </p>
              <div class="pt-2 flex flex-wrap gap-1.5">
                <span class="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-indigo-400 border border-slate-700 font-mono">HTML5 / CSS3</span>
                <span class="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-amber-400 border border-slate-700 font-mono">JavaScript (ES6+)</span>
                <span class="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-emerald-400 border border-slate-700 font-mono">XML &amp; DTD</span>
                <span class="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-cyan-400 border border-slate-700 font-mono">AJAX / Fetch</span>
                <span class="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-blue-400 border border-slate-700 font-mono">TypeScript</span>
                <span class="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-rose-400 border border-slate-700 font-mono">Angular Arch</span>
              </div>
            </div>

            <!-- Col 2: Course Outcomes (CO1-CO5) -->
            <div>
              <h4 class="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Course Outcomes (CO)</h4>
              <ul class="space-y-2 text-xs">
                <li><span class="font-bold text-indigo-400">CO1:</span> HTML5 &amp; CSS3 Styling</li>
                <li><span class="font-bold text-indigo-400">CO2:</span> JS Client-side DOM &amp; Forms</li>
                <li><span class="font-bold text-indigo-400">CO3:</span> XML, DTD &amp; Web Validation</li>
                <li><span class="font-bold text-indigo-400">CO4:</span> Asynchronous AJAX &amp; Fetch API</li>
                <li><span class="font-bold text-indigo-400">CO5:</span> TypeScript &amp; Angular Apps</li>
              </ul>
            </div>

            <!-- Col 3: Academic Weeks Quick Access -->
            <div>
              <h4 class="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Syllabus Weeks</h4>
              <ul class="space-y-1.5 text-xs">
                <li><a href="#academic" class="hover:text-white transition-colors">Weeks 1-3: HTML5/CSS3 Core</a></li>
                <li><a href="#academic" class="hover:text-white transition-colors">Weeks 4-5: JavaScript DOM &amp; Cart</a></li>
                <li><a href="#academic" class="hover:text-white transition-colors">Week 6: XML Schema &amp; DTD</a></li>
                <li><a href="#quiz" class="hover:text-amber-400 transition-colors font-semibold text-amber-300">Week 7: 10-Q Skill Test &rarr;</a></li>
                <li><a href="#academic" class="hover:text-white transition-colors">Weeks 8-10: AJAX, Promises &amp; POST</a></li>
                <li><a href="#academic" class="hover:text-white transition-colors">Week 11: TypeScript Classes</a></li>
                <li><a href="#academic" class="hover:text-white transition-colors">Weeks 12-14: Angular DI &amp; Forms</a></li>
              </ul>
            </div>

            <!-- Col 4: Store Navigation -->
            <div>
              <h4 class="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Catalogue Pages</h4>
              <ul class="space-y-1.5 text-xs">
                <li><a href="#home" class="hover:text-white transition-colors">Home Page</a></li>
                <li><a href="#products" class="hover:text-white transition-colors">Product Catalogue</a></li>
                <li><a href="#categories" class="hover:text-white transition-colors">Browse 7 Categories</a></li>
                <li><a href="#cart" class="hover:text-white transition-colors">Shopping Cart</a></li>
                <li><a href="#login" class="hover:text-white transition-colors">Student Login</a></li>
                <li><a href="#register" class="hover:text-white transition-colors">Student Registration</a></li>
              </ul>
            </div>

          </div>

          <!-- Bottom Credits Bar -->
          <div class="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>
              &copy; 2026 Department of Computer Science &amp; Engineering. Designed for Academic Examination &amp; Viva Voce.
            </p>
            <div class="flex items-center gap-6">
              <span class="inline-flex items-center gap-1.5 text-emerald-400">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                All 14 Weeks Fully Operational
              </span>
              <a href="#academic" class="text-slate-400 hover:text-white transition-colors underline">
                Viva Cheat Sheet &amp; Rubric
              </a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}
