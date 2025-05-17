import fs from 'fs'

function location(){
    try{
        const data = fs.readFileSync('loc_Coords.json','utf8');
        const loc = JSON.parse(data);
        for(let i in loc){
            console.log(`name: ${loc[i].name}\nLatitude: ${loc[i].lat}\nLongituge: ${loc[i].lon}`); 
        }
    }catch(err){
        console.log(err);
    }
}

location()
