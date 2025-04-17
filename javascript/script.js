window.onload = function () {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "fixed";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.zIndex = 1;
    canvas.style.pointerEvents = "none";
    const particles = [];

    function createParticle() {
        const randomValue = Math.random();
        const hasGlow = Math.random() < 0.5;
        let particle = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 1,
            speed: Math.random() * 1 + 0.2,
            opacity: 1,
            drift: Math.random() * 0.5 - 0.25,
            rotation: Math.random() * 2 * Math.PI,
            type: randomValue,
            glow: hasGlow,
            glowOpacity: 0.8,
            glowDirection: 1
        };

        if (randomValue < 0.33) {
            particle.shape = "circle";
        } else if (randomValue < 0.66) {
            particle.shape = 'star';
        } else {
            particle.shape = "flaky";
        }
        particles.push(particle);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            if (particle.glow) {
                particle.glowOpacity += particle.glowDirection * 0.005;
                if (particle.glowOpacity >= 1 || particle.glowOpacity <= 0.3) {
                    particle.glowDirection *= -1;
                }
                ctx.shadowBlur = 10;
                ctx.shadowColor = "rgba(255, 215, 0, " + particle.glowOpacity + ')';
            } else {
                ctx.shadowBlur = 0;
                ctx.shadowColor = "transparent";
            }

            ctx.beginPath();
            if (particle.shape === "circle") {
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            } else {
                if (particle.shape === 'star') {
                    drawStar(particle.x, particle.y, particle.size, particle.size * 2, 5);
                } else if (particle.shape === "flaky") {
                    ctx.rect(particle.x - particle.size / 2, particle.y - particle.size / 2, particle.size, particle.size);
                }
            }
            ctx.fillStyle = "rgba(255, 255, 255, " + particle.opacity + ')';
            ctx.fill();

            particle.y += particle.speed;
            particle.x += particle.drift;
            if (particle.shape === 'star' || particle.shape === "flaky") {
                particle.rotation += 0.02;
            }

            if (particle.y > canvas.height) {
                particle.y = -particle.size;
                particle.x = Math.random() * canvas.width;
                particle.drift = Math.random() * 0.5 - 0.25;
                particle.rotation = Math.random() * 2 * Math.PI;
            }
        });
        requestAnimationFrame(animate);
    }

    function drawStar(x, y, innerRadius, outerRadius, points) {
        const angleStep = Math.PI / points;
        ctx.save();
        ctx.translate(x, y);
        ctx.moveTo(0, 0 - innerRadius);
        for (let i = 0; i < points; i++) {
            ctx.rotate(angleStep);
            ctx.lineTo(0, 0 - outerRadius);
            ctx.rotate(angleStep);
            ctx.lineTo(0, 0 - innerRadius);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    for (let i = 0; i < 40; i++) {
        createParticle();
    }
    animate();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};