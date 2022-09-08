package intern.sapo.be.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "exports")
@Getter
@Setter
public class Export implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "receive_inventory_id", nullable = false)
    private Inventory receiveInventory;

    // @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @Column(name = "status_id", nullable = false)
    private Integer status;

    // @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @Column(name = "transport_company_id", nullable = false)
    private Integer transportCompany;

    // @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @Column(name = "account_id", nullable = false)
    private Integer account;

    @Column(name = "create_at", nullable = false)
    private Timestamp createAt;

    @Column(name = "update_at")
    private Timestamp updateAt;

    @Column(name = "is_delete", nullable = false)
    private Boolean isDelete = false;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "export_inventory_id", nullable = false)
    private Inventory exportInventory;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "export")
    private Set<DetailsExport> detailsExports;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "export")
    private Set<ExportsStatus> exportsStatuses ;
}