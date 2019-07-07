import React, { Component } from 'react';
import * as THREE from 'three';
import fontJson from '../fonts/font.json'

class ThreeText extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(
            90,
            width / height,
            0.1,
            1000
        )

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.setClearColor('#761CEA', 0)
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)

        var loader = new THREE.FontLoader();
        var font = loader.parse(fontJson);

        var materialFront = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
        var materialSide = new THREE.MeshBasicMaterial({ color: 0x000000 });
        var materialArray = [materialFront, materialSide];

        var textGeometry = new THREE.TextGeometry(this.props.children, {
            font: font,
            size: 1,
            height: .40,
            curveSegments: 3,
            bevelThickness: 0,
            bevelSize: .04,
            bevelEnabled: true,
            material: 0,
        });

        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        textGeometry.center();
        this.textMesh = new THREE.Mesh(textGeometry, textMaterial);

        textGeometry.computeBoundingBox();
        textGeometry.computeVertexNormals();

        this.scene.add(this.textMesh);

        this.camera.position.z = 5;

        var light = new THREE.AmbientLight(0xffffff);
        this.scene.add(light);

        let _this = this;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.windowHalfX = this.mount.clientWidth / 2;
        this.windowHalfY = this.mount.clientHeight / 2;
        document.addEventListener('mousemove', _this.onDocumentMouseMove, false);
        this.start()
    }

    componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    onDocumentMouseMove = (e) => {
        this.mouseX = (e.clientX - this.windowHalfX);
        this.mouseY = (e.clientY - this.windowHalfY);
    }

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop = () => {
        cancelAnimationFrame(this.frameId)
    }

    animate = () => {
        this.targetX = this.mouseX * .0001;
        this.targetY = this.mouseY * .0011;
        this.textMesh.rotation.y += 0.05 * (this.targetX - this.textMesh.rotation.y);
        this.textMesh.rotation.x += 0.05 * (this.targetY - this.textMesh.rotation.x);
        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }

    render() {
        return (
            <div
                style={{ width: this.props.width, height: this.props.height }}
                ref={(mount) => { this.mount = mount }}
            />
        );
    }
}

export default ThreeText