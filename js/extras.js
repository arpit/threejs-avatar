function getSpotlight(datGUI, guiControls, x, y, z ){

  guiControls.lightX = 131;
  guiControls.lightY = 107;
  guiControls.lightZ = 180;
  guiControls.intensity = 1.5;
  guiControls.distance = 373;
  guiControls.angle = 1.6;
  guiControls.exponent = 38;
  guiControls.shadowCameraNear = 34;
  guiControls.shadowCameraFar = 2635;
  guiControls.shadowCameraFov = 68;
  guiControls.shadowCameraVisible=false;
  guiControls.shadowMapWidth=512;
  guiControls.shadowMapHeight=512;
  guiControls.shadowBias=0.00;
  guiControls.shadowDarkness=0.11;



  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.castShadow = true;
  var px = x ? x : 20
  var py = x ? x : 35
  var pz = x ? x : 40

  spotLight.position.set (20, 35, 40);
  spotLight.intensity = guiControls.intensity;
  spotLight.distance = guiControls.distance;
  spotLight.angle = guiControls.angle;
  spotLight.exponent = guiControls.exponent;
  spotLight.shadowCameraNear = guiControls.shadowCameraNear;
  spotLight.shadowCameraFar = guiControls.shadowCameraFar;
  spotLight.shadowCameraFov = guiControls.shadowCameraFov;
  spotLight.shadowCameraVisible = guiControls.shadowCameraVisible;
  spotLight.shadowBias = guiControls.shadowBias;
  spotLight.shadowDarkness = guiControls.shadowDarkness;

  // guiControlsure spotLight

  var lfolder = datGUI.addFolder('Lights');
  lfolder.add(guiControls, 'lightX',-60,400);
  lfolder.add(guiControls, 'lightY',0,400);
  lfolder.add(guiControls, 'lightZ',-60,400);
  lfolder.add(guiControls, 'intensity',0.01, 5).onChange(function(value){
    spotLight.intensity = value;
  });
  lfolder.add(guiControls, 'distance',0, 1000).onChange(function(value){
    spotLight.distance = value;
  });
  lfolder.add(guiControls, 'angle',0.001, 1.570).onChange(function(value){
    spotLight.angle = value;
  });
  lfolder.add(guiControls, 'exponent',0 ,50 ).onChange(function(value){
    spotLight.exponent = value;
  });
  lfolder.add(guiControls, 'shadowCameraNear',0,100).name("Near").onChange(function(value){
    spotLight.shadowCamera.near = value;
    spotLight.shadowCamera.updateProjectionMatrix();
  });
  lfolder.add(guiControls, 'shadowCameraFar',0,5000).name("Far").onChange(function(value){
    spotLight.shadowCamera.far = value;
    spotLight.shadowCamera.updateProjectionMatrix();
  });
  lfolder.add(guiControls, 'shadowCameraFov',1,180).name("Fov").onChange(function(value){
    spotLight.shadowCamera.fov = value;
    spotLight.shadowCamera.updateProjectionMatrix();
  });
  lfolder.add(guiControls, 'shadowCameraVisible').onChange(function(value){
    spotLight.shadowCameraVisible = value;
    spotLight.shadowCamera.updateProjectionMatrix();
  });
  lfolder.add(guiControls, 'shadowBias',0,1).onChange(function(value){
    spotLight.shadowBias = value;
    spotLight.shadowCamera.updateProjectionMatrix();
  });
  lfolder.add(guiControls, 'shadowDarkness',0,1).onChange(function(value){
    spotLight.shadowDarkness = value;
    spotLight.shadowCamera.updateProjectionMatrix();
  });

  return spotLight
}


function configureRotation(datGUI, guiControls){
  guiControls.rotation = new function(){
    this.Bone_0 = 0.0;
    this.Bone_1 = 0.0;
    this.Bone_2 = 0.0;
    this.Bone_3 = 0.0;
    this.Bone_4 = 0.0;
    this.Bone_5 = 0.0;
    this.Bone_6 = 0.0;
  }

  var cfolder = datGUI.addFolder('Rotation');
  cfolder.add(guiControls.rotation, 'Bone_0',-3.14, 3.14);
  cfolder.add(guiControls.rotation, 'Bone_1',-3.14, 3.14);
  cfolder.add(guiControls.rotation, 'Bone_2',-3.14, 3.14);
  cfolder.add(guiControls.rotation, 'Bone_3',-3.14, 3.14);
  cfolder.add(guiControls.rotation, 'Bone_4',-3.14, 3.14);
  cfolder.add(guiControls.rotation, 'Bone_5',-3.14, 3.14);
  cfolder.add(guiControls.rotation, 'Bone_6',-3.14, 3.14);
}

function configureTranslation(datGUI, guiControls){
  guiControls.translation = new function(){
    this.upperarm_L_x = 0.01;
    this.upperarm_L_y = 0.01;
    this.upperarm_L_z = 0.01;

    this.lowerarm_L_x = 0.01;
    this.lowerarm_L_y = 0.01;
    this.lowerarm_L_z = 0.01;
  }

  var cfolder = datGUI.addFolder('Translation Left Arm');
  cfolder.add(guiControls.translation, 'upperarm_L_x',-1.0, 1.0);
  cfolder.add(guiControls.translation, 'upperarm_L_y',-1.0, 1.0);
  cfolder.add(guiControls.translation, 'upperarm_L_z',-1, 1);
  cfolder.add(guiControls.translation, 'lowerarm_L_x',-1, 1);
  cfolder.add(guiControls.translation, 'lowerarm_L_y',-1, 1);
  cfolder.add(guiControls.translation, 'lowerarm_L_z',-1, 1);

}
