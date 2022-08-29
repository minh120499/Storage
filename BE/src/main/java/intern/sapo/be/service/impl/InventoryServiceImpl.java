package intern.sapo.be.service.impl;



import intern.sapo.be.entity.Category;
import intern.sapo.be.entity.Inventory;
import intern.sapo.be.repository.InventoryRepository;
import intern.sapo.be.security.jwt.util.Utils;
import intern.sapo.be.service.IInventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import java.util.List;


@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements IInventoryService  {

    private final InventoryRepository inventoryRepository;
    private final Utils utils;


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
        }else {
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
        inventoryRepository.deleteById(id);
    }
}
