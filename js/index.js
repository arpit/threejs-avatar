
var positions;
var currentIndex = 0;

var positionIndex = 0


// function addAvatarMarker(color, bone){
//   bone.object3d.localToWorld
// }

var markers = []

function clearMarkers(){
  while(markers.length > 0){
    let m = markers.pop()
    m.parent.remove(m)
  }
}

function addMarkerAt(color, vec, parent){
  addMarker(color, vec.x, vec.y, vec.z, parent)
}

function addMarker(color, x,y,z, parent){
  var geometry = new THREE.BoxGeometry( .01, .01, 1 );
  var material = new THREE.MeshBasicMaterial( { color: color } );
  var cube = new THREE.Mesh( geometry, material );
  if(!parent){
    parent = scene.getObjectByName("avatar")
  }
  parent.add( cube );

  cube.position.x = x;
  cube.position.y = y;
  cube.position.z = z;
  markers.push(cube)
}


function setPosition(arm, pv, markerColor){
  clearMarkers()
  var avatar = scene.getObjectByName("avatar")
  var g = avatar.localToWorld(new THREE.Vector3(pv.start.x, pv.start.y, pv.start.z))
  // //
  // // // var g = avatar.localToWorld(new THREE.Vector3(pv.end.x - pv.start.x,
  // // //                   pv.end.y - pv.start.y, pv.end.z-pv.start.y))
  // //
  // // //var v = new THREE.Vector3( pv.start.x, pv.start.y, pv.start.z )
  var local = arm.worldToLocal(new THREE.Vector3(g.x, g.y, g.z))
  // // console.log(arm.parent)
  // // //arm.parent = null;
  // // console.log(arm.parent)
  // // arm.matrixWorldNeedsUpdate = true
  //
  // arm.position.x = local.x
  // arm.position.y = local.y
  // arm.position.z = local.z

  setAbsPosition(arm, pv.start.x, pv.start.y,pv.start.z, markerColor)


  // //
  // arm.matrixWorldNeedsUpdate = true
  //var local = pv.start;

  // arm.position.x = pv.end.x - pv.start.x
  // arm.position.y = pv.end.y - pv.start.y
  // arm.position.z = pv.end.z - pv.start.z
  return local;

  // arm.position.x = pv.start.x
  // arm.position.y = pv.start.y
  // arm.position.z = pv.start.z

}

function setAbsPosition(arm, x,y,z, markerColor){
  arm.position.x = x
  arm.position.y = y
  arm.position.z = z

  if(markerColor){
    addMarkerAt(markerColor , new THREE.Vector3(x,y,z))
  }
}


function moveAvatarToCurrentPosition(){
  var p1 = setPosition(window.collarL, positions[positionIndex]["left_bone_0"])
  var p2 = setPosition(window.upperArmL, positions[positionIndex]["left_bone_1"])
  var p3 = setPosition(window.lowerArmL, positions[positionIndex]["left_bone_2"])
  var p4 = setPosition(window.handL, positions[positionIndex]["left_bone_3"], "green")

  var p1 = setPosition(window.collarR, positions[positionIndex]["right_bone_0"])
  var p2 = setPosition(window.upperArmR, positions[positionIndex]["right_bone_1"])
  var p3 = setPosition(window.lowerArmR, positions[positionIndex]["right_bone_2"])
  var p4 = setPosition(window.handR, positions[positionIndex]["right_bone_3"], "green")
}

function onNextClicked(){
  currentIndex++;
  showPositionsAtIndex(currentIndex)
  moveAvatarToCurrentPosition()
}

