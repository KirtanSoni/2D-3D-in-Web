const createScene = function() {
    // Create a basic scene
    const scene = new BABYLON.Scene(engine);

    // Add a camera
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        0, Math.PI / 3,
        10,
        BABYLON.Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas, true);

    // Add lighting
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

    // Create a basic shape
    const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);

    return scene;
};