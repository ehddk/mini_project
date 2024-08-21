export async function getUserLocation(): Promise<{lat:number, lon:number}> {
    return new Promise((resolve,reject)=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    const {latitude,longitude}=position.coords;
                    resolve({lat:latitude,lon:longitude});
                },
            (error)=>{
                reject(error)
            }
            )
        }
    })
}