function showPositionsAtIndex(index){
  positionIndex = index;
  console.log("showing positions at "+index)

  var colors = [0xff0000, 0x00ff00, 0x0000ff, 0xff00ff, 0xff0000]


  var i = 0;
  for(var a in positions[index]){
    var geometry = new THREE.Geometry();
    geometry.vertices.push( positions[index][a].start);
    geometry.vertices.push( positions[index][a].end);
    console.log("segment start: ", positions[index][a].start)
    console.log("segment end: ", positions[index][a].end)
    console.log("Color: "+colors[i])
    var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: colors[i], linewidth:5,   opacity:  1 } ) );
    scene.add( line );
    i++;
  }




  // var texture = new THREE.Texture( generateTexture() );
	// texture.needsUpdate = true;
  //
  // var line = new THREE.Line( geometry, new THREE.MeshBasicMaterial( { map: texture, overdraw:  0.5} ) );

}

function generateTexture() {

	var size = 64;

	// create canvas
	canvas = document.createElement( 'canvas' );
	canvas.width = size;
	canvas.height = size;

	// get context
	var context = canvas.getContext( '2d' );

	// draw gradient
	context.rect( 0, 0, size, size );
	var gradient = context.createLinearGradient( 0, 0, size, size );
	gradient.addColorStop(0, '#ff0000'); // light blue
	gradient.addColorStop(1, '#0000ff'); // dark blue
	context.fillStyle = gradient;
	context.fill();

	return canvas;

}

var scene, camera, renderer;


