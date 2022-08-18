package intern.sapo.be.entity;

import intern.sapo.be.base.BaseModel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "suppliers")
@Getter
@Setter
public class Supplier extends BaseModel {

    @Column(name = "code", nullable = false, length = 100)
    private String code;

    @Lob
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "phone", nullable = false, length = 20)
    private String phone;

    @Lob
    @Column(name = "address", nullable = false)
    private String address;



}