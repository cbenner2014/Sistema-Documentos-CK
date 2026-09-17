package pe.edu.ck.ck.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.ck.ck.entity.ReporteMantenimiento;
import pe.edu.ck.ck.entity.Usuario;
import pe.edu.ck.ck.services.IReporteMantenimientoService;
import java.util.List;

@RestController
@RequestMapping("/api/mantenimiento")
@CrossOrigin(origins = "*")
public class MantenimientoController {

    @Autowired
    private IReporteMantenimientoService service;

    @PostMapping
    public ResponseEntity<ReporteMantenimiento> crear(@RequestBody ReporteMantenimiento reporte, @RequestParam(required = false) Integer userId) {
        if (reporte.getUsuario() == null && userId != null) {
            Usuario u = new Usuario();
            u.setId(userId);
            reporte.setUsuario(u);
        }
        return ResponseEntity.ok(service.registrar(reporte));
    }

    @PostMapping("/batch")
    public ResponseEntity<List<ReporteMantenimiento>> crearLote(@RequestBody List<ReporteMantenimiento> reportes, @RequestParam(required = false) Integer userId) {
        if (userId != null) {
            for (ReporteMantenimiento r : reportes) {
                if (r.getUsuario() == null) {
                    Usuario u = new Usuario();
                    u.setId(userId);
                    r.setUsuario(u);
                }
            }
        }
        return ResponseEntity.ok(service.registrarLote(reportes));
    }

    @GetMapping
    public ResponseEntity<List<ReporteMantenimiento>> listar(@RequestParam(required = false) Integer userId) {
        if (userId != null) {
            return ResponseEntity.ok(service.listarPorUsuario(userId));
        }
        return ResponseEntity.ok(service.listarTodo());
    }

    @GetMapping("/maquina/{id}")
    public ResponseEntity<List<ReporteMantenimiento>> porMaquina(@PathVariable String id) {
        return ResponseEntity.ok(service.listarPorMaquina(id));
    }

    @DeleteMapping("/batch/{batchId}")
    public ResponseEntity<Void> eliminarPorLote(@PathVariable String batchId) {
        service.eliminarPorLote(batchId);
        return ResponseEntity.ok().build();
    }
}