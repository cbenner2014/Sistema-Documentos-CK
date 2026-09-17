package pe.edu.ck.ck.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.ck.ck.entity.Maquina;
import pe.edu.ck.ck.entity.Usuario;
import pe.edu.ck.ck.repositories.MaquinaRepository;
import java.util.List;

@RestController
@RequestMapping("/api/maquinas")
@CrossOrigin(origins = "*")
public class MaquinaController {

    @Autowired
    private MaquinaRepository repository;

    @GetMapping
    public List<Maquina> listar(@RequestParam(required = false) Integer userId) {
        if (userId != null) {
            return repository.findByUsuarioId(userId);
        }
        return repository.findAll();
    }

    @GetMapping("/activas")
    public List<Maquina> listarActivas(@RequestParam(required = false) Integer userId) {
        if (userId != null) {
            return repository.findByUsuarioIdAndActivaTrue(userId);
        }
        return repository.findByActivaTrue();
    }

    @PostMapping
    public ResponseEntity<?> guardar(@RequestBody Maquina maquina, @RequestParam(required = false) Integer userId) {
        if (maquina.getUsuario() == null && userId != null) {
            Usuario u = new Usuario();
            u.setId(userId);
            maquina.setUsuario(u);
        }

        if (maquina.getId() == null) {
            if (maquina.getUsuario() != null && maquina.getUsuario().getId() != null) {
                if (repository.existsByCodigoAndUsuarioId(maquina.getCodigo(), maquina.getUsuario().getId())) {
                    return ResponseEntity.badRequest().body("El código de máquina ya está registrado para tu usuario.");
                }
            } else if (repository.existsByCodigo(maquina.getCodigo())) {
                return ResponseEntity.badRequest().body("El código de máquina ya existe.");
            }
        }
        return ResponseEntity.ok(repository.save(maquina));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Maquina> cambiarEstado(@PathVariable Integer id) {
        return repository.findById(id).map(m -> {
            m.setActiva(!m.isActiva());
            return ResponseEntity.ok(repository.save(m));
        }).orElse(ResponseEntity.notFound().build());
    }
}
