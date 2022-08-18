package intern.sapo.be.service.impl;

import intern.sapo.be.base.BaseService;
import intern.sapo.be.base.IBaseRepo;
import intern.sapo.be.dto.request.SuppliersDTO;
import intern.sapo.be.entity.Supplier;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class SupplierService extends BaseService<SuppliersDTO, Supplier> {
    public SupplierService(IBaseRepo<Supplier, Integer> baseRepo, ModelMapper modelMapper) {
        super(baseRepo, modelMapper);
    }
}
