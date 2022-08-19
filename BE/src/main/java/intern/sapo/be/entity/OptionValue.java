package intern.sapo.be.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "option_values")
@Getter
@Setter
public class OptionValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @JoinColumn(name = "option_id", nullable = false)
    private Integer optionId;

    @Column(name = "name", nullable = false, length = 200)
    private String name;


}