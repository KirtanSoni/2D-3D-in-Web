<script>
export default {
  name: 'InteractiveFeaturesCode',
  setup() {
    const tutorial = `const createScene = function() {
    const scene = new BABYLON.Scene(engine);
    
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
    // Create multiple boxes
    const redBox = BABYLON.MeshBuilder.CreateBox("redBox", {}, scene);
    redBox.position.x = -2;
    redBox.material = new BABYLON.StandardMaterial("redMat", scene);
    redBox.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
    const blueBox = BABYLON.MeshBuilder.CreateBox("blueBox", {}, scene);
    blueBox.position.x = 2;
    blueBox.material = new BABYLON.StandardMaterial("blueMat", scene);
    blueBox.material.diffuseColor = new BABYLON.Color3(0, 0, 1);
    // Add actions
    redBox.actionManager = new BABYLON.ActionManager(scene);
    redBox.actionManager.registerAction(
        new BABYLON.InterpolateValueAction(
            BABYLON.ActionManager.OnPickTrigger,
            redBox,
            'scaling',
            new BABYLON.Vector3(2, 2, 2),
            1000
        )
    );
    blueBox.actionManager = new BABYLON.ActionManager(scene);
    blueBox.actionManager.registerAction(
        new BABYLON.InterpolateValueAction(
            BABYLON.ActionManager.OnPickTrigger,
            blueBox,
            'rotation.y',
            Math.PI,
            2000
        )
    );
    return scene;
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