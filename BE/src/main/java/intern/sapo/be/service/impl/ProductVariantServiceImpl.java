package intern.sapo.be.service.impl;

import intern.sapo.be.base.BaseService;
import intern.sapo.be.base.IBaseRepo;
import intern.sapo.be.dto.request.Product.ProductVariantDTO;
import intern.sapo.be.entity.ProductVariant;
import intern.sapo.be.repository.IProductVariantRepo;
import intern.sapo.be.repository.ProductVariantsRepository;
import intern.sapo.be.service.IProductVariantService;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;
import java.util.Optional;

@Service

public class ProductVariantServiceImpl extends BaseService<ProductVariant> implements IProductVariantService {
    public ProductVariantServiceImpl(IBaseRepo<ProductVariant, Integer> baseRepo, ProductVariantsRepository variantsRepository, JdbcTemplate jdbcTemplate, EntityManager entityManager, IProductVariantRepo productVariantRepo, ProductVariantsRepository repository) {
        super(baseRepo);
        this.entityManager = entityManager;

        this.productVariantRepo = productVariantRepo;
        this.repository = repository;
    }

    private final EntityManager entityManager;

    private final IProductVariantRepo productVariantRepo;

    private final ProductVariantsRepository repository;

    @Override
    public List<ProductVariant> findProductByName(String name) {
        return repository.findProductVariantByName(name);
    }

    @Override
    public Optional<ProductVariant> findProductById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public List<ProductVariantDTO> findAllProductVariantDTO(Integer pageNumber, Integer pageSize) {
        Query query = entityManager.createNamedQuery("getFeaturedProductDTO")
                .setFirstResult((pageNumber - 1) * pageSize).setMaxResults(pageSize);

        return (List<ProductVariantDTO>) query.getResultList();
    }

    @Override
    public List<ProductVariantDTO> findAllProductVariantDTO() {
        Query query = entityManager.createNamedQuery("getFeaturedProductDTO");
        return (List<ProductVariantDTO>) query.getResultList();
    }

    @Override
    public Integer countTotalPage() {
        Query queryTotal = entityManager.createNativeQuery
                ("select count(*) as total from product_variants\n" +
                        "    inner join products p on product_variants.product_id = p.id\n" +
                        "where p.is_delete = false;");
        Long countResult = queryTotal.getSingleResult() != null ? Long.parseLong(queryTotal.getSingleResult().toString()) : 0;
        return (int) ((countResult / 5) + 1);
    }
}
