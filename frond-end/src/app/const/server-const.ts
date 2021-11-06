import { localstoreKey } from './localstore_key';
import { Observable } from "rxjs";
import { HttpClient, HttpXhrBackend } from "@angular/common/http";
import { isDevMode } from "@angular/core";
import { ConfigModel } from '../model/config.model';

export class ServerConst {
  private _http: HttpClient | undefined;
  constructor(){
    this.onLoadConfig().subscribe((conf)=>{
      let config=conf["config"];
      let configModel=<ConfigModel>{
        productUri:config.productUri,
        devUri:config.devUri,
        devSocketIoUrl: config.devSocketIoUrl,
        productSocketIoUrl: config.productSocketIoUrl
      };
      if(configModel!=null||configModel!=undefined){
        localStorage.setItem(localstoreKey.config,JSON.stringify(configModel));
      }
    });
  }
  private initHttp() {
    if (this._http == null || this._http == undefined) {
      this._http = new HttpClient(
        new HttpXhrBackend({ build: () => new XMLHttpRequest() })
      );
      return this._http;
    } else {
      return this._http;
    }
  }
  private onLoadConfig(): Observable<any> {
    return this.initHttp().get("assets/config/config.json");
  } 
  private get getConfigStore(){
     let configStore= <ConfigModel>JSON.parse(localStorage.getItem(localstoreKey.config)??"") ;
    return configStore;
    }
  //DEV ENV
  private get prodHost() {
    return this.getConfigStore?.productUri;
  }

  private get devHost() {  
    return this.getConfigStore?.devUri;
  }

  get getHost() {
    if (isDevMode()) {
      return this.devHost;
    }
    return this.prodHost;
  }

}
