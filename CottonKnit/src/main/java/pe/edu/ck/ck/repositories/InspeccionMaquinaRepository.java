package pe.edu.ck.ck.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.ck.ck.entity.InspeccionMaquina;

import java.util.List;

public interface InspeccionMaquinaRepository extends JpaRepository<InspeccionMaquina, Integer> {
    void deleteByBatchId(String batchId);
    List<InspeccionMaquina> findByUsuarioId(Integer usuarioId);
}
