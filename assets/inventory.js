let inventoryPending=!1;function loadInventoryPrices(){let e=document.querySelectorAll(nodeNames.hudItems);if(e.length>0&&!inventoryPending){let t=[],n=[];e.forEach(e=>{let r=e.querySelector(nodeNames.hudItemImage);if(r){if(r.complete){let i=calculateAverageColor(r);t.push(i),n.push(e)}else r.onload=function(){let i=calculateAverageColor(r);t.push(i),n.push(e)}}}),t.length>0&&(inventoryPending=!0,sendRequestByHash(t).then(e=>{setPricesInInventory(e,n),inventoryPending=!1}).catch(e=>{console.error(e),inventoryPending=!1}))}}function setPricesInInventory(e,t){e.forEach((e,n)=>{let r=t[n];function i(){return e.price.price>9999?nFormatter(e.price.price,1):e.price.price}if(null!==e.price.price){let l=r.querySelector(".voxels-inventory-price");if(l){l.innerText=i();let a=document.createElement("img");a.src=chrome.runtime.getURL("images/Prices/coin.png"),l.appendChild(a),l.classList.add("voxels-blinking"),setTimeout(()=>{l.classList.remove("voxels-blinking")},500)}else{var o=document.createElement("div");o.classList.add("voxels-inventory-price"),o.innerText=i();let c=document.createElement("img");c.src=chrome.runtime.getURL("images/Prices/coin.png"),o.appendChild(c),r.appendChild(o),o.classList.add("voxels-blinking"),setTimeout(()=>{o.classList.remove("voxels-blinking")},500)}}})}async function sendRequestByHash(e){return new Promise(async(t,n)=>{chrome.storage.local.get("user_info",async function(r){let i={name:r.user_info,operation:"fetchPricesByHash",extra:e};try{let l=await makeFetchRequest(apiURL,i),a=l.data,o=e.map((e,t)=>({averageColor:e,price:a[t]}));t(o)}catch(c){n(c)}})})}function calculateAverageColor(e){let t=document.createElement("canvas"),n=t.getContext("2d");t.width=e.width,t.height=e.height,n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height).data,i=0,l=0,a=0;for(let o=0;o<r.length;o+=4)i+=r[o],l+=r[o+1],a+=r[o+2];let c=r.length/4,s=i/c,g=l/c,h=a/c,d=generateColorHash(s,g,h);return d}function generateColorHash(e,t,n){let r=`${Math.round(e)},${Math.round(t)},${Math.round(n)}`,i=0;for(let l=0;l<r.length;l++){let a=r.charCodeAt(l);i=(i<<5)-i+a}let o=(i>>>0).toString(16);return o}