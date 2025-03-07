package com.example.addressbook;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddressController {

    public HashmMap<Long, Address> database = new HashmMap<>();

    @PostMapping("/addresses")
    public Address saveAddress(@RequestBody Address address) {
        return address;// Save address
    }
}
