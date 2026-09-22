import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Layers, RotateCcw, Flame } from 'lucide-react';

interface ThreeHeroMealProps {
  onOrderNow?: () => void;
}

export const ThreeHeroMeal: React.FC<ThreeHeroMealProps> = ({ onOrderNow }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [activeLayerInfo, setActiveLayerInfo] = useState<string | null>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  // References to keep animation loop and layer targets
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const burgerGroupRef = useRef<THREE.Group | null>(null);
  const layersRef = useRef<{ mesh: THREE.Object3D; basePos: number; explodeOffset: number; name: string }[]>([]);
  const steamParticlesRef = useRef<THREE.Points | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const spinVelocityRef = useRef<number>(0.006);
  const isExplodedRef = useRef<boolean>(false);

  useEffect(() => {
    isExplodedRef.current = isExploded;
  }, [isExploded]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 540;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 1.8, 6.2);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.2);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    mainKeyLight.position.set(5, 8, 5);
    mainKeyLight.castShadow = true;
    mainKeyLight.shadow.mapSize.width = 1024;
    mainKeyLight.shadow.mapSize.height = 1024;
    mainKeyLight.shadow.camera.near = 0.5;
    mainKeyLight.shadow.camera.far = 25;
    scene.add(mainKeyLight);

    const warmFillLight = new THREE.DirectionalLight(0xD99A45, 1.3);
    warmFillLight.position.set(-5, 4, 3);
    scene.add(warmFillLight);

    const rimLight = new THREE.PointLight(0x8B2E24, 2.2, 15);
    rimLight.position.set(0, 3, -4);
    scene.add(rimLight);

    // Ground Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(5.5, 5.5);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.22 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.5;
    shadowMesh.receiveShadow = true;
    scene.add(shadowMesh);

    // Subtle Ground Glow Disc (Warm Gold brand touch)
    const glowGeo = new THREE.RingGeometry(0.8, 2.2, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xD99A45,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    });
    const glowDisc = new THREE.Mesh(glowGeo, glowMat);
    glowDisc.rotation.x = -Math.PI / 2;
    glowDisc.position.y = -1.49;
    scene.add(glowDisc);

    // Build the 3D Burger Stack
    const burgerGroup = new THREE.Group();
    burgerGroup.position.y = -0.1;
    scene.add(burgerGroup);
    burgerGroupRef.current = burgerGroup;

    // Materials
    const bunMaterial = new THREE.MeshStandardMaterial({
      color: 0xD78B30,
      roughness: 0.45,
      metalness: 0.05,
    });

    const bunInnerMaterial = new THREE.MeshStandardMaterial({
      color: 0xF7D8A5,
      roughness: 0.8,
    });

    const pattyMaterial = new THREE.MeshStandardMaterial({
      color: 0x3E231B,
      roughness: 0.85,
      metalness: 0.1,
    });

    const cheeseMaterial = new THREE.MeshStandardMaterial({
      color: 0xF59E0B,
      roughness: 0.3,
      metalness: 0.05,
    });

    const lettuceMaterial = new THREE.MeshStandardMaterial({
      color: 0x48A02C,
      roughness: 0.5,
      side: THREE.DoubleSide,
    });

    const tomatoMaterial = new THREE.MeshStandardMaterial({
      color: 0xC5221F,
      roughness: 0.25,
      metalness: 0.08,
    });

    const pickleMaterial = new THREE.MeshStandardMaterial({
      color: 0x556B2F,
      roughness: 0.5,
    });

    const sesameMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFF7E6,
      roughness: 0.3,
    });

    const layersData: { mesh: THREE.Object3D; basePos: number; explodeOffset: number; name: string }[] = [];

    // 1. Bottom Bun
    const bottomBunGeo = new THREE.CylinderGeometry(1.4, 1.25, 0.4, 32);
    const bottomBun = new THREE.Mesh(bottomBunGeo, bunMaterial);
    bottomBun.castShadow = true;
    bottomBun.receiveShadow = true;
    const bottomBunGroup = new THREE.Group();
    bottomBunGroup.add(bottomBun);
    bottomBunGroup.position.y = -0.9;
    burgerGroup.add(bottomBunGroup);
    layersData.push({ mesh: bottomBunGroup, basePos: -0.9, explodeOffset: -0.8, name: 'Toasted Brioche Base' });

    // 2. Pickles & Secret Sauce
    const picklesGroup = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + 0.3;
      const pickleGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.06, 16);
      const pickle = new THREE.Mesh(pickleGeo, pickleMaterial);
      pickle.position.set(Math.cos(angle) * 0.75, 0, Math.sin(angle) * 0.75);
      pickle.rotation.y = angle;
      pickle.rotation.z = 0.08;
      pickle.castShadow = true;
      picklesGroup.add(pickle);
    }
    picklesGroup.position.y = -0.65;
    burgerGroup.add(picklesGroup);
    layersData.push({ mesh: picklesGroup, basePos: -0.65, explodeOffset: -0.4, name: 'Crisp Dill Relish' });

    // 3. Smashed Angus Patty 1 (Bottom)
    const patty1Geo = new THREE.CylinderGeometry(1.45, 1.48, 0.32, 28);
    const patty1 = new THREE.Mesh(patty1Geo, pattyMaterial);
    patty1.castShadow = true;
    const patty1Group = new THREE.Group();
    patty1Group.add(patty1);
    patty1Group.position.y = -0.42;
    burgerGroup.add(patty1Group);
    layersData.push({ mesh: patty1Group, basePos: -0.42, explodeOffset: -0.15, name: 'Flame-Seared Angus Patty #1' });

    // 4. Melted Cheese 1
    const cheese1Geo = new THREE.BoxGeometry(1.8, 0.05, 1.8);
    const cheese1 = new THREE.Mesh(cheese1Geo, cheeseMaterial);
    cheese1.rotation.y = Math.PI / 4;
    cheese1.castShadow = true;
    const cheese1Group = new THREE.Group();
    cheese1Group.add(cheese1);
    cheese1Group.position.y = -0.22;
    burgerGroup.add(cheese1Group);
    layersData.push({ mesh: cheese1Group, basePos: -0.22, explodeOffset: 0.1, name: 'Melted Aged Cheddar #1' });

    // 5. Smashed Angus Patty 2 (Top)
    const patty2Geo = new THREE.CylinderGeometry(1.45, 1.48, 0.32, 28);
    const patty2 = new THREE.Mesh(patty2Geo, pattyMaterial);
    patty2.castShadow = true;
    const patty2Group = new THREE.Group();
    patty2Group.add(patty2);
    patty2Group.position.y = -0.02;
    burgerGroup.add(patty2Group);
    layersData.push({ mesh: patty2Group, basePos: -0.02, explodeOffset: 0.35, name: 'Flame-Seared Angus Patty #2' });

    // 6. Melted Cheese 2
    const cheese2Geo = new THREE.BoxGeometry(1.8, 0.05, 1.8);
    const cheese2 = new THREE.Mesh(cheese2Geo, cheeseMaterial);
    cheese2.rotation.y = Math.PI / 6;
    cheese2.castShadow = true;
    const cheese2Group = new THREE.Group();
    cheese2Group.add(cheese2);
    cheese2Group.position.y = 0.18;
    burgerGroup.add(cheese2Group);
    layersData.push({ mesh: cheese2Group, basePos: 0.18, explodeOffset: 0.6, name: 'Melted American Cheddar #2' });

    // 7. Tomato Slices (2 thick slices)
    const tomatoGroup = new THREE.Group();
    const tom1 = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.12, 24), tomatoMaterial);
    tom1.position.set(-0.45, 0, 0.2);
    tom1.rotation.x = 0.08;
    tom1.castShadow = true;
    const tom2 = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.12, 24), tomatoMaterial);
    tom2.position.set(0.45, 0, -0.2);
    tom2.rotation.z = -0.06;
    tom2.castShadow = true;
    tomatoGroup.add(tom1);
    tomatoGroup.add(tom2);
    tomatoGroup.position.y = 0.32;
    burgerGroup.add(tomatoGroup);
    layersData.push({ mesh: tomatoGroup, basePos: 0.32, explodeOffset: 0.85, name: 'Vine-Ripened Roma Tomatoes' });

    // 8. Crisp Butterhead Lettuce Leaf (ruffled disk)
    const lettuceGeo = new THREE.CylinderGeometry(1.58, 1.58, 0.05, 32);
    const posAttr = lettuceGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      const dist = Math.sqrt(x * x + z * z);
      if (dist > 0.8) {
        const wave = Math.sin(x * 6 + z * 6) * 0.08 + Math.cos(x * 4) * 0.04;
        posAttr.setY(i, posAttr.getY(i) + wave);
      }
    }
    lettuceGeo.computeVertexNormals();
    const lettuce = new THREE.Mesh(lettuceGeo, lettuceMaterial);
    lettuce.castShadow = true;
    const lettuceGroup = new THREE.Group();
    lettuceGroup.add(lettuce);
    lettuceGroup.position.y = 0.45;
    burgerGroup.add(lettuceGroup);
    layersData.push({ mesh: lettuceGroup, basePos: 0.45, explodeOffset: 1.15, name: 'Crisp Butterhead Lettuce' });

    // 9. Top Brioche Bun with Sesame Seeds
    const topBunGroup = new THREE.Group();
    const topBunGeo = new THREE.SphereGeometry(1.48, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.48);
    const topBun = new THREE.Mesh(topBunGeo, bunMaterial);
    topBun.castShadow = true;
    topBunGroup.add(topBun);

    // Inner flat surface of top bun
    const innerTopBunGeo = new THREE.CircleGeometry(1.47, 32);
    const innerTopBun = new THREE.Mesh(innerTopBunGeo, bunInnerMaterial);
    innerTopBun.rotation.x = Math.PI / 2;
    topBunGroup.add(innerTopBun);

    // Scatter 45 3D sesame seeds on the top dome
    const sesameGeo = new THREE.ConeGeometry(0.035, 0.08, 6);
    sesameGeo.rotateX(Math.PI / 2);
    for (let i = 0; i < 48; i++) {
      const phi = Math.random() * (Math.PI * 0.35); // top portion of hemisphere
      const theta = Math.random() * (Math.PI * 2);
      const radius = 1.48;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      const sesame = new THREE.Mesh(sesameGeo, sesameMaterial);
      sesame.position.set(x, y, z);
      sesame.lookAt(x * 1.5, y * 1.5, z * 1.5);
      topBunGroup.add(sesame);
    }

    topBunGroup.position.y = 0.58;
    burgerGroup.add(topBunGroup);
    layersData.push({ mesh: topBunGroup, basePos: 0.58, explodeOffset: 1.5, name: 'Glazed Brioche Crown & Sesame' });

    layersRef.current = layersData;

    // Steam / Sizzle Particles
    const particleCount = 28;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 1.4;
      particlePos[i * 3 + 1] = Math.random() * 2.2;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 1.4;
      particleSpeeds[i] = 0.012 + Math.random() * 0.015;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xD99A45,
      size: 0.09,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const steamPoints = new THREE.Points(particleGeo, particleMat);
    scene.add(steamPoints);
    steamParticlesRef.current = steamPoints;

    // Mouse & Touch Interactivity
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePositionRef.current = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current || !burgerGroupRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePositionRef.current.x;
      const deltaY = clientY - previousMousePositionRef.current.y;

      burgerGroupRef.current.rotation.y += deltaX * 0.009;
      burgerGroupRef.current.rotation.x = Math.max(-0.4, Math.min(0.5, burgerGroupRef.current.rotation.x + deltaY * 0.005));

      previousMousePositionRef.current = { x: clientX, y: clientY };
      spinVelocityRef.current = deltaX * 0.001;
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    domEl.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth layer explosion interpolation
      const targetOffsetFactor = isExplodedRef.current ? 1.0 : 0.0;
      layersData.forEach((layer) => {
        const targetY = layer.basePos + layer.explodeOffset * targetOffsetFactor;
        layer.mesh.position.y += (targetY - layer.mesh.position.y) * 0.14; // snappy spring response
      });

      // Rotation inertia & idle rotation
      if (burgerGroupRef.current) {
        if (!isDraggingRef.current) {
          // Slow down spin velocity to idle speed
          spinVelocityRef.current += (0.005 - spinVelocityRef.current) * 0.05;
          burgerGroupRef.current.rotation.y += spinVelocityRef.current;
          // Gentle floating bob
          burgerGroupRef.current.position.y = -0.08 + Math.sin(elapsedTime * 2.2) * 0.05;
        }
      }

      // Steam animation
      if (steamParticlesRef.current) {
        const positions = steamParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += particleSpeeds[i];
          positions[i * 3] += Math.sin(elapsedTime * 3 + i) * 0.003;
          if (positions[i * 3 + 1] > 2.5) {
            positions[i * 3 + 1] = 0.2;
            positions[i * 3] = (Math.random() - 0.5) * 1.2;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
          }
        }
        steamParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domEl.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const triggerSnappySpin = () => {
    spinVelocityRef.current = 0.09;
  };

  return (
    <div className="relative w-full h-[460px] md:h-[540px] flex items-center justify-center select-none">
      {/* Fallback in case WebGL is unavailable */}
      {!webglSupported ? (
        <div className="relative flex flex-col items-center justify-center p-6 text-center">
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
            alt="The Court Double Stack Signature Burger"
            className="w-72 md:w-88 h-auto object-cover rounded-2xl shadow-2xl border-4 border-[#8B2E24]"
          />
          <span className="mt-3 text-sm font-bold text-[#8B2E24] tracking-widest uppercase">
            Signature Court Double Stack
          </span>
        </div>
      ) : (
        <>
          {/* Canvas Container */}
          <div
            ref={containerRef}
            className="w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-300"
            title="Click and drag to rotate the 3D Court Burger"
          />

          {/* Interactive 3D Control Badges */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setIsExploded(!isExploded)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-150 shadow-md ${
                isExploded
                  ? 'bg-[#8B2E24] text-[#F3E4CC] ring-2 ring-[#D99A45]'
                  : 'bg-[#29231F] text-[#F3E4CC] hover:bg-[#8B2E24]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#D99A45]" />
              {isExploded ? 'Assemble Burger' : 'Explode Ingredients'}
            </button>

            <button
              type="button"
              onClick={triggerSnappySpin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#29231F] text-[#F3E4CC] hover:bg-[#8B2E24] transition-colors shadow-md"
              title="Fast 360 Spin"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#D99A45]" />
              Spin 360°
            </button>
          </div>

          {/* Floating Pill: 3D Interaction Tip */}
          <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
            <div className="flex items-center gap-2 bg-[#29231F]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D99A45]/40 text-[#F3E4CC] text-xs font-medium shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#D99A45] animate-ping" />
              <span>Interactive 3D WebGL • Drag to Orbit</span>
            </div>
          </div>

          {/* Exploded View Ingredients Indicator */}
          {isExploded && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5 bg-[#29231F]/95 backdrop-blur-md p-3 rounded-xl border border-[#D99A45]/50 shadow-xl max-w-[210px] animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-[#D99A45] border-b border-[#D99A45]/30 pb-1">
                <Flame className="w-3 h-3 text-[#8B2E24]" />
                Fresh Layers Breakdown
              </div>
              <ul className="text-[11px] text-[#F3E4CC] space-y-1">
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#D99A45]" /> Brioche Top Crown & Sesame</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#48A02C]" /> Crisp Butterhead Lettuce</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#C5221F]" /> Vine-Ripened Roma Tomatoes</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" /> Melted Double Cheddar</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#8B2E24]" /> 2x 100% Angus Smash Patties</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#556B2F]" /> House Dill Pickles & Sauce</li>
                <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#D99A45]" /> Toasted Brioche Base</li>
              </ul>
            </div>
          )}

          {/* Flavor Steam Graphic Accent */}
          <div className="absolute -top-3 right-8 pointer-events-none hidden sm:flex items-center gap-1 text-[#D99A45] font-bold text-xs">
            <Sparkles className="w-4 h-4 animate-bounce" />
            <span className="uppercase tracking-wider">450°F Flame-Seared</span>
          </div>
        </>
      )}
    </div>
  );
};
