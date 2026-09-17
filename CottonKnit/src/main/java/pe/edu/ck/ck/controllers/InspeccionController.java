package pe.edu.ck.ck.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.ck.ck.entity.InspeccionMaquina;
import pe.edu.ck.ck.entity.Usuario;
import pe.edu.ck.ck.services.IInspeccionService;
import java.util.List;

@RestController
@RequestMapping("/api/inspeccion")
@CrossOrigin(origins = "*")
public class InspeccionController {

    @Autowired
    private IInspeccionService service;

    @GetMapping
    public ResponseEntity<List<InspeccionMaquina>> listar(@RequestParam(required = false) Integer userId) {
        if (userId != null) {
            return ResponseEntity.ok(service.listarPorUsuario(userId));
        }
        return ResponseEntity.ok(service.listar());
    }

    @PostMapping
    public ResponseEntity<InspeccionMaquina> guardar(@RequestBody InspeccionMaquina inspeccion, @RequestParam(required = false) Integer userId) {
        if (inspeccion.getUsuario() == null && userId != null) {
            Usuario u = new Usuario();
            u.setId(userId);
            inspeccion.setUsuario(u);
        }
        return ResponseEntity.ok(service.guardar(inspeccion));
    }

    @PostMapping("/batch")
    public ResponseEntity<List<InspeccionMaquina>> guardarLote(@RequestBody List<InspeccionMaquina> inspecciones, @RequestParam(required = false) Integer userId) {
        if (userId != null) {
            for (InspeccionMaquina ins : inspecciones) {
                if (ins.getUsuario() == null) {
                    Usuario u = new Usuario();
                    u.setId(userId);
                    ins.setUsuario(u);
                }
            }
        }
        return ResponseEntity.ok(service.guardarLote(inspecciones));
    }

    @DeleteMapping("/batch/{batchId}")
    public ResponseEntity<Void> eliminarPorLote(@PathVariable String batchId) {
        service.eliminarPorLote(batchId);
        return ResponseEntity.noContent().build();
    }
}
