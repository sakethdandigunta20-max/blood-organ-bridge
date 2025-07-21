// Global variables
let currentTab = 'donor';
let donors = [];
let recipients = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize tab switching for registration forms
    initializeTabSwitching();
    
    // Initialize form submissions
    initializeForms();
    
    // Initialize dashboard functionality
    initializeDashboard();
    
    // Load sample data
    loadSampleData();
    
    // Initialize filters
    initializeFilters();
}

// Tab switching functionality
function initializeTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const forms = document.querySelectorAll('.registration-form');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    currentTab = tabName;
    
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update forms
    document.querySelectorAll('.registration-form').forEach(form => {
        form.classList.remove('active');
    });
    document.getElementById(`${tabName}-form`).classList.add('active');
}

// Form initialization and submission
function initializeForms() {
    // Donor form submission
    const donorForm = document.getElementById('donor-form');
    if (donorForm) {
        donorForm.addEventListener('submit', handleDonorSubmission);
    }
    
    // Recipient form submission
    const recipientForm = document.getElementById('recipient-form');
    if (recipientForm) {
        recipientForm.addEventListener('submit', handleRecipientSubmission);
    }
}

function handleDonorSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const donorData = {
        id: Date.now(),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        bloodType: formData.get('bloodType'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        donationType: formData.getAll('donationType'),
        registrationDate: new Date().toISOString(),
        status: 'available'
    };
    
    // Validate form
    if (!validateDonorData(donorData)) {
        return;
    }
    
    // Save donor data
    saveDonorData(donorData);
    
    // Show success message
    showSuccessMessage('Donor registration successful! You will be notified when matches are found.');
    
    // Reset form
    e.target.reset();
    
    // Redirect to dashboard after delay
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 2000);
}

function handleRecipientSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const recipientData = {
        id: Date.now(),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        bloodType: formData.get('bloodType'),
        hospital: formData.get('hospital'),
        urgency: formData.get('urgency'),
        amountNeeded: formData.get('amountNeeded'),
        condition: formData.get('condition'),
        registrationDate: new Date().toISOString(),
        status: 'active'
    };
    
    // Validate form
    if (!validateRecipientData(recipientData)) {
        return;
    }
    
    // Save recipient data
    saveRecipientData(recipientData);
    
    // Show success message
    showSuccessMessage('Recipient registration successful! We will search for compatible donors immediately.');
    
    // Reset form
    e.target.reset();
    
    // Redirect to dashboard after delay
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 2000);
}

// Data validation
function validateDonorData(data) {
    if (!data.name || !data.email || !data.phone || !data.bloodType || !data.address || !data.city || !data.state) {
        showErrorMessage('Please fill in all required fields.');
        return false;
    }
    
    if (!validateEmail(data.email)) {
        showErrorMessage('Please enter a valid email address.');
        return false;
    }
    
    if (!validatePhone(data.phone)) {
        showErrorMessage('Please enter a valid phone number.');
        return false;
    }
    
    return true;
}

