import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockAgujas, Usuario } from '../models/entities.models';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getScopedHttpParams(): HttpParams {
    let params = new HttpParams();
    const user = this.authService.getCurrentUser();
    if (user && user.rol !== 'ADMIN') {
      params = params.set('userId', user.id.toString());
    }
    return params;
  }

  private getUserHttpParams(): HttpParams {
    let params = new HttpParams();
    const user = this.authService.getCurrentUser();
    if (user) {
      params = params.set('userId', user.id.toString());
    }
    return params;
  }

  private attachCurrentUser(obj: any): any {
    const user = this.authService.getCurrentUser();
    if (user && (!obj.usuario || !obj.usuario.id)) {
      obj.usuario = { id: user.id };
    }
    return obj;
  }

  // Stock Agujas
  listarStockAgujas(): Observable<StockAgujas[]> {
    return this.http.get<StockAgujas[]>(`${this.apiUrl}/stock`, { params: this.getScopedHttpParams() });
  }

  guardarStockAgujas(stock: StockAgujas): Observable<StockAgujas> {
    return this.http.post<StockAgujas>(`${this.apiUrl}/stock`, this.attachCurrentUser(stock), { params: this.getUserHttpParams() });
  }

  // Usuarios
  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

  guardarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios`, usuario);
  }

  actualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/usuarios/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/usuarios/${id}`);
  }

  // Mantenimiento
  listarCatalogos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/catalogo`);
  }

  listarReportesMantenimiento(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mantenimiento`, { params: this.getScopedHttpParams() });
  }

  guardarReporteMantenimiento(reporte: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/mantenimiento`, this.attachCurrentUser(reporte), { params: this.getUserHttpParams() });
  }

  guardarReportesBatch(reportes: any[]): Observable<any> {
    const processed = reportes.map(r => this.attachCurrentUser({ ...r }));
    return this.http.post<any>(`${this.apiUrl}/mantenimiento/batch`, processed, { params: this.getUserHttpParams() });
  }

  eliminarReportesBatch(batchId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/mantenimiento/batch/${batchId}`);
  }

  // Inspección
  listarInspecciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/inspeccion`, { params: this.getScopedHttpParams() });
  }

  guardarInspeccion(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/inspeccion`, this.attachCurrentUser(data), { params: this.getUserHttpParams() });
  }

  guardarInspeccionesBatch(data: any[]): Observable<any> {
    const processed = data.map(d => this.attachCurrentUser({ ...d }));
    return this.http.post(`${this.apiUrl}/inspeccion/batch`, processed, { params: this.getUserHttpParams() });
  }

  eliminarInspeccionesBatch(batchId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/inspeccion/batch/${batchId}`);
  }

  // Máquinas (Master List)
  listarMaquinas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/maquinas`, { params: this.getScopedHttpParams() });
  }

  listarMaquinasActivas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/maquinas/activas`, { params: this.getScopedHttpParams() });
  }

  guardarMaquina(maquina: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/maquinas`, this.attachCurrentUser(maquina), { params: this.getUserHttpParams() });
  }

  eliminarMaquina(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/maquinas/${id}`);
  }

  toggleMaquinaStatus(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/maquinas/${id}/status`, {});
  }
}
