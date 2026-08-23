import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import * as THREE from 'three';
import App from './App.tsx';
import './index.css';

// ── Suppress Three.js outputEncoding deprecation warnings ──────────────────────
try {
  Object.defineProperty(THREE.WebGLRenderer.prototype, 'outputEncoding', {
    get() {
      return (this as any)._outputEncoding ?? 3000;
    },
    set(v) {
      (this as any)._outputEncoding = v;
    },
    configurable: true,
  });
} catch {
  // ignore
}

const suppressWarning = (fn: (...args: any[]) => void) => (...args: any[]) => {
  if (args.some((arg) => typeof arg === 'string' && (arg.includes('outputEncoding') || arg.includes('WebGLRenderer')))) {
    return;
  }
  fn(...args);
};

console.warn = suppressWarning(console.warn);
console.error = suppressWarning(console.error);
console.log = suppressWarning(console.log);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
