import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";

const Model = () => {
  const { scene, animations } = useGLTF("/model.glb"); // Load the model
  const { actions } = useAnimations(animations, scene); // Get animations

  useEffect(() => {
    if (actions) {
      // Play all available animations
      Object.values(actions).forEach((action) => action.play());
    }
  }, [actions]);

  return <primitive object={scene} scale={1.5} />;
};

const GLBViewer = () => {
    return (
      <div className="w-[500px] h-[500px] flex justify-center items-center"> {/* Adjusted container size */}
        <Canvas camera={{ position: [0, 2, 5] }} className="w-full h-full">
          <ambientLight intensity={1} />
          <directionalLight position={[2, 2, 2]} />
          <Model />
          <OrbitControls />
        </Canvas>
      </div>
    );
  };
  
  export default GLBViewer;
