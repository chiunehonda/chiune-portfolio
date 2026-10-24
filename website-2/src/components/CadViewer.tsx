import { useEffect, useRef, useState } from "react";
import { Box3, Color, DirectionalLight, Group, HemisphereLight, Mesh, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

type Props = { src: string; title: string; caption: string };

export function CadViewer({ src, title, caption }: Props) {
  const mount = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let cancelled = false;
    let model: Group | undefined;
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      queueMicrotask(() => setError(true));
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(new Color("#f0ede5"), 1);
    host.appendChild(renderer.domElement);
    const scene = new Scene();
    scene.add(new HemisphereLight("#ffffff", "#88928d", 2.6));
    const key = new DirectionalLight("#fff5e6", 3.2);
    key.position.set(3, 5, 7);
    scene.add(key);
    const camera = new PerspectiveCamera(38, 1, 0.01, 10000);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = false;
    controls.enablePan = false;
    const draw = () => renderer.render(scene, camera);
    controls.addEventListener("change", draw);
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      draw();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    new GLTFLoader().load(src, (gltf) => {
      if (cancelled) return;
      model = gltf.scene;
      const bounds = new Box3().setFromObject(model);
      const center = bounds.getCenter(new Vector3());
      const size = bounds.getSize(new Vector3());
      model.position.sub(center);
      scene.add(model);
      const longest = Math.max(size.x, size.y, size.z);
      const distance = longest / (2 * Math.tan((camera.fov * Math.PI) / 360));
      camera.position.set(distance * 0.62, distance * 0.5, distance * 0.83);
      camera.near = Math.max(longest / 1000, 0.001);
      camera.far = longest * 20;
      camera.updateProjectionMatrix();
      controls.minDistance = longest * 0.45;
      controls.maxDistance = longest * 7;
      controls.target.set(0, 0, 0);
      controls.update();
      resize();
    }, undefined, () => { if (!cancelled) setError(true); });
    resize();
    return () => {
      cancelled = true;
      observer.disconnect();
      controls.dispose();
      model?.traverse((object) => { if (object instanceof Mesh) object.geometry.dispose(); });
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, [src]);

  return <div className="cad-viewer"><div className="cad-viewer-heading"><div><span>INTERACTIVE CAD</span><h3>{title}</h3></div><span className="cad-viewer-controls">Drag to rotate · Scroll to zoom</span></div><div className="cad-viewer-canvas" ref={mount} role="img" aria-label={`Interactive 3D model of ${title}`} />{error && <p className="cad-viewer-error">The 3D view could not load. <a href={src}>Download the model</a>.</p>}<p className="cad-viewer-caption">{caption}</p></div>;
}
