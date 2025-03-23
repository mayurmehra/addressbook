package com.example.addressbook;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddressController {

    @Autowired
    private AddressService addressService; // Use camelCase for variable names

    @GetMapping("/addresses")
    public List<Address> getAddresses() {
        return addressService.getAllAddresses();
    }

    @PostMapping("/addresses")
    public Address saveAddress(@RequestBody Address address) {
        //printing the request body to the console
        // System.err.println(address);
        return addressService.save(address);
    }

    @DeleteMapping("/addresses/{id}")
    public void deleteAddress(@PathVariable String id) {
        addressService.delete(id);
    }
}
