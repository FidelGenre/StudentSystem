package studentsystem.repository;

import studentsystem.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    boolean existsByName(String name); // ejemplo de query derivada
}
