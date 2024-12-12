const createScene = function() {
    const scene = new BABYLON.Scene(engine);
    scene.createDefaultCameraOrLight(true, true, true);
    
    // Configure camera
    const camera = scene.activeCamera;
    camera.radius = 5;  // distance from target
    camera.alpha = Math.PI/4;  // horizontal rotation
    camera.beta = Math.PI/3;   // vertical angle
    
    // Duck model from Khronos sample repository
    BABYLON.SceneLoader.ImportMeshAsync(
        "", // Names of the meshes to load, empty string means load all 
        "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/", // Path to the model
        "Duck.glb", // Name of the file
        scene,
        function(meshes) {
            // Get the duck mesh
            const duck = meshes[0];
            
            // Scale the duck (it's a bit large by default)
            duck.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
            
            // Add rotation animation
            duck.actionManager = new BABYLON.ActionManager(scene);
            duck.actionManager.registerAction(
                new BABYLON.IncrementValueAction(
                    BABYLON.ActionManager.OnPickTrigger,
                    duck,
                    'rotation.y',
                    Math.PI/2,
                    1000
                )
            );
            
            // Center camera on duck
            camera.target = duck.position;
        }
    );

    return scene;
};