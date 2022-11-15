function main() {
  var kanvas = document.getElementById("kanvas");
  var gl = kanvas.getContext("webgl");

  var vertices9_1 = [
    -0.35, 0.4, 0.1, 1, 1, 1,    // Index:  0
    -0.7, 0.4, 0.1, 1, 1, 1,    // Index:  1
    -0.8, 0.4, 0.1, 1, 1, 1,    // Index:  2
    -0.8, 0.7, 0.1, 1, 1, 1,    // Index:  3
    -0.7, 0.8, 0.1, 1, 1, 1,    // Index:  4
    -0.35, 0.8, 0.1, 1, 1, 1,    // Index:  5
    -0.25, 0.8, 0.1, 1, 1, 1,    // Index:  6
    -0.25, 0.25, 0.1, 1, 1, 1,    // Index:  7
    -0.35, 0.15, 0.1, 1, 1, 1,    // Index:  8
    -0.7, 0.15, 0.1, 1, 1, 1,    // Index:  9
    -0.8, 0.15, 0.1, 1, 1, 1,    // Index:  10
    -0.8, 0.35, 0.1, 1, 1, 1,    // Index:  11
    -0.7, 0.35, 0.1, 1, 1, 1,    // Index:  12
    -0.7, 0.3, 0.1, 1, 1, 1,    // Index:  13
    -0.65, 0.25, 0.1, 1, 1, 1,    // Index:  14
    -0.4, 0.25, 0.1, 1, 1, 1,    // Index:  15
    -0.35, 0.3, 0.1, 1, 1, 1,    // Index:  16
  ];

  var verticesA = [
    // create 'A' shape with 3D effect 
    -0.35, 0.4, 0.1, 1, 1, 1,    // Index:  0
    -0.7, 0.4, 0.1, 1, 1, 1,    // Index:  1
    -0.8, 0.4, 0.1, 1, 1, 1,    // Index:  2
    -0.8, 0.7, 0.1, 1, 1, 1,    // Index:  3
    -0.7, 0.8, 0.1, 1, 1, 1,    // Index:  4
    -0.35, 0.8, 0.1, 1, 1, 1,    // Index:  5
    -0.25, 0.8, 0.1, 1, 1, 1,    // Index:  6
    -0.25, 0.25, 0.1, 1, 1, 1,    // Index:  7
    -0.35, 0.15, 0.1, 1, 1, 1,    // Index:  8
    -0.7, 0.15, 0.1, 1, 1, 1,    // Index:  9
    -0.8, 0.15, 0.1, 1, 1, 1,    // Index:  10
    -0.8, 0.35, 0.1, 1, 1, 1,    // Index:  11
    -0.7, 0.35, 0.1, 1, 1, 1,    // Index:  12
    -0.7, 0.3, 0.1, 1, 1, 1,    // Index:  13
    -0.65, 0.25, 0.1, 1, 1, 1,    // Index:  14
    -0.4, 0.25, 0.1, 1, 1, 1,    // Index:  15
    -0.35, 0.3, 0.1, 1, 1, 1,    // Index:  16
  ];


  //   // "N"
  //   0.5, -0.4,
  //   0.5, 0.4,
  //   0.5, 0.4,
  //   0.9, -0.4,
  //   0.9, -0.4,



  var indices9_1 = [
    0, 1, 2, 0, 2, 3,
    4, 5, 6, 4, 6, 7,
    8, 9, 10, 8, 10, 11,
    12, 13, 14, 12, 14, 15,
    16, 17, 18, 16, 18, 19,
    20, 21, 22, 20, 22, 23,
  ];

  var indicesA = [
    0, 1, 2, 0, 2, 3,
    4, 5, 6, 4, 6, 7,
    8, 9, 10, 8, 10, 11,
    12, 13, 14, 12, 14, 15,
    16, 17, 18, 16, 18, 19,
    20, 21, 22, 20, 22, 23,
  ];

  var objects = [
    {
      name: '9',
      vertices: vertices9_1,
      indices: indices9_1,
      length: 16,
      type: gl.LINE_LOOP,
    },
    {
      name: 'A',
      vertices: verticesA,
      indices: indicesA,
      length: 16,
      type: gl.LINE_LOOP,
    }
  ]

  var vertexShaderCode = `
  attribute vec3 aPosition;  
  attribute vec3 aColor;
  uniform mat4 uModel;
  uniform mat4 uView;
  uniform mat4 uProjection;
  varying vec3 vColor;
  void main() {
      gl_Position = uProjection * uView * uModel * vec4(aPosition, 1.0);
      vColor = aColor;
  }
  `;
  var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShaderObject, vertexShaderCode);
  gl.compileShader(vertexShaderObject);   // objek

  // Fragment shader
  var fragmentShaderCode = `
  precision mediump float;
  varying vec3 vColor;
  void main() {
      gl_FragColor = vec4(vColor, 1.0);
  }
  `;
  var fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
  gl.compileShader(fragmentShaderObject);   // sampai sini sudah jadi .o

  var shaderProgram = gl.createProgram(); // wadah dari executable (.exe)
  gl.attachShader(shaderProgram, vertexShaderObject);
  gl.attachShader(shaderProgram, fragmentShaderObject);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  // Variabel lokal
  var theta = 0.0;
  var freeze = false;
  var frameWidth = 9;
  var horizontalSpeed = 0.0199; // NRP akhir 199
  var scaleSpeed = 0.0199;
  var verticalSpeed = 0.0;
  var horizontalDelta = 0.0;
  var verticalDelta = 0.0;
  var scaleDelta = 0.0;

  // Variabel pointer ke GLSL
  var uModel = gl.getUniformLocation(shaderProgram, "uModel");
  // View
  var cameraX = 0.0;
  var cameraZ = 7.5; // nomer 3 kamera
  var uView = gl.getUniformLocation(shaderProgram, "uView");
  var view = mat4.create();
  mat4.lookAt(
    view,
    [cameraX, 0.0, cameraZ],    // the location of the eye or the camera
    [cameraX, 0.0, -10],        // the point where the camera look at
    [0.0, 1.0, 0.0]
  );
  // Projection
  var uProjection = gl.getUniformLocation(shaderProgram, "uProjection");
  var perspective = mat4.create();

  mat4.perspective(perspective, Math.PI / 3, 1.0, 0.5, 50);

  function drawing(vertices, indices, start = 0, end, glType = gl.LINE_LOOP) {
    const buffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();

    // bind buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(shaderProgram, 'aPosition');
    const aColor = gl.getAttribLocation(shaderProgram, 'aColor');
    // variable pointer ke GLSL
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false,
      6 * Float32Array.BYTES_PER_ELEMENT,
      0 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aPosition);


    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false,
      6 * Float32Array.BYTES_PER_ELEMENT,
      3 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aColor);

    gl.drawElements(glType, indices.length - 11, gl.UNSIGNED_SHORT, 0);
  }

  const animateMove9 = () => {
    var model = mat4.create();

    if (horizontalDelta >= (frameWidth / 2) || horizontalDelta <= (-frameWidth / 2 + 1)) {
      horizontalSpeed = horizontalSpeed * -1;
    }
    horizontalDelta += horizontalSpeed;
    mat4.translate(model, model, [horizontalDelta, verticalDelta, 0.0]);

    var uModel = gl.getUniformLocation(shaderProgram, "uModel");
    var uView = gl.getUniformLocation(shaderProgram, "uView");
    var uProjection = gl.getUniformLocation(shaderProgram, "uProjection");
    gl.uniformMatrix4fv(uModel, false, model);
    gl.uniformMatrix4fv(uView, false, view);
    gl.uniformMatrix4fv(uProjection, false, perspective);
    drawing(objects[0].vertices, objects[0].indices, 0, objects[0].length, objects[0].type);
  }

  const animateSize9 = () => {
    var model = mat4.create();

    if (scaleDelta >= 0.5 || scaleDelta <= -0.5) {
      scaleSpeed = scaleSpeed * -1;
    }

    scaleDelta += scaleSpeed;
    mat4.scale(model, model, [1.0 + scaleDelta, 1.0 + scaleDelta, 1.0 + scaleDelta]);

    var uModel = gl.getUniformLocation(shaderProgram, "uModel");
    var uView = gl.getUniformLocation(shaderProgram, "uView");
    var uProjection = gl.getUniformLocation(shaderProgram, "uProjection");
    gl.uniformMatrix4fv(uModel, false, model);
    gl.uniformMatrix4fv(uView, false, view);
    gl.uniformMatrix4fv(uProjection, false, perspective);
    drawing(objects[0].vertices, objects[0].indices, 0, objects[0].length, objects[0].type);
  }

  const animateRotationA = () => {
    // Rotate the vertices 'A' object about the Y axis with -1 angular velocity
    var model = mat4.create();
    mat4.rotateY(model, model, theta);
    theta += 0.01;

    var uModel = gl.getUniformLocation(shaderProgram, "uModel");
    var uView = gl.getUniformLocation(shaderProgram, "uView");
    var uProjection = gl.getUniformLocation(shaderProgram, "uProjection");
    gl.uniformMatrix4fv(uModel, false, model);
    gl.uniformMatrix4fv(uView, false, view);
    gl.uniformMatrix4fv(uProjection, false, perspective);
    drawing(objects[1].vertices, objects[1].indices, 0, objects[1].length, objects[1].type);
  }

  const animateRotationN = () => {
    // Rotate the vertices 'A' object about the X axis with -1 angular velocity
    var model = mat4.create();
    mat4.rotateX(model, model, theta);
    theta += 0.01;

    var uModel = gl.getUniformLocation(shaderProgram, "uModel");
    var uView = gl.getUniformLocation(shaderProgram, "uView");
    var uProjection = gl.getUniformLocation(shaderProgram, "uProjection");
    gl.uniformMatrix4fv(uModel, false, model);
    gl.uniformMatrix4fv(uView, false, view);
    gl.uniformMatrix4fv(uProjection, false, perspective);
    drawing(objects[1].vertices, objects[1].indices, 0, objects[1].length, objects[1].type);
  }

  var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false,
    6 * Float32Array.BYTES_PER_ELEMENT,
    0);
  gl.enableVertexAttribArray(aPosition);
  var aColor = gl.getAttribLocation(shaderProgram, "aColor");
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false,
    6 * Float32Array.BYTES_PER_ELEMENT,
    3 * Float32Array.BYTES_PER_ELEMENT);
  gl.enableVertexAttribArray(aColor);

  function render() {
    gl.enable(gl.DEPTH_TEST);
    // orange
    gl.clearColor(1.0, 0.5, 0.0, 1.0);
    //            Merah     Hijau   Biru    Transparansi
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    if (!freeze) {
      theta += 0.005;
    }
    horizontalDelta += horizontalSpeed;
    verticalDelta -= verticalSpeed;
    var model = mat4.create(); // Membuat matriks identitas
    mat4.translate(
      model, model, [horizontalDelta, verticalDelta, 0.0]
    );
    mat4.rotateX(
      model, model, theta
    );
    mat4.rotateY(
      model, model, theta
    );
    mat4.rotateZ(
      model, model, theta
    );
    gl.uniformMatrix4fv(uModel, false, model);
    gl.uniformMatrix4fv(uView, false, view);
    gl.uniformMatrix4fv(uProjection, false, perspective);
    animateMove9();
    animateSize9();
    animateRotationA();
    animateRotationN();
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}