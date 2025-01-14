// Nav bar smooth scrolling and animation section
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

const navbar = document.querySelector('.navbar');
const aboutSection = document.querySelector('#about');

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY < aboutSection.offsetTop - 50) {
        navbar.classList.add('hidden');
    } else if (window.scrollY >= aboutSection.offsetTop - 50) {
        navbar.classList.remove('hidden');
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('hidden', 'scrolled');
    }
    lastScrollY = window.scrollY;
});

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    const highlightNavLink = () => {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", highlightNavLink);
});

// Progress bar animation section
document.addEventListener("DOMContentLoaded", () => {
    const skills = [
        { element: ".skill:nth-child(1)", percentage: 90 },
        { element: ".skill:nth-child(2)", percentage: 75 },
        { element: ".skill:nth-child(3)", percentage: 80 },
        { element: ".skill:nth-child(4)", percentage: 85 },
    ];

    const animateSkills = () => {
        skills.forEach(skill => {
            const circle = document.querySelector(`${skill.element} .progress-circle`);
            const percentageSpan = document.querySelector(`${skill.element} .percentage`);
            const radius = 45;
            const circumference = 2 * Math.PI * radius;
            const targetPercentage = skill.percentage;

            const offset = circumference - (targetPercentage / 100) * circumference;
            circle.style.strokeDashoffset = offset;

            let currentPercentage = 0;
            const interval = setInterval(() => {
                if (currentPercentage >= targetPercentage) {
                    clearInterval(interval);
                } else {
                    currentPercentage++;
                    percentageSpan.textContent = `${currentPercentage}%`;
                }
            }, 20);
        });
    };

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.disconnect();
                }
            });
        },
        { threshold: 0.5 }
    );

    const skillsSection = document.querySelector("#skills");
    observer.observe(skillsSection);
});

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const items = Array.from(document.querySelectorAll(".carousel-item"));
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
  
    const subtitleText = document.getElementById("carousel-subtitle-text");
  
    let currentIndex = 0;
    const totalItems = items.length;
  
    function updateCarousel() {
      // Normalize index for infinite loop
      currentIndex = (currentIndex + totalItems) % totalItems;
  
      items.forEach((item, index) => {
        // Remove old classes
        item.classList.remove("active", "left", "right", "far-left", "far-right");
  
        // Figure out how far this item is from the 'currentIndex'
        let offset = index - currentIndex;
        if (offset < 0) offset += totalItems;
  
        // Assign classes based on offset
        if (offset === 0) {
          item.classList.add("active");
        } else if (offset === 1) {
          item.classList.add("right");
        } else if (offset === totalItems - 1) {
          item.classList.add("left");
        } else if (offset === 2) {
          item.classList.add("far-right");
        } else if (offset === totalItems - 2) {
          item.classList.add("far-left");
        } else {
          // Everything else is hidden
          item.classList.add("far-left");
        }
      });
  
      updateSubtitle();
    }
  
    function updateSubtitle() {
      const activeItem = items[currentIndex];
      const captionText = activeItem.dataset.caption || "";
  
      // 1. Reset the animation by removing/re-adding the keyframe name
      subtitleText.style.animation = "none";
      subtitleText.offsetHeight; // force a reflow
      subtitleText.style.animation = null;
  
      // 2. Update the text
      subtitleText.textContent = captionText;
  
      // 3. Reapply the animation
      // Adjust the duration or easing to your preference
      subtitleText.style.animation = "slideInLeftToRight 0.5s ease forwards";
    }
  
    // Click events
    prevBtn.addEventListener("click", () => {
      currentIndex--;
      updateCarousel();
    });
  
    nextBtn.addEventListener("click", () => {
      currentIndex++;
      updateCarousel();
    });
  
    // Initialize carousel on page load
    updateCarousel();
  });  