package intern.sapo.be.service.impl;

import intern.sapo.be.dto.request.InventoriesProductVariantDTO;
import intern.sapo.be.entity.DetailsImport;
import intern.sapo.be.entity.InventoriesProductVariant;
import intern.sapo.be.repository.IInventoriesProductVariantRepo;
import intern.sapo.be.service.IInventoriesProductVariantService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class InventoriesProductVariantService implements IInventoriesProductVariantService {

    private final IInventoriesProductVariantRepo inventoriesProductVariantRepo;


    @Override
    public InventoriesProductVariant findByInventoryIdAndProductVariantId(Integer inventoryId, Integer productVariantId) {
        return inventoriesProductVariantRepo.findByInventoryIdAndProductVariantId(inventoryId, productVariantId);
    }

    @Override
    public void importProductVariantToInventory(List<DetailsImport> list, Integer inventoryId) {
        ModelMapper modelMapper = new ModelMapper();
        if (inventoryId == null) {
            throw new IllegalArgumentException("id not found");
        }
        for (DetailsImport detailsImport : list) {
            Integer productVariantId = detailsImport.getProductVariantId();
            InventoriesProductVariant inventoriesProductVariant = inventoriesProductVariantRepo
                    .findByInventoryIdAndProductVariantId(inventoryId, productVariantId);
            if (inventoriesProductVariant == null) {
                InventoriesProductVariantDTO inDTO = new InventoriesProductVariantDTO(inventoryId, productVariantId, detailsImport.getQuantity());
                InventoriesProductVariant in = modelMapper.map(inDTO, InventoriesProductVariant.class);
                inventoriesProductVariantRepo.save(in);
            } else {
                inventoriesProductVariant.setQuantity(inventoriesProductVariant.getQuantity() + detailsImport.getQuantity());
                inventoriesProductVariantRepo.save(inventoriesProductVariant);
            }
        }
    }
}
