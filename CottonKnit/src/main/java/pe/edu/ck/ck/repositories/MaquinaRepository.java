package pe.edu.ck.ck.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.ck.ck.entity.Maquina;
import java.util.List;

public interface MaquinaRepository extends JpaRepository<Maquina, Integer> {
    List<Maquina> findByActivaTrue();
    boolean existsByCodigo(String codigo);
    List<Maquina> findByUsuarioId(Integer usuarioId);
    List<Maquina> findByUsuarioIdAndActivaTrue(Integer usuarioId);
    boolean existsByCodigoAndUsuarioId(String codigo, Integer usuarioId);
}
