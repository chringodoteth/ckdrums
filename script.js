const projects = document.querySelector(".projects");
const preview = document.querySelector(".preview");
const previewImg = document.querySelector(".preview-img");

let isInside = false;

// Detect if device supports touch
const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
};

// Check if screen size is below laptop (1024px)
const isMobileTablet = () => {
    return window.innerWidth <= 1024;
};

const bgPositions = {
    p1: "0 0",
    p2: "0 14.285%",
    p3: "0 28.571%",
    p4: "0 42.855%",
    p5: "0 57.14%",
    p6: "0 71.425%",
    p7: "0 85.71%",
    p8: "0 100%"
};

const moveStuff = (e) => {
    // Skip hover interactions on touch devices or mobile/tablet screens
    if (isTouchDevice() || isMobileTablet()) {
        return;
    }

    const mouseInside = isMouseInsideContainer(e);

    if (mouseInside !== isInside) {
        isInside = mouseInside;
        if (isInside) {
            gsap.to(preview, 0.0, {
                scale: 1,
            });
        } else {
            gsap.to(preview, 0.0, {
                scale: 0,
            });
        }
    }
};

const moveProject = (e) => {
    // Skip hover interactions on touch devices or mobile/tablet screens
    if (isTouchDevice() || isMobileTablet()) {
        return;
    }

    const { width, height } = preview.getBoundingClientRect();
    const x = e.clientX + window.scrollX; 
    const y = e.clientY + window.scrollY;

    preview.style.left = `${x - width / 2}px`;
    preview.style.top = `${y - height / 2}px`;
};

const moveProjectImg = (project) => {
    // Skip hover interactions on touch devices or mobile/tablet screens
    if (isTouchDevice() || isMobileTablet()) {
        return;
    }

    const projectId = project.id;
    gsap.to(previewImg, 0.0, {
        backgroundPosition: bgPositions[projectId] || "0 0",
    });
};

const isMouseInsideContainer = (e) => {
    const r = projects.getBoundingClientRect();
    return (
        e.clientX >= r.left && e.clientX <= r.right &&
        e.clientY >= r.top && e.clientY <= r.bottom
    );
};

// Only add event listeners if not on touch device or mobile/tablet
const initializeHoverEffects = () => {
    if (!isTouchDevice() && !isMobileTablet()) {
        window.addEventListener("mousemove", moveStuff);

        Array.from(projects.children).forEach((project) => {
            project.addEventListener("mousemove", moveProject);
            project.addEventListener("mousemove", moveProjectImg.bind(null, project));
        });
    }
};

// Initialize hover effects
initializeHoverEffects();

// Re-initialize on window resize to handle orientation changes
window.addEventListener('resize', () => {
    // Remove existing listeners
    window.removeEventListener("mousemove", moveStuff);
    
    Array.from(projects.children).forEach((project) => {
        project.removeEventListener("mousemove", moveProject);
        project.removeEventListener("mousemove", moveProjectImg.bind(null, project));
    });
    
    // Re-initialize based on current screen size
    initializeHoverEffects();
});