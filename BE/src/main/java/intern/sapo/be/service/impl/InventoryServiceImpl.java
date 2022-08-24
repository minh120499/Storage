package intern.sapo.be.service.impl;

import intern.sapo.be.base.BaseService;
import intern.sapo.be.base.IBaseRepo;
import intern.sapo.be.entity.Inventory;
import intern.sapo.be.repository.InventoryRepository;
import intern.sapo.be.service.IInventoryService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryServiceImpl extends BaseService<Inventory> implements IInventoryService {

    public InventoryServiceImpl(IBaseRepo<Inventory, Integer> baseRepo) {
        super(baseRepo);
    }
}
