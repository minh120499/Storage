package intern.sapo.be.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "imports_status")
@Getter
@Setter
public class ImportsStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;


    @JoinColumn(name = "import_id", nullable = false)
    private Integer importId;

    @JoinColumn(name = "status_id", nullable = false)
    private Integer statusId;

    @CreatedDate
    @Column(name = "create_at", nullable = false)
    private Timestamp createAt;


}