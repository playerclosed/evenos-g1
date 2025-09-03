export type SimEvents = { onHead:(pos:{upDown:number;leftRight:number})=>void; onButton:(e:{long:boolean})=>void; };
export class Simulator {
  constructor(private ev:SimEvents){ this.bind(); this.overlay(); }
  private bind(){
    window.addEventListener('keydown',(e)=>{
      if(e.key==='ArrowLeft') this.ev.onHead({upDown:0,leftRight:-1});
      if(e.key==='ArrowRight')this.ev.onHead({upDown:0,leftRight: 1});
      if(e.key==='ArrowUp')   this.ev.onHead({upDown: 1,leftRight:0});
      if(e.key==='ArrowDown') this.ev.onHead({upDown:-1,leftRight:0});
      if(e.key===' ')         this.ev.onButton({long:false});
      if(e.key==='Enter')     this.ev.onButton({long:true});
    });
  }
  private overlay(){
    const el=document.createElement('div');
    el.className='pixel-card'; el.style.position='fixed'; el.style.right='var(--safe-right)'; el.style.top='var(--safe-top)';
    el.innerHTML='<b style="font-family:var(--font-pixel-1)">SIM</b><br>←/→/↑/↓ head • Space short • Enter long';
    document.body.appendChild(el);
  }
}
