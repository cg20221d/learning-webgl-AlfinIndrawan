function main() {
  var kanvas = document.getElementById("kanvas");
  // gl sebagai alat pointer gambar
  var gl = kanvas.getContext("webgl");
  // vertex shadder
  var vertexShaderCode =
    `void main() { 
      float x = 0.0;
      float y = 0.0;
      gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
      gl_PointSize = 100.0;
      }`;
  var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShaderObject, vertexShaderCode);
  gl.compileShader(vertexShaderObject); // object
  // fragment shader
  var fragmentShaderCode = `
  precision mediump float;
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
  // oranye
  gl.clearColor(1.0, 0.5, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);
}