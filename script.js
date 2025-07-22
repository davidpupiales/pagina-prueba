// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileNav = document.getElementById("mobileNav")
const menuIcon = document.getElementById("menuIcon")

mobileMenuBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("active")

  if (mobileNav.classList.contains("active")) {
    menuIcon.className = "fas fa-times"
  } else {
    menuIcon.className = "fas fa-bars"
  }
})

// Header Scroll Effect
const header = document.getElementById("header")

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

// Smooth Scrolling Function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })

    // Close mobile menu if open
    mobileNav.classList.remove("active")
    menuIcon.className = "fas fa-bars"
  }
}

// Navigation Links Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const targetId = this.getAttribute("href").substring(1)
    scrollToSection(targetId)
  })
})

// Mobile Navigation Links
document.querySelectorAll(".nav-link-mobile").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()
    const targetId = this.getAttribute("href").substring(1)
    scrollToSection(targetId)
  })
})

// Contact Form Handling
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const formObject = {}

  // Convert FormData to object
  for (const [key, value] of formData.entries()) {
    formObject[key] = value
  }

  // Show success message (you can replace this with actual form submission)
  showNotification("¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.", "success")

  // Reset form
  contactForm.reset()
})

// Notification System
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `

  // Add styles for notification
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : "#3b82f6"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `

  // Add to body
  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOutRight 0.3s ease-out"
      setTimeout(() => {
        notification.remove()
      }, 300)
    }
  }, 5000)
}

// Add notification animations to CSS
const notificationStyles = document.createElement("style")
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        margin-left: auto;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`
document.head.appendChild(notificationStyles)

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.8s ease-out forwards"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".service-card, .testimonial-card, .stat-item, .feature")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    observer.observe(el)
  })
})

// Counter Animation for Stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.textContent.replace(/\D/g, ""))
    const suffix = counter.textContent.replace(/\d/g, "")
    let current = 0
    const increment = target / 100
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        counter.textContent = target + suffix
        clearInterval(timer)
      } else {
        counter.textContent = Math.floor(current) + suffix
      }
    }, 20)
  })
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector(".stats")
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters()
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

if (statsSection) {
  statsObserver.observe(statsSection)
}

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroShapes = document.querySelectorAll(".shape")

  heroShapes.forEach((shape, index) => {
    const speed = 0.5 + index * 0.1
    shape.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Service Cards Hover Effect
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Social Media Links Analytics (Optional)
document.querySelectorAll(".social-link").forEach((link) => {
  link.addEventListener("click", function () {
    const platform = this.classList.contains("facebook")
      ? "Facebook"
      : this.classList.contains("instagram")
        ? "Instagram"
        : "WhatsApp"

    // You can add analytics tracking here
    console.log(`User clicked on ${platform} link`)
  })
})

// Lazy Loading for Images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}

// Smooth reveal animation for sections
const revealSections = document.querySelectorAll("section")
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed")
      }
    })
  },
  { threshold: 0.15 },
)

revealSections.forEach((section) => {
  revealObserver.observe(section)
})

// Add revealed class styles
const revealStyles = document.createElement("style")
revealStyles.textContent = `
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.8s ease-out;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero {
        opacity: 1;
        transform: none;
    }
`
document.head.appendChild(revealStyles)

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  // Add initial revealed class to hero
  document.querySelector(".hero").classList.add("revealed")

  // Preload critical images
  const criticalImages = ["/placeholder.svg?height=500&width=600"]

  criticalImages.forEach((src) => {
    const img = new Image()
    img.src = src
  })
})
