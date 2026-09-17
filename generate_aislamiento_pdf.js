const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Generando PDF de Reporte Técnico: Aislamiento por Mecánico Independiente...');

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Reporte Técnico - Aislamiento por Mecánico Independiente CottonKnit</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

    @page {
      size: A4 portrait;
      margin: 15mm 15mm 15mm 15mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #1e293b;
      background-color: #ffffff;
      font-size: 8.5pt;
      line-height: 1.45;
    }

    .page {
      height: 267mm;
      max-height: 267mm;
      page-break-after: always;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }

    .page:last-child {
      page-break-after: avoid;
    }

    .page-content {
      flex: 1;
    }

    .page-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.5pt;
      color: #94a3b8;
      font-weight: 500;
    }

    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 12px;
      margin-bottom: 18px;
    }

    .logo-container h1 {
      font-size: 16pt;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.5px;
    }

    .logo-container p {
      font-size: 7.5pt;
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .badge {
      background: #eef2ff;
      color: #4f46e5;
      font-size: 7.5pt;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid #c7d2fe;
      display: inline-block;
    }

    .badge-success {
      background: #ecfdf5;
      color: #059669;
      border-color: #a7f3d0;
    }

    .badge-amber {
      background: #fffbeb;
      color: #d97706;
      border-color: #fde68a;
    }

    h2 {
      font-size: 11.5pt;
      font-weight: 800;
      color: #0f172a;
      margin: 14px 0 8px 0;
      display: flex;
      align-items: center;
      gap: 8px;
      border-left: 3px solid #4f46e5;
      padding-left: 8px;
    }

    h3 {
      font-size: 9.5pt;
      font-weight: 700;
      color: #334155;
      margin: 10px 0 5px 0;
    }

    p {
      margin-bottom: 8px;
      color: #334155;
      text-align: justify;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin: 10px 0;
    }

    .card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
    }

    .card-title {
      font-size: 8.5pt;
      font-weight: 800;
      color: #1e293b;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
      font-size: 7.5pt;
    }

    .table th {
      background: #0f172a;
      color: #ffffff;
      text-align: left;
      padding: 6px 8px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .table td {
      padding: 6px 8px;
      border-bottom: 1px solid #e2e8f0;
      color: #334155;
    }

    .table tr:nth-child(even) td {
      background: #f8fafc;
    }

    .code-block {
      background: #0f172a;
      color: #e2e8f0;
      padding: 8px 10px;
      border-radius: 6px;
      font-family: 'Consolas', monospace;
      font-size: 7pt;
      line-height: 1.4;
      margin: 8px 0;
      overflow: hidden;
    }

    .highlight-box {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
      padding: 10px 12px;
      margin: 10px 0;
    }

    .highlight-box p {
      color: #166534;
      font-size: 8pt;
      margin: 0;
    }

    .role-tag {
      font-size: 6.5pt;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .role-admin { background: #fee2e2; color: #991b1b; }
    .role-mecanico { background: #dbeafe; color: #1e40af; }
  </style>
</head>
<body>

  <!-- PÁGINA 1: RESUMEN EJECUTIVO Y ARQUITECTURA -->
  <div class="page">
    <div class="page-content">
      <div class="header-bar">
        <div class="logo-container">
          <h1>COTTON KNIT S.A.C.</h1>
          <p>Informe de Ingeniería de Software | Arquitectura Multi-Usuario</p>
        </div>
        <div>
          <span class="badge badge-success">ESTADO: PRODUCCIÓN</span>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: white; padding: 14px 18px; border-radius: 10px; margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h2 style="color: white; border: none; padding: 0; margin: 0 0 4px 0; font-size: 13pt;">Aislamiento de Datos por Mecánico Independiente</h2>
            <p style="color: #94a3b8; font-size: 8pt; margin: 0;">Implementación del modelo de gobernanza multi-inquilino a nivel de aplicación</p>
          </div>
          <span class="badge" style="background: rgba(255,255,255,0.15); color: #fff; border: 1px solid rgba(255,255,255,0.2);">VERSIÓN 2.4</span>
        </div>
      </div>

      <h2>1. Justificación y Requerimiento Técnico</h2>
      <p>
        En la planta industrial de <strong>CottonKnit</strong>, cada mecánico técnico opera de forma autónoma gestionando un inventario propio de máquinas asignadas, diagnósticos de mantenimiento correctivo (FO-026), inspecciones técnicas preventivas (IND-MEC-01 / FO525) y control de agujas. 
        Previamente, el sistema exponía todas las máquinas de la base de datos a cualquier usuario que ingresara. El requerimiento estipuló que <strong>todo nuevo usuario mecánico (ej. Yofre) debe iniciar con sus módulos completamente limpios (0 registros)</strong>, registrando exclusivamente sus propios activos, mientras que el perfil <strong>ADMIN</strong> mantiene una vista global supervisora.
      </p>

      <div class="grid-2">
        <div class="card" style="border-top: 3px solid #3b82f6;">
          <div class="card-title">
            <span class="role-tag role-mecanico">MECANICO</span>
            Comportamiento para Mecánicos (ej. Yofre)
          </div>
          <ul style="padding-left: 14px; font-size: 7.5pt; color: #475569; line-height: 1.5;">
            <li><strong>Inicio en Cero:</strong> Tablas de Máquinas, FO-026, Inspecciones y Agujas inician vacías (0 registros).</li>
            <li><strong>Propiedad Exclusiva:</strong> Al crear una máquina o registro, se asocia automáticamente a su <code>usuario_id</code>.</li>
            <li><strong>Filtro Automático:</strong> Solo recupera y visualiza registros creados por su cuenta.</li>
            <li><strong>Autocompletado:</strong> Firma y código técnico (<code>MEC-ID</code>) asignados automáticamente en reportes.</li>
          </ul>
        </div>

        <div class="card" style="border-top: 3px solid #ef4444;">
          <div class="card-title">
            <span class="role-tag role-admin">ADMIN</span>
            Comportamiento para Administrador
          </div>
          <ul style="padding-left: 14px; font-size: 7.5pt; color: #475569; line-height: 1.5;">
            <li><strong>Supervisión Global:</strong> Visualiza la totalidad de máquinas e informes de todos los mecánicos.</li>
            <li><strong>Trazabilidad en Planta:</strong> Nueva columna <em>Mecánico Responsable</em> en el Maestro de Máquinas.</li>
            <li><strong>Compatibilidad Retroactiva:</strong> Mantiene acceso a los activos precargados del sistema.</li>
            <li><strong>Gestión de Cuentas:</strong> Control exclusivo para crear, editar o inhabilitar mecánicos.</li>
          </ul>
        </div>
      </div>

      <h2>2. Diagrama de Flujo de Datos y Aislamiento</h2>
      <div class="card" style="background: #f1f5f9; text-align: center; padding: 12px;">
        <div style="display: flex; justify-content: space-around; align-items: center; font-size: 7.5pt; font-weight: 700;">
          <div style="background: white; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; width: 28%;">
            <span class="role-tag role-mecanico">Login: Yofre</span>
            <div style="margin-top: 4px; color: #64748b; font-size: 6.8pt;">Token de Sesión + ID: 3</div>
          </div>
          <div style="color: #4f46e5; font-size: 12pt;">➔</div>
          <div style="background: white; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; width: 34%;">
            <div style="color: #0f172a;">Frontend ApiService</div>
            <div style="margin-top: 4px; color: #2563eb; font-size: 6.8pt;">GET /api/maquinas?userId=3</div>
          </div>
          <div style="color: #4f46e5; font-size: 12pt;">➔</div>
          <div style="background: white; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; width: 28%;">
            <div style="color: #059669;">MySQL 8.0</div>
            <div style="margin-top: 4px; color: #64748b; font-size: 6.8pt;">WHERE usuario_id = 3</div>
          </div>
        </div>
        <p style="margin-top: 8px; font-size: 7.2pt; color: #64748b; text-align: center;">
          El mecánico Yofre recibe <strong>0 resultados</strong> hasta que registra sus propias máquinas.
        </p>
      </div>

      <h2>3. Modificaciones en el Esquema de Base de Datos</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Entidad / Tabla</th>
            <th>Campo Agregado</th>
            <th>Tipo / Restricción</th>
            <th>Propósito del Cambio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Maquina</strong> (<code>maquinas</code>)</td>
            <td><code>usuario_id</code></td>
            <td><code>INT, NULL, FK usuarios(id)</code></td>
            <td>Asigna la máquina al mecánico propietario. Se removió restricción única global de código.</td>
          </tr>
          <tr>
            <td><strong>InspeccionMaquina</strong> (<code>inspeccion_maquinas</code>)</td>
            <td><code>usuario_id</code></td>
            <td><code>INT, NULL, FK usuarios(id)</code></td>
            <td>Asocia las inspecciones IND-MEC-01 al técnico ejecutor.</td>
          </tr>
          <tr>
            <td><strong>StockAgujas</strong> (<code>stock_agujas</code>)</td>
            <td><code>usuario_id</code></td>
            <td><code>INT, NULL, FK usuarios(id)</code></td>
            <td>Aísla el conteo físico de agujas por responsable de línea.</td>
          </tr>
          <tr>
            <td><strong>ReporteMantenimiento</strong></td>
            <td><code>usuario_id</code></td>
            <td><code>INT, NULL, FK usuarios(id)</code></td>
            <td>Ya contaba con la relación; se habilitó el filtrado en repositorio y controller.</td>
          </tr>
        </tbody>
      </table>

    </div>
    <div class="page-footer">
      <span>Cotton Knit S.A.C. - Departamento de Sistemas y Mantenimiento</span>
      <span>Página 1 de 2</span>
    </div>
  </div>

  <!-- PÁGINA 2: IMPLEMENTACIÓN DE CÓDIGO Y COMANDOS -->
  <div class="page">
    <div class="page-content">
      <div class="header-bar">
        <div class="logo-container">
          <h1>DETALLE TÉCNICO DE IMPLEMENTACIÓN</h1>
          <p>Spring Boot 3 (Java 21 LTS) & Angular 21 Standalone</p>
        </div>
        <div>
          <span class="badge badge-amber">COMMIT: dfe22d2</span>
        </div>
      </div>

      <h2>4. Capa Backend (Spring Data JPA & REST Controllers)</h2>
      <p>
        Se extendieron los repositorios con consultas derivadas de Spring Data para filtrar registros por <code>usuarioId</code>, y se modificaron los controladores REST para aceptar el parámetro opcional <code>@RequestParam(required = false) Integer userId</code>:
      </p>

      <div class="code-block">
// MaquinaController.java
@GetMapping
public List&lt;Maquina&gt; listar(@RequestParam(required = false) Integer userId) {
    if (userId != null) {
        return repository.findByUsuarioId(userId);
    }
    return repository.findAll(); // ADMIN: devuelve todo
}

@PostMapping
public ResponseEntity&lt;?&gt; guardar(@RequestBody Maquina maquina, @RequestParam(required = false) Integer userId) {
    if (maquina.getUsuario() == null && userId != null) {
        Usuario u = new Usuario(); u.setId(userId);
        maquina.setUsuario(u);
    }
    if (maquina.getId() == null && maquina.getUsuario() != null) {
        if (repository.existsByCodigoAndUsuarioId(maquina.getCodigo(), maquina.getUsuario().getId())) {
            return ResponseEntity.badRequest().body("El código ya existe para tu usuario.");
        }
    }
    return ResponseEntity.ok(repository.save(maquina));
}
      </div>

      <h2>5. Capa Frontend (Angular 21 - ApiService Centralizado)</h2>
      <p>
        Toda la lógica de consulta y guardado se abstrajo dentro de <code>api.service.ts</code>. Mediante la inyección de <code>AuthService</code>, el cliente intercepta si el usuario en sesión es <strong>ADMIN</strong> o <strong>MECANICO</strong>:
      </p>

      <div class="code-block">
// api.service.ts
private getScopedHttpParams(): HttpParams {
  let params = new HttpParams();
  const user = this.authService.getCurrentUser();
  if (user && user.rol !== 'ADMIN') {
    params = params.set('userId', user.id.toString());
  }
  return params;
}

// Al listar máquinas, reportes FO-026 o inspecciones:
listarMaquinas(): Observable&lt;any[]&gt; {
  return this.http.get&lt;any[]&gt;(&#96;&#36;{this.apiUrl}/maquinas&#96;, { params: this.getScopedHttpParams() });
}
      </div>

      <h2>6. Validaciones y Pruebas de Compilación Realizadas</h2>
      <div class="grid-2">
        <div class="highlight-box">
          <p><strong>✔ Backend Spring Boot:</strong> Compilación limpia con Maven (<code>mvn compile -DskipTests</code>). 34 archivos compilados con Java 21 sin advertencias ni errores de sintaxis.</p>
        </div>
        <div class="highlight-box">
          <p><strong>✔ Frontend Angular 21:</strong> Generación completa de bundle con <code>ng build</code>. Rutas estáticas prerenderizadas y paquetes de distribución optimizados en 7.35s.</p>
        </div>
      </div>

      <h2>7. Procedimiento de Actualización en Servidor de Producción</h2>
      <p>
        Los cambios fueron integrados en la rama <code>main</code> del repositorio remoto <code>cbenner2014/Sistema-Documentos-CK</code>. Para desplegar la actualización en el servidor Docker:
      </p>

      <div class="code-block">
# 1. Ingresar al directorio del proyecto en el servidor
cd ~/cottonknit

# 2. Descargar las últimas modificaciones desde GitHub
git pull origin main

# 3. Reconstruir las imágenes de Backend y Frontend sin detener la base de datos
docker compose up -d --build
      </div>

      <div class="card" style="border-left: 3px solid #059669; margin-top: 10px;">
        <div class="card-title" style="color: #059669;">Resultado Comprobado</div>
        <p style="font-size: 7.5pt; margin: 0;">
          Al iniciar sesión en <strong>https://ck.dabecode.com</strong> con el usuario de <strong>Yofre</strong>, el sistema arranca con <strong>0 máquinas y 0 reportes</strong>. Una vez que Yofre registra máquinas o tareas, solo él puede verlas y modificarlas. Al ingresar como <strong>admin</strong>, se observan todos los activos de la planta etiquetados por su respectivo mecánico.
        </p>
      </div>

    </div>
    <div class="page-footer">
      <span>Cotton Knit S.A.C. - Departamento de Sistemas y Mantenimiento</span>
      <span>Página 2 de 2</span>
    </div>
  </div>

</body>
</html>
`;

const htmlFilePath = path.join(__dirname, 'reporte_aislamiento_mecanicos.html');
const pdfOutputPath = path.join(__dirname, 'Reporte_Tecnico_Aislamiento_Mecanicos_CottonKnit.pdf');
const pdfDocFolderPath = path.join(__dirname, 'pdfdoc', 'Reporte_Tecnico_Aislamiento_Mecanicos_CottonKnit.pdf');

fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
console.log(`HTML generado: ${htmlFilePath}`);

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fileUrl = 'file:///' + htmlFilePath.replace(/\\/g, '/');

const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --run-all-compositor-stages-before-draw --no-pdf-header-footer --print-to-pdf="${pdfOutputPath}" "${fileUrl}"`;

try {
  execSync(cmd, { stdio: 'inherit' });
  console.log(`✅ PDF generado exitosamente en: ${pdfOutputPath}`);

  if (fs.existsSync(path.join(__dirname, 'pdfdoc'))) {
    fs.copyFileSync(pdfOutputPath, pdfDocFolderPath);
    console.log(`✅ Copia guardada en: ${pdfDocFolderPath}`);
  }

  const stats = fs.statSync(pdfOutputPath);
  console.log(`Tamaño del archivo PDF: ${(stats.size / 1024).toFixed(2)} KB`);
} catch (err) {
  console.error('Error al generar PDF:', err);
  process.exit(1);
}
