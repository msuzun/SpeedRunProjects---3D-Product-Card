import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useProduct } from '../hooks/useProduct';
import SneakerModel from './SneakerModel';

interface ProductCardProps {
    productId: string;
}

export default function ProductCard({ productId }: ProductCardProps) {
    const { data: product, isLoading, error } = useProduct({ productId });

    if (isLoading) {
        return <ProductCardSkeleton />;
    }

    if (error || !product) {
        return (
            <div className="w-full h-96 flex items-center justify-center text-red-500">
                Failed to load product.
            </div>
        );
    }

    // Dynamic background style
    const backgroundStyle = {
        background: `linear-gradient(135deg, ${product.backgroundColor} 0%, #ffffff 100%)`,
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            style={backgroundStyle}
        >
            {/* 3D Canvas Section */}
            <div className="w-full md:w-1/2 aspect-video md:h-auto relative bg-transparent">
                <Canvas
                    shadows
                    camera={{ position: [0, 0, 4], fov: 45 }}
                    className="w-full h-full"
                >
                    <Suspense fallback={null}>
                        <SneakerModel modelUrl={product.modelUrl} />
                        <OrbitControls enableZoom={false} enableRotate={false} />
                    </Suspense>
                </Canvas>

                {/* Interaction Hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-4 left-0 right-0 text-center pointer-events-none"
                >
                    <span className="text-xs text-gray-500/80 font-medium tracking-widest uppercase">
                        Drag to Rotate
                    </span>
                </motion.div>
            </div>

            {/* Product Details Section */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <div className="mb-4">
                        <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                            NEW DROP
                        </span>
                    </div>

                    <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
                        {product.name}
                    </h1>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="flex items-center justify-between mb-8">
                        <span className="text-3xl font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                        </span>

                        <div className="flex space-x-2">
                            {[7, 8, 9, 10, 11].map((size) => (
                                <button
                                    key={size}
                                    className="w-10 h-10 rounded-full border border-gray-200 hover:border-black hover:bg-black hover:text-white flex items-center justify-center text-sm font-medium transition-all duration-200"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl">
                        Add to Cart
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
}

function ProductCardSkeleton() {
    return (
        <div className="w-full max-w-4xl h-[600px] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row animate-pulse">
            <div className="w-full md:w-1/2 h-64 md:h-full bg-gray-200" />
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center space-y-4">
                <div className="h-6 w-20 bg-gray-200 rounded-full" />
                <div className="h-10 w-3/4 bg-gray-200 rounded" />
                <div className="h-20 w-full bg-gray-200 rounded" />
                <div className="flex justify-between items-center">
                    <div className="h-8 w-24 bg-gray-200 rounded" />
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-10 w-10 bg-gray-200 rounded-full" />
                        ))}
                    </div>
                </div>
                <div className="h-14 w-full bg-gray-200 rounded-xl" />
            </div>
        </div>
    );
}
