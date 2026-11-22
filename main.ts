import{mkdirSync,readdirSync,readFileSync,writeFileSync}from"node:fs";
const T="01146abfxxxxxxxx999999959995999x999xxxxxxxxxxxxx04400xxxxxxxxxxx58xxxxxxxxxxxxxx4414";
function R(p,q){
let D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(1<<16),s=0,c=0,l=0,i=0,j=0,k=0,a,b,d,r,t,v,m,x;
const F=e=>[o.slice(0,l),e];
for(;;){
if(k==1e6)return F(10);
if(j<0|j>=p.length)return F(9);
b=p[j];
v=+("0x"+T[b]);
if(v!=v)return F(5);
m=b==1?1:b==2?4:b>47&&b<52?2:0;
if(j+m>=p.length)return F(9);
k++;
if(s<(v>>2))return F(2);
if(s-(v>>2)+(v&3)>256)return F(3);
x=j+1+m;
j=x;
switch(b){
case 0:return F(0);
case 1:D[s++]=(p[x-1]<<24)>>24;break;
case 2:D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break;
case 3:s--;break;
case 4:case 6:D[s]=D[s-(b==4?1:2)];s++;break;
case 5:t=D[s-1];D[s-1]=D[s-2];D[s-2]=t;break;
case 7:t=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=t;break;
case 23:case 27:D[s-1]=b==23?-D[s-1]|0:~D[s-1];break;
case 48:case 49:case 50:
r=((p[x-2]|p[x-1]<<8)<<16)>>16;
if(b==48||(b==49)==(D[--s]==0))j=x+r;
break;
case 51:if(c==64)return F(7);C[c++]=x;j=p[x-2]|p[x-1]<<8;break;
case 52:if(!c)return F(8);j=C[--c];break;
case 64:a=D[s-1];if(a>>>0>255)return F(6);D[s-1]=M[a];break;
case 65:a=D[s-1];if(a>>>0>255)return F(6);M[a]=D[s-2];s-=2;break;
case 80:r=Buffer.from(""+D[s-1]);if(l+r.length>1<<16)return F(11);s--;o.set(r,l);l+=r.length;break;
case 81:if(l+1>1<<16)return F(11);o[l++]=D[--s]&255;break;
case 82:D[s++]=i<q.length?q[i++]:-1;break;
case 83:return F(D[--s]&255);
default:
a=D[s-2];d=D[s-1];
if(b>18&&b<23&&!d)return F(4);
if(b==16)r=a+d|0;
else if(b==17)r=a-d|0;
else if(b==18)r=Math.imul(a,d);
else if(b==19)r=(a/d)|0;
else if(b==20)r=a%d|0;
else if(b==21)r=(a>>>0)/(d>>>0)|0;
else if(b==22)r=(a>>>0)%(d>>>0)|0;
else if(b==24)r=a&d;
else if(b==25)r=a|d;
else if(b==26)r=a^d;
else if(b==28)r=a<<(d&31);
else if(b==29)r=a>>(d&31);
else if(b==30)r=(a>>>(d&31))|0;
else if(b==32)r=a==d?1:0;
else if(b==33)r=a<d?1:0;
else r=(a>>>0)<(d>>>0)?1:0;
s-=2;D[s++]=r;
}
}
}
const I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
for(const d of readdirSync(I).sort()){
let[a,b]=R(readFileSync(I+"/"+d+"/program.bin"),readFileSync(I+"/"+d+"/input.bin"));
mkdirSync(O+"/"+d,{recursive:!0});
writeFileSync(O+"/"+d+"/stdout.bin",a);
writeFileSync(O+"/"+d+"/exit.txt",b+"\n");
}
