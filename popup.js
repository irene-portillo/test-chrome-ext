import './gemini.js'; // gemni api file 

const downloadBtn = document.getElementById('downloadFrame');
const infoFrame   = document.getElementById('infoFrame'); 

downloadBtn.addEventListener('click', async () => {
  alert('ICS download!');
});

// For selecting text
document.addEventListener('mouseup', onMouseUp);
// document.addEventListener('mousedown', onMouseDown);

function onMouseUp(){
  const sel = window.getSelection();  
  const text = sel.toString().trim();
  
  if(text == ''){return;}
  // if text is too short , return, not worth prompting gemini

  // otherwise go through with text
  // alert(text);
}
