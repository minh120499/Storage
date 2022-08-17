package com.example.be.base;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

public class BaseServiceImpl<T,ID extends Serializable> implements IBaseService<T,ID> {

    @Autowired
    IBaseRepository<T,ID> baseRepository;

    @Override
    public T save(T entity) {
        return baseRepository.save(entity);
    }

    @Override
    public Optional<T> findById(ID entityId) {
        return baseRepository.findById(entityId);
    }

    @Override
    public T update(T entity) {
        return baseRepository.save(entity);
    }

    @Override
    public T updateById(T entity, ID entityId) {
        Optional<T> optional = baseRepository.findById(entityId);
        if(optional.isPresent()){
            return baseRepository.save(entity);
        }else{
            return null;
        }
    }

    @Override
    public void delete(T entity) {
        baseRepository.delete(entity);
    }

    @Override
    public void deleteById(ID entityId) {
        baseRepository.deleteById(entityId);
    }

    @Override
    public List<T> getList(Integer page, Integer perPage, String sort, String sortBy) {
        Page<T> pageList;
        List<T> data;
        if(sort == null){
            pageList = baseRepository.findAll(PageRequest.of(page-1, perPage));
        }else {
            Sort sortList = sort.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
            pageList = baseRepository.findAll(PageRequest.of(page-1,perPage,sortList));
        }
        data = pageList.getContent();
        return data;
    }
}
