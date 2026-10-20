// Dependency-free integration harness: runs the real validation script against
// controls parsed from each generated HTML form, including its event handlers.
const {readFileSync} = require('node:fs');
const {join} = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
let checks = 0;
const check = (condition, message) => { assert.ok(condition, message); checks++; };
class Element {
  constructor(attrs = {}) {
    Object.assign(this, {value:'', checked:false, hidden:false, textContent:'', children:[], listeners:{}, attrs:{}, validity:{typeMismatch:false}}, attrs);
    this.classes = new Set((attrs.class || '').split(' '));
    this.classList = {toggle:(name, on) => on ? this.classes.add(name) : this.classes.delete(name)};
  }
  setAttribute(key, value) { this.attrs[key] = value; }
  addEventListener(type, fn) { (this.listeners[type] ||= []).push(fn); }
  fire(type) { for (const fn of this.listeners[type] || []) fn({preventDefault(){}}); }
  focus() { focused = this; }
  replaceChildren(...children) { this.children = children; }
  append(child) { this.children.push(child); }
}
let focused;
for (const locale of ['en','es']) {
  const html = readFileSync(join(__dirname, locale === 'en' ? 'application.html' : 'es/application.html'), 'utf8');
  const ids = {}, named = {};
  for (const match of html.matchAll(/<(input|select|textarea|form|section|div|ul|p|button)\b([^>]*)>/g)) {
    const attrs = Object.fromEntries([...match[2].matchAll(/([\w-]+)="([^"]*)"/g)].map(m=>[m[1],m[2]]));
    const el = new Element(attrs);
    if (attrs.id) ids[attrs.id] = el;
    if (attrs.name) (named[attrs.name] ||= []).push(el);
  }
  const form = ids['talent-form'];
  form.dataset = {locale}; form.elements = {};
  for (const [name, items] of Object.entries(named)) {
    if (items.length === 1) form.elements[name] = items[0];
    else Object.defineProperty(form.elements, name, {value:{get value(){return items.find(x=>x.checked)?.value || '';}}});
  }
  form.querySelectorAll = selector => named[selector.match(/name="([^"]+)"/)[1]] || [];
  const selectOptions = {};
  for (const match of html.matchAll(/<select[^>]*name="([^"]+)"[^>]*>([\s\S]*?)<\/select>/g)) {
    selectOptions[match[1]] = [...match[2].matchAll(/value="([^"]+)"/g)].map(m=>m[1]);
  }
  const resetValues = () => Object.values(named).flat().forEach(el=>{
    el.checked = false; if (el.type !== 'radio') el.value = '';
  });
  form.reset = () => { form.fire('reset'); resetValues(); };
  const doc = {
    querySelector: selector => selector.startsWith('#') ? ids[selector.slice(1)] : ids[`${selector.match(/data-error-for="([^"]+)"/)[1]}-error`],
    createElement: () => new Element()
  };
  const microtasks = [];
  vm.runInNewContext(readFileSync(join(__dirname,'validation.js'),'utf8'), {document:doc, URL, queueMicrotask:fn=>microtasks.push(fn)});
  const flush = () => { while(microtasks.length) microtasks.shift()(); };
  const submit = () => { form.fire('submit'); flush(); };
  const set = (name, value) => { form.elements[name].value = value; };
  const available = value => named.availability.forEach(x=>x.checked=x.value===value);
  const valid = () => {
    set('fullName','Ana María López'); set('email','ana@example.com'); set('phone','+34 612 345 678');
    set('country','spain'); set('experience','5'); set('sector','technology'); set('english','advanced');
    available('immediate'); form.elements.dataPolicy.checked=true;
    set('linkedin',''); set('comments','');
  };
  resetValues(); submit();
  check(ids['error-list'].children.length === 9, `${locale}: all 9 required fields rejected`);
  check(focused === form.elements.fullName, `${locale}: first invalid field focused`);
  const invalids = {fullName:['Ana','123 456'],email:['a@b','a@@b.com','a b@example.com'],phone:['612345678','+00 612345678','+34 abc'],country:['invalid'],experience:['-1','51',''],sector:['invalid'],english:['invalid'],linkedin:['linkedin.com/in/ana','ftp://example.com','https://'],comments:['x'.repeat(501)]};
  for(const [name, values] of Object.entries(invalids)) for(const value of values) {
    valid(); set(name,value); submit();
    check(ids['success-message'].hidden, `${locale}: reject ${name} = ${value.slice(0,25)}`);
    check(form.elements[name].attrs['aria-invalid']==='true', `${locale}: accessible ${name} error`);
  }
  valid(); available('invalid'); submit(); check(ids['success-message'].hidden, `${locale}: availability required`);
  valid(); form.elements.dataPolicy.checked=false; submit(); check(ids['success-message'].hidden, `${locale}: consent required`);
  if(locale==='en') check(ids['dataPolicy-error'].textContent==='You must accept the data processing policy to continue','Exact policy message');
  for(const years of ['0','50','2.5']) {
    valid(); set('experience',years); set('comments','x'.repeat(500)); set('linkedin','https://linkedin.com/in/ana'); submit();
    check(!ids['success-message'].hidden,`${locale}: accept experience ${years}, 500 comments, valid URL`);
    check(focused===ids['success-message'],`${locale}: success focused`);
    check(form.elements.fullName.value==='',`${locale}: personal data cleared on success`);
  }
  valid(); submit(); check(!ids['success-message'].hidden,`${locale}: optional fields may be empty`);
  for(const [name, values] of Object.entries(selectOptions)) for(const value of values) {
    valid(); set(name,value); submit(); check(!ids['success-message'].hidden,`${locale}: accept ${name} ${value}`);
  }
  for(const item of named.availability) {valid(); available(item.value); submit(); check(!ids['success-message'].hidden,`${locale}: accept availability ${item.value}`);}
  valid(); set('comments','hello'); form.elements.comments.fire('input'); check(ids['comments-count'].textContent.includes('495'),`${locale}: live counter`);
  set('email','invalid'); submit(); form.reset(); flush();
  check(ids['error-summary'].hidden && ids['success-message'].hidden,`${locale}: clear removes feedback`);
  check(ids['comments-count'].textContent.includes('500'),`${locale}: clear resets counter`);
  const landing = readFileSync(join(__dirname,locale==='en'?'index.html':'es/index.html'),'utf8');
  const data=JSON.parse(landing.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  check(data.name==='Nexova' && data.address.length===2 && data.contactPoint.telephone==='+34-960-123-456',`${locale}: Organization schema`);
  const sectionIds=[...landing.matchAll(/<section id="([^"]+)"/g)].map(m=>m[1]);
  check(sectionIds.join(',')==='services,why-nexova,contact',`${locale}: landing section order`);
  for(const page of [html,landing]) {
    check(page.includes('tel:+34960123456') && page.includes('tel:+13055550191'),`${locale}: contact phones`);
    check(!/<(?:style|img)\b/.test(page),`${locale}: utility styling and no images missing alt`);
    for(const match of page.matchAll(/href="([^"#]+)(?:#[^"]*)?"/g)) {
      if(/^(https?:|mailto:|tel:|data:)/.test(match[1]))continue;
      check(require('node:fs').existsSync(join(__dirname,locale==='es'?'es':'',match[1])),`${locale}: local link ${match[1]}`);
    }
  }
}
console.log(`PASS: ${checks} checks across English and Spanish pages and real validation event handlers.`);
