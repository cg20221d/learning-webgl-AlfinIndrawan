function main() {
  var kanvas = document.getElementById("kanvas");
  // gl sebagai alat pointer gambar
  var gl = kanvas.getContext("webgl");
  // vertex shadder
  var vertexShaderCode =
    `void main() { 
      }`;
  var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShaderObject, vertexShaderCode);
  gl.compileShader(vertexShaderObject); // object
  // fragment shader
  var fragmentShaderCode = `
    void main() {
      }`;
  var fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
  gl.compileShader(fragmentShaderObject);

  var shaderProgram = gl.createProgram(); //executable
  gl.attachShader(shaderProgram, vertexShaderObject);
  gl.attachShader(shaderProgram, fragmentShaderObject);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);
  gl.clearColor(0.5, 0.5, 0.5, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}