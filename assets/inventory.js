let inventoryPending=!1;function loadInventoryPrices(){let e=document.querySelectorAll(nodeNames.hudItems);if(e.length>0&&!inventoryPending){let t=[],n=[];e.forEach(e=>{let i=e.querySelector(nodeNames.hudItemImage);if(i){if(i.complete){let r=calculateAverageColor(i);t.push(r),n.push(e)}else i.onload=function(){let r=calculateAverageColor(i);t.push(r),n.push(e)}}}),t.length>0&&(inventoryPending=!0,sendRequestByHash(t).then(e=>{setPricesInInventory(e,n),inventoryPending=!1}).catch(e=>{console.error(e),inventoryPending=!1}))}}function setPricesInInventory(e,t){e.forEach((e,n)=>{let i=t[n];if(null!==e.price.price){let r=i.querySelector(".voxels-inventory-price");if(r){r.innerText=e.price.price;let l=document.createElement("img");l.src=chrome.runtime.getURL("images/Prices/coin.png"),r.appendChild(l),r.classList.add("voxels-blinking"),setTimeout(()=>{r.classList.remove("voxels-blinking")},500)}else{var a=document.createElement("div");a.classList.add("voxels-inventory-price"),a.innerText=e.price.price;let o=document.createElement("img");o.src=chrome.runtime.getURL("images/Prices/coin.png"),a.appendChild(o),i.appendChild(a),a.classList.add("voxels-blinking"),setTimeout(()=>{a.classList.remove("voxels-blinking")},500)}}})}async function sendRequestByHash(e){return new Promise(async(t,n)=>{chrome.storage.local.get("user_info",async function(i){let r={name:i.user_info,operation:"fetchPricesByHash",extra:e};try{let l=await makeFetchRequest(apiURL,r),a=l.data,o=e.map((e,t)=>({averageColor:e,price:a[t]}));t(o)}catch(c){n(c)}})})}function calculateAverageColor(e){let t=document.createElement("canvas"),n=t.getContext("2d");t.width=e.width,t.height=e.height,n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height).data,r=0,l=0,a=0;for(let o=0;o<i.length;o+=4)r+=i[o],l+=i[o+1],a+=i[o+2];let c=i.length/4,s=r/c,g=l/c,h=a/c,d=generateColorHash(s,g,h);return d}function generateColorHash(e,t,n){let i=`${Math.round(e)},${Math.round(t)},${Math.round(n)}`,r=0;for(let l=0;l<i.length;l++){let a=i.charCodeAt(l);r=(r<<5)-r+a}let o=(r>>>0).toString(16);return o}