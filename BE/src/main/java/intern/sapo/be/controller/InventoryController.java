package intern.sapo.be.controller;

import intern.sapo.be.base.BaseController;
import intern.sapo.be.base.IBaseService;
import intern.sapo.be.dto.response.Inventory.InventoryResponse;
import intern.sapo.be.entity.Category;
import intern.sapo.be.entity.Inventory;
import intern.sapo.be.service.IInventoryService;
import intern.sapo.be.service.impl.InventoryServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.data.relational.core.sql.In;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/inventories")
@CrossOrigin("*")
public class InventoryController {
	private final IInventoryService iInventoryService;
    private final InventoryServiceImpl inventoryService;


	@GetMapping("")
	public List<Inventory> getAll() {
		return iInventoryService.findAll();
	}

	@PostMapping("")
	public Inventory createInventory(@RequestBody @Valid Inventory inventory, BindingResult bindingResult) {
		return iInventoryService.create(inventory, bindingResult);
	}


	@GetMapping("/{id}")
	public Inventory getById(@PathVariable(value = "id") Integer id) {
		return iInventoryService.findById(id);
	}

	@PutMapping("/{id}")

	public Inventory update(@RequestBody @Valid Inventory inventory, BindingResult bindingResult,
	                        @PathVariable(value = "id") Integer id) {
		return iInventoryService.update(id, inventory, bindingResult);
	}

	@DeleteMapping("/{id}")
	public void deleteInventory(@PathVariable(value = "id") Integer id) {
		iInventoryService.delete(id);
	}

    @GetMapping("/productvariant/{id}")
    public InventoryResponse getAll(@PathVariable(value = "id") Integer id)
    {
        return inventoryService.getAll(id);
    }

}
