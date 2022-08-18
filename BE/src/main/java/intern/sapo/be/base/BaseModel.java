package intern.sapo.be.base;

import intern.sapo.be.entity.Account;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;
@MappedSuperclass
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public  class BaseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;


    @CreatedDate
    @Column(name = "create_at", nullable = false)
    private Timestamp createdAt;
    @LastModifiedDate
    @Column(name = "update_at", nullable = false)
    private Timestamp updateAt;

    @Column(name = "is_delete", nullable = false)
    private Boolean isDelete = false;


    @JoinColumn(name = "account_id",insertable = false,updatable = false, nullable = false)
    private Integer accountId;

}
