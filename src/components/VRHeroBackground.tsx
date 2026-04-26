'use client';

import { useEffect, useRef } from 'react';

const LOW_RES_URL = 'https://img.sboxm.top/unity/hero.jpg';

export default function VRHeroBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    scene: null as import('three').Scene | null,
    camera: null as import('three').PerspectiveCamera | null,
    renderer: null as import('three').WebGLRenderer | null,
    sphere: null as import('three').Mesh | null,
    targetLon: 180,
    currentLon: 180,
    targetLat: 0,
    currentLat: 0,
    mouseX: 0,
    mouseY: 0,
    idleTimer: null as ReturnType<typeof setTimeout> | null,
    isIdle: false,
    autoRotate: false,
    animFrame: 0,
    isVisible: true,
    observer: null as IntersectionObserver | null,
    canvas: null as HTMLCanvasElement | null,
  });

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return; // mobile uses static background

    let destroyed = false;
    const s = stateRef.current;

    async function init() {
      const THREE = await import('three');

      if (destroyed || !mountRef.current) return;

      // Scene
      const scene = new THREE.Scene();
      s.scene = scene;

      // Camera inside sphere
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 0, 0);
      s.camera = camera;

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      s.renderer = renderer;
      s.canvas = renderer.domElement;
      renderer.domElement.id = 'vr-canvas';
      mountRef.current.appendChild(renderer.domElement);

      // Low-res sphere (immediate)
      const geometry = new THREE.SphereGeometry(500, 60, 40);
      geometry.scale(-1, 1, 1); // flip inside out

      const lowResTexture = new THREE.TextureLoader().load(LOW_RES_URL);
      lowResTexture.colorSpace = THREE.SRGBColorSpace;
      const material = new THREE.MeshBasicMaterial({ map: lowResTexture });
      const sphere = new THREE.Mesh(geometry, material);
      s.sphere = sphere;
      scene.add(sphere);

      // Start render loop
      animate();

      // Setup IntersectionObserver to pause rendering when out of view
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            s.isVisible = entry.isIntersecting;
          });
        },
        { rootMargin: '400px 0px' }
      );
      if (mountRef.current) observer.observe(mountRef.current);
      s.observer = observer; // store in stateRef to disconnect later

      // Event listeners
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', onResize);
      document.addEventListener('visibilitychange', onVisibilityChange);
    }

    function onMouseMove(e: MouseEvent) {
      const s = stateRef.current;
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Normalize -1 to 1
      s.mouseX = (e.clientX / w - 0.5) * 2;
      s.mouseY = (e.clientY / h - 0.5) * 2;

      // Map to panorama longitude (limited range: ±15°)
      s.targetLon = 180 - s.mouseX * 15;
      s.targetLat = -s.mouseY * 8;

      // Reset idle
      s.isIdle = false;
      s.autoRotate = false;
      if (s.idleTimer) clearTimeout(s.idleTimer);
      s.idleTimer = setTimeout(() => {
        s.isIdle = true;
        s.autoRotate = true;
      }, 5000);
    }

    function onVisibilityChange() {
      const s = stateRef.current;
      if (document.hidden) {
        cancelAnimationFrame(s.animFrame);
      } else {
        animate();
      }
    }

    function onResize() {
      const s = stateRef.current;
      if (!s.camera || !s.renderer) return;
      s.camera.aspect = window.innerWidth / window.innerHeight;
      s.camera.updateProjectionMatrix();
      s.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      const s = stateRef.current;
      if (!s.scene || !s.camera || !s.renderer || destroyed) return;

      s.animFrame = requestAnimationFrame(animate);

      // Auto rotation when idle
      if (s.autoRotate) {
        s.targetLon -= 0.04; // slow rightward pan
      }

      // Smooth interpolation (lerp)
      s.currentLon += (s.targetLon - s.currentLon) * 0.05;
      s.currentLat += (s.targetLat - s.currentLat) * 0.05;

      // Clamp lat
      const lat = Math.max(-30, Math.min(30, s.currentLat));
      const lon = s.currentLon;

      // Convert to radians
      const phi = THREE_degToRad(90 - lat);
      const theta = THREE_degToRad(lon);

      s.camera.lookAt(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta)
      );

      if (s.isVisible) {
        s.renderer.render(s.scene, s.camera);
      }
    }

    function THREE_degToRad(deg: number) {
      return (deg * Math.PI) / 180;
    }

    init();

    return () => {
      destroyed = true;
      const s = stateRef.current;
      cancelAnimationFrame(s.animFrame);
      if (s.idleTimer) clearTimeout(s.idleTimer);
      if (s.observer) {
        s.observer.disconnect();
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (s.renderer) {
        s.renderer.dispose();
        s.renderer.domElement.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Mobile static background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOW_RES_URL}
        alt="VR Background"
        className="mobile-static-bg hidden absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: '50% 40%' }}
      />
    </div>
  );
}
