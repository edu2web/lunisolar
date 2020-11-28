let bg;
let Moonimg;
let sunX, moonX;
  
  function setup() {
    bg = loadImage('./timezone.map-Crunchify.jpg');
    Moonimg = loadImage('./moonage/'+getMpng(kr.moon0));
    createCanvas(1114, 558);
  }

  // 月齢から月齢画像ファイル名を返す
  function getMpng(moonAge) {
    var age;
    age = Math.floor(moonAge);
    if (age < 10) age = '0' + age;
    pngname = 'moon' + age + '.png';
    return pngname;
  }
  
  function mk24(h){
    if(h>24) return h-24;
    if(h<0) return h+24;
    return h;
  }
  
  function draw(){
    background(bg);   //背景色: 
    var d = new Date();
    var n = d.getTimezoneOffset() / 60;     // timezone
    let h = hour();                         // local hour
    let moonAge = kr.moon.toFixed(1);
    let sh = h + minute() /60;
    let mh = (sh - moonAge *12/15) + 24;
    
    let stripe_width = 45;  //ストライプの間隔
    let stripe_left = 2;

    if(mouseX < 1100 && mouseY < 500 && mouseX > 10 && mouseY > 20 )
    {
      h = 23 - n - Math.floor((mouseX - stripe_left) / stripe_width); 
      sh = h + minute() /60;
      mh = (sh - moonAge *12/15) + 24;
    }

    for(let i=0; i<24; i++){
      noStroke(); //ストローク無効化
      let hh=(i+13+h+n)%24;     // localtime @ i 
      switch(parseInt(hh/6)){
        case 0: // dawn, 0 - 5
          fill(32, 50+25*(6-hh));  //図形の塗り潰し: RGB値に加え、不透明度 128 を指定
          break;
        case 1: // morning, 6-11
          fill(0xed, 0x70, 0x14, 50+25*(12-hh));  //図形の塗り潰し: RGB値に加え、不透明度 128 を指定
          break;
        case 2: // afternoon, 12-17
          fill(0xed, 0x70, 0x14, 50+25*(hh-12));  //図形の塗り潰し: RGB値に加え、不透明度 128 を指定
          break;
        case 3: // eve, 18-23
          fill(32, 50+25*(hh-18));  //図形の塗り潰し: RGB値に加え、不透明度 128 を指定
          break;

      }
      var y1=30;
      var y2=height-110-50*sin(radians((i+1+mh)*30));
      var y3=height-30;
      var x1=stripe_left+i*stripe_width+2;
      rect(x1, y1, stripe_width-2, y2-y1);    // 空の色
      fill(0, 0, 255, 128);
      rect(x1, y2, stripe_width-2, y3-y2);    // 潮の高さ
      stroke( 220, 220, 220 );
      line(x1, y2, x1 + stripe_width -1, y2);　// 区切り線

      fill(255);
      text(15*(i-11), x1+15, 45);    // longtitude
      text(hh, x1+15, 450);     // localtime
      text(i-11, x1+15, 525);    // timezone
    }

    text(d, 10, 80);
    // text(sh+n, 10, 150);
    // text(mh+n, 10, 200);
    // text(sunX, 10, 250);
    // text(moonX, 10, 300);
 
    stroke( 220, 100, 100 );
    noFill(); // 色を無くし、輪郭線のみの図形にする
    rect(stripe_left+1, 285, stripe_width * 24, 140);
    stroke( 220, 220, 220 );
    line(stripe_left+1, 130, 75+2 + stripe_width * 24, 130);
    noStroke();

    sunX = stripe_left+(24 -mk24(sh+n))*stripe_width+2;     
    fill( 255, 255, 255, 58 );
    ellipse( sunX, 380, 380, 380 );     // sun ring
  
    // 通常の不透明な色
    fill( "White" ); 
    ellipse( sunX, 380, 85, 85 );       // sun

    moonX = stripe_left+(24 -mk24(mh+n))*stripe_width+2 ;
    fill( 255, 255, 100 ); 
    ellipse( moonX, 350, 85, 85 );      // moon
    // imageMode(CENTER);
    image(Moonimg, moonX-40, 350-40, 80, 80);   // moon img

}