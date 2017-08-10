$(function(){

  let SHOW_SPOTLIGHT = true;
  var spotLight

    /*global variables*/
	var scene, camera, renderer;
	var controls, guiControls, datGUI;
	var stats;
	var spotLight, hemi;
	var SCREEN_WIDTH, SCREEN_HEIGHT;
	var loader, model;


	function init(){
		/*creates empty scene object and renderer*/
		scene = new THREE.Scene();
		camera =  new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .1, 10);
		renderer = new THREE.WebGLRenderer({antialias:true});

		renderer.setClearColor(0x333300);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMap.enabled= true;
		renderer.shadowMapSoft = true;

		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.addEventListener( 'change', render );

		camera.position.x = 1.5;
		camera.position.y = 1.5;
		camera.position.z = 1.5;
		camera.lookAt(scene.position);


    hemi = new THREE.HemisphereLight( 0xff0090, 0xff0011 );
    scene.add(hemi);
    scene.fog = new THREE.Fog( 0xffff90, .01, 500 );

    datGUI = new dat.GUI();


		/*datGUI controls object*/
		guiControls = new function(){
      configureRotation(datGUI, this)
      this.scene = function(){
          console.log("Scene", scene);
      };

		}

    if(SHOW_SPOTLIGHT){
      spotLight = getSpotlight(datGUI, guiControls)
      scene.add(spotLight)
    }
    loader = new THREE.JSONLoader();

    loader.load( './avatar.json', addModel );
    datGUI.add(guiControls, "scene");
		datGUI.close();


		$("#webGL-container").append(renderer.domElement);
		/*stats*/
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';
		$("#webGL-container").append( stats.domElement );
	}
    var set = [];
    var helpset = [];

    function addModel( geometry,  materials ){
        for (var i = 0;i < 1; i++){
          materials[0].skinning = true;

          set[i]= new THREE.SkinnedMesh( geometry, new THREE.MeshFaceMaterial(materials) );
          set[i].position.set(0,0,0);

          console.log(set[i].position)

          set[i].scale.set (1, 1, 1);
          set[i].castShadow = true;
          set[i].receiveShadow = true;

          scene.add(set[i]);
          helpset[i] = new THREE.SkeletonHelper(set[i]);
          scene.add(helpset[i]);
        }
    }

	function render() {
    if(SHOW_SPOTLIGHT){
      spotLight.position.x = guiControls.lightX;
  		spotLight.position.y = guiControls.lightY;
  		spotLight.position.z = guiControls.lightZ;
    }

    scene.traverse(function(child){
        if (child instanceof THREE.SkinnedMesh){

            child.rotation.y += .01;

            child.skeleton.bones[0].rotation.z = guiControls.rotation.Bone_0;
            child.skeleton.bones[1].rotation.z = guiControls.rotation.Bone_1;
            child.skeleton.bones[2].rotation.z = guiControls.rotation.Bone_2;
            child.skeleton.bones[3].rotation.z = guiControls.rotation.Bone_3;
            child.skeleton.bones[4].rotation.z = guiControls.rotation.Bone_4;
            child.skeleton.bones[5].rotation.z = guiControls.rotation.Bone_5;
            child.skeleton.bones[6].rotation.z = guiControls.rotation.Bone_6;
        }
        else if  (child instanceof THREE.SkeletonHelper){
            //child.update();
        }
    });
	}

	function animate(){
		requestAnimationFrame(animate);
		render();
		stats.update();
		renderer.render(scene, camera);
	}

    init();
    animate();

    $(window).resize(function(){
        SCREEN_WIDTH = window.innerWidth;
        SCREEN_HEIGHT = window.innerHeight;
        camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        camera.updateProjectionMatrix();
        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    });

});
