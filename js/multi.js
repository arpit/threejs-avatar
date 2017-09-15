var scene, camera, renderer;


$(function(){


  var controls, guiControls, datGUI;
	var stats;
	var hemi;
	var SCREEN_WIDTH, SCREEN_HEIGHT;
	var loader, model;

  function init(){
    setup()
    loadHead()
  }

  function loadHead(){
    loader = new THREE.GLTFLoader()
    loader.load( './exports/gltf/head.gltf', (obj)=>{
      obj.name = "head"
      console.log("HEAD", obj)
      scene.add(obj.scene)

    });

  }


  function loadObjModel(){
    loader = new THREE.ObjectLoader();

    loader.load( './exports/avatar_split_bones.json', (obj)=>{
      obj.name = "avatar"
      var helper = new THREE.SkeletonHelper( obj );
      helper.material.linewidth = 3;
      scene.add( helper );
      scene.add(obj)

    });
  }

	function setup(onSetup){
    scene = new THREE.Scene();
		camera =  new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .1, 10);
		renderer = new THREE.WebGLRenderer({antialias:true});

    window.scene = scene

		renderer.setClearColor(0xdcdcdc );
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMap.enabled= true;
		renderer.shadowMapSoft = true;
    renderer.sortObjects = false

		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.addEventListener( 'change', render );

		camera.position.x = 0;
		camera.position.y = 1;
		camera.position.z = 1.5;
		camera.lookAt(scene.position);


    hemi = new THREE.HemisphereLight( 0x000000, 0xffffff );
    scene.add(hemi);
    //scene.fog = new THREE.Fog( 0xffff90, .01, 500 );

		$("#webGL-container").append(renderer.domElement);
    console.log("#webGL-container")

    $(window).resize(function(){
        SCREEN_WIDTH = window.innerWidth;
        SCREEN_HEIGHT = window.innerHeight;
        camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        camera.updateProjectionMatrix();
        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    });
	}

  function render(){
    renderer.render(scene, camera);
  }

  function animate(){
		requestAnimationFrame(animate);
		render();
	}

  init();
  animate();
});
