// js/scripts.js
document.addEventListener('DOMContentLoaded', () => {
    // Confetti animation
    const canvas = document.getElementById('confetti');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        const confetti = [];
        const colors = ['#ff69b4', '#ffafbd', '#ffc3a0', '#ff9a9e'];

        class ConfettiParticle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height - canvas.height;
                this.size = Math.random() * 5 + 5;
                this.speed = Math.random() * 3 + 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.angle = Math.random() * 360;
            }
            update() {
                this.y += this.speed;
                this.x += Math.sin(this.angle) * 0.5;
                if (this.y > canvas.height) {
                    this.y = -this.size;
                    this.x = Math.random() * canvas.width;
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        for (let i = 0; i < 100; i++) {
            confetti.push(new ConfettiParticle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            confetti.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }
});

function playAudio(src) {
    const audio = document.querySelector('audio'); // Assuming one audio per page; adjust if needed
    audio.src = src;
    audio.play();
}


// Hover audio control (one audio element reused)
const hoverAudio = document.getElementById('hover-audio');

function playHoverAudio(src) {
    if (hoverAudio) {
        hoverAudio.src = src;
        hoverAudio.currentTime = 0; // Restart from beginning
        hoverAudio.play().catch(e => console.log("Audio play failed:", e));
    }
}

function stopHoverAudio() {
    if (hoverAudio) {
        hoverAudio.pause();
        hoverAudio.currentTime = 0; // Optional: reset
    }
}