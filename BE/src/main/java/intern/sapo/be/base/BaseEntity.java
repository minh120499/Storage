package intern.sapo.be.base;


import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Timestamp;

@MappedSuperclass
@Data
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

//    @CreatedDate
//    private Timestamp createdAt;
//    @LastModifiedDate
//    private Timestamp updateAt;
}
