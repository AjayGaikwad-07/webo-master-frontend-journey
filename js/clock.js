function updateClock() {
  const now = new Date();
  
  // Get time components
  let hours = now.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12
  
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  
  // Get date components
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = days[now.getDay()];
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = months[now.getMonth()];
  const dayNumber = now.getDate();
  const year = now.getFullYear();
  
  // Update DOM with animations
  animateValue('hours', hours.toString().padStart(2, '0'));
  animateValue('minutes', minutes);
  animateValue('seconds', seconds);
  document.getElementById('ampm').textContent = ampm;
  
  document.getElementById('day').textContent = day;
  document.getElementById('month').textContent = month;
  document.getElementById('day-number').textContent = dayNumber;
  document.getElementById('year').textContent = year;
  
  // Color transition for AM/PM
  const ampmElement = document.getElementById('ampm');
  ampmElement.style.color = ampm === 'AM' ? '#63e4ff' : '#ff8a3d';
}

function animateValue(id, newValue) {
  const element = document.getElementById(id);
  if (element.textContent !== newValue) {
    element.style.transform = 'scale(1.2)';
    element.style.opacity = '0.5';
    
    setTimeout(() => {
      element.textContent = newValue;
      element.style.transform = 'scale(1)';
      element.style.opacity = '1';
    }, 150);
  }
}

// Update clock immediately and then every second
updateClock();
setInterval(updateClock, 1000);

// Add floating animation to clock container
document.addEventListener('DOMContentLoaded', function() {
  const clockContainer = document.querySelector('.clock-container');
  let floatValue = 0;
  
  function floatAnimation() {
    floatValue += 0.01;
    clockContainer.style.transform = `translateY(${Math.sin(floatValue) * 5}px)`;
    requestAnimationFrame(floatAnimation);
  }
  
  floatAnimation();
});