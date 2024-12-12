<script>
export default {
    name: 'PhysicsCode',
    setup() {
      const tutorial = `const createScene = function() {
        const scene = new BABYLON.Scene(engine);
        
        // Enable physics engine with gravity
        scene.enablePhysics(
            new BABYLON.Vector3(0, -9.81, 0),
            new BABYLON.CannonJSPlugin()
        );
        
        const camera = new BABYLON.ArcRotateCamera(
            "camera",
            0, Math.PI / 3,
            15,
            new BABYLON.Vector3(0, 5, 0),
            scene
        );
        camera.attachControl(canvas, true);
        
        const light = new BABYLON.HemisphericLight(
            "light",
            new BABYLON.Vector3(0, 1, 0),
            scene
        );
        
        // Create ground
        const ground = BABYLON.MeshBuilder.CreateGround("ground", {
            width: 10,
            height: 10
        }, scene);
        
        const groundMaterial = new BABYLON.PBRMaterial("groundMaterial", scene);
        groundMaterial.metallic = 0.1;
        groundMaterial.roughness = 0.8;
        groundMaterial.albedoColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        ground.material = groundMaterial;
        
        // Add physics to ground (mass: 0 makes it static)
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(
            ground,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0.5 },
            scene
        );
        
        // Create falling box
        const box = BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);
        box.position.y = 8;  // Start position above ground
        
        // Box material
        const pbr = new BABYLON.PBRMaterial("pbr", scene);
        pbr.metallic = 0.6;
        pbr.roughness = 0.4;
        pbr.albedoColor = new BABYLON.Color3(0.24, 0.79, 0.24);
        box.material = pbr;
        
        // Add physics to box
        box.physicsImpostor = new BABYLON.PhysicsImpostor(
            box,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { 
                mass: 1,
                restitution: 0.5,  // Bounciness
                friction: 0.1      // Sliding friction
            },
            scene
        );
        
        return scene;
    };

    // Reset function to restore initial state
    const resetScene = () => {
        box.position = new BABYLON.Vector3(0, 8, 0);
        box.physicsImpostor.setLinearVelocity(BABYLON.Vector3.Zero());
        box.physicsImpostor.setAngularVelocity(BABYLON.Vector3.Zero());
        box.rotationQuaternion = BABYLON.Quaternion.Identity();
    };`;
  
      return {
        tutorial
      };
    }
  }
  </script>
  
  <template>
    <div>
      <pre><code>{{ tutorial }}</code></pre>
    </div>
  </template>