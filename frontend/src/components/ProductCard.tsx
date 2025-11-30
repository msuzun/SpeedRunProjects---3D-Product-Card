import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useProduct } from '../hooks/useProduct';
import SneakerModel from './SneakerModel';

interface ProductCardProps {
    productId: string;
}

export default function ProductCard({ productId }: ProductCardProps) {
    const { data: product, isLoading, error } = useProduct({ productId });
    const [interacted, setInteracted] = useState(false);

    if (isLoading) {
        return <ProductCardSkeleton />;
    }

    if (error || !product) {
        return (
            <div className="w-[380px] h-[600px] flex items-center justify-center text-red-500 bg-white/10 backdrop-blur-md rounded-3xl">
                Failed to load product.
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-[380px] h-[600px] rounded-3xl shadow-2xl overflow-hidden flex flex-col bg-white"
        >
            {/* 3D Canvas Section - Top 65% */}
            <div
                className="w-full h-[65%] relative"
                style={{
                    background: `linear-gradient(180deg, ${product.backgroundColor}20 0%, #ffffff 100%)`
                }}
                onPointerDown={() => setInteracted(true)}
            >
                <Canvas
                    shadows
                    camera={{ position: [0, 0, 2.5], fov: 45 }}
                    className="w-full h-full"
                >
                    <Suspense fallback={null}>
                        <SneakerModel modelUrl={product.modelUrl} />
                        <OrbitControls enableZoom={false} enableRotate={false} />
                    </Suspense>
                </Canvas>

                {/* Interaction Hint */}
                <AnimatePresence>
                    {!interacted && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="absolute bottom-4 left-0 right-0 text-center pointer-events-none"
                        >
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center animate-pulse">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                        <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                                        <path d="M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17" />
                                        <path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                                    </svg>
                                </div>
                                <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                                    Drag to Rotate
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Product Details Section - Bottom 35% */}
            <div className="w-full h-[35%] p-6 flex flex-col justify-between bg-white relative z-10">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h1 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">
                            {product.name}
                        </h1>
                        <span className="text-xl font-bold text-emerald-600">
                            ${product.price}
                        </span>
                    </div>

                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed font-medium">
                        {product.description}
                    </p>
                </div>

                <div className="space-y-4">
                    {/* Size Selector - Compact */}
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Size</span>
                        <div className="flex space-x-1">
                            {[7, 8, 9, 10].map((size) => (
                                <button
                                    key={size}
                                    className="w-8 h-8 rounded-lg border border-gray-100 hover:border-black hover:bg-black hover:text-white flex items-center justify-center text-xs font-bold transition-all duration-200"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className="w-full bg-black text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl hover:bg-neutral-900">
                        Add to Cart
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

function ProductCardSkeleton() {
    return (
        <div className="w-[380px] h-[600px] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col animate-pulse">
            <div className="w-full h-[65%] bg-gray-100" />
            <div className="w-full h-[35%] p-6 flex flex-col justify-between">
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <div className="h-8 w-40 bg-gray-100 rounded-lg" />
                        <div className="h-8 w-16 bg-gray-100 rounded-lg" />
                    </div>
                    <div className="h-10 w-full bg-gray-100 rounded-lg" />
                </div>
                <div className="h-12 w-full bg-gray-100 rounded-xl" />
            </div>
        </div>
    );
}
