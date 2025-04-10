// Mobile menu toggle
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.remove('translate-x-full');
    });
    
    menuClose.addEventListener('click', function() {
        mobileMenu.classList.add('translate-x-full');
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('translate-x-full');
        });
    });
}

// Course details toggle
function setupCourseDetailsToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-details');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const details = this.closest('.p-6').querySelector('.course-details');
            details.classList.toggle('active');
            
            if (details.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-chevron-up"></i> Ocultar detalles';
            } else {
                this.innerHTML = '<i class="fas fa-chevron-down"></i> Ver detalles';
            }
        });
    });
}

// Filter functionality
function setupCourseFilters() {
    const filterTags = document.querySelectorAll('.filter-tag');
    const courses = document.querySelectorAll('.course-card');
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Remove active class from all tags
            filterTags.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tag
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show/hide courses based on filter
            courses.forEach(course => {
                if (filter === 'all' || course.getAttribute('data-category') === filter) {
                    course.style.display = 'block';
                } else {
                    course.style.display = 'none';
                }
            });
        });
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const courses = document.querySelectorAll('.course-card');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        courses.forEach(course => {
            const courseTitle = course.querySelector('h3').textContent.toLowerCase();
            const courseDesc = course.querySelector('p').textContent.toLowerCase();
            
            if (courseTitle.includes(searchTerm) || courseDesc.includes(searchTerm)) {
                course.style.display = 'block';
            } else {
                course.style.display = 'none';
            }
        });
    });
}

// Sort functionality
function setupSorting() {
    const sortSelect = document.getElementById('sort-select');
    
    sortSelect.addEventListener('change', function() {
        const sortBy = this.value;
        
        const fabricacionCourses = Array.from(document.getElementById('fabricacion-cursos').children);
        const transformacionCourses = Array.from(document.getElementById('transformacion-cursos').children);
        const solarpunkCourses = Array.from(document.getElementById('solarpunk-cursos').children);
        
        sortCourses(fabricacionCourses, sortBy);
        sortCourses(transformacionCourses, sortBy);
        sortCourses(solarpunkCourses, sortBy);
    });
}

// Helper function for sorting courses
function sortCourses(courses, sortBy) {
    const coursesContainer = courses[0].parentNode;
    
    courses.sort((a, b) => {
        if (sortBy === 'number') {
            const numA = parseInt(a.querySelector('h3').textContent.split('.')[0]);
            const numB = parseInt(b.querySelector('h3').textContent.split('.')[0]);
            return numA - numB;
        } else if (sortBy === 'name') {
            const nameA = a.querySelector('h3').textContent.toLowerCase();
            const nameB = b.querySelector('h3').textContent.toLowerCase();
            return nameA.localeCompare(nameB);
        } else if (sortBy === 'duration') {
            const durationA = parseInt(a.querySelector('span.bg-blue-100').textContent);
            const durationB = parseInt(b.querySelector('span.bg-blue-100').textContent);
            return durationB - durationA;
        }
        return 0;
    });
    
    courses.forEach(course => {
        coursesContainer.appendChild(course);
    });
}

// Scroll to top button
function setupScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
    setupCourseDetailsToggle();
    setupCourseFilters();
    setupSearch();
    setupSorting();
    setupScrollToTop();
    setupSmoothScrolling();
});