$(function(){

  let SHOW_SPOTLIGHT = true;
  var spotLight

    /*global variables*/
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

    window.scene = scene

		renderer.setClearColor(0x333300);
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


    hemi = new THREE.HemisphereLight( 0xff0090, 0xff0011 );
    scene.add(hemi);
    scene.fog = new THREE.Fog( 0xffff90, .01, 500 );

    var plane = new THREE.Mesh( new THREE.PlaneGeometry( .4, .4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0x00ff00, opacity: 0.25 } ) );
    plane.visible = true;
    plane.rotateX(Math.PI/2)
    this.scene.add( plane );

    datGUI = new dat.GUI();


		/*datGUI controls object*/
		guiControls = new function(){
      configureRotation(datGUI, this)
      configureTranslation(datGUI, this)
      this.scene = function(){
          console.log("Scene", scene);
      };

		}

    if(SHOW_SPOTLIGHT){
      spotLight = getSpotlight(datGUI, guiControls)
      scene.add(spotLight)
    }
    loader = new THREE.ObjectLoader();

    loader.load( './exports/avatar_split_bones.json', (obj)=>{
      obj.name = "avatar"
      var helper = new THREE.SkeletonHelper( obj );
      helper.material.linewidth = 3;
      scene.add( helper );
      scene.add(obj)
      setTimeout(markupAvatar, 2000)
    });
    datGUI.add(guiControls, "scene");
		datGUI.close();


		$("#webGL-container").append(renderer.domElement);
		/*stats*/


    //addMarker(0,0,0)

    addMarker("red", 0,0,0, scene)

	}

  function createStats(){
    stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';
		$("#webGL-container").append( stats.domElement );
  }

  function markupAvatar(){
    scene.traverse(function(child){
      if (child instanceof THREE.SkinnedMesh){

        // if(! window.fixed){
        //   console.log("Fixing")
        //
        //   child.updateMatrix();
        //   child.updateMatrixWorld(true);
        //   let geo = child.geometry;
        //   let verts = geo.vertices;
        //   for (let i = 0; i < verts.length; i++)
        //   {
        //     verts[i].setX(verts[i].x * -1);
        //     verts[i].setY(verts[i].y * -1);
        //   }
        //   geo.verticesNeedUpdate = true;
        //
        // }

          //child.rotation.y += .01;
          if(!window.upperArmL || !window.lowerArmL){
            for(var i=0; i < child.skeleton.bones.length; i++){
              var bone = child.skeleton.bones[i];
              console.log("Bone name: "+bone.name)
              switch(bone.name){

                case("UpperArm.L"): window.upperArmL = bone; break;
                case("LowerArm.L"): window.lowerArmL = bone; break;
                case("Collar.L"): window.collarL = bone; break;
                case("Hand.L"): window.handL = bone; break;

                case("UpperArm.R"): window.upperArmR = bone; break;
                case("LowerArm.R"): window.lowerArmR = bone; break;
                case("Collar.R"): window.collarR = bone; break;
                case("Hand.R"): window.handR = bone; break;
              }
            }
            //now
            console.log("setting upperarm root")
            this.upperArmLRoot = window.upperArmL.position
            this.lowerArmLRoot = window.lowerArmL.position

            console.log("UpperArm", window.upperArmL)

            showMovements();

            //addMarker("green",this.upperArmLRoot.x, this.upperArmLRoot.y, this.upperArmLRoot.z)
            //addMarker("blue",this.lowerArmLRoot.x, this.lowerArmLRoot.y, this.lowerArmLRoot.z)

          }

        }
    })
  }


  var set = [];
  var helpset = [];

  function addModel( geometry,  materials ){

      for (var i = 0;i < 1; i++){
        materials[0].skinning = true;

        set[i]= new THREE.SkinnedMesh( geometry, new THREE.MeshFaceMaterial(materials) );
        set[i].position.set(-1,-1,-1);



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



            child.skeleton.bones[0].rotation.z = guiControls.rotation.Bone_0;
            child.skeleton.bones[1].rotation.z = guiControls.rotation.Bone_1;
            child.skeleton.bones[2].rotation.z = guiControls.rotation.Bone_2;
            child.skeleton.bones[3].rotation.z = guiControls.rotation.Bone_3;
            child.skeleton.bones[4].rotation.z = guiControls.rotation.Bone_4;
            child.skeleton.bones[5].rotation.z = guiControls.rotation.Bone_5;
            child.skeleton.bones[6].rotation.z = guiControls.rotation.Bone_6;

            //console.log("upperArm position",upperArmL.position)

        }
        else if  (child instanceof THREE.SkeletonHelper){
            //child.update();
        }

        if(!this.lowerArmL || !this.upperArmL) return;


        if(!window.oldGUIX || window.oldGUIX != guiControls.translation.upperarm_L_x ){

          console.log("Upperarm original x: "+this.upperArmLRoot.x)

          //setPosConverted()

          //
          // //let change =   this.upperArmLRoot.x  - guiControls.translation.upperarm_L_x
          // //this.upperArmL.position.x = change
          //
          // this.lowerArmL.position.x = guiControls.translation.lowerarm_L_x - this.lowerArmLRoot.x
          // this.lowerArmL.position.y = guiControls.translation.lowerarm_L_y - this.lowerArmLRoot.y
          // this.lowerArmL.position.z = guiControls.translation.lowerarm_L_z - this.lowerArmLRoot.z
          //
          window.oldGUIX = guiControls.translation.upperarm_L_x;
        }
    });
	}

  function setPosConverted(){
    var pos = new THREE.Vector3(guiControls.translation.upperarm_L_x,
                                guiControls.translation.upperarm_L_y,
                                guiControls.translation.upperarm_L_z)

    var local = window.upperArmL.worldToLocal(pos)
    upperArmL.position.x = local.x;
    upperArmL.position.y = local.y;
    upperArmL.position.z = local.z;


  }

  function setPositionAbs(){
    this.upperArmL.position.x = guiControls.translation.upperarm_L_x;
    this.upperArmL.position.y = guiControls.translation.upperarm_L_y;
    this.upperArmL.position.z = guiControls.translation.upperarm_L_z;
  }

	function animate(){
		requestAnimationFrame(animate);
		render();
    if(stats){
      stats.update();
    }

		renderer.render(scene, camera);
	}


  function showMovements(){
    loadMovement('../data/movement2.json',function(data){
      positions = data;
      currentIndex = 0
      showPositionsAtIndex(currentIndex)
      moveAvatarToCurrentPosition()
    });
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
