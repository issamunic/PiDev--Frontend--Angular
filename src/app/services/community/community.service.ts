import { Community } from 'src/app/models/community/community';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  url="http://127.0.0.1:8087";
  constructor(private http : HttpClient) { }
  

  getAllCommunities(): Observable<any>{

    const headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': "Bearer "+localStorage.getItem('token')
  })
  
  return this.http.get(this.url+"/SpringMVC/community/retrieve-communities-by-user", { headers:headers });
}
getAllCommunitiesOfusers(): Observable<any>{

  const headers = new HttpHeaders({ 
  'Content-Type': 'application/json',
  'Authorization': "Bearer "+localStorage.getItem('token')
})

return this.http.get(this.url+"/SpringMVC/community/retrieve-communities-of-user", { headers:headers });
}
getOneCommunity(id: number){

  const headers = new HttpHeaders({ 
  'Content-Type': 'application/json',
  'Authorization': "Bearer "+localStorage.getItem('token')
})

return this.http.get(this.url+"/SpringMVC/community/retrieve-community/"+id, { headers:headers });
}
createCommunity(postPayload: Community): Observable<any> {
  const headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': "Bearer "+localStorage.getItem('token')
  })
  console.log('kbal el requete');
  return this.http.post(this.url+'/SpringMVC/community/add-community/', postPayload , {headers : headers});
}
addUsertoCom(idcom : number, iduser: number){
  const headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': "Bearer "+localStorage.getItem('token')
  })
  return this.http.post(this.url+'/SpringMVC/community/addusertocom/'+idcom+"/"+iduser,{}, {headers:headers})

}
getImageByUser(id: Number){

  const headers = new HttpHeaders({ 
  'Content-Type': 'application/json',
  'Authorization': "Bearer "+localStorage.getItem('token')
})
return this.http.get(this.url+"/SpringMVC/image/get/"+id, { headers:headers });
}
getFollowings(): Observable<any>{
  const headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': "Bearer "+localStorage.getItem('token')
  })
  console.log(headers);
  return this.http.get(this.url+"/SpringMVC/community/following", { headers:headers })
}
getCommunityUsers(  id: number ): Observable<any>{
  const headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': "Bearer "+localStorage.getItem('token')
  })
  return this.http.get(this.url+"/SpringMVC/community/Users/"+id, { headers:headers })
}

}

