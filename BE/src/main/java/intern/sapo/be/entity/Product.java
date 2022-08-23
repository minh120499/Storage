package intern.sapo.be.entity;

import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "products")
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "code", nullable = false, length = 100)
    private String code;

    @Lob
    @Column(name = "name", nullable = false)
    private String name;

    @Lob
    @Column(name = "description", nullable = false)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "status_id", nullable = false)
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @JoinColumn(name = "status_id", nullable = false)
    private Integer statusId;

    @JoinColumn(name = "supplier_id", nullable = false)
    private Integer supplierId;

    @JoinColumn(name = "account_id", nullable = false)
    private Integer accountId;
    @CreatedDate
    @Column(name = "create_at")
    private Timestamp createAt;

    @Column(name = "update_at")
    private Timestamp updateAt;

    @Column(name = "is_delete", nullable = false)
    private Boolean isDelete = false;


}