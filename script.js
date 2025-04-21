// --- download button (stub) ---
document.getElementById('downloadFrame').addEventListener('click', () => {
  alert('ICS download would start now.');// just for now
});
// <script src="gemni.js"></script>


// --- close button ---
// const modal = document.getElementById('interface');
// document.getElementById('exitBtn').addEventListener('click', () => {
//   modal.style.display = 'none';
// });


// --- draggable frame ---
// const frame = document.getElementById('grabFrame');
// let isDragging = false;
// let dragOffset = { x: 0, y: 0 };

// frame.addEventListener('mousedown', e => {
//   isDragging = true;
//   const rect = frame.getBoundingClientRect();
//   dragOffset.x = e.clientX - rect.left;
//   dragOffset.y = e.clientY - rect.top;
// });

// document.addEventListener('mousemove', e => {
//   if (!isDragging) return;
//   frame.style.position = 'absolute';
//   frame.style.left = `${e.clientX - dragOffset.x}px`;
//   frame.style.top = `${e.clientY - dragOffset.y}px`;
// });

// document.addEventListener('mouseup', () => {
//   isDragging = false;
// });
