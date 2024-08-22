import { getDustRequest, getDustResponse } from "../../@types/weathers/dust.type";
const API_KEY="hMojIvvHF%2B09wM6EWKKRIKhgicN%2FZohDT9YErSSMrpz76XeTM0XzQZi7x6L2bE1qa%2Bw24QV232F0GrcA2aSiZQ%3D%3D"

export class DustService{
    async getDust(req: getDustRequest) {
        const {params}=req;
        const url = new URL(`http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth?`);
  
        Object.entries({
            ...params,
            serviceKey: decodeURIComponent(API_KEY),
        }).forEach(([key, value]) => {
            url.searchParams.append(key, value.toString());
          });

          const res = await fetch(url);

          const data = (await res.json()) as getDustResponse;
      
          return data;
        
    }
}