function validateRecipientData(data) {
    if (!data.name || !data.email || !data.phone || !data.bloodType || !data.hospital || !data.urgency) {
        showErrorMessage('Please fill in all required fields.');
        return false;
    }
    
    if (!validateEmail(data.email)) {
        showErrorMessage('Please enter a valid email address.');
        return false;
    }
    
    if (!validatePhone(data.phone)) {
        showErrorMessage('Please enter a valid phone number.');
        return false;
    }
    
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Data storage (localStorage)
function saveDonorData(data) {
    let donors = JSON.parse(localStorage.getItem('donors')) || [];
    donors.push(data);
    localStorage.setItem('donors', JSON.stringify(donors));
}

function saveRecipientData(data) {
    let recipients = JSON.parse(localStorage.getItem('recipients')) || [];
    recipients.push(data);
    localStorage.setItem('recipients', JSON.stringify(recipients));
}

function loadDonors() {
    return JSON.parse(localStorage.getItem('donors')) || [];
}

function loadRecipients() {
    return JSON.parse(localStorage.getItem('recipients')) || [];
}

// Dashboard functionality
function initializeDashboard() {
    if (window.location.pathname.includes('dashboard.html')) {
        loadDashboardData();
        updateDashboardStats();
    }
}

function loadDashboardData() {
    donors = loadDonors();
    recipients = loadRecipients();
    
    renderRecipientsTable();
    renderDonorsTable();
}

function renderRecipientsTable() {
    const tableBody = document.querySelector('#recipients-table tbody');
    if (!tableBody) return;
    
    const sampleRecipients = [
        {
            name: 'John Smith',
            bloodType: 'O-',
            hospital: 'City General Hospital',
            urgency: 'critical',
            location: 'New York, NY'
        },
        {
            name: 'Sarah Johnson',
            bloodType: 'A+',
            hospital: "St. Mary's Medical Center",
            urgency: 'high',
            location: 'Los Angeles, CA'
        },
        {
            name: 'Michael Brown',
            bloodType: 'B-',
            hospital: 'Metro Health Center',
            urgency: 'medium',
            location: 'Chicago, IL'
        }
    ];
    
    // Combine sample data with stored data
    const allRecipients = [...sampleRecipients, ...recipients];
    
    tableBody.innerHTML = allRecipients.map(recipient => `
        <tr>
            <td>${recipient.name}</td>
            <td><span class="blood-type">${recipient.bloodType}</span></td>
            <td>${recipient.hospital}</td>
            <td><span class="urgency ${recipient.urgency}">${capitalizeFirst(recipient.urgency)}</span></td>
            <td>${recipient.location || 'N/A'}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="findMatch('${recipient.name}')">Find Match</button>
            </td>
        </tr>
    `).join('');
}

function renderDonorsTable() {
    const tableBody = document.querySelector('#donors-table tbody');
    if (!tableBody) return;
    
    const sampleDonors = [
        {
            name: 'Emily Davis',
            bloodType: 'O-',
            location: 'New York, NY',
            lastDonation: '3 months ago',
            status: 'available'
        },
        {
            name: 'David Wilson',
            bloodType: 'A+',
            location: 'Los Angeles, CA',
            lastDonation: '5 months ago',
            status: 'available'
        },
        {
            name: 'Lisa Anderson',
            bloodType: 'B-',
            location: 'Chicago, IL',
            lastDonation: '2 weeks ago',
            status: 'unavailable'
        }
    ];
    
    // Combine sample data with stored data
    const allDonors = [...sampleDonors, ...donors.map(donor => ({
        ...donor,
        location: `${donor.city}, ${donor.state}`,
        lastDonation: 'Never',
        status: donor.status || 'available'
    }))];
    
    tableBody.innerHTML = allDonors.map(donor => `
        <tr>
            <td>${donor.name}</td>
            <td><span class="blood-type">${donor.bloodType}</span></td>
            <td>${donor.location}</td>
            <td>${donor.lastDonation}</td>
            <td><span class="status ${donor.status}">${capitalizeFirst(donor.status)}</span></td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="contactDonor('${donor.name}')" ${donor.status === 'unavailable' ? 'disabled' : ''}>Contact</button>
            </td>
        </tr>
    `).join('');
}

function updateDashboardStats() {
    // Update stats with real data
    const activeDonors = donors.filter(d => d.status === 'available').length + 3; // +3 for sample data
    const successfulMatches = 342; // Sample data
    const pendingRequests = recipients.length + 23; // Include sample data
    const criticalAlerts = recipients.filter(r => r.urgency === 'critical').length + 8; // Include sample data
    
    // Update stat cards if they exist
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 4) {
        statNumbers[0].textContent = activeDonors.toLocaleString();
        statNumbers[1].textContent = successfulMatches.toLocaleString();
        statNumbers[2].textContent = pendingRequests.toLocaleString();
        statNumbers[3].textContent = criticalAlerts.toLocaleString();
    }
}

// Filter functionality
function initializeFilters() {
    const bloodFilter = document.getElementById('blood-filter');
    const urgencyFilter = document.getElementById('urgency-filter');
    const locationFilter = document.getElementById('location-filter');
    
    if (bloodFilter) {
        bloodFilter.addEventListener('change', applyFilters);
    }
    if (urgencyFilter) {
        urgencyFilter.addEventListener('change', applyFilters);
    }
    if (locationFilter) {
        locationFilter.addEventListener('input', applyFilters);
    }
}

