// Service d'IA sécurisé (Cloudflare Workers). La clé reste côté serveur.
// Variables à définir dans Cloudflare : ANTHROPIC_API_KEY (secret), ALLOWED_ORIGIN (ex. https://ma-cave.netlify.app), SHARED_TOKEN (facultatif)
export default{async fetch(req,env){
 const cors={'access-control-allow-origin':env.ALLOWED_ORIGIN||'*','access-control-allow-headers':'content-type','access-control-allow-methods':'POST,OPTIONS'};
 if(req.method==='OPTIONS')return new Response(null,{status:204,headers:cors});
 if(req.method!=='POST')return new Response('Not found',{status:404,headers:cors});
 const {system,cave,history,question}=await req.json();
 const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'x-api-key':env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01','content-type':'application/json'},
  body:JSON.stringify({model:'claude-sonnet-5-5',max_tokens:900,system,messages:[{role:'user',content:'CAVE JSON :\n'+JSON.stringify(cave)+'\n\nÉchanges précédents :\n'+(history||'(aucun)')+'\n\nQuestion : '+question}]})});
 const j=await r.json();
 return new Response(JSON.stringify({text:(j.content&&j.content[0]&&j.content[0].text)||''}),{headers:{...cors,'content-type':'application/json'}});}};
