import { Inject, Injectable } from '@angular/core';
import { Room, RoomList } from '../rooms';
import { APP_CONFIG, APP_SERVICE_CONFIG } from 'src/app/AppConfig/appConfig.service';
import { AppConfig } from 'src/app/AppConfig/appConfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  roomList: RoomList[] = [];
  // to Pass headers
  // headers = new HttpHeaders({ 'token': '123456abc'})
  // RxJS ShareReplay for Caching, $ to signify a stream
  getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(
    shareReplay(1)
  );
  // Value injection
  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig,
  private http: HttpClient) {
    // console.log(this.config.apiEndPoint)
    console.log('Room service initialized...')
  }

  getRooms() {

    return this.http.get<RoomList[]>('/api/rooms');
  }

  addRooms(room: RoomList) {
    return this.http.post<RoomList[]>('/api/rooms', room);
  }

  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(id: string) {
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }
  // sample httpRequest call
  getPhotos() {
    const request = new HttpRequest('GET',`https://jsonplaceholder.typicode.com/photos`, {
      reportProgress: true,
    });
    return this.http.request(request)
  }

}
