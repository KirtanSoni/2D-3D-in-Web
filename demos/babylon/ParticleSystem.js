const createScene = function() {
    const scene = new BABYLON.Scene(engine);
    
    // Set black background
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
    
    // Setup camera
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        0, Math.PI / 3,
        10,
        BABYLON.Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas, true);
    
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    
    // Create the particle system
    const particleSystem = new BABYLON.ParticleSystem("stars", 2000, scene);
    
    // Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture(
        "/textures/flare.png",
        scene
    );
    
    // Set the particle emission space
    particleSystem.emitter = new BABYLON.Vector3(0, 0, 0); // origin point
    particleSystem.minEmitBox = new BABYLON.Vector3(-5, -5, -5); // minimum boundary
    particleSystem.maxEmitBox = new BABYLON.Vector3(5, 5, 5);   // maximum boundary
    
    // Size of each particle (random between...)
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.3;
    
    // Life time of each particle (random between...)
    particleSystem.minLifeTime = 8;
    particleSystem.maxLifeTime = 10;
    
    // Emission rate (particles per frame)
    particleSystem.emitRate = 100;
    
    // Set the gravity of all particles (none for stars)
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);
    
    // Blend mode for glowing effect
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
    
    // Color gradient
    particleSystem.color1 = new BABYLON.Color4(1, 1, 1, 1);
    particleSystem.color2 = new BABYLON.Color4(0.8, 0.8, 1, 1);
    
    // Speed and rotation
    particleSystem.minInitialRotation = 0;
    particleSystem.maxInitialRotation = Math.PI;
    particleSystem.minEmitPower = 0;
    particleSystem.maxEmitPower = 0.1;
    
    // Start the particle system
    particleSystem.start();
    
    return scene;
};