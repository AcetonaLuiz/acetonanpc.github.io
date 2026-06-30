console.log("Acetona carregado.");

// ===== PARALLAX DE FRAGMENTOS - estilo fosfofilita =====
(function () {
    const field = document.createElement("div");
    field.id = "gem-field";
    document.body.prepend(field);

    const colors = [
        "#1d9e75",
        "#5dcaa5",
        "#0f6e56",
        "#9fe1cb",
        "#085041",
        "#2c3e50",
        "#3c4f63"
    ];

    const shardCount = 28;
    const shards = [];

    function randomClipPath() {
        const sides = 5 + Math.floor(Math.random() * 3);
        let points = [];
        for (let i = 0; i < sides; i++) {
            const angle = (Math.PI * 2 * i) / sides + (Math.random() * 0.4 - 0.2);
            const radius = 50 * (0.6 + Math.random() * 0.4);
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;
            points.push(`${x}% ${y}%`);
        }
        return `polygon(${points.join(", ")})`;
    }

    for (let i = 0; i < shardCount; i++) {
        const shard = document.createElement("div");
        shard.className = "shard";

        const size = 60 + Math.random() * 180;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const depth = 0.2 + Math.random() * 0.8; // controla intensidade do parallax

        shard.style.width = size + "px";
        shard.style.height = size + "px";
        shard.style.top = top + "%";
        shard.style.left = left + "%";
        shard.style.background = color;
        shard.style.clipPath = randomClipPath();
        shard.style.opacity = (0.08 + Math.random() * 0.18).toFixed(2);

        field.appendChild(shard);
        shards.push({ el: shard, depth: depth });
    }

    let ticking = false;

    function updateParallax() {
        const scrollY = window.scrollY;
        shards.forEach((s) => {
            const offset = scrollY * s.depth * 0.15;
            s.el.style.transform = `translateY(${offset}px)`;
        });
        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
})();