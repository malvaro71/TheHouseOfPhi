export class VectorConverterLogic {
    constructor(container) {
        this.xInput = container.querySelector('.x-input');
        this.yInput = container.querySelector('.y-input');
        this.magOut = container.querySelector('.mag-output');
        this.dirOut = container.querySelector('.dir-output');
        this.vectorLine = container.querySelector('.vector-line');

        this.update = this.update.bind(this);

        this.xInput.addEventListener('input', this.update);
        this.yInput.addEventListener('input', this.update);

        // Initial calculation
        this.update();
    }

    update() {
        const vx = parseFloat(this.xInput.value) || 0;
        const vy = parseFloat(this.yInput.value) || 0;

        // Center of SVG is (150, 150)
        // SVG Y axis is down, Cartesian Y is up.
        const centerX = 150;
        const centerY = 150;
        const targetX = centerX + vx;
        const targetY = centerY - vy;

        // Update SVG line
        this.vectorLine.setAttribute('x2', targetX.toString());
        this.vectorLine.setAttribute('y2', targetY.toString());

        // Calculate Magnitude and Angle
        const magnitude = Math.sqrt(vx * vx + vy * vy);
        const angleRad = Math.atan2(vy, vx);
        const angleDeg = angleRad * (180 / Math.PI);
        
        if (this.magOut) this.magOut.textContent = magnitude.toFixed(2);
        if (this.dirOut) this.dirOut.textContent = angleDeg.toFixed(2);
    }
}
