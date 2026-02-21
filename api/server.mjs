import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { URL } from 'node:url';

const profanity = ['damn', 'hell', 'shit'];
const json = (p) => JSON.parse(readFileSync(new URL(`./data/${p}`, import.meta.url), 'utf-8'));

let glossary = json('glossary.json');
let formulas = json('formulas.json');
let experiments = json('experiments.json');
let quotes = json('quotes.json');
const progress = {};

const send = (res, code, body) => {
  res.writeHead(code, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(body));
};

const readBody = async (req) => {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const raw = Buffer.concat(chunks).toString('utf-8');
  return raw ? JSON.parse(raw) : {};
};

const dailyPick = (timezone='UTC') => {
  const date = new Date();
  const key = new Intl.DateTimeFormat('en-CA', { timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
  const seed = [...key].reduce((a, c) => a + c.charCodeAt(0), 0);
  return {
    dateKey: key,
    quote: quotes[seed % quotes.length],
    experiment: experiments[seed % experiments.length],
    cacheSeconds: 86400
  };
};

createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 200, {});
  const url = new URL(req.url, 'http://localhost');
  const path = url.pathname;

  if (req.method === 'GET' && path === '/api/daily') return send(res, 200, dailyPick(url.searchParams.get('timezone') || 'UTC'));

  if (req.method === 'GET' && path === '/api/glossary') {
    const q = (url.searchParams.get('q') || '').toLowerCase();
    const letter = (url.searchParams.get('letter') || '').toLowerCase();
    const page = Number(url.searchParams.get('page') || 1);
    const pageSize = 10;
    const filtered = glossary.filter((g) => (!q || `${g.term} ${g.definition}`.toLowerCase().includes(q)) && (!letter || g.term.toLowerCase().startsWith(letter)));
    return send(res, 200, { items: filtered.slice((page - 1) * pageSize, page * pageSize), total: filtered.length });
  }
  if (req.method === 'POST' && path === '/api/glossary/import') {
    const body = await readBody(req);
    glossary = Array.isArray(body.items) ? body.items : glossary;
    return send(res, 200, { imported: glossary.length });
  }
  if (req.method === 'GET' && path.startsWith('/api/glossary/')) {
    const id = path.split('/').pop();
    const found = glossary.find((g) => g.id === id);
    return found ? send(res, 200, found) : send(res, 404, { error: 'Not found' });
  }

  if (req.method === 'GET' && path === '/api/formulas') {
    const topic = (url.searchParams.get('topic') || '').toLowerCase();
    const search = (url.searchParams.get('search') || '').toLowerCase();
    const filtered = formulas.filter((f) => (!topic || f.topic.toLowerCase().includes(topic)) && (!search || `${f.latex} ${f.explanation}`.toLowerCase().includes(search)));
    return send(res, 200, filtered);
  }
  if (req.method === 'GET' && path.startsWith('/api/formulas/')) {
    const id = path.split('/').pop();
    const found = formulas.find((f) => f.id === id);
    return found ? send(res, 200, found) : send(res, 404, { error: 'Not found' });
  }

  if (req.method === 'GET' && path === '/api/experiments') {
    const difficulty = (url.searchParams.get('difficulty') || '').toLowerCase();
    const location = (url.searchParams.get('location') || '').toLowerCase();
    const equipment = (url.searchParams.get('equipment') || '').toLowerCase();
    const q = (url.searchParams.get('q') || '').toLowerCase();
    const filtered = experiments.filter((e) => (!difficulty || e.difficulty.toLowerCase() === difficulty) && (!location || e.location === location) && (!equipment || e.equipment.some((x) => x.toLowerCase().includes(equipment))) && (!q || `${e.title} ${e.overview}`.toLowerCase().includes(q)));
    return send(res, 200, filtered);
  }
  if (req.method === 'GET' && path.startsWith('/api/experiments/') && !path.endsWith('/progress')) {
    const id = path.split('/').pop();
    const found = experiments.find((e) => e.id === id);
    return found ? send(res, 200, found) : send(res, 404, { error: 'Not found' });
  }
  if (req.method === 'POST' && path.startsWith('/api/experiments/') && path.endsWith('/progress')) {
    const id = path.split('/')[3];
    const body = await readBody(req);
    progress[id] = body.progress ?? 0;
    return send(res, 200, { id, progress: progress[id] });
  }

  if (req.method === 'GET' && path === '/api/quotes') {
    const safe = (url.searchParams.get('safe') || 'true') === 'true';
    const list = safe ? quotes.filter((q) => !profanity.some((w) => q.text.toLowerCase().includes(w))) : quotes;
    return send(res, 200, list);
  }
  if (req.method === 'POST' && path === '/api/quotes/import') {
    const body = await readBody(req);
    const items = Array.isArray(body.items) ? body.items : [];
    const invalid = items.filter((q) => profanity.some((w) => String(q.text || '').toLowerCase().includes(w)));
    if (invalid.length) return send(res, 400, { error: 'Profanity detected', invalidCount: invalid.length });
    quotes = items;
    return send(res, 200, { imported: quotes.length });
  }

  return send(res, 404, { error: 'Endpoint not found' });
}).listen(8787, () => {
  console.log('Mock API running on http://localhost:8787');
});
