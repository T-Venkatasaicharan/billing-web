package com.billingproject.billing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class BillService {
    @Autowired
    private BillRepository billRepository;

    // CREATE BILL
    public Bill createBill(Bill bill) {

        double total = 0;

        for (Item item : bill.getItems()) {
            total += item.getPrice() * item.getQuantity();
            item.setBill(bill);
        }

        bill.setTotalAmount(total);

        return billRepository.save(bill);
    }

    // GET ALL BILLS
    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    // GET BILL BY ID
    public Bill getBill(Long id) {
        return billRepository.findById(id).orElse(null);
    }
}
