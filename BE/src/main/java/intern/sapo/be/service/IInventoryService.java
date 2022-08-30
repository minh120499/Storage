package intern.sapo.be.service;

import intern.sapo.be.dto.response.Inventory.InventoryResponse;
import intern.sapo.be.entity.Inventory;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import java.util.List;

public interface IInventoryService {
    Page<Inventory> findAllBypPage(Integer pageNumber, Integer limit, String sortBy);

    List<Inventory> findAll();

    Inventory findById(Integer id);

    Inventory create(Inventory inventory, BindingResult bindingResult);

    Inventory update(Integer id, Inventory inventory, BindingResult bindingResult);

    void deleteLíst(List<Integer> id);

    void delete (Integer id);

    InventoryResponse getProductVariantByInventoryId(Integer id);

}
