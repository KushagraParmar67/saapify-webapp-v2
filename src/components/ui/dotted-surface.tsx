'use client';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
	const { theme } = useTheme();

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;
		// Wait for next-themes to resolve before building the scene.
		// Without this guard the effect runs twice (undefined → 'dark') and
		// leaves a zombie rAF loop because the stale frame ID can't be cancelled.
		if (theme === undefined) return;

		const isDark = theme === 'dark';
		const bgColor = isDark ? 0x0a192f : 0xffffff;
		const fogColor = isDark ? 0x0a192f : 0xffffff;

		const SEPARATION = 150;
		const AMOUNTX = 40;
		const AMOUNTY = 60;

		const scene = new THREE.Scene();
		scene.fog = new THREE.Fog(fogColor, 2000, 10000);

		const camera = new THREE.PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			1,
			10000,
		);
		camera.position.set(0, 355, 1220);

		const renderer = new THREE.WebGLRenderer({
			alpha: false,
			antialias: true,
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(bgColor, 1);

		containerRef.current.appendChild(renderer.domElement);

		const positions: number[] = [];
		const colors: number[] = [];
		const geometry = new THREE.BufferGeometry();

		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
				const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
				positions.push(x, 0, z);
				colors.push(isDark ? 200 : 0, isDark ? 200 : 0, isDark ? 200 : 0);
			}
		}

		geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

		const material = new THREE.PointsMaterial({
			size: 8,
			vertexColors: true,
			transparent: true,
			opacity: 0.8,
			sizeAttenuation: true,
		});

		const points = new THREE.Points(geometry, material);
		scene.add(points);

		// Use a closure flag instead of a stale frame ID.
		// cancelAnimationFrame(staleId) silently fails because the stored ID
		// is from frame 1 while frames 2, 3, 4… keep running uncancelled.
		let alive = true;
		let count = 0;

		const animate = () => {
			if (!alive) return;
			requestAnimationFrame(animate);

			const positionAttribute = geometry.attributes.position;
			const pos = positionAttribute.array as Float32Array;

			let i = 0;
			for (let ix = 0; ix < AMOUNTX; ix++) {
				for (let iy = 0; iy < AMOUNTY; iy++) {
					pos[i * 3 + 1] =
						Math.sin((ix + count) * 0.3) * 50 +
						Math.sin((iy + count) * 0.5) * 50;
					i++;
				}
			}

			positionAttribute.needsUpdate = true;
			renderer.render(scene, camera);
			count += 0.1;
		};

		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener('resize', handleResize);
		animate();

		return () => {
			alive = false;
			window.removeEventListener('resize', handleResize);

			scene.traverse((object: THREE.Object3D) => {
				if (object instanceof THREE.Points) {
					object.geometry.dispose();
					if (Array.isArray(object.material)) {
						object.material.forEach((m: THREE.Material) => m.dispose());
					} else {
						(object.material as THREE.Material).dispose();
					}
				}
			});

			renderer.dispose();

			if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
				containerRef.current.removeChild(renderer.domElement);
			}
		};
	}, [theme]);

	return (
		<div
			ref={containerRef}
			className={cn('pointer-events-none fixed inset-0', className)}
			{...props}
		/>
	);
}
