#!/usr/bin/env node
/**
 * Generator: scan project folder, extract metadata, copy screenshot, generate projects.yaml
 * Usage: node scripts/generate-projects.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.resolve(__dirname, '..');
const PROJECTS_ROOT = path.resolve(SITE_ROOT, '..'); // C:\HermesSandbox\Fadel\

const EXCLUDE = ['fadel-personalsite', '24Card', 'FinAcc', '.git', '.github'];
const OUTPUT_YAML = path.join(SITE_ROOT, 'src', 'data', 'projects.yaml');
const OUTPUT_IMG_DIR = path.join(SITE_ROOT, 'public', 'projects');

// Tech detection from package.json / composer.json (root + subfolder)
function detectTech(projectPath) {
  const techs = new Set();
  const searchPaths = [
    projectPath,
    path.join(projectPath, 'backend'),
    path.join(projectPath, 'frontend'),
  ];
  
  searchPaths.forEach(dir => {
    // package.json
    try {
      const pkgPath = path.join(dir, 'package.json');
      if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        const deps = { ...pkg.dependencies, ...pkg.devDependencies };
        
        if (deps['react']) techs.add('React');
        if (deps['vue']) techs.add('Vue');
        if (deps['next']) techs.add('Next.js');
        if (deps['express']) techs.add('Express');
        if (deps['typescript']) techs.add('TypeScript');
        if (deps['electron']) techs.add('Electron');
        if (deps['firebase']) techs.add('Firebase');
        if (deps['mongoose']) techs.add('MongoDB');
        if (deps['tailwindcss']) techs.add('Tailwind CSS');
      }
    } catch {}
    
    // composer.json
    try {
      const composerPath = path.join(dir, 'composer.json');
      if (fs.existsSync(composerPath)) {
        const composer = JSON.parse(fs.readFileSync(composerPath, 'utf8'));
        const deps = { ...composer.require, ...composer['require-dev'] };
        
        if (deps['laravel/framework']) techs.add('Laravel');
        if (deps['laravel/laravel']) techs.add('Laravel');
        if (deps['symfony/framework-bundle']) techs.add('Symfony');
      }
    } catch {}
  });
  
  // Infer backend/frontend from presence
  if (fs.existsSync(path.join(projectPath, 'backend'))) techs.add('Node.js');
  
  return Array.from(techs).sort();
}

// Extract description from README.md (first paragraph)
function getDescription(projectPath) {
  try {
    const readmePath = path.join(projectPath, 'README.md');
    if (fs.existsSync(readmePath)) {
      const content = fs.readFileSync(readmePath, 'utf8');
      // Take first paragraph (up to first ## or double newline, excluding heading)
      const match = content.match(/^(?:#+\s+)?([^\n]*)\n\n([\s\S]*?)(?:\n##|\n\n## )/);
      let desc = match ? (match[2] || match[1]) : content.split('\n\n')[0];
      
      desc = desc
        .replace(/^#+\s*/gm, '') // remove markdown headers
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // convert markdown links to text
        .split('\n').slice(0, 3).join(' ') // first 3 lines
        .trim();
      
      return desc || null;
    }
  } catch {}
  return null;
}

// Get remote URL
function getRemoteUrl(projectPath) {
  try {
    if (fs.existsSync(path.join(projectPath, '.git'))) {
      const configPath = path.join(projectPath, '.git', 'config');
      const config = fs.readFileSync(configPath, 'utf8');
      const match = config.match(/url\s*=\s*([^\n]+)/);
      if (match) {
        let url = match[1].trim();
        // Clean up git+https or token if present
        url = url.replace(/^git\+/, '').replace(/https:\/\/[^@]+@/, 'https://');
        return url;
      }
    }
  } catch {}
  return null;
}

// Copy screenshot to public
function copyScreenshot(projectPath, slug) {
  const src = path.join(projectPath, 'screenshot.png');
  if (!fs.existsSync(src)) return null;
  
  if (!fs.existsSync(OUTPUT_IMG_DIR)) {
    fs.mkdirSync(OUTPUT_IMG_DIR, { recursive: true });
  }
  
  const dest = path.join(OUTPUT_IMG_DIR, `${slug}.png`);
  fs.copyFileSync(src, dest);
  return `/projects/${slug}.png`;
}

// Slugify folder name
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// Main
console.log('🔍 Scanning projects...\n');
const projects = [];

fs.readdirSync(PROJECTS_ROOT).forEach((folder) => {
  const fullPath = path.join(PROJECTS_ROOT, folder);
  
  // Skip excluded + non-folders
  if (EXCLUDE.includes(folder) || !fs.statSync(fullPath).isDirectory()) return;
  
  // Must have git + (package.json OR composer.json) = valid project
  const hasGit = fs.existsSync(path.join(fullPath, '.git'));
  const hasPkg = fs.existsSync(path.join(fullPath, 'package.json'));
  const hasComposer = fs.existsSync(path.join(fullPath, 'composer.json'));
  
  if (!hasGit || (!hasPkg && !hasComposer)) {
    console.log(`⊘ ${folder} (skipped: not a valid project)`);
    return;
  }
  
  console.log(`✓ ${folder}`);
  const slug = slugify(folder);
  const tech = detectTech(fullPath);
  const desc = getDescription(fullPath);
  const url = getRemoteUrl(fullPath);
  const image = copyScreenshot(fullPath, slug);
  
  projects.push({
    id: slug,
    title: folder,
    description: desc,
    tech: tech.length > 0 ? tech : null,
    image,
    url,
  });
});

console.log(`\n📝 Found ${projects.length} projects\n`);

// Generate YAML
const yaml = `projects:
${projects.map(p => `  - id: ${p.id}
    title: ${p.title}
    description: ${p.description ? JSON.stringify(p.description).slice(1, -1) : 'null'}
    tech: ${p.tech ? `[${p.tech.map(t => `"${t}"`).join(', ')}]` : 'null'}
    image: ${p.image ? JSON.stringify(p.image) : 'null'}
    url: ${p.url ? JSON.stringify(p.url) : 'null'}`).join('\n')}
`;

// Ensure dir exists
fs.mkdirSync(path.dirname(OUTPUT_YAML), { recursive: true });
fs.writeFileSync(OUTPUT_YAML, yaml);

console.log(`✅ Generated: ${path.relative(SITE_ROOT, OUTPUT_YAML)}`);
console.log(`📸 Images: ${path.relative(SITE_ROOT, OUTPUT_IMG_DIR)}/`);
