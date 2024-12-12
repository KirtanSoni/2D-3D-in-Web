# Summary 
WebGL's story begins with OpenGL, which was released by Silicon Graphics in 1992. At the time, 3D graphics were primarily confined to specialized workstations and gaming consoles.  
<div style="text-align: center;">
    <img src="https://www.techspot.com/articles-info/2142/images/2020-12-05-image-2.jpg" 
         style="width: 600px; height: 400px; border-radius: 10px;" 
         alt="Image description">
    <p style="font-style: italic; font-size: 14px;">Cal Jeffery, Techspot</p>
</div>

The first major step toward WebGL came in 2004 when Vladimir Vukićević at Mozilla began experimenting with rendering 3D graphics in browsers using the canvas element. This early experimentation, called "Canvas 3D," laid the groundwork for what would become WebGL.  
2006 saw Opera's introduction of their own 3D canvas implementation, showing growing interest in browser-based 3D graphics. Around this time, browser vendors were competing to advance web capabilities.  
The first version of WebGL was released in 2011 by the non-profit Khronos Group. Backed by industry giants like Apple, Google, Mozilla, etc. It was seen as an open platform to render graphics on the web without relying Adobe Flash or any specialized plugin. The idea behind making a JavaScript API for OpenGL was that there were already OpenGL developers who could capitalize on this API to make web-based graphics (an emerging platform at the time). The aim, a noble one, was to bring low level graphics rendering capabilities to the web. In 2017, Khronos Group released WebGL 2.0. It utilized the OpenGL ES 2.0 spec which brought higher fidelity features such as 3D textures to the web. WebGL standards are maintained and developed by the Khronos Group. Despite regular updates, WebGL seems to be on its way out now. Their effort seems to be primarily directed at WebGPU. While only a working draft currently, WebGPU is based on the Vulkan API- a much superior graphics rendering API in comparison to OpenGL.