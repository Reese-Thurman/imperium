/* script.js - minimal starfield + minimap canvas hookup */
(function(){
  // create starfield background canvas
  const starfield = document.getElementById('starfield');
  const canvas = document.createElement('canvas');
  canvas.style.position='fixed';
  canvas.style.inset='0';
  canvas.style.zIndex='-1';
  starfield.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let w,h,stars=[];
  function resize(){
    w=canvas.width=window.innerWidth;
    h=canvas.height=window.innerHeight;
    stars=[];
    for(let i=0;i<160;i++){
      stars.push({x:Math.random()*w,y:Math.random()*h,z:Math.random()*1.5+0.2,r:Math.random()*1.2});
    }
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle='#020204';
    ctx.fillRect(0,0,w,h);
    for(let s of stars){
      s.x -= 0.2 * s.z;
      if(s.x<0) s.x=w;
      ctx.beginPath();
      ctx.fillStyle=`rgba(0,184,255,${0.8*s.z})`;
      ctx.arc(s.x,s.y,s.r*s.z,0,Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  resize();
  draw();

  // minimap placeholder render
  const mm = document.getElementById('minimap');
  if(mm){
    const c = document.createElement('canvas');
    c.width = mm.clientWidth;
    c.height = mm.clientHeight;
    mm.appendChild(c);
    const mctx = c.getContext('2d');
    function renderMinimap(){
      mctx.clearRect(0,0,c.width,c.height);
      mctx.fillStyle='#051018';
      mctx.fillRect(0,0,c.width,c.height);
      // draw some systems
      for(let i=0;i<40;i++){
        mctx.fillStyle = (Math.random()>0.85)? '#00B8FF' : '#3b6b7a';
        const x = Math.random()*c.width;
        const y = Math.random()*c.height;
        mctx.beginPath();
        mctx.arc(x,y,Math.random()*2+1,0,Math.PI*2);
        mctx.fill();
      }
    }
    renderMinimap();
  }

  // small CTA hover micro interactions
  document.querySelectorAll('.btn.primary').forEach(b=>{
    b.addEventListener('mouseenter', ()=>{b.style.transform='translateY(-3px)';});
    b.addEventListener('mouseleave', ()=>{b.style.transform='translateY(0)';});
  });

})();
