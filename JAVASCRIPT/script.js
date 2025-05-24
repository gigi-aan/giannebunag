// Smooth scrolling for navigation
document.addEventListener("DOMContentLoaded", () => {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');
  const mainContent = document.querySelector('.main-content');
  const header = document.querySelector('.header');

  if (sidebarToggle && sidebar && mainContent && header) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('minimized');
      mainContent.classList.toggle('sidebar-minimized');
      header.classList.toggle('sidebar-minimized');

      // Adjust header position based on sidebar state
      if (sidebar.classList.contains('minimized')) {
        header.style.left = '90px';
        header.style.width = 'calc(100% - 110px)';
      } else {
        header.style.left = '220px';
        header.style.width = 'auto'; 
      }
    });
  }

  // Navigation menu functionality
  const navItems = document.querySelectorAll(".nav-menu li")

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      navItems.forEach((nav) => nav.classList.remove("active"))

      // Add active class to clicked item
      this.classList.add("active")

      // Get the text content (without the icon)
      const section = this.textContent.trim().toLowerCase()

      // Scroll to the corresponding section
      scrollToSection(section)
    })
  })

  // Select all elements that you want to animate on scroll
  const animatedElements = document.querySelectorAll(
    ".skill-item, .project-card, .education-card, .about-content "
  );

  // Options for the Intersection Observer
  const observerOptions = {
    root: null, 
    rootMargin: "0px", 
    threshold: 0.2,
  };

  // Create a new Intersection Observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // If the element is intersecting (in the viewport)
      if (entry.isIntersecting) {
        entry.target.classList.add("visible"); // Add the 'visible' class
        observer.unobserve(entry.target); // Stop observing once it's visible
      }
    });
  }, observerOptions);

  // Loop over each element and start observing it
  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  // Academic Projects button
  const academicProjectsBtn = document.querySelector(".hero .btn")
  if (academicProjectsBtn) {
    academicProjectsBtn.addEventListener("click", (e) => {
      e.preventDefault()
      const projectsSection = document.getElementById("academic-projects")
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    })
  }

  // Download Resume button functionality
  const downloadResumeBtn = document.querySelector(".about-content .btn")
  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener("click", (e) => {
      e.preventDefault()

      const resumeUrl = '../Documents/GianneBunag_CV.pdf'
      
      const link = document.createElement('a')
      link.href = resumeUrl
      link.download = 'GianneBunag_CV.pdf'
      
      // Append to body, click, and remove
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      showNotification('Resume download started!')
    })
  }

  // copy to clipboard functionality
  const contactItems = document.querySelectorAll(".contact-item")

  const contactInfo = {
    email: "gianne.bunag@email.com",
    phone: "+63 968 374 3688",
    github: "https://github.com/gigi-aan",
    linkedin: "https://www.linkedin.com/in/gianne-alexa-bunag/"
  }

  contactItems.forEach((item) => {
    item.addEventListener("click", function() {
      const iconClass = this.querySelector('i').className
      let textToCopy = ""
      let contactType = ""

      // Determine which contact type based on icon
      if (iconClass.includes('envelope')) {
        textToCopy = contactInfo.email
        contactType = "Email"
      } else if (iconClass.includes('telephone')) {
        textToCopy = contactInfo.phone
        contactType = "Phone"
      } else if (iconClass.includes('github')) {
        textToCopy = contactInfo.github
        contactType = "GitHub"
      } else if (iconClass.includes('linkedin')) {
        textToCopy = contactInfo.linkedin
        contactType = "LinkedIn"
      }

      // Copy to clipboard
      if (textToCopy) {
        copyToClipboard(textToCopy, contactType)
      }
    })
  })

  // Back to top button
  const backToTopBtn = document.querySelector(".back-to-top")
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Show/hide back to top button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = "flex"
    } else {
      backToTopBtn.style.display = "none"
    }
  })

  // Initialize - hide back to top button initially
  backToTopBtn.style.display = "none"

  // Marquee effect alternative 
  const marqueeContent = document.querySelector(".marquee-content")
  if (marqueeContent) {
    const originalText = marqueeContent.textContent
    marqueeContent.textContent = originalText + " " + originalText
  }

  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId && targetId !== "#") {
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }
    })
  })
})

// Function to scroll to a specific section
function scrollToSection(sectionName) {
  let targetSection

  switch (sectionName) {
    case "home":
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      return
    case "about":
      targetSection = document.getElementById("about")
      break
    case "projects":
      targetSection = document.getElementById("academic-projects")
      break
    case "education":
      targetSection = document.getElementById("education")
      break
    default:
      return
  }

  if (targetSection) {
    targetSection.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

// Function to copy text to clipboard
async function copyToClipboard(text, type) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // Use modern clipboard API
      await navigator.clipboard.writeText(text)
      showNotification(`${type} copied to clipboard!`)
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      try {
        document.execCommand('copy')
        showNotification(`${type} copied to clipboard!`)
      } catch (err) {
        console.error('Failed to copy text: ', err)
        showNotification('Failed to copy to clipboard')
      } finally {
        document.body.removeChild(textArea)
      }
    }
  } catch (err) {
    console.error('Failed to copy text: ', err)
    showNotification('Failed to copy to clipboard')
  }
}

// Function to show notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div')
  notification.textContent = message
  notification.style.position = 'fixed'
  notification.style.bottom = '20px'
  notification.style.left = '20px'
  notification.style.backgroundColor = '#E6C1C0'
  notification.style.color = '#021526'
  notification.style.padding = '12px 20px'
  notification.style.borderRadius = '8px'
  notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)'
  notification.style.zIndex = '9999'
  notification.style.fontFamily = '"Poppins", sans-serif'
  notification.style.fontWeight = '500'
  notification.style.transition = 'all 0.3s ease'
  
  // Add to page
  document.body.appendChild(notification)
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0'
    notification.style.transform = 'translateY(-20px)'
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

// Helper function to find elements containing text
Document.prototype.querySelector.contains = function (text) {
  const elements = Array.from(this.querySelectorAll("*"))
  return elements.find((element) => element.textContent.includes(text))
}