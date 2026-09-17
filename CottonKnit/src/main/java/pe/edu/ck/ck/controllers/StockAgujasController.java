package pe.edu.ck.ck.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.ck.ck.entity.StockAgujas;
import pe.edu.ck.ck.entity.Usuario;
import pe.edu.ck.ck.services.IStockAgujasService;
import java.util.List;

@RestController
@RequestMapping("/api/stock")
@CrossOrigin(origins = "*")
public class StockAgujasController {

    @Autowired
    private IStockAgujasService service;

    @GetMapping
    public ResponseEntity<List<StockAgujas>> listar(@RequestParam(required = false) Integer userId) {
        if (userId != null) {
            return ResponseEntity.ok(service.listarPorUsuario(userId));
        }
        return ResponseEntity.ok(service.listarTodo());
    }

    @PostMapping
    public ResponseEntity<StockAgujas> registrar(@RequestBody StockAgujas stock, @RequestParam(required = false) Integer userId) {
        if (stock.getUsuario() == null && userId != null) {
            Usuario u = new Usuario();
            u.setId(userId);
            stock.setUsuario(u);
        }
        return ResponseEntity.ok(service.guardar(stock));
    }
}