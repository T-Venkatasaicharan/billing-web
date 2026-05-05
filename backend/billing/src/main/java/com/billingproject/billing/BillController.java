package com.billingproject.billing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bills")
@CrossOrigin(origins = "*")
public class BillController {
    @Autowired
    private BillService service;

    // CREATE THE BILL HERE
    @PostMapping
    public Bill create(@RequestBody Bill bill) {
        return service.createBill(bill);
    }

    // GET ALL THE BILLS
    @GetMapping
    public List<Bill> getAll() {
        return service.getAllBills();
    }

    // GET BY ID 
    @GetMapping("/{id}")
    public Bill getOne(@PathVariable Long id) {
        return service.getBill(id);
    }


}
