function main() {
  var kanvas = document.getElementById("kanvas");
  // gl sebagai alat pointer gambar
  var gl = kanvas.getContext("webgl");
  // create a vertices that make word A
  var vertices = [
    // 9
    -0.5, 0,
    - 0.9, 0,
    -0.9, 0.4,
    -0.5, 0.4,
    -0.5, 0,
    -0.5, -0.4,
    -0.5, -0.4,
    -0.9, -0.4,
    // 9 again
    0, 0,
    - 0.4, 0,
    -0.4, 0.4,
    0, 0.4,
    0, 0,
    0, -0.4,
    0, -0.4,
    -0.4, -0.4,
  ];
  var vertices_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertices_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  // vertex shadder
  var vertexShaderCode =
    `
    attribute vec2 aPosition;
    void main() { 
      float x = aPosition.x;
      float y = aPosition.y;
      gl_Position = vec4(x, y , 0.0, 1.0);
      gl_PointSize = 5.0;
      }`;
  var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShaderObject, vertexShaderCode);
  gl.compileShader(vertexShaderObject); // object
  // fragment shader
  var fragmentShaderCode = `
  precision highp float;
    void main() {
      float r = 0.0;
      float g = 0.0;
      float b = 1.0;
      gl_FragColor = vec4(r,g,b, 1.0);
      }`;
  var fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
  gl.compileShader(fragmentShaderObject);

  var shaderProgram = gl.createProgram(); //executable
  gl.attachShader(shaderProgram, vertexShaderObject);
  gl.attachShader(shaderProgram, fragmentShaderObject);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);
  // teaching gpu how to read position from array_buffer to each vertex that processed
  var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);
  // oranye
  gl.clearColor(1.0, 0.5, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  // draw a  9
  gl.drawArrays(gl.LINE_LOOP, 0, 4);
  gl.drawArrays(gl.LINES, 4, 4)
  gl.drawArrays(gl.LINE_LOOP, 8, 4);
  gl.drawArrays(gl.LINES, 12, 4)
}
