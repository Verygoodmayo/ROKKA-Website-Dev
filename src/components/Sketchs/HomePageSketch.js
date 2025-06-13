import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'

import model from '../../../static/glb/Park_Model_Opt_3.glb?url'

import vertex from '../../../static/glsl/home_page/vertex.glsl'
import fragment from '../../../static/glsl/home_page/fragment.glsl'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all';

let COUNT = 256/8

export default class homePageSketch {
    constructor (parent) {

        // Set Up
        
        this.container = parent
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.time = 0;
        this.timeout = false;
        this.delta = Math.PI * 100;
        this.isMobile = false

        // Scene Set Up
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.width / this.height,
            0.001,
            1000
        );

        // Renderer
        this.renderer = new THREE.WebGLRenderer(
            {
                antialias: true,
                preserveDrawingBuffer: true
            }
        );
        this.renderer.setSize(this.width, this.height);
        this.container.appendChild(this.renderer.domElement);
        this.renderer.setClearAlpha(0);

        // Camera Set Up
        this.camera.position.z = 2

        // Controls
        // this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        // Loader
        this.loader = new GLTFLoader();
        this.dracoLoader = new DRACOLoader();
        this.dracoLoader.setDecoderConfig({ type: 'js' });
        this.dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        this.loader.setDRACOLoader(this.dracoLoader);

        // Init
        this.loadModel()
    }

    async loadModel() {
            this.loader = new GLTFLoader();
            this.glb = await this.loader.loadAsync(model)
            this.model_position = this.getPositionArray(this.glb)
            
            this.model_data = await this.model_position.array
            this.initScene()
    }
    getPositionArray(glb) {
        return glb.scene.children[0].geometry.attributes.position
    }

    initScene() {
        this.handleResize()
        this.addObjects()
        this.checkMobile()
        this.scrollHandle()
        this.trackMouse()
        // this.handleAudio()
        this.render()
    }

    addObjects() {  
       
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                u_time: { type: "f", value: 1.0 },
                u_resolution: { type: "v2", value: new THREE.Vector2() },
                u_mouse: { type: "v2", value: new THREE.Vector2() },
                frequency: { type: 'f', value: 0.009 },
                amplitude: { type: 'f', value: 5.0 },
                maxDistance: { type: 'f', value: 6.85},
                isMobile: {type: 'bool', value: true}
            },
            side: THREE.DoubleSide,
            vertexShader: vertex,
            fragmentShader: fragment
        })

        // Set Up Geometry
        
        this.geometry = new THREE.BufferGeometry()
        let count = this.model_position.count;
        let positions = new Float32Array(count * 3);
        let reference = new Float32Array(count * 2);

        // Fill Positions

        for (let i = 0; i < count; i++) {

            let x  = this.model_data[i * 3 + 0] / 100
            let y  = this.model_data[i * 3 + 1] / 100
            let z  = this.model_data[i * 3 + 2] / 100

            positions[i * 3 + 0] = x
            positions[i * 3 + 1] = y
            positions[i * 3 + 2] = z

            reference[i * 2 + 0] = (i % count)/count
            reference[i * 2 + 1] = ~ ~ ( i / count ) / count;
        }

        this.geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3)
        );
         this.geometry.setAttribute(
            'reference',
            new THREE.BufferAttribute(reference, 2)
        );

        // Mesh

        this.model = new THREE.Points(this.geometry, this.material);
       
        // Transform

        this.model.position.x = -100;
        this.model.position.y = -20;
        this.model.position.z = -100;

        this.model.rotateY(Math.PI/3)
       
        // Add

        this.scene.add(this.model)
    }

    render() {
        if (this.paused) return;
        this.time += 0.01;

        // this.controls.update()

        this.material.uniforms.u_time.value = this.time
        // console.log( this.material.uniforms)
        // this.model.geometry.attributes.position.needsUpdate = true

        requestAnimationFrame(this.render.bind(this))
        this.renderer.render(this.scene, this.camera);
    }

    handleResize() {
        window.addEventListener('resize', () => {
            // console.log('resizing')
            this.stop()
            this.rtime = new Date();
            if (this.timeout === false) {
                this.timeout = true;
                setTimeout(this.resizeEnd(), this.delta);
            }
        });
    }

    resizeEnd() {
        if (new Date() - this.rtime < this.delta) {
            setTimeout(this.resizeEnd.bind(this), this.delta);
        } else {
            this.timeout = false;
            console.log('done resizing')

            this.width = window.innerWidth;

            this.checkMobile()
            
            
            this.height = window.innerHeight;
            this.renderer.setSize(this.width, this.height);
            this.camera.aspect = this.width / this.height;

            this.camera.updateProjectionMatrix();

            this.play()

            console.log('done resizing', this.isMobile)
        }               
    }

    checkMobile() {
    // Check For Mobile
        this.width < 600 ? this.isMobile = true 
                         : this.isMobile = false;
        this.material.uniforms.isMobile.value = this.isMobile
    }

    scrollHandle() {

        gsap.registerPlugin(ScrollTrigger)

        let zoomIn_animation = gsap.timeline({paused:true})
        // Amp
        zoomIn_animation.from(this.material.uniforms.amplitude, {
            value: 10,
            duration: 2.25
        })
        // Max D
        zoomIn_animation.from(this.material.uniforms.maxDistance, {
            value: 1,
            duration: 2.25
        }, '<')
        // F
        zoomIn_animation.from(this.material.uniforms.frequency, {
            value: 0.02,
            duration: 2.25
        }, '<')


        zoomIn_animation.to(this.camera.position, {
            z: -180,
            duration: 10
        }, '<')


        zoomIn_animation.to(this.material.uniforms.amplitude, {
            value: 10,
            duration: 2
        }, '>-=5.5')
        zoomIn_animation.to(this.material.uniforms.maxDistance, {
            value: 1.25,
            duration: 2
        }, '<')

        ScrollTrigger.create({
            trigger:'#hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
            markers: false,
            // pin: this.renderer.domElement,
            animation: zoomIn_animation
        })

        
    }

    trackMouse() {
        document.addEventListener('mousemove', (e) => {
            this.material.uniforms.u_mouse.value.x = e.pageX / window.innerWidth;
            this.material.uniforms.u_mouse.value.y = e.pageY / window.innerHeight;
          })

          
    }

    stop() {
        this.paused = true;
    }

    play() {
        this.paused = false;
        this.render();
    }      
}