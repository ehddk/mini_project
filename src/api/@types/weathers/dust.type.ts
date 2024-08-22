export type getDustRequestParams={
    returnType: string,
    numOfRows:number,
    pageNo:number,
    searchDate:string,
    InformCode: string
}

export type getDustRequestPath={}
export type getDustRequestBody={}


export type getDustRequest={
    params:getDustRequestParams,
    body?:getDustRequestBody,
    path?:getDustRequestPath
}
/**미세먼지 조회 응답 */
export type getDustResponse={
    response:{
        body:{
            items:Array<{
                /** 발생원인 */
                informCause:string,
                  /** 예보등급*/
                informGrade:string,
                /**예보 예상 */
                informOverall:string,
            }>
        }
    }
   
    
}