function applyFilters() {
    const bloodType = document.getElementById('blood-filter')?.value || '';
    const urgency = document.getElementById('urgency-filter')?.value || '';
    const location = document.getElementById('location-filter')?.value.toLowerCase() || '';
    
    // Filter recipients table
    const recipientsTable = document.querySelector('#recipients-table tbody');
    if (recipientsTable) {
        const rows = recipientsTable.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 5) {
                const rowBloodType = cells[1].textContent.trim();
                const rowUrgency = cells[3].textContent.trim().toLowerCase();
                const rowLocation = cells[4].textContent.trim().toLowerCase();
                
                const matchesBlood = !bloodType || rowBloodType === bloodType;
                const matchesUrgency = !urgency || rowUrgency === urgency;
                const matchesLocation = !location || rowLocation.includes(location);
                
                row.style.display = matchesBlood && matchesUrgency && matchesLocation ? '' : 'none';
            }
        });
    }
    
    // Filter donors table
    const donorsTable = document.querySelector('#donors-table tbody');
    if (donorsTable) {
        const rows = donorsTable.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 3) {
                const rowBloodType = cells[1].textContent.trim();
                const rowLocation = cells[2].textContent.trim().toLowerCase();
                
                const matchesBlood = !bloodType || rowBloodType === bloodType;
                const matchesLocation = !location || rowLocation.includes(location);
                
                row.style.display = matchesBlood && matchesLocation ? '' : 'none';
            }
        });
    }
}

// Sample data loading
function loadSampleData() {
    // Load sample data if no real data exists
    if (donors.length === 0 && recipients.length === 0) {
        // Sample data is already included in the render functions
        console.log('Using sample data for demonstration');
    }
}

// Utility functions
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function showSuccessMessage(message) {
    alert(message); // Simple alert for now - can be replaced with a better notification system
}

function showErrorMessage(message) {
    alert(message); // Simple alert for now - can be replaced with a better notification system
}

// Dashboard action functions
function findMatch(recipientName) {
    showSuccessMessage(`Searching for compatible donors for ${recipientName}...`);
    // In a real application, this would trigger the matching algorithm
}

function contactDonor(donorName) {
    showSuccessMessage(`Contacting ${donorName}... They will be notified of the request.`);
    // In a real application, this would send notifications to the donor
}

function refreshData() {
    loadDashboardData();
    updateDashboardStats();
    showSuccessMessage('Dashboard data refreshed successfully!');
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear any session data if needed
        window.location.href = 'index.html';
    }
}

// Real-time updates simulation
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Simulate new registrations and status updates
        if (Math.random() < 0.1) { // 10% chance every interval
            updateDashboardStats();
        }
    }, 10000); // Every 10 seconds
}

// Emergency notification system
function showEmergencyNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'emergency-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">⚠️</div>
            <div class="notification-text">${message}</div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    document.body.appendChild(notification);
    
    // Auto remove after 10 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 10000);
}

// Blood type compatibility checking
function getCompatibleBloodTypes(bloodType) {
    const compatibility = {
        'O-': ['O-'],
        'O+': ['O-', 'O+'],
        'A-': ['O-', 'A-'],
        'A+': ['O-', 'O+', 'A-', 'A+'],
        'B-': ['O-', 'B-'],
        'B+': ['O-', 'O+', 'B-', 'B+'],
        'AB-': ['O-', 'A-', 'B-', 'AB-'],
        'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']
    };
    
    return compatibility[bloodType] || [];
}

function findCompatibleDonors(recipientBloodType) {
    const compatibleTypes = getCompatibleBloodTypes(recipientBloodType);
    return donors.filter(donor => 
        compatibleTypes.includes(donor.bloodType) && donor.status === 'available'
    );
}

// Initialize real-time updates when dashboard loads
if (window.location.pathname.includes('dashboard.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        simulateRealTimeUpdates();
    });
}