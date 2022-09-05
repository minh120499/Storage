package intern.sapo.be.service.impl;
import intern.sapo.be.dto.request.ProductVariantsDTO;
import intern.sapo.be.dto.response.Inventory.InventoryResponse;
import intern.sapo.be.entity.Inventory;
import intern.sapo.be.entity.ProductVariant;
import intern.sapo.be.repository.InventoryRepository;
import intern.sapo.be.repository.ProductVariantsRepository;
import intern.sapo.be.security.jwt.util.Utils;
import intern.sapo.be.service.IInventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class InventoryServiceImpl implements IInventoryService {

    private final InventoryRepository inventoryRepository;
    private final Utils utils;

    private final ProductVariantsRepository productVariantsRepository;

    public ProductVariantsDTO toDto(ProductVariant productVariant) {
        ProductVariantsDTO productVariantsDTO = new ProductVariantsDTO();
        productVariantsDTO.setId(productVariant.getId());
        productVariantsDTO.setCode(productVariant.getCode());
        productVariantsDTO.setProductId(productVariant.getProductId());
        productVariantsDTO.setName(productVariant.getName());
        productVariantsDTO.setImage(productVariant.getImage());
        productVariantsDTO.setWholesalePrice(productVariant.getWholesalePrice());
        productVariantsDTO.setSalePrice(productVariant.getSalePrice());
        productVariantsDTO.setImportPrice(productVariant.getImportPric());
        return productVariantsDTO;
    }

    @Override
    public Page<Inventory> findAllBypPage(Integer pageNumber, Integer limit, String sortBy) {
        return null;
    }

    @Override
    public List<Inventory> findAll() {
        return inventoryRepository.findAll();
    }

    @Override
    public Inventory findById(Integer id) {
        Inventory inventory = inventoryRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("id not found: " + id));
        return inventory;
    }

    @Override
    public Inventory create(Inventory inventory, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw utils.invalidInputException(bindingResult);
        } else {
            return inventoryRepository.save(inventory);
        }
    }

    @Override
    public Inventory update(Integer id, Inventory inventory, BindingResult bindingResult) {
        Inventory inventoryOld = inventoryRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("id not found:" + id));
        if (bindingResult.hasErrors()) {
            throw utils.invalidInputException(bindingResult);
        } else {
            inventory.setId(id);
            inventory.setCreateAt(inventoryOld.getCreateAt());
            return inventoryRepository.save(inventory);
        }
    }

    @Override
    public void deleteLíst(List<Integer> id) {

    }

    @Override
    public void delete(Integer id) {
        inventoryRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("id not found: " + id));
        inventoryRepository.deleteById(id);
    }

    @Override
    public InventoryResponse getProductVariantByInventoryId(Integer id) {
        InventoryResponse inventoryResponse = new InventoryResponse();
        List<ProductVariantsDTO> results = new ArrayList<>();
        Integer totalProductVariant = 0;
        Inventory inventory = inventoryRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("id not found:" + id));
        try {
            inventoryResponse.setInventory(inventory);
            List<Integer> listId = inventoryRepository.listId(id);
            List<ProductVariant> productVariants = productVariantsRepository.findAllById(listId);
            for (ProductVariant item : productVariants) {
                ProductVariantsDTO productVariantsDTO = toDto(item);
                productVariantsDTO.setQuantity(inventoryRepository.Quantity(id, item.getId()));
                results.add(productVariantsDTO);
                totalProductVariant = totalProductVariant + inventoryRepository.Quantity(id, item.getId());
            }
            inventoryResponse.setProductVariantsDTOS(results);
            inventoryResponse.setTotalProductVariant(totalProductVariant);
        } catch (Exception e) {
            System.out.println("error" + e.getMessage());
        }
        return inventoryResponse;
    }
}
