<script>
export default {
  name: 'BasicAnimationsCode',
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
    // Create a box
    const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);

    // Create PBR material
    const pbr = new BABYLON.PBRMaterial("pbr", scene);
    pbr.metallic = 0.6;
    pbr.roughness = 0.4;
    pbr.albedoColor = new BABYLON.Color3(0.24, 0.79, 0.24);

    box.material = pbr;
    
    // Create animation
    const animation = new BABYLON.Animation(
        "boxRotation",
        "rotation.y",
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    // Animation keys
    const keys = [];
    keys.push({ frame: 0, value: 0 });
    keys.push({ frame: 100, value: 2 * Math.PI });
    animation.setKeys(keys);
    // Attach animation to box
    box.animations = [animation];
    
    // Start the animation
    scene.beginAnimation(box, 0, 100, true);
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