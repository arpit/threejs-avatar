$(function(){

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
		camera =  new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .1, 500);
		renderer = new THREE.WebGLRenderer({antialias:true});

		renderer.setClearColor(0x333300);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMap.enabled= true;
		renderer.shadowMapSoft = true;

		/*add controls*/


		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.addEventListener( 'change', render );

		camera.position.x = 50;
		camera.position.y = 50;
		camera.position.z = 50;
		camera.lookAt(scene.position);



		/*datGUI controls object*/
		guiControls = new function(){
            this.Bone_0 = 0.0;
            this.Bone_1 = 0.0;
            this.Bone_2 = 0.0;
            this.Bone_3 = 0.0;
            this.Bone_4 = 0.0;
            this.Bone_5 = 0.0;
            this.Bone_6 = 0.0;

			this.rotationX  = 0.0;
			this.rotationY  = 0.0;
			this.rotationZ  = 0.0;

			this.lightX = 131;
			this.lightY = 107;
			this.lightZ = 180;
			this.intensity = 1.5;
			this.distance = 373;
			this.angle = 1.6;
			this.exponent = 38;
			this.shadowCameraNear = 34;
			this.shadowCameraFar = 2635;
			this.shadowCameraFov = 68;
			this.shadowCameraVisible=false;
			this.shadowMapWidth=512;
			this.shadowMapHeight=512;
			this.shadowBias=0.00;
			this.shadowDarkness=0.11;

      this.scene = function(){
          console.log("Scene", scene);
      };

		}

        //add some nice lighting
        hemi = new THREE.HemisphereLight( 0xff0090, 0xff0011 );
        scene.add(hemi);
        //add some fog
        scene.fog = new THREE.Fog( 0xffff90, .01, 500 );

		/*adds spot light with starting parameters*/
		// spotLight = new THREE.SpotLight(0xffffff);
		// spotLight.castShadow = true;
		// spotLight.position.set (20, 35, 40);
		// spotLight.intensity = guiControls.intensity;
		// spotLight.distance = guiControls.distance;
		// spotLight.angle = guiControls.angle;
		// spotLight.exponent = guiControls.exponent;
		// spotLight.shadowCameraNear = guiControls.shadowCameraNear;
		// spotLight.shadowCameraFar = guiControls.shadowCameraFar;
		// spotLight.shadowCameraFov = guiControls.shadowCameraFov;
		// spotLight.shadowCameraVisible = guiControls.shadowCameraVisible;
		// spotLight.shadowBias = guiControls.shadowBias;
		// spotLight.shadowDarkness = guiControls.shadowDarkness;
		//scene.add(spotLight);

        /*add loader call add model function*/
        loader = new THREE.JSONLoader();
        loader.load( './avatar5.json', addModel );


		/*adds controls to scene*/
		datGUI = new dat.GUI();

        /*edit bones*/
        datGUI.add(guiControls, "scene");
        var cfolder = datGUI.addFolder('Controls');

		cfolder.add(guiControls, 'Bone_0',-3.14, 3.14);
		cfolder.add(guiControls, 'Bone_1',-3.14, 3.14);
		cfolder.add(guiControls, 'Bone_2',-3.14, 3.14);
		cfolder.add(guiControls, 'Bone_3',-3.14, 3.14);
    cfolder.add(guiControls, 'Bone_4',-3.14, 3.14);
    cfolder.add(guiControls, 'Bone_5',-3.14, 3.14);
    cfolder.add(guiControls, 'Bone_6',-3.14, 3.14);



		var lfolder = datGUI.addFolder('Lights');
		lfolder.add(guiControls, 'lightX',-60,400);
		lfolder.add(guiControls, 'lightY',0,400);
		lfolder.add(guiControls, 'lightZ',-60,400);
    /*
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
    */
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
    var scaleVal = 3;
    function addModel( geometry,  materials ){
        for (var i = 0;i < 1; i++){
            materials[0].skinning = true;

            var cs = 1.5 //scaleVal * Math.random();

            set[i]= new THREE.SkinnedMesh( geometry, new THREE.MeshFaceMaterial(materials) );
            set[i].position.set(1,1,1);

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
		// spotLight.position.x = guiControls.lightX;
		// spotLight.position.y = guiControls.lightY;
		// spotLight.position.z = guiControls.lightZ;

        scene.traverse(function(child){
            if (child instanceof THREE.SkinnedMesh){

                child.rotation.y += .01;

                child.skeleton.bones[0].rotation.z = guiControls.Bone_0;
                child.skeleton.bones[1].rotation.z = guiControls.Bone_1;
                child.skeleton.bones[2].rotation.z = guiControls.Bone_2;
                child.skeleton.bones[3].rotation.z = guiControls.Bone_3;
                child.skeleton.bones[4].rotation.z = guiControls.Bone_4;
                child.skeleton.bones[5].rotation.z = guiControls.Bone_5;
                child.skeleton.bones[6].rotation.z = guiControls.Bone_6;
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
